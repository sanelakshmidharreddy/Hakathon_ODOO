import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  Download,
  Eye,
  Printer,
  Package,
  Shield,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Quote, SystemType } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Modal } from '../components/ui/Modal';

export const Quotes: React.FC = () => {
  const { quotes, leads, createQuote, acceptQuote } = useStore();
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(quotes[0] || null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // New quote form state
  const [formState, setFormState] = useState({
    leadId: leads[0]?.id || '',
    systemType: 'off_grid' as SystemType,
    capacityKw: 5,
    packageType: 'Tier-1 Mono PERC 540W & Hybrid Pure Sine',
    discountPercent: 2,
    advancePercent: 20,
  });

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const newQuote = createQuote({
      leadId: formState.leadId,
      systemType: formState.systemType,
      capacityKw: formState.capacityKw,
      packageType: formState.packageType,
      discountPercent: formState.discountPercent,
      advancePercent: formState.advancePercent,
      createdBy: 'Rajesh Varma (Sales Mgr)',
    });
    setSelectedQuote(newQuote);
    setIsCreateModalOpen(false);
  };

  const handleAccept = (quoteId: string) => {
    const order = acceptQuote(quoteId, 'Alice Singh (Customer)');
    alert(`Quote Accepted! Sales Order ${order.orderNumber} created. Equipment serial numbers reserved in warehouse!`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Quote Builder & BOM Configurator
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              {quotes.length} Generated
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Template-driven quotation engine with automatic Bill of Materials, minimum 20% gross margin safeguard, and instant order conversion.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-accent px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Configure New Quote</span>
        </button>
      </div>

      {/* Main 2-Column Layout: Quote List on Left, Active Quote Details / BOM on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quotes List */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Quotation Pipeline
          </div>
          {quotes.map((q) => {
            const isSelected = selectedQuote?.id === q.id;
            const lead = leads.find((l) => l.id === q.leadId);
            return (
              <div
                key={q.id}
                onClick={() => setSelectedQuote(q)}
                className={`card p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-amber-500 shadow-md ring-1 ring-amber-500/30 bg-amber-500/5'
                    : 'hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white block">
                      {q.quoteNumber} (v{q.version})
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {lead?.customerName || 'Alice Singh'}
                    </span>
                  </div>
                  <StatusBadge status={q.status} />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white font-mono">
                    ₹{q.totalAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {q.marginPercentage}% Margin
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Quote Deep Dive with BOM */}
        {selectedQuote ? (
          <div className="lg:col-span-2 card p-6 space-y-6">
            {/* Quote Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white font-mono">
                    {selectedQuote.quoteNumber}
                  </h2>
                  <StatusBadge status={selectedQuote.status} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  System: {selectedQuote.capacityKw} kW {selectedQuote.systemType.replace('_', ' ')} • Package: {selectedQuote.packageType}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPdfModalOpen(true)}
                  className="btn-ghost px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview PDF</span>
                </button>
                {selectedQuote.status === 'sent' && (
                  <button
                    onClick={() => handleAccept(selectedQuote.id)}
                    className="btn-accent px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Accept & Convert to Order</span>
                  </button>
                )}
              </div>
            </div>

            {/* Margin Health Bar */}
            <div
              className={`p-4 rounded-2xl flex items-center justify-between text-xs border ${
                selectedQuote.marginPercentage >= 20
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                  : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl ${
                    selectedQuote.marginPercentage >= 20 ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    Gross Margin: {selectedQuote.marginPercentage}% (₹{selectedQuote.grossMargin.toLocaleString('en-IN')})
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Total Equipment & Labor Cost: ₹{selectedQuote.totalCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {selectedQuote.marginPercentage < 20 && (
                <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Below 20% Threshold! Director Approval Required</span>
                </div>
              )}
            </div>

            {/* Automatic Bill of Materials (BOM) Table */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Automated Bill of Materials (BOM)
                </h3>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  All Core Components Verified
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
                    <tr>
                      <th className="p-3">Component / Description</th>
                      <th className="p-3">Category</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3 text-right">Unit Price</th>
                      <th className="p-3 text-right">Total (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {selectedQuote.items.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                        <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                          {item.productName}
                        </td>
                        <td className="p-3 capitalize text-slate-500">{item.category.replace('_', ' ')}</td>
                        <td className="p-3 text-center font-mono font-bold">{item.quantity}</td>
                        <td className="p-3 text-right font-mono text-slate-500">
                          ₹{item.unitPrice.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                          ₹{item.totalPrice.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Financial Summary Calculation */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal (Equipment + Turnkey Installation):</span>
                <span className="font-mono">₹{selectedQuote.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Special Promotional Discount:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">
                  - ₹{selectedQuote.discountAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>GST (12% MNRE Standard for Rooftop Solar):</span>
                <span className="font-mono">₹{selectedQuote.taxAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-sm font-bold text-slate-900 dark:text-white">
                <span>Total Quotation Payable:</span>
                <span className="font-mono text-amber-600 dark:text-amber-400">
                  ₹{selectedQuote.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                <span>Advance Payment Required (20% to Reserve Inventory):</span>
                <span className="font-mono font-bold">₹{selectedQuote.advanceAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* CONFIGURE NEW QUOTE MODAL */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Configure New Solar Quote"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateQuote} className="space-y-4 text-xs">
          <div>
            <label className="label">Select Customer / Lead *</label>
            <select
              value={formState.leadId}
              onChange={(e) => setFormState({ ...formState, leadId: e.target.value })}
              className="input"
            >
              {leads.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.customerName} - {l.preferredCapacityKw}kW {l.preferredSystemType} ({l.address})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">System Architecture</label>
              <select
                value={formState.systemType}
                onChange={(e) => setFormState({ ...formState, systemType: e.target.value as SystemType })}
                className="input"
              >
                <option value="off_grid">Off-Grid (Panels + Inverter + Lithium Battery)</option>
                <option value="on_grid">On-Grid (Net Metering Discom Sync)</option>
              </select>
            </div>
            <div>
              <label className="label">Capacity Rating (kW)</label>
              <select
                value={formState.capacityKw}
                onChange={(e) => setFormState({ ...formState, capacityKw: Number(e.target.value) })}
                className="input"
              >
                <option value={1}>1 kW</option>
                <option value={2}>2 kW</option>
                <option value={3}>3 kW</option>
                <option value={4}>4 kW</option>
                <option value={5}>5 kW</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">Equipment Package Specification</label>
            <input
              type="text"
              value={formState.packageType}
              onChange={(e) => setFormState({ ...formState, packageType: e.target.value })}
              className="input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Discount Applied (%)</label>
              <input
                type="number"
                value={formState.discountPercent}
                onChange={(e) => setFormState({ ...formState, discountPercent: Number(e.target.value) })}
                className="input"
              />
            </div>
            <div>
              <label className="label">Advance Deposit (%)</label>
              <input
                type="number"
                value={formState.advancePercent}
                onChange={(e) => setFormState({ ...formState, advancePercent: Number(e.target.value) })}
                className="input"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
            <span className="font-bold block mb-1">Automated Cost Protection:</span>
            <span>BOM will be built automatically with zero missing components. Quotes maintaining ≥ 20% margin are instantly ready for customer dispatch.</span>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="btn-ghost px-4 py-2 rounded-xl"
            >
              Cancel
            </button>
            <button type="submit" className="btn-accent px-5 py-2 rounded-xl font-semibold">
              Generate Quote & BOM
            </button>
          </div>
        </form>
      </Modal>

      {/* PDF PREVIEW MODAL */}
      {isPdfModalOpen && selectedQuote && (
        <Modal
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
          title={`Official Quotation: ${selectedQuote.quoteNumber}`}
          maxWidth="3xl"
        >
          <div className="bg-white text-slate-900 p-8 rounded-xl shadow-inner space-y-6 text-xs font-sans print:p-0">
            {/* PDF Header */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-bold text-amber-600">SunPower Solutions India</h2>
                <p className="text-slate-500">Government MNRE Certified Rooftop Solar Integrator</p>
                <p className="text-slate-500">GSTIN: 33AAACS1234F1Z5 • support@sunpowersolutions.in</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold font-mono text-slate-800 block">
                  {selectedQuote.quoteNumber}
                </span>
                <span className="text-slate-500">Date: {new Date(selectedQuote.createdAt).toLocaleDateString()}</span>
                <p className="text-slate-500">Valid Until: {new Date(selectedQuote.validUntil).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Bill To */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-bold text-slate-700 block">Customer Information:</span>
                <p className="font-semibold text-slate-900">Alice Singh</p>
                <p className="text-slate-600">Anna Nagar, Chennai, Tamil Nadu</p>
                <p className="text-slate-600">+91 98401 23456</p>
              </div>
              <div>
                <span className="font-bold text-slate-700 block">System Engineering Scope:</span>
                <p className="text-slate-900 font-semibold">{selectedQuote.capacityKw} kW {selectedQuote.systemType.replace('_', ' ')} System</p>
                <p className="text-slate-600">Tier-1 540W Monocrystalline Panels (20-Yr Warranty)</p>
                <p className="text-slate-600">5 kVA Pure Sine Wave Inverter + 5kWh Battery Bank</p>
              </div>
            </div>

            {/* PDF Table */}
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2 border-r border-slate-200">Item Description</th>
                  <th className="p-2 border-r border-slate-200 text-center">Qty</th>
                  <th className="p-2 border-r border-slate-200 text-right">Rate (₹)</th>
                  <th className="p-2 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {selectedQuote.items.map((it) => (
                  <tr key={it.id} className="border-b border-slate-100">
                    <td className="p-2 border-r border-slate-100 font-medium">{it.productName}</td>
                    <td className="p-2 border-r border-slate-100 text-center font-mono">{it.quantity}</td>
                    <td className="p-2 border-r border-slate-100 text-right font-mono">₹{it.unitPrice.toLocaleString('en-IN')}</td>
                    <td className="p-2 text-right font-mono font-bold">₹{it.totalPrice.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PDF Totals */}
            <div className="flex justify-end">
              <div className="w-72 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span>₹{selectedQuote.subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Discount:</span>
                  <span>-₹{selectedQuote.discountAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST (12%):</span>
                  <span>₹{selectedQuote.taxAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount:</span>
                  <span className="text-amber-600">₹{selectedQuote.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* PDF Footer / Signatures */}
            <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-[10px] text-slate-500">
              <div>
                <p>Terms: 20% advance booking, 60% on material dispatch, 20% after commissioning.</p>
                <p>Includes 20 years on panels, 2 years on inverter, 5 years on lithium battery.</p>
              </div>
              <div className="text-center">
                <div className="w-32 border-b border-slate-400 mb-1" />
                <span>Authorized Signatory</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
