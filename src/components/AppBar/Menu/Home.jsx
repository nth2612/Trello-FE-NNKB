import TrelloIcon from '~/assets/trello.svg?react'
import { Box, Button, SvgIcon, Typography } from '@mui/material'
function Home() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button sx={{ textTransform: 'initial', gap: 0.5, color: '#fff' }}>
        <SvgIcon component={TrelloIcon} fontSize='small' inheritViewBox />
        <Typography variant='h6'>Trello</Typography>
      </Button>
    </Box>
  )
}

export default Home
