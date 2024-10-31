import { Box, IconButton, Modal, TextField } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { memo, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const TrelloCard = memo(function TrelloCard({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card?._id,
    data: { ...card }
  })
  const [open, setOpen] = useState(false)
  const [newCardName, setNewCardName] = useState(card?.title)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const dndkitCardStyles = {
    // touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? '0.7' : undefined
  }
  const handleRename = (e) => {
    setNewCardName(e.target.value)
  }
  return (
    <Box
      style={dndkitCardStyles}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        bgcolor: '#fff',
        borderRadius: '8px',
        cursor: 'pointer',
        outline: 'none',
        // display: card?.FE_PlaceholderCard ? 'none' : 'block',
        height: card?.FE_PlaceholderCard ? '0px' : 'unset',
        overflow: card?.FE_PlaceholderCard ? 'hidden' : 'unset',
        // visibility: card?.FE_PlaceholderCard ? 'hidden' : undefined,
        // transform: CSS.Translate.toString(transform),
        // transition: isDragging ? 'none' : 'transform 250ms ease',
        // zIndex: isDragging ? '999' : undefined,
        boxShadow:  '0px 1px 1px #091e4240, 0px 0px 1px #091e424f',
        '&:hover, &:focus-within' : { outline: '2px solid #388bff' },
        '&:hover .MuiIconButton-root' : { display: 'inline-flex' }
      }}>
      <Box sx={{ minHeight: '36px', padding: '8px 12px 4px', position: 'relative' }} >
        <Box sx={{ color: '#172b4d', fontSize: '14px' }} >
          {card?.title}
        </Box>
        <IconButton onClick={handleOpen} sx={{ display: 'none', position: 'absolute', width: '32px', height: '32px', top: '2px', right: '2px', bgcolor: '#fff', '&:hover': { bgcolor: '#f1f2f4' } }} >
          <EditOutlinedIcon sx={{ fontSize: '16px' }} />
        </IconButton>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-edit-card"
      >
        <Box
          id='modal-edit-card'
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '400px',
            bgcolor: 'white',
            borderRadius: '8px',
            padding: '12px'
          }}>
          <TextField value={newCardName} onChange={handleRename} />
        </Box>
      </Modal>
    </Box>
  )
})

export default TrelloCard
