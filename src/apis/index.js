import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchBoardAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/board/${boardId}`)
  return response.data
}