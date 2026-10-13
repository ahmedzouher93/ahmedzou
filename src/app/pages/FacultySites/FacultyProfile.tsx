import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router';
import {
  ChevronLeft, Mail, Phone, MapPin, Building2, GraduationCap, BookOpen, FlaskConical, FileText,
  UserRound, Briefcase, ExternalLink, Globe, ArrowRight, Award, Clock,
} from 'lucide-react';
import { WireframeHeader } from '../../components/WireframeHeader';
import { WireframeFooter } from '../../components/WireframeFooter';
import { FACULTY_SITES, findMember, FacultySite } from './FacultySitesData';

function initials(name: string) {
  const parts = name.replace(/^(أ\.د\.|أ\.د|د\.|الدكتور|الدكتورة|م\.)\s*/, '').trim().split(/\s+/);
  return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
}

// Academic title shown before the name, based on rank
function titled(f: FacultySite) {
  if (!f.rank) return f.name;
  if (f.rank === 'أستاذ') return 'أ.د. ' + f.name;
  if (/^أستاذ (مشارك|مساعد)/.test(f.rank)) return 'د. ' + f.name;
  return f.name;
}

function Section({ id, icon: I, title, children }: { id: string; icon: any; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <h2 className="flex items-center gap-3 text-[19px] font-bold text-[#0f3057] mb-6">
        <span className="w-10 h-10 rounded-xl bg-[#0f3057] flex items-center justify-center"><I size={18} className="text-[#c9a227]" /></span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function InfoRow({ icon: I, label, children }: { icon: any; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <I size={16} className="text-[#c9a227] mt-1 shrink-0" />
      <div className="min-w-0">
        <div className="text-[12px] text-gray-500">{label}</div>
        <div className="text-[14px] font-bold text-[#0f3057] mt-0.5 break-words">{children}</div>
      </div>
    </div>
  );
}

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

  const sections = [
    { id: 'bio', title: 'نبذة تعريفية', icon: UserRound, show: !!f.bio?.length },
    { id: 'education', title: 'المؤهلات العلمية', icon: GraduationCap, show: !!f.education?.length },
    { id: 'positions', title: 'المناصب والخبرات', icon: Briefcase, show: !!f.positions?.length },
    { id: 'research', title: 'الاهتمامات البحثية', icon: FlaskConical, show: !!f.research?.length },
    { id: 'publications', title: 'الأبحاث والمنشورات', icon: FileText, show: !!f.publications?.length },
    { id: 'courses', title: 'المساقات التدريسية', icon: BookOpen, show: !!f.courses?.length },
  ].filter(s => s.show);
  const hasDetails = sections.some(s => s.id !== 'education') || (f.education?.length || 0) > 1;
  const colleagues = FACULTY_SITES.filter(m => m.college === f.college && m.slug !== f.slug).slice(0, 4);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] bg-[#f7f8fa]">
      <WireframeHeader />

      {/* Hero */}
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
            <div className="relative shrink-0 self-start md:self-auto">
              <div className="w-[132px] h-[132px] md:w-[156px] md:h-[156px] rounded-[28px] p-[3px] bg-gradient-to-br from-[#c9a227] to-[#c9a227]/20 shadow-2xl">
                {f.photo
                  ? <img src={f.photo} alt={f.name} className="w-full h-full rounded-[25px] object-cover bg-[#0f3057]" />
                  : <div className="w-full h-full rounded-[25px] bg-gradient-to-br from-[#0f3057] to-[#1d4e89] flex items-center justify-center text-[44px] md:text-[52px] font-bold text-[#c9a227]">{initials(f.name)}</div>}
              </div>
              {f.rank && (
                <span className="absolute -bottom-3 right-1/2 translate-x-1/2 whitespace-nowrap inline-flex items-center gap-1.5 rounded-full bg-[#c9a227] text-[#0f3057] px-3.5 py-1 text-[12px] font-bold shadow-lg">
                  <Award size={13} /> {f.rank}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#c9a227]/40 bg-[#c9a227]/10 px-4 py-1.5 text-[12.5px] font-bold text-[#c9a227] mb-4">
                <GraduationCap size={15} /> عضو هيئة تدريس
              </span>
              <h1 className="text-[30px] md:text-[44px] font-bold leading-tight">{titled(f)}</h1>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] text-white/75">
                {f.department && <span className="flex items-center gap-2"><BookOpen size={16} className="text-[#c9a227]" />{f.department}</span>}
                {f.college && <span className="flex items-center gap-2"><Building2 size={16} className="text-[#c9a227]" />{f.college}</span>}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {f.email && (
                  <a href={'mailto:' + f.email} className="inline-flex items-center gap-2 rounded-xl bg-[#c9a227] text-[#0f3057] px-5 py-3 text-[13.5px] font-bold hover:bg-white transition-colors">
                    <Mail size={16} /> مراسلة عبر البريد
                  </a>
                )}
                {f.site && (
                  <a href={f.site} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-[13.5px] font-bold text-white hover:bg-white/10 transition-colors">
                    <Globe size={16} /> الموقع الشخصي <ExternalLink size={13} className="opacity-70" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-10 -mt-14 pb-16 flex-1">
        <div className="grid lg:grid-cols-[320px_1fr] gap-6 items-start">
          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6">
              <h3 className="text-[15px] font-bold text-[#0f3057] mb-2 pb-3 border-b-2 border-[#c9a227] inline-block">معلومات التواصل</h3>
              <div className="mt-2">
                {f.email && <InfoRow icon={Mail} label="البريد الإلكتروني"><a href={'mailto:' + f.email} dir="ltr" className="hover:text-[#c9a227] font-medium text-[13.5px]">{f.email}</a></InfoRow>}
                {f.phone && <InfoRow icon={Phone} label="الهاتف"><span dir="ltr">{f.phone}</span></InfoRow>}
                {f.office && <InfoRow icon={MapPin} label="المكتب">{f.office}</InfoRow>}
                {f.department && <InfoRow icon={BookOpen} label="القسم">{f.department}</InfoRow>}
                {f.college && <InfoRow icon={Building2} label="الكلية">{f.college}</InfoRow>}
                <InfoRow icon={MapPin} label="الجامعة">جامعة مؤتة — الكرك، الأردن</InfoRow>
              </div>
            </div>
            {sections.length > 1 && (
              <nav className="hidden lg:block bg-white rounded-2xl border border-gray-100 shadow-sm p-3">
                {sections.map(s => (
                  <button key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full text-right flex items-center gap-3 rounded-xl px-4 py-3 text-[13.5px] font-bold text-gray-600 hover:bg-[#f8f6ee] hover:text-[#0f3057] transition-colors">
                    <s.icon size={16} className="text-[#c9a227]" /> {s.title}
                  </button>
                ))}
              </nav>
            )}
          </aside>

          {/* Content */}
          <div className="space-y-6 min-w-0">
            {f.bio?.length ? (
              <Section id="bio" icon={UserRound} title="نبذة تعريفية">
                <div className="space-y-4 text-[15px] leading-[2] text-gray-700">{f.bio.map((p, i) => <p key={i}>{p}</p>)}</div>
              </Section>
            ) : null}

            {f.education?.length ? (
              <Section id="education" icon={GraduationCap} title="المؤهلات العلمية">
                <ol className="relative border-r-2 border-[#c9a227]/30 pr-6 space-y-6">
                  {f.education.map((e, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -right-[33px] top-1 w-4 h-4 rounded-full bg-[#c9a227] ring-4 ring-[#c9a227]/20" />
                      <div className="flex flex-wrap items-baseline gap-x-3">
                        <h3 className="text-[16px] font-bold text-[#0f3057]">{e.degree}{e.field && <span className="font-medium"> — {e.field}</span>}</h3>
                        {e.year && <span className="text-[12.5px] font-bold text-[#c9a227]">{e.year}</span>}
                      </div>
                      {(e.university || e.country) && <p className="text-[14px] text-gray-600 mt-1">{[e.university, e.country].filter(Boolean).join('، ')}</p>}
                    </li>
                  ))}
                </ol>
              </Section>
            ) : null}

            {f.positions?.length ? (
              <Section id="positions" icon={Briefcase} title="المناصب والخبرات">
                <ul className="space-y-3">
                  {f.positions.map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14.5px] text-gray-700 leading-relaxed">
                      <span className="mt-2.5 w-2 h-2 rounded-full bg-[#c9a227] shrink-0" />{p}
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            {f.research?.length ? (
              <Section id="research" icon={FlaskConical} title="الاهتمامات البحثية">
                <div className="flex flex-wrap gap-2.5">
                  {f.research.map((r, i) => (
                    <span key={i} className="rounded-xl bg-[#f3f4f6] border border-gray-100 px-4 py-2 text-[13.5px] font-bold text-[#0f3057]">{r}</span>
                  ))}
                </div>
              </Section>
            ) : null}

            {f.publications?.length ? (
              <Section id="publications" icon={FileText} title="الأبحاث والمنشورات">
                <ol className="divide-y divide-gray-100">
                  {f.publications.map((p, i) => (
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
            ) : null}

            {f.courses?.length ? (
              <Section id="courses" icon={BookOpen} title="المساقات التدريسية">
                <div className="grid sm:grid-cols-2 gap-3">
                  {f.courses.map((c, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-[#fafbfc] px-4 py-3.5">
                      <BookOpen size={16} className="text-[#c9a227] shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[14px] font-bold text-[#0f3057]">{c.title}</div>
                        {(c.code || c.level) && <div className="text-[12px] text-gray-500 mt-0.5">{[c.code, c.level].filter(Boolean).join(' · ')}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            ) : null}

            {!hasDetails && (
              <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 md:p-10 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#c9a227]/10 flex items-center justify-center mb-4"><Clock size={24} className="text-[#c9a227]" /></div>
                <h2 className="text-[18px] font-bold text-[#0f3057]">يجري تحديث محتوى الصفحة</h2>
                <p className="text-[14px] text-gray-500 mt-2 max-w-[460px] mx-auto leading-relaxed">ستتوفر هنا قريباً السيرة الذاتية والأبحاث والمساقات التدريسية لعضو هيئة التدريس.</p>
                {f.site && (
                  <a href={f.site} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 rounded-xl border border-[#0f3057]/15 px-5 py-2.5 text-[13.5px] font-bold text-[#0f3057] hover:bg-[#0f3057] hover:text-white transition-colors">
                    <Globe size={15} /> زيارة الموقع الشخصي <ExternalLink size={13} className="opacity-60" />
                  </a>
                )}
              </div>
            )}

            {colleagues.length > 0 && (
              <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[17px] font-bold text-[#0f3057]">أعضاء آخرون من {f.college}</h2>
                  <Link to="/faculty-sites" className="text-[13px] font-bold text-[#c9a227] hover:underline flex items-center gap-1">عرض الكل <ChevronLeft size={15} /></Link>
                </div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {colleagues.map(m => (
                    <Link key={m.slug} to={'/faculty-sites/' + m.slug} className="group flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-4 hover:border-[#c9a227] hover:shadow-md transition-all">
                      <span className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-[#0f3057] to-[#1d4e89] text-[#c9a227] flex items-center justify-center text-[14px] font-bold">{initials(m.name)}</span>
                      <span className="min-w-0">
                        <span className="block text-[14px] font-bold text-[#0f3057] group-hover:text-[#c9a227] truncate">{m.name}</span>
                        <span className="block text-[12px] text-gray-500 truncate">{m.department || m.college}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <WireframeFooter />
    </div>
  );
}
