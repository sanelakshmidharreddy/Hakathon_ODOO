// ============================================================
// TypeScript Definitions - SunPower Solutions Solar Platform
// ============================================================

export type UserRole =
  | 'director'
  | 'sales_manager'
  | 'sales_rep'
  | 'warehouse'
  | 'technician'
  | 'service_agent'
  | 'customer';

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'survey_scheduled'
  | 'survey_completed'
  | 'qualified'
  | 'lost'
  | 'converted'
  | 'New'
  | 'Contacted'
  | 'Survey Scheduled'
  | 'Survey Completed'
  | 'Qualified'
  | 'Lost'
  | 'Converted';

export type SystemType =
  | 'on_grid'
  | 'off_grid'
  | 'hybrid'
  | 'On-Grid'
  | 'Off-Grid'
  | 'Hybrid';

export type LeadSource =
  | 'web_form'
  | 'whatsapp'
  | 'phone_call'
  | 'referral'
  | 'Web Form'
  | 'WhatsApp'
  | 'Phone Call'
  | 'Referral';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  createdAt?: string;
  isActive?: boolean;
}

export interface Activity {
  id: string;
  leadId?: string;
  type: string;
  title?: string;
  description: string;
  timestamp?: string;
  userName?: string;
  userId?: string;
  createdAt?: string;
}

export interface SitePhoto {
  id: string;
  jobId?: string;
  surveyId?: string;
  url: string;
  stage?: string;
  type?: string;
  caption?: string;
  timestamp?: string;
  location?: { lat: number; lng: number };
  lat?: number;
  lng?: number;
}

export interface Survey {
  id: string;
  leadId: string;
  technicianId?: string;
  technicianName?: string;
  roofDirection: string;
  roofTiltDegrees?: number;
  roofTilt?: number;
  shadowFreeAreaSqFt?: number;
  shadowFreeArea?: number;
  cableDistanceMeters?: number;
  cableDistance?: number;
  roofType: string;
  gridConnectionPhase?: string;
  gridPhase?: string;
  gridConnectionType?: string;
  sanctionedLoadKw?: number;
  recommendedCapacityKw?: number;
  recommendedCapacity?: number;
  recommendedSystemType?: SystemType;
  isApproved?: boolean;
  status?: string;
  approvedBy?: string;
  approvedAt?: string;
  photos: SitePhoto[];
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
  gpsLat?: number;
  gpsLng?: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  brand?: string;
  model?: string;
  description?: string;
  cost?: number;
  costPrice?: number;
  price?: number;
  sellingPrice?: number;
  warrantyYears?: number;
  stockQty?: number;
  stockQuantity?: number;
  reorderLevel?: number;
  minStock?: number;
  hasSerials?: boolean;
  unit?: string;
  imageUrl?: string;
  specs?: Record<string, string>;
}

export interface SerialNumber {
  id: string;
  serialNumber?: string;
  serial?: string;
  productId: string;
  productName: string;
  category?: string;
  status: string;
  reservedForOrderId?: string;
  currentJobId?: string;
  jobId?: string;
  customerId?: string;
  warrantyId?: string;
  dispatchId?: string;
  installedAt?: string;
  createdAt: string;
}

export interface QuoteItem {
  id: string;
  productId: string;
  productName: string;
  category: string;
  quantity?: number;
  qty?: number;
  unitPrice?: number;
  totalPrice?: number;
  unitCost?: number;
  totalCost?: number;
  total?: number;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  leadId: string;
  customerId?: string;
  customerName?: string;
  version?: number;
  systemType: SystemType;
  capacityKw?: number;
  capacity?: number;
  packageType?: string;
  items: QuoteItem[];
  subtotal?: number;
  discountAmount?: number;
  discountAmt?: number;
  discount?: number;
  taxAmount?: number;
  taxAmt?: number;
  taxRate?: number;
  totalAmount?: number;
  total?: number;
  totalCost?: number;
  grossMargin?: number;
  marginPercentage?: number;
  marginPct?: number;
  advanceAmount?: number;
  validUntil: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface Order {
  id: string;
  quoteId?: string;
  leadId?: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  orderNumber: string;
  systemType?: SystemType;
  capacityKw?: number;
  capacity?: number;
  totalAmount?: number;
  total?: number;
  advancePaid: number;
  balanceDue: number;
  status: string;
  paymentStatus: string;
  subsidyStatus?: string;
  items: QuoteItem[];
  createdAt: string;
  updatedAt?: string;
}

export interface DispatchItem {
  id: string;
  serialNumberId?: string;
  serialNumber?: string;
  productId: string;
  productName: string;
  category?: string;
  qty?: number;
  serials?: string[];
  warrantyYears?: number;
}

export interface Dispatch {
  id: string;
  orderId: string;
  dispatchNumber: string;
  customerId?: string;
  customerName?: string;
  customerAddress?: string;
  jobId?: string;
  technicianId?: string;
  technicianName?: string;
  items: DispatchItem[];
  scannedSerials?: string[];
  status: string;
  dispatchedAt?: string;
  deliveredAt?: string;
  notes?: string;
  createdAt?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed?: boolean;
  checked?: boolean;
  required?: boolean;
}

export interface Signature {
  id: string;
  signatureDataUrl?: string;
  signatureData?: string;
  signerName: string;
  signerRole?: string;
  signerPhone?: string;
  jobId?: string;
  customerId?: string;
  customerName?: string;
  timestamp?: string;
  createdAt?: string;
  ipAddress?: string;
  device?: string;
}

export interface TestResults {
  vocVolts: number;
  iscAmps: number;
  earthingResistanceOhms: number;
  instantaneousPowerKw: number;
  notes: string;
}

export interface Job {
  id: string;
  orderId?: string;
  jobNumber: string;
  customerId?: string;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  address?: string;
  city?: string;
  customerCoordinates?: { lat: number; lng: number };
  lat?: number;
  lng?: number;
  systemType: SystemType;
  capacityKw?: number;
  capacity?: number;
  technicianId?: string;
  technicianName?: string;
  technicianIds?: string[];
  technicianNames?: string[];
  status: string;
  scheduledDate: string;
  startedAt?: string;
  completedAt?: string;
  durationMins?: number;
  checklist?: ChecklistItem[];
  checklistItems?: ChecklistItem[];
  checklistCompleted?: boolean;
  photos: SitePhoto[];
  installedSerials?: string[];
  signature?: Signature;
  signatureId?: string;
  testResults?: TestResults;
  powerTestResult?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Warranty {
  id: string;
  serialNumberId?: string;
  serialNumber?: string;
  serial?: string;
  serialId?: string;
  productId?: string;
  productName: string;
  category?: string;
  customerId?: string;
  customerName: string;
  customerPhone?: string;
  jobId: string;
  warrantyPeriodYears?: number;
  warrantyYears?: number;
  startDate: string;
  endDate: string;
  status: string;
  certificateUrl?: string;
  claimCount?: number;
  createdAt?: string;
}

export interface TicketUpdate {
  id: string;
  ticketId: string;
  status: string;
  note?: string;
  message?: string;
  timestamp?: string;
  userName: string;
  userId?: string;
  createdAt?: string;
}

export interface ServiceTicket {
  id: string;
  ticketNumber: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  jobId?: string;
  serialNumberId?: string;
  serialNumber?: string;
  serialId?: string;
  warrantyId?: string;
  warrantyStatus?: string;
  equipmentCategory?: string;
  category?: string;
  issueType?: string;
  title?: string;
  description: string;
  priority?: string;
  status: string;
  assignedTechnicianName?: string;
  assignedTechId?: string;
  assignedTechName?: string;
  isCoveredByWarranty?: boolean;
  isUnderWarranty?: boolean;
  laborCharge?: number;
  labourCost?: number;
  partsCharge?: number;
  partsCost?: number;
  totalCharge?: number;
  replacementSerialNumber?: string;
  updates: TicketUpdate[];
  createdAt: string;
  updatedAt?: string;
  resolvedAt?: string;
  closedAt?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId?: string;
  customerId?: string;
  customerName?: string;
  items?: QuoteItem[];
  subtotal: number;
  taxAmt?: number;
  taxAmount?: number;
  totalAmount?: number;
  total?: number;
  advancePaid: number;
  balanceDue: number;
  status: string;
  dueDate: string;
  paidAt?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId?: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole?: string;
  action: string;
  entityType?: string;
  entity?: string;
  entityId: string;
  changes?: Record<string, any>;
  oldValue?: string;
  newValue?: string;
  timestamp?: string;
  createdAt?: string;
  ipAddress?: string;
  ip?: string;
  device?: string;
}

export interface MonthlyData {
  month: string;
  irradiance?: number;
  pvout?: number;
  ghi?: number;
  temperature: number;
  coolingLossPercent?: number;
  clearSkyGHI?: number;
  estimatedOutput?: number;
}

export interface SolarData {
  siteName?: string;
  site?: string;
  latitude?: number;
  lat?: number;
  longitude?: number;
  lng?: number;
  city?: string;
  state?: string;
  elevationMeters?: number;
  annualGhiKwhM2?: number;
  annualGHI?: number;
  annualDniKwhM2?: number;
  annualDpiKwhM2?: number;
  annualPVOUT?: number;
  avgDailyGhi?: number;
  avgTemperatureC?: number;
  optimalTiltDegrees?: number;
  solarScore: number;
  retrievedAt: string;
  dataSource?: string;
  provenance?: {
    sourceName: string;
    datasetEndpoint: string;
    parameters: string[];
    temporalResolution: string;
    license: string;
  };
  monthlyData?: MonthlyData[];
  monthly?: MonthlyData[];
}

export interface DataSource {
  name: string;
  url: string;
  endpoint: string;
  accessDate?: string;
  coverage: string;
  license: string;
  format?: string;
  apiKeyRequired?: boolean;
  requiresKey?: boolean;
  parameters?: string;
  limitations: string;
}

export interface Lead {
  id: string;
  customerId?: string;
  name?: string;
  customerName?: string;
  phone: string;
  email: string;
  address: string;
  city?: string;
  state?: string;
  pincode?: string;
  lat?: number;
  lng?: number;
  preferredSystemType?: SystemType;
  systemType?: SystemType;
  preferredCapacityKw?: number;
  capacity?: number;
  monthlyElectricityBill?: number;
  monthlyBill?: number;
  shadowFreeRoofAreaSqFt?: number;
  roofArea?: number;
  gridConnected?: boolean;
  source: LeadSource;
  status: LeadStatus;
  assignedTo?: string;
  assignedToName?: string;
  solarScore?: number;
  expectedGeneration?: number;
  notes?: string;
  nextFollowUp?: string;
  activities?: Activity[];
  createdAt: string;
  updatedAt?: string;
}
