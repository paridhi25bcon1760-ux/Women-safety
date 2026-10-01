import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, PhoneOff, Shield, X, User } from 'lucide-react';

export const FakeCallModal: React.FC = () => {
  const { isFakeCallOpen, dismissFakeCall } = useApp();
  const [callState, setCallState] = useState<'ringing' | 'connected'>('ringing');
  const [callSeconds, setCallSeconds] = useState(0);

  useEffect(() => {
    if (isFakeCallOpen) {
      setCallState('ringing');
      setCallSeconds(0);
    }
  }, [isFakeCallOpen]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isFakeCallOpen && callState === 'connected') {
      timer = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isFakeCallOpen, callState]);

  if (!isFakeCallOpen) return null;

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Simulated incoming call"
    >
      <div className="relative w-full max-w-sm bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl p-6 flex flex-col items-center justify-between min-h-[520px]">
        {/* Prototype safety watermark */}
        <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-indigo-400 font-medium">
            <Shield className="w-3.5 h-3.5" /> Demo Discreet Feature
          </span>
          <button
            onClick={dismissFakeCall}
            className="text-slate-400 hover:text-white p-1 rounded-full bg-slate-800"
            aria-label="Close demo call"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Caller Avatar & Name */}
        <div className="flex flex-col items-center mt-6">
          <div className="relative mb-4">
            <div className={`w-28 h-28 rounded-full bg-slate-800 border-2 border-indigo-500/50 flex items-center justify-center ${callState === 'ringing' ? 'animate-pulse ring-4 ring-indigo-500/20' : ''}`}>
              <User className="w-14 h-14 text-indigo-300" />
            </div>
            {callState === 'ringing' && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
              </span>
            )}
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
            Family Call
          </h2>
          <p className="text-sm text-slate-400">
            {callState === 'ringing' ? 'Incoming simulated call...' : `Connected (${formatTimer(callSeconds)})`}
          </p>

          {callState === 'connected' && (
            <div className="mt-4 px-4 py-2.5 bg-slate-800/80 rounded-xl text-xs text-slate-300 border border-slate-700 max-w-xs text-center">
              <p className="font-medium text-emerald-400 mb-1">“Hello? Where are you right now?”</p>
              <p className="text-[11px] text-slate-400">Discreet script prompt: Use this call as an excuse to politely step away from an uncomfortable situation.</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full mt-6 flex flex-col items-center gap-4">
          {callState === 'ringing' ? (
            <div className="w-full flex items-center justify-around gap-6">
              <button
                onClick={dismissFakeCall}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
                aria-label="Decline fake call"
              >
                <div className="w-14 h-14 rounded-full bg-rose-600 group-hover:bg-rose-700 flex items-center justify-center text-white shadow-lg transition-transform active:scale-95">
                  <PhoneOff className="w-6 h-6" />
                </div>
                <span className="text-xs text-slate-300">Decline</span>
              </button>

              <button
                onClick={() => setCallState('connected')}
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
                aria-label="Answer fake call"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-600 group-hover:bg-emerald-700 flex items-center justify-center text-white shadow-lg transition-transform active:scale-95">
                  <Phone className="w-6 h-6 animate-bounce" />
                </div>
                <span className="text-xs text-slate-300">Answer</span>
              </button>
            </div>
          ) : (
            <button
              onClick={dismissFakeCall}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
              aria-label="Hang up fake call"
            >
              <div className="w-16 h-16 rounded-full bg-rose-600 group-hover:bg-rose-700 flex items-center justify-center text-white shadow-lg transition-transform active:scale-95">
                <PhoneOff className="w-7 h-7" />
              </div>
              <span className="text-xs text-slate-300">End &amp; Exit</span>
            </button>
          )}

          <p className="text-[11px] text-slate-500 text-center">
            Simulated screen for demo &amp; safe exit practice. No actual phone network is used.
          </p>
        </div>
      </div>
    </div>
  );
};
