import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useCommand } from '../../context/CommandContext';
import { Sparkles, Zap, Shield, Cpu, Activity, Orbit, Rocket } from 'lucide-react';
import { clsx } from 'clsx';

export const AICoreSphere: React.FC = () => {
  const { environment, cycleNextEnvironment, isWaveActive, setShowStudioModal } = useTheme();
  const { setActiveTab, addNotification } = useCommand();

  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [universeUnlocked, setUniverseUnlocked] = useState(false);

  const envThemeDetails = {
    day: { name: 'Healthcare Day', icon: Sparkles, color: 'from-blue-500 to-teal-400', ring: 'border-blue-400' },
    night: { name: 'Healthcare Night', icon: Cpu, color: 'from-blue-600 to-indigo-500', ring: 'border-indigo-400' },
    intelligence: { name: 'AI Intelligence Core', icon: Zap, color: 'from-cyan-400 to-blue-600', ring: 'border-cyan-400' },
    emergency: { name: 'Emergency Defense Mode', icon: Activity, color: 'from-rose-500 to-amber-500', ring: 'border-rose-500' },
    executive: { name: 'Government Executive', icon: Shield, color: 'from-emerald-400 to-teal-600', ring: 'border-amber-400' },
    mission: { name: 'Mission Control 2035', icon: Orbit, color: 'from-indigo-400 to-cyan-400', ring: 'border-purple-400' }
  };

  const currentDetails = envThemeDetails[environment];
  const IconComp = currentDetails.icon;

  const playVoiceAnnouncement = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (e.detail === 2) {
      // Double Click -> Open Theme Studio
      setShowStudioModal(true);
      return;
    }

    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    if (nextCount >= 10 && !universeUnlocked) {
      // 🚀 UNLOCK EASTER EGG: Healthcare Universe Mode!
      setUniverseUnlocked(true);
      setClickCount(0);

      // Transform dashboard to District Digital Twin 3D view
      setActiveTab('digitaltwin');

      addNotification('🚀 SECRET UNLOCKED: Healthcare Universe Mode Activated — District Digital Twin Command Node.');
      playVoiceAnnouncement('Advanced Command Center Activated.');
      return;
    }

    // Normal Single Click -> Trigger Wave Sequence
    cycleNextEnvironment();
  };

  return (
    <div className="relative group flex items-center justify-center">
      {/* Floating 56px Frosted Glass AI Core Sphere */}
      <motion.button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer select-none focus:outline-none z-30 transition-shadow duration-300"
        title="Single click: Cycle AI Theme • Double click: Theme Studio • 10 Clicks: Healthcare Universe Mode"
      >
        {/* Outer Metallic Ring + Rotating Energy Ring */}
        <div
          className={clsx(
            'absolute inset-0 rounded-full border-2 border-slate-700/60 light:border-slate-300 backdrop-blur-2xl shadow-xl transition-all duration-300',
            isHovered && 'shadow-[0_0_25px_rgba(56,189,248,0.5)] border-cyan-400/80',
            clickCount > 5 && 'border-amber-400 animate-pulse'
          )}
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: isHovered ? 4 : 12, repeat: Infinity, ease: 'linear' }}
          className={clsx('absolute -inset-1 rounded-full border border-dashed opacity-60', currentDetails.ring)}
        />

        {/* Orbiting Particle Dot */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full flex items-start justify-center pointer-events-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8] -mt-1" />
        </motion.div>

        {/* Frosted Crystal Glass Layer */}
        <div className="absolute inset-1 rounded-full bg-slate-950/70 light:bg-white/80 backdrop-blur-xl border border-white/20 overflow-hidden flex items-center justify-center">
          {/* Glowing Animated Core Center */}
          <motion.div
            animate={{
              scale: isWaveActive ? [1, 1.4, 0.9, 1] : [1, 1.15, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: isWaveActive ? 0.4 : 3, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-8 h-8 rounded-full bg-gradient-to-tr ${currentDetails.color} shadow-[0_0_20px_rgba(56,189,248,0.8)] flex items-center justify-center`}
          >
            {universeUnlocked ? (
              <Rocket className="w-4 h-4 text-amber-300 animate-bounce" />
            ) : (
              <IconComp className={clsx('w-4 h-4 text-slate-950 animate-pulse', isWaveActive && 'animate-spin')} />
            )}
          </motion.div>
        </div>
      </motion.button>

      {/* Hover Tooltip: AI Environment */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-0 z-40 px-3 py-1.5 rounded-xl bg-slate-950/90 light:bg-white/95 border border-cyan-500/40 text-xs font-mono font-bold text-slate-100 light:text-slate-900 shadow-2xl backdrop-blur-xl whitespace-nowrap flex flex-col items-end pointer-events-none"
          >
            <div className="flex items-center gap-1.5 text-cyan-400 light:text-cyan-600 text-[10px]">
              <Sparkles className="w-3 h-3" />
              <span>AI ENVIRONMENT CORE</span>
            </div>
            <div className="text-xs">{currentDetails.name}</div>
            <span className="text-[9px] text-slate-500 font-sans font-normal mt-0.5">
              {clickCount > 0 ? `Clicks: ${clickCount}/10` : 'Click: Wave • Double-Click: Studio'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
