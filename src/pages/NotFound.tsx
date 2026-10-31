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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-6 selection:bg-amber-500 selection:text-slate-950 font-sans">
      <div className="w-full max-w-lg text-center space-y-6 animate-fade-in">
        {/* Animated Solar Brand */}
        <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-slate-950 shadow-2xl shadow-amber-500/25">
          <Sun className="w-9 h-9 fill-current" />
        </div>

        <div className="space-y-2">
          <span className="text-6xl font-black font-mono tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
            404
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Page Not Found
          </h1>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            The requested destination <code className="text-amber-400 font-mono bg-slate-900 px-2 py-0.5 rounded">{location.pathname}</code> does not match an active solar project route.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto btn-accent px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto btn-ghost px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 border border-slate-800 text-slate-300 hover:text-white"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto p-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>

        {/* Quick Directory Tray */}
        <div className="card p-4 bg-slate-900/60 border border-slate-800 text-left mt-6">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-2 px-1">
            Active System Modules
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {commonRoutes.map((r) => {
              const Icon = r.icon;
              return (
                <Link
                  key={r.path}
                  to={r.path}
                  className="p-2 rounded-lg bg-slate-950/80 hover:bg-slate-800 border border-slate-800/80 hover:border-amber-500/40 text-slate-400 hover:text-white text-xs flex items-center gap-2 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-amber-500" />
                  <span className="truncate">{r.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <p className="text-[11px] text-slate-600">
          SunPower Solutions India • Single Page Application Router
        </p>
      </div>
    </div>
  );
};
