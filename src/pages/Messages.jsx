import { motion } from 'framer-motion'
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react'

const Messages = () => {
    const chats = [
        { id: 1, name: 'Dr. Sarah Johnson', lastMsg: 'Your lab results look good...', time: '10:24 AM', unread: 2, status: 'Online' },
        { id: 2, name: 'Dr. Michael Chen', lastMsg: 'See you tomorrow at 1 PM.', time: 'Yesterday', unread: 0, status: 'Offline' },
        { id: 3, name: 'Clinic Support', lastMsg: 'Payment confirmed. Thank you.', time: 'Monday', unread: 0, status: 'Online' },
    ]

    return (
        <div className="h-[calc(100vh-12rem)] flex gap-8">
            {/* Contacts Sidebar */}
            <div className="w-full md:w-96 bg-white rounded-[3rem] border border-slate-100 shadow-soft-lg flex flex-col overflow-hidden">
                <div className="p-8 border-b border-slate-100 space-y-6">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter">Conversions</h3>
                    <div className="bg-slate-50 p-3 rounded-2xl flex items-center gap-3 px-5">
                        <Search size={18} className="text-slate-300" />
                        <input type="text" placeholder="Search chats" className="bg-transparent border-none outline-none w-full text-xs font-bold" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {chats.map((chat, i) => (
                        <div key={chat.id} className={`p-6 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors border-l-4 ${i === 0 ? 'border-primary bg-primary/5' : 'border-transparent'}`}>
                            <div className="relative">
                                <div className="w-14 h-14 bg-slate-200 rounded-2xl overflow-hidden shadow-md">
                                    <img src={`https://i.pravatar.cc/150?u=${chat.id+20}`} alt="" />
                                </div>
                                {chat.status === 'Online' && (
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-black text-slate-800 text-sm truncate uppercase tracking-tighter">{chat.name}</h4>
                                    <span className="text-[9px] font-bold text-slate-400">{chat.time}</span>
                                </div>
                                <p className="text-[10px] font-medium text-slate-500 truncate">{chat.lastMsg}</p>
                            </div>
                            {chat.unread > 0 && (
                                <div className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-[9px] font-black">
                                    {chat.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Pane */}
            <div className="hidden lg:flex flex-1 bg-white rounded-[3rem] border border-slate-100 shadow-soft-lg flex-col overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-200 rounded-2xl overflow-hidden shadow-md">
                             <img src="https://i.pravatar.cc/150?u=21" alt="" />
                        </div>
                        <div>
                            <h3 className="font-black text-slate-800 uppercase italic tracking-tighter">Dr. Sarah Johnson</h3>
                            <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online Now
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-3 bg-slate-50 text-slate-400 hover:text-primary rounded-xl transition-all"><Phone size={18} /></button>
                        <button className="p-3 bg-slate-50 text-slate-400 hover:text-primary rounded-xl transition-all"><Video size={18} /></button>
                        <button className="p-3 bg-slate-50 text-slate-400 hover:text-primary rounded-xl transition-all"><MoreVertical size={18} /></button>
                    </div>
                </div>

                <div className="flex-1 bg-slate-50/50 p-10 overflow-y-auto space-y-6">
                    <div className="flex flex-col gap-4 max-w-[70%]">
                        <div className="bg-white p-6 rounded-3xl rounded-tl-none font-bold text-sm text-slate-700 shadow-soft-sm">
                            Hello Alex, have you reviewed your latest report yet?
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase">10:24 AM</span>
                    </div>

                    <div className="flex flex-col items-end gap-4 ml-auto max-w-[70%]">
                        <div className="bg-primary p-6 rounded-3xl rounded-tr-none font-bold text-sm text-white shadow-xl shadow-primary/20">
                            Hi Doctor, yes I just checked. Everything looks good except the cholesterol levels.
                        </div>
                        <span className="text-[9px] font-bold text-primary uppercase">10:26 AM</span>
                    </div>
                </div>

                <div className="p-8 border-t border-slate-100 flex items-center gap-6">
                    <button className="p-3 text-slate-300 hover:text-primary transition-colors"><Smile size={22} /></button>
                    <button className="p-3 text-slate-300 hover:text-primary transition-colors"><Paperclip size={22} /></button>
                    <input type="text" placeholder="Type your message here..." className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-primary/10" />
                    <button className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Messages
