import api from './api'

export const bookingAPI = {
  store: (data) => api.post('/bookings', data),
}
