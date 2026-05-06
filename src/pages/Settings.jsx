import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Bell, Shield, Eye, Laptop, Globe, CreditCard, ChevronRight, Check, Lock, Smartphone, Wallet } from 'lucide-react'
import useGlobalStore from '@/store/useGlobalStore'

const Settings = () => {
    const [activeTab, setActiveTab] = useState('PROFILE')
    const { addNotification } = useGlobalStore()

    const sidebarItems = [
        { id: 'PROFILE', label: 'Profile Info', icon: <User size={18} /> },
        { id: 'SECURITY', label: 'Security', icon: <Lock size={18} /> },
        { id: 'BILLING', label: 'Billing', icon: <Wallet size={18} /> },
        { id: 'APPS', label: 'Apps', icon: <Smartphone size={18} /> },
        { id: 'PRIVACY', label: 'Privacy', icon: <Shield size={18} /> },
    ]

    const handleSave = () => {
        addNotification({ title: 'Success', message: 'Settings synchronization complete', type: 'success' })
    }

    return (
        <div className="space-y-10 max-w-5xl">
            <div>
                <h1 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">System Configuration</h1>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Manage your professional clinical presence</p>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-soft-lg overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
                {/* Left Sidebar */}
                <div className="w-full lg:w-72 border-r border-slate-100 p-8 space-y-4">
                    {sidebarItems.map(item => (
                        <div 
                            key={item.id} 
                            onClick={() => setActiveTab(item.id)}
                            className={`p-4 rounded-2xl flex items-center gap-4 font-black text-[10px] uppercase tracking-widest cursor-pointer transition-all ${
                                activeTab === item.id ? 'bg-primary/10 text-primary shadow-sm' : 'text-slate-400 hover:bg-slate-50'
                            }`}
                        >
                            {item.icon} {item.label}
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-8 lg:p-16">
                    <AnimatePresence mode="wait">
                        {activeTab === 'PROFILE' && (
                            <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                                <div className="flex items-center gap-8 mb-10">
                                    <div className="relative group">
                                        <div className="w-28 h-28 rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-soft-md">
                                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" alt="" />
                                        </div>
                                        <div className="absolute inset-0 bg-black/60 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[8px] font-black uppercase text-white cursor-pointer tracking-widest">Update Photo</div>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter">Alex Johnson</h2>
                                        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mt-1 italic">Verified Patient Premium</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Legal Full Name</label>
                                        <input type="text" className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-primary/20 transition-all" defaultValue="Alex Johnson" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                                        <input type="email" className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-primary/20 transition-all" defaultValue="alex.j@pulse.med" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secondary Contact</label>
                                        <input type="text" className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-primary/20 transition-all" placeholder="+1 (555) 000-0000" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Timezone</label>
                                        <select className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-sm font-bold outline-none">
                                            <option>Eastern Standard Time (EST)</option>
                                            <option>Pacific Standard Time (PST)</option>
                                        </select>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'SECURITY' && (
                            <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                                <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">Authentication Security</h3>
                                <div className="space-y-4">
                                    <div className="p-6 rounded-[2rem] border border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center"><Shield size={18} /></div>
                                            <div>
                                                <h4 className="text-sm font-black text-slate-800 uppercase">Two-Factor Authentication</h4>
                                                <p className="text-[10px] text-slate-400 font-medium">Extra layer of security for your clinical data</p>
                                            </div>
                                        </div>
                                        <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="p-6 rounded-[2rem] border border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Lock size={18} /></div>
                                            <div>
                                                <h4 className="text-sm font-black text-slate-800 uppercase">Biometric Login</h4>
                                                <p className="text-[10px] text-slate-400 font-medium">Use FaceID or Fingerprint on supported devices</p>
                                            </div>
                                        </div>
                                        <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic">Update Password Strategy</button>
                            </motion.div>
                        )}

                        {activeTab === 'BILLING' && (
                            <motion.div key="billing" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                                <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">Management / Plans</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="p-8 rounded-[2.5rem] border-2 border-primary bg-primary/5 space-y-6">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-primary">ACTIVE PLAN</span>
                                            <span className="text-slate-400">Monthly</span>
                                        </div>
                                        <h4 className="text-3xl font-black text-slate-800 tracking-tighter">$29.00<span className="text-sm">/mo</span></h4>
                                        <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase">Unlimited specialist consults and premium diagnostic storage.</p>
                                    </div>
                                    <div className="p-8 rounded-[2.5rem] border-2 border-slate-50 bg-slate-50/50 space-y-6 flex flex-col justify-center items-center">
                                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Upgrade Available</p>
                                        <button className="text-[10px] font-black text-slate-800 uppercase tracking-widest hover:text-primary transition-colors underline">View Enterprise Plans</button>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Default Payment Method</label>
                                   <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                       <div className="flex items-center gap-3">
                                           <div className="w-10 h-7 bg-white border rounded flex items-center justify-center font-black italic text-[8px]">VISA</div>
                                           <span className="text-sm font-bold text-slate-800">•••• 8822</span>
                                       </div>
                                       <button className="text-[10px] font-black text-primary uppercase">Edit</button>
                                   </div>
                                </div>
                            </motion.div>
                        )}
                        {activeTab === 'APPS' && (
                            <motion.div key="apps" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                                <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">Connected Ecosystem</h3>
                                <div className="grid gap-4">
                                    {[
                                        { name: 'Apple Health', desc: 'Sync vital signs and activity', status: 'Connected' },
                                        { name: 'Google Fit', desc: 'Import sleep and nutrition data', status: 'Disconnected' },
                                        { name: 'Fitbit', desc: 'Track heart rate variability', status: 'Disconnected' },
                                    ].map(app => (
                                        <div key={app.name} className="p-6 rounded-[2rem] border border-slate-50 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center"><Smartphone size={18} /></div>
                                                <div>
                                                    <h4 className="text-sm font-black text-slate-800 uppercase">{app.name}</h4>
                                                    <p className="text-[10px] text-slate-400 font-medium">{app.desc}</p>
                                                </div>
                                            </div>
                                            <button className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase ${app.status === 'Connected' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                                                {app.status === 'Connected' ? 'Manage' : 'Connect'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'PRIVACY' && (
                            <motion.div key="privacy" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
                                <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">Clinical Privacy Control</h3>
                                <div className="space-y-6">
                                    <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white space-y-4">
                                        <div className="flex items-center gap-3 text-primary">
                                            <Shield size={20} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Clinical Encryption Active</span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-400 leading-relaxed">Your medical records are encrypted with AES-256 standards. Only you and your authorized specialists can decrypt this data.</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center px-4">
                                            <span className="text-[10px] font-black text-slate-800 uppercase">Share data with research partners</span>
                                            <div className="w-10 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                                                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center px-4">
                                            <span className="text-[10px] font-black text-slate-800 uppercase">Make profile discoverable to specialists</span>
                                            <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                                                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="mt-20 pt-10 border-t border-slate-50 flex justify-end gap-4">
                        <button className="px-8 py-4 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100">Reset Defaults</button>
                        <button onClick={handleSave} className="px-8 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">Save All Changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
