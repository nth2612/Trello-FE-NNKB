import { Box } from '@mui/material'
import TrelloCard from './TrelloCard/TrelloCard'
import AddCard from './AddCard/AddCard'
import { memo, useEffect, useState } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
// import { closestCorners, DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'

const ListCard = memo(function ListCard({ headerHeight, cards, cardOrderIds, boardBarHeight, isAddingCard, setIsAddingCard, createNewCard, columnId }) {
  // const mouseSensor = useSensor(MouseSensor, {
  //   // Di chuyển 10px mới thực hiện hàm handleDrag, tránh click
  //   activationConstraint : {
  //     distance: 10
  //   }
  // })
  // const touchSensor = useSensor(TouchSensor, {
  //   // Nhấn giữ trong vòng 250ms và di chuyển khoảng 5px thì mới gọi hàm handleDrag
  //   activationConstraint : {
  //     delay: 250,
  //     tolerance: 500
  //   }
  // })
  // const sensors = useSensors(mouseSensor, touchSensor)
  // const [rawCard, setRawCard] = useState(cards)
  const [orderedCards, setOrderedCards] = useState([])
  // const [cardOrder, setCardOrder] = useState(cardOrderIds)
  // const cardOrdered = cardOrder?.map(id => rawCard?.find(card => card?._id === id))
  useEffect(() => {
    setOrderedCards(cards)
  }, [cards])
  let displayForOL = 'flex'
  // if (rawCard?.length === 0) {
  //   displayForOL = 'none'
  // }
  // if (isAddingCard) {
  //   displayForOL = 'flex'
  // }
  // const restrictToVerticalAxis = ({ transform }) => {
  //   return {
  //     ...transform,
  //     x: 0
  //   }
  // }
  // const handleDragEnd = (event) => {
  //   const { active, over } = event
  //   const oldIndex = cardOrder.indexOf(active.id)
  //   const newIndex = cardOrder.indexOf(over.id)
  //   const newColumnIds = [...cardOrder]
  //   newColumnIds.splice(oldIndex, 1)
  //   newColumnIds.splice(newIndex, 0, active.id)
  //   setCardOrder(newColumnIds)
  // }
  return (
    <SortableContext items={orderedCards?.map(c => c._id)} strategy={verticalListSortingStrategy}>
      <Box sx={{
        p: '2px 4px',
        mx: '4px',
        overflowX: 'hidden',
        overflowY: 'auto',
        flexDirection: 'column',
        rowGap: '8px',
        display: displayForOL,
        flex: '1 1 auto',
        scrollbarWidth: 'thin',
        scrollbarColor: '#091e4224 #091e420f',
        maxHeight: (theme) => `calc(${theme.trello.cardHeight} - ${boardBarHeight}px - ${headerHeight}px)`
      }} >
        {/* Trello Card */}
        { cards?.length !== 0 && orderedCards?.map(card => <TrelloCard key={card?._id} card={card} cardName={card?.title} />)}
        {isAddingCard && <AddCard isAddingCard={isAddingCard} setIsAddingCard={setIsAddingCard} cardOrderIds={cardOrderIds} createNewCard={createNewCard} columnId={columnId} />}
      </Box>
    </SortableContext>
  )
})

export default ListCard
