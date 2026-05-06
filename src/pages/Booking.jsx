import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, User, CreditCard, Calendar, ArrowRight, ArrowLeft, Clock } from 'lucide-react'
import { useSearchParams, useNavigate, useParams } from 'react-router-dom'
import useGlobalStore from '@/store/useGlobalStore'

const Booking = () => {
    const { doctorId } = useParams()
    const [step, setStep] = useState(1)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { currentBooking, setBookingData, bookAppointment, addNotification } = useGlobalStore()

    // Mock Doctor Data for lookup
    const doctorsData = [
        { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Senior Cardiovascular Surgeon', image: '/images/doctors/doctor_2.png' },
        { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatologist', image: '/images/doctors/doctor_1.png' },
        { id: 3, name: 'Dr. Emily Williams', specialty: 'Pediatrician', image: '/images/doctors/doctor_4.png' },
        { id: 4, name: 'Dr. James Wilson', specialty: 'Neurologist', image: '/images/doctors/doctor_3.png' }
    ]

    useEffect(() => {
        if (doctorId && !currentBooking.doctorName) {
            const doc = doctorsData.find(d => d.id === parseInt(doctorId))
            if (doc) {
                setBookingData({ 
                    doctorId: doc.id, 
                    doctorName: doc.name,
                    doctorImage: doc.image,
                    doctorSpecialty: doc.specialty
                })
            }
        }
    }, [doctorId])
    
    const steps = [
        { id: 1, title: 'In-Patient', icon: <User size={18} /> },
        { id: 2, title: 'Schedule', icon: <Calendar size={18} /> },
        { id: 3, title: 'Profile', icon: <User size={18} /> },
        { id: 4, title: 'Secure Pay', icon: <CreditCard size={18} /> }
    ]

    const handlePatientSubmit = (e) => {
        e.preventDefault()
        if (!currentBooking.patientName) {
            addNotification({ title: 'Input Required', message: 'Please enter patient name', type: 'error' })
            return
        }
        setStep(4)
    }

    const handleFinalConfirm = () => {
        bookAppointment({
            doc: currentBooking.doctorName || 'General Specialist',
            date: currentBooking.date || 'Today',
            time: currentBooking.slot || 'Selected Slot',
            type: 'Video'
        })
        addNotification({ title: 'Booking Successful', message: 'Your healthcare session is secured', type: 'success' })
        setStep(5)
    }

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                   <h1 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">SECURE BOOKING PIPELINE</h1>
                   <div className="flex items-center gap-2">
                       <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                       <span className="text-[10px] font-black text-slate-400 uppercase">Live Slot Sync Active</span>
                   </div>
                </div>

                {/* Stepper */}
                <div className="max-w-3xl mx-auto mb-16 px-10">
                    <div className="flex items-center justify-between relative">
                        {steps.map((s, i) => (
                            <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all border-2 ${
                                    step >= s.id ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' : 'bg-white border-slate-100 text-slate-300'
                                }`}>
                                    {step > s.id ? <CheckCircle2 size={24} /> : s.icon}
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s.id ? 'text-slate-800' : 'text-slate-400'}`}>
                                    {s.title}
                                </span>
                            </div>
                        ))}
                        <div className="absolute top-6 left-0 h-0.5 bg-slate-100 w-full -z-0"></div>
                        <motion.div 
                            className="absolute top-6 left-0 h-0.5 bg-primary -z-0" 
                            animate={{ width: `${((step > 4 ? 4 : step) - 1) * 33.3}%` }}
                            transition={{ duration: 0.5 }}
                        ></motion.div>
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] shadow-premium overflow-hidden border border-slate-100">
                    <AnimatePresence mode="wait">
                        {step <= 4 ? (
                            <motion.div key="booking-flow" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col lg:flex-row min-h-[600px]">
                                {/* Left: Doctor Info & Summary (Sticky feeling) */}
                                <div className="lg:w-1/3 bg-slate-900 text-white p-12 space-y-10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full"></div>
                                    <div className="space-y-6 relative z-10">
                                        <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none">Consultation <br /><span className="text-primary not-italic">Summary</span></h2>
                                        <div className="p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/5 space-y-6 font-bold">
                                            {[
                                                { label: 'Patient', val: currentBooking.patientName || 'Not Set' },
                                                { label: 'Specialist', val: currentBooking.doctorName || 'Any Specialist' },
                                                { label: 'Slot', val: `${currentBooking.date || 'TBD'} • ${currentBooking.slot || 'TBD'}` },
                                                { label: 'Service', val: 'Digital Diagnostic' },
                                            ].map((item, i) => (
                                                <div key={i} className="flex justify-between items-center text-[10px]">
                                                    <span className="text-slate-500 uppercase">{item.label}</span>
                                                    <span className="text-white uppercase tracking-wider">{item.val}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6 relative z-10">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Patient Queue</h4>
                                        <div className="flex -space-x-4">
                                            {[1,2,3,4,5].map(i => (
                                                <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-800 overflow-hidden shadow-2xl">
                                                    <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="" />
                                                </div>
                                            ))}
                                            <div className="w-12 h-12 rounded-full border-4 border-slate-900 bg-primary/20 text-primary flex items-center justify-center text-xs font-black">+12</div>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-10 border-t border-white/5">
                                        <p className="text-[9px] text-slate-500 font-bold uppercase leading-relaxed">
                                            Healthcare is critical. Your data is protected under <span className="text-white">MEDI-CARE ULTRA</span> advanced encryption standards.
                                        </p>
                                    </div>
                                </div>

                                {/* Right: Active Step UI */}
                                <div className="lg:w-2/3 p-12 md:p-20 overflow-y-auto">
                                    {step === 1 && (
                                        <div className="space-y-12">
                                            <div className="space-y-4">
                                                <h3 className="text-4xl font-black text-slate-800 italic uppercase">Verify Specialist</h3>
                                                <p className="text-slate-400 font-bold text-sm">Proceed with the selected medical specialist or change your choice.</p>
                                            </div>
                                            <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row items-center gap-8">
                                                <div className="w-32 h-32 rounded-[2rem] overflow-hidden shadow-2xl bg-white">
                                                    <img 
                                                        src={currentBooking.doctorImage || '/images/doctors/doctor_1.png'} 
                                                        className="w-full h-full object-cover" 
                                                        alt={currentBooking.doctorName} 
                                                        onError={(e) => { e.target.src = '/images/doctors/doctor_1.png' }}
                                                    />
                                                </div>
                                                <div className="space-y-3 text-center md:text-left">
                                                    <h4 className="text-2xl font-black italic uppercase text-slate-800">{currentBooking.doctorName || 'Dr. Sarah Johnson'}</h4>
                                                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">{currentBooking.doctorSpecialty || 'Senior Cardiovascular Surgeon'}</p>
                                                    <div className="flex gap-2">
                                                        <span className="bg-white px-3 py-1 rounded-lg border border-slate-100 text-[10px] font-black">⭐ 4.9</span>
                                                        <span className="bg-white px-3 py-1 rounded-lg border border-slate-100 text-[10px] font-black uppercase text-green-600">Verified</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={() => setStep(2)} className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl hover:scale-[1.02] transition-all">Continue to Schedule</button>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-12">
                                            <div className="space-y-4">
                                                <h3 className="text-4xl font-black text-slate-800 italic uppercase">Secure Your Slot</h3>
                                                <p className="text-slate-400 font-bold text-sm">Real-time availability sync active for the next 05:00 minutes.</p>
                                            </div>
                                            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                                                {['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM', '08:30 PM'].map(time => (
                                                    <button 
                                                        key={time} 
                                                        onClick={() => setBookingData({ slot: time })}
                                                        className={`py-5 rounded-2xl text-[11px] font-black transition-all border-2 ${
                                                           currentBooking.slot === time ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' : 'bg-slate-50 border-slate-50 text-slate-400 hover:border-slate-200'
                                                        }`}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="flex gap-4">
                                                <button onClick={() => setStep(1)} className="flex-1 py-6 bg-slate-100 text-slate-600 rounded-[2rem] font-black uppercase tracking-widest text-sm">Previous</button>
                                                <button onClick={() => setStep(3)} className="flex-[2] py-6 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/20">Set Patient Info</button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <form onSubmit={handlePatientSubmit} className="space-y-12">
                                            <div className="space-y-4">
                                                <h3 className="text-4xl font-black text-slate-800 italic uppercase">Patient File</h3>
                                                <p className="text-slate-400 font-bold text-sm">Enter the details of the individual receiving consultation.</p>
                                            </div>
                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Legal Name</label>
                                                    <input 
                                                        type="text" 
                                                        required
                                                        value={currentBooking.patientName}
                                                        onChange={(e) => setBookingData({ patientName: e.target.value })}
                                                        className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] px-8 py-6 text-slate-800 font-bold outline-none focus:border-primary/30 focus:bg-white transition-all shadow-inner" 
                                                        placeholder="e.g. Alex Johnson" 
                                                    />
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-8">
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Age</label>
                                                        <input type="number" className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] px-8 py-6 text-slate-800 font-bold outline-none shadow-inner" placeholder="24" />
                                                    </div>
                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gender</label>
                                                        <select className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] px-8 py-6 text-slate-800 font-bold outline-none shadow-inner">
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                            <option>Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <button type="button" onClick={() => setStep(2)} className="flex-1 py-6 bg-slate-100 text-slate-600 rounded-[2rem] font-black uppercase tracking-widest text-sm">Previous</button>
                                                <button type="submit" className="flex-[2] py-6 bg-primary text-white rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/20">Go to Checkout</button>
                                            </div>
                                        </form>
                                    )}

                                    {step === 4 && (
                                        <div className="space-y-12">
                                            <div className="space-y-4">
                                                <h3 className="text-4xl font-black text-slate-800 italic uppercase">Secure Checkout</h3>
                                                <p className="text-slate-400 font-bold text-sm">Finalize your consultation with our encrypted payment gateway.</p>
                                            </div>
                                            <div className="space-y-4">
                                                {[
                                                    { id: 'UPI', label: 'UPI / Direct Bank', val: 'No Processing Fee' },
                                                    { id: 'VISA', label: 'Credit / Debit Card', val: 'Verified by MEDI-CARE' },
                                                    { id: 'WALLET', label: 'Digital Wallets', val: 'Fast & Secure' },
                                                ].map(opt => (
                                                    <div 
                                                        key={opt.id} 
                                                        onClick={() => setBookingData({ paymentMethod: opt.id })}
                                                        className={`group flex items-center justify-between p-6 rounded-[2rem] border-2 cursor-pointer transition-all ${
                                                            currentBooking.paymentMethod === opt.id ? 'border-primary bg-primary/5 shadow-lg' : 'border-slate-50 bg-slate-50 hover:border-slate-200'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-6">
                                                            <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center ${currentBooking.paymentMethod === opt.id ? 'border-primary' : 'border-slate-200'}`}>
                                                                <div className={`w-2 h-2 rounded-full ${currentBooking.paymentMethod === opt.id ? 'bg-primary' : 'bg-transparent'}`}></div>
                                                            </div>
                                                            <span className="font-black text-slate-800 uppercase tracking-tighter">{opt.label}</span>
                                                        </div>
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">{opt.val}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <button onClick={handleFinalConfirm} className="w-full py-8 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-sm shadow-premium hover:scale-[1.02] transition-all">
                                                Pay & Secure Appointment
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-32 space-y-12">
                                <motion.div 
                                    initial={{ rotate: -20, scale: 0 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    className="w-40 h-40 bg-green-100 text-green-600 rounded-[3rem] flex items-center justify-center mx-auto shadow-2xl shadow-green-200"
                                >
                                    <CheckCircle2 size={80} />
                                </motion.div>
                                <div className="space-y-6">
                                    <h2 className="text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Consultation <br /><span className="text-primary not-italic">Synchronized</span></h2>
                                    <p className="text-slate-400 font-bold max-w-lg mx-auto text-lg leading-relaxed">
                                        System check complete. Your clinical session with <span className="text-slate-800 font-black">{currentBooking.doctorName}</span> is authorized.
                                    </p>
                                </div>
                                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                    <button onClick={() => navigate('/dashboard')} className="w-full md:w-auto bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl">Enter Dashboard</button>
                                    <button className="w-full md:w-auto border-2 border-slate-100 text-slate-400 px-12 py-5 rounded-2xl font-black uppercase tracking-widest">Download Receipt</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default Booking
