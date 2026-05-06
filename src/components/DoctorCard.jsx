import { Link } from 'react-router-dom'
import { Star, MapPin, Clock, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const DoctorCard = ({ doctor }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="card flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img 
          src={doctor.image || `${import.meta.env.BASE_URL}images/doctors/doctor_1.png`} 
          alt={doctor.name} 
          onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}images/doctors/doctor_1.png` }}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-sm">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          {doctor.rating} ({doctor.reviews} reviews)
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-4">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider">{doctor.specialty}</span>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{doctor.name}</h3>
        </div>

        <div className="space-y-2 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            {doctor.location}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            {doctor.experience} yrs Experience
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <p className="text-xs text-slate-400">Consultation Fee</p>
            <p className="text-lg font-bold text-slate-900">${doctor.fee}</p>
          </div>
          <Link to={`/doctors/${doctor.id}`} className="btn-primary py-2.5 px-6 text-sm">
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default DoctorCard
