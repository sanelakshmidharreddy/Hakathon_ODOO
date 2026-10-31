import { Job } from '../types/index.js';

let jobsStore: Job[] = [
  {
    id: 'job-501',
    customerName: 'Ramesh Patel',
    city: 'Ahmedabad',
    systemType: '5kW On-Grid',
    technician: 'Arun Kumar',
    status: 'in_progress',
    completionPercentage: 70,
    scheduledDate: '2026-11-02',
    photosCount: 6,
    hasSignature: true,
  },
];

export const jobService = {
  getAll: async (): Promise<Job[]> => [...jobsStore],
  getById: async (id: string): Promise<Job | undefined> => jobsStore.find((j) => j.id === id),
  create: async (data: Omit<Job, 'id'>): Promise<Job> => {
    const newJob: Job = {
      ...data,
      id: `job-${Date.now()}`,
    };
    jobsStore.unshift(newJob);
    return newJob;
  },
  updateProgress: async (id: string, completionPercentage: number, status?: Job['status']): Promise<Job | null> => {
    const job = jobsStore.find((j) => j.id === id);
    if (!job) return null;
    job.completionPercentage = completionPercentage;
    if (status) job.status = status;
    return job;
  },
};
