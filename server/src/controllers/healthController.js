/**
 * Health Controller
 * Provides health-check status for the Vallabh Clinic API.
 */

export const getHealthStatus = (req, res) => {
  const uptimeSeconds = process.uptime();
  
  res.status(200).json({
    status: 'ok',
    service: 'Vallabh Clinic API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(uptimeSeconds)}s`,
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: 'standby',
      target: 'MongoDB Atlas',
      note: 'Database connection scheduled for next milestone'
    }
  });
};
