import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommand } from '../../context/CommandContext';
import {
  Building2,
  Bed,
  Users,
  Pill,
  TestTube2,
  Sparkles,
  CloudRain,
  X,
  Zap
} from 'lucide-react';
import { clsx } from 'clsx';

interface DigitalTwinHospital {
  id: string;
  name: string;
  district: string;
  status: 'GREEN' | 'YELLOW' | 'RED';
  healthScore: number;
  bedOccupancy: string;
  doctorsActive: number;
  o2SupplyDays: number;
  aiAlert: string;
  coords: { x: number; y: number };
}

export const DistrictDigitalTwin: React.FC = () => {
  const { addNotification } = useCommand();

  const [selectedBuilding, setSelectedBuilding] = useState<DigitalTwinHospital | null>(null);

  const hospitals: DigitalTwinHospital[] = [
    {
      id: 'NODE-101',
      name: 'AIIMS New Delhi Apex Node',
      district: 'Delhi NCR Sector',
      status: 'GREEN',
      healthScore: 99.4,
      bedOccupancy: '78% (260 Beds Free)',
      doctorsActive: 1200,
      o2SupplyDays: 8.5,
      aiAlert: 'Nominal stability. Reserve capacity high.',
      coords: { x: 35, y: 28 }
    },
    {
      id: 'NODE-102',
      name: 'Kozhikode Epidemic Command Node',
      district: 'Kerala Vector Zone',
      status: 'RED',
      healthScore: 68.2,
      bedOccupancy: '94% (12 Beds Free)',
      doctorsActive: 480,
      o2SupplyDays: 1.8,
      aiAlert: 'CRITICAL: Nipah R0 2.15. Oxygen supply depleted to 1.8 days.',
      coords: { x: 38, y: 82 }
    },
    {
      id: 'NODE-103',
      name: 'PGIMER Chandigarh Regional Hub',
      district: 'Punjab/Haryana Sector',
      status: 'YELLOW',
      healthScore: 84.5,
      bedOccupancy: '96% (18 Beds Free)',
      doctorsActive: 890,
      o2SupplyDays: 4.2,
      aiAlert: 'ATTENTION: ICU bed saturation hit stress threshold. Tele-ICU active.',
      coords: { x: 32, y: 22 }
    },
    {
      id: 'NODE-104',
      name: 'Manipal Hospital Mumbai',
      district: 'MMR Coastal Zone',
      status: 'YELLOW',
      healthScore: 89.1,
      bedOccupancy: '82% (140 Beds Free)',
      doctorsActive: 750,
      o2SupplyDays: 6.0,
      aiAlert: 'Dengue 5-Delta cases rising. Excess ventilator capacity available.',
      coords: { x: 26, y: 58 }
    },
    {
      id: 'NODE-105',
      name: 'NIMHANS Bengaluru Institute',
      district: 'Karnataka Tech Grid',
      status: 'GREEN',
      healthScore: 98.8,
      bedOccupancy: '72% (310 Beds Free)',
      doctorsActive: 950,
      o2SupplyDays: 9.0,
      aiAlert: 'High specialist availability. Ready for Tele-ICU diversion.',
      coords: { x: 42, y: 76 }
    }
  ];

  const statusColor = {
    GREEN: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400 glow-teal',
    YELLOW: 'border-amber-500/50 bg-amber-500/10 text-amber-400',
    RED: 'border-rose-500/50 bg-rose-500/10 text-rose-400 animate-pulse glow-rose'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 font-sans relative"
    >
      <div className="p-5 rounded-3xl border border-teal-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 light:from-slate-100 light:to-white backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl glow-teal">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-teal-400 font-bold uppercase mb-1">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>HERO FEATURE • LIVE DIGITAL TWIN OF THE DISTRICT</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-100 light:text-slate-900">
            ArogyaAI Real-Time District Digital Twin & 3D Node Telemetry
          </h1>
          <p className="text-xs text-slate-400 light:text-slate-600 mt-1">
            Click any hospital building to inspect real-time doctors, beds, oxygen reserves, and AI predictions
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            5 APEX TWINS SYNCED
          </span>
        </div>
      </div>

      <div className="relative h-[480px] w-full rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl p-6 flex flex-col justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-b from-cyan-900/30 to-transparent flex items-center justify-around">
          <CloudRain className="w-16 h-16 text-cyan-400 animate-bounce [animation-duration:4s]" />
          <CloudRain className="w-20 h-20 text-blue-400 animate-bounce [animation-duration:6s]" />
        </div>

        <div className="relative z-10 w-full h-full">
          {hospitals.map((h) => {
            const isRed = h.status === 'RED';

            return (
              <motion.div
                key={h.id}
                whileHover={{ scale: 1.1, y: -5 }}
                onClick={() => setSelectedBuilding(h)}
                className="absolute cursor-pointer group"
                style={{ left: `${h.coords.x}%`, top: `${h.coords.y}%` }}
              >
                <div className={clsx('p-3 rounded-2xl border backdrop-blur-md transition-all shadow-2xl flex items-center gap-3', statusColor[h.status])}>
                  <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                    <Building2 className="w-6 h-6 text-teal-400" />
                  </div>
                  <div>
                    <div className="font-bold text-xs font-sans text-slate-100">{h.name.split(' ')[0]} {h.name.split(' ')[1]}</div>
                    <div className="text-[10px] font-mono opacity-80">Health Index: {h.healthScore}</div>
                  </div>
                </div>

                <div className={clsx('absolute -inset-1 rounded-2xl pointer-events-none opacity-40 animate-ping', isRed ? 'bg-rose-500' : 'bg-teal-400')} />
              </motion.div>
            );
          })}
        </div>

        <div className="relative z-10 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Green = Healthy</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Yellow = Attention Needed</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Red = Critical</span>
          </div>

          <span className="text-teal-400 font-bold">CLICK BUILDING TO ZOOM INSIDE 3D TWIN</span>
        </div>
      </div>

      <AnimatePresence>
        {selectedBuilding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md font-sans">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-3xl border border-teal-500/40 bg-slate-900 light:bg-white p-6 shadow-2xl space-y-5 relative overflow-hidden"
            >
              <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono font-bold text-teal-400 uppercase">
                    3D DIGITAL TWIN INSPECTOR • {selectedBuilding.id}
                  </span>
                  <h2 className="text-xl font-bold text-slate-100 light:text-slate-900 mt-0.5">
                    {selectedBuilding.name}
                  </h2>
                  <p className="text-xs text-slate-400">{selectedBuilding.district} • Health Index: {selectedBuilding.healthScore}/100</p>
                </div>

                <button
                  onClick={() => setSelectedBuilding(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-800 border border-slate-700 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 space-y-1">
                  <span className="text-[9px] text-slate-400 uppercase flex items-center gap-1">
                    <Bed className="w-3.5 h-3.5 text-teal-400" /> Bed Load
                  </span>
                  <span className="font-bold text-slate-100 text-sm">{selectedBuilding.bedOccupancy.split(' ')[0]}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 space-y-1">
                  <span className="text-[9px] text-slate-400 uppercase flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-emerald-400" /> Doctors
                  </span>
                  <span className="font-bold text-emerald-400 text-sm">{selectedBuilding.doctorsActive} On Duty</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 space-y-1">
                  <span className="text-[9px] text-slate-400 uppercase flex items-center gap-1">
                    <Pill className="w-3.5 h-3.5 text-cyan-400" /> LMO Reserve
                  </span>
                  <span className={`font-bold text-sm ${selectedBuilding.o2SupplyDays < 3 ? 'text-rose-400' : 'text-cyan-400'}`}>
                    {selectedBuilding.o2SupplyDays} Days
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 space-y-1">
                  <span className="text-[9px] text-slate-400 uppercase flex items-center gap-1">
                    <TestTube2 className="w-3.5 h-3.5 text-purple-400" /> WGS Sequencers
                  </span>
                  <span className="font-bold text-purple-400 text-sm">8 Online</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs font-sans">
                <div className="text-[10px] font-mono font-bold text-teal-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI PREDICTIVE ALERT & DIRECTIVE
                </div>
                <p className="text-slate-200 light:text-slate-800 leading-relaxed font-semibold">
                  {selectedBuilding.aiAlert}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    addNotification(`DIRECTIVE EXECUTED: Emergency LMO Airlift initiated for ${selectedBuilding.name}.`);
                    setSelectedBuilding(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>EXECUTE EMERGENCY RE-ALLOCATION</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
