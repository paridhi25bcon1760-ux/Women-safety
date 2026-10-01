import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EvidenceRecord, EvidenceType } from '../types';
import { generateSimulatedHash } from '../services/storage';
import {
  FolderLock,
  PlusCircle,
  Mic,
  Camera,
  FileText,
  MapPin,
  FileCode,
  ShieldAlert,
  Hash,
  Copy,
  Check,
  Play,
  Pause,
  AlertTriangle,
  Info,
  Calendar,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const EvidencePage: React.FC = () => {
  const { currentCase, evidenceRecords, addEvidence, showToast } = useApp();

  const [selectedCaseId, setSelectedCaseId] = useState(currentCase.id);
  const [recordType, setRecordType] = useState<EvidenceType>('audio');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [locationNote, setLocationNote] = useState('Mansarovar, Jaipur');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(() => {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  });
  const [selectedTags, setSelectedTags] = useState<string[]>(['Witness']);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Audio player simulation state
  const [isPlayingDemoAudio, setIsPlayingDemoAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(35);

  const availableTags = ['Threat', 'Injury', 'Witness', 'Refusal', 'Follow-up'];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleCopyHash = (hash: string, id: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedId(id);
    showToast('Simulated SHA-256 fingerprint copied to clipboard.', 'info');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newId = `EV-2026-${(evidenceRecords.length + 1).toString().padStart(3, '0')}`;
    const generatedHash = generateSimulatedHash(`${newId}-${date}-${time}-${description}-${recordType}`);

    const newRecord: EvidenceRecord = {
      id: newId,
      caseId: selectedCaseId,
      type: recordType,
      title: title.trim() || `${recordType.toUpperCase()} Record ${newId}`,
      description: description.trim(),
      date,
      time,
      locationNote: locationNote.trim() || 'Jaipur, Rajasthan',
      tags: selectedTags.length > 0 ? selectedTags : ['Follow-up'],
      sampleFileName:
        recordType === 'audio'
          ? 'voice_note_demo_01.m4a'
          : recordType === 'photo'
          ? 'incident_photo_ref_01.jpg'
          : recordType === 'document'
          ? 'complaint_receipt_scan.pdf'
          : undefined,
      fileDetails:
        recordType === 'audio'
          ? { size: '342 KB', duration: '0:42', format: 'MPEG-4 Audio (Sample)' }
          : recordType === 'photo'
          ? { size: '1.8 MB', format: 'JPEG Image (Sample)' }
          : recordType === 'document'
          ? { size: '480 KB', format: 'PDF Document (Sample)' }
          : undefined,
      checksumPreview: generatedHash,
      createdAt: `${date} ${time}`,
      accessLevel: 'Private case record',
      status: 'Integrity-check preview generated',
    };

    addEvidence(newRecord);

    // Reset form
    setTitle('');
    setDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-800 text-xs font-semibold mb-2 border border-indigo-100">
            <FolderLock className="w-3.5 h-3.5" />
            <span>Incident Record &amp; Integrity Preview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Demo Evidence Vault
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Preserve chronological notes, sample audio files, and location contexts with cryptographic validation previews.
          </p>
        </div>

        {/* Case selector */}
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs">
          <label htmlFor="case-select" className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            Active Case:
          </label>
          <select
            id="case-select"
            value={selectedCaseId}
            onChange={(e) => setSelectedCaseId(e.target.value)}
            className="text-xs font-bold text-indigo-900 bg-transparent focus:outline-hidden cursor-pointer"
          >
            <option value="SK-2026-001">SK-2026-001 (Jaipur Harassment &amp; Refusal)</option>
          </select>
        </div>
      </div>

      {/* Required Prototype Warning Box */}
      <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 flex items-start gap-3 text-xs leading-relaxed">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Protcol &amp; Continuity Notice:</strong> This prototype demonstrates documentation continuity. Real-world evidence handling requires qualified legal and technical guidance. Sakshi does not guarantee court admissibility, tamper-proof storage, or official encryption standards.
        </div>
      </div>

      {/* Main Grid: Add Record Form (Left) & Preserved Records List (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ADD RECORD FORM (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Add Incident Record</h2>
            <p className="text-xs text-slate-500">Record a new observation or attachment</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Record Type Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Record Type
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { type: 'audio', label: 'Audio', icon: Mic },
                  { type: 'photo', label: 'Photo', icon: Camera },
                  { type: 'text', label: 'Text', icon: FileText },
                  { type: 'location', label: 'Location', icon: MapPin },
                  { type: 'document', label: 'Doc', icon: FileCode },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = recordType === item.type;
                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setRecordType(item.type as EvidenceType)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-[11px] transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold ring-1 ring-indigo-500'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-700' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Prepared Sample File Row (for audio, photo, document) */}
            {recordType === 'audio' && (
              <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-indigo-950 flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-indigo-700" />
                    Prepared Demo Sample
                  </span>
                  <span className="text-[10px] text-indigo-700 font-mono">0:42 • 342 KB</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-indigo-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPlayingDemoAudio(!isPlayingDemoAudio)}
                      className="w-7 h-7 rounded-full bg-indigo-900 text-white flex items-center justify-center cursor-pointer hover:bg-indigo-950"
                      aria-label={isPlayingDemoAudio ? 'Pause demo audio' : 'Play demo audio'}
                    >
                      {isPlayingDemoAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                    </button>
                    <span className="font-mono text-[11px] text-slate-800">voice_note_demo_01.m4a</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Demo Voice Memo</span>
                </div>
                <p className="text-[10px] text-indigo-900/80">
                  Note: In this prototype, sample audio is pre-configured to avoid microphone permissions.
                </p>
              </div>
            )}

            {recordType === 'photo' && (
              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200 text-xs text-purple-950 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-purple-700" />
                  <span className="font-mono text-[11px]">incident_photo_ref_01.jpg</span>
                </div>
                <span className="text-[10px] text-purple-700 font-medium">Sample Staged (1.8 MB)</span>
              </div>
            )}

            {recordType === 'document' && (
              <div className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 text-xs text-teal-950 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-teal-700" />
                  <span className="font-mono text-[11px]">complaint_receipt_scan.pdf</span>
                </div>
                <span className="text-[10px] text-teal-700 font-medium">Sample Staged (480 KB)</span>
              </div>
            )}

            {/* Title */}
            <div>
              <label htmlFor="record-title" className="block text-xs font-semibold text-slate-700 mb-1">
                Record Title / Label
              </label>
              <input
                id="record-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Eyewitness statement / Refusal audio note"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="record-date" className="block text-xs font-semibold text-slate-700 mb-1">
                  Incident Date
                </label>
                <input
                  id="record-date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                />
              </div>
              <div>
                <label htmlFor="record-time" className="block text-xs font-semibold text-slate-700 mb-1">
                  Incident Time
                </label>
                <input
                  id="record-time"
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
                />
              </div>
            </div>

            {/* Location Note */}
            <div>
              <label htmlFor="record-location" className="block text-xs font-semibold text-slate-700 mb-1">
                Location Note
              </label>
              <input
                id="record-location"
                type="text"
                value={locationNote}
                onChange={(e) => setLocationNote(e.target.value)}
                placeholder="Specific bus stop, police station, or address"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="record-desc" className="block text-xs font-semibold text-slate-700 mb-1">
                Short Description / Observations
              </label>
              <textarea
                id="record-desc"
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Key details: who was present, what was said, duty officer refusal reason..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-white"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Optional Categorization Tags
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-900 border-indigo-900 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Save Demo Record &amp; Generate SHA-256 Preview</span>
              </button>
            </div>
          </form>
        </div>

        {/* PRESERVED EVIDENCE RECORD CARDS (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Preserved Case Records ({evidenceRecords.length})
            </h2>
            <Link
              to={`/case/${selectedCaseId}`}
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 inline-flex items-center gap-1"
            >
              <span>View in Case Timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {evidenceRecords.map((record) => {
              let Icon = FileText;
              let iconBg = 'bg-slate-100 text-slate-700';
              if (record.type === 'audio') {
                Icon = Mic;
                iconBg = 'bg-rose-100 text-rose-800';
              } else if (record.type === 'photo') {
                Icon = Camera;
                iconBg = 'bg-purple-100 text-purple-800';
              } else if (record.type === 'location') {
                Icon = MapPin;
                iconBg = 'bg-indigo-100 text-indigo-800';
              } else if (record.type === 'document') {
                Icon = FileCode;
                iconBg = 'bg-teal-100 text-teal-800';
              }

              return (
                <div
                  key={record.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-3.5"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{record.title}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                            {record.id}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {record.date} at {record.time} • {record.locationNote}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {record.status}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-700 leading-relaxed">{record.description}</p>

                  {/* Sample File Row if present */}
                  {record.sampleFileName && (
                    <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs flex items-center justify-between">
                      <span className="font-mono text-[11px] text-slate-700 flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 text-indigo-700" />
                        {record.sampleFileName}
                      </span>
                      {record.fileDetails && (
                        <span className="text-[10px] text-slate-500">
                          {record.fileDetails.size} {record.fileDetails.duration && `• ${record.fileDetails.duration}`}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {record.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                    <span className="text-[10px] font-medium text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100 ml-auto">
                      {record.accessLevel}
                    </span>
                  </div>

                  {/* Integrity Check Preview / SHA-256 Checksum */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-500 font-mono truncate">
                      <Hash className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span className="text-[10px] text-slate-400">SHA-256 Preview:</span>
                      <span className="text-[10px] text-slate-700 truncate" title={record.checksumPreview}>
                        {record.checksumPreview.slice(0, 24)}...{record.checksumPreview.slice(-8)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyHash(record.checksumPreview, record.id)}
                      className="inline-flex items-center gap-1 text-[11px] text-indigo-700 hover:text-indigo-900 font-medium shrink-0 cursor-pointer"
                      title="Copy full cryptographic hash"
                    >
                      {copiedId === record.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Hash</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
