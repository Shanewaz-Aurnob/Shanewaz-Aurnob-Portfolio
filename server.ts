/**
 * Express Server - handles API routes for portfolio
 * 
 * Run with: npm run server
 * Or: node --loader tsx server.ts (in development)
 * 
 * Routes:
 *   - POST /api/scholar-citations - Fetch Google Scholar citations
 *   - GET  /api/health - Health check
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import API routes
import apiRoutes from './src/api/routes';

const app = express();
const PORT = process.env.API_PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

/**
 * Request logging middleware
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });

  next();
});

/**
 * Health check endpoint
 */
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok',
    name: 'Shanewaz Aurnob Portfolio API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

/**
 * Mount API routes
 */
app.use('/api', apiRoutes);

/**
 * 404 handler
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method,
  });
});

/**
 * Error handler
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Unknown error',
  });
});

/**
 * Start server
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`🚀 Portfolio API Server running on http://localhost:${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 CORS enabled for: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
  });
}

export default app;
