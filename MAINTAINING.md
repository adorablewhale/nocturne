# nocturne maintenance

black glass, soft violet, icy blue. my personal equicord theme.

![normal mode](preview.png)

version 1.1.0 runs on Discord's own interface styles. no ClearVision imports, remote fonts, theme scripts or image downloads by default. Geist and Geist Mono are embedded. the owner authorized public release after verification; only adorablewhale has collaborator access.

the previews use sample messages and a sample server. no real Discord conversations or profile screenshots are included.

## install

1. download `nocturne.theme.css` and `nocturne-low-power.theme.css` from the latest release.
2. open Discord settings > equicord > themes > open themes folder. copy both files there.
3. enable **nocturne** and disable other full themes, including the original ClearVision template.
4. use dark or onyx appearance. keep the low-power companion off for the normal look.

local files work offline and support custom presets. replacing the local main file applies the update through Equicord's theme watcher. the public raw main URL supports online default-theme updates.

## make it yours

download and open **[customize.html](customize.html)** in Chrome or another Chromium browser. it is a self-contained local file with a sample preview:

- accent and secondary colors, matching hover color and automatic primary-button ink.
- your own wallpaper, darkness and positioning.
- optional background-only blur: off, 4px or 8px.
- low-power preview and separate main/companion downloads.

choose a local image for an offline setup. it stays in your browser, is resized to at most 1920 x 1080 without upscaling, and is embedded as a static WebP. animated inputs become a still frame. no upload or theme script is added to Discord. source files over 20 MB are rejected.

an image URL is also supported; Discord then loads it directly from that host. use a static image. remote images do not receive local resizing or conversion, so huge or animated URLs can cost much more memory.

download your theme, then replace `nocturne.theme.css` in Equicord's themes folder. the original name updates your existing toggle. keep a copy of your customized CSS: a later default-theme update replaces that preset. **reset to nocturne** clears the wallpaper and restores the colors. the tool does not save images in browser storage.

wallpaper and blur are off by default. blur only filters the background; text, media and panels stay sharp. it costs extra GPU work, especially while resizing. start with a local image and blur off. lighter accents work best against black panels.

## low power

leave **nocturne** on and enable **nocturne low power** in the themes list. switch the companion off to restore your normal or customized look. either stylesheet order works.

| | normal | low power |
|---|---|---|
| palette / selection edge | violet, ice, black | retained |
| fonts | Geist / Geist Mono | system fonts |
| surfaces | static gradients / translucent black | opaque black |
| motion / decorative glow | short hovers / small shadows | disabled |
| custom wallpaper / blur | optional, default off | disabled |

![low power](low-power-preview.png)

low power stops CSS animations, including loading animations; indicators remain visible but can be static. it does not stop GIFs, videos, animated avatars, plugin timers or background Discord processes. already-loaded images and fonts may stay cached until a restart. it is a rendering option, not a guaranteed RAM cap.

## performance

the severe reload lag in 1.0.0 came from reduced-motion rules using `.01ms` animation durations. Discord's reduced-motion class and the Windows preference now stop animation and transitions with `none`. normal hover styling remains available when reduced motion is off.

normal keeps the black/violet/ice look and fonts, without continuous decorative animations, panel backdrop blur or forced compositor layers. the upstream runtime engine and its network dependency are removed. see **[PERFORMANCE.md](PERFORMANCE.md)** for actual process measurements, the live audit and limits.

## maintain

requires Node.js and Google Chrome:

```sh
npm install
npm run build
npm test
```

`THEME_BROWSER_PATH` selects another Chromium executable. tests use synthetic content, run the customizer directly from a local file, block network requests, and verify motion, image conversion/export, blur, reset, invalid URLs, narrow layout and low power in either order. development tools never run inside Discord.

edit `nocturne.theme.css` and `tools/customizer.template.html`; run the build after changes. `customize.html` embeds the current main theme, companion and preview. `preview.html` has light/dark and low-power switches. Discord can change class names; check current live controls before updating selectors.

## files and credit

- main and low-power CSS: the only installed files.
- `customize.html`: ready-to-open offline customizer.
- `tools/`, `tests/`: generator source and regressions.
- `preview.html`, preview PNGs: synthetic documentation.
- `PERFORMANCE.md`, `HANDOFF.md`: measurements and maintenance state.
- `LICENSE-ClearVision`, `LICENSE-Geist`: retained license texts.

the original template and some selectors/derived styling came from ClearVision Team under Apache-2.0. attribution remains even though its runtime engine is no longer loaded. Geist is by the Geist Project Authors under SIL Open Font License 1.1. the theme and customizer are by adorablewhale. author credit does not grant repository access.

## compact proportions

1.1.1 moves the compact preview styling into the actual theme. root controls `--aw-sidebar-width`, `--aw-message-size`, `--aw-channel-size` and `--aw-member-size` adjust the proportions. the body `--custom-guild-sidebar-width` rule overrides the saved sidebar width while enabled; remove that marked rule if you prefer Discord's native resizing. theme removal restores the saved width. role colors and custom profile banners remain Discord content.
