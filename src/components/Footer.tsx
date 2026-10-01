import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldCheck, RotateCcw, AlertCircle, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  const { resetAll, preferences } = useApp();

  return (
    <footer className="mt-auto bg-stone-100/90 border-t border-stone-200/80 text-slate-600 text-xs py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Core Disclaimer Box */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-xs">
              <strong>Hackathon Prototype Notice:</strong> Sakshi is an educational and workflow prototype. It does not contact police or emergency services, file official complaints, or provide legal advice. If you are in immediate physical danger, contact local emergency services (112 / 1091 in India) or reach a trusted person immediately.
            </p>
          </div>
          <Link
            to="/privacy"
            className="shrink-0 text-amber-900 font-semibold underline hover:text-amber-950 whitespace-nowrap text-xs"
          >
            Read Prototype Boundaries &rarr;
          </Link>
        </div>

        {/* Links & Brand Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-stone-200">
          <div className="flex items-center gap-2 text-slate-700">
            <HeartHandshake className="w-4 h-4 text-indigo-700" />
            <span className="font-semibold text-slate-800">
              {preferences.discreetMode ? 'Notes & Reminders' : 'Sakshi'}
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-500">“From the first SOS to follow-up.”</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-600">
            <Link to="/privacy" className="hover:text-slate-900 underline underline-offset-2">
              Privacy &amp; Prototype Limits
            </Link>
            <Link to="/support" className="hover:text-slate-900 underline underline-offset-2">
              Support Pathways
            </Link>
            <Link to="/neutral" className="hover:text-slate-900 underline underline-offset-2">
              Daily Planner (Quick Exit)
            </Link>
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-indigo-800 transition-colors cursor-pointer"
              title="Reset sample case and logs to initial seed state"
            >
              <RotateCcw className="w-3 h-3" /> Reset Demo State
            </button>
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-400">
          Built for continuity and documentation integrity. All data stored in browser localStorage only.
        </div>
      </div>
    </footer>
  );
};
