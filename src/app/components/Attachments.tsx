import React from 'react';
import { Paperclip, Download } from 'lucide-react';

// "المرفقات" block shown under course-description and study-plan content.
// Files are sample entries for now: they are displayed but do not open.
export type Attachment = { name: string; type: 'pdf' | 'docx' };

const TYPES = {
  pdf: { label: 'PDF', badge: 'bg-[#d93025]', tint: 'bg-[#d93025]/8' },
  docx: { label: 'DOCX', badge: 'bg-[#2b579a]', tint: 'bg-[#2b579a]/8' },
};

function FileIcon({ type }: { type: Attachment['type'] }) {
  const t = TYPES[type];
  return (
    <div className={'relative w-11 h-13 shrink-0 rounded-lg ' + t.tint + ' flex items-end justify-center pb-1.5'} style={{ height: 52 }}>
      <svg viewBox="0 0 24 30" className="absolute inset-0 m-auto w-7 h-9 text-gray-300" fill="currentColor" aria-hidden="true">
        <path d="M3 0h12l9 9v18a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3Z" opacity=".55" />
        <path d="M15 0v6a3 3 0 0 0 3 3h6Z" />
      </svg>
      <span className={'relative text-[9px] font-extrabold text-white rounded px-1.5 py-0.5 tracking-wide ' + t.badge} dir="ltr">{t.label}</span>
    </div>
  );
}

export function Attachments({ files, title = 'المرفقات', className = '' }: { files: Attachment[]; title?: string; className?: string }) {
  if (!files.length) return null;
  return (
    <section className={'mt-10 pt-8 border-t border-gray-100 ' + className}>
      <h3 className="flex items-center gap-2.5 text-[17px] font-bold text-[#0f3057] mb-5">
        <span className="w-9 h-9 rounded-lg bg-[#c9a227]/12 flex items-center justify-center"><Paperclip size={17} className="text-[#c9a227]" /></span>
        {title}
        <span className="text-xs font-bold text-gray-400">{files.length}</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {files.map((f, i) => (
          <div key={i} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3" title="ملف توضيحي">
            <FileIcon type={f.type} />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-bold text-[#0f3057] leading-relaxed truncate">{f.name}</p>
              <p className="text-[12px] text-gray-400 mt-0.5" dir="ltr" style={{ textAlign: 'right' }}>{TYPES[f.type].label}</p>
            </div>
            <span className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-300 shrink-0" aria-hidden="true">
              <Download size={16} />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// Standard pair of sample files (PDF + Word) for a given document title
export const samplePair = (base: string): Attachment[] => [
  { name: base + '.pdf', type: 'pdf' },
  { name: base + '.docx', type: 'docx' },
];
