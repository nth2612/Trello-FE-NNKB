/* eslint-disable no-console */
import avt from '~/images/myavt5.png'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, CircularProgress, Modal } from '@mui/material'
import { createNewBoardAPI, fetchAllBoardsAPI, logoutAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useForm } from 'react-hook-form'

const UserPage = () => {
  const { register, handleSubmit } = useForm()
  const [listBoards, setListBoards] = useState(null)
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  useEffect(() => {
    fetchAllBoardsAPI(userInfo.id).then((boardsResponse) => {
      setListBoards(boardsResponse)
    }).then(() => console.log('Use Effect lai duoc goi ne'))
  }, [userInfo.id])
  const handleLogout = async () => {
    logoutAPI().then(res => {
      toast.success(res.data.message)
    })
    navigate('/login')
  }
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const submitCreateBoard = async (data) => {
    createNewBoardAPI(data).then(res => {
      navigate(`/board/${res.data._id}`)
    })
  }
  if (!listBoards) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', flexDirection: 'column' }}>
        <CircularProgress size={50} color='info' />
        <h1 className='mb-3'>Loading boards...</h1>
      </Box>
    )
  }
  return (
    <div className='max-w-[600px] mx-auto'>
      <div className='flex justify-center items-center pt-5' >
        <div className='rounded-full overflow-hidden aspect-square w-40'>
          <img src={avt} alt="" />
        </div>
        <div className='pl-5' >
          <p>Username: <b>{userInfo.username}</b></p>
          <p>Email: <b>{userInfo.email}</b></p>
          <Button
            variant='contained'
            color='error'
            sx={{ py: '10px', mt: '4px', '&:hover': { bgcolor: '#b80c0c' } }}
            onClick={handleLogout}>Log out</Button>
        </div>
      </div>
      <div className='py-4 flex justify-between items-center'>
        <div>
          <DashboardIcon fontSize='large' sx={{ mt: '-4px' }} />
          <span className='ml-2 text-xl'>Your workspaces:</span>
        </div>
        <button onClick={handleOpen} >
          <AddIcon fontSize='medium' sx={{ mt: '-4px' }} />
          <span>Create new board</span>
        </button>
      </div>
      <div className='space-y-2'>
        {listBoards && listBoards.length > 0 ? (
          listBoards.map((board, index) => (
            <div key={index} className='w-full h-20 bg-green-500 hover:bg-green-600'>
              <a href={`/board/${board._id}`} className='block h-full'>
                <p className='font-extrabold text-white'>{board.title}</p>
                <p className='text-white'>{board.description}</p>
              </a>
            </div>
          ))
        ) : (
          <p className='text-center'>No board found!. Please create a new board</p>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-addboard-title"
        aria-describedby="modal-addboard-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '400px',
            // height: '800px',
            bgcolor: 'white',
            borderRadius: '8px',
            padding: '12px'
          }}>
          <div className='relative'>
            <h1 className='text-center text-lg'>Create new board</h1>
            <Button onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0, justifyContent: 'flex-end' }} endIcon={<CloseIcon fontSize='large' color='action' />}/>
          </div>
          <div>
            <form onSubmit={handleSubmit(submitCreateBoard)}>
              <label className='block' htmlFor="title-board-create">Title*</label>
              <input
                className='outline-none border w-full px-4 py-2 rounded mt-1 mb-3'
                type="text"
                placeholder='Enter title...'
                name='title-board-create'
                {...register('title')} />
              <label className='block' htmlFor="title-board-desc">Description*</label>
              <input
                className='outline-none border w-full px-4 py-2 rounded mt-1 mb-3'
                type="text"
                placeholder='Enter description...'
                name='title-board-desc'
                {...register('description')} />
              <button type='submit' className='w-full p-2 bg-[#0c66e4] text-white rounded'>Create</button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default UserPage
