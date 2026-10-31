import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  Calendar,
  Download,
  AlertCircle,
  Clock,
  Phone,
  FileCheck,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Modal } from '../components/ui/Modal';

export const Warranties: React.FC = () => {
  const { warranties } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedWarranty, setSelectedWarranty] = useState<any | null>(null);

  const filteredWarranties = warranties.filter((w) => {
    const sn = (w.serialNumber || w.serial || '').toLowerCase();
    const cName = (w.customerName || '').toLowerCase();
    const cPhone = w.customerPhone || '';
    const jId = (w.jobId || '').toLowerCase();
    const matchesSearch =
      sn.includes(searchTerm.toLowerCase()) ||
      cName.includes(searchTerm.toLowerCase()) ||
      cPhone.includes(searchTerm) ||
      jId.includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'all' || w.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const activeCount = warranties.filter((w) => w.status === 'active').length;
  const expiringCount = warranties.filter((w) => w.status === 'expiring_soon').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Automatic Warranty Engine
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {activeCount} Active Warranties
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            20-Year Solar Panel Performance Coverage & 2-5 Year Inverter/Battery System Guarantees. Auto-activated on dispatch with serial number binding.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Active Warranties</span>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
              {activeCount}
            </div>
            <span className="text-xs text-slate-400">100% serial verified</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Expiring in &lt; 90 Days</span>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono mt-0.5">
              {expiringCount}
            </div>
            <span className="text-xs text-slate-400">Proactive renewal notice sent</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="card p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Tier-1 Panel Warranties</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono mt-0.5">
              {warranties.filter((w) => w.category === 'panel').length}
            </div>
            <span className="text-xs text-slate-400">Guaranteed 80% output at Year 20</span>
          </div>
          <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-500">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by serial (PAN12345), customer name, phone, or job ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-amber-500 text-slate-800 dark:text-slate-200"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Equipment Types</option>
            <option value="panel">Solar Panels (20 Yrs)</option>
            <option value="inverter">Inverters (2 Yrs)</option>
            <option value="battery">Batteries (5 Yrs)</option>
            <option value="charge_controller">Charge Controllers (2 Yrs)</option>
          </select>
        </div>
      </div>

      {/* Warranties Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Equipment Serial</th>
                <th className="p-4">Customer & Job</th>
                <th className="p-4">Coverage Duration</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">Expiry Date</th>
                <th className="p-4">Warranty Status</th>
                <th className="p-4 text-right">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredWarranties.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4">
                    <div className="font-mono font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-amber-500" />
                      <span>{w.serialNumber}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">{w.productName}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{w.customerName}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{w.customerPhone} • {w.jobId}</div>
                  </td>
                  <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                    {w.warrantyPeriodYears} Years
                  </td>
                  <td className="p-4 font-mono text-slate-500">
                    {new Date(w.startDate).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {new Date(w.endDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={w.status} />
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedWarranty(w)}
                      className="btn-ghost px-2.5 py-1 rounded-lg text-xs font-semibold"
                    >
                      View Cert
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* WARRANTY CERTIFICATE MODAL */}
      {selectedWarranty && (
        <Modal
          isOpen={!!selectedWarranty}
          onClose={() => setSelectedWarranty(null)}
          title={`Certificate of Warranty: ${selectedWarranty.serialNumber}`}
          maxWidth="2xl"
        >
          <div className="p-6 bg-white text-slate-900 rounded-xl space-y-4 border border-slate-200">
            <div className="text-center border-b border-slate-200 pb-4 space-y-1">
              <span className="text-amber-600 font-bold uppercase tracking-widest text-[11px] block">
                Official Manufacturer & Integrator Guarantee
              </span>
              <h2 className="text-xl font-black text-slate-900 font-serif">Certificate of Warranty</h2>
              <p className="text-slate-500 text-xs">SunPower Solutions India • MNRE Rooftop Standards</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Registered Customer:</span>
                <p className="font-bold text-slate-900">{selectedWarranty.customerName}</p>
                <p className="text-slate-600 font-mono">{selectedWarranty.customerPhone}</p>
              </div>
              <div>
                <span className="text-slate-500 block">Serial Number Identifier:</span>
                <p className="font-mono font-bold text-amber-600 text-base">{selectedWarranty.serialNumber}</p>
                <p className="text-slate-600 capitalize">{selectedWarranty.productName}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Warranty Coverage Period:</span>
                <span className="font-bold">{selectedWarranty.warrantyPeriodYears} Years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dispatch / Activation Date:</span>
                <span>{new Date(selectedWarranty.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Valid Through:</span>
                <span className="font-bold text-emerald-700">{new Date(selectedWarranty.endDate).toLocaleDateString()}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Guarantees defect-free operation and minimum 80% photovoltaic power conversion efficiency over 20 years for panels. Inverter and battery replacements under active warranty are provided at ₹0 customer cost.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};
