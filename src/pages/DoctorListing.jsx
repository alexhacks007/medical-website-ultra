import { useState, useMemo } from 'react'
import DoctorCard from '@/components/DoctorCard'
import { Filter, Search, ChevronDown, SlidersHorizontal, X, Zap, Clock, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import useGlobalStore from '@/store/useGlobalStore'

const doctorsData = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    rating: 4.9,
    reviews: 124,
    location: 'New York, Medical Center',
    experience: 12,
    fee: 150,
    image: '/images/doctors/doctor_2.png',
    availability: 'Available Today'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    rating: 4.8,
    reviews: 89,
    location: 'San Francisco, Skin Care',
    experience: 8,
    fee: 120,
    image: '/images/doctors/doctor_1.png',
    availability: 'Available Tomorrow'
  },
  {
    id: 3,
    name: 'Dr. Emily Williams',
    specialty: 'Pediatrician',
    rating: 5.0,
    reviews: 215,
    location: 'Chicago, Kids Clinic',
    experience: 15,
    fee: 100,
    image: '/images/doctors/doctor_4.png',
    availability: 'Available Monday'
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Neurologist',
    rating: 4.7,
    reviews: 56,
    location: 'Boston, Neuro Hub',
    experience: 10,
    fee: 200,
    image: '/images/doctors/doctor_3.png',
    availability: 'Available Today'
  }
]

const specialties = ['All', 'Cardiologist', 'Dermatologist', 'Pediatrician', 'Neurologist', 'Psychiatrist']

const DoctorListing = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')
  const [activeFilters, setActiveFilters] = useState({
      experience: [],
      rating: [],
      fee: []
  })
  
  const { addNotification, setBookingData } = useGlobalStore()
  const navigate = useNavigate()

  const toggleFilter = (category, value) => {
      setActiveFilters(prev => {
          const current = prev[category]
          const updated = current.includes(value) 
              ? current.filter(v => v !== value) 
              : [...current, value]
          return { ...prev, [category]: updated }
      })
  }

  const filteredDoctors = useMemo(() => {
     return doctorsData.filter(doc => {
         const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
         const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty
         
         const matchesExperience = activeFilters.experience.length === 0 || activeFilters.experience.some(v => {
            const minExp = parseInt(v)
            return doc.experience >= minExp
         })

         const matchesRating = activeFilters.rating.length === 0 || activeFilters.rating.some(v => {
            const minRating = parseFloat(v)
            return doc.rating >= minRating
         })

         const matchesFee = activeFilters.fee.length === 0 || activeFilters.fee.some(v => {
            if (v === '50 - 100') return doc.fee >= 50 && doc.fee <= 100
            if (v === '100 - 200') return doc.fee > 100 && doc.fee <= 200
            if (v === '200+') return doc.fee > 200
            return true
         })

         return matchesSearch && matchesSpecialty && matchesExperience && matchesRating && matchesFee
     })
  }, [searchQuery, selectedSpecialty, activeFilters])

  const handleBook = (doctor) => {
    setBookingData({ 
        doctorId: doctor.id, 
        doctorName: doctor.name,
        doctorImage: doctor.image,
        doctorSpecialty: doctor.specialty
    })
    addNotification({ title: 'Booking Initiated', message: `Proceed to schedule with ${doctor.name}`, type: 'success' })
    navigate(`/booking/${doctor.id}`)
  }

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em] mb-12 text-center md:text-left">DOCTOR LISTING PAGE</h1>

        {/* Header Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white p-4 rounded-full shadow-soft-md border border-slate-100">
            <div className="flex-1 flex items-center gap-4 px-6 border-r border-slate-100">
                <Search size={20} className="text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search doctors, symptoms, or specialties..." 
                    className="w-full bg-transparent outline-none text-sm font-bold placeholder:text-slate-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2 px-4">
                {specialties.map(spec => (
                    <button 
                        key={spec}
                        onClick={() => setSelectedSpecialty(spec)}
                        className={`px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all ${
                            selectedSpecialty === spec ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-slate-100'
                        }`}
                    >
                        {spec}
                    </button>
                ))}
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar - Enhanced for mock filters */}
          <div className="lg:w-64 space-y-10 shrink-0">
             <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest italic">Dynamic Filters</h3>
                <div className="space-y-8">
                    {[
                        { id: 'experience', name: 'Experience', options: ['5+ Years', '10+ Years', '15+ Years'] },
                        { id: 'rating', name: 'Rating', options: ['4.5+', '4.8+', '5.0'] },
                        { id: 'fee', name: 'Fee Range', options: ['50 - 100', '100 - 200', '200+'] },
                    ].map(filter => (
                        <div key={filter.id} className="space-y-4">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{filter.name}</h4>
                            <div className="space-y-3">
                                {filter.options.map(opt => {
                                    const isActive = activeFilters[filter.id].includes(opt)
                                    return (
                                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                            <input 
                                                type="checkbox" 
                                                className="hidden" 
                                                checked={isActive}
                                                onChange={() => toggleFilter(filter.id, opt)}
                                            />
                                            <div className={`w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center ${
                                                isActive ? 'border-primary bg-primary shadow-lg shadow-primary/20' : 'border-slate-200 group-hover:border-primary/40'
                                            }`}>
                                                {isActive && <Check size={12} className="text-white" />}
                                            </div>
                                            <span className={`text-[10px] font-bold uppercase transition-colors ${
                                                isActive ? 'text-slate-800' : 'text-slate-400 group-hover:text-slate-600'
                                            }`}>
                                                {filter.id === 'fee' && !opt.includes('$') ? `$${opt}` : opt}
                                            </span>
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          </div>

          {/* Grid */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-slate-800 uppercase italic tracking-tighter">Verified Specialists</h2>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => addNotification({ title: 'System Alert', message: 'Routing to Emergency Triage Unit...', type: 'error' })}
                        className="bg-red-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-200 animate-pulse"
                    >
                        Emergency Unit
                    </button>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">Showing {filteredDoctors.length} Specialists</span>
                </div>
            </div>
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredDoctors.map((doctor, idx) => (
                        <motion.div 
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={doctor.id} 
                            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-soft-md overflow-hidden group hover:shadow-premium transition-all duration-500"
                        >
                            <div className="aspect-[4/4] relative overflow-hidden bg-slate-100 italic">
                                <img src={doctor.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                                <div className="absolute top-6 right-6 flex flex-col gap-2">
                                    <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black flex items-center gap-1 shadow-xl">
                                        ⭐ {doctor.rating}
                                    </div>
                                    {idx === 0 && (
                                        <div className="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[8px] font-black flex items-center gap-1 shadow-xl uppercase tracking-widest border border-white/20">
                                            <Zap size={10} className="text-primary fill-primary" /> Most Popular
                                        </div>
                                    )}
                                </div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white/20 flex items-center justify-between">
                                        <span className="text-[9px] font-black text-slate-800 italic uppercase">Next Available: <span className="text-primary">Today</span></span>
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="text-center">
                                    <h3 className="font-black text-slate-800 uppercase italic text-lg tracking-tighter">{doctor.name}</h3>
                                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1">{doctor.specialty}</p>
                                </div>
                                
                                <div className="bg-slate-50/50 rounded-2xl p-4 space-y-2 border border-slate-50">
                                    <p className="text-[10px] font-bold text-red-500 flex items-center justify-center gap-2 italic">
                                        <Clock size={12} /> Fast Filler: Only 2 slots left
                                    </p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter text-center">
                                        90% of patients re-booked this month
                                    </p>
                                </div>

                                <button 
                                    onClick={() => handleBook(doctor)}
                                    className="w-full py-4 bg-primary text-white text-[10px] font-black uppercase rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all tracking-[0.15em]"
                                >
                                    Book Case Review
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            {filteredDoctors.length === 0 && (
                <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
                    <Search className="mx-auto text-slate-200 mb-4" size={48} />
                    <h3 className="font-bold text-slate-400 uppercase tracking-widest italic">No specialists found matching your search.</h3>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorListing
