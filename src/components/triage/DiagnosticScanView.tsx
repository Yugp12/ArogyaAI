import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCommand } from '../../context/CommandContext';
import { mockPatients } from '../../data/mockData';
import {
  FileScan,
  AlertTriangle,
  Brain,
  Layers,
  Sparkles,
  Zap,
  UserCheck
} from 'lucide-react';
import { clsx } from 'clsx';

export const DiagnosticScanView: React.FC = () => {
  const { selectedPatient, setSelectedPatient } = useCommand();
  const patient = selectedPatient || mockPatients[0];

  const [heatmapActive, setHeatmapActive] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  const triggerReAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 1400);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/70 light:bg-white backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg font-bold text-slate-100 light:text-slate-900">
              ArogyaVision-AI™ Diagnostic Radiography & Triage
            </h2>
          </div>
          <p className="text-xs text-slate-400 light:text-slate-500 mt-0.5">
            Deep Neural CT/X-Ray segmentation, cytokine storm prediction & differential AI pathology score
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 font-mono">Select Patient:</span>
          {mockPatients.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPatient(p)}
              className={clsx(
                'px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all font-mono',
                patient.id === p.id
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 shadow-sm'
                  : 'bg-slate-800/60 light:bg-slate-100 text-slate-400 border-slate-700/50 hover:text-slate-200'
              )}
            >
              {p.name.split(' ')[0]} ({p.triageLevel})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-950 light:bg-slate-900 p-5 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <FileScan className="w-4 h-4 text-teal-400" />
              SCAN REF: CT-CHEST-88219-X • MODALITY: HRCT LUNG 1mm
            </div>
            <button
              onClick={() => setHeatmapActive(!heatmapActive)}
              className={clsx(
                'px-3 py-1 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5',
                heatmapActive
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              )}
            >
              <Layers className="w-3.5 h-3.5" />
              AI Heatmap Overlay: {heatmapActive ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="relative my-4 h-80 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 400 300" className="w-full h-full text-slate-800 fill-current opacity-80">
              <path d="M120 40 C160 30, 240 30, 280 40 C290 80, 310 160, 290 260 C250 270, 150 270, 110 260 C90 160, 110 80, 120 40 Z" fill="#1e293b" />
              <path d="M140 70 Q 200 90 260 70" stroke="#334155" strokeWidth="4" fill="none" />
              <path d="M135 100 Q 200 120 265 100" stroke="#334155" strokeWidth="4" fill="none" />
              <path d="M130 130 Q 200 150 270 130" stroke="#334155" strokeWidth="4" fill="none" />
              <path d="M125 160 Q 200 180 275 160" stroke="#334155" strokeWidth="4" fill="none" />
              <path d="M120 190 Q 200 210 280 190" stroke="#334155" strokeWidth="4" fill="none" />
              <line x1="200" y1="40" x2="200" y2="260" stroke="#475569" strokeWidth="12" />
            </svg>

            {heatmapActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.85 }}
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
              >
                <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-rose-600/60 via-amber-500/40 to-transparent blur-xl animate-pulse" />
                <div className="w-32 h-32 rounded-full bg-rose-500/70 blur-lg" />
              </motion.div>
            )}

            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_15px_#2dd4bf] animate-scanline" />

            <div className="absolute top-16 left-28 w-44 h-36 border-2 border-dashed border-rose-500 rounded-lg p-2 flex items-start justify-between font-mono text-[10px] text-rose-400 bg-rose-950/20 backdrop-blur-sm">
              <span>FOV-A: CYTOKINE INFILTRATE (98.4%)</span>
              <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
            </div>

            {analyzing && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-30 font-mono text-teal-400">
                <Sparkles className="w-8 h-8 animate-spin" />
                <span className="text-sm font-bold">RE-EXECUTING DENSE-NET NEURAL SEGMENTATION...</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <span className="text-xs text-slate-400 font-mono">DICOM Resolution: 2048 x 2048</span>
            <button
              onClick={triggerReAnalysis}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-2"
            >
              <Zap className="w-3.5 h-3.5 text-teal-400" /> Re-Scan Neural Net
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-5 backdrop-blur-md shadow-xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">
                  PATIENT ID: {patient.patientId}
                </span>
                <h3 className="text-lg font-bold text-slate-100 light:text-slate-900">
                  {patient.name} ({patient.age}y/o {patient.gender})
                </h3>
                <p className="text-xs text-teal-400 font-medium">{patient.hospital}</p>
              </div>

              <div className="text-right font-mono">
                <span className="text-2xl font-black text-rose-400">{patient.riskScore}</span>
                <span className="text-[10px] text-slate-400 block uppercase">Risk Score</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 light:border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 light:text-slate-700">AI Pathology Match</span>
                <span className="text-xs font-bold font-mono text-emerald-400">
                  {patient.scanConfidence}% Match
                </span>
              </div>
              <p className="text-sm font-bold text-slate-100 light:text-slate-900">
                {patient.diagnosis}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">SpO2</span>
                <span className={`text-base font-bold ${patient.spO2 < 90 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {patient.spO2}%
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">HR</span>
                <span className="text-base font-bold text-rose-400">{patient.heartRate} bpm</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">NIBP</span>
                <span className="text-base font-bold text-slate-200 light:text-slate-800">{patient.bp}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
                <Sparkles className="w-4 h-4 text-teal-400" />
                RECOMMENDED CLINICAL PATHWAY
              </div>
              <p className="text-xs text-slate-200 light:text-slate-800 leading-relaxed font-sans">
                {patient.aiRecommendation}
              </p>
            </div>

            <button className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer">
              <UserCheck className="w-4 h-4" />
              <span>Approve & Initiate Emergency Tele-ICU Admission</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
