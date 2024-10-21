import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signupAPI } from '~/apis'

const SignUpPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const submitSignUp = async (data) => {
    delete data.confirm_password
    const response = await signupAPI(data)
    toast.success(response.data.message)
    navigate('/login')
  }
  return (
    <Box className='bg-login-signup h-screen bg-no-repeat bg-cover bg-center relative'>
      <Box className='absolute top-1/2 left-1/2 w-96 bg-white translate-x-n50 translate-y-n50 rounded-lg p-4'>
        <form onSubmit={handleSubmit(submitSignUp)}>
          <h1 className='font-extrabold text-3xl text-[#0079bf] text-center'>Trello</h1>
          {/* Username */}
          <input
            className={`outline-none border w-full px-4 py-2 focus:border-blue-500 rounded ${!!errors.username && '!border-red-500' }`}
            type="text"
            placeholder='Enter your username'
            {...register('username', {
              required: 'Vui lòng nhập tên người dùng'
            })} />
          {errors.username && <p className='ml-2 text-red-500 mt-1'>{errors.username.message}</p>}
          {/* Email */}
          <input
            className={`outline-none border w-full px-4 py-2 rounded focus:border-blue-500 mt-4 ${!!errors.email && '!border-red-500' }`}
            type="text"
            placeholder='Enter email...'
            {...register('email', {
              required: 'Vui lòng nhập email'
            })} />
          {errors.email && <p className='ml-2 text-red-500 mt-1'>{errors.email.message}</p>}
          {/* Password */}
          <input
            className={`outline-none border w-full px-4 py-2 rounded focus:border-blue-500 mt-4 ${!!errors.password && '!border-red-500' }`}
            type="password"
            placeholder='Enter password...'
            {...register('password', {
              required: 'Vui lòng nhập mật khẩu'
            })} />
          {errors.password && <p className='ml-2 text-red-500 mt-1'>{errors.password.message}</p>}
          {/* Confirm password */}
          <input
            className={`outline-none border w-full px-4 py-2 rounded focus:border-blue-500 mt-4 ${!!errors.confirm_password && '!border-red-500' }`}
            type="password"
            placeholder='Confirm password...'
            {...register('confirm_password', {
              required: 'Vui lòng nhập lại mật khẩu',
              validate: (value) => {
                if (watch('password') !== value) return 'Mật khẩu nhập lại không khớp với mật khẩu trên'
              }
            })} />
          {errors.confirm_password && <p className='ml-2 text-red-500 mt-1'>{errors.confirm_password.message}</p>}
          <button className='w-full bg-blue-600 text-white rounded py-2 text-xl mt-5' type="submit">Sign up</button>
          <p className='text-center mt-3'>
            Đã có tài khoản?
            <Link to='/login' className='text-green-600'> Đăng nhập ngay</Link>
          </p>
        </form>
      </Box>
    </Box>
  )
}

export default SignUpPage
