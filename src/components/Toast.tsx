import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, AlertOctagon, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      aria-live="polite"
      aria-label="Notification banners"
    >
      {toasts.map((toast) => {
        let bg = 'bg-slate-900 text-white border-slate-700';
        let icon = <Info className="w-5 h-5 text-indigo-400 shrink-0" />;

        if (toast.type === 'success') {
          bg = 'bg-emerald-950 text-emerald-50 border-emerald-800';
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
        } else if (toast.type === 'warning') {
          bg = 'bg-amber-950 text-amber-50 border-amber-800';
          icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
        } else if (toast.type === 'alert') {
          bg = 'bg-rose-950 text-rose-50 border-rose-800';
          icon = <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg transition-all animate-in fade-in slide-in-from-bottom-2 ${bg}`}
          >
            {icon}
            <div className="flex-1 text-sm leading-snug">{toast.message}</div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
