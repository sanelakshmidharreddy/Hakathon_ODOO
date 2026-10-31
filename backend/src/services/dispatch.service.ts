import { Dispatch } from '../types/index.js';

let dispatchesStore: Dispatch[] = [
  {
    id: 'dsp-201',
    orderId: 'SO-2026-089',
    destination: 'Hyderabad Site #4',
    status: 'dispatched',
    truckNumber: 'TS-09-UB-4421',
    serialCount: 16,
    dispatchedAt: new Date().toISOString(),
  },
];

export const dispatchService = {
  getAll: async (): Promise<Dispatch[]> => [...dispatchesStore],
  getById: async (id: string): Promise<Dispatch | undefined> => dispatchesStore.find((d) => d.id === id),
  create: async (data: Omit<Dispatch, 'id' | 'dispatchedAt'>): Promise<Dispatch> => {
    const newDispatch: Dispatch = {
      ...data,
      id: `dsp-${Date.now()}`,
      dispatchedAt: new Date().toISOString(),
    };
    dispatchesStore.unshift(newDispatch);
    return newDispatch;
  },
};
