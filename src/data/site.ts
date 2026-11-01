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
