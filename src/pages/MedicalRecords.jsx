import { motion } from 'framer-motion'
import { FileText, Download, Eye, Search, Plus, FileCode, Beaker, Clipboard } from 'lucide-react'

const MedicalRecords = () => {
    const records = [
        { id: 1, name: 'Blood Test Report', date: 'Mar 12, 2026', type: 'Laboratory', size: '1.2 MB', icon: <Beaker size={20} /> },
        { id: 2, name: 'X-Ray Chest', date: 'Feb 20, 2026', type: 'Radiology', size: '4.5 MB', icon: <FileCode size={20} /> },
        { id: 3, name: 'General Checkup Summary', date: 'Jan 15, 2026', type: 'Clinical', size: '0.8 MB', icon: <Clipboard size={20} /> },
        { id: 4, name: 'Prescription Refill', date: 'Dec 22, 2025', type: 'Pharmacy', size: '0.5 MB', icon: <FileText size={20} /> },
    ]

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">Digital Health Records</h1>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">End-to-end encrypted medical storage</p>
                </div>
                <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                    <Plus size={18} /> Upload New
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 bg-white p-2 rounded-[2rem] shadow-soft-md border border-slate-100 max-w-xl">
                <div className="flex-1 flex items-center gap-4 px-6 py-4">
                    <Search className="text-slate-300" size={20} />
                    <input type="text" placeholder="Search by document name" className="bg-transparent border-none outline-none w-full text-sm font-bold" />
                </div>
            </div>

            <div className="grid gap-4">
                {records.map((record, i) => (
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={record.id} 
                        className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                                {record.icon}
                            </div>
                            <div className="space-y-0.5">
                                <h4 className="font-black text-slate-800 uppercase tracking-tight">{record.name}</h4>
                                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                    <span>{record.type}</span>
                                    <span>•</span>
                                    <span>{record.date}</span>
                                    <span>•</span>
                                    <span>{record.size}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="p-3 bg-slate-50 text-slate-400 hover:text-primary rounded-xl transition-colors">
                                <Eye size={18} />
                            </button>
                            <button className="p-3 bg-slate-50 text-slate-400 hover:text-primary rounded-xl transition-colors">
                                <Download size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default MedicalRecords
