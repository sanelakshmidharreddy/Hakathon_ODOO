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
  Check,
  BarChart3,
  Users,
  QrCode,
  ShieldCheck,
  LifeBuoy,
  Database,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { SolarScoreRing } from '../components/ui/SolarScoreRing';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-500 selection:text-white">
      {/* 1. Sticky White Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-sm">
              <Sun className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-base leading-tight tracking-tight">
                SunPower Solutions
              </span>
              <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
                Solar Business ERP
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#modules" className="hover:text-amber-600 transition-colors">
              Modules
            </a>
            <a href="#workflow" className="hover:text-amber-600 transition-colors">
              Workflow
            </a>
            <a href="#real-data" className="hover:text-amber-600 transition-colors">
              Solar Data
            </a>
            <a href="#solutions" className="hover:text-amber-600 transition-colors">
              Solutions
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <NavLink
              to="/login"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/dashboard"
              className="btn-accent text-sm font-semibold px-4 py-2 rounded-md shadow-sm flex items-center gap-2"
            >
              <span>Open ERP</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="bg-slate-50 border-b border-slate-200 pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Enterprise Solar Installation Management
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Run your solar business from enquiry to warranty
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Manage leads, automated bill of materials, serial equipment dispatch, technician field sign-offs, and 20-year warranties in one unified platform.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <NavLink
              to="/dashboard"
              className="w-full sm:w-auto btn-accent px-6 py-3 rounded-md text-sm font-semibold shadow-sm flex items-center justify-center gap-2"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
            <NavLink
              to="/leads"
              className="w-full sm:w-auto btn-secondary px-6 py-3 rounded-md text-sm font-semibold flex items-center justify-center gap-2"
            >
              <span>View CRM Pipeline</span>
            </NavLink>
          </div>

          {/* Clean Enterprise UI Preview Card */}
          <div className="mt-14 max-w-5xl mx-auto rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden text-left">
            <div className="h-10 bg-slate-100 border-b border-slate-200 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                <span className="text-xs text-slate-500 font-mono ml-2">sunpower-solutions.erp/dashboard</span>
              </div>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Connected to Render Backend
              </div>
            </div>
            <div className="p-6 bg-slate-50/50 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="card p-4">
                <div className="text-xs font-medium text-slate-500 uppercase">Monthly Installs</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">42 Sites</div>
                <div className="text-xs text-emerald-600 mt-1 font-medium">↑ 12% vs last month</div>
              </div>
              <div className="card p-4">
                <div className="text-xs font-medium text-slate-500 uppercase">Serial Tracking</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">100%</div>
                <div className="text-xs text-slate-500 mt-1">QR scan enforced</div>
              </div>
              <div className="card p-4">
                <div className="text-xs font-medium text-slate-500 uppercase">Average Gross Margin</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">27.8%</div>
                <div className="text-xs text-emerald-600 mt-1 font-medium">Auto-BOM safeguard</div>
              </div>
              <div className="card p-4">
                <div className="text-xs font-medium text-slate-500 uppercase">Active Warranties</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">480 Panels</div>
                <div className="text-xs text-slate-500 mt-1">20-yr digital ledger</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trust Section */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
            Trusted by Indian solar EPCs & integrated with official scientific data providers
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-center text-center">
            <div className="p-3 border border-slate-200 rounded-md bg-slate-50">
              <div className="font-semibold text-slate-800 text-sm">NASA POWER</div>
              <div className="text-[11px] text-slate-500">Solar Irradiance API</div>
            </div>
            <div className="p-3 border border-slate-200 rounded-md bg-slate-50">
              <div className="font-semibold text-slate-800 text-sm">OpenStreetMap</div>
              <div className="text-[11px] text-slate-500">Nominatim Geocoding</div>
            </div>
            <div className="p-3 border border-slate-200 rounded-md bg-slate-50">
              <div className="font-semibold text-slate-800 text-sm">MNRE Guidelines</div>
              <div className="text-[11px] text-slate-500">BOM Specifications</div>
            </div>
            <div className="p-3 border border-slate-200 rounded-md bg-slate-50">
              <div className="font-semibold text-slate-800 text-sm">Global Solar Atlas</div>
              <div className="text-[11px] text-slate-500">PV Yield Modeling</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Problem & Solution Section */}
      <section id="solutions" className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Designed specifically for rooftop solar operations
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Replace messy WhatsApp groups, spreadsheets, and lost paper registers with an enterprise operating system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Challenge */}
            <div className="card p-6 border-slate-200 bg-slate-50/60">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                Common Operational Pitfalls
              </div>
              <ul className="space-y-3.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <span><strong>Lost customer leads:</strong> Inquiries scattered across sales reps' personal messaging chats.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <span><strong>Inaccurate quotes:</strong> Hand-calculated BOMs leading to thin or negative gross project margins.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <span><strong>Serial number blindness:</strong> Inverters and panels installed without recorded barcodes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold mt-0.5">✕</span>
                  <span><strong>Warranty dispute liabilities:</strong> Inability to prove installation dates or genuine equipment origins.</span>
                </li>
              </ul>
            </div>

            {/* The SunPower Solution */}
            <div className="card p-6 border-slate-200 bg-white">
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-4">
                The SunPower Platform Standard
              </div>
              <ul className="space-y-3.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Centralized CRM:</strong> Enriched with regional NASA irradiance scores and address geocoding.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Automated BOM:</strong> Standardized 1-5 kW templates with real-time margin calculations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>QR barcode dispatch:</strong> Compulsory equipment scanning before trucks leave warehouse.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Digital sign-offs:</strong> Geotagged technician photos, generation meter test, and digital customer signature.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Product Modules Section */}
      <section id="modules" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Enterprise Modules Built for Every Team
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Role-tailored tools for directors, sales executives, warehouse managers, and field technicians.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'CRM & Pipeline',
                desc: 'Track residential & commercial leads from initial inquiry to qualified survey stage.',
                icon: Users,
                link: '/leads',
              },
              {
                title: 'Quotations & BOM',
                desc: 'Generate accurate system proposals with live BOM pricing and gross margin control.',
                icon: FileText,
                link: '/quotes',
              },
              {
                title: 'Inventory & Serials',
                desc: 'Maintain panel and inverter inventory with strict barcode and serial number enforcement.',
                icon: QrCode,
                link: '/inventory',
              },
              {
                title: 'Dispatch Manifest',
                desc: 'Verify serial numbers against job manifests before staging equipment for delivery.',
                icon: Package,
                link: '/dispatch',
              },
              {
                title: 'Field App (PWA)',
                desc: 'Mobile-ready checklist with geotagged photo capture, meter test, and signature.',
                icon: Wrench,
                link: '/jobs',
              },
              {
                title: 'Warranty Ledger',
                desc: 'Automated 20-year panel warranties linked directly to manufacturer serial records.',
                icon: ShieldCheck,
                link: '/warranties',
              },
              {
                title: 'Service Tickets',
                desc: 'Handle post-installation maintenance and warranty service claims with ease.',
                icon: LifeBuoy,
                link: '/tickets',
              },
              {
                title: 'Analytics & NASA Data',
                desc: 'Real solar irradiance benchmarks from NASA POWER and Global Solar Atlas.',
                icon: Globe2,
                link: '/solar-insights',
              },
            ].map((module, i) => {
              const Icon = module.icon;
              return (
                <NavLink
                  key={i}
                  to={module.link}
                  className="card p-5 bg-white hover:border-amber-400 transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-slate-700 mb-3 group-hover:bg-amber-50 group-hover:text-amber-700 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1.5">{module.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{module.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-medium text-amber-700">
                    <span>Open Module</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Workflow Section */}
      <section id="workflow" className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              End-to-End Installation Lifecycle
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Clear sequential handover between departments ensures complete traceability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {[
              { num: '01', title: 'Lead', desc: 'Enquiry captured & solar score calculated' },
              { num: '02', title: 'Survey', desc: 'Roof tilt, shadow & cable distance measured' },
              { num: '03', title: 'Quote', desc: 'Auto-BOM compiled & approved by customer' },
              { num: '04', title: 'Dispatch', desc: 'Equipment scanned with QR barcodes' },
              { num: '05', title: 'Install', desc: 'Technician finishes checklist & signs off' },
              { num: '06', title: 'Warranty', desc: 'Active certificate issued for 20 years' },
            ].map((step, idx) => (
              <div key={idx} className="p-4 rounded-md border border-slate-200 bg-slate-50 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-amber-600 mb-1">{step.num}</div>
                  <div className="font-semibold text-slate-900 text-sm mb-1">{step.title}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Real Data Section */}
      <section id="real-data" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-100 text-amber-800 text-xs font-medium mb-3">
                <Globe2 className="w-3.5 h-3.5" />
                NASA POWER & OSM Integration
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Grounded in Real Public Solar Data
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Rather than using generic approximations, SunPower Solutions queries the NASA Langley Research Center Satellite database to compute exact regional irradiance and temperature coefficients.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>NASA POWER Climatology (ALLSKY_SFC_SW_DWN & T2M)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>OpenStreetMap Nominatim Reverse Geocoding</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Global Solar Atlas Photovoltaic Yield Modeling</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>NREL PVDAQ Standardized Performance Benchmarks</span>
                </div>
              </div>

              <div className="mt-8">
                <NavLink
                  to="/solar-insights"
                  className="btn-accent px-5 py-2.5 rounded-md text-xs font-semibold inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Explore Solar Data Insights</span>
                  <ArrowRight className="w-4 h-4" />
                </NavLink>
              </div>
            </div>

            {/* Benchmark Preview Box */}
            <div className="card p-6 bg-white border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs font-semibold uppercase text-amber-700">Regional Benchmark Site</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">Chennai, Tamil Nadu</div>
                  <div className="text-xs text-slate-500">13.0827° N, 80.2707° E • Elev 45m</div>
                </div>
                <SolarScoreRing score={89} size="md" />
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-100 text-xs">
                <div>
                  <span className="text-slate-500 block">Annual GHI</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">1,971 kWh/m²</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Daily Average GHI</span>
                  <span className="text-sm font-bold text-amber-700 font-mono">5.40 kWh/m²/day</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Optimal Tilt Angle</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">13° South</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Expected 5kW Output</span>
                  <span className="text-sm font-bold text-emerald-600 font-mono">7,144 kWh/year</span>
                </div>
              </div>

              <div className="pt-3 text-[11px] text-slate-500 font-mono">
                Source: NASA POWER API (power.larc.nasa.gov) • Public Domain
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Call to Action Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Ready to streamline your solar installation operations?
          </h2>
          <p className="mt-3 text-sm text-slate-600 max-w-xl mx-auto">
            Log in to the dashboard to monitor installations, dispatch equipment, and manage customer service.
          </p>
          <div className="mt-6 flex justify-center">
            <NavLink
              to="/dashboard"
              className="btn-accent px-6 py-3 rounded-md text-sm font-semibold shadow-sm inline-flex items-center gap-2"
            >
              <span>Launch Director Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* 9. Professional Enterprise Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-white font-bold">
                <Sun className="w-3.5 h-3.5" />
              </div>
              <span>© 2026 SunPower Solutions ERP. Professional Solar Operations Platform.</span>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <NavLink to="/dashboard" className="hover:text-slate-800">Dashboard</NavLink>
              <NavLink to="/leads" className="hover:text-slate-800">CRM</NavLink>
              <NavLink to="/quotes" className="hover:text-slate-800">Quotations</NavLink>
              <NavLink to="/inventory" className="hover:text-slate-800">Inventory</NavLink>
              <NavLink to="/warranties" className="hover:text-slate-800">Warranties</NavLink>
              <NavLink to="/solar-insights" className="hover:text-slate-800">NASA Data</NavLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
