// export const API_ROOT = 'http://localhost:8017'

let apiRoot = ''
if (import.meta.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
}
if (import.meta.env.BUILD_MODE === 'production') {
  apiRoot = 'https://trello-be-nnkb.onrender.com'
}
export const API_ROOT = apiRoot