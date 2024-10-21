import { Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom'
import LoginPage from './pages/Login/LoginPage'
import UserPage from './pages/User/UserPage'
import SignUpPage from './pages/SignUp/SignUpPage'
import Board from './pages/BoardContent/_id'
import Main from './Testing'
import { toast } from 'react-toastify'

const ProtectedRoutes = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  return !userInfo ? <Navigate to='/login' replace={true} /> : <Outlet />
}
const UnauthorizedRoutes = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  if (user) {
    toast.warning('Cannot login or signup until you logout')
    return <Navigate to='/user' replace={true} />
  }
  return <Outlet />
}
const App = () => {
  return (
    <Routes>
      {/* Khi truy cap trang web thi tro ngay toi login */}
      <Route path='/' element={<Navigate to='/login' replace={true} />} />
      <Route element={<UnauthorizedRoutes />}>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignUpPage/>} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path='/user' element={<UserPage/>}/>
        <Route path='/board' element={<Board />}/>
      </Route>
      <Route path='/board' element={<Board />}/>
      {/* <Route path='/board' element={<Main />}/> */}
    </Routes>
  )
}

export default App
