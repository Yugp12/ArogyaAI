import React, { useState } from 'react';
import { mockFleet } from '../../data/mockData';
import type { AmbulanceFleet } from '../../types';
import { LiveEcgMonitor } from '../telemetry/LiveEcgMonitor';
import {
  Ambulance,
  Radio,
  Video
} from 'lucide-react';
import { clsx } from 'clsx';

export const FleetTracker: React.FC = () => {
  const [selectedFleet, setSelectedFleet] = useState<AmbulanceFleet>(mockFleet[0]);

  const statusBadge = {
    DISPATCHED: 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse',
    EN_ROUTE: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    STANDBY: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    MAINTENANCE: 'bg-slate-800 text-slate-400 border-slate-700'
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/70 light:bg-white backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
            <Ambulance className="w-5 h-5 text-teal-400" />
            Tele-ICU Logistics & Emergency Ambulance Dispatch Command
          </h2>
          <p className="text-xs text-slate-400 light:text-slate-500 mt-0.5">
            Real-time GPS fleet telemetry, Air-Ambulance coordination & live Tele-ICU video connectivity
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-teal-400 bg-teal-500/10 border border-teal-500/30 px-3 py-1.5 rounded-xl">
          <Radio className="w-4 h-4 animate-pulse" />
          <span>ACTIVE FLEET: 4 Units • DISPATCH LATENCY: 800ms</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-5 backdrop-blur-md shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
              <Ambulance className="w-4 h-4 text-teal-400" />
              Active Mobile Emergency Units
            </h3>
            <span className="text-[10px] font-mono text-slate-400 uppercase">GPS Sync: Live</span>
          </div>

          <div className="space-y-3">
            {mockFleet.map((fleet) => {
              const isSelected = selectedFleet.id === fleet.id;

              return (
                <div
                  key={fleet.id}
                  onClick={() => setSelectedFleet(fleet)}
                  className={clsx(
                    'p-3.5 rounded-xl border transition-all cursor-pointer space-y-2',
                    isSelected
                      ? 'bg-teal-500/10 light:bg-teal-50 border-teal-500/40 shadow-lg'
                      : 'bg-slate-950/60 light:bg-slate-50 border-slate-800 light:border-slate-200 hover:border-slate-700'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-100 light:text-slate-900">
                        {fleet.code}
                      </span>
                      <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-slate-800 text-teal-300 font-mono">
                        {fleet.type}
                      </span>
                    </div>

                    <span className={clsx('px-2 py-0.5 text-[9px] font-bold rounded-full border font-mono uppercase', statusBadge[fleet.status])}>
                      {fleet.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-300 light:text-slate-700 font-sans">
                    <span>Driver: {fleet.driver}</span>
                    <span className="font-mono text-teal-400 font-bold">ETA: {fleet.etaMinutes} mins</span>
                  </div>

                  <p className="text-[11px] text-slate-400 truncate">
                    Condition: {fleet.patientCondition}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-950 light:bg-slate-900 p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold">
                <Video className="w-4 h-4 text-rose-500 animate-pulse" />
                TELE-ICU HIGH-DEFINITION VIDEO FEED • UNIT: {selectedFleet.code}
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                1080p 60FPS ENCRYPTED
              </span>
            </div>

            <div className="relative h-64 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 500 300" className="w-full h-full text-slate-800 fill-current opacity-70">
                <rect width="500" height="300" fill="#0f172a" />
                <path d="M50 50 L450 50 L420 250 L80 250 Z" fill="#1e293b" />
                <ellipse cx="250" cy="180" rx="120" ry="25" fill="#334155" />
                <circle cx="160" cy="165" r="18" fill="#475569" />
                <circle cx="340" cy="140" r="22" fill="#0d9488" />
                <rect x="315" y="165" width="50" height="80" rx="10" fill="#0f766e" />
              </svg>

              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md p-2 rounded-lg border border-slate-800 font-mono text-[10px] text-slate-300 space-y-1">
                <div>DESTINATION: {selectedFleet.hospital}</div>
                <div>PATIENT: Critical Encephalopathy</div>
                <div className="text-rose-400 font-bold">AIRWAYS: Intubated</div>
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-rose-950/80 border border-rose-500/40 text-rose-400 font-mono text-[10px] px-2.5 py-1 rounded-md font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                TELE-CONSULT RECORDING
              </div>
            </div>

            <LiveEcgMonitor
              patientName={`${selectedFleet.code} Patient`}
              heartRate={128}
              spO2={82}
              bp="165/102"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
