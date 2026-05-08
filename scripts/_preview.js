// Generate previews of every page (desktop + mobile)
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'previews');
fs.mkdirSync(OUT, { recursive: true });

const PAGES = [
  { name: '01-accueil',      url: 'http://127.0.0.1:8765/index.html' },
  { name: '02-a-propos',     url: 'http://127.0.0.1:8765/a-propos.html' },
  { name: '03-services',     url: 'http://127.0.0.1:8765/services.html' },
  { name: '04-approche',     url: 'http://127.0.0.1:8765/approche.html' },
  { name: '05-temoignages',  url: 'http://127.0.0.1:8765/temoignages.html' },
  { name: '06-contact',      url: 'http://127.0.0.1:8765/contact.html' },
];

(async () => {
  const browser = await chromium.launch();

  // Desktop full-page
  const ctxD = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });
  for (const p of PAGES) {
    const page = await ctxD.newPage();
    await page.goto(p.url, { waitUntil: 'networkidle' });
    // give fonts + reveal animations a moment
    await page.waitForTimeout(900);
    // Force-show all .reveal so screenshots aren't blank
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('in')));
    await page.waitForTimeout(200);
    await page.screenshot({
      path: path.join(OUT, `${p.name}-desktop.png`),
      fullPage: true,
    });
    // also a hero-only screenshot (above the fold)
    await page.screenshot({
      path: path.join(OUT, `${p.name}-desktop-fold.png`),
      fullPage: false,
    });
    await page.close();
    console.log('OK desktop', p.name);
  }
  await ctxD.close();

  // Mobile
  const ctxM = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });
  for (const p of PAGES) {
    const page = await ctxM.newPage();
    await page.goto(p.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('in')));
    await page.waitForTimeout(200);
    await page.screenshot({
      path: path.join(OUT, `${p.name}-mobile.png`),
      fullPage: false,
    });
    await page.close();
    console.log('OK mobile', p.name);
  }
  await ctxM.close();

  await browser.close();
  console.log('Done. Output:', OUT);
})();
