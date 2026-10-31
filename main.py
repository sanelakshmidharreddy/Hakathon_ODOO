import os
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse

# Initialize FastAPI application
app = FastAPI(
    title="SunPower Solutions API",
    description="Backend API and SPA Host for SunPower Solutions Solar Platform",
    version="1.0.0",
)

# Enable CORS for cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths for built static frontend (Vite)
BASE_DIR = Path(__file__).resolve().parent
DIST_DIR = BASE_DIR / "dist"
ASSETS_DIR = DIST_DIR / "assets"

# 1. Health check endpoints required for Render deployment
@app.get("/health")
def health_check():
    """Health check endpoint monitored by Render."""
    return {
        "status": "healthy",
        "service": "SunPower Solutions",
        "version": "1.0.0",
        "framework": "FastAPI",
    }

@app.get("/api/health")
def api_health():
    """API health check endpoint."""
    return {
        "status": "ok",
        "service": "SunPower Solutions API",
        "version": "1.0.0",
    }

@app.get("/api/version")
def api_version():
    """Return platform version and deployment information."""
    return {
        "name": "SunPower Solutions",
        "version": "1.0.0",
        "status": "operational",
        "environment": os.getenv("RENDER", "local"),
    }

# 2. Static Assets Mount (if frontend has been built)
if ASSETS_DIR.exists():
    app.mount("/assets", StaticFiles(directory=str(ASSETS_DIR)), name="assets")

# 3. SPA Fallback & Static File Serving
@app.get("/{full_path:path}")
def serve_spa(full_path: str):
    """
    Catch-all route: serves static files if they exist in dist,
    otherwise returns dist/index.html for client-side routing.
    """
    # Exclude /api routes from returning index.html
    if full_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="API route not found")

    # Serve specific static files from dist if requested (e.g. favicon, manifest, robots)
    potential_file = DIST_DIR / full_path
    if potential_file.is_file():
        return FileResponse(str(potential_file))

    # Return index.html for client-side routing if built
    index_file = DIST_DIR / "index.html"
    if index_file.is_file():
        return FileResponse(str(index_file))

    # Fallback greeting if frontend is not built
    return JSONResponse(
        content={
            "service": "SunPower Solutions API",
            "status": "running",
            "message": "Frontend build not detected. Access /health or /docs for API endpoints.",
        }
    )

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
