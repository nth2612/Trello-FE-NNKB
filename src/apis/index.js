import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// Board
// Get board
export const fetchBoardAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/board/${boardId}`)
  return response.data
}
// Moving column
export const updateBoardDetailAPI = async (boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/board/${boardId}`, updateData)
  return response
}

// Column
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/column`, newColumnData)
  return response.data
}

// Card
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/card`, newCardData)
  return response.data
}
export const moveCardToDifColAPI = async (updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/board/drag/move_card`, updateData)
  return response
}
export const moveCardInSameColAPI = async (columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/column/${columnId}`, updateData)
  return response
}
// User

// Invitation