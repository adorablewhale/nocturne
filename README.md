# nocturne

black glass, soft violet, icy blue. my personal theme for equicord, built from the ClearVision v7 template.

![normal mode preview](preview.png)

this is a sample layout rendered with the real theme css, not a screenshot of my Discord. the example messages, server banner and welcome text are preview content.

## install

1. download `nocturne.theme.css` and `nocturne-low-power.theme.css` from this private repo while signed in.
2. in Discord, open settings → equicord → themes → open themes folder. copy both files into that folder.
3. enable **nocturne**. disable the original ClearVision template and other full themes.
4. use Discord's dark or onyx appearance for the intended look.

the main theme uses ClearVision's [official main and Vencord styles](https://github.com/ClearVision/ClearVision-v7/blob/master/ClearVision-v7-Vencord.css), so those two imports need internet access. the fonts and home icon are embedded; no additional asset files are needed. a private GitHub raw link will not work as an anonymous online theme url. install the local files instead.

## low power

leave **nocturne** enabled and turn on **nocturne low power** in the same themes list. turn the companion off to return to the normal look. it works regardless of the order Equicord loads the two files.

| | normal | low power |
|---|---|---|
| palette and selected-channel edge | violet / ice / black | same |
| typography | embedded Geist + Geist Mono | built-in / system fonts |
| surfaces | static gradients, translucent black | opaque black |
| motion | short hover transitions | no css transitions or animations |
| depth | small static shadows | flat panels, no decorative glow |
| backdrop / profile filters | none | none |

![low power preview](low-power-preview.png)

both modes keep mentions, statuses, buttons and keyboard focus readable. low power also stops Discord's css animations; loading and status indicators remain visible but may be static. it does not stop GIFs, videos, animated avatars, plugin timers or background Discord processes. already-loaded fonts may remain cached until Discord restarts.

## performance

normal mode keeps its visual style while avoiding the template's external wallpaper, full-window filter and overly broad avatar/member transitions. it uses static gradients, no theme scripts, no animated background, no blur and no forced compositor layers. the only network dependencies are the two small ClearVision css imports.

the template's `sapphire.jpg` is 1920 × 1080, about 1.97 MB compressed and 7.91 MiB as one decoded RGBA buffer. nocturne does not load that image. this removes that asset cost, but **7.91 MiB is a buffer-size estimate, not a measured reduction in Discord's process memory**. browsers still need to rasterize the screen, and Discord accounts for most of the app's memory use. no total RAM or FPS improvement has been measured in a live Equicord session.

for a fair live comparison, use the same channel and window size, wait for loading to settle, and compare all Discord processes with the theme disabled, normal mode and low power. restart between font-mode comparisons if checking memory. Discord's accessibility settings for autoplay GIFs and animated emoji can further reduce media work independently of this theme.

## customize / maintain

edit the controls near the top of `nocturne.theme.css`: `--main-color`, `--hover-color`, `--aw-ice`, `--aw-accent-rgb`, `--aw-radius` and `--aw-speed`. if changing violet, update `--aw-accent-rgb` too. do not add another wallpaper or blur if keeping this lightweight matters.

open `preview.html` in a browser to try the appearance and low-power buttons. its javascript is only for the local preview; Equicord receives the two css files. `preview.png` and `low-power-preview.png` are documentation and are never loaded by the theme.

Discord can change class names. the overrides currently use selectors from the official ClearVision v7 stylesheet. browser verification covered dark/light appearance, fonts, mentions, primary button contrast colors, focus, compact layout, reduced motion, low-power toggling and either load order. this does not replace a live Equicord visual check.

## files

- `nocturne.theme.css`: main theme, including two licensed embedded fonts.
- `nocturne-low-power.theme.css`: optional companion switch, with no imports.
- `preview.html`: sample interface and visual controls.
- `HANDOFF.md`: current state and remaining verification.
- `LICENSE-ClearVision`, `LICENSE-Geist`: upstream license texts.

this repo stays private. ClearVision Team owns the upstream base ([Apache-2.0](https://github.com/ClearVision/ClearVision-v7/blob/master/LICENSE)); Geist is by the Geist Project Authors under the SIL Open Font License 1.1. the personal palette and overrides are by adorablewhale.
