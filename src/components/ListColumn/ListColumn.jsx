import { Box } from '@mui/material'
import Column from './Column/Column'
import { mockData } from '~/apis/mock-data.js'
import AddColumn from '../AddColumn/AddColumn'
import { memo, useState } from 'react'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'

const ListColumn = memo(function ListColumn({ boardBarHeight, columnIds, orderedColumns }) {
  const [rawColumn, setRawColumn] = useState(mockData.board?.columns)
  // const orderedColumns = columnIds.map(id => rawColumn.find(column => column._id === id))
  return (
    // items can nhan list id chu k phai object
    <SortableContext items={mockData.board.columns.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{ mt: '12px', flexGrow: 1 }} >
        <Box sx={{ height: '100%' }} >
          <Box sx={{ padding: '2px 6px 8px', height: '100%', display: 'flex', flexDirection: 'row' }} >
            {/* Column */}
            {orderedColumns.map(col => <Column key={col._id} column={col} cards={col?.card} cardOrderIds={col?.cardOrderIds} boardBarHeight={boardBarHeight} />)}
            <AddColumn setRawColumn={setRawColumn} columnOrderIds={columnIds} />
          </Box>
        </Box>
      </Box>
    </SortableContext>
  )
})

export default ListColumn
