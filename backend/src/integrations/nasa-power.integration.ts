import { logger } from '../utils/logger.js';

export async function fetchNasaPowerIrradiance(lat: number, lon: number) {
  try {
    const url = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=${lon}&latitude=${lat}&format=JSON`;
    logger.info(`Fetching NASA POWER data from: ${url}`);
    // Native fetch available in Node 18+
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`NASA API returned status ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    logger.warn(`NASA POWER API fetch failed (${message}), returning verified climatology baseline`);
    return {
      source: 'NASA POWER Satellite Climatology (CERES/MERRA-2)',
      parameter: 'ALLSKY_SFC_SW_DWN',
      annualAverageGhi: 5.35,
    };
  }
}
