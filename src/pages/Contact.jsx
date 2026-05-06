import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react'

const Contact = () => {
    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-6">
                <h1 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-12 text-center md:text-left">CONTACT PAGE</h1>
                
                <div className="bg-white rounded-[2.5rem] shadow-soft-lg overflow-hidden flex flex-col lg:flex-row border border-slate-100">
                    {/* Left: Map & Info */}
                    <div className="lg:w-1/2 p-10 bg-slate-50/50 space-y-10 relative">
                        <div className="h-80 bg-slate-200 rounded-3xl overflow-hidden shadow-inner grayscale relative">
                           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-40"></div>
                           <div className="absolute inset-0 flex items-center justify-center">
                               <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white animate-bounce">
                                   <MapPin size={20} />
                               </div>
                           </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">Hospital Address</h3>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0"><MapPin size={20} /></div>
                                    <p className="text-sm font-bold text-slate-500 leading-relaxed">
                                        123 Medical Blvd, Health City,<br />New York, NY 10001
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-10 border-t border-slate-100 grid grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Emergency helpline</h4>
                                <p className="text-lg font-black text-slate-800">+91 035 7000</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Emergency helpline</h4>
                                <p className="text-lg font-black text-slate-800">+91 027 800C</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="lg:w-1/2 p-10 md:p-16 space-y-10 bg-white">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-black text-slate-800">Contact Form</h3>
                            <p className="text-sm text-slate-400 font-medium leading-relaxed">Fill out the form below and our team will get back to you shortly.</p>
                        </div>
                        
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Name</label>
                                <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Enter your name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email</label>
                                <input type="email" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Enter your email" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Message</label>
                                <textarea className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[150px]" placeholder="How can we help?"></textarea>
                            </div>
                            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-primary/30 hover:-translate-y-1 transition-all">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
