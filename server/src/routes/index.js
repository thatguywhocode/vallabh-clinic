import express from 'express';
import healthRoutes from './healthRoutes.js';

const router = express.Router();

// Mount health routes at /api/health
router.use('/health', healthRoutes);

export default router;
