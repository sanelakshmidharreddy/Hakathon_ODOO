# SunPower Solutions: Data Visualizations & Charts Catalog

The platform renders 5 high-fidelity interactive data visualizations built with Recharts and Tailwind CSS.

### 1. Monthly Solar Irradiance vs PV Output Chart (`/app/solar-insights`)
- **Axes:** Month (Jan-Dec) vs Daily GHI (kWh/m²/day, left axis) vs System Output (kWh/month, right axis).
- **Dataset:** NASA POWER parameter `ALLSKY_SFC_SW_DWN` with 78% Performance Ratio modeling.
- **Interactivity:** System capacity toggle (1 kW, 3 kW, 5 kW) updates the monthly yield bars in real-time.

### 2. Multi-Site Climatological Comparison Area Chart (`/app/dashboard` & `/app/solar-insights`)
- **Metric:** Daily GHI (kWh/m²/day) comparing Chennai (Urban Coastal) vs Jodhpur (High DNI Semi-Urban).
- **Insight:** Highlights the seasonal monsoon dip in Chennai (Oct-Dec) and the prime solar peak in Rajasthan (Apr-May).

### 3. Ambient Temperature Thermal Derate Curve (`/app/solar-insights`)
- **Metric:** Ambient 2-meter air temperature (°C) from NASA POWER parameter `T2M`.
- **Insight:** Shows peak thermal derating (-0.38%/°C) in summer months.

### 4. Revenue vs Component BOM Cost Bar Chart (`/app/dashboard`)
- **Axes:** 6-Month rolling turnover vs equipment and crew installation costs.
- **Insight:** Verifies gross margin health consistently exceeding the 20% minimum threshold.

### 5. Equipment System Type Distribution Pie Chart (`/app/dashboard`)
- **Distribution:** 5 kW Off-Grid (45%), 3 kW On-Grid (30%), 5 kW On-Grid (15%), 1-2 kW Basic (10%).
