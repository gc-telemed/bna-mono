/**
 * The app preview: a working replica of the diabetes app's UI, in the browser.
 *
 * It is built from the product's own material — the icons and feed illustrations redrawn
 * from its `src/ui/`, the type scale and per-script line heights from its theme, its
 * English and Nepali strings, and the fifty-three values its lab reader pulls from a
 * de-identified report (`@/data/app-preview-rows`).
 *
 * **Colour comes from the site, not from here.** The phone paints with the same `--p-*`
 * tokens every other surface on cosys.work uses, so the visitor's theme choice in the
 * header changes the phone with the page. The four clinical tokens the site deliberately
 * left behind — the illustration trio and the chart's target band — are supplied per theme
 * by `AppPreview.astro`, which is the only place they are needed.
 *
 * Nothing here saves, and no value shown belongs to a patient.
 */
import { LAB_ROWS, type LabRow } from '@/data/app-preview-rows';

// ── strings ───────────────────────────────────────────────────────────────────
// Lifted from the app's own `en.json` and `ne.json`, which is why the Nepali is real
// Nepali rather than a gloss.
type Lang = 'en' | 'ne';

const S: Record<string, Record<Lang, string>> = {
  'app.name': { en: 'TApp', ne: 'TApp' },
  'tabs.home': { en: 'Home', ne: 'गृह' },
  'tabs.timeline': { en: 'My record', ne: 'मेरो रेकर्ड' },
  'tabs.capture': { en: 'Add', ne: 'थप्नुहोस्' },
  'tabs.plan': { en: 'Plan', ne: 'योजना' },
  'tabs.more': { en: 'More', ne: 'थप' },

  'home.today': { en: 'Today', ne: 'आज' },
  'home.lastGlucose': { en: 'Last reading', ne: 'पछिल्लो रिडिङ' },
  'home.entriesToday': { en: '3 entries today', ne: 'आज ३ प्रविष्टि' },
  'home.recentWindow': {
    en: 'Written on 5 of the last 7 days',
    ne: 'पछिल्लो ७ दिनमध्ये ५ दिन लेखियो',
  },
  'home.nextReminder': { en: 'Next reminder', ne: 'अर्को रिमाइन्डर' },

  // F28's daily return: three facts, each one arithmetic over something the patient typed
  // in themselves. Never an average, never a direction, never a word about what any of it
  // means — the subject of every sentence is a patient action or a date they transcribed,
  // and never a body measurement (ADR-09 §B.1).
  'home.daily.title': { en: 'What has been written down', ne: 'के के लेखिएको छ' },
  'home.daily.lastReading': {
    en: 'The last reading was written down yesterday',
    ne: 'अन्तिम नाप हिजो लेखिएको हो',
  },
  'home.daily.nextLabs': {
    en: 'Next lab test in the plan: 14 Nov 2026 · HbA1c, lipid profile',
    ne: 'योजनामा भएको अर्को ल्याब जाँच: 14 Nov 2026 · HbA1c, lipid profile',
  },
  'home.daily.sinceReport': {
    en: 'Since the report on 12 Aug 2026, 46 readings have been written down',
    ne: '12 Aug 2026 को रिपोर्टपछि ४६ नाप लेखिएका छन्',
  },

  'hypo.title': { en: 'If I feel low', ne: 'सुगर घटेको जस्तो लाग्यो भने' },
  'hypo.log': { en: 'Log a low sugar', ne: 'सुगर घटेको लेख्नुहोस्' },
  'hypo.call': { en: 'Call Sabina', ne: 'सबिना लाई फोन गर्नुहोस्' },
  'plan.transcribedNote': {
    en: 'This is what you wrote down from your doctor. The app does not change it or add to it.',
    ne: 'यो तपाईंले डाक्टरबाट लेख्नुभएको कुरा हो। एप्ले यसमा केही थप्दैन वा बदल्दैन।',
  },

  'timeline.title': { en: 'My log', ne: 'मेरो रेकर्ड' },
  'timeline.filterLabel': { en: 'Show', ne: 'देखाउनुहोस्' },
  'timeline.filterAll': { en: 'Everything', ne: 'सबै' },
  'timeline.today': { en: 'Today', ne: 'आज' },
  'timeline.yesterday': { en: 'Yesterday', ne: 'हिजो' },
  'timeline.end': {
    en: 'That is everything written down so far.',
    ne: 'अहिलेसम्म लेखिएको सबै यति नै हो।',
  },

  'documents.title': { en: 'Documents', ne: 'कागजातहरू' },
  'documents.reviewTitle': {
    en: 'Tick the values you want to keep',
    ne: 'राख्न चाहेका मानहरूमा टिक लगाउनुहोस्',
  },
  'documents.reviewBody': {
    en: 'These were read from your report. Nothing is kept unless you tick it.',
    ne: 'यी तपाईंको रिपोर्टबाट पढिएका हुन्। टिक नलगाएसम्म केही राखिँदैन।',
  },
  'documents.reportDate': { en: 'Date on the report', ne: 'रिपोर्टमा लेखिएको मिति' },
  'documents.takeAll': { en: 'Take every value', ne: 'सबै मान लिनुहोस्' },
  'documents.takeNone': { en: 'Take none of them', ne: 'कुनै पनि नलिनुहोस्' },
  'documents.checkThis': {
    en: 'Worth checking against the report',
    ne: 'रिपोर्टसँग मिलाएर हेर्नुहोस्',
  },
  'documents.valueLabel': { en: 'Value', ne: 'मान' },
  'documents.unitLabel': { en: 'Unit', ne: 'एकाइ' },
  'documents.keptEitherWay': {
    en: 'The document will be kept even if you tick nothing.',
    ne: 'टिक नलगाए पनि कागजात राखिनेछ।',
  },
  'documents.truncated': {
    en: 'This document is longer than 10 pages. The whole document will be kept; the first 10 pages are the ones that were read.',
    ne: 'यो कागजात १० पृष्ठभन्दा लामो छ। पूरै कागजात राखिनेछ; पहिलो १० पृष्ठ मात्र पढिएका हुन्।',
  },

  'settings.title': { en: 'Settings', ne: 'सेटिङ' },
  'settings.groupApp': { en: 'This app', ne: 'यो एप' },
  'settings.groupData': { en: 'Your data', ne: 'तपाईंको डेटा' },
  'settings.language': { en: 'Language', ne: 'भाषा' },
  'settings.units': { en: 'Glucose unit', ne: 'ग्लुकोज युनिट' },
  'settings.unitsHint': {
    en: 'Changes how readings are shown. What you have already written stays the same.',
    ne: 'रिडिङ कसरी देखिन्छ भन्ने बदल्छ। लेखिसकेको कुरा उस्तै रहन्छ।',
  },
  'settings.lock': { en: 'Lock', ne: 'लक' },
  'settings.lockDevice': {
    en: 'TApp opens with your fingerprint or your phone’s screen lock. It has no password of its own.',
    ne: 'TApp तपाईंको औंठाछाप वा फोनको स्क्रिन लकले खुल्छ। यसको आफ्नै पासवर्ड छैन।',
  },
  'settings.lists': { en: 'My medicine names', ne: 'मेरा औषधिका नाम' },
  'settings.deleteAll': { en: 'Delete everything', ne: 'सबै मेटाउनुहोस्' },
  'settings.deleteAllBody': {
    en: 'Removes your whole record from this phone. A backup file you already sent somewhere is not touched.',
    ne: 'तपाईंको पूरा रेकर्ड यो फोनबाट हट्छ। पहिले कतै पठाइसकेको ब्याकअप फाइललाई यसले छुँदैन।',
  },
  'settings.storage': { en: 'Photos and voice notes', ne: 'तस्बिर र आवाज नोट' },
  'settings.storageBody': {
    en: 'Everything you attached, on this phone only.',
    ne: 'तपाईंले जोड्नुभएको सबै, यही फोनमा मात्र।',
  },
  'settings.storageEntries': { en: 'Entries written down', ne: 'लेखिएका प्रविष्टि' },
  'settings.assistantBody': {
    en: 'A screen that looks things up in what you wrote down. It gives no medical advice.',
    ne: 'तपाईंले लेखेको कुरामा हेर्ने स्क्रिन। यसले चिकित्सकीय सल्लाह दिँदैन।',
  },
  'settings.about': { en: 'About', ne: 'बारेमा' },

  'more.title': { en: 'More', ne: 'थप' },
  'more.body': {
    en: 'The things you reach for around a clinic visit, and the app’s own settings.',
    ne: 'क्लिनिक जाँदा चाहिने कुराहरू, र एपका सेटिङहरू।',
  },
  'summary.title': { en: 'Visit summary', ne: 'भेट सारांश' },
  'summary.subtitle': {
    en: 'A record to take to your next appointment',
    ne: 'अर्को भेटमा लैजाने रेकर्ड',
  },
  'backup.title': { en: 'Backup', ne: 'ब्याकअप' },
  'backup.lastBackup': {
    en: 'Last backup: 14 Sep 2026',
    ne: 'पछिल्लो ब्याकअप: १४ सेप्टेम्बर २०२६',
  },
  'reminders.title': { en: 'Reminders', ne: 'रिमाइन्डर' },
  'reminders.body': { en: 'Medicines, visits and lab tests', ne: 'औषधि, भेट र ल्याब परीक्षण' },
  'appearance.title': { en: 'Appearance', ne: 'रूप' },
  'appearance.rowBody': {
    en: 'Light or dark, and which colours',
    ne: 'उज्यालो वा अँध्यारो, र कुन रङहरू',
  },
  'disclaimer.line': {
    en: 'TApp keeps the record you write down. It does not give medical advice, and it does not replace your doctor or your clinic.',
    ne: 'TApp ले तपाईंले लेखेको रेकर्ड राख्छ। यसले चिकित्सकीय सल्लाह दिँदैन, र तपाईंको डाक्टर वा क्लिनिकको ठाउँ लिँदैन।',
  },

  'assistant.title': { en: 'Ask about your logs', ne: 'आफ्नो लगबारे सोध्नुहोस्' },
  'assistant.placeholder': {
    en: 'Ask about what you wrote down',
    ne: 'तपाईंले लेखेको कुराबारे सोध्नुहोस्',
  },
  'assistant.send': { en: 'Ask', ne: 'सोध्नुहोस्' },
  'assistant.emptyBody': {
    en: 'This looks things up in your own record and opens the right screen. It does not answer medical questions.',
    ne: 'यसले तपाईंकै रेकर्डमा हेर्छ र ठीक स्क्रिन खोल्छ। यसले चिकित्सकीय प्रश्नको जवाफ दिँदैन।',
  },
  'assistant.finePrint': {
    en: 'Answers come from your own logs. This is not medical advice.',
    ne: 'जवाफहरू तपाईंकै लगबाट आउँछन्। यो चिकित्सकीय सल्लाह होइन।',
  },
  'assistant.example.question': {
    en: '“average fasting sugar this week”',
    ne: '“यो साता बिहानको चिनीको औसत”',
  },
  'assistant.example.action': {
    en: '“add glucose 140 before lunch”',
    ne: '“खाना अघिको चिनी १४० थप”',
  },
  'assistant.example.plan': {
    en: '“what did the doctor say about my medicines”',
    ne: '“डाक्टरले औषधिबारे के भन्नुभयो”',
  },
  'assistant.example.reminder': {
    en: '“remind me at 9 pm to check sugar”',
    ne: '“बेलुका ९ बजे सम्झाइदेऊ”',
  },
  'assistant.answer': {
    en: 'Your fasting average over the last 7 days is 128 mg/dL.',
    ne: 'पछिल्लो ७ दिनको खाली पेटको औसत १२८ mg/dL छ।',
  },
  'assistant.basedOn': {
    en: 'From 9 entries you wrote down',
    ne: 'तपाईंले लेखेको ९ रेकर्डबाट',
  },
  'assistant.disclaimer': {
    en: 'This is a summary of your own logs. It is not medical advice. Ask your doctor before changing any treatment.',
    ne: 'यो तपाईंकै रेकर्डको सारांश हो। यो चिकित्सकीय सल्लाह होइन। उपचारमा केही फेर्नुअघि आफ्नो डाक्टरसँग सोध्नुहोस्।',
  },

  'chooser.title': { en: 'What is this a photo of?', ne: 'यो केको तस्बिर हो?' },
  'chooser.body': {
    en: 'Pick one and the photo goes with it. You can change it on the next screen.',
    ne: 'एउटा छान्नुहोस्, तस्बिर त्यसैसँग जान्छ। अर्को स्क्रिनमा बदल्न सकिन्छ।',
  },
  'chooser.glucose': { en: 'A meter reading', ne: 'मिटरको रिडिङ' },
  'chooser.glucoseBody': {
    en: 'A number on a glucometer screen',
    ne: 'ग्लुकोमिटरको स्क्रिनमा देखिने अंक',
  },
  'chooser.lab': { en: 'A lab report', ne: 'ल्याब रिपोर्ट' },
  'chooser.labBody': { en: 'A printed sheet of results', ne: 'नतिजा छापिएको कागज' },
  'chooser.meal': { en: 'A meal', ne: 'खाना' },
  'chooser.mealBody': {
    en: 'Food, kept with your own tag',
    ne: 'खाना, तपाईंकै ट्यागसहित राखिन्छ',
  },
  'chooser.document': { en: 'Something else to keep', ne: 'राख्नुपर्ने अरू कुरा' },
  'chooser.documentBody': {
    en: 'A prescription, a slip, a note from the clinic',
    ne: 'प्रेस्क्रिप्सन, पर्ची, क्लिनिकको नोट',
  },
  'capture.modePhoto': { en: 'Photo', ne: 'तस्बिर' },
  'capture.modeType': { en: 'Type', ne: 'टाइप' },
  'capture.modeSpeak': { en: 'Speak', ne: 'बोल्नुहोस्' },
  'capture.hint': {
    en: 'Point at the meter, the report or the plate',
    ne: 'मिटर, रिपोर्ट वा थालतिर देखाउनुहोस्',
  },

  'kind.glucose': { en: 'Glucose', ne: 'ग्लुकोज' },
  'kind.medication': { en: 'Medicine', ne: 'औषधि' },
  'kind.lab': { en: 'Lab result', ne: 'ल्याब नतिजा' },
  'kind.meal': { en: 'Meal', ne: 'खाना' },
  'context.fasting': { en: 'Fasting', ne: 'खाली पेट' },
  'context.afterMeal': { en: 'After a meal', ne: 'खानापछि' },

  'plan.title': { en: 'Doctor’s plan', ne: 'डाक्टरको योजना' },
  'plan.effectiveFrom': { en: 'From 12 Aug 2026', ne: '१२ अगस्ट २०२६ देखि' },
  'plan.targets': { en: 'Target range', ne: 'लक्ष्य दायरा' },
  'plan.medicines': { en: 'Medicines', ne: 'औषधिहरू' },
  'plan.nextVisit': { en: 'Next visit', ne: 'अर्को भेट' },
  'plan.nextLabs': { en: 'Next lab tests', ne: 'अर्को ल्याब परीक्षण' },
  'plan.doctor': { en: 'Dr. Sharma · Star Hospital', ne: 'डा. शर्मा · स्टार हस्पिटल' },
};

const t = (key: string): string => S[key]?.[state.lang] ?? key;
const esc = (value: string): string =>
  value.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

// ── icons ─────────────────────────────────────────────────────────────────────
// The app's own six, redrawn: plain line work on one 24-unit grid, following the palette,
// and never carrying meaning without a label beside it — except the assistant's spark,
// which lost its label by founder call on 18 Sep 2026.
const icon = (body: string, size = 24): string =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" aria-hidden="true"
     stroke="currentColor" stroke-width="1.8">${body}</svg>`;

const ICONS = {
  home: () =>
    icon(`<path d="M3.5 10.5 12 3.5l8.5 7v9a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z" stroke-linejoin="round"/>
          <path d="M9.5 20.5v-6h5v6" stroke-linejoin="round"/>`),
  timeline: () =>
    icon(`<path d="M6 3.5v17" stroke-linecap="round"/>
          <circle cx="6" cy="8" r="2.2"/><circle cx="6" cy="16" r="2.2"/>
          <path d="M10.5 8h8M10.5 16h6" stroke-linecap="round"/>`),
  camera: (size = 24) =>
    icon(
      `<rect x="2.5" y="6.5" width="19" height="14" rx="3"/>
       <path d="M8.5 6.5 9.8 3.8h4.4l1.3 2.7" stroke-linejoin="round"/>
       <circle cx="12" cy="13.5" r="4"/>`,
      size,
    ),
  plan: () =>
    icon(`<rect x="4.5" y="3" width="15" height="18" rx="2.5"/>
          <path d="m8 9.5 1.8 1.8L13 8" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 15.5h8" stroke-linecap="round"/>`),
  more: () =>
    icon(`<circle cx="5.5" cy="12" r="1.6" fill="currentColor" stroke="none"/>
          <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/>
          <circle cx="18.5" cy="12" r="1.6" fill="currentColor" stroke="none"/>`),
  assistant: (size = 26) =>
    icon(
      `<path d="M11 3.2c1.15 4.3 2.5 5.65 6.8 6.8-4.3 1.15-5.65 2.5-6.8 6.8-1.15-4.3-2.5-5.65-6.8-6.8 4.3-1.15 5.65-2.5 6.8-6.8Z" fill="currentColor" stroke-linejoin="round"/>
       <path d="M17.8 14.4c.5 1.85 1.05 2.4 2.9 2.9-1.85.5-2.4 1.05-2.9 2.9-.5-1.85-1.05-2.4-2.9-2.9 1.85-.5 2.4-1.05 2.9-2.9Z" fill="currentColor" stroke-linejoin="round"/>`,
      size,
    ),
};

// ── illustrations ─────────────────────────────────────────────────────────────
// Four of the app's thirteen, on the same 120-unit frame. The rolling window is the one
// that matters: seven bars, three of them quiet, and a quiet bar is the paper colour —
// never a red or an amber, because a gap is an absence of data, not a failure.
function illustration(body: string, size = 56): string {
  return `<svg viewBox="0 0 120 120" width="${size}" height="${size}" aria-hidden="true" style="flex:none">
    <circle cx="60" cy="60" r="56" fill="var(--ill-fill)"></circle>${body}</svg>`;
}

const ILLUSTRATIONS = {
  reading: () =>
    illustration(`
      <rect x="38" y="26" width="44" height="68" rx="8" fill="var(--p-surface)" stroke="var(--ill-ink)" stroke-width="3"/>
      <rect x="46" y="36" width="28" height="20" rx="3" fill="var(--ill-accent)" opacity="0.35" stroke="var(--ill-ink)" stroke-width="2"/>
      <line x1="50" y1="66" x2="70" y2="66" stroke="var(--ill-ink)" stroke-width="2" opacity="0.5"/>
      <line x1="50" y1="74" x2="64" y2="74" stroke="var(--ill-ink)" stroke-width="2" opacity="0.5"/>
      <rect x="54" y="84" width="12" height="4" rx="2" fill="var(--ill-ink)" opacity="0.5"/>`),
  window: () =>
    illustration(
      [24, 36, 48, 60, 72, 84, 96]
        .map((x, index) => {
          const filled = [true, true, false, true, false, true, false][index]!;
          return `<rect x="${x - 4}" y="${filled ? 44 : 60}" width="8" height="${filled ? 36 : 20}" rx="4"
            fill="${filled ? 'var(--ill-accent)' : 'var(--p-surface)'}" stroke="var(--ill-ink)" stroke-width="2"/>`;
        })
        .join('') +
        `<line x1="16" y1="84" x2="104" y2="84" stroke="var(--ill-ink)" stroke-width="3" stroke-linecap="round"/>`,
    ),
  reminder: () =>
    illustration(`
      <rect x="26" y="34" width="68" height="56" rx="6" fill="var(--p-surface)" stroke="var(--ill-ink)" stroke-width="3"/>
      <line x1="26" y1="50" x2="94" y2="50" stroke="var(--ill-ink)" stroke-width="2"/>
      <line x1="42" y1="26" x2="42" y2="40" stroke="var(--ill-ink)" stroke-width="3" stroke-linecap="round"/>
      <line x1="78" y1="26" x2="78" y2="40" stroke="var(--ill-ink)" stroke-width="3" stroke-linecap="round"/>
      <circle cx="60" cy="70" r="10" fill="var(--ill-accent)" stroke="var(--ill-ink)" stroke-width="2"/>`),
  summary: () =>
    illustration(`
      <rect x="40" y="22" width="44" height="54" rx="4" fill="var(--p-surface)" stroke="var(--ill-ink)" stroke-width="2"/>
      <line x1="48" y1="34" x2="76" y2="34" stroke="var(--ill-ink)" stroke-width="2" opacity="0.5"/>
      <line x1="48" y1="44" x2="70" y2="44" stroke="var(--ill-ink)" stroke-width="2" opacity="0.5"/>
      <path d="M22 60 h76 v30 a4 4 0 0 1 -4 4 H26 a4 4 0 0 1 -4 -4 Z" fill="var(--ill-accent)" stroke="var(--ill-ink)" stroke-width="3" stroke-linejoin="round"/>
      <path d="M22 60 60 82 98 60" fill="none" stroke="var(--ill-ink)" stroke-width="2" stroke-linejoin="round"/>`),
};

// ── state ─────────────────────────────────────────────────────────────────────
type ScreenId =
  'home' | 'record' | 'capture' | 'chooser' | 'lab' | 'assistant' | 'plan' | 'more' | 'settings';

const TAB_ROOTS: ScreenId[] = ['home', 'record', 'plan', 'more'];

const state = {
  lang: 'en' as Lang,
  screen: 'home' as ScreenId,
  filter: 'all',
  accepted: new Set<number>(),
  /** Which ticked rows are open for editing — taking a section must not unfold fifty-three. */
  open: new Set<number>(),
  edits: new Map<number, string>(),
  asked: false,
};

// ── chrome ────────────────────────────────────────────────────────────────────
const statusBar = (): string =>
  `<div class="status"><span>9:41</span>
     <span class="status-right"><span class="dot"></span>airplane mode</span></div>`;

const header = (title: string, back = false): string =>
  `<div class="appbar">
     ${back ? '<button class="iconbtn" data-act="back" aria-label="Back">←</button>' : ''}
     <h2>${esc(title)}</h2></div>`;

/**
 * Four tabs and a centre action that is never selected, each with its icon *and* its label.
 *
 * The selected tab carries a bar above its glyph and a heavier stroke through it, because
 * hue alone does not survive greyscale or a colour vision deficiency (design review F16).
 * The bar is in the markup in both states and merely transparent when idle, so selecting a
 * tab never moves the icon by a pixel.
 */
function tabBar(): string {
  const tab = (id: ScreenId, key: string, glyph: string) =>
    `<button class="tab ${state.screen === id ? 'on' : ''}" data-act="tab" data-to="${id}">
       <span class="glyph"><span class="indicator"></span>${glyph}</span>
       <span>${esc(t(key))}</span></button>`;
  return `<nav class="tabbar">
    ${tab('home', 'tabs.home', ICONS.home())}
    ${tab('record', 'tabs.timeline', ICONS.timeline())}
    <button class="capture-slot" data-act="tab" data-to="capture">
      <span class="capture-disc">${ICONS.camera(24)}</span>
      <span>${esc(t('tabs.capture'))}</span></button>
    ${tab('plan', 'tabs.plan', ICONS.plan())}
    ${tab('more', 'tabs.more', ICONS.more())}
  </nav>`;
}

/** The assistant: a disc with a spark, over the four tab roots. */
const assistantFab = (): string =>
  `<button class="fab" data-act="go" data-to="assistant" aria-label="${esc(t('assistant.title'))}">
     ${ICONS.assistant()}</button>`;

const feedHeading = (art: string, label: string): string =>
  `<div class="feedhead">${art}<span class="label">${esc(label)}</span></div>`;

const listRow = (title: string, subtitle = '', value = '', attrs = ''): string =>
  `<button class="listrow" ${attrs}>
     <span class="rowtext"><span class="strong">${esc(title)}</span>${
       subtitle ? `<span class="caption">${esc(subtitle)}</span>` : ''
     }</span>
     ${value ? `<span class="rowvalue">${esc(value)}</span>` : ''}</button>`;

// ── screens ───────────────────────────────────────────────────────────────────
/**
 * **Home draws no app bar** (founder, 2026-09-21). It said `TApp` — the name of the app the
 * visitor has just opened — and charged a full header's height on the one screen where
 * vertical space is scarcest: the today card, the rolling window, the hypo card and two
 * returns all compete for it. The other three tab roots keep theirs, because "My record",
 * "Plan" and "More" name the screen rather than the app.
 */
function home(): string {
  return `
  <div class="scroll scroll-inset">
    <div class="card">
      ${feedHeading(ILLUSTRATIONS.reading(), t('home.today'))}
      <div class="reading">
        <span class="metric">140 mg/dL</span>
        <span class="caption">${esc(t('home.lastGlucose'))} · ${esc(t('context.fasting'))} · 07:12</span>
      </div>
      <span class="caption">${esc(t('home.entriesToday'))}</span>
    </div>

    <div class="card quiet">
      ${feedHeading(ILLUSTRATIONS.window(), t('timeline.title'))}
      <span class="strong">${esc(t('home.recentWindow'))}</span>
    </div>

    <div class="card list">
      <span class="label">${esc(t('home.today'))}</span>
      ${listRow('140 mg/dL', `${t('kind.glucose')} · ${t('context.fasting')}`, '07:12')}
      ${listRow('Metformin 500 mg', t('kind.medication'), '08:10')}
      ${listRow('HbA1c 7.2%', `${t('kind.lab')} · 16 Sep`, '13:40')}
    </div>

    <div class="card tinted">
      <span class="label">${esc(t('hypo.title'))}</span>
      <span>“Take what I told you and call the clinic if it happens twice in a week.”</span>
      <span class="caption">${esc(t('plan.transcribedNote'))}</span>
      <button class="secondary">${esc(t('hypo.log'))}</button>
      <button class="secondary">${esc(t('hypo.call'))}</button>
    </div>

    <!--
      F28's daily return, and it renders *below* the hypo card on purpose: a new card above
      would push the hypo card's last button further under the fold on a fresh install, for
      the sake of a return that can wait three seconds.
    -->
    <div class="card quiet">
      <span class="label">${esc(t('home.daily.title'))}</span>
      <span>${esc(t('home.daily.lastReading'))}</span>
      <span>${esc(t('home.daily.nextLabs'))}</span>
      <span>${esc(t('home.daily.sinceReport'))}</span>
    </div>

    <div class="card">
      ${feedHeading(ILLUSTRATIONS.reminder(), t('home.nextReminder'))}
      ${listRow('Metformin', '', '20:00')}
    </div>

    <div class="card">
      ${feedHeading(ILLUSTRATIONS.summary(), t('summary.title'))}
      ${listRow(t('summary.subtitle'))}
    </div>

    <p class="disclaimer">${esc(t('disclaimer.line'))}</p>
  </div>`;
}

function record(): string {
  const filters: [string, string][] = [
    ['all', t('timeline.filterAll')],
    ['glucose', t('kind.glucose')],
    ['medication', t('kind.medication')],
    ['lab_result', t('kind.lab')],
  ];
  const days: { day: string; rows: [string, string, string, string][] }[] = [
    {
      day: t('timeline.today'),
      rows: [
        ['140 mg/dL', 'glucose', `${t('kind.glucose')} · ${t('context.fasting')}`, '07:12'],
        ['Metformin 500 mg', 'medication', t('kind.medication'), '08:10'],
        ['HbA1c 7.2%', 'lab_result', `${t('kind.lab')} · 16 Sep`, '13:40'],
        ['Creatinine 0.7 mg/dL', 'lab_result', `${t('kind.lab')} · 16 Sep`, '13:40'],
      ],
    },
    {
      day: t('timeline.yesterday'),
      rows: [
        ['186 mg/dL', 'glucose', `${t('kind.glucose')} · ${t('context.afterMeal')}`, '21:05'],
        ['Dal bhat, amber', 'meal', t('kind.meal'), '20:10'],
        ['122 mg/dL', 'glucose', `${t('kind.glucose')} · ${t('context.fasting')}`, '06:58'],
      ],
    },
  ];
  const visible = (kind: string) => state.filter === 'all' || state.filter === kind;

  return `${header(t('timeline.title'))}
  <div class="scroll">
    <div class="card">
      <span class="label">${esc(t('timeline.filterLabel'))}</span>
      <div class="chips">
        ${filters
          .map(
            ([value, label]) =>
              `<button class="chip ${state.filter === value ? 'on' : ''}" data-act="filter" data-to="${value}">${esc(label)}</button>`,
          )
          .join('')}
      </div>
    </div>
    ${days
      .map((group) => {
        const rows = group.rows.filter(([, kind]) => visible(kind));
        if (rows.length === 0) return '';
        return `<span class="daylabel">${esc(group.day)}</span>
          <div class="card list">${rows
            .map(([title, , subtitle, time]) => listRow(title, subtitle, time))
            .join('')}</div>`;
      })
      .join('')}
    <p class="caption centre">${esc(t('timeline.end'))}</p>
  </div>`;
}

const capture = (): string => `<div class="viewfinder">
  ${statusBar()}
  <div class="vf-body"><div class="vf-frame"><span>${esc(t('capture.hint'))}</span></div></div>
  <div class="vf-strip">
    <button class="mode on">${esc(t('capture.modePhoto'))}</button>
    <button class="mode">${esc(t('capture.modeType'))}</button>
    <button class="mode">${esc(t('capture.modeSpeak'))}</button>
  </div>
  <button class="shutter" data-act="go" data-to="chooser" aria-label="Shutter"></button>
</div>`;

function chooser(): string {
  const option = (key: string, bodyKey: string, to: ScreenId | '') =>
    `<button class="option" ${to ? `data-act="go" data-to="${to}"` : ''}>
       <span class="strong">${esc(t(key))}</span>
       <span class="caption">${esc(t(bodyKey))}</span></button>`;
  return `${header(t('chooser.title'), true)}
  <div class="scroll">
    <p class="muted">${esc(t('chooser.body'))}</p>
    ${option('chooser.glucose', 'chooser.glucoseBody', '')}
    ${option('chooser.lab', 'chooser.labBody', 'lab')}
    ${option('chooser.meal', 'chooser.mealBody', '')}
    ${option('chooser.document', 'chooser.documentBody', '')}
  </div>`;
}

function groupsOfRows(): { title: string; rows: { row: LabRow; index: number }[] }[] {
  const groups: { title: string; rows: { row: LabRow; index: number }[] }[] = [];
  LAB_ROWS.forEach((row, index) => {
    const last = groups[groups.length - 1];
    if (last && last.title === row.section) last.rows.push({ row, index });
    else groups.push({ title: row.section, rows: [{ row, index }] });
  });
  for (const group of groups) {
    group.rows.sort((a, b) => Number(b.row.confidence >= 0.6) - Number(a.row.confidence >= 0.6));
  }
  return groups;
}

function lab(): string {
  const chosen = state.accepted.size;
  const everyOne = chosen === LAB_ROWS.length;
  return `${header(t('documents.title'), true)}
  <div class="scroll">
    <div class="card quiet">
      <span class="subheading">${esc(t('documents.reviewTitle'))}</span>
      <span class="caption">${esc(t('documents.reviewBody'))}</span>
      <span class="caption">${esc(t('documents.truncated'))}</span>
    </div>
    <div class="card">
      <span class="label">${esc(t('documents.reportDate'))}</span>
      <div class="field">2026-09-16</div>
    </div>
    <div class="card">
      <span class="strong">${
        state.lang === 'ne'
          ? `${LAB_ROWS.length} मध्ये ${chosen} छानिएको`
          : `${chosen} of ${LAB_ROWS.length} chosen`
      }</span>
      <button class="secondary" data-act="all">${esc(
        everyOne ? t('documents.takeNone') : t('documents.takeAll'),
      )}</button>
    </div>
    ${groupsOfRows().map(labGroup).join('')}
    <p class="caption">${esc(t('documents.keptEitherWay'))}</p>
  </div>
  <div class="footerbar">
    <button class="primary">${
      state.lang === 'ne'
        ? `कागजात र ${chosen} मान सुरक्षित गर्नुहोस्`
        : chosen === 0
          ? 'Save the document'
          : `Save the document and ${chosen} value${chosen === 1 ? '' : 's'}`
    }</button>
  </div>`;
}

const labGroup = (
  group: { title: string; rows: { row: LabRow; index: number }[] },
  gi: number,
): string => `<div class="card list">
  <div class="grouphead">
    <span class="label">${esc(group.title || t('documents.title'))}</span>
    <button class="link" data-act="section" data-group="${gi}">${
      state.lang === 'ne' ? `यी ${group.rows.length} लिनुहोस्` : `Take these ${group.rows.length}`
    }</button>
  </div>
  ${group.rows.map(({ row, index }) => labRow(row, index)).join('')}
</div>`;

function labRow(row: LabRow, index: number): string {
  const on = state.accepted.has(index);
  const isOpen = on && state.open.has(index);
  const value = state.edits.get(index) ?? String(row.value);
  return `<div class="labrow ${on ? 'on' : ''}">
    <div class="rowsplit">
      <button class="tickrow" data-act="tick" data-i="${index}" role="checkbox" aria-checked="${on}">
        <span class="box">${on ? '✓' : ''}</span>
        <span class="rowtext">
          <span class="strong">${esc(row.label)}</span>
          ${row.confidence < 0.6 ? `<span class="caption">${esc(t('documents.checkThis'))}</span>` : ''}
        </span>
      </button>
      <button class="rowvalue tap" data-act="open" data-i="${index}" aria-label="Edit ${esc(row.label)}">${esc(
        value,
      )}${row.unit ? ` ${esc(row.unit)}` : ''}</button>
    </div>
    ${
      isOpen
        ? `<div class="editor">
             <label class="editfield"><span class="caption">${esc(t('documents.valueLabel'))}</span>
               <input value="${esc(value)}" data-act="edit" data-i="${index}" inputmode="decimal"></label>
             <label class="editfield unit"><span class="caption">${esc(t('documents.unitLabel'))}</span>
               <input value="${esc(row.unit)}" readonly></label>
           </div>`
        : ''
    }
  </div>`;
}

function assistant(): string {
  const examples = ['question', 'action', 'plan', 'reminder']
    .map((key) => `<span class="caption">${esc(t(`assistant.example.${key}`))}</span>`)
    .join('');
  return `${header(t('assistant.title'), true)}
  <div class="scroll">
    ${
      state.asked
        ? `<div class="card ask"><span>${esc(t('assistant.example.question'))}</span></div>
           <div class="card">
             <span class="strong">${esc(t('assistant.answer'))}</span>
             <span class="caption">${esc(t('assistant.basedOn'))}</span>
             <span class="caption">${esc(t('assistant.disclaimer'))}</span>
           </div>`
        : `<div class="card">
             <span class="subheading">${esc(t('assistant.title'))}</span>
             <span class="muted">${esc(t('assistant.emptyBody'))}</span>
             <div class="examples">${examples}</div>
           </div>`
    }
  </div>
  <div class="footerbar composer">
    <div class="field flex">${esc(t('assistant.placeholder'))}</div>
    <button class="primary" data-act="ask">${esc(t('assistant.send'))}</button>
    <span class="caption">${esc(t('assistant.finePrint'))}</span>
  </div>`;
}

const plan = (): string => `${header(t('plan.title'))}
  <div class="scroll">
    <div class="card">
      <span class="label">${esc(t('plan.targets'))}</span>
      ${listRow(t('context.fasting'), '', '80–130 mg/dL')}
      ${listRow(t('context.afterMeal'), '', '140–180 mg/dL')}
      <span class="caption">${esc(t('plan.effectiveFrom'))} · ${esc(t('plan.doctor'))}</span>
    </div>
    <div class="card list">
      <span class="label">${esc(t('plan.medicines'))}</span>
      ${listRow('Metformin 500 mg', '', '08:00, 20:00')}
      ${listRow('Glimepiride 1 mg', '', '08:00')}
    </div>
    <div class="card tinted">
      <span class="label">${esc(t('hypo.title'))}</span>
      <span>“Take what I told you and call the clinic if it happens twice in a week.”</span>
      <span class="caption">${esc(t('plan.transcribedNote'))}</span>
    </div>
    <div class="card list">
      ${listRow(t('plan.nextVisit'), '', '14 Nov 2026')}
      ${listRow(t('plan.nextLabs'), 'HbA1c, lipid profile', '14 Nov 2026')}
    </div>
  </div>`;

const more = (): string => `${header(t('more.title'))}
  <div class="scroll">
    <p class="muted">${esc(t('more.body'))}</p>
    <div class="card list">
      ${listRow(t('summary.title'), t('summary.subtitle'))}
      ${listRow(t('documents.title'), '')}
      ${listRow(t('reminders.title'), t('reminders.body'))}
      ${listRow(t('assistant.title'), '', '', 'data-act="go" data-to="assistant"')}
    </div>
    <div class="card list">
      ${listRow(t('backup.title'), t('backup.lastBackup'))}
      ${listRow(t('settings.title'), '', '', 'data-act="go" data-to="settings"')}
    </div>
    <p class="disclaimer">${esc(t('disclaimer.line'))}</p>
  </div>`;

const settings = (): string => `${header(t('settings.title'), true)}
  <div class="scroll">
    <div class="card">
      <span class="label">${esc(t('settings.language'))}</span>
      <div class="chips">
        <button class="chip ${state.lang === 'en' ? 'on' : ''}" data-act="lang" data-to="en">English</button>
        <button class="chip ${state.lang === 'ne' ? 'on' : ''}" data-act="lang" data-to="ne">नेपाली</button>
      </div>
      <span class="label">${esc(t('settings.units'))}</span>
      <div class="chips">
        <button class="chip on">mg/dL</button><button class="chip">mmol/L</button>
      </div>
      <span class="caption">${esc(t('settings.unitsHint'))}</span>
    </div>

    <span class="grouplabel">${esc(t('settings.groupApp'))}</span>
    <div class="card list">
      ${listRow(t('appearance.title'), t('appearance.rowBody'))}
      ${listRow(t('settings.lock'), t('settings.lockDevice'))}
      ${listRow(t('assistant.title'), t('settings.assistantBody'), 'On')}
    </div>

    <span class="grouplabel">${esc(t('settings.groupData'))}</span>
    <div class="card list">
      ${listRow(t('settings.lists'), '', '6')}
      ${listRow(t('settings.storage'), t('settings.storageBody'), '12.4 MB')}
      ${listRow(t('settings.storageEntries'), '', '168')}
      ${listRow(t('settings.deleteAll'), t('settings.deleteAllBody'))}
    </div>

    <div class="card">
      <span class="subheading">${esc(t('settings.about'))}</span>
      <p class="disclaimer">${esc(t('disclaimer.line'))}</p>
      <span class="caption">TApp 1.0.0</span>
    </div>
  </div>`;

const SCREENS: Record<ScreenId, () => string> = {
  home,
  record,
  capture,
  chooser,
  lab,
  assistant,
  plan,
  more,
  settings,
};

// ── what the visitor is looking at ────────────────────────────────────────────
const NOTES: Record<ScreenId, { title: string; points: string[] }> = {
  home: {
    title: 'Home is a feed, not a hub',
    points: [
      'Your last reading is stated, never judged — no colour, no arrow, no comparison drawn for you.',
      'Progress is a rolling window: seven bars, three of them quiet. A day you missed is drawn in the paper colour, never in red.',
      '“If I feel low” sits on Home, one scroll down, and every word in it was transcribed from your own doctor.',
      'Below it, three facts and no opinion: when the last reading was written, when the next lab test is due, how many readings since the last report.',
    ],
  },
  record: {
    title: 'Everything, newest first',
    points: [
      'Nine kinds of entry share one timeline: readings, insulin, medicines, meals, activity, symptoms, notes, documents and lab values.',
      'Each row says where it came from — typed, or read from a photo you confirmed.',
      'Nothing is overwritten. An edit supersedes; the earlier version stays in the record.',
    ],
  },
  capture: {
    title: 'The camera is the middle button',
    points: [
      'It opens on Photo, always — never the last mode you used.',
      'Type and Speak sit beside it at the same size: six of the nine kinds have no photo to take.',
      'Speech is recognised on the phone. Nothing is sent anywhere to be transcribed.',
    ],
  },
  chooser: {
    title: 'It asks rather than guesses',
    points: [
      'A photo is routed automatically only when the app is confident; below that, this screen opens.',
      'A wrong guess costs you a correction and your trust in the shutter. A question costs one tap.',
      'Whatever you pick, the photo travels with you to the next screen.',
    ],
  },
  lab: {
    title: 'Fifty-three values off eleven pages',
    points: [
      'These are the real rows the app reads from a Kathmandu panel, grouped under the report’s own headings.',
      'Nothing is ticked when it opens. Taking the whole report is one deliberate act, not a pre-ticked list.',
      'Tick a row and it opens for editing, so a misread digit is fixed while the paper is still in your hand.',
      'Rows the reader was unsure of say so, and sit at the end of their group.',
    ],
  },
  assistant: {
    title: 'It answers from your logs, and nothing else',
    points: [
      'Questions are answered by looking things up in your own record — averages, what the doctor said, when a test is due.',
      'It does not answer medical questions, and the fine print says so before you ask the first one.',
      'On a capable phone the phrasing runs on the device. The question and the answer stay there.',
      'On a phone with no model downloaded there is no assistant to open, and the disc in the corner offers the download instead.',
    ],
  },
  plan: {
    title: 'The plan is transcribed, never authored',
    points: [
      'Every word here was typed in from what your doctor said. The app never writes medical instructions of its own.',
      'The range your charts shade comes from this screen — which is why a plan nobody has filled in shades nothing.',
      'Updating it keeps the earlier version readable.',
    ],
  },
  more: {
    title: 'The things you reach for around a visit',
    points: [
      'The visit summary, your documents, reminders and the assistant.',
      'Backup shows the date of the last one, because that is what you open it to check.',
      'A backup is one encrypted file with a passphrase you choose. No account, and no copy anywhere else.',
    ],
  },
  settings: {
    title: 'Two languages, four themes, no account',
    points: [
      'English and Nepali at full parity — switch the language here and the whole preview follows.',
      'The theme picker in the site header drives the phone: the app ships the same four.',
      'There is nothing to sign in to, and nothing to sign out of.',
    ],
  },
};

// ── render ────────────────────────────────────────────────────────────────────
const phone = document.getElementById('tapp-phone');
const notes = document.getElementById('tapp-notes');

function render(): void {
  if (!phone) return;
  // Nunito for Latin and Mukta for Devanagari, each at the line height it needs (1.35 and
  // 1.62) — the app's own fix for Nepali headings clipping their vowel signs.
  phone.style.setProperty('--face', state.lang === 'ne' ? 'Mukta' : 'Nunito Variable');
  phone.style.setProperty('--leading', state.lang === 'ne' ? '1.62' : '1.35');

  const full = state.screen === 'capture';
  const root = TAB_ROOTS.includes(state.screen);
  phone.innerHTML = `${full ? '' : statusBar()}${SCREENS[state.screen]()}${
    root ? assistantFab() : ''
  }${full ? '' : tabBar()}`;

  if (notes) {
    const note = NOTES[state.screen];
    notes.innerHTML = `<h3 class="text-ink text-lg font-bold">${esc(note.title)}</h3>
      <ul class="text-ink-muted mt-3 space-y-2 text-sm leading-relaxed">${note.points
        .map((point) => `<li>${esc(point)}</li>`)
        .join('')}</ul>`;
  }

  for (const element of Array.from(document.querySelectorAll<HTMLElement>('[data-preview]'))) {
    const on =
      (element.dataset.preview === 'screen' && element.dataset.to === state.screen) ||
      (element.dataset.preview === 'lang' && element.dataset.to === state.lang);
    element.classList.toggle('on', on);
    element.setAttribute('aria-pressed', String(on));
  }
}

// ── events ────────────────────────────────────────────────────────────────────
document.addEventListener('click', (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>('[data-act],[data-preview]');
  if (!target) return;
  const act = target.dataset.act ?? target.dataset.preview;
  const to = target.dataset.to;

  if (act === 'lang') state.lang = to as Lang;
  else if (act === 'tab' || act === 'go' || act === 'screen') state.screen = to as ScreenId;
  else if (act === 'back') state.screen = state.screen === 'lab' ? 'chooser' : 'home';
  else if (act === 'filter') state.filter = to!;
  else if (act === 'ask') state.asked = !state.asked;
  else if (act === 'tick') {
    // Ticking one row is a statement about that row, so it opens with it.
    const index = Number(target.dataset.i);
    if (state.accepted.has(index)) {
      state.accepted.delete(index);
      state.open.delete(index);
    } else {
      state.accepted.add(index);
      state.open.add(index);
    }
  } else if (act === 'open') {
    const index = Number(target.dataset.i);
    if (state.open.has(index)) state.open.delete(index);
    else state.open.add(index);
  } else if (act === 'all') {
    // Taking everything takes everything and unfolds nothing.
    if (state.accepted.size === LAB_ROWS.length) {
      state.accepted.clear();
      state.open.clear();
    } else LAB_ROWS.forEach((_, index) => state.accepted.add(index));
  } else if (act === 'section') {
    const group = groupsOfRows()[Number(target.dataset.group)]?.rows.map((r) => r.index) ?? [];
    const everyOne = group.every((index) => state.accepted.has(index));
    for (const index of group) {
      if (everyOne) {
        state.accepted.delete(index);
        state.open.delete(index);
      } else state.accepted.add(index);
    }
  } else return;

  render();
});

document.addEventListener('input', (event) => {
  const input = event.target as HTMLInputElement;
  if (input.dataset.act !== 'edit') return;
  state.edits.set(Number(input.dataset.i), input.value);
});

render();
