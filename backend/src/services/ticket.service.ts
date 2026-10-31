import { ServiceTicket } from '../types/index.js';

let ticketsStore: ServiceTicket[] = [
  {
    id: 'tkt-1',
    ticketNumber: 'TKT-2026-001',
    customerName: 'Anil Deshmukh',
    city: 'Pune',
    issueType: 'inverter_offline',
    priority: 'high',
    status: 'open',
    createdAt: new Date().toISOString(),
  },
];

export const ticketService = {
  getAll: async (): Promise<ServiceTicket[]> => [...ticketsStore],
  create: async (data: Omit<ServiceTicket, 'id' | 'ticketNumber' | 'createdAt'>): Promise<ServiceTicket> => {
    const newTicket: ServiceTicket = {
      ...data,
      id: `tkt-${Date.now()}`,
      ticketNumber: `TKT-2026-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
    };
    ticketsStore.unshift(newTicket);
    return newTicket;
  },
};
