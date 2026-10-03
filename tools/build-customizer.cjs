const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const main = read('nocturne.theme.css');
const low = read('nocturne-low-power.theme.css');
let preview = read('preview.html')
  .replace('<link rel="stylesheet" href="nocturne.theme.css">', `<style>${main}</style>`)
  .replace('<link id="low-power" rel="stylesheet" href="nocturne-low-power.theme.css" disabled>', `<style id="low-power">${low}</style>`);
preview = preview.replace('</html>', `<style>.demo-controls {display:none}</style>
<script>
addEventListener('message', e => {
  if(e.source !== parent || e.data?.type !== 'nocturne-preview') return;
  let custom = document.querySelector('#custom-preset');
  if(!custom) {custom=document.createElement('style');custom.id='custom-preset';document.head.append(custom)}
  custom.textContent=e.data.css;
  powerSheet.disabled=!e.data.low;
});
parent.postMessage({type:'nocturne-ready'}, '*');
</script></html>`);
const literal = value => JSON.stringify(value).replace(/</g, '\\u003c');
const bundle = `const themeBase=${literal(main)}, lowBase=${literal(low)}, previewSource=${literal(preview)};`;
const html = read('tools/customizer.template.html').replace('/*__BUNDLE__*/', bundle);
fs.writeFileSync(path.join(root, 'customize.html'), html.replace(/\r?\n/g, '\r\n'));
console.log('built customize.html with the current theme, companion and synthetic preview');
