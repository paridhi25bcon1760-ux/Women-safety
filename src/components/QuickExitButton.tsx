import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

interface QuickExitButtonProps {
  variant?: 'nav' | 'floating' | 'banner';
  className?: string;
}

export const QuickExitButton: React.FC<QuickExitButtonProps> = ({
  variant = 'nav',
  className = '',
}) => {
  const navigate = useNavigate();

  const handleExit = () => {
    // Navigate immediately to the neutral planner screen
    navigate('/neutral');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Pressing Escape twice quickly or Alt+X exits quickly
      if (e.key === 'Escape') {
        // Single escape key triggers quick exit if not typing in form inputs
        const target = e.target as HTMLElement;
        if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
          return;
        }
        handleExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  if (variant === 'banner') {
    return (
      <div className="bg-slate-900 text-slate-200 px-4 py-1.5 text-xs flex items-center justify-between">
        <span>Need to leave quickly? Press Esc or click Quick Exit.</span>
        <button
          onClick={handleExit}
          className="bg-rose-700 hover:bg-rose-800 text-white font-medium px-2.5 py-0.5 rounded text-xs transition-colors flex items-center gap-1 cursor-pointer"
          title="Instantly opens a neutral daily planner page (does not clear browser history)"
        >
          <LogOut className="w-3 h-3" /> Quick Exit (Esc)
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleExit}
      aria-label="Quick Exit to neutral daily planner screen"
      title="Instantly opens a neutral daily planner page (does not clear browser history)"
      className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-600 hover:text-white hover:border-rose-600 active:scale-95 transition-all shadow-xs cursor-pointer ${className}`}
    >
      <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
      <span>Quick Exit</span>
      <span className="hidden sm:inline-block text-[10px] opacity-75 px-1 py-0.2 bg-black/10 rounded">Esc</span>
    </button>
  );
};
