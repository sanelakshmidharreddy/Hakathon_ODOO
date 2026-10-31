import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional, Dict, Any, List
from fastapi import FastAPI, HTTPException, Request, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel

# Initialize FastAPI application
app = FastAPI(
    title="SunPower Solutions API",
    description="Render Backend API for SunPower Solutions Solar Platform (Connected to Vercel Frontend)",
    version="1.0.0",
)

# CORS Configuration for Vercel Frontend Connection
allowed_origins = [
    os.getenv("FRONTEND_URL"),
    os.getenv("CORS_ORIGIN"),
    "https://hakathonodoo.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:5000",
]
allowed_origins = [origin for origin in allowed_origins if origin]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

# Paths for built static frontend (if running in full-stack mode)
BASE_DIR = Path(__file__).resolve().parent
DIST_DIR = BASE_DIR / "dist"
ASSETS_DIR = DIST_DIR / "assets"

# In-Memory Demo Data Store
DEMO_LEADS = [
    {
        "id": "lead-1",
        "customerName": "Sanjay Verma",
        "phone": "+91 98450 12345",
        "city": "Hyderabad",
        "state": "Telangana",
        "status": "site_survey",
        "systemCapacityKw": 5,
        "solarScore": 92,
        "createdAt": datetime.now(timezone.utc).isoformat(),
    },
    {
        "id": "lead-2",
        "customerName": "Meenakshi Iyer",
        "phone": "+91 98450 67890",
        "city": "Chennai",
        "state": "Tamil Nadu",
        "status": "quote_sent",
        "systemCapacityKw": 3,
        "solarScore": 88,
        "createdAt": datetime.now(timezone.utc).isoformat(),
    },
]

DEMO_QUOTES = [
    {
        "id": "q-101",
        "leadId": "lead-2",
        "customerName": "Meenakshi Iyer",
        "capacityKw": 3,
        "totalAmount": 185000,
        "marginPercent": 27.5,
        "status": "approved",
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }
]

DEMO_JOBS = [
    {
        "id": "job-501",
        "customerName": "Ramesh Patel",
        "city": "Ahmedabad",
        "systemType": "5kW On-Grid",
        "technician": "Arun Kumar",
        "status": "in_progress",
        "completionPercentage": 70,
    }
]

DEMO_DISPATCHES = [
    {
        "id": "dsp-201",
        "orderId": "SO-2026-089",
        "destination": "Hyderabad Site #4",
        "status": "dispatched",
        "truckNumber": "TS-09-UB-4421",
        "serialCount": 16,
    }
]

DEMO_WARRANTIES = [
    {
        "serialNumber": "PAN-2026-90412",
        "productName": "Waaree 540W Mono PERC Panel",
        "customerName": "Alice Singh",
        "installationDate": "2026-01-15",
        "warrantyPeriodYears": 25,
        "status": "active",
    }
]

DEMO_TICKETS = [
    {
        "id": "tkt-801",
        "customerName": "Karthik Rao",
        "issueType": "Inverter Error Code E04",
        "priority": "high",
        "status": "open",
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }
]

# 1. Health check endpoints required by Render and frontend
@app.get("/health")
def health_root():
    return {
        "status": "ok",
        "service": "SunPower Solutions API",
        "time": datetime.now(timezone.utc).isoformat(),
    }

@app.get("/api/health")
def api_health():
    return {
        "status": "ok",
        "service": "SunPower Solutions API",
        "time": datetime.now(timezone.utc).isoformat(),
    }

# 2. Authentication
class LoginPayload(BaseModel):
    email: Optional[str] = "alice.singh@sunpowersolutions.in"
    password: Optional[str] = "demo123"
    role: Optional[str] = "director"

@app.post("/api/auth/login")
def login(payload: LoginPayload):
    token = f"jwt_demo_{int(datetime.now(timezone.utc).timestamp())}"
    return {
        "success": True,
        "token": token,
        "user": {
            "email": payload.email,
            "name": payload.email.split("@")[0] if payload.email else "User",
            "role": payload.role or "director",
        },
    }

# 3. Operational REST Endpoints
@app.get("/api/leads")
def get_leads():
    return {"success": True, "count": len(DEMO_LEADS), "data": DEMO_LEADS}

@app.post("/api/leads")
def create_lead(lead: Dict[str, Any] = Body(...)):
    lead_id = f"lead-{int(datetime.now(timezone.utc).timestamp())}"
    lead["id"] = lead_id
    lead["createdAt"] = datetime.now(timezone.utc).isoformat()
    DEMO_LEADS.insert(0, lead)
    return {"success": True, "data": lead}

@app.get("/api/quotes")
def get_quotes():
    return {"success": True, "count": len(DEMO_QUOTES), "data": DEMO_QUOTES}

@app.post("/api/quotes")
def create_quote(quote: Dict[str, Any] = Body(...)):
    quote_id = f"q-{int(datetime.now(timezone.utc).timestamp())}"
    quote["id"] = quote_id
    quote["createdAt"] = datetime.now(timezone.utc).isoformat()
    DEMO_QUOTES.insert(0, quote)
    return {"success": True, "data": quote}

@app.get("/api/jobs")
def get_jobs():
    return {"success": True, "count": len(DEMO_JOBS), "data": DEMO_JOBS}

@app.get("/api/dispatches")
def get_dispatches():
    return {"success": True, "count": len(DEMO_DISPATCHES), "data": DEMO_DISPATCHES}

@app.get("/api/warranties")
def get_warranties(serial: Optional[str] = None):
    if serial:
        matches = [w for w in DEMO_WARRANTIES if serial.lower() in w["serialNumber"].lower()]
        return {"success": True, "count": len(matches), "data": matches}
    return {"success": True, "count": len(DEMO_WARRANTIES), "data": DEMO_WARRANTIES}

@app.get("/api/tickets")
def get_tickets():
    return {"success": True, "count": len(DEMO_TICKETS), "data": DEMO_TICKETS}

@app.post("/api/tickets")
def create_ticket(ticket: Dict[str, Any] = Body(...)):
    ticket_id = f"tkt-{int(datetime.now(timezone.utc).timestamp())}"
    ticket["id"] = ticket_id
    ticket["createdAt"] = datetime.now(timezone.utc).isoformat()
    DEMO_TICKETS.insert(0, ticket)
    return {"success": True, "data": ticket}

@app.get("/api/analytics")
def get_analytics():
    return {
        "success": True,
        "data": {
            "monthlyRevenue": 1420000,
            "completedInstallations": 38,
            "pipelineLeads": 24,
            "avgGrossMargin": 28.4,
            "co2SavedTonnes": 142.8,
            "activeWarranties": 412,
        },
    }

# 4. File / Photo Upload Endpoint
@app.post("/api/upload")
def upload_file(request: Request, payload: Dict[str, Any] = Body(...)):
    file_data = payload.get("fileData")
    if not file_data:
        raise HTTPException(status_code=400, detail="Missing fileData in request body")

    host = request.headers.get("host", "hakathon-odoo.onrender.com")
    proto = request.headers.get("x-forwarded-proto", "https")
    file_id = f"proof_{int(datetime.now(timezone.utc).timestamp())}"
    public_url = f"{proto}://{host}/api/files/{file_id}"

    return {
        "success": True,
        "fileId": file_id,
        "fileName": payload.get("fileName", f"{file_id}.jpg"),
        "url": public_url,
        "jobId": payload.get("jobId"),
        "tag": payload.get("tag", "installation_evidence"),
        "uploadedAt": datetime.now(timezone.utc).isoformat(),
    }

# 5. Static Assets Mount (if dist exists)
if ASSETS_DIR.exists():
    app.mount("/assets", StaticFiles(directory=str(ASSETS_DIR)), name="assets")

# 6. SPA Catch-all Fallback
@app.get("/{full_path:path}")
def serve_spa(full_path: str):
    if full_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="API route not found")

    potential_file = DIST_DIR / full_path
    if potential_file.is_file():
        return FileResponse(str(potential_file))

    index_file = DIST_DIR / "index.html"
    if index_file.is_file():
        return FileResponse(str(index_file))

    return JSONResponse(
        content={
            "service": "SunPower Solutions API",
            "status": "running",
            "docs": "/docs",
            "health": "/api/health",
        }
    )

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 5000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
