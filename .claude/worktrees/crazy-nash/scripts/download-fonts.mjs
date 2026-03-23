#!/usr/bin/env node
/**
 * Download Google Fonts locally for self-hosting.
 * Run: node scripts/download-fonts.mjs
 */
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = path.resolve(__dirname, '../public/fonts');

const FONTS = [
  { name: 'poppins-300-latin.woff2', url: 'https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLDz8Z1xlFQ.woff2' },
  { name: 'poppins-400-latin.woff2', url: 'https://fonts.gstatic.com/s/poppins/v24/pxiEyp8kv8JHgFVrJJfecg.woff2' },
  { name: 'poppins-500-latin.woff2', url: 'https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2' },
  { name: 'poppins-600-latin.woff2', url: 'https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2' },
  { name: 'poppins-700-latin.woff2', url: 'https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2' },
  { name: 'dancing-script-latin.woff2', url: 'https://fonts.gstatic.com/s/dancingscript/v29/If2RXTr6YS-zF4S-kcSWSVi_szLgiuE.woff2' },
];

if (!fs.existsSync(FONTS_DIR)) fs.mkdirSync(FONTS_DIR, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', e => { fs.unlinkSync(dest); reject(e); });
  });
}

console.log('Downloading fonts to', FONTS_DIR);
for (const font of FONTS) {
  const dest = path.join(FONTS_DIR, font.name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    console.log(`  ✓ ${font.name} (already exists)`);
    continue;
  }
  process.stdout.write(`  ↓ ${font.name}...`);
  await download(font.url, dest);
  const size = fs.statSync(dest).size;
  console.log(` ${(size / 1024).toFixed(1)} KB`);
}
console.log('Done! All fonts downloaded.');
