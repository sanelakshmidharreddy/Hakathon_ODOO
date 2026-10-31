# SunPower Solutions: 3–5 Minute Live Hackathon Demo Script

## Judge Presentation Overview
* **Presenter Persona:** Lead Solar Architect & Systems Engineer
* **Objective:** Demonstrate how SunPower Solutions replaces a fragile React/Node setup with an enterprise native Odoo ERP that governs the complete lifecycle:
  `Lead → Site Survey → Auto-BOM Quote → Order → Warehouse Dispatch → Barcode Serials → 20-Year Automatic Warranty → Field Installation & Signatures → Service Tickets → Director Cockpit`.
* **Demo Narrative:** The complete customer journey of **Alice Singh (5kW Off-Grid Rooftop Solar, Bengaluru)**.

---

## Timeline & Step-by-Step Flow

### Minute 0:00 – 0:45: The Problem & The Solution
> *"Good morning judges. Rooftop solar companies in India currently suffer from a disconnected software nightmare: leads in Google Forms, engineering drawings on WhatsApp, quotations in Excel, and warranties lost on paper. When an inverter trips 4 years later, nobody knows if it's under warranty.*
>
> *We migrated SunPower Solutions from a fragile custom React/Node app into a 100% native Odoo enterprise module. Let's see the entire lifecycle in action."*

### Minute 0:45 – 1:30: Climatology & Technical Survey Gate
1. Navigate to **SunPower Solar → CRM & Sales → Solar Leads**.
2. Open lead **Alice Singh (LEAD-2026-0001)**:
   - Highlight **Solar Score: 88.5/100 (Prime Solar Site)**.
   - Point out the **NASA POWER Irradiance**: $5.24\text{ kWh/m}^2/\text{day}$, average temperature $26.5^\circ\text{C}$, specific annual yield $1,450\text{ kWh/kWp}$.
   - Click **Data Provenance** tab: Explain that all irradiance comes from NASA POWER and Solargis with visible licenses.
3. Show the **Survey Gate**:
   - Open **Survey (SRV-2026-0001)** with roof tilt ($15^\circ$ south), shadow-free area ($550\text{ sq ft}$), and state **Approved**.
   - Explain: *"Our ORM enforces an engineering gate: a commercial quotation cannot be generated until the technical survey is officially approved."*

### Minute 1:30 – 2:30: Auto-BOM Quoting & Order Confirmation
1. Open quotation **QUO-2026-0001**:
   - System Type: **Off-Grid**, Capacity: **5.0 kWp**.
   - Show how Odoo automatically generated the engineering Bill of Materials:
     - 13x SunMax 400W Mono-PERC Panels (20-Year Warranty)
     - 1x Growatt 5kW Hybrid Inverter
     - 1x Luminous 200Ah Lithium Battery Bank (added automatically because system is Off-Grid)
     - Hot-dip galvanized mounting structures, copper cabling, and safety arrestors.
   - Show financial calculation: Untaxed ₹2,75,000, GST ₹37,950, Total ₹3,07,950 with **21.8% operating margin**.
   - Click **Print → Customer Solar Quotation**: Show the clean, branded QWeb PDF report.
2. Click **Confirm Order** → Transitions to `sunpower.order` (SO-2026-0001).

### Minute 2:30 – 3:30: Warehouse Scanning & Automatic 20-Year Warranty
1. Switch persona to Warehouse Coordinator: Open **Warehouse & Dispatch → Dispatch Manifests → DSP-2026-0001**.
2. Demonstrate the custom **OWL Barcode Scanner widget**:
   - Type or scan serial `PAN12345`.
   - Try scanning `PAN12345` again: Point out instant duplicate error preventing human mistake.
   - Demonstrate the **Gate Check**: *"The manifest blocks confirmation until 100% of required serials are verified."*
3. Click **Confirm Dispatch & Register Warranties**:
   - Navigate to **Warranties & Service → Asset 20-Year Warranties**.
   - **Show the magic:** The system automatically created warranty records for every serial!
   - Show panel `PAN12345`: Start date = `15-Jan-2026`, End date = `15-Jan-2046` (**20-year coverage active**).
   - Click **Print → Digital Warranty Certificate**: Show the official certificate with QR code verification.

### Minute 3:30 – 4:15: Field Installation, Geotagged Photos & Signature
1. Open **Field Installation → Installation Jobs → JOB-2026-0001**.
2. Show the field technician screen:
   - Installed capacity: 5.0 kWp.
   - Electrical test results: $V_{\text{oc}} = 480\text{V}$, $I_{\text{sc}} = 9.8\text{A}$, earth pit $1.4\ \Omega$.
   - Geotagged site inspection photos (Before, During, After).
   - Custom **OWL Signature Pad widget**: Show customer Alice Singh's captured digital signature canvas.
3. Click **Print → Commissioning Certificate**: Show the customer sign-off PDF with digital signature.

### Minute 4:15 – 5:00: Service Ticket (Warranty Safeguard) & Director Cockpit
1. Open **Warranties & Service → Service & RMA Tickets**:
   - Show ticket for Alice Singh's inverter.
   - Highlight **Warranty Status: Under Warranty**.
   - Show financial charge: **Total Customer Payable = ₹0.00**.
   - Explain: *"If the asset were expired, Odoo automatically computes billable replacement parts and technician labour. Here, the active warranty protects the customer."*
2. Open **Executive Dashboard**:
   - Real-time revenue, gross profit, margin %, active jobs, and low stock valuation.
   - Drill down directly into open quotes or overdue jobs with one click.
3. **Closing Statement:**
   > *"By migrating to native Odoo, SunPower Solutions gains rock-solid data integrity, zero custom backend maintenance, automated 20-year asset tracking, and full compliance with government PM Surya Ghar standards. Thank you!"*
