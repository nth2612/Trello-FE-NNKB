import { Box, CircularProgress } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { confirmInviteAPI } from '~/apis'

const ConfirmPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const inviteId = searchParams.get('inviteId')
  console.log('I got render before do logic')
  // useEffect(() => {
  confirmInviteAPI(inviteId).then((res) => {
    toast.success('Join board successfully')
    navigate(`/board/${res.data.boardId}`)
  })
  // }, [inviteId, navigate])
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', flexDirection: 'column' }}>
      <h1 className='mb-3'>Confirming...</h1>
      <CircularProgress size={90} color='info' />
    </Box>
  )
}

export default ConfirmPage
