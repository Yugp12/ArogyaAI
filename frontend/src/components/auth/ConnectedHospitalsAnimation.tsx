import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Activity } from 'lucide-react';

export const ConnectedHospitalsAnimation: React.FC = () => {
  const nodes = [
    { id: 1, name: 'AIIMS Delhi', status: 'Active Tele-ICU', angle: 0 },
    { id: 2, name: 'NIMHANS', status: 'Vector Sync', angle: 72 },
    { id: 3, name: 'PGIMER', status: 'ICU Grid 94%', angle: 144 },
    { id: 4, name: 'Manipal Mumbai', status: 'Dengue Radar', angle: 216 },
    { id: 5, name: 'Kozhikode Node', status: 'BSL-4 Alert', angle: 288 },
  ];

  return (
    <div className="relative w-full max-w-md h-72 rounded-2xl bg-slate-900/60 light:bg-white/40 border border-slate-800/80 light:border-slate-200/80 backdrop-blur-xl p-4 flex items-center justify-center overflow-hidden shadow-2xl">
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-20 w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 via-emerald-500 to-cyan-500 p-0.5 shadow-[0_0_30px_rgba(20,184,166,0.6)]"
      >
        <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center text-teal-300">
          <Activity className="w-6 h-6 animate-pulse" />
          <span className="text-[8px] font-mono font-bold mt-0.5">CORE AI</span>
        </div>
      </motion.div>

      {nodes.map((node) => {
        const rad = (node.angle * Math.PI) / 180;
        const radius = 105;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;

        return (
          <React.Fragment key={node.id}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <line
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${x}px)`}
                y2={`calc(50% + ${y}px)`}
                stroke="#14b8a6"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-40"
              />
            </svg>

            <motion.div
              style={{
                transform: `translate(${x}px, ${y}px)`
              }}
              whileHover={{ scale: 1.15 }}
              className="absolute z-20 flex flex-col items-center"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-900 light:bg-white border border-teal-500/40 flex items-center justify-center text-teal-400 shadow-lg">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-mono font-bold text-slate-200 light:text-slate-800 mt-1 whitespace-nowrap bg-slate-950/80 px-1.5 py-0.5 rounded border border-slate-800">
                {node.name}
              </span>
            </motion.div>
          </React.Fragment>
        );
      })}

      <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 via-blue-600/5 to-transparent pointer-events-none" />
    </div>
  );
};
