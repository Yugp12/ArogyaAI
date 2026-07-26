import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommand } from '../../context/CommandContext';
import {
  QrCode,
  Scan,
  X,
  CheckCircle2
} from 'lucide-react';

export const BarcodeScannerModal: React.FC = () => {
  const { activeModal, setActiveModal, addNotification } = useCommand();
  const [scanning, setScanning] = useState(true);
  const [scannedItem, setScannedItem] = useState<{ code: string; name: string; batch: string; exp: string; stock: number } | null>(null);

  if (activeModal !== 'barcode') return null;

  const handleSimulateScan = () => {
    setScanning(true);
    setScannedItem(null);
    setTimeout(() => {
      setScanning(false);
      setScannedItem({
        code: 'GTIN-890123456789',
        name: 'Ribavirin 400mg Antiviral Capsules',
        batch: 'BATCH-RIB-2026-09',
        exp: '2027-11-30',
        stock: 14200
      });
      addNotification('BARCODE VERIFIED: Ribavirin 400mg Batch #RIB-2026-09 registered to National Inventory.');
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg rounded-3xl border border-teal-500/40 bg-slate-900 light:bg-white p-6 shadow-2xl space-y-5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100 light:text-slate-900">
                  National Barcode & GS1 QR Scanner
                </h3>
                <p className="text-xs text-slate-400">
                  Optical DICOM & Pharmaceutical GTIN/SSCC Verification
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-800 border border-slate-700 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative h-64 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden">
            <div className="relative w-48 h-48 border-2 border-teal-400 rounded-xl p-3 flex flex-col justify-between shadow-[0_0_30px_rgba(20,184,166,0.3)]">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-teal-300" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-teal-300" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-teal-300" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-teal-300" />

              {scanning && (
                <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_15px_#2dd4bf] animate-scanline" />
              )}
            </div>

            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800 font-mono text-[10px] text-teal-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              CAMERA FEED: 60 FPS • OPTICAL GS1 ACTIVE
            </div>
          </div>

          {scannedItem ? (
            <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> VERIFIED MATCH</span>
                <span>{scannedItem.code}</span>
              </div>
              <div className="text-slate-100 font-bold text-sm font-sans">{scannedItem.name}</div>
              <div className="flex items-center justify-between text-slate-400">
                <span>{scannedItem.batch}</span>
                <span>Exp: {scannedItem.exp}</span>
              </div>
              <div className="text-teal-300 font-bold">Available Reserve: {scannedItem.stock.toLocaleString()} Units</div>
            </div>
          ) : (
            <div className="text-center text-xs text-slate-400 font-mono">
              Align Barcode or QR Code within the viewfinder frame to scan.
            </div>
          )}

          <button
            onClick={handleSimulateScan}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
          >
            <Scan className="w-4 h-4" />
            <span>TRIGGER LASER BARCODE SCAN</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
