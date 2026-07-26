import React from 'react';
import { motion } from 'framer-motion';
import { useCommand } from '../context/CommandContext';
import {
  BarChart3,
  FileSpreadsheet,
  Printer,
  Sparkles,
  TrendingUp,
  Trophy
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const ExecutiveAnalyticsPage: React.FC = () => {
  const { addNotification } = useCommand();

  const monthlyTrends = [
    { month: 'Jan', intake: 24000, recovery: 22800, efficiency: 95 },
    { month: 'Feb', intake: 28500, recovery: 27100, efficiency: 95 },
    { month: 'Mar', intake: 34200, recovery: 32900, efficiency: 96 },
    { month: 'Apr', intake: 41000, recovery: 39800, efficiency: 97 },
    { month: 'May', intake: 48500, recovery: 47200, efficiency: 97 },
    { month: 'Jun', intake: 52100, recovery: 50900, efficiency: 98 },
    { month: 'Jul', intake: 54720, recovery: 53600, efficiency: 99 }
  ];

  const hospitalRankings = [
    { rank: 1, name: 'AIIMS New Delhi', efficiency: '99.8%', beds: '1,200', sla: '3.8 min', score: 99.4, badge: 'PLATINUM APEX' },
    { rank: 2, name: 'NIMHANS Bengaluru', efficiency: '99.2%', beds: '950', sla: '4.1 min', score: 98.8, badge: 'GOLD HIGH' },
    { rank: 3, name: 'PGIMER Chandigarh', efficiency: '98.5%', beds: '1,100', sla: '4.5 min', score: 97.9, badge: 'GOLD HIGH' },
    { rank: 4, name: 'Manipal Hospital Mumbai', efficiency: '97.8%', beds: '850', sla: '4.8 min', score: 97.1, badge: 'SILVER NODE' },
    { rank: 5, name: 'Kozhikode Medical Hub', efficiency: '96.4%', beds: '780', sla: '5.2 min', score: 95.8, badge: 'VECTOR SURGE' }
  ];

  const handleExportPDF = () => {
    addNotification('EXECUTIVE BRIEFING: Generating high-resolution PDF report for MoHFW & WHO.');
    window.print();
  };

  const handleExportExcel = () => {
    addNotification('EXPORT COMPLETE: National Analytics Ledger exported to CSV/Excel.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 font-sans"
    >
      <div className="p-6 rounded-3xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 light:text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-teal-400" />
            National Healthcare Executive Analytics & Performance Center
          </h1>
          <p className="text-xs text-slate-400 light:text-slate-500 mt-1">
            High-level WHO & MoHFW briefing metrics, multi-center hospital efficiency rankings, and PDF report export
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap font-mono">
          <button
            onClick={handleExportPDF}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Export Executive PDF</span>
          </button>

          <button
            onClick={handleExportExcel}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-4 rounded-2xl border border-teal-500/40 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2 glow-teal">
          <span className="text-[10px] font-bold text-slate-400 uppercase">National AI Health Index</span>
          <div className="text-2xl font-black text-teal-400">96.4<span className="text-xs text-slate-400">/100</span></div>
          <span className="text-[10px] text-teal-400 block">Nominal Grid Stability</span>
        </div>

        <div className="p-4 rounded-2xl border border-emerald-500/40 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Mortality Mitigation Rate</span>
          <div className="text-2xl font-black text-emerald-400">99.4%</div>
          <span className="text-[10px] text-emerald-400 block">+14.2% vs 2025 Baseline</span>
        </div>

        <div className="p-4 rounded-2xl border border-cyan-500/40 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Patients Saved</span>
          <div className="text-2xl font-black text-cyan-400">34,820</div>
          <span className="text-[10px] text-slate-400 block">AI Triage & Tele-ICU Interventions</span>
        </div>

        <div className="p-4 rounded-2xl border border-purple-500/40 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Resource Utilization</span>
          <div className="text-2xl font-black text-purple-400">94.2%</div>
          <span className="text-[10px] text-slate-400 block">Optimal Stock & Bed Balance</span>
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
                Executive AI Health Intelligence Briefing
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded">
                  WHO & MOHFW FORMATTED
                </span>
              </h3>
              <p className="text-xs text-slate-400">Automated multi-center executive performance synthesis</p>
            </div>
          </div>

          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">Briefing ID: IND-EXEC-2026</span>
        </div>

        <p className="text-xs text-slate-300 light:text-slate-700 leading-relaxed font-sans">
          During the current 30-day reporting window, the <strong>ArogyaAI National Command Grid</strong> successfully mitigated 99.4% of epidemic mortality risks across 5 apex hospital hubs. Automated Tele-ICU diversion protocols prevented a 98% bed saturation failure at PGIMER Chandigarh, while cryogenic LMO convoys maintained continuous 94.2% oxygen availability in Kozhikode.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-5 backdrop-blur-md shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-100 light:text-slate-900 flex items-center gap-2 font-sans">
                <TrendingUp className="w-4 h-4 text-teal-400" />
                Monthly Patient Intake vs Recovery Velocity (Jan - Jul)
              </h3>
              <p className="text-xs text-slate-400">
                Comparative throughput analysis across national healthcare command hubs
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Recovery 98%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
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
                <Bar dataKey="intake" fill="#f43f5e" radius={[6, 6, 0, 0]} name="Patient Intake" />
                <Bar dataKey="recovery" fill="#14b8a6" radius={[6, 6, 0, 0]} name="Discharged Recovery" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-5 backdrop-blur-md shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              National Apex Hospital Efficiency Rankings
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Top 5 Hubs</span>
          </div>

          <div className="space-y-2.5 font-sans text-xs">
            {hospitalRankings.map((h) => (
              <div key={h.rank} className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center ${h.rank === 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                    #{h.rank}
                  </span>
                  <div>
                    <div className="font-bold text-slate-100 light:text-slate-900">{h.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{h.beds} Beds • SLA: {h.sla}</div>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="font-bold text-teal-400 text-sm">{h.efficiency}</div>
                  <span className="text-[9px] text-emerald-400 font-bold uppercase">{h.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
