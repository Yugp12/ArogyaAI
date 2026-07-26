import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import type { AIEnvironment } from '../../context/ThemeContext';
import {
  Sun,
  Moon,
  Check,
  Sliders,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { clsx } from 'clsx';

interface EnvironmentOption {
  id: AIEnvironment;
  name: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  primaryColor: string;
  secondaryColor: string;
  palette: string[];
  recommendedRole: string;
  wcagScore: string;
  bgPreview: string;
}

export const ThemeStudioModal: React.FC = () => {
  const { environment, setEnvironment, showStudioModal, setShowStudioModal } = useTheme();

  const options: EnvironmentOption[] = [
    {
      id: 'day',
      name: 'Healthcare Day Protocol',
      subtitle: 'Clean Daylight & Government High-Contrast',
      description: 'Bright clinical environment optimized for high daylight visibility and district healthcare administration offices.',
      icon: Sun,
      primaryColor: '#2563EB',
      secondaryColor: '#14B8A6',
      palette: ['#FFFFFF', '#F0F9FF', '#2563EB', '#14B8A6', '#0F172A'],
      recommendedRole: 'District Collectors & Admin Offices',
      wcagScore: 'AAA (Contrast 14.2:1)',
      bgPreview: 'from-sky-100 via-blue-50 to-white'
    },
    {
      id: 'night',
      name: 'Autonomous Night Command',
      subtitle: 'Deep Slate & Cyber Teal Sci-Fi Mode',
      description: 'Futuristic dark mode engineered for 24/7 hospital night shifts, tele-ICU monitoring, and national command centers.',
      icon: Moon,
      primaryColor: '#38BDF8',
      secondaryColor: '#3B82F6',
      palette: ['#090D16', '#1E293B', '#3B82F6', '#38BDF8', '#F8FAFC'],
      recommendedRole: 'Tele-ICU Doctors & Command Centers',
      wcagScore: 'AAA (Contrast 15.8:1)',
      bgPreview: 'from-slate-950 via-slate-900 to-indigo-950'
    }
  ];

  return (
    <AnimatePresence>
      {showStudioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md font-sans">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-4xl rounded-3xl border border-cyan-500/40 bg-slate-900 light:bg-white p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden text-slate-100 light:text-slate-900"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800 light:border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg">
                  <Sliders className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> AROGYAAI OS • DUAL PROTOCOL THEME ENGINE
                  </span>
                  <h2 className="text-2xl font-black text-slate-100 light:text-slate-900">
                    AI Core Theme Studio (2 Core Protocols)
                  </h2>
                  <p className="text-xs text-slate-400 light:text-slate-600 mt-0.5">
                    Select your operating theme protocol: Healthcare Day Protocol or Autonomous Night Command.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowStudioModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-800 border border-slate-700 transition-all cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Exactly 2 AI Theme Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {options.map((opt) => {
                const Icon = opt.icon;
                const isActive = environment === opt.id;

                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setEnvironment(opt.id)}
                    className={clsx(
                      'p-6 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden group shadow-xl',
                      isActive
                        ? 'border-cyan-400 bg-slate-950 light:bg-slate-50 shadow-[0_0_30px_rgba(56,189,248,0.25)] ring-2 ring-cyan-500/40'
                        : 'border-slate-800 light:border-slate-200 bg-slate-950/60 light:bg-white hover:border-slate-700'
                    )}
                  >
                    {/* Live Preview Gradient Background */}
                    <div className={clsx('h-20 rounded-2xl bg-gradient-to-r p-4 flex items-center justify-between shadow-inner', opt.bgPreview)}>
                      <div className="p-2.5 rounded-xl bg-slate-950/70 light:bg-white/80 text-cyan-400">
                        <Icon className="w-6 h-6" />
                      </div>

                      {isActive && (
                        <span className="px-3 py-1 rounded-full bg-cyan-400 text-slate-950 text-xs font-mono font-black flex items-center gap-1 shadow-md">
                          <Check className="w-4 h-4" /> ACTIVE PROTOCOL
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-slate-100 light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                        {opt.name}
                      </h4>
                      <span className="text-xs font-mono text-cyan-400 font-bold uppercase block">{opt.subtitle}</span>
                      <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed pt-1">
                        {opt.description}
                      </p>
                    </div>

                    {/* Color Swatch Palette */}
                    <div className="pt-3 border-t border-slate-800/80 light:border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span>Palette Tokens:</span>
                        <div className="flex items-center gap-1.5">
                          {opt.palette.map((c, i) => (
                            <span key={i} className="w-3.5 h-3.5 rounded-full border border-slate-700" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span>WCAG AA Rating:</span>
                        <span className="text-emerald-400 font-bold">{opt.wcagScore}</span>
                      </div>

                      <div className="text-xs font-mono text-slate-400 pt-2 border-t border-slate-900">
                        Recommended: <span className="text-slate-200 light:text-slate-800 font-bold">{opt.recommendedRole}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 light:bg-slate-100 border border-slate-800 light:border-slate-200 text-xs font-mono text-slate-400 light:text-slate-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Instant CSS color token updates across all dashboard screens.</span>
              </div>
              <button
                onClick={() => setShowStudioModal(false)}
                className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all cursor-pointer uppercase text-xs"
              >
                Apply & Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
