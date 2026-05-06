import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Send, User } from 'lucide-react'
import useGlobalStore from '@/store/useGlobalStore'

const WriteReviewModal = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState('')
    const [doctor, setDoctor] = useState('Dr. Sarah Johnson')
    const { addReview, addNotification } = useGlobalStore()

    const doctors = ['Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Emily Williams', 'Dr. James Wilson']

    const handleSubmit = (e) => {
        e.preventDefault()
        if (comment.length < 10) {
            addNotification({ title: 'System', message: 'Comment must be at least 10 characters', type: 'error' })
            return
        }
        addReview({ user: 'Alex Johnson', doc: doctor, rating, comment })
        addNotification({ title: 'Success', message: 'Your review has been verified and posted', type: 'success' })
        onClose()
        setComment('')
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            ></motion.div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-premium overflow-hidden border border-white/20"
            >
                <div className="p-10 space-y-10">
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-800">Post <span className="text-primary not-italic">Review</span></h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic leading-none">Clinical Social Proof Hub</p>
                        </div>
                        <button onClick={onClose} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-red-500 transition-colors"><X size={20} /></button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Specialist</label>
                            <select 
                                value={doctor}
                                onChange={(e) => setDoctor(e.target.value)}
                                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-primary/20 transition-all"
                            >
                                {doctors.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center block">Rating Intensity</label>
                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button 
                                        type="button"
                                        key={star} 
                                        onClick={() => setRating(star)}
                                        className={`transition-all duration-300 ${rating >= star ? 'text-primary scale-110' : 'text-slate-200 hover:text-primary/40'}`}
                                    >
                                        <Star size={32} fill={rating >= star ? "currentColor" : "none"} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinical Experience Details</label>
                            <textarea 
                                required
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full bg-slate-50 border-2 border-slate-50 rounded-[2rem] px-8 py-6 text-sm font-bold outline-none focus:border-primary/20 transition-all min-h-[150px] resize-none"
                                placeholder="Describe your experience with the specialist..."
                            />
                        </div>

                        <button type="submit" className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl shadow-slate-200 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                            <Send size={18} /> Publish Recommendation
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default WriteReviewModal
