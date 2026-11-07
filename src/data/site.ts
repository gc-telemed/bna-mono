/**
 * Every brand name, product name and contact detail on the site lives here.
 * Rename a product in one place and the nav, footer, cards and metadata follow.
 */

export const SITE = {
  name: 'cosys.work',
  legalName: 'CoSys Work Pvt. Ltd.',
  url: 'https://cosys.work',
  tagline: 'Collaborative systems with no centre to fail.',
  description:
    'CoSys Work builds collaborative software that runs on the devices people already own. It works offline, syncs directly between the people who share it, and keeps every record with the people it belongs to. We started with chronic care in Nepal, where patients, families and clinics share one record without a central server.',
} as const;

export const CONTACT = {
  email: 'hello@cosys.work',
  productEmail: 'diabetes@cosys.work',
  clinicEmail: 'clinics@cosys.work',
  locations: 'Nepal',
} as const;

/** Where the two sign-up forms live. Every call to action points at one of these. */
export const FORMS = {
  waitlist: '/contact#waitlist',
  clinic: '/contact#clinic',
  soma: '/contact#soma',
} as const;

/** Places off this site that the copy links to. */
export const LINKS = {
  /** The open @cosys libraries. The app repositories stay private, so link the libraries only. */
  framework: 'https://github.com/cosys-work/cosys',
} as const;

/** A work we published with a DOI, as its Zenodo record describes it. */
export interface Publication {
  title: string;
  authors: readonly { family: string; given: string; orcid?: string }[];
  year: number;
  /** The day the record was issued. */
  date: string;
  /** The record's resource type, shown in brackets in the reference. */
  kind: 'Preprint' | 'Software';
  version?: string;
  publisher: string;
  doi: string;
  license: { name: string; url: string };
  bibtex: string;
}

/**
 * Our works with a DOI, as their Zenodo records describe them (DataCite, read 2026-11-07). The
 * SoMA page gives each a DOI badge, a Cite block and an entry in its structured data. A version
 * DOI never changes, so a new version means a new DOI here, not an edit to the old one.
 */
export const PUBLICATIONS = {
  paper: {
    title: 'Collaboration Is Composition: Mealy Machines over Signed Records in Poly and Org',
    authors: [{ family: 'Karna', given: 'Risav', orcid: '0009-0005-6682-9473' }],
    year: 2026,
    date: '2026-11-07',
    kind: 'Preprint',
    publisher: 'Zenodo',
    doi: '10.5281/zenodo.24026645',
    license: { name: 'CC BY 4.0', url: 'https://creativecommons.org/licenses/by/4.0/' },
    bibtex: `@misc{karna2026collaboration,
  author       = {Karna, Risav},
  title        = {{Collaboration Is Composition}: {Mealy} Machines over Signed Records in {Poly} and {Org}},
  year         = {2026},
  howpublished = {Preprint, Zenodo},
  doi          = {10.5281/zenodo.24026645},
  url          = {https://doi.org/10.5281/zenodo.24026645}
}`,
  },
  proofs: {
    title: 'cosys: packages and Lean 4 proofs for Collaboration Is Composition',
    authors: [{ family: 'Karna', given: 'Risav', orcid: '0009-0005-6682-9473' }],
    year: 2026,
    date: '2026-11-07',
    kind: 'Software',
    version: 'proofs-v1.0.0',
    publisher: 'Zenodo',
    doi: '10.5281/zenodo.24026063',
    license: { name: 'Apache 2.0', url: 'https://www.apache.org/licenses/LICENSE-2.0' },
    // The same key and fields as the paper's own reference to it.
    bibtex: `@misc{karna2026cosys,
  author       = {Karna, Risav},
  title        = {cosys: packages and {Lean} 4 proofs for {Collaboration Is Composition}},
  year         = {2026},
  howpublished = {Zenodo, release proofs-v1.0.0},
  doi          = {10.5281/zenodo.24026063},
  url          = {https://doi.org/10.5281/zenodo.24026063}
}`,
  },
} as const satisfies Record<string, Publication>;

/**
 * Our numbered papers, from 0. Each one gets its own page at /papers/<slug>, with the PDF beside
 * it at /papers/<slug>.pdf (in public/papers/): Google Scholar indexes a paper only from a page
 * of its own, and reads its PDF only from the same folder as that page. The abstract is the
 * paper's own, word for word. A new version means a new PDF here and a new DOI in PUBLICATIONS.
 */
export const PAPER_SERIES = [
  {
    number: 0,
    slug: 'collaboration-is-composition',
    publication: PUBLICATIONS.paper,
    proofs: PUBLICATIONS.proofs,
    shortTitle: 'Collaboration Is Composition',
    subtitle: 'Mealy Machines over Signed Records in Poly and Org',
    affiliation: 'CoSys Work Pvt. Ltd.',
    pdf: { pages: 20, size: '252 KB' },
    // The line under each heading in How to cite, here and on the SoMA page.
    citeNotes: {
      paper: 'Preprint. Free to share and adapt under CC BY 4.0.',
      proofs: 'Release proofs-v1.0.0 of our open-source libraries, under Apache 2.0.',
    },
    summary:
      'People and software that keep their own records and work together with no server in the middle, modelled as machines over signed records and wired together, with the main results proved in Lean 4.',
    abstract:
      'People, organisations and the software acting for them increasingly work together without a shared server and without an orchestrator: each party keeps its own record, and work moves between peers as signed messages. We argue that such collaboration is composition. Every party acts through a Mealy machine over an append-only log of signed records, and a collaboration is existing machines wired together through mailboxes, so a collaboration is itself a machine and can be wired into a larger one. We give a mechanized model of one such system, the model that our published libraries implement, with primitives from a research matrix we wrote in 2014 and from applied category theory. In the category of polynomial functors a mailbox turns each machine into a dynamical system, and wiring that changes as units pair becomes one map whose routing depends on the units’ positions. Held in a registry, the wiring carries the identitor and compositor of a dynamic organization in the sense of Shapiro and Spivak. Claims are types whose only inhabitants are records signed by the right keys, so an approval signed by an agent does not type-check. What composition gives follows from known results, applied to this model and checked in Lean 4. Bisimilar machines give bisimilar collaborations. When every machine is monotone in its log, logs and views converge under any fair delivery order, a form of the CALM theorem, and a step that is not monotone is where the model asks for a signature. Acceptance of a derived fact is a homomorphism out of a provenance semiring, and trust is a fibration over observers, with each ranking computed inside its observer’s fiber. A case study from health care, in which a patient routes lab results and payment requests between her clinic and her family, runs through the paper.',
  },
] as const;

/**
 * The line about what we publish, under the introduction on the homepage (Who we are) and on
 * About us. The paper links to its page under /papers, the white paper to its section on the
 * SoMA page. needs_review: Nepali version, reviewed by a native speaker.
 */
export const PAPERS = {
  intro: 'We also publish the mathematics our systems rest on.',
  paper: {
    title: 'Collaboration Is Composition',
    href: `/papers/${PAPER_SERIES[0].slug}`,
    rest: 'shows how people and software work together with no server in the middle, and we proved its main results in Lean 4.',
  },
  whitepaper: {
    title: 'The SoMA white paper',
    href: '/soma#white-paper',
    rest: 'sets out the ideas behind SoMA.',
  },
} as const;

/**
 * The company's three names. The homepage band introduces them, each linking down to its
 * own section, and the About us page and footer repeat them.
 */
export const NAMES = [
  {
    name: 'cosys.work',
    line: 'Collaborative systems',
    intro:
      'Software for people who work together. Each family, clinic, team or community holds its own keys and its own copy of what concerns it, and every entry is signed by whoever wrote it. Collaborative editors, signed authorship and trust circles are the building blocks.',
    example: 'A family and their clinic keep one diabetes record in step.',
    href: '/#collaborative-systems',
  },
  {
    name: 'nep.work',
    line: 'The peer-to-peer network, also called nepwork',
    intro:
      'The network our systems run on. Phones, laptops, office boxes and community servers pass sealed records directly to each other. Relays carry what they cannot read, and anyone can run one.',
    example:
      'A patient’s phone reaches a clinic’s computer across Nepal with nothing in the middle that can read the record.',
    href: '/#peer-to-peer',
  },
  {
    name: 'coplanetary.work',
    line: 'Systems for many places at once',
    intro:
      'Systems built for distance and delay. Every copy is signed, can wait, and catches up with the others within known sync times: across town, across a country when the power goes out, and one day across planets. Eventually consistent social media is the first.',
    example: 'SoMA: write once on your phone, publish to every network, keep proof it’s yours.',
    href: '/#beyond-earth',
  },
] as const;

/** The two consulting offers. Shown on the homepage and in About us's Work with us. */
export const OFFERS = [
  {
    title: 'MVP to Production',
    body: 'For teams with a working prototype and a reason to launch: a review across eight areas, a clear verdict, and a roadmap into production on systems you own.',
  },
  {
    title: 'p2p-fication',
    body: 'For organisations with systems already running: move data and workloads onto machines you own, add local business intelligence and language models, and keep working through internet and cloud outages.',
  },
] as const;

/**
 * The five threads of Technology in Nepal on the About us page (v5.1). Each `id` is the anchor
 * of its thread on /company; the homepage band and the About us jump links both read this.
 * needs_review: Nepali versions, reviewed by a native speaker.
 */
export const THREADS = [
  {
    id: 'sovereignty',
    label: 'Data at home',
    line: 'Records stay with the people and offices they belong to, under keys they hold.',
  },
  {
    id: 'ai',
    label: 'Local AI first',
    line: 'Models run on your machines, and large models abroad get only what you let through.',
  },
  {
    id: 'resilience',
    label: 'Through outages',
    line: 'Work carries on offline and catches up when the line returns.',
  },
  {
    id: 'intelligence',
    label: 'Your own intelligence',
    line: 'Reports and answers from your own record, each with its sources.',
  },
  {
    id: 'costs',
    label: 'Run it for less',
    line: 'Pay for what still needs a provider, and run the rest yourself.',
  },
] as const;

export type Product = {
  /** URL slug under the site root. */
  slug: string;
  name: string;
  shortName: string;
  audience: string;
  blurb: string;
  /** One-line summary used in cards and metadata. */
  summary: string;
  emoji: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: '/diabetes-app',
    name: 'The Diabetes App',
    shortName: 'Diabetes App',
    audience: 'For people living with diabetes',
    blurb:
      'Photograph your glucometer and lab reports, follow the plan your doctor gave you, and choose who in your family sees what. It works with no signal.',
    summary:
      'An offline-first diabetes companion, in closed pilot, free forever. Photograph your glucometer and lab reports; the number is read on your phone and you confirm it. Also called tda by cosys.',
    emoji: '🩸',
  },
  {
    slug: '/clinic-app',
    name: 'The Clinic App',
    shortName: 'Clinic App',
    audience: 'For clinicians and care teams',
    blurb:
      "In development, with a preview on request. A patient's last month on your screen before they sit down, and a plan you set that appears on their phone.",
    summary:
      'In development, preview on request: a companion app for clinics. The history a patient chooses to share arrives over an encrypted connection before the consultation starts.',
    emoji: '🩺',
  },
  {
    slug: '/soma',
    name: 'SoMA',
    shortName: 'SoMA',
    audience: 'For people who post in public',
    blurb:
      'Write once on your phone, post to every network, and keep proof that the words are yours. Anonymous by default, and joined by invitation.',
    summary:
      'SoMA: write a post on your own phone and publish it to Nostr, the Fediverse, Bluesky and the apps you already use. Every version is signed and timestamped. Anonymous by default, and joined by invitation.',
    emoji: '✍️',
  },
  {
    slug: '/platform',
    name: 'nep.work, the P2P network',
    shortName: 'nep.work',
    audience: 'The network underneath our apps',
    blurb:
      'nep.work, a peer-to-peer network that moves records directly between the devices that need them. Anything it stores on the way is sealed, and we cannot read it.',
    summary:
      'nep.work, the peer-to-peer network underneath our apps: device-to-device sync over iroh, a mailbox that holds only sealed envelopes, and verified clinic nodes.',
    emoji: '🕸️',
  },
];

export const NAV = [
  { label: 'Diabetes App', href: '/diabetes-app' },
  { label: 'Clinic App', href: '/clinic-app' },
  { label: 'SoMA', href: '/soma' },
  { label: 'Platform', href: '/platform' },
  { label: 'About us', href: '/company' },
  { label: 'Contact', href: '/contact' },
] as const;
