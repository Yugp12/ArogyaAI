import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export const ThemeWaveRipple: React.FC = () => {
  const { isWaveActive, environment } = useTheme();

  const envWaveColors = {
    day: 'from-blue-500/40 via-sky-400/30 to-teal-300/10',
    night: 'from-blue-600/50 via-indigo-600/40 to-slate-900/20',
    intelligence: 'from-cyan-400/60 via-blue-500/40 to-teal-400/20',
    emergency: 'from-rose-600/60 via-amber-500/40 to-red-400/20',
    executive: 'from-emerald-500/50 via-teal-400/40 to-amber-400/20',
    mission: 'from-indigo-500/50 via-cyan-400/40 to-purple-600/20'
  };

  return (
    <AnimatePresence>
      {isWaveActive && (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden flex items-start justify-end p-6">
          <motion.div
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 35, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`w-16 h-16 rounded-full bg-gradient-to-r ${envWaveColors[environment]} backdrop-blur-2xl shadow-[0_0_100px_rgba(56,189,248,0.8)] border border-cyan-400/60`}
            style={{ transformOrigin: 'top right' }}
          />
        </div>
      )}
    </AnimatePresence>
  );
};
