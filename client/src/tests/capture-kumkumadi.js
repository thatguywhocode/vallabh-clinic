import { preview } from 'vite';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve(__dirname, '../../../docs/screenshots');

async function run() {
  const previewServer = await preview({
    root: path.resolve(__dirname, '../../'),
    configFile: path.resolve(__dirname, '../../vite.config.js'),
    preview: { port: 4174, host: '127.0.0.1' }
  });

  const baseUrl = 'http://127.0.0.1:4174';
  const outFile = path.join(outDir, 'product-detail-kumkumadi.png');
  console.log('Capturing Kumkumadi Face Oil detail page...');

  await new Promise((resolve) => {
    const proc = spawn(chromePath, [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=4000',
      '--window-size=1280,1000',
      `--screenshot=${outFile}`,
      `${baseUrl}/products/vc-prod-004`
    ]);
    proc.on('close', resolve);
  });

  previewServer.httpServer.close();
  console.log('Kumkumadi screenshot saved successfully.');
}

run();
