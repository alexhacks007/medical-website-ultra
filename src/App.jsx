import AppRoutes from './routes/AppRoutes'
import { Toaster } from './components/ui/Toast'
import AIChatModal from './components/ai/AIChatModal'
import FloatingAI from './components/ai/FloatingAI'
import TelemedicineModal from './features/telemedicine/TelemedicineModal'
import ModernLayout from './layouts/ModernLayout'

function App() {
  return (
    <ModernLayout>
      <AppRoutes />
      <Toaster />
      <AIChatModal />
      <FloatingAI />
      <TelemedicineModal />
    </ModernLayout>
  )
}

export default App
