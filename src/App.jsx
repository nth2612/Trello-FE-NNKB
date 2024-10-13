import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import LoginPage from './pages/Login/LoginPage'
import UserPage from './pages/User/UserPage'
import SignUpPage from './pages/SignUp/SignUpPage'
import Board from './pages/BoardContent/_id'

const App = () => {
  return (
    <Routes>
      {/* Khi truy cap trang web thi tro ngay toi login */}
      <Route path='/' element={<Navigate to='/board' replace={true} />} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignUpPage/>} />
      <Route path='/user' element={<UserPage/>}/>
      <Route path='/board' element={<Board />}/>
    </Routes>
  )
}

export default App
