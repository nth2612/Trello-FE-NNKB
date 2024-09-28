import { Box, Button, ListSubheader, Menu, Tooltip } from '@mui/material'
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'
import { useState } from 'react'

function PowerUp({ hideText }) {
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
      <Tooltip title='Power-Ups'>
        <Button
          id='btn-power-ups'
          aria-controls={open ? 'menu-power-ups' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ lineHeight: 1, minWidth: 'unset', '& .MuiSvgIcon-root': { fontSize: '20px', color: '#fff' }, '& .MuiButton-startIcon' : { margin: !hideText ? '0' : '0px 8px 0px 0px' }, paddingY: !hideText ? '6px' : undefined }}
          startIcon={<RocketLaunchOutlinedIcon/>}>
          {hideText && <span>Power-Ups</span>}
        </Button>
      </Tooltip>
      <Menu
        sx={{ '& .MuiList-root' : { padding: 1.5 } }}
        id='menu-power-ups'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'btn-power-ups'
        }}>
        <ListSubheader sx={{ textAlign: 'center', color: '#44546f', fontSize: '0.875rem', fontWeight: '500' }}>Power-Ups</ListSubheader>
        <Box sx={{ margin: '20px 0', textAlign: 'center' }} >
          <img src='https://trello.com/assets/42f8533548e4eeb72589.png' style={{ marginBottom: '12px', width: '164px', height: '147px' }} />
          <Box sx={{ color: '#172b4d', fontSize: '0.875rem' }}>Bring additional features to your boards and integrate apps like Google Drive, Slack, and more.</Box>
        </Box>
        <Button fullWidth sx={{ color: '#fff', lineHeight: 1.5, backgroundColor: '#0c66e4', '&:hover' : { backgroundColor: '#0055cc' } }} >Add Power-Ups</Button>
      </Menu>
    </>
  )
}

export default PowerUp
