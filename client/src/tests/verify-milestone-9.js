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

// Helper to launch a headless Chrome instance and capture screenshot
function capture(url, outFile, { width = 1280, height = 1000, budget = 3500 } = {}) {
  return new Promise((resolve) => {
    const proc = spawn(chromePath, [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--run-all-compositor-stages-before-draw',
      `--virtual-time-budget=${budget}`,
      `--window-size=${width},${height}`,
      `--screenshot=${outFile}`,
      url
    ]);

    proc.on('close', (code) => {
      if (fs.existsSync(outFile)) {
        const stats = fs.statSync(outFile);
        console.log(`  ✓ Saved ${path.basename(outFile)} (${stats.size} bytes)`);
      } else {
        console.error(`  ✗ Failed ${path.basename(outFile)} (code ${code})`);
      }
      resolve();
    });
  });
}

async function run() {
  console.log('Starting Vite preview server on port 4173...');
  const previewServer = await preview({
    root: path.resolve(__dirname, '../../'),
    configFile: path.resolve(__dirname, '../../vite.config.js'),
    preview: {
      port: 4173,
      host: '127.0.0.1'
    }
  });

  const baseUrl = 'http://127.0.0.1:4173';
  console.log('Preview server ready at', baseUrl);

  // 1. Initial Load: Verify intro does NOT play automatically and combined Login/Register is present
  console.log('\n--- 1. Testing Initial Load & Navbar Alignment ---');
  await capture(`${baseUrl}/`, path.join(outDir, 'milestone-9-homepage-initial.png'), {
    budget: 2000,
    width: 1280,
    height: 1000
  });

  // 2. Mobile Navbar View: Check responsiveness & logo alignment
  console.log('\n--- 2. Testing Mobile Navbar Alignment ---');
  await capture(`${baseUrl}/`, path.join(outDir, 'milestone-9-mobile-navbar.png'), {
    budget: 2000,
    width: 390,
    height: 844
  });

  // 3. Carousel Rotation: Transition 1 (after ~4s)
  console.log('\n--- 3. Testing Auto-Rotating Hero Carousel ---');
  await capture(`${baseUrl}/`, path.join(outDir, 'milestone-9-carousel-rot1.png'), {
    budget: 4500,
    width: 1280,
    height: 1000
  });

  // 4. Carousel Rotation: Transition 2 (after ~8s)
  await capture(`${baseUrl}/`, path.join(outDir, 'milestone-9-carousel-rot2.png'), {
    budget: 8200,
    width: 1280,
    height: 1000
  });

  // 5. Product Detail Page: Scroll Position at Top
  console.log('\n--- 4. Testing Product Detail Scroll Restoration ---');
  await capture(`${baseUrl}/products/vc-prod-001`, path.join(outDir, 'milestone-9-product-detail-top.png'), {
    budget: 2500,
    width: 1280,
    height: 1000
  });

  // 6. Click Logo Trigger: Verify complete cinematic opening animation triggers on navbar logo click
  console.log('\n--- 5. Testing Click Navbar Logo to Trigger Opening Animation ---');
  await capture(`${baseUrl}/test-trigger-intro.html`, path.join(outDir, 'milestone-9-intro-on-click.png'), {
    budget: 2800,
    width: 1280,
    height: 1000
  });

  previewServer.httpServer.close();
  console.log('\nPreview server closed. Verification captures complete.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
