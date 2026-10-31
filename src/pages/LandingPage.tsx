import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sun,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  FileText,
  Package,
  Wrench,
  Globe2,
  TrendingUp,
  Award,
  ChevronRight,
  Compass,
} from 'lucide-react';
import { SolarScoreRing } from '../components/ui/SolarScoreRing';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 py-1.5 px-4 text-center text-xs font-semibold text-slate-950 flex items-center justify-center gap-2">
        <Sun className="w-3.5 h-3.5 fill-current" />
        <span>Grounded in Real Public Data: Live NASA POWER & OpenStreetMap Integration</span>
        <span className="hidden sm:inline-block">•</span>
        <span className="hidden sm:inline-block font-normal">Empowering 40+ Rooftop Solar Projects Monthly Across India</span>
      </div>

      {/* Navigation Bar */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/25">
              <Sun className="w-6 h-6 fill-current text-slate-950" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block leading-none">
                SunPower Solutions
              </span>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Enterprise Solar Operating System
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-300 font-medium">
            <a href="#workflow" className="hover:text-amber-400 transition-colors">
              The Journey
            </a>
            <a href="#features" className="hover:text-amber-400 transition-colors">
              Core Modules
            </a>
            <a href="#solar-data" className="hover:text-amber-400 transition-colors">
              NASA POWER Data
            </a>
            <a href="#warranty" className="hover:text-amber-400 transition-colors">
              20-Yr Warranty
            </a>
          </div>

          <div className="flex items-center gap-3">
            <NavLink
              to="/dashboard"
              className="btn-accent px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25"
            >
              <span>Launch Platform</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        {/* Glow background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-amber-500/20 to-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-8 animate-fade-in">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Complete Rooftop Solar Lifecycle Management</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 max-w-5xl mx-auto">
            From First Enquiry to{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
              20-Year Warranty
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
            Eliminate lost WhatsApp leads, manual quote errors, missing equipment serial numbers, and paper registers.
            A modern Indian rooftop solar platform with NASA POWER irradiance modeling, automated BOM costing, QR serial dispatch, technician PWA, and instant warranty claim traceability.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <NavLink
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition-all transform hover:-translate-y-0.5 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2"
            >
              <span>Explore Live Director Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </NavLink>
            <NavLink
              to="/leads"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base border border-slate-700/80 transition-all flex items-center justify-center gap-2"
            >
              <span>View Lead CRM Pipeline</span>
            </NavLink>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-amber-400 font-mono">40+</div>
              <div className="text-xs text-slate-400 mt-1">Monthly Installations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white font-mono">100%</div>
              <div className="text-xs text-slate-400 mt-1">Serial-Level Traceability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-amber-400 font-mono">20 Yrs</div>
              <div className="text-xs text-slate-400 mt-1">Panel Warranty Tracking</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">27.8%</div>
              <div className="text-xs text-slate-400 mt-1">Average Gross Margin</div>
            </div>
          </div>
        </div>
      </section>

      {/* The 8-Step Complete Customer Journey Section */}
      <section id="workflow" className="py-24 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
              Zero-Friction Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              The Digital Solar Project Pipeline
            </h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base">
              Every stage seamlessly connected with data validation, role permissions, and immutable audit logs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Lead Capture & Solar Score',
                desc: 'Web, WhatsApp, and call enquiries enriched instantly with NASA POWER irradiance and OSM geocoding.',
                icon: Zap,
                link: '/leads',
              },
              {
                step: '02',
                title: 'Site Survey & Approval',
                desc: 'Technician checks roof tilt, shadow area, cable distance, and grid parameters before quote sign-off.',
                icon: Compass,
                link: '/leads',
              },
              {
                step: '03',
                title: 'Quote & Auto-BOM',
                desc: 'Template-driven bill of materials generation for 1-5 kW On-Grid/Off-Grid with instant margin safeguards.',
                icon: FileText,
                link: '/quotes',
              },
              {
                step: '04',
                title: 'Order & Serial Reserve',
                desc: 'Accepted quote converts into sales order; high-value panels, inverters, and batteries reserved.',
                icon: Package,
                link: '/inventory',
              },
              {
                step: '05',
                title: 'QR Scan Dispatch',
                desc: 'Warehouse scans equipment barcodes before truck rollout; automatically fires warranty start dates.',
                icon: Shield,
                link: '/dispatch',
              },
              {
                step: '06',
                title: 'Technician Field PWA',
                desc: 'Offline-ready checklist, generation meter testing, geotagged before/after photo evidence.',
                icon: Wrench,
                link: '/jobs',
              },
              {
                step: '07',
                title: 'Customer Sign-off',
                desc: 'Digital customer signature captured on glass; generates tamper-proof completion certificate.',
                icon: CheckCircle,
                link: '/jobs',
              },
              {
                step: '08',
                title: 'Traceable Warranty Service',
                desc: 'Support agents trace fault claims directly to installed serial numbers for free or billable repair.',
                icon: TrendingUp,
                link: '/tickets',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <NavLink
                  key={card.step}
                  to={card.link}
                  className="card p-6 bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-amber-500/60 group-hover:text-amber-400 transition-colors">
                        {card.step}
                      </span>
                      <div className="p-2 rounded-xl bg-slate-800 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center text-xs text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Explore Stage</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* NASA POWER & Real Data Showcase */}
      <section id="solar-data" className="py-24 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Verified Scientific Solar Data</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Live Insights from NASA POWER & Global Solar Atlas
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Never guess generation estimates. SunPower Solutions queries NASA Langley Research Center's Satellite Solar Irradiance database (parameters: <code className="text-amber-300">ALLSKY_SFC_SW_DWN</code>, <code className="text-amber-300">T2M</code>) to calculate exact regional generation profiles, temperature derating, and tilt angles.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Daily Global Horizontal Irradiance (GHI) and Direct Normal Irradiance (DNI)',
                  'Regional temperature derate analysis (-0.38%/°C above 25°C cell temp)',
                  'Address validation & reverse geocoding via OpenStreetMap Nominatim',
                  '25-year cumulative kWh generation projection with 0.5%/yr degradation',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <NavLink
                  to="/solar-insights"
                  className="btn-accent px-6 py-3 rounded-xl font-semibold text-sm inline-flex items-center gap-2"
                >
                  <span>View Solar Data & Provenance Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </NavLink>
              </div>
            </div>

            {/* Interactive Data Preview Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-semibold uppercase text-amber-400 tracking-wider">
                    Demo Site 1: Urban Rooftop
                  </span>
                  <h4 className="text-lg font-bold text-white">Chennai, Tamil Nadu</h4>
                  <p className="text-xs text-slate-400">13.0827° N, 80.2707° E • Elev 45m</p>
                </div>
                <SolarScoreRing score={89} size="md" />
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block">Annual GHI</span>
                  <span className="text-base font-bold text-white font-mono">1,971 kWh/m²</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Daily Average GHI</span>
                  <span className="text-base font-bold text-amber-400 font-mono">5.40 kWh/m²/day</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Optimal Tilt Angle</span>
                  <span className="text-base font-bold text-white font-mono">13° South</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Expected 5kW Output</span>
                  <span className="text-base font-bold text-emerald-400 font-mono">7,144 kWh/year</span>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>Data Provenance Source:</span>
                  <span className="text-amber-400 font-medium">NASA POWER (Public Domain)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 font-mono">
                  Endpoint: https://power.larc.nasa.gov/api/temporal/climatology/point
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
              <Sun className="w-4 h-4" />
            </div>
            <span>© 2026 SunPower Solutions India. Built for rooftop solar excellence.</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <span>NASA POWER Project (LaRC)</span>
            <span>OpenStreetMap / Nominatim</span>
            <span>Global Solar Atlas (Solargis/World Bank)</span>
            <span>MNRE India Standards</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
