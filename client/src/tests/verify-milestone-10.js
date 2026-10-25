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

function capture(url, outFile, { width = 1440, height = 900, budget = 3000 } = {}) {
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

  // 1. Desktop Navbar: Verify brand logo is visibly positioned ~32-40px from left viewport edge
  console.log('\n--- 1. Testing Desktop Navbar Logo Left Alignment (32-40px from edge) ---');
  await capture(`${baseUrl}/`, path.join(outDir, 'milestone-10-desktop-navbar.png'), {
    budget: 2500,
    width: 1440,
    height: 900
  });

  // 2. Scene 2: Botanical Tornado at its widest point
  console.log('\n--- 2. Testing Botanical Tornado at Widest Spiral Point ---');
  await capture(`${baseUrl}/?intro=true&scene=tornado`, path.join(outDir, 'milestone-10-tornado-widest.png'), {
    budget: 2500,
    width: 1440,
    height: 900
  });

  // 3. Scene 3: Ingredient Convergence & Leaf Emblem Transformation
  console.log('\n--- 3. Testing Botanical Ingredient Convergence ---');
  await capture(`${baseUrl}/?intro=true&scene=transform`, path.join(outDir, 'milestone-10-ingredient-convergence.png'), {
    budget: 2500,
    width: 1440,
    height: 900
  });

  // 4. Scene 4: Brand Reveal with Pure White Cormorant Garamond Typography & Vermilion Accent
  console.log('\n--- 4. Testing Brand Reveal with Pure White Typography ---');
  await capture(`${baseUrl}/?intro=true&scene=reveal`, path.join(outDir, 'milestone-10-brand-reveal.png'), {
    budget: 2500,
    width: 1440,
    height: 900
  });

  // 5. Scene 5: Seamless Homepage Portal Transition
  console.log('\n--- 5. Testing Seamless Homepage Portal Transition ---');
  await capture(`${baseUrl}/?intro=true&scene=portal`, path.join(outDir, 'milestone-10-homepage-transition.png'), {
    budget: 2500,
    width: 1440,
    height: 900
  });

  // 6. Test Trigger from Another Route (/products)
  console.log('\n--- 6. Testing Trigger Intro from Shop Route (/products) ---');
  await capture(`${baseUrl}/products`, path.join(outDir, 'milestone-10-trigger-from-shop.png'), {
    budget: 2500,
    width: 1440,
    height: 900
  });

  // 7. Test Skip Intro Button Functionality
  console.log('\n--- 7. Testing Skip Intro Button Presence ---');
  await capture(`${baseUrl}/?intro=true&scene=tornado`, path.join(outDir, 'milestone-10-skip-button.png'), {
    budget: 2500,
    width: 1440,
    height: 900
  });

  previewServer.httpServer.close();
  console.log('\nPreview server closed. Milestone 10 verification captures complete.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
