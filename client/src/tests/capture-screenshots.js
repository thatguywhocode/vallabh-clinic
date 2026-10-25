import { preview } from 'vite';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chromePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const outDir = path.resolve(__dirname, '../../../docs/screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log('Starting Vite preview server from client/dist...');
  
  const previewServer = await preview({
    root: path.resolve(__dirname, '../../'),
    configFile: path.resolve(__dirname, '../../vite.config.js'),
    preview: {
      port: 4173,
      host: '127.0.0.1'
    }
  });

  const baseUrl = 'http://127.0.0.1:4173';
  console.log('Preview server running at', baseUrl);

  const targets = [
    { name: 'brand-intro-cinematic.png', path: '/', budget: 1200 },
    { name: 'homepage-rotating-showcase.png', path: '/', budget: 4500 },
    { name: 'shop-catalog.png', path: '/products', budget: 4500 },
    { name: 'product-detail-triphala.png', path: '/products/vc-prod-001', budget: 4000 },
    { name: 'patient-dashboard.png', path: '/patient/dashboard', budget: 4000 },
    { name: 'doctor-dashboard.png', path: '/doctor/dashboard', budget: 4000 },
    { name: 'admin-dashboard.png', path: '/admin/dashboard', budget: 4000 },
  ];

  for (const t of targets) {
    const fullUrl = `${baseUrl}${t.path}`;
    const outFile = path.join(outDir, t.name);
    console.log(`Capturing ${fullUrl} (budget: ${t.budget}ms) -> ${t.name}...`);

    await new Promise((resolve) => {
      const proc = spawn(chromePath, [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--run-all-compositor-stages-before-draw',
        `--virtual-time-budget=${t.budget || 4000}`,
        '--window-size=1280,1000',
        `--screenshot=${outFile}`,
        fullUrl
      ]);

      proc.on('close', (code) => {
        if (fs.existsSync(outFile)) {
          const stats = fs.statSync(outFile);
          console.log(`  ✓ Screenshot saved: ${outFile} (${stats.size} bytes)`);
        } else {
          console.error(`  ✗ Failed to capture ${t.name} (code ${code})`);
        }
        resolve();
      });
    });
  }

  // Also capture the SVG directly as an image render
  const svgUrl = `${baseUrl}/products/triphala-cleanse.svg`;
  const svgOutFile = path.join(outDir, 'svg-direct-render.png');
  console.log(`Capturing direct SVG render ${svgUrl} -> svg-direct-render.png...`);
  await new Promise((resolve) => {
    const proc = spawn(chromePath, [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--window-size=800,800',
      `--screenshot=${svgOutFile}`,
      svgUrl
    ]);
    proc.on('close', () => {
      if (fs.existsSync(svgOutFile)) {
        const stats = fs.statSync(svgOutFile);
        console.log(`  ✓ Direct SVG render saved: ${svgOutFile} (${stats.size} bytes)`);
      }
      resolve();
    });
  });

  previewServer.httpServer.close();
  console.log('Preview server closed.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
