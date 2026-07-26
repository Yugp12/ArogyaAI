import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommand } from '../../context/CommandContext';
import type { CopilotMessage } from '../../types';
import {
  Sparkles,
  Mic,
  Send,
  X,
  Bot,
  User,
  Zap,
  Volume2
} from 'lucide-react';
import { clsx } from 'clsx';

export const ArogyaCopilot: React.FC = () => {
  const { activeModal, setActiveModal } = useCommand();
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Greetings Commander. I am ArogyaAI Executive Copilot. I have synthesized national vector telemetry, hospital bed loads, and pathogen genomic mutations across 28 states.',
      timestamp: '10:24:00',
      metrics: [
        { label: 'National Epidemic R0', value: '1.64', status: 'HIGH' },
        { label: 'Avg Oxygen Reserve', value: '6.8 Days', status: 'MODERATE' },
        { label: 'ICU Stress Index', value: '84%', status: 'CRITICAL' }
      ],
      actions: [
        'Generate WHO Outbreak Situation Briefing',
        'Simulate Oxygen Refill Airlift to Kozhikode',
        'Forecast ICU Bed Demand for Mumbai Metro'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [thinking, setThinking] = useState(false);

  if (activeModal !== 'copilot') return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: CopilotMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setThinking(true);

    setTimeout(() => {
      let aiText = `Analysis complete for "${query}". Cross-referencing epidemiological data with 14 apex medical nodes.`;
      let metrics;

      if (query.toLowerCase().includes('who') || query.toLowerCase().includes('report') || query.toLowerCase().includes('briefing')) {
        aiText = 'Generated Executive Briefing compliant with WHO Epidemic Alert Protocols. Regional containment measures recommended for Kozhikode and MMR clusters.';
        metrics = [
          { label: 'Report Status', value: 'Ready for Signature', status: 'STABLE' as const },
          { label: 'WHO Compliance Score', value: '99.4%', status: 'STABLE' as const }
        ];
      } else if (query.toLowerCase().includes('oxygen') || query.toLowerCase().includes('airlift')) {
        aiText = 'Logistics Optimization: Emergency Air-Ambulance convoy initiated with 4,000L Liquid Medical Oxygen dispatched from Nagpur to Kozhikode Command Node.';
        metrics = [
          { label: 'Airlift Delivery ETA', value: '45 mins', status: 'STABLE' as const },
          { label: 'Reserve Post-Refill', value: '9.4 Days', status: 'STABLE' as const }
        ];
      } else {
        aiText = 'Epidemiological projection indicates R0 rate stabilization within 72 hours provided Phase-II fumigation and targeted vaccination sweeps are maintained.';
      }

      const aiMsg: CopilotMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metrics,
        actions: ['Download Briefing PDF', 'Notify State Health Secretary']
      };

      setMessages(prev => [...prev, aiMsg]);
      setThinking(false);
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-3xl rounded-3xl border border-slate-800 light:border-slate-200 bg-slate-900/95 light:bg-white p-6 shadow-2xl flex flex-col h-[680px] relative overflow-hidden"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 light:border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/25">
                <Sparkles className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
                  ArogyaAI Executive Copilot
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold text-teal-300 bg-teal-500/10 border border-teal-500/30 rounded-md">
                    LLM v4.5-MED
                  </span>
                </h3>
                <p className="text-xs text-slate-400 light:text-slate-500">
                  Natural Language Health Intelligence & Automated Decision Engine
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 light:hover:text-slate-800 bg-slate-800/60 light:bg-slate-100 hover:bg-slate-800 border border-slate-700 light:border-slate-300 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2 font-sans">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={clsx(
                  'flex gap-3 max-w-[88%]',
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                )}
              >
                <div
                  className={clsx(
                    'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md',
                    msg.sender === 'user'
                      ? 'bg-slate-800 text-slate-200'
                      : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  )}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-2">
                  <div
                    className={clsx(
                      'p-4 rounded-2xl text-xs leading-relaxed shadow-sm',
                      msg.sender === 'user'
                        ? 'bg-teal-600 text-white rounded-tr-none'
                        : 'bg-slate-950/80 light:bg-slate-100 text-slate-200 light:text-slate-800 border border-slate-800 light:border-slate-200 rounded-tl-none'
                    )}
                  >
                    <p>{msg.text}</p>

                    {msg.metrics && (
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono">
                        {msg.metrics.map((m, idx) => (
                          <div key={idx} className="p-2 rounded-xl bg-slate-900/90 border border-slate-800">
                            <span className="text-[9px] text-slate-400 block uppercase">{m.label}</span>
                            <span className="text-sm font-bold text-teal-400">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.actions && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.actions.map((act, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(act)}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 transition-all flex items-center gap-1"
                        >
                          <Zap className="w-3 h-3 text-teal-400" />
                          {act}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[9px] text-slate-500 font-mono block px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {thinking && (
              <div className="flex items-center gap-3 text-xs text-teal-400 font-mono">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-teal-400 animate-spin" />
                </div>
                <span>ArogyaAI is reasoning across national healthcare telemetry nodes...</span>
              </div>
            )}
          </div>

          {isRecording && (
            <div className="mb-3 p-3 rounded-xl bg-slate-950 border border-rose-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold">
                <Volume2 className="w-4 h-4 animate-bounce" />
                LISTENING TO COMMANDER VOICE INPUT...
              </div>
              <div className="flex items-center gap-1">
                {[40, 80, 20, 90, 50, 70, 30, 85].map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-1 bg-rose-500 rounded-full animate-pulse"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-slate-800 light:border-slate-200 flex items-center gap-2">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={clsx(
                'p-2.5 rounded-xl border transition-all',
                isRecording
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              )}
              title="Voice Input Command"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder="Ask ArogyaAI (e.g. 'Draft emergency briefing for Ministry of Health')..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-4 py-2.5 text-xs bg-slate-950/80 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-100 light:text-slate-900 placeholder-slate-500 focus:outline-none focus:border-teal-500 font-sans"
            />

            <button
              onClick={() => handleSend()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-teal-500/25 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Submit</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
