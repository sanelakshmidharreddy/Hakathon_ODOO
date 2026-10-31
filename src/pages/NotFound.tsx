import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Sun,
  Home,
  LayoutDashboard,
  ArrowLeft,
  Users,
  FileText,
  Wrench,
  Package,
  LifeBuoy,
  Globe2,
} from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const commonRoutes = [
    { name: 'Director Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Lead Pipeline & CRM', path: '/leads', icon: Users },
    { name: 'Quote Builder & BOM', path: '/quotes', icon: FileText },
    { name: 'Warehouse Dispatch', path: '/dispatch', icon: Package },
    { name: 'Technician Field App', path: '/jobs', icon: Wrench },
    { name: 'Service Tickets', path: '/tickets', icon: LifeBuoy },
    { name: 'NASA Solar Insights', path: '/solar-insights', icon: Globe2 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center p-6 selection:bg-amber-500 selection:text-white font-sans">
      <div className="w-full max-w-lg text-center space-y-6">
        <div className="w-12 h-12 mx-auto rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-sm">
          <Sun className="w-7 h-7" />
        </div>

        <div className="space-y-1.5">
          <span className="text-5xl font-bold font-mono tracking-tight text-slate-800">
            404
          </span>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Page Not Found
          </h1>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            The requested destination <code className="text-slate-800 font-mono bg-slate-200 px-1.5 py-0.5 rounded text-[11px]">{location.pathname}</code> does not match an active route.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto btn-accent px-5 py-2 rounded text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto btn-secondary px-4 py-2 rounded text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-3 py-2 rounded text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Quick Directory Tray */}
        <div className="card p-4 bg-white border border-slate-200 text-left mt-6 shadow-sm">
          <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block mb-2 px-1">
            Active System Modules
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {commonRoutes.map((r) => {
              const Icon = r.icon;
              return (
                <Link
                  key={r.path}
                  to={r.path}
                  className="p-2 rounded bg-slate-50 hover:bg-amber-50 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs flex items-center gap-2 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-amber-600" />
                  <span className="truncate">{r.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <p className="text-[11px] text-slate-400">
          SunPower Solutions India • Enterprise Solar Platform
        </p>
      </div>
    </div>
  );
};
