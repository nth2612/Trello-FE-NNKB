import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import LoginPage from './pages/Login/LoginPage'
import UserPage from './pages/User/UserPage'
import SignUpPage from './pages/SignUp/SignUpPage'
import Board from './pages/BoardContent/_id'
import Main from './Testing'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import NotFound from './pages/NotFound/NotFound'
import ConfirmPage from './pages/ConfirmPage/ConfirmPage'

const ProtectedRoutes = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  useEffect(() => {
    if (!userInfo) {
      toast.warning('You need login first !!!')
    }
  }, [userInfo])
  if (!userInfo) {
    return <Navigate to='/login' replace={true} />
  }
  return <Outlet />
}
const UnauthorizedRoutes = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  useEffect(() => {
    if (user) {
      toast.warning('Cannot login or signup until you logout !')
    }
  }, [user])
  if (user) {
    return <Navigate to='/user' replace={true} />
  }
  return <Outlet />
}
const App = () => {
  console.log('re-render')
  return (
    <Routes>
      {/* Khi truy cap trang web thi tro ngay toi login */}
      {/* <Route path='*' element={<NotFound/>} />
      <Route path='/404' element={<NotFound/>} />
      <Route path='/board' element={<Navigate to='/404' replace />} /> */}
      <Route path='/' element={<Navigate to='/login' replace={true} />} />
      <Route element={<UnauthorizedRoutes />}>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignUpPage/>} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path='/user' element={<UserPage/>}/>
        <Route path='/board/:id' element={<Board />}/>
        <Route path='/confirm-invite' element={<ConfirmPage/>}/>
      </Route>
      {/* <Route path='/board' element={<Main />}/> */}
    </Routes>
  )
}

export default App
