import puppeteer from 'puppeteer';
import { PDFDocument } from 'pdf-lib';
import { readdir, readFile, writeFile, unlink } from 'fs/promises';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';

const dir = fileURLToPath(new URL('.', import.meta.url));

// Collect slide files sorted numerically
const files = (await readdir(dir))
  .filter(f => /^slide-\d+\.html$/.test(f))
  .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));

console.log(`Found ${files.length} slides`);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

// Slide dimensions: 720pt x 405pt (16:9) → convert to inches (1in = 72pt)
const widthIn = 720 / 72; // 10in
const heightIn = 405 / 72; // 5.625in
const widthPx = Math.round(widthIn * 96);  // 960px
const heightPx = Math.round(heightIn * 96); // 540px

await page.setViewport({ width: widthPx, height: heightPx });

const tempPdfs = [];

for (const file of files) {
  const filePath = resolve(dir, file);
  const url = `file://${filePath}`;
  console.log(`  Converting ${file}...`);

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
  // Wait a bit for fonts to load
  await page.waitForFunction(() => document.fonts.ready);

  const pdfPath = join(dir, file.replace('.html', '.pdf'));
  await page.pdf({
    path: pdfPath,
    width: `${widthIn}in`,
    height: `${heightIn}in`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  tempPdfs.push(pdfPath);
}

await browser.close();

// Merge all PDFs into one
console.log('Merging into single PDF...');
const merged = await PDFDocument.create();

for (const pdfPath of tempPdfs) {
  const bytes = await readFile(pdfPath);
  const doc = await PDFDocument.load(bytes);
  const [copiedPage] = await merged.copyPages(doc, [0]);
  merged.addPage(copiedPage);
}

const outputPath = join(dir, 'claude-seminar.pdf');
await writeFile(outputPath, await merged.save());

// Clean up temp PDFs
for (const pdfPath of tempPdfs) {
  await unlink(pdfPath);
}

console.log(`\nDone! → ${outputPath}`);
