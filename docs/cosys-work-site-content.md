# cosys.work site content (v5.1, 2026-11-01)

This is the English source copy. Nepali (`ne`) versions are needed for every block before launch and must be reviewed by a native speaker. English stays the default language. Keep the current visual design. `[Screenshot: …]` marks where an image goes. No em dashes anywhere in the copy, in either language.

**Status and pricing (founder, 2026-09-26).** Say **Nepal**, never Kathmandu or Janakpur (the 22% figure is described as "the capital's screening", source kept). **The Diabetes App is in closed pilot**, free forever, with optional paid services from third parties in its peer-to-peer marketplace, coming soon: lab tests, home sample collection, clinic and physiotherapy appointments, dietitians, gym coaches' at-home exercise video packages, CGM and glucometer plugins, and telemedicine and online appointments as third-party offerings. **The Clinic App is in development, preview available on request**, free during the preview and for up to 10 active patients, then Rs 5,000–10,000 a month. The live site at cosys.work is the current copy; sections below that still say otherwise are superseded by these lines.

**Positioning.** cosys.work is collaborative systems for the care people do themselves between clinic visits, across chronic and comorbid conditions (diabetes, blood pressure, menopause, arthritis and more), with a specialised app for each, starting with diabetes. Peer-to-peer, private and sovereign.

**Naming.** The app is **The Diabetes App**, or **tda by cosys** where a short name is needed. Don't call it TApp on the site, and don't use cosys.work as the app's name: cosys.work is the company. The company's three names are **cosys.work** (collaborative systems), **nep.work** (the peer-to-peer network, also called nepwork; the Platform page) and **coplanetary.work** (systems for many places at once). The public posts app is **SoMA**, spelled that way everywhere.

**Positioning (v5).** The homepage now introduces the company before the health apps: collaborative systems that people own, that work offline and sync peer to peer, with chronic care in Nepal as the first proof. The health positioning above still holds for the health apps and their pages.

**What changed from v5.** The Company page is now called **About us** in the header and footer (the URL stays `/company`, and `/about` redirects there). Its hero lede is rewritten, and it gains *Technology in Nepal*: data at home, local AI first with large models abroad only through one guarded line, work through outages, business intelligence from an organisation's own record, and lower running costs, with a drawing of the guarded line. *Work with us* says everything in Technology in Nepal comes with both offers. The homepage gains a band, *What stays with you*, under the Work with us cards, linking to each thread. nep.work's introduction now ends "and anyone can run one". The homepage headline now rotates through five lines drawn from the About us threads, the drawings and Who we are. No savings figure and no prices anywhere. Every new block needs its Nepali version, reviewed by a native speaker.

**What changed from v4.3.** The homepage leads with the company: a new hero and *Who we are*, a band explaining cosys.work, nep.work and coplanetary.work, three sections with drawings (collaborative systems, peer-to-peer DNA, beyond Earth), *What we build* with SoMA and the open `@cosys` framework, and *Work with us* with the two consulting offers. Health keeps its own band with the condition apps, the Nepal figures and both buttons; the Snap, Share, Follow steps and the comparison with typical diabetes apps moved to the Diabetes App page. SoMA gets its own page at `/soma` with an invitation form that asks for no name and no phone number. The header gains SoMA; the footer gains the three names, "Built in Nepal" and a link to the open libraries (the app repositories stay private). The Platform page names the network nep.work, and the Company page gains *Work with us* and the three names. The EGU and NASA ADS line, SoMA's price and status line, and the language switch all still wait (see the checks at the end). Every new block needs its Nepali version, reviewed by a native speaker, before launch.

**What changed from v3.** Brought in line with the app as built through Milestone 11 and with the Clinic App as proposed (ADR-20). The patient app's features are stated as they work. Clinic features are marked as coming with the Clinic App, because none of it is built yet. The Platform section now describes the network the app actually uses. See *Check before publishing* at the end for four points that need a decision.

Global header: **Diabetes App · Clinic App · SoMA · Platform · About us · Contact**. The language switch **English | नेपाली** waits until reviewed Nepali pages exist; don't ship a switch that leads nowhere.

Global footer: "cosys.work · nep.work · coplanetary.work" (plain text until those domains serve pages) · "Built in Nepal" · **Open libraries on GitHub** (`github.com/cosys-work/cosys`; the libraries are open, the apps are not) · hello@cosys.work · Privacy

---

## Home (`/`)

The homepage introduces the company first, then the ideas, then what we build, then health. Every section below is new or rewritten in v5 except *Health in Nepal* and *Our promises*, which are kept from v4.3 and shortened.

### Hero
*v5.1:* the headline rotates every five seconds through five lines. The first is the page's h1 and the site tagline; the others show in turn, and a "Pause headlines" control stops them. With reduced motion only the first shows. Founder to sign off the wording (see the checks at the end).

1. **Collaborative software with no centre to fail.**
2. **Families, clinics and offices working together, each keeping its own copy.**
3. **Your records, your models and your bills, under your own roof.**
4. **A clinic offline for a day is further away than Mars. We build for both.**
5. **Built in Nepal, where the line drops every day, and the work carries on.**

*(v5 headline, retired in v5.1: "Systems you own, that keep working when the connection doesn't.")*

CoSys Work builds collaborative software that runs on the devices people already own. It works offline, syncs directly between the people who share it, and keeps every record with the people it belongs to. We started with chronic care in Nepal, where patients, families and clinics share one record without a central server.

Buttons: **[See what we build]** **[Work with us]**

Links under the buttons: *Living with diabetes?* **Join the waitlist** · *Run a clinic?* **Bring your clinic**

Small print: *Built in Nepal. Open-source libraries under Apache-2.0.*

[Drawing: a phone, a laptop and a small clinic box joined by lines, with an empty dashed space where a central server would usually sit]

### Who we are
CoSys Work Pvt. Ltd. is a software company in Nepal. Cosys stands for collaborative systems: software for families, clinics, teams and communities that need to work together without handing their records to a platform. We build our own products, starting with apps for people living with diabetes and the clinics that care for them. We also help companies, organisations and ministries move their systems onto machines they own. Our framework is open source, and the network it runs on, nep.work, has no centre to fail.

### cosys.work, nep.work and coplanetary.work
Three columns, each linking down to its own section.

- **cosys.work: collaborative systems.** Software for people who work together. Each family, clinic, team or community holds its own keys and its own copy of what concerns it, and every entry is signed by whoever wrote it. Collaborative editors, signed authorship and trust circles are the building blocks. *For example:* a family and their clinic keep one diabetes record in step.
- **nep.work: the peer-to-peer network, also called nepwork.** The network our systems run on. Phones, laptops, office boxes and community servers pass sealed records directly to each other. Relays carry what they cannot read, and anyone can run one. *For example:* a patient's phone reaches a clinic's computer across Nepal with nothing in the middle that can read the record.
- **coplanetary.work: systems for many places at once.** Systems built for distance and delay. Every copy is signed, can wait, and catches up with the others within known sync times: across town, across a country when the power goes out, and one day across planets. Eventually consistent social media is the first. *For example:* SoMA: write once on your phone, publish to every network, keep proof it's yours.

### Collaborative systems
**Built for people who work together**

Most software treats you as one account on someone else's server. Ours starts from the groups people already belong to: a family, a clinic, a team, a cooperative. Each group holds its own keys, its own copy of what concerns it, and its own rules for who joins. Someone who belongs to two groups links them, and each group stays itself.

Shared editing works offline and merges when people reconnect. Every entry is signed by whoever wrote it, and edits keep their history. You decide who sees what, and you can take it back.

*In the Diabetes App, a patient chooses whether family sees the numbers, a colour, or only an alert.*

[Drawing: Family, Clinic and Community as overlapping circles, each with "own keys, own copy"; a patient in Family and Clinic, a nurse in Clinic and Community. Title: "Each group holds its own keys and its own copy". Caption: "No server in the middle: each circle syncs among its own members."]

### Peer-to-peer DNA
**Peer to peer is in our DNA**

Everything we build starts from the same rules, and they come with every product, every engagement and every library we publish.

Your keys stay on your devices, and every entry is signed with them. Your copy of the record is the record, and it syncs with the people you chose whenever there is a connection. Relays carry sealed mail they cannot read. Everything works offline and catches up later. The code is open under Apache-2.0, so anyone can check that all of this is true.

*The Diabetes App logs readings, reads photos and shows trends in airplane mode. Its mailbox carries sealed deposits it cannot open.*

[Drawing: a double helix, titled "The same rules come with everything we build". Five rungs pair what stays with you with what the network does: Your keys / Entries signed · Your copy / Syncs when online · Sealed records / Relays can't read · Works offline / Catches up later · Open source / Apache-2.0]

Under the drawing: *Our libraries are published on npm, JSR and crates.io.* **[See the source on GitHub]**

### Beyond Earth
**Built for distance and delay**

Most software assumes the connection is instant and always there. Ours treats delay and disconnection as normal: every copy is signed, can wait as long as it needs to, and catches up with the others in a known time.

That is what keeps a clinic in rural Nepal working through a power cut, and it is the discipline a network between planets needs. Light takes about 1.3 seconds to reach the Moon, and between about 4 and 24 minutes to reach Mars, depending on where the planets are. A clinic that is offline for a day is, in network terms, further away than Mars.

Space agencies solve this with delay-tolerant networking, which stores a message and forwards it when the next link opens. Signed, self-contained records suit that way of travelling. coplanetary.work is where we take it further: social media and shared records that stay consistent across any distance. Nothing we run is in space today. This is a design rule, and the direction we are heading.

*(The EGU and NASA ADS line stays out until the founder confirms it; see the checks at the end.)*

[Drawing: one-way delay, titled "A clinic offline for a day is further away than Mars". Same room: milliseconds · Across a country: a fraction of a second · Earth to Moon: about 1.3 seconds · Earth to Mars: 4 to 24 minutes · Clinic offline (highlighted): hours to days. Axis: "One-way delay, longer to the right (not to scale)". Bracket: "One rule for the whole range: sign every copy, let it wait, catch up later".]

### What we build
**Our own products, and the framework under them**

- **The Diabetes App and the Clinic App.** Apps for people living with diabetes and the clinics that care for them. The record stays on the patient's phone and at the clinic, and family see only what the patient chooses. The Diabetes App is in closed pilot, and the Clinic App is in development. Links: **[The Diabetes App]** **[The Clinic App]**
- **SoMA.** Write once on your phone, post to every network, and keep proof that the words are yours. Anonymous by default, and joined by invitation. Link: **[About SoMA]**
- **The open @cosys framework.** The libraries our products run on, free under Apache-2.0: `@cosys` packages on npm and JSR, and `cosys-` crates on crates.io. Link: **[See it on GitHub]**

### Work with us
**Your own systems, in production**

For teams who want their own systems in production, on machines they own. No prices on the site.

- **MVP to Production.** For teams with a working prototype and a reason to launch: a review across eight areas, a clear verdict, and a roadmap into production on systems you own.
- **p2p-fication.** For organisations with systems already running: move data and workloads onto machines you own, add local business intelligence and language models, and keep working through internet and cloud outages.

Both cards link to *Work with us* on the About us page.

### What stays with you (v5.1)
A band under the two Work with us cards. Each item links to its thread on About us (`/company#<id>`).

- **Data at home:** records stay with the people and offices they belong to, under keys they hold.
- **Local AI first:** models run on your machines, and large models abroad get only what you let through.
- **Through outages:** work carries on offline and catches up when the line returns.
- **Your own intelligence:** reports and answers from your own record, each with its sources.
- **Run it for less:** pay for what still needs a provider, and run the rest yourself.

### Health in Nepal
**Specialised apps for each condition. Starting with diabetes.**

Each condition gets an app built for it, and they share one record on your phone, because many people live with more than one.

- **Diabetes** *(in closed pilot)*: The Diabetes App, the first of them. Photo logging, your doctor's plan, and family who help.
- **Blood pressure** *(coming soon)*: readings, medicines and your doctor's targets, over time.
- **Menopause** *(coming soon)*: symptoms, cycles and treatments, noted in your own words.
- **Arthritis** *(coming soon)*: pain, stiffness, medicines and what helps, day by day.
- **And more** *(coming soon)*: conditions rarely come alone. The apps share one record, so they work together.

Why Nepal, why now:

- **22%** of adults over 30 had high blood sugar in the capital's 2024–25 screening of 19,660 people. *(Source: Kathmandu Post, Nov 2025)*
- Most people with diabetes see a doctor every **2–3 months**. Sugar levels change every day.
- In the clinics we've spoken to, intake takes **1–2 hours** for a **5–15 minute** consultation. *(What we have seen, not a formal study.)*

**Built in Nepal.** Patients: the Diabetes App is in closed pilot, so join the waitlist and we'll tell you when it is ready for you. Clinics: the Clinic App is in development, and a preview is available on request.

Buttons: **[Join the patient waitlist]** **[Bring your clinic]**

### Our promises
**What our health apps will always and never do**

- **Your doctor decides; the app remembers.** It never calculates or recommends insulin doses, and it never estimates carbohydrates or calories.
- **Your record belongs to you.** Export it at any time as PDF or CSV, or as an encrypted backup only your passphrase opens. There is no cloud copy of your record.
- **Built for the hard case first.** It runs on low-cost Android phones, on slow networks and in Nepali.

*Moved to the Diabetes App page in v5:* "How it works, starting with diabetes" (Snap, Share, Follow) and "What makes it different" (the comparison with typical diabetes apps). Their copy is under that page below.

---

## The Diabetes App (`/diabetes-app`)

### Hero
**A diabetes companion that works with no signal.**

Log by photo, see your readings over time, and follow the plan your doctor gave you, all on your phone. For Type 2, Type 1, gestational diabetes and prediabetes.

Button: **[Join the patient waitlist]** · *Free for patients, always.*

### How it works
*Moved here from the homepage in v5.*

1. **Snap.** Photograph your glucometer or a lab report. The number is read on your phone, and you check it before it's saved. This works in airplane mode.
2. **Share.** Choose family members who help you, and choose what each one sees. Before a visit, make a one-page summary of your last month as a PDF to show or send your doctor. When your clinic joins through the Clinic App, you'll scan its QR code and the summary reaches your doctor directly.
3. **Follow.** Your targets, medicines and your doctor's instructions sit on a plan card on your phone, with reminders for your medicines. Later, with the Clinic App, your clinic will be able to set the plan and send a checklist of next tests.

### What makes it different
*Moved here from the homepage in v5.*

| | Typical diabetes apps | The Diabetes App |
|---|---|---|
| Works with no signal | Partly, or not at all | Yes: logging, photos, your summary and reminders (the assistant too, on phones with about 6 GB of memory) |
| Where the AI runs | In the cloud | On your phone |
| Who holds your record | The app company's servers | You, on your phone |
| Cost to patients | Free trial, then a subscription | Free forever, with optional services from others in the app |
| Share with family | The full numbers | Your choice for each person: the numbers, the range only, or alerts only |
| Your doctor's targets | Typed in by you, or none | Your doctor's, or published WHO and ADA values, always labelled with where they came from |

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

## SoMA (`/soma`)

The name is **SoMA**, spelled that way everywhere. It is a separate app from the health apps, for people who post in public. Status line and price wait for the founder (see the checks at the end); the page carries neither until then.

### Hero
**Write once. Post everywhere. Keep the proof.**

SoMA lets you write a post on your own phone and publish it to Nostr, Mastodon and the rest of the Fediverse, Bluesky, and the apps you already use. Every version is signed and timestamped, so you can always show the words are yours. You post under a name you choose, and your posts stay with you.

Buttons: **[Ask for an invitation]** **[How it works]**

Small print: *By invitation. Anonymous by default. Separate from our health apps.*

[Preview: the composer with its Post everywhere button]

### How it works
1. **Write once.** Write on your phone and add photos, sound, PDFs or video clips of up to two minutes. The post is signed on your phone before it goes anywhere, and drafts follow you to your other devices.
2. **Post everywhere.** SoMA shapes the post for each network. Nostr gets it straight from your phone, and Mastodon and Bluesky get it through bridges. For apps like Instagram, X or LinkedIn, your phone's share sheet opens them with the post ready to go.
3. **Keep the proof.** Every edit is a new signed version of the same post. The final version is timestamped with OpenTimestamps, which anchors it in Bitcoin within a few hours, with no wallet and no coins. Share the post back from another app and SoMA keeps the link to that copy, private unless you choose to publish it.

[Preview: one post's journey from the phone to each network] · [Preview: the proof screen with its OpenTimestamps seal]

### Anonymous and safe
**Anonymous by default, safe by design**

Your account starts as a fresh key with a generated name. We never ask for a phone number, an email or your legal name. You can keep separate personas that nobody can link unless you do, and photos lose their location and camera details before they leave your phone.

Anonymous doesn't mean anything goes. You join by invitation from an operator who vets new members, so your pseudonym answers to a community without being tied to your identity. Every post has report, block and mute, and reports go to the operator's moderators. Private messages reach only people who follow you back, or people in your circles. There is no random chat.

### Where your posts go
**One post, every network**

Nostr is an open network where your identity is a key you hold. The Fediverse is thousands of independent servers that talk to each other, Mastodon being the best known. Bluesky is an open network built on the AT Protocol. SoMA reaches all of them, and the apps you already use.

| Network | How your post gets there | Replies |
|---|---|---|
| Nostr | Straight from your phone to your relays | Come back to SoMA |
| Mastodon and the Fediverse | Through a bridge your operator runs; videos through PeerTube | Come back to SoMA |
| Bluesky | Through a bridge your operator runs | Come back to SoMA |
| Instagram, X, LinkedIn and others | Your phone's share sheet opens the app with the post ready | Share the link back to SoMA; it stays private unless you publish it |

### Circles, files and your data
- **Your circles.** Share with a family, a club or a team as a circle. Circle posts are sealed so only members can read them, and they pass from phone to phone with no server in the middle. When someone leaves, the circle gets a new key, so they can't read what comes next.
- **Works with no signal.** Write, read and edit offline. SoMA catches up as soon as you're connected, and shows when each post last synced.
- **Photos, sound, PDFs and video.** Post photos, sound, PDFs, maps and data files, and video clips of up to two minutes in playlists. Only open, safe file types are allowed, and nothing plays until you tap it.
- **Your posts stay yours.** Your posts live on your phone and your own relays first, and every network's copy links back to the signed original. Take everything with you whenever you like, or delete your account from inside the app. The app tells you plainly that copies other people kept may remain.
- **Plugins in plain sight.** Extras, such as viewers for new file types, come built into the app and are listed in Settings with what each can read and write. Nothing is downloaded behind your back.

### The white paper (`#white-paper`)
*For technical readers.* **The white paper: the ideas SoMA rests on**

Signed Posts as Hyperedges sets out the mathematics behind SoMA as laws you can check. It describes ideas, not code, and it says plainly what SoMA does not claim.

- The record as a hypergraph: each signed post names what it refers to, and those references form a category, so every figure the app shows can be traced back to what someone wrote.
- Copies on other networks as structure-preserving maps that remember their original, so two copies of one post are always recognised as the same post.
- The law every bridge between two networks keeps: a post that goes out and comes back is the same post, never a second one.
- Trust published as a relation between keys, never as a number about a person. Each reader orders their own feed, and that order is never published.
- How copies agree without coordination, how a circle's history is split into key epochs when someone leaves, and how a post is shown to have existed by a point in public time.

Button: **[Read the white paper]** (`/soma-whitepaper.pdf`) · *PDF, 8 pages, 166 KB. Free to share and adapt under CC BY 4.0.*

The PDF's source and build live in the tda repository (`docs/whitepaper`). The paper spells the name SOMA; the site's own copy keeps SoMA.

### The facts
- **Where it runs:** iPhone, Android, desktop and the web.
- **Joining:** by invitation from an operator. The first operator runs on nep.work, and any community can run its own.
- **Languages:** English and Nepali.
- **Internet:** not needed to write or read. Posts go out when you're connected.
- **Your keys:** kept in your phone's secure keychain, or in a signer app you choose.
- **Open source:** the libraries it runs on are open under Apache-2.0.

*(Price: left out until the founder sets one. Never publish a placeholder.)*

### Separate from our health apps
SoMA is a separate app with its own identity. It cannot see any health record, and nothing from the Diabetes App or the Clinic App can be posted here. If you use both, they are two accounts that nothing links.

### Closing call to action
**Post under your own terms.** Ask for an invitation, or run an operator for your community.

Buttons: **[Ask for an invitation]** **[Run an operator]**

---

## Platform (`/platform`)

*v5:* the page names the network **nep.work** in its hero and metadata; the URL stays `/platform` and the nav label stays "Platform". Hero eyebrow: "nep.work, the network underneath our apps". Under the headline: "Both apps run on nep.work, our peer-to-peer network." followed by the existing paragraph.

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

## About us (`/company`)

*v5.1:* the nav and footer call this page **About us**; the URL stays `/company`, and `/about` redirects to it.

Description (metadata): *About cosys.work: who we are, what we hold to, and how we keep data, models and running costs under the owner's control.*

### Hero
Badge: *About cosys.work* · Title: **We build the tools we wanted to exist**

cosys.work builds collaborative systems that people own. They run on the devices people already have, keep working offline, and sync directly between the people who share them. We started with chronic care, because the tools available asked for a permanent internet connection, a monthly fee, and an unconditional copy of the most private thing a person has.

Status line: "Built in Nepal. The Diabetes App is in closed pilot and free forever."

Keep the four commitments. Update them as follows:

- **The record belongs to the patient.**
- **Connectivity is a luxury, not a premise.**
- **Clinicians decide; software remembers.** No dose calculations and no automated diagnosis.
- **The people who live with it should steer it.** Our diabetes trainers, one of whom lives with Type 1, shape what we build.

### Technology in Nepal (v5.1)
Between *How we work* and *Our names*.

*Technology in Nepal.* **Kept at home, open to the world on purpose**

Most software used in Nepal keeps its data on servers abroad, sends its questions to foreign AI services, and stops when the line drops. We build our products and our clients' systems so the data, the models and the bills stay under the owner's control.

Jump links: Data at home · Local AI first · Through outages · Your own intelligence · Run it for less

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

[Drawing: *One guarded line out*. Left, "Local and small": Phone, Laptop, Office box; "Data and models stay here". Middle: one line through a narrow gate, "One guarded line", tagged Deliberate, Logged, Minimal, Reversible. Right, "Global and large": Large model; "Gets only what you let through". Along the bottom: "Each organisation decides what crosses the line".]

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

### Our names (v5)
cosys.work, nep.work and coplanetary.work in one short block, with the same one line for each as the homepage band: collaborative systems; the peer-to-peer network, also called nepwork; systems for many places at once.

### Work with us (v5, `#work-with-us`)
**Your own systems, in production**

We also help companies, organisations and ministries move their systems onto machines they own. Everything in Technology in Nepal comes with both offers. No prices on the site.

- **MVP to Production.** For teams with a working prototype and a reason to launch: a review across eight areas, a clear verdict, and a roadmap into production on systems you own.
- **p2p-fication.** For organisations with systems already running: move data and workloads onto machines you own, add local business intelligence and language models, and keep working through internet and cloud outages.

Button: **[Write to us]** (hello@cosys.work, until the founder decides whether *Work with us* gets a form; see the checks at the end)

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

**Ask for an invitation to SoMA** (v5, `/contact#soma`):
- Fields: Email or Nostr address · Your community (optional)
- No name and no phone number, to match the anonymity promise.
- Note under the form: "We only ask how to reach you. A Nostr address works as well as an email."
- Confirmation text: "Thank you. We'll be in touch about an invitation to SoMA."

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
1. **Open source.** The app repositories are private. The `@cosys` libraries are open under Apache-2.0 at `github.com/cosys-work/cosys`, so v5 links the libraries, never the apps, and says the libraries are open.
2. **The European Geosciences Union / NASA ADS line.** v3 said the platform's data-access architecture was presented at the EGU. It sat inside the GotChoices section and has been removed with it. The v5 Beyond Earth section holds it back too. Restore it only if the presented work is the architecture the apps use now, and only once the founder confirms.
3. **Minimum Android version.** The build currently allows Android 7.0 and newer. It has been tested on Android 12 and on a Samsung M16, so confirm a floor before printing one.
4. **The alert lines.** The numbers on the Diabetes App page (70, 54 and 325 mg/dL) are the app's published defaults. If the defaults change, for example to Nepal's national PEN values, change the page too.
5. **SoMA's price and status line,** and the link from "an operator who vets new members" to the operator's published vetting standard, once it exists.
6. **Where Work with us leads:** the Company section only, or also a form on the Contact page.
7. **nep.work and coplanetary.work:** whether either domain serves a page yet. Until then the footer names them as plain text.
8. **The link-preview image** (`public/og.png`) still shows the v4 hero line; make a new one with the v5 line.
9. **Nepali:** every v5 block needs its Nepali version, reviewed by a native speaker, before the language switch ships.
10. **The first two DoIT-listed providers.** About us says "starting with two" without naming them. Once they are chosen, the founder decides whether the site names them.
11. **The base egress templates and guidelines.** Link them from the Local AI first thread once they are published.
12. **"Local body".** The copy reads it as each organisation, and each local body that runs public services. Founder to confirm.
13. **When a key holder leaves.** The site says nothing about handing over keys until that is decided.
14. **The rotating headlines** are new wording. Founder to sign them off; `public/og.png` should then carry the first.
