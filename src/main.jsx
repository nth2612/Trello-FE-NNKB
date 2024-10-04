import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import theme from '~/theme.js'
import { Experimental_CssVarsProvider as CssVarsProdiver } from '@mui/material'
import { mockData } from './apis/mock-data'
import Testing from './Testing'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <CssVarsProdiver theme={theme} defaultMode='system'>
      <CssBaseline />
      <App board={mockData?.board}/>
      {/* <Testing/> */}
    </CssVarsProdiver>
  // </React.StrictMode>
)
