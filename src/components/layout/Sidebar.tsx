import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sun,
  LayoutDashboard,
  Users,
  FileText,
  Package,
  QrCode,
  Wrench,
  ShieldCheck,
  LifeBuoy,
  Globe2,
  History,
  ChevronRight,
  UserCheck,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useStore } from '../../store/useStore';
import { UserRole } from '../../types';

export const Sidebar: React.FC = () => {
  const { currentUser, switchRole } = useAuthStore();
  const { leads, jobs, tickets } = useStore();

  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const activeJobsCount = jobs.filter((j) => j.status === 'scheduled' || j.status === 'in_progress').length;
  const openTicketsCount = tickets.filter((t) => t.status !== 'closed' && t.status !== 'resolved').length;

  const navItems = [
    {
      to: '/dashboard',
      label: 'Director Dashboard',
      icon: LayoutDashboard,
      roles: ['director', 'sales_manager'],
    },
    {
      to: '/leads',
      label: 'Leads & CRM',
      icon: Users,
      badge: newLeadsCount > 0 ? newLeadsCount : undefined,
      badgeColor: 'bg-amber-500 text-white',
      roles: ['director', 'sales_manager', 'sales_rep'],
    },
    {
      to: '/quotes',
      label: 'Quotes & BOM',
      icon: FileText,
      roles: ['director', 'sales_manager', 'sales_rep'],
    },
    {
      to: '/inventory',
      label: 'Inventory & Serials',
      icon: QrCode,
      roles: ['director', 'warehouse', 'sales_manager'],
    },
    {
      to: '/dispatch',
      label: 'Dispatch Manifest',
      icon: Package,
      roles: ['director', 'warehouse'],
    },
    {
      to: '/jobs',
      label: 'Field App (Technician)',
      icon: Wrench,
      badge: activeJobsCount > 0 ? activeJobsCount : undefined,
      badgeColor: 'bg-sky-500 text-white',
      roles: ['director', 'technician', 'sales_manager'],
    },
    {
      to: '/warranties',
      label: 'Warranty Engine',
      icon: ShieldCheck,
      roles: ['director', 'service_agent', 'sales_manager', 'customer'],
    },
    {
      to: '/tickets',
      label: 'Service Tickets',
      icon: LifeBuoy,
      badge: openTicketsCount > 0 ? openTicketsCount : undefined,
      badgeColor: 'bg-rose-500 text-white',
      roles: ['director', 'service_agent', 'technician'],
    },
    {
      to: '/solar-insights',
      label: 'NASA Solar Data',
      icon: Globe2,
      roles: ['director', 'sales_manager', 'sales_rep', 'technician', 'service_agent', 'warehouse', 'customer'],
    },
    {
      to: '/audit-log',
      label: 'Audit Trail',
      icon: History,
      roles: ['director'],
    },
  ];

  const rolesList: { id: UserRole; name: string; label: string }[] = [
    { id: 'director', name: 'Alice (Director)', label: 'Executive' },
    { id: 'sales_rep', name: 'Raj (Sales Rep)', label: 'Sales' },
    { id: 'warehouse', name: 'Suresh (Warehouse)', label: 'Dispatch' },
    { id: 'technician', name: 'Arun (Technician)', label: 'Field PWA' },
    { id: 'service_agent', name: 'Priya (Service)', label: 'Support' },
    { id: 'customer', name: 'Alice Singh (Customer)', label: 'Client' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0 text-slate-700 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200 bg-white">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold shadow-sm transition-transform group-hover:scale-105">
            <Sun className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-base tracking-tight leading-tight">
              SunPower
            </span>
            <span className="text-[10px] uppercase font-semibold text-amber-700 tracking-wider">
              Solutions ERP
            </span>
          </div>
        </NavLink>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Platform Journey
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-50 text-amber-900 border-l-2 border-amber-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 flex-shrink-0 text-slate-500" />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`px-1.5 py-0.5 text-[10px] font-semibold rounded ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Demo Role Switcher (Crucial for Hackathon evaluation) */}
      <div className="p-3 bg-slate-50 border-t border-slate-200">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-amber-600" />
            Switch Demo Role
          </span>
          <span className="text-[10px] px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded font-mono font-medium">
            {currentUser?.role}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {rolesList.map((r) => {
            const isSelected = currentUser?.role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => switchRole(r.id)}
                className={`text-left px-2 py-1.5 rounded text-xs transition-colors flex flex-col ${
                  isSelected
                    ? 'bg-amber-100 border border-amber-400 text-amber-900 font-semibold shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
                title={r.name}
              >
                <span className="truncate">{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
