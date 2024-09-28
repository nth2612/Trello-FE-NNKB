import AddIcon from '@mui/icons-material/Add'
import { Box, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function AddColumn({ setRawColumn, columnOrderIds }) {
  const textareaRef = useRef(null)
  const formRef = useRef(null)
  const [openInput, setOpenInput] = useState(false)
  const [nameColumn, setNameColumn] = useState('')
  useEffect(() => {
    const handleBlurForm = (event) => {
      if (formRef.current) {
        const clickedOutside = formRef.current.contains(event.target)
        if (!clickedOutside) {
          setOpenInput(false)
        }
      }
    }
    if (openInput) {
      document.addEventListener('click', handleBlurForm)
    }
    return () => {
      if (openInput) {
        document.removeEventListener('click', handleBlurForm)
      }
    }
  }, [openInput])
  const handleClickTextarea = (event) => {
    event.stopPropagation()
    textareaRef.current.focus()
  }
  const blurTextarea = () => {
    textareaRef.current.blur()
  }
  const hideTextarea = (event) => {
    event.stopPropagation()
    setNameColumn('')
    setOpenInput(false)
  }
  const addNewColumnByButton = (event) => {
    event.stopPropagation()
    addNewColumn()
  }
  const addNewColumn = () => {
    if (nameColumn !== '') {
      setRawColumn(prev => {
        const newColumn = {
          _id : uuidv4(),
          boardId: 'board-id-02',
          title: nameColumn,
          cardOrderIds: [],
          card: []
        }
        columnOrderIds.push(newColumn._id)
        setNameColumn('')
        textareaRef.current.focus()
        return [...prev, newColumn]
      })
    }
  }
  const handleChange = (input) => {
    setNameColumn(input.target.value)
  }
  const openAddColumn = (event) => {
    event.stopPropagation()
    setOpenInput(true)
  }
  const handleKeyDown = (event) => {
    // alert(event)
    if (event.key === 'Enter' || event.nativeEvent.key === 'Enter') {
      event.preventDefault() // Ngăn điền thêm enter
      addNewColumn()
    }
  }
  return (
    <Box sx={{ paddingX: '6px', flexShrink: 0, height: '100%' }} >
      {openInput ?
        <form ref={formRef} onClick={blurTextarea} style={{ width: '272px', borderRadius: '12px', padding: '8px', backgroundColor: '#f1f2f4' }} >
          <textarea value={nameColumn} ref={textareaRef} autoFocus placeholder='Enter list title..' style={{ height: '32px', borderRadius: '4px' }}
            onClick={handleClickTextarea}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          ></textarea>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '4px', mt: '8px' }} >
            <Button onClick={addNewColumnByButton} sx={{ bgcolor: '#0c66e4', color: '#fff', fontSize: '14px', p: '6px 12px', lineHeight: '20px', '&:hover' : { bgcolor: '#0055cc' } }} >Add list</Button>
            <IconButton onClick={hideTextarea} sx={{ padding: '6px', borderRadius: '3px', color: '#172b4d', '&:hover' : { bgcolor: '#091e4224' } }} >
              <CloseIcon fontSize='small' />
            </IconButton>
          </Box>
        </form>
        : <Button
          startIcon={<AddIcon />}
          onClick={openAddColumn}
          sx={{
            width: '272px',
            justifyContent: 'flex-start',
            padding: '12px',
            bgcolor: '#ffffff3d',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '14px',
            '& .MuiButton-startIcon' : { ml: 0 },
            '&:hover' : { bgcolor: '#a6c5e229' }
          }} >Add another list</Button>
      }
    </Box>
  )
}

export default AddColumn
