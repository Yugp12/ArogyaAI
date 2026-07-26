import React, { useState } from 'react';
import { mockPatients } from '../../data/mockData';
import { useCommand } from '../../context/CommandContext';
import {
  Users,
  Search,
  ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';

export const PatientRiskTable: React.FC = () => {
  const { selectedPatient, setSelectedPatient, setActiveTab } = useCommand();
  const [searchQuery, setSearchQuery] = useState('');
  const [triageFilter, setTriageFilter] = useState<string>('ALL');

  const filteredPatients = mockPatients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());

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
    <div className="rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-5 backdrop-blur-md shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-400" />
            National AI Patient Triage Registry
          </h3>
          <p className="text-xs text-slate-400 light:text-slate-500">
            Real-time severity classification and ICU allocation priority queue
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search patient, hospital or diagnosis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950/60 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-200 light:text-slate-800 focus:outline-none focus:border-teal-500"
            />
          </div>

          <select
            value={triageFilter}
            onChange={(e) => setTriageFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-950/60 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-200 light:text-slate-800 font-semibold focus:outline-none"
          >
            <option value="ALL">All Levels</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MODERATE">Moderate</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 light:border-slate-200 text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
              <th className="py-3 px-3">Patient & ID</th>
              <th className="py-3 px-3">Risk Score</th>
              <th className="py-3 px-3">Triage Level</th>
              <th className="py-3 px-3">Vitals (SpO2 / HR)</th>
              <th className="py-3 px-3">Diagnosis</th>
              <th className="py-3 px-3">Hospital</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 light:divide-slate-200 text-xs">
            {filteredPatients.map((p) => {
              const isSelected = selectedPatient?.id === p.id;

              return (
                <tr
                  key={p.id}
                  onClick={() => setSelectedPatient(p)}
                  className={clsx(
                    'hover:bg-slate-800/40 light:hover:bg-slate-50 transition-colors cursor-pointer',
                    isSelected && 'bg-teal-500/10 light:bg-teal-50/80'
                  )}
                >
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-100 light:text-slate-900">{p.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{p.patientId} • {p.age}y/{p.gender}</div>
                  </td>

                  <td className="py-3.5 px-3 font-mono font-extrabold">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-rose-400">
                        {p.riskScore}
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className={clsx('px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase font-mono', levelBadge[p.triageLevel])}>
                      {p.triageLevel}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 font-mono">
                    <div className="text-slate-200 light:text-slate-800 font-bold">
                      SpO2: <span className={p.spO2 < 90 ? 'text-rose-400' : 'text-emerald-400'}>{p.spO2}%</span>
                    </div>
                    <div className="text-[10px] text-slate-400">HR: {p.heartRate} bpm</div>
                  </td>

                  <td className="py-3.5 px-3 max-w-xs truncate text-slate-300 light:text-slate-700">
                    {p.diagnosis}
                  </td>

                  <td className="py-3.5 px-3 text-slate-400 font-medium">
                    {p.hospital}
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPatient(p);
                        setActiveTab('triage');
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-teal-500/20 text-slate-300 hover:text-teal-300 border border-slate-700 transition-colors"
                      title="Open Radiology CT Scan"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
