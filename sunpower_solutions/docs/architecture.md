# SunPower Solutions Architecture: React/Node.js to Native Odoo Migration

## Executive Summary
This document provides a comparative architectural breakdown detailing the migration of **SunPower Solutions** from a fragmented, bespoke single-page application (React 18 + Node.js/Express + PostgreSQL + JWT) to a consolidated enterprise architecture built entirely on the **native Odoo tech stack** (Odoo 16/17/18 ORM + PostgreSQL + OWL JavaScript + QWeb Reports).

---

## 1. Architectural Evolution

```
BEFORE: Fragmented Bespoke Stack
┌─────────────────────────────────┐
│     React 18 SPA (Vite)         │ <── Frontend (Client-side Router)
│  (TailwindCSS, Lucide, Recharts)│
└────────────────┬────────────────┘
                 │ REST / JSON (JWT in LocalStorage)
┌────────────────▼────────────────┐
│      Node.js / Express API      │ <── Backend (Express Server)
│(Prisma/pg, Multer, bcrypt, CORS)│
└────────────────┬────────────────┘
                 │ TCP / SQL
┌────────────────▼────────────────┐
│     PostgreSQL Raw Database     │ <── Relational DB
└─────────────────────────────────┘

AFTER: Native Odoo Unified Tech Stack
┌────────────────────────────────────────────────────────┐
│               Odoo Web Client & OWL UI                │
│  (Kanban, Form, Pivot, Calendar, Graphs, QWeb PDFs,   │
│   OWL Barcode Scanner, Digital Signature Pad, OSM Map) │
└──────────────────────────┬─────────────────────────────┘
                           │ Native RPC / WebSockets
┌──────────────────────────▼─────────────────────────────┐
│                 Odoo Server Framework                  │
│ (Python Models, ORM Constraints, Automated Workflows,  │
│  Mail Thread Audit Trails, Nightly Cron, Scheduled Job)│
└──────────────────────────┬─────────────────────────────┘
                           │ Odoo ORM (Managed Schema)
┌──────────────────────────▼─────────────────────────────┐
│           PostgreSQL Enterprise Database               │
└────────────────────────────────────────────────────────┘
```

---

## 2. Component Migration Matrix

| Architectural Layer | Previous Bespoke Stack | Native Odoo Stack | Architectural Advantage |
| :--- | :--- | :--- | :--- |
| **User Interface** | React + React Router + Vite | Odoo Backend Views (XML) + OWL 2 | Eliminates routing 404s; native breadcrumbs, search, multi-view drilldowns. |
| **State Management** | Zustand / React useState | Odoo ORM Record Lifecycle | Eliminates client-server state drift; atomic DB transactions. |
| **Authentication & Security** | JWT tokens in browser LocalStorage | Odoo Session Auth + `ir.model.access.csv` + Record Rules | Granular role-based security, multi-company support, zero JWT leakage risk. |
| **File / Photo Storage** | Multer + local disk uploads (`/uploads`) | Odoo `fields.Binary` & `ir.attachment` | Native deduplication, automatic thumbnails, PostgreSQL BLOB or filestore. |
| **Audit & Communication** | Custom history tables | `mail.thread` & `mail.activity.mixin` (Chatter) | Built-in audit trail, mentions, scheduled activities, customer emails. |
| **Document Generation** | Client-side jsPDF / html2canvas | Odoo QWeb Reports (wkhtmltopdf) | Pixel-perfect vector PDFs for Quotations, Invoices, Certificates. |
| **Scheduled Tasks** | Node-cron / Agenda | `ir.cron` (Odoo Scheduled Actions) | Fail-safe database-driven execution; automatic 20-year warranty tracking. |
| **Hardware Scanning** | React HTML5-QRCode component | OWL `SerialScannerWidget` | Integrated direct RPC to `sunpower.dispatch` with duplicate prevention. |
| **Customer Sign-Off** | React Signature Canvas | OWL `SignaturePadWidget` | Native base64 image capture linked directly to `sunpower.signature`. |

---

## 3. Core Workflow State Machines

### 3.1 Lead to Sales Order Flow
1. **Lead Capture:** Created via web form, WhatsApp webhook, or sales entry. Phone number checked via SQL constraint to prevent active duplicate records.
2. **Site Survey Gate:** `sunpower.survey` record must be in state `approved` before quotation can be created.
3. **Automated BOM Quotation:** `sunpower.quote` automatically calculates required hardware quantities:
   - Panel count: `round((capacity * 1000) / 400)`
   - Inverter count: 1 unit matched to capacity
   - Off-Grid trigger: Adds Lithium Battery Bank automatically
   - Margin rule: Untaxed Subtotal vs Cost verified; warns if margin < 10%
4. **Order Confirmation:** Accepting quotation generates `sunpower.order`, reserves inventory serials, and notifies warehouse.

### 3.2 Dispatch to Automatic 20-Year Warranty Flow
1. **Dispatch Manifest:** Warehouse supervisor opens `sunpower.dispatch`.
2. **Serial Barcode Scanning:** Each hardware asset scanned via OWL scanner or input. Duplicate scans rejected with notification.
3. **Gate Rule:** Dispatch cannot be confirmed until 100% of required serials are verified.
4. **Automatic Warranty Activation:** On `action_confirm_dispatch()`:
   - `sunpower.warranty` records auto-generated for every scanned serial
   - Start Date = Dispatch Date
   - End Date = Start Date + `product.warranty_years` (20 years for panels, 2 years for inverters/batteries)
   - Status set to `active`

### 3.3 After-Sales Service & Warranty Verification
1. **Service Ticket:** Created against customer and serial number.
2. **Warranty Check:** System queries `sunpower.warranty` for active validity.
3. **Financial Gate:**
   - Active Warranty: Repair and labour charges set to ₹0.00.
   - Expired Warranty: Itemized billing for replacement parts and field labour.

---

## 4. Security & Compliance
- Role-based separation across 7 distinct user groups: Director, Sales Manager, Sales User, Warehouse User, Field Technician, Service Agent, Customer Portal User.
- Record rules ensure field technicians only see jobs assigned to them, while Sales Users access their assigned leads.
- Full compliance with MNRE Rooftop Phase II and PM Surya Ghar Muft Bijli Yojana documentation standards.
