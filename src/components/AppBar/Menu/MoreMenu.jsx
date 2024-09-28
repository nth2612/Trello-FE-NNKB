import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button, List, ListItemButton, ListItemIcon, Menu, Typography } from '@mui/material'
import { useState } from 'react'

function MoreMenu({ hideWS, hideR, hideS, hideT }) {
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
        sx={{ color: '#fff' }}
      >
        More
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
        <List>
          <ListItemButton sx={{ display: hideWS ? 'none' : 'flex', justifyContent: 'space-between', py: '4px', pr: '6px', '&:hover' : { bgcolor: '#091e4224' } }}>
            <Typography sx={{ fontWeight: '500', color: '#44546f' }} >Workspaces</Typography>
            <ListItemIcon sx={{ justifyContent: 'center', minWidth: 'unset', color: '#091e42' }}>
              <ChevronRightRoundedIcon/>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ display: hideR ? 'none' : 'flex', justifyContent: 'space-between', py: '4px', pr: '6px', '&:hover' : { bgcolor: '#091e4224' } }}>
            <Typography sx={{ fontWeight: '500', color: '#44546f' }} >Recent boards</Typography>
            <ListItemIcon sx={{ justifyContent: 'center', minWidth: 'unset', color: '#091e42' }}>
              <ChevronRightRoundedIcon/>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ display: hideS ? 'none' : 'flex', justifyContent: 'space-between', py: '4px', pr: '6px', '&:hover' : { bgcolor: '#091e4224' } }}>
            <Typography sx={{ fontWeight: '500', color: '#44546f' }} >Starred boards</Typography>
            <ListItemIcon sx={{ justifyContent: 'center', minWidth: 'unset', color: '#091e42' }}>
              <ChevronRightRoundedIcon/>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ display: hideT ? 'none' : 'flex', justifyContent: 'space-between', py: '4px', pr: '6px', '&:hover' : { bgcolor: '#091e4224' } }}>
            <Typography sx={{ fontWeight: '500', color: '#44546f' }} >Templates</Typography>
            <ListItemIcon sx={{ justifyContent: 'center', minWidth: 'unset', color: '#091e42' }}>
              <ChevronRightRoundedIcon/>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Menu>
    </>
  )
}

export default MoreMenu
