import React, { useState } from 'react';
import { SUPPORT_PATHWAYS, FIRST_72_HOURS_GUIDE, QUESTIONS_TO_CONSIDER } from '../data/seedData';
import { SupportPathway } from '../types';
import {
  Layers,
  Shield,
  HeartPulse,
  Scale,
  Users2,
  Building,
  CheckCircle2,
  AlertTriangle,
  Clock,
  HelpCircle,
  X,
  FileText,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SupportPage: React.FC = () => {
  const { showToast } = useApp();

  const [activePathwayModal, setActivePathwayModal] = useState<{
    pathway: SupportPathway;
    type: 'prepare' | 'draft';
  } | null>(null);

  const [copiedDraft, setCopiedDraft] = useState(false);
  const [expandedChecklist, setExpandedChecklist] = useState<Record<string, boolean>>({
    q1: true,
  });

  const toggleChecklist = (id: string) => {
    setExpandedChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyDraft = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDraft(true);
    showToast('Sample pathway note copied.', 'info');
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const getCategoryIcon = (category: SupportPathway['category']) => {
    switch (category) {
      case 'emergency':
        return <Shield className="w-5 h-5 text-rose-700" />;
      case 'medical-osc':
        return <HeartPulse className="w-5 h-5 text-purple-700" />;
      case 'legal':
        return <Scale className="w-5 h-5 text-indigo-700" />;
      case 'ngo':
        return <Users2 className="w-5 h-5 text-teal-700" />;
      case 'commission':
        return <Building className="w-5 h-5 text-amber-700" />;
      default:
        return <Layers className="w-5 h-5 text-indigo-700" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Title & Introduction */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-teal-50 text-teal-900 text-xs font-semibold border border-teal-100">
          <Layers className="w-3.5 h-3.5 text-teal-700" />
          <span>Support Pathways &amp; First 72 Hours Guide</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Suggested Support Pathways
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Explore structured support channels, prepare your key details, and understand what to expect. This is not a live directory or emergency dispatch.
        </p>
      </div>

      {/* Prominent Caution Note */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3 text-xs leading-relaxed">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong>Non-Directive Guidance Notice:</strong> Support options vary significantly by location and circumstance. Verify local services and protocols before relying on any directory. For acute emergencies, call 112 directly.
        </div>
      </div>

      {/* SECTION 1: SUGGESTED SUPPORT PATHWAYS CARDS */}
      <section aria-label="Support pathways list" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Pathways Overview ({SUPPORT_PATHWAYS.length})
          </h2>
          <span className="text-xs text-slate-500 font-mono">Demo Pathways Only</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUPPORT_PATHWAYS.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl bg-white border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:border-slate-300 transition-all"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {getCategoryIcon(p.category)}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                    {p.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{p.description}</p>
                </div>

                {/* When to consider */}
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-xs">
                  <span className="font-semibold text-slate-700 block mb-0.5">When to consider:</span>
                  <p className="text-slate-600 text-[11px] leading-snug">{p.whenToConsider}</p>
                </div>

                {/* What it helps with */}
                <div className="space-y-1.5 text-xs">
                  <span className="font-semibold text-slate-700 text-[11px] uppercase tracking-wider block">
                    What this pathway may help with:
                  </span>
                  <ul className="space-y-1 text-slate-600 text-[11px]">
                    {p.whatItHelpsWith.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom buttons & demo label */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="text-[10px] font-mono text-slate-400">
                  {p.contactDemoLabel}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActivePathwayModal({ pathway: p, type: 'prepare' })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer text-center"
                  >
                    Prepare info
                  </button>
                  <button
                    onClick={() => setActivePathwayModal({ pathway: p, type: 'draft' })}
                    className="w-full py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-semibold border border-indigo-200 transition-colors cursor-pointer text-center"
                  >
                    View draft
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: THE FIRST 72 HOURS GUIDE */}
      <section aria-label="First 72 Hours Guide" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-800">
            <Clock className="w-4 h-4 text-indigo-700" />
            <span>Trauma-Informed Guide</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            First 72 Hours: Safety &amp; Continuity Steps
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl">
            Calm, step-by-step considerations when navigating the immediate aftermath of an incident.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FIRST_72_HOURS_GUIDE.map((step) => (
            <div
              key={step.step}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-900 font-bold text-xs flex items-center justify-center">
                  0{step.step}
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {step.tag}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: QUESTIONS TO CONSIDER CHECKLIST */}
      <section aria-label="Questions to consider" className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-800">
            <HelpCircle className="w-4 h-4 text-purple-700" />
            <span>Reflective Checklist</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Questions to Consider Before Formal Steps
          </h2>
          <p className="text-xs text-slate-600 max-w-2xl">
            Take a moment to review these questions with a trusted person before deciding next actions.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm divide-y divide-slate-100 overflow-hidden">
          {QUESTIONS_TO_CONSIDER.map((q) => {
            const isExpanded = expandedChecklist[q.id];
            return (
              <div key={q.id} className="p-4 sm:p-5 transition-colors hover:bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => toggleChecklist(q.id)}
                  className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
                >
                  <span className="text-sm font-bold text-slate-900">{q.question}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isExpanded && (
                  <p className="text-xs text-slate-600 mt-2.5 pl-1 leading-relaxed border-l-2 border-indigo-200 ml-1">
                    {q.guidance}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* MODAL: PREPARE INFORMATION CHECKLIST / SAMPLE DRAFT PREVIEW */}
      {activePathwayModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-8">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  {activePathwayModal.type === 'prepare' ? 'Preparation Checklist' : 'Sample Intake Draft'}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {activePathwayModal.pathway.title}
                </h3>
              </div>
              <button
                onClick={() => setActivePathwayModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {activePathwayModal.type === 'prepare' ? (
                <div className="space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Review these recommended items before consulting this pathway:
                  </p>
                  <ul className="space-y-2">
                    {activePathwayModal.pathway.preparationChecklist.map((item, idx) => (
                      <li key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                    {activePathwayModal.pathway.contactDemoLabel}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">
                      {activePathwayModal.pathway.sampleDraftTitle}
                    </span>
                    <button
                      onClick={() => handleCopyDraft(activePathwayModal.pathway.sampleDraftContent)}
                      className="inline-flex items-center gap-1 text-xs text-indigo-700 hover:underline cursor-pointer"
                    >
                      {copiedDraft ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedDraft ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                    {activePathwayModal.pathway.sampleDraftContent}
                  </pre>
                  <div className="text-[11px] text-slate-500">
                    Draft preview for consultation discussion with appointed advocates or counsellors.
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActivePathwayModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
