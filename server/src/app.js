import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { config } from './config/env.js';
import apiRoutes from './routes/index.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../client/dist');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cors({
  origin: config.clientUrl || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRoutes);

// In production or when client build exists, serve static client files
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  // Fallback root route for API-only operation
  app.get('/', (req, res) => {
    res.json({
      name: 'Vallabh Clinic API',
      description: 'Backend services for Vallabh Clinic',
      healthCheck: '/api/health',
      version: '1.0.0'
    });
  });

  // 404 & Centralized Error Handlers
  app.use(notFoundHandler);
}

app.use(errorHandler);

export default app;
