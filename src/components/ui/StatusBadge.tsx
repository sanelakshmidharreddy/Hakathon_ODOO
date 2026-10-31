import React from 'react';

interface StatusBadgeProps {
  status: string;
  type?: 'lead' | 'quote' | 'order' | 'job' | 'warranty' | 'ticket' | 'general';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStyle = () => {
    switch (status.toLowerCase()) {
      // Success / Complete
      case 'converted':
      case 'accepted':
      case 'completed':
      case 'active':
      case 'resolved':
      case 'closed':
      case 'paid':
      case 'in_stock':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800';

      // In progress / Info
      case 'qualified':
      case 'survey_scheduled':
      case 'survey_completed':
      case 'in_progress':
      case 'sent':
      case 'dispatched':
      case 'installed':
      case 'technician_assigned':
      case 'triaged':
        return 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800';

      // Warning / Pending / Attention
      case 'new':
      case 'contacted':
      case 'draft':
      case 'scheduled':
      case 'reserved':
      case 'expiring_soon':
      case 'waiting_for_part':
      case 'partial':
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800';

      // Danger / Lost / Expired
      case 'lost':
      case 'rejected':
      case 'expired':
      case 'replaced':
      case 'overdue':
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800';

      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  const formatText = (text: string) => {
    return text
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStyle()} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-75" />
      {formatText(status)}
    </span>
  );
};
