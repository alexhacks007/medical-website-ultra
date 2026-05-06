import { Outlet, Link, useLocation } from 'react-router-dom'
import { 
    LayoutDashboard, 
    Calendar, 
    ClipboardList, 
    MessageSquare, 
    Settings, 
    LogOut,
    Menu,
    X,
    Bell,
    User
} from 'lucide-react'
import { useState } from 'react'
import useAuthStore from '@/store/useAuthStore'

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const location = useLocation()
    const { logout, user } = useAuthStore()

    const menuItems = [
        { label: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { label: 'Appointments', path: '/dashboard/appointments', icon: <Calendar size={20} /> },
        { label: 'Medical Records', path: '/dashboard/records', icon: <ClipboardList size={20} /> },
        { label: 'Messages', path: '/dashboard/messages', icon: <MessageSquare size={20} /> },
        { label: 'Settings', path: '/dashboard/settings', icon: <Settings size={20} /> },
    ]

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex flex-col w-72 bg-white dark:bg-dark-surface border-r border-slate-200 dark:border-slate-800 p-6">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                        <User size={24} />
                    </div>
                    <span className="text-xl font-bold dark:text-white">Pulse<span className="text-primary">User</span></span>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`flex items-center gap-3 p-3.5 rounded-xl transition-all font-medium ${
                                location.pathname === item.path 
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary'
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <button 
                    onClick={logout}
                    className="flex items-center gap-3 p-3.5 mt-auto rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Dashboard Header */}
                <header className="h-20 bg-white dark:bg-dark-surface border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0">
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden p-2 text-slate-600"
                    >
                        <Menu size={24} />
                    </button>

                    <h2 className="hidden md:block text-xl font-bold">Dashboard</h2>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100">
                            <Bell size={22} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                           <div className="text-right hidden sm:block">
                               <p className="text-sm font-bold leading-tight">{user?.name || 'Guest User'}</p>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Patient ID: #8822</p>
                           </div>
                           <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-primary/20">
                               <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="Avatar" />
                           </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-10">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout
