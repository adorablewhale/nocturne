// Browser regression for the live Equicord reload bug. Uses synthetic content only.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');

(async () => {
  const browser = await chromium.launch(process.env.THEME_BROWSER_PATH
    ? { executablePath: process.env.THEME_BROWSER_PATH, headless: true }
    : { channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ reducedMotion: 'no-preference' });
    // The inherited animation is the important input: never accelerate it to .01ms.
    await page.setContent(`<html class="theme-dark"><style>
      @keyframes native-spinner { to { transform: rotate(360deg); } }
      .spinner, .spinner::before, .spinner::after {
        content: ""; display: inline-block; width: 10px; height: 10px;
        animation: native-spinner 1s linear infinite; transition: opacity 180ms;
      }
    </style><div class="spinner"></div></html>`);
    const theme = fs.readFileSync(path.join(root, 'nocturne.theme.css'), 'utf8');
    // Color/layout imports are independent of this regression; no network is needed.
    await page.addStyleTag({ content: theme.replace(/@import[^;]+;/g, '') });
    const readMotion = () => page.locator('.spinner').evaluate(el =>
      [null, '::before', '::after'].map(pseudo => {
        const style = getComputedStyle(el, pseudo);
        return { name: style.animationName, transition: style.transitionDuration };
      }));
    assert((await readMotion()).every(s => s.name === 'native-spinner'));
    await page.evaluate(() => document.body.classList.add('reduce-motion'));
    assert((await readMotion()).every(s => s.name === 'none' && s.transition === '0s'));
    assert.equal(await page.evaluate(() => document.getAnimations().length), 0);
    // Replacing the stylesheet and toggling Discord's preference must stay safe.
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => document.querySelector('style:last-of-type').textContent += '\n/* reload */');
      assert((await readMotion()).every(s => s.name === 'none'));
    }
    await page.evaluate(() => document.body.classList.remove('reduce-motion'));
    assert((await readMotion()).every(s => s.name === 'native-spinner'));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert((await readMotion()).every(s => s.name === 'none' && s.transition === '0s'));
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.addStyleTag({ path: path.join(root, 'nocturne-low-power.theme.css') });
    assert((await readMotion()).every(s => s.name === 'none' && s.transition === '0s'));
    console.log('passed: normal motion, Discord/OS reduced motion, reloads, pseudos and low power');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
