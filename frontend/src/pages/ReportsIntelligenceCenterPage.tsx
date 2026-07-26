import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCommand } from '../context/CommandContext';
import { DownloadCenterModal } from '../components/export/DownloadCenterModal';
import {
  FileText,
  Download,
  Filter,
  Search,
  Sparkles
} from 'lucide-react';
import { clsx } from 'clsx';

interface HealthReport {
  id: string;
  title: string;
  category: 'EPIDEMIC' | 'RESOURCE' | 'WORKFORCE' | 'FINANCIAL' | 'AI_MODEL';
  summary: string;
  generatedDate: string;
  fileSize: string;
  classification: 'CONFIDENTIAL' | 'TOP SECRET' | 'PUBLIC';
  format: 'PDF' | 'EXCEL' | 'DOCX' | 'PPTX';
  pages: number;
}

export const ReportsIntelligenceCenterPage: React.FC = () => {
  const { setActiveModal } = useCommand();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const [isDownloadCenterOpen, setIsDownloadCenterOpen] = useState(false);
  const [activeReportForExport, setActiveReportForExport] = useState<HealthReport | null>(null);

  const reports: HealthReport[] = [
    {
      id: 'REP-2026-001',
      title: 'National Pathogen Outbreak & R0 Reproductive Index Surveillance Report',
      category: 'EPIDEMIC',
      summary: 'Comprehensive analysis of 12 Indian metropolitan hotspots detailing Nipah, Dengue, and Influenza mutation rates and bed saturation forecasts.',
      generatedDate: '2026-07-25',
      fileSize: '4.2 MB',
      classification: 'TOP SECRET',
      format: 'PDF',
      pages: 18
    },
    {
      id: 'REP-2026-002',
      title: 'Autonomous Oxygen & Ventilator Redistribution SLA Compliance Audit',
      category: 'RESOURCE',
      summary: 'Multi-hub logistics audit covering liquid oxygen airlifts, stockout prevention metrics, and inter-depot vehicle tracking.',
      generatedDate: '2026-07-24',
      fileSize: '6.8 MB',
      classification: 'CONFIDENTIAL',
      format: 'EXCEL',
      pages: 12
    },
    {
      id: 'REP-2026-003',
      title: 'Tele-ICU Doctor Burnout & Shift Allocation Optimization Ledger',
      category: 'WORKFORCE',
      summary: 'Weekly shift schedule analysis across apex medical centers (AIIMS, NIMHANS, PGIMER) evaluating fatigue indices and remote stream grants.',
      generatedDate: '2026-07-23',
      fileSize: '3.1 MB',
      classification: 'CONFIDENTIAL',
      format: 'DOCX',
      pages: 8
    },
    {
      id: 'REP-2026-004',
      title: 'ArogyaAI District Healthcare Expenditure & Logistics Savings Brief',
      category: 'FINANCIAL',
      summary: 'Financial return on investment analysis highlighting ₹5.05 Crore in procurement savings via AI supply chain optimization.',
      generatedDate: '2026-07-22',
      fileSize: '5.4 MB',
      classification: 'PUBLIC',
      format: 'PPTX',
      pages: 15
    },
    {
      id: 'REP-2026-005',
      title: 'DeepMind Predictive Engine Model Validation & Accuracy Benchmark',
      category: 'AI_MODEL',
      summary: 'Mathematical accuracy verification of 7D, 30D, and 90D epidemic horizon forecasts with 99.4% SLA validation.',
      generatedDate: '2026-07-21',
      fileSize: '8.1 MB',
      classification: 'TOP SECRET',
      format: 'PDF',
      pages: 24
    }
  ];

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || r.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenExportCenter = (report: HealthReport) => {
    setActiveReportForExport(report);
    setIsDownloadCenterOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 font-sans max-w-[1400px] mx-auto"
    >
      {/* Top Banner */}
      <div className="p-6 rounded-[18px] border border-blue-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 light:from-slate-100 light:to-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[13px] font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-blue-400" />
              CANVA-QUALITY REPORT & DOWNLOAD CENTER
            </span>
            <span className="text-[13px] font-mono text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-md border border-slate-700">
              GOVT CLASSIFIED INTELLIGENCE
            </span>
          </div>

          <h1 className="text-[32px] sm:text-[40px] font-black tracking-tight text-slate-100 light:text-slate-900 leading-none">
            Reports & Health Intelligence Center
          </h1>
          <p className="text-[15px] text-slate-400 light:text-slate-600 leading-relaxed">
            Generate presentation-ready executive briefs, raw Excel workbooks, Word docs, and PowerPoint presentations formatted to Ministry standards.
          </p>
        </div>

        <button
          onClick={() => setActiveModal('report')}
          className="px-5 py-3.5 rounded-[18px] bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-[15px] uppercase tracking-wider flex items-center gap-2.5 shadow-xl shadow-blue-600/20 transition-all cursor-pointer shrink-0 relative z-10"
        >
          <FileText className="w-5 h-5" />
          <span>OPEN EXECUTIVE BRIEFING MODAL</span>
        </button>

        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-[18px] border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-lg">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search intelligence reports by title or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 light:bg-slate-50 border border-slate-800 light:border-slate-300 text-[14px] text-slate-200 light:text-slate-900 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[13px] text-slate-400 mr-1 flex items-center gap-1 font-mono font-medium">
            <Filter className="w-3.5 h-3.5 text-teal-400" /> Category:
          </span>
          {['ALL', 'EPIDEMIC', 'RESOURCE', 'WORKFORCE', 'FINANCIAL', 'AI_MODEL'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={clsx(
                'px-3 py-1.5 text-[13px] font-semibold rounded-xl border transition-all cursor-pointer font-mono',
                categoryFilter === cat
                  ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                  : 'bg-slate-800/60 light:bg-slate-100 text-slate-400 light:text-slate-600 border-slate-700/50 light:border-slate-300 hover:text-slate-200'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
        {filteredReports.map((report) => (
          <motion.div
            key={report.id}
            whileHover={{ y: -2 }}
            className="p-6 rounded-[18px] border border-slate-800 light:border-slate-200 bg-slate-950/80 light:bg-white shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-[13px] font-mono font-bold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-lg border border-teal-500/30 uppercase">
                  {report.category}
                </span>

                <span
                  className={clsx(
                    'text-[12px] font-mono font-bold px-2 py-0.5 rounded border uppercase',
                    report.classification === 'TOP SECRET'
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                      : report.classification === 'CONFIDENTIAL'
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  )}
                >
                  {report.classification}
                </span>
              </div>

              <h3 className="text-[18px] font-bold text-slate-100 light:text-slate-900 leading-snug">
                {report.title}
              </h3>

              <p className="text-[14px] text-slate-400 light:text-slate-600 leading-relaxed">
                {report.summary}
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-800 light:border-slate-200">
              <div className="grid grid-cols-3 gap-2 font-mono text-[13px] text-slate-400 light:text-slate-600">
                <div>
                  <span className="text-[11px] uppercase block text-slate-500">ID</span>
                  <span className="font-bold text-slate-300 light:text-slate-800">{report.id}</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase block text-slate-500">Size</span>
                  <span className="font-bold text-slate-300 light:text-slate-800">{report.fileSize}</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase block text-slate-500">Date</span>
                  <span className="font-bold text-slate-300 light:text-slate-800">{report.generatedDate}</span>
                </div>
              </div>

              <button
                onClick={() => handleOpenExportCenter(report)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-bold text-[14px] uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>OPEN DOWNLOAD CENTER</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Universal Download Center Modal */}
      <DownloadCenterModal
        isOpen={isDownloadCenterOpen}
        onClose={() => setIsDownloadCenterOpen(false)}
        reportTitle={activeReportForExport?.title}
        reportSubtitle={activeReportForExport?.summary}
      />
    </motion.div>
  );
};
