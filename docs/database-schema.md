# SunPower Solutions — Database Schema & Data Models

## 1. Relational Entity-Relationship Diagram

```
[ User ]
   │ 1
   │ captures
   ▼ *
[ Lead ] ─── 1:1 ─── [ Site Survey ]
   │ 1
   │ generates
   ▼ *
[ Quote ]
   │ 1
   │ converts to
   ▼ 1
[ Sales Order ]
   ├─── 1:N ─── [ Dispatch ] ─── 1:N ─── [ Serial Scan ]
   ├─── 1:1 ─── [ Installation Job ] ─── 1:N ─── [ Site Photos & Signature ]
   └─── 1:1 ─── [ Warranty Policy ] ─── 1:N ─── [ Service Ticket ]
```

---

## 2. Table Specifications

### `User`
Stores authenticated staff credentials, security roles, and active states.
- `id` (UUID, Primary Key)
- `name` (String)
- `email` (String, Unique)
- `role` (Enum: `director`, `sales_rep`, `surveyor`, `warehouse_manager`, `technician`, `accountant`, `service_coordinator`)
- `isActive` (Boolean, Default: `true`)
- `createdAt` (Timestamp)

### `Lead`
Represents prospective solar residential or commercial clients.
- `id` (UUID, Primary Key)
- `customerName` (String)
- `phone` (String)
- `city` (String)
- `state` (String)
- `status` (Enum: `new`, `contacted`, `site_survey`, `quote_sent`, `won`, `lost`)
- `systemCapacityKw` (Float)
- `solarScore` (Integer, 0-100 derived from roof azimuth, tilt, and shading)
- `monthlyBill` (Float)
- `assignedToId` (UUID, Foreign Key → `User.id`)

### `Quote`
Detailed financial proposal and Bill of Materials (BOM) with subsidy breakdown.
- `id` (UUID, Primary Key)
- `leadId` (UUID, Foreign Key → `Lead.id`)
- `customerName` (String)
- `capacityKw` (Float)
- `totalAmount` (Float) — Customer payable price
- `equipmentCost` (Float) — Cost of panels, inverters, structure, BOS
- `installationCost` (Float) — Mounting and wiring cost
- `labourCost` (Float) — Electrician & crew wages
- `marginPercent` (Float) — Real-time calculated gross profit margin
- `status` (Enum: `draft`, `sent`, `approved`, `rejected`)

### `Order`
Confirmed installation project resulting from an accepted quote.
- `id` (UUID, Primary Key)
- `quoteId` (UUID, Foreign Key → `Quote.id`)
- `totalAmount` (Float)
- `status` (Enum: `confirmed`, `dispatched`, `installed`, `commissioned`)

### `Dispatch`
Warehouse shipment records for panels and inverters.
- `id` (UUID, Primary Key)
- `orderId` (UUID, Foreign Key → `Order.id`)
- `destination` (String)
- `truckNumber` (String)
- `serialCount` (Integer) — Total scanned components
- `status` (Enum: `pending`, `dispatched`, `delivered`)
- `dispatchedAt` (Timestamp)

### `Job`
Technician work orders executed on site.
- `id` (UUID, Primary Key)
- `orderId` (UUID, Foreign Key → `Order.id`)
- `customerName` (String)
- `city` (String)
- `systemType` (String)
- `technician` (String)
- `status` (Enum: `scheduled`, `in_progress`, `completed`, `commissioned`)
- `completionPercentage` (Integer, 0 to 100)
- `scheduledDate` (Date)
- `completedAt` (Timestamp)

### `Warranty`
Automated 5-year solar warranty policies activated upon completion.
- `id` (UUID, Primary Key)
- `orderId` (UUID, Foreign Key → `Order.id`)
- `customerName` (String)
- `capacityKw` (Float)
- `policyNumber` (String, Unique)
- `activationDate` (Date)
- `expiryDate` (Date) — Automatically set to `activationDate + 5 years`
- `status` (Enum: `active`, `expiring_soon`, `expired`)

### `ServiceTicket`
Customer maintenance and issue resolution tracking.
- `id` (UUID, Primary Key)
- `ticketNumber` (String, Unique)
- `customerName` (String)
- `city` (String)
- `issueType` (Enum: `inverter_offline`, `generation_drop`, `panel_damage`, `meter_error`, `routine_maintenance`)
- `priority` (Enum: `low`, `medium`, `high`, `critical`)
- `status` (Enum: `open`, `assigned`, `in_progress`, `resolved`, `closed`)
- `createdAt` (Timestamp)
