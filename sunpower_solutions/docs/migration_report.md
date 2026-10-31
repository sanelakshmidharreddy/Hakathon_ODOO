# SunPower Solutions: Architecture Migration Report

## 1. Migration Scope Overview
This report documents the migration of SunPower Solutions from the legacy React 18 + Node.js/Express single-page architecture to the native Odoo custom module `sunpower_solutions`.

---

## 2. Component Migration Mapping

### 2.1 Frontend / View Layer
| Legacy React Page / Component | Replaced by Native Odoo View / OWL Component | Status |
| :--- | :--- | :---: |
| `src/pages/LandingPage.tsx` | Odoo Website / Backend Portal (`menu_sunpower_root`) | Migrated |
| `src/pages/DashboardPage.tsx` | `SunPowerDirectorDashboard` OWL Action & Pivot Analytics | Migrated |
| `src/pages/LeadsPage.tsx` | `sunpower.lead` Kanban, Tree, & Form Views | Migrated |
| `src/pages/QuotesPage.tsx` | `sunpower.quote` Form View with Auto-BOM & Margins | Migrated |
| `src/pages/DispatchPage.tsx` | `sunpower.dispatch` Form View + `SerialScannerWidget` | Migrated |
| `src/pages/TechnicianPage.tsx` | `sunpower.job` Mobile Form + `SignaturePadWidget` | Migrated |
| `src/pages/TicketsPage.tsx` | `sunpower.service.ticket` Kanban & Warranty Coverage Pill | Migrated |
| `src/pages/AnalyticsPage.tsx` | Odoo Native Graph, Pivot, & Financial Margin Reports | Migrated |
| `src/components/QRScannerModal.tsx` | OWL `SerialScannerWidget` (`static/src/js/serial_scanner.js`) | Migrated |
| `src/components/SignatureModal.tsx`| OWL `SignaturePadWidget` (`static/src/js/signature_pad.js`) | Migrated |
| `src/components/PhotoUpload.tsx` | `sunpower.site.photo` Geotagged Kanban & Binary Widget | Migrated |
| `src/components/MapWidget.tsx` | OWL `InstallationMapWidget` (OpenStreetMap Integration) | Migrated |

### 2.2 Backend & Business Logic Layer
| Legacy Node/Express Endpoint | Replaced by Odoo ORM Model / Controller Method | Status |
| :--- | :--- | :---: |
| `POST /api/leads` | `sunpower.lead.create()` & `/api/v1/webhook/lead` | Migrated |
| `POST /api/quotes/calculate` | `sunpower.quote.action_generate_bom()` | Migrated |
| `POST /api/dispatch/scan` | `sunpower.dispatch.action_scan_serial()` | Migrated |
| `POST /api/jobs/complete` | `sunpower.job.action_complete()` | Migrated |
| `GET /api/solar/nasa` | `sunpower.solar.site.action_sync_nasa_data()` | Migrated |
| `GET /api/solar/geocode` | `controllers/geocoding.py` (Nominatim API) | Migrated |
| `POST /api/auth/login` | Odoo Native Session Authentication & User Groups | Migrated |
| `Multer /upload` | Odoo `fields.Binary` & `ir.attachment` | Migrated |
| `cron/warranty_check.js` | Odoo Scheduled Action `_cron_update_warranty_status` | Migrated |

### 2.3 Database Schema Layer
| Legacy Table / Prisma Model | Native Odoo Model | Status |
| :--- | :--- | :---: |
| `users` | `res.users` with `sunpower.groups` | Migrated |
| `customers` | `sunpower.customer` | Migrated |
| `leads` | `sunpower.lead` | Migrated |
| `surveys` | `sunpower.survey` | Migrated |
| `products` | `sunpower.product` | Migrated |
| `quotes` / `quote_items` | `sunpower.quote` / `sunpower.quote.line` | Migrated |
| `orders` | `sunpower.order` | Migrated |
| `serials` | `sunpower.inventory.serial` | Migrated |
| `dispatches` / `dispatch_items` | `sunpower.dispatch` / `sunpower.dispatch.line`| Migrated |
| `warranties` | `sunpower.warranty` | Migrated |
| `jobs` | `sunpower.job` | Migrated |
| `site_photos` | `sunpower.site.photo` | Migrated |
| `signatures` | `sunpower.signature` | Migrated |
| `service_tickets` | `sunpower.service.ticket` | Migrated |
| `invoices` | `sunpower.invoice` | Migrated |
| `payments` | `sunpower.payment` | Migrated |
| `subsidies` | `sunpower.subsidy` | Migrated |
| `solar_sites` | `sunpower.solar.site` | Migrated |

---

## 3. Preserved Business Features & Mathematical Precision
1. **Automated Solar Climatology:** Real NASA POWER API irradiance fetching with derating formulas and solar score computation (0–100 scale).
2. **Dynamic BOM Quoting:** Off-grid detection triggers battery storage; commercial margin percentages calculated with warning thresholds.
3. **Serial Barcode Scanning:** Uniqueness validation with duplicate detection.
4. **Automatic 20-Year Warranty Activation:** Warranties automatically created on dispatch confirmation with start date = dispatch date and end date = start date + product warranty years.
5. **Warranty Service Gate:** Free repair for active warranties (₹0.00) vs. billable parts/labour for expired assets.
6. **Government Subsidies:** Direct milestone tracking for PM Surya Ghar Muft Bijli Yojana.

---

## 4. Key Improvements Gained
* **Zero Routing Failures:** All views render natively through Odoo's web client without SPA route mismatch issues.
* **Auditability:** Complete chatter history (`mail.thread`) tracks every status change, salesperson note, and customer interaction.
* **QWeb Reporting:** Pixel-perfect vector PDFs replace client-side canvas PDF generation.
* **Enterprise Security:** Multi-level permissions (`ir.model.access.csv` + record rules) secure customer and company data.
