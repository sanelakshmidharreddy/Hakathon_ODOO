import { useMemo } from 'react';
import { toNumber } from '../lib/number';

export interface SolarSystemEstimate {
  capacityKw: number;
  annualGenerationKwh: number;
  co2SavedKgPerYear: number;
  treesEquivalent: number;
  estimatedCostInr: number;
  subsidyInr: number;
  netCostInr: number;
  paybackPeriodYears: number;
}

export function useSolarCalculation(monthlyBillInr: number, stateCode = 'MH'): SolarSystemEstimate {
  return useMemo(() => {
    const bill = toNumber(monthlyBillInr, 0);
    // Average unit cost in India ~ ₹7.5 / kWh
    const monthlyUnits = bill / 7.5;
    const dailyUnits = monthlyUnits / 30;

    // 1 kWp system generates roughly 4.0 - 4.5 kWh/day in India
    const capacityKw = Math.max(1, Math.round((dailyUnits / 4.2) * 10) / 10);
    const annualGenerationKwh = Math.round(capacityKw * 4.2 * 365);

    // CO2 emission factor for Indian grid ~ 0.82 kg CO2 / kWh
    const co2SavedKgPerYear = Math.round(annualGenerationKwh * 0.82);
    const treesEquivalent = Math.round(co2SavedKgPerYear / 21); // ~21 kg CO2 absorbed per mature tree/year

    // Cost estimate approx ₹60,000 / kW for residential
    const estimatedCostInr = Math.round(capacityKw * 60000);

    // PM Surya Ghar Muft Bijli Yojana Subsidy Structure:
    // Up to 2 kW: ₹30,000 / kW (max ₹60,000)
    // 3 kW: ₹78,000 fixed
    // > 3 kW: ₹78,000 fixed cap
    let subsidyInr = 0;
    if (capacityKw <= 2) {
      subsidyInr = Math.round(capacityKw * 30000);
    } else {
      subsidyInr = 78000;
    }

    const netCostInr = Math.max(0, estimatedCostInr - subsidyInr);
    const annualSavingsInr = annualGenerationKwh * 7.5;
    const paybackPeriodYears = annualSavingsInr > 0 ? Math.round((netCostInr / annualSavingsInr) * 10) / 10 : 0;

    return {
      capacityKw,
      annualGenerationKwh,
      co2SavedKgPerYear,
      treesEquivalent,
      estimatedCostInr,
      subsidyInr,
      netCostInr,
      paybackPeriodYears,
    };
  }, [monthlyBillInr, stateCode]);
}
