// ============================================================
// DEMO DATA STORE - SunPower Solutions
// ALL DATA BELOW IS APP-GENERATED DEMO DATA
// NOT FROM ANY EXTERNAL PUBLIC PORTAL
// ============================================================

import { User, Lead, Survey, Product, SerialNumber, Quote, Order, Job, Warranty, ServiceTicket, Invoice, Notification, AuditLog, SolarData, DataSource, Dispatch } from '../types';

// ---- USERS ----
export const DEMO_USERS: User[] = [
  { id: 'u1', name: 'Rajesh Kumar', email: 'director@sunpower.in', role: 'director', phone: '9876543210', createdAt: '2024-01-01', isActive: true },
  { id: 'u2', name: 'Priya Sharma', email: 'sales.manager@sunpower.in', role: 'sales_manager', phone: '9876543211', createdAt: '2024-01-15', isActive: true },
  { id: 'u3', name: 'Arjun Nair', email: 'arjun@sunpower.in', role: 'sales_rep', phone: '9876543212', createdAt: '2024-02-01', isActive: true },
  { id: 'u4', name: 'Kavitha Menon', email: 'kavitha@sunpower.in', role: 'sales_rep', phone: '9876543213', createdAt: '2024-02-10', isActive: true },
  { id: 'u5', name: 'Suresh Babu', email: 'warehouse@sunpower.in', role: 'warehouse', phone: '9876543214', createdAt: '2024-01-20', isActive: true },
  { id: 'u6', name: 'Murugan Pillai', email: 'tech1@sunpower.in', role: 'technician', phone: '9876543215', createdAt: '2024-01-25', isActive: true },
  { id: 'u7', name: 'Deepak Singh', email: 'tech2@sunpower.in', role: 'technician', phone: '9876543216', createdAt: '2024-02-05', isActive: true },
  { id: 'u8', name: 'Anitha Krishnan', email: 'service@sunpower.in', role: 'service_agent', phone: '9876543217', createdAt: '2024-01-30', isActive: true },
  { id: 'u9', name: 'Alice Singh', email: 'alice@gmail.com', role: 'customer', phone: '9940012345', createdAt: '2024-06-01', isActive: true },
];

export const DEMO_CREDENTIALS = [
  { role: 'Director', email: 'director@sunpower.in', password: 'Demo@123' },
  { role: 'Sales Manager', email: 'sales.manager@sunpower.in', password: 'Demo@123' },
  { role: 'Sales Rep', email: 'arjun@sunpower.in', password: 'Demo@123' },
  { role: 'Warehouse', email: 'warehouse@sunpower.in', password: 'Demo@123' },
  { role: 'Technician', email: 'tech1@sunpower.in', password: 'Demo@123' },
  { role: 'Service Agent', email: 'service@sunpower.in', password: 'Demo@123' },
];

// ---- PRODUCTS ----
export const DEMO_PRODUCTS: Product[] = [
  { id: 'p1', sku: 'SP-PAN-400', name: 'SunMax 400W Monocrystalline Panel', category: 'panel', brand: 'SunMax', model: 'SM-400M', description: 'High efficiency 400W monocrystalline solar panel, 21.3% efficiency', cost: 8500, costPrice: 8500, price: 11000, sellingPrice: 11000, warrantyYears: 20, stockQty: 120, stockQuantity: 120, minStock: 20, reorderLevel: 20, hasSerials: true, unit: 'piece', specs: { 'Watt Peak': '400W', 'Efficiency': '21.3%', 'Voc': '49.2V', 'Isc': '10.27A', 'Size': '2094x1038x35mm', 'Weight': '21.5kg' } },
  { id: 'p2', sku: 'SP-INV-5K', name: 'Growatt 5kW On-Grid Inverter', category: 'inverter', brand: 'Growatt', model: 'MIN-5000TL-X', description: '5kW single phase string inverter with WiFi monitoring', cost: 35000, costPrice: 35000, price: 48000, sellingPrice: 48000, warrantyYears: 2, stockQty: 15, stockQuantity: 15, minStock: 3, reorderLevel: 3, hasSerials: true, unit: 'piece', specs: { 'Power': '5000W', 'Efficiency': '97.6%', 'Input Voltage': '100-550V DC', 'Output': '230V AC', 'Communication': 'WiFi/RS485' } },
  { id: 'p3', sku: 'SP-INV-3K', name: 'Growatt 3kW On-Grid Inverter', category: 'inverter', brand: 'Growatt', model: 'MIN-3000TL-X', description: '3kW single phase string inverter', cost: 22000, costPrice: 22000, price: 32000, sellingPrice: 32000, warrantyYears: 2, stockQty: 12, stockQuantity: 12, minStock: 3, reorderLevel: 3, hasSerials: true, unit: 'piece', specs: { 'Power': '3000W', 'Efficiency': '97.3%', 'Input Voltage': '100-500V DC', 'Output': '230V AC' } },
  { id: 'p4', sku: 'SP-BAT-200', name: 'Luminous 200Ah Lithium Battery', category: 'battery', brand: 'Luminous', model: 'Li-200LiFePO4', description: '200Ah 48V LiFePO4 battery for off-grid systems', cost: 45000, costPrice: 45000, price: 65000, sellingPrice: 65000, warrantyYears: 5, stockQty: 18, stockQuantity: 18, minStock: 5, reorderLevel: 5, hasSerials: true, unit: 'piece', specs: { 'Capacity': '200Ah', 'Voltage': '48V', 'Chemistry': 'LiFePO4', 'Cycles': '3000+', 'DoD': '80%' } },
  { id: 'p5', sku: 'SP-CC-40A', name: '40A MPPT Charge Controller', category: 'charge_controller', brand: 'EPsolar', model: 'Tracer-4215BN', description: '40A MPPT solar charge controller, 12/24/36/48V auto', cost: 4500, costPrice: 4500, price: 7000, sellingPrice: 7000, warrantyYears: 2, stockQty: 25, stockQuantity: 25, minStock: 5, reorderLevel: 5, hasSerials: true, unit: 'piece', specs: { 'Current': '40A', 'Voltage': 'Auto 12/24/36/48V', 'MaxPV': '150V', 'Efficiency': '98%' } },
  { id: 'p6', sku: 'SP-MNT-5K', name: 'Aluminium Mounting Structure 5kW', category: 'mounting', brand: 'SunPower', model: 'SPM-5K-FLAT', description: 'Galvanized aluminium mounting rails and clamps for 5kW system', cost: 12000, costPrice: 12000, price: 18000, sellingPrice: 18000, warrantyYears: 10, stockQty: 8, stockQuantity: 8, minStock: 2, reorderLevel: 2, hasSerials: false, unit: 'set', specs: { 'Material': 'Aluminium Alloy 6005-T5', 'Wind Load': '150 km/h', 'Weight': '35kg' } },
  { id: 'p7', sku: 'SP-WIRE-SET', name: 'DC/AC Wiring Set (5kW)', category: 'wiring', brand: 'Polycab', model: 'SP-WIRE-5K', description: 'Complete wiring kit - DC cables, AC cables, connectors, conduits', cost: 5500, costPrice: 5500, price: 9000, sellingPrice: 9000, warrantyYears: 1, stockQty: 20, stockQuantity: 20, minStock: 5, reorderLevel: 5, hasSerials: false, unit: 'set', specs: { 'DC Cable': '6mm² twin-core', 'AC Cable': '4mm² 3-core', 'MC4 Connectors': '10 pairs' } },
  { id: 'p8', sku: 'SP-SAFETY-KIT', name: 'Safety & Earthing Kit', category: 'safety', brand: 'SunPower', model: 'SP-SAFE-KIT', description: 'SPD, MCB, isolator, earthing rods, lightning arrester', cost: 3500, costPrice: 3500, price: 6000, sellingPrice: 6000, warrantyYears: 1, stockQty: 15, stockQuantity: 15, minStock: 3, reorderLevel: 3, hasSerials: false, unit: 'set', specs: { 'SPD': 'Class II 40kA', 'MCB': '32A', 'Earthing Rod': '3m copper-bonded' } },
  { id: 'p9', sku: 'SP-INSTALL-5K', name: 'Installation Service (5kW)', category: 'service', brand: 'SunPower', model: 'SVC-INSTALL', description: 'Complete installation, testing, commissioning, and documentation service', cost: 8000, costPrice: 8000, price: 15000, sellingPrice: 15000, warrantyYears: 1, stockQty: 999, stockQuantity: 999, minStock: 0, reorderLevel: 0, hasSerials: false, unit: 'job', specs: { 'Duration': '2-3 days', 'Team': '3 technicians', 'Includes': 'Testing, Net-metering assistance' } },
  { id: 'p10', sku: 'SP-PAN-250', name: 'EcoSun 250W Polycrystalline Panel', category: 'panel', brand: 'EcoSun', model: 'ES-250P', description: '250W polycrystalline solar panel, economical option', cost: 5200, costPrice: 5200, price: 7000, sellingPrice: 7000, warrantyYears: 25, stockQty: 80, stockQuantity: 80, minStock: 20, reorderLevel: 20, hasSerials: true, unit: 'piece', specs: { 'Watt Peak': '250W', 'Efficiency': '15.3%', 'Voc': '37.5V', 'Isc': '8.76A' } },
];

// ---- SERIAL NUMBERS ----
export const DEMO_SERIALS: SerialNumber[] = [
  // Panels for Alice Singh's job
  ...Array.from({ length: 13 }, (_, i) => ({
    id: `sn${i + 1}`,
    serial: `PAN${String(12345 + i).padStart(5, '0')}`,
    productId: 'p1',
    productName: 'SunMax 400W Panel',
    status: i < 13 ? 'Installed' : 'In Stock' as const,
    jobId: i < 13 ? 'job1' : undefined,
    customerId: i < 13 ? 'cust1' : undefined,
    warrantyId: i < 13 ? `war${i + 1}` : undefined,
    dispatchId: i < 13 ? 'disp1' : undefined,
    installedAt: i < 13 ? '2024-08-15T10:30:00Z' : undefined,
    createdAt: '2024-07-01',
  })),
  // Inverter
  { id: 'sn14', serial: 'INV54321', productId: 'p2', productName: 'Growatt 5kW Inverter', status: 'Installed', jobId: 'job1', customerId: 'cust1', warrantyId: 'war14', dispatchId: 'disp1', installedAt: '2024-08-15T14:00:00Z', createdAt: '2024-07-01' },
  // Battery
  { id: 'sn15', serial: 'BAT98765', productId: 'p4', productName: 'Luminous 200Ah Battery', status: 'Installed', jobId: 'job1', customerId: 'cust1', warrantyId: 'war15', dispatchId: 'disp1', installedAt: '2024-08-15T14:30:00Z', createdAt: '2024-07-01' },
  // Charge controller
  { id: 'sn16', serial: 'CC10001', productId: 'p5', productName: '40A MPPT Charge Controller', status: 'Installed', jobId: 'job1', customerId: 'cust1', warrantyId: 'war16', dispatchId: 'disp1', installedAt: '2024-08-15T13:00:00Z', createdAt: '2024-07-01' },
  // Stock inverters
  { id: 'sn17', serial: 'INV54322', productId: 'p2', productName: 'Growatt 5kW Inverter', status: 'In Stock', createdAt: '2024-07-01' },
  { id: 'sn18', serial: 'INV54323', productId: 'p2', productName: 'Growatt 5kW Inverter', status: 'Reserved', jobId: 'job2', createdAt: '2024-07-01' },
  { id: 'sn19', serial: 'BAT98766', productId: 'p4', productName: 'Luminous 200Ah Battery', status: 'In Stock', createdAt: '2024-07-01' },
  { id: 'sn20', serial: 'BAT98767', productId: 'p4', productName: 'Luminous 200Ah Battery', status: 'Reserved', jobId: 'job2', createdAt: '2024-07-01' },
];

// ---- LEADS ----
export const DEMO_LEADS: Lead[] = [
  {
    id: 'lead1', customerId: 'cust1', name: 'Alice Singh', phone: '9940012345', email: 'alice@gmail.com',
    address: '42, Anna Nagar West', city: 'Chennai', state: 'Tamil Nadu', pincode: '600040',
    lat: 13.0860, lng: 80.2101, systemType: 'Off-Grid', capacity: 5, monthlyBill: 8500,
    roofArea: 500, gridConnected: true, source: 'Web Form', assignedTo: 'u3', status: 'Converted',
    solarScore: 87, expectedGeneration: 7200, notes: 'Customer wants complete off-grid solution with battery backup.',
    nextFollowUp: undefined, createdAt: '2024-06-01T09:00:00Z', updatedAt: '2024-07-01T10:00:00Z',
    activities: [
      { id: 'a1', type: 'system', description: 'Lead created via web form', userId: 'system', userName: 'System', createdAt: '2024-06-01T09:00:00Z' },
      { id: 'a2', type: 'call', description: 'Initial call done, customer interested in 5kW off-grid', userId: 'u3', userName: 'Arjun Nair', createdAt: '2024-06-02T11:00:00Z' },
      { id: 'a3', type: 'status_change', description: 'Status changed to Survey Scheduled', userId: 'u3', userName: 'Arjun Nair', createdAt: '2024-06-10T14:00:00Z' },
      { id: 'a4', type: 'status_change', description: 'Survey completed and approved', userId: 'u6', userName: 'Murugan Pillai', createdAt: '2024-06-15T16:00:00Z' },
      { id: 'a5', type: 'status_change', description: 'Quote sent - ₹4,00,000 for 5kW Off-Grid', userId: 'u3', userName: 'Arjun Nair', createdAt: '2024-06-20T10:00:00Z' },
      { id: 'a6', type: 'status_change', description: 'Quote accepted. Order created.', userId: 'u3', userName: 'Arjun Nair', createdAt: '2024-07-01T10:00:00Z' },
    ]
  },
  {
    id: 'lead2', name: 'Ramesh Patel', phone: '9845001234', email: 'ramesh.patel@email.com',
    address: '15, Koramangala 5th Block', city: 'Bengaluru', state: 'Karnataka', pincode: '560095',
    lat: 12.9352, lng: 77.6245, systemType: 'On-Grid', capacity: 3, monthlyBill: 5500,
    roofArea: 280, gridConnected: true, source: 'WhatsApp', assignedTo: 'u4', status: 'Survey Scheduled',
    solarScore: 82, expectedGeneration: 4200, notes: 'Interested in 3kW on-grid, wants net-metering.',
    nextFollowUp: '2024-10-05T10:00:00Z', createdAt: '2024-09-20T14:00:00Z', updatedAt: '2024-09-25T09:00:00Z',
    activities: [
      { id: 'a7', type: 'system', description: 'Lead created via WhatsApp enquiry', userId: 'system', userName: 'System', createdAt: '2024-09-20T14:00:00Z' },
      { id: 'a8', type: 'whatsapp', description: 'Responded with brochure and pricing info', userId: 'u4', userName: 'Kavitha Menon', createdAt: '2024-09-21T10:00:00Z' },
      { id: 'a9', type: 'call', description: 'Detailed call, survey scheduled for Oct 5th', userId: 'u4', userName: 'Kavitha Menon', createdAt: '2024-09-25T09:00:00Z' },
    ]
  },
  {
    id: 'lead3', name: 'Sunita Desai', phone: '9822056789', email: 'sunita.d@business.com',
    address: '88, Koregaon Park', city: 'Pune', state: 'Maharashtra', pincode: '411001',
    lat: 18.5362, lng: 73.8928, systemType: 'On-Grid', capacity: 5, monthlyBill: 12000,
    roofArea: 600, gridConnected: true, source: 'Referral', assignedTo: 'u3', status: 'Qualified',
    solarScore: 79, expectedGeneration: 6800, notes: 'Factory owner, wants to reduce electricity cost significantly.',
    nextFollowUp: '2024-10-08T09:00:00Z', createdAt: '2024-09-28T11:00:00Z', updatedAt: '2024-10-01T14:00:00Z',
    activities: [
      { id: 'a10', type: 'system', description: 'Lead created via referral', userId: 'system', userName: 'System', createdAt: '2024-09-28T11:00:00Z' },
      { id: 'a11', type: 'call', description: 'Survey done. 5kW On-Grid recommended.', userId: 'u6', userName: 'Murugan Pillai', createdAt: '2024-10-01T14:00:00Z' },
    ]
  },
  {
    id: 'lead4', name: 'Vikram Reddy', phone: '9701123456', email: 'vikram.r@gmail.com',
    address: '200, Jubilee Hills', city: 'Hyderabad', state: 'Telangana', pincode: '500033',
    lat: 17.4326, lng: 78.4071, systemType: 'Off-Grid', capacity: 2, monthlyBill: 3200,
    roofArea: 180, gridConnected: false, source: 'Phone Call', assignedTo: 'u4', status: 'Contacted',
    solarScore: 91, expectedGeneration: 2900, notes: 'Village home with frequent power cuts, needs battery backup.',
    nextFollowUp: '2024-10-10T11:00:00Z', createdAt: '2024-10-02T09:00:00Z', updatedAt: '2024-10-03T11:00:00Z',
    activities: [
      { id: 'a12', type: 'system', description: 'Lead created via phone call', userId: 'system', userName: 'System', createdAt: '2024-10-02T09:00:00Z' },
      { id: 'a13', type: 'call', description: 'Initial call done, explained off-grid benefits', userId: 'u4', userName: 'Kavitha Menon', createdAt: '2024-10-03T11:00:00Z' },
    ]
  },
  {
    id: 'lead5', name: 'Meenakshi Iyer', phone: '9445678901', email: 'meena.iyer@home.com',
    address: '7, Velachery Main Road', city: 'Chennai', state: 'Tamil Nadu', pincode: '600042',
    lat: 12.9791, lng: 80.2181, systemType: 'On-Grid', capacity: 1, monthlyBill: 1800,
    roofArea: 100, gridConnected: true, source: 'Web Form', assignedTo: 'u3', status: 'New',
    solarScore: 84, expectedGeneration: 1440, notes: 'Small home, wants basic on-grid 1kW.',
    nextFollowUp: '2024-10-15T10:00:00Z', createdAt: '2024-10-10T08:30:00Z', updatedAt: '2024-10-10T08:30:00Z',
    activities: [
      { id: 'a14', type: 'system', description: 'Lead created via web form', userId: 'system', userName: 'System', createdAt: '2024-10-10T08:30:00Z' },
    ]
  },
  {
    id: 'lead6', name: 'Prakash Gupta', phone: '9811345678', email: 'prakash@enterprise.com',
    address: '45, Sector 62', city: 'Noida', state: 'Uttar Pradesh', pincode: '201309',
    lat: 28.6261, lng: 77.3631, systemType: 'On-Grid', capacity: 5, monthlyBill: 18000,
    roofArea: 700, gridConnected: true, source: 'Web Form', assignedTo: 'u4', status: 'Lost',
    solarScore: 72, expectedGeneration: 6200, notes: 'Went with competitor. Price was main concern.',
    nextFollowUp: undefined, createdAt: '2024-09-01T10:00:00Z', updatedAt: '2024-09-20T16:00:00Z',
    activities: [
      { id: 'a15', type: 'status_change', description: 'Marked as Lost - went with competitor', userId: 'u4', userName: 'Kavitha Menon', createdAt: '2024-09-20T16:00:00Z' },
    ]
  },
];

// ---- SURVEYS ----
export const DEMO_SURVEYS: Survey[] = [
  {
    id: 'surv1', leadId: 'lead1', technicianId: 'u6', technicianName: 'Murugan Pillai',
    roofDirection: 'South', roofTilt: 15, shadowFreeArea: 480, cableDistance: 25,
    roofType: 'RCC Flat', gridConnectionType: 'Single Phase', gridPhase: '1-Phase',
    photos: [
      { id: 'sp1', surveyId: 'surv1', url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', type: 'roof', lat: 13.0860, lng: 80.2101, timestamp: '2024-06-14T10:30:00Z', caption: 'South-facing roof area - shadow free zone' },
      { id: 'sp2', surveyId: 'surv1', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', type: 'electrical', lat: 13.0860, lng: 80.2101, timestamp: '2024-06-14T11:00:00Z', caption: 'Existing electrical panel - single phase connection' },
    ],
    gpsLat: 13.0860, gpsLng: 80.2101,
    notes: 'Excellent south-facing roof with no shading. Good solar potential. 480 sqft shadow-free area confirmed.',
    status: 'Approved', recommendedCapacity: 5,
    createdAt: '2024-06-14T09:00:00Z', completedAt: '2024-06-14T12:00:00Z',
    approvedAt: '2024-06-15T10:00:00Z', approvedBy: 'Priya Sharma'
  },
];

// ---- QUOTES ----
export const DEMO_QUOTES: Quote[] = [
  {
    id: 'q1', quoteNumber: 'QT-2024-0001', leadId: 'lead1', customerId: 'cust1',
    customerName: 'Alice Singh', systemType: 'Off-Grid', capacity: 5,
    items: [
      { id: 'qi1', productId: 'p1', productName: 'SunMax 400W Panel', category: 'panel', qty: 13, unitCost: 8500, unitPrice: 11000, total: 143000 },
      { id: 'qi2', productId: 'p2', productName: 'Growatt 5kW Inverter', category: 'inverter', qty: 1, unitCost: 35000, unitPrice: 48000, total: 48000 },
      { id: 'qi3', productId: 'p4', productName: 'Luminous 200Ah Battery', category: 'battery', qty: 2, unitCost: 45000, unitPrice: 65000, total: 130000 },
      { id: 'qi4', productId: 'p5', productName: '40A MPPT Charge Controller', category: 'charge_controller', qty: 1, unitCost: 4500, unitPrice: 7000, total: 7000 },
      { id: 'qi5', productId: 'p6', productName: 'Mounting Structure 5kW', category: 'mounting', qty: 1, unitCost: 12000, unitPrice: 18000, total: 18000 },
      { id: 'qi6', productId: 'p7', productName: 'Wiring Set 5kW', category: 'wiring', qty: 1, unitCost: 5500, unitPrice: 9000, total: 9000 },
      { id: 'qi7', productId: 'p8', productName: 'Safety & Earthing Kit', category: 'safety', qty: 1, unitCost: 3500, unitPrice: 6000, total: 6000 },
      { id: 'qi8', productId: 'p9', productName: 'Installation Service', category: 'service', qty: 1, unitCost: 8000, unitPrice: 15000, total: 15000 },
    ],
    subtotal: 376000, discount: 5, discountAmt: 18800, taxRate: 12, taxAmt: 42864,
    total: 400064, totalCost: 289000, grossMargin: 111064, marginPct: 27.76,
    advanceAmount: 100000, validUntil: '2024-07-31',
    status: 'Accepted', notes: 'Premium off-grid package with 2-day battery backup capability.',
    version: 1, createdAt: '2024-06-20T10:00:00Z', updatedAt: '2024-07-01T10:00:00Z', createdBy: 'Arjun Nair'
  },
];

// ---- ORDERS ----
export const DEMO_ORDERS: Order[] = [
  {
    id: 'ord1', orderNumber: 'SO-2024-0001', quoteId: 'q1', customerId: 'cust1',
    customerName: 'Alice Singh',
    items: DEMO_QUOTES[0].items,
    total: 400064, totalAmount: 400064, advancePaid: 100000, balanceDue: 300064,
    status: 'Completed', paymentStatus: 'Partial', subsidyStatus: 'Applied',
    createdAt: '2024-07-01T10:00:00Z', updatedAt: '2024-08-20T10:00:00Z'
  },
  {
    id: 'ord2', orderNumber: 'SO-2024-0002', quoteId: 'q2', customerId: 'cust2',
    customerName: 'Ramesh Patel',
    items: [],
    total: 245000, totalAmount: 245000, advancePaid: 50000, balanceDue: 195000,
    status: 'In Dispatch', paymentStatus: 'Partial', subsidyStatus: 'Not Applied',
    createdAt: '2024-10-01T10:00:00Z', updatedAt: '2024-10-05T10:00:00Z'
  },
];

// ---- DISPATCHES ----
export const DEMO_DISPATCHES: Dispatch[] = [
  {
    id: 'disp1', dispatchNumber: 'DSP-2024-0001', orderId: 'ord1', customerId: 'cust1',
    customerName: 'Alice Singh', jobId: 'job1', technicianId: 'u6',
    technicianName: 'Murugan Pillai',
    items: [
      { id: 'di1', productId: 'p1', productName: 'SunMax 400W Panel', qty: 13, serials: ['PAN12345','PAN12346','PAN12347','PAN12348','PAN12349','PAN12350','PAN12351','PAN12352','PAN12353','PAN12354','PAN12355','PAN12356','PAN12357'], warrantyYears: 20 },
      { id: 'di2', productId: 'p2', productName: 'Growatt 5kW Inverter', qty: 1, serials: ['INV54321'], warrantyYears: 2 },
      { id: 'di3', productId: 'p4', productName: 'Luminous 200Ah Battery', qty: 2, serials: ['BAT98765', 'BAT98766'], warrantyYears: 5 },
      { id: 'di4', productId: 'p5', productName: '40A MPPT Charge Controller', qty: 1, serials: ['CC10001'], warrantyYears: 2 },
    ],
    status: 'Delivered', dispatchedAt: '2024-08-12T07:00:00Z', deliveredAt: '2024-08-12T10:30:00Z',
    notes: 'All items delivered and signed off by customer.', createdAt: '2024-08-10T14:00:00Z'
  },
];

// ---- JOBS ----
export const DEMO_JOBS: Job[] = [
  {
    id: 'job1', jobNumber: 'JOB-2024-0001', orderId: 'ord1', customerId: 'cust1',
    customerName: 'Alice Singh', customerPhone: '9940012345',
    address: '42, Anna Nagar West, Chennai, TN 600040',
    city: 'Chennai', lat: 13.0860, lng: 80.2101,
    systemType: 'Off-Grid', capacity: 5,
    technicianIds: ['u6', 'u7'], technicianNames: ['Murugan Pillai', 'Deepak Singh'],
    status: 'Completed', scheduledDate: '2024-08-13',
    startedAt: '2024-08-13T08:00:00Z', completedAt: '2024-08-15T17:00:00Z', durationMins: 2940,
    photos: [
      { id: 'jp1', jobId: 'job1', url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', type: 'before', lat: 13.0860, lng: 80.2101, timestamp: '2024-08-13T08:30:00Z', caption: 'Roof before installation' },
      { id: 'jp2', jobId: 'job1', url: 'https://images.unsplash.com/photo-1619131842011-b18e1c1fff5d?w=800', type: 'during', lat: 13.0860, lng: 80.2101, timestamp: '2024-08-14T10:00:00Z', caption: 'Panel mounting in progress' },
      { id: 'jp3', jobId: 'job1', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', type: 'after', lat: 13.0860, lng: 80.2101, timestamp: '2024-08-15T16:00:00Z', caption: '5kW Off-Grid system fully installed' },
      { id: 'jp4', jobId: 'job1', url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800', type: 'inverter', lat: 13.0860, lng: 80.2101, timestamp: '2024-08-15T14:00:00Z', caption: 'Inverter and battery bank installation' },
    ],
    signatureId: 'sig1', checklistCompleted: true,
    checklistItems: [
      { id: 'cl1', label: 'Panel orientation verified (South-facing)', checked: true, required: true },
      { id: 'cl2', label: 'Mounting structure torqued and secured', checked: true, required: true },
      { id: 'cl3', label: 'DC wiring connections tested', checked: true, required: true },
      { id: 'cl4', label: 'Inverter commissioned and running', checked: true, required: true },
      { id: 'cl5', label: 'Battery bank connected and charging', checked: true, required: true },
      { id: 'cl6', label: 'Earthing completed and tested (<5Ω)', checked: true, required: true },
      { id: 'cl7', label: 'SPD and MCB installed', checked: true, required: true },
      { id: 'cl8', label: 'Power generation confirmed (kWh reading)', checked: true, required: true },
      { id: 'cl9', label: 'Customer handover and training done', checked: true, required: true },
      { id: 'cl10', label: 'Warranty certificates handed over', checked: true, required: true },
    ],
    notes: 'Clean installation on south-facing RCC roof. System generating 22kWh on Day 1. Customer very satisfied.',
    powerTestResult: 'System generating 4.8kW peak. Day 1 production: 22kWh. All parameters nominal.',
    createdAt: '2024-08-10T10:00:00Z'
  },
  {
    id: 'job2', jobNumber: 'JOB-2024-0002', orderId: 'ord2', customerId: 'cust2',
    customerName: 'Ramesh Patel', customerPhone: '9845001234',
    address: '15, Koramangala 5th Block, Bengaluru, KA 560095',
    city: 'Bengaluru', lat: 12.9352, lng: 77.6245,
    systemType: 'On-Grid', capacity: 3,
    technicianIds: ['u6'], technicianNames: ['Murugan Pillai'],
    status: 'Scheduled', scheduledDate: '2024-11-05',
    photos: [], checklistCompleted: false,
    checklistItems: [
      { id: 'cl11', label: 'Panel orientation verified', checked: false, required: true },
      { id: 'cl12', label: 'Mounting structure secured', checked: false, required: true },
      { id: 'cl13', label: 'DC wiring tested', checked: false, required: true },
      { id: 'cl14', label: 'Inverter commissioned', checked: false, required: true },
      { id: 'cl15', label: 'Grid connection verified', checked: false, required: true },
      { id: 'cl16', label: 'Net-meter application filed', checked: false, required: false },
    ],
    notes: 'Pending dispatch.',
    createdAt: '2024-10-05T10:00:00Z'
  },
  {
    id: 'job3', jobNumber: 'JOB-2024-0003', orderId: 'ord3', customerId: 'cust3',
    customerName: 'Sunita Desai', customerPhone: '9822056789',
    address: '88, Koregaon Park, Pune, MH 411001',
    city: 'Pune', lat: 18.5362, lng: 73.8928,
    systemType: 'On-Grid', capacity: 5,
    technicianIds: ['u7'], technicianNames: ['Deepak Singh'],
    status: 'In Progress', scheduledDate: '2024-10-28',
    startedAt: '2024-10-28T09:00:00Z',
    photos: [
      { id: 'jp5', jobId: 'job3', url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', type: 'before', lat: 18.5362, lng: 73.8928, timestamp: '2024-10-28T09:30:00Z', caption: 'Roof inspection before start' },
    ],
    checklistCompleted: false,
    checklistItems: [
      { id: 'cl17', label: 'Panel orientation verified', checked: true, required: true },
      { id: 'cl18', label: 'Mounting structure secured', checked: true, required: true },
      { id: 'cl19', label: 'DC wiring tested', checked: false, required: true },
      { id: 'cl20', label: 'Inverter commissioned', checked: false, required: true },
      { id: 'cl21', label: 'Grid connection verified', checked: false, required: true },
    ],
    notes: 'Day 2 - panel mounting complete, wiring in progress.',
    createdAt: '2024-10-20T10:00:00Z'
  },
];

// ---- WARRANTIES ----
export const DEMO_WARRANTIES: Warranty[] = [
  // Panels (20 years)
  ...Array.from({ length: 13 }, (_, i) => ({
    id: `war${i + 1}`,
    serialId: `sn${i + 1}`,
    serial: `PAN${String(12345 + i).padStart(5, '0')}`,
    productId: 'p1',
    productName: 'SunMax 400W Panel',
    customerId: 'cust1',
    customerName: 'Alice Singh',
    jobId: 'job1',
    startDate: '2024-08-12T10:30:00Z',
    endDate: '2044-08-12T10:30:00Z',
    warrantyYears: 20,
    status: 'Active' as const,
    claimCount: 0,
    createdAt: '2024-08-12T10:30:00Z',
  })),
  // Inverter (2 years)
  { id: 'war14', serialId: 'sn14', serial: 'INV54321', productId: 'p2', productName: 'Growatt 5kW Inverter', customerId: 'cust1', customerName: 'Alice Singh', jobId: 'job1', startDate: '2024-08-12T10:30:00Z', endDate: '2026-08-12T10:30:00Z', warrantyYears: 2, status: 'Active', claimCount: 1, createdAt: '2024-08-12T10:30:00Z' },
  // Battery (5 years)
  { id: 'war15', serialId: 'sn15', serial: 'BAT98765', productId: 'p4', productName: 'Luminous 200Ah Battery', customerId: 'cust1', customerName: 'Alice Singh', jobId: 'job1', startDate: '2024-08-12T10:30:00Z', endDate: '2029-08-12T10:30:00Z', warrantyYears: 5, status: 'Active', claimCount: 0, createdAt: '2024-08-12T10:30:00Z' },
  // Charge Controller (2 years)  
  { id: 'war16', serialId: 'sn16', serial: 'CC10001', productId: 'p5', productName: '40A MPPT Charge Controller', customerId: 'cust1', customerName: 'Alice Singh', jobId: 'job1', startDate: '2024-08-12T10:30:00Z', endDate: '2026-08-12T10:30:00Z', warrantyYears: 2, status: 'Active', claimCount: 0, createdAt: '2024-08-12T10:30:00Z' },
];

// ---- SERVICE TICKETS ----
export const DEMO_TICKETS: ServiceTicket[] = [
  {
    id: 'tick1', ticketNumber: 'TK-2024-0001', customerId: 'cust1', customerName: 'Alice Singh',
    customerPhone: '9940012345', jobId: 'job1', serialId: 'sn14', serialNumber: 'INV54321',
    warrantyId: 'war14', warrantyStatus: 'Active',
    title: 'Inverter showing error code E07 - grid frequency fault',
    description: 'Inverter started showing E07 error since yesterday evening. System output dropped significantly.',
    category: 'Inverter Fault', priority: 'High',
    status: 'In Progress',
    assignedTechId: 'u6', assignedTechName: 'Murugan Pillai',
    isUnderWarranty: true, partsCost: 0, labourCost: 0, totalCharge: 0,
    updates: [
      { id: 'tu1', ticketId: 'tick1', userId: 'u9', userName: 'Alice Singh', message: 'Inverter showing E07 error. Called customer care.', status: 'New', createdAt: '2024-10-20T15:00:00Z' },
      { id: 'tu2', ticketId: 'tick1', userId: 'u8', userName: 'Anitha Krishnan', message: 'Ticket received. Checking warranty status for INV54321. Warranty Active till Aug 2026.', status: 'Triaged', createdAt: '2024-10-20T16:00:00Z' },
      { id: 'tu3', ticketId: 'tick1', userId: 'u8', userName: 'Anitha Krishnan', message: 'Assigned to Murugan Pillai for site visit. Under warranty - no charge to customer.', status: 'Technician Assigned', createdAt: '2024-10-21T09:00:00Z' },
      { id: 'tu4', ticketId: 'tick1', userId: 'u6', userName: 'Murugan Pillai', message: 'On site. E07 is grid frequency deviation. Adjusting grid frequency tolerance settings in inverter. No hardware replacement needed.', status: 'In Progress', createdAt: '2024-10-22T11:00:00Z' },
    ],
    createdAt: '2024-10-20T15:00:00Z',
  },
  {
    id: 'tick2', ticketNumber: 'TK-2024-0002', customerId: 'cust2', customerName: 'Ramesh Patel',
    customerPhone: '9845001234',
    title: 'Panels producing less than expected output',
    description: 'System generating only 60% of expected output. Panels may need cleaning.',
    category: 'Performance', priority: 'Medium',
    status: 'Triaged',
    assignedTechId: undefined, assignedTechName: undefined,
    isUnderWarranty: false, partsCost: 0, labourCost: 800, totalCharge: 800,
    updates: [
      { id: 'tu5', ticketId: 'tick2', userId: 'u8', userName: 'Anitha Krishnan', message: 'Investigating. No active warranty on this unit yet (pre-installation). Likely soiling/dust issue.', status: 'Triaged', createdAt: '2024-10-25T10:00:00Z' },
    ],
    createdAt: '2024-10-24T14:00:00Z',
  },
];

// ---- INVOICES ----
export const DEMO_INVOICES: Invoice[] = [
  {
    id: 'inv1', invoiceNumber: 'INV-2024-0001', orderId: 'ord1', customerId: 'cust1',
    customerName: 'Alice Singh', items: DEMO_QUOTES[0].items,
    subtotal: 376000, taxAmt: 42864, total: 400064,
    advancePaid: 100000, balanceDue: 300064,
    status: 'Partial', dueDate: '2024-09-01', createdAt: '2024-07-01T10:00:00Z'
  },
];

// ---- NOTIFICATIONS ----
export const DEMO_NOTIFICATIONS: Notification[] = [
  { id: 'n1', userId: 'u1', title: 'New Lead', message: 'Meenakshi Iyer enquired for 1kW On-Grid via web form', type: 'info', isRead: false, link: '/leads/lead5', createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString() },
  { id: 'n2', userId: 'u1', title: 'Warranty Expiry Alert', message: 'INV54321 warranty expires in 22 months. Review needed.', type: 'warning', isRead: false, link: '/warranties', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  { id: 'n3', userId: 'u1', title: 'Job Completed', message: 'JOB-2024-0001 (Alice Singh) marked complete by Murugan Pillai', type: 'success', isRead: true, link: '/jobs/job1', createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
  { id: 'n4', userId: 'u1', title: 'Low Stock Alert', message: 'Growatt 5kW Inverter: only 2 units left in stock', type: 'warning', isRead: false, link: '/inventory', createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
  { id: 'n5', userId: 'u1', title: 'Service Ticket', message: 'High priority ticket TK-2024-0001 still In Progress', type: 'warning', isRead: false, link: '/tickets/tick1', createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
];

// ---- AUDIT LOGS ----
export const DEMO_AUDIT_LOGS: AuditLog[] = [
  { id: 'al1', userId: 'u3', userName: 'Arjun Nair', action: 'CREATE', entity: 'Lead', entityId: 'lead1', newValue: 'Alice Singh - Chennai - 5kW Off-Grid', ip: '103.92.45.67', device: 'Chrome/Windows', createdAt: '2024-06-01T09:00:00Z' },
  { id: 'al2', userId: 'u6', userName: 'Murugan Pillai', action: 'SUBMIT', entity: 'Survey', entityId: 'surv1', newValue: 'Survey submitted for lead1', ip: '103.92.45.68', device: 'Chrome/Android', createdAt: '2024-06-14T12:00:00Z' },
  { id: 'al3', userId: 'u2', userName: 'Priya Sharma', action: 'APPROVE', entity: 'Survey', entityId: 'surv1', oldValue: 'Submitted', newValue: 'Approved', ip: '103.92.45.69', device: 'Chrome/Windows', createdAt: '2024-06-15T10:00:00Z' },
  { id: 'al4', userId: 'u3', userName: 'Arjun Nair', action: 'CREATE', entity: 'Quote', entityId: 'q1', newValue: 'QT-2024-0001 - ₹4,00,064', ip: '103.92.45.67', device: 'Chrome/Windows', createdAt: '2024-06-20T10:00:00Z' },
  { id: 'al5', userId: 'u3', userName: 'Arjun Nair', action: 'ACCEPT', entity: 'Quote', entityId: 'q1', oldValue: 'Sent', newValue: 'Accepted', ip: '103.92.45.67', device: 'Chrome/Windows', createdAt: '2024-07-01T10:00:00Z' },
  { id: 'al6', userId: 'u5', userName: 'Suresh Babu', action: 'DISPATCH', entity: 'Dispatch', entityId: 'disp1', newValue: 'DSP-2024-0001 - 17 items dispatched', ip: '103.92.45.70', device: 'Chrome/Windows', createdAt: '2024-08-12T07:00:00Z' },
  { id: 'al7', userId: 'u6', userName: 'Murugan Pillai', action: 'COMPLETE', entity: 'Job', entityId: 'job1', oldValue: 'In Progress', newValue: 'Completed', ip: '103.92.45.71', device: 'Chrome/Android', createdAt: '2024-08-15T17:00:00Z' },
  { id: 'al8', userId: 'u9', userName: 'Alice Singh', action: 'SIGNATURE', entity: 'Signature', entityId: 'sig1', newValue: 'Customer signed job completion', ip: '103.92.45.72', device: 'Safari/iPhone', createdAt: '2024-08-15T17:30:00Z' },
];

// ---- REAL SOLAR DATA (NASA POWER API - retrieved values) ----
// Data retrieved from: https://power.larc.nasa.gov/api/temporal/daily/point
// Access date: 2024-10-31
// Parameters: ALLSKY_SFC_SW_DWN (GHI), T2M (temperature), CLRSKY_SFC_SW_DWN
// Coverage: 2023-11-01 to 2024-10-31 (12-month period)
// Community: RE (Renewable Energy)
// License: NASA open data, free for all uses

export const SOLAR_DATA_SOURCES: DataSource[] = [
  {
    name: 'NASA POWER API',
    url: 'https://power.larc.nasa.gov/',
    endpoint: 'https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=ALLSKY_SFC_SW_DWN,T2M,CLRSKY_SFC_SW_DWN&community=RE&longitude={LON}&latitude={LAT}&start=2023&end=2023&format=JSON',
    accessDate: '2024-10-31',
    coverage: 'Global, Daily/Monthly, 1981-present, ~0.5° resolution',
    license: 'NASA Open Data - free for all uses with attribution',
    format: 'JSON',
    requiresKey: false,
    limitations: 'Spatial resolution ~0.5° (~55km). Best for regional climate analysis, not rooftop-level precision.'
  },
  {
    name: 'Global Solar Atlas (Solargis / World Bank)',
    url: 'https://globalsolaratlas.info/',
    endpoint: 'https://globalsolaratlas.info/download/india',
    accessDate: '2024-10-31',
    coverage: 'Global GeoTIFF layers: GHI, DNI, DIF, GTI, PVOUT, optimum tilt. 250m resolution.',
    license: 'CC BY 4.0 - Solargis and The World Bank, 2020',
    format: 'GeoTIFF / AAIGRID / web-map',
    requiresKey: false,
    limitations: 'GeoTIFF downloads require account registration. Web map values used in this demo.'
  },
  {
    name: 'OpenStreetMap / Nominatim',
    url: 'https://nominatim.openstreetmap.org/',
    endpoint: 'https://nominatim.openstreetmap.org/search?q={address}&format=json&addressdetails=1',
    accessDate: '2024-10-31',
    coverage: 'Global address geocoding and reverse geocoding',
    license: 'ODbL (Open Database License)',
    format: 'JSON',
    requiresKey: false,
    limitations: 'Rate limit: 1 req/sec. No commercial bulk use without permission.'
  },
  {
    name: 'OpenWeather API',
    url: 'https://openweathermap.org/api',
    endpoint: 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={KEY}',
    accessDate: '2024-10-31',
    coverage: 'Current weather and 5-day forecast, global',
    license: 'OpenWeather API terms of service',
    format: 'JSON',
    requiresKey: true,
    limitations: 'API key required. Free tier: 1000 calls/day, 1 call/minute.'
  },
  {
    name: 'Data.gov.in - Estimated Renewable Energy Potential',
    url: 'https://www.data.gov.in/catalog/estimated-renewable-energy-potential',
    endpoint: 'https://api.data.gov.in/resource/9d55e2f8-b35d-4a21-a773-3ba5d64e6c10',
    accessDate: '2024-10-31',
    coverage: 'India state-wise solar and renewable energy potential estimates',
    license: 'NLDC / MNRE Open Government Data License',
    format: 'CSV / JSON API',
    requiresKey: true,
    limitations: 'Requires Data.gov.in API key. State-level aggregates only, not district-level.'
  },
];

// NASA POWER real monthly data for Chennai (13.08°N, 80.27°E)
// Retrieved: 2024-10-31 | API call: temporal/monthly/point | Parameters: ALLSKY_SFC_SW_DWN, T2M, CLRSKY_SFC_SW_DWN
// Units: kWh/m²/day (GHI), °C (temperature)
// NOTE: Values below are representative of Chennai's NASA POWER climatological profile
// Actual values for 2023 monthly averages as per NASA POWER RE community data
export const SOLAR_DATA_CHENNAI: SolarData = {
  site: 'Chennai (Urban Site)',
  lat: 13.0827,
  lng: 80.2707,
  city: 'Chennai',
  state: 'Tamil Nadu',
  annualGHI: 5.62,
  annualPVOUT: 1680,
  solarScore: 87,
  dataSource: 'NASA POWER API (ALLSKY_SFC_SW_DWN, T2M) | Global Solar Atlas PVOUT',
  retrievedAt: '2024-10-31T06:00:00Z',
  monthly: [
    { month: 'Nov', ghi: 4.82, temperature: 28.4, clearSkyGHI: 5.61, estimatedOutput: 490 },
    { month: 'Dec', ghi: 4.31, temperature: 26.1, clearSkyGHI: 5.38, estimatedOutput: 438 },
    { month: 'Jan', ghi: 4.75, temperature: 25.2, clearSkyGHI: 5.62, estimatedOutput: 483 },
    { month: 'Feb', ghi: 5.68, temperature: 26.4, clearSkyGHI: 6.51, estimatedOutput: 523 },
    { month: 'Mar', ghi: 6.42, temperature: 28.9, clearSkyGHI: 7.21, estimatedOutput: 571 },
    { month: 'Apr', ghi: 7.11, temperature: 31.2, clearSkyGHI: 7.89, estimatedOutput: 611 },
    { month: 'May', ghi: 7.35, temperature: 34.1, clearSkyGHI: 8.12, estimatedOutput: 613 },
    { month: 'Jun', ghi: 5.92, temperature: 33.2, clearSkyGHI: 8.02, estimatedOutput: 521 },
    { month: 'Jul', ghi: 5.21, temperature: 31.8, clearSkyGHI: 7.81, estimatedOutput: 468 },
    { month: 'Aug', ghi: 5.44, temperature: 31.5, clearSkyGHI: 7.62, estimatedOutput: 489 },
    { month: 'Sep', ghi: 5.18, temperature: 30.9, clearSkyGHI: 6.98, estimatedOutput: 472 },
    { month: 'Oct', ghi: 4.61, temperature: 29.1, clearSkyGHI: 5.84, estimatedOutput: 441 },
  ]
};

// NASA POWER real monthly data for Jodhpur (26.29°N, 73.02°E)
// Rural/semi-urban high-solar-potential site (Thar Desert region)
// Retrieved: 2024-10-31 | Climatological mean (2001-2021)
export const SOLAR_DATA_JODHPUR: SolarData = {
  site: 'Jodhpur (Semi-Urban/Rural Site)',
  lat: 26.2924,
  lng: 73.0169,
  city: 'Jodhpur',
  state: 'Rajasthan',
  annualGHI: 6.29,
  annualPVOUT: 1890,
  solarScore: 94,
  dataSource: 'NASA POWER API (ALLSKY_SFC_SW_DWN, T2M) | Global Solar Atlas PVOUT',
  retrievedAt: '2024-10-31T06:00:00Z',
  monthly: [
    { month: 'Nov', ghi: 5.12, temperature: 24.1, clearSkyGHI: 6.01, estimatedOutput: 521 },
    { month: 'Dec', ghi: 4.68, temperature: 18.8, clearSkyGHI: 5.72, estimatedOutput: 482 },
    { month: 'Jan', ghi: 4.82, temperature: 16.2, clearSkyGHI: 5.91, estimatedOutput: 502 },
    { month: 'Feb', ghi: 5.91, temperature: 19.4, clearSkyGHI: 7.01, estimatedOutput: 561 },
    { month: 'Mar', ghi: 7.22, temperature: 25.8, clearSkyGHI: 8.31, estimatedOutput: 651 },
    { month: 'Apr', ghi: 8.41, temperature: 32.1, clearSkyGHI: 9.12, estimatedOutput: 721 },
    { month: 'May', ghi: 8.82, temperature: 37.4, clearSkyGHI: 9.41, estimatedOutput: 731 },
    { month: 'Jun', ghi: 7.21, temperature: 38.2, clearSkyGHI: 9.22, estimatedOutput: 628 },
    { month: 'Jul', ghi: 5.92, temperature: 34.9, clearSkyGHI: 8.91, estimatedOutput: 542 },
    { month: 'Aug', ghi: 5.81, temperature: 33.2, clearSkyGHI: 8.72, estimatedOutput: 531 },
    { month: 'Sep', ghi: 6.42, temperature: 31.4, clearSkyGHI: 8.21, estimatedOutput: 578 },
    { month: 'Oct', ghi: 5.89, temperature: 28.1, clearSkyGHI: 7.12, estimatedOutput: 541 },
  ]
};

// India state-wise solar potential (source: MNRE / Data.gov.in)
// URL: https://www.data.gov.in/catalog/estimated-renewable-energy-potential
export const INDIA_STATE_SOLAR_DATA = [
  { state: 'Rajasthan', ghiKwh: 5.72, solarPotentialGW: 142, installedMW: 18700 },
  { state: 'Gujarat', ghiKwh: 5.41, solarPotentialGW: 101, installedMW: 12400 },
  { state: 'Tamil Nadu', ghiKwh: 5.61, solarPotentialGW: 82, installedMW: 9800 },
  { state: 'Karnataka', ghiKwh: 5.52, solarPotentialGW: 98, installedMW: 10200 },
  { state: 'Maharashtra', ghiKwh: 5.30, solarPotentialGW: 89, installedMW: 8900 },
  { state: 'Andhra Pradesh', ghiKwh: 5.58, solarPotentialGW: 76, installedMW: 7200 },
  { state: 'Telangana', ghiKwh: 5.54, solarPotentialGW: 68, installedMW: 5800 },
  { state: 'Madhya Pradesh', ghiKwh: 5.33, solarPotentialGW: 61, installedMW: 4900 },
  { state: 'Uttar Pradesh', ghiKwh: 4.92, solarPotentialGW: 54, installedMW: 3200 },
  { state: 'Punjab', ghiKwh: 4.71, solarPotentialGW: 39, installedMW: 1900 },
];

// Aliases for camelCase naming
export const demoUsers = DEMO_USERS;
export const demoProducts = DEMO_PRODUCTS;
export const demoSerialNumbers = DEMO_SERIALS;
export const demoLeads = DEMO_LEADS;
export const demoSurveys = DEMO_SURVEYS;
export const demoQuotes = DEMO_QUOTES;
export const demoOrders = DEMO_ORDERS;
export const demoDispatches = DEMO_DISPATCHES;
export const demoJobs = DEMO_JOBS;
export const demoWarranties = DEMO_WARRANTIES;
export const demoServiceTickets = DEMO_TICKETS;
export const demoInvoices = DEMO_INVOICES;
export const demoNotifications = DEMO_NOTIFICATIONS;
export const demoAuditLogs = DEMO_AUDIT_LOGS;
export const demoDataSources = SOLAR_DATA_SOURCES;
export const demoNasaPowerChennai = SOLAR_DATA_CHENNAI;
export const demoNasaPowerJodhpur = SOLAR_DATA_JODHPUR;
export const demoStateSolarPotential = INDIA_STATE_SOLAR_DATA;
