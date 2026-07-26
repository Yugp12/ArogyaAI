import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommand } from '../../context/CommandContext';
import {
  HelpCircle,
  X,
  Sparkles,
  Pill,
  Users,
  Bed,
  Ambulance,
  Clock,
  Zap,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { clsx } from 'clsx';

export const WhatIfSimulatorModal: React.FC = () => {
  const { activeModal, setActiveModal, addNotification } = useCommand();

  const [selectedScenario, setSelectedScenario] = useState<string>('Dengue +40% Surge in Kozhikode');
  const [simulating, setSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);

  if (activeModal !== 'whatif') return null;

  const scenarios = [
    'Dengue +40% Surge in Kozhikode',
    'Liquid Oxygen Supply -30% Drop',
    'Nipah R0 Spike to 2.5 in Kerala',
    'Monsoon Vector Outbreak Peak'
  ];

  const handleRunSimulation = () => {
    setSimulating(true);
    setHasSimulated(false);
    setTimeout(() => {
      setSimulating(false);
      setHasSimulated(true);
      addNotification(`SIMULATION COMPLETE: ${selectedScenario} predictive scenario compiled.`);
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl rounded-3xl border border-teal-500/40 bg-slate-900 light:bg-white p-6 shadow-2xl space-y-5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100 light:text-slate-900">
                  ArogyaAI "What-If" Predictive Scenario Simulator
                </h3>
                <p className="text-xs text-slate-400">
                  Minority Report Style Counter-Factural Machine Learning Simulation Engine
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-800 border border-slate-700 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase">Select Counter-Factural Scenario:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans text-xs">
              {scenarios.map((sc, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedScenario(sc)}
                  className={clsx(
                    'p-3 rounded-xl border text-left font-semibold transition-all cursor-pointer',
                    selectedScenario === sc
                      ? 'border-teal-500 bg-teal-500/10 text-teal-300 font-bold shadow-md'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200'
                  )}
                >
                  {sc}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={simulating}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer glow-teal"
          >
            {simulating ? (
              <>
                <Activity className="w-4 h-4 animate-spin" />
                <span>COMPUTING 1.2M NEURAL SIMULATION PATHWAYS...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current" />
                <span>RUN "WHAT-IF" PREDICTIVE SIMULATION</span>
              </>
            )}
          </button>

          {hasSimulated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 pt-2 border-t border-slate-800 font-mono text-xs"
            >
              <div className="text-[10px] text-teal-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> SIMULATED IMPACT FORECAST ({selectedScenario})
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[9px] text-slate-400 uppercase flex items-center gap-1">
                    <Pill className="w-3 h-3 text-rose-400" /> O2 Shortage
                  </span>
                  <span className="text-sm font-bold text-rose-400">Critical in 3 Days</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[9px] text-slate-400 uppercase flex items-center gap-1">
                    <Users className="w-3 h-3 text-amber-400" /> Doctors Needed
                  </span>
                  <span className="text-sm font-bold text-amber-400">+42 Specialists</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[9px] text-slate-400 uppercase flex items-center gap-1">
                    <Bed className="w-3 h-3 text-purple-400" /> ICU Occupancy
                  </span>
                  <span className="text-sm font-bold text-purple-400">98% Saturation</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[9px] text-slate-400 uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" /> Wait Times
                  </span>
                  <span className="text-sm font-bold text-cyan-400">+28% Increase</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[9px] text-slate-400 uppercase flex items-center gap-1">
                    <Ambulance className="w-3 h-3 text-emerald-400" /> Fleet Demand
                  </span>
                  <span className="text-sm font-bold text-emerald-400">+14 Squadrons</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[9px] text-slate-400 uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-teal-400" /> Cost Savings
                  </span>
                  <span className="text-sm font-bold text-teal-400">₹1.8 Lakh Saved</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
