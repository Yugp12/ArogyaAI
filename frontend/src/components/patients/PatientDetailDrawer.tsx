import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PatientTriage } from '../../types';
import {
  X,
  FileText,
  Clock,
  Pill,
  TestTube2,
  Send,
  Printer
} from 'lucide-react';

interface PatientDetailDrawerProps {
  patient: PatientTriage | null;
  onClose: () => void;
}

export const PatientDetailDrawer: React.FC<PatientDetailDrawerProps> = ({ patient, onClose }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'rx' | 'labs' | 'discharge'>('timeline');
  const [reminderSent, setReminderSent] = useState(false);

  if (!patient) return null;

  const timelineEvents = [
    { time: '10:22:01', title: 'Tele-ICU Intubation Protocol', desc: 'High-Flow Nasal Cannula (HFNC) set to 60L/min @ 98% FiO2' },
    { time: '09:42:15', title: 'Radiology HRCT Chest Scan', desc: 'Ground Glass Opacities detected across bilateral lower lobes (Confidence 98.4%)' },
    { time: '09:15:00', title: 'Emergency Triage Admission', desc: 'Admitted to AIIMS Delhi Emergency Command Node via ALS Ambulance KA-01' }
  ];

  const prescriptions = [
    { drug: 'Oseltamivir Phosphate', dose: '75mg BD', duration: '7 Days', status: 'ACTIVE' },
    { drug: 'Dexamethasone Injectable', dose: '8mg IV OD', duration: '5 Days', status: 'ACTIVE' },
    { drug: 'Liquid Medical Oxygenation', dose: 'Continuous', duration: 'As Required', status: 'CRITICAL' }
  ];

  const labs = [
    { test: 'High-Sensitivity CRP', result: '142 mg/L', ref: '< 5 mg/L', status: 'HIGH' },
    { test: 'Platelet Count', result: '42,000 /uL', ref: '150,000 - 450,000', status: 'CRITICAL' },
    { test: 'Genomic Lineage Match', result: 'DEN-5.Δ4 Hyper-Viremic', ref: 'WGS Sequenced', status: 'MATCHED' }
  ];

  const handleSendReminder = () => {
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md font-sans">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-2xl bg-slate-900 light:bg-white border-l border-slate-800 light:border-slate-200 h-full flex flex-col p-6 shadow-2xl overflow-y-auto space-y-6"
        >
          <div className="flex items-start justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono font-bold text-teal-400 uppercase">
                PATIENT RECORD • {patient.patientId}
              </span>
              <h2 className="text-xl font-bold text-slate-100 light:text-slate-900 mt-0.5">
                {patient.name} ({patient.age}y/o {patient.gender})
              </h2>
              <p className="text-xs text-slate-400">{patient.hospital} • Risk Score: {patient.riskScore}/100</p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-800 border border-slate-700 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 font-mono text-xs">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${activeTab === 'timeline' ? 'bg-teal-500 text-white shadow' : 'text-slate-400'}`}
            >
              Timeline
            </button>
            <button
              onClick={() => setActiveTab('rx')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${activeTab === 'rx' ? 'bg-teal-500 text-white shadow' : 'text-slate-400'}`}
            >
              Prescriptions
            </button>
            <button
              onClick={() => setActiveTab('labs')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${activeTab === 'labs' ? 'bg-teal-500 text-white shadow' : 'text-slate-400'}`}
            >
              Lab Pathology
            </button>
            <button
              onClick={() => setActiveTab('discharge')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${activeTab === 'discharge' ? 'bg-teal-500 text-white shadow' : 'text-slate-400'}`}
            >
              Discharge & Follow-up
            </button>
          </div>

          {activeTab === 'timeline' && (
            <div className="space-y-4 font-sans text-xs">
              <h3 className="font-bold text-slate-200 uppercase font-mono flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" /> Care Pathway Event Timeline
              </h3>
              <div className="space-y-3 relative border-l-2 border-slate-800 pl-4 ml-2">
                {timelineEvents.map((ev, i) => (
                  <div key={i} className="relative space-y-1">
                    <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-teal-400 ring-4 ring-slate-900" />
                    <div className="font-mono text-[10px] text-teal-400 font-bold">{ev.time}</div>
                    <div className="font-bold text-slate-100">{ev.title}</div>
                    <p className="text-slate-400 leading-relaxed">{ev.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rx' && (
            <div className="space-y-4 font-sans text-xs">
              <h3 className="font-bold text-slate-200 uppercase font-mono flex items-center gap-2">
                <Pill className="w-4 h-4 text-teal-400" /> Digital Active Prescriptions
              </h3>
              <div className="space-y-2 font-mono">
                {prescriptions.map((rx, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-100 font-sans">{rx.drug}</div>
                      <div className="text-[10px] text-slate-400">Dose: {rx.dose} • {rx.duration}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      {rx.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'labs' && (
            <div className="space-y-4 font-sans text-xs">
              <h3 className="font-bold text-slate-200 uppercase font-mono flex items-center gap-2">
                <TestTube2 className="w-4 h-4 text-teal-400" /> Pathology & Diagnostic Laboratory Reports
              </h3>
              <div className="space-y-2 font-mono">
                {labs.map((lb, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-100 font-sans">{lb.test}</div>
                      <div className="text-[10px] text-slate-400">Ref: {lb.ref}</div>
                    </div>
                    <span className="font-bold text-rose-400 text-sm">{lb.result}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'discharge' && (
            <div className="space-y-4 font-sans text-xs">
              <h3 className="font-bold text-slate-200 uppercase font-mono flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-400" /> Discharge Summary & Automated Follow-Up
              </h3>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="font-bold text-slate-200">Discharge Protocol Readiness</div>
                <p className="text-slate-400 leading-relaxed">
                  Patient requires 48 hours of SpO2 stability (&gt; 95% on room air) prior to discharge authorization. Follow-up consultation scheduled with Tele-ICU Specialist in 7 days.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleSendReminder}
                  className="flex-1 py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{reminderSent ? 'SMS/WHATSAPP REMINDER DISPATCHED!' : 'DISPATCH AUTOMATED FOLLOW-UP REMINDER'}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 font-bold flex items-center justify-center gap-2 cursor-pointer font-mono"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print EHR</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
