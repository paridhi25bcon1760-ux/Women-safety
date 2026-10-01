import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Case,
  TimelineEvent,
  EvidenceRecord,
  ThreatLog,
  EscalationDraft,
  Reminder,
  TrustedContact,
  UserPreferences,
} from '../types';
import * as storage from '../services/storage';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'alert';
}

interface AppContextType {
  currentCase: Case;
  timeline: TimelineEvent[];
  evidenceRecords: EvidenceRecord[];
  threatLogs: ThreatLog[];
  drafts: EscalationDraft[];
  reminders: Reminder[];
  trustedContacts: TrustedContact[];
  preferences: UserPreferences;
  isFakeCallOpen: boolean;
  toasts: ToastMessage[];
  toggleDiscreetMode: () => void;
  addEvidence: (record: EvidenceRecord) => void;
  addThreat: (log: ThreatLog) => void;
  saveDraft: (draft: EscalationDraft) => void;
  addTimelineItem: (event: TimelineEvent) => void;
  toggleReminder: (id: string) => void;
  addReminderItem: (reminder: Reminder) => void;
  triggerFakeCall: () => void;
  dismissFakeCall: () => void;
  showToast: (message: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;
  resetAll: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCase, setCurrentCase] = useState<Case>(() => storage.getCaseById('SK-2026-001') || storage.getCases()[0]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(() => storage.getTimelineEvents('SK-2026-001'));
  const [evidenceRecords, setEvidenceRecords] = useState<EvidenceRecord[]>(() => storage.getEvidenceRecords('SK-2026-001'));
  const [threatLogs, setThreatLogs] = useState<ThreatLog[]>(() => storage.getThreatLogs('SK-2026-001'));
  const [drafts, setDrafts] = useState<EscalationDraft[]>(() => storage.getEscalationDrafts('SK-2026-001'));
  const [reminders, setReminders] = useState<Reminder[]>(() => storage.getReminders('SK-2026-001'));
  const [trustedContacts, setTrustedContacts] = useState<TrustedContact[]>(() => storage.getTrustedContacts());
  const [preferences, setPreferences] = useState<UserPreferences>(() => storage.getPreferences());
  const [isFakeCallOpen, setIsFakeCallOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Keep state synchronized
  const refreshAll = () => {
    setCurrentCase(storage.getCaseById('SK-2026-001') || storage.getCases()[0]);
    setTimeline(storage.getTimelineEvents('SK-2026-001'));
    setEvidenceRecords(storage.getEvidenceRecords('SK-2026-001'));
    setThreatLogs(storage.getThreatLogs('SK-2026-001'));
    setDrafts(storage.getEscalationDrafts('SK-2026-001'));
    setReminders(storage.getReminders('SK-2026-001'));
    setTrustedContacts(storage.getTrustedContacts());
    setPreferences(storage.getPreferences());
  };

  const showToast = (message: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleDiscreetMode = () => {
    const updated = storage.savePreferences({ discreetMode: !preferences.discreetMode });
    setPreferences(updated);
    showToast(
      updated.discreetMode
        ? 'Discreet mode enabled: Interface disguised as "Notes & Reminders".'
        : 'Standard safety interface restored.',
      'info'
    );
  };

  const addEvidence = (record: EvidenceRecord) => {
    storage.addEvidenceRecord(record);
    refreshAll();
    showToast(`Record "${record.title}" preserved with integrity fingerprint.`, 'success');
  };

  const addThreat = (log: ThreatLog) => {
    storage.addThreatLog(log);
    refreshAll();
    if (log.safetyLevel === 'High') {
      showToast('High safety concern logged. Consider contacting trusted local support or emergency services if in immediate danger.', 'alert');
    } else {
      showToast('Threat/pressure entry preserved to case timeline.', 'success');
    }
  };

  const saveDraft = (draft: EscalationDraft) => {
    storage.saveEscalationDraft(draft);
    refreshAll();
    showToast('Draft escalation letter attached to case timeline.', 'success');
  };

  const addTimelineItem = (event: TimelineEvent) => {
    storage.addTimelineEvent(event);
    refreshAll();
    showToast('Case timeline updated.', 'success');
  };

  const toggleReminder = (id: string) => {
    const updated = storage.toggleReminder(id);
    setReminders(updated);
  };

  const addReminderItem = (reminder: Reminder) => {
    storage.addReminder(reminder);
    refreshAll();
    showToast('New follow-up reminder scheduled.', 'success');
  };

  const triggerFakeCall = () => {
    setIsFakeCallOpen(true);
  };

  const dismissFakeCall = () => {
    setIsFakeCallOpen(false);
  };

  const resetAll = () => {
    storage.resetAllData();
    refreshAll();
    showToast('Demo data reset to initial prototype seed.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentCase,
        timeline,
        evidenceRecords,
        threatLogs,
        drafts,
        reminders,
        trustedContacts,
        preferences,
        isFakeCallOpen,
        toasts,
        toggleDiscreetMode,
        addEvidence,
        addThreat,
        saveDraft,
        addTimelineItem,
        toggleReminder,
        addReminderItem,
        triggerFakeCall,
        dismissFakeCall,
        showToast,
        dismissToast,
        resetAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
