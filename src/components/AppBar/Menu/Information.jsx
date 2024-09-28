import { Divider, Link, List, ListItem, ListItemButton, ListItemText, Menu, Tooltip, Typography } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'

const listAnchor = [
  {
    id: 1,
    text_an: 'Pricing'
  },
  {
    id: 2,
    text_an: 'Apps'
  },
  {
    id: 3,
    text_an: 'Blog'
  },
  {
    id: 4,
    text_an: 'Privacy'
  },
  {
    id: 5,
    text_an: 'Notice at Collection'
  },
  {
    id: 6,
    text_an: 'More...'
  }
]

const listInfo = [
  {
    id: 1,
    text_info : 'It\'s easy to get your team up and running with Trello playbooks',
    imgSrc : 'https://trello.com/assets/77d4b431a528da2dd7c6.png'
  },
  {
    id: 2,
    text_info : 'Make boards more powerful with Trello Power-Ups',
    imgSrc : 'https://trello.com/assets/a6ef15e44916d8461c20.png'
  },
  {
    id: 3,
    text_info : 'New to Trello? Check out the guide',
    imgSrc : 'https://trello.com/assets/a9b33a5d268cc03a1305.png'
  },
  {
    id: 4,
    text_info : 'Get inspired by dozens of different Trello workflows',
    imgSrc : 'https://trello.com/assets/3e2ea266f7e19b3e13a9.png'
  }
]

function Information() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [ranNum, setRanNum] = useState(1)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setRanNum(Math.floor(Math.random() * 4))
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Tooltip title='Information'>
        <IconButton
          id='information-btn'
          aria-controls={open ? 'information-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          size="small"
          sx={{ '&:hover' : { backgroundColor: '#a6c5e229' }
          }}>
          <HelpOutlineIcon sx={{ color: 'white' }} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{
          '& > .MuiPaper-root > .MuiList-root' : { padding: '0 12px' }
        }}
        id='information-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              top: (theme) => theme.trello.importantHeightAppBar,
              width: '384px',
              padding: 1.5
            }
          }
        }}
        MenuListProps={{
          'aria-labelledby' : 'information-btn'
        }}
      >
        <List sx={{ padding: 0 }} >
          {ranNum !== '0' &&
          <>
            <img src={listInfo[ranNum].imgSrc} style={{ maxWidth: '100%', width: '100%', borderRadius: '3px', display: 'block' }} />
            <ListItemButton>
              <ListItemText sx={{ textAlign: 'center', m: 0, fontWeight: '500' }} primary={
                <Typography variant='span' fontSize='1rem' color='#172b4d'>{listInfo[ranNum].text_info}</Typography>
              } />
            </ListItemButton>
          </>
          }
          <ListItemText sx={{ textAlign: 'center', marginY: 1 }} primary={
            <Link href='/' color='#0c66e4' underline='hover'>Get a new tip.</Link>
          }/>
          <Divider/>
          <List sx={{ textAlign: 'center', paddingBottom: 0 }}>
            {listAnchor.map(an => (
              <ListItem
                key={an.id}
                sx={{
                  display: 'inline-block',
                  width: 'unset',
                  borderRadius: '3px',
                  padding: '6px 8px',
                  color: '#44546f',
                  fontSize: '0.875rem',
                  margin: '0px 1px 2px',
                  '&:hover' : { backgroundColor: '#091E4224', cursor: 'pointer' }
                }}>
                {an.text_an}
              </ListItem>
            ))}
          </List>
        </List>
      </Menu>
    </>
  )
}

export default Information
