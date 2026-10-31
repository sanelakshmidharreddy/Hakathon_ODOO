import { AnalyticsSummary } from '../types/index.js';
import { toNumber } from '../utils/validator.js';

export const analyticsService = {
  getSummary: async (): Promise<AnalyticsSummary> => {
    const monthlyRevenue = toNumber(2450000, 0);
    const totalCost = toNumber(1780000, 0);
    const grossProfit = Math.max(0, monthlyRevenue - totalCost);
    const grossMargin = monthlyRevenue > 0 ? Number(((grossProfit / monthlyRevenue) * 100).toFixed(1)) : 0;
    const warehouseValue = toNumber(4250000, 0);

    return {
      monthlyRevenue,
      totalCost,
      grossProfit,
      grossMargin,
      warehouseValue,
      activeJobs: 14,
      completedJobs: 38,
      activeWarranties: 42,
      openTickets: 5,
      leadConversionRate: 28.5,
      pipelineLeads: 24,
      co2SavedTonnes: 54.2,
    };
  },
};
