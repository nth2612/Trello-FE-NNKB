import { DndContext } from '@dnd-kit/core'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@mui/material'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { mapOrder } from './utils/sorts'

const dataTest = {
  orderIds: ['id-04', 'id-02', 'id-03', 'id-01'],
  column: [
    {
      id: 'id-01',
      title: 'Tieu de 1',
      height: '300px'
    },
    {
      id: 'id-02',
      title: 'Tieu de 2',
      height: '300px'
    },
    {
      id: 'id-03',
      title: 'Tieu de 3',
      height: '300px'
    },
    {
      id: 'id-04',
      title: 'Tieu de 4',
      height: '300px'
    }
  ]
}
const NutBam = (props) => {
  const {isDragging, transform, transition, attributes, listeners, setNodeRef } = useSortable({ id: props.id })
  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  }
  return (
    <Button ref={setNodeRef} style={style} {...attributes} {...listeners} sx={{ color: 'red', bgcolor: '#ccc', m:2, height: props.height }}>{props.title}</Button>
  )
}
const Main = () => {
  const [data, setData] = useState(dataTest)
  return (
    <Testing data={data}/>
  )
}
const Testing = ( { data } ) => {
  const [orderedColumns, setOrderedColumns] = useState([])
  useEffect(() => {
    // setOrderedColumns(mapOrder(data.column, data.orderIds, 'id'))
    setOrderedColumns(data.column)
  }, [data])
  console.log(orderedColumns)
  const itemsSort = data.column.map(c => c.id)
  const handleDragStart = (event) => {
    console.log(event)
  }
  const handleDragEnd = (event) => {
    const { active, over } = event
      // Neu keo linh tinh se khong co gi
      if (!active || !over) return
      // neu vi tri keo va tha khac nhau thi thuc hien logic
      if (active.id !== over.id) {
        const oldIndex = orderedColumns.findIndex(c => c.id === active.id)
        const newIndex = orderedColumns.findIndex(c => c.id === over.id)
        console.log('old:', oldIndex)
        console.log('new:', newIndex)
        const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
        const dndOrderedColumnIds = dndOrderedColumns.map(c => c.id)
        console.log(dndOrderedColumnIds)
        setOrderedColumns(dndOrderedColumns)
      }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <SortableContext items={itemsSort} strategy={horizontalListSortingStrategy}>
          {orderedColumns.map(c =>
            <NutBam key={c.id} id={c.id} title={c.title} height={c.height} />
          )}
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default Main
