import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const mockData = {
  email: 'nishykata',
  password: '1'
}

const LoginPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const submitLogIn = (data) => {
    if (data.email !== mockData.email || data.password !== mockData.password) {
      toast.error('Sai tk mk roi')
      return
    }
    toast.success('Dang nhap ok')
    navigate('/user')
  }
  return (
    <Box className='bg-login-signup h-screen bg-no-repeat bg-cover bg-center relative'>
      <Box className='absolute top-1/2 left-1/2 w-96 bg-white translate-x-n50 translate-y-n50 rounded-lg p-4'>
        <form onSubmit={handleSubmit(submitLogIn)}>
          <h1 className='font-extrabold text-3xl text-[#0079bf] text-center'>Trello</h1>
          <div className='text-center'>
            <p>Web còn đang trong thời gian phát triển</p>
            <p>Example account: TK: nishykata, MK: 1</p>
          </div>
          <input
            className={`outline-none border w-full px-4 py-2 rounded ${!!errors.email && 'border-red-500' }`}
            type="text"
            placeholder='Enter email...'
            {...register('email', {
              required: 'Vui lòng nhập email'
            })} />
          {errors.email && <p className='ml-2 text-red-500 mt-1'>{errors.email.message}</p>}
          <input
            className={`outline-none border w-full px-4 py-2 rounded mt-4 ${!!errors.password && 'border-red-500' }`}
            type="password"
            placeholder='Enter password...'
            {...register('password', {
              required: 'Vui lòng nhập mật khẩu'
            })} />
          {errors.password && <p className='ml-2 text-red-500 mt-1'>{errors.password.message}</p>}
          <button className='w-full bg-blue-600 text-white rounded py-2 text-xl mt-5' type="submit">Log in</button>
          <p className='text-center mt-3'>
            Chưa có tài khoản?
            <Link to='/signup' className='text-green-600'> Đăng ký ngay</Link>
          </p>
        </form>
      </Box>
    </Box>
  )
}

export default LoginPage
