import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import DashboardLayout from '@/layouts/DashboardLayout'

// Pages
import Home from '@/pages/Home'
import DoctorListing from '@/pages/DoctorListing'
import DoctorProfile from '@/pages/DoctorProfile'
import Booking from '@/pages/Booking'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import UserDashboard from '@/pages/UserDashboard'
import Appointments from '@/pages/Appointments'
import MedicalRecords from '@/pages/MedicalRecords'
import Messages from '@/pages/Messages'
import Settings from '@/pages/Settings'
import Ratings from '@/pages/Ratings'
import AdminDashboard from '@/pages/AdminDashboard'
import Contact from '@/pages/Contact'
import DiagnosticCenter from '@/pages/DiagnosticCenter'

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = JSON.parse(localStorage.getItem('auth-storage'))?.state || {}
  
  if (!isAuthenticated) return <Navigate to="/login" />
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" />
  
  return children
}

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorListing />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/diagnostics" element={<DiagnosticCenter />} />
        <Route path="/booking/:doctorId" element={<Booking />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected User Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['user', 'patient']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<UserDashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="records" element={<MedicalRecords />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Protected Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
