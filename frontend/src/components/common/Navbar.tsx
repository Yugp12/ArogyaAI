import React from 'react';
import { useCommand } from '../../context/CommandContext';
import { RippleButton } from './RippleButton';
import { AICoreSphere } from '../theme/AICoreSphere';
import {
  ShieldAlert,
  Sparkles,
  FileText,
  Activity,
  Search,
  LogOut
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    setActiveModal,
    emergencyLockdown,
    notifications,
    logout
  } = useCommand();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 light:border-slate-200/80 bg-slate-950/85 light:bg-white/90 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-teal-500/20">
              <div className="w-full h-full bg-slate-950 light:bg-white rounded-[10px] flex items-center justify-center">
                <Activity className="w-5 h-5 text-teal-400 light:text-teal-600 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-slate-100 light:text-slate-900 font-sans">
                  Arogya<span className="text-teal-400 light:text-teal-600">AI</span>
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-extrabold tracking-widest text-teal-300 bg-teal-500/10 border border-teal-500/30 rounded-md uppercase">
                  Apex Command
                </span>
              </div>
              <p className="text-[10px] text-slate-400 light:text-slate-500 tracking-wide hidden md:block">
                Ministry of Health & WHO Epidemic Intelligence Node
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center flex-1 max-w-xl bg-slate-900/60 light:bg-slate-100/80 border border-slate-800 light:border-slate-200 rounded-xl px-3 py-1.5 overflow-hidden">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            LIVE TICKER:
          </div>
          <div className="ml-2 text-xs text-slate-300 light:text-slate-700 truncate font-mono">
            {notifications[0]}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative hidden sm:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search ICD-11, Patient ID, Outbreak..."
              className="w-44 md:w-56 pl-9 pr-3 py-1.5 text-xs bg-slate-900/80 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-200 light:text-slate-800 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-all font-mono"
            />
          </div>

          <RippleButton
            variant="primary"
            size="sm"
            onClick={() => setActiveModal('copilot')}
            className="glow-teal"
          >
            <Sparkles className="w-4 h-4 text-teal-200 animate-spin-slow" />
            <span className="hidden md:inline">ArogyaAI Copilot</span>
          </RippleButton>

          <button
            onClick={() => setActiveModal('report')}
            className="p-2 text-slate-400 hover:text-slate-200 light:hover:text-slate-800 rounded-xl border border-slate-800 light:border-slate-200 bg-slate-900/60 light:bg-slate-100 hover:bg-slate-800 transition-all cursor-pointer"
            title="Generate National Briefing PDF Report"
          >
            <FileText className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveModal('protocol')}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
              emergencyLockdown
                ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20'
            }`}
            title="Emergency Containment Protocol Trigger"
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden xl:inline">
              {emergencyLockdown ? 'CONTAINMENT ACTIVE' : 'EMERGENCY PROTOCOL'}
            </span>
          </button>

          {/* Floating Spherical AI Core Theme Engine */}
          <AICoreSphere />

          <button
            onClick={logout}
            className="p-2 text-rose-400 hover:text-rose-300 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-all flex items-center gap-1 text-xs font-mono font-bold cursor-pointer"
            title="Sign Out to Login Page"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
