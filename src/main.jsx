import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import theme from '~/theme.js'
import { Experimental_CssVarsProvider as CssVarsProdiver } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProdiver theme={theme} defaultMode='system'>
      <CssBaseline />
      <App />
    </CssVarsProdiver>
  </React.StrictMode>
)
