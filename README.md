# Sakshi (साक्षी) — Women’s Safety-to-Justice Continuity Platform

> **“From the first SOS to follow-up—Sakshi helps keep a case alive.”**  
> *A prototype continuity tool for safety documentation and support pathways.*

---

## 🛡️ Executive Summary

Most existing safety applications terminate their functionality once an SOS alarm is triggered or a panic button is released. However, the path from an acute incident to institutional justice often takes weeks or months—during which evidence is lost, police refuse to lodge FIRs, survivors face coercion or threats to compromise, and cases quietly disappear.

**Sakshi** bridges this critical gap. It is a privacy-first web platform designed to preserve incident details, coordinate with a small trusted circle without public broadcast, systematically document police complaint-registration refusals, generate structured escalation draft letters, and maintain long-term case follow-up.

---

## ⚠️ Important Safety & Hackathon Boundaries

**This is a 12-hour hackathon prototype designed for workflow and educational demonstration.**

### What Sakshi Does NOT Do:
* **No live emergency dispatch:** Does not place actual phone calls, dispatch police patrol, or alert emergency helplines. If in immediate danger, call **112** (ERSS in India) or reach a trusted person nearby.
* **No police or court integration:** Does not file official First Information Reports (FIRs) or legal petitions.
* **No live GPS tracking:** Uses simulated, static area context (Jaipur, Rajasthan) without accessing device GPS or broadcasting coordinates.
* **No real-time audio/camera surveillance:** Uses pre-configured demo sample assets to respect privacy and browser permissions.
* **No legal or medical advice:** Provides neutral drafts, educational references (such as Supreme Court *Lalita Kumari* Zero FIR guidelines), and preparation checklists.
* **No guarantees of court admissibility or tamper-proof storage:** Cryptographic SHA-256 fingerprints are client-side simulation previews demonstrating digital continuity principles. Real-world legal admissibility requires formal Section 65B (BSA) chain-of-custody protocols.
* **No public naming:** Does not publish offender details, maintain repeat-offender registries, or facilitate public exposure.

---

## 🌟 Key Features

### 1. Prototype SOS & Trusted Circle Alert (`/sos`)
* **Calm, High-Contrast Interface:** Large, non-alarming SOS trigger with simulation parameters.
* **Approximate Location Preview:** Non-live map preview card of Jaipur, Rajasthan with accuracy radius instead of invasive live GPS tracking.
* **Pre-Designated Trusted Circle:** Staged notification previews for 3 trusted contacts (Neighbour, SHG Volunteer, Family Member).
* **10-Minute Safety Check-In Timer:** Prompts the user to confirm safety once reaching a secure space.
* **Fake Call Simulator:** Discreet "Family Call" incoming screen with ringing audio/timer controls to provide a safe excuse to step away from uncomfortable situations.

### 2. Demo Evidence Vault (`/evidence`)
* **Incident Record & Integrity Preview:** Capture voice memo references, photographs, location notes, and witness accounts.
* **Sample Audio File:** Staged `voice_note_demo_01.m4a` with simulated playback controls.
* **Client-Side Cryptographic Fingerprints:** Generates simulated SHA-256 hashes for each entry to demonstrate how digital timestamps and tamper-evident records can establish continuity.
* **Categorical Tagging:** Tags for *Threat*, *Injury*, *Witness*, *Refusal*, and *Follow-up*.

### 3. FIR Refusal & Draft Escalation Workflow (`/refusal`)
* **Guided Refusal Documentation:** Step-by-step form capturing police station name, duty desk details, reasons for refusal, lack of CSR/acknowledgement receipts, and pressure to compromise.
* **Automated Escalation Draft Letter:** Generates a structured, professional, non-confrontational representation letter citing Supreme Court directives (*Lalita Kumari vs. Govt. of U.P.*) regarding mandatory Zero FIR registration.
* **Export Utilities:** One-click copy, `.txt` file download, and direct integration into the active Case Timeline.

### 4. Comprehensive Case Continuity Timeline (`/case/:id`)
* **Milestone Progress Tracker:** Visual indicator across four stages: **Safety → Documentation → Support → Follow-up**.
* **Unified Chronological Feed:** Consolidates SOS alerts, evidence entries, refusal drafts, and threat logs into an unbroken historical timeline.
* **Data Visualization (Recharts):** Distribution of continuity activities by stage.
* **Interactive Reminders:** Checklists for 3-day follow-up, legal aid advocate consultation, and witness check-ins.
* **Full Case Export:** Generates downloadable client-side `.txt` and `.json` case records for offline consultation.

### 5. Suggested Support Pathways & First 72 Hours Guide (`/support`)
* **5 Structured Demo Pathways:**
  1. *Emergency Response Pathway* (ERSS 112 / Helpline 1091)
  2. *Medical & One Stop Centre (OSC) Pathway* (Integrated medical documentation & counselling)
  3. *Legal Aid & DLSA Pathway* (Free legal representation under Legal Services Authorities Act)
  4. *NGO & Psychosocial Support Pathway* (Survivor accompaniment & peer networks)
  5. *Women’s Commission Pathway* (State Commission & NCW representation)
* **First 72 Hours Guide:** Trauma-informed, non-directive steps covering physical safety, forensic preservation, and emotional support.
* **Reflective Questions Checklist:** Guiding questions before undertaking formal legal actions.

### 6. Discreet Mode & Quick Exit (`/neutral`)
* **Discreet Mode Toggle:** Available on all screens; instantly transforms header to **“Notes & Reminders”**, replaces safety icons with neutral checklist icons, and styles entries as personal tasks.
* **Quick Exit (`Esc` Key):** Instant escape button leading to `/neutral`, rendered as an innocuous **Daily Planner** featuring a weather forecast, daily motivational quote, task list, and calendar preview.

---

## 🛠️ Tech Stack & Architecture

* **Frontend Framework:** React 19 (TypeScript)
* **Build Tool:** Vite 8 (with Rolldown / Windows MSVC native support)
* **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
* **Routing:** React Router v7 (`react-router-dom`)
* **Icons:** Lucide React
* **Data Visualizations:** Recharts
* **Storage & Persistence:** Modular client-side `localStorage` services (ready for Supabase / FastAPI backend integration)

---

## 📂 Project File Structure

```
sakshi/
├── index.html                    # Root HTML with responsive meta & SVG shield favicon
├── package.json                  # Dependencies and build scripts
├── vite.config.ts                # Vite config with React & Tailwind plugins
├── tsconfig.json                 # TypeScript project configuration
├── tsconfig.app.json             # App TypeScript compiler settings
├── src/
│   ├── main.tsx                  # Application mount point
│   ├── App.tsx                   # Top-level routes, layout wrappers & providers
│   ├── index.css                 # Base Tailwind CSS rules and design tokens
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces (Case, Evidence, Threat, etc.)
│   ├── data/
│   │   └── seedData.ts           # Seed data for Case SK-2026-001, pathways & guides
│   ├── services/
│   │   └── storage.ts            # LocalStorage persistence, SHA-256 hash generator & export
│   ├── context/
│   │   └── AppContext.tsx        # React Context for reactive state, modals & toasts
│   ├── components/
│   │   ├── Navbar.tsx            # Header with Discreet Mode toggle & quick navigation
│   │   ├── Footer.tsx            # Disclaimer banner, boundaries & demo reset
│   │   ├── DiscreetBanner.tsx    # Banner indicating visual disguise active
│   │   ├── QuickExitButton.tsx   # Accessible Quick Exit button with Esc key listener
│   │   ├── FakeCallModal.tsx     # Simulated incoming "Family Call" modal
│   │   ├── ThreatPressureModal.tsx # Form to log threats, harassment, or coercion
│   │   └── Toast.tsx             # Floating notification alert container
│   └── pages/
│       ├── LandingPage.tsx       # Value props, step flow & CTAs
│       ├── HomePage.tsx          # Safety hub dashboard, quick actions & current case
│       ├── SOSPage.tsx           # Screen 1 (triggers) & Screen 2 (alert & location preview)
│       ├── EvidencePage.tsx      # Demo Evidence Vault with sample audio & SHA-256 hashes
│       ├── RefusalPage.tsx       # Guided FIR refusal form & escalation letter generator
│       ├── CasePage.tsx          # Case SK-2026-001 timeline, chart & export
│       ├── SupportPage.tsx       # Support pathways, first 72h guide & checklists
│       ├── PrivacyPage.tsx       # 4-part safety, boundaries & ethics breakdown
│       └── NeutralPage.tsx       # "Daily Planner" quick exit destination
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v20.18.0+ or v22+)
* **npm** (v10+)

### Installation & Run

1. Clone or navigate to the repository directory:
   ```bash
   cd sakshi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 🎬 Step-by-Step Live Demo Flow

To demonstrate the full continuity arc during a hackathon evaluation:

1. **Open Landing Page (`/`):**
   * Explain: *“Most safety apps stop at SOS. Sakshi is about continuity from the first alert to legal accountability.”*
   * Click **“Open Demo Safety Dashboard”**.
2. **Explore the Safety Hub (`/home`):**
   * Review greeting *“You are not alone.”*, current case `SK-2026-001`, and the 3 trusted contacts.
   * Click **“Start Prototype SOS”**.
3. **Simulate Emergency SOS (`/sos`):**
   * Review simulation toggles (approximate location preview, trusted circle, 10-min timer).
   * Click **“Send Prototype Alert”** to generate alert `SOS-2026-xxxx`, Jaipur location card, and staged contact alerts.
   * *(Optional)* Click **“Trigger Demo Call”** to demonstrate the **Fake Call** discreet feature.
   * Click **“Create Incident Record”**.
4. **Preserve Demo Evidence (`/evidence`):**
   * Select **Audio** to inspect sample `voice_note_demo_01.m4a`.
   * Add a short description (e.g. *“Confrontation outside metro station and duty desk interaction”*).
   * Click **“Save Demo Record”** to generate record `EV-2026-003` with a simulated SHA-256 checksum preview.
5. **Document FIR Refusal (`/refusal`):**
   * Enter refusal details at *Adarsh Nagar Police Station*.
   * Select *Preferred Support Pathway: Legal aid review*.
   * Click **“Generate Draft Escalation Letter”**.
   * Review the generated formal letter citing Supreme Court *Lalita Kumari* Zero FIR guidelines.
   * Click **“Add Draft to Case Timeline”** and download `.txt`.
6. **Log Threat / Pressure:**
   * Open the **Log Threat or Pressure** modal.
   * Select *Level: High* and enter note: *“Received call from third-party warning not to escalate.”*
   * Save and observe non-alarming safety prompt.
7. **Inspect Case Continuity Timeline (`/case/SK-2026-001`):**
   * Show progress bar: **Safety → Documentation → Support → Follow-up**.
   * View the chronological event chain and stage activity bar chart.
   * Click **“Export Summary (.txt)”** to download the comprehensive offline report.
8. **Demonstrate Discreet Mode & Quick Exit:**
   * Click **“Discreet Mode”** in the navigation header to show how the interface transforms into **“Notes & Reminders”**.
   * Press `Esc` or click **“Quick Exit”** to show the neutral **“Daily Planner”** screen (`/neutral`).
9. **Review Ethics & Boundaries (`/privacy`):**
   * Conclude with:
     > *“Sakshi does not promise instant justice. It helps prevent a survivor’s record, support pathway, and follow-up from disappearing.”*

---

## 🔮 Future Production Roadmap

If advanced beyond prototype stage with institutional partners (e.g., DLSA, One Stop Centres, Mahila Suraksha cells):

1. **Zero-Knowledge Encryption:** End-to-end client-side encryption using WebCrypto / Libsodium so no database or hosting provider can inspect survivor records.
2. **Duress PIN & Rapid Wipe:** Emergency keypad code that unlocks a decoy diary while wiping sensitive local vaults.
3. **Official DLSA Legal Aid API Bridge:** Secure, consent-gated transmission of case summaries directly to appointed legal aid counsels.
4. **PWA Offline-First Architecture:** Local-first IndexedDB replication allowing victims in rural or zero-connectivity areas to record evidence reliably.
5. **Multilingual Localization:** Audio and text interfaces in Hindi, Rajasthani dialects, Marathi, Bengali, Tamil, Telugu, and Kannada.
6. **Trauma-Informed Co-Design:** Ongoing safety and usability auditing with survivor advocacy organizations and clinical psychologists.

---

## 📄 License
Prototype developed for demonstration and hackathon review.
