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
  'tabs.home': { en: 'Home', ne: 'गृह' },
  // "Logs" since 2026-09-24: "My record" is what the account switcher calls the patient's
  // own record as opposed to one they follow, so the tab says what it lists instead.
  'tabs.timeline': { en: 'Logs', ne: 'लगहरू' },
  'tabs.capture': { en: 'Add', ne: 'थप्नुहोस्' },
  'tabs.plan': { en: 'Plan', ne: 'योजना' },
  'tabs.more': { en: 'More', ne: 'थप' },

  'home.todayTitle': { en: 'Today', ne: 'आज' },
  'home.lastGlucose': { en: 'Last reading', ne: 'पछिल्लो रिडिङ' },
  'home.entriesToday': { en: '3 entries today', ne: 'आज ३ प्रविष्टि' },
  'home.recentWindow': {
    en: 'Written on 5 of the last 7 days',
    ne: 'पछिल्लो ७ दिनमध्ये ५ दिन लेखियो',
  },
  'home.readingDay': { en: '16 Sep 2026', ne: '१६ सेप्टेम्बर २०२६' },
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
    ne: 'योजनामा भएको अर्को ल्याब जाँच: १४ नोभेम्बर २०२६ · HbA1c, lipid profile',
  },
  'home.daily.sinceReport': {
    en: 'Since the report on 12 Aug 2026, 46 readings have been written down',
    ne: '१२ अगस्ट २०२६ को रिपोर्टपछि ४६ नाप लेखिएका छन्',
  },

  'hypo.title': { en: 'If I feel low', ne: 'सुगर घटेको जस्तो लाग्यो भने' },
  'hypo.log': { en: 'Log a low sugar', ne: 'सुगर घटेको लेख्नुहोस्' },
  'hypo.call': { en: 'Call Sabina', ne: 'सबिना लाई फोन गर्नुहोस्' },
  'plan.transcribedNote': {
    en: 'What you wrote down from your doctor, unchanged.',
    ne: 'तपाईंले डाक्टरबाट लेखेको कुरा, जस्ताको तस्तै।',
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
    ne: 'राख्न चाहनुभएका मानमा टिक लगाउनुहोस्',
  },
  'documents.reviewBody': {
    en: 'These were read from your report. Nothing is kept unless you tick it.',
    ne: 'यी तपाईंको रिपोर्टबाट पढिएका हुन्। टिक नलगाएसम्म केही राखिँदैन।',
  },
  'documents.reportDate': { en: 'Date on the report', ne: 'रिपोर्टमा लेखिएको मिति' },
  'documents.takeAll': { en: 'Take every value', ne: 'सबै मान लिनुहोस्' },
  'documents.takeNone': { en: 'Take none of them', ne: 'कुनै पनि नलिनुहोस्' },
  'documents.otherValues': { en: 'Other values', ne: 'अन्य मानहरू' },
  // The rows the reader was unsure of no longer trail each group with a caption apiece:
  // they are gathered into one group at the end, and the heading says it once.
  'documents.checkGroupTitle': {
    en: 'Read these against the paper',
    ne: 'यी पङ्क्ति कागजसँग मिलाएर हेर्नुहोस्',
  },
  'documents.checkGroupBody': {
    en: 'These rows were hard to read. Check each one against your report before you tick it.',
    ne: 'यी पङ्क्ति पढ्न गाह्रो भयो। टिक लगाउनुअघि हरेकलाई रिपोर्टसँग मिलाउनुहोस्।',
  },
  'documents.valueLabel': { en: 'Value', ne: 'मान' },
  'documents.unitLabel': { en: 'Unit', ne: 'एकाइ' },
  'documents.keptEitherWay': {
    en: 'The document will be kept even if you tick nothing.',
    ne: 'टिक नलगाए पनि कागजात राखिनेछ।',
  },
  'documents.truncatedTitle': { en: 'Pages that were not read', ne: 'नपढिएका पृष्ठहरू' },
  'documents.truncated': {
    en: 'Only the first 10 pages were read. The whole document is kept.',
    ne: 'पहिलो १० पाना मात्र पढियो। पूरै कागजात राखिन्छ।',
  },

  'settings.title': { en: 'Settings', ne: 'सेटिङ' },
  'settings.groupApp': { en: 'This app', ne: 'यो एप' },
  'settings.groupData': { en: 'Your data', ne: 'तपाईंको डेटा' },
  'settings.language': { en: 'Language', ne: 'भाषा' },
  'settings.units': { en: 'Glucose unit', ne: 'ग्लुकोज युनिट' },
  'settings.unitsHint': {
    en: 'Changes how readings are shown. Nothing already written changes.',
    ne: 'रिडिङ कसरी देखिन्छ भन्ने मात्र बदल्छ। लेखिसकेको केही बदलिँदैन।',
  },
  'appearance.title': { en: 'Appearance', ne: 'रूप' },
  'appearance.rowBody': {
    en: 'Light or dark, and which colours',
    ne: 'उज्यालो वा अँध्यारो, र कुन रङहरू',
  },
  'accessibility.title': { en: 'Accessibility', ne: 'पहुँच' },
  'accessibility.rowBody': { en: 'Text size', ne: 'अक्षरको आकार' },
  'accounts.title': { en: 'Records on this phone', ne: 'यो फोनमा रहेका रेकर्ड' },
  'accounts.rowBody': {
    en: 'Your own record, and anyone whose record you follow',
    ne: 'तपाईंको आफ्नै रेकर्ड, र तपाईंले हेर्ने अरूको रेकर्ड',
  },
  'relationships.title': { en: 'Sharing', ne: 'साझेदारी' },
  'relationships.rowBody': {
    en: 'Who sees your record, and what they see',
    ne: 'तपाईंको रेकर्ड कसले देख्छ, र के देख्छ',
  },
  'settings.lock': { en: 'Lock', ne: 'लक' },
  'settings.lockDevice': {
    en: 'Opens with your fingerprint or screen lock. No separate password.',
    ne: 'औंठाछाप वा स्क्रिन लकले खुल्छ। छुट्टै पासवर्ड छैन।',
  },
  'settings.assistantBody': {
    en: 'Looks things up in what you wrote down. It gives no medical advice.',
    ne: 'तपाईंले लेखेका कुरामा खोज्छ। यसले चिकित्सकीय सल्लाह दिँदैन।',
  },
  // Since 2026-09-25 (M11 D8): the pilot report is gone, and the two screens that sat behind
  // it get ordinary rows. AI features beside the assistant, diagnostics under About.
  'flags.title': { en: 'AI features', ne: 'AI सुविधाहरू' },
  'settings.flagsBody': {
    en: 'What reads your photos and reports, and switches for each',
    ne: 'तपाईंका फोटो र रिपोर्ट के ले पढ्छ, र प्रत्येकको स्विच',
  },
  'settings.diagnostics': { en: 'Diagnostics', ne: 'डायग्नोस्टिक' },
  'settings.diagnosticsBody': {
    en: 'A log of what the app did, for whoever is helping you. It holds no readings.',
    ne: 'एपले गरेका कामको लग, तपाईंलाई सहयोग गर्नेका लागि। यसमा कुनै रिडिङ हुँदैन।',
  },
  'settings.lists': { en: 'My medicine names', ne: 'मेरा औषधिका नाम' },
  'settings.storage': { en: 'Photos and voice notes', ne: 'तस्बिर र आवाज नोट' },
  'settings.storageBody': {
    en: 'Everything you attached, on this phone only.',
    ne: 'तपाईंले जोड्नुभएको सबै, यही फोनमा मात्र।',
  },
  'settings.storageEntries': { en: 'Entries written down', ne: 'लेखिएका रेकर्ड' },
  'settings.storageFiles': { en: 'Files kept', ne: 'राखिएका फाइल' },
  'telemetry.rowTitle': { en: 'Share usage counts', ne: 'प्रयोगको गन्ती पठाउने' },
  'telemetry.rowOff': { en: 'Off', ne: 'बन्द' },
  'settings.deleteAll': { en: 'Delete everything', ne: 'सबै मेटाउनुहोस्' },
  'settings.deleteAllBody': {
    en: 'Removes your whole record from this phone. Backups you already sent are not touched.',
    ne: 'तपाईंको पूरै रेकर्ड यो फोनबाट हटाउँछ। पहिले पठाइसकेका ब्याकअपमा केही हुँदैन।',
  },
  'settings.about': { en: 'About', ne: 'बारेमा' },
  // The app's own strings say "TApp" here and in `disclaimer.line`. On cosys.work the product
  // is "The Diabetes App" (founder, 2026-09-25), so these two are the only strings in the
  // table that are not the app's verbatim. There is no Nepali rendering of the name.
  'scope.rowTitle': {
    en: 'What The Diabetes App does not do',
    ne: 'The Diabetes App ले के गर्दैन',
  },
  'scope.rowBody': {
    en: 'Where the app stands on sensors, carbohydrate counts, doses and sharing, and why.',
    ne: 'सेन्सर, कार्बोहाइड्रेट, मात्रा र आदानप्रदानमा एप कहाँ उभिन्छ, र किन।',
  },
  'settings.version': { en: 'Version 1.0.0', ne: 'संस्करण 1.0.0' },

  'more.title': { en: 'More', ne: 'थप' },
  'more.body': { en: "For clinic visits, and the app's settings.", ne: 'क्लिनिक भेटका लागि, र एपका सेटिङ।' },
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
  'settings.remindersBody': {
    en: 'Times to check, and medicines to take.',
    ne: 'जाँच्ने समय, र खाने औषधि।',
  },
  // The founder's plan-screen sentence (2026-09-25), shown word for word under the plan.
  'disclaimer.dosing': {
    en: 'This app does not calculate or recommend insulin doses. All dosing decisions are made exclusively by your licensed physician. The app is a record-keeping and communication tool only.',
    ne: 'यो एपले इन्सुलिनको डोज गणना गर्दैन र सिफारिस पनि गर्दैन। डोजसम्बन्धी सबै निर्णय तपाईंको इजाजतप्राप्त चिकित्सकले मात्र गर्नुहुन्छ। यो एप रेकर्ड राख्ने र सञ्चार गर्ने साधन मात्र हो।',
  },
  'disclaimer.line': {
    en: 'The Diabetes App keeps the record you write down. It does not give medical advice, and it does not replace your doctor or your clinic.',
    ne: 'The Diabetes App ले तपाईंले लेखेको रेकर्ड राख्छ। यसले चिकित्सकीय सल्लाह दिँदैन, र तपाईंको डाक्टर वा क्लिनिकको ठाउँ लिँदैन।',
  },

  'assistant.title': { en: 'Ask about your logs', ne: 'आफ्नो लगबारे सोध्नुहोस्' },
  'assistant.placeholder': {
    en: 'Ask about what you wrote down',
    ne: 'तपाईंले लेखेको कुराबारे सोध्नुहोस्',
  },
  'assistant.send': { en: 'Ask', ne: 'सोध्नुहोस्' },
  'assistant.emptyBody': {
    en: 'Ask about your own record. It does not answer medical questions.',
    ne: 'आफ्नै रेकर्डबारे सोध्नुहोस्। यसले चिकित्सकीय प्रश्नको जवाफ दिँदैन।',
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
  'assistant.example.help': {
    en: '“how do I export for my doctor”',
    ne: '“डाक्टरलाई पठाउन कसरी निर्यात गर्ने”',
  },
  // The answer card is the tool's figures, labelled; nothing on it was written by a model.
  'assistant.answerLabel': {
    en: 'Average · Glucose · Fasting · this week',
    ne: 'औसत · ग्लुकोज · फास्टिङ · यो साता',
  },
  'assistant.basedOn': {
    en: 'From 9 entries you wrote down',
    ne: 'तपाईंले लेखेको ९ रेकर्डबाट',
  },
  'assistant.disclaimer': {
    en: 'This is a summary of your own logs. It is not medical advice. Ask your doctor before changing any treatment.',
    ne: 'यो तपाईंकै रेकर्डको सारांश हो। यो चिकित्सकीय सल्लाह होइन। उपचारमा केही फेर्नुअघि आफ्नो डाक्टरसँग सोध्नुहोस्।',
  },
  'assistant.needsModelTitle': { en: 'Ask about your logs', ne: 'तपाईंको रेकर्डबारे सोध्नुहोस्' },
  'assistant.needsModelBody': {
    en: 'This needs a model on your phone before it can understand what you type.',
    ne: 'तपाईंले लेखेको बुझ्नअघि यसलाई तपाईंको फोनमा एउटा मोडेल चाहिन्छ।',
  },
  'models.fabLabel': { en: 'Get the AI assistant', ne: 'एआई सहायक ल्याउनुहोस्' },

  'chooser.title': { en: 'What is this a photo of?', ne: 'यो केको तस्बिर हो?' },
  'chooser.body': {
    en: 'Pick what the photo shows. You can change it on the next screen.',
    ne: 'फोटोमा के छ छान्नुहोस्। अर्को स्क्रिनमा बदल्न सकिन्छ।',
  },
  'chooser.glucose': { en: 'A meter reading', ne: 'मिटरको रिडिङ' },
  'chooser.glucoseBody': {
    en: 'A number on a glucometer screen',
    ne: 'ग्लुकोमिटरको स्क्रिनमा देखिने अङ्क',
  },
  'chooser.lab': { en: 'A lab report', ne: 'ल्याब रिपोर्ट' },
  'chooser.labBody': { en: 'A printed sheet of results', ne: 'छापिएको नतिजाको पाना' },
  'chooser.meal': { en: 'A meal', ne: 'खाना' },
  'chooser.mealBody': { en: 'Food, kept with your own tag', ne: 'खाना, तपाईंकै ट्यागसहित' },
  'chooser.document': { en: 'Something else to keep', ne: 'राख्नुपर्ने अरू केही' },
  'chooser.documentBody': {
    en: 'A prescription, a slip, a note from the clinic',
    ne: 'पुर्जा, स्लिप, क्लिनिकको टिपोट',
  },
  'capture.modePhoto': { en: 'Photo', ne: 'तस्बिर' },
  'capture.modeType': { en: 'Type', ne: 'टाइप' },
  'capture.modeSpeak': { en: 'Speak', ne: 'बोल्नुहोस्' },
  'capture.gallery': { en: 'Choose a photo', ne: 'फोटो छान्नुहोस्' },
  'capture.file': { en: 'Choose a file', ne: 'फाइल छान्नुहोस्' },
  'capture.shutter': { en: 'Take the photo', ne: 'तस्बिर खिच्नुहोस्' },

  'kind.glucose': { en: 'Glucose', ne: 'ग्लुकोज' },
  'kind.medication': { en: 'Medicine', ne: 'औषधि' },
  'kind.lab': { en: 'Lab result', ne: 'ल्याब नतिजा' },
  'kind.meal': { en: 'Meal', ne: 'खाना' },
  // A reading's context, as the timeline prints it (`glucose.context.*`). The plan's target
  // rows use their own keys, which the Nepali words differently.
  'context.fasting': { en: 'Fasting', ne: 'फास्टिङ' },
  'context.afterMeal': { en: 'After a meal', ne: 'खानापछि' },
  'context.bedtime': { en: 'Bedtime', ne: 'बेडटाइम' },

  'plan.title': { en: "Doctor's plan", ne: 'डाक्टरको योजना' },
  'plan.effectiveFrom': { en: 'From 12 Aug 2026', ne: '१२ अगस्ट २०२६ देखि' },
  'plan.doctorName': { en: 'Doctor', ne: 'डाक्टर' },
  'plan.clinic': { en: 'Clinic', ne: 'क्लिनिक' },
  'plan.targets': { en: 'Target range', ne: 'लक्ष्य दायरा' },
  'plan.targetsFasting': { en: 'Fasting', ne: 'खाली पेट' },
  'plan.targetsPostMeal': { en: 'After a meal', ne: 'खानापछि' },
  'plan.medications': { en: 'Medicines', ne: 'औषधिहरू' },
  'plan.ifIFeelLow': { en: 'If I feel low', ne: 'सुगर घटेको जस्तो लाग्यो भने' },
  'plan.emergencyContact': { en: 'Emergency contact', ne: 'आपत्कालीन सम्पर्क' },
  'plan.nextVisit': { en: 'Next visit', ne: 'अर्को भेट' },
  'plan.nextLabs': { en: 'Next lab tests', ne: 'अर्को ल्याब परीक्षण' },
  'plan.history': { en: 'Earlier versions · 2 versions', ne: 'अघिल्ला संस्करण · २ संस्करण' },
  'plan.update': { en: 'Update from a prescription', ne: 'प्रेस्क्रिप्सनबाट अद्यावधिक' },

  // Where a band came from (M11 F02). The patient's own, or a published default, named.
  'defaults.origin.plan': { en: 'Your own range', ne: 'तपाईंको आफ्नै दायरा' },
  'defaults.origin.who_pen': { en: 'Default (WHO)', ne: 'पूर्वनिर्धारित (WHO)' },
  'defaults.origin.ada_2026': { en: 'Default (ADA)', ne: 'पूर्वनिर्धारित (ADA)' },

  // The review screen (M11 F01), reached from the top of Logs. Templates are the app's own,
  // placeholders included, and filled by `tf`.
  'review.open': { en: 'Figures from your readings', ne: 'तपाईंका रिडिङबाट निकालिएका सङ्ख्या' },
  'review.openBody': {
    en: 'Time in range, averages and {{hba1c}}',
    ne: 'दायराभित्रको समय, औसत र {{hba1c}}',
  },
  'analyte.hba1c': { en: 'HbA1c', ne: 'HbA1c' },
  'review.title': { en: 'Review', ne: 'समीक्षा' },
  'review.rangeLabel': { en: 'Period', ne: 'अवधि' },
  'review.range.d7': { en: '7 days', ne: '७ दिन' },
  'review.range.d14': { en: '14 days', ne: '१४ दिन' },
  'review.range.d30': { en: '30 days', ne: '३० दिन' },
  'review.chart.title': { en: 'Glucose', ne: 'ग्लुकोज' },
  'review.chart.band.fasting': { en: 'Fasting range', ne: 'खाली पेटको दायरा' },
  'review.chart.band.postMeal': { en: 'After-meal range', ne: 'खानापछिको दायरा' },
  'review.chart.bandLabel': {
    en: '{{band}}: {{min}}–{{max}} {{unit}}',
    ne: '{{band}}: {{min}}–{{max}} {{unit}}',
  },
  'review.chart.bandWithOrigin': { en: '{{label}} · {{origin}}', ne: '{{label}} · {{origin}}' },
  'review.chart.readings_one': {
    en: '{{count}} reading in this period',
    ne: 'यो अवधिमा {{count}} रिडिङ',
  },
  'review.chart.readings_other': {
    en: '{{count}} readings in this period',
    ne: 'यो अवधिमा {{count}} रिडिङ',
  },
  'review.timeInTarget.title': { en: "In your doctor's range", ne: 'डाक्टरले दिएको दायराभित्र' },
  'review.timeInTarget.titleMixed': { en: 'In the target range', ne: 'लक्षित दायराभित्र' },
  'review.timeInTarget.value': { en: '{{percent}}%', ne: '{{percent}}%' },
  'review.timeInTarget.basis': {
    en: 'Counted from {{measured}} of {{total}} readings',
    ne: '{{total}} रिडिङमध्ये {{measured}} बाट गणना गरिएको',
  },
  'review.timeInTarget.unbanded_one': {
    en: '{{count}} reading was taken at a time no range covers.',
    ne: '{{count}} रिडिङ कुनै दायराले नसमेट्ने समयमा लिइएको हो।',
  },
  'review.timeInTarget.unbanded_other': {
    en: '{{count}} readings were taken at times no range covers.',
    ne: '{{count}} रिडिङ कुनै दायराले नसमेट्ने समयमा लिइएका हुन्।',
  },
  'review.timeInTarget.band': {
    en: '{{band}}: {{min}}–{{max}} {{unit}} · {{origin}}',
    ne: '{{band}}: {{min}}–{{max}} {{unit}} · {{origin}}',
  },
  'review.under.heading': {
    en: 'Readings under the default lines',
    ne: 'पूर्वनिर्धारित रेखाभन्दा तलका रिडिङ',
  },
  'review.under.title': { en: 'Readings under {{value}}', ne: '{{value}} भन्दा तलका रिडिङ' },
  'review.averages.title': { en: 'Average by time of day', ne: 'समयअनुसार औसत' },
  'review.averages.spread_one': {
    en: '{{min}} to {{max}} · {{count}} reading',
    ne: '{{min}} देखि {{max}} · {{count}} रिडिङ',
  },
  'review.averages.spread_other': {
    en: '{{min}} to {{max}} · {{count}} readings',
    ne: '{{min}} देखि {{max}} · {{count}} रिडिङ',
  },
  'review.hba1c.value': { en: '{{value}} {{unit}}', ne: '{{value}} {{unit}}' },
  'review.hba1c.basis': {
    en: 'As printed on your lab reports.',
    ne: 'तपाईंका ल्याब रिपोर्टमा छापिएजस्तै।',
  },
};

const t = (key: string): string => S[key]?.[state.lang] ?? key;

/**
 * A template with its placeholders filled, as i18next fills them in the app. A number is
 * written in the reading language's numerals (the app's `numeralFormatter`); a string goes
 * in as it is, because whoever formatted it already knew what it was. `count` picks the
 * `_one` or `_other` form.
 */
function tf(key: string, vars: Record<string, string | number>): string {
  const count = vars.count;
  const plural = typeof count === 'number' ? `${key}_${count === 1 ? 'one' : 'other'}` : key;
  const template = S[plural] ? t(plural) : t(key);
  return template.replace(/\{\{(\w+)\}\}/g, (_, name: string) => {
    const value = vars[name];
    return typeof value === 'number' ? n(String(value)) : (value ?? '');
  });
}

/**
 * Nepali prints every number the app formats in Devanagari: glucose, times, dates and
 * counts (ADR-09 §B.11, F52). What the patient typed stays as typed, and so does what the
 * app passes through raw: a plan's medicine times and its next-visit date, a lab value on the
 * lab review screen. A plan's target range is no longer on that list: since M11 F02 the
 * targets card formats it in the patient's unit, and so in the reading language's digits. The replica follows the app on both sides of that line,
 * which is why this is applied per value rather than to the whole screen.
 */
const DEVANAGARI = '०१२३४५६७८९';
const n = (value: string): string =>
  state.lang === 'ne' ? value.replace(/[0-9]/g, (d) => DEVANAGARI[Number(d)]!) : value;

/**
 * A time as the app's `formatTime` prints it: `Intl` with two-digit hour and minute, which
 * CLDR renders as `07:12 AM` in English and `०७:१२` in Nepali. Takes `HH:MM`.
 */
function tm(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number) as [number, number];
  if (state.lang === 'ne') return n(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${String(hour).padStart(2, '0')}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
}
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
  /** The disc on a phone that could hold the model and has not downloaded it yet. */
  assistantDownload: (size = 26) =>
    icon(
      `<path d="M11 3.2c1.15 4.3 2.5 5.65 6.8 6.8-4.3 1.15-5.65 2.5-6.8 6.8-1.15-4.3-2.5-5.65-6.8-6.8 4.3-1.15 5.65-2.5 6.8-6.8Z" fill="currentColor" stroke-linejoin="round"/>
       <path d="M18 13.4v5.2" stroke-linecap="round"/>
       <path d="M15.7 16.4 18 18.7l2.3-2.3" stroke-linecap="round" stroke-linejoin="round"/>
       <path d="M14.8 21.2h6.4" stroke-linecap="round"/>`,
      size,
    ),
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
  | 'home'
  | 'record'
  | 'review'
  | 'capture'
  | 'chooser'
  | 'lab'
  | 'assistant'
  | 'plan'
  | 'more'
  | 'settings';

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
  /**
   * Whether this phone holds the assistant's model (ADR-19 §3). `installed`: the disc opens
   * the assistant. `download`: a phone that passes the gate and has not fetched it, so the
   * disc carries a download mark and leads to the download. `none`: below the gate, where
   * there is no disc at all and no room kept for one.
   */
  model: 'installed' as 'installed' | 'download' | 'none',
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

/** The assistant's disc, over the four tab roots, in whichever of its three states. */
const assistantFab = (): string => {
  if (state.model === 'none') return '';
  return state.model === 'download'
    ? `<button class="fab" aria-label="${esc(t('models.fabLabel'))}">${ICONS.assistantDownload()}</button>`
    : `<button class="fab" data-act="go" data-to="assistant" aria-label="${esc(t('assistant.title'))}">
         ${ICONS.assistant()}</button>`;
};

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
      ${feedHeading(ILLUSTRATIONS.reading(), t('home.todayTitle'))}
      <div class="reading">
        <span class="metric">${n('140')} mg/dL</span>
        <span class="caption">${esc(t('home.lastGlucose'))} · ${esc(t('home.readingDay'))}, ${esc(tm('07:12'))}</span>
      </div>
      <span class="caption">${esc(t('home.entriesToday'))}</span>
    </div>

    <div class="card quiet">
      ${feedHeading(ILLUSTRATIONS.window(), t('timeline.title'))}
      <span class="strong">${esc(t('home.recentWindow'))}</span>
    </div>

    <div class="card list">
      <span class="label">${esc(t('home.todayTitle'))}</span>
      ${listRow(`${n('140')} mg/dL`, `${t('kind.glucose')} · ${t('context.fasting')}`, tm('07:12'))}
      ${listRow('Metformin 500 mg', t('kind.medication'), tm('08:10'))}
      ${listRow('HbA1c 7.2%', t('kind.lab'), tm('13:40'))}
    </div>

    <!--
      The call comes first and is the filled button: it is the one action on this card that
      reaches another person. Logging the low is the quieter second.
    -->
    <div class="card tinted">
      <span class="label">${esc(t('hypo.title'))}</span>
      <span>“Take what I told you and call the clinic if it happens twice in a week.”</span>
      <span class="caption">${esc(t('plan.transcribedNote'))}</span>
      <button class="primary">${esc(t('hypo.call'))}</button>
      <button class="secondary">${esc(t('hypo.log'))}</button>
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
      ${listRow('Metformin', '', tm('20:00'))}
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
        [`${n('140')} mg/dL`, 'glucose', `${t('kind.glucose')} · ${t('context.fasting')}`, '07:12'],
        ['Metformin 500 mg', 'medication', t('kind.medication'), '08:10'],
        ['HbA1c 7.2%', 'lab_result', t('kind.lab'), '13:40'],
        ['Creatinine 0.7 mg/dL', 'lab_result', t('kind.lab'), '13:40'],
      ],
    },
    {
      day: t('timeline.yesterday'),
      rows: [
        [`${n('186')} mg/dL`, 'glucose', `${t('kind.glucose')} · ${t('context.afterMeal')}`, '21:05'],
        ['Dal bhat, amber', 'meal', t('kind.meal'), '20:10'],
        [`${n('122')} mg/dL`, 'glucose', `${t('kind.glucose')} · ${t('context.fasting')}`, '06:58'],
      ],
    },
  ];
  const visible = (kind: string) => state.filter === 'all' || state.filter === kind;
  // Each day's heading carries its count (`timeline.dayCount`), counted after the filter.
  const dayCount = (count: number) =>
    state.lang === 'ne' ? `${n(String(count))} प्रविष्टि` : `${count} ${count === 1 ? 'entry' : 'entries'}`;

  // M11 F01: the figures behind the list, one tap away, above the filters.
  return `${header(t('timeline.title'))}
  <div class="scroll">
    ${listRow(
      t('review.open'),
      tf('review.openBody', { hba1c: t('analyte.hba1c') }),
      '',
      'data-act="go" data-to="review"',
    )}
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
        return `<div class="dayhead"><span class="daylabel">${esc(group.day)}</span>
            <span class="caption">${esc(dayCount(rows.length))}</span></div>
          <div class="card list">${rows
            .map(([title, , subtitle, time]) => listRow(title, subtitle, tm(time)))
            .join('')}</div>`;
      })
      .join('')}
    <p class="caption centre">${esc(t('timeline.end'))}</p>
  </div>`;
}

/**
 * The viewfinder. The line that used to sit in its frame ("Point at the meter, the report or
 * the plate") left the app; what the screen offers now is the shutter, a photo or a file
 * already on the phone, and the three modes.
 */
const capture = (): string => `<div class="viewfinder">
  ${statusBar()}
  <div class="vf-body"><div class="vf-frame"></div></div>
  <div class="vf-picks">
    <button class="vf-pick">${esc(t('capture.gallery'))}</button>
    <button class="vf-pick">${esc(t('capture.file'))}</button>
  </div>
  <div class="vf-strip">
    <button class="mode on">${esc(t('capture.modePhoto'))}</button>
    <button class="mode">${esc(t('capture.modeType'))}</button>
    <button class="mode">${esc(t('capture.modeSpeak'))}</button>
  </div>
  <button class="shutter" data-act="go" data-to="chooser" aria-label="${esc(t('capture.shutter'))}"></button>
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

/**
 * The report's own sections for the rows the reader was sure of, in the order printed, and
 * one last group for every row it was not (`sectionsOf` in the app). That group exists so a
 * patient reads the doubtful rows against the paper together, instead of meeting a caption
 * on each one scattered through eleven pages.
 */
type Group = { title: string; uncertain: boolean; rows: { row: LabRow; index: number }[] };
function groupsOfRows(): Group[] {
  const groups: Group[] = [];
  const doubtful: { row: LabRow; index: number }[] = [];
  LAB_ROWS.forEach((row, index) => {
    if (row.confidence < 0.6) {
      doubtful.push({ row, index });
      return;
    }
    const last = groups[groups.length - 1];
    if (last && last.title === row.section) last.rows.push({ row, index });
    else groups.push({ title: row.section, uncertain: false, rows: [{ row, index }] });
  });
  if (doubtful.length > 0) groups.push({ title: '', uncertain: true, rows: doubtful });
  return groups;
}

function lab(): string {
  const chosen = state.accepted.size;
  const everyOne = chosen === LAB_ROWS.length;
  const doubtful = LAB_ROWS.filter((row) => row.confidence < 0.6).length;
  return `${header(t('documents.title'), true)}
  <div class="scroll">
    <div class="card quiet">
      <span class="subheading">${esc(t('documents.reviewTitle'))}</span>
      <span class="caption">${esc(t('documents.reviewBody'))}</span>
    </div>
    <div class="card">
      <span class="label">${esc(t('documents.reportDate'))}</span>
      <div class="field">${esc(t('home.readingDay'))}</div>
    </div>
    <div class="card">
      <span class="strong">${
        state.lang === 'ne'
          ? `${n(String(LAB_ROWS.length))} मध्ये ${n(String(chosen))} छानिएको`
          : `${chosen} of ${LAB_ROWS.length} chosen`
      }</span>
      ${
        doubtful > 0
          ? `<span class="caption">${
              state.lang === 'ne'
                ? `यीमध्ये ${n(String(doubtful))} पढ्न गाह्रो भयो`
                : doubtful === 1
                  ? '1 of these was hard to read'
                  : `${doubtful} of these were hard to read`
            }</span>`
          : ''
      }
      <button class="secondary" data-act="all">${esc(
        everyOne ? t('documents.takeNone') : t('documents.takeAll'),
      )}</button>
    </div>
    ${groupsOfRows().map(labGroup).join('')}
    <div class="card">
      <span class="label">${esc(t('documents.truncatedTitle'))}</span>
      <span class="caption">${esc(t('documents.truncated'))}</span>
    </div>
    <p class="caption">${esc(t('documents.keptEitherWay'))}</p>
  </div>
  <div class="footerbar">
    <button class="primary">${
      state.lang === 'ne'
        ? chosen === 0
          ? 'कागजात सुरक्षित गर्नुहोस्'
          : `कागजात र ${n(String(chosen))} मान सुरक्षित गर्नुहोस्`
        : chosen === 0
          ? 'Save the document'
          : `Save the document and ${chosen} value${chosen === 1 ? '' : 's'}`
    }</button>
  </div>`;
}

const labGroup = (group: Group, gi: number): string => `<div class="card list">
  <div class="grouphead">
    <span class="label">${esc(
      group.uncertain ? t('documents.checkGroupTitle') : group.title || t('documents.otherValues'),
    )}</span>
    <button class="link" data-act="section" data-group="${gi}">${
      state.lang === 'ne'
        ? `यी ${n(String(group.rows.length))} लिनुहोस्`
        : `Take these ${group.rows.length}`
    }</button>
  </div>
  ${group.uncertain ? `<span class="caption">${esc(t('documents.checkGroupBody'))}</span>` : ''}
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

// ── the review screen ─────────────────────────────────────────────────────────
/** A band in force and where it came from (the app's `bandsInForce`). */
type Band = { min: number; max: number; origin: 'plan' | 'who_pen' | 'ada_2026' };
const BANDS: Record<'fasting' | 'postMeal', Band> = {
  fasting: { min: 80, max: 130, origin: 'plan' },
  // The default target: the WHO PEN low line (70) to one under ADA's post-meal line (180).
  postMeal: { min: 70, max: 179, origin: 'ada_2026' },
};

/**
 * Seven days of readings, the same ones Home and Logs show where they overlap: written on 5
 * of the 7 days, yesterday's 122 and 186, today's 140. Every figure on the review screen is
 * computed from this list at render time rather than typed in, so the screen cannot disagree
 * with itself.
 */
type Context = 'fasting' | 'afterMeal' | 'bedtime';
const READINGS: { day: number; at: string; mgdl: number; context: Context }[] = [
  { day: 10, at: '06:50', mgdl: 118, context: 'fasting' },
  { day: 10, at: '21:00', mgdl: 168, context: 'afterMeal' },
  { day: 12, at: '06:40', mgdl: 124, context: 'fasting' },
  { day: 12, at: '20:30', mgdl: 142, context: 'afterMeal' },
  { day: 12, at: '22:10', mgdl: 138, context: 'bedtime' },
  { day: 14, at: '06:55', mgdl: 138, context: 'fasting' },
  { day: 14, at: '21:15', mgdl: 204, context: 'afterMeal' },
  { day: 14, at: '22:20', mgdl: 150, context: 'bedtime' },
  { day: 15, at: '06:58', mgdl: 122, context: 'fasting' },
  { day: 15, at: '21:05', mgdl: 186, context: 'afterMeal' },
  { day: 16, at: '07:12', mgdl: 140, context: 'fasting' },
];
/** HbA1c as the labs printed it: today's report (the one on the lab screen) and August's. */
const HBA1C = [
  { date: { en: '12 Aug 2026', ne: '१२ अगस्ट २०२६' }, value: '7.6', unit: '%' },
  { date: { en: '16 Sep 2026', ne: '१६ सेप्टेम्बर २०२६' }, value: '7.2', unit: '%' },
];
/** The lines no plan overrides (`glucose-defaults.ts`): under 70 is WHO PEN, under 54 ADA. */
const LOW_LINES = [
  { below: 70, origin: 'who_pen' },
  { below: 54, origin: 'ada_2026' },
] as const;

const hoursOf = (r: { day: number; at: string }): number => {
  const [h, m] = r.at.split(':').map(Number) as [number, number];
  return r.day * 24 + h + m / 60;
};
const glucose = (mgdl: number): string => `${n(String(mgdl))} mg/dL`;

/**
 * The chart as `layoutGlucoseChart` draws it: the bands shaded across the plot, every reading
 * the same dot in the same ink whatever its value, readings more than a day apart left
 * unjoined, and the value axis padded 10 mg/dL beyond the lowest and highest of the readings
 * and bands. Nothing changes colour at any value.
 */
function reviewChart(): string {
  const W = 304;
  const H = 180;
  const pad = { top: 8, right: 8, bottom: 24, left: 40 };
  const plot = { x: pad.left, y: pad.top, w: W - pad.left - pad.right, h: H - pad.top - pad.bottom };
  const values = [...READINGS.map((r) => r.mgdl), ...Object.values(BANDS).flatMap((b) => [b.min, b.max])];
  const lo = Math.min(...values) - 10;
  const hi = Math.max(...values) + 10;
  const from = 9 * 24 + 14; // a week back from now
  const to = 16 * 24 + 14; // 16 Sep, 2 pm
  const x = (hours: number) => plot.x + ((hours - from) / (to - from)) * plot.w;
  const y = (mgdl: number) => plot.y + plot.h - ((mgdl - lo) / (hi - lo)) * plot.h;

  const bands = Object.values(BANDS)
    .map(
      (b) =>
        `<rect x="${plot.x}" y="${y(b.max)}" width="${plot.w}" height="${y(b.min) - y(b.max)}" fill="var(--band)"/>`,
    )
    .join('');
  const ticks = [100, 150, 200]
    .map(
      (v) => `<line x1="${plot.x}" x2="${plot.x + plot.w}" y1="${y(v)}" y2="${y(v)}" stroke="var(--grid)" stroke-width="1"/>
        <text x="${plot.x - 6}" y="${y(v) + 4}" text-anchor="end">${n(String(v))}</text>`,
    )
    .join('');
  // Nepali month names are twice the width, so the axis drops to the two ends there, as the
  // app does when its day labels would collide.
  const days =
    state.lang === 'ne'
      ? [
          { at: from, label: '९ सेप्टेम्बर २०२६', anchor: 'start' },
          { at: to, label: '१६ सेप्टेम्बर २०२६', anchor: 'end' },
        ]
      : [
          { at: from, label: '9 Sep 2026', anchor: 'start' },
          { at: (from + to) / 2, label: '13 Sep 2026', anchor: 'middle' },
          { at: to, label: '16 Sep 2026', anchor: 'end' },
        ];
  const dayText = days
    .map((d) => `<text x="${x(d.at)}" y="${plot.y + plot.h + 16}" text-anchor="${d.anchor}">${d.label}</text>`)
    .join('');

  const runs: string[][] = [];
  READINGS.forEach((r, i) => {
    const previous = READINGS[i - 1];
    if (!previous || hoursOf(r) - hoursOf(previous) > 24) runs.push([]);
    runs[runs.length - 1]!.push(`${runs[runs.length - 1]!.length === 0 ? 'M' : 'L'}${x(hoursOf(r))} ${y(r.mgdl)}`);
  });
  const lines = runs
    .filter((run) => run.length > 1)
    .map((run) => `<path d="${run.join(' ')}" fill="none" stroke="var(--p-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`)
    .join('');
  const points = READINGS.map(
    (r) => `<circle cx="${x(hoursOf(r))}" cy="${y(r.mgdl)}" r="3.5" fill="var(--ill-ink)"/>`,
  ).join('');

  return `<svg class="chart" viewBox="0 0 ${W} ${H}" width="100%" aria-hidden="true">
    ${bands}${ticks}
    <line x1="${plot.x}" x2="${plot.x + plot.w}" y1="${plot.y + plot.h}" y2="${plot.y + plot.h}" stroke="var(--p-border-strong)" stroke-width="1"/>
    ${dayText}${lines}${points}</svg>`;
}

/**
 * The HbA1c card's drawing: the results joined, 96 high, with a base line and nothing else.
 * No target line, no band and no colour of its own; every value it joins is a row below.
 */
function hba1cLine(): string {
  const W = 304;
  const H = 96;
  const inset = 12;
  const values = HBA1C.map((p) => Number(p.value));
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const pad = Math.max((hi - lo) * 0.2, 0.5);
  const y = (v: number) => H - inset - ((v - (lo - pad)) / (hi + pad - (lo - pad))) * (H - 2 * inset);
  const x = (i: number) => inset + (i / (HBA1C.length - 1)) * (W - 2 * inset);
  const d = values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ');
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" width="100%" aria-hidden="true">
    <line x1="${inset}" x2="${W - inset}" y1="${H - inset}" y2="${H - inset}" stroke="var(--p-border-strong)" stroke-width="1"/>
    <path d="${d}" fill="none" stroke="var(--p-primary)" stroke-width="1.5"/>
    ${values.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" fill="var(--ill-ink)"/>`).join('')}</svg>`;
}

/**
 * Review (M11 F01): the period, the chart, time in target, the counts under the two low
 * lines, averages by time of day, and HbA1c as printed. Values only; no sentence says what a
 * number means, and no reading or row is drawn differently from another. Every figure a
 * default drives names the body that published it.
 */
function review(): string {
  const bandKey = (c: Context): 'fasting' | 'postMeal' | null =>
    c === 'fasting' ? 'fasting' : c === 'afterMeal' ? 'postMeal' : null;
  let inBand = 0;
  let measured = 0;
  for (const r of READINGS) {
    const key = bandKey(r.context);
    if (!key) continue;
    measured += 1;
    if (r.mgdl >= BANDS[key].min && r.mgdl <= BANDS[key].max) inBand += 1;
  }
  const unbanded = READINGS.length - measured;
  const allOwn = BANDS.fasting.origin === 'plan' && BANDS.postMeal.origin === 'plan';
  const bandLine = (key: 'fasting' | 'postMeal') =>
    tf('review.timeInTarget.band', {
      band: t(`review.chart.band.${key}`),
      min: n(String(BANDS[key].min)),
      max: n(String(BANDS[key].max)),
      unit: 'mg/dL',
      origin: t(`defaults.origin.${BANDS[key].origin}`),
    });
  const legend = (key: 'fasting' | 'postMeal') =>
    `<span class="legendrow"><span class="swatch"></span><span class="caption">${esc(
      tf('review.chart.bandWithOrigin', {
        label: tf('review.chart.bandLabel', {
          band: t(`review.chart.band.${key}`),
          min: n(String(BANDS[key].min)),
          max: n(String(BANDS[key].max)),
          unit: 'mg/dL',
        }),
        origin: t(`defaults.origin.${BANDS[key].origin}`),
      }),
    )}</span></span>`;

  const averages = (['fasting', 'afterMeal', 'bedtime'] as const)
    .map((context) => {
      const values = READINGS.filter((r) => r.context === context).map((r) => r.mgdl);
      if (values.length === 0) return '';
      const mean = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
      return listRow(
        t(`context.${context}`),
        tf('review.averages.spread', {
          min: glucose(Math.min(...values)),
          max: glucose(Math.max(...values)),
          count: values.length,
        }),
        glucose(mean),
      );
    })
    .join('');

  return `${header(t('review.title'), true)}
  <div class="scroll">
    <div class="card">
      <span class="label">${esc(t('review.rangeLabel'))}</span>
      <div class="chips">
        <button class="chip on">${esc(t('review.range.d7'))}</button>
        <button class="chip">${esc(t('review.range.d14'))}</button>
        <button class="chip">${esc(t('review.range.d30'))}</button>
      </div>
    </div>

    <div class="card">
      <span class="label">${esc(t('review.chart.title'))}</span>
      ${reviewChart()}
      <div class="legend">
        ${legend('fasting')}
        ${legend('postMeal')}
        <span class="caption">${esc(tf('review.chart.readings', { count: READINGS.length }))}</span>
      </div>
    </div>

    <div class="card">
      <span class="label">${esc(t(allOwn ? 'review.timeInTarget.title' : 'review.timeInTarget.titleMixed'))}</span>
      <span class="metric">${esc(tf('review.timeInTarget.value', { percent: Math.round((inBand / measured) * 100) }))}</span>
      <div class="tit-bar" aria-hidden="true">
        <span class="fill" style="flex-grow:${inBand}"></span><span class="gap" style="flex-grow:${measured - inBand}"></span>
      </div>
      <span class="caption">${esc(tf('review.timeInTarget.basis', { measured, total: READINGS.length }))}</span>
      ${unbanded > 0 ? `<span class="caption">${esc(tf('review.timeInTarget.unbanded', { count: unbanded }))}</span>` : ''}
      <span class="caption">${esc(bandLine('fasting'))}</span>
      <span class="caption">${esc(bandLine('postMeal'))}</span>
    </div>

    <div class="card list">
      <span class="label">${esc(t('review.under.heading'))}</span>
      ${LOW_LINES.map((line) =>
        listRow(
          tf('review.under.title', { value: glucose(line.below) }),
          t(`defaults.origin.${line.origin}`),
          n(String(READINGS.filter((r) => r.mgdl < line.below).length)),
        ),
      ).join('')}
    </div>

    <div class="card list">
      <span class="label">${esc(t('review.averages.title'))}</span>
      ${averages}
    </div>

    <div class="card list">
      <span class="label">${esc(t('analyte.hba1c'))}</span>
      ${hba1cLine()}
      ${[...HBA1C]
        .reverse()
        .map((point) =>
          listRow(point.date[state.lang], '', tf('review.hba1c.value', { value: n(point.value), unit: point.unit })),
        )
        .join('')}
      <span class="caption padded">${esc(t('review.hba1c.basis'))}</span>
    </div>
  </div>`;
}

function assistant(): string {
  const examples = ['question', 'action', 'plan', 'reminder', 'help']
    .map((key) => `<span class="caption">${esc(t(`assistant.example.${key}`))}</span>`)
    .join('');
  // The answer is the tool's figures, shown the moment the question is sent. A model may add
  // a sentence above them afterwards, only if it parses and names no number the tool did
  // not produce; the replica shows the figures, which are what every answer is guaranteed.
  return `${header(t('assistant.title'), true)}
  <div class="scroll">
    ${
      state.asked
        ? `<div class="card ask"><span>${esc(t('assistant.example.question'))}</span></div>
           <div class="card">
             <span class="label">${esc(t('assistant.answerLabel'))}</span>
             <span class="metric">${n('128')} mg/dL</span>
             <span class="caption">${esc(t('assistant.basedOn'))}</span>
           </div>
           <span class="caption">${esc(t('assistant.disclaimer'))}</span>`
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

/**
 * The plan as the app lays it out since F52 and the prescription import: the date it took
 * effect first, then who wrote it, the targets, the medicines, what to do if low, whom to
 * call, and what is next. The medicine times and the next dates are passed through as typed,
 * so they stay in the digits they were typed in, in either language.
 *
 * **The targets card always shows both bands, each with where it came from** (M11 F02). This
 * patient wrote down a fasting range and no after-meal one, so the fasting row is their own
 * and the after-meal row is the published default: ADA's line of 180, as an inclusive range
 * from the WHO PEN low line of 70. Both are printed in the patient's unit, so in Nepali the
 * digits are Devanagari. The founder's dosing sentence closes the screen.
 */
const targetRow = (title: string, band: Band): string =>
  listRow(
    title,
    t(`defaults.origin.${band.origin}`),
    `${n(String(band.min))}–${n(String(band.max))} mg/dL`,
  );

const plan = (): string => `${header(t('plan.title'))}
  <div class="scroll">
    <span class="caption">${esc(t('plan.effectiveFrom'))}</span>
    <div class="card list">
      ${listRow(t('plan.doctorName'), '', 'Dr. Sharma')}
      ${listRow(t('plan.clinic'), '', 'City Diabetes Clinic')}
    </div>
    <div class="card list">
      <span class="subheading">${esc(t('plan.targets'))}</span>
      ${targetRow(t('plan.targetsFasting'), BANDS.fasting)}
      ${targetRow(t('plan.targetsPostMeal'), BANDS.postMeal)}
    </div>
    <div class="card list">
      <span class="subheading">${esc(t('plan.medications'))}</span>
      ${listRow('Metformin', '500 mg · 08:00, 20:00')}
      ${listRow('Glimepiride', '1 mg · 08:00')}
    </div>
    <div class="card">
      <span class="subheading">${esc(t('plan.ifIFeelLow'))}</span>
      <span>“Take what I told you and call the clinic if it happens twice in a week.”</span>
    </div>
    <div class="card list">
      <span class="subheading">${esc(t('plan.emergencyContact'))}</span>
      ${listRow('Sabina', '', '9800000000')}
    </div>
    <div class="card list">
      ${listRow(t('plan.nextVisit'), '', '2026-11-14')}
      ${listRow(t('plan.nextLabs'), 'HbA1c, lipid profile', '2026-11-14')}
    </div>
    <span class="caption">${esc(t('plan.transcribedNote'))}</span>
    <button class="link">${esc(t('plan.history'))}</button>
    <p class="disclaimer">${esc(t('disclaimer.dosing'))}</p>
  </div>
  <div class="footerbar">
    <button class="primary">${esc(t('plan.update'))}</button>
  </div>`;

/**
 * More, by the model's state: the assistant's own row where the model is on the phone, a row
 * offering the download where it could be, and nothing where the phone is below the gate.
 */
const more = (): string => `${header(t('more.title'))}
  <div class="scroll">
    <p class="muted">${esc(t('more.body'))}</p>
    <div class="card list">
      ${listRow(t('summary.title'), t('summary.subtitle'))}
      ${listRow(t('documents.title'), '')}
      ${listRow(t('reminders.title'), t('settings.remindersBody'))}
      ${
        state.model === 'installed'
          ? listRow(t('assistant.title'), t('assistant.emptyBody'), '', 'data-act="go" data-to="assistant"')
          : state.model === 'download'
            ? listRow(t('assistant.needsModelTitle'), t('assistant.needsModelBody'))
            : ''
      }
    </div>
    <div class="card list">
      ${listRow(t('backup.title'), t('backup.lastBackup'))}
      ${listRow(t('settings.title'), '', '', 'data-act="go" data-to="settings"')}
    </div>
    <p class="disclaimer">${esc(t('disclaimer.line'))}</p>
  </div>`;

/**
 * Settings. Since M11 the medicine-name count is in the reading language's digits, and the
 * storage size always was (`formatBytes`, which keeps one decimal only under 10, so 12 MB).
 * The entry and file counts are still printed with `String()`, so they stay ASCII in Nepali,
 * as they do in the app.
 */
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
      ${listRow(t('accessibility.title'), t('accessibility.rowBody'))}
      ${listRow(t('accounts.title'), t('accounts.rowBody'))}
      ${listRow(t('relationships.title'), t('relationships.rowBody'))}
      ${listRow(t('settings.lock'), t('settings.lockDevice'))}
      ${listRow(t('assistant.title'), t('settings.assistantBody'), 'On')}
      ${listRow(t('flags.title'), t('settings.flagsBody'))}
    </div>

    <span class="grouplabel">${esc(t('settings.groupData'))}</span>
    <div class="card list">
      ${listRow(t('settings.lists'), n('6'))}
      ${listRow(t('settings.storage'), t('settings.storageBody'), n('12 MB'))}
      ${listRow(t('settings.storageEntries'), '', '168')}
      ${listRow(t('settings.storageFiles'), '', '23')}
      ${listRow(t('telemetry.rowTitle'), t('telemetry.rowOff'))}
      ${listRow(t('settings.deleteAll'), t('settings.deleteAllBody'))}
    </div>

    <div class="card">
      <span class="subheading">${esc(t('settings.about'))}</span>
      <p class="disclaimer">${esc(t('disclaimer.line'))}</p>
      ${listRow(t('scope.rowTitle'), t('scope.rowBody'))}
      ${listRow(t('settings.diagnostics'), t('settings.diagnosticsBody'))}
      <span class="caption">${esc(t('settings.version'))}</span>
    </div>
  </div>`;

const SCREENS: Record<ScreenId, () => string> = {
  home,
  record,
  review,
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
      'Your last reading is stated, never judged: no colour, no arrow, no comparison drawn for you.',
      'Progress is a rolling window: seven bars, three of them quiet. A day with nothing written is drawn in the paper colour, never in red.',
      '“If I feel low” sits on Home, one scroll down, and every word in it was transcribed from your own doctor.',
      'After a reading under 54 mg/dL in the last hour, Call moves to the top of that card. The reading itself looks the same as any other.',
      'Below it, three facts and no opinion: when the last reading was written, when the next lab test is due, how many readings since the last report.',
    ],
  },
  record: {
    title: 'Everything, newest first',
    points: [
      'Eleven kinds of entry share one timeline: readings, insulin, medicines, meals, activity, blood pressure, weight, symptoms, notes, documents and lab values.',
      'Each row says where it came from: typed, or read from a photo you confirmed.',
      'Nothing is overwritten. An edit supersedes; the earlier version stays in the record.',
      'The row at the top opens Review, the figures worked out from these readings.',
    ],
  },
  review: {
    title: 'Figures, and where each line came from',
    points: [
      'Time in target, the readings under 70 and 54 mg/dL, averages by time of day, and HbA1c as the lab printed it. No sentence says what any of it means.',
      'Where the plan gives no range, the app uses a published default: WHO PEN first, ADA where WHO PEN has none. Every figure it drives is labelled with its source.',
      'Here the fasting range is the patient’s own and the after-meal range is the ADA default, so the card is titled “In the target range”, not “In your doctor’s range”.',
      'A count of zero looks the same as a count of five. No reading is drawn in a different colour.',
      'HbA1c is only ever what a lab report printed. The app does not estimate one from fingerstick readings.',
    ],
  },
  capture: {
    title: 'The camera is the middle button',
    points: [
      'It opens on Photo, always, never on the last mode you used.',
      'Type and Speak sit beside it at the same size: most of the eleven kinds have no photo to take.',
      'Speech is recognised on the phone. Nothing is sent anywhere to be transcribed.',
    ],
  },
  chooser: {
    title: 'It asks rather than guesses',
    points: [
      'When the app can tell what a photo shows, it opens that form. When it is unsure, the form it opens says so, and the other kinds are one tap away on the same screen.',
      'This full list is for the photo it has nothing to go on for.',
      'Whatever you pick, the photo travels with you to the next screen.',
    ],
  },
  lab: {
    title: 'Fifty-three values off eleven pages',
    points: [
      'These are the real rows the app reads from a Kathmandu panel, grouped under the report’s own headings.',
      'Nothing is ticked when it opens. Taking the whole report is one deliberate act, not a pre-ticked list.',
      'Tick a row and it opens for editing, so a misread digit is fixed while the paper is still in your hand.',
      'Rows the reader was unsure of are gathered at the end under one heading, to be read against the paper before they are ticked.',
    ],
  },
  assistant: {
    title: 'It answers from your logs, and nothing else',
    points: [
      'Questions are answered by looking things up in your own record: averages, what the doctor said, when a test is due.',
      'It does not answer medical questions, and the fine print says so before you ask the first one.',
      'The figures come from your record and appear as soon as you ask. A model on the phone may add a sentence afterwards, and a sentence that names a number your record did not produce is dropped.',
      'The model runs on the phone. The question and the answer stay there.',
      'A phone that could hold the model and has not downloaded it shows the download on the disc instead. A phone too small for it shows no disc at all. Try the three with the control beside the phone.',
    ],
  },
  plan: {
    title: 'The plan is transcribed, never authored',
    points: [
      'Every word here was typed in from what your doctor said, or read from a photo of the prescription and confirmed. The app never writes medical instructions of its own.',
      'Each target row says where its range came from. This patient wrote down a fasting range, and the after-meal row is the published ADA default, labelled as one.',
      'The screen ends with one sentence, word for word: the app does not calculate or recommend insulin doses.',
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
      'English and Nepali at full parity. Switch the language here and the whole preview follows.',
      'The theme picker in the site header drives the phone: the app ships the same four.',
      'There is nothing to sign in to, and nothing to sign out of.',
      'Sharing is with someone you pair with, at one of three levels: everything with the numbers, ranges without the numbers, or alerts only. What travels between the two phones is sealed, and the server that carries it cannot read it.',
      'A person you mark as an emergency contact gets a message when a reading is past a default line. It may arrive late, and it is not an emergency service.',
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
      (element.dataset.preview === 'lang' && element.dataset.to === state.lang) ||
      (element.dataset.preview === 'model' && element.dataset.to === state.model);
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
  else if (act === 'back')
    state.screen = state.screen === 'lab' ? 'chooser' : state.screen === 'review' ? 'record' : 'home';
  else if (act === 'filter') state.filter = to!;
  else if (act === 'model') {
    state.model = to as typeof state.model;
    if (state.model !== 'installed' && state.screen === 'assistant') state.screen = 'home';
  }
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
