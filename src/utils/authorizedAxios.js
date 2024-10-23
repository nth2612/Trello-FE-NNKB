import axios from 'axios'
import { toast } from 'react-toastify'
import { logoutAPI } from '~/apis'

// Khoi tao doi tuong de custom cau hinh
let authorizedAxiosInstance = axios.create()

// Thoi gian cho toi da cua 1 request: 10p
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10
// Tu dong dinh kem cookie vao cac request len sv
authorizedAxiosInstance.defaults.withCredentials = true

// Cau hinh interceptors
// Can thiep vao request api
authorizedAxiosInstance.interceptors.request.use( config => {
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor: can thiep vao response api
authorizedAxiosInstance.interceptors.response.use(response => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, error => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Important
  // Neu nhan ma 401, goi api logout
  if (error?.response?.status === 401) {
    logoutAPI().then(() => {
      location.href = '/login'
    })
    console.log('hello :))')
  }
  // Neu nhan ma 410 tu backend, goi api refresh token
  // Lay request api dang bi loi tu error.config

  // Xu ly loi tap trung khi co loi tu response api tra ve, day goi la clean code
  // dung toastify hien thi tat ca loi len man hinh tru ma 410 ra vi ma GONE phuc vu viec refresh token
  if (error?.response?.status !== 410) {
    toast.error(error?.response?.data?.message || error?.message)
  }
  return Promise.reject(error)
})

export default authorizedAxiosInstance