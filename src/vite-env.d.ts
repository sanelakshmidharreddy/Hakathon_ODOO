/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_BASE_PATH?: string;
  readonly VITE_OPENWEATHER_API_KEY?: string;
  readonly VITE_NASA_POWER_ENDPOINT?: string;
  readonly VITE_OSM_NOMINATIM_ENDPOINT?: string;
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
