import { Link } from 'react-router-dom'
import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-surface border-t border-slate-100 dark:border-slate-800 pt-20 pb-10 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <Heart size={24} fill="currentColor" />
              </div>
              <span className="text-xl font-bold tracking-tight uppercase italic">MEDI-CARE <span className="text-primary not-italic">ULTRA</span></span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Four important specialists: cardiology, neurology, dental, and kids council.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <button key={i} className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-all">
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 italic">Essential</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><Link to="#" className="hover:text-primary transition-colors">Cardiology</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Neurology</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Dental</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Kids Council</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 italic">Links</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><Link to="#" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Payment Links</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Your Community</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold mb-6 italic">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-500 font-bold tracking-tighter">
                <Phone size={16} className="text-primary" /> +1 (81) 7003 33303
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500 font-bold tracking-tighter">
                <Mail size={16} className="text-primary" /> medi@pulse.com
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <p>Company © 2026 MEDI-CARE ULTRA</p>
          <div className="flex gap-8">
            <Link to="#">Footer</Link>
          </div>
        </div>

        {/* Floating Emergency & WhatsApp */}
        <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
            <button className="bg-red-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-2xl shadow-red-500/30 font-bold text-sm animate-bounce">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                Emergency Red
            </button>
            <button className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 hover:scale-110 transition-transform">
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>
            </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
