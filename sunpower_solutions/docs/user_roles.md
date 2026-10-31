# SunPower Solutions User Roles & Security Matrix

The `sunpower_solutions` module enforces strict role-based access control (RBAC) across 7 specialized user personas using Odoo groups, model access controls (`ir.model.access.csv`), and record rules (`ir.rule`).

---

## 1. Role Descriptions

### 1. SunPower Director (`group_sunpower_director`)
* **Scope:** Full enterprise-wide executive privileges.
* **Capabilities:** Unrestricted read/write across all financial metrics, margins, quotation approvals, dispatch manifests, warranty registries, and director dashboards.
* **Special Views:** Executive KPI dashboard, profit analytics, and audit chatter history.

### 2. SunPower Sales Manager (`group_sunpower_manager`)
* **Scope:** Solar business development leadership.
* **Capabilities:** Approves commercial quotations with discounts, reallocates sales leads, and oversees regional sales team targets.

### 3. SunPower Sales User (`group_sunpower_sales`)
* **Scope:** Frontline solar sales engineers.
* **Capabilities:** Ingests leads, schedules technical surveys, runs automated BOM quoting, and confirms sales orders.
* **Record Rule Restriction:** Can only view and edit their own assigned leads and quotations.

### 4. SunPower Warehouse User (`group_sunpower_warehouse`)
* **Scope:** Inventory & logistics coordinators.
* **Capabilities:** Manages solar hardware catalog, executes barcode scanning on serial numbers, and signs off on dispatch manifests.
* **Gate Safeguard:** Restricted from viewing quote margins or financial profit calculations.

### 5. SunPower Technician (`group_sunpower_technician`)
* **Scope:** Field rooftop installation crews.
* **Capabilities:** Mobile job execution, timer start/stop, geotagged before/during/after photo uploads, test result recording (Voc, Isc, Earth pit), and capturing customer canvas signatures.
* **Record Rule Restriction:** Can only view jobs where their user ID is in `technician_ids`.

### 6. SunPower Service Agent (`group_sunpower_service`)
* **Scope:** Post-commissioning customer care & RMA desk.
* **Capabilities:** Handles warranty claims, logs fault codes, checks real-time warranty status (₹0 for active vs. billable for expired), and assigns replacement serials.

### 7. SunPower Customer Portal User (`group_sunpower_portal`)
* **Scope:** End rooftop solar consumer.
* **Capabilities:** Read-only access to their own commissioned system, 20-year digital warranty certificates, invoices, and service ticket status.

---

## 2. Model Access Control Matrix (Summary)

| Model | Director | Sales Mgr | Sales User | Warehouse | Technician | Service Agent | Portal |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `sunpower.customer` | CRUD | CRUD | CRUD | R | R | CRUD | R (Own) |
| `sunpower.lead` | CRUD | CRUD | CRUD (Assigned) | - | - | - | - |
| `sunpower.survey` | CRUD | CRUD | CRUD | - | CRUD | - | - |
| `sunpower.product` | CRUD | CRUD | R | CRUD | R | R | R |
| `sunpower.quote` | CRUD | CRUD | CRUD | - | - | - | R (Own) |
| `sunpower.order` | CRUD | CRUD | CRUD | R | R | R | R (Own) |
| `sunpower.inventory.serial` | CRUD | R | R | CRUD | R | CRUD | - |
| `sunpower.dispatch` | CRUD | R | - | CRUD | R | - | - |
| `sunpower.warranty` | CRUD | R | R | R | R | CRUD | R (Own) |
| `sunpower.job` | CRUD | CRUD | R | R | CRUD (Assigned)| R | R (Own) |
| `sunpower.site.photo` | CRUD | R | R | - | CRUD | R | R (Own) |
| `sunpower.signature` | CRUD | R | R | - | CRUD | - | R (Own) |
| `sunpower.service.ticket` | CRUD | R | R | R | CRUD | CRUD | CRUD (Own)|
| `sunpower.invoice` | CRUD | CRUD | R | - | - | - | R (Own) |
| `sunpower.subsidy` | CRUD | CRUD | R | - | - | - | R (Own) |
| `sunpower.solar.site` | CRUD | CRUD | CRUD | - | R | - | R (Own) |
| `sunpower.dashboard.kpi`| CRUD | R | - | - | - | - | - |

*(Legend: CRUD = Create, Read, Update, Delete; R = Read-Only; - = No Access)*
