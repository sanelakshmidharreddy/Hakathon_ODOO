import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DIST_DIR = path.resolve(__dirname, 'dist');

app.use(express.json());

// 1. API Routes (Served FIRST)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SunPower Solutions Production Server',
    router: 'React Router v6 SPA',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/version', (req, res) => {
  res.json({
    name: 'SunPower Solutions',
    version: '1.0.0',
    mode: process.env.NODE_ENV || 'production',
  });
});

// Any unmatched /api route MUST return 404 JSON, NOT index.html
app.use('/api', (req, res) => {
  res.status(404).json({
    error: 'API route not found',
    path: req.originalUrl,
  });
});

// 2. Static Build Files (Served NEXT)
// Cache immutable hashed assets for 1 year, do not cache index.html
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

// 3. SPA Fallback (Returns index.html for all client-side routes)
app.use((req, res) => {
  // Guard against any remaining /api requests
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
  console.log(`SunPower Solutions SPA Server listening on http://localhost:${PORT}`);
  console.log(`Serving static bundle from: ${DIST_DIR}`);
});
