import {
  Case,
  EvidenceRecord,
  TimelineEvent,
  ThreatLog,
  EscalationDraft,
  Reminder,
  TrustedContact,
  UserPreferences,
} from '../types';
import {
  SEED_CASE,
  SEED_EVIDENCE_RECORDS,
  SEED_TIMELINE_EVENTS,
  SEED_THREAT_LOGS,
  SEED_REMINDERS,
  SEED_TRUSTED_CONTACTS,
} from '../data/seedData';

const KEYS = {
  CASES: 'sakshi_cases_v1',
  TIMELINE: 'sakshi_timeline_v1',
  EVIDENCE: 'sakshi_evidence_v1',
  THREATS: 'sakshi_threats_v1',
  DRAFTS: 'sakshi_drafts_v1',
  REMINDERS: 'sakshi_reminders_v1',
  CONTACTS: 'sakshi_contacts_v1',
  PREFERENCES: 'sakshi_preferences_v1',
};

// SHA-256 Simulation generator
export function generateSimulatedHash(input: string): string {
  // Deterministic 64-char hex string simulation
  let hash1 = 0x811c9dc5;
  let hash2 = 0x5a17e923;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash1 ^= char;
    hash1 = (hash1 * 0x01000193) >>> 0;
    hash2 ^= char;
    hash2 = (hash2 * 0x01000193) >>> 0;
  }
  const hex1 = hash1.toString(16).padStart(8, '0');
  const hex2 = hash2.toString(16).padStart(8, '0');
  const hex3 = ((hash1 ^ 0xabcdef12) >>> 0).toString(16).padStart(8, '0');
  const hex4 = ((hash2 ^ 0x98765432) >>> 0).toString(16).padStart(8, '0');
  const hex5 = ((hash1 + hash2) >>> 0).toString(16).padStart(8, '0');
  const hex6 = ((hash1 * 31 + 17) >>> 0).toString(16).padStart(8, '0');
  const hex7 = ((hash2 * 13 + 59) >>> 0).toString(16).padStart(8, '0');
  const hex8 = (((hash1 ^ hash2) + 0x12345678) >>> 0).toString(16).padStart(8, '0');
  return `${hex1}${hex2}${hex3}${hex4}${hex5}${hex6}${hex7}${hex8}`;
}

export function getPreferences(): UserPreferences {
  try {
    const data = localStorage.getItem(KEYS.PREFERENCES);
    if (data) return JSON.parse(data);
  } catch {
    // fallback
  }
  return {
    discreetMode: false,
    reducedMotion: false,
    demoModeNoticeDismissed: false,
  };
}

export function savePreferences(prefs: Partial<UserPreferences>): UserPreferences {
  const current = getPreferences();
  const updated = { ...current, ...prefs };
  localStorage.setItem(KEYS.PREFERENCES, JSON.stringify(updated));
  return updated;
}

export function getCases(): Case[] {
  try {
    const data = localStorage.getItem(KEYS.CASES);
    if (data) return JSON.parse(data);
  } catch {
    // fallback
  }
  const defaults = [SEED_CASE];
  localStorage.setItem(KEYS.CASES, JSON.stringify(defaults));
  return defaults;
}

export function getCaseById(id: string): Case | undefined {
  const cases = getCases();
  return cases.find((c) => c.id === id) || cases[0];
}

export function updateCase(updatedCase: Case): void {
  const cases = getCases();
  const index = cases.findIndex((c) => c.id === updatedCase.id);
  if (index >= 0) {
    cases[index] = updatedCase;
  } else {
    cases.push(updatedCase);
  }
  localStorage.setItem(KEYS.CASES, JSON.stringify(cases));
}

export function getTimelineEvents(caseId: string = 'SK-2026-001'): TimelineEvent[] {
  try {
    const data = localStorage.getItem(KEYS.TIMELINE);
    if (data) {
      const all: TimelineEvent[] = JSON.parse(data);
      return all.filter((e) => e.caseId === caseId);
    }
  } catch {
    // fallback
  }
  localStorage.setItem(KEYS.TIMELINE, JSON.stringify(SEED_TIMELINE_EVENTS));
  return SEED_TIMELINE_EVENTS.filter((e) => e.caseId === caseId);
}

export function addTimelineEvent(event: TimelineEvent): void {
  const all = getTimelineEvents(event.caseId);
  const updated = [event, ...all.filter((e) => e.id !== event.id)];
  // Sort descending by timestamp
  localStorage.setItem(KEYS.TIMELINE, JSON.stringify(updated));

  // Update case last activity
  const currentCase = getCaseById(event.caseId);
  if (currentCase) {
    currentCase.lastActivity = event.title;
    updateCase(currentCase);
  }
}

export function getEvidenceRecords(caseId: string = 'SK-2026-001'): EvidenceRecord[] {
  try {
    const data = localStorage.getItem(KEYS.EVIDENCE);
    if (data) {
      const all: EvidenceRecord[] = JSON.parse(data);
      return all.filter((r) => r.caseId === caseId);
    }
  } catch {
    // fallback
  }
  localStorage.setItem(KEYS.EVIDENCE, JSON.stringify(SEED_EVIDENCE_RECORDS));
  return SEED_EVIDENCE_RECORDS.filter((r) => r.caseId === caseId);
}

export function addEvidenceRecord(record: EvidenceRecord): void {
  const all = getEvidenceRecords(record.caseId);
  const updated = [record, ...all.filter((r) => r.id !== record.id)];
  localStorage.setItem(KEYS.EVIDENCE, JSON.stringify(updated));

  // Add timeline event
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const timelineEvent: TimelineEvent = {
    id: `tle-ev-${Date.now()}`,
    caseId: record.caseId,
    timestamp: now.toISOString(),
    timeLabel: timeString,
    title: `Evidence record added (${record.type.toUpperCase()})`,
    description: `${record.title}: ${record.description}. Integrity fingerprint generated.`,
    category: 'evidence',
    stage: 'Documentation',
    badge: 'Evidence Record',
    metadata: {
      recordId: record.id,
      hashPreview: record.checksumPreview.slice(0, 12) + '...',
    },
  };
  addTimelineEvent(timelineEvent);
}

export function getThreatLogs(caseId: string = 'SK-2026-001'): ThreatLog[] {
  try {
    const data = localStorage.getItem(KEYS.THREATS);
    if (data) {
      const all: ThreatLog[] = JSON.parse(data);
      return all.filter((t) => t.caseId === caseId);
    }
  } catch {
    // fallback
  }
  localStorage.setItem(KEYS.THREATS, JSON.stringify(SEED_THREAT_LOGS));
  return SEED_THREAT_LOGS.filter((t) => t.caseId === caseId);
}

export function addThreatLog(log: ThreatLog): void {
  const all = getThreatLogs(log.caseId);
  const updated = [log, ...all.filter((t) => t.id !== log.id)];
  localStorage.setItem(KEYS.THREATS, JSON.stringify(updated));

  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const timelineEvent: TimelineEvent = {
    id: `tle-th-${Date.now()}`,
    caseId: log.caseId,
    timestamp: now.toISOString(),
    timeLabel: timeString,
    title: `Threat/Pressure logged: ${log.type}`,
    description: `Level: ${log.safetyLevel}. ${log.note}`,
    category: 'threat',
    stage: 'Follow-up',
    badge: `Safety: ${log.safetyLevel}`,
    metadata: {
      threatLevel: log.safetyLevel,
      action: log.actionConsidered,
    },
  };
  addTimelineEvent(timelineEvent);
}

export function getEscalationDrafts(caseId: string = 'SK-2026-001'): EscalationDraft[] {
  try {
    const data = localStorage.getItem(KEYS.DRAFTS);
    if (data) {
      const all: EscalationDraft[] = JSON.parse(data);
      return all.filter((d) => d.caseId === caseId);
    }
  } catch {
    // fallback
  }
  return [];
}

export function saveEscalationDraft(draft: EscalationDraft): void {
  const all = getEscalationDrafts(draft.caseId);
  const updated = [draft, ...all.filter((d) => d.id !== draft.id)];
  localStorage.setItem(KEYS.DRAFTS, JSON.stringify(updated));

  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const timelineEvent: TimelineEvent = {
    id: `tle-dr-${Date.now()}`,
    caseId: draft.caseId,
    timestamp: now.toISOString(),
    timeLabel: timeString,
    title: `Escalation draft prepared (${draft.targetPathway})`,
    description: `Draft letter compiled regarding refusal at ${draft.stationOrInstitution}. Ready for legal aid or commission review.`,
    category: 'refusal',
    stage: 'Support',
    badge: 'Draft Escalation',
  };
  addTimelineEvent(timelineEvent);
}

export function getReminders(caseId: string = 'SK-2026-001'): Reminder[] {
  try {
    const data = localStorage.getItem(KEYS.REMINDERS);
    if (data) {
      const all: Reminder[] = JSON.parse(data);
      return all.filter((r) => r.caseId === caseId);
    }
  } catch {
    // fallback
  }
  localStorage.setItem(KEYS.REMINDERS, JSON.stringify(SEED_REMINDERS));
  return SEED_REMINDERS.filter((r) => r.caseId === caseId);
}

export function toggleReminder(id: string): Reminder[] {
  const reminders = getReminders();
  const updated = reminders.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r));
  localStorage.setItem(KEYS.REMINDERS, JSON.stringify(updated));
  return updated;
}

export function addReminder(reminder: Reminder): void {
  const reminders = getReminders(reminder.caseId);
  const updated = [reminder, ...reminders];
  localStorage.setItem(KEYS.REMINDERS, JSON.stringify(updated));
}

export function getTrustedContacts(): TrustedContact[] {
  try {
    const data = localStorage.getItem(KEYS.CONTACTS);
    if (data) return JSON.parse(data);
  } catch {
    // fallback
  }
  localStorage.setItem(KEYS.CONTACTS, JSON.stringify(SEED_TRUSTED_CONTACTS));
  return SEED_TRUSTED_CONTACTS;
}

export function updateTrustedContactStatus(id: string, status: TrustedContact['status']): void {
  const contacts = getTrustedContacts();
  const updated = contacts.map((c) => (c.id === id ? { ...c, status } : c));
  localStorage.setItem(KEYS.CONTACTS, JSON.stringify(updated));
}

export function resetAllData(): void {
  localStorage.setItem(KEYS.CASES, JSON.stringify([SEED_CASE]));
  localStorage.setItem(KEYS.TIMELINE, JSON.stringify(SEED_TIMELINE_EVENTS));
  localStorage.setItem(KEYS.EVIDENCE, JSON.stringify(SEED_EVIDENCE_RECORDS));
  localStorage.setItem(KEYS.THREATS, JSON.stringify(SEED_THREAT_LOGS));
  localStorage.setItem(KEYS.REMINDERS, JSON.stringify(SEED_REMINDERS));
  localStorage.setItem(KEYS.CONTACTS, JSON.stringify(SEED_TRUSTED_CONTACTS));
  localStorage.removeItem(KEYS.DRAFTS);
}

export function exportCaseSummaryAsText(caseId: string = 'SK-2026-001'): string {
  const currentCase = getCaseById(caseId);
  const timeline = getTimelineEvents(caseId);
  const evidence = getEvidenceRecords(caseId);
  const threats = getThreatLogs(caseId);
  const drafts = getEscalationDrafts(caseId);
  const contacts = getTrustedContacts();

  return `===================================================================
SAKSHI CASE CONTINUITY RECORD - PROTOTYPE DEMO SUMMARY
===================================================================
NOTICE: This is a hackathon prototype summary intended for personal 
continuity and documentation review only. It does not constitute court-
admissible evidence, official legal filings, or police records.
Verify all details with qualified legal / support professionals.
===================================================================

CASE IDENTIFIER: ${currentCase?.id || caseId}
TITLE: ${currentCase?.title || 'Safety & Continuity Record'}
INCIDENT TYPE: ${currentCase?.incidentType || 'Not specified'}
LOCATION: ${currentCase?.locationLabel || 'Jaipur, Rajasthan'}
STATUS: ${currentCase?.status || 'Follow-up needed'}
STAGE: ${currentCase?.currentStage || 'Support'}
GENERATED ON: ${new Date().toLocaleString()}

-------------------------------------------------------------------
1. TRUSTED CIRCLE CONTACTS (SIMULATED PREPARED)
-------------------------------------------------------------------
${contacts.map((c, i) => `${i + 1}. ${c.name} (${c.relationship}) - Status: ${c.status}`).join('\n')}

-------------------------------------------------------------------
2. INCIDENT & EVIDENCE VAULT RECORDS (${evidence.length})
-------------------------------------------------------------------
${evidence
  .map(
    (e, i) => `[Record ${i + 1}] ID: ${e.id} | Type: ${e.type.toUpperCase()} | Date: ${e.date} ${e.time}
Title: ${e.title}
Location: ${e.locationNote}
Description: ${e.description}
Tags: ${e.tags.join(', ')}
Simulated Integrity Check (SHA-256): ${e.checksumPreview}
Status: ${e.status}
`
  )
  .join('\n')}

-------------------------------------------------------------------
3. THREAT & PRESSURE LOGS (${threats.length})
-------------------------------------------------------------------
${
  threats.length === 0
    ? 'No threat/pressure incidents logged.'
    : threats
        .map(
          (t, i) => `[Threat ${i + 1}] Date: ${t.date} ${t.time} | Type: ${t.type} | Level: ${t.safetyLevel}
Note: ${t.note}
Action Considered: ${t.actionConsidered}`
        )
        .join('\n\n')
}

-------------------------------------------------------------------
4. ESCALATION DRAFTS GENERATED (${drafts.length})
-------------------------------------------------------------------
${
  drafts.length === 0
    ? 'No escalation draft generated yet.'
    : drafts
        .map(
          (d, i) => `[Draft ${i + 1}] Date: ${d.attemptDate} | Target: ${d.targetPathway}
Station/Institution: ${d.stationOrInstitution}
Refusal Reason: ${d.refusalReasonGiven}
Written Ack Provided: ${d.writtenAckProvided}
Status: ${d.status}
Content Preview:
${d.fullDraftContent.slice(0, 300)}...`
        )
        .join('\n\n')
}

-------------------------------------------------------------------
5. CASE CHRONOLOGY TIMELINE (${timeline.length} Events)
-------------------------------------------------------------------
${timeline
  .map(
    (t, i) => `${i + 1}. [${t.timeLabel}] [${t.stage.toUpperCase()}] ${t.title}
   Details: ${t.description}`
  )
  .join('\n')}

===================================================================
END OF PROTOTYPE CASE RECORD
===================================================================`;
}

export function exportCaseSummaryAsJson(caseId: string = 'SK-2026-001'): string {
  const currentCase = getCaseById(caseId);
  const timeline = getTimelineEvents(caseId);
  const evidence = getEvidenceRecords(caseId);
  const threats = getThreatLogs(caseId);
  const drafts = getEscalationDrafts(caseId);
  const contacts = getTrustedContacts();
  const reminders = getReminders(caseId);

  return JSON.stringify(
    {
      prototypeNotice: 'Sakshi Prototype Case Continuity Summary - For demo and personal review only.',
      case: currentCase,
      contacts,
      timeline,
      evidence,
      threats,
      drafts,
      reminders,
      exportedAt: new Date().toISOString(),
    },
    null,
    2
  );
}
