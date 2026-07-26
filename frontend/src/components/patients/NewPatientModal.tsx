import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommand } from '../../context/CommandContext';
import {
  UserPlus,
  X,
  CheckCircle2,
  Brain,
  Heart,
  Wind,
  Activity
} from 'lucide-react';

export const NewPatientModal: React.FC = () => {
  const { activeModal, setActiveModal, addNotification } = useCommand();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'M' | 'F' | 'Other'>('M');
  const [abhaId, setAbhaId] = useState('');
  const [spO2, setSpO2] = useState('92');
  const [heartRate, setHeartRate] = useState('110');
  const [symptoms, setSymptoms] = useState('High Fever, Acute Respiratory Strain');
  const [submitting, setSubmitting] = useState(false);

  if (activeModal !== 'newPatient') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      addNotification(`REGISTERED: Patient ${name} (ABHA: ${abhaId || 'IND-2026-NEW'}) added to National AI Triage System.`);
      setActiveModal(null);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl rounded-3xl border border-slate-800 light:border-slate-200 bg-slate-900 light:bg-white p-6 shadow-2xl space-y-5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100 light:text-slate-900">
                  National Electronic Health Record (EHR) Registration
                </h3>
                <p className="text-xs text-slate-400">
                  ABHA Health ID Sync & Automated AI Triage Severity Calculator
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

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-300 light:text-slate-700 font-semibold">Full Patient Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 light:text-slate-700 font-semibold">ABHA / Aadhaar Health ID</label>
                <input
                  type="text"
                  placeholder="e.g. 91-4820-9941-0021"
                  value={abhaId}
                  onChange={(e) => setAbhaId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 light:text-slate-700 font-semibold">Age (Years)</label>
                <input
                  type="number"
                  required
                  placeholder="45"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 light:text-slate-700 font-semibold">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-500"
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 light:text-slate-700 font-semibold flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-cyan-400" /> Initial SpO2 (%)
                </label>
                <input
                  type="number"
                  required
                  value={spO2}
                  onChange={(e) => setSpO2(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 light:text-slate-700 font-semibold flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500" /> Initial Heart Rate (BPM)
                </label>
                <input
                  type="number"
                  required
                  value={heartRate}
                  onChange={(e) => setHeartRate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-500 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 light:text-slate-700 font-semibold">Primary Presenting Symptoms</label>
              <textarea
                rows={2}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe presenting symptoms and clinical history..."
                className="w-full px-3.5 py-2.5 bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-between text-xs text-teal-300 font-mono">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-teal-400" />
                <span>FORECASTED AI TRIAGE RISK:</span>
              </div>
              <span className="font-bold text-rose-400 text-sm">CRITICAL HIGH (88/100)</span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-xs uppercase font-mono tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
            >
              {submitting ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  <span>REGISTERING PATIENT TO ABHA EHR...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>COMPLETE REGISTRATION & INITIALIZE TRIAGE</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
