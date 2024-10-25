import authorizedAxiosInstance from '~/utils/authorizedAxios'
import { API_ROOT } from '~/utils/constants'

// Board
// Get one board
export const fetchBoardAPI = async (boardId) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/board/${boardId}`)
  return response.data
}
// Get all boards
export const fetchAllBoardsAPI = async (userId) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/board/getallboards/${userId}`)
  return response.data
}
// Moving column
export const updateBoardDetailAPI = async (boardId, updateData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/board/${boardId}`, updateData)
  return response
}

// Column
export const createNewColumnAPI = async (newColumnData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/column`, newColumnData)
  return response.data
}
export const deleteColumnAPI = async (columnId) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/column/${columnId}`)
  return response
}
export const renameColumnAPI = async (columnId, updateData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/column/${columnId}`, updateData)
  return response
}
// Card
export const createNewCardAPI = async (newCardData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/card`, newCardData)
  return response.data
}
export const moveCardToDifColAPI = async (updateData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/board/drag/move_card`, updateData)
  return response
}
export const moveCardInSameColAPI = async (columnId, updateData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/column/${columnId}`, updateData)
  return response
}
// User
export const loginAPI = async (userInfo) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/user/login`, userInfo)
  return response.data
}
export const logoutAPI = async () => {
  localStorage.removeItem('userInfo')
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/user/logout`)
  return response
}
export const signupAPI = async (userData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/user/signup`, userData)
  return response
}
// Invitation
