export function getNrelPvdaqBenchmark() {
  return {
    source: 'NREL PVDAQ (Photovoltaic Data Acquisition)',
    systemType: 'Silicon Monocrystalline Rooftop',
    annualDegradationRatePercent: 0.5,
    performanceRatioExpected: 0.78,
    typicalInverterEfficiencyPercent: 97.2,
    temperatureCoefficientPmax: -0.38,
  };
}
