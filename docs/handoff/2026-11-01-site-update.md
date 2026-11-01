# cosys.work site update: handoff

*Written 1 November 2026 for a Claude Code cloud session. Editable copy: the Claude Doc [cosys.work site update: handoff](https://claude.ai/artifact/Vy1cwVnyLREccarHq9esBS).*

## Purpose and where the site lives

A Claude Code session rebuilds the cosys.work homepage around the company, adds a page for SoMA, and gives the site some quiet motion, in the site's own repository. The content comes from two drafts that sit beside this file, [the homepage copy](2026-11-01-homepage-copy.md) and [the SoMA page copy](2026-11-01-soma-page-copy.md) (editable copies: the Claude Docs [cosys.work homepage: new introduction](https://claude.ai/artifact/61eSgY6bcy5g6Zq91BhtfM) and [cosys.work: the posts app page](https://claude.ai/artifact/B6BHw5LXRZs37Uo6CfPKSx)); this handoff says how it lands in the code.

|  |  |
| --- | --- |
| Repository | [gc-telemed/bna-mono](https://github.com/gc-telemed/bna-mono), public; last commit 9c90759 on 21 October 2026 |
| Stack | Astro 7.3, static output, no JavaScript bundles (the theme picker and mobile nav are small inline scripts); Tailwind CSS 4 configured in `src/styles/global.css`; `@astrojs/sitemap` |
| Look | Four themes ported from the app (deep teal, pink, slate, true black) as `--p-*` tokens; semantic utilities such as `bg-surface` and `text-ink-muted`; no `dark:` variants; Nunito, with Mukta for Devanagari |
| Content | Names, products and nav in `src/data/site.ts`; page copy as arrays in each page's frontmatter in `src/pages/`; the copy source in `docs/cosys-work-site-content.md` (v4.3) |
| Deploy | Netlify builds `npm run build` and publishes `dist` (`netlify.toml`, Node 22); `build.format: 'file'`, no trailing slashes |
| Checks | `npm run check` (Astro type check), `npm run build`, `npm run format`; no CI workflow in the repository |

The session needs push access to the repository to open pull requests. Checks on real phones follow in a laptop session, as usual.

In the repository this handoff is `docs/handoff/2026-11-01-site-update.md`, with the two page drafts beside it (`2026-11-01-homepage-copy.md`, `2026-11-01-soma-page-copy.md`) and renders of the drawings in `docs/handoff/2026-11-01-site-update/`.

**Start prompt.** Paste this into the cloud session:

```
You are updating the cosys.work site in gc-telemed/bna-mono. Read
docs/handoff/2026-11-01-site-update.md first, then the two page drafts
beside it, README.md and docs/cosys-work-site-content.md. Work through
the stages in order, one pull request each, and never merge to main:
Netlify publishes whatever lands there. Stop only where the handoff
says, and end with the open items it lists.
```

## Ground rules for the session

Netlify deploys whatever lands on `main`, so merging is publishing. The session opens pull requests and the founder merges them.

- **Read first:** `README.md` and `docs/cosys-work-site-content.md` whole. The copy source's founder lines win over both Docs where they disagree.
- **Pull requests:** one per stage below, each from its own branch, with commit messages in the repository's style (`feat(home): …`, `feat(soma): …`, `feat(site): …`). Each PR carries before and after screenshots in all four themes, at 360 px and 1280 px wide.
- **Stages, in order:** the copy source and `site.ts`; the homepage; the SoMA page with navigation, footer and its form; the illustrations; the motion.
- **Copy rules from the copy source:** no em dashes in either language; a humanizer pass on every new line; say Nepal, never a city; the Diabetes App is "in closed pilot" and is never called TApp; cosys.work is the company, never an app; nothing about dose calculation, carb counting or reversing diabetes; no GotChoices, Sereus, Optimystic, Fret or Quereus.
- **The two Docs, corrected:** both now say Nepal, keep "closed pilot" and hold the EGU line back, as the copy source requires. Anything else that disagrees with the copy source loses to it.
- **Code rules from the README:** static output and no JavaScript bundles; colour only through the `--p-*` tokens and semantic utilities, no `dark:` variants; every text pairing at WCAG AA in all four themes; content in frontmatter arrays and `site.ts`, never hard-coded in markup.
- **Nepali:** every new block needs a Nepali version reviewed by a native speaker before launch. Leave a `needs_review` marker; don't hold code back for it.
- **Never:** merge to `main`, force-push, add a tracking script or a third-party embed, or add a dependency without saying why in the PR.

## The homepage

`src/pages/index.astro` is rebuilt in the order of the homepage Doc's page-order drawing: the company first, then the ideas, then what you build, then health. Copy comes from that Doc, with the corrections above. Every section uses the existing `Section` and `SectionHeading` components (`eyebrow`, `title`, `accentTitle`, `lede`), so the page keeps the site's rhythm.

| Order | Section | Copy from the homepage Doc | In the code |
| --- | --- | --- | --- |
| 1 | Hero | Hero and company introduction: the recommended headline, subhead, buttons and the two links for patients and clinics. Small print becomes "Built in Nepal. Open-source libraries under Apache-2.0." | Rewrite the existing hero; new hero illustration (see Illustrations) |
| 2 | Who we are | The quoted paragraph, with "Nepal" for the cities | A prose block under the hero |
| 3 | cosys.work, nep.work and coplanetary.work | The three-column table: one line, introduction and example per name | New `NameBand.astro`, three cards, each linking down to its section |
| 4 | Collaborative systems | The quoted section copy | Copy plus the circles illustration |
| 5 | Peer-to-peer DNA | The quoted section copy | Grows from today's `pillars` array; copy plus the helix illustration |
| 6 | Beyond Earth | The quoted section copy, without the EGU and NASA ADS sentence until the founder confirms it (see Open items) | Copy plus the delay illustration |
| 7 | What we build | The card copy table: Diabetes App and Clinic App, SoMA, the open framework | Driven by `PRODUCTS` in `site.ts`; the framework card links to `github.com/cosys-work/cosys` |
| 8 | Work with us | The card copy for MVP to Production and p2p-fication, no prices | Two cards linking to a new `#work-with-us` section on the Company page |
| 9 | Health in Nepal | Today's condition cards, the Nepal figures and both buttons | Keep `conditions`, `facts` and the closing CTA, shortened |
| 10 | Promises | Today's promises | Keep |

What leaves the homepage: the Snap, Share, Follow steps and the comparison with typical diabetes apps both move to `/diabetes-app`, which has neither today. Update `SITE.tagline` and `SITE.description` in `site.ts` to the new hero line and subhead, so the metadata and link previews match.

## The SoMA page

A new page at `/soma`, built like `/clinic-app`, with every section of the posts app page Doc in order. The name is **SoMA**, spelled that way everywhere; the Doc already uses it in place of `[Name]`.

1. Add SoMA to `PRODUCTS` in `site.ts`: slug `/soma`, name and short name `SoMA`, audience "For people who post in public", and the blurb and summary from the Doc's card copy. The nav, footer, homepage card and metadata then follow, as the README says.
2. Create `src/pages/soma.astro` with the Doc's sections as frontmatter arrays: Hero; How it works (Write once, Post everywhere, Keep the proof, numbered like the Diabetes App's steps); Anonymous and safe; Where your posts go (the four-row table, built from the existing `Comparison` component or a plain table); Circles, files and your data; The facts; Separate from our health apps; the closing call to action.
3. Add a third form to `InterestForm.astro`, kind `soma`, at `/contact#soma`, with a `thanks-soma` page like the other two. It asks only for a way to reach you (an email or a Nostr address) and, optionally, the community you belong to: no name and no phone number, to match the anonymity promise. Add `soma` to `FORMS` in `site.ts`, and point both "Ask for an invitation" buttons at it. The sitemap filter already leaves out `/thanks-` pages.
4. Where the Doc marks screenshots, build a small static preview of three SoMA screens (the composer, a post's journey, the proof seal) in the spirit of `AppPreview.astro`: painted with the site's `--p-*` tokens, labelled "A preview of the design", and saving nothing. The phone previews in the team deck are the reference for layout; they show the earlier spelling, so match their layout, not their text.
5. Leave the price row out of the facts until the founder sets a price (see Open items); never publish a placeholder.

## Navigation, footer and links

SoMA joins the nav beside the two apps, and the other pages pick up the company's new names.

| Where | Change |
| --- | --- |
| `NAV` in `site.ts` | Diabetes App · Clinic App · SoMA · Platform · Company · Contact. Check the mobile nav still fits at 360 px. |
| Footer | Add a line "cosys.work · nep.work · coplanetary.work" (plain text unless those domains serve pages), "Built in Nepal", and a link to the open libraries at `github.com/cosys-work/cosys`. The app repositories stay private, so the footer says the libraries are open, not the apps. |
| Platform page | Name the network nep.work in its hero and metadata; the URL stays `/platform`. |
| Company page | Add a `#work-with-us` section with the two consulting offers, copy from the homepage Doc's cards, no prices. Add cosys.work, nep.work and coplanetary.work in one short block. |
| Diabetes App page | Receives the steps and the comparison moved off the homepage. |
| Contact page | Gains the `#soma` form beside the waitlist and clinic forms. |
| Language switch | The copy source asks for English and नेपाली in the header. It waits until reviewed Nepali pages exist; don't ship a switch that leads nowhere. |

## Visual flair: subtle parallax and scroll effects

Motion should feel like depth and arrival, never like a show. It is pure CSS scroll-driven animation, so the site stays free of JavaScript bundles. Chrome and Edge have had it since version 115 and Safari since 26; Firefox stable still keeps it behind a flag, so Firefox visitors get the static page, which must be complete on its own ([support notes](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026), [Chrome guide](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)).

| Effect | Where | Limit |
| --- | --- | --- |
| Fade and rise | Section headings, cards and the names band, which staggers its three columns | 16 px of travel, from transparent |
| Hero depth | The hero illustration drifts at about half the page's speed as the hero leaves the screen | At most 24 px |
| Drawing in | The circles draw their outlines, the helix strands draw left to right, the delay bracket stretches | Finished within the first third of the section's entry |
| Helix drift | The strands' phase shifts a little as the section scrolls past | Under a quarter turn |
| Header hairline | A border and soft shadow appear once the page has scrolled 64 px | Token colours only |
| Card lift | Hover and keyboard focus raise a card 2 px with a shadow | 150 ms |

A reveal looks like this; the other effects follow the same pattern with their own keyframes and ranges. SVG paths use `pathLength="1"` so drawing in needs no measuring.

```css
@keyframes reveal {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: none; }
}

@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .reveal {
      animation: reveal linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 30%;
    }
  }
}
```

- Animate only `opacity`, `transform` and `stroke-dashoffset`, so scrolling stays smooth on a low-cost phone.
- Nothing hijacks the scroll: no snapping, no smooth-scroll library, no pinned sections, no autoplaying video, and nothing moves while someone is reading it.
- Put every effect inside `prefers-reduced-motion: no-preference`. The existing reduced-motion rule in `global.css` shortens durations, but scroll-driven animations ignore duration, so the media query is what turns them off.
- No layout shift: elements keep their size while they animate.

## Illustrations

The new sections get drawings of their own in place of emoji. The drawings in the homepage copy are the reference for content and layout (renders in `2026-11-01-site-update/`: `circles.png`, `helix.png`, `delay.png`, `homepage-order.png`); the site versions are Astro components with inline SVG, so they repaint with the theme and their words stay real text.

| Component | What it shows | Wide screens | Under 640 px |
| --- | --- | --- | --- |
| `HeroArt.astro` | A phone, a laptop and a small clinic box joined by lines, with an empty dashed space where a central server would usually sit | Beside the hero text | Below the text, smaller |
| `Circles.astro` | Family, Clinic and Community as overlapping circles, each with "own keys, own copy"; a dot for a patient in Family and Clinic, and one for a nurse in Clinic and Community; "No server in the middle" | Full width under the copy | The same picture scaled to fit, labels never below 12 px |
| `Helix.astro` | Two strands and five rungs pairing what stays with you (your keys, your copy, sealed records, works offline, open source) with what the network does (entries signed, syncs when online, relays can't read, catches up later, Apache-2.0) | Horizontal | Turned upright, labels left and right of the strands |
| `DelayLadder.astro` | Same room, Across a country, Earth to Moon, Earth to Mars, Clinic offline (highlighted), on an axis marked "not to scale", under the bracket "One rule for the whole range" | One row | A column, with the axis running down |

- Colour only from the `--p-*` tokens (primary for the highlight, line colours for outlines), so all four themes work with no extra code.
- Words in the drawings come from frontmatter, like the rest of the copy, so the Nepali versions can be dropped in later.
- Each SVG has `role="img"` and an `aria-label` that says what it shows, such as "Each group holds its own keys and its own copy".
- The delay figures stay as the Doc gives them: about 1.3 seconds to the Moon, and about 4 to 24 minutes to Mars.

## Done when

Each PR shows these in its description. The phone checks at the end are for the laptop session.

- [ ] `npm run check`, `npm run build` and `npm run format` are clean.
- [ ] With reduced motion turned on (Playwright's `reducedMotion: 'reduce'`), nothing moves and every word and drawing is visible.
- [ ] With scroll-driven animations unavailable (Firefox stable), the page is complete and nothing is stuck invisible.
- [ ] Layout shift stays at zero, and the homepage's largest paint is no slower than before the change.
- [ ] Every new text pairing, including the words inside drawings, clears WCAG AA in all four themes; headings run in order; focus is visible on every link and button.
- [ ] No horizontal scrolling at 360 px; the drawings reflow as the Illustrations table says.
- [ ] The copy has no em dashes (grep both languages), no city names, "closed pilot" as the copy source has it, SoMA spelled that way everywhere, and no "TApp".
- [ ] `docs/cosys-work-site-content.md` becomes v5: the new homepage, the SoMA page, the nav and footer, and a "What changed from v4.3" paragraph.
- [ ] `/soma` is in the sitemap; the `soma` form is detected by Netlify at build and keeps the honeypot.
- [ ] Laptop session: scrolling stays smooth on the Redmi Note 10 and the Galaxy M16 in Chrome, and on an iPhone in Safari if one is at hand.

## Open items and sources

The session leaves these out or as placeholders in the PR, and lists them in its last message.

- [ ] **The EGU and NASA ADS line.** The copy source says to restore it only if the presented work is the architecture the apps use now. Founder to confirm before it appears anywhere on the site.
- [ ] **SoMA's price and status line,** and the link to the operator's vetting standard once it is published.
- [ ] **Where "Work with us" leads:** the new Company section only, or also a form on the Contact page.
- [ ] **nep.work and coplanetary.work:** whether either domain serves a page yet, which decides if the footer links them.
- [ ] **A new link-preview image** (`public/og.png`) with the new hero line.
- [ ] **The Nepali review** of every new block, and then the language switch.

Sources, checked on 1 November 2026:

- [gc-telemed/bna-mono](https://github.com/gc-telemed/bna-mono): `README.md`, `package.json`, `astro.config.mjs`, `netlify.toml`, `src/data/site.ts`, `src/pages/index.astro`, `src/styles/global.css`, `src/components/InterestForm.astro`, `docs/cosys-work-site-content.md` (v4.3).
- [cosys.work homepage: new introduction](https://claude.ai/artifact/61eSgY6bcy5g6Zq91BhtfM) and [cosys.work: the posts app page](https://claude.ai/artifact/B6BHw5LXRZs37Uo6CfPKSx).
- [Chrome for Developers: scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations), and [a support summary for 2026](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026): Chrome 115 and later, Safari 26 and later, Firefox stable behind a flag.
