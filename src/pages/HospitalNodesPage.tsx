import React from 'react';
import { motion } from 'framer-motion';
import { mockHospitals } from '../data/mockData';
import { LiveEcgMonitor } from '../components/telemetry/LiveEcgMonitor';
import { Building2, Activity } from 'lucide-react';
import { clsx } from 'clsx';

export const HospitalNodesPage: React.FC = () => {
  const statusColor = {
    OPERATIONAL: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    HIGH_DEMAND: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    CRITICAL_SHORTAGE: 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="p-5 rounded-3xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 light:text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-teal-400" />
            Apex Hospital Telemetry Nodes & Resource Grid
          </h1>
          <p className="text-xs text-slate-400 light:text-slate-500 mt-1">
            Real-time oxygen pressure telemetry, ICU bed availability index & ventilator allocation
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-teal-400 bg-teal-500/10 border border-teal-500/30 px-3 py-1.5 rounded-xl">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>CONNECTED APEX INSTITUTES: 5 NODES</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockHospitals.map((hosp) => (
          <motion.div
            key={hosp.id}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-5 backdrop-blur-md shadow-xl space-y-4 font-sans"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-teal-400 uppercase">
                  NODE ID: {hosp.id}
                </span>
                <h3 className="text-base font-bold text-slate-100 light:text-slate-900 mt-0.5">
                  {hosp.name}
                </h3>
                <p className="text-xs text-slate-400">{hosp.city}, {hosp.state}</p>
              </div>

              <span className={clsx('px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg border uppercase', statusColor[hosp.status])}>
                {hosp.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Total Beds</span>
                <span className="text-base font-bold text-slate-200 light:text-slate-800">{hosp.totalBeds}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">ICU Beds Avail.</span>
                <span className={`text-base font-bold ${hosp.availableIcuBeds < 10 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {hosp.availableIcuBeds} Beds
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">O2 Reserve</span>
                <span className="text-base font-bold text-teal-400">{hosp.oxygenReservesPct}%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Ventilators Active</span>
                <span className="text-base font-bold text-amber-400">{hosp.ventilatorsActive}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <LiveEcgMonitor
        patientName="Multi-Hospital Lead Telemetry Core"
        heartRate={128}
        spO2={82}
        bp="165/102"
      />
    </motion.div>
  );
};
