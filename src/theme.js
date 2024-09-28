import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '56px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const CARD_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - 12px - 8px - 8px - 40px)`
const COLUMN_HEIGHT_HEADER = '50px'
const COLUMN_HEIGHT_FOOTER = '56px'

const theme = extendTheme({
  colorSchemes: {
    light:{
      palette:{
        primary:{
          main: '#f4f4f4'
        }
      }
    },
    dark:{
      palette:{
        primary:{
          main: '#0e0e0e'
        }
      }
    }
  },
  components: {
    // MuiList:{
    //   styleOverrides:{
    //     root:{
    //       width: '304px'
    //     }
    //   }
    // },
    MuiListItemText:{
      styleOverrides:{
        root:{
          fontSize: '0.875rem',
          fontWeight: 'bold'
        }
      }
    },
    // MuiSvgIcon:{
    //   styleOverrides:{
    //     root:{
    //       color: '#fff'
    //     }
    //   }
    // },
    MuiPaper: {
      styleOverrides:{
        root:{
          // top: `${APP_BAR_HEIGHT} !important`,
          borderRadius: '8px',
          width: '304px',
          backgroundColor: '#fff'
        }
      }
    },
    MuiButton: {
      styleOverrides:{
        root:{
          lineHeight: 1,
          textTransform: 'initial',
          '&:hover' : { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem'
        }
      }
    },
    MuiListSubheader:{
      styleOverrides:{
        root: {
          fontSize: '0.75rem',
          fontWeight: '700',
          backgroundColor: '#fff'
        }
      }
    }
    // MuiCssBaseline: {
    //   styleOverrides:{
    //     body:{
    //       '*::-webkit-scrollbar' : {
    //         height: '16px',
    //         background: '#00000026'
    //       },
    //       '*::-webkit-scrollbar-thumb' : {
    //         background: '#fff6'
    //       },
    //       '*::-webkit-scrollbar-thumb:hover' : {

    //       },
    //       '*::-webkit-scrollbar-button' : {
    //         width: '8px',
    //         height: '8px',
    //         color: '#fff6'
    //       }
    //     }
    //   }
    // }
  },
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEIGHT_HEADER,
    columnFooterHeight: COLUMN_HEIGHT_FOOTER,
    cardHeight: CARD_HEIGHT,
    importantHeightAppBar: `${APP_BAR_HEIGHT} !important`
  }
})

export default theme