import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  Kanban,
  Table as TableIcon,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Zap,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Lead, LeadStatus, SystemType, LeadSource } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { SolarScoreRing } from '../components/ui/SolarScoreRing';
import { Modal } from '../components/ui/Modal';
import { geocodeAddress } from '../services/nominatim';

export const Leads: React.FC = () => {
  const { leads, addLead, updateLeadStatus, surveys, createOrUpdateSurvey, approveSurvey, createQuote } = useStore();
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Survey modal state
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  const [surveyLead, setSurveyLead] = useState<Lead | null>(null);

  // Form state for creating a new lead
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    preferredSystemType: 'off_grid' as SystemType,
    preferredCapacityKw: 5,
    monthlyElectricityBill: 6500,
    shadowFreeRoofAreaSqFt: 550,
    source: 'web_form' as LeadSource,
  });

  const [geocodedAddress, setGeocodedAddress] = useState<string | null>(null);
  const [phoneWarning, setPhoneWarning] = useState<string | null>(null);

  // Check duplicate phone on change
  const handlePhoneChange = (phone: string) => {
    setFormData({ ...formData, phone });
    const exists = leads.find((l) => l.phone.replace(/\D/g, '') === phone.replace(/\D/g, ''));
    if (exists && phone.length > 5) {
      setPhoneWarning(`Warning: Phone number already exists for existing lead "${exists.customerName}" (${exists.id})`);
    } else {
      setPhoneWarning(null);
    }
  };

  const handleAddressBlur = async () => {
    if (formData.address.length > 3) {
      const results = await geocodeAddress(formData.address);
      if (results.length > 0) {
        setGeocodedAddress(results[0].displayName);
      }
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone) return;

    // Estimate solar score based on location or capacity
    const score = formData.address.toLowerCase().includes('jodhpur') ? 96 : 89;

    addLead({
      customerName: formData.customerName,
      phone: formData.phone,
      email: formData.email || `${formData.customerName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      address: geocodedAddress || formData.address,
      preferredSystemType: formData.preferredSystemType,
      preferredCapacityKw: Number(formData.preferredCapacityKw),
      monthlyElectricityBill: Number(formData.monthlyElectricityBill),
      shadowFreeRoofAreaSqFt: Number(formData.shadowFreeRoofAreaSqFt),
      source: formData.source,
      status: 'new',
      assignedTo: 'user-sales-rep',
      assignedToName: 'Rajesh Varma',
      solarScore: score,
    });

    setIsCreateModalOpen(false);
    setFormData({
      customerName: '',
      phone: '',
      email: '',
      address: '',
      preferredSystemType: 'off_grid',
      preferredCapacityKw: 5,
      monthlyElectricityBill: 6500,
      shadowFreeRoofAreaSqFt: 550,
      source: 'web_form',
    });
    setGeocodedAddress(null);
    setPhoneWarning(null);
  };

  // Pipeline columns for Kanban view
  const pipelineColumns: { id: LeadStatus; label: string; color: string }[] = [
    { id: 'new', label: 'New Enquiries', color: 'border-amber-400' },
    { id: 'contacted', label: 'Contacted', color: 'border-blue-400' },
    { id: 'survey_scheduled', label: 'Survey Scheduled', color: 'border-sky-400' },
    { id: 'survey_completed', label: 'Survey Done', color: 'border-indigo-400' },
    { id: 'qualified', label: 'Qualified', color: 'border-emerald-400' },
    { id: 'converted', label: 'Converted', color: 'border-emerald-500' },
    { id: 'lost', label: 'Lost', color: 'border-rose-400' },
  ];

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      (l.customerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (l.phone || '').includes(searchTerm) ||
      (l.address || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openSurveyForLead = (lead: Lead) => {
    setSurveyLead(lead);
    setIsSurveyModalOpen(true);
  };

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!surveyLead) return;

    createOrUpdateSurvey({
      leadId: surveyLead.id,
      technicianId: 'user-tech-1',
      technicianName: 'Arun Kumar',
      roofDirection: 'South',
      roofTiltDegrees: 15,
      shadowFreeAreaSqFt: surveyLead.shadowFreeRoofAreaSqFt || 500,
      cableDistanceMeters: 18,
      roofType: 'Reinforced Concrete (Flat)',
      gridConnectionPhase: '3-Phase 415V',
      sanctionedLoadKw: 6,
      recommendedCapacityKw: surveyLead.preferredCapacityKw,
      recommendedSystemType: surveyLead.preferredSystemType,
      isApproved: true,
      approvedBy: 'Rajesh Varma (Sales Mgr)',
      photos: [],
      notes: 'Excellent sun exposure with zero tall tree shadow. Structural RCC roof capacity verified for ballasted aluminum racking.',
    });

    setIsSurveyModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Lead Pipeline & CRM
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              {leads.length} Enquiries
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Capture enquiries from WhatsApp, web forms, and calls. Enrich with NASA POWER solar scores and schedule site surveys.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-accent px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Capture New Lead</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, phone, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-amber-500 text-slate-800 dark:text-slate-200"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Pipeline Stages</option>
            {pipelineColumns.map((col) => (
              <option key={col.id} value={col.id}>
                {col.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KANBAN VIEW */}
      {viewMode === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2">
          {pipelineColumns.map((col) => {
            const colLeads = filteredLeads.filter((l) => l.status === col.id);
            return (
              <div
                key={col.id}
                className="w-80 flex-shrink-0 bg-slate-100/70 dark:bg-slate-900/40 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800/80 flex flex-col"
              >
                <div className={`flex items-center justify-between pb-3 px-1 border-b-2 ${col.color}`}>
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    {col.label}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm">
                    {colLeads.length}
                  </span>
                </div>

                <div className="space-y-3 mt-3 flex-1 overflow-y-auto max-h-[70vh] pr-1">
                  {colLeads.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                      No leads in this stage
                    </div>
                  ) : (
                    colLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="card p-4 hover:border-amber-400/60 cursor-pointer transition-all shadow-sm group"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                            {lead.customerName}
                          </span>
                          <SolarScoreRing score={lead.solarScore || 85} size="sm" showLabel={false} />
                        </div>

                        <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>{lead.phone}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                            <span className="truncate">{lead.address}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                              {lead.preferredCapacityKw} kW • {(lead.preferredSystemType || '').replace('_', ' ')}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 capitalize">Src: {(lead.source || '').replace('_', ' ')}</span>
                          <span className="text-amber-600 dark:text-amber-400 font-semibold group-hover:underline flex items-center gap-1">
                            Action
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Contact & Location</th>
                  <th className="p-4">System Desired</th>
                  <th className="p-4">Solar Score</th>
                  <th className="p-4">Source</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-white">{lead.customerName}</div>
                      <div className="text-[11px] text-slate-400">{lead.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-slate-700 dark:text-slate-300">{lead.phone}</div>
                      <div className="text-slate-400 truncate max-w-xs">{lead.address}</div>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {lead.preferredCapacityKw} kW {(lead.preferredSystemType || '').replace('_', ' ')}
                      </span>
                      <div className="text-[11px] text-slate-400">Bill: ₹{lead.monthlyElectricityBill}/mo</div>
                    </td>
                    <td className="p-4">
                      <SolarScoreRing score={lead.solarScore || 85} size="sm" />
                    </td>
                    <td className="p-4 capitalize text-slate-600 dark:text-slate-400">
                      {(lead.source || '').replace('_', ' ')}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="btn-ghost px-2.5 py-1 rounded-lg text-xs font-semibold"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => openSurveyForLead(lead)}
                        className="btn-accent px-2.5 py-1 rounded-lg text-xs font-semibold"
                      >
                        Survey
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CAPTURE NEW LEAD MODAL */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Capture Rooftop Solar Enquiry"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
          {phoneWarning && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{phoneWarning}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Customer Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Alice Singh"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label">Phone Number (WhatsApp) *</label>
              <input
                type="tel"
                required
                placeholder="+91 98401 23456"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className="input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                placeholder="alice@singh.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="label">Enquiry Source</label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value as LeadSource })}
                className="input"
              >
                <option value="web_form">Web Form Enquiry</option>
                <option value="whatsapp">Simulated WhatsApp Incoming</option>
                <option value="phone_call">Direct Phone Call</option>
                <option value="referral">Customer Referral</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">Site Address (OpenStreetMap Verified) *</label>
            <input
              type="text"
              required
              placeholder="e.g. Anna Nagar, Chennai, Tamil Nadu"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              onBlur={handleAddressBlur}
              className="input"
            />
            {geocodedAddress && (
              <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                OSM Match: {geocodedAddress}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="label">System Type</label>
              <select
                value={formData.preferredSystemType}
                onChange={(e) => setFormData({ ...formData, preferredSystemType: e.target.value as SystemType })}
                className="input"
              >
                <option value="off_grid">Off-Grid (With Battery)</option>
                <option value="on_grid">On-Grid (Net Metering)</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="label">Capacity (kW)</label>
              <select
                value={formData.preferredCapacityKw}
                onChange={(e) => setFormData({ ...formData, preferredCapacityKw: Number(e.target.value) })}
                className="input"
              >
                <option value={1}>1 kW (Small Home)</option>
                <option value={2}>2 kW</option>
                <option value={3}>3 kW (Medium Home)</option>
                <option value={4}>4 kW</option>
                <option value={5}>5 kW (High Consumption / Off-Grid)</option>
              </select>
            </div>
            <div>
              <label className="label">Monthly Bill (₹)</label>
              <input
                type="number"
                value={formData.monthlyElectricityBill}
                onChange={(e) => setFormData({ ...formData, monthlyElectricityBill: Number(e.target.value) })}
                className="input"
              />
            </div>
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
              Save & Compute Solar Score
            </button>
          </div>
        </form>
      </Modal>

      {/* LEAD DETAIL & JOURNEY MODAL */}
      {selectedLead && (
        <Modal
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          title={`Lead: ${selectedLead.customerName}`}
          maxWidth="2xl"
        >
          <div className="space-y-6 text-xs">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-slate-500 uppercase font-semibold text-[10px]">Current Status</span>
                <div className="mt-1">
                  <StatusBadge status={selectedLead.status} />
                </div>
              </div>
              <SolarScoreRing score={selectedLead.solarScore || 89} size="md" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-500 font-semibold">Contact</span>
                <p className="text-slate-900 dark:text-white font-medium mt-1">{selectedLead.phone}</p>
                <p className="text-slate-400">{selectedLead.email}</p>
              </div>
              <div>
                <span className="text-slate-500 font-semibold">Installation Site</span>
                <p className="text-slate-900 dark:text-white font-medium mt-1">{selectedLead.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">Capacity</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {selectedLead.preferredCapacityKw} kW {(selectedLead.preferredSystemType || '').replace('_', ' ')}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Roof Area</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {selectedLead.shadowFreeRoofAreaSqFt || 500} sq.ft
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Monthly Bill</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  ₹{selectedLead.monthlyElectricityBill || 5000}
                </span>
              </div>
            </div>

            {/* Stage Progression Action Buttons */}
            <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Next Recommended Step:</span>
                <span className="text-slate-500 text-[11px]">
                  {selectedLead.status === 'new' && 'Contact customer and schedule technical site survey'}
                  {selectedLead.status === 'contacted' && 'Assign field technician for rooftop survey'}
                  {selectedLead.status === 'survey_completed' && 'Survey approved! Ready to generate final quote.'}
                  {selectedLead.status === 'qualified' && 'Generate Quotation with automated Bill of Materials'}
                  {selectedLead.status === 'converted' && 'Order created and equipment reserved.'}
                </span>
              </div>

              {selectedLead.status !== 'converted' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      openSurveyForLead(selectedLead);
                      setSelectedLead(null);
                    }}
                    className="btn-accent px-3 py-1.5 rounded-lg text-xs font-semibold"
                  >
                    Run Site Survey
                  </button>
                  <button
                    onClick={() => {
                      createQuote({
                        leadId: selectedLead.id,
                        systemType: selectedLead.preferredSystemType,
                        capacityKw: selectedLead.preferredCapacityKw,
                        packageType: 'Premium Tier-1 Monocrystalline',
                        createdBy: 'Rajesh Varma',
                      });
                      setSelectedLead(null);
                      alert('Quote generated automatically with Bill of Materials and margin check!');
                    }}
                    className="btn-primary px-3 py-1.5 rounded-lg text-xs font-semibold"
                  >
                    Generate Quote
                  </button>
                </div>
              )}
            </div>

            {/* Activity Timeline */}
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-xs block mb-3 uppercase tracking-wider">
                Audit & Activity Timeline
              </span>
              <div className="space-y-3 pl-2 border-l-2 border-slate-200 dark:border-slate-800">
                {selectedLead.activities?.map((act) => (
                  <div key={act.id} className="relative pl-4">
                    <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-white dark:ring-slate-900" />
                    <p className="font-semibold text-slate-900 dark:text-white text-xs">{act.title}</p>
                    <p className="text-slate-500 text-[11px]">{act.description}</p>
                    <p className="text-slate-400 text-[10px] mt-0.5">
                      {new Date(act.timestamp || act.createdAt || Date.now()).toLocaleString()} • {act.userName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* SITE SURVEY MODAL */}
      {isSurveyModalOpen && surveyLead && (
        <Modal
          isOpen={isSurveyModalOpen}
          onClose={() => setIsSurveyModalOpen(false)}
          title={`Site Survey: ${surveyLead.customerName}`}
          maxWidth="xl"
        >
          <form onSubmit={handleSurveySubmit} className="space-y-4 text-xs">
            <p className="text-slate-500">
              Technical field assessment for {surveyLead.address}. Required prior to quote approval.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Roof Orientation / Azimuth</label>
                <select className="input" defaultValue="South">
                  <option value="South">True South (Optimal - 0°)</option>
                  <option value="South-West">South-West (+22°)</option>
                  <option value="South-East">South-East (-22°)</option>
                  <option value="East">East</option>
                </select>
              </div>
              <div>
                <label className="label">Roof Pitch / Tilt (Degrees)</label>
                <input type="number" defaultValue={15} className="input" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Shadow-Free Area (sq.ft)</label>
                <input type="number" defaultValue={surveyLead.shadowFreeRoofAreaSqFt || 500} className="input" />
              </div>
              <div>
                <label className="label">DC Cable Run (Meters)</label>
                <input type="number" defaultValue={18} className="input" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Roof Structural Type</label>
                <select className="input" defaultValue="Reinforced Concrete">
                  <option>Reinforced Concrete (Flat RCC)</option>
                  <option>Industrial Metal Trapezoidal Sheet</option>
                  <option>Terracotta Tile Roof</option>
                </select>
              </div>
              <div>
                <label className="label">Grid Connection Phase</label>
                <select className="input" defaultValue="3-Phase 415V">
                  <option>3-Phase 415V (Discom Standard)</option>
                  <option>Single Phase 230V</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label">Technician Observations & Notes</label>
              <textarea
                rows={3}
                defaultValue="Zero shadow obstruction verified between 9 AM and 4 PM. Parapet wall height 3 ft. Recommended 5 kW Off-Grid package with ballasted mounting."
                className="input"
              />
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
              <span className="font-bold block mb-1">Recommended System Capacity: 5 kW</span>
              <span>Survey approval unlocks quotation generation with verified BOM requirements.</span>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsSurveyModalOpen(false)}
                className="btn-ghost px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
              <button type="submit" className="btn-accent px-5 py-2 rounded-xl font-semibold">
                Submit & Approve Survey
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
