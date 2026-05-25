import api from './api'

export const dataService = {
  // Users
  getUsers: async (params = {}) => {
    const response = await api.get('/users', { params })
    return response.data
  },
  getUser: async (id) => {
    const response = await api.get(`/users/${id}`)
    return response.data
  },
  createUser: async (userData) => {
    const response = await api.post('/users', userData)
    return response.data
  },
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData)
    return response.data
  },
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`)
    return response.data
  },

  // Products
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params })
    return response.data
  },
  getProduct: async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },
  createProduct: async (productData) => {
    const response = await api.post('/products', productData)
    return response.data
  },
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData)
    return response.data
  },
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  },

  // Orders
  getOrders: async (params = {}) => {
    const response = await api.get('/orders', { params })
    return response.data
  },
  getOrder: async (id) => {
    const response = await api.get(`/orders/${id}`)
    return response.data
  },
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData)
    return response.data
  },
  updateOrder: async (id, orderData) => {
    const response = await api.put(`/orders/${id}`, orderData)
    return response.data
  },
  deleteOrder: async (id) => {
    const response = await api.delete(`/orders/${id}`)
    return response.data
  },

  // Stats
  getStats: async () => {
    const response = await api.get('/stats')
    return response.data
  },

  // Notifications
  getNotifications: async () => {
    const response = await api.get('/notifications')
    return response.data
  },
  markNotificationRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read`)
    return response.data
  },
  clearNotifications: async () => {
    const response = await api.delete('/notifications')
    return response.data
  },
}
