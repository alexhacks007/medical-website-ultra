import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, Cpu, Bell, Users, Zap, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import useGlobalStore from '@/store/useGlobalStore';

const ModernLayout = ({ children }) => {
  const { openModal } = useGlobalStore();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary/30 rounded-full pointer-events-none z-[9999] hidden lg:block"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      >
        <div className="absolute inset-0 bg-primary/5 rounded-full scale-50 blur-sm" />
      </motion.div>

      {/* Live Vitals Header (Dynamic Sticky) */}
      <div className={`fixed top-0 inset-x-0 z-[60] transition-all duration-300 ${scrolled ? 'py-1' : 'py-2'}`}>
        <div className="container mx-auto px-6">
          <div className={`flex items-center justify-between px-6 py-2 rounded-full border border-white/10 backdrop-blur-md transition-all duration-500 ${scrolled ? 'bg-slate-900/80 shadow-2xl translate-y-2' : 'bg-white/5 shadow-none'}`}>
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Activity size={14} className="text-primary animate-pulse" />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${scrolled ? 'text-white' : 'text-slate-900'}`}>Live Health Network: <span className="text-green-500">Active</span></span>
                </div>
                <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-6">
                    <ShieldCheck size={14} className="text-secondary" />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${scrolled ? 'text-white/60' : 'text-slate-400'}`}>Secure Biometric Link</span>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-5 h-5 rounded-full border-2 border-slate-900 overflow-hidden bg-slate-800">
                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="" className="w-full h-full object-cover grayscale" />
                        </div>
                    ))}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest ${scrolled ? 'text-white/40' : 'text-slate-500'}`}>+4.2k Online</span>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-10 pb-24 lg:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation (Advanced Navigation Leveling) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-[100] bg-white/80 dark:bg-dark-surface/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-6 py-3 pb-8">
          <div className="flex justify-between items-center">
              {[
                  { icon: <Activity size={20} />, label: 'Health', path: '/diagnostics' },
                  { icon: <Users size={20} />, label: 'Doctors', path: '/doctors' },
                  { icon: <div className="p-3 bg-primary text-white rounded-2xl -mt-8 shadow-xl shadow-primary/30"><Zap size={20} /></div>, label: 'AI', action: () => openModal('AI_SYMPTOM_CHECKER') },
                  { icon: <Calendar size={20} />, label: 'Book', path: '/dashboard/appointments' },
                  { icon: <User size={20} />, label: 'Profile', path: '/dashboard' },
              ].map((item, i) => (
                  item.path ? (
                      <Link key={i} to={item.path} className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
                          {item.icon}
                          <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
                      </Link>
                  ) : (
                      <button key={i} onClick={item.action} className="flex flex-col items-center gap-1 group">
                          {item.icon}
                          <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primary">{item.label}</span>
                      </button>
                  )
              ))}
          </div>
      </div>
    </div>
  );
};

export default ModernLayout;
