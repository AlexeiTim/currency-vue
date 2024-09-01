import axios from 'axios'

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

const httpClient = axios.create({
  baseURL: BASE_API_URL
})

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token-currency')
    if (token) config.headers['Authorization'] = 'Token ' + token
    return config
  },
  (error) => Promise.reject(error)
)

export { httpClient }
