# cosys.work About us update: handoff

*Written 1 November 2026 for a Claude Code cloud session. Editable copy: the Claude Doc [cosys.work About us update: handoff](https://claude.ai/artifact/Pu8XfrLi98BQVJgbNnmkun).*

## Purpose and where the site stands

The Company page becomes **About us** and gains a section on technology in Nepal. It covers sovereignty and data residency, local AI models with large models abroad on the owner's terms, resilience through outages, business intelligence from an organisation's own record, and lower running costs. The homepage gets a short band that links into it. All the copy is in this file, under *The copy*.

The first site update (`2026-11-01-site-update.md`, beside this file) is done: PR #1 shipped the company homepage, the SoMA page, the drawings and the motion, and PR #2 added the SoMA white paper. Its rules still hold, and this handoff only adds to them.

|  |  |
| --- | --- |
| Repository | [gc-telemed/bna-mono](https://github.com/gc-telemed/bna-mono); `main` at 43929be, with this handoff on top |
| Stack | Astro 7.3, static output, no JavaScript bundles; Tailwind CSS 4 in `src/styles/global.css`; four themes as `--p-*` tokens, no `dark:` variants |
| Content | Names, products, nav and offers in `src/data/site.ts`; page copy as frontmatter arrays in `src/pages/`; the copy source in `docs/cosys-work-site-content.md` (v5) |
| Pages touched | `src/pages/company.astro`, `src/pages/index.astro`, `src/data/site.ts`, `src/components/Footer.astro`, `netlify.toml`, and one new drawing, `src/components/LineOut.astro` |
| Deploy | Netlify builds `npm run build` and publishes `dist` from `main`, so merging is publishing |
| Checks | `npm run check`, `npm run build`, `npm run format` |

Checks on real phones follow in a laptop session, as usual.

**Start prompt.** Paste this into the cloud session:

```
You are updating the cosys.work site in gc-telemed/bna-mono. Read
docs/handoff/2026-11-01-about-us-update.md first, then
docs/handoff/2026-11-01-site-update.md for the standing rules,
README.md and docs/cosys-work-site-content.md. Work through the
stages in order, one pull request each, and never merge to main:
Netlify publishes whatever lands there. End with the open items
the handoff lists.
```

## Ground rules

Everything in the first handoff's *Ground rules* still applies: one PR per stage from its own branch, screenshots in all four themes at 360 px and 1280 px, the copy source's founder lines win, content in frontmatter and `site.ts`, WCAG AA everywhere, a `needs_review` marker on every new block for the Nepali version, and never merge, force-push or add a tracking script.

The copy rules this update leans on most:

- No em dashes in either language, and a humanizer pass on every new line.
- Say Nepal, never a city. The Diabetes App is "in closed pilot" and is never called TApp.
- No savings figure anywhere. The site says we measure savings with each client.
- No prices on About us or the homepage.
- Name no client, product or deck the copy below does not name.

## Stages

**Stage 1: data, labels and the copy source.** Commit style `feat(site): …`.

1. In `site.ts`, rename the nav item `Company` to `About us`; the URL stays `/company`. Check that the mobile nav still fits at 360 px.
2. In `Footer.astro`, change "About cosys.work" to "About us".
3. In `NAMES` (`site.ts`), nep.work's introduction ends "Relays carry what they cannot read, and anyone can run one." in place of "…and any community can run its own node."
4. Add a `THREADS` array to `site.ts` with each thread's `id`, `label` and `line` from the band table under *The copy*. The homepage band and the About us jump links both read it.
5. In `netlify.toml`, add a 301 redirect from `/about` to `/company`.
6. Bring `docs/cosys-work-site-content.md` to v5.1: the header and footer labels, the nep.work line, the new About us section and the homepage band, and a "What changed from v5" paragraph. Add the new open items to *Check before publishing*.

**Stage 2: the About us page.** Commit style `feat(company): …`.

1. Rewrite the hero lede and the page description as *The copy* gives them. The title, the badge and the status line stay.
2. Add the section *Technology in Nepal* between *How we work* and *Our names*. It has a `SectionHeading`, a row of jump links, and one block per thread, each with `id` set from `THREADS` and `scroll-mt-20` so the header doesn't cover it.
3. Each thread block: the title as an `h3`, the body paragraphs, a short list, and the example in the same tinted box the homepage uses (`example` class). On wide screens, title and body sit left with the list and example right; under 640 px they stack.
4. Build `LineOut.astro` (see *The drawing*) and place it in the AI thread, after the body and before the list.
5. Add the new line to *Work with us*'s lede.
6. Keep every other section as it is: the story, the four commitments, *How we work*, *Our names*, *What we make* and the closing CTA.

**Stage 3: the homepage band.** Commit style `feat(home): …`.

Under the two *Work with us* cards on `/`, add a band titled *What stays with you* with the five items from `THREADS`. Each item is a link to its thread on `/company`. On wide screens the band runs as one row of five; under 1024 px it wraps to two or three columns, and under 640 px it becomes a list. It uses `.reveal` and `.lift` like the cards above it, and no new motion.

## The copy

Every block is new in v5.1 and needs a Nepali version reviewed by a native speaker.

### About us hero (`/company`)

Description (metadata): *About cosys.work: who we are, what we hold to, and how we keep data, models and running costs under the owner's control.*

Hero lede, in place of the current one:

> cosys.work builds collaborative systems that people own. They run on the devices people already have, keep working offline, and sync directly between the people who share them. We started with chronic care, because the tools available asked for a permanent internet connection, a monthly fee, and an unconditional copy of the most private thing a person has.

The title ("We build the tools we wanted to exist"), the badge ("About cosys.work") and the status line ("Built in Nepal. The Diabetes App is in closed pilot and free forever.") stay.

### Technology in Nepal (`/company`, new section)

**Eyebrow:** Technology in Nepal
**Title:** Kept at home,
**Accent title:** open to the world on purpose
**Lede:** Most software used in Nepal keeps its data on servers abroad, sends its questions to foreign AI services, and stops when the line drops. We build our products and our clients' systems so the data, the models and the bills stay under the owner's control.

**Jump links:** Data at home · Local AI first · Through outages · Your own intelligence · Run it for less

#### Data at home (`#sovereignty`)

**Data stays with the people and offices it belongs to**

A patient's record lives on their phone and at their clinic. A company's record lives on its own laptops and office box. Each keeps the keys to its own copy, and an outside party such as an auditor, a bank or a regulator gets a signed view of exactly the part it needs, which can be withdrawn later.

For public services we propose the same rule at national scale, as federated data residency. Records stay with the province or office that owns them, and questions travel between offices while the records stay put.

- Each business names one key holder, usually the owner or the treasurer. The key is made on the business's own device, and we never hold a copy.
- Where we host, we use data centre and cloud providers listed with Nepal's Department of Information Technology, starting with two and adding the rest of the list over time.

*For example:* a clinic's records stay on its own machines. We don't hold a copy, so we are never a third party to its record-keeping.

#### Local AI first (`#ai`)

**Local models first, large models on your terms**

Most AI integrations send a company's cleaned records, prices, supplier terms and its questions to a model abroad, one convenient call at a time. The company keeps a chat box and a bill that grows with use, and some of its know-how leaves with every call. We keep the intelligence close: a small model on each phone and laptop, and a larger one on the office or branch box, working on data that stays in the building.

Our local models are built on Gemma, chosen after we examined the open models available. We improve them with fine-tuning, distillation and further pre-training, and we are extending them to long-running tasks, to several agents and several users working together, to step-by-step reasoning, and to larger training data.

[Drawing: *One guarded line out*, `LineOut.astro`]

- A question too large for local machines can go to a large model abroad, one call at a time. Every such call is deliberate, logged, kept to the minimum and reversible.
- Each organisation, and each local body that runs public services, sets its own policy for what may leave. We provide base templates and guidelines to start from.

*For example:* the Diabetes App reads a glucometer photo on the phone itself, so the picture never leaves it.

#### Through outages (`#resilience`)

**Work carries on when the line drops**

In many parts of Nepal the line drops every day, and a power cut can take a whole office offline. Our systems keep every essential task on the devices people hold. Devices sync directly when they can reach each other, through a relay when they cannot, and wait when there is no connection at all. When the line returns, the copies merge and every entry keeps its author's signature.

- Relays carry sealed messages they cannot read, and anyone can run one.
- The network depends on no single operator, ourselves included.

*For example:* a branch with a bad line keeps approving leave and answering questions, and its records join the rest of the company when the line comes back.

#### Your own intelligence (`#intelligence`)

**Business intelligence from your own record**

An organisation's intelligence is the record of how it works: who decided what, who approved it, who was waiting and for how long. Kept at home, that record feeds reports and answers built by models on your own machines, and each answer cites the entries it drew on. There is nothing to buy back from a vendor.

- Each team's assistant answers from what that team may see, because nothing else is on its machines.
- A view for an outside party keeps only the fields that party needs.

*For example:* an investor's view can show how headcount moved last quarter without naming who was hired.

#### Run it for less (`#costs`)

**Run it for less**

Rented cloud and AI services charge more the more you use them. When the work runs on machines you own, with compute pooled between them peer to peer, the bill shrinks to the parts that still need a provider: relaying sealed messages, keeping encrypted backups, and the occasional large-model call.

- Before a workload moves, we give a plain verdict: move it now, fix it first, or keep it rented for now.
- We measure the savings with each client as the work moves, and we don't promise a figure in advance.

*For example:* a ward office and a ministry can draw on one shared pool of machines in the country, instead of each paying for a foreign service.

### Work with us (`/company#work-with-us`)

Add a second sentence to the lede: *"Everything in Technology in Nepal comes with both offers."* The offers, the button and the rule of no prices stay.

### Homepage band (`/`, under the Work with us cards)

**Band title:** What stays with you

| Label | `id` | Line |
| --- | --- | --- |
| Data at home | `sovereignty` | Records stay with the people and offices they belong to, under keys they hold. |
| Local AI first | `ai` | Models run on your machines, and large models abroad get only what you let through. |
| Through outages | `resilience` | Work carries on offline and catches up when the line returns. |
| Your own intelligence | `intelligence` | Reports and answers from your own record, each with its sources. |
| Run it for less | `costs` | Pay for what still needs a provider, and run the rest yourself. |

Each item links to `/company#<id>`.

## The drawing

`LineOut.astro` shows the AI thread's rule in one picture. Reference renders are in `2026-11-01-about-us-update/`: `line-out.png` for wide screens and `line-out-narrow.png` for phones. Match its content and layout; the colours come from the theme.

| Part | Content |
| --- | --- |
| Title | One guarded line out |
| Left panel | "Local and small", with three chips: Phone, Laptop, Office box. Under them: "Data and models stay here" |
| Middle | One line leaving the left panel through a narrow gate, labelled "One guarded line", with four tags: Deliberate, Logged, Minimal, Reversible |
| Right panel | "Global and large", with one chip: Large model. Under it: "Gets only what you let through" |
| Rule, along the bottom | Each organisation decides what crosses the line |
| `aria-label` | On the left, local and small: a phone, a laptop and an office box, where data and models stay. One guarded line leads right, to a large model abroad. Every call along it is deliberate, logged, kept to the minimum and reversible. Each organisation decides what crosses. |

- Wide screens: one row, left panel, gate, right panel. Under 640 px: a column, with the line running down through the gate. Labels never below 12 px.
- Colour only from `--p-*` tokens: the left panel in the primary tint, the gate and line in the primary, the right panel in line colours only.
- Words from the page's frontmatter, like the other drawings, so the Nepali version can drop in.
- Motion: wrap the drawing in a `figure` with the `illustration` class and give the line `class="draw"` and `pathLength="1"`, as `Circles.astro` does, so the existing draw-in motion picks it up. Nothing else moves.

## Done when

- [ ] `npm run check`, `npm run build` and `npm run format` are clean.
- [ ] The nav reads Diabetes App · Clinic App · SoMA · Platform · About us · Contact and fits at 360 px; the footer says "About us".
- [ ] `/about` answers with a 301 to `/company` in the Netlify deploy preview.
- [ ] Each band item and jump link lands on its thread with the heading in view, and the jump links work by keyboard.
- [ ] With reduced motion on, nothing moves; without scroll-driven animation (Firefox stable), the page and the drawing are complete.
- [ ] Every new pairing, including the words in `LineOut.astro`, clears WCAG AA in all four themes; headings run in order (the threads are `h3` under the section's `h2`).
- [ ] No horizontal scrolling at 360 px; the drawing turns into a column under 640 px.
- [ ] The copy has no em dashes, no city names, no "TApp", and no savings figure or price.
- [ ] `docs/cosys-work-site-content.md` is v5.1, with the "What changed from v5" paragraph.
- [ ] Laptop session: About us reads well and scrolls smoothly on the Redmi Note 10 and the Galaxy M16.

## Open items and sources

The session leaves these as they are and lists them in its last message.

- [ ] **The first two DoIT-listed providers.** The copy says "starting with two" without naming them. Once they are chosen, the founder decides whether the site names them.
- [ ] **The base egress templates and guidelines.** Link them from the AI thread once they are published.
- [ ] **"Local body".** The copy reads it as each organisation, and each local body that runs public services. Founder to confirm.
- [ ] **When a key holder leaves.** The site says nothing about handing over keys until that is decided.
- [ ] **The Nepali review** of every new block.

Sources:

- [gc-telemed/bna-mono](https://github.com/gc-telemed/bna-mono) at 43929be: `src/data/site.ts`, `src/pages/company.astro`, `src/pages/index.astro`, `src/components/Footer.astro`, `src/styles/global.css`, `netlify.toml`, `docs/cosys-work-site-content.md` (v5), `docs/handoff/2026-11-01-site-update.md`.
- The founder's answers on relays, models, key holders, egress and hosting, and the talks, decks and business notes the threads come from, kept in the founder's project notes.
- The listing rule for hosts: Nepal's Data Centre and Cloud Service directive, under which providers are listed with the Department of Information Technology ([Republica](https://myrepublica.nagariknetwork.com/news/data-center-and-cloud-service-providers-must-now-mandatorily-be-listed-76-64.html), [Pioneer Law](https://pioneerlaw.com/?p=1257)).
