import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCommand } from '../context/CommandContext';
import {
  Sparkles,
  Send,
  Mic,
  Paperclip,
  Globe,
  Bot,
  User,
  ExternalLink,
  FileText,
  MessageSquare,
  Plus,
  TrendingUp,
  Volume2
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { clsx } from 'clsx';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sources?: string[];
  chartData?: { name: string; val: number }[];
  fileAttachment?: string;
}

export const AIAssistantPage: React.FC = () => {
  const { addNotification } = useCommand();

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'MSG-01',
      sender: 'ai',
      text: 'Greeting Executive. I am ArogyaAI Copilot 5.0 (Powered by Google Gemini Health & DeepMind). How may I assist with national telemetry, bed load balancing, or epidemic forecasting today?',
      timestamp: '10:46:00',
      sources: ['MoHFW EpiGrid v4.5', 'WHO Biosurveillance Stack']
    }
  ]);

  const [threads] = useState([
    { id: 'T-1', title: 'Nipah Subtype 4B Outbreak Analysis', date: 'Today' },
    { id: 'T-2', title: 'PGIMER Tele-ICU Diversion Plan', date: 'Yesterday' },
    { id: 'T-3', title: 'LMO Stockpile Logistics Audit', date: '3 Days Ago' }
  ]);

  const chartSampleData = [
    { name: 'Day 1', val: 1200 },
    { name: 'Day 3', val: 2400 },
    { name: 'Day 5', val: 3800 },
    { name: 'Day 7', val: 5100 },
    { name: 'Day 9', val: 4200 }
  ];

  const suggestedPrompts = [
    '💡 Analyze Kozhikode Nipah R0 vector trajectory',
    '🛏️ Optimize PGIMER Chandigarh ICU bed allocation',
    '💊 Check LMO liquid oxygen reserve stockout risk',
    '🔬 Run WHO compliance audit for Delhi NCR'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() && !attachedFile) return;

    const userMsg: Message = {
      id: `MSG-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fileAttachment: attachedFile || undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setAttachedFile(null);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      const aiMsg: Message = {
        id: `MSG-${Date.now() + 1}`,
        sender: 'ai',
        text: `Analysis complete for query: "${query}". \n\nArogyaAI Neural Model predicts a 34% reduction in bed stress if Tele-ICU diversion is executed immediately. Regional inventory reserves remain nominal at 94.2%.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: ['National Health Grid Telemetry', 'ICMR WGS Sequencers', 'Google Cloud Healthcare API'],
        chartData: chartSampleData
      };

      setMessages(prev => [...prev, aiMsg]);
      addNotification('AI COPILOT: Decision response generated with 99.2% confidence.');
    }, 1400);
  };

  const handleVoiceRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setInput('Analyze Kozhikode Nipah R0 vector trajectory');
    }, 2000);
  };

  const handleSimulateUpload = () => {
    setAttachedFile('HRCT_Chest_Scan_Patient9941.dicom');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-4 font-sans"
    >
      <div className="hidden lg:flex w-64 flex-col rounded-3xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-4 backdrop-blur-md shadow-xl shrink-0 space-y-4">
        <button
          onClick={() => setMessages([messages[0]])}
          className="w-full py-2.5 px-3 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 font-bold font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat Session</span>
        </button>

        <div className="space-y-1 font-mono text-xs flex-1 overflow-y-auto">
          <span className="text-[10px] font-bold text-slate-500 uppercase px-2">Recent Threads</span>
          {threads.map(t => (
            <button
              key={t.id}
              className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800 light:hover:bg-slate-100 text-slate-300 light:text-slate-700 font-sans text-xs transition-colors truncate flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="truncate">{t.title}</span>
            </button>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-800 font-mono text-xs space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-teal-400" /> Language Model
          </span>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-slate-950 light:bg-slate-100 border border-slate-800 rounded-lg text-slate-200 light:text-slate-800 focus:outline-none"
          >
            <option value="English">English (Global)</option>
            <option value="Hindi">Hindi (हिंदी)</option>
            <option value="Tamil">Tamil (தமிழ்)</option>
            <option value="Malayalam">Malayalam (മലയാളം)</option>
            <option value="Bengali">Bengali (বাংলা)</option>
            <option value="Marathi">Marathi (मराठी)</option>
          </select>
        </div>
      </div>

      <div className="flex-1 flex flex-col rounded-3xl border border-slate-800 light:border-slate-200 bg-slate-950/80 light:bg-white backdrop-blur-md shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 light:border-slate-200 flex items-center justify-between bg-slate-900/60 light:bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-gradient-to-tr from-teal-500 to-blue-600 text-white shadow-md">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
                ArogyaAI Copilot 5.0
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold text-teal-300 bg-teal-500/20 rounded border border-teal-500/30">
                  GEMINI HEALTH PRO
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">Natural Language Clinical & Epidemic Intelligence</p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>ONLINE</span>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={clsx('flex gap-3 max-w-3xl', msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto')}
            >
              <div
                className={clsx(
                  'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-md',
                  msg.sender === 'user' ? 'bg-gradient-to-tr from-blue-600 to-indigo-600' : 'bg-gradient-to-tr from-teal-500 to-emerald-600'
                )}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={clsx(
                  'p-4 rounded-2xl space-y-2 border shadow-lg',
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500/40'
                    : 'bg-slate-900 light:bg-slate-100 text-slate-100 light:text-slate-900 border-slate-800 light:border-slate-200'
                )}
              >
                <div className="flex items-center justify-between text-[10px] opacity-75 font-mono">
                  <span>{msg.sender === 'user' ? 'Executive Input' : 'ArogyaAI Copilot'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <p className="whitespace-pre-line leading-relaxed text-xs">{msg.text}</p>

                {msg.fileAttachment && (
                  <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-700 font-mono text-[10px] flex items-center gap-2 text-cyan-300">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Attached: {msg.fileAttachment}</span>
                  </div>
                )}

                {msg.chartData && (
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 mt-2">
                    <div className="text-[10px] font-mono font-bold text-teal-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> INLINE AI SURGE PROJECTION
                    </div>
                    <div className="h-36 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={msg.chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                          <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#090d16', borderRadius: '8px', fontSize: '11px' }} />
                          <Area type="monotone" dataKey="val" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {msg.sources && (
                  <div className="pt-2 border-t border-slate-800/60 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9px] font-mono text-slate-400">Sources:</span>
                    {msg.sources.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[9px] font-mono bg-teal-500/10 text-teal-300 border border-teal-500/20 flex items-center gap-1">
                        <ExternalLink className="w-2.5 h-2.5" /> {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-600 flex items-center justify-center text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-slate-800/80 bg-slate-900/40 flex items-center gap-2 overflow-x-auto">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt.slice(2))}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 light:bg-slate-100 light:text-slate-800 border border-slate-800 text-xs whitespace-nowrap transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex flex-col gap-2">
          {attachedFile && (
            <div className="px-3 py-1 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-mono flex items-center justify-between w-fit">
              <span>Attached: {attachedFile}</span>
              <button onClick={() => setAttachedFile(null)} className="ml-2 font-bold hover:text-white">✕</button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateUpload}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
              title="Attach File/DICOM Image"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <button
              onClick={handleVoiceRecord}
              className={clsx(
                'p-2.5 rounded-xl border transition-all cursor-pointer',
                isRecording ? 'bg-rose-500 text-white border-rose-400 animate-pulse' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              )}
              title="Voice Input Dictation"
            >
              {isRecording ? <Volume2 className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              placeholder={isRecording ? 'Listening for voice dictation...' : 'Ask ArogyaAI Copilot anything about patient triage or epidemic forecasts...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-4 py-2.5 bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-100 light:text-slate-900 text-xs focus:outline-none focus:border-teal-500 font-sans"
            />

            <button
              onClick={() => handleSend()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
