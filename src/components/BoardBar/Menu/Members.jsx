import { Avatar, AvatarGroup } from '@mui/material'
import myavt5 from '~/assets/myavt5.png'
import myavt3 from '~/assets/myavt3.png'
import sneeze2 from '~/assets/sneeze2.png'

function Members() {
  return (
    <>
      {/* <Box width={36} height={36} borderRadius='50%' display='flex' justifyContent='center' position='relative' alignItems='center' sx={{ '&:hover' : { backgroundColor: 'rgba(255,255,255,0.3)' } }} >
      </Box> */}
      <AvatarGroup max={3} sx={{ gap: '2px', '& .MuiAvatar-root' : { border: '1px solid transparent' }, '& .MuiAvatar-root:hover' : { borderColor: 'rgba(255,255,255,0.4)' }, mr: '2px' }} slotProps={{ additionalAvatar: { sx: { width: '30px', height: '30px', borderColor: 'transparent' } } }} >
        <Avatar src={myavt3} sx={{ width: '30px', height: '30px' }}/>
        <Avatar src={sneeze2} sx={{ width: '30px', height: '30px' }}/>
        <Avatar src={myavt5} sx={{ width: '30px', height: '30px' }}/>
      </AvatarGroup>
    </>
  )
}

export default Members
