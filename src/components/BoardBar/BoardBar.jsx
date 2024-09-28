import { Box, Button, Divider, Tooltip, Typography, useMediaQuery } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import WorkspaceVisible from './Menu/WorkspaceVisible'
import CustomizeView from './Menu/CustomizeView'
import PowerUp from './Menu/PowerUp'
import Automation from './Menu/Automation'
import Share from './Menu/Share'
import Members from './Menu/Members'

function BoardBar({ handleOpen, open, nameBoard, refBoardBar }) {
  const responsiveText = useMediaQuery('(min-width: 1541px)')
  const combineCustom = useMediaQuery('(min-width: 1281px)')
  const responsiveFilter = useMediaQuery('(min-width: 901px)')
  return (
    <Box id='board-bar' ref={refBoardBar} sx={{
      height: 'auto',
      // height: (theme) => theme.trello.boardBarHeight,
      backgroundColor: '#005c91',
      display: 'flex',
      justifyContent : 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '12px 10px 12px 16px',
      gap: '6px',
      overflow: 'hidden'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography variant='span' sx={{ paddingX: '10px', fontSize: '1.125rem', fontWeight: 'bold', color: 'white' }}>{nameBoard}</Typography>
        <Box sx={{ padding: '6px', display: 'inline-flex', cursor: 'pointer', borderRadius: 1, '&:hover' : { backgroundColor: 'rgba(255,255,255,0.2)' } }}>
          <StarRoundedIcon sx={{ color: '#fff' }} fontSize='small' />
        </Box>
        <WorkspaceVisible hideText={responsiveText} />
        { combineCustom &&
        <Tooltip title='Board'>
          <Button
            startIcon={<DashboardOutlinedIcon sx={{ fontSize: '18px !important' }} />}
            sx={{
              backgroundColor: '#dcdfe4',
              color: '#172b4d',
              padding: '7px 12px',
              lineHeight: '1',
              '&:hover' : { backgroundColor: 'white' }
            }}>
            Board
          </Button>
        </Tooltip>}
        <CustomizeView combine={combineCustom} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, marginLeft: 'auto', '& .MuiButtonBase-root' : { paddingX: '6px' } }}>
        <PowerUp hideText={responsiveText} />
        <Automation hideText={responsiveText} />
        <Tooltip title='Filter cards F'>
          <Button
            sx={{ color: '#fff', lineHeight: 1, minWidth: 'unset', py: !responsiveFilter ? '6px' : undefined, '& > .MuiButton-icon' : { margin: !responsiveFilter ? '0' : undefined } }}
            startIcon={<FilterListIcon/>}>{ responsiveFilter && <span>Filters</span>}</Button>
        </Tooltip>
        <Divider orientation='vertical' variant='middle' flexItem sx={{ borderColor: '#2976a3', margin: '8px 2px' }} />
        <Members/>
        <Share/>
        <Button sx={{ minWidth: 'unset', padding: '4px !important', display: open ? 'none' : 'inline-flex' }} onClick={handleOpen} >
          <MoreHorizRoundedIcon sx={{ color: 'white' }} />
        </Button>
      </Box>
    </Box>
  )
}

export default BoardBar
