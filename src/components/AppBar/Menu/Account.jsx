import Avatar from '@mui/material/Avatar'
import myavt from '~/assets/myavt5.png'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, Typography } from '@mui/material'
import OutputIcon from '@mui/icons-material/Output'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

function Account() {
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
      <Tooltip title="Account">
        <IconButton
          sx={{ '&:hover' : { backgroundColor: '#a6c5e229' } }}
          size="small"
          id='account-btn'
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Avatar sx={{ width: 24, height: 24 }} src={myavt}></Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{
          '& .MuiPaper-root' : { borderRadius: '8px' }
        }}
        id='account-menu'
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
          'aria-labelledby' : 'account-btn'
        }}
      >
        <List subheader={
          <ListSubheader component={'div'} sx={{ color: '#626f86', lineHeight: '36px' }}>ACCOUNT</ListSubheader>
        }>
          <ListItem>
            <Avatar src={myavt} sx={{ width: 40, height: 40, mr: 1 }}></Avatar>
            <ListItemText
              sx={{ my: 0, '& span' : { fontSize: '0.875rem', color: '#172b4d' } }}
              primary='Tuấn Hải'
              secondary={
                <Typography variant='body1' color='#44546f' sx={{ fontSize: '0.75rem' }}>notihuli@gmail.com</Typography>
              }
            />
          </ListItem>
          <ListItemButton sx={{ color: '#172b4d' }} >
            <ListItemText sx={{ my: 0 }} primary='Switch accounts' />
          </ListItemButton>
          <ListItemButton sx={{ color: '#172b4d' }} >
            <ListItemText sx={{ my: 0 }} primary='Manage account' />
            <ListItemIcon sx={{ justifyContent: 'center', color: '#44546f' }}>
              <OutputIcon/>
            </ListItemIcon>
          </ListItemButton>
        </List>
        <Divider sx={{ borderColor: '#091e4224' }} />
        <ListSubheader component={'div'} sx={{ color: '#626f86', fontSize: '11px', lineHeight: '36px' }}>TRELLO</ListSubheader>
        <ListItemButton sx={{ color: '#172b4d' }} >
          <ListItemText sx={{ my: 0 }} primary='Profile and visibility' />
        </ListItemButton>
        <ListItemButton sx={{ color: '#172b4d' }} >
          <ListItemText sx={{ my: 0 }} primary='Activity' />
        </ListItemButton>
        <ListItemButton sx={{ color: '#172b4d' }} >
          <ListItemText sx={{ my: 0 }} primary='Cards' />
        </ListItemButton>
        <ListItemButton sx={{ color: '#172b4d' }} >
          <ListItemText sx={{ my: 0 }} primary='Settings' />
        </ListItemButton>
        <ListItemButton sx={{ color: '#172b4d' }} >
          <ListItemText sx={{ my: 0 }} primary='Theme' />
          <ListItemIcon sx={{ justifyContent: 'center', color: '#44546f' }}>
            <ChevronRightIcon />
          </ListItemIcon>
        </ListItemButton>
        <Divider sx={{ marginY: 1, borderColor: '#091e4224' }}/>
        <ListItemButton sx={{ color: '#172b4d' }} >
          <ListItemText sx={{ my: 0 }} primary='Help' />
        </ListItemButton>
        <ListItemButton sx={{ color: '#172b4d' }} >
          <ListItemText sx={{ my: 0 }} primary='Shortcuts' />
        </ListItemButton>
        <Divider sx={{ marginY: 1, borderColor: '#091e4224' }}/>
        <ListItemButton sx={{ color: '#172b4d' }} >
          <ListItemText sx={{ my: 0 }} primary='Log out' />
        </ListItemButton>
      </Menu>
    </>
  )
}

export default Account
