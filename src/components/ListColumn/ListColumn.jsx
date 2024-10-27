import { Box } from '@mui/material'
import Column from './Column/Column'
import AddColumn from '../AddColumn/AddColumn'
import { memo } from 'react'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'

const ListColumn = memo(function ListColumn({ boardBarHeight, orderedColumns, createNewColumn, createNewCard, deleteOneColumn, renameColumn }) {
  return (
    // items can nhan list id chu k phai object
    <SortableContext items={orderedColumns.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{ mt: '12px', flexGrow: 1 }} >
        <Box sx={{ height: '100%' }} >
          <Box sx={{ padding: '2px 6px 8px', height: '100%', display: 'flex', flexDirection: 'row' }} >
            {/* Column */}
            {orderedColumns.map(col => <Column key={col._id} column={col} boardBarHeight={boardBarHeight} createNewCard={createNewCard} deleteOneColumn={deleteOneColumn} renameColumn={renameColumn} />)}
            <AddColumn createNewColumn={createNewColumn} />
          </Box>
        </Box>
      </Box>
    </SortableContext>
  )
})

export default ListColumn
