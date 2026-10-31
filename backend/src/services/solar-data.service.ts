export interface SolarIrradianceData {
  city: string;
  latitude: number;
  longitude: number;
  annualAverageGhiKwhM2Day: number;
  optimalTiltAngle: number;
  source: string;
}

const CITY_SOLAR_DATABASE: Record<string, SolarIrradianceData> = {
  jodhpur: {
    city: 'Jodhpur',
    latitude: 26.2389,
    longitude: 73.0243,
    annualAverageGhiKwhM2Day: 5.82,
    optimalTiltAngle: 26,
    source: 'NASA POWER Satellite Climatology (CERES/MERRA-2)',
  },
  chennai: {
    city: 'Chennai',
    latitude: 13.0827,
    longitude: 80.2707,
    annualAverageGhiKwhM2Day: 5.24,
    optimalTiltAngle: 13,
    source: 'NASA POWER Satellite Climatology (CERES/MERRA-2)',
  },
  hyderabad: {
    city: 'Hyderabad',
    latitude: 17.385,
    longitude: 78.4867,
    annualAverageGhiKwhM2Day: 5.38,
    optimalTiltAngle: 17,
    source: 'NASA POWER Satellite Climatology (CERES/MERRA-2)',
  },
  ahmedabad: {
    city: 'Ahmedabad',
    latitude: 23.0225,
    longitude: 72.5714,
    annualAverageGhiKwhM2Day: 5.58,
    optimalTiltAngle: 23,
    source: 'NASA POWER Satellite Climatology (CERES/MERRA-2)',
  },
};

export const solarDataService = {
  getByCity: async (cityName: string): Promise<SolarIrradianceData> => {
    const key = cityName.toLowerCase().trim();
    if (CITY_SOLAR_DATABASE[key]) {
      return CITY_SOLAR_DATABASE[key];
    }
    // Default national average for India
    return {
      city: cityName,
      latitude: 20.5937,
      longitude: 78.9629,
      annualAverageGhiKwhM2Day: 5.15,
      optimalTiltAngle: 20,
      source: 'NASA POWER National Average Fallback',
    };
  },
};
