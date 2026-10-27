import { preview } from 'vite';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const outDir = path.resolve(__dirname, '../../../docs/screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const artifactDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\41b94554-8b80-47cc-bcbd-b5475168d2c1';

async function run() {
  console.log('Starting preview server on port 4174...');
  const previewServer = await preview({
    root: path.resolve(__dirname, '../../'),
    configFile: path.resolve(__dirname, '../../vite.config.js'),
    preview: { port: 4174, host: '127.0.0.1' }
  });

  const baseUrl = 'http://127.0.0.1:4174';

  const targets = [
    {
      name: 'hero-redesign-desktop.png',
      width: 1440,
      height: 960,
      url: `${baseUrl}/?intro=false`,
      budget: 8000,
    },
    {
      name: 'hero-redesign-mobile.png',
      width: 390,
      height: 844,
      url: `${baseUrl}/?intro=false`,
      budget: 8000,
    }
  ];

  for (const t of targets) {
    const outFile = path.join(outDir, t.name);
    console.log(`Capturing ${t.name} (${t.width}x${t.height})...`);

    await new Promise((resolve) => {
      const proc = spawn(chromePath, [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--run-all-compositor-stages-before-draw',
        `--virtual-time-budget=${t.budget}`,
        `--window-size=${t.width},${t.height}`,
        `--screenshot=${outFile}`,
        t.url
      ]);

      proc.on('close', (code) => {
        if (fs.existsSync(outFile)) {
          const stats = fs.statSync(outFile);
          console.log(`  ✓ Saved: ${outFile} (${stats.size} bytes)`);
          try {
            const artifactFile = path.join(artifactDir, t.name);
            fs.copyFileSync(outFile, artifactFile);
            console.log(`  ✓ Copied to artifact: ${artifactFile}`);
          } catch (e) {
            console.warn(`  ! Could not copy to artifact:`, e.message);
          }
        } else {
          console.error(`  ✗ Failed to capture ${t.name} (exit code ${code})`);
        }
        resolve();
      });
    });
  }

  previewServer.httpServer.close();
  console.log('Finished capturing hero screenshots.');
}

run();
