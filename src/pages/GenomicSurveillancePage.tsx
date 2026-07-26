import React from 'react';
import { motion } from 'framer-motion';
import { mockGenomics } from '../data/mockData';
import { Dna, Microscope } from 'lucide-react';

export const GenomicSurveillancePage: React.FC = () => {
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
            <Dna className="w-5 h-5 text-teal-400" />
            Genomic Surveillance & Pathogen Lineage Intelligence
          </h1>
          <p className="text-xs text-slate-400 light:text-slate-500 mt-1">
            Whole Genome Sequencing (WGS) variant mutation tracking & predictive vaccine immune escape modeling
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-purple-400 bg-purple-500/10 border border-purple-500/30 px-3 py-1.5 rounded-xl">
          <Microscope className="w-4 h-4 animate-pulse" />
          <span>WGS SEQUENCERS ACTIVE: INSACOG GRID</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockGenomics.map((varData) => (
          <motion.div
            key={varData.lineage}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-5 backdrop-blur-md shadow-xl space-y-4 font-sans"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-teal-400 uppercase">
                  LINEAGE: {varData.lineage}
                </span>
                <h3 className="text-base font-bold text-slate-100 light:text-slate-900 mt-0.5">
                  {varData.name}
                </h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/40">
                Risk {varData.riskScore}
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800">
                <span className="text-slate-400">Immune Evasion</span>
                <span className="font-bold text-rose-400">{varData.immuneEvasionPct}%</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800">
                <span className="text-slate-400">Transmissibility</span>
                <span className="font-bold text-amber-400">{varData.transmissibilityMultiplier}x vs Wildtype</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800">
                <span className="text-slate-400">Vaccine Efficacy</span>
                <span className="font-bold text-teal-400">{varData.vaccineEfficacy}%</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Key Spike Mutations:</span>
              <div className="flex flex-wrap gap-1">
                {varData.primaryMutations.map((m, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-teal-300 border border-slate-700">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
