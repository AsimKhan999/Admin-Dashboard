import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  products: [],
  orders: [],
  notifications: [],
  stats: {
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  },
  loading: false,
  error: null,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false
      const { users, products, orders, notifications, stats } = action.payload
      if (users) state.users = users
      if (products) state.products = products
      if (orders) state.orders = orders
      if (notifications) state.notifications = notifications
      if (stats) state.stats = stats
    },
    fetchDataFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((u) => u._id === action.payload._id)
      if (index !== -1) state.users[index] = action.payload
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((u) => u._id !== action.payload)
    },
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex((p) => p._id === action.payload._id)
      if (index !== -1) state.products[index] = action.payload
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p._id !== action.payload)
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload)
    },
    updateOrder: (state, action) => {
      const index = state.orders.findIndex((o) => o._id === action.payload._id)
      if (index !== -1) state.orders[index] = action.payload
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter((o) => o._id !== action.payload)
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload)
    },
    markNotificationRead: (state, action) => {
      const notification = state.notifications.find((n) => n._id === action.payload)
      if (notification) notification.read = true
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
  },
})

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  addUser,
  updateUser,
  deleteUser,
  addProduct,
  updateProduct,
  deleteProduct,
  addOrder,
  updateOrder,
  deleteOrder,
  addNotification,
  markNotificationRead,
  clearNotifications,
} = dataSlice.actions

export default dataSlice.reducer
