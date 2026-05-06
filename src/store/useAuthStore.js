import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      role: null, // 'admin' | 'doctor' | 'patient'

      login: (userData, token) => set({
        user: userData,
        token,
        isAuthenticated: true,
        role: userData.role
      }),

      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
        role: null
      }),

      updateProfile: (updates) => set((state) => ({
        user: { ...state.user, ...updates }
      }))
    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore
