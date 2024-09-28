import { Avatar, Box, Button, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import { useState } from 'react'
import myavt from '~/assets/myavt5.png'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import TableRowsIcon from '@mui/icons-material/TableRows'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded'

const listBoards = [
  {
    id: 1,
    nameBoard: 'Đá tan',
    divColor: 'red',
    choosed: false
  },
  {
    id: 2,
    nameBoard: 'Mất tích',
    divColor: 'blue',
    choosed: true
  },
  {
    id: 3,
    nameBoard: 'Thấy chưa',
    divColor: 'yellow',
    choosed: false
  },
  {
    id: 4,
    nameBoard: 'Em trang trí',
    divColor: 'brown',
    choosed: false
  },
  {
    id: 5,
    nameBoard: 'Em trong đầu',
    divColor: 'orange',
    choosed: false
  },
  {
    id: 6,
    nameBoard: 'Bạn thỏ tivi nhỏ',
    divColor: 'green',
    choosed: false
  },
  {
    id: 7,
    nameBoard: 'Điểm đến cuối cùng',
    divColor: 'black',
    choosed: false
  }
]

function ExpandLeft() {
  const [openExpand, setOpenExpand] = useState(false)
  return (
    <>
      { openExpand
        ? <Box sx={{ width: '260px', minHeight: '100%', position: 'relative', transition: 'width 100ms linear', flexShrink: '0' }} >
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%', height: '100%', overflow: 'auto' }}>
            <Box sx={{ backgroundColor: '#0066a0', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'auto' }} >
              <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px 12px', borderBottom: '1px solid #ffffff29' }} >
                <Box sx={{}} >
                  <Avatar src={myavt} sx={{ borderRadius: '4px', width: '32px', height: '32px' }} ></Avatar>
                </Box>
                <Box sx={{ flex: 1, mr: '4px', ml: '8px', color: '#fff' }}>
                  <Typography sx={{ fontWeight: '500' }} >My workspace</Typography>
                  <Typography fontSize='0.75rem' >Free</Typography>
                </Box>
                <Button sx={{ minWidth: 'unset', padding: '4px' }} onClick={() => setOpenExpand(false)} >
                  <KeyboardArrowLeftRoundedIcon sx={{ color: 'white' }} />
                </Button>
              </Box>
              <Box sx={{ flex: 1 }} >
                <Box>
                  <Box sx={{ paddingTop: '12px' }}>
                    <Button sx={{ color: '#fff', padding: '0 0 0 16px', height: '32px' }} startIcon={<DashboardIcon sx={{ ml: 0, fontSize: '1rem' }} />} fullWidth >
                      <Typography sx={{ flex: '1', textAlign: 'left' }} >Boards</Typography>
                    </Button>
                    <Button sx={{ color: '#fff', padding: '2px 2px 2px 16px', '& .MuiButton-icon:nth-of-type(2)' : { m: '2px', padding: '2px', borderRadius: '4px', '&:hover' : { backgroundColor: 'rgba(255,255,255,0.2)' } } }} startIcon={<Person2OutlinedIcon sx={{ ml: 0, fontSize: '1rem' }} />} endIcon={<AddOutlinedIcon sx={{ fontSize: '20px' }} />} fullWidth>
                      <Typography sx={{ flex: '1', textAlign: 'left' }} >Member</Typography>
                    </Button>
                    <Button sx={{ color: '#fff', padding: '2px 2px 2px 16px', '& .MuiButton-icon:nth-of-type(2)' : { m: '2px', padding: '2px', borderRadius: '4px', '&:hover' : { backgroundColor: 'rgba(255,255,255,0.2)' } } }} startIcon={<SettingsOutlinedIcon sx={{ ml: 0, fontSize: '1rem' }} />} endIcon={<ExpandMoreOutlinedIcon sx={{ fontSize: '20px' }}/>} fullWidth>
                      <Typography sx={{ flex: '1', textAlign: 'left' }}>
                      Workspace settings
                      </Typography>
                    </Button>
                  </Box>
                  <Box sx={{ mt: '6px' }}>
                    <h5 style={{ fontSize: '14px', color: '#fff', padding: '5px 0 5px 12px' }}>Workspace views</h5>
                    <Button fullWidth sx={{ color: '#fff', padding: '5.5px 6px 5.5px 16px' }} startIcon={<TableRowsIcon sx={{ ml: 0, fontSize: '1rem' }} />} >
                      <Typography sx={{ flex: '1', textAlign: 'left', fontStyle: 'italic' }} >Table</Typography>
                    </Button>
                    <Button fullWidth sx={{ color: '#fff', padding: '5.5px 6px 5.5px 16px' }} startIcon={<CalendarMonthIcon sx={{ ml: 0, fontSize: '1rem' }} />} >
                      <Typography sx={{ flex: '1', textAlign: 'left', fontStyle: 'italic' }} >Calendar</Typography>
                    </Button>
                  </Box>
                  <Box sx={{ mt: '6px' }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      '& .MuiBox-root .MuiButtonBase-root:nth-of-type(1) .MuiSvgIcon-root' : { color: 'transparent' },
                      '&:hover .MuiBox-root .MuiButtonBase-root:nth-of-type(1) .MuiSvgIcon-root' : { color: '#fff' }
                    }}>
                      <Typography sx={{ flex: 1, pl: '12px', fontWeight: '500', color: '#fff' }} >Your boards</Typography>
                      <Box >
                        <Button sx={{ mr: 0.5, minWidth: 'unset', padding: '4px', transition: 'none' }} >
                          <MoreHorizOutlinedIcon sx={{ fontSize: '20px' }} />
                        </Button>
                        <Button sx={{ mr: 0.5, minWidth: 'unset', padding: '4px', color: '#fff' }} >
                          <AddOutlinedIcon sx={{ fontSize: '20px' }} />
                        </Button>
                      </Box>
                    </Box>
                    <List>
                      {listBoards.map(board => (
                        <ListItemButton key={board.id} sx={{ pr: 0, py: '2px', backgroundColor: board.choosed && 'rgba(255,255,255,0.2)', '&:hover .MuiListItemIcon-root > *' : { color: '#fff' } }} >
                          <Box sx={{ width: '24px', height: '20px', mr: '8px', backgroundColor: board.divColor, borderRadius: '4px' }} ></Box>
                          <ListItemText primary={<Typography sx={{ color: '#fff', fontSize: '14px' }} >{board.nameBoard}</Typography>} />
                          <ListItemIcon sx={{ minWidth: 'unset' }} >
                            <MoreHorizOutlinedIcon sx={{ color: 'transparent', fontSize: '20px', mr: '6px' }} />
                            <StarBorderRoundedIcon sx={{ color: 'transparent', fontSize: '20px', mr: '8px', '&:hover' : { scale: '1.2' } }} />
                          </ListItemIcon>
                        </ListItemButton>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ borderTop: '1px solid #ffffff29', padding: '12px 16px 12px 12px' }}>
                <Button
                  startIcon={<WorkOutlineIcon sx={{ ml: '6px' }}/>}
                  sx={{ fontWeight: 'unset',
                    color: '#fff',
                    background: 'linear-gradient(97.78deg, #6e5dc6 17.5%, #e774bb 113.39%)',
                    justifyContent: 'flex-start',
                    '&:hover' : { background: 'linear-gradient(270deg, #6e5dc6 0%, #172b4d 100%)' }
                  }}
                  fullWidth>
                    Try Premium free
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        : <Box sx={{ width: '16px', minHeight: '100%', position: 'relative' }}>
          <Tooltip title='Expand sidebar [' placement='top-end'>
            <button className='btn-expand-left' aria-describedby='exp-left' onClick={() => setOpenExpand(true)} >
              <span className='expand-left'>
                <KeyboardArrowRightRoundedIcon sx={{ color: '#fff' }} />
              </span>
            </button>
          </Tooltip>
        </Box>
      }
    </>
  )
}

export default ExpandLeft
