# nocturne handoff

## current state - 2026-10-03

version 1.1.0 published publicly at https://github.com/adorablewhale/nocturne/releases/tag/v1.1.0 (release commit 90b9e51). owner authorized public release after live checks, superseding the original private-only request. GitHub: adorablewhale/nocturne; only adorablewhale has collaborator access. real hub folder: other/nocturne.

main is installed and enabled in the owner's Equicord; companion installed and off. default wallpaper/blur are off. no account, security/privacy, plugin, autoplay or hardware-acceleration settings were changed. no messages, reactions or calls sent.

self-contained native Discord palette bridge and focused overrides: black/violet/ice, Geist/Geist Mono embedded, selected-channel edge, filled composer, soft borders/shadows and crescent home icon. no ClearVision runtime imports; Apache upstream notice retained. normal mode preserves hover feel when reduced motion is off.

## critical fix

1.0.0 reduced-motion rules used .01ms animation durations. live toggling/reloads caused high CPU and allocation growth with DevTools closed. replacing only those rules with animation:none / transition:none stopped the reproduced spike without removing the complete original theme. both the Discord class and OS preference are covered by tests. never restore tiny duration workarounds.

1.1.0 removes the runtime engine without discarding the original look. comparison against the published 1.0.0 preview found the composer's filled background and title spacing missing; both restored. also fixed the crescent leaking onto letter-only guilds, native floating-surface transparency and picker backgrounds. the README labels synthetic banner/welcome content accurately.

## customization / low power

customize.html is an offline, self-contained generator; tools/customizer.template.html is its source, tools/build-customizer.cjs embeds the current CSS and synthetic preview. local images stay in-browser, fit 1920 x 1080, become a static WebP; source limit 20 MB. URL images load directly from their host and bypass resize/conversion. colors, dimming, position and optional 4px/8px background-only blur. default blur off. export replaces nocturne.theme.css. customized button ink is automatic. no customizer javascript is installed into Discord.

companion uses system fonts and opaque surfaces, disables wallpaper/filter/overscan, glow and CSS motion. important overrides survive either order and preserve selection/focus. cached fonts/images and animated media remain outside CSS reclamation.

## verification

- live: Friends, settings/theme cards and toggling; forum/code/mentions/reactions/member list; ordinary announcement messages and embeds; spoiler masking; pinned messages; server/message menus; search suggestions; two member popouts/full profile; emoji, sticker and GIF tabs; exported wallpaper with 8px blur. normal restored after tests.
- Chrome: dark/light palette, font loading, selection, primary-button ink, focus, 960px preview, reduced-motion reload/pseudo rules, local file customizer with network blocked, image resizing, wallpaper/blur/export, invalid URL rejection, reset, narrow layout, low-power restoration and both stylesheet orders. final checks passed.
- screenshots are synthetic only. ignored .qa contains diagnostics; never publish live screenshots/settings/messages or the test wallpaper preset.
- PERFORMANCE.md contains actual all-process Windows private-allocation/CPU samples and limits. fixed-theme settings mean about 914 MiB versus off about 905 MiB; broken toggle reached 2679 MiB. 1.1.0 initial guild reload about 919 MiB. warm low power did not demonstrate extra RAM reduction; images/fonts/DevTools were already cached. no FPS/GPU benchmark or universal savings claim.

## maintain / open

npm install, npm run build, npm test; Google Chrome or THEME_BROWSER_PATH required. public playwright 1.62.1 verified. rebuild after either CSS or preview/template changes; the export test rejects stale embedded main CSS.

Discord selectors can drift. live light mode, calls/screen sharing, every premium/custom profile, every plugin combination and long sessions are not exhaustive. the local customizer does not persist presets; keep customized CSS when updating the default theme.

## log

- 2026-10-03: created 1.0.0 as an owner-only private theme, normal plus companion, published at 13f5d11.
- 2026-10-03: fixed the live reduced-motion reload bug; independently themed native Discord, added offline customization and optional single-background blur, audited live surfaces and measured process counters. restored missing finish against the published preview. owner then authorized release for other users after verification; prepared 1.1.0, updated public README/credit/measurement docs and release assets.
- 2026-10-03: released public 1.1.0 at 90b9e51 with main CSS, companion, offline customizer and portable zip. installed files match the release; main alone enabled, wallpaper/blur off. only owner collaborator. refreshed the master graph after publication and handoff updates.
