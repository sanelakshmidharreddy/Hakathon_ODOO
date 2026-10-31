import { Quote } from '../types/index.js';

let quotesStore: Quote[] = [
  {
    id: 'q-101',
    leadId: 'lead-2',
    customerName: 'Meenakshi Iyer',
    capacityKw: 3,
    totalAmount: 185000,
    equipmentCost: 110000,
    installationCost: 15000,
    labourCost: 9000,
    marginPercent: 27.5,
    status: 'approved',
    createdAt: new Date().toISOString(),
  },
];

export const quoteService = {
  getAll: async (): Promise<Quote[]> => [...quotesStore],
  getById: async (id: string): Promise<Quote | undefined> => quotesStore.find((q) => q.id === id),
  create: async (data: Omit<Quote, 'id' | 'createdAt'>): Promise<Quote> => {
    const newQuote: Quote = {
      ...data,
      id: `q-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    quotesStore.unshift(newQuote);
    return newQuote;
  },
  updateStatus: async (id: string, status: Quote['status']): Promise<Quote | null> => {
    const quote = quotesStore.find((q) => q.id === id);
    if (!quote) return null;
    quote.status = status;
    return quote;
  },
};
