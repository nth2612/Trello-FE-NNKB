import { Box, CircularProgress, Drawer, useMediaQuery } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from '~/components/BoardBar/BoardBar'
import ExpandLeft from '~/components/ExpandLeft/ExpandLeft'
import { useEffect, useRef, useState } from 'react'
import BoardMenu from '~/components/BoardMenu/BoardMenu'
import { mockData } from '~/apis/mock-data'
import { createNewCardAPI, createNewColumnAPI, deleteColumnAPI, fetchBoardAPI, moveCardInSameColAPI, moveCardToDifColAPI, updateBoardDetailAPI } from '~/apis'
import BoardContent from './BoardContent'
import { mapOrder } from '~/utils/sorts'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'
import { toast } from 'react-toastify'

const Board = () => {
  const boardBarRef = useRef(null)
  const [board, setBoard] = useState(null)
  const removeMargin = useMediaQuery('(min-width: 751px)')
  const [open, setOpen] = useState(false)
  const [boardBarHeight, setBoardBarHeight] = useState(0)
  const handleOpen = () => {
    setOpen(!open)
  }
  const setOpenToFalse = () => {
    setOpen(false)
  }
  useEffect(() => {
    fetchBoardAPI('67093f6e67ef55490d8a212c').then((boardResponse) => {
      // Lay du lieu tu backend ve roi sort lai theo orderids vi data o backend khong co sort list column cho
      boardResponse.columns = mapOrder(boardResponse.columns, boardResponse.columnOrderIds, '_id')
      // Neu column khong co card thi generate placeholder card
      boardResponse.columns.forEach(col => {
        if (isEmpty(col.cards)) {
          col.cards = [generatePlaceholderCard(col)]
          col.cardOrderIds = [generatePlaceholderCard(col)._id]
        } else {
          // Neu co card thi cung sap xep luon vi tri vi backend db khong co luu list da sort
          col.cards = mapOrder(col.cards, col.cardOrderIds, '_id')
        }
      })
      setBoard(boardResponse)
    })
  }, [])
  // Them moi useEffect tach ra
  useEffect(() => {
    if (boardBarRef.current) {
      setBoardBarHeight(boardBarRef.current.offsetHeight)
    }
  }, [boardBarHeight])
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(c => c._id === createdCard.columnId)
    if (columnToUpdate) {
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        // Neu la column rong chua co card thi xoa card placeholder va them moi
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds= [createdCard._id]
      } else {
        // Neu column co card roi thi day nhu binh thuong
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard)
      }
    }
    setBoard(newBoard)
  }
  const moveColumn = (dndOrderedColumn) => {
    // Nhan vao list column da sort, update lai list ids
    const dndOrderedColumnIds = dndOrderedColumn.map(c => c._id)
    const newBoard = { ...board }
    // cap nhat 2 du lieu sau khi thay doi column
    newBoard.columnOrderIds = dndOrderedColumnIds,
    newBoard.columns = dndOrderedColumn
    setBoard(board)
    updateBoardDetailAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }
  const moveCardToDiffColumn = (cardId, oldColumnId, newColumnId, dndOrderedColumn) => {
    // Cap nhat data ben FE thi moi keo tha tot duoc
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumn
    let newCardIdsInOldColumn = dndOrderedColumn.find(c => c._id === oldColumnId).cardOrderIds
    // Xu ly khi keo phan tu card cuoi cua column
    if (newCardIdsInOldColumn[0].includes('placeholder')) {
      newCardIdsInOldColumn = []
    }
    const newCardIdsInNewColumn = dndOrderedColumn.find(c => c._id === newColumnId).cardOrderIds
    moveCardToDifColAPI({
      cardId,
      oldColumnId,
      newColumnId,
      newCardIdsInOldColumn,
      newCardIdsInNewColumn
    })
  }
  const moveCardInSameCol = (dndOrderedCard, dndOrderedCardIds, columnId) => {
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(c => c._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCard
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)
    moveCardInSameColAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }
  if (!board) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', flexDirection: 'column' }}>
        <h1 className='mb-3'>Vì trang web này được host server free trên Render nên vui lòng chờ một vài phút để server trên đó tự động bật lên</h1>
        <CircularProgress size={50} color='info' />
      </Box>
    )
  }
  const deleteOneColumn = (columnId) => {
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(id => id !== columnId)
    setBoard(newBoard)
    deleteColumnAPI(columnId).then(res => {
      toast.success(res.data.message)
    })
  }
  return (
    <>
      <AppBar/>
      <Box sx={{ borderTop: '1px solid #297eb0', display: 'flex', position: 'relative' }}>
        <ExpandLeft/>
        <Box sx={{ flexGrow: 1, borderLeft: '1px solid #298ec9', overflow: 'auto', mr: open && removeMargin ? '339px' : '0px' }}>
          <BoardBar refBoardBar={boardBarRef} handleOpen={handleOpen} open={open} nameBoard={mockData.board?.title} />
          <BoardContent
            board={board}
            moveColumn={moveColumn}
            createNewColumn={createNewColumn}
            createNewCard={createNewCard}
            moveCardToDiffColumn={moveCardToDiffColumn}
            moveCardInSameCol={moveCardInSameCol}
            deleteOneColumn={deleteOneColumn}
          />
        </Box>
        <Drawer anchor='right' open={open} onClose={() => setOpen(false)} sx={{ '& .MuiPaper-root' : { top: '58px', width: '339px', borderRadius: 'unset', transition: 'transform,width 100ms ease-in' } }} >
          <Box sx={{ height: '100%' }} >
            {open && <BoardMenu handleOpen={setOpenToFalse} />}
          </Box>
        </Drawer>
      </Box>
    </>
  )
}

export default Board