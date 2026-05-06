import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, MapPin, Clock, Award, CheckCircle, ShieldCheck, MessageSquare, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const DoctorProfile = () => {
  const { id } = useParams()
  const doctor = {
      name: 'Dr. Sarah Johnson',
      specialty: 'Senior Cardiologist',
      rating: 4.9,
      reviews: 245,
      image: 'https://images.unsplash.com/photo-1559839734-2b71f15367ef?auto=format&fit=crop&q=80&w=600'
  }

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-12">
            <div className="space-y-4">
                <nav className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Link to="/">Home</Link> <ChevronRight size={10} /> <Link to="/doctors">Doctors</Link> <ChevronRight size={10} /> <span className="text-primary">{doctor.name}</span>
                </nav>
                <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter uppercase italic">{doctor.name}</h1>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-lg">⭐ {doctor.rating} Rating</div>
                    <div className="px-4 py-1.5 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase rounded-lg">{doctor.specialty}</div>
                </div>
            </div>
            <button className="bg-primary text-white px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-xl shadow-primary/30">
                Book Consultation
            </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-16">
            <div className="space-y-6">
                <h3 className="text-2xl font-black text-slate-800 uppercase italic">Bio</h3>
                <p className="text-lg text-slate-500 leading-relaxed font-medium capitalize">
                   Expert in advanced cardiovascular treatments with over 15 years of experience in clinical research and patient care. 
                   Dedicated to providing compassionate and comprehensive medical support tailored to individual needs.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-8">
                    <h3 className="text-xl font-black text-slate-800 uppercase italic">Qualifications</h3>
                    <ul className="space-y-6">
                        {[
                            'Medical Degree - Ivy League University',
                            'Board Certified in Cardiology',
                            'Fellowship in Advanced Heart Care',
                            'Recipient of Global Health Award 2023',
                            'Master of Public Health (MPH)'
                        ].map((q, i) => (
                            <li key={i} className="flex gap-4 group">
                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <CheckCircle size={14} />
                                </div>
                                <span className="text-sm font-bold text-slate-600">{q}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-8">
                    <h3 className="text-xl font-black text-slate-800 uppercase italic">Experience</h3>
                    <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                        {[
                            { year: '2020 - Present', role: 'Chief of Cardiology', org: 'Heart City Hospital' },
                            { year: '2015 - 2020', role: 'Senior Cardiologist', org: 'St. Peter Medical' },
                            { year: '2010 - 2015', role: 'Residency', org: 'General Health Center' },
                        ].map((exp, i) => (
                            <div key={i} className="pl-10 relative">
                                <div className="absolute left-0 top-1.5 w-6 h-6 bg-white border-2 border-primary rounded-full z-10"></div>
                                <p className="text-[10px] font-black text-primary uppercase mb-1">{exp.year}</p>
                                <h4 className="font-bold text-slate-800 text-sm">{exp.role}</h4>
                                <p className="text-xs text-slate-400 font-medium">{exp.org}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-10">
              {/* Calendar Card */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft-lg space-y-6">
                  <div className="flex items-center justify-between">
                      <h3 className="font-black text-lg uppercase italic">Calendar</h3>
                      <button className="text-[10px] font-bold text-slate-400">MAY 2026</button>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center">
                      {['S','M','T','W','T','F','S'].map(d => (
                          <span key={d} className="text-[10px] font-black text-slate-300">{d}</span>
                      ))}
                      {Array.from({length: 31}).map((_, i) => (
                          <button key={i} className={`aspect-square flex items-center justify-center rounded-xl text-[10px] font-bold ${
                              i + 1 === 20 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 
                              i + 1 === 18 || i + 1 === 22 ? 'bg-slate-50 text-slate-400' : 'hover:bg-slate-50'
                          }`}>
                              {i + 1}
                          </button>
                      ))}
                  </div>
              </div>

              {/* Reviews Card */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft-lg space-y-8">
                  <div className="flex items-center justify-between">
                      <h3 className="font-black text-lg uppercase italic">Reviews</h3>
                      <span className="text-2xl font-black text-primary italic">4.9</span>
                  </div>
                  <div className="space-y-4">
                      {[
                        { star: 5, val: 85 },
                        { star: 4, val: 12 },
                        { star: 3, val: 2 },
                        { star: 2, val: 1 },
                        { star: 1, val: 0 },
                      ].map(r => (
                          <div key={r.star} className="flex items-center gap-4">
                              <span className="text-[10px] font-bold text-slate-400 w-4">{r.star}</span>
                              <div className="flex-1 h-3 bg-slate-50 rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: `${r.val}%` }}></div>
                              </div>
                              <span className="text-[10px] font-bold text-slate-400 w-8">{r.val}%</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
