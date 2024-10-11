import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import theme from '~/theme.js'
import { Experimental_CssVarsProvider as CssVarsProdiver } from '@mui/material'
import Testing from './Testing'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <CssVarsProdiver theme={theme} defaultMode='system'>
        <CssBaseline />
        <App/>
        {/* <Testing/> */}
        <ToastContainer position='bottom-left' theme='colored' />
      </CssVarsProdiver>
    </BrowserRouter>
  // </React.StrictMode>
)
