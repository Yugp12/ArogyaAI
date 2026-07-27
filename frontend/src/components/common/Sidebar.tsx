import React from 'react';
import { useCommand } from '../../context/CommandContext';
import type { NavTab } from '../../context/CommandContext';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Stethoscope,
  Ambulance,
  Dna,
  Building2,
  Radio,
  Pill,
  Users,
  UserCheck,
  Brain,
  ArrowRightLeft,
  BarChart3,
  Settings,
  HelpCircle,
  Play,
  FileSpreadsheet
} from 'lucide-react';
import { clsx } from 'clsx';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, setActiveModal, triggerCinematicIntro } = useCommand();

  const navItems: { id: NavTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'overview', label: 'Command Overview', icon: LayoutDashboard },
    { id: 'intelligence', label: 'Reports & Intelligence', icon: FileSpreadsheet, badge: 'Gov AI' },
    { id: 'digitaltwin', label: 'District Digital Twin 3D', icon: Building2, badge: 'Hero 3D' },
    { id: 'redistribution', label: 'AI Resource Transfer', icon: ArrowRightLeft, badge: '4 AI Recs' },
    { id: 'forecasting', label: 'AI Predictive Engine', icon: Brain, badge: '98.8% Acc' },
    { id: 'patients', label: 'Patient EHR & Triage', icon: Users, badge: '98% Acc' },
    { id: 'triage', label: 'AI Diagnostic Triage', icon: Stethoscope },
    { id: 'logistics', label: 'Tele-ICU & Fleet', icon: Ambulance, badge: 'Live GPS' },
    { id: 'inventory', label: 'Medicine & Supplies', icon: Pill, badge: '94.2% Stock' },
    { id: 'workforce', label: 'Medical Workforce', icon: UserCheck, badge: '97.1% Active' },
    { id: 'analytics', label: 'Executive Analytics', icon: BarChart3, badge: 'Executive' },
    { id: 'genomics', label: 'Genomic Surveillance', icon: Dna },
    { id: 'nodes', label: 'Hospital Telemetry', icon: Building2, badge: '5 Apex' },
    { id: 'settings', label: 'System Settings', icon: Settings, badge: 'Security' }
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-950/60 light:bg-white/80 border-b md:border-b-0 md:border-r border-slate-800/80 light:border-slate-200/80 backdrop-blur-xl p-4 flex flex-row md:flex-col justify-between shrink-0 transition-all duration-300">
      <div className="w-full flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 space-y-1">
        <div className="hidden md:block px-3 py-1 text-[10px] font-extrabold tracking-widest text-slate-500 uppercase">
          ArogyaAI OS Modules
        </div>

        <button
          onClick={() => setActiveModal('whatif')}
          className="hidden md:flex items-center justify-between px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 hover:from-teal-500/30 hover:to-cyan-500/30 text-teal-300 border border-teal-500/40 font-mono text-xs font-bold transition-all cursor-pointer glow-teal mb-2"
        >
          <span className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-teal-400" />
            <span>"What-If" AI Simulator</span>
          </span>
          <span className="px-1.5 py-0.5 text-[9px] bg-teal-400 text-slate-950 rounded font-black">2035</span>
        </button>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={clsx(
                'relative flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap group cursor-pointer',
                isActive
                  ? 'text-teal-400 light:text-teal-700 bg-teal-500/10 light:bg-teal-50 border border-teal-500/30'
                  : 'text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-900 hover:bg-slate-900/60 light:hover:bg-slate-100'
              )}
            >
              <Icon className={clsx('w-4 h-4 shrink-0 transition-transform group-hover:scale-110', isActive && 'text-teal-400 light:text-teal-600')} />
              <span className="hidden md:inline">{item.label}</span>
              <span className="md:hidden">{item.label.split(' ')[0]}</span>

              {item.badge && (
                <span
                  className={clsx(
                    'ml-auto hidden xl:inline-block px-1.5 py-0.5 text-[9px] font-bold rounded-md font-mono',
                    isActive
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      : 'bg-slate-800 text-slate-400 light:bg-slate-200 light:text-slate-600'
                  )}
                >
                  {item.badge}
                </span>
              )}

              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-teal-400 rounded-r-full hidden md:block"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="hidden md:block mt-auto pt-3 border-t border-slate-800/80 light:border-slate-200/80 space-y-2">
        <button
          onClick={triggerCinematicIntro}
          className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <Play className="w-3.5 h-3.5 text-teal-400" />
          <span>Replay 4s Cinematic Intro</span>
        </button>

        <div className="rounded-xl p-2.5 bg-slate-900/80 light:bg-slate-100 border border-slate-800 light:border-slate-200">
          <div className="flex items-center justify-between text-xs font-medium text-slate-300 light:text-slate-700">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
              <span>ArogyaAI OS Core</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              YEAR 2035
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Latency: 14ms</span>
            <span>Uptime: 99.99%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
