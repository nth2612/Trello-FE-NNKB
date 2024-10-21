/* eslint-disable no-console */
import avt from '~/images/myavt5.png'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, CircularProgress } from '@mui/material'
import { fetchAllBoardsAPI, logoutAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const UserPage = () => {
  const [listBoards, setListBoards] = useState(null)
  const navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  useEffect(() => {
    fetchAllBoardsAPI(userInfo.id).then((boardsResponse) => {
      setListBoards(boardsResponse)
    }).then(() => console.log('Use Effect lai duoc goi ne'))
  }, [userInfo.id])
  const handleLogout = async () => {
    const response = await logoutAPI()
    toast.success(response.data.message)
    navigate('/login')
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
        <button>
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
    </div>
  )
}

export default UserPage
