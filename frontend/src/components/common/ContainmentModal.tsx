import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommand } from '../../context/CommandContext';
import {
  ShieldAlert,
  AlertTriangle,
  X,
  CheckSquare,
  Square,
  Lock
} from 'lucide-react';
import { clsx } from 'clsx';

export const ContainmentModal: React.FC = () => {
  const { activeModal, setActiveModal, emergencyLockdown, setEmergencyLockdown, addNotification } = useCommand();

  const [steps, setSteps] = useState([
    { id: 1, label: 'Activate Bio-Safety Level 4 Containment Perimeter', done: true },
    { id: 2, label: 'Enforce Regional Air Space & Rail Vector Restriction', done: false },
    { id: 3, label: 'Re-route Non-Critical Ambulances to Tier-2 Base Hospitals', done: false },
    { id: 4, label: 'Authorize Automated Oxygen Reserve Airlift Dispatch', done: false }
  ]);

  if (activeModal !== 'protocol') return null;

  const toggleStep = (id: number) => {
    setSteps(prev => prev.map(s => (s.id === id ? { ...s, done: !s.done } : s)));
  };

  const handleToggleLockdown = () => {
    const newState = !emergencyLockdown;
    setEmergencyLockdown(newState);
    if (newState) {
      addNotification('EMERGENCY: Containment Protocol Phase IV officially ACTIVATED across National Health Grid.');
    } else {
      addNotification('NOTICE: Emergency Containment Protocol DE-ACTIVATED. System returning to Nominal.');
    }
    setActiveModal(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg rounded-3xl border border-rose-500/50 bg-slate-900 light:bg-white p-6 shadow-[0_0_50px_rgba(244,63,94,0.3)] space-y-5"
        >
          <div className="flex items-center justify-between pb-3 border-b border-rose-500/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-rose-600 text-white shadow-lg shadow-rose-600/40 animate-pulse">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-100 light:text-slate-900 uppercase tracking-wider font-mono">
                  National Containment Protocol
                </h3>
                <p className="text-xs text-rose-400 font-mono">
                  AUTHORIZATION LEVEL 5 • HIGH DISASTER COMMAND
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

          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200 leading-relaxed font-sans space-y-1">
            <div className="flex items-center gap-2 font-bold text-rose-400">
              <AlertTriangle className="w-4 h-4" /> WARNING: EPIDEMIC CONTAINMENT TRIGGER
            </div>
            <p>
              Executing emergency protocol will re-route regional ambulance dispatches, lock down affected district transport corridors, and alert WHO Global Incident Room.
            </p>
          </div>

          <div className="space-y-2 font-sans">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">
              Execution Protocol Checklist:
            </span>

            {steps.map((step) => (
              <div
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 light:border-slate-300 flex items-center gap-3 cursor-pointer hover:border-slate-700 transition-colors"
              >
                {step.done ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span className={clsx('text-xs font-medium', step.done ? 'text-slate-200 light:text-slate-900 font-semibold' : 'text-slate-400')}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={handleToggleLockdown}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase font-mono tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${
              emergencyLockdown
                ? 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700'
                : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-rose-600/30'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>
              {emergencyLockdown ? 'DE-ACTIVATE CONTAINMENT LOCKDOWN' : 'EXECUTE EMERGENCY CONTAINMENT LOCKDOWN'}
            </span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
