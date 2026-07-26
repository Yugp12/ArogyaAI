import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCommand } from '../context/CommandContext';
import { mockPatients } from '../data/mockData';
import type { PatientTriage } from '../types';
import { NewPatientModal } from '../components/patients/NewPatientModal';
import { PatientDetailDrawer } from '../components/patients/PatientDetailDrawer';
import {
  Users,
  UserPlus,
  Search,
  Brain,
  ChevronRight,
  Heart,
  Wind
} from 'lucide-react';
import { clsx } from 'clsx';

export const PatientManagementPage: React.FC = () => {
  const { setActiveModal } = useCommand();

  const [searchQuery, setSearchQuery] = useState('');
  const [triageFilter, setTriageFilter] = useState('ALL');
  const [drawerPatient, setDrawerPatient] = useState<PatientTriage | null>(null);

  const filteredPatients = mockPatients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hospital.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = triageFilter === 'ALL' || p.triageLevel === triageFilter;

    return matchesSearch && matchesFilter;
  });

  const levelBadge = {
    CRITICAL: 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse',
    HIGH: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    MODERATE: 'bg-sky-500/20 text-sky-400 border-sky-500/40',
    STABLE: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 font-sans"
    >
      <div className="p-5 rounded-3xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 light:text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-400" />
            National Patient Electronic Health Record (EHR) & Triage Command
          </h1>
          <p className="text-xs text-slate-400 light:text-slate-500 mt-1">
            ABHA Digital Health Stack integration, predictive ICU queue allocation & automated clinical pathways
          </p>
        </div>

        <button
          onClick={() => setActiveModal('newPatient')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer font-mono shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register New Patient</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-4 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Avg AI Triage Time</span>
          <div className="text-2xl font-black text-teal-400">12 Mins</div>
          <span className="text-[10px] text-emerald-400 block">-45% vs traditional intake</span>
        </div>

        <div className="p-4 rounded-2xl border border-rose-500/30 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Critical ICU Queue</span>
          <div className="text-2xl font-black text-rose-400">5 Patients</div>
          <span className="text-[10px] text-rose-400 block">Immediate Intubation Required</span>
        </div>

        <div className="p-4 rounded-2xl border border-amber-500/30 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Predicted ICU Bed Stress</span>
          <div className="text-2xl font-black text-amber-400">84% Capacity</div>
          <span className="text-[10px] text-amber-400 block">350 Beds Free</span>
        </div>

        <div className="p-4 rounded-2xl border border-emerald-500/30 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">ABHA EHR Sync Rate</span>
          <div className="text-2xl font-black text-emerald-400">99.8%</div>
          <span className="text-[10px] text-emerald-400 block">Verified National Stack</span>
        </div>
      </div>

      <div className="p-4 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Patient Name, ABHA ID, Hospital, or Diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-950/80 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-100 light:text-slate-900 placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-slate-400">Filter Triage:</span>
          <select
            value={triageFilter}
            onChange={(e) => setTriageFilter(e.target.value)}
            className="px-3 py-2 bg-slate-950/80 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-200 light:text-slate-800 font-bold focus:outline-none"
          >
            <option value="ALL">All Severity Levels</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MODERATE">Moderate</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ y: -4, scale: 1.01 }}
            className="rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-5 backdrop-blur-md shadow-xl space-y-4 cursor-pointer group"
            onClick={() => setDrawerPatient(p)}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-teal-400 uppercase">
                  ABHA ID: {p.patientId}
                </span>
                <h3 className="text-base font-bold text-slate-100 light:text-slate-900 mt-0.5 group-hover:text-teal-400 transition-colors">
                  {p.name}
                </h3>
                <p className="text-xs text-slate-400">{p.age} y/o {p.gender} • {p.hospital}</p>
              </div>

              <span className={clsx('px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg border uppercase', levelBadge[p.triageLevel])}>
                {p.triageLevel}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 font-mono text-center">
              <div className="p-2 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800">
                <span className="text-[9px] text-slate-400 block uppercase">Risk Score</span>
                <span className="text-base font-bold text-rose-400">{p.riskScore}</span>
              </div>

              <div className="p-2 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800">
                <span className="text-[9px] text-slate-400 block uppercase flex items-center justify-center gap-1">
                  <Wind className="w-3 h-3 text-cyan-400" /> SpO2
                </span>
                <span className={`text-base font-bold ${p.spO2 < 90 ? 'text-rose-400' : 'text-emerald-400'}`}>{p.spO2}%</span>
              </div>

              <div className="p-2 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800">
                <span className="text-[9px] text-slate-400 block uppercase flex items-center justify-center gap-1">
                  <Heart className="w-3 h-3 text-rose-500" /> HR
                </span>
                <span className="text-base font-bold text-slate-200">{p.heartRate} bpm</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 space-y-1 text-xs">
              <div className="text-[10px] font-mono text-teal-400 font-bold flex items-center gap-1">
                <Brain className="w-3.5 h-3.5" /> AI DIAGNOSIS MATCH ({p.scanConfidence}%)
              </div>
              <p className="text-slate-200 light:text-slate-800 font-semibold line-clamp-2">{p.diagnosis}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs font-mono text-slate-400">
              <span>Updated: {p.timestamp}</span>
              <span className="text-teal-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View Medical History <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <NewPatientModal />

      <PatientDetailDrawer
        patient={drawerPatient}
        onClose={() => setDrawerPatient(null)}
      />
    </motion.div>
  );
};
