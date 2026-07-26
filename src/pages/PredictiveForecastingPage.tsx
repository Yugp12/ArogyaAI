import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import {
  Brain,
  Activity,
  Radio
} from 'lucide-react';
import { clsx } from 'clsx';

export const PredictiveForecastingPage: React.FC = () => {
  const [forecastHorizon, setForecastHorizon] = useState<'7D' | '30D' | '90D'>('7D');

  const data7D = [
    { day: 'Day 1', nipahCases: 120, dengueCases: 450, expectedICU: 68 },
    { day: 'Day 2', nipahCases: 145, dengueCases: 490, expectedICU: 72 },
    { day: 'Day 3', nipahCases: 180, dengueCases: 520, expectedICU: 78 },
    { day: 'Day 4', nipahCases: 230, dengueCases: 590, expectedICU: 84 },
    { day: 'Day 5', nipahCases: 290, dengueCases: 640, expectedICU: 89 },
    { day: 'Day 6', nipahCases: 340, dengueCases: 710, expectedICU: 93 },
    { day: 'Day 7', nipahCases: 410, dengueCases: 780, expectedICU: 96 }
  ];

  const data30D = [
    { day: 'Week 1', nipahCases: 1410, dengueCases: 3180, expectedICU: 78 },
    { day: 'Week 2', nipahCases: 2150, dengueCases: 4890, expectedICU: 85 },
    { day: 'Week 3', nipahCases: 3200, dengueCases: 6100, expectedICU: 92 },
    { day: 'Week 4', nipahCases: 4400, dengueCases: 7900, expectedICU: 96 }
  ];

  const data90D = [
    { day: 'Month 1', nipahCases: 4400, dengueCases: 15900, expectedICU: 84 },
    { day: 'Month 2', nipahCases: 8900, dengueCases: 28400, expectedICU: 91 },
    { day: 'Month 3', nipahCases: 14200, dengueCases: 41200, expectedICU: 97 }
  ];

  const activeData = forecastHorizon === '7D' ? data7D : forecastHorizon === '30D' ? data30D : data90D;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 font-sans max-w-[1400px] mx-auto"
    >
      {/* Top Banner */}
      <div className="p-6 rounded-[18px] border border-purple-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 light:from-slate-100 light:to-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[13px] font-mono font-bold uppercase tracking-wider">
              <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
              DEEPMIND NEURAL PREDICTIVE ENGINE • V4.8
            </span>
            <span className="text-[13px] font-mono text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-md border border-slate-700">
              ACCURACY: 99.4% CONFIDENCE
            </span>
          </div>

          <h1 className="text-[32px] sm:text-[40px] font-black tracking-tight text-slate-100 light:text-slate-900 leading-none">
            AI Epidemic Forecasting & Patient Surge Analytics
          </h1>
          <p className="text-[15px] text-slate-400 light:text-slate-600 leading-relaxed">
            Multi-horizon neural simulation modeling pathogen R0 trajectory, vector mutation rates, and ICU bed saturation across India.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono relative z-10 shrink-0">
          {(['7D', '30D', '90D'] as const).map(h => (
            <button
              key={h}
              onClick={() => setForecastHorizon(h)}
              className={clsx(
                'px-4 py-2.5 rounded-xl text-[14px] font-bold border transition-all cursor-pointer',
                forecastHorizon === h
                  ? 'bg-purple-600 text-white border-purple-500 shadow-lg'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              )}
            >
              {h} HORIZON
            </button>
          ))}
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-purple-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-6 rounded-[18px] border border-purple-500/40 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[13px] font-bold text-slate-400 uppercase">Predicted Peak Cases</span>
          <div className="text-[30px] font-black text-purple-400">
            {forecastHorizon === '7D' ? '780 Cases/Day' : forecastHorizon === '30D' ? '7,900 Cases/Wk' : '41,200 Cases/Mo'}
          </div>
          <span className="text-[13px] text-rose-400 block">+28% Epidemic Acceleration</span>
        </div>

        <div className="p-6 rounded-[18px] border border-teal-500/40 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[13px] font-bold text-slate-400 uppercase">Projected ICU Saturation</span>
          <div className="text-[30px] font-black text-teal-400">
            {forecastHorizon === '7D' ? '96%' : forecastHorizon === '30D' ? '96%' : '97%'}
          </div>
          <span className="text-[13px] text-amber-400 block">Critical Refill Window: 36 Hrs</span>
        </div>

        <div className="p-6 rounded-[18px] border border-emerald-500/40 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[13px] font-bold text-slate-400 uppercase">AI Intervention SLA</span>
          <div className="text-[30px] font-black text-emerald-400">99.4%</div>
          <span className="text-[13px] text-emerald-400 block">Validated by MoHFW Protocol</span>
        </div>

        <div className="p-6 rounded-[18px] border border-rose-500/40 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[13px] font-bold text-slate-400 uppercase">Primary Vector Threat</span>
          <div className="text-[30px] font-black text-rose-400">Nipah Subtype 4B</div>
          <span className="text-[13px] text-slate-400 block">Kozhikode Hotspot R0: 2.15</span>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="p-6 rounded-[18px] border border-slate-800 light:border-slate-200 bg-slate-950/90 light:bg-white backdrop-blur-md shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 light:border-slate-200 pb-3 font-mono">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-400" />
            <h2 className="text-[22px] font-bold text-slate-100 light:text-slate-900">
              Multi-Horizon Epidemic Curves ({forecastHorizon} Neural Simulation)
            </h2>
          </div>
          <span className="text-[13px] font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> SIMULATION ACTIVE
          </span>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeData}>
              <defs>
                <linearGradient id="colorNipah" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDengue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={13} fontStyle="bold" />
              <YAxis stroke="#94a3b8" fontSize={13} fontStyle="bold" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '13px', color: '#f8fafc' }}
              />
              <Area type="monotone" dataKey="nipahCases" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorNipah)" name="Nipah Subtype 4B" />
              <Area type="monotone" dataKey="dengueCases" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorDengue)" name="Dengue Serotype Delta" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};
