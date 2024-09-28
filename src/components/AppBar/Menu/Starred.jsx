import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import { Box, Button, List, ListItemButton, ListItemIcon, ListItemText, Menu } from '@mui/material'
import { useState } from 'react'

function Starred() {
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
        Starred
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
        <List sx={{ paddingX: 1 }}>
          <ListItemButton sx={{ padding: '0 8px', borderRadius: '8px', mb: 0.5 }}>
            <Box sx={{ width: '40px', height: '32px', borderRadius: '4px', backgroundColor: '#CD5A91' }}></Box>
            <ListItemText sx={{ ml: 1, marginY: 0 }} primary='My workspace 2' secondary='test'/>
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              <StarOutlinedIcon sx={{ color: '#E2B203' }}/>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ padding: '0 8px', borderRadius: '8px', mb: 0.5 }}>
            <Box sx={{ width: '40px', height: '32px', borderRadius: '4px', backgroundColor: '#CD5A91' }}></Box>
            <ListItemText sx={{ ml: 1, marginY: 0 }} primary='My workspace 5' secondary='test'/>
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              <StarOutlinedIcon sx={{ color: '#E2B203' }}/>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ padding: '0 8px', borderRadius: '8px', mb: 0.5 }}>
            <Box sx={{ width: '40px', height: '32px', borderRadius: '4px', backgroundColor: '#CD5A91' }}></Box>
            <ListItemText sx={{ ml: 1, marginY: 0 }} primary='My workspace 8' secondary='test'/>
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              <StarOutlinedIcon sx={{ color: '#E2B203' }}/>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ padding: '0 8px', borderRadius: '8px', mb: 0.5 }}>
            <Box sx={{ width: '40px', height: '32px', borderRadius: '4px', backgroundColor: '#CD5A91' }}></Box>
            <ListItemText sx={{ ml: 1, marginY: 0 }} primary='My workspace 12' secondary='test'/>
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              <StarOutlinedIcon sx={{ color: '#E2B203' }}/>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Menu>
    </>
  )
}

export default Starred
