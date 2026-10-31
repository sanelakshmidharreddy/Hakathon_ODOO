# SunPower Solutions Deployment & Operations Guide

This guide covers local development, production hosting, automated testing, configuration, and database maintenance for the `sunpower_solutions` Odoo module.

---

## 1. Prerequisites & System Requirements

* **Operating System:** Ubuntu 22.04 / 24.04 LTS, macOS, or Windows 10/11 (WSL2 recommended)
* **Python Version:** Python 3.10, 3.11, or 3.12
* **Odoo Version:** Odoo 16.0, 17.0, or 18.0 Community or Enterprise
* **PostgreSQL:** Version 14, 15, or 16
* **PDF Engine:** `wkhtmltopdf` 0.12.5 or 0.12.6 with patched Qt (required for QWeb PDF reports)

---

## 2. Environment Setup

### 2.1 Clone Repository
```bash
git clone https://github.com/sanelakshmidharreddy/Hakathon_ODOO.git
cd Hakathon_ODOO
```

### 2.2 Python Dependencies
Ensure your Odoo virtual environment has the required scientific and HTTP libraries:
```bash
pip install requests python-dateutil
```

### 2.3 PostgreSQL User & Database
```bash
# Create PostgreSQL user (if not already existing)
sudo -u postgres createuser -s $USER
# Create database
sudo -u postgres createdb -O $USER sunpower_db
```

---

## 3. Odoo Configuration File (`odoo.conf`)

Create or update your `odoo.conf` file:
```ini
[options]
admin_passwd = admin_secret_token
db_host = localhost
db_port = 5432
db_user = odoo
db_password = odoo_password
db_name = sunpower_db
addons_path = /path/to/odoo/addons,/path/to/Hakathon_ODOO
xmlrpc_port = 8069
longpolling_port = 8072
data_dir = /var/lib/odoo

; Performance settings
workers = 3
limit_time_cpu = 600
limit_time_real = 1200
```

---

## 4. Module Installation & Upgrade Commands

### 4.1 Install Module Fresh
To install the `sunpower_solutions` module into a new database:
```bash
odoo-bin -c odoo.conf -d sunpower_db -i sunpower_solutions
```

### 4.2 Upgrade Existing Module
Whenever Python models, XML views, reports, or assets are modified:
```bash
odoo-bin -c odoo.conf -d sunpower_db -u sunpower_solutions
```

### 4.3 Run Automated Test Suite
Execute the full test suite and verify all business constraints:
```bash
odoo-bin -c odoo.conf -d sunpower_db -i sunpower_solutions --test-enable --stop-after-init
```

---

## 5. External API Configuration & Environment Variables

Do NOT commit API keys to version control. Set them as environment variables or Odoo System Parameters (`ir.config_parameter`):

```bash
# Optional OpenWeather API Key for field weather hazard alerts
export SUNPOWER_OPENWEATHER_KEY="your_actual_key_here"
```

In Odoo Settings → Technical → Parameters → System Parameters:
- Key: `sunpower.openweather.key` | Value: `<api_key>`
- Key: `sunpower.company.phone` | Value: `+91 80 4123 4567`
- Key: `sunpower.company.gstin` | Value: `29AAACS1234F1Z5`

---

## 6. Database Backup & Disaster Recovery

### 6.1 Database Backup
```bash
# Binary dump with filestore attachments
pg_dump -Fc -h localhost -U odoo -d sunpower_db > /backups/sunpower_db_$(date +%Y%m%d).dump
```

### 6.2 Database Restore
```bash
createdb -O odoo sunpower_db_restored
pg_restore -h localhost -U odoo -d sunpower_db_restored /backups/sunpower_db_20260131.dump
```

---

## 7. Troubleshooting & FAQ

* **Issue: "No such file or directory: wkhtmltopdf"**
  * *Solution:* Install `wkhtmltox` package with patched Qt from [wkhtmltopdf.org/downloads.html](https://wkhtmltopdf.org/downloads.html).
* **Issue: "Duplicate active lead ValidationError"**
  * *Solution:* By design, the ORM prevents duplicate active leads for the same customer phone number. Convert or archive the existing lead first.
* **Issue: "Gate check failed: Scanned serials count mismatch on dispatch"**
  * *Solution:* Warehouse operators must scan all required panel, inverter, and battery serial numbers using the OWL scanner widget before confirming gate dispatch.
