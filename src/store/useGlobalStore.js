import { create } from 'zustand'

const useGlobalStore = create((set) => ({
  isDarkMode: document.documentElement.classList.contains('dark'),
  toggleDarkMode: () => set((state) => {
    const newMode = !state.isDarkMode
    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    return { isDarkMode: newMode }
  }),

  // AI Hub State
  aiSymptomState: {
    isAnalyzing: false,
    currentDiagnosis: null,
    riskLevel: 'Low',
  },
  aiChatHistory: [
    { role: 'system', content: 'Hello! I am your MEDI-CARE AI Assistant. How can I help you feel better today?' }
  ],
  addToChatHistory: (message) => set((state) => ({
    aiChatHistory: [...state.aiChatHistory, message]
  })),
  clearChatHistory: () => set({
    aiChatHistory: [{ role: 'system', content: 'Hello! I am your MEDI-CARE AI Assistant. How can I help you feel better today?' }]
  }),
  setAIAnalyzing: (isAnalyzing) => set((state) => ({
    aiSymptomState: { ...state.aiSymptomState, isAnalyzing }
  })),

  // Predictive Health Metrics
  healthScore: 85,
  setHealthScore: (score) => set({ healthScore: score }),

  // User Actions & Appointments
  userAppointments: [
    { id: 101, doc: 'Dr. Sarah Johnson', date: 'Sat, 05/18', time: '8:00 PM', status: 'Upcoming', type: 'Video' },
    { id: 102, doc: 'Dr. Michael Chen', date: 'Wed, 12/22', time: '1:00 PM', status: 'Completed', type: 'In-Clinic' },
  ],
  bookAppointment: (appointment) => set((state) => ({
    userAppointments: [{ id: Date.now(), ...appointment, status: 'Upcoming' }, ...state.userAppointments]
  })),
  cancelAppointment: (id) => set((state) => ({
    userAppointments: state.userAppointments.filter(a => a.id !== id)
  })),

  // Booking Flow State
  currentBooking: {
    doctorId: null,
    doctorName: '',
    doctorImage: '',
    doctorSpecialty: '',
    date: null,
    slot: null,
    patientName: 'Alex Johnson',
    paymentMethod: 'UPI'
  },
  setBookingData: (data) => set((state) => ({
    currentBooking: { ...state.currentBooking, ...data }
  })),

  // Search & Filtering Mock
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),

  // Shared Modal State
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },
  openModal: (type, data = null) => set({
    modal: { isOpen: true, type, data }
  }),
  closeModal: () => set({
    modal: { isOpen: false, type: null, data: null }
  }),

  // Reviews & Testimonials
  reviews: [
    { id: 1, user: 'Sarah M.', doc: 'Dr. Sarah Johnson', rating: 5, comment: 'Incredible expertise. The cardiovascular surgery was a complete success. Highly recommended!', date: '2 days ago' },
    { id: 2, user: 'John D.', doc: 'Dr. Michael Chen', rating: 5, comment: 'Very professional dermatologist. Explained the treatment plan clearly.', date: '1 week ago' },
    { id: 3, user: 'Emily R.', doc: 'Dr. Emily Williams', rating: 4, comment: 'Great with kids! My daughter felt very comfortable during her checkup.', date: '3 days ago' },
  ],
  addReview: (review) => set((state) => ({
    reviews: [{ id: Date.now(), ...review, date: 'Just now' }, ...state.reviews]
  })),

  // Notifications
  notifications: [],
  addNotification: (notification) => set((state) => ({
    notifications: [...state.notifications, { id: Date.now(), ...notification }]
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  }))
}))

export default useGlobalStore
