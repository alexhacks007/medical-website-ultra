import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
    Users, 
    Stethoscope, 
    CalendarCheck, 
    Plus, 
    Search, 
    ArrowUpRight, 
    ArrowDownRight 
} from 'lucide-react'
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts'

const stats = [
    { label: 'Total Patients', value: '12,842', trend: '+12.5%', color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Active Doctors', value: '482', trend: '+3.2%', color: 'text-secondary', bg: 'bg-secondary/10' },
    { label: 'Appointments', value: '3,240', trend: '-2.1%', color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Total Revenue', value: '$84,200', trend: '+8.4%', color: 'text-green-600', bg: 'bg-green-100' },
]

const appointmentData = [
    { name: 'Mon', count: 45 },
    { name: 'Tue', count: 52 },
    { name: 'Wed', count: 38 },
    { name: 'Thu', count: 65 },
    { name: 'Fri', count: 58 },
    { name: 'Sat', count: 30 },
    { name: 'Sun', count: 20 },
]

const AdminDashboard = () => {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#0F172A] italic tracking-tighter">ADMIN PANEL</h1>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-soft-md space-y-4 group hover:shadow-premium transition-all">
                        <div className="flex justify-between items-start">
                            <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color}`}>
                                {i === 0 ? <Users size={24} /> : i === 1 ? <Stethoscope size={24} /> : i === 2 ? <CalendarCheck size={24} /> : <ArrowUpRight size={24} />}
                            </div>
                            <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-black text-slate-800 tracking-tighter mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* BI Intelligence Section */}
             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft-lg space-y-10">
                 <div className="flex items-center justify-between">
                     <h2 className="text-xl font-black uppercase italic tracking-tighter">Business Intelligence Unit</h2>
                     <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-green-500"></div>
                         <span className="text-[10px] font-bold text-slate-400 uppercase">Live Intelligence Active</span>
                     </div>
                 </div>

                 <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-10">
                        {/* Predictive Demand */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Predictive Appointment Demand</h4>
                                <span className="text-[10px] font-black text-primary uppercase">Forecast: +18% Growth</span>
                            </div>
                            <div className="h-[250px] w-full bg-slate-50/50 rounded-3xl p-6 border border-slate-50">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={appointmentData}>
                                        <defs>
                                            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.1}/>
                                                <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94A3B8'}} />
                                        <Tooltip 
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Area type="monotone" dataKey="count" stroke="#0EA5E9" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-50 space-y-4">
                                <h5 className="text-[10px] font-bold text-slate-400 uppercase italic">Peak Booking Hours</h5>
                                <p className="text-2xl font-black text-slate-800 tracking-tighter">10:00 AM - 01:00 PM</p>
                                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="w-[85%] h-full bg-primary"></div>
                                </div>
                            </div>
                            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-50 space-y-4">
                                <h5 className="text-[10px] font-bold text-slate-400 uppercase italic">Retention Rate</h5>
                                <p className="text-2xl font-black text-slate-800 tracking-tighter">92.4%</p>
                                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="w-[92%] h-full bg-secondary"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div className="bg-slate-900 text-white p-8 rounded-[2rem] space-y-6">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Doctor Performance Radar</h4>
                            <div className="aspect-square flex items-center justify-center relative">
                                <div className="absolute inset-0 border-[1px] border-white/5 rounded-full"></div>
                                <div className="absolute inset-4 border-[1px] border-white/5 rounded-full"></div>
                                <div className="absolute inset-10 border-[1px] border-white/5 rounded-full"></div>
                                {/* Mock Radar Visual */}
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <polygon points="50,10 90,50 50,90 10,50" fill="#0EA5E9" fillOpacity="0.3" stroke="#0EA5E9" strokeWidth="2" />
                                    <polygon points="50,20 80,50 50,80 20,50" fill="#14B8A6" fillOpacity="0.2" stroke="#14B8A6" strokeWidth="1" />
                                </svg>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {['Rating', 'Retention', 'Volume', 'Success'].map(label => (
                                    <div key={label} className="flex flex-col">
                                        <span className="text-[8px] font-bold text-slate-500 uppercase">{label}</span>
                                        <span className="text-xs font-black">HIGH</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Revenue Flow</h4>
                            {[
                                { label: 'Cardiology', val: '$42k', trend: '+12%' },
                                { label: 'Neurology', val: '$28k', trend: '+5%' },
                                { label: 'Gen. Medicine', val: '$14k', trend: '-2%' },
                            ].map((dept, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <span className="text-xs font-bold text-slate-600 group-hover:text-primary transition-colors">{dept.label}</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-black">{dept.val}</span>
                                        <span className={`text-[8px] font-bold ${dept.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{dept.trend}</span>
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

export default AdminDashboard
