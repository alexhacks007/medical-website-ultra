import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import useGlobalStore from '@/store/useGlobalStore'

export const Toaster = () => {
    const { notifications, removeNotification } = useGlobalStore()

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 w-full max-w-sm">
            <AnimatePresence>
                {notifications.map((n) => (
                    <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        className="bg-white dark:bg-dark-surface border border-slate-100 dark:border-slate-800 p-4 rounded-2xl shadow-soft-lg flex items-start gap-4"
                    >
                        <div className={`p-2 rounded-xl scale-95 ${
                            n.type === 'success' ? 'bg-green-100 text-green-600' : 
                            n.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-primary-50 text-primary'
                        }`}>
                            {n.type === 'success' ? <CheckCircle size={18} /> : 
                             n.type === 'error' ? <AlertCircle size={18} /> : <Info size={18} />}
                        </div>
                        <div className="flex-1 pt-1">
                            {n.title && <h4 className="text-sm font-bold leading-none mb-1">{n.title}</h4>}
                            <p className="text-xs text-slate-500 leading-normal">{n.message}</p>
                        </div>
                        <button 
                            onClick={() => removeNotification(n.id)}
                            className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}
