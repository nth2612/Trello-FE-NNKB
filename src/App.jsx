import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import BoardContent from './pages/BoardContent/BoardContent'
import LoginPage from './pages/Login/LoginPage'
import UserPage from './pages/User/UserPage'
import { mockData } from './apis/mock-data'
import SignUpPage from './pages/SignUp/SignUpPage'

const App = () => {
  return (
    <Routes>
      {/* Khi truy cap trang web thi tro ngay toi login */}
      <Route path='/' element={<Navigate to='/board' replace={true} />} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignUpPage/>} />
      <Route path='/user' element={<UserPage/>}/>
      <Route path='/board' element={<BoardContent board={mockData?.board} />}/>
    </Routes>
  )
}

export default App
