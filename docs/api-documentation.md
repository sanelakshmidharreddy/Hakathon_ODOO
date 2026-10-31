# SunPower Solutions — REST API Documentation

## Base URLs
- **Production Render API**: `https://hakathon-odoo.onrender.com`
- **Local Development**: `http://localhost:5000`

All endpoints are prefixed with `/api` except `/health`.

---

## 1. System Health
### `GET /health`
- **Purpose**: Service liveness and readiness probe for Render/Kubernetes.
- **Role Required**: Public
- **Response `200 OK`**:
```json
{
  "status": "ok",
  "service": "sunpower-solutions-backend",
  "timestamp": "2026-10-31T10:00:00.000Z",
  "uptimeSeconds": 1420
}
```

---

## 2. Authentication & Session
### `POST /api/auth/login`
- **Purpose**: Authenticates a user or demo role and returns a signed JWT.
- **Role Required**: Public
- **Request Body**:
```json
{
  "email": "director@sunpower.in",
  "role": "director"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "data": {
    "token": "jwt-1730369800-demo",
    "user": {
      "id": "usr-1",
      "email": "director@sunpower.in",
      "role": "director"
    }
  }
}
```

---

## 3. Leads CRM & Site Surveys
### `GET /api/leads`
- **Purpose**: Lists all prospective customer leads and survey statuses.
- **Role Required**: `sales_rep`, `director`, `surveyor`
- **Response `200 OK`**:
```json
{
  "success": true,
  "data": [
    {
      "id": "lead-1",
      "customerName": "Sanjay Verma",
      "phone": "+91 98450 12345",
      "city": "Hyderabad",
      "state": "Telangana",
      "status": "site_survey",
      "systemCapacityKw": 5,
      "solarScore": 92,
      "monthlyBill": 4500,
      "createdAt": "2026-10-31T09:00:00.000Z"
    }
  ]
}
```

### `POST /api/leads`
- **Purpose**: Ingests a new rooftop solar lead.
- **Role Required**: `sales_rep`, `director`
- **Request Body**:
```json
{
  "customerName": "Ritu Sharma",
  "phone": "+91 98111 22334",
  "city": "Jaipur",
  "state": "Rajasthan",
  "systemCapacityKw": 4,
  "solarScore": 94,
  "monthlyBill": 3600
}
```
- **Response `201 Created`**:
```json
{
  "success": true,
  "data": {
    "id": "lead-1730370123",
    "customerName": "Ritu Sharma",
    "status": "new"
  }
}
```

### `PATCH /api/leads/:id/status`
- **Purpose**: Transitions a lead through the pipeline (`contacted`, `site_survey`, `quote_sent`, `won`, `lost`).
- **Role Required**: `sales_rep`, `director`

---

## 4. Quotes & Bill of Materials
### `GET /api/quotes`
- **Purpose**: Retrieves all customer proposals, equipment costs, and profit margins.
- **Role Required**: `sales_rep`, `accountant`, `director`
- **Response `200 OK`**:
```json
{
  "success": true,
  "data": [
    {
      "id": "q-101",
      "leadId": "lead-2",
      "customerName": "Meenakshi Iyer",
      "capacityKw": 3,
      "totalAmount": 185000,
      "equipmentCost": 110000,
      "installationCost": 15000,
      "labourCost": 9000,
      "marginPercent": 27.5,
      "status": "approved"
    }
  ]
}
```

### `POST /api/quotes`
- **Purpose**: Creates an automated quote with live PM Surya Ghar subsidy calculations.
- **Role Required**: `sales_rep`, `director`

---

## 5. Warehouse Dispatch & Serial Tracking
### `GET /api/dispatches`
- **Purpose**: Returns outbound inventory dispatches and destination sites.
- **Role Required**: `warehouse_manager`, `technician`, `director`
- **Response `200 OK`**:
```json
{
  "success": true,
  "data": [
    {
      "id": "dsp-201",
      "orderId": "SO-2026-089",
      "destination": "Hyderabad Site #4",
      "status": "dispatched",
      "truckNumber": "TS-09-UB-4421",
      "serialCount": 16
    }
  ]
}
```

### `POST /api/dispatches`
- **Purpose**: Records inventory dispatch and validates scanned solar panel barcodes.
- **Role Required**: `warehouse_manager`

---

## 6. Field Technician Jobs & Mobile PWA
### `GET /api/jobs`
- **Purpose**: Lists technician work orders, scheduled dates, and progress.
- **Role Required**: `technician`, `director`
- **Response `200 OK`**:
```json
{
  "success": true,
  "data": [
    {
      "id": "job-501",
      "customerName": "Ramesh Patel",
      "city": "Ahmedabad",
      "systemType": "5kW On-Grid",
      "technician": "Arun Kumar",
      "status": "in_progress",
      "completionPercentage": 70
    }
  ]
}
```

### `PATCH /api/jobs/:id/progress`
- **Purpose**: Updates job progress percentage, attaches photo proofs, and logs customer signature.
- **Role Required**: `technician`

---

## 7. Warranties Lifecycle
### `GET /api/warranties`
- **Purpose**: Retrieves all active 5-year warranty policies.
- **Role Required**: `service_coordinator`, `director`

### `POST /api/warranties/activate`
- **Purpose**: Triggered automatically when an installation job is marked `completed`.
- **Role Required**: `system`, `service_coordinator`

---

## 8. Service Tickets & Maintenance
### `GET /api/tickets`
- **Purpose**: Lists customer maintenance tickets and resolution SLAs.
- **Role Required**: `service_coordinator`, `technician`, `director`

### `POST /api/tickets`
- **Purpose**: Logs a new support ticket (`inverter_offline`, `generation_drop`, etc.).
- **Role Required**: `service_coordinator`, `sales_rep`

---

## 9. Executive Analytics
### `GET /api/analytics`
- **Purpose**: Returns high-level financial metrics, inventory valuations, and pipeline counts. Guaranteed finite numbers (never `NaN`).
- **Role Required**: `director`, `accountant`
- **Response `200 OK`**:
```json
{
  "monthlyRevenue": 2450000,
  "totalCost": 1780000,
  "grossProfit": 670000,
  "grossMargin": 27.3,
  "warehouseValue": 4250000,
  "activeJobs": 14,
  "completedJobs": 38,
  "activeWarranties": 42,
  "openTickets": 5,
  "leadConversionRate": 28.5,
  "pipelineLeads": 24,
  "co2SavedTonnes": 54.2
}
```

---

## 10. External Scientific Integrations
### `GET /api/nasa-power?city=jodhpur`
- **Purpose**: Queries NASA POWER satellite climatology data for direct normal solar irradiance.

### `GET /api/openweather?city=chennai`
- **Purpose**: Fetches real-time ambient temperature and cloud cover.

### `GET /api/pvdaq`
- **Purpose**: Returns NREL PV degradation factors for financial payback calculations.
