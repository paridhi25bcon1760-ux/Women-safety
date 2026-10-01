import React from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  FileCheck,
  Lock,
  HeartHandshake,
  AlertTriangle,
  Scale,
  Eye,
  Server,
  Cpu,
} from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title & Badge */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
          <ShieldAlert className="w-3.5 h-3.5 text-indigo-700" />
          <span>Ethics, Privacy &amp; Boundaries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Prototype Safety, Privacy, and Limitations
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Sakshi was built during a 12-hour hackathon to demonstrate how safety technology can shift from fleeting panic alarms to long-term documentation continuity.
        </p>
      </div>

      {/* SECTION 1: WHAT THIS PROTOTYPE DEMONSTRATES */}
      <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-800 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            1. What This Prototype Demonstrates
          </h2>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          A coherent workflow illustrating how a survivor can retain control over their narrative across four key stages:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
            <strong className="font-bold text-slate-900">Documentation Continuity</strong>
            <p className="text-slate-600 text-[11px]">
              Capturing timestamps, voice memo references, and incident notes immediately so critical details are preserved before memories fade.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
            <strong className="font-bold text-slate-900">Trusted Circle Coordination</strong>
            <p className="text-slate-600 text-[11px]">
              Sharing structured approximate area context with pre-designated trusted individuals rather than broad, unsafe public broadcast.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
            <strong className="font-bold text-slate-900">Refusal Escalation Structuring</strong>
            <p className="text-slate-600 text-[11px]">
              Translating an FIR registration refusal into a neutral, formal draft letter referencing Supreme Court Lalita Kumari Zero FIR precedent.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
            <strong className="font-bold text-slate-900">Follow-up &amp; Threat Tracking</strong>
            <p className="text-slate-600 text-[11px]">
              Logging post-incident pressure and scheduling reminders so the case remains visible over weeks, preventing quiet abandonment.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT IT DOES NOT DO (EXPLICIT LIMITATIONS) */}
      <section className="bg-white rounded-2xl border border-rose-200/80 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 border-b border-rose-100 pb-3">
          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              2. What This Prototype Does NOT Do
            </h2>
            <p className="text-xs text-rose-800 font-medium">Critical safety and hackathon boundaries</p>
          </div>
        </div>

        <ul className="space-y-2.5 text-xs text-slate-700">
          {[
            'No live emergency alerts: Does not place real phone calls, SMS broadcasts, or direct dispatch to police or 112.',
            'No police, court, or legal-system integration: Does not lodge official FIRs, CSR receipts, or court filings.',
            'No actual location tracking: Uses simulated, static Jaipur coordinates only. Never accesses your device GPS or tracks movement.',
            'No actual audio recording or cloud file uploads: Sample voice notes are pre-packaged to avoid browser microphone permissions.',
            'No official legal, medical, or psychological counsel: Provides templates and educational outlines, not legal or clinical advice.',
            'No guarantee of court admissibility: Simulated SHA-256 fingerprints preview digital continuity concepts; real-world Section 65B BSA compliance requires technical chain-of-custody protocols.',
            'No public offender registry: Sakshi never publishes names, photos, or accusations to public search engines or social channels.',
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-rose-50/50 border border-rose-100">
              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 3: PRODUCTION CONSIDERATIONS */}
      <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            3. Production Considerations for Future Deployment
          </h2>
        </div>

        <p className="text-xs text-slate-600">
          Transitioning this prototype into a live public utility would require strict security and trauma-informed governance:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
            <strong className="font-semibold text-slate-900">Zero-Knowledge Client Encryption</strong>
            <p className="text-slate-600 text-[11px]">
              End-to-end asymmetric encryption (e.g. Libsodium/WebCrypto) so neither servers nor database administrators can view sensitive case records.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
            <strong className="font-semibold text-slate-900">Data Minimisation &amp; Self-Destruct</strong>
            <p className="text-slate-600 text-[11px]">
              Configurable retention periods, biometric duress passcodes, and rapid client-side wipe triggers when physical device inspection is feared.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
            <strong className="font-semibold text-slate-900">Survivor NGO Co-Design</strong>
            <p className="text-slate-600 text-[11px]">
              Extensive participatory design and trauma-informed UX audits with women’s shelters, One Stop Centre counselors, and DLSA attorneys.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 space-y-1">
            <strong className="font-semibold text-slate-900">Offline &amp; Multi-lingual Support</strong>
            <p className="text-slate-600 text-[11px]">
              Progressive Web App (PWA) with full offline functionality and support for regional Indian languages (Hindi, Marathi, Bengali, Tamil, etc.).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: RESPONSIBLE DESIGN PRINCIPLES */}
      <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            4. Responsible Design Principles
          </h2>
        </div>

        <div className="space-y-3 text-xs text-slate-700">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <strong className="text-slate-900 font-bold block mb-1">Do No Harm</strong>
            Avoid traumatic alarms, flashing lights, loud sound effects, or patronizing victim-blaming language. Every interaction should feel calm and steadying.
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <strong className="text-slate-900 font-bold block mb-1">User Agency &amp; Consent</strong>
            The survivor decides what is preserved, what is shared, and which pathway to explore. The application never acts autonomously without direct user confirmation.
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <strong className="text-slate-900 font-bold block mb-1">Honest Limitations</strong>
            Never over-promise emergency rescue or court outcomes. Clarity prevents dangerous reliance in life-threatening scenarios.
          </div>
        </div>
      </section>
    </div>
  );
};
