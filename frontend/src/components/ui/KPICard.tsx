import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: {
    value: string;
    isPositive: boolean;
  };
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  change,
  icon: Icon,
  iconBgColor = 'bg-amber-50 dark:bg-amber-950/40',
  iconColor = 'text-amber-500',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`card p-5 relative overflow-hidden transition-all duration-300 hover:shadow-md ${
        onClick ? 'cursor-pointer hover:border-amber-400/50 group' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconBgColor} ${iconColor} transition-transform group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {change && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs">
          <span
            className={`font-semibold mr-1.5 ${
              change.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {change.isPositive ? '↑' : '↓'} {change.value}
          </span>
          <span className="text-slate-500 dark:text-slate-400">vs last month</span>
        </div>
      )}
    </div>
  );
};
