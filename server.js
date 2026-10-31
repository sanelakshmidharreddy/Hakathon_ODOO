import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DIST_DIR = path.resolve(__dirname, 'dist');

// Increase JSON body limit for photo/signature data URLs
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// CORS Configuration for Vercel Frontend Connection
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.CORS_ORIGIN,
  'https://hakathonodoo.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Not allowed by CORS for origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// In-Memory Demo Data Store for Render Backend
let demoStore = {
  leads: [
    {
      id: 'lead-1',
      customerName: 'Sanjay Verma',
      phone: '+91 98450 12345',
      city: 'Hyderabad',
      state: 'Telangana',
      status: 'site_survey',
      systemCapacityKw: 5,
      solarScore: 92,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'lead-2',
      customerName: 'Meenakshi Iyer',
      phone: '+91 98450 67890',
      city: 'Chennai',
      state: 'Tamil Nadu',
      status: 'quote_sent',
      systemCapacityKw: 3,
      solarScore: 88,
      createdAt: new Date().toISOString(),
    },
  ],
  quotes: [
    {
      id: 'q-101',
      leadId: 'lead-2',
      customerName: 'Meenakshi Iyer',
      capacityKw: 3,
      totalAmount: 185000,
      marginPercent: 27.5,
      status: 'approved',
      createdAt: new Date().toISOString(),
    },
  ],
  jobs: [
    {
      id: 'job-501',
      customerName: 'Ramesh Patel',
      city: 'Ahmedabad',
      systemType: '5kW On-Grid',
      technician: 'Arun Kumar',
      status: 'in_progress',
      completionPercentage: 70,
    },
  ],
  dispatches: [
    {
      id: 'dsp-201',
      orderId: 'SO-2026-089',
      destination: 'Hyderabad Site #4',
      status: 'dispatched',
      truckNumber: 'TS-09-UB-4421',
      serialCount: 16,
    },
  ],
  warranties: [
    {
      serialNumber: 'PAN-2026-90412',
      productName: 'Waaree 540W Mono PERC Panel',
      customerName: 'Alice Singh',
      installationDate: '2026-01-15',
      warrantyPeriodYears: 25,
      status: 'active',
    },
  ],
  tickets: [
    {
      id: 'tkt-801',
      customerName: 'Karthik Rao',
      issueType: 'Inverter Error Code E04',
      priority: 'high',
      status: 'open',
      createdAt: new Date().toISOString(),
    },
  ],
};

// 1. Health check endpoints
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SunPower Solutions API',
    time: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SunPower Solutions API',
    time: new Date().toISOString(),
  });
});

// 2. Authentication Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  const token = `jwt_demo_${Date.now()}_${Buffer.from(email || 'user').toString('base64')}`;
  res.json({
    success: true,
    token,
    user: {
      email: email || 'alice.singh@sunpowersolutions.in',
      name: email ? email.split('@')[0] : 'Demo User',
      role: role || 'director',
    },
  });
});

// 3. Operational Endpoints
app.get('/api/leads', (req, res) => {
  res.json({ success: true, count: demoStore.leads.length, data: demoStore.leads });
});

app.post('/api/leads', (req, res) => {
  const newLead = {
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...req.body,
  };
  demoStore.leads.unshift(newLead);
  res.status(201).json({ success: true, data: newLead });
});

app.get('/api/quotes', (req, res) => {
  res.json({ success: true, count: demoStore.quotes.length, data: demoStore.quotes });
});

app.post('/api/quotes', (req, res) => {
  const newQuote = {
    id: `q-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...req.body,
  };
  demoStore.quotes.unshift(newQuote);
  res.status(201).json({ success: true, data: newQuote });
});

app.get('/api/jobs', (req, res) => {
  res.json({ success: true, count: demoStore.jobs.length, data: demoStore.jobs });
});

app.get('/api/dispatches', (req, res) => {
  res.json({ success: true, count: demoStore.dispatches.length, data: demoStore.dispatches });
});

app.get('/api/warranties', (req, res) => {
  const { serial } = req.query;
  if (serial) {
    const match = demoStore.warranties.filter((w) =>
      w.serialNumber.toLowerCase().includes(String(serial).toLowerCase())
    );
    return res.json({ success: true, count: match.length, data: match });
  }
  res.json({ success: true, count: demoStore.warranties.length, data: demoStore.warranties });
});

app.get('/api/tickets', (req, res) => {
  res.json({ success: true, count: demoStore.tickets.length, data: demoStore.tickets });
});

app.post('/api/tickets', (req, res) => {
  const newTicket = {
    id: `tkt-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...req.body,
  };
  demoStore.tickets.unshift(newTicket);
  res.status(201).json({ success: true, data: newTicket });
});

app.get('/api/analytics', (req, res) => {
  res.json({
    success: true,
    data: {
      monthlyRevenue: 1420000,
      completedInstallations: 38,
      pipelineLeads: 24,
      avgGrossMargin: 28.4,
      co2SavedTonnes: 142.8,
      activeWarranties: 412,
    },
  });
});

// 4. File / Photo / Signature Upload Endpoint
app.post('/api/upload', (req, res) => {
  const { fileData, fileName, fileType, jobId, tag } = req.body;
  if (!fileData) {
    return res.status(400).json({ error: 'Missing file data (base64 or multipart)' });
  }

  // Construct secure URL on Render backend domain
  const host = req.get('host') || 'hakathon-odoo.onrender.com';
  const protocol = req.protocol === 'https' || req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http';
  const fileId = `proof_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const publicUrl = `${protocol}://${host}/api/files/${fileId}`;

  res.status(201).json({
    success: true,
    fileId,
    fileName: fileName || `${fileId}.jpg`,
    fileType: fileType || 'image/jpeg',
    url: publicUrl,
    jobId: jobId || null,
    tag: tag || 'installation_evidence',
    uploadedAt: new Date().toISOString(),
  });
});

// Any unmatched /api route returns 404 JSON, NOT index.html
app.use('/api', (req, res) => {
  res.status(404).json({
    error: 'API route not found',
    path: req.originalUrl,
  });
});

// Static Build Files (if serving frontend as single container)
app.use(
  express.static(DIST_DIR, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      } else if (filePath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    },
  })
);

// SPA Fallback for static assets
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found', path: req.originalUrl });
  }

  res.sendFile(path.resolve(DIST_DIR, 'index.html'), (err) => {
    if (err) {
      res.status(500).send('Production build not found. Please run "npm run build" first.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`SunPower Solutions Backend Server listening on http://localhost:${PORT}`);
  console.log(`Allowed CORS Origins:`, allowedOrigins);
});
