/**
 * Every brand name, product name and contact detail on the site lives here.
 * Rename a product in one place and the nav, footer, cards and metadata follow.
 */

export const SITE = {
  name: 'cosys.work',
  legalName: 'CoSys Work Pvt. Ltd.',
  url: 'https://cosys.work',
  tagline: 'Health software that leaves your data where it belongs.',
  description:
    'cosys.work builds offline-first, peer-to-peer health software. The Diabetes App for patients, the Clinic App for care teams, and the P2P platform that connects them — with medical records that never touch a corporate server.',
} as const;

export const CONTACT = {
  email: 'hello@cosys.work',
  productEmail: 'diabetes@cosys.work',
  clinicEmail: 'clinics@cosys.work',
  locations: 'Kathmandu · Janakpur, Nepal',
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
  accent: 'amber' | 'indigo' | 'violet';
  emoji: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: '/diabetes-app',
    name: 'The Diabetes App',
    shortName: 'Diabetes App',
    audience: 'For people living with diabetes',
    blurb:
      'Take-a-picture logging, a private on-device AI, and your trusted circle — all of it running on your phone, with or without a signal.',
    summary:
      'An offline-first diabetes companion. Photograph your glucometer, labs, meals and medication; the on-device AI drafts the entry and you confirm it.',
    accent: 'amber',
    emoji: '🩸',
  },
  {
    slug: '/clinic-app',
    name: 'The Clinic App',
    shortName: 'Clinic App',
    audience: 'For clinicians and care teams',
    blurb:
      'Patient history arrives structured and current before the consultation starts. Less transcription, more care.',
    summary:
      'A companion app for clinics. Patient logs sync straight to the dashboard over an encrypted local connection, so the consultation starts with the full picture.',
    accent: 'indigo',
    emoji: '🩺',
  },
  {
    slug: '/platform',
    name: 'The P2P Platform',
    shortName: 'P2P Platform',
    audience: 'The fabric underneath both apps',
    blurb:
      'A peer-to-peer trust network that moves medical records directly between the devices that need them — and nowhere else.',
    summary:
      'The peer-to-peer trust network underneath cosys.work apps: device-to-device sync, verified institutional nodes, and a plugin marketplace with no central gatekeeper.',
    accent: 'violet',
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

/** Tailwind classes per product accent, written out so the JIT compiler sees them. */
export const ACCENT: Record<
  Product['accent'],
  { chip: string; text: string; bar: string; ring: string }
> = {
  amber: {
    chip: 'border-amber-300 bg-amber-100 text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-300',
    text: 'text-amber-600 dark:text-amber-300',
    bar: 'bg-amber-400',
    ring: 'group-hover:border-amber-300 dark:group-hover:border-amber-400/40',
  },
  indigo: {
    chip: 'border-indigo-300 bg-indigo-100 text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-400/10 dark:text-indigo-300',
    text: 'text-indigo-600 dark:text-indigo-300',
    bar: 'bg-indigo-400',
    ring: 'group-hover:border-indigo-300 dark:group-hover:border-indigo-400/40',
  },
  violet: {
    chip: 'border-violet-300 bg-violet-100 text-violet-700 dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-300',
    text: 'text-violet-600 dark:text-violet-300',
    bar: 'bg-violet-400',
    ring: 'group-hover:border-violet-300 dark:group-hover:border-violet-400/40',
  },
};
