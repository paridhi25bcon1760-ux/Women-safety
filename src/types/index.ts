export type CaseStatus = 'Open' | 'Follow-up needed' | 'Escalated' | 'Resolved' | 'Archived';

export type Stage = 'Safety' | 'Documentation' | 'Support' | 'Follow-up';

export interface TrustedContact {
  id: string;
  name: string;
  relationship: string;
  phonePreview: string;
  status: 'Ready' | 'Alert prepared' | 'Notified (simulated)';
  isPrimary?: boolean;
}

export interface TimelineEvent {
  id: string;
  caseId: string;
  timestamp: string; // ISO string or human-readable string
  timeLabel: string;
  title: string;
  description: string;
  category: 'sos' | 'evidence' | 'refusal' | 'threat' | 'support' | 'reminder' | 'system';
  stage: Stage;
  badge?: string;
  metadata?: Record<string, string>;
}

export type EvidenceType = 'audio' | 'photo' | 'text' | 'location' | 'document';

export interface EvidenceRecord {
  id: string;
  caseId: string;
  type: EvidenceType;
  title: string;
  description: string;
  date: string;
  time: string;
  locationNote: string;
  tags: string[]; // Threat, Injury, Witness, Refusal, Follow-up
  sampleFileName?: string;
  fileDetails?: {
    size?: string;
    duration?: string;
    format?: string;
  };
  checksumPreview: string; // Simulated SHA-256
  createdAt: string;
  accessLevel: 'Private case record';
  status: 'Integrity-check preview generated';
}

export interface EscalationDraft {
  id: string;
  caseId: string;
  createdAt: string;
  attemptDate: string;
  stationOrInstitution: string;
  officerOrDeskDetail?: string;
  incidentSummary: string;
  refusalReasonGiven: string;
  writtenAckProvided: 'Yes' | 'No' | 'Not sure';
  witnessPresentNote?: string;
  pressureOrDelayReported: boolean;
  pressureDetails?: string;
  targetPathway: 'Legal aid review' | 'NGO support' | 'Women’s commission information' | 'Senior authority escalation information';
  fullDraftContent: string;
  status: 'Draft generated for review';
}

export type ThreatLevel = 'Low' | 'Medium' | 'High';

export type ThreatType = 
  | 'Threat' 
  | 'Pressure to withdraw' 
  | 'Contact attempt' 
  | 'Witness concern' 
  | 'Delay' 
  | 'Other';

export interface ThreatLog {
  id: string;
  caseId: string;
  timestamp: string;
  date: string;
  time: string;
  type: ThreatType;
  note: string;
  safetyLevel: ThreatLevel;
  actionConsidered: 'Tell trusted person' | 'Seek legal guidance' | 'Add to escalation draft' | 'Save as case record' | 'None';
}

export interface Reminder {
  id: string;
  caseId: string;
  title: string;
  dueInDays: number;
  dueDate: string;
  completed: boolean;
  category: 'legal' | 'safety' | 'followup' | 'support';
}

export interface SupportPathway {
  id: string;
  title: string;
  category: 'emergency' | 'medical-osc' | 'legal' | 'ngo' | 'commission';
  badge: string;
  description: string;
  whenToConsider: string;
  whatItHelpsWith: string[];
  contactDemoLabel: string;
  preparationChecklist: string[];
  sampleDraftTitle: string;
  sampleDraftContent: string;
}

export interface SOSAlert {
  id: string;
  timestamp: string;
  timeLabel: string;
  approxLocationLabel: string;
  contactsNotified: {
    contactId: string;
    name: string;
    status: string;
  }[];
  checkInTimerMinutes?: number;
  isCheckInActive?: boolean;
}

export interface Case {
  id: string;
  title: string;
  incidentType: string;
  locationLabel: string;
  status: CaseStatus;
  currentStage: Stage;
  createdAt: string;
  lastActivity: string;
  nextReminderDays: number;
  privacyBadge: 'Private demo record';
  description: string;
}

export interface UserPreferences {
  discreetMode: boolean;
  reducedMotion: boolean;
  demoModeNoticeDismissed: boolean;
}
