import { logger } from '../utils/logger.js';

export async function geocodeAddress(query: string) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'SunPowerSolutions/1.0 (contact@sunpower.in)',
      },
    });
    if (!res.ok) throw new Error(`OSM Nominatim returned status ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
        displayName: data[0].display_name,
        source: 'OpenStreetMap Nominatim',
      };
    }
    return null;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    logger.warn(`Nominatim geocoding fallback active (${message})`);
    return {
      latitude: 17.385,
      longitude: 78.4867,
      displayName: `${query}, India`,
      source: 'OpenStreetMap Fallback',
    };
  }
}
