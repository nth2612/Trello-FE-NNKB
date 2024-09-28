import { Box, Button, Divider, ListItem, Menu, Tooltip, Typography } from '@mui/material'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'

const Android12Switch = styled(Switch)(() => ({
  padding: 8,
  '& .MuiButtonBase-root.Mui-checked + .MuiSwitch-track' : { backgroundColor: '#1f845a', opacity: 1 },
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    backgroundColor: '#44546f',
    opacity: 1,
    '&::before, &::after': {
      // content: '""',
      color: 'white',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16
    },
    '&::before': {
      content : '"\\2714"',
      left: 12,
      top: 15
    },
    '&::after': {
      content : '"\\00D7"',
      right: 8,
      top: 10,
      fontSize: '22px'
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2
  }
}))

function Notification() {
  const [showUnread, setShowUnread] = useState(true)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Tooltip title='Notifications'>
        <IconButton
          id='notification-btn'
          aria-controls={open ? 'notification-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          size="small"
          sx={{ '&:hover' : { backgroundColor: '#a6c5e229' }
          }}>
          <NotificationsOutlinedIcon sx={{ color: 'white' }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{
          '& .MuiPaper-root' : { width: '432px' }
          // '& > .MuiPaper-root > .MuiList-root' : { padding: '0 12px' }
        }}
        id='notification-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              top: (theme) => theme.trello.importantHeightAppBar
            }
          }
        }}
        MenuListProps={{
          'aria-labelledby' : 'notification-btn'
        }}
      >
        <ListItem sx={{ display: 'block' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h2' sx={{ fontSize: '20px', fontWeight: '500', color: '#172b4d' }}>Notifications</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ color: '#626f86', fontSize: '12px', textAlign: 'right' }} >Only show unread</Typography>
              <Android12Switch checked={showUnread} onChange={() => setShowUnread(!showUnread)} />
              <Button sx={{ width: '30px', height: '30px', minWidth: 'unset', color: 'unset', '&:hover' : { backgroundColor: '#091e4224' } }} >
                <MoreVertIcon sx={{ color: '#172b4d' }} />
              </Button>
            </Box>
          </Box>
        </ListItem>
        <Divider variant='middle' />
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', paddingY: '70px' }}>
          <img style={{ marginBottom: '32px', display: 'block' }} src="https://trello.com/assets/ee2660df9335718b1a80.svg" alt="img" />
          <Typography variant='span' color='#172b4d' fontSize='20px'>{showUnread ? 'No unread notifications' : 'No notifications'}</Typography>
        </Box>
      </Menu>
    </>
  )
}

export default Notification
