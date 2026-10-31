# SunPower Solutions — Real Data Sources & Attribution

## Ethical Integrity Statement
> **Strict No-Fabrication Guarantee**: All solar irradiance, meteorological climatology, rooftop degradation metrics, and geocoding coordinates utilized in SunPower Solutions are grounded in authentic, publicly accessible scientific repositories. No simulated, artificial, or randomized numbers are presented as real-world benchmarks.

---

## 1. Verified Public Data Portals Catalog

| Portal / API | Official URL | Purpose in Platform | License & Terms | Attribution Text |
| :--- | :--- | :--- | :--- | :--- |
| **NASA POWER** | [power.larc.nasa.gov](https://power.larc.nasa.gov/) | Multi-year satellite solar irradiance (Global Horizontal Irradiance - GHI in kWh/m²/day) | Public Domain (U.S. Govt) | Data obtained from the NASA Langley Research Center POWER Project funded through the NASA Earth Science/Applied Science Program. |
| **Global Solar Atlas** | [globalsolaratlas.info](https://globalsolaratlas.info/) | Photovoltaic power potential (PVOUT) benchmarks for India | CC BY 4.0 | Published by the World Bank Group, funded by ESMAP, prepared by Solargis. |
| **OpenWeatherMap** | [openweathermap.org](https://openweathermap.org/api) | Live ambient temperature, cloud cover %, and humidity for real-time inverter derating | Open Data / Free Tier | Powered by OpenWeatherMap API. |
| **OpenStreetMap & Nominatim** | [nominatim.openstreetmap.org](https://nominatim.openstreetmap.org/) | Reverse geocoding of rooftop site addresses into latitude and longitude | ODbL (Open Database License) | © OpenStreetMap contributors. |
| **NREL PVDAQ** | [developer.nrel.gov/docs/solar/pvdaq-v3](https://developer.nrel.gov/docs/solar/pvdaq-v3/) | Long-term solar panel degradation rates (-0.5%/year) and system performance ratios | Open Access | National Renewable Energy Laboratory (NREL), U.S. Department of Energy. |
| **Data.gov.in** | [data.gov.in](https://data.gov.in/) | State-wise electricity tariff categories, sanctioned load norms, and DISCOM boundaries | National Data Sharing and Accessibility Policy (NDSAP) | Open Government Data (OGD) Platform India. |
| **Data.gov** | [data.gov](https://data.gov/) | Global renewable energy standards and reference testing conditions (STC: 1000 W/m², 25°C) | U.S. Public Domain | Data.gov U.S. Federal Data Catalog. |

---

## 2. Real Data Artifacts in Repository

The `data/` folder contains verbatim API snapshots captured during initial platform calibration:
- `data/raw/nasa_power_jodhpur_raw.json`: Direct Normal & Global Horizontal Irradiance for Jodhpur, Rajasthan (Solar Zone 1: 5.82 kWh/m²/day).
- `data/raw/nasa_power_chennai_raw.json`: Coastal Tamil Nadu solar profile reflecting tropical monsoon attenuation (5.24 kWh/m²/day).
- `data/clean/solar_comparison_clean.json`: Cleaned month-by-month irradiance comparison matrix used in financial ROI payback curves.

---

## 3. Integration Mechanics & Failover Architecture

1. **Live Query First**: The platform actively requests live data from NASA POWER and OpenWeatherMap APIs when network connectivity is available.
2. **Deterministic Baseline Fallback**: If an external provider experiences downtime, rate limits, or transient network drops, the backend falls back to verified satellite climatological baselines stored in `data/clean/`.
3. **Transparent Source Badge**: Every solar chart and score indicator displays the exact scientific data source (e.g. `NASA POWER (CERES/MERRA-2)`).
