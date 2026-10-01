import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ArrowRight,
  Users,
  FileCheck2,
  CalendarClock,
  Radio,
  FileText,
  HeartHandshake,
  AlertTriangle,
  ChevronRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-stone-100/60 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-900 text-xs font-semibold shadow-xs">
            <Shield className="w-3.5 h-3.5 text-indigo-700" />
            <span>Women’s Safety-to-Justice Continuity Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Safety support should not end <br className="hidden sm:inline" />
            <span className="text-indigo-900 bg-gradient-to-r from-indigo-900 to-purple-800 bg-clip-text text-transparent">
              after an SOS.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            Sakshi is a prototype that helps document an incident, preserve continuity, and prepare support or escalation steps.
          </p>

          {/* Tagline */}
          <p className="text-sm font-medium text-slate-500 italic">
            “From the first SOS to follow-up—Sakshi helps keep a case alive.”
          </p>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/home"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-900 text-white font-semibold text-sm shadow-md hover:bg-indigo-950 active:scale-98 transition-all"
            >
              <span>Open Demo Safety Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-700 border border-slate-300 font-semibold text-sm hover:bg-slate-50 hover:text-slate-900 transition-all shadow-xs"
            >
              <span>See How Sakshi Works</span>
            </a>
          </div>

          {/* Safety Disclaimer Banner */}
          <div className="max-w-2xl mx-auto mt-8 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-950 flex items-start gap-2.5 shadow-xs">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Hackathon Prototype Boundary:</strong> This is a prototype. It does not contact emergency services or file official complaints. If you are in immediate danger, contact local emergency services (112) or trusted people nearby.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Step Flow: SOS → Record → Support → Follow-up */}
      <section id="how-it-works" className="py-14 bg-white border-y border-stone-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              The Journey of Continuity
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              From an urgent moment to long-term institutional accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="relative p-5 rounded-2xl bg-stone-50 border border-stone-200/90 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">
                  <Radio className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-rose-700">Step 1</div>
                <h3 className="text-base font-semibold text-slate-900">Prototype SOS</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Trigger an alert simulation to 3 pre-configured trusted contacts with approximate area context.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200 text-[11px] font-medium text-slate-500">
                &rarr; Safety initiation
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative p-5 rounded-2xl bg-stone-50 border border-stone-200/90 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700">Step 2</div>
                <h3 className="text-base font-semibold text-slate-900">Incident Record</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Preserve voice notes, photos, and location details with simulated SHA-256 integrity fingerprints.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200 text-[11px] font-medium text-slate-500">
                &rarr; Evidence preservation
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative p-5 rounded-2xl bg-stone-50 border border-stone-200/90 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-purple-700">Step 3</div>
                <h3 className="text-base font-semibold text-slate-900">Support &amp; Refusal</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Document police complaint refusal and automatically generate a structured escalation draft letter.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200 text-[11px] font-medium text-slate-500">
                &rarr; Legal empowerment
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative p-5 rounded-2xl bg-stone-50 border border-stone-200/90 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
                  <CalendarClock className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-teal-700">Step 4</div>
                <h3 className="text-base font-semibold text-slate-900">Case Follow-up</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Track ongoing threats, log pressure attempts, schedule reminders, and keep the case active over time.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200 text-[11px] font-medium text-slate-500">
                &rarr; Ongoing continuity
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Value Propositions */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Why Safety Apps Need Continuity
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Most safety solutions vanish once the panic button is released. Real justice takes weeks or months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Value 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-800 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Alert a Trusted Circle</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect directly with 3 reliable friends, neighbours, or self-help group mentors without relying on loud public exposure or broad tracking.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Pre-verified peer contacts
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Non-live approximate area preview
                </li>
              </ul>
            </div>

            {/* Value 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 text-purple-800 flex items-center justify-center">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Organise Incident Information</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Preserve voice notes, photos, and refusal details before memories fade or digital records are erased. Cryptographic integrity previews establish a timeline.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Client-side SHA-256 fingerprinting
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Zero FIR refusal documentation
                </li>
              </ul>
            </div>

            {/* Value 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 text-teal-800 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Keep Follow-up Visible</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Log post-incident threats, access One Stop Centre and legal-aid pathways, and track follow-up deadlines so a case is never quietly buried.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-2">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Threat &amp; coercion tracking
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Legal aid &amp; OSC pathway drafts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Action Banner */}
      <section className="mt-auto py-12 bg-indigo-950 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Ready to explore the continuity prototype?
          </h2>
          <p className="text-indigo-200 text-sm max-w-xl mx-auto">
            Experience the complete flow from emergency simulation to legal escalation preparation in a safe demo environment.
          </p>
          <div className="pt-2">
            <Link
              to="/home"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-950 font-bold text-sm shadow-lg hover:bg-indigo-50 transition-colors"
            >
              <span>Launch Demo Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
