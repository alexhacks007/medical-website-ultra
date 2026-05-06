import { motion } from 'framer-motion'
import { Sparkles, Bot } from 'lucide-react'
import useGlobalStore from '@/store/useGlobalStore'

const FloatingAI = () => {
    const { openModal } = useGlobalStore()

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="fixed bottom-10 left-10 z-[100] hidden lg:block"
        >
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => openModal('AI_SYMPTOM_CHECKER')}
                className="w-16 h-16 bg-slate-900 border-2 border-primary/30 rounded-2xl flex items-center justify-center shadow-2xl relative group overflow-hidden"
            >
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity" />
                <Sparkles size={24} className="text-primary animate-pulse z-10" />
                
                {/* HUD corner lines */}
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary/20 rounded-tr-sm" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary/20 rounded-bl-sm" />

                {/* Tooltip */}
                <div className="absolute right-20 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
                    Symptom AI CORE
                </div>
            </motion.button>
        </motion.div>
    )
}

export default FloatingAI
