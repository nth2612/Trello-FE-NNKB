import { Button, List, ListItemButton, ListItemText, ListSubheader, Menu, Tooltip, Typography } from '@mui/material'
import BoltIcon from '@mui/icons-material/Bolt'
import { useState } from 'react'
import TuneIcon from '@mui/icons-material/Tune'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined'

const listAutomation = [
  {
    id: 1,
    pri_text : 'Rules',
    se_text : 'Create rules that automatically respond to actions, schedules, or a card\'s due date.',
    icon: <TuneIcon sx={{ color: '#44546f', mr: 1, fontSize: '1rem' }} />
  },
  {
    id: 2,
    pri_text : 'Buttons',
    se_text : 'Create rules that automatically respond to actions, schedules, or a card\'s due date.',
    icon: <SpaceDashboardIcon sx={{ color: '#44546f', mr: 1, fontSize: '1rem' }} />
  },
  {
    id: 3,
    pri_text : 'Email reports',
    se_text : 'Set up email reports, such as a weekly summary of all cards that are due within 7 days',
    icon: <MailOutlineIcon sx={{ color: '#44546f', mr: 1, fontSize: '1rem' }} />
  },
  {
    id: 4,
    pri_text : 'Send feedback',
    se_text : 'Help us improve your automations.',
    icon: <CampaignOutlinedIcon sx={{ color: '#44546f', mr: 1, fontSize: '1rem' }} />
  }
]

function Automation({ hideText }) {
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
      <Tooltip title='Automation'>
        <Button
          id='btn-automation'
          aria-controls={open ? 'menu-automation' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ lineHeight: 1, color: '#fff', minWidth: 'unset', '& .MuiSvgIcon-root': { fontSize: '20px' }, '& .MuiButton-startIcon' : { margin: !hideText ? '0': '0 4px' }, paddingY: !hideText ? '6px' : undefined }}
          startIcon={<BoltIcon/>}>
          {hideText && <span>Automation</span>}
        </Button>
      </Tooltip>
      <Menu
        id='menu-automation'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'btn-automation'
        }}
      >
        <List sx={{ padding: 0 }} >
          <ListSubheader sx={{ textAlign: 'center', color: '#44546f', fontSize: '0.875rem', fontWeight: '500', lineHeight: '38px' }}>Automation</ListSubheader>
          {listAutomation.map(auto => {
            return (
              <ListItemButton key={auto.id} sx={{ padding: '6px 12px' }} >
                <ListItemText
                  sx={{ marginY: 0 }}
                  primary={
                    <Typography sx={{ display: 'flex', alignItems: 'center', paddingBottom: 0.5, pl: 0.5, color: '#172b4d' }}>
                      {auto.icon}
                      <Typography variant='span'>{auto.pri_text}</Typography>
                    </Typography>
                  }
                  secondary={
                    <Typography sx={{ fontSize: '0.75rem', color: '#44546f' }}>{auto.se_text}</Typography>
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

export default Automation
