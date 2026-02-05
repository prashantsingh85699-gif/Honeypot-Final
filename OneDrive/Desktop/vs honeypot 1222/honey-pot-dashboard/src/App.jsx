import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, Activity, Database, LayoutDashboard, Send, Zap, ShieldAlert, Server, Cpu, Radio, User, Bot } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0A0A0A] border border-cyber-lime p-4 rounded-xl shadow-2xl font-bold">
        <p className="text-[10px] text-cyber-lime uppercase mb-1 font-black">Traffic</p>
        <p className="text-2xl text-white italic font-black">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function App() {
  const location = useLocation();
  const [messages, setMessages] = useState([{ sender: 'context', text: "System Active. Waiting for threat vectors..." }]);
  const [intel, setIntel] = useState({ upilds: [], bankAccounts: [], links: [], logs: [] });
  const [sys, setSys] = useState({ load: 32, threat: "SYSTEM SECURE", isCritical: false });
  const chatEndRef = useRef(null);

  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const handleSendMessage = async (text) => {
    if (!text) return;
    setMessages(prev => [...prev, { sender: 'user', text }]);
    
    try {
      const response = await fetch("https://honeypot-final-1.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": "NIAT_SECRET_2026" },
        body: JSON.stringify({ message: { sender: "scammer", text }, conversationHistory: messages })
      });
      const data = await response.json();
      
      const isCrit = data.metrics.isCritical;
      if (data.extractedIntelligence) {
        setIntel(prev => ({
          upilds: [...new Set([...prev.upilds, ...data.extractedIntelligence.upilds])],
          bankAccounts: [...new Set([...prev.bankAccounts, ...data.extractedIntelligence.bankAccounts])],
          links: [...new Set([...prev.links, ...data.extractedIntelligence.phishingLinks])],
          logs: isCrit ? [{ip: data.metrics.blockedIP, time: new Date().toLocaleTimeString(), type: 'CRITICAL'}, ...prev.logs].slice(0,8) : prev.logs
        }));
        setSys({ load: data.metrics.nodeLoad, threat: data.metrics.threatLevel, isCritical: isCrit });
      }
      setMessages(prev => [...prev, { sender: 'agent', text: data.reply }]);
    } catch (e) { 
      setMessages(prev => [...prev, { sender: 'error', text: "Backend Offline. Restart main.py" }]);
    }
  };

  const theme = sys.isCritical ? "red" : "blue"; 
  const accent = sys.isCritical ? "#ef4444" : "#3b82f6";

  return (
    <div className="flex h-screen bg-[#05050a] text-slate-200 font-sans overflow-hidden">
      <aside className={`w-72 bg-[#0a0a12] border-r ${sys.isCritical ? 'border-red-900' : 'border-blue-900/30'} p-6 flex flex-col`}>
        <div className="flex items-center gap-3 mb-10">
          <div className={`p-2 rounded-lg ${sys.isCritical ? 'bg-red-600 animate-pulse' : 'bg-blue-600'} text-white`}><Shield size={28} /></div>
          <div><h1 className="font-black text-xl text-white uppercase">Impact<br/><span className={sys.isCritical ? 'text-red-500' : 'text-blue-500'}>Forge</span></h1></div>
        </div>
        <nav className="flex-1 space-y-2">
          <SidebarLink to="/" icon={<LayoutDashboard size={18}/>} label="Operations" active={location.pathname==='/'} theme={theme} />
          <SidebarLink to="/chat" icon={<Activity size={18}/>} label="Live Intercept" active={location.pathname==='/chat'} theme={theme} />
          <SidebarLink to="/vault" icon={<Database size={18}/>} label="Intel Vault" active={location.pathname==='/vault'} theme={theme} />
        </nav>
        <div className={`mt-auto p-4 rounded-xl border ${sys.isCritical ? 'border-red-900 bg-red-950/20' : 'border-blue-900/30 bg-blue-950/20'} flex items-center gap-3`}>
          <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold ${sys.isCritical ? 'border-red-500 text-red-500' : 'border-blue-500 text-blue-400'}`}>IF</div>
          <div><p className="text-sm font-bold text-white">Impact Forge</p><p className="text-[10px] text-slate-500 font-bold">NIAT-VGU</p></div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[#05050a]">
        <Routes>
          <Route path="/" element={
            <div className="p-8 space-y-8">
              <header className="flex justify-between items-center italic">
                <div><h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Operations Center</h1><p className="text-slate-500 text-[10px] font-black uppercase mt-1">Global Node: Jaipur-HQ</p></div>
                <div className="flex gap-4"><StatusPill icon={Server} label="AI Cluster" status="ONLINE" theme={theme}/><StatusPill icon={Cpu} label="Compute" status="ONLINE" theme={theme}/></div>
              </header>
              <div className="grid grid-cols-4 gap-6">
                <StatBox label="Extraction" val="99.2%" sub="High Precision" theme={theme} />
                <StatBox label="Neutralized" val={475 + intel.logs.length} sub="Total Alerts" theme={theme} />
                <StatBox label="Health" val="100%" sub={sys.threat} theme={theme} />
                <StatBox label="Active Nodes" val="12" sub="NIAT-VGU" theme={theme} />
              </div>
              <div className="grid grid-cols-3 gap-8 h-[400px]">
                <div className={`col-span-2 bg-[#0a0a12] border ${sys.isCritical?'border-red-900':'border-white/5'} rounded-[2rem] p-8 relative shadow-2xl`}>
                  <h3 className="text-slate-500 text-[11px] font-black uppercase mb-8">Engagement Performance</h3>
                  <ResponsiveContainer>
                    <AreaChart data={[{t:1,v:40},{t:2,v:70},{t:3,v:sys.load},{t:4,v:90},{t:5,v:60}]}>
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: accent, strokeWidth: 2 }} />
                      <Area type="monotone" dataKey="v" stroke={accent} fillOpacity={0.1} fill={accent} strokeWidth={4} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className={`bg-[#0a0a12] border ${sys.isCritical?'border-red-900':'border-white/5'} rounded-[2rem] p-8 flex flex-col items-center shadow-2xl`}>
                  <h3 className="text-slate-500 text-[11px] font-black uppercase mb-8">Operational Risk</h3>
                  <ResponsiveContainer height="70%"><PieChart><Pie data={[{v:65},{v:sys.load},{v:15}]} innerRadius={70} outerRadius={90} dataKey="v"><Cell fill="#10b981"/><Cell fill={accent}/><Cell fill="#64748b"/></Pie></PieChart></ResponsiveContainer>
                  <div className={`text-2xl font-black mt-4 ${sys.isCritical?'text-red-500':'text-blue-500'}`}>{sys.load}%</div>
                </div>
              </div>
            </div>
          } />
          <Route path="/chat" element={
            <div className="h-full flex flex-col p-6 max-w-5xl mx-auto">
              <div className="flex-1 overflow-y-auto space-y-6 pr-4 mb-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex w-full ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {(m.sender === 'agent' || m.sender === 'context' || m.sender === 'error') && (
                      <div className="flex gap-3 max-w-[75%]">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.sender==='error'?'bg-red-600': m.sender==='context'?'bg-slate-800':'bg-white text-black'}`}>
                          {m.sender==='agent' ? <Bot size={18}/> : <Radio size={14}/>}
                        </div>
                        <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-lg ${m.sender === 'context' ? 'bg-[#0f0f1a] text-slate-500 border border-slate-800 italic text-xs' : 'bg-white text-slate-900 rounded-tl-none'}`}>{m.text}</div>
                      </div>
                    )}
                    {m.sender === 'user' && (
                      <div className="flex gap-3 max-w-[75%] flex-row-reverse">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${sys.isCritical ? 'bg-red-600' : 'bg-blue-600'}`}><User size={18} className="text-white"/></div>
                        <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-lg text-white rounded-tr-none ${sys.isCritical ? 'bg-red-600' : 'bg-blue-600'}`}>{m.text}</div>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className={`flex gap-3 bg-[#0a0a12] p-2 rounded-full border ${sys.isCritical?'border-red-900':'border-blue-900/30'} shadow-2xl`}>
                <input onKeyPress={(e)=>e.key==='Enter' && (handleSendMessage(e.target.value), e.target.value='')} className="flex-1 bg-transparent px-6 outline-none text-sm font-medium text-white placeholder-slate-600" placeholder="Simulate Attack..." />
                <button className={`p-3 rounded-full text-white shadow-lg ${sys.isCritical ? 'bg-red-600' : 'bg-blue-600'}`}><Send size={18} /></button>
              </div>
            </div>
          } />
          <Route path="/vault" element={<div className="p-10 space-y-8"><h2 className="text-3xl font-black text-white uppercase">Intelligence Vault</h2><div className={`bg-[#0a0a12] border rounded-3xl overflow-hidden shadow-2xl ${theme==='red'?'border-red-900/30':'border-white/10'}`}><table className="w-full text-left text-sm text-slate-300 font-mono"><tbody className="divide-y divide-white/5"><tr><td className="p-6 font-bold text-blue-400">UPI IDs</td><td className="p-6">{intel.upilds.join(", ") || "Waiting..."}</td></tr><tr><td className="p-6 font-bold text-blue-400">Bank Accts</td><td className="p-6">{intel.bankAccounts.join(", ") || "Waiting..."}</td></tr><tr><td className="p-6 font-bold text-red-400">Links</td><td className="p-6">{intel.links.join(", ") || "Waiting..."}</td></tr></tbody></table></div></div>} />
        </Routes>
      </main>
    </div>
  );
}

const SidebarLink = ({ to, icon, label, active, theme }) => (
  <Link to={to} className={`flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-bold transition-all ${active ? (theme==='red'?'bg-red-600 text-white':'bg-blue-600 text-white') : 'text-slate-400 hover:bg-[#151520] hover:text-white'}`}>{icon} <span>{label}</span></Link>
);
const StatBox = ({ label, val, sub, theme }) => (
  <div className={`p-6 bg-[#0a0a12] rounded-[2rem] border ${theme==='red'?'border-red-900/50':'border-white/5'} shadow-lg`}><h3 className={`text-4xl font-black ${theme==='red'?'text-red-500':'text-white'}`}>{val}</h3><p className="text-[10px] uppercase text-slate-500 font-bold">{label}</p><p className="text-[8px] uppercase text-slate-600">{sub}</p></div>
);
const StatusPill = ({ icon: Icon, label, status, theme }) => (
  <div className={`border px-4 py-2 rounded-xl flex items-center gap-3 font-bold text-xs shadow-sm ${theme==='red' ? 'bg-red-950/20 border-red-900 text-red-400' : 'bg-[#0a0a12] border-white/10 text-slate-300'}`}><Icon size={14}/><div className="leading-none"><p className="text-[8px] opacity-50 uppercase mb-0.5">{label}</p>{status}</div></div>
);