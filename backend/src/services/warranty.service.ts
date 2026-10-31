import { Warranty } from '../types/index.js';

let warrantiesStore: Warranty[] = [
  {
    id: 'war-001',
    orderId: 'SO-2026-089',
    customerName: 'Ramesh Patel',
    capacityKw: 5,
    activationDate: '2026-02-15',
    expiryDate: '2031-02-15',
    status: 'active',
    policyNumber: 'SUN-WAR-2026-0042',
  },
];

export const warrantyService = {
  getAll: async (): Promise<Warranty[]> => [...warrantiesStore],
  getById: async (id: string): Promise<Warranty | undefined> => warrantiesStore.find((w) => w.id === id),
  createFromJob: async (orderId: string, customerName: string, capacityKw: number): Promise<Warranty> => {
    const activation = new Date();
    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 5);

    const newWarranty: Warranty = {
      id: `war-${Date.now()}`,
      orderId,
      customerName,
      capacityKw,
      activationDate: activation.toISOString().split('T')[0],
      expiryDate: expiry.toISOString().split('T')[0],
      status: 'active',
      policyNumber: `SUN-WAR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    warrantiesStore.unshift(newWarranty);
    return newWarranty;
  },
};
