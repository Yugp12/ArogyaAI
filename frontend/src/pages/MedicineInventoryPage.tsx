import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCommand } from '../context/CommandContext';
import { BarcodeScannerModal } from '../components/inventory/BarcodeScannerModal';
import {
  Pill,
  QrCode,
  Search,
  FileSpreadsheet,
  TrendingUp,
  Truck,
  Building2,
  ThermometerSnowflake
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { clsx } from 'clsx';

interface MedicineItem {
  id: string;
  code: string;
  name: string;
  category: string;
  stock: number;
  minThreshold: number;
  unit: string;
  batch: string;
  expiryDate: string;
  expiryDays: number;
  storageTemp: string;
  supplier: string;
  status: 'OPTIMAL' | 'LOW_STOCK' | 'CRITICAL_EXPIRY';
}

export const MedicineInventoryPage: React.FC = () => {
  const { setActiveModal, addNotification } = useCommand();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const mockInventory: MedicineItem[] = [
    {
      id: 'MED-101',
      code: 'GS1-890100',
      name: 'Oseltamivir Phosphate 75mg',
      category: 'Antivirals',
      stock: 45200,
      minThreshold: 15000,
      unit: 'Capsules',
      batch: 'BATCH-OSL-9921',
      expiryDate: '2027-08-15',
      expiryDays: 380,
      storageTemp: '20°C - 25°C',
      supplier: 'Sun Pharmaceutical Ltd',
      status: 'OPTIMAL'
    },
    {
      id: 'MED-102',
      code: 'GS1-890211',
      name: 'Ribavirin 400mg Broad Antiviral',
      category: 'Antivirals',
      stock: 3200,
      minThreshold: 5000,
      unit: 'Vials',
      batch: 'BATCH-RIB-4040',
      expiryDate: '2026-09-10',
      expiryDays: 48,
      storageTemp: '2°C - 8°C (Cold Chain)',
      supplier: 'Dr. Reddy’s Laboratories',
      status: 'LOW_STOCK'
    },
    {
      id: 'MED-103',
      code: 'GS1-890344',
      name: 'Liquid Medical Oxygen (LMO 99.8%)',
      category: 'Medical Gas',
      stock: 142000,
      minThreshold: 100000,
      unit: 'Liters',
      batch: 'TANKER-LMO-881',
      expiryDate: 'Continuous Refill',
      expiryDays: 999,
      storageTemp: '-183°C Cryogenic',
      supplier: 'INOX Air Products',
      status: 'OPTIMAL'
    },
    {
      id: 'MED-104',
      code: 'GS1-890512',
      name: 'Dengue Serotype-5 Vaccine Stock',
      category: 'Vaccines',
      stock: 1850,
      minThreshold: 4000,
      unit: 'Doses',
      batch: 'VAC-DEN5-2026-X',
      expiryDate: '2026-08-20',
      expiryDays: 27,
      storageTemp: '-20°C Deep Freeze',
      supplier: 'Serum Institute of India',
      status: 'CRITICAL_EXPIRY'
    },
    {
      id: 'MED-105',
      code: 'GS1-890677',
      name: 'Dexamethasone 8mg/2ml Injectable',
      category: 'Steroids',
      stock: 28900,
      minThreshold: 10000,
      unit: 'Ampoules',
      batch: 'BATCH-DEX-112',
      expiryDate: '2028-02-10',
      expiryDays: 560,
      storageTemp: '15°C - 25°C',
      supplier: 'Cipla Healthcare',
      status: 'OPTIMAL'
    }
  ];

  const demandForecastData = [
    { day: 'Day 1', actual: 1200, forecast: 1250 },
    { day: 'Day 5', actual: 1800, forecast: 1750 },
    { day: 'Day 10', actual: 2400, forecast: 2500 },
    { day: 'Day 15', actual: 3100, forecast: 3300 },
    { day: 'Day 20', actual: 4200, forecast: 4100 },
    { day: 'Day 25', actual: 5100, forecast: 5300 },
    { day: 'Day 30', actual: 6400, forecast: 6500 },
  ];

  const suppliers = [
    { name: 'Serum Institute of India', location: 'Pune, MH', sla: '24 Hours', compliance: '99.8%', activeOrders: 4 },
    { name: 'Dr. Reddy’s Laboratories', location: 'Hyderabad, TS', sla: '36 Hours', compliance: '99.2%', activeOrders: 2 },
    { name: 'Sun Pharmaceutical Ltd', location: 'Mumbai, MH', sla: '18 Hours', compliance: '99.9%', activeOrders: 6 },
    { name: 'INOX Air Products (LMO)', location: 'Hazira, GJ', sla: '12 Hours', compliance: '100%', activeOrders: 8 }
  ];

  const filteredItems = mockInventory.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = categoryFilter === 'ALL' || item.category === categoryFilter;

    return matchesSearch && matchesCat;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredItems.map(i => i.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
  };

  const handleExportCSV = () => {
    addNotification('EXPORT COMPLETE: Inventory Ledger exported to CSV/Excel format.');
  };

  const handleBulkReorder = () => {
    addNotification(`BULK ACTION: Emergency Reorder initiated for ${selectedIds.length || filteredItems.length} medical items.`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 font-sans"
    >
      <div className="p-5 rounded-3xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 light:text-slate-900 flex items-center gap-2">
            <Pill className="w-5 h-5 text-teal-400" />
            National Pharmaceutical Reserve & Cold-Chain Logistics
          </h1>
          <p className="text-xs text-slate-400 light:text-slate-500 mt-1">
            GS1 Barcode tracking, AI demand forecasting & automated liquid oxygen stockpile triggers
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveModal('barcode')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer font-mono"
          >
            <QrCode className="w-4 h-4" />
            <span>Scan Barcode / QR</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-slate-700 font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-4 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Stock Valued</span>
          <div className="text-2xl font-black text-slate-100 light:text-slate-900">₹42.8 Crore</div>
          <span className="text-[10px] text-teal-400 block">48 apex storage depots</span>
        </div>

        <div className="p-4 rounded-2xl border border-rose-500/30 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Low Stock Alerts</span>
          <div className="text-2xl font-black text-rose-400">2 Items</div>
          <span className="text-[10px] text-rose-400 block">Ribavirin & Vaccine Stock</span>
        </div>

        <div className="p-4 rounded-2xl border border-amber-500/30 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Expiring &lt; 30 Days</span>
          <div className="text-2xl font-black text-amber-400">1,850 Doses</div>
          <span className="text-[10px] text-amber-400 block">Dengue Vaccine Batch X</span>
        </div>

        <div className="p-4 rounded-2xl border border-emerald-500/30 bg-slate-900/80 light:bg-white backdrop-blur-md shadow-xl space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Cold Chain Integrity</span>
          <div className="text-2xl font-black text-emerald-400">99.9%</div>
          <span className="text-[10px] text-emerald-400 block">-20°C to 8°C Monitored</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-5 backdrop-blur-md shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-400" />
                30-Day AI Pharmaceutical Demand & Consumption Forecast
              </h3>
              <p className="text-xs text-slate-400">
                Machine learning predictive replenishment curves based on epidemic R0 trajectory
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
              PharmaML Core
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={demandForecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090d16',
                    borderColor: '#1f2937',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#f8fafc'
                  }}
                />
                <Line type="monotone" dataKey="actual" stroke="#14b8a6" strokeWidth={2.5} name="Actual Consumption" />
                <Line type="monotone" dataKey="forecast" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="AI Forecasted Demand" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-5 backdrop-blur-md shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-teal-400" />
              Medicine Movement Timeline Audit
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">LIVE SYNC</span>
          </div>

          <div className="space-y-3 text-xs font-sans">
            <div className="p-2.5 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px] text-teal-400 font-bold">
                <span>4,000L LMO CRYOGENIC TANKER</span>
                <span>10:20:05</span>
              </div>
              <p className="text-slate-200 light:text-slate-800">Dispatched from Nagpur Depot to Kozhikode Epidemic Command Node.</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px] text-emerald-400 font-bold">
                <span>10,000 OSELTMIVIR CAPSULES</span>
                <span>09:45:12</span>
              </div>
              <p className="text-slate-200 light:text-slate-800">Stock refilled at AIIMS Delhi Command Depot via Sun Pharma convoy.</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px] text-amber-400 font-bold">
                <span>1,850 DENGUE VACCINE DOSES</span>
                <span>08:30:00</span>
              </div>
              <p className="text-slate-200 light:text-slate-800">Cold-chain alert triggered (-20°C re-validation required in Mumbai).</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-5 backdrop-blur-md shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
              <Pill className="w-4 h-4 text-teal-400" />
              National Medical Inventory Ledger
            </h3>
            {selectedIds.length > 0 && (
              <span className="px-2 py-0.5 text-xs font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded">
                {selectedIds.length} Selected
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search medicine or batch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950/60 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-200 light:text-slate-800 focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-950/60 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-200 light:text-slate-800 font-semibold focus:outline-none font-mono"
            >
              <option value="ALL">All Categories</option>
              <option value="Antivirals">Antivirals</option>
              <option value="Medical Gas">Medical Gas (LMO)</option>
              <option value="Vaccines">Vaccines</option>
              <option value="Steroids">Steroids</option>
            </select>

            <button
              onClick={handleBulkReorder}
              className="px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 text-xs font-bold font-mono transition-all cursor-pointer"
            >
              Bulk Reorder
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                <th className="py-3 px-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filteredItems.length && filteredItems.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-slate-700 text-teal-500 focus:ring-teal-400 bg-slate-950"
                  />
                </th>
                <th className="py-3 px-3">Medicine & Code</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Stock Level</th>
                <th className="py-3 px-3">Batch & Expiry</th>
                <th className="py-3 px-3">Cold Chain Temp</th>
                <th className="py-3 px-3">Supplier</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-sans">
              {filteredItems.map((item) => {
                const isSelected = selectedIds.includes(item.id);

                return (
                  <tr key={item.id} className={clsx('hover:bg-slate-800/40 transition-colors', isSelected && 'bg-teal-500/10')}>
                    <td className="py-3 px-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(item.id)}
                        className="rounded border-slate-700 text-teal-500 focus:ring-teal-400 bg-slate-950"
                      />
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-100 light:text-slate-900">{item.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{item.code}</div>
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-teal-400">{item.category}</td>
                    <td className="py-3 px-3 font-mono">
                      <div className="font-bold text-slate-100">{item.stock.toLocaleString()} {item.unit}</div>
                      <div className="text-[10px] text-slate-400">Min Threshold: {item.minThreshold.toLocaleString()}</div>
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <div className="text-slate-200">{item.batch}</div>
                      <div className={clsx('text-[10px] font-bold', item.expiryDays < 30 ? 'text-rose-400' : 'text-slate-400')}>
                        Exp: {item.expiryDate} ({item.expiryDays}d)
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-cyan-400 flex items-center gap-1">
                      <ThermometerSnowflake className="w-3.5 h-3.5 text-cyan-400" />
                      {item.storageTemp}
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-medium">{item.supplier}</td>
                    <td className="py-3 px-3 text-right font-mono">
                      <span
                        className={clsx(
                          'px-2 py-0.5 rounded text-[9px] font-bold border uppercase',
                          item.status === 'OPTIMAL' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                          item.status === 'LOW_STOCK' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                          'bg-rose-500/20 text-rose-400 border-rose-500/30 animate-pulse'
                        )}
                      >
                        {item.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-5 backdrop-blur-md shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-teal-400" />
          Apex Pharmaceutical Suppliers & SLA Tracker
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans text-xs">
          {suppliers.map((sup, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 space-y-2">
              <div className="font-bold text-slate-100 light:text-slate-900">{sup.name}</div>
              <div className="text-[10px] text-slate-400 font-mono">{sup.location}</div>
              <div className="flex items-center justify-between font-mono text-[11px] pt-1 border-t border-slate-800">
                <span>Avg SLA: <strong className="text-teal-400">{sup.sla}</strong></span>
                <span>Compliance: <strong className="text-emerald-400">{sup.compliance}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BarcodeScannerModal />
    </motion.div>
  );
};
