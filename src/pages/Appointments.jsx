import { motion } from 'framer-motion'
import { Calendar, Clock, Video, User, ChevronRight, Filter } from 'lucide-react'
import useGlobalStore from '@/store/useGlobalStore'

const Appointments = () => {
    const { userAppointments } = useGlobalStore()

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">Your Appointments</h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Manage and track all medical sessions</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                        <Filter size={16} /> Filter
                    </button>
                    <button className="px-6 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                        Book New
                    </button>
                </div>
            </div>

            <div className="grid gap-6">
                {userAppointments.map((appt, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={appt.id} 
                        className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-soft-md hover:shadow-premium transition-all group flex flex-col md:flex-row md:items-center justify-between gap-8"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <User size={32} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">{appt.doc}</h3>
                                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {appt.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> {appt.time}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
                                    appt.status === 'Upcoming' ? 'bg-primary/10 text-primary' : 'bg-green-100 text-green-600'
                                }`}>
                                    {appt.status}
                                </span>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Mode: {appt.type}</p>
                            </div>
                            <button className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-all">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Appointments
