# performance notes · 2026-10-03

## fixed behavior

1.0.0 forced inherited animations to `.01ms` for reduced motion. enabling/reloading the theme produced sustained CPU and memory growth in the live client. keeping the complete theme and replacing only that block with `animation: none` / `transition: none` eliminated the reproduced spike.

1.1.0 also removes ClearVision's runtime imports. Discord supplies the layout; nocturne maps its palette onto native surface/control variables and adds focused visual rules. normal retains Geist and Geist Mono. no theme scripts, default wallpapers, panel backdrop blur, continuous decorative animations or forced compositor layers.

## process samples

Windows counters, all Discord processes, sampled about once per second with DevTools closed. window: 1892 × 1040; existing Equicord plugins retained. **private allocation in MiB is not exclusive physical RAM or GPU memory.** CPU is percent of one logical core, not whole-PC utilization. summed working sets can count shared pages twice, so they are not used for savings claims.

the controlled toggle samples used themes settings. reload/guild samples have different content and caches; compare within context. these short samples are diagnostics, not overnight averages or guarantees for other clients.

| sample | seconds | private mean MiB | range MiB | CPU / one core |
|---|---:|---:|---:|---:|
| broken 1.0.0 switched on, DevTools closed | 30 | 2029.93 | 1305.74–2678.65 | 71.89% |
| off, clean settings baseline | 20 | 919.40 | max 994.95 | 5.87% |
| complete original theme, motion fix only, reload | 30 | 821.96 | 760.06–907.66 | 1.52% |
| fixed theme off, settings | 20 | 905.47 | max 996.57 | 8.62% |
| fixed theme on, same settings | 30 | 914.19 | 884.89–988.00 | 2.25% |
| self-contained 1.1.0, initial guild reload | 20 | 919.41 | 850.52–1010.26 | 10.63% |
| wallpaper + 8px blur, guild after profile/media-picker audit | 20 | 1273.07 | 1269.76–1275.76 | 8.55% |

later warm settings samples: normal 1222.20 MiB (1217.65-1230.57, 10.68% of one core), low power 1289.27 MiB (1284.18-1305.87, 10.82%), each over 20 seconds. these do not establish a RAM reduction from toggling low power; previously loaded media, fonts and DevTools allocations remain cached. normal mode already honors the owner's reduced-motion setting.

the last table row includes cached profile and picker media; its difference from the initial reload cannot be attributed to wallpaper. the motion fix resolves the reproduced runaway behavior. stable normal mode remains close to the disabled baseline in the matched settings samples. this does not show that CSS alone can reclaim a large fraction of Discord's ordinary memory. plugins, media and the client still matter. FPS and GPU allocation were not measured.

## wallpaper and low power

wallpaper and blur are optional and default off. local images fit within 1920 × 1080 and become one static WebP. a maximum-sized decoded RGBA image is about 7.91 MiB **per buffer**; Chromium may keep extra decoded, GPU and filtered copies. that estimate is not its process cost. remote URLs may be much larger or animated.

blur is restricted to the single background layer and 4px/8px presets, with a small overscan to hide hard edges. text, media and panels remain sharp. low power cancels the wallpaper, filter and overscan in either load order, uses system fonts and removes decorative motion/shadows. toggling it does not force cached assets out of memory.

## visual and browser checks

live checks: Friends and theme settings; forum thread with code, mentions, reactions and members; two member popouts and a full profile; emoji/sticker/GIF tabs; exported local wallpaper with 8px background blur; ordinary announcement messages/embeds, spoiler masking, pinned messages, server/message menus, search suggestions and live low-power toggling. restored the filled composer and title spacing after comparing against the published preview. fixed a home crescent leaking onto letter-only guild icons and picker transparency that let chat text show through. profile banners, role colors, statuses and activity cards retain their native meaning.

browser checks: dark/light palette, embedded fonts, selection, mentions, primary-button ink, focus, 960px layout, reduced motion, wallpaper sizing/export, background blur, reset, invalid URL rejection, narrow customizer and low power in either stylesheet order. dark custom accents export white primary-button ink. the customizer works from `file://` with no server or network requests. shipped previews contain synthetic content.

not every Discord feature or plugin combination was tested. live light mode, calls, screen sharing, every premium/custom profile and long sessions remain outside the audit. no messages, reactions or calls were sent. local diagnostics and live screenshots are not published.
