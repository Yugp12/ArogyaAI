import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommand } from '../../context/CommandContext';
import { Activity, Radio, Cpu, Sparkles } from 'lucide-react';

export const CinematicIntro: React.FC = () => {
  const { showIntro, setShowIntro } = useCommand();

  const [messageIndex, setMessageIndex] = useState(0);

  const loadingMessages = [
    'Connecting Hospitals...',
    'Loading AI Models...',
    'Predicting Resource Demand...',
    'Monitoring Disease Activity...',
    'Synchronizing District Health Network...',
    'System Ready.'
  ];

  useEffect(() => {
    if (!showIntro) return;

    const interval = setInterval(() => {
      setMessageIndex(prev => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setShowIntro(false);
          }, 800);
          return prev;
        }
      });
    }, 650);

    return () => clearInterval(interval);
  }, [showIntro]);

  if (!showIntro) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center overflow-hidden font-sans text-slate-100 selection:bg-teal-500"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <motion.div
          initial={{ scale: 0.1, opacity: 0.2 }}
          animate={{ scale: [0.1, 2.5, 4], opacity: [0.3, 0.7, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut' }}
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-teal-500/30 via-cyan-500/20 to-blue-600/30 blur-3xl pointer-events-none"
        />

        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          <circle cx="20%" cy="30%" r="3" fill="#2dd4bf" className="animate-ping" />
          <circle cx="80%" cy="25%" r="3" fill="#2dd4bf" className="animate-ping [animation-delay:0.3s]" />
          <circle cx="50%" cy="70%" r="4" fill="#0ed7b5" className="animate-ping [animation-delay:0.6s]" />
          <circle cx="35%" cy="60%" r="3" fill="#2dd4bf" className="animate-ping [animation-delay:0.9s]" />
          <circle cx="65%" cy="50%" r="4" fill="#0ed7b5" className="animate-ping [animation-delay:1.2s]" />

          <line x1="20%" y1="30%" x2="50%" y2="70%" stroke="#2dd4bf" strokeWidth="0.8" strokeDasharray="4,4" />
          <line x1="80%" y1="25%" x2="65%" y2="50%" stroke="#2dd4bf" strokeWidth="0.8" strokeDasharray="4,4" />
          <line x1="50%" y1="70%" x2="65%" y2="50%" stroke="#0ed7b5" strokeWidth="1" />
        </svg>

        <div className="relative z-10 text-center space-y-6 max-w-lg px-6">
          <div className="flex items-center justify-center gap-3">
            <div className="p-4 rounded-3xl bg-slate-900/90 border border-teal-500/40 shadow-[0_0_50px_rgba(45,212,191,0.3)] glow-teal">
              <Activity className="w-10 h-10 text-teal-400 animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-bold uppercase tracking-widest"
            >
              <Cpu className="w-3.5 h-3.5" /> YEAR 2035 AUTONOMOUS HEALTHCARE OS
            </motion.div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-teal-200 to-cyan-400">
              ArogyaAI OS
            </h1>

            <p className="text-xs sm:text-sm font-mono text-teal-300 font-bold uppercase tracking-wider">
              "The AI That Runs Healthcare Before Problems Begin."
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-center gap-3 shadow-xl">
            <Radio className="w-4 h-4 text-teal-400 animate-pulse" />
            <span>AI Voice: "Initializing ArogyaAI Operating System..."</span>
          </div>

          <div className="h-10 flex items-center justify-center font-mono text-xs text-teal-400 font-bold">
            <AnimatePresence mode="wait">
              <motion.div
                key={messageIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-teal-400 animate-spin-slow" />
                <span>{loadingMessages[messageIndex]}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800 p-0.5">
            <motion.div
              className="bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-400 h-full rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((messageIndex + 1) / loadingMessages.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
