import React from 'react';
import { useApp } from '../context/AppContext';
import { EyeOff, AlertCircle } from 'lucide-react';

export const DiscreetBanner: React.FC = () => {
  const { preferences, toggleDiscreetMode } = useApp();

  if (!preferences.discreetMode) return null;

  return (
    <aside aria-label="Discreet mode notification" className="bg-amber-50/90 border-b border-amber-200/80 px-4 py-1.5 text-xs text-amber-900 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <EyeOff className="w-3.5 h-3.5 text-amber-700 shrink-0" aria-hidden="true" />
          <span>
            <strong>Discreet interface active:</strong> Disguised as “Notes &amp; Reminders”. Discreet mode is a visual interface change only.
          </span>
        </div>
        <button
          onClick={toggleDiscreetMode}
          className="underline hover:text-amber-950 font-medium whitespace-nowrap cursor-pointer"
        >
          Restore Standard View
        </button>
      </div>
    </aside>
  );
};
