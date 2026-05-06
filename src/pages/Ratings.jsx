import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, MessageCircle, ThumbsUp, User, Quote, ShieldCheck } from 'lucide-react'
import useGlobalStore from '@/store/useGlobalStore'
import WriteReviewModal from '@/components/WriteReviewModal'

const Ratings = () => {
    const { reviews } = useGlobalStore()
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

    const stats = [
        { label: 'Verified Patients', val: '12k+', icon: <ShieldCheck size={20} /> },
        { label: 'Average Rating', val: '4.8/5', icon: <Star size={20} /> },
        { label: 'Successful Consults', val: '50k+', icon: <ThumbsUp size={20} /> },
    ]

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto space-y-16">
                    {/* Header */}
                    <div className="text-center space-y-6">
                        <h1 className="text-sm font-black text-primary uppercase tracking-[0.4em]">Pulse Social Proof</h1>
                        <h2 className="text-5xl font-black text-slate-900 italic uppercase tracking-tighter leading-none">
                            Trusted by <br /><span className="text-primary not-italic">Thousands</span> of Patients
                        </h2>
                        <p className="text-slate-400 font-bold max-w-lg mx-auto">Real-time feedback from our global clinical network. Transparent, verified, and unfiltered medical reviews.</p>
                    </div>

                    {/* Stats Leaderboard */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {stats.map((s, i) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={s.label} 
                                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft-md flex flex-col items-center gap-4 text-center group hover:bg-primary transition-all duration-500"
                            >
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-colors">
                                    {s.icon}
                                </div>
                                <div>
                                    <h4 className="text-3xl font-black text-slate-800 group-hover:text-white transition-colors tracking-tighter">{s.val}</h4>
                                    <p className="text-[10px] font-black uppercase text-slate-400 group-hover:text-white/60 transition-colors tracking-widest">{s.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Wall of Love */}
                    <div className="space-y-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">Verified Testimonials</h3>
                            <button 
                                onClick={() => setIsReviewModalOpen(true)}
                                className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                            >
                                Write a Review
                            </button>
                        </div>
                        <div className="grid gap-6">
                            {reviews.map((review, i) => (
                                <motion.div 
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={review.id} 
                                    className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft-md relative overflow-hidden group"
                                >
                                    <Quote className="absolute -top-4 -right-4 w-24 h-24 text-slate-50 group-hover:text-primary/5 transition-colors" />
                                    <div className="relative z-10 space-y-6">
                                        <div className="flex items-center gap-1 text-primary">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                                            ))}
                                        </div>
                                        <p className="text-lg font-bold text-slate-800 leading-relaxed italic">"{review.comment}"</p>
                                        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                                    <User size={18} />
                                                </div>
                                                <div>
                                                    <h5 className="text-sm font-black text-slate-800 uppercase tracking-tight">{review.user}</h5>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Reviewed {review.doc}</p>
                                                </div>
                                            </div>
                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{review.date}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center">
                        <button className="px-12 py-5 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-all">Load More Reviews</button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isReviewModalOpen && (
                    <WriteReviewModal 
                        isOpen={isReviewModalOpen} 
                        onClose={() => setIsReviewModalOpen(false)} 
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

export default Ratings
