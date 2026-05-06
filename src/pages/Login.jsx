import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import useAuthStore from '@/store/useAuthStore'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuthStore()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        setIsLoading(true)
        // Mock Login
        setTimeout(() => {
            login({ name: 'Alex Johnson', email: 'alex@example.com', role: 'user' }, 'mock-jwt-token')
            navigate('/dashboard')
        }, 1500)
    }

    const handleAdminLogin = () => {
        login({ name: 'Admin One', email: 'admin@pulse.com', role: 'admin' }, 'mock-admin-token')
        navigate('/admin')
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-dark-bg">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[450px] bg-white dark:bg-dark-surface p-8 md:p-12 rounded-[2rem] shadow-soft-lg space-y-8"
            >
                <div className="text-center space-y-2">
                    <Link to="/" className="inline-flex items-center gap-2 mb-4 group justify-center">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform">
                            <Heart size={24} fill="currentColor" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">Med<span className="text-primary">Pulse</span></span>
                    </Link>
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className="text-slate-500">Log in to manage your health journey.</p>
                </div>

                <form className="space-y-5" onClick={(e) => e.stopPropagation()}>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input 
                                type="email" 
                                placeholder="name@example.com" 
                                className="input-field pl-12"
                                defaultValue="alex@example.com"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm font-bold text-slate-700">Password</label>
                            <Link to="#" className="text-sm text-primary font-bold">Forgot?</Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                placeholder="••••••••" 
                                className="input-field pl-12 pr-12"
                                defaultValue="password123"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleLogin}
                        disabled={isLoading}
                        className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'} <ArrowRight size={20} />
                    </button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-dark-surface px-4 text-slate-400 font-bold">Or demo</span></div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <button 
                        onClick={handleAdminLogin}
                        className="btn-secondary text-sm font-bold border-slate-200 py-3"
                    >
                        Explore as Admin
                    </button>
                </div>

                <p className="text-center text-sm text-slate-500">
                    Don't have an account? <Link to="/register" className="text-primary font-bold">Create one</Link>
                </p>
            </motion.div>
        </div>
    )
}

export default Login
