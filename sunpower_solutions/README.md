# SunPower Solutions &bull; Native Odoo Solar ERP Module

[![Odoo Version](https://img.shields.io/badge/Odoo-16%20%7C%2017%20%7C%2018-purple.svg)](https://www.odoo.com/)
[![License](https://img.shields.io/badge/License-LGPL--3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0.en.html)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-336791.svg)](https://www.postgresql.org/)

**SunPower Solutions** is a native Odoo enterprise application purpose-built for commercial and residential rooftop solar EPC (Engineering, Procurement, and Construction) companies. 

It manages the complete end-to-end solar customer journey:
$$\text{Lead} \longrightarrow \text{Site Survey} \longrightarrow \text{Auto-BOM Quote} \longrightarrow \text{Sales Order} \longrightarrow \text{Inventory Dispatch} \longrightarrow \text{Serial Tracking} \longrightarrow \text{20-Year Warranty} \longrightarrow \text{Field Installation} \longrightarrow \text{Photos/Signature} \longrightarrow \text{Service Ticket} \longrightarrow \text{Invoicing/Subsidy} \longrightarrow \text{Director Cockpit}$$

---

## 1. Why Odoo Was Chosen Over Bespoke React/Node Stack

| Feature Dimension | Bespoke React + Node.js Stack | Native Odoo ERP Architecture |
| :--- | :--- | :--- |
| **Data Integrity** | Fragmented SQL scripts, risk of client-server drift | Native Odoo ORM with atomic transactions & relational integrity |
| **Authentication & RBAC** | Custom JWTs in browser localStorage, security risks | Native session authentication, `ir.model.access.csv`, & record rules |
| **Views & UX** | Must hand-craft tables, forms, filters, and mobile views | Built-in Kanban, Tree, Form, Calendar, Pivot, Graph, & Search views |
| **Interactive Components** | Separate React libraries requiring manual API sync | Native OWL 2.0 components (`SerialScannerWidget`, `SignaturePadWidget`) |
| **Document Generation** | Client-side jsPDF with formatting inconsistencies | Professional QWeb vector PDFs for Quotations, Manifests, & Certificates |
| **Audit Trail** | Requires manual custom change-log tables | Native `mail.thread` (Chatter) with full audit history & activity tracking |
| **Automated Warranty Engine** | Fragile Node cron jobs prone to process termination | Robust database-backed `ir.cron` scheduled actions |

---

## 2. Directory Structure

```text
sunpower_solutions/
├── __init__.py
├── __manifest__.py
├── README.md
│
├── models/
│   ├── __init__.py
│   ├── sunpower_customer.py              # Customer & consumer master with GPS
│   ├── sunpower_lead.py                  # Lead ingestion with duplicate prevention
│   ├── sunpower_survey.py                # Technical survey & engineering approval gate
│   ├── sunpower_product.py               # Hardware catalog, pricing, & warranty years
│   ├── sunpower_quote.py                 # Automated BOM quoting & margin calculations
│   ├── sunpower_quote_line.py            # Itemized hardware quotation components
│   ├── sunpower_order.py                 # Sales order & financial milestones
│   ├── sunpower_inventory_serial.py      # Unique serial tracking & lifecycle states
│   ├── sunpower_dispatch.py              # Gate-check dispatch & auto-warranty engine
│   ├── sunpower_dispatch_line.py         # Barcode verified serial dispatch items
│   ├── sunpower_warranty.py              # 20-Year warranty contracts & nightly cron
│   ├── sunpower_job.py                   # Field installation, timer, & sign-off
│   ├── sunpower_site_photo.py            # Geotagged before/during/after site photos
│   ├── sunpower_signature.py             # Customer digital canvas signature capture
│   ├── sunpower_service_ticket.py        # Warranty verification (₹0 vs billable)
│   ├── sunpower_invoice.py               # Customer tax invoicing & balance due
│   ├── sunpower_payment.py               # Payment receipts & bank reconciliation
│   ├── sunpower_subsidy.py               # PM Surya Ghar / MNRE subsidy tracking
│   ├── sunpower_solar_site.py            # NASA POWER irradiance & solar score
│   ├── sunpower_external_data.py         # Data provenance & public portal registry
│   └── sunpower_dashboard.py             # Director executive KPI calculations
│
├── security/
│   ├── ir.model.access.csv               # Model-level permissions across 7 roles
│   ├── sunpower_groups.xml               # Director, Manager, Sales, Tech, Portal groups
│   └── sunpower_record_rules.xml         # Technician & Sales record-level filtering
│
├── views/
│   ├── sunpower_menus.xml                # Central hierarchical navigation menus
│   ├── sunpower_customer_views.xml       # Customer forms, smart buttons, & maps
│   ├── sunpower_lead_views.xml           # Kanban stages & pipeline view
│   ├── sunpower_survey_views.xml         # Survey engineering form & approval
│   ├── sunpower_product_views.xml        # Solar hardware & serial configuration
│   ├── sunpower_quote_views.xml          # BOM calculation & commercial margin view
│   ├── sunpower_order_views.xml          # Sales order execution & tracking
│   ├── sunpower_inventory_serial_views.xml # Serial asset registry & status
│   ├── sunpower_dispatch_views.xml       # Dispatch manifest & barcode scanner
│   ├── sunpower_warranty_views.xml       # 20-Year warranty registry & analytics
│   ├── sunpower_job_views.xml            # Installation jobs, calendar, & checklist
│   ├── sunpower_site_photo_views.xml     # Geotagged photo gallery & inspection
│   ├── sunpower_signature_views.xml      # Digital signatures & audit details
│   ├── sunpower_service_ticket_views.xml # Service tickets & warranty lookup
│   ├── sunpower_invoice_views.xml        # Invoicing, payments, & collections
│   ├── sunpower_subsidy_views.xml        # Government subsidy disbursement pipeline
│   ├── sunpower_solar_site_views.xml     # NASA irradiance & provenance analytics
│   └── sunpower_dashboard_views.xml      # Executive KPI cockpit client action
│
├── static/
│   ├── description/
│   │   ├── icon.png                      # Solar module application icon
│   │   └── index.html                    # App store presentation page
│   ├── src/
│   │   ├── js/
│   │   │   ├── serial_scanner.js         # OWL barcode & serial verification widget
│   │   │   ├── warranty_badge.js         # OWL active coverage status pill
│   │   │   ├── solar_score_widget.js     # OWL solar score gauge
│   │   │   ├── installation_map.js       # OWL OpenStreetMap location widget
│   │   │   ├── photo_gallery.js          # OWL site inspection photo grid
│   │   │   ├── signature_pad.js          # OWL HTML5 canvas touch signature widget
│   │   │   └── dashboard_widgets.js      # OWL Executive KPI cards & drilldowns
│   │   ├── xml/
│   │   │   ├── serial_scanner.xml        # Scanner component template
│   │   │   ├── warranty_badge.xml        # Badge component template
│   │   │   ├── solar_score_widget.xml    # Score component template
│   │   │   ├── installation_map.xml      # Map component template
│   │   │   ├── photo_gallery.xml         # Gallery component template
│   │   │   ├── signature_pad.xml         # Signature canvas template
│   │   │   └── dashboard_widgets.xml     # Dashboard cockpit template
│   │   └── scss/
│   │       ├── sunpower_main.scss        # Brand palette (Navy #005A9C & Amber #F59E0B)
│   │       ├── dashboard.scss            # Executive analytics layout
│   │       ├── field_app.scss            # Mobile technician UI optimizations
│   │       └── landing.scss              # Public portal styling
│
├── controllers/
│   ├── __init__.py
│   ├── main.py                           # Health check & public QR warranty verification
│   ├── solar_data.py                     # NASA POWER API proxy & climatology endpoint
│   ├── geocoding.py                      # OpenStreetMap Nominatim geocoder
│   └── webhook.py                        # Web form & WhatsApp lead intake webhook
│
├── reports/
│   ├── sunpower_report_templates.xml     # Common header/footer layout
│   ├── sunpower_quote_report.xml         # Customer Solar Quotation PDF
│   ├── sunpower_invoice_report.xml       # Customer Tax Invoice PDF
│   ├── sunpower_dispatch_report.xml      # Warehouse Dispatch Manifest PDF
│   ├── sunpower_installation_certificate.xml # Commissioning & Handover Certificate PDF
│   └── sunpower_warranty_certificate.xml # Official 20-Year Digital Warranty Certificate PDF
│
├── data/
│   ├── sequence_data.xml                 # Prefixes: LEAD-, SRV-, QUO-, SO-, DSP-, WAR-, JOB-, TCK-, INV-
│   ├── product_data.xml                  # Tier 1 Panels, Growatt Inverters, Lithium Batteries
│   ├── warranty_policy_data.xml          # Nightly cron schedule & public data provenance
│   ├── mail_template_data.xml            # Automated quotation & warranty email templates
│   └── dashboard_action_data.xml         # Default KPI tracking record
│
├── demo/
│   └── demo_data.xml                     # Full Alice Singh 5kW Off-Grid complete lifecycle
│
├── wizard/
│   ├── __init__.py
│   ├── sunpower_quote_wizard.py          # Quick quotation builder wizard
│   ├── sunpower_quote_wizard_views.xml   # Wizard dialog UI
│   ├── sunpower_dispatch_wizard.py       # Serial batch scanning wizard
│   └── sunpower_dispatch_wizard_views.xml # Dispatch dialog UI
│
├── tests/
│   ├── __init__.py
│   ├── test_lead_flow.py                 # Duplicate prevention & survey gate tests
│   ├── test_quote_margin.py              # Auto-BOM & commercial margin tests
│   ├── test_serial_tracking.py           # Serial uniqueness & reservation tests
│   ├── test_warranty_automation.py       # 20-Year calculation & cron expiry tests
│   ├── test_dispatch_validation.py       # Gate-check scan rule & warranty trigger
│   └── test_service_ticket.py            # Free repair vs billable charge tests
│
└── docs/
    ├── architecture.md                   # React/Node vs Odoo architecture comparison
    ├── data_sources.md                   # Verified public scientific data portals
    ├── user_roles.md                     # Security matrix & 7 user groups
    ├── demo_script.md                    # 3–5 minute judge presentation script
    ├── deployment_guide.md               # Setup, config, testing, & database maintenance
    └── migration_report.md               # Migration matrix of replaced components
```

---

## 3. Real Scientific Data Integration

SunPower Solutions does **not** simulate or fabricate solar irradiance or meteorological parameters. All climatological metrics are grounded in verified scientific portals:

1. **NASA POWER Climatology API:**
   - Real global horizontal irradiance (GHI) and direct normal irradiance (DNI) queried for exact site GPS coordinates.
   - Temperature at 2m applied to calculate crystalline module thermal derating ($0.35\% / ^\circ\text{C}$).
2. **Global Solar Atlas (Solargis / World Bank):**
   - Benchmark for Indian specific yield ($1,350 - 1,600\text{ kWh/kWp/year}$) and optimum tilt angles ($12^\circ - 15^\circ$ for South India; $24^\circ - 28^\circ$ for North India).
3. **OpenStreetMap & Nominatim:**
   - Real-time address geocoding and reverse geocoding with strict User-Agent compliance and coordinate caching.
4. **Data.gov.in & MNRE Guidelines:**
   - Subsidy schedules configured to PM Surya Ghar Muft Bijli Yojana (up to ₹78,000 central subsidy for residential systems up to 3 kWp).

---

## 4. Key Business Logic & Gate Safeguards

* **Duplicate Prevention:** SQL constraints prevent active duplicate leads for the same customer phone number.
* **Engineering Survey Gate:** A commercial quotation cannot be generated until the technical site survey is reviewed and approved by an engineer.
* **Dynamic BOM Generation:** 
  - Panels: `round((capacity * 1000) / 400)`
  - Hybrid/Off-Grid Inverter matched to capacity
  - Batteries automatically added only for Off-Grid systems
  - Commercial margin percentage calculated dynamically with warning thresholds for low-margin bids (< 10%).
* **Serial Barcode Scanning Gate:** Dispatch manifests block confirmation until 100% of required serial numbers are scanned. Duplicate scans trigger instant errors.
* **Automatic 20-Year Warranty Engine:** On dispatch confirmation:
  - Warranty records are created automatically for every scanned serial.
  - Start Date = Dispatch Date.
  - End Date = Start Date + `product.warranty_years` (20 years for panels, 2 years for inverters/batteries).
  - Nightly cron action updates status to `expiring_soon` (within 90 days) or `expired`.
* **Warranty-Protected Service Tickets:**
  - Active warranty = ₹0.00 parts and labour charge.
  - Expired warranty = Itemized customer billing.

---

## 5. Quick Start & Testing

### 5.1 Installation
```bash
# Clone repository
git clone https://github.com/sanelakshmidharreddy/Hakathon_ODOO.git

# Install module into Odoo database
odoo-bin -c odoo.conf -d sunpower_db -i sunpower_solutions
```

### 5.2 Upgrading
```bash
odoo-bin -c odoo.conf -d sunpower_db -u sunpower_solutions
```

### 5.3 Running Unit Tests
```bash
odoo-bin -c odoo.conf -d sunpower_db -i sunpower_solutions --test-enable --stop-after-init
```

---

## 6. Demo Script Summary (Alice Singh 5kW System)
To demonstrate the complete lifecycle to judges or stakeholders:
1. Open **CRM & Sales → Solar Leads → LEAD-2026-0001 (Alice Singh)**. Review NASA irradiance and 88.5 Solar Score.
2. View approved **Technical Survey (SRV-2026-0001)**.
3. Review auto-generated **Quotation (QUO-2026-0001)** with BOM components and 21.8% margin.
4. View **Dispatch Manifest (DSP-2026-0001)** with 15 verified hardware serial numbers.
5. Inspect **Asset Warranties**: Show panel `PAN12345` with active 20-year coverage (`2026-01-15` to `2046-01-15`).
6. Open **Installation Job (JOB-2026-0001)** with electrical test results, photos, and Alice's digital signature.
7. Open **Service Ticket (TCK-2026-0001)** to demonstrate automatic warranty verification yielding ₹0 customer charge.
8. Open **Executive Dashboard** to showcase real-time director KPIs.

---

## 7. License & Credits
* Developed by **SunPower Solutions Engineering Team**.
* Released under the **LGPL-3** License.
* Climatology data courtesy of **NASA POWER Project** and **Global Solar Atlas (Solargis / World Bank)**.
