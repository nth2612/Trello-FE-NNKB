import { closestCorners, defaultDropAnimationSideEffects, DndContext, DragOverlay, MouseSensor,
  // getFirstCollision, pointerWithin,
  TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Box } from '@mui/material'
import { cloneDeep, isEmpty } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import Column from '~/components/ListColumn/Column/Column'
import TrelloCard from '~/components/ListColumn/Column/ListCard/TrelloCard/TrelloCard'
import ListColumn from '~/components/ListColumn/ListColumn'
import { generatePlaceholderCard } from '~/utils/formatters'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

const BoardContent = ({ board, moveColumn, createNewColumn }) => {
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
  // tam xoa
  // const [columnIds, setColumnIds] = useState(mockData.board.columnOrderIds)
  const boardBarRef = useRef(null)
  const [boardBarHeight, setBoardBarHeight] = useState(0)
  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)
  // const lastOverId = useRef(null)
  useEffect(() => {
    // setOrderedColumns(mapOrder(mockData.board.columns, mockData.board.columnOrderIds, '_id'))
    setOrderedColumns(board.columns)
  }, [board])
  // Tach useEffect cu ra
  useEffect(() => {
    if (boardBarRef.current) {
      setBoardBarHeight(boardBarRef.current.offsetHeight)
    }
  }, [boardBarHeight])
  // di vao mang column, tim column co mang card chua cardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(c => c?.cards.map(c => c?._id)?.includes(cardId))
  }
  const moveCardBetweenDiffCol = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prev => {
      const overCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
      active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.cards.length + 1
      // Clone orderedColumns ra cai moi
      const nextColumns = cloneDeep(prev)
      const nextActiveColumn = nextColumns.find(c => c._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(c => c._id === overColumn._id)
      // Column cu
      if (nextActiveColumn) {
        // Xoa card bi keo khoi column cu
        nextActiveColumn.cards = nextActiveColumn.cards.filter(c => c._id !== activeDraggingCardId)

        // them placeholder card khi het card
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        // cap nhat ids
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(c => c._id)
      }
      // Column moi
      if (nextOverColumn) {
        // Kiem tra thua: neu card keo co o ben over thi vut
        nextOverColumn.cards = nextOverColumn.cards.filter(c => c._id !== activeDraggingCardId)

        const rebuild = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        // Them card moi vao listcard cua over
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild)
        // xoa card placeholder khi dc them vao
        nextOverColumn.cards = nextOverColumn.cards.filter(c => !c.FE_PlaceholderCard)
        // cap nhat ids
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(c => c._id)
      }
      return nextColumns
    })
  }
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
    // neu keo card thi set gia tri old column
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
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
      moveCardBetweenDiffCol(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData)
    }

  }
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!active || !over) return
    // Xu ly keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      if (!activeColumn || !overColumn) return
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDiffCol(overColumn, overCardId, active, over, activeColumn, activeDraggingCardId, activeDraggingCardData)

      } else {
        const oldCardIndex = oldColumnWhenDraggingCard.cards.findIndex(c => c._id === activeDragItemId)
        const newCardIndex = overColumn.cards.findIndex(c => c._id === overCardId)
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard.cards, oldCardIndex, newCardIndex)
        setOrderedColumns(prev => {
          const nextColumns = cloneDeep(prev)

          //tim column dang keo
          const targetColumn = nextColumns.find(c => c._id === overColumn._id)
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(c => c._id)
          return nextColumns
        })
      }
    }
    // Xu ly keo tha column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // neu vi tri keo va tha khac nhau thi thuc hien logic
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
        // cai nay return list object (columns)
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)
        setOrderedColumns(dndOrderedColumns)
        moveColumn(dndOrderedColumns)
      }
    }
    // Sau khi keo tha xong thi reset data
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
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
  // const collisionDetectionStrategy = useCallback((args) => {
  //   if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
  //     return closestCorners({ ...args })
  //   }
  //   const pointerIntersections = pointerWithin(args)
  //   if (!pointerIntersections?.length) return
  //   // Tìm overid đầu trong list intersection
  //   let overId = getFirstCollision(pointerIntersections, 'id')
  //   if (overId) {
  //     const checkCol = orderedColumns.find(c => c._id === overId)
  //     if (checkCol) {
  //       overId = closestCorners({
  //         ...args,
  //         droppableContainers : args.droppableContainers.filter(container => {
  //           return (container.id !== overId) && (checkCol?.cardOrderIds?.includes(container.id))
  //         })[0]?.id
  //       })
  //     }
  //     lastOverId.current = overId
  //     return [{ id : overId }]
  //   }
  //   return lastOverId.current ? [{ id: lastOverId.current }] : []
  // }, [activeDragItemType, orderedColumns])
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      // collisionDetection={collisionDetectionStrategy}
      collisionDetection={closestCorners}
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
        <ListColumn
          boardBarHeight={boardBarHeight}
          orderedColumns={orderedColumns}
          createNewColumn={createNewColumn}
        />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} />}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <TrelloCard card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent