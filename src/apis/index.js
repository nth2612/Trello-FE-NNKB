import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// Board
export const fetchBoardAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/board/${boardId}`)
  return response.data
}
export const updateBoardDetailAPI = async (boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/board/${boardId}`, updateData)
  return response
}

// Column

// Card

// User

// Invitation