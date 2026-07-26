import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCommand } from '../context/CommandContext';
import {
  ArrowRightLeft,
  Pill,
  Users,
  Bed,
  Ambulance,
  CheckCircle2,
  Sparkles,
  Zap,
  Building2,
  Check,
  Truck,
  ShieldCheck,
  Clock,
  Radio
} from 'lucide-react';
import { clsx } from 'clsx';

interface Recommendation {
  id: string;
  type: 'MEDICINE' | 'DOCTOR' | 'EQUIPMENT' | 'AMBULANCE';
  title: string;
  from: string;
  to: string;
  reason: string;
  confidence: number;
  expectedImpact: string;
  costSavings: string;
  livesAffected: number;
  status: 'PENDING' | 'APPROVED';
}

interface HospitalDepot {
  name: string;
  city: string;
  lmoDays: number;
  icuAvail: number;
  surgeStatus: 'NORMAL' | 'SURGE_WARNING' | 'CRITICAL_SURGE';
}

export const ResourceRedistributionPage: React.FC = () => {
  const { addNotification } = useCommand();

  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: 'REC-01',
      type: 'MEDICINE',
      title: '4,000L Liquid Oxygen Convoy Airlift',
      from: 'Central Stockpile Nagpur',
      to: 'Kozhikode Epidemic Command Node',
      reason: 'Kozhikode Nipah Isolation Unit LMO reserve depleted to 1.8 days capacity. Immediate refill required.',
      confidence: 99.4,
      expectedImpact: 'Prevents 100% Oxygen Stockout in 36 Hours',
      costSavings: '₹1.4 Crore (Logistics Optimization)',
      livesAffected: 840,
      status: 'PENDING'
    },
    {
      id: 'REC-02',
      type: 'DOCTOR',
      title: 'Re-allocate 4 Tele-ICU Pulmonologists',
      from: 'NIMHANS Bengaluru Node',
      to: 'PGIMER Chandigarh Node',
      reason: 'PGIMER Chandigarh ICU bed saturation hit 96%. Pulmonology specialist shift load exceeding 60 hours/week.',
      confidence: 98.8,
      expectedImpact: 'Reduces Doctor Burnout Risk by 45%',
      costSavings: '₹85 Lakh (Staffing Efficiency)',
      livesAffected: 620,
      status: 'PENDING'
    },
    {
      id: 'REC-03',
      type: 'EQUIPMENT',
      title: 'Shift 15 BSL-4 High-Flow Ventilators',
      from: 'Manipal Hospital Mumbai',
      to: 'AIIMS New Delhi Command Hub',
      reason: 'AIIMS Delhi facing acute respiratory influx. Mumbai node currently holds 28% excess ventilator capacity.',
      confidence: 99.1,
      expectedImpact: 'Increases Ventilator Availability by +15 Beds',
      costSavings: '₹2.2 Crore (Procurement Avoidance)',
      livesAffected: 1250,
      status: 'PENDING'
    },
    {
      id: 'REC-04',
      type: 'AMBULANCE',
      title: 'Deploy 6 Air-Ambulance Squadrons',
      from: 'Air Base Hyderabad',
      to: 'Kerala Vector Outbreak Hotspot',
      reason: 'Nipah R0 index spiked to 2.15 in Kozhikode district. Rapid patient airlift protocol active.',
      confidence: 99.6,
      expectedImpact: 'Cuts Critical Transfer Time by 68%',
      costSavings: '₹60 Lakh',
      livesAffected: 450,
      status: 'PENDING'
    }
  ]);

  const [depots] = useState<HospitalDepot[]>([
    { name: 'AIIMS Apex Command', city: 'New Delhi', lmoDays: 9.4, icuAvail: 18, surgeStatus: 'SURGE_WARNING' },
    { name: 'NIMHANS Neuro-Infectious Hub', city: 'Bengaluru', lmoDays: 14.2, icuAvail: 45, surgeStatus: 'NORMAL' },
    { name: 'PGIMER Advanced Care', city: 'Chandigarh', lmoDays: 3.8, icuAvail: 8, surgeStatus: 'CRITICAL_SURGE' },
    { name: 'Manipal Global Health Network', city: 'Mumbai', lmoDays: 11.5, icuAvail: 12, surgeStatus: 'SURGE_WARNING' },
    { name: 'Kozhikode Epidemic Command Node', city: 'Kozhikode', lmoDays: 1.8, icuAvail: 4, surgeStatus: 'CRITICAL_SURGE' }
  ]);

  const handleApprove = (id: string) => {
    setRecommendations(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'APPROVED' } : r))
    );
    const rec = recommendations.find(r => r.id === id);
    if (rec) {
      addNotification(`APPROVED & DISPATCHED: ${rec.title} (${rec.from} ➔ ${rec.to}).`);
    }
  };

  const handleApproveAll = () => {
    setRecommendations(prev => prev.map(r => ({ ...r, status: 'APPROVED' })));
    addNotification('AUTONOMOUS REDISTRIBUTION: All 4 AI transfer recommendations approved & dispatched across national grid.');
  };

  const typeIcon = {
    MEDICINE: Pill,
    DOCTOR: Users,
    EQUIPMENT: Bed,
    AMBULANCE: Ambulance
  };

  const typeColor = {
    MEDICINE: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    DOCTOR: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    EQUIPMENT: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    AMBULANCE: 'text-rose-400 border-rose-500/30 bg-rose-500/10'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 font-sans max-w-[1400px] mx-auto"
    >
      {/* Top Banner */}
      <div className="p-6 rounded-[18px] border border-teal-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 light:from-slate-100 light:to-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[13px] font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              AUTONOMOUS AI REDISTRIBUTION ENGINE • V5.2
            </span>
            <span className="text-[13px] font-mono text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-md border border-slate-700">
              OPTIMIZER: 99.4% SLA COMPLIANCE
            </span>
          </div>

          <h1 className="text-[32px] sm:text-[40px] font-black tracking-tight text-slate-100 light:text-slate-900 leading-none">
            National Autonomous Resource & Hospital Redistribution Command
          </h1>
          <p className="text-[15px] text-slate-400 light:text-slate-600 leading-relaxed">
            Real-time multi-node logistics optimization matching medical oxygen reserves, Tele-ICU specialists, and ventilators with regional demand surges.
          </p>
        </div>

        <button
          onClick={handleApproveAll}
          className="px-5 py-3.5 rounded-[18px] bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-black text-[14px] font-mono uppercase tracking-wider flex items-center gap-2.5 shadow-xl shadow-teal-500/25 transition-all cursor-pointer shrink-0 relative z-10"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>ONE-CLICK APPROVE ALL TRANSFERS</span>
        </button>

        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-teal-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Hero Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-6 rounded-[18px] border border-teal-500/40 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[13px] font-bold text-slate-400 uppercase">Total Lives Protected</span>
          <div className="text-[30px] font-black text-teal-400">+3,160 Patients</div>
          <span className="text-[13px] text-teal-400 block">Across 4 Apex AI Transfers</span>
        </div>

        <div className="p-6 rounded-[18px] border border-emerald-500/40 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[13px] font-bold text-slate-400 uppercase">Financial Cost Savings</span>
          <div className="text-[30px] font-black text-emerald-400">₹5.05 Crore</div>
          <span className="text-[13px] text-emerald-400 block">Procurement & SLA Savings</span>
        </div>

        <div className="p-6 rounded-[18px] border border-purple-500/40 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[13px] font-bold text-slate-400 uppercase">ICU Stress Reduction</span>
          <div className="text-[30px] font-black text-purple-400">-58% Saturation</div>
          <span className="text-[13px] text-slate-400 block">Balancing High Influx Nodes</span>
        </div>

        <div className="p-6 rounded-[18px] border border-cyan-500/40 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[13px] font-bold text-slate-400 uppercase">AI Recommendation Accuracy</span>
          <div className="text-[30px] font-black text-cyan-400">99.2%</div>
          <span className="text-[13px] text-cyan-400 block">Validated by WHO & MoHFW</span>
        </div>
      </div>

      {/* Main Enterprise Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: National Hospital Depot Telemetry Matrix */}
        <div className="lg:col-span-7 space-y-5">
          {/* Hospital Depot Inventory Balances Card */}
          <div className="rounded-[18px] border border-slate-800 bg-slate-950/90 p-6 backdrop-blur-md shadow-2xl space-y-4 font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-teal-400" />
                <h3 className="text-[18px] font-bold text-slate-100">National Hospital Depot & LMO Reserve Telemetry</h3>
              </div>
              <span className="text-[13px] font-bold text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/30 uppercase flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" /> LIVE TELEMETRY
              </span>
            </div>

            <div className="space-y-3">
              {depots.map((d, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between font-mono text-[14px]">
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-100 flex items-center gap-2">
                      <span>{d.name}</span>
                      <span className="text-[13px] text-slate-400 font-normal">({d.city})</span>
                    </div>
                    <div className="text-[13px] text-slate-400 flex items-center gap-4">
                      <span>ICU Beds: <strong className="text-teal-400">{d.icuAvail} Available</strong></span>
                      <span>LMO Reserve: <strong className={d.lmoDays < 3 ? 'text-rose-400 font-black' : 'text-emerald-400'}>{d.lmoDays} Days</strong></span>
                    </div>
                  </div>

                  <span
                    className={clsx(
                      'px-3 py-1 text-[13px] font-mono font-bold rounded-lg border uppercase',
                      d.surgeStatus === 'CRITICAL_SURGE' ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse' :
                      d.surgeStatus === 'SURGE_WARNING' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                      'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    )}
                  >
                    {d.surgeStatus.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active AI Convoys Grid */}
          <div className="rounded-[18px] border border-slate-800 bg-slate-950/90 p-6 backdrop-blur-md shadow-2xl space-y-4 font-sans">
            <div className="flex items-center justify-between text-[14px] font-mono font-bold text-slate-300 border-b border-slate-800 pb-3">
              <span className="flex items-center gap-2 text-teal-400">
                <Truck className="w-5 h-5" /> Active AI Supply Convoys in Transit
              </span>
              <span className="text-[13px] text-emerald-400 font-mono">4 Convoys Dispatched</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px]">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-mono text-[13px] text-teal-400 font-bold">
                  <span>CONVOY LMO-909</span>
                  <span className="text-emerald-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> ETA 45m</span>
                </div>
                <div className="font-bold text-slate-100">4,000L Liquid Oxygen Convoy</div>
                <div className="text-[13px] text-slate-400">Nagpur ➔ Kozhikode Command Node</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-mono text-[13px] text-cyan-400 font-bold">
                  <span>AIR SQUADRON 04</span>
                  <span className="text-emerald-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> ETA 18m</span>
                </div>
                <div className="font-bold text-slate-100">6 Air-Ambulance Squadrons</div>
                <div className="text-[13px] text-slate-400">Air Base Hyderabad ➔ Kerala Vector Zone</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-mono text-[13px] text-purple-400 font-bold">
                  <span>VENTILATOR SHIFT</span>
                  <span className="text-emerald-400 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> In Transit</span>
                </div>
                <div className="font-bold text-slate-100">15 High-Flow Ventilators</div>
                <div className="text-[13px] text-slate-400">Manipal Mumbai ➔ AIIMS Delhi</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-mono text-[13px] text-emerald-400 font-bold">
                  <span>TELE-DOCTOR SHIFT</span>
                  <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Synced</span>
                </div>
                <div className="font-bold text-slate-100">4 Tele-ICU Pulmonologists</div>
                <div className="text-[13px] text-slate-400">NIMHANS ➔ PGIMER Chandigarh</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Recommendation Queue */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 font-mono text-[14px]">
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400 animate-spin-slow" />
              AI Automated Transfer Queue
            </h3>
            <span className="text-[13px] text-slate-400">4 Proposals</span>
          </div>

          <div className="space-y-4 font-sans">
            {recommendations.map(rec => {
              const Icon = typeIcon[rec.type];
              const isApproved = rec.status === 'APPROVED';

              return (
                <div
                  key={rec.id}
                  className="p-5 rounded-[18px] border border-slate-800 bg-slate-950/90 space-y-4 shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={clsx('p-2.5 rounded-xl border', typeColor[rec.type])}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[13px] font-mono font-bold text-slate-400 uppercase">{rec.type} TRANSFER</span>
                        <h4 className="text-[16px] font-bold text-slate-100 leading-tight">{rec.title}</h4>
                      </div>
                    </div>

                    <span
                      className={clsx(
                        'px-2.5 py-1 rounded-lg text-[13px] font-mono font-bold border uppercase',
                        isApproved
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      )}
                    >
                      {isApproved ? 'APPROVED' : 'PENDING'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[14px] font-mono flex items-center justify-between text-slate-300">
                    <span className="truncate">{rec.from}</span>
                    <ArrowRightLeft className="w-4 h-4 text-teal-400 shrink-0 mx-2" />
                    <span className="truncate text-teal-300 font-bold">{rec.to}</span>
                  </div>

                  <p className="text-[14px] text-slate-400 leading-relaxed">
                    <strong className="text-slate-200">Reason:</strong> {rec.reason}
                  </p>

                  <div className="grid grid-cols-3 gap-2 font-mono text-[13px] text-center pt-2 border-t border-slate-800">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block uppercase text-[11px]">Confidence</span>
                      <span className="font-bold text-teal-400">{rec.confidence}%</span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block uppercase text-[11px]">Savings</span>
                      <span className="font-bold text-emerald-400">{rec.costSavings.split(' ')[0]}</span>
                    </div>

                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block uppercase text-[11px]">Lives Saved</span>
                      <span className="font-bold text-cyan-400">+{rec.livesAffected}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleApprove(rec.id)}
                    disabled={isApproved}
                    className={clsx(
                      'w-full py-3 px-4 rounded-xl font-bold font-mono text-[14px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer',
                      isApproved
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30 cursor-default'
                        : 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 shadow-lg shadow-teal-500/20'
                    )}
                  >
                    {isApproved ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>DISPATCHED TO TRANSPORT GRID</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>ONE-CLICK APPROVE TRANSFER</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
