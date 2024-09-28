import { Box, Drawer, useMediaQuery } from '@mui/material'
import AppBar from './components/AppBar/AppBar'
import BoardBar from './components/BoardBar/BoardBar'
import ExpandLeft from './components/ExpandLeft/ExpandLeft'
import { memo, useEffect, useRef, useState } from 'react'
import BoardMenu from './components/BoardMenu/BoardMenu'
import { mockData } from './apis/mock-data'
import ListColumn from './components/ListColumn/ListColumn'
import { closestCenter, DndContext, useSensors, useSensor, MouseSensor, TouchSensor } from '@dnd-kit/core'

const App = memo(function App() {
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
  const sensors = useSensors(mouseSensor, touchSensor)
  const [columnIds, setColumnIds] = useState(mockData.board.columnOrderIds)
  const boardBarRef = useRef(null)
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
    if (boardBarRef.current) {
      setBoardBarHeight(boardBarRef.current.offsetHeight)
    }
  }, [boardBarHeight])
  const handleDragEnd = (event) => {
    const { active, over } = event
    const oldIndex = columnIds.indexOf(active.id)
    const newIndex = columnIds.indexOf(over.id)
    const newColumnIds = [...columnIds]
    newColumnIds.splice(oldIndex, 1)
    newColumnIds.splice(newIndex, 0, active.id)
    setColumnIds(newColumnIds)
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
              <ListColumn boardBarHeight={boardBarHeight} columnIds={columnIds} />
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
})

export default App
