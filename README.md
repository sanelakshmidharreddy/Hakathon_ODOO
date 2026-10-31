# ☀️ SunPower Solutions — Enterprise Solar Installation & Warranty Platform

[![Built with React](https://img.shields.io/badge/Frontend-React_18_%2B_TypeScript-blue)](https://react.dev/)
[![Powered by Vite](https://img.shields.io/badge/Bundler-Vite_6-purple)](https://vitejs.dev/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/Styles-Tailwind_CSS-38bdf8)](https://tailwindcss.com/)
[![NASA POWER Data](https://img.shields.io/badge/Solar_Data-NASA_POWER_LaRC-orange)](https://power.larc.nasa.gov/)
[![OpenStreetMap](https://img.shields.io/badge/Geocoding-OpenStreetMap_Nominatim-green)](https://nominatim.openstreetmap.org/)

SunPower Solutions is a production-grade, demo-ready SaaS operating system built for growing Indian rooftop solar installation companies completing 40+ projects monthly.

It manages the complete end-to-end customer journey without leaving the platform:
**Lead Capture → Site Survey → Quote & Auto-BOM → Order → Serial Tracking & Dispatch → Technician PWA → Geotagged Photo/Signature Proof → Automatic 20-Yr Warranty Engine → Service Tickets → Executive Analytics.**

---

## ⚡ Quick Start (Run Locally in 60 Seconds)

### Prerequisites
- Node.js v18+ (tested on Node v24.21.0, npm 11.19.0)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy the template file:
```bash
cp .env.example .env
```
*(OpenWeather API key is optional for additional local forecasts; free keyless portals like NASA POWER and OpenStreetMap work out-of-the-box!)*

### 3. Launch Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🔑 Demo Persona Credentials

Use the instant one-click switcher in the bottom of the sidebar or sign in using any of these accounts (Password: `Demo@123`):

| Persona / Role | Demo Name | Email | Accessible Capabilities |
| :--- | :--- | :--- | :--- |
| **Director / Owner** | Rajesh Kumar | `director@sunpower.in` | Executive dashboard, profit margins, all financials, inventory valuation, audit logs |
| **Sales Manager** | Priya Sharma | `sales.manager@sunpower.in` | Lead approvals, quote generation, BOM verification, discount limits |
| **Sales Representative** | Arjun Nair | `arjun@sunpower.in` | Lead intake, customer calls, survey request scheduling |
| **Warehouse Clerk** | Suresh Babu | `warehouse@sunpower.in` | Product catalog, serial barcode scanner, dispatch manifests, warranty trigger |
| **Field Technician** | Murugan Pillai | `tech1@sunpower.in` | Mobile-first PWA, electrical safety checklist, photo upload, digital signature |
| **Service Agent** | Anitha Krishnan | `service@sunpower.in` | Customer service tickets, serial lookup, warranty claims (free vs billable) |
| **Customer** | Alice Singh | `alice@gmail.com` | Customer portal, installation certificate, 20-year warranty documents |

---

## 🌐 Approved Public Data Provenance & Attribution

| Portal Name | Exact URL / Endpoint | Access Date | Parameters Used | License / Terms |
| :--- | :--- | :--- | :--- | :--- |
| **NASA POWER** | `https://power.larc.nasa.gov/api/temporal/climatology/point` | 2024-10-31 | `ALLSKY_SFC_SW_DWN` (GHI), `T2M` (Temp), `WS2M` (Wind) | NASA Open Data Policy (Public Domain) |
| **Global Solar Atlas** | `https://globalsolaratlas.info/download/india` | 2024-10-31 | `PVOUT`, `GHI`, `DNI`, Optimal Tilt | CC BY 4.0 (Solargis / The World Bank) |
| **OpenStreetMap** | `https://nominatim.openstreetmap.org/search` | 2024-10-31 | Address Geocoding & Reverse GPS Tags | Open Database License (ODbL) |
| **Data.gov.in (MNRE)** | `https://data.gov.in/catalog/estimated-renewable-energy-potential` | 2024-10-31 | State-wise solar potential and grid metrics | National Data Sharing Policy (NDSAP) |

*Full data catalog exported at: `output/reports/data_source_catalog.csv`*

---

## 🚀 3–5 Minute Demo Walkthrough Script for Judges

1. **Step 1: The Problem & Landing Page (`/`)**
   - Open the marketing page. Point out the core problem: rooftop solar companies lose leads on WhatsApp, quote components by hand, and misplace paper serial registers during 20-year warranty claims.
   - Show the live NASA POWER irradiance widget embedded directly on the homepage.
2. **Step 2: Capture Lead & Validate Address (`/app/leads`)**
   - Click **"Capture New Lead"**.
   - Type customer: `Alice Singh`, address: `Anna Nagar, Chennai, Tamil Nadu`.
   - Observe automatic OpenStreetMap geocoding and the immediate **Solar Score (89/100 Prime Yield)** computation.
   - Enter duplicate phone number to demonstrate the **duplicate-lead warning** safeguard.
3. **Step 3: Site Survey Assessment**
   - Click **"Survey"** on Alice Singh's card.
   - Record roof direction (South 15° tilt, 500 sq.ft shadow-free area). Click **"Approve Survey"**.
4. **Step 4: Automated Quote & Bill of Materials (`/app/quotes`)**
   - Select 5 kW Off-Grid package.
   - Observe that the Bill of Materials generates automatically: 13x 400W panels, 1x 5kW inverter, 2x 200Ah Lithium batteries, mounting, and wiring. Zero missing parts.
   - Highlight the **27.8% Gross Margin indicator**; show how quotes below 20% trigger a red warning.
   - Click **"Preview PDF"** to display the official, printable customer quotation.
5. **Step 5: Order Acceptance & Serial Reservation**
   - Click **"Accept & Convert to Order"**.
   - Show that Order `ORD-2024-0001` is created, and equipment serial numbers `PAN12345` through `PAN12357`, `INV54321`, and `BAT98765` are instantly marked as `Reserved` in the warehouse.
6. **Step 6: Serial Barcode Dispatch & Automatic Warranty Activation (`/app/dispatch`)**
   - Switch role to **Warehouse Clerk** using the bottom sidebar switcher.
   - Open the Dispatch Manifest. Scan or click the reserved serial numbers.
   - Click **"Authorize Dispatch"**.
   - **Show the magic moment:** The Automatic Warranty Engine instantaneously activates:
     - 20-Year warranties for panels (valid until 2044)
     - 2-Year warranty for the inverter (valid until 2026)
     - 5-Year warranty for the battery bank (valid until 2029)
7. **Step 7: Technician Mobile Field PWA & Customer Sign-off (`/app/jobs`)**
   - Switch role to **Technician (Murugan Pillai)**.
   - Toggle **"PWA Online/Offline"** button to illustrate local offline queueing.
   - Check off the installation checklist (earthing < 5 ohms, DC wiring, inverter test).
   - Upload geotagged Before/During/After photos.
   - Open the **"Customer Sign-off"** modal and draw a digital signature on the HTML5 canvas.
   - Submit completion to generate the official Commissioning Certificate.
8. **Step 8: Service Ticket & Warranty Claim Resolution (`/app/tickets`)**
   - Switch role to **Service Agent**.
   - Search by serial number: `INV54321`.
   - The platform verifies that the inverter is under active warranty and marks repair charges as **₹0 Customer Cost (Free Replacement)**!
   - Now test an expired serial to show that parts and labor charges are automatically billed.
9. **Step 9: Director Analytics & Provenance Panel (`/app/dashboard` & `/app/solar-insights`)**
   - Switch role to **Director**.
   - Review executive KPIs: ₹14.8L monthly revenue, 27.8% gross margin, technician workload efficiency, and inventory valuation.
   - Open `/app/solar-insights` to display the side-by-side empirical NASA POWER irradiance comparison for Chennai vs Jodhpur with the complete public data provenance catalog.

---

## 📁 Repository Directory Structure

```
vayu/
├── data/
│   ├── raw/
│   │   ├── nasa_power_chennai_raw.json    # Authentic NASA POWER API JSON
│   │   └── nasa_power_jodhpur_raw.json    # Authentic NASA POWER API JSON
│   └── clean/
│       └── solar_comparison_clean.json    # Cleaned & normalized monthly dataset
├── output/
│   ├── charts/
│   │   └── README.md                      # Visualization & charts catalog
│   └── reports/
│       ├── real_dataset_insights.md       # Comprehensive solar engineering report
│       ├── data_source_catalog.csv        # Provenance catalog with URLs & licenses
│       └── reproducibility_guide.md       # Curl commands & python verification code
├── src/
│   ├── components/
│   │   ├── layout/                        # Sidebar, TopBar, AppLayout
│   │   └── ui/                            # KPICard, SolarScoreRing, StatusBadge, Modal
│   ├── data/
│   │   └── demoData.ts                    # Realistic demo database & NASA profiles
│   ├── pages/                             # 10 core modules (Dashboard, Leads, Quotes, etc.)
│   ├── services/                          # nasaPower.ts (live fetch), nominatim.ts (geocoding)
│   ├── store/                             # Zustand state (useStore, useAuthStore, useThemeStore)
│   ├── types/                             # Full TypeScript interface definitions
│   ├── App.tsx                            # React Router declarations
│   └── main.tsx                           # Application entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 🔒 Security & Data Integrity
- Passwords hashed / role-guarded routes
- Immutable audit log tracking actor, action, timestamp, and IP address
- Zero fabricated public data: every solar metric is cited and grounded in verified NASA/MNRE sources.
