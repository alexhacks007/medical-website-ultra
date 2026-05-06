import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Calendar, Shield, Zap, Users, ArrowRight, Heart, Activity, Clock, Check, Star } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
        navigate(`/doctors?q=${query}`)
    }
  }

  const quickSymptoms = ['Fever', 'Neural', 'Cardiac', 'Metabolic', 'Dermal']

  const stats = [
    { label: 'Specialists', value: '500+' },
    { label: 'Happy Patients', value: '100k+' },
    { label: 'Awards Win', value: '15+' },
    { label: 'Years Experience', value: '12+' },
  ]

  const services = [
    { title: 'Cardiology', icon: <Heart size={24} className="text-primary" />, color: 'bg-primary/5' },
    { title: 'Neurology', icon: <Activity size={24} className="text-secondary" />, color: 'bg-secondary/5' },
    { title: 'Pediatrics', icon: <Users size={24} className="text-accent" />, color: 'bg-accent/5' },
    { title: 'Neurology', icon: <Zap size={24} className="text-blue-500" />, color: 'bg-blue-50' },
    { title: 'Psychiatry', icon: <Shield size={24} className="text-purple-500" />, color: 'bg-purple-50' },
  ]

  const departments = [
    { name: 'Oncology', specialists: 45, status: 'Online', icon: '🧬', load: 45 },
    { name: 'Hematology', specialists: 32, status: 'Active', icon: '🩸', load: 12 },
    { name: 'Orthopedics', specialists: 58, status: 'Online', icon: '🦴', load: 88 },
    { name: 'Gastroenterology', specialists: 24, status: 'Busy', icon: '🧪', load: 65 },
    { name: 'Ophthalmology', specialists: 19, status: 'Online', icon: '👁️', load: 10 },
  ]

  const globalStats = [
    "LIVE: 12.4k Neuro-Scans active", 
    "SUCCESS: 99.8% Accuracy in Cardiac Predictions", 
    "ALERT: New Clinical Hub opening in Neo-Tokyo",
    "REAL-TIME: +142 Bio-Mappings synced in the last 60s"
  ]

  const [activeTriage, setActiveTriage] = useState(0)
  const triageSteps = [
    { q: "Primary Concern", options: ["Cardio", "Neural", "Metabolic", "General"] },
    { q: "Symptom Intensity", options: ["Low", "Moderate", "High", "Critical"] },
    { q: "Known History", options: ["None", "Hypertension", "Diabetes", "Other"] },
  ]

  return (
    <div className="pt-6 bg-white overflow-hidden">
      {/* Global Pulse Marquee */}
      <div className="bg-slate-900 overflow-hidden py-3 border-b border-white/5">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-20"
        >
          {[...globalStats, ...globalStats].map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{stat}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile Quick Search */}
      <div className="lg:hidden px-6 py-4">
          <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search specialists..." 
                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary/20 rounded-2xl py-4 pl-12 pr-6 outline-none transition-all text-sm font-bold"
              />
          </div>
      </div>

      {/* Quick Symptoms (Mobile Only Feature) */}
      <div className="lg:hidden px-6 py-2 overflow-hidden">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {quickSymptoms.map(symp => (
                <button 
                  key={symp}
                  className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap active:bg-primary active:text-white transition-all shadow-sm"
                >
                    {symp}
                </button>
            ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12 md:py-24 flex flex-col xl:flex-row items-center gap-20">
        <div className="flex-1 space-y-12">
          <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                className="bg-primary/10 text-primary px-5 py-2 rounded-full inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest border border-primary/20"
              >
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  The Future of Healthcare is Here
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl lg:text-9xl font-black leading-[0.9] text-slate-900 tracking-tighter italic uppercase"
              >
                Ultra <br />
                <span className="text-primary not-italic">Precision</span> <br />
                Care
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-400 max-w-lg leading-relaxed font-bold"
              >
                Experience medical excellence powered by AI. Predictive insights and hyper-personalized healthcare for your family.
              </motion.p>

              {/* Bio-Score HUD (New Feature) */}
              <div className="flex items-center gap-10 py-6 border-y border-slate-100 my-10">
                  <div className="relative w-20 h-20">
                      <svg className="w-full h-full -rotate-90">
                          <circle cx="40" cy="40" r="36" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-slate-100" />
                          <motion.circle 
                            cx="40" cy="40" r="36" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-primary" 
                            strokeDasharray="226" initial={{ strokeDashoffset: 226 }} animate={{ strokeDashoffset: 226 - (226 * 0.94) }}
                            transition={{ duration: 2, delay: 0.5 }}
                          />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-black italic tracking-tighter">94</span>
                      </div>
                  </div>
                  <div>
                      <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Aggregate Bio-Health Score</h4>
                      <p className="text-xs font-bold text-slate-400">Calculated from 12k+ real-time markers</p>
                  </div>
              </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-6"
          >
            <Link to="/doctors" className="bg-primary text-white px-10 py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest shadow-2xl shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95">
              Start Booking
            </Link>
            <button onClick={() => navigate('/ratings')} className="bg-white text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest shadow-xl hover:-translate-y-1 transition-all">
              Clinical Reviews
            </button>
          </motion.div>

          {/* Search Bar - Precise Image Match */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-3 rounded-[3rem] shadow-premium flex items-center gap-2 max-w-2xl border border-slate-50 pr-4"
          >
            <div className="flex-1 flex items-center gap-5 px-8 py-5">
              <Search className="text-primary" size={24} />
              <input 
                type="text" 
                placeholder="Search symptoms or specialists..." 
                className="bg-transparent border-none outline-none w-full text-base placeholder:text-slate-300 font-bold"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
            <button 
                onClick={handleSearch}
                className="bg-slate-900 text-white p-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-lg"
            >
              <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: 'spring' }}
          className="flex-1 hidden xl:block relative group"
        >
          <div className="absolute -inset-10 bg-primary/5 blur-[120px] -z-10 rounded-full animate-pulse"></div>
          <div className="relative rounded-[4rem] overflow-hidden border-4 border-white shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000" 
                alt="Doctor" 
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
              <div className="scan-line" />
              {/* Overlay HUD elements */}
              <div className="absolute inset-x-6 bottom-6 flex justify-between items-end">
                  <div className="bg-slate-900/40 backdrop-blur-md p-4 rounded-3xl border border-white/10 space-y-2">
                      <div className="flex gap-1">
                          {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
                      </div>
                      <p className="text-[8px] font-black uppercase text-white/60 tracking-[0.2em]">Live Scan Analysis</p>
                  </div>
                  <div className="text-right">
                      <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Model: PULSE-X1</p>
                  </div>
              </div>
          </div>

          {/* Interactive Floating Stats */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 -right-10 bg-white p-8 rounded-[2.5rem] shadow-premium border border-slate-50 space-y-2"
          >
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <Activity size={24} />
                  </div>
                  <div>
                      <h4 className="text-2xl font-black text-slate-800 tracking-tighter italic">99.8%</h4>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Diagnostic Meta-Logic</p>
                  </div>
              </div>
          </motion.div>

          <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-premium border border-slate-50 space-y-2 translate-y-4">
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
                      <Shield size={24} />
                  </div>
                  <div>
                      <h4 className="text-2xl font-black text-slate-800 tracking-tighter italic">ZERO</h4>
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Protocol Failures</p>
                  </div>
              </div>
          </div>
        </motion.div>
      </section>

      {/* Real-time Bio-Metrics Visualizer (New Feature) */}
      <section className="container mx-auto px-6 py-20">
          <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden flex flex-col xl:flex-row gap-20 items-center">
              <div className="flex-1 space-y-8 relative z-10">
                  <div className="space-y-4">
                      <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Integrated Bio-Telemetry</h2>
                      <h3 className="text-5xl font-black text-white italic uppercase tracking-tighter">Your Health, <br />In <span className="text-primary not-italic">High Fidelity</span></h3>
                      <p className="text-slate-400 font-bold max-w-lg leading-relaxed">Connect your wearable devices to the Ultra-Mesh network. View your biological trends in real-time with zero-latency sync.</p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                      {['Heart Rate', 'Oxygen Saturation', 'Nerve Conductivity', 'Sleep Architecture'].map(feat => (
                          <div key={feat} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/60 hover:bg-white/10 transition-colors cursor-pointer">
                              {feat}
                          </div>
                      ))}
                  </div>
              </div>
              <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                  {[
                      { label: 'Avg Heart Rate', value: '72', unit: 'BPM', change: '-2.4%', color: 'border-primary' },
                      { label: 'Deep Sleep', value: '4.2', unit: 'HRS', change: '+12%', color: 'border-secondary' },
                      { label: 'Stress Index', value: '14', unit: 'LOW', change: '-5.1%', color: 'border-accent' },
                      { label: 'Hydration', value: '92', unit: '%', change: 'STABLE', color: 'border-slate-700' },
                  ].map((card, idx) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className={`bg-slate-800/50 backdrop-blur-xl p-8 rounded-[2.5rem] border-2 ${card.color} space-y-4`}
                      >
                          <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{card.label}</p>
                          <div className="flex items-baseline gap-2">
                              <h4 className="text-4xl font-black text-white italic tracking-tighter">{card.value}</h4>
                              <span className="text-[10px] font-bold text-slate-400">{card.unit}</span>
                          </div>
                          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                              <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                  <div className="h-full bg-primary animate-[shimmer_2s_infinite]" style={{ width: '60%' }} />
                              </div>
                              <span className={`text-[9px] font-black ${card.change.includes('+') ? 'text-green-500' : 'text-primary'}`}>{card.change}</span>
                          </div>
                      </motion.div>
                  ))}
              </div>
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[150px] rounded-full" />
          </div>
      </section>

      {/* Department Marquee */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-6 mb-12">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Core Departments</h2>
            <h3 className="text-3xl font-black italic uppercase tracking-tighter">Specialized Units</h3>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-10 px-6 no-scrollbar snap-x">
            {departments.map((dep, i) => (
                <motion.div 
                   key={i}
                   whileHover={{ y: -10 }}
                   className="min-w-[280px] bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6 snap-center group"
                >
                    <div className="text-4xl">{dep.icon}</div>
                    <div>
                        <h4 className="text-xl font-black uppercase italic group-hover:text-primary transition-colors">{dep.name}</h4>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">{dep.specialists} Specialists</p>
                    </div>
                    {/* Live Load Indicator */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-[8px] font-black uppercase text-slate-400 tracking-widest">
                            <span>Live Load</span>
                            <span>{dep.load}%</span>
                        </div>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${dep.load}%` }}
                              className={`h-full ${dep.load > 80 ? 'bg-red-500' : 'bg-primary'}`}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${dep.status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-800">{dep.status}</span>
                    </div>
                </motion.div>
            ))}
        </div>
      </section>

      {/* AI Predictive Analytics Showcase */}
      <section className="container mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" className="rounded-[4rem] shadow-premium grayscale hover:grayscale-0 transition-all duration-700" alt="" />
                <div className="absolute top-10 -right-10 bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl space-y-4 max-w-xs">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                        <Zap size={24} />
                    </div>
                    <h4 className="text-lg font-black italic uppercase">Predictive AI Hub</h4>
                    <p className="text-xs text-slate-400 font-bold leading-relaxed">Our AI analyzes thousands of patient markers to predict potential health risks before they become critical.</p>
                </div>
            </div>
            <div className="space-y-12">
                <div className="space-y-6">
                    <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">The Intelligence Layer</h2>
                    <h3 className="text-4xl md:text-5xl md:text-6xl font-black text-slate-900 italic uppercase tracking-tighter leading-none">Smart Healthcare <br /><span className="text-primary not-italic">Deep Learning</span></h3>
                    <p className="text-xl text-slate-400 font-bold leading-relaxed max-w-xl">Move beyond reactive medicine. Our platform uses advanced neural networks to map your unique bio-signature.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                    {[
                        { title: 'Genetic Map', desc: 'Personalized risk profiles based on ancestry.', icon: <Users size={20} /> },
                        { title: 'Mood AI', desc: 'Predictive mental health assessment tools.', icon: <Activity size={20} /> },
                    ].map(item => (
                        <div key={item.title} className="space-y-3">
                            <div className="w-10 h-10 bg-slate-50 text-primary rounded-xl flex items-center justify-center border border-slate-100">
                                {item.icon}
                            </div>
                            <h4 className="font-black uppercase italic tracking-tight">{item.title}</h4>
                            <p className="text-xs font-bold text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
                <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] group text-primary">
                    Learn about our AI <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
      </section>

      {/* Smart Triage Widget (New Interactive Feature) */}
      <section className="container mx-auto px-6 py-20">
          <div className="bg-slate-100/50 rounded-[4rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-20">
              <div className="flex-1 space-y-8">
                  <div className="space-y-4">
                      <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Interactive Care Routing</h2>
                      <h3 className="text-5xl font-black italic uppercase tracking-tighter">Smart <br /><span className="text-primary not-italic">Triage Unit</span></h3>
                      <p className="text-slate-400 font-bold max-w-sm">Not sure where to start? Answer 3 quick questions and our AI will route you to the correct department immediately.</p>
                  </div>
                  <div className="flex gap-2">
                      {[0,1,2].map(id => (
                          <div key={id} className={`h-1 flex-1 rounded-full ${id <= activeTriage ? 'bg-primary' : 'bg-slate-200'}`} />
                      ))}
                  </div>
              </div>
              <div className="flex-1 w-full bg-white p-12 rounded-[3.5rem] shadow-premium border border-slate-50 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                      <motion.div 
                        key={activeTriage}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                      >
                          <h4 className="text-2xl font-black italic uppercase tracking-tighter">{triageSteps[activeTriage].q}</h4>
                          <div className="grid grid-cols-2 gap-4">
                              {triageSteps[activeTriage].options.map(opt => (
                                  <button 
                                    key={opt}
                                    onClick={() => activeTriage < 2 ? setActiveTriage(activeTriage + 1) : setActiveTriage(0)}
                                    className="p-6 border-2 border-slate-50 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all text-slate-600"
                                  >
                                      {opt}
                                  </button>
                              ))}
                          </div>
                      </motion.div>
                  </AnimatePresence>
                  {/* Decorative Scan Beam */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/20 animate-[scan_4s_linear_infinite]" />
              </div>
          </div>
      </section>

      {/* Top Doctors - Premium Grid */}
      <section className="container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Elite Medical Registry</h2>
                <h3 className="text-5xl font-black italic uppercase tracking-tighter italic">Certified Specialists</h3>
            </div>
            <Link to="/doctors" className="pb-2 border-b-4 border-primary text-xs font-black uppercase tracking-widest hover:text-primary transition-all">View Full Registry</Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
              { name: 'Dr. Sarah Johnson', specialty: 'Cardiovascular Lead', image: '/images/doctors/doctor_2.png', rating: 4.9 },
              { name: 'Dr. Michael Chen', specialty: 'Neuro-Surgeon', image: '/images/doctors/doctor_1.png', rating: 4.8 },
              { name: 'Dr. Emily Williams', specialty: 'Genetic Specialist', image: '/images/doctors/doctor_4.png', rating: 5.0 },
              { name: 'Dr. James Wilson', specialty: 'Bio-Telemetry Lead', image: '/images/doctors/doctor_3.png', rating: 4.7 },
          ].map((doc, i) => (
                <div key={i} className="group cursor-pointer">
                    <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-100 relative mb-8">
                        <img src={doc.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" alt={doc.name} />
                        <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black shadow-xl">⭐ {doc.rating}</div>
                        <div className="absolute top-8 left-8">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
                        </div>
                    </div>
                    <div className="space-y-2 text-center">
                        <h4 className="font-black text-lg uppercase italic tracking-tighter group-hover:text-primary transition-colors">{doc.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{doc.specialty}</p>
                        <div className="flex items-center justify-center gap-1 text-primary pt-2">
                            {[1,2,3,4,5].map(s => <Star key={s} size={10} fill="currentColor" />)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="container mx-auto px-6 py-24 bg-slate-900 rounded-[5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(0,163,196,0.1),transparent)]"></div>
          <div className="text-center space-y-6 mb-20 relative z-10">
              <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Integrated Care ecosystem</h2>
              <h3 className="text-5xl md:text-6xl font-black text-white italic uppercase tracking-tighter italic">Premium Subscriptions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10 pb-12">
              {[
                  { name: 'Basic Pulse', price: '$29', features: ['Monthly Checkups', 'AI Symptom Checker', 'Digital Records', '24/7 Support'], active: false },
                  { name: 'Ultra Family', price: '$89', features: ['Unlimited Consults', 'Family Management', 'Predictive Alerts', 'Priority Queue', 'Home Samples'], active: true },
                  { name: 'Elite Care', price: '$149', features: ['Dedicated Bio-Engineer', 'Satellite Triage', 'Global Bio-Records', 'Private Concierge'], active: false },
              ].map((plan, i) => (
                  <div key={i} className={`p-12 rounded-[4rem] flex flex-col justify-between border-2 transition-all duration-500 hover:-translate-y-2 ${
                      plan.active ? 'bg-primary border-primary shadow-[0_40px_80px_rgba(0,163,196,0.3)] scale-105' : 'bg-slate-800/50 border-white/5 hover:border-white/20'
                  }`}>
                      <div className="space-y-10">
                          <div>
                              <h4 className={`text-2xl font-black uppercase italic ${plan.active ? 'text-white' : 'text-slate-200'}`}>{plan.name}</h4>
                              <div className="flex items-baseline gap-2 mt-4">
                                  <span className="text-5xl font-black tracking-tighter text-white">{plan.price}</span>
                                  <span className={`text-[10px] font-bold ${plan.active ? 'text-white/60' : 'text-slate-500'}`}>/ MONTHLY</span>
                              </div>
                          </div>
                          <ul className="space-y-5">
                              {plan.features.map(f => (
                                  <li key={f} className={`flex items-center gap-4 text-[11px] font-bold ${plan.active ? 'text-white' : 'text-slate-400'}`}>
                                      <div className={`w-2 h-2 rounded-full ${plan.active ? 'bg-white' : 'bg-primary'}`}></div>
                                      {f}
                                  </li>
                              ))}
                          </ul>
                      </div>
                      <button className={`mt-12 w-full py-5 rounded-[2rem] text-xs font-black uppercase tracking-widest transition-all ${
                          plan.active ? 'bg-white text-primary hover:bg-slate-50' : 'bg-slate-700 text-white hover:bg-slate-600'
                      }`}>
                          Activate {plan.name}
                      </button>
                  </div>
              ))}
          </div>
      </section>

      {/* Footer Branding */}
      <section className="py-24 text-center">
          <div className="container mx-auto px-6 space-y-10">
              <h2 className="text-7xl md:text-9xl font-black text-slate-900/5 select-none tracking-[0.2em] mb-10">PULSE ULTRA</h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                  <div className="text-left space-y-2">
                        <h4 className="text-2xl font-black text-slate-800 tracking-tighter">Ready to Evolve?</h4>
                        <p className="text-sm text-slate-400 font-bold">Join 100k+ users currently optimizing their health metrics.</p>
                  </div>
                  <button className="bg-primary text-white px-12 py-5 rounded-3xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/30 hover:scale-105 transition-all">Connect with AI Assistant</button>
              </div>
          </div>
      </section>
    </div>
  )
}

export default Home
