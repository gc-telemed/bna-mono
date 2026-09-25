# cosys.work

Marketing site for **cosys.work** — offline-first, peer-to-peer health software.

Three flagship products are presented here:

| Page            | Product          | Audience                    |
| --------------- | ---------------- | --------------------------- |
| `/diabetes-app` | The Diabetes App | People living with diabetes |
| `/clinic-app`   | The Clinic App   | Clinicians and care teams   |
| `/platform`     | The P2P Platform | The fabric under both apps  |

## Stack

- [Astro 7](https://astro.build) — static output, no JS bundles; the theme picker and mobile nav ship as small inline scripts
- [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite`, configured in CSS (`src/styles/global.css`), not a JS config file
- `@astrojs/sitemap` for `sitemap-index.xml`
- Deployed on Netlify from `netlify.toml`

## The app preview

`/diabetes-app` embeds a working replica of the diabetes app's interface — `AppPreview.astro`
plus `src/scripts/app-preview.ts`. Ten screens, the app's own icons and four of its feed
illustrations redrawn as inline SVG, its type scale at the line height each script needs, its
English and Nepali strings, and the fifty-three values its lab reader pulls from one
de-identified eleven-page report (`src/data/app-preview-rows.ts` — invented patient, real
laboratory layout, real parser output).

Two things keep it honest. **It paints with the site's `--p-*` tokens**, so the theme picker
in the header drives the phone; the four clinical tokens the site does not otherwise carry
(the illustration trio and the chart's target band) are defined per theme inside the
component. And **nothing in it saves** — it is a replica, not an embedded app, and the copy
under it says so.

When the app's UI changes, this is the file that goes stale. It is worth re-checking against
the product repository whenever a screen in it moves.

## Typography and theming

Both are taken from the app so the two surfaces read as one product.

**Nunito** (`@fontsource-variable/nunito`), matching the app's ADR-09 §V4 choice. The app
ships static cuts at 400/600/700 because React Native on Android cannot select variable-font
axes; the web has no such limit, so the variable file is used and `--font-weight-medium` is
pinned to 600 so the site never renders a weight the product does not have.

The app pairs Nunito with **Mukta** for Devanagari. The site's own copy is English, but the
app preview on `/diabetes-app` switches between English and Nepali, so the three Devanagari
cuts ship with that component (`@fontsource/mukta`) rather than falling back to whatever the
visitor's device happens to have. They are imported by `AppPreview.astro`, so no other page
carries them.

**Four themes**, ported verbatim from the app's `src/theme/palette.ts` into
`src/data/themes.ts`: two light on a shared warm neutral ramp (deep teal, pink) and two
complete dark palettes (slate, true black).

There is no light/dark switch, because each theme is already one or the other. The default
follows the device: light resolves to deep teal, dark to true black. Picking any of the four
pins it; "System default" clears the choice and hands it back to the device. One
`localStorage` key, `theme`, holds either a theme id or nothing at all.

Colour is applied through semantic utilities (`bg-surface`, `text-ink-muted`, `border-line`,
`bg-primary-tint`, …) that compile to `var(--p-*)` via `@theme inline`. Swapping the
`data-theme` attribute on `<html>` repaints everything; there is no `dark:` variant anywhere
in the codebase. `data-scheme` rides alongside it purely so the browser knows which way to
draw its own furniture.

Products are **not** distinguished by colour — everything uses the theme primary, and the
current page is marked by an underline in the nav. Note that `build.format` is `'file'`, so
at build time `Astro.url.pathname` is `/clinic-app.html` and the home page is `/index.html`;
`Header.astro` normalises both before comparing against `NAV`.

Every pairing clears WCAG AA (4.5:1 for text, 3:1 for control outlines) in all four themes.
One constraint falls out of that and is worth knowing before editing: tinted chips take
`text-ink`, never `text-primary` — `primary` on `primaryTint` is 4.30:1 in pink, and the app
only ever pairs `text`/`textMuted` with that tint.

## Commands

| Command           | Does                              |
| ----------------- | --------------------------------- |
| `npm install`     | Install dependencies              |
| `npm run dev`     | Dev server at `localhost:4321`    |
| `npm run build`   | Build the static site to `./dist` |
| `npm run preview` | Serve `./dist` locally            |
| `npm run check`   | Type-check `.astro` files         |
| `npm run format`  | Format with Prettier              |

## Editing content

Almost everything you would want to rename lives in **`src/data/site.ts`**: the brand name,
the legal name, contact addresses, the product list and the nav. Changing a product's `name`
or `slug` there updates the nav, the footer, the homepage cards and the page metadata together.

Page copy lives in the frontmatter of each page in `src/pages/` as plain arrays of objects —
edit those rather than the markup below them.

## URLs

`build.format` is `'file'`, so `src/pages/clinic-app.astro` builds to `dist/clinic-app.html` and
Netlify serves it at `/clinic-app` with no trailing-slash redirect. That matches
`trailingSlash: 'never'` and the canonical URLs emitted in `<head>`.

## Deployment

Netlify builds with `npm run build` and publishes `dist`. Nothing else is required —
there are no environment variables, no functions and no external APIs.

The site's canonical origin is set in one place, `astro.config.mjs` → `site`. It drives the
canonical tags, the sitemap and `public/robots.txt` (update the robots file by hand if the
domain ever changes).
