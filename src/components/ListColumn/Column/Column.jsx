import { Box, Button, IconButton } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useEffect, useRef, useState, memo } from 'react'
import CopyAllIcon from '@mui/icons-material/CopyAll'
import AddIcon from '@mui/icons-material/Add'
import { calHeight } from '~/utils/calculatorHeight'
import ListCard from './ListCard/ListCard'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const Column = memo(function Column({ column, cards, cardOrderIds, boardBarHeight }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: column?._id,
    data: { ...column }
  })
  const textareaRef = useRef(null)
  // const headerRef = useRef(null)
  const h2Ref = useRef(0)
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [editText, setEditText] = useState(false)
  const [initText, setInitText] = useState(column?.title)
  const [h2Height, setH2Height] = useState(0)
  const [headerHeight, setHeaderHeight] = useState(0)
  const handleClickH2 = (event) => {
    event.stopPropagation()
    setEditText(true)
    setH2Height(h2Ref.current.offsetHeight)
  }
  const handleChangeEditText = (e) => {
    setInitText(e.target.value)
  }
  const handleBlur = () => {
    setEditText(false)
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setEditText(false)
    }
  }
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.select()
      setHeaderHeight(calHeight('.head-card'))
    }
  }, [editText])
  // useEffect(() => {
  //   if (h2Ref.current) {
  //     console.log(h2Ref.current)
  //   }
  // }, [initText])
  return (
    <Box
      sx={{
        paddingX: '6px',
        flexShrink: 0,
        height: '100%',
        transform: CSS.Translate.toString(transform),
        transition: isDragging ? 'none' : 'transform 250ms ease',
        zIndex: isDragging ? '999' : undefined,
        rotate: isDragging ? '5deg' : undefined,
        opacity: isDragging ? '0.7' : undefined
      }}>
      <Box ref={setNodeRef} {...attributes} sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '272px',
        pb: '8px',
        borderRadius: '12px',
        maxHeight: '100%',
        bgcolor: '#f1f2f4',
        boxShadow: '0px 1px 1px #091E4240, 0px 0px 1px #091E424F'
      }}
      >
        <Box className='head-card' {...listeners} sx={{ padding: '8px 8px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }} >
          <Box sx={{ flex: 1 }} >
            <h2 ref={h2Ref} onClick={handleClickH2} style={{ display: editText ? 'none' : 'block', letterSpacing: 'normal', color: '#172b4d', fontSize: '14px', padding: '6px 8px 6px 12px', cursor: 'pointer', fontWeight: '500', lineHeight: '20px', overflowWrap: 'anywhere' }}>{initText}</h2>
            <textarea
              style={{ height: `${h2Height}px`, display: editText ? 'block' : 'none' }}
              ref={textareaRef}
              onChange={handleChangeEditText}
              onKeyDown={handleKeyDown}
              onMouseDown={(event) => event.stopPropagation()}
              name='' id=''
              autoFocus
              onBlur={handleBlur}
              value={initText} >
            </textarea>
          </Box>
          <IconButton sx={{ borderRadius: '8px', flexShrink: 0, padding: '6px', '&:hover' : { bgcolor: '#091e4224' }, '&:hover .MuiSvgIcon-root' : { color: '#44546f' } }} >
            <MoreHorizIcon sx={{ color: '#626f86' }} fontSize='small' />
          </IconButton>
        </Box>
        <Box sx={{ display: cards?.length !== 0 ? 'block' : 'none', height: '8px', mb: '-2px' }} ></Box>
        {/* List Card */}
        <ListCard
          headerHeight={headerHeight}
          cards={cards}
          cardOrderIds={cardOrderIds}
          boardBarHeight={boardBarHeight}
          isAddingCard={isAddingCard}
          setIsAddingCard={setIsAddingCard} />
        {!isAddingCard &&
        <Box sx={{ padding: '8px 8px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', columnGap: '4px' }} >
          <Button onClick={() => setIsAddingCard(true)} startIcon={<AddIcon/>} sx={{ color: '#44546f', borderRadius: '8px', justifyContent: 'flex-start', lineHeight: 1, '&:hover' : { bgcolor: '#091e4224', color: '#172b4d' } }} fullWidth >Add a card</Button>
          <IconButton sx={{ borderRadius: '8px', '&:hover' : { bgcolor: '#091e4224', color: '#172b4d' } }} >
            <CopyAllIcon sx={{ fontSize: '16px' }} />
          </IconButton>
        </Box>
        }
      </Box>
    </Box>
  )
})

export default Column
