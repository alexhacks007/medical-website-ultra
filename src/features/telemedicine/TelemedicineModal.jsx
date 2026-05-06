import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Maximize, User, ShieldCheck } from 'lucide-react'
import useGlobalStore from '@/store/useGlobalStore'

const TelemedicineModal = () => {
    const { modal, closeModal } = useGlobalStore()
    const [isMuted, setIsMuted] = useState(false)
    const [isVideoOff, setIsVideoOff] = useState(false)

    const isOpen = modal.isOpen && modal.type === 'VIDEO_CONSULTATION'

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[110] bg-slate-900 flex items-center justify-center">
                <motion.div 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.1, opacity: 0 }}
                    className="w-full h-full relative flex flex-col"
                >
                    {/* Main Video Area */}
                    <div className="flex-1 relative bg-slate-800">
                        {/* Doctor's Video (Large) */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <img 
                                src="https://images.unsplash.com/photo-1559839734-2b71f15367ef?auto=format&fit=crop&q=80&w=1200" 
                                className="w-full h-full object-cover opacity-60" 
                                alt="Doctor" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                            
                            <div className="text-center space-y-4">
                                <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full mx-auto flex items-center justify-center border-2 border-white/20 animate-pulse">
                                    <User size={48} className="text-white/50" />
                                </div>
                                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Dr. Sarah Johnson</h2>
                                <p className="text-primary font-bold text-xs uppercase tracking-[0.3em]">Connecting securely...</p>
                            </div>
                        </div>

                        {/* Patient's Video (PIP) */}
                        <motion.div 
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            className="absolute top-8 right-8 w-48 aspect-video bg-slate-700 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl z-20 cursor-move"
                        >
                            {isVideoOff ? (
                                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                                    <VideoOff size={24} />
                                </div>
                            ) : (
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover" alt="Me" />
                            )}
                            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur-md rounded text-[8px] font-bold text-white uppercase">You</div>
                        </motion.div>

                        {/* Encounter Details Overlay */}
                        <div className="absolute top-8 left-8 space-y-4">
                            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-3">
                                <ShieldCheck className="text-green-500" size={20} />
                                <div>
                                    <p className="text-[8px] font-black text-slate-400 uppercase">Secure Link</p>
                                    <p className="text-[10px] font-bold text-white uppercase">End-to-End Encrypted</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="h-24 bg-slate-900/80 backdrop-blur-2xl border-t border-white/5 flex items-center justify-center gap-6 px-8 relative">
                        <div className="absolute left-8 hidden md:flex items-center gap-4 text-white/50">
                            <button className="hover:text-white transition-colors"><MessageSquare size={20} /></button>
                            <button className="hover:text-white transition-colors"><Maximize size={20} /></button>
                        </div>

                        <button 
                            onClick={() => setIsMuted(!isMuted)}
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isMuted ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                        </button>

                        <button 
                            onClick={closeModal}
                            className="w-16 h-16 bg-red-600 text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-red-600/30 hover:scale-110 active:scale-95 transition-all"
                        >
                            <PhoneOff size={28} />
                        </button>

                        <button 
                            onClick={() => setIsVideoOff(!isVideoOff)}
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isVideoOff ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                            {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
                        </button>

                        <div className="absolute right-8 text-right hidden md:block">
                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Duration</p>
                            <p className="text-sm font-bold text-white tracking-widest leading-none">12:45</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default TelemedicineModal
