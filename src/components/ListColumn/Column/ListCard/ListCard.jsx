import { Box } from '@mui/material'
import TrelloCard from './TrelloCard/TrelloCard'
import AddCard from './AddCard/AddCard'
import { memo, useEffect, useState } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const ListCard = memo(function ListCard({ headerHeight, cards, cardOrderIds, boardBarHeight, isAddingCard, setIsAddingCard, createNewCard, columnId }) {
  const [orderedCards, setOrderedCards] = useState([])
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
