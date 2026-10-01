import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ThreatLog, ThreatLevel, ThreatType } from '../types';
import { AlertTriangle, X, ShieldAlert, Check } from 'lucide-react';

interface ThreatPressureModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId?: string;
}

export const ThreatPressureModal: React.FC<ThreatPressureModalProps> = ({
  isOpen,
  onClose,
  caseId = 'SK-2026-001',
}) => {
  const { addThreat } = useApp();

  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(() => {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  });
  const [type, setType] = useState<ThreatType>('Pressure to withdraw');
  const [safetyLevel, setSafetyLevel] = useState<ThreatLevel>('Medium');
  const [note, setNote] = useState('');
  const [actionConsidered, setActionConsidered] = useState<ThreatLog['actionConsidered']>('Save as case record');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    setIsSubmitting(true);
    const newLog: ThreatLog = {
      id: `th-${Date.now()}`,
      caseId,
      timestamp: `${date} ${time}`,
      date,
      time,
      type,
      note: note.trim(),
      safetyLevel,
      actionConsidered,
    };

    addThreat(newLog);
    setIsSubmitting(false);
    onClose();
    // Reset form
    setNote('');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="threat-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 id="threat-modal-title" className="text-base font-semibold text-slate-900">
                Log Threat or Pressure
              </h2>
              <p className="text-xs text-slate-500">Case ID: {caseId} • Confidential private log</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="threat-date" className="block text-xs font-semibold text-slate-700 mb-1">
                Date
              </label>
              <input
                id="threat-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
              />
            </div>
            <div>
              <label htmlFor="threat-time" className="block text-xs font-semibold text-slate-700 mb-1">
                Time
              </label>
              <input
                id="threat-time"
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="threat-type" className="block text-xs font-semibold text-slate-700 mb-1">
              Nature of Concern
            </label>
            <select
              id="threat-type"
              value={type}
              onChange={(e) => setType(e.target.value as ThreatType)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
            >
              <option value="Pressure to withdraw">Pressure to withdraw complaint</option>
              <option value="Threat">Direct or indirect threat</option>
              <option value="Contact attempt">Unwanted call, message, or approach</option>
              <option value="Witness concern">Witness intimidation or hesitation</option>
              <option value="Delay">Undue administrative stalling or delay</option>
              <option value="Other">Other coercion or concern</option>
            </select>
          </div>

          {/* Safety concern level */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Perceived Safety Concern Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Low', 'Medium', 'High'] as ThreatLevel[]).map((level) => {
                const isSelected = safetyLevel === level;
                let activeStyle = '';
                if (isSelected) {
                  if (level === 'Low') activeStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-semibold ring-1 ring-emerald-500';
                  if (level === 'Medium') activeStyle = 'bg-amber-50 border-amber-500 text-amber-900 font-semibold ring-1 ring-amber-500';
                  if (level === 'High') activeStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-semibold ring-1 ring-rose-500';
                } else {
                  activeStyle = 'bg-white border-slate-200 text-slate-600 hover:border-slate-300';
                }

                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSafetyLevel(level)}
                    className={`py-2 px-3 text-xs rounded-lg border text-center transition-all cursor-pointer ${activeStyle}`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
            {safetyLevel === 'High' && (
              <div className="mt-2.5 p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-900">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>
                  <strong>High safety concern note:</strong> Consider contacting trusted local support or emergency services if there is immediate danger.
                </span>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="threat-note" className="block text-xs font-semibold text-slate-700 mb-1">
              Incident / Note Description
            </label>
            <textarea
              id="threat-note"
              required
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Describe what occurred, who made contact, or words used..."
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white placeholder:text-slate-400"
            />
          </div>

          <div>
            <label htmlFor="action-considered" className="block text-xs font-semibold text-slate-700 mb-1">
              Action Considered (Optional)
            </label>
            <select
              id="action-considered"
              value={actionConsidered}
              onChange={(e) => setActionConsidered(e.target.value as ThreatLog['actionConsidered'])}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
            >
              <option value="Save as case record">Save as private case record only</option>
              <option value="Tell trusted person">Inform my trusted circle</option>
              <option value="Add to escalation draft">Incorporate into escalation draft letter</option>
              <option value="Seek legal guidance">Consult DLSA legal aid advocate</option>
              <option value="None">No action right now</option>
            </select>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              Save Threat Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
