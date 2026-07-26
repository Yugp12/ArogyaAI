import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCommand } from '../context/CommandContext';
import { mockOutbreaks } from '../data/mockData';
import {
  CloudRain,
  Thermometer,
  Wind,
  TrendingUp,
  Radio,
  Brain,
  ShieldAlert,
  Activity,
  Globe
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

export const OutbreakSurveillancePage: React.FC = () => {
  const { setActiveModal, addNotification } = useCommand();

  const [mapMode, setMapMode] = useState<'DISTRICT' | 'VILLAGE'>('DISTRICT');
  const [selectedOutbreakId, setSelectedOutbreakId] = useState<string>(mockOutbreaks[0].id);

  const trendData = [
    { day: 'Day 1', nipah: 12, dengue: 480, influenza: 1200 },
    { day: 'Day 3', nipah: 18, dengue: 620, influenza: 1450 },
    { day: 'Day 5', nipah: 28, dengue: 890, influenza: 1890 },
    { day: 'Day 7', nipah: 42, dengue: 1240, influenza: 2400 },
    { day: 'Day 9', nipah: 54, dengue: 1680, influenza: 2950 },
    { day: 'Day 12', nipah: 68, dengue: 2150, influenza: 3400 },
  ];

  const districtCoords: Record<string, { x: number; y: number }> = {
    'OB-101': { x: 38, y: 78 }, // Kozhikode
    'OB-102': { x: 34, y: 25 }, // Chandigarh
    'OB-103': { x: 28, y: 55 }, // Mumbai
    'OB-104': { x: 40, y: 30 }  // Delhi
  };

  const villageClusters = [
    { name: 'Perambra Village (Sector 4)', cases: 18, r0: 2.4, status: 'RED_ALERT', lat: 48, lng: 74 },
    { name: 'Panangad Micro-Cluster', cases: 14, r0: 2.1, status: 'RED_ALERT', lat: 42, lng: 76 },
    { name: 'Kuttiady Sub-District', cases: 9, r0: 1.8, status: 'HIGH_RISK', lat: 54, lng: 71 },
    { name: 'Chathamangalam Ward', cases: 6, r0: 1.4, status: 'MONITORED', lat: 38, lng: 80 }
  ];

  const handleDeclareContainment = () => {
    setActiveModal('protocol');
    addNotification('MISSION CONTROL: Emergency Phase-IV Containment Lockdown sequence triggered.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 font-sans"
    >
      <div className="p-6 rounded-3xl border border-teal-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 glow-teal">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 flex-wrap font-mono">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 animate-pulse text-teal-400" />
              NASA MISSION CONTROL STYLE • EPIDEMIC TELEMETRY
            </span>
            <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-md border border-slate-700">
              MISSION TIME: T+04:12:44 • ORBITAL SATELLITE SYNC
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-100">
            National Outbreak Intelligence & Biosurveillance Command
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Real-time geospatial vector heatmaps, satellite meteorological telemetry, and AI pathogen contagion forecasting.
          </p>
        </div>

        <button
          onClick={handleDeclareContainment}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs font-mono uppercase tracking-wider flex items-center gap-2.5 shadow-xl shadow-rose-500/25 transition-all cursor-pointer glow-rose shrink-0 relative z-10"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>TRIGGER PHASE-IV CONTAINMENT PROTOCOL</span>
        </button>

        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-rose-500/10 to-transparent pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-4 rounded-2xl border border-rose-500/40 bg-slate-900/80 backdrop-blur-md shadow-xl space-y-2 glow-rose">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Primary Vector Zone</span>
          <div className="text-2xl font-black text-rose-400">Kozhikode Sector</div>
          <span className="text-[10px] text-rose-400 block">Nipah Virus Subtype 4B</span>
        </div>

        <div className="p-4 rounded-2xl border border-amber-500/40 bg-slate-900/80 backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Reproduction Rate R0</span>
          <div className="text-2xl font-black text-amber-400">R0 2.15</div>
          <span className="text-[10px] text-amber-400 block">+0.31 Surge Rate</span>
        </div>

        <div className="p-4 rounded-2xl border border-teal-500/40 bg-slate-900/80 backdrop-blur-md shadow-xl space-y-2 glow-teal">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Atmospheric Moisture</span>
          <div className="text-2xl font-black text-teal-400">88% RH</div>
          <span className="text-[10px] text-teal-400 block">Optimal Vector Breeding</span>
        </div>

        <div className="p-4 rounded-2xl border border-cyan-500/40 bg-slate-900/80 backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">AI Outbreak Confidence</span>
          <div className="text-2xl font-black text-cyan-400">99.4%</div>
          <span className="text-[10px] text-cyan-400 block">Satellite DICOM Validated</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-950/90 p-5 backdrop-blur-md shadow-2xl space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Globe className="w-5 h-5 text-teal-400" />
                Inter-District Biosurveillance Heatmap & Village Grid
              </h3>
              <p className="text-xs text-slate-400">
                Satellite geospatial thermal telemetry tracking pathogen propagation vectors
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 font-mono text-xs">
              <button
                onClick={() => setMapMode('DISTRICT')}
                className={clsx(
                  'px-3 py-1 rounded-lg font-bold transition-all cursor-pointer',
                  mapMode === 'DISTRICT' ? 'bg-teal-500 text-slate-950 shadow-md' : 'text-slate-400'
                )}
              >
                District Heatmap
              </button>
              <button
                onClick={() => setMapMode('VILLAGE')}
                className={clsx(
                  'px-3 py-1 rounded-lg font-bold transition-all cursor-pointer',
                  mapMode === 'VILLAGE' ? 'bg-teal-500 text-slate-950 shadow-md' : 'text-slate-400'
                )}
              >
                Village Grid
              </button>
            </div>
          </div>

          <div className="relative h-96 w-full bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            {mapMode === 'DISTRICT' ? (
              <div className="relative w-full h-full flex items-center justify-center">
                {mockOutbreaks.map((ob) => {
                  const pos = districtCoords[ob.id] || { x: 50, y: 50 };
                  const isSelected = ob.id === selectedOutbreakId;

                  return (
                    <div
                      key={ob.id}
                      onClick={() => setSelectedOutbreakId(ob.id)}
                      className="absolute cursor-pointer group"
                      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    >
                      <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/50 flex items-center justify-center animate-ping" />
                      <div className={clsx('absolute inset-0 w-12 h-12 rounded-full backdrop-blur-xs flex items-center justify-center text-[10px] font-bold font-mono text-white shadow-lg transition-transform', isSelected ? 'bg-rose-600 scale-110 ring-4 ring-rose-500/40' : 'bg-rose-500/40')}>
                        {ob.state.slice(0, 2)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="relative w-full h-full">
                {villageClusters.map((vc, i) => (
                  <div
                    key={i}
                    className="absolute p-2 rounded-xl bg-slate-950/90 border border-rose-500/40 text-xs font-mono space-y-1 shadow-xl"
                    style={{ left: `${vc.lat}%`, top: `${vc.lng}%` }}
                  >
                    <div className="font-bold text-rose-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                      {vc.name}
                    </div>
                    <div className="text-[10px] text-slate-300">Cases: {vc.cases} • R0: {vc.r0}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[10px] font-mono text-slate-300 flex items-center gap-4">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /> Active Vector Surge</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> High Influx Risk</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-400" /> Satellite Telemetry Active</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-xl space-y-3 font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
              <h3 className="font-bold text-slate-100 flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-cyan-400" />
                Satellite Meteorological Telemetry
              </h3>
              <span className="text-[10px] text-teal-400">AWS SENSORS SYNC</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 uppercase flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-rose-400" /> Temperature
                </span>
                <span className="text-base font-bold text-slate-100">31.4°C</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 uppercase flex items-center gap-1">
                  <Wind className="w-3 h-3 text-cyan-400" /> Relative Humidity
                </span>
                <span className="text-base font-bold text-cyan-400">88% RH</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 uppercase flex items-center gap-1">
                  <CloudRain className="w-3 h-3 text-blue-400" /> 24h Rainfall
                </span>
                <span className="text-base font-bold text-slate-100">142 mm</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-[9px] text-slate-400 uppercase flex items-center gap-1">
                  <Activity className="w-3 h-3 text-amber-400" /> Mosquito Density
                </span>
                <span className="text-base font-bold text-amber-400">8.4 / 10</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-teal-500/30 bg-slate-900/80 p-5 backdrop-blur-md shadow-xl space-y-3 font-sans text-xs">
            <div className="flex items-center gap-2 text-teal-400 font-mono font-bold">
              <Brain className="w-4 h-4" />
              <span>AI ROOT CAUSE EPIDEMIOLOGICAL EXPLANATION</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Combination of 88% atmospheric humidity and unseasonal 142mm rainfall accelerated <em>Aedes aegypti</em> and fruit bat roosting activity in Kozhikode sector. High humidity extends pathogen viability on surfaces by 3.2x.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-mono">
              <TrendingUp className="w-4 h-4 text-teal-400" />
              Multi-Strain Pathogen Progression & Contagion Velocity
            </h3>
            <p className="text-xs text-slate-400">
              Comparative transmission growth cross-referenced across 3 active outbreak strains
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
            Nipah Surge High
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorNipah" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
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
              <Area type="monotone" dataKey="nipah" stroke="#f43f5e" fillOpacity={1} fill="url(#colorNipah)" name="Nipah Subtype 4B" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};
