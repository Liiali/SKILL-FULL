import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ShieldAlert, CheckCircle2, RefreshCw, Cpu, Activity, DollarSign, Users, Sparkles, Sliders } from 'lucide-react';

export default function SuperAdminPortal({ userName }: { userName: string }) {
  const [infraStatus, setInfraStatus] = useState<'nominal' | 'surge'>('nominal');
  const [serverLoad, setServerLoad] = useState(24);
  const [activeConnections, setActiveConnections] = useState(14820);
  const [isSimulating, setIsSimulating] = useState(false);

  // Growth Chart Data
  const chartData = [
    { month: 'Jan', revenue: 42000, users: 8000 },
    { month: 'Feb', revenue: 58000, users: 11000 },
    { month: 'Mar', revenue: 76000, users: 15400 },
    { month: 'Apr', revenue: 94000, users: 19800 },
    { month: 'May', revenue: 118000, users: 24200 },
    { month: 'Jun', revenue: 142000, users: 29500 },
  ];

  const handleSimulateSurge = () => {
    setIsSimulating(true);
    setInfraStatus('surge');
    // Animate figures up
    let interval = setInterval(() => {
      setServerLoad((prev) => (prev < 82 ? prev + 4 : prev));
      setActiveConnections((prev) => (prev < 32000 ? prev + 1200 : prev));
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setIsSimulating(false);
    }, 1500);
  };

  const handleResetInfra = () => {
    setInfraStatus('nominal');
    setServerLoad(24);
    setActiveConnections(14820);
  };

  return (
    <div className="space-y-6" id="super-admin-portal-container">
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="text-left z-10">
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest font-mono">Macro-Platform Overseer</span>
          <h2 className="text-2xl font-black font-display text-slate-900 mt-0.5">Super Admin Terminal</h2>
          <p className="text-xs text-slate-500 font-light mt-1">Hello, {userName}. Inspect global MRR indices, infrastructure telemetry logs, and traffic surges.</p>
        </div>

        <div className="flex gap-2 shrink-0 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-150 rounded-xl text-[10px] font-bold font-mono uppercase tracking-wider">
            <Cpu className="w-4 h-4" /> Global Core: Online
          </div>
        </div>
      </motion.div>

      {/* Telemetry counters */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4" id="super-admin-telemetry-metrics">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-left relative overflow-hidden">
          <div className="absolute top-3 right-3 text-emerald-500">
            <DollarSign className="w-5 h-5" />
          </div>
          <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wider font-mono">Platform MRR index</span>
          <span className="block text-2xl font-black text-slate-900 mt-1 font-mono">$142,000</span>
          <span className="text-[10px] text-emerald-600 font-semibold font-mono mt-1 block">▲ +24.8% monthly growth</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-left relative overflow-hidden">
          <div className="absolute top-3 right-3 text-indigo-600">
            <Users className="w-5 h-5" />
          </div>
          <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wider font-mono">Global Active Learners</span>
          <span className="block text-2xl font-black text-indigo-600 mt-1 font-mono">{activeConnections.toLocaleString()}</span>
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">CEFR study trackers active</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-left relative overflow-hidden">
          <div className="absolute top-3 right-3 text-slate-400">
            <Activity className="w-5 h-5" />
          </div>
          <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wider font-mono">Core Server Load</span>
          <span className="block text-2xl font-black text-slate-900 mt-1 font-mono">{serverLoad}%</span>
          <span className="text-[10px] text-slate-400 font-medium mt-1 block">Dynamic container nodes</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-left relative overflow-hidden">
          <div className="absolute top-3 right-3">
            {infraStatus === 'nominal' ? '🟢' : '⚡'}
          </div>
          <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wider font-mono">Infra status ping</span>
          <span className="block text-2xl font-black text-slate-900 mt-1 font-mono">
            {infraStatus === 'nominal' ? 'NOMINAL' : 'SURGE ACTIVE'}
          </span>
          <span className={`text-[10px] font-semibold font-mono mt-1 block ${infraStatus === 'nominal' ? 'text-emerald-600' : 'text-amber-600 animate-pulse'}`}>
            {infraStatus === 'nominal' ? 'All nodes green (14ms)' : 'Scaling virtual containers'}
          </span>
        </div>
      </div>

      {/* Main Grid content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Custom SVG revenue chart */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-600" />
                <h3 className="font-black font-display text-sm text-slate-900">Platform Growth & Revenue Tracker (CEFR Global)</h3>
              </div>
              <span className="text-[10px] text-indigo-600 font-bold font-mono uppercase">Jan - Jun 2026</span>
            </div>

            {/* Premium Hand-Crafted SVG Chart */}
            <div className="relative h-64 w-full bg-slate-50 border border-slate-150 rounded-2xl p-4 overflow-hidden" id="super-admin-svg-chart">
              <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
                <div className="border-b border-slate-200 w-full h-0 text-[8px] font-mono text-slate-400">$150k</div>
                <div className="border-b border-slate-200 w-full h-0 text-[8px] font-mono text-slate-400">$100k</div>
                <div className="border-b border-slate-200 w-full h-0 text-[8px] font-mono text-slate-400">$50k</div>
                <div className="w-full h-0 text-[8px] font-mono text-slate-400">$0k</div>
              </div>

              {/* SVG Area Path & Grid bars */}
              <svg viewBox="0 0 600 200" className="w-full h-full pt-4 z-10 relative">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area under the line */}
                <path
                  d="M 50 160 Q 140 130 230 110 T 410 70 T 550 40 L 550 180 L 50 180 Z"
                  fill="url(#chartGrad)"
                />
                {/* Smooth stroke line */}
                <path
                  d="M 50 160 Q 140 130 230 110 T 410 70 T 550 40"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                
                {/* Visual points */}
                <circle cx="50" cy="160" r="4.5" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
                <circle cx="140" cy="130" r="4.5" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
                <circle cx="230" cy="110" r="4.5" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
                <circle cx="320" cy="90" r="4.5" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
                <circle cx="415" cy="70" r="4.5" fill="#ffffff" stroke="#4f46e5" strokeWidth="2.5" />
                <circle cx="550" cy="40" r="4.5" fill="#4f46e5" stroke="#ffffff" strokeWidth="2.5" className="animate-ping" />
                <circle cx="550" cy="40" r="5" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
              </svg>

              {/* X-Axis Month labels */}
              <div className="flex justify-between px-6 pt-2 font-mono text-[9px] font-black text-slate-400 uppercase">
                {chartData.map((d) => (
                  <span key={d.month}>{d.month}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Sandbox Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <Sliders className="w-5 h-5 text-indigo-600" />
              <h3 className="font-black font-display text-sm text-slate-900">Sandbox Telemetry Controls</h3>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-light mb-4">
              Simulate high load surges to review how containers scale, handle API traffic, and allocate server memory limits.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleSimulateSurge}
                disabled={isSimulating || infraStatus === 'surge'}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSimulating ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Spawning Server Nodes...
                  </>
                ) : (
                  'Simulate traffic Surge ⚡'
                )}
              </button>

              <button
                onClick={handleResetInfra}
                disabled={infraStatus === 'nominal'}
                className="w-full py-2.5 border border-slate-250 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <RefreshCw className="w-4 h-4 text-indigo-600" /> Reset Infrastructure
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
