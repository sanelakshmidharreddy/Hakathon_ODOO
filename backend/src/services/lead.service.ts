import { Lead } from '../types/index.js';

let leadsStore: Lead[] = [
  {
    id: 'lead-1',
    customerName: 'Sanjay Verma',
    phone: '+91 98450 12345',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'site_survey',
    systemCapacityKw: 5,
    solarScore: 92,
    monthlyBill: 4500,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'lead-2',
    customerName: 'Meenakshi Iyer',
    phone: '+91 98450 67890',
    city: 'Chennai',
    state: 'Tamil Nadu',
    status: 'quote_sent',
    systemCapacityKw: 3,
    solarScore: 88,
    monthlyBill: 2800,
    createdAt: new Date().toISOString(),
  },
];

export const leadService = {
  getAll: async (): Promise<Lead[]> => [...leadsStore],
  getById: async (id: string): Promise<Lead | undefined> => leadsStore.find((l) => l.id === id),
  create: async (data: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> => {
    const newLead: Lead = {
      ...data,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    leadsStore.unshift(newLead);
    return newLead;
  },
  updateStatus: async (id: string, status: Lead['status']): Promise<Lead | null> => {
    const lead = leadsStore.find((l) => l.id === id);
    if (!lead) return null;
    lead.status = status;
    return lead;
  },
};
