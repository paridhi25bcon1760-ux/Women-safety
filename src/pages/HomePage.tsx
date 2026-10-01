import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ThreatPressureModal } from '../components/ThreatPressureModal';
import {
  Radio,
  PlusCircle,
  Clock,
  ShieldAlert,
  ArrowRight,
  UserCheck,
  Calendar,
  AlertTriangle,
  FolderLock,
  Layers,
  CheckCircle2,
  FileText,
  EyeOff,
  Eye,
  CheckSquare,
  Shield,
  FileCheck,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentCase,
    trustedContacts,
    reminders,
    toggleReminder,
    threatLogs,
    preferences,
    toggleDiscreetMode,
  } = useApp();

  const [threatModalOpen, setThreatModalOpen] = useState(false);
  const isDiscreet = preferences.discreetMode;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Greeting & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-semibold mb-2">
            {isDiscreet ? (
              <>
                <CheckSquare className="w-3.5 h-3.5 text-stone-600" />
                <span>Personal Organizer</span>
              </>
            ) : (
              <>
                <Shield className="w-3.5 h-3.5 text-indigo-700" />
                <span>Case Continuity Active</span>
              </>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isDiscreet ? 'Daily Notes & Planner' : 'You are not alone.'}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {isDiscreet
              ? 'Your private task and continuity entries for this week.'
              : 'Sakshi helps preserve incident details, alert your trusted circle, and keep follow-up alive.'}
          </p>
        </div>

        {/* Discreet Toggle Widget on Dashboard */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDiscreetMode}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-xs ${
              isDiscreet
                ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isDiscreet ? (
              <>
                <Eye className="w-4 h-4 text-amber-800" />
                <span>Discreet interface (Active)</span>
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 text-slate-500" />
                <span>Discreet interface</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main SOS Banner / Calm Alert Action */}
      {!isDiscreet ? (
        <section
          aria-label="Prototype SOS Trigger"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-900 via-rose-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl"
        >
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-500/30 text-rose-200 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                <span>Prototype Safety Alert Simulation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Start Prototype SOS
              </h2>
              <p className="text-rose-100 text-xs sm:text-sm leading-relaxed">
                Immediately trigger an alert simulation to your 3 trusted contacts with an approximate area preview.
              </p>
              <div className="text-[11px] text-rose-300 font-medium pt-1">
                For immediate danger, contact local emergency services (112 / 1091).
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/sos"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-rose-900 font-bold text-base hover:bg-rose-50 active:scale-95 transition-all shadow-lg cursor-pointer"
              >
                <Radio className="w-5 h-5 text-rose-700" />
                <span>Start Prototype SOS</span>
              </Link>
            </div>
          </div>
        </section>
      ) : (
        /* Discreet Mode Replacement Card */
        <section
          aria-label="Discreet notes card"
          className="rounded-2xl bg-amber-50/70 border border-amber-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
              Today’s Priority Notes
            </div>
            <h2 className="text-lg font-bold text-slate-900">Personal Tasks &amp; Schedule</h2>
            <p className="text-xs text-slate-600">
              Private checklist is active. Quick actions and reminders are synced below.
            </p>
          </div>
          <Link
            to="/sos"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold cursor-pointer"
          >
            <span>Urgent Note (SOS Demo)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      )}

      {/* Quick Action Tiles */}
      <section aria-label="Quick Actions" className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          {isDiscreet ? 'Quick Tools' : 'Quick Actions'}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Add an incident record */}
          <Link
            to="/evidence"
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 text-indigo-700 flex items-center justify-center transition-colors mb-3">
              <FolderLock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">
                {isDiscreet ? 'Add Note Record' : 'Add Incident Record'}
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {isDiscreet
                  ? 'Preserve written note or audio memo'
                  : 'Preserve voice notes, photos & SHA-256 fingerprint'}
              </p>
            </div>
            <div className="mt-3 flex items-center text-xs font-medium text-indigo-700 group-hover:translate-x-0.5 transition-transform">
              <span>{isDiscreet ? 'Open vault' : 'Open vault'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          {/* View case timeline */}
          <Link
            to={`/case/${currentCase.id}`}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 group-hover:bg-purple-100 text-purple-700 flex items-center justify-center transition-colors mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-purple-900 transition-colors">
                {isDiscreet ? 'View Notebook' : 'View Case Timeline'}
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {isDiscreet
                  ? 'Track sequential notes and reminders'
                  : 'Continuous chronological history of SK-2026-001'}
              </p>
            </div>
            <div className="mt-3 flex items-center text-xs font-medium text-purple-700 group-hover:translate-x-0.5 transition-transform">
              <span>View timeline</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          {/* Log threat or pressure */}
          <button
            onClick={() => setThreatModalOpen(true)}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all group flex flex-col justify-between text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 group-hover:bg-amber-100 text-amber-700 flex items-center justify-center transition-colors mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-amber-900 transition-colors">
                {isDiscreet ? 'Log Disruption' : 'Log Threat / Pressure'}
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {isDiscreet
                  ? 'Document call, visit or message interruption'
                  : 'Document coercion, calls or compromise demands'}
              </p>
            </div>
            <div className="mt-3 flex items-center text-xs font-medium text-amber-800 group-hover:translate-x-0.5 transition-transform">
              <span>Log entry</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </button>

          {/* Find support pathways */}
          <Link
            to="/support"
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-teal-400 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 group-hover:bg-teal-100 text-teal-700 flex items-center justify-center transition-colors mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                {isDiscreet ? 'Consult Guides' : 'Find Support Pathways'}
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {isDiscreet
                  ? 'Legal aid clinic, OSC and community guidelines'
                  : 'One Stop Centre, DLSA legal aid, NCW info'}
              </p>
            </div>
            <div className="mt-3 flex items-center text-xs font-medium text-teal-700 group-hover:translate-x-0.5 transition-transform">
              <span>Explore pathways</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* Two Column Grid: Current Case & Trusted Circle */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Case Card (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200/90 shadow-sm p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                  {currentCase.id}
                </span>
                <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {currentCase.status}
                </span>
                <span className="text-xs text-slate-400">
                  • {currentCase.privacyBadge}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                {isDiscreet ? 'Active Personal Record' : currentCase.title}
              </h2>
            </div>

            <Link
              to={`/case/${currentCase.id}`}
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View full timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-500 font-medium">Last Activity</span>
              <p className="font-semibold text-slate-800 text-sm">{currentCase.lastActivity}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-500 font-medium">Next Follow-up</span>
              <p className="font-semibold text-indigo-800 text-sm">In {currentCase.nextReminderDays} days</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-slate-500 font-medium">Location Context</span>
              <p className="font-semibold text-slate-800 text-sm">{currentCase.locationLabel}</p>
            </div>
          </div>

          {/* FIR Refusal Callout Box */}
          <div className="p-4 rounded-xl bg-purple-50/80 border border-purple-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-200 text-purple-900 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-purple-950">
                  Did the police refuse to register your complaint?
                </h3>
                <p className="text-xs text-purple-900/80 mt-0.5">
                  Prepare a structured escalation draft letter citing statutory Zero FIR provisions.
                </p>
              </div>
            </div>
            <Link
              to="/refusal"
              className="shrink-0 px-3.5 py-1.5 rounded-lg bg-purple-800 hover:bg-purple-900 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              Document Refusal
            </Link>
          </div>

          {/* Upcoming Reminders List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {isDiscreet ? 'Saved Reminders' : 'Upcoming Follow-up Reminders'}
              </h3>
              <span className="text-[11px] text-slate-400">Tap to toggle status</span>
            </div>
            <div className="space-y-2">
              {reminders.slice(0, 3).map((reminder) => (
                <div
                  key={reminder.id}
                  onClick={() => toggleReminder(reminder.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    reminder.completed
                      ? 'bg-slate-50 border-slate-200 text-slate-400'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      className={`w-4 h-4 rounded-sm flex items-center justify-center border ${
                        reminder.completed
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {reminder.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                    <span className={`text-xs ${reminder.completed ? 'line-through text-slate-400' : 'font-medium'}`}>
                      {reminder.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 shrink-0">
                    {reminder.completed ? 'Done' : `Due: ${reminder.dueDate}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trusted Circle Card (1 col) */}
        <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {isDiscreet ? 'Emergency Contacts' : 'Trusted Circle'}
                </h2>
                <p className="text-xs text-slate-500">3 pre-configured demo contacts</p>
              </div>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              When an alert is simulated, these 3 trusted people receive approximate location context without broad broadcast.
            </p>

            <div className="space-y-2.5">
              {trustedContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <span>{contact.name}</span>
                      {contact.isPrimary && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 font-bold">
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="text-slate-500 text-[11px]">{contact.relationship}</div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {contact.status}
                    </span>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{contact.phonePreview}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="text-[11px] text-slate-400 italic">
              Mock contacts only. No real SMS or voice calls are placed.
            </div>
          </div>
        </div>
      </div>

      {/* Threat and Pressure Log Summary Section */}
      <section className="rounded-2xl bg-white border border-slate-200/90 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <h2 className="text-base font-bold text-slate-900">
                {isDiscreet ? 'Disruption & Pressure Records' : 'Threat & Pressure Log'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Preserve attempts to compromise, coerce, or delay your case.
            </p>
          </div>
          <button
            onClick={() => setThreatModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Log Threat or Pressure</span>
          </button>
        </div>

        {threatLogs.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-500">
            No threat or pressure incidents logged yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {threatLogs.map((log) => {
              let badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
              if (log.safetyLevel === 'Medium') badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
              if (log.safetyLevel === 'High') badgeColor = 'bg-rose-50 text-rose-800 border-rose-200';

              return (
                <div
                  key={log.id}
                  className="p-4 rounded-xl bg-stone-50/70 border border-stone-200 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{log.type}</span>
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${badgeColor}`}>
                      Level: {log.safetyLevel}
                    </span>
                  </div>
                  <p className="text-slate-600 line-clamp-2">{log.note}</p>
                  <div className="flex items-center justify-between pt-1 border-t border-stone-200/60 text-[11px] text-slate-400">
                    <span>{log.date} at {log.time}</span>
                    <span className="text-indigo-700 font-medium">Action: {log.actionConsidered}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Threat Pressure Modal */}
      <ThreatPressureModal
        isOpen={threatModalOpen}
        onClose={() => setThreatModalOpen(false)}
        caseId={currentCase.id}
      />
    </div>
  );
};
