import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://booking.test/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export default api
