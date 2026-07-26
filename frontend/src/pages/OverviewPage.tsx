import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OutbreakMap } from '../components/map/OutbreakMap';
import { LiveEcgMonitor } from '../components/telemetry/LiveEcgMonitor';
import { PatientRiskTable } from '../components/triage/PatientRiskTable';
import { useCommand } from '../context/CommandContext';
import {
  Activity,
  AlertTriangle,
  Bed,
  Sparkles,
  TrendingUp,
  FileText,
  Pill,
  Users,
  TestTube2,
  ShieldAlert,
  Zap,
  Clock,
  RefreshCw,
  Bell,
  Cpu,
  Play
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { clsx } from 'clsx';

export const OverviewPage: React.FC = () => {
  const { setActiveModal, addNotification } = useCommand();

  const [refreshing, setRefreshing] = useState(false);

  const handleRefreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      addNotification('TELEMETRY SYNC: 4,820 National Health Grid sensors updated successfully.');
    }, 1000);
  };

  const projectionData = [
    { date: 'Jul 18', dengue: 9800, nipah: 180, influenza: 14200, bedLoad: 72 },
    { date: 'Jul 19', dengue: 10600, nipah: 210, influenza: 15400, bedLoad: 76 },
    { date: 'Jul 20', dengue: 11500, nipah: 280, influenza: 16900, bedLoad: 79 },
    { date: 'Jul 21', dengue: 12400, nipah: 320, influenza: 18100, bedLoad: 81 },
    { date: 'Jul 22', dengue: 13100, nipah: 380, influenza: 19800, bedLoad: 83 },
    { date: 'Jul 23', dengue: 13900, nipah: 410, influenza: 20900, bedLoad: 84 },
    { date: 'Jul 24', dengue: 14280, nipah: 420, influenza: 21850, bedLoad: 86 },
  ];

  const recentActivities = [
    { id: 1, time: '10:24:12', text: 'AIIMS Delhi initiated Tele-ICU High-Flow Oxygen for Patient PT-9941', type: 'CLINICAL' },
    { id: 2, time: '10:20:05', text: '4,000L Liquid Oxygen Tanker convoy dispatched to Kozhikode Command Node', type: 'LOGISTICS' },
    { id: 3, time: '10:15:30', text: 'Genomic Sequencer flagged NS1 Mutation N207Q in Dengue 5-Delta strain', type: 'GENOMIC' },
    { id: 4, time: '10:08:44', text: 'WHO Epidemic Alert Sync completed with 99.4% compliance score', type: 'SYSTEM' }
  ];

  const todayAlerts = [
    { id: 'ALT-101', level: 'CRITICAL', text: 'Nipah Virus R0 rate spike to 2.15 in Kozhikode Vector Cluster', time: '5m ago' },
    { id: 'ALT-102', level: 'HIGH', text: 'PGIMER Chandigarh ICU bed capacity reached 96% stress threshold', time: '12m ago' },
    { id: 'ALT-103', level: 'MODERATE', text: 'Oseltamivir antiviral stock refill required for Delhi NCR health hubs', time: '28m ago' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 font-sans"
    >
      <div className="rounded-3xl border border-slate-800/80 light:border-slate-200 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 light:from-slate-100 light:to-white p-6 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              GOOGLE CLOUD HEALTH MONITORING • GRID V4.5
            </span>
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-md border border-slate-700">
              CLUSTER ID: IND-APEX-01
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-100 light:text-slate-900">
            ArogyaAI National Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 leading-relaxed">
            Real-time telemetry, predictive ICU load balancing, and AI epidemic decision intelligence for the Ministry of Health & WHO.
          </p>
        </div>

        <div className="flex items-center gap-2.5 relative z-10 shrink-0 flex-wrap">
          <button
            onClick={handleRefreshData}
            disabled={refreshing}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center justify-center cursor-pointer"
            title="Refresh Telemetry"
          >
            <RefreshCw className={clsx('w-4 h-4 text-teal-400', refreshing && 'animate-spin')} />
          </button>

          <button
            onClick={() => setActiveModal('copilot')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/25 transition-all cursor-pointer glow-teal font-mono"
          >
            <Sparkles className="w-4 h-4 text-teal-200" />
            <span>Launch Copilot</span>
          </button>

          <button
            onClick={() => setActiveModal('report')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 light:bg-slate-100 light:text-slate-800 font-semibold text-xs border border-slate-700 light:border-slate-300 flex items-center gap-2 transition-all cursor-pointer font-mono"
          >
            <FileText className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-teal-500/10 to-transparent pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        <div className="p-4 rounded-2xl border border-teal-500/40 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2 glow-teal">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">AI Health Index</span>
            <Cpu className="w-4 h-4 text-teal-400 animate-pulse" />
          </div>
          <div className="text-2xl font-black font-mono text-teal-400">96.4<span className="text-xs text-slate-400">/100</span></div>
          <div className="text-[10px] text-emerald-400 font-mono">NOMINAL STABILITY</div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Patient Load</span>
            <Activity className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-100 light:text-slate-900">54,720</div>
          <div className="text-[10px] text-rose-400 font-mono">+10.4% 24h surge</div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Medicine & O2</span>
            <Pill className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black font-mono text-cyan-400">94.2%</div>
          <div className="text-[10px] text-slate-400 font-mono">6.8 Days LMO Reserve</div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Doctors On Duty</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-100 light:text-slate-900">8,940</div>
          <div className="text-[10px] text-emerald-400 font-mono">97.1% Attendance</div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">ICU Bed Load</span>
            <Bed className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono text-amber-400">84%</div>
          <div className="text-[10px] text-slate-400 font-mono">350 Beds Free</div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Lab Grid</span>
            <TestTube2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black font-mono text-purple-400">420</div>
          <div className="text-[10px] text-slate-400 font-mono">High-Throughput WGS</div>
        </div>

        <div className="p-4 rounded-2xl border border-rose-500/40 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2 glow-rose">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Vector Risk</span>
            <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />
          </div>
          <div className="text-2xl font-black font-mono text-rose-400">R0 1.84</div>
          <div className="text-[10px] text-rose-400 font-mono font-bold">CRITICAL HIGH</div>
        </div>
      </div>

      <div className="rounded-2xl border border-teal-500/30 bg-slate-900/90 light:bg-white p-5 backdrop-blur-md shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
                Google Health & ArogyaAI Decision Advisor
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded">
                  98.8% CONFIDENCE
                </span>
              </h3>
              <p className="text-xs text-slate-400">Automated multi-node optimization recommendations</p>
            </div>
          </div>

          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">EpiModel v4.5-MED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/70 light:bg-slate-100 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 font-mono">RECOMMENDATION 1</span>
              <span className="text-[9px] text-slate-500">PRIORITY HIGH</span>
            </div>
            <p className="text-slate-300 light:text-slate-700 leading-relaxed">
              Initiate Tele-ICU diversion from PGIMER Chandigarh to Tier-2 regional hospitals to prevent 98% bed saturation within 36 hours.
            </p>
            <button
              onClick={() => addNotification('EXECUTED: Tele-ICU diversion initiated for PGIMER Chandigarh.')}
              className="px-3 py-1.5 rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 border border-teal-500/30 font-bold font-mono text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" /> Execute Diversion
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 light:bg-slate-100 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-400 font-mono">RECOMMENDATION 2</span>
              <span className="text-[9px] text-slate-500">LOGISTICS</span>
            </div>
            <p className="text-slate-300 light:text-slate-700 leading-relaxed">
              Dispatch 4,000L Liquid Oxygen convoy from Central Strategic Storage Nagpur to Kozhikode Command Center.
            </p>
            <button
              onClick={() => addNotification('EXECUTED: LMO Convoy dispatched to Kozhikode.')}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/30 font-bold font-mono text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" /> Dispatch LMO Convoy
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 light:bg-slate-100 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-400 font-mono">RECOMMENDATION 3</span>
              <span className="text-[9px] text-slate-500">CONTAINMENT</span>
            </div>
            <p className="text-slate-300 light:text-slate-700 leading-relaxed">
              Deploy Mobile BSL-4 Isolation Unit & Ribavirin antiviral stockpile to Kozhikode Nipah vector sector.
            </p>
            <button
              onClick={() => setActiveModal('protocol')}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 font-bold font-mono text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" /> Open Containment
            </button>
          </div>
        </div>
      </div>

      <OutbreakMap />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-5 backdrop-blur-md shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-400" />
                7-Day Multi-Strain Epidemic Curve & ICU Bed Stress
              </h3>
              <p className="text-xs text-slate-400 light:text-slate-500">
                AI progression timeline cross-referenced with regional hospital load
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
              EpiPredict™ ML
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData}>
                <defs>
                  <linearGradient id="colorDengue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorInfluenza" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090d16',
                    borderColor: '#1f2937',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#f8fafc'
                  }}
                />
                <Area type="monotone" dataKey="influenza" stroke="#14b8a6" fillOpacity={1} fill="url(#colorInfluenza)" name="Influenza A" />
                <Area type="monotone" dataKey="dengue" stroke="#f43f5e" fillOpacity={1} fill="url(#colorDengue)" name="Dengue 5-Delta" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-5 backdrop-blur-md shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400 animate-bounce" />
                Today's Critical Alerts
              </h3>
              <span className="text-[10px] font-mono text-slate-400">3 Unresolved</span>
            </div>

            <div className="space-y-2">
              {todayAlerts.map((alt) => (
                <div
                  key={alt.id}
                  className="p-2.5 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className={clsx('px-2 py-0.5 text-[9px] font-bold font-mono rounded border uppercase', alt.level === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' : 'bg-amber-500/20 text-amber-400 border-amber-500/40')}>
                      {alt.level}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{alt.time}</span>
                  </div>
                  <p className="text-xs text-slate-200 light:text-slate-800">{alt.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-5 backdrop-blur-md shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" />
                Live Command Telemetry Stream
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">Synced</span>
            </div>

            <div className="space-y-2.5 text-xs font-sans">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-2.5">
                  <span className="text-[10px] font-mono text-slate-500 shrink-0 mt-0.5">{act.time}</span>
                  <p className="text-slate-300 light:text-slate-700 leading-snug">{act.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <LiveEcgMonitor
        patientName="Apex Tele-ICU Stream (Rajesh Kumar)"
        heartRate={128}
        spO2={82}
        bp="165/102"
      />

      <PatientRiskTable />
    </motion.div>
  );
};
