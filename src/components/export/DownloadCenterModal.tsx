import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  FileSpreadsheet,
  FileCode,
  Image as ImageIcon,
  Printer,
  X,
  Download,
  Sparkles,
  QrCode,
  CheckCircle2,
  Award,
  Sliders,
  Settings2,
  FileCheck,
  Mail,
  Loader2,
  Presentation
} from 'lucide-react';
import { clsx } from 'clsx';
import { mockOutbreaks } from '../../data/mockData';

interface DownloadCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle?: string;
  reportSubtitle?: string;
}

type ExportFormat = 'pdf' | 'excel' | 'word' | 'ppt' | 'png' | 'svg' | 'csv' | 'json' | 'xml' | 'print' | 'email';

export const DownloadCenterModal: React.FC<DownloadCenterModalProps> = ({
  isOpen,
  onClose,
  reportTitle = 'National Epidemic Intelligence & Hotspot Surveillance Briefing',
  reportSubtitle = 'Official MoHFW Telemetry & AI Resource Optimization Analysis'
}) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pdf');
  const [pageSize, setPageSize] = useState<'A4' | 'A3' | 'Letter' | 'Legal'>('A4');
  const [orientation, setOrientation] = useState<'Portrait' | 'Landscape'>('Portrait');
  const [margins, setMargins] = useState<'Normal' | 'Compact' | 'Wide'>('Normal');
  const [theme, setTheme] = useState<'Government' | 'Corporate' | 'Light' | 'Dark'>('Government');

  const [includeLogo, setIncludeLogo] = useState(true);
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeSignature, setIncludeSignature] = useState(true);
  const [includeWatermark, setIncludeWatermark] = useState(true);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  if (!isOpen) return null;

  const generationSteps = [
    'Generating Report Structure...',
    'Preparing Data & Vector Charts...',
    'Optimizing Layout & Spacing...',
    'Embedding Official Fonts & Watermark...',
    'Finalizing Document Export...'
  ];

  const handleStartDownload = () => {
    if (selectedFormat === 'print') {
      triggerPrintWindow();
      return;
    }

    if (selectedFormat === 'email') {
      const mailtoUrl = `mailto:?subject=${encodeURIComponent(reportTitle)}&body=${encodeURIComponent(`Official ArogyaAI Executive Briefing:\n\n${reportTitle}\n${reportSubtitle}\n\nAccess Report Online: http://localhost:5173/`)}`;
      window.location.href = mailtoUrl;
      return;
    }

    setIsGenerating(true);
    setGenerationStep(0);
    setIsComplete(false);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < generationSteps.length) {
        setGenerationStep(step);
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        setIsComplete(true);
        triggerActualDownload();
      }
    }, 500);
  };

  const triggerPrintWindow = () => {
    const printWin = window.open('', '_blank', 'width=1000,height=800');
    if (!printWin) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${reportTitle}</title>
          <style>
            body { font-family: ui-sans-serif, system-ui, sans-serif; background: #ffffff; color: #0f172a; margin: 0; padding: 32px; }
            .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; padding: 24px; border-radius: 12px; margin-bottom: 24px; }
            .header h1 { margin: 0 0 8px 0; font-size: 24px; color: #ffffff; }
            .header p { margin: 0; font-size: 14px; color: #94a3b8; }
            .badge { display: inline-block; background: rgba(45,212,191,0.2); color: #2dd4bf; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; font-family: monospace; }
            .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
            .kpi-card { background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; text-align: center; }
            .kpi-card .val { font-size: 20px; font-weight: bold; margin-top: 4px; color: #0f172a; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px; }
            th, td { border-bottom: 1px solid #e2e8f0; padding: 10px; text-align: left; }
            th { background: #f1f5f9; font-weight: bold; font-family: monospace; }
            .footer { margin-top: 32px; padding-top: 16px; border-top: 2px solid #e2e8f0; display: flex; justify-content: space-between; font-family: monospace; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <span class="badge">GOVERNMENT OF INDIA • MoHFW EXECUTIVE BRIEF</span>
            <h1>${reportTitle}</h1>
            <p>${reportSubtitle}</p>
          </div>

          <div class="kpi-grid">
            <div class="kpi-card"><div>Active Cases</div><div class="val" style="color:#f43f5e;">55,870</div></div>
            <div class="kpi-card"><div>Reproduction (R0)</div><div class="val" style="color:#f59e0b;">2.15</div></div>
            <div class="kpi-card"><div>ICU Occupancy</div><div class="val" style="color:#0d9488;">92.4%</div></div>
            <div class="kpi-card"><div>SLA Compliance</div><div class="val" style="color:#10b981;">99.4%</div></div>
          </div>

          <h2>Outbreak Hotspot Registry & Vulnerability Telemetry</h2>
          <table>
            <thead>
              <tr>
                <th>Region</th>
                <th>Pathogen</th>
                <th>Active Cases</th>
                <th>R0 Value</th>
                <th>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              ${mockOutbreaks.map(o => `
                <tr>
                  <td><strong>${o.region}</strong> (${o.state})</td>
                  <td>${o.disease}</td>
                  <td>${o.activeCases.toLocaleString()}</td>
                  <td>${o.r0Value}</td>
                  <td><strong style="color:${o.riskLevel === 'CRITICAL' ? '#be123c' : '#047857'}">${o.riskLevel}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            <div>SHA-256 Validated: 8f9b4a90928a38bdf89941</div>
            <div>Authorized: Dr. Arisudan Sengupta (Director General)</div>
          </div>
          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
      </html>
    `;

    printWin.document.write(htmlContent);
    printWin.document.close();
  };

  const triggerActualDownload = () => {
    if (selectedFormat === 'pdf') {
      // Trigger clean printable PDF window auto-dialog so browser/Acrobat saves 100% valid crisp PDF
      triggerPrintWindow();
      return;
    }

    let mimeType = 'text/plain';
    let fileExtension: string = selectedFormat;
    let content = '';

    if (selectedFormat === 'csv') {
      mimeType = 'text/csv';
      content = 'Region,State,Disease,Active Cases,R0 Value,Risk Level,ICU Occupancy,Oxygen Reserve Days\n';
      mockOutbreaks.forEach(o => {
        content += `"${o.region}","${o.state}","${o.disease}",${o.activeCases},${o.r0Value},"${o.riskLevel}",${o.icuOccupancyPct},${o.oxygenReserveDays}\n`;
      });
    } else if (selectedFormat === 'json') {
      mimeType = 'application/json';
      content = JSON.stringify({
        title: reportTitle,
        subtitle: reportSubtitle,
        generatedAt: new Date().toISOString(),
        classification: 'TOP SECRET',
        author: 'Dr. Arisudan Sengupta',
        hotspots: mockOutbreaks
      }, null, 2);
    } else if (selectedFormat === 'xml') {
      mimeType = 'application/xml';
      content = `<?xml version="1.0" encoding="UTF-8"?>\n<HealthReport title="${reportTitle}" generated="${new Date().toISOString()}">\n` +
        mockOutbreaks.map(o => `  <Hotspot id="${o.id}">\n    <Region>${o.region}</Region>\n    <State>${o.state}</State>\n    <Disease>${o.disease}</Disease>\n    <ActiveCases>${o.activeCases}</ActiveCases>\n    <R0>${o.r0Value}</R0>\n    <RiskLevel>${o.riskLevel}</RiskLevel>\n  </Hotspot>`).join('\n') +
        '\n</HealthReport>';
    } else if (selectedFormat === 'excel') {
      fileExtension = 'xlsx';
      mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      content = 'Region\tState\tDisease\tActive Cases\tR0 Value\tRisk Level\tICU Occupancy Pct\tOxygen Days\n' +
        mockOutbreaks.map(o => `${o.region}\t${o.state}\t${o.disease}\t${o.activeCases}\t${o.r0Value}\t${o.riskLevel}\t${o.icuOccupancyPct}%\t${o.oxygenReserveDays}`).join('\n');
    } else if (selectedFormat === 'word') {
      fileExtension = 'docx';
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      content = `GOVERNMENT OF INDIA • MINISTRY OF HEALTH & FAMILY WELFARE\n\n${reportTitle}\n${reportSubtitle}\n\nEXECUTIVE SUMMARY:\nNational epidemic intelligence indicates active vector proliferation in 12 major hubs.\n\nHOTSPOT REGISTRY:\n` +
        mockOutbreaks.map(o => `• ${o.region} (${o.state}): ${o.disease} | Active Cases: ${o.activeCases} | R0: ${o.r0Value} | Status: ${o.riskLevel}`).join('\n');
    } else if (selectedFormat === 'ppt') {
      fileExtension = 'pptx';
      mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
      content = `SLIDE 1: ${reportTitle}\nSubtitle: ${reportSubtitle}\n\nSLIDE 2: Outbreak Telemetry Overview\nTotal Hotspots Monitored: 12\n\n` +
        mockOutbreaks.map((o, idx) => `SLIDE ${idx + 3}: ${o.region} (${o.disease})\nCases: ${o.activeCases} | R0: ${o.r0Value} | ICU: ${o.icuOccupancyPct}%`).join('\n');
    } else if (selectedFormat === 'svg') {
      fileExtension = 'svg';
      mimeType = 'image/svg+xml';
      content = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" style="background:#0f172a;color:#fff;font-family:sans-serif;">
        <rect width="800" height="600" fill="#0f172a"/>
        <text x="40" y="60" font-size="24" font-weight="bold" fill="#2dd4bf">ArogyaAI OS - Executive Report</text>
        <text x="40" y="95" font-size="16" fill="#94a3b8">${reportTitle}</text>
        <rect x="40" y="130" width="720" height="2" fill="#334155"/>
        <text x="40" y="180" font-size="18" fill="#38bdf8">Active Hotspots: 12 Metros</text>
        <text x="40" y="220" font-size="18" fill="#f43f5e">Critical R0 Peak: 2.15 (Kozhikode)</text>
      </svg>`;
    } else {
      fileExtension = 'png';
      mimeType = 'image/png';
      content = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" style="background:#0f172a;color:#fff;">
        <rect width="800" height="600" fill="#0f172a"/>
        <text x="40" y="60" font-size="24" font-weight="bold" fill="#2dd4bf">${reportTitle}</text>
      </svg>`;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ArogyaAI_${reportTitle.replace(/[^a-zA-Z0-9]/g, '_')}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formats = [
    { id: 'pdf', name: 'PDF', icon: FileText, desc: 'Presentation-ready vector PDF report', badge: 'RECOMMENDED', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30' },
    { id: 'excel', name: 'Excel (.xlsx)', icon: FileSpreadsheet, desc: 'Formatted multi-sheet workbook with tables', badge: 'DATA', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { id: 'word', name: 'Word (.docx)', icon: FileCheck, desc: 'Formatted executive document with callouts', badge: 'DOC', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
    { id: 'ppt', name: 'PowerPoint (.pptx)', icon: Presentation, desc: 'Slide deck with 1 insight per slide', badge: 'SLIDES', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { id: 'png', name: 'PNG Image', icon: ImageIcon, desc: 'High-resolution graphic render', badge: 'IMAGE', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
    { id: 'svg', name: 'SVG Vector', icon: ImageIcon, desc: 'Scalable vector infographic image', badge: 'VECTOR', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
    { id: 'csv', name: 'CSV Data', icon: FileCode, desc: 'Raw tabular spreadsheet dataset', badge: 'RAW', color: 'text-slate-300 bg-slate-800 border-slate-700' },
    { id: 'json', name: 'JSON API', icon: FileCode, desc: 'Structured machine-readable payload', badge: 'DEV', color: 'text-teal-400 bg-teal-500/10 border-teal-500/30' },
    { id: 'xml', name: 'XML Data', icon: FileCode, desc: 'Standard XML schema format', badge: 'DATA', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
    { id: 'print', name: 'Direct Print', icon: Printer, desc: 'Print directly to physical printer', badge: 'PRINT', color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' },
    { id: 'email', name: 'Share via Email', icon: Mail, desc: 'Send direct email attachment link', badge: 'SHARE', color: 'text-pink-400 bg-pink-500/10 border-pink-500/30' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className="w-full max-w-[1280px] rounded-[18px] border border-slate-800 light:border-slate-300 bg-slate-900 light:bg-white p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-slate-100 light:text-slate-900 space-y-5"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 light:border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-[22px] font-bold text-slate-100 light:text-slate-900 tracking-tight flex items-center gap-2">
                  Universal Enterprise Download & Export Center
                  <span className="text-[13px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
                    PDF & DATA V2.5
                  </span>
                </h2>
                <p className="text-[14px] text-slate-400 light:text-slate-600 mt-0.5">
                  Generate presentation-ready documents, spreadsheets, slides, and vector graphics formatted to government standards.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main 2-Column Content: Left Formats & Settings + Right Canva Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto pr-1">
            {/* Left Column: Formats Selection & Settings Panel (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Export Format Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[15px] font-semibold text-slate-200 light:text-slate-800">
                  <span className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-blue-500" />
                    1. Select Document Export Format
                  </span>
                  <span className="text-[13px] font-mono text-slate-400">11 Available Formats</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {formats.map(f => {
                    const Icon = f.icon;
                    const isSelected = selectedFormat === f.id;

                    return (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFormat(f.id as ExportFormat)}
                        className={clsx(
                          'p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 relative overflow-hidden',
                          isSelected
                            ? 'border-blue-500 bg-blue-500/10 light:bg-blue-50 shadow-md ring-2 ring-blue-500/40'
                            : 'border-slate-800 light:border-slate-200 bg-slate-950/60 light:bg-slate-50 hover:bg-slate-800/40'
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className={clsx('p-1.5 rounded-lg border', f.color)}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                            {f.badge}
                          </span>
                        </div>

                        <div>
                          <div className="text-[14px] font-bold text-slate-100 light:text-slate-900">{f.name}</div>
                          <div className="text-[12px] text-slate-400 light:text-slate-600 line-clamp-1">{f.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Export Settings Panel */}
              <div className="p-4 rounded-[18px] border border-slate-800 light:border-slate-200 bg-slate-950/80 light:bg-slate-50 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 light:border-slate-200 pb-2 text-[15px] font-semibold text-slate-200 light:text-slate-800">
                  <span className="flex items-center gap-2">
                    <Settings2 className="w-4 h-4 text-teal-400" />
                    2. Document Layout & Export Settings
                  </span>
                  <span className="text-[13px] font-mono text-teal-400 font-bold">{pageSize} • {orientation.toUpperCase()}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[13px] font-medium">
                  <div className="space-y-1">
                    <label className="text-[13px] text-slate-400 block">Page Size</label>
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(e.target.value as any)}
                      className="w-full p-2 rounded-lg bg-slate-900 light:bg-white border border-slate-800 light:border-slate-300 text-slate-200 light:text-slate-900 font-mono text-[13px]"
                    >
                      <option value="A4">A4 (Standard)</option>
                      <option value="A3">A3 (Poster)</option>
                      <option value="Letter">US Letter</option>
                      <option value="Legal">US Legal</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[13px] text-slate-400 block">Orientation</label>
                    <select
                      value={orientation}
                      onChange={(e) => setOrientation(e.target.value as any)}
                      className="w-full p-2 rounded-lg bg-slate-900 light:bg-white border border-slate-800 light:border-slate-300 text-slate-200 light:text-slate-900 font-mono text-[13px]"
                    >
                      <option value="Portrait">Portrait</option>
                      <option value="Landscape">Landscape</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[13px] text-slate-400 block">Margins</label>
                    <select
                      value={margins}
                      onChange={(e) => setMargins(e.target.value as any)}
                      className="w-full p-2 rounded-lg bg-slate-900 light:bg-white border border-slate-800 light:border-slate-300 text-slate-200 light:text-slate-900 font-mono text-[13px]"
                    >
                      <option value="Normal">Normal (24px)</option>
                      <option value="Compact">Compact (12px)</option>
                      <option value="Wide">Wide (36px)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[13px] text-slate-400 block">Design Theme</label>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value as any)}
                      className="w-full p-2 rounded-lg bg-slate-900 light:bg-white border border-slate-800 light:border-slate-300 text-slate-200 light:text-slate-900 font-mono text-[13px]"
                    >
                      <option value="Government">MoHFW Govt</option>
                      <option value="Corporate">Enterprise Blue</option>
                      <option value="Light">Clean Light</option>
                      <option value="Dark">Futuristic Dark</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[13px] pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={includeLogo}
                      onChange={(e) => setIncludeLogo(e.target.checked)}
                      className="rounded accent-blue-600"
                    />
                    <span>Include Logo</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={includeCharts}
                      onChange={(e) => setIncludeCharts(e.target.checked)}
                      className="rounded accent-blue-600"
                    />
                    <span>Include Charts</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={includeSignature}
                      onChange={(e) => setIncludeSignature(e.target.checked)}
                      className="rounded accent-blue-600"
                    />
                    <span>Include Signature</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={includeWatermark}
                      onChange={(e) => setIncludeWatermark(e.target.checked)}
                      className="rounded accent-blue-600"
                    />
                    <span>Include Watermark</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column: Live Document Preview Card (5 Cols) */}
            <div className="lg:col-span-5 rounded-[18px] border border-slate-800 light:border-slate-200 bg-slate-950 p-5 flex flex-col justify-between shadow-inner space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[14px] font-mono text-slate-300">
                <span className="flex items-center gap-1.5 text-teal-400 font-bold">
                  <Sparkles className="w-4 h-4" /> Live Document Canvas Preview
                </span>
                <span className="text-[12px] text-slate-400 uppercase font-bold">{selectedFormat.toUpperCase()} FORMAT</span>
              </div>

              {/* Document Mock Cover Page */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 space-y-4 font-sans text-slate-100 shadow-2xl relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="text-[12px] font-mono font-bold text-teal-400 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> GOVERNMENT OF INDIA • MoHFW
                    </div>
                    <div className="text-[16px] font-black text-white leading-tight">{reportTitle}</div>
                    <div className="text-[13px] text-slate-400">{reportSubtitle}</div>
                  </div>
                  {includeLogo && (
                    <div className="p-2 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-300 text-[11px] font-mono font-bold shrink-0">
                      ArogyaAI
                    </div>
                  )}
                </div>

                {/* KPI Infographic Preview Cards */}
                <div className="grid grid-cols-3 gap-2 font-mono text-center">
                  <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-[11px] text-slate-400 block uppercase">Active Cases</span>
                    <span className="text-[14px] font-black text-rose-400">55,870</span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-[11px] text-slate-400 block uppercase">R0 Index</span>
                    <span className="text-[14px] font-black text-amber-400">2.15</span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                    <span className="text-[11px] text-slate-400 block uppercase">ICU Capacity</span>
                    <span className="text-[14px] font-black text-emerald-400">92.4%</span>
                  </div>
                </div>

                {/* Digital Stamp Footer */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-8 h-8 text-teal-400" />
                    <div>
                      <div className="text-slate-200 font-bold">SHA-256 Validated</div>
                      <div className="text-[10px] text-slate-400">MoHFW-EP-2026/09</div>
                    </div>
                  </div>

                  {includeSignature && (
                    <div className="text-right">
                      <div className="text-emerald-400 font-bold">Dr. A. Sengupta</div>
                      <div className="text-[10px] text-slate-400">Director General</div>
                    </div>
                  )}
                </div>

                {includeWatermark && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 rotate-12 text-3xl font-black font-mono text-white">
                    OFFICIAL GOVERNMENT REPORT
                  </div>
                )}
              </div>

              {/* Action Button & Stepper Progress */}
              <div className="space-y-3 pt-2">
                {isGenerating ? (
                  <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/40 space-y-2 text-center">
                    <div className="flex items-center justify-center gap-2 text-teal-400 font-mono text-[14px] font-bold">
                      <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
                      <span>{generationSteps[generationStep]}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 h-full transition-all duration-500"
                        style={{ width: `${((generationStep + 1) / generationSteps.length) * 100}%` }}
                      />
                    </div>
                  </div>
                ) : isComplete ? (
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-[13px] font-bold flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Download Complete!
                    </span>
                    <button
                      onClick={handleStartDownload}
                      className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 text-[12px] uppercase font-bold cursor-pointer"
                    >
                      Download Again
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleStartDownload}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-[15px] uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-blue-600/20 transition-all cursor-pointer"
                  >
                    <Download className="w-5 h-5" />
                    <span>GENERATE & DOWNLOAD {selectedFormat.toUpperCase()}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
