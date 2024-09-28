import { Box, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { memo, useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const AddCard = memo(function AddACard({ isAddingCard, setIsAddingCard, setRawCard, setCardOrder }) {
  const textareaRef = useRef(null)
  const formRef = useRef(null)
  const [openInputCard, setOpenInputCard] = useState(false)
  const [nameCard, setNameCard] = useState('')
  useEffect(() => {
    setOpenInputCard(true)
  }, [])
  useEffect(() => {
    const handleBlurForm = (event) => {
      if (formRef.current) {
        const clickedInside = formRef.current.contains(event.target)
        if (!clickedInside && openInputCard) {
          setOpenInputCard(false)
          setIsAddingCard(false)
        }
      }
    }
    if (isAddingCard) {
      document.addEventListener('click', handleBlurForm)
    }
    return () => {
      if (!isAddingCard) {
        document.removeEventListener('click', handleBlurForm)
      }
    }
  }, [isAddingCard, openInputCard, setIsAddingCard])
  // Nhấn vào input
  const handleClickTextarea = (event) => {
    event.stopPropagation()
    textareaRef.current.focus()
  }
  const blurTextarea = () => {
    textareaRef.current.blur()
  }
  // Button X
  const hideTextarea = (event) => {
    event.stopPropagation()
    setNameCard('')
    setIsAddingCard(false)
    setOpenInputCard(false)
  }
  const addNewColumnByButton = (event) => {
    event.stopPropagation()
    addNewCard()
  }
  const addNewCard = () => {
    if (nameCard !== '') {
      setRawCard(prev => {
        const newCard = {
          _id : uuidv4(),
          boardId: 'board-id-02',
          columnId: '',
          title: nameCard,
          memberIds: []
        }
        setCardOrder(prev => [...prev, newCard._id])
        setNameCard('')
        textareaRef.current.focus()
        return [...prev, newCard]
      })
    }
  }
  const handleChange = (input) => {
    setNameCard(input.target.value)
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault() // Ngăn điền thêm enter
      addNewCard()
    }
  }
  return (
    <form ref={formRef} onClick={blurTextarea}
      // style={{ borderRadius: '12px', backgroundColor: '#f1f2f4' }}
    >
      <textarea value={nameCard} ref={textareaRef} autoFocus placeholder='Enter a title for this card...' style={{ height: '56px', fontWeight: 'unset', borderRadius: '8px', boxShadow:  '0px 1px 1px #091e4240, 0px 0px 1px #091e424f' }}
        onClick={handleClickTextarea}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      ></textarea>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '4px', mt: '8px' }} >
        <Button onClick={addNewColumnByButton} sx={{ bgcolor: '#0c66e4', color: '#fff', fontSize: '14px', p: '6px 12px', lineHeight: '20px', '&:hover' : { bgcolor: '#0055cc' } }} >Add card</Button>
        <IconButton onClick={hideTextarea} sx={{ padding: '6px', borderRadius: '3px', color: '#172b4d', '&:hover' : { bgcolor: '#091e4224' } }} >
          <CloseIcon fontSize='small' />
        </IconButton>
      </Box>
    </form>
  )
})

export default AddCard
