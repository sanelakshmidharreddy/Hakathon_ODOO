# SunPower Solutions — Project Structure Guide

## Overview
The **SunPower Solutions** repository is structured as a production-grade full-stack mono-repository clearly isolating user interfaces, backend business services, data schemas, verification test suites, public data assets, and deployment guides.

---

## High-Level Repository Tree

```
sunpower-solutions/
│
├── frontend/                     # React 18 + TypeScript + Vite User Interface
│   ├── public/                   # Public static assets, favicon, redirects & 404 handler
│   ├── src/
│   │   ├── assets/               # Branding graphics, icons, fonts
│   │   ├── components/           # Reusable UI component library
│   │   │   ├── common/           # Generic buttons, modals, badges, inputs
│   │   │   ├── layout/           # TopBar, Sidebar, AppLayout shells
│   │   │   └── charts/           # KPI cards, solar gauges, Recharts widgets
│   │   ├── features/             # Feature-based domain modules
│   │   │   ├── auth/             # Login and session handlers
│   │   │   ├── landing/          # Customer marketing portal & solar ROI calculator
│   │   │   ├── leads/            # Lead CRM & site survey management
│   │   │   ├── surveys/          # Technical shading and azimuth inputs
│   │   │   ├── quotes/           # Bill of Materials & margin quote generator
│   │   │   ├── inventory/        # Warehouse stock and serial scan management
│   │   │   ├── dispatch/         # Delivery dispatch & transit tracking
│   │   │   ├── jobs/             # Field technician PWA, photos & e-signatures
│   │   │   ├── warranties/       # 5-Year automated warranty lifecycle policies
│   │   │   ├── tickets/          # SLA priority service tickets & maintenance
│   │   │   ├── finance/          # Subsidy and invoice reconciliation
│   │   │   └── dashboard/        # Director executive analytics & KPI cards
│   │   ├── hooks/                # Custom React hooks (useSolarCalculation, useGeolocation, useOfflineSync)
│   │   ├── context/              # React Context providers (AuthContext, ThemeContext)
│   │   ├── lib/                  # Centralized API client (api.ts) & safe number parsing (number.ts)
│   │   ├── routes/               # Modular router definitions & backward-compatible aliases (AppRoutes.tsx)
│   │   ├── types/                # Domain TypeScript interfaces and enumerations
│   │   ├── App.tsx               # Root application component
│   │   ├── main.tsx              # React DOM render entrypoint
│   │   └── index.css             # Tailwind CSS tokens, theme styles, and utility classes
│   ├── .env.example              # Public frontend environment template
│   ├── index.html                # Vite HTML shell with SPA fallback handler
│   ├── package.json              # Frontend dependencies and build scripts
│   ├── tailwind.config.js        # Tailwind CSS theme and palette configuration
│   ├── tsconfig.json             # TypeScript configuration for Vite
│   ├── vite.config.ts            # Vite bundler configuration
│   └── vercel.json               # Vercel deployment rewrites and caching headers
│
├── backend/                      # Production Node.js + Express + TypeScript API
│   ├── src/
│   │   ├── config/               # Database, CORS, and environment configuration
│   │   ├── controllers/          # HTTP request handlers and validation envelopes
│   │   ├── services/             # Core solar business logic and state managers
│   │   ├── routes/               # Modular Express API route endpoints
│   │   ├── models/               # Database schema entity interfaces
│   │   ├── middleware/           # RBAC auth, audit logger, and error handlers
│   │   ├── utils/                # Safe numeric parsing, response builders, loggers
│   │   ├── integrations/         # NASA POWER, OpenWeather, OSM Nominatim, NREL PVDAQ
│   │   ├── jobs/                 # Automated background warranty checks & digest jobs
│   │   ├── types/                # Backend TypeScript types
│   │   ├── app.ts                # Express application factory
│   │   └── server.ts             # Production HTTP listener entrypoint
│   ├── prisma/                   # PostgreSQL Prisma schema and relations
│   ├── seed/                     # Demo database seeder script
│   ├── tests/                    # Automated unit and integration test suite
│   ├── main.py                   # Render Python FastAPI companion entrypoint
│   ├── requirements.txt          # Python runtime dependencies
│   ├── runtime.txt               # Render Python version declaration
│   ├── .env.example              # Backend environment template
│   ├── package.json              # Backend dependencies and test scripts
│   └── tsconfig.json             # TypeScript compiler settings for NodeNext
│
├── docs/                         # Comprehensive Engineering & Mentor Documentation
│   ├── architecture.md           # System architecture, data flow & security model
│   ├── api-documentation.md      # Complete REST API route catalog with schemas
│   ├── database-schema.md        # PostgreSQL relational schema and ER models
│   ├── deployment-guide.md       # Vercel and Render deployment instructions
│   ├── data-sources.md           # NASA, OpenWeather, OSM data attribution & licensing
│   ├── demo-script.md            # Step-by-step 3-5 minute presentation walkthrough
│   ├── project-structure.md      # Directory layout and component guide (this file)
│   └── repository-cleanup-report.md # Migration log, moved files, and validation summary
│
├── data/                         # Verified Public Solar & Meteorological Datasets
│   ├── raw/                      # Raw immutable JSON from NASA POWER (Jodhpur, Chennai)
│   └── clean/                    # Processed solar benchmarking comparison matrices
│
├── scripts/                      # Automation & Deployment Utilities
│   ├── setup.sh                  # One-command full-stack project installer (Linux/macOS)
│   ├── setup.bat                 # One-command full-stack project installer (Windows)
│   ├── seed.ts                   # Demo data seeder
│   └── deploy-check.js           # Automated pre-deployment validation test runner
│
├── sunpower_solutions/           # Odoo ERP Addon Module (Enterprise Backend Variant)
│   ├── models/                   # Native Odoo ORM models for leads, dispatches, warranties
│   ├── views/                    # XML form, list, and kanban views
│   ├── security/                 # User access control lists (ir.model.access.csv)
│   └── __manifest__.py           # Odoo module metadata and dependencies
│
├── .gitignore                    # Robust git ignore rules preventing secret/cache leaks
├── README.md                     # Five-minute mentor and judge executive guide
├── package.json                  # Root workspace convenience scripts
├── Procfile                      # Render process manager definition
├── render.yaml                   # Infrastructure-as-code for Render backend
└── vercel.json                   # Root-level Vercel routing configuration
```

---

## Detailed Directory Responsibilities

### 1. `frontend/`
- Contains all client-side code running in modern web browsers.
- Built using **React 18**, **TypeScript 5**, and **Vite 6** styled with **Tailwind CSS**.
- Follows a feature-based architecture under `src/features/` where related views, logic, and state are co-located.
- Core utilities are centralized:
  - `src/lib/api.ts`: Central Axios client configured with automatic fallback, error tolerance, and backend origin discovery.
  - `src/lib/number.ts`: Safe number conversion preventing `NaN` or `undefined` values across financial metrics.
  - `src/routes/AppRoutes.tsx`: Clean routing architecture supporting canonical top-level routes and legacy `/app/*` aliases.

### 2. `backend/`
- Enterprise-grade RESTful API built with **Node.js**, **Express**, and **TypeScript**, with a companion **FastAPI** Python application for Render hosting versatility.
- Adheres to the Controller-Service-Repository pattern:
  - **Controllers**: Handle HTTP request validation, parameter unpacking, and JSON responses.
  - **Services**: Execute solar domain calculations, inventory allocation, warranty generation, and data filtering.
  - **Models**: Strongly typed schema structures mirroring PostgreSQL tables.
  - **Integrations**: Connect directly to official scientific APIs: NASA POWER, OpenWeatherMap, OpenStreetMap Nominatim, and NREL PVDAQ.

### 3. `docs/`
- Contains complete project documentation organized for judges, mentors, and developers.
- Every architectural decision, schema relationship, external API integration, and deployment step is thoroughly documented.

### 4. `data/`
- Stores authentic, unmanipulated public datasets used for solar irradiance benchmarking:
  - `data/raw/nasa_power_jodhpur_raw.json`: Solar direct normal irradiance from NASA CERES satellites for India's highest solar radiation zone.
  - `data/raw/nasa_power_chennai_raw.json`: Coastal monsoon solar profile.
  - `data/clean/solar_comparison_clean.json`: Cleaned monthly benchmarking records.

### 5. `scripts/`
- Provides turnkey scripts for setting up local development, seeding sample records, and executing automated pre-flight checks before deployment.
