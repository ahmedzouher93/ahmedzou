import React from 'react';
import { Paperclip, Download } from 'lucide-react';
import { documentFiles, SEEN_TITLES } from '../cms/documents';

// "المرفقات" block shown under course-description and study-plan content.
// Files uploaded in Drupal («ملف مرفق» with the same title) open and download;
// the others are sample entries: displayed but they do not open.
// Accessible formats only: Word (DOCX) and web page (HTML).
export type Attachment = { name: string; type: 'docx' | 'html'; url?: string };

const baseName = (name: string) => name.replace(/\.(docx|html?)$/i, '').trim();

// Replaces each sample pair with the real files uploaded in Drupal for that title
function resolve(files: Attachment[]): Attachment[] {
  const out: Attachment[] = [];
  const done = new Set<string>();
  for (const f of files) {
    if (f.url) { out.push(f); continue; }
    const base = baseName(f.name);
    SEEN_TITLES.add(base);
    const real = documentFiles(base);
    if (!real) { out.push(f); continue; }
    if (done.has(base)) continue;
    done.add(base);
    out.push(...real);
  }
  return out;
}

const TYPES = {
  docx: { label: 'DOCX', badge: 'bg-[#2b579a]', tint: 'bg-[#2b579a]/8' },
  html: { label: 'HTML', badge: 'bg-[#e44d26]', tint: 'bg-[#e44d26]/8' },
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

export function Attachments({ files: given, title = 'المرفقات', className = '' }: { files: Attachment[]; title?: string; className?: string }) {
  const files = resolve(given);
  if (!files.length) return null;
  return (
    <section className={'mt-10 pt-8 border-t border-gray-100 ' + className}>
      <h3 className="flex items-center gap-2.5 text-[17px] font-bold text-[#0f3057] mb-5">
        <span className="w-9 h-9 rounded-lg bg-[#c9a227]/12 flex items-center justify-center"><Paperclip size={17} className="text-[#c9a227]" /></span>
        {title}
        <span className="text-xs font-bold text-gray-400">{files.length}</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {files.map((f, i) => {
          const body = (
            <>
              <FileIcon type={f.type} />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-bold text-[#0f3057] leading-relaxed truncate">{f.name}</p>
                <p className="text-[12px] text-gray-400 mt-0.5" dir="ltr" style={{ textAlign: 'right' }}>{TYPES[f.type].label}</p>
              </div>
              <span className={'w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ' + (f.url ? 'border-[#c9a227]/50 text-[#c9a227]' : 'border-gray-200 text-gray-300')} aria-hidden="true">
                <Download size={16} />
              </span>
            </>
          );
          return f.url
            ? <a key={i} href={f.url} download={f.type === 'docx' ? f.name : undefined} target={f.type === 'html' ? '_blank' : undefined} rel="noopener" className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:border-[#c9a227]/60 hover:shadow-sm transition-all" aria-label={'تحميل ' + f.name}>{body}</a>
            : <div key={i} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3" title="ملف توضيحي">{body}</div>;
        })}
      </div>
    </section>
  );
}

// Standard pair of sample files (Word + HTML) for a given document title
export const samplePair = (base: string): Attachment[] => [
  { name: base + '.docx', type: 'docx' },
  { name: base + '.html', type: 'html' },
];

// Detects course-description wording ("وصف المواد", "وصف مساقات", "ووصف موادها", "وصف مقرر"…)
export const DESC_RE = /وصف\s*(ال)?(مادة|مواد|مساق|مساقات|مقرر|مقررات)/;
export function mentionsDescription(...texts: unknown[]): boolean {
  const flat = (v: unknown): string => typeof v === 'string' ? v : Array.isArray(v) ? v.map(flat).join(' ') : v && typeof v === 'object' ? Object.values(v as object).map(flat).join(' ') : '';
  return DESC_RE.test(texts.map(flat).join(' '));
}

// For a list of document titles, a Word + HTML sample for each one that is a course description
export function descriptionFiles(names: unknown[]): Attachment[] {
  const seen = new Set<string>();
  const out: Attachment[] = [];
  for (const n of names) {
    const raw = typeof n === 'string' ? n : n && typeof n === 'object' ? String((n as any).name || (n as any).title || '') : '';
    if (!DESC_RE.test(raw)) continue;
    const base = raw.replace(/\s*\((pdf|PDF|docx|DOCX)\)\s*$/, '').replace(/\.(pdf|docx?|html?|PDF|DOCX?|HTML?)$/, '').trim();
    if (seen.has(base)) continue;
    seen.add(base);
    out.push(...samplePair(base));
  }
  return out;
}
