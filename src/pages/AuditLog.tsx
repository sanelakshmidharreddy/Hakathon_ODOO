import React, { useState } from 'react';
import { History, Shield, Search, Filter } from 'lucide-react';
import { useStore } from '../store/useStore';

export const AuditLogPage: React.FC = () => {
  const { auditLogs } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter((log) => {
    const eType = log.entityType || log.entity || '';
    return (
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-amber-500" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Immutable System Audit Log
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Complete governance trail recording entity state transformations, approvals, dispatches, and warranty activations.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search audit trail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">User & Role</th>
                <th className="p-4">Action Event</th>
                <th className="p-4">Entity Type</th>
                <th className="p-4">Entity Identifier</th>
                <th className="p-4">Changes / Payload</th>
                <th className="p-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 text-slate-400 text-[11px]">
                    {new Date(log.timestamp || log.createdAt || Date.now()).toLocaleString()}
                  </td>
                  <td className="p-4 font-sans">
                    <span className="font-bold text-slate-900 dark:text-white block">{log.userName}</span>
                    <span className="text-[10px] text-slate-400 capitalize">{log.userRole || 'User'}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 uppercase text-slate-500 text-[11px] font-sans font-semibold">
                    {log.entityType || log.entity}
                  </td>
                  <td className="p-4 text-sky-600 dark:text-sky-400 font-bold">{log.entityId}</td>
                  <td className="p-4 text-slate-500 text-[11px] max-w-xs truncate">
                    {log.changes ? JSON.stringify(log.changes) : '—'}
                  </td>
                  <td className="p-4 text-slate-400 text-[11px]">{log.ipAddress || '127.0.0.1'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
