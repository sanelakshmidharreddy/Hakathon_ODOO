import React, { useState } from 'react';
import {
  Package,
  QrCode,
  CheckCircle2,
  Truck,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileCheck,
  Calendar,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { StatusBadge } from '../components/ui/StatusBadge';

export const Dispatch: React.FC = () => {
  const { orders, serialNumbers, dispatches, dispatchOrder, warranties } = useStore();
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');
  const [scannedSerials, setScannedSerials] = useState<string[]>([]);
  const [inputSerial, setInputSerial] = useState('');
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  const activeOrder = orders.find((o) => o.id === selectedOrderId);

  // High-value serials reserved for this order or available
  const reservedSerials = serialNumbers.filter(
    (s) => s.reservedForOrderId === selectedOrderId || (s.status === 'in_stock' && s.category === 'panel')
  );

  const handleAddScan = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputSerial.trim().toUpperCase();
    if (!clean) return;

    const matched = serialNumbers.find((s) => s.serialNumber.toUpperCase() === clean);
    if (!matched) {
      setScanMessage(`Error: Serial "${clean}" does not exist in inventory.`);
      return;
    }

    if (scannedSerials.includes(matched.id)) {
      setScanMessage(`Warning: Serial "${clean}" has already been scanned in this manifest.`);
      return;
    }

    setScannedSerials([...scannedSerials, matched.id]);
    setInputSerial('');
    setScanMessage(`Verified: ${matched.serialNumber} (${matched.productName})`);
  };

  const handleExecuteDispatch = () => {
    if (!activeOrder) return;
    if (scannedSerials.length === 0) {
      alert('Please scan or select equipment serial numbers before authorizing dispatch.');
      return;
    }

    const disp = dispatchOrder(activeOrder.id, 'user-tech-1', scannedSerials, 'Suresh Patel (Warehouse Head)');
    alert(
      `Dispatch Manifest ${disp.dispatchNumber} authorized!\n` +
      `✓ All items marked Dispatched.\n` +
      `✓ Automatic Warranty Engine activated: ${scannedSerials.length} warranties initialized.\n` +
      `✓ Field installation job generated for technician Arun Kumar.`
    );
    setScannedSerials([]);
    setScanMessage(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Warehouse Dispatch & Serial Manifest
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Auto-Warranty Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Scan and verify every equipment serial before truck rollout. Dispatch confirmation triggers automatic warranty start dates.
          </p>
        </div>
      </div>

      {/* Dispatch Execution Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Selector & Summary */}
        <div className="card p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            1. Select Confirmed Order
          </h2>

          <select
            value={selectedOrderId}
            onChange={(e) => {
              setSelectedOrderId(e.target.value);
              setScannedSerials([]);
            }}
            className="input"
          >
            {orders.map((o) => (
              <option key={o.id} value={o.id}>
                {o.orderNumber} - {o.customerName} ({o.capacityKw}kW {(o.systemType || '').replace('_', ' ')})
              </option>
            ))}
          </select>

          {activeOrder && (
            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Customer Details</span>
                <p className="font-bold text-slate-900 dark:text-white">{activeOrder.customerName}</p>
                <p className="text-slate-500">{activeOrder.customerAddress}</p>
                <p className="text-slate-500 font-mono">{activeOrder.customerPhone}</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-1">
                <span className="text-amber-700 dark:text-amber-300 font-bold block">Assigned Delivery Crew:</span>
                <p className="text-slate-800 dark:text-slate-200">Technician: Arun Kumar</p>
                <p className="text-slate-500">Vehicle: TN-02-AZ-4421 (Solar Logistics Van)</p>
              </div>
            </div>
          )}
        </div>

        {/* Barcode Scan Verification */}
        <div className="lg:col-span-2 card p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                2. Scan & Confirm Equipment Serials
              </h2>
              <p className="text-xs text-slate-500">
                Prevent dispatching mismatched equipment or unrecorded serials
              </p>
            </div>
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-amber-500 text-slate-950">
              {scannedSerials.length} Scanned
            </span>
          </div>

          <form onSubmit={handleAddScan} className="flex gap-2">
            <div className="relative flex-1">
              <QrCode className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Scan or enter Serial (e.g. PAN12345, INV54321, BAT98765)..."
                value={inputSerial}
                onChange={(e) => setInputSerial(e.target.value)}
                className="input pl-9 font-mono uppercase"
              />
            </div>
            <button type="submit" className="btn-accent px-4 py-2 rounded-xl text-xs font-semibold">
              Scan Barcode
            </button>
          </form>

          {scanMessage && (
            <div
              className={`p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 ${
                scanMessage.startsWith('Error')
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : scanMessage.startsWith('Warning')
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}
            >
              {scanMessage.startsWith('Error') ? (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              )}
              <span>{scanMessage}</span>
            </div>
          )}

          {/* Quick Select Buttons for Demo Convenience */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Quick One-Click Add for Demo Manifest:
            </span>
            <div className="flex flex-wrap gap-2">
              {reservedSerials.slice(0, 8).map((ser) => {
                const isAdded = scannedSerials.includes(ser.id);
                return (
                  <button
                    key={ser.id}
                    type="button"
                    onClick={() => {
                      if (!isAdded) {
                        setScannedSerials([...scannedSerials, ser.id]);
                      }
                    }}
                    disabled={isAdded}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors flex items-center gap-1.5 ${
                      isAdded
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 opacity-60'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-400 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {isAdded && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                    <span>+ {ser.serialNumber} ({ser.category})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scanned Manifest Table */}
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
                <tr>
                  <th className="p-3">Verified Serial Number</th>
                  <th className="p-3">Equipment</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Auto-Activated Warranty</th>
                  <th className="p-3 text-right">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {scannedSerials.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-slate-400">
                      No serial numbers scanned yet. Scan or click the buttons above.
                    </td>
                  </tr>
                ) : (
                  scannedSerials.map((sId) => {
                    const ser = serialNumbers.find((s) => s.id === sId);
                    return (
                      <tr key={sId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                        <td className="p-3 font-mono font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{ser?.serialNumber}</span>
                        </td>
                        <td className="p-3 text-slate-700 dark:text-slate-300 font-medium">
                          {ser?.productName}
                        </td>
                        <td className="p-3 capitalize text-slate-500">{(ser?.category || '').replace('_', ' ')}</td>
                        <td className="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">
                          {ser?.category === 'panel' ? '20 Years' : ser?.category === 'battery' ? '5 Years' : '2 Years'}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setScannedSerials(scannedSerials.filter((id) => id !== sId))}
                            className="text-rose-500 hover:underline font-semibold"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Dispatch Button */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Immutable audit entry will be logged under warehouse user credentials</span>
            </div>
            <button
              onClick={handleExecuteDispatch}
              className="btn-accent px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/25"
            >
              <Truck className="w-4 h-4" />
              <span>Authorize Dispatch & Trigger Warranties</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Dispatches Feed */}
      <div className="card p-6">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
          Completed Dispatches & Manifest History
        </h2>
        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {dispatches.map((d) => (
            <div key={d.id} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-mono font-bold text-slate-900 dark:text-white block">
                  {d.dispatchNumber}
                </span>
                <span className="text-slate-500">
                  Customer: {d.customerName} • Technician: {d.technicianName} • {d.items.length} Serials Scanned
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-[11px]">
                  {new Date(d.dispatchedAt || d.createdAt || Date.now()).toLocaleString()}
                </span>
                <StatusBadge status={d.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
