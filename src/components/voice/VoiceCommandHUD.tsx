import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCommand } from '../../context/CommandContext';
import { Mic, Volume2, Send } from 'lucide-react';
import { clsx } from 'clsx';

export const VoiceCommandHUD: React.FC = () => {
  const { setActiveTab, addNotification } = useCommand();

  const [listening, setListening] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');

  const handleVoiceCommand = (cmdText?: string) => {
    const text = cmdText || voiceQuery;
    if (!text.trim()) return;

    setListening(true);
    setTimeout(() => {
      setListening(false);
      const lower = text.toLowerCase();

      if (lower.includes('oxygen') || lower.includes('shortage')) {
        setActiveTab('inventory');
        addNotification('VOICE DIRECTIVE: Navigated to Medicine & Oxygen Supplies. Liquid Medical Oxygen highlighted.');
      } else if (lower.includes('doctor') || lower.includes('workforce')) {
        setActiveTab('workforce');
        addNotification('VOICE DIRECTIVE: Navigated to Medical Workforce Roster.');
      } else if (lower.includes('patient') || lower.includes('triage')) {
        setActiveTab('patients');
        addNotification('VOICE DIRECTIVE: Navigated to Patient EHR Triage.');
      } else if (lower.includes('transfer') || lower.includes('redistribution')) {
        setActiveTab('redistribution');
        addNotification('VOICE DIRECTIVE: Navigated to Autonomous AI Resource Transfer.');
      } else {
        setActiveTab('overview');
        addNotification(`VOICE DIRECTIVE EXECUTED: "${text}". Command Center overview synchronized.`);
      }

      setVoiceQuery('');
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-3 rounded-2xl bg-slate-900/90 light:bg-white border border-teal-500/40 backdrop-blur-md shadow-2xl flex items-center gap-3 font-mono text-xs glow-teal"
      >
        <button
          onClick={() => handleVoiceCommand('Show hospitals with oxygen shortage')}
          className={clsx(
            'p-2.5 rounded-xl border transition-all cursor-pointer',
            listening ? 'bg-rose-500 text-white border-rose-400 animate-pulse' : 'bg-teal-500/20 text-teal-300 border-teal-500/30'
          )}
          title="Voice Command Execution"
        >
          {listening ? <Volume2 className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <input
            type="text"
            placeholder='Speak or type: "Show hospitals with oxygen shortage"...'
            value={voiceQuery}
            onChange={(e) => setVoiceQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleVoiceCommand()}
            className="w-64 px-3 py-1.5 bg-slate-950 light:bg-slate-100 border border-slate-800 rounded-xl text-slate-100 light:text-slate-900 text-xs focus:outline-none focus:border-teal-500"
          />

          <button
            onClick={() => handleVoiceCommand()}
            className="p-2 rounded-xl bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
