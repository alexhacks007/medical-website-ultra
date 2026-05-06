import api from './api'

const authService = {
  login: async (credentials) => {
    // In a real app: const response = await api.post('/auth/login', credentials)
    // return response.data
    
    // Mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { id: 1, name: 'Alex Johnson', email: credentials.email, role: 'user' },
          token: 'mock-jwt-token'
        })
      }, 1000)
    })
  },

  register: async (userData) => {
    // Real call: return await api.post('/auth/register', userData)
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true, message: 'Account created' }), 1000)
    })
  },

  logout: () => {
    localStorage.removeItem('auth-storage')
  }
}

export default authService
