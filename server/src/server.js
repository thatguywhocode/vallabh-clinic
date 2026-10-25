import app from './app.js';
import { config } from './config/env.js';

const PORT = config.port;

const HOST = '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log('='.repeat(50));
  console.log(`🌿 VALLABH CLINIC API SERVER STARTED`);
  console.log(`🚀 Address:     http://localhost:${PORT}`);
  console.log(`🌐 Mode:        ${config.nodeEnv}`);
  console.log(`🏥 Healthcheck: http://localhost:${PORT}/api/health`);
  console.log(`🌿 Client URL:  ${config.clientUrl}`);
  console.log('='.repeat(50));
});

export default server;
