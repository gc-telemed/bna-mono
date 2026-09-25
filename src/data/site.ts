/**
 * Every brand name, product name and contact detail on the site lives here.
 * Rename a product in one place and the nav, footer, cards and metadata follow.
 */

export const SITE = {
  name: 'cosys.work',
  legalName: 'CoSys Work Pvt. Ltd.',
  url: 'https://cosys.work',
  tagline: 'Collaborative systems for your own care, between clinic visits.',
  description:
    'cosys.work builds collaborative systems for the care you do yourself between clinic visits, for chronic and comorbid conditions: diabetes first, then blood pressure, menopause, arthritis and more. Peer-to-peer, private and sovereign.',
} as const;

export const CONTACT = {
  email: 'hello@cosys.work',
  productEmail: 'diabetes@cosys.work',
  clinicEmail: 'clinics@cosys.work',
  locations: 'Kathmandu · Janakpur, Nepal',
} as const;

/** Where the two sign-up forms live. Every call to action points at one of these. */
export const FORMS = {
  waitlist: '/contact#waitlist',
  clinic: '/contact#clinic',
} as const;

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
      'An offline-first diabetes companion, free for patients. Photograph your glucometer and lab reports; the number is read on your phone and you confirm it. Also called tda by cosys.',
    emoji: '🩸',
  },
  {
    slug: '/clinic-app',
    name: 'The Clinic App',
    shortName: 'Clinic App',
    audience: 'For clinicians and care teams',
    blurb:
      'Coming soon. A patient\'s last month on your screen before they sit down, and a plan you set that appears on their phone.',
    summary:
      'Coming soon: a companion app for clinics. The history a patient chooses to share arrives over an encrypted connection before the consultation starts.',
    emoji: '🩺',
  },
  {
    slug: '/platform',
    name: 'The P2P Platform',
    shortName: 'P2P Platform',
    audience: 'The fabric underneath both apps',
    blurb:
      'A peer-to-peer network that moves records directly between the devices that need them. Anything it stores on the way is sealed, and we cannot read it.',
    summary:
      'The peer-to-peer network underneath both apps: device-to-device sync over iroh, a mailbox that holds only sealed envelopes, and verified clinic nodes.',
    emoji: '🕸️',
  },
];

export const NAV = [
  { label: 'Diabetes App', href: '/diabetes-app' },
  { label: 'Clinic App', href: '/clinic-app' },
  { label: 'Platform', href: '/platform' },
  { label: 'Company', href: '/company' },
  { label: 'Contact', href: '/contact' },
] as const;
