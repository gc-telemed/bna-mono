# cosys.work

Marketing site for **cosys.work** — offline-first, peer-to-peer health software.

Three flagship products are presented here:

| Page            | Product          | Audience                    |
| --------------- | ---------------- | --------------------------- |
| `/diabetes-app` | The Diabetes App | People living with diabetes |
| `/clinic-app`   | The Clinic App   | Clinicians and care teams   |
| `/platform`     | The P2P Platform | The fabric under both apps  |

## Stack

- [Astro 7](https://astro.build) — static output, zero client JS except two small inline scripts (theme toggle, mobile nav)
- [Tailwind CSS 4](https://tailwindcss.com) via `@tailwindcss/vite`, configured in CSS (`src/styles/global.css`), not a JS config file
- `@astrojs/sitemap` for `sitemap-index.xml`
- Deployed on Netlify from `netlify.toml`

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
