import { useState } from 'react';
import { Activity, Database, Server, Settings, ShieldAlert, Cpu, Heart } from 'lucide-react';

export default function SuperAdminPortal() {
  const [schools, setSchools] = useState([
    { id: 'sc1', name: 'San Francisco Global Academy', status: 'ACTIVE', region: 'us-west-1', users: 182 },
    { id: 'sc2', name: 'Berlin Language Center', status: 'ACTIVE', region: 'eu-west-1', users: 114 },
    { id: 'sc3', name: 'Skill Full Secondary Institute', status: 'ACTIVE', region: 'eu-west-1', users: 95 },
  ]);

  const logs = [
    { timestamp: '08:53:20', level: 'INFO', msg: 'Vite and Node server initialising complete' },
    { timestamp: '08:53:52', level: 'WARN', msg: 'Database connection failed. Reconnection scheduler enabled' },
    { timestamp: '08:54:02', level: 'INFO', msg: 'Route /api/auth/register mounted correctly' },
    { timestamp: '08:54:12', level: 'INFO', msg: 'Route /api/feedback mounted correctly' },
  ];

  return (
    <div className="space-y-8" id="super-admin-workspace">
      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-white shadow-xl">
        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            System Owner & Root Super Admin
          </span>
          <h1 className="text-3xl font-extrabold mt-2 tracking-tight">
            Global Systems Orchestrator
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Supervise global tenant schools, database read/write latency metrics, and core container health.
          </p>
        </div>
      </div>

      {/* System stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6" id="sys-status-grid">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex items-center gap-5">
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Database Link</span>
            <h3 className="text-lg font-extrabold text-slate-800 mt-0.5">PostgreSQL</h3>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">ONLINE</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex items-center gap-5">
          <div className="p-4 rounded-2xl bg-violet-50 border border-violet-100 text-violet-600">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Core CPU Load</span>
            <h3 className="text-lg font-extrabold text-slate-800 mt-0.5">1.42%</h3>
            <span className="text-[10px] font-bold text-slate-400">Normal</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex items-center gap-5">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">API Port Gateway</span>
            <h3 className="text-lg font-extrabold text-slate-800 mt-0.5">Port 3000</h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">INGRESS READY</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex items-center gap-5">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">System Alerts</span>
            <h3 className="text-lg font-extrabold text-rose-600 mt-0.5">0 Incidents</h3>
            <span className="text-[10px] font-bold text-slate-400">All Systems nominal</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tenant schools */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">
            Tenant Schools & Registrars
          </h2>
          <div className="border border-slate-200/70 rounded-3xl bg-white overflow-hidden divide-y divide-slate-100 shadow-sm" id="tenant-list">
            {schools.map((school) => (
              <div key={school.id} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-all">
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm">{school.name}</h4>
                  <span className="text-[11px] font-semibold text-slate-400">Region: {school.region}</span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="font-bold text-slate-600">{school.users} Users</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-[10px]">
                    {school.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time system logs console */}
        <div className="space-y-6">
          <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">
            Microservice Console Logs
          </h2>
          <div className="bg-slate-950 text-emerald-400 rounded-3xl p-6 font-mono text-[11px] leading-relaxed shadow-inner border border-slate-800 min-h-[220px]" id="logs-console">
            <div className="text-slate-500 mb-2">// Reading system streams...</div>
            {logs.map((log, index) => (
              <div key={index} className="mb-2">
                <span className="text-slate-500">[{log.timestamp}]</span>{' '}
                <span className={log.level === 'WARN' ? 'text-amber-400 font-bold' : 'text-indigo-400'}>
                  {log.level}
                </span>{' '}
                <span className="text-slate-300">{log.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
