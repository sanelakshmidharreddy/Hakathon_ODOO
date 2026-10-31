import React, { useState } from 'react';
import {
  Package,
  QrCode,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Modal } from '../components/ui/Modal';

export const Inventory: React.FC = () => {
  const { products, serialNumbers } = useStore();
  const [activeTab, setActiveTab] = useState<'serials' | 'products'>('serials');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [scannedSerialInput, setScannedSerialInput] = useState('');
  const [scannedResult, setScannedResult] = useState<any | null>(null);

  const filteredSerials = serialNumbers.filter((s) => {
    const matchesSearch =
      (s.serialNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.productName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.reservedForOrderId && s.reservedForOrderId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = categoryFilter === 'all' || s.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleSimulateScan = (e: React.FormEvent) => {
    e.preventDefault();
    const match = serialNumbers.find(
      (s) => (s.serialNumber || '').toLowerCase() === scannedSerialInput.trim().toLowerCase()
    );
    if (match) {
      setScannedResult({
        found: true,
        serial: match,
      });
    } else {
      setScannedResult({
        found: false,
        message: `Serial number "${scannedSerialInput}" not found in SunPower inventory registry.`,
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Inventory & Serial Number Tracking
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              {serialNumbers.length} Barcoded Items
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Zero-loss equipment management. Every solar panel, inverter, and battery tracked individually by serial number from receipt to 20-year warranty claim.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setScannedSerialInput('');
              setScannedResult(null);
              setScanModalOpen(true);
            }}
            className="btn-accent px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <QrCode className="w-4 h-4" />
            <span>Barcode / QR Scanner</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('serials')}
          className={`pb-3 text-xs font-bold transition-all relative ${
            activeTab === 'serials'
              ? 'text-amber-600 dark:text-amber-400 border-b-2 border-amber-500'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Tracked Serial Numbers ({serialNumbers.length})
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 text-xs font-bold transition-all relative ${
            activeTab === 'products'
              ? 'text-amber-600 dark:text-amber-400 border-b-2 border-amber-500'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Product Master & Stock Levels ({products.length})
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search serial (e.g. PAN12345, INV54321, BAT98765)..."
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
            <option value="all">All Equipment Categories</option>
            <option value="panel">Solar Panels (Mono PERC)</option>
            <option value="inverter">Solar Inverters</option>
            <option value="battery">Lithium Battery Banks</option>
            <option value="charge_controller">Charge Controllers</option>
          </select>
        </div>
      </div>

      {/* TAB 1: SERIAL NUMBERS LIST */}
      {activeTab === 'serials' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Serial Number</th>
                  <th className="p-4">Equipment / Model</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Job / Reservation Link</th>
                  <th className="p-4">Warranty Scope</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredSerials.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="p-4">
                      <div className="font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <QrCode className="w-3.5 h-3.5 text-amber-500" />
                        <span>{s.serialNumber}</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                      {s.productName}
                    </td>
                    <td className="p-4 capitalize text-slate-500">{(s.category || '').replace('_', ' ')}</td>
                    <td className="p-4">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="p-4 font-mono text-[11px] text-slate-500">
                      {s.currentJobId ? (
                        <span className="text-sky-600 dark:text-sky-400 font-semibold">{s.currentJobId}</span>
                      ) : s.reservedForOrderId ? (
                        <span className="text-amber-600 dark:text-amber-400 font-semibold">
                          Reserved: {s.reservedForOrderId}
                        </span>
                      ) : (
                        <span className="text-slate-400">Available in Warehouse</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50">
                        {s.category === 'panel' ? '20 Years' : s.category === 'battery' ? '5 Years' : '2 Years'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setScannedSerialInput(s.serialNumber);
                          setScannedResult({ found: true, serial: s });
                          setScanModalOpen(true);
                        }}
                        className="btn-ghost px-2.5 py-1 rounded-lg text-xs font-semibold"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT MASTER CATALOG */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => {
            const isLowStock = p.stockQuantity <= p.reorderLevel;
            return (
              <div key={p.id} className="card p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold block">
                      {p.sku}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">{p.name}</h3>
                  </div>
                  <span className="text-[11px] uppercase font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {p.category.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100 dark:border-slate-800 font-mono">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Cost Price</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      ₹{p.costPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Selling Price</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      ₹{p.sellingPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-500">In Stock:</span>
                    <span
                      className={`font-mono font-bold ${
                        isLowStock ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {p.stockQuantity} {p.unit}
                    </span>
                  </div>
                  {isLowStock && (
                    <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 text-[10px] font-bold">
                      Reorder Alert (&lt;{p.reorderLevel})
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SCANNER MODAL */}
      <Modal
        isOpen={scanModalOpen}
        onClose={() => setScanModalOpen(false)}
        title="Barcode / QR Scanner Verification"
        maxWidth="md"
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900 text-center space-y-3 border border-slate-800">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center animate-pulse">
              <QrCode className="w-8 h-8" />
            </div>
            <p className="text-slate-300 font-medium">
              Point camera or enter equipment barcode / QR code to verify
            </p>
          </div>

          <form onSubmit={handleSimulateScan} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. PAN12345, INV54321, BAT98765"
              value={scannedSerialInput}
              onChange={(e) => setScannedSerialInput(e.target.value)}
              className="input flex-1 uppercase font-mono"
            />
            <button type="submit" className="btn-accent px-4 py-2 rounded-xl font-semibold">
              Scan
            </button>
          </form>

          {scannedResult && (
            <div
              className={`p-4 rounded-xl border text-xs space-y-2 ${
                scannedResult.found
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
              }`}
            >
              {scannedResult.found ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 text-sm">
                      Equipment Verified: {scannedResult.serial.serialNumber}
                    </span>
                    <StatusBadge status={scannedResult.serial.status} />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    Model: {scannedResult.serial.productName}
                  </p>
                  <p className="text-slate-500">
                    Category: {scannedResult.serial.category.toUpperCase()} • Warranty: 20-Yr Manufacturer
                  </p>
                </>
              ) : (
                <p className="text-rose-700 dark:text-rose-300 font-semibold">{scannedResult.message}</p>
              )}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
