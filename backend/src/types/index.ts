export interface Lead {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  state: string;
  status: 'new' | 'contacted' | 'site_survey' | 'quote_sent' | 'won' | 'lost';
  systemCapacityKw: number;
  solarScore: number;
  monthlyBill?: number;
  createdAt: string;
}

export interface Quote {
  id: string;
  leadId: string;
  customerName: string;
  capacityKw: number;
  totalAmount: number;
  equipmentCost?: number;
  installationCost?: number;
  labourCost?: number;
  marginPercent: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Job {
  id: string;
  customerName: string;
  city: string;
  systemType: string;
  technician: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'commissioned';
  completionPercentage: number;
  scheduledDate?: string;
  photosCount?: number;
  hasSignature?: boolean;
}

export interface Dispatch {
  id: string;
  orderId: string;
  destination: string;
  status: 'pending' | 'dispatched' | 'delivered';
  truckNumber: string;
  serialCount: number;
  dispatchedAt?: string;
}

export interface Warranty {
  id: string;
  orderId: string;
  customerName: string;
  capacityKw: number;
  activationDate: string;
  expiryDate: string;
  status: 'active' | 'expiring_soon' | 'expired';
  policyNumber: string;
}

export interface ServiceTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  city: string;
  issueType: 'inverter_offline' | 'generation_drop' | 'panel_damage' | 'meter_error' | 'routine_maintenance';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
}

export interface AnalyticsSummary {
  monthlyRevenue: number;
  totalCost: number;
  grossProfit: number;
  grossMargin: number;
  warehouseValue: number;
  activeJobs: number;
  completedJobs: number;
  activeWarranties: number;
  openTickets: number;
  leadConversionRate: number;
  pipelineLeads: number;
  co2SavedTonnes: number;
}
