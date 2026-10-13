import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import {
  ChevronLeft, Mail, Phone, Printer, Building2, GraduationCap, BookOpen, FlaskConical, FileText,
  UserRound, ExternalLink, ArrowRight, Clock, Megaphone, FileUser, Info, Calendar,
} from 'lucide-react';
import { WireframeHeader } from '../../components/WireframeHeader';
import { WireframeFooter } from '../../components/WireframeFooter';
import { findMember } from './FacultySitesData';

function initials(name: string) {
  const parts = name.replace(/^(أ\.د\.|أ\.د|د\.|الدكتور|الدكتورة|م\.)\s*/, '').trim().split(/\s+/);
  return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
}

function Section({ id, icon: I, title, empty, children }: { id: string; icon: any; title: string; empty: boolean; children?: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <h2 className="flex items-center gap-3 text-[19px] font-bold text-[#0f3057] mb-6">
        <span className="w-10 h-10 rounded-xl bg-[#0f3057] flex items-center justify-center"><I size={18} className="text-[#c9a227]" /></span>
        {title}
      </h2>
      {empty
        ? <p className="rounded-xl bg-[#f7f8fa] border border-dashed border-gray-200 px-5 py-4 text-[13.5px] text-gray-500">لا يوجد محتوى مضاف حالياً.</p>
        : children}
    </section>
  );
}

function ContactRow({ icon: I, label, value, href }: { icon: any; label: string; value?: string; href?: string }) {
  return (
    <div className="flex items-center gap-3 py-3.5 border-b border-gray-100 last:border-0">
      <span className="w-9 h-9 shrink-0 rounded-lg bg-[#c9a227]/10 flex items-center justify-center"><I size={16} className="text-[#c9a227]" /></span>
      <div className="min-w-0">
        <div className="text-[12px] text-gray-500">{label}</div>
        {value
          ? (href
            ? <a href={href} dir="ltr" className="block text-[14px] font-bold text-[#0f3057] hover:text-[#c9a227] mt-0.5 break-all">{value}</a>
            : <div dir="ltr" className="text-[14px] font-bold text-[#0f3057] mt-0.5 text-right">{value}</div>)
          : <div className="text-[13.5px] text-gray-400 mt-0.5">غير متوفر</div>}
      </div>
    </div>
  );
}

// CV / Google Scholar / ResearchGate buttons; dimmed when no link is set
function ProfileLink({ href, icon, label, primary }: { href?: string; icon: React.ReactNode; label: string; primary?: boolean }) {
  const base = 'inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[13.5px] font-bold transition-colors';
  if (!href) {
    return <span title="غير متوفر" className={base + ' border border-white/15 text-white/40 cursor-not-allowed'}>{icon}{label}</span>;
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={base + (primary ? ' bg-[#c9a227] text-[#0f3057] hover:bg-white' : ' border border-white/25 text-white hover:bg-white/10')}>
      {icon}{label}<ExternalLink size={13} className="opacity-60" />
    </a>
  );
}

const ScholarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5Z" /></svg>
);
const RGIcon = () => (
  <span className="w-4 h-4 rounded-[3px] bg-current/0 border border-current text-[9px] leading-[14px] font-bold text-center" dir="ltr">RG</span>
);

const SECTIONS = [
  { id: 'about', title: 'معلومات عامة', icon: Info },
  { id: 'research', title: 'الاهتمامات البحثية', icon: FlaskConical },
  { id: 'publications', title: 'الأبحاث المنشورة', icon: FileText },
  { id: 'courses', title: 'المواد التدريسية', icon: BookOpen },
  { id: 'news', title: 'الأخبار والإعلانات', icon: Megaphone },
  { id: 'hours', title: 'الساعات المكتبية ومعلومات أخرى', icon: Clock },
];

export function FacultyProfile() {
  const { slug } = useParams();
  const f = findMember(slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!f) {
    return (
      <div dir="rtl" className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] bg-[#f7f8fa]">
        <WireframeHeader />
        <main className="flex-1 flex items-center justify-center px-6 pt-[120px] pb-20">
          <div className="text-center">
            <UserRound size={44} className="mx-auto text-gray-300 mb-4" />
            <h1 className="text-[22px] font-bold text-[#0f3057]">لم يتم العثور على عضو هيئة التدريس</h1>
            <Link to="/faculty-sites" className="inline-flex items-center gap-2 mt-6 rounded-xl bg-[#0f3057] text-white px-6 py-3 text-[14px] font-bold hover:bg-[#c9a227] hover:text-[#0f3057] transition-colors">
              <ArrowRight size={16} /> العودة إلى مواقع أعضاء هيئة التدريس
            </Link>
          </div>
        </main>
        <WireframeFooter />
      </div>
    );
  }

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] bg-[#f7f8fa]">
      <WireframeHeader />

      {/* Hero: name, college, department, CV / Scholar / ResearchGate */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-[#0a2342] via-[#0f3057] to-[#1d4e89] text-white">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '26px 26px' }} />
        <div className="absolute -left-32 -top-32 w-[460px] h-[460px] rounded-full bg-[#c9a227]/10 blur-3xl" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-[130px] pb-28">
          <nav className="flex flex-wrap items-center gap-2 text-[13px] text-white/60 mb-10">
            <Link to="/" className="hover:text-[#c9a227]">الرئيسية</Link><ChevronLeft size={14} />
            <Link to="/faculty-sites" className="hover:text-[#c9a227]">مواقع أعضاء هيئة التدريس</Link><ChevronLeft size={14} />
            <span className="text-[#c9a227]">{f.name}</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="shrink-0 self-start md:self-auto w-[128px] h-[128px] md:w-[150px] md:h-[150px] rounded-[28px] p-[3px] bg-gradient-to-br from-[#c9a227] to-[#c9a227]/20 shadow-2xl">
              {f.photo
                ? <img src={f.photo} alt={f.name} className="w-full h-full rounded-[25px] object-cover bg-[#0f3057]" />
                : <div className="w-full h-full rounded-[25px] bg-gradient-to-br from-[#0f3057] to-[#1d4e89] flex items-center justify-center text-[44px] md:text-[50px] font-bold text-[#c9a227]">{initials(f.name)}</div>}
            </div>
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#c9a227]/40 bg-[#c9a227]/10 px-4 py-1.5 text-[12.5px] font-bold text-[#c9a227] mb-4">
                <GraduationCap size={15} /> عضو هيئة تدريس
              </span>
              <h1 className="text-[30px] md:text-[44px] font-bold leading-tight">{f.name}</h1>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] text-white/75">
                <span className="flex items-center gap-2"><Building2 size={16} className="text-[#c9a227]" />{f.college || '—'}</span>
                <span className="flex items-center gap-2"><BookOpen size={16} className="text-[#c9a227]" />{f.department || 'القسم غير محدد'}</span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <ProfileLink href={f.cv} primary icon={<FileUser size={16} />} label="السيرة الذاتية" />
                <ProfileLink href={f.scholar} icon={<ScholarIcon />} label="Google Scholar" />
                <ProfileLink href={f.researchgate} icon={<RGIcon />} label="ResearchGate" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-10 -mt-14 pb-16 flex-1">
        <div className="grid lg:grid-cols-[320px_1fr] gap-6 items-start">
          {/* Sidebar: contact + section nav */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6">
              <h3 className="text-[15px] font-bold text-[#0f3057] mb-2 pb-3 border-b-2 border-[#c9a227] inline-block">معلومات التواصل</h3>
              <div className="mt-2">
                <ContactRow icon={Phone} label="رقم الهاتف" value={f.phone} href={f.phone && 'tel:' + f.phone.replace(/\s/g, '')} />
                <ContactRow icon={Printer} label="الفاكس" value={f.fax} />
                <ContactRow icon={Mail} label="البريد الإلكتروني" value={f.email} href={f.email && 'mailto:' + f.email} />
              </div>
            </div>
            <nav className="hidden lg:block bg-white rounded-2xl border border-gray-100 shadow-sm p-3">
              {SECTIONS.map(s => (
                <button key={s.id} onClick={() => go(s.id)}
                  className="w-full text-right flex items-center gap-3 rounded-xl px-4 py-3 text-[13.5px] font-bold text-gray-600 hover:bg-[#f8f6ee] hover:text-[#0f3057] transition-colors">
                  <s.icon size={16} className="text-[#c9a227]" /> {s.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="space-y-6 min-w-0">
            <Section id="about" icon={Info} title="معلومات عامة" empty={!f.about?.length}>
              <div className="space-y-4 text-[15px] leading-[2] text-gray-700">{f.about?.map((p, i) => <p key={i}>{p}</p>)}</div>
            </Section>

            <Section id="research" icon={FlaskConical} title="الاهتمامات البحثية" empty={!f.research?.length}>
              <div className="flex flex-wrap gap-2.5">
                {f.research?.map((r, i) => (
                  <span key={i} className="rounded-xl bg-[#f3f4f6] border border-gray-100 px-4 py-2 text-[13.5px] font-bold text-[#0f3057]">{r}</span>
                ))}
              </div>
            </Section>

            <Section id="publications" icon={FileText} title="الأبحاث المنشورة" empty={!f.publications?.length}>
              <ol className="divide-y divide-gray-100">
                {f.publications?.map((p, i) => (
                  <li key={i} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="w-8 h-8 shrink-0 rounded-lg bg-[#0f3057]/5 text-[#0f3057] text-[13px] font-bold flex items-center justify-center">{i + 1}</span>
                    <div className="min-w-0">
                      <h3 className="text-[14.5px] font-bold text-[#0f3057] leading-relaxed">
                        {p.link ? <a href={p.link} target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a227]">{p.title}</a> : p.title}
                      </h3>
                      {(p.venue || p.year) && <p className="text-[13px] text-gray-500 mt-1">{[p.venue, p.year].filter(Boolean).join(' · ')}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="courses" icon={BookOpen} title="المواد التدريسية" empty={!f.courses?.length}>
              <div className="grid sm:grid-cols-2 gap-3">
                {f.courses?.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-[#fafbfc] px-4 py-3.5">
                    <BookOpen size={16} className="text-[#c9a227] shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[14px] font-bold text-[#0f3057]">{c.title}</div>
                      {c.code && <div className="text-[12px] text-gray-500 mt-0.5" dir="ltr">{c.code}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="news" icon={Megaphone} title="الأخبار والإعلانات" empty={!f.news?.length}>
              <div className="space-y-3">
                {f.news?.map((n, i) => {
                  const body = (
                    <>
                      {n.date && <span className="flex items-center gap-1.5 text-[12px] font-bold text-[#c9a227] mb-1.5"><Calendar size={13} />{n.date}</span>}
                      <h3 className="text-[15px] font-bold text-[#0f3057] leading-relaxed">{n.title}</h3>
                      {n.text && <p className="text-[13.5px] text-gray-600 mt-1.5 leading-relaxed">{n.text}</p>}
                    </>
                  );
                  return n.link
                    ? <a key={i} href={n.link} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-gray-100 p-4 hover:border-[#c9a227] transition-colors">{body}</a>
                    : <div key={i} className="rounded-xl border border-gray-100 p-4">{body}</div>;
                })}
              </div>
            </Section>

            <Section id="hours" icon={Clock} title="الساعات المكتبية ومعلومات أخرى" empty={!f.officeHours?.length && !f.otherInfo?.length}>
              {!!f.officeHours?.length && (
                <div className="overflow-hidden rounded-xl border border-gray-100">
                  <div className="grid grid-cols-2 bg-[#0f3057] text-white/85 text-[12.5px] font-bold px-5 py-3"><span>اليوم</span><span>الوقت</span></div>
                  {f.officeHours.map((h, i) => (
                    <div key={i} className="grid grid-cols-2 px-5 py-3 text-[14px] border-t border-gray-100 even:bg-[#fafbfc]">
                      <span className="font-bold text-[#0f3057]">{h.day}</span><span className="text-gray-600" dir="ltr" style={{ textAlign: 'right' }}>{h.time}</span>
                    </div>
                  ))}
                </div>
              )}
              {!!f.otherInfo?.length && (
                <ul className={'space-y-3 ' + (f.officeHours?.length ? 'mt-6' : '')}>
                  {f.otherInfo.map((t, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14.5px] text-gray-700 leading-relaxed">
                      <span className="mt-2.5 w-2 h-2 rounded-full bg-[#c9a227] shrink-0" />{t}
                    </li>
                  ))}
                </ul>
              )}
            </Section>
          </div>
        </div>
      </main>

      <WireframeFooter />
    </div>
  );
}
