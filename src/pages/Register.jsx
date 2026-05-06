import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react'
import useAuthStore from '@/store/useAuthStore'

const Register = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuthStore()
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            login({ name: 'New User', email: 'user@example.com', role: 'user' }, 'mock-jwt-token')
            navigate('/dashboard')
        }, 1500)
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-dark-bg">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[500px] bg-white dark:bg-dark-surface p-8 md:p-12 rounded-[2rem] shadow-soft-lg space-y-8"
            >
                <div className="text-center space-y-2">
                    <Link to="/" className="inline-flex items-center gap-2 mb-4 group justify-center">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform">
                            <Heart size={24} fill="currentColor" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">Med<span className="text-primary">Pulse</span></span>
                    </Link>
                    <h1 className="text-3xl font-bold">Create Account</h1>
                    <p className="text-slate-500">Join thousands of patients getting better care.</p>
                </div>

                <form className="space-y-5" onSubmit={handleRegister}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">First Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input type="text" placeholder="John" className="input-field pl-12" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Last Name</label>
                            <input type="text" placeholder="Doe" className="input-field" required />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input type="email" placeholder="name@example.com" className="input-field pl-12" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Create Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input type="password" placeholder="••••••••" className="input-field pl-12" required />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <input type="checkbox" className="w-5 h-5 accent-primary cursor-pointer" id="terms" required />
                        <label htmlFor="terms" className="text-xs text-slate-500 leading-tight">
                            I agree to the <span className="text-primary font-bold">Terms of Service</span> and <span className="text-primary font-bold">Privacy Policy</span>.
                        </label>
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                    >
                        {isLoading ? 'Creating Account...' : 'Get Started'} <ArrowRight size={20} />
                    </button>
                </form>

                <p className="text-center text-sm text-slate-500">
                    Already have an account? <Link to="/login" className="text-primary font-bold">Sign In</Link>
                </p>
            </motion.div>
        </div>
    )
}

export default Register
