import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Search, Globe, Mail, ExternalLink, GraduationCap, Users, Building2, ChevronLeft, X } from 'lucide-react';
import { WireframeHeader } from '../../components/WireframeHeader';
import { WireframeFooter } from '../../components/WireframeFooter';
import { FACULTY_SITES, DIRECTORY_TOTAL, FacultySite } from './FacultySitesData';

const PAGE = 25;

// Initials for the avatar, skipping academic titles
function initials(name: string) {
  const parts = name.replace(/^(أ\.د\.|أ\.د|د\.|الدكتور|الدكتورة|م\.)\s*/, '').trim().split(/\s+/);
  return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
}

// Normalise Arabic letters so "احمد" matches "أحمد"
function norm(s: string) {
  return s.toLowerCase().replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/[ً-ْ]/g, '');
}

function SiteRow({ f }: { f: FacultySite }) {
  return (
    <div className="group flex flex-wrap md:flex-nowrap items-center gap-x-4 gap-y-3 px-5 md:px-6 py-4 border-b border-gray-100 last:border-0 hover:bg-[#f8f6ee] transition-colors">
      <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-[#0f3057] to-[#1d4e89] text-[#c9a227] flex items-center justify-center text-[15px] font-bold">
        {initials(f.name)}
      </div>
      <div className="min-w-0 flex-1 grid md:grid-cols-3 gap-1 md:gap-6 items-center">
        <span className="text-[15px] font-bold text-[#0f3057] leading-relaxed md:truncate">{f.name}</span>
        <span className="text-[13.5px] text-gray-600 truncate flex items-center gap-1.5">
          <Building2 size={14} className="text-[#c9a227] shrink-0" />{f.college || '—'}
        </span>
        {f.email ? (
          <a href={'mailto:' + f.email} className="text-[12px] md:text-[13px] text-gray-600 hover:text-[#c9a227] min-w-0 flex items-center gap-1.5">
            <Mail size={14} className="text-[#c9a227] shrink-0" /><span dir="ltr" className="truncate">{f.email}</span>
          </a>
        ) : (
          <span className="text-[13px] text-gray-400 hidden md:flex items-center gap-1.5"><Mail size={14} className="text-gray-300 shrink-0" />—</span>
        )}
      </div>
      <a href={f.url} target="_blank" rel="noopener noreferrer"
        className="w-full md:w-auto justify-center shrink-0 inline-flex items-center gap-2 rounded-xl border border-[#0f3057]/15 px-3 md:px-5 py-2.5 text-[12.5px] md:text-[13px] font-bold text-[#0f3057] hover:bg-[#0f3057] hover:text-white hover:border-[#0f3057] transition-colors">
        <Globe size={15} className="hidden sm:inline" /><span>عرض الموقع</span><ExternalLink size={13} className="opacity-60 hidden sm:inline" />
      </a>
    </div>
  );
}

export function FacultySites() {
  const [q, setQ] = useState('');
  const [college, setCollege] = useState('');
  const [shown, setShown] = useState(PAGE);

  const colleges = useMemo(() => {
    const m = new Map<string, number>();
    for (const f of FACULTY_SITES) if (f.college) m.set(f.college, (m.get(f.college) || 0) + 1);
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, []);

  const results = useMemo(() => {
    const nq = norm(q.trim());
    return FACULTY_SITES.filter(f =>
      (!college || f.college === college) &&
      (!nq || norm([f.name, f.college, f.department, f.email].filter(Boolean).join(' ')).includes(nq)));
  }, [q, college]);

  const total = Math.max(FACULTY_SITES.length, DIRECTORY_TOTAL);
  const reset = () => { setQ(''); setCollege(''); setShown(PAGE); };

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] bg-[#f7f8fa]">
      <WireframeHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-[#0a2342] via-[#0f3057] to-[#1d4e89] text-white">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} />
        <div className="absolute -left-24 -bottom-24 w-[420px] h-[420px] rounded-full bg-[#c9a227]/10 blur-3xl" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-[130px] pb-24">
          <nav className="flex items-center gap-2 text-[13px] text-white/60 mb-6">
            <Link to="/" className="hover:text-[#c9a227]">الرئيسية</Link><ChevronLeft size={14} />
            <span className="text-[#c9a227]">مواقع أعضاء هيئة التدريس</span>
          </nav>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#c9a227]/40 bg-[#c9a227]/10 px-4 py-1.5 text-[12.5px] font-bold text-[#c9a227] mb-5">
            <GraduationCap size={15} /> الهيئة التدريسية
          </span>
          <h1 className="text-[34px] md:text-[48px] font-bold leading-tight">مواقع أعضاء هيئة التدريس</h1>
          <p className="mt-4 max-w-[680px] text-[15.5px] leading-[1.9] text-white/75">
            دليل المواقع الشخصية لأعضاء الهيئة التدريسية في جامعة مؤتة؛ تعرّف على السير الذاتية والأبحاث والمساقات والمواد التعليمية لكل عضو هيئة تدريس.
          </p>
          <div className="mt-10 inline-flex items-center gap-4 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur px-6 py-4">
            <div className="w-11 h-11 rounded-xl bg-[#c9a227]/15 flex items-center justify-center"><Users size={20} className="text-[#c9a227]" /></div>
            <div>
              <div className="text-[26px] font-bold leading-none">{total}</div>
              <div className="text-[12.5px] text-white/60 mt-1.5">عضو هيئة تدريس</div>
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-10 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 md:p-5">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={q} onChange={e => { setQ(e.target.value); setShown(PAGE); }}
                placeholder="ابحث بالاسم أو الكلية أو البريد الإلكتروني…"
                className="w-full h-12 rounded-xl bg-[#f3f4f6] pr-11 pl-10 text-[14px] text-[#0f3057] outline-none border border-transparent focus:border-[#c9a227] focus:bg-white transition-colors" />
              {q && <button onClick={() => setQ('')} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0f3057]"><X size={16} /></button>}
            </div>
            {colleges.length > 0 && (
              <select value={college} onChange={e => { setCollege(e.target.value); setShown(PAGE); }}
                className="h-12 rounded-xl bg-[#f3f4f6] px-4 text-[14px] text-[#0f3057] outline-none border border-transparent focus:border-[#c9a227] md:w-[300px]">
                <option value="">جميع الكليات</option>
                {colleges.map(([c, n]) => <option key={c} value={c}>{c} ({n})</option>)}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <main className="max-w-[1400px] w-full mx-auto px-6 md:px-10 py-10 flex-1">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[14px] text-gray-600">عرض <b className="text-[#0f3057]">{Math.min(shown, results.length)}</b> من <b className="text-[#0f3057]">{results.length}</b> عضو</p>
          {(q || college) && <button onClick={reset} className="text-[13px] font-bold text-[#c9a227] hover:underline">مسح البحث</button>}
        </div>

        {results.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-16 text-center">
            <Search size={36} className="mx-auto text-gray-300 mb-4" />
            <p className="text-[16px] font-bold text-[#0f3057]">لا توجد نتائج مطابقة</p>
            <p className="text-[13.5px] text-gray-500 mt-2">جرّب كلمة بحث أخرى.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="hidden md:flex items-center gap-4 px-6 py-3 bg-[#0f3057] text-white/80 text-[12.5px] font-bold">
              <span className="w-11 shrink-0" />
              <div className="flex-1 grid grid-cols-3 gap-6"><span>اسم عضو هيئة التدريس</span><span>الكلية</span><span>البريد الإلكتروني</span></div>
              <span className="w-[150px] shrink-0 text-center">الموقع</span>
            </div>
            {results.slice(0, shown).map(f => <SiteRow key={f.name + f.url} f={f} />)}
          </div>
        )}

        {shown < results.length && (
          <div className="text-center mt-10">
            <button onClick={() => setShown(s => s + PAGE)}
              className="rounded-xl bg-[#0f3057] text-white px-8 py-3 text-[14px] font-bold hover:bg-[#c9a227] hover:text-[#0f3057] transition-colors">
              عرض المزيد
            </button>
          </div>
        )}
      </main>

      <WireframeFooter />
    </div>
  );
}
