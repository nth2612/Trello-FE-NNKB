import { Avatar, Button, Divider, List, ListItemAvatar, ListItemButton, ListItemText, ListSubheader, Menu } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import myavt3 from '~/assets/myavt3.png'

function Workspaces() {
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
      <Button
        endIcon={<ExpandMoreIcon/>}
        id='workspace-btn'
        aria-controls={open ? 'menu-workspace' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Workspaces
      </Button>
      <Menu
        sx={{
          '& .MuiPaper-root' : {
            borderRadius: '8px'
          },
          '& > .MuiPaper-root > .MuiList-root' : {
            padding: 0
          }
        }}
        id='menu-workspace'
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
          'aria-labelledby': 'workspace-btn'
        }}>
        <List sx={{ fontSize: '0.75rem' }}
          subheader={
            <ListSubheader component="div">
              Current Workspace
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemAvatar>
              <Avatar sx={{ borderRadius: '4px' }} src={myavt3}></Avatar>
            </ListItemAvatar>
            <ListItemText disableTypography>My workspace 1</ListItemText>
          </ListItemButton>
        </List>
        <Divider/>
        <List
          subheader={
            <ListSubheader component="div">
              Your Workspaces
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemAvatar id='hihi'>
              <Avatar sx={{ borderRadius: '4px' }} src={myavt3}></Avatar>
            </ListItemAvatar>
            <ListItemText disableTypography>My workspace 1</ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar sx={{ borderRadius: '4px' }} src={myavt3}></Avatar>
            </ListItemAvatar>
            <ListItemText disableTypography>My workspace 2</ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar sx={{ borderRadius: '4px' }} src={myavt3}></Avatar>
            </ListItemAvatar>
            <ListItemText disableTypography>My workspace 3</ListItemText>
          </ListItemButton>
        </List>
      </Menu>
    </>
  )
}

export default Workspaces
