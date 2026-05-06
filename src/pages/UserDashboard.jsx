import { motion } from 'framer-motion'
import { Calendar, Clock, Clipboard, ArrowRight, Activity, Droplets, Thermometer, Heart, Bell, Zap, Plus, AlertCircle, Check, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import useGlobalStore from '@/store/useGlobalStore'
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
} from 'recharts'

const data = [
    { name: 'Jan', bpm: 72, temp: 36.6 },
    { name: 'Feb', bpm: 75, temp: 36.8 },
    { name: 'Mar', bpm: 68, temp: 36.5 },
    { name: 'Apr', bpm: 70, temp: 36.7 },
    { name: 'May', bpm: 82, temp: 37.2 },
    { name: 'Jun', bpm: 74, temp: 36.6 },
]

const UserDashboard = () => {
    const { openModal, userAppointments, cancelAppointment, addNotification } = useGlobalStore()

    const handleCancel = (id, doc) => {
        cancelAppointment(id)
        addNotification({ title: 'Appointment Terminated', message: `Consultation with ${doc} cancelled`, type: 'error' })
    }

    return (
        <div className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left: Appointments */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-extrabold text-slate-800 uppercase italic">Upcoming Sessions</h3>
                        <Link to="/doctors" className="text-primary font-black text-[10px] uppercase tracking-widest hover:underline">Find Specialists</Link>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        {userAppointments.filter(a => a.status === 'Upcoming').map((appt, i) => (
                            <div key={appt.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-soft-md space-y-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors"></div>
                                <div className="flex justify-between items-start relative z-10">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{appt.date}</span>
                                            <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                            <span className="text-[10px] font-black text-primary uppercase">{appt.type}</span>
                                        </div>
                                        <h4 className="font-black text-slate-800 uppercase italic tracking-tighter text-lg">{appt.doc}</h4>
                                    </div>
                                    <button onClick={() => handleCancel(appt.id, appt.doc)} className="p-2 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-xl transition-all">
                                        <X size={16} />
                                    </button>
                                </div>

                                {i === 0 && (
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
                                        <div className="flex items-center justify-between text-[10px] font-black uppercase italic">
                                            <span className="text-orange-500 flex items-center gap-1 animate-pulse">
                                                <AlertCircle size={10} /> Live: Running 10m Late
                                            </span>
                                            <span className="text-slate-400">Queue #3</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: '65%' }}
                                                className="h-full bg-primary"
                                            ></motion.div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3 relative z-10">
                                    <button 
                                        onClick={() => openModal('VIDEO_CONSULTATION')}
                                        className="flex-1 py-4 bg-primary text-white text-[10px] font-black uppercase rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
                                    >
                                        Launch Consultation
                                    </button>
                                    <button className="w-14 h-14 bg-slate-50 text-slate-400 flex items-center justify-center rounded-2xl border border-slate-100 hover:bg-white hover:text-primary transition-all">
                                        <Calendar size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {userAppointments.filter(a => a.status === 'Upcoming').length === 0 && (
                            <div className="col-span-2 py-16 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200 space-y-4">
                                <Plus size={32} className="mx-auto text-slate-200" />
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No active consultations found.</p>
                                <Link to="/doctors" className="inline-block px-8 py-3 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-soft-sm">Book Specialist Now</Link>
                            </div>
                        )}
                    </div>

                    {/* Digital Health Timeline */}
                    <div className="pt-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-extrabold text-slate-800 uppercase italic tracking-tighter">Health Timeline</h3>
                            <button 
                                onClick={() => addNotification({ title: 'System', message: 'Timeline Event Creation coming in v2.1', type: 'info' })}
                                className="flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                            >
                                <Plus size={12} /> Add Event
                            </button>
                        </div>
                        <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                            {[
                                { title: 'Annual Heart Checkup', type: 'Upcoming', date: 'May 20, 2026', icon: <Heart size={16} />, color: 'bg-primary text-white border-primary' },
                                { title: 'Blood Diagnostic - Panel A', type: 'Completed', date: 'Mar 12, 2026', icon: <Activity size={16} />, color: 'bg-green-500 text-white border-green-500' },
                                { title: 'Prescription Refilled', type: 'System', date: 'Feb 05, 2026', icon: <Clipboard size={16} />, color: 'bg-slate-900 text-white border-slate-900' },
                            ].map((event, i) => (
                                <div key={i} className="pl-14 relative group">
                                    <div className={`absolute left-2.5 top-0 w-8 h-8 rounded-xl border-4 border-white shadow-lg flex items-center justify-center z-10 ${event.color} group-hover:scale-110 transition-transform`}>
                                        {event.icon}
                                    </div>
                                    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-soft-sm group-hover:shadow-soft-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{event.date}</p>
                                            <h4 className="font-bold text-slate-800">{event.title}</h4>
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
                                            event.type === 'Upcoming' ? 'bg-primary/10 text-primary' : 
                                            event.type === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {event.type}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Notifications & Profile */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft-lg space-y-6">
                        <h3 className="font-extrabold text-lg">Notifications</h3>
                        <div className="space-y-6">
                            {[
                                { title: 'Health check reminder', time: '1h ago', icon: <Heart size={16} />, color: 'text-red-500 bg-red-50' },
                                { title: 'Meeting appointment', time: '5h ago', icon: <Calendar size={16} />, color: 'text-primary bg-primary-50' },
                                { title: 'Dental checkup', time: '1d ago', icon: <Zap size={16} />, color: 'text-accent bg-accent-50' },
                                { title: 'Subscribe reminder', time: '2d ago', icon: <Bell size={16} />, color: 'text-purple-500 bg-purple-50' },
                            ].map((n, i) => (
                                <div key={i} className="flex gap-4 group cursor-pointer">
                                    <div className={`w-10 h-10 ${n.color} rounded-xl shrink-0 flex items-center justify-center transition-all group-hover:scale-110`}>
                                        {n.icon}
                                    </div>
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-bold text-slate-700">{n.title}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">{n.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-premium space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
                        <div className="flex justify-between items-center relative z-10">
                            <h3 className="font-extrabold text-lg uppercase italic tracking-tighter">Your Health Score</h3>
                            <button className="text-[10px] font-bold text-slate-400 uppercase">View Report</button>
                        </div>
                        <div className="flex items-center gap-6 relative z-10">
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90">
                                    <circle cx="48" cy="48" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-white/10" />
                                    <circle cx="48" cy="48" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="37" className="text-primary" />
                                </svg>
                                <span className="absolute text-2xl font-black italic">85</span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-bold">Excellent Condition</p>
                                <p className="text-[10px] text-slate-400 font-medium">Top 5% in your age group</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft-lg space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-extrabold text-lg">Health Streak</h3>
                            <span className="bg-orange-500 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">🔥 12 Days</span>
                        </div>
                        <div className="flex justify-between gap-1">
                            {['S','M','T','W','T','F','S'].map((day, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${i < 5 ? 'bg-primary text-white' : 'bg-slate-50 text-slate-300 border border-slate-100'}`}>
                                        {i < 5 ? <Check size={14} /> : day}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard
