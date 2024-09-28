import { Box, Button, List, ListItemButton, ListItemIcon, ListItemText, Menu } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'

function Recent() {
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
        id='recent-btn'
        aria-controls={open ? 'menu-recent' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Recent
      </Button>
      <Menu
        sx={{
          '& > .MuiPaper-root > .MuiList-root' : {
            padding: 0
          }
        }}
        id='menu-recent'
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
          'aria-labelledby': 'recent-btn'
        }}>
        <List sx={{ paddingX: 1 }}>
          <ListItemButton sx={{ padding: '0 8px', borderRadius: '8px', mb: 0.5 }}>
            <Box sx={{ width: '40px', height: '32px', borderRadius: '4px', backgroundColor: '#0079BF' }}></Box>
            <ListItemText sx={{ ml: 1, marginY: 0 }} primary='My workspace 1' secondary='test'/>
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              <StarOutlineIcon/>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ padding: '0 8px', borderRadius: '8px', mb: 0.5 }}>
            <Box sx={{ width: '40px', height: '32px', borderRadius: '4px', backgroundColor: '#CD5A91' }}></Box>
            <ListItemText sx={{ ml: 1, marginY: 0 }} primary='My workspace 2' secondary='test'/>
            <ListItemIcon sx={{ justifyContent: 'center' }}>
              <StarOutlinedIcon sx={{ color: '#E2B203' }}/>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Menu>
    </>
  )
}

export default Recent
