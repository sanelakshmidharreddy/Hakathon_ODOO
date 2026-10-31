# SunPower Solutions Public Data Sources & Scientific Provenance

All solar irradiance calculations, meteorological assessments, and geospatial validations in SunPower Solutions are grounded in verified public data sources. **No values are fabricated.**

---

## 1. NASA POWER (Prediction of Worldwide Energy Resources)

* **Portal:** [https://power.larc.nasa.gov/](https://power.larc.nasa.gov/)
* **API Documentation:** [https://power.larc.nasa.gov/docs/services/api/](https://power.larc.nasa.gov/docs/services/api/)
* **Base Endpoint:** `https://power.larc.nasa.gov/api/temporal/climatology/point`
* **Coverage:** Global, 0.5° x 0.5° latitude/longitude grid resolution.
* **License:** Public Domain / NASA Open Data Policy.
* **Access Date:** Live dynamic query with local database caching.
* **Core Parameters Queried:**
  * `ALLSKY_SFC_SW_DWN`: All-sky global horizontal irradiance (GHI, kWh/m²/day).
  * `ALLSKY_SFC_SW_DNI`: Direct normal irradiance (DNI, kWh/m²/day).
  * `ALLSKY_SFC_SW_DIFF`: Diffuse horizontal irradiance (DHI, kWh/m²/day).
  * `T2M`: Air temperature at 2 meters (°C) for PV temperature derate calculation.
  * `WS2M`: Wind speed at 2 meters (m/s).
* **Derivation Formula:**
  $$\text{PVOUT (Annual Specific Yield)} = \text{GHI}_{\text{annual}} \times 365 \times \text{PR} \times [1 - \gamma \times (T_{\text{cell}} - 25)]$$
  Where:
  - $\text{PR}$ (Performance Ratio) = $0.78$ (standard Indian rooftop BOS derating).
  - $\gamma$ (Temperature Coefficient of Pmax) = $0.35\% / ^\circ\text{C}$ for Mono-PERC.
  - $T_{\text{cell}} = T_{\text{ambient}} + 28^\circ\text{C}$ (NOCT nominal operating cell temperature).

---

## 2. Global Solar Atlas (Solargis / The World Bank)

* **Portal:** [https://globalsolaratlas.info/](https://globalsolaratlas.info/)
* **Download & Attribution:** [https://globalsolaratlas.info/download](https://globalsolaratlas.info/download)
* **License:** Creative Commons Attribution 4.0 International (CC BY 4.0).
* **Attribution Notice:**
  > *"Solar resource data: Solargis © 2026 The World Bank, Source: Global Solar Atlas."*
* **Application in SunPower:**
  * Benchmark reference for Indian sub-continent regional specific yield ($1,350 - 1,600\text{ kWh/kWp/year}$).
  * Optimum tilt angle verification by latitude ($12^\circ - 15^\circ$ for South India; $24^\circ - 28^\circ$ for North India).

---

## 3. OpenStreetMap (OSM) & Nominatim Geocoding

* **Portal:** [https://www.openstreetmap.org/](https://www.openstreetmap.org/)
* **Nominatim Geocoding API:** [https://nominatim.openstreetmap.org/](https://nominatim.openstreetmap.org/)
* **Endpoint:** `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q={query}`
* **License:** Open Database License (ODbL) © OpenStreetMap contributors.
* **Compliance:**
  * Strict `User-Agent: SunPower-Solutions-Odoo/1.0` header applied.
  * Queries restricted to 1 request per second with local coordinate caching in `sunpower.customer` to prevent rate-limit throttling.

---

## 4. NREL PVDAQ (Photovoltaic Data Acquisition)

* **Portal:** [https://pvdaq.nrel.gov/](https://pvdaq.nrel.gov/)
* **Publisher:** National Renewable Energy Laboratory (NREL), U.S. Department of Energy.
* **Usage:** Performance ratio validation and long-term degradation curves ($0.50\% - 0.55\%$ per annum) for Tier 1 crystalline silicon modules.

---

## 5. OpenWeather API (Weather & Installation Risk)

* **Portal:** [https://openweathermap.org/api](https://openweathermap.org/api)
* **Application:** Live weather risk check on installation date (heavy rain or high wind hazard alerting technicians before roof mounting).
* **Configuration:** Stored securely in Odoo System Parameters (`sunpower.openweather.key`) or environment variables; never committed to git.

---

## 6. Data.gov.in (Government of India Open Data)

* **Portal:** [https://www.data.gov.in/catalog/estimated-renewable-energy-potential](https://www.data.gov.in/catalog/estimated-renewable-energy-potential)
* **License:** National Data Sharing and Accessibility Policy (NDSAP).
* **Usage:** State-wise rooftop solar potential benchmarks (Karnataka: 24,700 MWp; Maharashtra: 34,200 MWp).
