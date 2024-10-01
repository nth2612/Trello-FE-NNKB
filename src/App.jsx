import { Box, Drawer, useMediaQuery } from '@mui/material'
import AppBar from './components/AppBar/AppBar'
import BoardBar from './components/BoardBar/BoardBar'
import ExpandLeft from './components/ExpandLeft/ExpandLeft'
import { memo, useEffect, useRef, useState } from 'react'
import BoardMenu from './components/BoardMenu/BoardMenu'
import { mockData } from './apis/mock-data'
import ListColumn from './components/ListColumn/ListColumn'
import { closestCenter, DndContext, useSensors, useSensor, MouseSensor, TouchSensor, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { mapOrder } from './utils/sorts'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './components/ListColumn/Column/Column'
import TrelloCard from './components/ListColumn/Column/ListCard/TrelloCard/TrelloCard'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

const App = function App({ board }) {
  // tranh click vao bi keo tha ma phai di chuyen it nhat 10px
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, {
    // Di chuyển 10px mới thực hiện hàm handleDrag, tránh click
    activationConstraint : {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    // Nhấn giữ trong vòng 250ms và di chuyển khoảng 5px thì mới gọi hàm handleDrag
    activationConstraint : {
      delay: 250,
      tolerance: 500
    }
  })
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)
  const [columnIds, setColumnIds] = useState(mockData.board.columnOrderIds)
  const boardBarRef = useRef(null)
  const removeMargin = useMediaQuery('(min-width: 751px)')
  const [open, setOpen] = useState(false)
  const [boardBarHeight, setBoardBarHeight] = useState(0)
  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const handleOpen = () => {
    setOpen(!open)
  }
  const setOpenToFalse = () => {
    setOpen(false)
  }
  useEffect(() => {
    setOrderedColumns(mapOrder(mockData.board.columns, mockData.board.columnOrderIds, '_id'))
    if (boardBarRef.current) {
      setBoardBarHeight(boardBarRef.current.offsetHeight)
    }
  }, [boardBarHeight, board])
  // di vao mang column, tim column co mang card chua cardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(c => c?.card.map(card => card?._id)?.includes(cardId))
  }
  const handleDragStart = (event) => {
    console.log('drag start', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }
  const handleDragOver = (event) => {
    // khong lam gi neu keo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    const { active, over } = event
    // Neu keo linh tinh se khong co gi
    if (!active || !over) return
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      // setOrderedColumns(prev => {
        const overCardIndex = overColumn?.card?.findIndex(c => c._id === overCardId)
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.card.length + 1
        console.log(newCardIndex)
        console.log(modifier)
        console.log(isBelowOverItem)
      // })
    }

  }
  const handleDragEnd = (event) => {
    console.log('drag end', event)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log('keo tha card')
    }
    const { active, over } = event
    // Neu keo linh tinh se khong co gi
    if (!active || !over) return
    // neu vi tri keo va tha khac nhau thi thuc hien logic
    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)
      console.log('old:', oldIndex)
      console.log('new:', newIndex)
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)
      console.log(dndOrderedColumnIds)
      setOrderedColumns(dndOrderedColumns)
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    // const newColumnIds = [...columnIds]
    // newColumnIds.splice(oldIndex, 1)
    // newColumnIds.splice(newIndex, 0, active.id)
    // setColumnIds(newColumnIds)
  }
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }
  return (
    <>
      <AppBar/>
      <Box sx={{ borderTop: '1px solid #297eb0', display: 'flex', position: 'relative' }}>
        <ExpandLeft/>
        <Box sx={{ flexGrow: 1, borderLeft: '1px solid #298ec9', overflow: 'auto', mr: open && removeMargin ? '339px' : '0px' }}>
          <BoardBar refBoardBar={boardBarRef} handleOpen={handleOpen} open={open} nameBoard={mockData.board?.title} />
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
          >
            <Box sx={{
              backgroundColor: '#0079bf',
              display: 'flex',
              flexDirection: 'row',
              position: 'relative',
              overflowX: 'auto',
              overflowY: 'hidden',
              height: (theme) => theme.trello.boardContentHeight,
              scrollbarColor: '#fff6 #00000026'
            }}>
              <ListColumn boardBarHeight={boardBarHeight} columnIds={columnIds} orderedColumns={orderedColumns} />
              <DragOverlay dropAnimation={customDropAnimation}>
                {!activeDragItemType && null}
                {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} />}
                {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <TrelloCard card={activeDragItemData} />}
              </DragOverlay>
            </Box>
          </DndContext>
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

export default App
