# nocturne handoff

## current state · 2026-10-03

version 1.0.0. private personal Equicord theme at `adorablewhale/nocturne`; real hub folder `other/nocturne`.

normal mode: ClearVision main + Vencord imports, black panels, violet / ice accents, static gradients, embedded Geist and Geist Mono, inline crescent icon. the owner's supplied BetterDiscord template was rewritten with attribution retained. no external wallpaper, backdrop filters, theme scripts or perpetual decorative animation; inherited avatar/member transitions are constrained. normal hover feel and visual depth are preserved.

low mode: enable `nocturne-low-power.theme.css` alongside the main file. system fonts, opaque surfaces, no css animation/transitions or surface shadows/blur; same palette, selection edge and readable focus. important overrides make file ordering irrelevant. no global media/spoiler filter removal. cached fonts and animated media can still use memory.

## verification

- headless Chrome rendered the sample preview using locally cached official ClearVision css (860 main rules + 19 Vencord add-on rules).
- checked dark/light colors, embedded font loading, channel selection, mentions, primary-button text colors, input focus and a 960px compact layout.
- checked reduced motion; low-power toggle restores normal styling, retains selection/readability, removes transitions/shadows/background gradients, uses system fonts and survives reversed stylesheet order.
- visually inspected normal, light and low-power previews. local repeatable checks and upstream downloads are in ignored `.qa/`; shipped previews contain only sample data.
- original `sapphire.jpg`: 1920×1080, 1,967,225 bytes compressed; 8,294,400 bytes / 7.91 MiB for a decoded RGBA buffer. asset avoided, not a live process-memory benchmark.

## open

- live Equicord installation, real popouts/settings and plugins have not been checked. install both local css files from the theme settings; the private repo cannot serve an anonymous raw theme url.
- total Discord RAM / GPU / CPU / FPS improvements are unmeasured. compare identical client state with theme off, normal and low power; restart for font comparisons.
- upstream ClearVision imports can change. if Discord selectors drift, inspect the current official stylesheet before editing overrides.

## log

- **2026-10-03:** created nocturne 1.0.0 from the owner's template, with a normal-mode optimization pass and optional low-power companion. browser preview checks passed; private GitHub publication and hub graph registration are part of the initial setup.
