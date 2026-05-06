import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, User, Sparkles, AlertTriangle, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useGlobalStore from '@/store/useGlobalStore'

const AIChatModal = () => {
    const { 
        modal, 
        closeModal, 
        aiChatHistory, 
        addToChatHistory, 
        aiSymptomState, 
        setAIAnalyzing 
    } = useGlobalStore()
    const [input, setInput] = useState('')
    const scrollRef = useRef(null)

    const isOpen = modal.isOpen && modal.type === 'AI_SYMPTOM_CHECKER'

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [aiChatHistory])

    const navigate = useNavigate()
    const handleSend = async (e) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMsg = { role: 'user', content: input }
        addToChatHistory(userMsg)
        setInput('')
        
        setAIAnalyzing(true)
        
        // Advanced Mock AI Logic
        setTimeout(() => {
            const lowerInput = userMsg.content.toLowerCase()
            let aiResponse = { role: 'ai' }

            if (lowerInput.includes('chest') || lowerInput.includes('heart')) {
                aiResponse = {
                    ...aiResponse,
                    content: "I've detected symptoms related to chest discomfort. This requires priority attention.",
                    diagnosis: "Potential Acute Cardiac Event Risk",
                    risk: "High",
                    recommended: "Cardiologist",
                    target: "/doctors"
                }
            } else if (lowerInput.includes('stomach') || lowerInput.includes('pain')) {
                aiResponse = {
                    ...aiResponse,
                    content: "Your description suggests a gastro-intestinal issue. A physical checkup is recommended.",
                    diagnosis: "Abdominal Sensitivity / Gastritis",
                    risk: "Medium",
                    recommended: "Gastroenterologist",
                    target: "/doctors"
                }
            } else if (lowerInput.includes('headache') || lowerInput.includes('fever')) {
                aiResponse = {
                    ...aiResponse,
                    content: "Fever and headaches are common but need monitoring. Stay hydrated and track your temperature.",
                    diagnosis: "Common Viral Syndrome",
                    risk: "Low",
                    recommended: "General Physician",
                    target: "/doctors"
                }
            } else {
                aiResponse = {
                    ...aiResponse,
                    content: "I've noted your symptoms. Based on our clinical database, talking to a General Practitioner is the best first step.",
                    diagnosis: "General Wellness Review Needed",
                    risk: "Low",
                    recommended: "Primary Care",
                    target: "/doctors"
                }
            }

            addToChatHistory(aiResponse)
            setAIAnalyzing(false)
        }, 1500)
    }

    const handleAITriage = (target) => {
        closeModal()
        navigate(target)
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeModal}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />
                
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-2xl bg-white dark:bg-dark-surface rounded-[2.5rem] shadow-premium overflow-hidden flex flex-col h-[600px]"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-primary/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                <Bot size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold">MEDI-CARE AI</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                    Intelligent Diagnostic Layer
                                </p>
                            </div>
                        </div>
                        <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                        {aiChatHistory.map((msg, i) => (
                            <motion.div 
                                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={i} 
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-100 text-slate-600' : 'bg-primary/10 text-primary'}`}>
                                        {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                    </div>
                                    <div className="space-y-2">
                                        <div className={`p-4 rounded-3xl text-sm font-medium leading-relaxed ${
                                            msg.role === 'user' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-700'
                                        }`}>
                                            {msg.content}
                                        </div>
                                        {msg.diagnosis && (
                                            <div className="border border-slate-100 rounded-2xl p-4 bg-white shadow-sm space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Result</span>
                                                    <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                                                        msg.risk === 'High' ? 'bg-red-100 text-red-600' : 
                                                        msg.risk === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                                                    }`}>
                                                        Risk: {msg.risk}
                                                    </div>
                                                </div>
                                                <h4 className="font-bold text-slate-800">{msg.diagnosis}</h4>
                                                <button 
                                                    onClick={() => handleAITriage(msg.target)}
                                                    className="w-full py-2 bg-slate-900 text-white text-[10px] font-bold uppercase rounded-lg flex items-center justify-center gap-2"
                                                >
                                                    Talk to {msg.recommended} <ChevronRight size={12} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {aiSymptomState.isAnalyzing && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                    <Sparkles size={16} className="animate-spin-slow" />
                                </div>
                                <div className="p-4 rounded-3xl bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest italic animate-pulse">
                                    Analyzing Symptoms...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer / Input */}
                    <div className="p-6 border-t border-slate-100">
                        <form onSubmit={handleSend} className="relative">
                            <input 
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Describe your symptoms (e.g., I have a slight headache...)"
                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-6 pr-14 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                            <button 
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                        <p className="mt-3 text-[10px] text-center text-slate-400 font-medium">
                           ⚠️ MEDI-CARE AI is an experimental tool. For emergencies, contact local medical services immediately.
                        </p>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default AIChatModal
