// Offline customization/export checks. All content and images are synthetic.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
(async () => {
  const browser = await chromium.launch(process.env.THEME_BROWSER_PATH
    ? { executablePath: process.env.THEME_BROWSER_PATH, headless: true }
    : { channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
    const errors = [], network = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.route(/^https?:/, route => { network.push(route.request().url()); return route.abort(); });
    await page.goto(pathToFileURL(path.join(root, 'customize.html')).href);
    const preview = page.frames().find(frame => frame !== page.mainFrame());
    await preview.waitForFunction(() => document.querySelector('#custom-preset'));
    const read = () => preview.locator('.bg__960e4').evaluate(el => {
      const cs = getComputedStyle(el), vars = getComputedStyle(document.documentElement);
      return { image: cs.backgroundImage, filter: cs.filter, inset: cs.top,
        position: cs.backgroundPosition, size: cs.backgroundSize,
        hover: vars.getPropertyValue('--hover-color').trim(),
        font: getComputedStyle(document.querySelector('.demo-message p')).fontFamily };
    });
    let initial = await read();
    assert.equal(initial.filter, 'none');
    assert(!initial.image.includes('url('));
    assert.equal(initial.hover, '#c9baff');
    assert(initial.font.includes('Geist'));
    assert(initial.image.includes('radial-gradient'));
    const downloadTheme = async () => {
      const download = page.waitForEvent('download');
      await page.locator('#download').click();
      const result = await download;
      assert.equal(result.suggestedFilename(), 'nocturne.theme.css');
      return fs.readFileSync(await result.path(), 'utf8');
    };
    const defaultExport = await downloadTheme();
    assert(!(defaultExport).includes('@import'));
    assert(defaultExport.startsWith(fs.readFileSync(path.join(root, 'nocturne.theme.css'), 'utf8')));
    // Oversized input must become a static WebP within the export's bounds.
    const image = await page.evaluate(() => {
      const canvas = document.createElement('canvas'); canvas.width = 3000; canvas.height = 2000;
      const ctx = canvas.getContext('2d'); ctx.fillStyle = '#29384f'; ctx.fillRect(0, 0, 3000, 2000);
      ctx.fillStyle = '#b6a2ff'; ctx.fillRect(100, 200, 1000, 1200);
      return canvas.toDataURL('image/png').split(',')[1];
    });
    await page.locator('#local-image').setInputFiles({ name: 'sample.png', mimeType: 'image/png', buffer: Buffer.from(image, 'base64') });
    await page.waitForFunction(() => document.querySelector('#notice').textContent.includes('1620 × 1080'));
    await preview.waitForFunction(() => getComputedStyle(document.querySelector('.bg__960e4')).backgroundImage.includes('data:image/webp'));
    await page.locator('#blur').selectOption('8');
    await page.locator('#position').selectOption('right center');
    await preview.waitForFunction(() => getComputedStyle(document.querySelector('.bg__960e4')).filter === 'blur(8px)');
    const wallpaper = await read();
    assert.equal(wallpaper.inset, '-24px');
    assert(wallpaper.position.split(', ').every(value => value === '100% 50%'));
    assert(wallpaper.size.split(', ').every(value => value === 'cover'));
    const exported = await downloadTheme();
    if(process.env.QA_EXPORT_PATH) fs.writeFileSync(process.env.QA_EXPORT_PATH, exported);
    assert(exported.includes('--aw-wallpaper-filter: blur(8px)'));
    assert(exported.includes('data:image/webp;base64,'));
    // Both load orders must cancel the customized wallpaper and filter.
    const check = await browser.newPage();
    for (const reversed of [false, true]) {
      const low = fs.readFileSync(path.join(root, 'nocturne-low-power.theme.css'), 'utf8');
      await check.setContent('<html class="theme-dark"><div class="bg__960e4"></div><p>sample</p></html>');
      for (const css of reversed ? [low, exported] : [exported, low]) await check.addStyleTag({ content: css });
      const result = await check.locator('.bg__960e4').evaluate(el => ({ image: getComputedStyle(el).backgroundImage, filter: getComputedStyle(el).filter }));
      assert.deepEqual(result, { image: 'none', filter: 'none' });
    }
    await page.locator('#low-preview').check();
    await preview.waitForFunction(() => getComputedStyle(document.querySelector('.bg__960e4')).backgroundImage === 'none');
    assert.equal((await read()).filter, 'none');
    assert(!(await read()).font.includes('Geist'));
    await page.locator('#low-preview').uncheck();
    await preview.waitForFunction(() => getComputedStyle(document.querySelector('.bg__960e4')).filter === 'blur(8px)');
    assert((await read()).font.includes('Geist'));
    await page.locator('#wallpaper-url').fill('javascript:alert(1)');
    await page.locator('#wallpaper-url').dispatchEvent('change');
    assert(await page.locator('#notice').evaluate(el => el.classList.contains('error')));
    assert(!(await downloadTheme()).includes('javascript:alert'));
    await page.locator('#accent').fill('#203060');
    await page.locator('#accent').dispatchEvent('input');
    await preview.waitForFunction(() => getComputedStyle(document.querySelector('.colorBrand__201d5')).color === 'rgb(255, 255, 255)');
    await page.locator('#reset').click();
    await preview.waitForFunction(() => !getComputedStyle(document.querySelector('.bg__960e4')).backgroundImage.includes('url('));
    assert.equal((await read()).filter, 'none');
    await page.setViewportSize({ width: 600, height: 900 });
    assert(await page.locator('#download').isVisible());
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.deepEqual(errors, []);
    assert.deepEqual(network, []);
    console.log('passed: offline file, image resizing, wallpaper/blur, export, URL rejection, low power in either order, reset and narrow layout');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
