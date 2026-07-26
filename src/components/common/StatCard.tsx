import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { clsx } from 'clsx';
import type { RiskLevel } from '../../types';

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: number;
  trendLabel?: string;
  icon: LucideIcon;
  status?: RiskLevel;
  subtext?: string;
  color?: 'teal' | 'rose' | 'amber' | 'blue' | 'purple';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  prefix = '',
  suffix = '',
  trend,
  trendLabel = 'vs last 24h',
  icon: Icon,
  status,
  subtext,
  color = 'teal'
}) => {
  const [displayVal, setDisplayVal] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayVal(value);
        clearInterval(timer);
      } else {
        setDisplayVal(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  const colorMap = {
    teal: 'text-teal-400 bg-teal-500/10 border-teal-500/30 glow-teal',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/30 glow-rose',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/30 glow-amber',
    blue: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
  };

  const statusBadge = {
    CRITICAL: 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse',
    HIGH: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    MODERATE: 'bg-sky-500/20 text-sky-400 border-sky-500/40',
    STABLE: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="relative overflow-hidden rounded-2xl p-5 border border-slate-800 light:border-slate-200 bg-slate-900/70 light:bg-white/90 backdrop-blur-md shadow-xl transition-all duration-300 group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={clsx('p-2.5 rounded-xl border', colorMap[color])}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold tracking-wider text-slate-400 light:text-slate-500 uppercase">
            {title}
          </span>
        </div>

        {status && (
          <span className={clsx('text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider', statusBadge[status])}>
            {status}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <span className="text-3xl font-extrabold tracking-tight text-slate-100 light:text-slate-900 font-mono">
            {prefix}{displayVal.toLocaleString()}{suffix}
          </span>
          {subtext && (
            <p className="text-xs text-slate-400 light:text-slate-500 mt-1">
              {subtext}
            </p>
          )}
        </div>

        {trend !== undefined && (
          <div className="flex flex-col items-end">
            <span
              className={clsx(
                'inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-lg border',
                trend >= 0
                  ? 'text-rose-400 bg-rose-500/10 border-rose-500/20'
                  : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
              )}
            >
              {trend >= 0 ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
              {trend >= 0 ? `+${trend}%` : `${trend}%`}
            </span>
            <span className="text-[10px] text-slate-500 light:text-slate-400 mt-0.5">{trendLabel}</span>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};
