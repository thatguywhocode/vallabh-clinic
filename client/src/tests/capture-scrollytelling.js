import { preview } from 'vite';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const outDir = path.resolve(__dirname, '../../../docs/screenshots');
const artifactDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\41b94554-8b80-47cc-bcbd-b5475168d2c1';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

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
      name: 'hero-cinematic-video-desktop.png',
      width: 1440,
      height: 960,
      url: `${baseUrl}/?intro=false`,
      budget: 6000,
    },
    {
      name: 'hero-cinematic-video-mobile.png',
      width: 390,
      height: 844,
      url: `${baseUrl}/?intro=false`,
      budget: 6000,
    },
    {
      name: 'scrollytelling-chapter-1.png',
      width: 1440,
      height: 900,
      url: `${baseUrl}/?intro=false&preview_scrolly=true&preview_chapter=1`,
      budget: 6000,
    },
    {
      name: 'scrollytelling-chapter-2.png',
      width: 1440,
      height: 900,
      url: `${baseUrl}/?intro=false&preview_scrolly=true&preview_chapter=2`,
      budget: 6000,
    },
    {
      name: 'scrollytelling-chapter-3.png',
      width: 1440,
      height: 900,
      url: `${baseUrl}/?intro=false&preview_scrolly=true&preview_chapter=3`,
      budget: 6000,
    },
    {
      name: 'scrollytelling-mobile.png',
      width: 390,
      height: 844,
      url: `${baseUrl}/?intro=false&preview_scrolly=true&preview_chapter=1`,
      budget: 6000,
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

      proc.on('close', () => {
        if (fs.existsSync(outFile)) {
          const stats = fs.statSync(outFile);
          console.log(`  ✓ Saved: ${t.name} (${stats.size} bytes)`);
          try {
            fs.copyFileSync(outFile, path.join(artifactDir, t.name));
          } catch (e) {
            console.warn('  ! Could not copy to artifact:', e.message);
          }
        } else {
          console.error(`  ✗ Failed: ${t.name}`);
        }
        resolve();
      });
    });
  }

  previewServer.httpServer.close();
  console.log('All scrollytelling captures finished.');
}

run();
