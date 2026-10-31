# SunPower Solutions

> **An End-to-End Digital Operations Platform for Growing Rooftop Solar EPC Enterprises in India.**

---

## 1. Live Deployments

| Component | Cloud Platform | Live Production URL | Status |
| :--- | :--- | :--- | :--- |
| **Frontend Web App & PWA** | Vercel Edge Network | [https://hakathonodoo.vercel.app/](https://hakathonodoo.vercel.app/) | ![Vercel](https://img.shields.io/badge/Vercel-Operational-success) |
| **Backend API Service** | Render Cloud | [https://hakathon-odoo.onrender.com/](https://hakathon-odoo.onrender.com/) | ![Render](https://img.shields.io/badge/Render-Operational-success) |
| **Health Check Endpoint** | Render Cloud | [https://hakathon-odoo.onrender.com/health](https://hakathon-odoo.onrender.com/health) | ![Health](https://img.shields.io/badge/Health-200%20OK-brightgreen) |

---

## 2. Problem Statement
With India's ambitious **PM Surya Ghar: Muft Bijli Yojana** initiative targeting 10 million rooftop installations, residential and commercial solar installers complete dozens of projects every month. However, operations remain severely fragmented:
- **Lead leakage**: Inquiries get lost across WhatsApp, phone calls, and manual spreadsheets.
- **Inaccurate quoting**: Quotes lack real-time solar irradiance data and automated subsidy deductions, creating customer distrust.
- **Serial tracking chaos**: Panels dispatched without barcode logging lead to warranty disputes.
- **Technician delays**: Paper sign-offs, lost site photos, and missed commissionings delay MNRE subsidy disbursements.
- **Warranty blindness**: Installers lose track of 5-year workmanship warranties, hurting customer retention.

**SunPower Solutions** solves this with a unified digital platform that manages the entire lifecycle in one place:
**Lead → Site Survey → Quote & Subsidy → Dispatch & Serial Barcode → Installation PWA & Sign-off → Automatic 5-Year Warranty → Service Tickets → Executive Analytics.**

---

## 3. Key Features

- **Lead CRM & Satellite Solar Scoring**: Automatically evaluates roof feasibility using satellite solar irradiance data and rooftop orientation.
- **Automated Quote & Bill of Materials (BOM)**: Generates detailed proposals with itemized costs (panels, inverters, structure, cabling), profit margins, and automatic PM Surya Ghar subsidy calculations (up to ₹78,000).
- **Warehouse Dispatch & Serial Barcode Scanner**: Scans and binds individual panel serial numbers to truck dispatches, preventing theft and component mismatch.
- **Field Technician Mobile PWA**: Offline-first progressive web app enabling technicians to log commissioning checklists, upload geo-tagged photo proofs, and collect customer touchscreen e-signatures.
- **Automated 5-Year Warranty Generation**: Automatically issues digital warranty certificates upon job completion, complete with covered serial numbers and annual maintenance reminders.
- **Service Ticket & SLA Management**: Ticketing portal for inverter alerts, generation drops, and preventative maintenance.
- **Director Executive Dashboard**: Real-time financial metrics (Revenue, Gross Margin %, Warehouse Valuation) protected by safe-number parsing with zero `NaN` values.
- **Authentic Public Scientific Integrations**: Live telemetry from NASA POWER, OpenWeatherMap, OpenStreetMap Nominatim, and NREL PVDAQ.

---

## 4. Tech Stack

| Layer | Technologies Used | Details |
| :--- | :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite 6, Tailwind CSS | Single-page application with responsive dark/light modes and mobile PWA layout. |
| **Backend API** | Node.js, Express, TypeScript (Companion: FastAPI / Python 3.11) | High-performance modular REST API with Controller-Service-Repository architecture. |
| **Database & ORM** | PostgreSQL, Prisma ORM | Relational schema with normalized foreign keys and audit trail logging. |
| **Authentication** | JWT (JSON Web Tokens), RBAC | Role-based authorization across 7 enterprise staff roles. |
| **External APIs** | NASA POWER, OpenWeatherMap, OpenStreetMap, NREL PVDAQ | Satellite solar irradiance, live weather, reverse geocoding, degradation benchmarks. |
| **Deployment** | Vercel (Edge SPA), Render (Web Service), GitHub Actions | Continuous deployment with SPA rewrites and automatic rolling builds. |

---

## 5. Repository Structure

```
sunpower-solutions/
├── frontend/                     # React 18 + Vite user interface
│   ├── public/                   # Static assets, redirects & 404 handler
│   ├── src/
│   │   ├── components/           # Common UI, layout shells, and chart widgets
│   │   ├── features/             # Feature modules (leads, quotes, jobs, dispatch, etc.)
│   │   ├── hooks/                # Custom React hooks (useSolarCalculation, useGeolocation)
│   │   ├── context/              # Auth & Theme context providers
│   │   ├── lib/                  # Central API client & defensive number utilities
│   │   ├── routes/               # Modular router with canonical & legacy route matching
│   │   └── index.css             # Tailwind CSS tokens & Odoo-style palette
├── backend/                      # Production Express TypeScript & FastAPI API
│   ├── src/                      # Controllers, services, routes, models, middleware
│   ├── prisma/                   # PostgreSQL Prisma schema and migrations
│   ├── seed/                     # Demo database seeder script
│   └── tests/                    # Automated unit and integration test suite
├── docs/                         # Engineering & Mentor Documentation
│   ├── architecture.md           # Architecture diagrams & security model
│   ├── api-documentation.md      # Complete REST API route specifications
│   ├── database-schema.md        # Relational database models & ER diagram
│   ├── deployment-guide.md       # Vercel & Render step-by-step deploy instructions
│   ├── data-sources.md           # NASA, OpenWeather & OSM data attribution
│   ├── demo-script.md            # 3 to 5 minute judge presentation walkthrough
│   └── project-structure.md      # Detailed folder layout and module roles
├── data/                         # Verified Public Solar Datasets (NASA POWER raw & clean)
├── scripts/                      # Setup scripts (setup.sh, setup.bat, deploy-check.js)
├── sunpower_solutions/           # Odoo ERP Addon Module (Enterprise Backend Variant)
└── README.md                     # This file
```

---

## 6. Local Setup Instructions

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- Optional: Python 3.10+ (for companion FastAPI backend)

### One-Click Setup
```bash
# Windows
scripts\setup.bat

# Linux / macOS
chmod +x scripts/setup.sh && ./scripts/setup.sh
```

### Manual Individual Commands
```bash
# 1. Setup & Run Frontend
cd frontend
npm install
npm run dev
# Accessible at http://localhost:5173

# 2. Setup & Run Backend (in a new terminal)
cd backend
npm install
npm run dev
# Accessible at http://localhost:5000 (Health check: http://localhost:5000/health)
```

---

## 7. Environment Variables

### Frontend (`frontend/.env.example`)
| Variable | Example Value | Description |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `https://hakathon-odoo.onrender.com` | Base URL of the backend API service |
| `VITE_APP_NAME` | `SunPower Solutions` | Application branding title |

### Backend (`backend/.env.example`)
| Variable | Example Value | Description |
| :--- | :--- | :--- |
| `PORT` | `5000` | HTTP listening port |
| `NODE_ENV` | `development` | Runtime environment mode |
| `DATABASE_URL` | `postgresql://user:pass@localhost:5432/sunpower` | PostgreSQL connection URI |
| `JWT_SECRET` | `your_secret_key` | Secret key for JWT signing |
| `FRONTEND_URL` | `https://hakathonodoo.vercel.app` | Allowed CORS frontend origin |
| `OPENWEATHER_API_KEY` | `your_openweather_key` | OpenWeather API key for live weather |

---

## 8. User Roles & Demo Credentials

The platform includes a 1-click **Role Switcher** on the top navigation bar for seamless demo exploration:

| Role Name | Demo Profile | Primary Workspace & Permissions |
| :--- | :--- | :--- |
| **Director / Executive** | `director@sunpower.in` | Executive Dashboard, Gross Margins, P&L, Warehouse Valuation |
| **Sales Representative** | `sales@sunpower.in` | Lead CRM, Solar Scoring, Quote Generation & PM Surya Ghar Subsidies |
| **Site Surveyor** | `surveyor@sunpower.in` | Technical Roof Shading, Azimuth, Tilt & DISCOM Sanctioned Load |
| **Warehouse Manager** | `warehouse@sunpower.in` | Inventory Stock, Barcode / Serial Number Scanning, Dispatch Manifests |
| **Field Technician** | `technician@sunpower.in` | Mobile Installation PWA, Geo-Tagged Photos, Customer Touchscreen Signatures |
| **Accountant** | `accountant@sunpower.in` | Invoices, Margin Verification, MNRE Subsidy Claim Reconciliation |
| **Service Coordinator** | `service@sunpower.in` | 5-Year Automated Warranty Policies, SLA Service Tickets, Maintenance |

---

## 9. Real Data Sources & Attribution

All solar data used in the platform is grounded in real, unmanipulated public scientific portals:
- **NASA POWER**: Multi-year satellite solar irradiance (Global Horizontal Irradiance - GHI in kWh/m²/day) from the Langley Research Center.
- **OpenWeatherMap**: Live ambient temperature and cloud cover for real-time inverter thermal derating.
- **OpenStreetMap & Nominatim**: Open-access reverse geocoding for Indian addresses.
- **NREL PVDAQ**: Baseline annual degradation factor (-0.5%/year) for 25-year financial modeling.
- **Data.gov.in**: National tariff categories and sanctioned load guidelines.

*Detailed attribution notes, API endpoints, and license agreements are documented in [`docs/data-sources.md`](docs/data-sources.md).*

---

## 10. Automated Tests & Code Quality

Run the backend automated test suite:
```bash
cd backend
npm test
```
**Results**:
- 5/5 automated test suites pass (Leads, Quotes, Finite Analytics Numbers, NASA POWER city solar feeds).
- Production build passes with zero TypeScript warnings or PostCSS errors.

---

## 11. Known Limitations & Future Improvements
- **Offline Sync Queue**: Offline technician photos are stored in browser `IndexedDB`/`localStorage` and sync when reconnecting. In production, this can be upgraded to Background Sync API with service workers.
- **Drone 3D Shading**: Currently uses mathematical azimuth/tilt estimation. Future roadmap includes automated photogrammetry 3D point-cloud roof rendering.
- **Direct DISCOM API**: PM Surya Ghar subsidy claims are currently formatted as exportable standard claim packets; future integration will hook directly into state DISCOM EDI portals.

---

## 12. Mentor & Judge Documentation Links
- [System Architecture & Data Flow](docs/architecture.md)
- [REST API Specifications](docs/api-documentation.md)
- [PostgreSQL Database Schema](docs/database-schema.md)
- [Deployment & Hosting Guide](docs/deployment-guide.md)
- [Public Data Sources & Ethics Statement](docs/data-sources.md)
- [3 to 5 Minute Demo Script](docs/demo-script.md)
- [Repository Restructuring Report](docs/repository-cleanup-report.md)
