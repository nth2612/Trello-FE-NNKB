import { Box } from '@mui/material'
import More from './Menu/More'
import Home from './Menu/Home'
import Workspaces from './Menu/Workspaces'
import Recent from './Menu/Recent'
import Starred from './Menu/Starred'
import Templates from './Menu/Templates'
import Create from './Menu/Create'
import Account from './Menu/Account'
import Notification from './Menu/Notification'
import Information from './Menu/Information'
import Search from './Menu/Search'
import { useMediaQuery } from '@mui/material'
import MoreMenu from './Menu/MoreMenu'

function AppBar() {
  const responsiveCreate = useMediaQuery('(min-width: 751px)')
  const responsiveTemplate = useMediaQuery('(min-width: 1281px)')
  const responsiveStarred = useMediaQuery('(min-width: 1161px)')
  const responsiveRecent = useMediaQuery('(min-width: 1041px)')
  const responsiveWorkspace = useMediaQuery('(min-width: 901px)')

  return (
    <Box sx={{
      p: 1,
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#0065a0',
      height: (theme) => theme.trello.appBarHeight
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5 }}>
        <More/>
        <Home/>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }} >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }} >
            {responsiveWorkspace && <Workspaces/>}
            {responsiveRecent && <Recent/>}
            {responsiveStarred && <Starred/>}
            {responsiveTemplate && <Templates/>}
          </Box>
          <Box sx={{ display: responsiveTemplate ? 'none' : 'inline-flex' }} >
            <MoreMenu hideWS={responsiveWorkspace} hideR={responsiveRecent} hideS={responsiveStarred} hideT={responsiveTemplate} />
          </Box>
          <Create/>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5 }}>
        <Search/>
        <Notification/>
        { responsiveCreate && <Information/>}
        <Account/>
      </Box>
    </Box>
  )
}

export default AppBar
