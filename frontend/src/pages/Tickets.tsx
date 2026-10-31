import React, { useState } from 'react';
import {
  LifeBuoy,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Clock,
  User,
  Wrench,
  DollarSign,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { ServiceTicket } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Modal } from '../components/ui/Modal';

export const Tickets: React.FC = () => {
  const { tickets, warranties, serialNumbers, createTicket, updateTicketStatus } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<ServiceTicket | null>(tickets[0] || null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Ticket Form State
  const [ticketForm, setTicketForm] = useState({
    customerName: 'Alice Singh',
    customerPhone: '+91 98401 23456',
    serialNumber: 'INV54321',
    issueType: 'Inverter error code E04 (Grid Overvoltage)',
    description: 'Inverter tripping during midday peak grid feed-in. Generation stops intermittently.',
    priority: 'high' as 'low' | 'medium' | 'high' | 'urgent',
  });

  const [warrantyCheckResult, setWarrantyCheckResult] = useState<any | null>(null);

  const handleSerialCheck = (serial: string) => {
    setTicketForm({ ...ticketForm, serialNumber: serial });
    const matchedWarranty = warranties.find(
      (w) => (w.serialNumber || '').toLowerCase() === serial.trim().toLowerCase()
    );
    if (matchedWarranty) {
      const isExpired = new Date(matchedWarranty.endDate) < new Date();
      setWarrantyCheckResult({
        exists: true,
        isCovered: !isExpired,
        warranty: matchedWarranty,
      });
    } else {
      setWarrantyCheckResult({
        exists: false,
        isCovered: false,
      });
    }
  };

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCovered = warrantyCheckResult ? warrantyCheckResult.isCovered : true;

    const newT = createTicket({
      ticketNumber: `TCK-${Date.now()}`,
      customerId: 'cust-1',
      customerName: ticketForm.customerName,
      customerPhone: ticketForm.customerPhone,
      jobId: 'job-order-1',
      serialNumber: ticketForm.serialNumber,
      equipmentCategory: 'inverter',
      issueType: ticketForm.issueType,
      description: ticketForm.description,
      priority: ticketForm.priority,
      status: 'triaged',
      assignedTechnicianName: 'Arun Kumar',
      isCoveredByWarranty: isCovered,
      laborCharge: isCovered ? 0 : 1500,
      partsCharge: isCovered ? 0 : 8500,
    });

    setSelectedTicket(newT);
    setIsCreateModalOpen(false);
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      (t.ticketNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.serialNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.issueType || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Service Tickets & Warranty Claims
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              {tickets.length} Registered
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Instantly resolve customer complaints by linking faults to verified serial numbers. Free ₹0 replacements for active warranties, automated invoices for expired units.
          </p>
        </div>

        <button
          onClick={() => {
            handleSerialCheck(ticketForm.serialNumber);
            setIsCreateModalOpen(true);
          }}
          className="btn-accent px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Raise Service Ticket</span>
        </button>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Tickets Queue */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Support Queue
            </span>
            <div className="relative w-40">
              <input
                type="text"
                placeholder="Search ticket..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-2 pr-2 py-1 text-[11px] rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              />
            </div>
          </div>

          {filteredTickets.map((t) => {
            const isSelected = selectedTicket?.id === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTicket(t)}
                className={`card p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-amber-500 shadow-md ring-1 ring-amber-500/30 bg-amber-500/5'
                    : 'hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white block">
                      {t.ticketNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {t.customerName}
                    </span>
                  </div>
                  <StatusBadge status={t.status} />
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{t.issueType}</p>

                <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                    SN: {t.serialNumber}
                  </span>
                  {t.isCoveredByWarranty ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Warranty Covered (₹0)
                    </span>
                  ) : (
                    <span className="text-rose-600 dark:text-rose-400 font-semibold text-[11px] flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Chargeable
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Ticket Detail */}
        {selectedTicket ? (
          <div className="lg:col-span-2 card p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                    {selectedTicket.ticketNumber}
                  </h2>
                  <StatusBadge status={selectedTicket.status} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Customer: {selectedTicket.customerName} • {selectedTicket.customerPhone}
                </p>
              </div>

              {/* Status Update Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Update Status:</span>
                <select
                  value={selectedTicket.status}
                  onChange={(e) =>
                    updateTicketStatus(selectedTicket.id, e.target.value as any, 'Status progressed in support triage')
                  }
                  className="input py-1 text-xs font-semibold"
                >
                  <option value="new">New</option>
                  <option value="triaged">Triaged</option>
                  <option value="technician_assigned">Tech Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="waiting_for_part">Waiting For Part</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Warranty Coverage Status Box */}
            <div
              className={`p-4 rounded-2xl border text-xs flex items-center justify-between ${
                selectedTicket.isCoveredByWarranty
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                  : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl ${
                    selectedTicket.isCoveredByWarranty ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                  }`}
                >
                  {selectedTicket.isCoveredByWarranty ? (
                    <ShieldCheck className="w-5 h-5" />
                  ) : (
                    <ShieldAlert className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block text-sm">
                    {selectedTicket.isCoveredByWarranty
                      ? 'Under Active Manufacturer Warranty (₹0 Customer Cost)'
                      : 'Warranty Expired - Chargeable Service'}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    Equipment Serial: {selectedTicket.serialNumber} • Verified in SunPower Database
                  </span>
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-slate-400 text-[10px] block">Customer Billable Total:</span>
                <span
                  className={`font-bold text-base ${
                    selectedTicket.isCoveredByWarranty ? 'text-emerald-600' : 'text-slate-900 dark:text-white'
                  }`}
                >
                  ₹{(selectedTicket.partsCharge + selectedTicket.laborCharge).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Issue Description */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Fault Diagnostics & Symptoms
              </span>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">{selectedTicket.issueType}</p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedTicket.description}
                </p>
              </div>
            </div>

            {/* Assigned Crew & Replacement Serial Binding */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block uppercase font-semibold">Assigned Technician</span>
                <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedTicket.assignedTechnicianName || 'Arun Kumar'}
                </p>
                <p className="text-slate-500">Service Van Unit 2</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block uppercase font-semibold">Replacement Serial Tracking</span>
                <p className="font-mono font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                  {selectedTicket.replacementSerialNumber || 'Pending Dispatch Allocation'}
                </p>
                <p className="text-slate-500">Links to original serial warranty lifecycle</p>
              </div>
            </div>

            {/* Ticket Activity Log */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-3">
                Ticket Audit History
              </span>
              <div className="space-y-3 pl-2 border-l-2 border-slate-200 dark:border-slate-800 text-xs">
                {selectedTicket.updates.map((up) => (
                  <div key={up.id} className="relative pl-4">
                    <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-sky-500 ring-4 ring-white dark:ring-slate-900" />
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Status: {up.status.toUpperCase()}
                    </p>
                    <p className="text-slate-500 text-[11px]">{up.note}</p>
                    <p className="text-slate-400 text-[10px]">
                      {new Date(up.timestamp || up.createdAt || Date.now()).toLocaleString()} • {up.userName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* RAISE SERVICE TICKET MODAL */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Raise Rooftop Solar Service Ticket"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateTicketSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Customer Name</label>
              <input
                type="text"
                value={ticketForm.customerName}
                onChange={(e) => setTicketForm({ ...ticketForm, customerName: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input
                type="tel"
                value={ticketForm.customerPhone}
                onChange={(e) => setTicketForm({ ...ticketForm, customerPhone: e.target.value })}
                className="input"
              />
            </div>
          </div>

          <div>
            <label className="label">Faulty Equipment Serial Number *</label>
            <input
              type="text"
              required
              placeholder="e.g. INV54321, BAT98765, PAN12345"
              value={ticketForm.serialNumber}
              onChange={(e) => handleSerialCheck(e.target.value)}
              className="input font-mono uppercase"
            />
            {warrantyCheckResult && (
              <p
                className={`mt-1 text-[11px] flex items-center gap-1 font-semibold ${
                  warrantyCheckResult.isCovered
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {warrantyCheckResult.isCovered ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Under Warranty: Valid until{' '}
                    {new Date(warrantyCheckResult.warranty.endDate).toLocaleDateString()} (₹0 Replacement)
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Warranty Expired or Unregistered: Standard service charges apply
                  </>
                )}
              </p>
            )}
          </div>

          <div>
            <label className="label">Fault / Issue Summary *</label>
            <input
              type="text"
              required
              value={ticketForm.issueType}
              onChange={(e) => setTicketForm({ ...ticketForm, issueType: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="label">Detailed Field Symptoms</label>
            <textarea
              rows={3}
              value={ticketForm.description}
              onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
              className="input"
            />
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
              Create & Dispatch Ticket
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
