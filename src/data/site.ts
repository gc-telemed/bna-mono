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

/**
 * Tailwind classes per product accent, written out so the JIT compiler sees them.
 * The tokens resolve through `data-scheme` (see src/styles/global.css), so each accent
 * has a light-side and a dark-side value and stays legible in all four themes.
 */
export const ACCENT: Record<
  Product['accent'],
  { chip: string; text: string; bar: string; ring: string }
> = {
  amber: {
    chip: 'border-accent-diabetes/30 bg-accent-diabetes-tint text-accent-diabetes',
    text: 'text-accent-diabetes',
    bar: 'bg-accent-diabetes',
    ring: 'group-hover:border-accent-diabetes/40',
  },
  indigo: {
    chip: 'border-accent-clinic/30 bg-accent-clinic-tint text-accent-clinic',
    text: 'text-accent-clinic',
    bar: 'bg-accent-clinic',
    ring: 'group-hover:border-accent-clinic/40',
  },
  violet: {
    chip: 'border-accent-platform/30 bg-accent-platform-tint text-accent-platform',
    text: 'text-accent-platform',
    bar: 'bg-accent-platform',
    ring: 'group-hover:border-accent-platform/40',
  },
};
