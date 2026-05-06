import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Search, User, Menu, X, Moon, Sun, Bell } from 'lucide-react'
import { useState, useEffect } from 'react'
import useGlobalStore from '@/store/useGlobalStore'
import useAuthStore from '@/store/useAuthStore'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const { isDarkMode, toggleDarkMode, openModal, notifications, removeNotification } = useGlobalStore()
  const { isAuthenticated, user, logout } = useAuthStore()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Appointment', path: '/doctors' },
    { name: 'Diagnostics', path: '/diagnostics' },
    { name: 'Rating', path: '/ratings' },
    { name: 'Contactus', path: '/contact' },
  ]

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
  }

  return (
    <nav className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'top-10 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)]' : 'top-12 bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-11 h-11 bg-primary rounded-[0.9rem] flex items-center justify-center text-white shadow-2xl shadow-primary/40 group-hover:scale-110 transition-all duration-500">
             <Heart size={22} fill="currentColor" className="group-hover:animate-pulse" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-800 dark:text-white uppercase italic leading-none">
            MEDI-CARE <span className="text-primary not-italic font-bold">ULTRA</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative py-2 px-1 text-[11px] font-black uppercase tracking-widest transition-all duration-300 group flex items-center gap-1 ${
                location.pathname === link.path ? 'text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              {link.name}
              {link.name === 'Diagnostics' && (
                <span className="bg-primary text-white text-[7px] px-1.5 py-0.5 rounded-full animate-bounce">NEW</span>
              )}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="nav-active" 
                  className="absolute -inset-x-3 inset-y-0 border-2 border-slate-900 dark:border-white rounded-lg -z-0"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Action Center */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={toggleDarkMode}
            className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-primary/5 hover:text-primary transition-all duration-300"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <div className="flex items-center gap-4 relative">
            {/* Notification System */}
            <div className="relative">
                <button 
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={`p-3 rounded-2xl transition-all duration-300 ${isNotificationsOpen ? 'bg-primary/10 text-primary' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-slate-100'}`}
                >
                  <Bell size={18} />
                  {notifications.length > 0 && (
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                  )}
                </button>
                <AnimatePresence>
                    {isNotificationsOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }}
                          className="absolute right-0 mt-4 w-80 bg-white dark:bg-dark-surface rounded-[2rem] shadow-premium border border-slate-100 dark:border-slate-800 p-6 z-50 overflow-hidden"
                        >
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Unread Notifications</h4>
                            <div className="space-y-4">
                                {notifications.length > 0 ? notifications.map(n => (
                                    <div key={n.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl relative group">
                                        <p className="text-[10px] font-black text-slate-800 dark:text-white uppercase tracking-tight">{n.title}</p>
                                        <p className="text-[9px] text-slate-400 font-bold mt-1">{n.message}</p>
                                        <button onClick={() => removeNotification(n.id)} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                                    </div>
                                )) : (
                                    <p className="text-[10px] font-bold text-slate-400 text-center py-6 italic">No New Medical Alerts</p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>

            {isAuthenticated ? (
                <div className="relative">
                    <button 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="w-11 h-11 rounded-[0.9rem] bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-black overflow-hidden hover:scale-105 transition-transform"
                    >
                        {user?.name?.[0] || 'A'}
                    </button>
                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }}
                              className="absolute right-0 mt-4 w-60 bg-white dark:bg-dark-surface rounded-[2rem] shadow-premium border border-slate-100 dark:border-slate-800 p-6 z-50"
                            >
                                <div className="space-y-4">
                                    <Link to="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-[10px] font-black uppercase tracking-widest group transition-colors">
                                        <User size={16} className="text-slate-400 group-hover:text-primary" /> Dashboard
                                    </Link>
                                    <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-[10px] font-black uppercase tracking-widest text-red-500 group transition-colors">
                                        <X size={16} className="text-red-300 group-hover:text-red-500" /> Sign Out
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-primary transition-colors">Login</Link>
                    <button 
                        onClick={() => openModal('AI_CHAT')}
                        className="bg-primary text-white px-8 py-3.5 rounded-[0.9rem] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-105 transition-all"
                    >
                        Consult Now
                    </button>
                </div>
            )}
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="lg:hidden p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white dark:bg-dark-surface border-t border-slate-50 dark:border-slate-800 overflow-hidden"
          >
            <div className="p-8 flex flex-col gap-6">
              {navLinks.map(link => (
                <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-white">{link.name}</Link>
              ))}
              <hr className="border-slate-50 dark:border-slate-800" />
              <button 
                onClick={() => { openModal('AI_CHAT'); setIsMobileMenuOpen(false); }}
                className="w-full py-5 bg-primary text-white rounded-3xl font-black uppercase tracking-widest"
              >
                Consult Assistant
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
