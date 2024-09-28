import { Button, List, ListItemButton, ListItemText, Menu, Typography, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import GroupIcon from '@mui/icons-material/Group'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import AddIcon from '@mui/icons-material/Add'

const listCreate = [
  {
    id: 1,
    pri_text : 'Create board',
    se_text : 'A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.',
    icon: <AssignmentTurnedInIcon fontSize='small' sx={{ color: '#44546f', mr: 0.5 }} />
  },
  {
    id: 2,
    pri_text : 'Start with a template',
    se_text : 'Get started faster with a board template.',
    icon: <DashboardIcon fontSize='small' sx={{ color: '#44546f', mr: 0.5 }} />
  },
  {
    id: 3,
    pri_text : 'Create Workspace',
    se_text : 'A Workspace is a group of boards and people. Use it to organize your company, side hustle, family, or friends.',
    icon: <GroupIcon fontSize='small' sx={{ color: '#44546f', mr: 0.5 }} />
  }
]

function Create() {
  const responsive = useMediaQuery('(min-width: 1281px)')
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
        id='create-btn'
        aria-controls={open ? 'menu-create' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant='contained'
        size='small'
        sx={{
          backgroundColor: 'rgba(255,255,255,0.2)',
          color: 'white',
          minWidth: 'unset',
          padding: responsive ? ' 9.5px 10px' : '6.25px',
          '&:hover' : { backgroundColor: 'rgba(255,255,255,0.4)', boxShadow: 'unset' },
          boxShadow: 'unset'
        }}
      >
        {responsive ? 'Create' : <AddIcon/>}
      </Button>
      <Menu
        id='menu-create'
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
          'aria-labelledby': 'create-btn'
        }}>
        <List>
          {listCreate.map(create => {
            return (
              <ListItemButton key={create.id}>
                <ListItemText
                  sx={{ marginY: 0 }}
                  primary={
                    <Typography sx={{ display: 'flex', alignItems: 'center', paddingBottom: 0.5, pl: 0.5, color: '#172b4d' }}>
                      {create.icon}
                      <Typography variant='span'>{create.pri_text}</Typography>
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ fontSize: '0.75rem', color: '#44546f' }}>{create.se_text}</Typography>
                  }
                />
              </ListItemButton>
            )
          })}
        </List>
      </Menu>
    </>
  )
}

export default Create
