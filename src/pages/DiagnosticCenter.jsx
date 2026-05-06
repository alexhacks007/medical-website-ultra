import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, Zap, Shield, Search, ArrowRight, Brain, Thermometer, Droplets, Wind } from 'lucide-react';

const DiagnosticCenter = () => {
    const [scanning, setScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState(null);

    const [isHolding, setIsHolding] = useState(false);

    const startScan = () => {
        setScanning(true);
        setProgress(0);
        setResults(null);
    };

    useEffect(() => {
        let interval;
        if (isHolding && !scanning && !results) {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        setIsHolding(false);
                        setScanning(false);
                        setResults({
                            score: 94,
                            vitals: [
                                { label: 'Neural Activity', value: 'High', status: 'optimal' },
                                { label: 'Metabolic Rate', value: '72%', status: 'stable' },
                                { label: 'Immune Response', value: 'Active', status: 'optimal' }
                            ]
                        });
                        return 100;
                    }
                    return prev + 5;
                });
            }, 100);
        } else if (!isHolding && !scanning && progress < 100 && !results) {
            setProgress(0);
        }
        return () => clearInterval(interval);
    }, [isHolding, scanning, results, progress]);

    useEffect(() => {
        if (scanning && progress < 100) {
            const timer = setTimeout(() => setProgress(prev => prev + 2), 50);
            return () => clearTimeout(timer);
        } else if (progress >= 100 && scanning) {
            setScanning(false);
            setResults({
                score: 94,
                vitals: [
                    { label: 'Neural Activity', value: 'High', status: 'optimal' },
                    { label: 'Metabolic Rate', value: '72%', status: 'stable' },
                    { label: 'Immune Response', value: 'Active', status: 'optimal' }
                ]
            });
        }
    }, [scanning, progress]);

    return (
        <div className="pt-10 pb-20 min-h-screen bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 text-center lg:text-left items-center lg:items-start">
                    {/* Control Panel */}
                    <div className="lg:w-1/3 space-y-8 w-full">
                        <div className="space-y-4">
                            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Autonomous Diagnostics</h2>
                            <h3 className="text-4xl lg:text-5xl font-black italic uppercase tracking-tighter">Bio-Scanner <br /><span className="text-primary not-italic">V3.0</span></h3>
                            <p className="text-slate-400 font-bold leading-relaxed text-sm">Place your sensor-enabled device on your bio-point to initiate high-frequency neural mapping.</p>
                        </div>

                        <div className="bg-white p-8 rounded-[3rem] shadow-premium space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Scanner Status</span>
                                <span className={`w-3 h-3 rounded-full ${scanning || isHolding ? 'bg-primary animate-pulse' : 'bg-green-500'}`} />
                            </div>
                            
                            <motion.button 
                                onPointerDown={() => !scanning && setIsHolding(true)}
                                onPointerUp={() => setIsHolding(false)}
                                onPointerLeave={() => setIsHolding(false)}
                                className={`w-full py-8 rounded-3xl font-black uppercase tracking-widest text-xs transition-all relative overflow-hidden ${
                                    results ? 'bg-green-500 text-white' : 'bg-slate-900 text-white active:scale-95'
                                }`}
                            >
                                <div className="absolute inset-x-0 bottom-0 bg-primary h-1" style={{ width: `${progress}%` }} />
                                {scanning || isHolding ? `Scanning... ${progress}%` : results ? 'System Ready' : 'Hold to Scan'}
                            </motion.button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: <Brain size={20} />, label: 'Neural' },
                                { icon: <Thermometer size={20} />, label: 'Thermal' },
                                { icon: <Droplets size={20} />, label: 'Fluids' },
                                { icon: <Wind size={20} />, label: 'Respir' },
                            ].map(tag => (
                                <div key={tag.label} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4">
                                    <div className="text-primary">{tag.icon}</div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-800">{tag.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visualization Area */}
                    <div className="flex-1 bg-slate-900 rounded-[4rem] p-12 lg:p-20 relative overflow-hidden flex flex-col items-center justify-center min-h-[600px]">
                        <div className="absolute inset-0 opacity-10">
                            <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                        </div>

                        <AnimatePresence mode="wait">
                            {scanning ? (
                                <motion.div 
                                    key="scanning"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    className="relative z-10 w-64 h-64 md:w-96 md:h-96 rounded-full border-4 border-primary/20 flex items-center justify-center"
                                >
                                    <div className="absolute inset-0 border-4 border-primary rounded-full animate-[spin_10s_linear_infinite] border-t-transparent" />
                                    <div className="absolute inset-10 border-2 border-secondary rounded-full animate-[spin_5s_linear_infinite_reverse] border-b-transparent" />
                                    <div className="text-center space-y-2">
                                        <h4 className="text-5xl font-black text-white italic tracking-tighter">{progress}%</h4>
                                        <p className="text-[10px] font-black uppercase text-primary tracking-widest">Acquiring Data</p>
                                    </div>
                                    {/* Scan pulses */}
                                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping" />
                                </motion.div>
                            ) : results ? (
                                <motion.div 
                                    key="results"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative z-10 w-full space-y-12"
                                >
                                    <div className="text-center space-y-4">
                                        <div className="inline-flex px-6 py-2 bg-green-500/20 text-green-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-500/20">Analysis Complete</div>
                                        <h4 className="text-7xl font-black text-white italic tracking-tighter">Bio-Score: {results.score}</h4>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-6">
                                        {results.vitals.map(vital => (
                                            <div key={vital.label} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl space-y-4">
                                                <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{vital.label}</p>
                                                <h5 className="text-2xl font-black text-white italic uppercase tracking-tighter">{vital.value}</h5>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                                    <span className="text-[8px] font-black uppercase text-green-500 tracking-widest">{vital.status}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-center">
                                        <button className="bg-primary text-white px-12 py-5 rounded-3xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:scale-105 transition-all">Generate Full Report</button>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="text-center space-y-8 relative z-10">
                                    <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                                        <Cpu size={48} className="text-primary animate-pulse" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter">System Idle</h4>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Waiting for initialization</p>
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>

                        {/* Scanner Beam */}
                        {scanning && (
                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm animate-[scan_2s_linear_infinite]" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiagnosticCenter;
