import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { EscalationDraft } from '../types';
import {
  FileText,
  AlertTriangle,
  Download,
  Copy,
  Check,
  Calendar,
  Building2,
  Users,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  Layers,
  HelpCircle,
} from 'lucide-react';

export const RefusalPage: React.FC = () => {
  const { currentCase, evidenceRecords, saveDraft, showToast } = useApp();

  // Form states
  const [attemptDate, setAttemptDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [stationName, setStationName] = useState('Adarsh Nagar Police Station, Jaipur');
  const [officerDetail, setOfficerDetail] = useState('Duty Officer at General Complaint Desk');
  const [whatHappened, setWhatHappened] = useState(
    'Presented written complaint detailing continuous harassment and stalking near bus stop. The duty officer declined to accept the complaint or issue a CSR/Zero FIR receipt, stating the incident occurred in another ward jurisdiction.'
  );
  const [writtenAck, setWrittenAck] = useState<'Yes' | 'No' | 'Not sure'>('No');
  const [witnessNote, setWitnessNote] = useState('Meena Devi (SHG volunteer) accompanied complainant.');
  const [pressureReported, setPressureReported] = useState(true);
  const [pressureDetails, setPressureDetails] = useState('Advised to compromise informally instead of registering formal paperwork.');
  const [targetPathway, setTargetPathway] = useState<EscalationDraft['targetPathway']>('Legal aid review');

  // Generated draft state
  const [generatedDraft, setGeneratedDraft] = useState<EscalationDraft | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSavedToTimeline, setIsSavedToTimeline] = useState(false);

  const generateLetterContent = () => {
    const attachedRecordsList = evidenceRecords
      .map((r, i) => `   [Annexure ${i + 1}] Record ${r.id}: ${r.title} (${r.type.toUpperCase()}) - Recorded ${r.date} ${r.time} [Integrity SHA-256: ${r.checksumPreview.slice(0, 16)}...]`)
      .join('\n');

    return `DRAFT FOR LEGAL REVIEW ONLY
--------------------------------------------------------------------------------
TO:
The Concerned Reviewing Authority / Legal Aid Counsel
(Reference: ${targetPathway})
Jurisdiction: Jaipur, Rajasthan

DATE OF DRAFT: ${new Date().toLocaleDateString()}
CASE CONTINUITY IDENTIFIER: ${currentCase.id}

SUBJECT: Request for review of complaint-registration concern regarding cognizable disclosure

RESPECTFUL STATEMENT:

1. ATTEMPTED COMPLAINT REGISTRATION DETAILS:
   - Date of Attempted Registration: ${attemptDate}
   - Institution / Police Station: ${stationName}
   - Personnel / Desk Contacted: ${officerDetail || 'General Duty Desk'}
   - Accompanying Witness / Support Person: ${witnessNote || 'None recorded'}

2. SUMMARY OF COMPLAINT AND REGISTRATION CONCERN:
   ${whatHappened}

3. PROCEDURAL CONTEXT & STATUTORY GUIDELINES:
   - Written Acknowledgement / CSR Receipt Issued: ${writtenAck}
   - Coercion, Pressure or Delay Noted: ${pressureReported ? `Yes - ${pressureDetails}` : 'None reported'}
   
   Note for Counsel: Reference is drawn to statutory guidelines regarding Zero FIR and the Hon'ble Supreme Court of India directives in Lalita Kumari vs. Govt. of U.P. (2014) 2 SCC 1, confirming the mandatory registration of FIR when information discloses the commission of a cognizable offence, without preliminary delay.

4. ANNEXED DEMO INCIDENT RECORDS PRESERVED:
${attachedRecordsList || '   (No previous incident records annexed)'}

5. RELIEF & GUIDANCE REQUESTED:
   The undersigned respectfully requests qualified legal assistance to:
   a) Review the incident statements and timeline preserved above.
   b) Facilitate appropriate representation before the Superintendent of Police / Magistrate under statutory remedies.
   c) Ensure safe, confidential communication and formal acknowledgement of receipt.

CLOSING DISCLAIMER:
This is a draft generated for review and should be verified before use.
Prepared via Sakshi Safety-to-Justice Continuity Prototype.
--------------------------------------------------------------------------------`;
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const fullText = generateLetterContent();
    const draft: EscalationDraft = {
      id: `draft-${Date.now()}`,
      caseId: currentCase.id,
      createdAt: new Date().toISOString(),
      attemptDate,
      stationOrInstitution: stationName,
      officerOrDeskDetail: officerDetail,
      incidentSummary: whatHappened,
      refusalReasonGiven: 'Jurisdiction dispute / refusal to lodge Zero FIR',
      writtenAckProvided: writtenAck,
      witnessPresentNote: witnessNote,
      pressureOrDelayReported: pressureReported,
      pressureDetails: pressureReported ? pressureDetails : undefined,
      targetPathway,
      fullDraftContent: fullText,
      status: 'Draft generated for review',
    };

    setGeneratedDraft(draft);
    setIsSavedToTimeline(false);
    showToast('Draft escalation letter generated successfully.', 'success');
  };

  const handleCopyDraft = () => {
    if (!generatedDraft) return;
    navigator.clipboard.writeText(generatedDraft.fullDraftContent);
    setIsCopied(true);
    showToast('Draft letter copied to clipboard.', 'info');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    if (!generatedDraft) return;
    const blob = new Blob([generatedDraft.fullDraftContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Escalation_Draft_${currentCase.id}_${attemptDate}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Draft downloaded as .txt file.', 'success');
  };

  const handleAddToTimeline = () => {
    if (!generatedDraft || isSavedToTimeline) return;
    saveDraft(generatedDraft);
    setIsSavedToTimeline(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title & Introduction */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-purple-50 text-purple-900 text-xs font-semibold border border-purple-100">
          <FileText className="w-3.5 h-3.5 text-purple-700" />
          <span>Procedural Continuity Tool</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Document a Complaint-Registration Refusal
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          This prototype can help organise information and create a draft for review. It does not submit an official complaint or replace legal advice.
        </p>
      </div>

      {/* Safety & Legal Advice Boundary Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3 text-xs leading-relaxed">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong>Non-Legal Advice Notice:</strong> Sakshi does not file legal proceedings, communicate with police departments, or guarantee institutional acceptance. Review this draft with an empaneled DLSA legal aid lawyer or trusted counselor.
        </div>
      </div>

      {/* The Guided Form */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900">Incident &amp; Police Desk Details</h2>
            <p className="text-xs text-slate-500">Record facts neutrally to assist legal aid review</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Attempt Date */}
            <div>
              <label htmlFor="refusal-date" className="block text-xs font-semibold text-slate-700 mb-1">
                Date of Attempted Complaint Registration
              </label>
              <input
                id="refusal-date"
                type="date"
                required
                value={attemptDate}
                onChange={(e) => setAttemptDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
              />
            </div>

            {/* Station / Institution */}
            <div>
              <label htmlFor="station-name" className="block text-xs font-semibold text-slate-700 mb-1">
                General Location or Police Station / Institution Name
              </label>
              <input
                id="station-name"
                type="text"
                required
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                placeholder="e.g. Adarsh Nagar Police Station, Jaipur"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Officer / Desk Detail */}
            <div>
              <label htmlFor="officer-detail" className="block text-xs font-semibold text-slate-700 mb-1">
                Officer Name, Badge, or Desk Description (Optional)
              </label>
              <input
                id="officer-detail"
                type="text"
                value={officerDetail}
                onChange={(e) => setOfficerDetail(e.target.value)}
                placeholder="e.g. Duty Officer on front desk"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
              />
            </div>

            {/* Witness note */}
            <div>
              <label htmlFor="witness-note" className="block text-xs font-semibold text-slate-700 mb-1">
                Was anyone present? (Optional witness or accompaniment note)
              </label>
              <input
                id="witness-note"
                type="text"
                value={witnessNote}
                onChange={(e) => setWitnessNote(e.target.value)}
                placeholder="e.g. Meena Devi (SHG Volunteer / Neighbour)"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
              />
            </div>
          </div>

          {/* What happened? */}
          <div>
            <label htmlFor="what-happened" className="block text-xs font-semibold text-slate-700 mb-1">
              What happened during the attempt to register?
            </label>
            <textarea
              id="what-happened"
              required
              rows={4}
              value={whatHappened}
              onChange={(e) => setWhatHappened(e.target.value)}
              placeholder="State what you brought, what was said by the personnel, and why they refused..."
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
            />
          </div>

          {/* Written Ack Radio & Pressure Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Were you given a written acknowledgement or receipt?
              </label>
              <div className="flex items-center gap-4">
                {(['Yes', 'No', 'Not sure'] as const).map((option) => (
                  <label key={option} className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="writtenAck"
                      value={option}
                      checked={writtenAck === option}
                      onChange={() => setWrittenAck(option)}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Was there a threat, pressure to drop, or delay?
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="pressure"
                    checked={pressureReported === true}
                    onChange={() => setPressureReported(true)}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="pressure"
                    checked={pressureReported === false}
                    onChange={() => setPressureReported(false)}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>No</span>
                </label>
              </div>

              {pressureReported && (
                <input
                  type="text"
                  value={pressureDetails}
                  onChange={(e) => setPressureDetails(e.target.value)}
                  placeholder="Detail the pressure or advice given..."
                  className="mt-2 w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white"
                />
              )}
            </div>
          </div>

          {/* Preferred Support Pathway */}
          <div>
            <label htmlFor="pathway-select" className="block text-xs font-semibold text-slate-700 mb-1">
              Preferred Support Pathway for Review
            </label>
            <select
              id="pathway-select"
              value={targetPathway}
              onChange={(e) => setTargetPathway(e.target.value as EscalationDraft['targetPathway'])}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
            >
              <option value="Legal aid review">Legal aid review (DLSA Advocate representation)</option>
              <option value="NGO support">NGO support (Survivor accompaniment &amp; counseling)</option>
              <option value="Women’s commission information">Women’s commission information (NCW / State Commission)</option>
              <option value="Senior authority escalation information">Senior authority escalation (Superintendent of Police / Commissionerate)</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Draft Escalation Letter</span>
            </button>
          </div>
        </form>
      </div>

      {/* Generated Letter Display Area */}
      {generatedDraft && (
        <div className="bg-white rounded-2xl border border-purple-200 shadow-md p-6 sm:p-8 space-y-5 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full">
                  Draft Ready for Review
                </span>
                <span className="text-xs text-slate-400">Target: {generatedDraft.targetPathway}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Draft Escalation Letter Preview
              </h2>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyDraft}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied' : 'Copy Draft'}</span>
              </button>

              <button
                onClick={handleDownloadTxt}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .txt</span>
              </button>

              <button
                onClick={handleAddToTimeline}
                disabled={isSavedToTimeline}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors cursor-pointer ${
                  isSavedToTimeline
                    ? 'bg-emerald-700 hover:bg-emerald-800'
                    : 'bg-indigo-900 hover:bg-indigo-950'
                }`}
              >
                {isSavedToTimeline ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Attached to Timeline</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Add Draft to Case Timeline</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Letter Text Box */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[480px]">
            {generatedDraft.fullDraftContent}
          </div>

          {/* Bottom Pathway Nav */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              Need assistance reviewing this draft?
            </span>
            <Link
              to="/support"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900"
            >
              <span>View suggested support pathways</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
