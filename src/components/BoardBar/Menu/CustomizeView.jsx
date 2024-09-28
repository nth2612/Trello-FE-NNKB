import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import PlaceIcon from '@mui/icons-material/Place'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import TableRowsIcon from '@mui/icons-material/TableRows'
import ViewTimelineOutlinedIcon from '@mui/icons-material/ViewTimelineOutlined'
import { Box, Button, Link, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, Tooltip, Typography } from '@mui/material'
import { useState } from 'react'

const listViews = [
  {
    id: 1,
    icon: <DashboardOutlinedIcon fontSize='16px' sx={{ color: '#44546f' }}/>,
    nameView: 'Board',
    disabled: false
  },
  {
    id: 2,
    icon: <TableRowsIcon fontSize='16px' sx={{ color: '#44546f' }}/>,
    nameView: 'Table',
    disabled: true
  },
  {
    id: 3,
    icon: <CalendarMonthIcon fontSize='16px' sx={{ color: '#44546f' }}/>,
    nameView: 'Calendar',
    disabled: true
  },
  {
    id: 4,
    icon: <ViewTimelineOutlinedIcon fontSize='16px' sx={{ color: '#44546f' }}/>,
    nameView: 'Timeline',
    disabled: true
  },
  {
    id: 5,
    icon: <SignalCellularAltIcon fontSize='16px' sx={{ color: '#44546f' }}/>,
    nameView: 'Dashboard',
    disabled: true
  },
  {
    id: 6,
    icon: <PlaceIcon fontSize='16px' sx={{ color: '#44546f' }}/>,
    nameView: 'Map',
    disabled: true
  }
]

function CustomizeView({ combine }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [alignmentt, setAlignment] = useState(false)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAlignment(true)
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAlignment(false)
    setAnchorEl(null)
  }
  return (
    <>
      <Tooltip title='Customize views'>
        <Button
          sx={{ minWidth: 'unset', lineHeight: '1', backgroundColor: alignmentt ? '#dcdfe4' : 'transparent', color: alignmentt ? '#44546f' : '#fff', p: '4px' }}
          id='btn-customize-views'
          aria-controls={open ? 'menu-customize-views' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          { !combine && (
            <>
              <DashboardOutlinedIcon fontSize='small' sx={{ mr: '4px' }} />
              <span>Board</span>
            </>)}
          <KeyboardArrowDownRoundedIcon />
        </Button>
      </Tooltip>
      <Menu
        id='menu-customize-views'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'btn-customize-views'
        }}
      >
        <List sx={{ padding: '0 12px 12px 12px' }}>
          <ListSubheader sx={{ textAlign: 'center', fontSize: '0.875rem', lineHeight: '36px', color: '#44546f' }}>Upgrade for Views</ListSubheader>
          {listViews.map(vi => (
            <Box key={vi.id} sx={{ cursor: !vi.disabled ? 'pointer' : 'not-allowed' }}>
              <ListItemButton disabled={vi.disabled} sx={{ padding: '6px 0', '&:hover' : { backgroundColor: 'unset' } }}>
                <ListItemIcon sx={{ minWidth: 'unset' }}>
                  <DragIndicatorIcon fontSize='16px' sx={{ color: '#44546f' }} />
                </ListItemIcon>
                <ListItemIcon sx={{ minWidth: 'unset' }}>
                  {vi.disabled ? <CheckBoxOutlineBlankOutlinedIcon sx={{ fontSize: '20px', marginLeft: '4px', marginRight: '10px', color: '#44546f' }} /> : <CheckBoxOutlinedIcon sx={{ fontSize: '20px', marginLeft: '4px', marginRight: '10px', color: '#44546f' }} />}
                </ListItemIcon>
                <ListItemText
                  sx={{ marginY: 0 }}
                  primary={
                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#172b4d' }}>
                      {vi.icon}{vi.nameView}
                    </Typography>
                  }
                />
                { vi.disabled && <ListItemIcon sx={{ minWidth: '24px' }} ><LockOutlinedIcon sx={{ color: '#000' }} fontSize='18px' /></ListItemIcon> }
              </ListItemButton>
            </Box>
          ))}
          <ListSubheader sx={{ padding: 0, fontSize: '1rem', color: '#44546f', fontWeight: '500' }}>See your work in new ways</ListSubheader>
          <ListItemText primary={
            <Typography color='#44546f' marginBottom='16px'>View key timelines, assignments, data, and more directly from your Trello board with Trello Premium.</Typography>
          } />
          <Button fullWidth sx={{ backgroundColor: '#0c66e4', lineHeight: 1.5, color: 'white', '&:hover' : { backgroundColor: '#0055cc' } }} >Start free trial</Button>
          <Link href='/' underline='hover' color='#44546f' textAlign='center' display='flex' justifyContent='center' marginTop='1rem' >Learn more about Trello Premium</Link>
        </List>
      </Menu>
    </>
  )
}

export default CustomizeView
