# cosys.work site content (v4.3, 2026-09-26)

This is the English source copy. Nepali (`ne`) versions are needed for every block before launch and must be reviewed by a native speaker. English stays the default language. Keep the current visual design. `[Screenshot: …]` marks where an image goes. No em dashes anywhere in the copy, in either language.

**Status and pricing (founder, 2026-09-26).** Say **Nepal**, never Kathmandu or Janakpur (the 22% figure is described as "the capital's screening", source kept). **The Diabetes App is in closed pilot**, free forever, with optional paid services from third parties in its peer-to-peer marketplace, coming soon: lab tests, home sample collection, clinic and physiotherapy appointments, dietitians, gym coaches' at-home exercise video packages, CGM and glucometer plugins, and telemedicine and online appointments as third-party offerings. **The Clinic App is in development, preview available on request**, free during the preview and for up to 10 active patients, then Rs 5,000–10,000 a month. The live site at cosys.work is the current copy; sections below that still say otherwise are superseded by these lines.

**Positioning.** cosys.work is collaborative systems for the care people do themselves between clinic visits, across chronic and comorbid conditions (diabetes, blood pressure, menopause, arthritis and more), with a specialised app for each, starting with diabetes. Peer-to-peer, private and sovereign.

**Naming.** The app is **The Diabetes App**, or **tda by cosys** where a short name is needed. Don't call it TApp on the site, and don't use cosys.work as the app's name: cosys.work is the company.

**What changed from v3.** Brought in line with the app as built through Milestone 11 and with the Clinic App as proposed (ADR-20). The patient app's features are stated as they work. Clinic features are marked as coming with the Clinic App, because none of it is built yet. The Platform section now describes the network the app actually uses. See *Check before publishing* at the end for four points that need a decision.

Global header: **Home · Diabetes App · Clinic App · Platform · Company** · language switch **English | नेपाली**

Global footer: "cosys.work · Nepal, Nepal · hello@cosys.work · Privacy" *(add "Open source on GitHub" only once the repository is public; see the checks at the end)*

---

## Home (`/`)

### Hero
**Health care that keeps going between visits.**

Most care happens at home, in the months between clinic visits. cosys.work builds collaborative systems for that part: you, the family who help you, and your doctor, working on your care together. For chronic and comorbid conditions, starting with diabetes.

Buttons: **[Join the patient waitlist]** **[Bring your clinic]**

Small print under the buttons: *Peer-to-peer, private and sovereign. Built in Nepal.*

### One app for each condition
**Specialised apps, coming soon. Starting with diabetes.**

Each condition gets an app built for it, with the words, the readings and the plans that condition needs. They share one record on your phone, because many people live with more than one.

- **Diabetes** *(in closed pilot)*: The Diabetes App, the first of them. Photo logging, your doctor's plan, and family who help.
- **Blood pressure** *(coming soon)*: readings, medicines and your doctor's targets, over time.
- **Menopause** *(coming soon)*: symptoms, cycles and treatments, noted in your own words.
- **Arthritis** *(coming soon)*: pain, stiffness, medicines and what helps, day by day.
- **And more** *(coming soon)*: conditions rarely come alone. The apps share one record, so they work together.

### Peer-to-peer, private and sovereign
- **Peer-to-peer.** Your record moves directly between your phone and the people you choose: family who help, and later your clinic. No central server holds it.
- **Private.** Photos are read and questions answered on your phone. Anything that travels is sealed so only the phones you chose can open it.
- **Sovereign.** The record is yours. You decide who sees what, you can end any share, and you can take the whole of it with you as a file.

### How it works, starting with diabetes
1. **Snap.** Photograph your glucometer or a lab report. The number is read on your phone, and you check it before it's saved. This works in airplane mode.
2. **Share.** Choose family members who help you, and choose what each one sees. Before a visit, make a one-page summary of your last month as a PDF to show or send your doctor. When your clinic joins through the Clinic App, you'll scan its QR code and the summary reaches your doctor directly.
3. **Follow.** Your targets, medicines and your doctor's instructions sit on a plan card on your phone, with reminders for your medicines. Later, with the Clinic App, your clinic will be able to set the plan and send a checklist of next tests.

[Screenshot: the three steps on the phone]

### Why Nepal, why now
- **22%** of adults over 30 had high blood sugar in the capital's 2024–25 screening of 19,660 people. *(Source: Kathmandu Post, Nov 2025)*
- Most people with diabetes see a doctor every **2–3 months**. Sugar levels change every day.
- In the clinics we've spoken to, intake takes **1–2 hours** for a **5–15 minute** consultation. *(What we have seen, not a formal study.)*

### What makes it different

| | Typical diabetes apps | The Diabetes App |
|---|---|---|
| Works with no signal | Partly, or not at all | Yes: logging, photos, your summary and reminders (the assistant too, on phones with about 6 GB of memory) |
| Where the AI runs | In the cloud | On your phone |
| Who holds your record | The app company's servers | You, on your phone |
| Cost to patients | Free trial, then a subscription | Free, always |
| Share with family | The full numbers | Your choice for each person: the numbers, the range only, or alerts only |
| Your doctor's targets | Typed in by you, or none | Your doctor's, or published WHO and ADA values, always labelled with where they came from |

### Our promises
- **Your doctor decides; the app remembers.** It never calculates or recommends insulin doses, and it never estimates carbohydrates or calories.
- **Your record belongs to you.** Export it at any time as PDF or CSV, or as an encrypted backup only your passphrase opens. There is no cloud copy of your record.
- **Built for the hard case first.** It runs on low-cost Android phones, on slow networks and in Nepali.

### Closing call to action
**Being built in Nepal.** Clinics: see the Clinic App and request a walkthrough. Patients: join the waitlist and we'll tell you when the app is ready for you.

Buttons: **[Bring your clinic]** **[Join the patient waitlist]**

---

## The Diabetes App (`/diabetes-app`)

### Hero
**A diabetes companion that works with no signal.**

Log by photo, see your readings over time, and follow the plan your doctor gave you, all on your phone. For Type 2, Type 1, gestational diabetes and prediabetes.

Button: **[Join the patient waitlist]** · *Free for patients, always.*

### Log in seconds
- **Glucometer:** take a photo of the display. The number is read on your phone, and you confirm it before it's saved. It works with the meters sold in Nepal; no Bluetooth needed.
- **Lab reports:** snap or pick your HbA1c, lipid or kidney report. The values are read on your phone and saved with the report's date once you've checked them.
- **Meals:** add a photo and your own note of how the meal felt: light, usual or heavy. *Coming soon:* a colour cue from the photo, trained on Nepali food, once its fine-tuning is done and it has regulatory approval. Until then your own note is the record. The app never counts carbohydrates or calories.
- **Medicines:** answer a reminder with *Taken*, or tick the medicine when you take it.
- **Blood pressure and weight:** type the numbers from your monitor or scale.
- **Notes:** type or speak a note, or mark a question "ask my doctor" so it's on your next visit summary.

[Screenshot: camera logging a glucometer reading with the confirm step]

### See your readings over time
- The share of your readings that were in your target range over the last 7, 14 or 30 days, with the range beside it and where it came from.
- Your average for each time of day: fasting, after meals, and so on.
- How many readings were under 70 mg/dL and under 54 mg/dL, each line labelled with its source.
- Your HbA1c from your lab reports, over time.

A reading outside your range is shown as it is, with no alarm colour and no verdict.

### Your doctor's plan, in your pocket
Your targets, medicines and your doctor's instructions for a low sit on a plan card. You copy them from your prescription, and a photo of the prescription can fill the card in for you to check. Where your doctor hasn't set a target, the app uses published values from the World Health Organization, with the American Diabetes Association's where WHO has none, and says so beside every figure they affect. Every earlier version of your plan is kept.

When your clinic uses the Clinic App, your doctor will be able to set the plan directly. It will show who set it and when.

[Screenshot: plan card with its targets labelled "Default (WHO)"]

### If you feel low
The *If I feel low* card on your home screen shows the steps you wrote down from your doctor and a button to call your emergency contact. After a reading under 54 mg/dL, the call button comes first. It works with no signal.

If you choose, the family members you mark as emergency contacts get a notification when a reading goes under 70 or under 54 mg/dL, or reaches 325 mg/dL. The notification names the line it crossed, never the number. It arrives when your phone next has a signal, so it is not real time, and it is not an emergency service.

### Reminders
Reminders for your medicines, with *Taken*, *Not now* and *Snooze* on the notification itself. If a medicine reminder gets no answer, one follow-up arrives 30 minutes later, and never more than one. You can turn the follow-up off for each reminder.

### Take a summary to your visit
Make a PDF of the last 30 or 90 days in two taps. The first page is a single sheet your doctor can read in a minute: time in range, readings under the low lines, your medicines taken, your latest labs, blood pressure and weight, and your questions. The detail follows, and a spreadsheet (CSV) comes with it.

### Share the way you want
Add family members who help with your diabetes and choose what each person sees:
- **Numbers:** your readings, as you logged them.
- **Range only:** whether each reading was below, in or above your range, shown as a word and a colour, without the number.
- **Alerts only:** nothing, unless a reading crosses one of the lines above.

Only the people you mark as emergency contacts get alerts. A relative who lives far away can follow along without being woken at night. You can change or remove anyone at any time. A family member can also follow a parent's record on their own phone, read-only, alongside their own.

### In your language
English and Nepali. Maithili is planned.

### The facts
- **Price:** free, always, for patients.
- **Phones:** Android phones, including low-cost ones. *(Minimum Android version: to confirm before launch.)*
- **Internet:** not needed for daily use. Updates to your family travel when you're connected, sealed so that only their phones can read them. Syncing with your clinic arrives with the Clinic App.
- **The assistant:** *Ask about my log* answers questions about your own entries, on phones with about 6 GB of memory. It never answers medical questions and never suggests a dose. Everything else works on every supported phone.
- **Your data:** stays on your phone and on the phones you choose. Export it or back it up at any time.

### Frequently asked questions
- **When can I use it?** The Diabetes App is being built in Nepal, and it is not open to the public yet. Join the waitlist and we will tell you when it is ready for you.
- **Does it really work with no internet?** Yes. Logging, reading a photo, your summary, your plan and your reminders all run on the phone. The internet is used only to send updates to the family members you chose, and it waits until you are connected.
- **Does the app calculate my insulin dose?** No, and it never will. The app is a record-keeping and communication tool. It does not calculate or recommend doses, and it does not estimate carbohydrates or calories. Dosing and treatment decisions belong to your doctor.
- **What happens to my photos?** They are read on your phone and never sent to a server. A number read from a photo is only a suggestion until you confirm it, and you can always type the value instead.
- **Where do the target ranges come from?** From your doctor, when you copy their targets onto the plan card. Where a target is missing, the app uses published values from the World Health Organization, with the American Diabetes Association’s where WHO has none, and it labels every figure those values affect.
- **Who sees my readings?** Only the people you add, at the level you choose for each: the numbers, the range only, or alerts only. Updates are sealed so only their phones can read them. You can change or remove anyone at any time.
- **Is an alert an emergency service?** No. An alert reaches your emergency contacts when your phone next has a signal, so it is not real time. In an emergency, call for help directly. The If I feel low card puts your contact’s call button first after a reading under 54 mg/dL.
- **What if I lose my phone?** Make an encrypted backup from the app and keep it somewhere safe. Only your passphrase opens it, and restoring it on a new phone brings your record back. There is no cloud copy, so the backup is the copy.
- **What does the assistant do?** Ask about my log answers questions about your own entries, such as your last reading or whether you took your medicine today, on phones with about 6 GB of memory. It runs on the phone, never answers medical questions, and never suggests a dose.
- **How does this work with my doctor?** Today, show or send them the one-page summary as a PDF. When your clinic uses the Clinic App, which is coming soon, you will be able to scan its QR code and share your history directly, and your doctor will be able to set your plan.
- **How much does it cost?** Nothing. The Diabetes App is free for patients, always.

### Important
Your doctor sets the plan, and the app helps you keep to it.

> This app does not calculate or recommend insulin doses. All dosing decisions are made exclusively by your licensed physician. The app is a record-keeping and communication tool only.

---

## The Clinic App (`/clinic-app`)

### Hero
**Spend the appointment on the patient.**

The consultation is short because everything before it is slow. With the Clinic App, a patient's last month will be on your screen before they sit down.

The Clinic App is coming soon. The patient side of its protocol is already built into The Diabetes App. Our target: halve intake time. *(A target, not yet a result.)*

Button: **[Request a walkthrough]**

### What it will do
- **Sync before the visit.** The patient scans your clinic's QR code, and an encrypted connection brings the history they choose to share to a tablet at your front desk. Each clinic is listed in a signed directory, so the patient knows the clinic they pair with is yours.
- **A one-page summary.** Readings in range, readings under the low lines, medicines taken, latest labs, blood pressure and weight, and the patient's own questions. It's laid out to read in under a minute.
- **Set the plan.** Set glucose targets for each patient, starting from WHO values. Record medicines and doses as prescribed. The plan card on the patient's phone shows it as set by your clinic, signed by the clinician, with every earlier version kept.
- **Make-a-note.** Attach observations to specific readings, and build a record that stays with the patient.
- **Action checklists.** Tests and follow-ups appear as items on the patient's phone, with a printable version. Each item can link to a lab or pharmacy your clinic chooses. The patient approves every step.
- **Close-watch patients.** Ask a patient to add your clinic to their alerts. Only the patient can turn it on. Their alerts then appear on your "needs attention" list.
- **Visit summaries without paper.** The patient's summary PDF arrives in your records with the rest of their shared history.
- **Messages, if both sides want them.** A thread for non-urgent questions between visits. Your clinic turns it on first, and then each patient chooses whether to join. It is not for emergencies.

Later: a **"needs attention" list** of patients with repeated readings under the low lines, gaps in logging, or labs due.

[Screenshot: one-page pre-visit summary]

### Pricing
- **Free** during early access.
- **Free** for up to 50 active patients.
- **Rs 5,000–10,000 a month** after that, depending on clinic size.

### Frequently asked questions
- **When can we use it?** The Clinic App is coming soon. The patient side of its protocol is already built into The Diabetes App, so the clinic side is being designed against something fixed. Request a walkthrough and we will show you where it stands.
- **Where is patient data stored?** On the patient’s phone, and in your clinic’s records once they have shared it with you. Your records are written only by your clinic’s own device. Where they are stored on a server, each patient’s record is sealed with a key your clinic holds, so we cannot read it.
- **Does it replace our existing records system?** No. It sits alongside what you already use. It solves the intake problem, getting a patient’s structured history in front of you at the start of a consultation, rather than trying to be your system of record.
- **What if the clinic’s connection is down?** The patient’s phone and your clinic’s device connect directly when they are in the same room, so a visit does not depend on either side having good internet at that moment. Anything that needs the wider network waits and is sent when a connection returns.
- **Can we see whether patients followed the plan?** You see what they logged and chose to share, including time-stamped medicine records, with the gaps left as gaps. The point is an accurate picture, not a compliance score.
- **Does the app make clinical recommendations?** No. It does not calculate doses, propose diagnoses or rank patients. It structures and summarises what was recorded. Every clinical judgement remains yours.

### Records and responsibility
Your clinic's records are written only by your clinic's own device. Where they're stored on a server, each patient's record is sealed with a key held by your clinic, so we can't read it. The patient can end the share at any time, and can ask for their record to be erased, with a receipt. The Clinic App is designed to support the Nepal Medical Council's telemedicine guidelines: consent, audit trail and encrypted records.

Buttons: **[Request a walkthrough]** · **[See the patient side]**

---

## Platform (`/platform`)

Keep the current architecture copy (device layer, trust fabric, institutional nodes, plugin fabric) and replace the open-infrastructure section with this:

### How the network works
Every phone and every clinic has its own key, made on the device. Phones talk to each other directly when they can, over [iroh](https://github.com/n0-computer/iroh), an open-source peer-to-peer library, with a relay for when they can't reach each other.

When the other phone is offline, the update waits in a mailbox. The mailbox holds only sealed envelopes, and it can't read what's inside. When an alert is waiting, the emergency contact's phone gets a wake-up signal that carries no content at all, not even who sent it.

What leaves a phone is decided on the phone. A family member on *Range only* receives words like "below" or "in range" and never a number, because the number is removed before anything is sealed.

[Diagram: patient phone ↔ family phones ↔ clinic device, with the relay and the sealed mailbox beside them, and nothing readable on either]

### Frequently asked questions
- **What does peer-to-peer mean in practice here?** Records move directly between the devices that need them, over encrypted connections the owner has authorised, using iroh, an open-source peer-to-peer library. A relay helps two phones find each other when they cannot connect directly. It passes on sealed traffic and cannot read it.
- **Is there a server at all?** Yes, three small ones, and none of them can read a record. A relay helps phones connect. A mailbox holds sealed envelopes for a phone that is offline, until it collects them. And a wake-up service tells a phone that something is waiting, with a message that carries nothing: no reading, no name, not even who sent it.
- **How will a clinic get my history?** With the Clinic App, which is coming soon: you scan your clinic’s QR code and choose to share. Your history travels over the encrypted connection, and the clinic keeps what you shared, sealed under its own key.
- **What happens if I lose my phone?** Your record is on your phone and in any encrypted backup you made. A backup opens only with your passphrase, and restoring it on a new phone brings your record back. Keep the backup somewhere safe, because there is no cloud copy to fall back on.
- **How do I know a clinic is really my clinic?** Each clinic will be listed in a signed directory with its name, registration and key, so the app can check that the clinic you pair with is the one you walked into. A person is checked differently, by a short code you read aloud to each other.
- **Who decides what plugins are allowed?** Plugins are planned, not built. The intent is that they travel over the same network, straight to the people who want them. Get in touch if you would like to be an early builder.

Also on this page, corrected to match: the hero reads *"No server that can read your record"*; the institutional-nodes and plugin layers are marked coming and planned; the comparison says no *readable* operator copy; the sovereignty cards describe erasure with a receipt, the passphrase backup, and the number removed on the phone.

### Build a plugin
Dietitians, coaches, researchers and clinics will be able to publish plugins on the network. Get in touch to be an early builder.

Button: **[Get in touch]**

---

## Company (`/company`)

Keep the four commitments. Update them as follows:

- **The record belongs to the patient.**
- **Connectivity is a luxury, not a premise.**
- **Clinicians decide; software remembers.** No dose calculations and no automated diagnosis.
- **The people who live with it should steer it.** Our diabetes trainers, one of whom lives with Type 1, shape what we build.

Add a status line: "Being built in Nepal. The patient app is free, always."

---

## Privacy (`/privacy`)

Update it to match the site and the app:
- The site now has forms. They ask only how to reach someone, are processed by our hosting provider and reach only us; we use them only to reply and delete them on request. (It used to say "No contact forms".)
- Sharing is pairing with a verified device, and updates travel sealed, directly or through a mailbox that can't open them.
- A clinic's copy (with the Clinic App, coming soon) is sealed with the clinic's key, and the patient can ask for erasure with a receipt.
- A backup is an encrypted file only the passphrase opens, kept where the patient chooses.
- "Research participation" becomes **usage counts**, off unless turned on, carrying no reading, note or name.

---

## Forms

**Bring your clinic:**
- Fields: Name · Clinic name · City · Phone or email · Number of patients with diabetes (range) · Message
- Confirmation text: "Thank you. We'll contact you within a week to arrange a walkthrough."

**Join the patient waitlist:**
- Fields: Name · City · Phone or email · Your clinic (optional)
- Note under the form: "We only ask how to reach you. Please don't include health details here."
- Confirmation text: "Thank you. We'll let you know when the app is ready for you."

---

## Remove from the current site
- "Community-building phase". Replace it with "Being built in Nepal". Don't say a pilot is running: there is no pilot enrolment for now.
- Any wording that suggests the app counts carbs, estimates doses or reverses diabetes.
- The mailto-only calls to action. Replace them with the forms above; keep the email addresses in the footer.
- The "Built on open infrastructure" section and every mention of GotChoices, Sereus, Optimystic, Fret or Quereus. The app does not use them.
- Any wording that says the app tells the patient what to do in a low, or how to read a number. It shows what the patient's doctor said, and states numbers as numbers.

---

## Check before publishing
1. **Open source.** v3 said "Open source. Anyone can inspect the code" and linked GitHub in the footer. The repository is private today, so both are left out of v4. Put them back once it is public.
2. **The European Geosciences Union / NASA ADS line.** v3 said the platform's data-access architecture was presented at the EGU. It sat inside the GotChoices section and has been removed with it. Restore it only if the presented work is the architecture the app uses now.
3. **Minimum Android version.** The build currently allows Android 7.0 and newer. It has been tested on Android 12 and on a Samsung M16, so confirm a floor before printing one.
4. **The alert lines.** The numbers on the Diabetes App page (70, 54 and 325 mg/dL) are the app's published defaults. If the defaults change, for example to Nepal's national PEN values, change the page too.
