import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { clsx } from 'clsx';

interface ThemeToggleProps {
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  showLabel = false,
  size = 'md',
  className
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const sizeClasses = {
    sm: { track: 'w-12 h-6 text-[10px]', knob: 'w-4 h-4', icon: 'w-3 h-3', translate: 'translateX(24px)' },
    md: { track: 'w-16 h-8 text-xs', knob: 'w-6 h-6', icon: 'w-3.5 h-3.5', translate: 'translateX(32px)' },
    lg: { track: 'w-20 h-10 text-sm', knob: 'w-8 h-8', icon: 'w-4 h-4', translate: 'translateX(40px)' }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={clsx('inline-flex items-center gap-2 font-sans', className)}>
      <button
        onClick={toggleTheme}
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle Theme Mode"
        className={clsx(
          'relative rounded-full p-1 transition-colors duration-500 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-inner flex items-center justify-between',
          currentSize.track,
          isDark
            ? 'bg-slate-900 border border-slate-700/80 shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)]'
            : 'bg-amber-100 border border-amber-300/80 shadow-[inset_0_2px_6px_rgba(245,158,11,0.2)]'
        )}
      >
        {/* Background Icons on Track */}
        <Sun
          className={clsx(
            'w-3.5 h-3.5 text-amber-500 transition-opacity duration-300 ml-1',
            isDark ? 'opacity-40' : 'opacity-100'
          )}
        />
        <Moon
          className={clsx(
            'w-3.5 h-3.5 text-teal-300 transition-opacity duration-300 mr-1',
            isDark ? 'opacity-100' : 'opacity-40'
          )}
        />

        {/* Sliding Knob with Motion Spring */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 600, damping: 35 }}
          className={clsx(
            'absolute top-1 left-1 rounded-full flex items-center justify-center shadow-lg transition-all duration-300',
            currentSize.knob,
            isDark
              ? 'bg-gradient-to-tr from-slate-950 via-slate-900 to-teal-950 border border-teal-500/40 text-teal-300 shadow-[0_0_12px_rgba(45,212,191,0.4)]'
              : 'bg-gradient-to-tr from-amber-400 to-yellow-300 border border-amber-200 text-slate-900 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
          )}
          style={{
            transform: isDark ? currentSize.translate : 'translateX(0px)'
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ scale: 0, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className={currentSize.icon} />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ scale: 0, rotate: 90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className={currentSize.icon} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </button>

      {showLabel && (
        <span className="text-xs font-mono font-bold text-slate-300 light:text-slate-700">
          {isDark ? 'Dark Sci-Fi' : 'Enterprise Light'}
        </span>
      )}
    </div>
  );
};
