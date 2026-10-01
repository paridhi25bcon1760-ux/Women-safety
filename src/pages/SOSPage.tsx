import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Radio,
  MapPin,
  Users,
  Timer,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  PhoneCall,
  Clock,
  Shield,
  FileCheck2,
  Calendar,
  RotateCcw,
} from 'lucide-react';

export const SOSPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentCase,
    trustedContacts,
    addTimelineItem,
    triggerFakeCall,
    showToast,
  } = useApp();

  const [step, setStep] = useState<1 | 2>(1);
  const [includeLocation, setIncludeLocation] = useState(true);
  const [includeCircle, setIncludeCircle] = useState(true);
  const [startTimer, setStartTimer] = useState(true);
  const [isActivating, setIsActivating] = useState(false);

  // Screen 2 generated details
  const [alertId, setAlertId] = useState('');
  const [alertTime, setAlertTime] = useState('');
  const [timerRemaining, setTimerRemaining] = useState(600); // 10 minutes (600 seconds)

  // Countdown timer for 10-min safety check
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (step === 2 && startTimer && timerRemaining > 0) {
      interval = setInterval(() => {
        setTimerRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, startTimer, timerRemaining]);

  const handleStartSOS = () => {
    setIsActivating(true);
    setTimeout(() => {
      const generatedId = `SOS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      setAlertId(generatedId);
      setAlertTime(`${now.toLocaleDateString()} at ${timeStr}`);
      setIsActivating(false);
      setStep(2);

      // Add to timeline
      addTimelineItem({
        id: `tle-sos-${Date.now()}`,
        caseId: currentCase.id,
        timestamp: now.toISOString(),
        timeLabel: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: 'Prototype SOS alert triggered',
        description: `Alert ID: ${generatedId}. Prepared alert for 3 contacts with Jaipur approximate area preview. Check-in timer: 10 mins.`,
        category: 'sos',
        stage: 'Safety',
        badge: 'SOS Simulation',
      });

      showToast('Prototype alert created. Contacts prepared.', 'success');
    }, 600);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner / Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3 text-xs leading-relaxed shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Simulated Safety Environment:</strong> This is a demo. No real messages, calls, or location sharing will occur. For immediate danger, contact local emergency services (112) or reach trusted people nearby.
        </div>
      </div>

      {step === 1 ? (
        /* SCREEN 1: PRE-SOS CONFIGURATION & TRIGGER */
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold border border-rose-200">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              <span>Safety Initiation Workflow</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Start Prototype SOS
            </h1>
            <p className="text-sm text-slate-600">
              Simulate preparing a confidential alert packet for your pre-designated circle.
            </p>
          </div>

          {/* Options Toggles Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4 max-w-xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Simulation Parameters
            </h2>

            <div className="space-y-3">
              {/* Toggle 1: Approximate location preview */}
              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50/70 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">
                      Include approximate location preview
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Demo location: Jaipur, Rajasthan (approximate district radius)
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeLocation}
                  onChange={(e) => setIncludeLocation(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded-sm border-slate-300 focus:ring-indigo-500 cursor-pointer"
                />
              </label>

              {/* Toggle 2: Trusted-circle alert */}
              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50/70 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">
                      Include trusted-circle alert
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Prepares simulated notifications for Riya, Meena &amp; Anjali
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeCircle}
                  onChange={(e) => setIncludeCircle(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded-sm border-slate-300 focus:ring-emerald-500 cursor-pointer"
                />
              </label>

              {/* Toggle 3: 10-minute safety check-in timer */}
              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50/70 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <Timer className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900">
                      Start 10-minute safety check-in timer
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Prompts you to confirm safety once you reach a secure space
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={startTimer}
                  onChange={(e) => setStartTimer(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded-sm border-slate-300 focus:ring-purple-500 cursor-pointer"
                />
              </label>
            </div>

            {/* Big Red Button */}
            <div className="pt-4">
              <button
                onClick={handleStartSOS}
                disabled={isActivating}
                className="w-full py-4 px-6 rounded-2xl bg-rose-700 hover:bg-rose-800 text-white font-extrabold text-base shadow-lg hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Radio className={`w-5 h-5 ${isActivating ? 'animate-spin' : 'animate-pulse'}`} />
                <span>{isActivating ? 'Preparing Simulation...' : 'Send Prototype Alert'}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              Clicking prepares the simulated alert packet and switches to active tracking view.
            </p>
          </div>
        </div>
      ) : (
        /* SCREEN 2: POST-SOS SIMULATION RESULT */
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Status Header */}
          <div className="p-6 rounded-3xl bg-emerald-950 text-white shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-800/80 text-emerald-200 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Simulation Active
                  </div>
                  <h1 className="text-2xl font-black text-white">
                    Prototype alert created
                  </h1>
                </div>
              </div>
              <div className="text-xs text-emerald-300 font-mono bg-emerald-900/80 px-3 py-1.5 rounded-xl border border-emerald-700/60">
                Alert ID: <span className="font-bold text-white">{alertId}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-emerald-200">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Timestamp: <strong>{alertTime}</strong></span>
              </div>
              {startTimer && (
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-emerald-400" />
                  <span>
                    Check-in countdown: <strong className="font-mono text-emerald-300">{formatTimer(timerRemaining)}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trusted Contacts Status Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-700" />
                  <h2 className="text-sm font-bold text-slate-900">
                    Trusted Circle Alert Status
                  </h2>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Simulated Ready
                </span>
              </div>

              <div className="space-y-3">
                {trustedContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{contact.name}</div>
                      <div className="text-slate-500 text-[11px]">{contact.relationship}</div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Alert prepared</span>
                      </span>
                      <div className="text-[10px] text-slate-400 mt-0.5">Packet staged</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-500 p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                Demo simulation packet includes: alert timestamp, approximate location note, and link to case continuity vault.
              </div>
            </div>

            {/* Non-Live Location Preview Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-700" />
                  <h2 className="text-sm font-bold text-slate-900">
                    Location Context Preview
                  </h2>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Non-live demo</span>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-stone-100 aspect-video flex flex-col items-center justify-center p-4 text-center">
                {/* Stylized simulated map background */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#4338ca_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Simulated radar circle */}
                <div className="relative flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-indigo-500/10 border-2 border-indigo-400/40 animate-ping absolute" />
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg relative z-10">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>

                <div className="relative z-10 mt-3 space-y-1">
                  <div className="text-xs font-bold text-slate-900">
                    Approximate location preview: Jaipur, Rajasthan
                  </div>
                  <div className="text-[11px] text-slate-600">
                    District radius: ~1.5 km • Mansarovar Sector
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    26.8688° N, 75.7644° E (Fixed demo coordinates)
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-500">
                Sakshi never tracks real-time movement or broadcasts your GPS coordinates to public maps.
              </p>
            </div>
          </div>

          {/* Action CTA Panel */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="text-sm font-bold text-slate-900">Next Recommended Continuity Step</h2>
              <p className="text-xs text-slate-600">
                Preserve what happened right now in the private incident vault while memory is fresh.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Link
                to="/evidence"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Create Incident Record</span>
              </Link>
              <Link
                to={`/case/${currentCase.id}`}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                <span>Go to Case Timeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Fake Call Demo Widget */}
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-200 text-purple-900 flex items-center justify-center shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-purple-950">Need a discreet excuse to step away?</strong>
                <p className="text-purple-800 text-[11px]">
                  Use the “Family Call” demo simulator to trigger an incoming call interface.
                </p>
              </div>
            </div>
            <button
              onClick={triggerFakeCall}
              className="px-3 py-1.5 rounded-lg bg-purple-800 hover:bg-purple-900 text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              Trigger Demo Call
            </button>
          </div>

          {/* Reset / Return to Step 1 */}
          <div className="text-center pt-2">
            <button
              onClick={() => setStep(1)}
              className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer inline-flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Simulate another alert</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
