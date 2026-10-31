export interface LeadModel {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  state: string;
  status: string;
  systemCapacityKw: number;
  solarScore: number;
  monthlyBill: number;
  createdAt: string;
  updatedAt?: string;
}

export interface QuoteModel {
  id: string;
  leadId: string;
  customerName: string;
  capacityKw: number;
  totalAmount: number;
  equipmentCost: number;
  installationCost: number;
  labourCost: number;
  marginPercent: number;
  status: string;
  createdAt: string;
}

export interface JobModel {
  id: string;
  customerName: string;
  city: string;
  systemType: string;
  technician: string;
  status: string;
  completionPercentage: number;
  scheduledDate?: string;
}

export interface DispatchModel {
  id: string;
  orderId: string;
  destination: string;
  status: string;
  truckNumber: string;
  serialCount: number;
  dispatchedAt: string;
}

export interface WarrantyModel {
  id: string;
  orderId: string;
  customerName: string;
  capacityKw: number;
  activationDate: string;
  expiryDate: string;
  status: string;
  policyNumber: string;
}

export interface TicketModel {
  id: string;
  ticketNumber: string;
  customerName: string;
  city: string;
  issueType: string;
  priority: string;
  status: string;
  createdAt: string;
}

export interface UserModel {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}
