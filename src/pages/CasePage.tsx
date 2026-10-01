import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Stage, TimelineEvent } from '../types';
import { exportCaseSummaryAsText, exportCaseSummaryAsJson } from '../services/storage';
import { ThreatPressureModal } from '../components/ThreatPressureModal';
import {
  Clock,
  Shield,
  FileCheck2,
  Calendar,
  AlertTriangle,
  Download,
  PlusCircle,
  CheckCircle2,
  ChevronRight,
  FileText,
  Lock,
  ArrowRight,
  ShieldAlert,
  Layers,
  Sparkles,
  BarChart3,
  X,
  Check,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

export const CasePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    currentCase,
    timeline,
    evidenceRecords,
    threatLogs,
    drafts,
    reminders,
    toggleReminder,
    addTimelineItem,
    showToast,
  } = useApp();

  const [threatModalOpen, setThreatModalOpen] = useState(false);
  const [addUpdateOpen, setAddUpdateOpen] = useState(false);
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDesc, setUpdateDesc] = useState('');
  const [updateStage, setUpdateStage] = useState<Stage>('Follow-up');

  // Stages configuration
  const stages: { stage: Stage; label: string; number: number }[] = [
    { stage: 'Safety', label: 'Safety Alert', number: 1 },
    { stage: 'Documentation', label: 'Documentation', number: 2 },
    { stage: 'Support', label: 'Support & Refusal', number: 3 },
    { stage: 'Follow-up', label: 'Follow-up & Continuity', number: 4 },
  ];

  const handleExportText = () => {
    const textData = exportCaseSummaryAsText(currentCase.id);
    const blob = new Blob([textData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sakshi_Case_Summary_${currentCase.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Case summary (.txt) exported for offline review.', 'success');
  };

  const handleExportJson = () => {
    const jsonData = exportCaseSummaryAsJson(currentCase.id);
    const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sakshi_Case_Data_${currentCase.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Case data (.json) exported.', 'info');
  };

  const handleAddCustomUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateTitle.trim() || !updateDesc.trim()) return;

    const now = new Date();
    const newEvent: TimelineEvent = {
      id: `tle-custom-${Date.now()}`,
      caseId: currentCase.id,
      timestamp: now.toISOString(),
      timeLabel: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: updateTitle.trim(),
      description: updateDesc.trim(),
      category: 'system',
      stage: updateStage,
      badge: 'Case Update',
    };

    addTimelineItem(newEvent);
    setAddUpdateOpen(false);
    setUpdateTitle('');
    setUpdateDesc('');
  };

  // Stage distribution chart data
  const chartData = stages.map((s) => {
    const count = timeline.filter((t) => t.stage === s.stage).length;
    return { name: s.stage, count };
  });

  const stageColors: Record<Stage, string> = {
    Safety: '#f43f5e',
    Documentation: '#4f46e5',
    Support: '#9333ea',
    'Follow-up': '#0d9488',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Case Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-indigo-900 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
              Case {currentCase.id}
            </span>
            <span className="text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              {currentCase.status}
            </span>
            <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {currentCase.privacyBadge}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {currentCase.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span>Location: <strong>{currentCase.locationLabel}</strong></span>
            <span>•</span>
            <span>Last Activity: <strong>{currentCase.lastActivity}</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setAddUpdateOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Update</span>
          </button>

          <button
            onClick={handleExportText}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            title="Download client-side text summary"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Summary (.txt)</span>
          </button>

          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-600 text-xs transition-colors cursor-pointer font-mono"
            title="Export full JSON structure"
          >
            JSON
          </button>
        </div>
      </div>

      {/* Case Progress Indicator: Safety → Documentation → Support → Follow-up */}
      <section aria-label="Case Progress" className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
          Continuity Milestone Progress
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stages.map((st, i) => {
            const hasEvents = timeline.some((t) => t.stage === st.stage);
            const isCurrent = currentCase.currentStage === st.stage;

            return (
              <div
                key={st.stage}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-indigo-50/80 border-indigo-500 shadow-xs'
                    : hasEvents
                    ? 'bg-slate-50/80 border-slate-200 text-slate-800'
                    : 'bg-white border-slate-100 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Step {st.number}
                  </span>
                  {hasEvents && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                </div>
                <div className="text-xs font-bold text-slate-900">{st.label}</div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {timeline.filter((t) => t.stage === st.stage).length} records logged
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Two Column Layout: Main Timeline (Left 8 cols) & Follow-ups / Next Steps (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* TIMELINE FEED (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-700" />
              <h2 className="text-base font-bold text-slate-900">
                Case Chronology ({timeline.length} Events)
              </h2>
            </div>
            <span className="text-xs text-slate-400">Chronological client history</span>
          </div>

          {/* Timeline Feed Container */}
          <div className="relative border-l-2 border-indigo-100 ml-4 pl-6 space-y-6">
            {timeline.map((event) => {
              let dotBg = 'bg-indigo-600';
              if (event.category === 'sos') dotBg = 'bg-rose-600';
              if (event.category === 'threat') dotBg = 'bg-amber-600';
              if (event.category === 'refusal') dotBg = 'bg-purple-600';
              if (event.category === 'support') dotBg = 'bg-teal-600';

              return (
                <div key={event.id} className="relative group">
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white ${dotBg} shadow-xs`}
                  />

                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{event.title}</span>
                        {event.badge && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                            {event.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">{event.timeLabel}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>

                    {event.metadata && (
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-[10px] text-slate-400 font-mono">
                        {Object.entries(event.metadata).map(([k, v]) => (
                          <span key={k} className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                            {k}: {v}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Activity Breakdown Chart (Recharts) */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <BarChart3 className="w-4 h-4 text-indigo-700" />
                <span>Continuity Activity Distribution by Stage</span>
              </div>
              <span className="text-[11px] text-slate-400">Total: {timeline.length} actions</span>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={stageColors[entry.name as Stage] || '#4f46e5'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR: WHAT IS NEXT, REMINDERS, DRAFTS, THREATS (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* What is next? Card */}
          <div className="rounded-2xl bg-gradient-to-br from-indigo-900 to-purple-950 text-white p-6 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-indigo-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>What is Next?</span>
            </div>
            <h3 className="text-base font-bold text-white leading-snug">
              Key Recommended Follow-up Actions
            </h3>
            <ul className="text-xs text-indigo-100 space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-300 shrink-0 mt-0.5" />
                <span>Schedule a 30-minute review with a DLSA legal aid clinic advocate.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-300 shrink-0 mt-0.5" />
                <span>Download your offline text summary in case digital access is interrupted.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-300 shrink-0 mt-0.5" />
                <span>Log any third-party calls asking you to drop or settle the matter.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/support"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-white text-indigo-950 font-bold text-xs hover:bg-indigo-50 transition-colors cursor-pointer"
              >
                <span>Explore Support Pathways</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Follow-up Reminders Card */}
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-700" />
                <h3 className="text-sm font-bold text-slate-900">Upcoming Reminders</h3>
              </div>
              <span className="text-[11px] text-slate-400">Interactive</span>
            </div>

            <div className="space-y-2.5">
              {reminders.map((rem) => (
                <div
                  key={rem.id}
                  onClick={() => toggleReminder(rem.id)}
                  className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer text-xs transition-all ${
                    rem.completed
                      ? 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300'
                  }`}
                >
                  <button
                    type="button"
                    className={`mt-0.5 w-4 h-4 rounded-sm flex items-center justify-center border shrink-0 ${
                      rem.completed
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300'
                    }`}
                  >
                    {rem.completed && <Check className="w-3 h-3" />}
                  </button>
                  <div className="flex-1">
                    <p className="font-medium leading-snug">{rem.title}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">Due: {rem.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attached Escalation Drafts Card */}
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-700" />
                <h3 className="text-sm font-bold text-slate-900">Escalation Drafts</h3>
              </div>
              <Link to="/refusal" className="text-xs text-purple-700 font-semibold hover:underline">
                New Draft
              </Link>
            </div>

            {drafts.length === 0 ? (
              <div className="text-xs text-slate-500 py-2">
                No draft escalation letter created yet. If police refused to register, create one now.
              </div>
            ) : (
              <div className="space-y-3">
                {drafts.map((draft) => (
                  <div key={draft.id} className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-950">{draft.stationOrInstitution}</span>
                      <span className="text-[10px] text-purple-800 font-medium">Attempt: {draft.attemptDate}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] line-clamp-2">{draft.incidentSummary}</p>
                    <div className="pt-1 flex items-center justify-between text-[10px]">
                      <span className="text-purple-800 font-medium">Target: {draft.targetPathway}</span>
                      <Link to="/refusal" className="text-indigo-700 underline font-semibold">
                        View Draft &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Threat / Pressure Log Summary Card */}
          <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <h3 className="text-sm font-bold text-slate-900">Threat / Pressure Log</h3>
              </div>
              <button
                onClick={() => setThreatModalOpen(true)}
                className="text-xs text-amber-800 font-semibold hover:underline cursor-pointer"
              >
                + Log
              </button>
            </div>

            {threatLogs.length === 0 ? (
              <div className="text-xs text-slate-500 py-2">No threats logged.</div>
            ) : (
              <div className="space-y-2.5">
                {threatLogs.map((th) => (
                  <div key={th.id} className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{th.type}</span>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                        {th.safetyLevel}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] line-clamp-2">{th.note}</p>
                    <div className="text-[10px] text-slate-400">{th.date} • Action: {th.actionConsidered}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Custom Timeline Update Modal */}
      {addUpdateOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add Timeline Update</h3>
              <button
                onClick={() => setAddUpdateOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Update Title
                </label>
                <input
                  type="text"
                  required
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                  placeholder="e.g. Consulted DLSA advocate / Received CSR receipt"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Stage Association
                </label>
                <select
                  value={updateStage}
                  onChange={(e) => setUpdateStage(e.target.value as Stage)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Safety">Safety</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Support">Support</option>
                  <option value="Follow-up">Follow-up</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description &amp; Action Notes
                </label>
                <textarea
                  required
                  rows={3}
                  value={updateDesc}
                  onChange={(e) => setUpdateDesc(e.target.value)}
                  placeholder="Record what step occurred or who gave advice..."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddUpdateOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-900 hover:bg-indigo-950 rounded-lg shadow-xs"
                >
                  Save to Timeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Threat Modal */}
      <ThreatPressureModal
        isOpen={threatModalOpen}
        onClose={() => setThreatModalOpen(false)}
        caseId={currentCase.id}
      />
    </div>
  );
};
