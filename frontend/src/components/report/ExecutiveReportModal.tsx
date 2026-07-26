import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommand } from '../../context/CommandContext';
import { mockOutbreaks } from '../../data/mockData';
import {
  FileText,
  Printer,
  X,
  QrCode,
  Award,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { clsx } from 'clsx';

export const ExecutiveReportModal: React.FC = () => {
  const { activeModal, setActiveModal } = useCommand();

  if (activeModal !== 'report') return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        {/* Canva-Grade High-Readability PDF Print Stylesheet */}
        <style>{`
          @media print {
            body * {
              visibility: hidden !important;
            }
            #canva-pdf-report, #canva-pdf-report * {
              visibility: visible !important;
            }
            #canva-pdf-report {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              background-color: #ffffff !important;
              color: #0f172a !important;
              padding: 32px !important;
              font-family: ui-sans-serif, system-ui, -apple-system, sans-serif !important;
            }
            .no-print {
              display: none !important;
            }
            .canva-header-bg {
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important;
              color: #ffffff !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .canva-badge-red {
              background-color: #ffe4e6 !important;
              color: #be123c !important;
              border: 1px solid #f43f5e !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .canva-badge-green {
              background-color: #d1fae5 !important;
              color: #047857 !important;
              border: 1px solid #10b981 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .canva-kpi-card {
              background-color: #f8fafc !important;
              border: 1px solid #e2e8f0 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            h1, h2, h3, h4 {
              color: #0f172a !important;
            }
            p, span, td, th {
              color: #1e293b !important;
            }
          }
        `}</style>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-4xl rounded-3xl border border-slate-800 light:border-slate-200 bg-slate-900 light:bg-white p-6 shadow-2xl flex flex-col h-[800px] relative overflow-hidden"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 light:border-slate-200 no-print">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-400" />
              <h3 className="text-base font-bold text-slate-100 light:text-slate-900">
                Canva-Grade Executive Health Intelligence Briefing
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Print / Export High-Quality PDF
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-800 border border-slate-700 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Canva-Grade PDF Document Canvas */}
          <div
            id="canva-pdf-report"
            className="flex-1 overflow-y-auto my-4 p-8 bg-slate-950 light:bg-white border border-slate-800 light:border-slate-300 rounded-2xl font-sans text-slate-200 light:text-slate-900 space-y-6 shadow-inner print:p-0 print:border-none"
          >
            {/* Executive Header Banner */}
            <div className="canva-header-bg p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-teal-500/40 text-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
                  <Award className="w-4 h-4 text-teal-400" />
                  GOVERNMENT OF INDIA • MINISTRY OF HEALTH & FAMILY WELFARE
                </div>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  ArogyaAI Executive Epidemic Briefing & Telemetry
                </h1>
                <p className="text-xs text-slate-400 font-mono">
                  REF: MOHFW-EP-2026/09 • CLASSIFICATION: EXECUTIVE TOP SECRET
                </p>
              </div>

              <div className="text-right font-mono text-xs text-slate-300 space-y-0.5 border-l sm:border-l border-slate-800 sm:pl-4">
                <div>DATE: July 25, 2026</div>
                <div>TIME: 10:25 AM IST</div>
                <div className="text-emerald-400 font-bold">STATUS: AUTONOMOUS ACTIVE</div>
              </div>
            </div>

            {/* 4 Canva Metric Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="canva-kpi-card p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                <span className="text-[10px] text-slate-400 uppercase block">Total Active Cases</span>
                <span className="text-xl font-black text-rose-400">55,870</span>
                <span className="text-[9px] text-rose-400 block">+11.4% Growth Rate</span>
              </div>

              <div className="canva-kpi-card p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                <span className="text-[10px] text-slate-400 uppercase block">Reproduction (R0)</span>
                <span className="text-xl font-black text-amber-400">2.15</span>
                <span className="text-[9px] text-slate-400 block">Kozhikode Hotspot</span>
              </div>

              <div className="canva-kpi-card p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                <span className="text-[10px] text-slate-400 uppercase block">ICU Saturation</span>
                <span className="text-xl font-black text-teal-400">92.4%</span>
                <span className="text-[9px] text-teal-400 block">Apex Hospitals</span>
              </div>

              <div className="canva-kpi-card p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                <span className="text-[10px] text-slate-400 uppercase block">AI SLA Compliance</span>
                <span className="text-xl font-black text-emerald-400">99.4%</span>
                <span className="text-[9px] text-emerald-400 block">Logistics Refill SLA</span>
              </div>
            </div>

            {/* Section 1: Executive Summary */}
            <div className="space-y-2 text-xs leading-relaxed">
              <h2 className="text-sm font-bold uppercase tracking-wider text-teal-400 light:text-teal-800 font-mono flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> 1. National Epidemic Intelligence & Vector Surveillance
              </h2>
              <p className="text-slate-300 light:text-slate-700">
                National epidemic intelligence indicates heightened pathogen reproductive activity across six urban centers. Primary concern centers on Nipah Subtype-4B in Kozhikode (R0 2.15) and Dengue Serotype 5-Delta in Mumbai Metropolitan Region (R0 1.84). Predictive neural modeling indicates ICU bed occupancy across premier medical institutions will peak at 94% within 72 hours without strategic patient triage redirection.
              </p>
            </div>

            {/* Section 2: Outbreak Hotspot Registry Table */}
            <div className="space-y-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-teal-400 light:text-teal-800 font-mono">
                2. Outbreak Hotspot Registry & Risk Telemetry
              </h2>
              <table className="w-full text-left text-xs border-collapse font-sans">
                <thead>
                  <tr className="border-b-2 border-slate-700 light:border-slate-400 font-mono font-bold text-slate-400 light:text-slate-800">
                    <th className="py-2.5 px-2">Region</th>
                    <th className="py-2.5 px-2">Pathogen</th>
                    <th className="py-2.5 px-2">Active Cases</th>
                    <th className="py-2.5 px-2">R0 Index</th>
                    <th className="py-2.5 px-2">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 light:divide-slate-200">
                  {mockOutbreaks.map((ob) => (
                    <tr key={ob.id}>
                      <td className="py-2 px-2 font-bold text-slate-100 light:text-slate-900">{ob.region}</td>
                      <td className="py-2 px-2 font-mono text-teal-400 light:text-teal-700">{ob.disease}</td>
                      <td className="py-2 px-2 font-mono font-bold">{ob.activeCases.toLocaleString()}</td>
                      <td className="py-2 px-2 font-mono font-bold text-amber-400 light:text-amber-800">{ob.r0Value}</td>
                      <td className="py-2 px-2 font-mono font-bold">
                        <span className={clsx(
                          'px-2 py-0.5 rounded text-[10px]',
                          ob.riskLevel === 'CRITICAL' ? 'canva-badge-red text-rose-400' : 'canva-badge-green text-emerald-400'
                        )}>
                          {ob.riskLevel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Section 3: Containment Directives */}
            <div className="space-y-2 text-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-teal-400 light:text-teal-800 font-mono">
                3. Executive Containment Directives
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300 light:text-slate-700">
                <li>Deploy BSL-4 Mobile Containment units to Kozhikode Vector Zone immediately.</li>
                <li>Initiate emergency liquid oxygen airlift from Central Defense Storage to Western Node.</li>
                <li>Activate ArogyaAI Tele-ICU diversion protocol for AIIMS Delhi to prevent triage bottleneck.</li>
              </ul>
            </div>

            {/* Digital Signature Footer */}
            <div className="pt-6 border-t-2 border-slate-800 light:border-slate-300 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-3">
                <QrCode className="w-12 h-12 text-teal-400 light:text-teal-700 p-1 bg-slate-900 light:bg-white rounded-lg border border-slate-800 light:border-slate-300" />
                <div>
                  <div className="font-bold text-slate-100 light:text-slate-900 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Blockchain Certified Document
                  </div>
                  <div className="text-[10px] text-slate-400 light:text-slate-600">SHA-256 Checksum: 8f9b4a90928a38bdf89941</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-emerald-400 light:text-emerald-800">DR. ARISUDAN SENGUPTA</div>
                <div className="text-[10px] text-slate-400 light:text-slate-600">National Director General • ArogyaAI Mission</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
