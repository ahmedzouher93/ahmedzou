import React from 'react';
import { useLocation, Link } from 'react-router';
import { Target, FileText, Download, Users, Award, BookOpen, Phone, Mail, MapPin, Info, Layers, Newspaper, Link2 } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import FACULTIES from './FacultyData';
import { facultySlug, ABOUT_LABELS, EXTRA_LABELS, PROGRAM_LABELS } from './FacultyNav';
import { NewsCard, NewsGrid } from '@/app/components/NewsCard';

function useCfg() {
  const location = useLocation();
  const slug = facultySlug(location.pathname);
  return { slug, cfg: FACULTIES[slug] };
}

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-1 h-8 rounded-full bg-[#c9a227] block flex-shrink-0" />
      <div className="w-9 h-9 rounded-lg bg-[#0f3057] flex items-center justify-center flex-shrink-0">
        <Icon size={18} className="text-[#c9a227]" />
      </div>
      <h2 className="text-xl font-bold text-[#0f3057]">{title}</h2>
    </div>
  );
}

function Wrap({ children }: { children: React.ReactNode }) {
  return <div className="w-full animate-in fade-in duration-500" dir="rtl">{children}</div>;
}

function FileRow({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-3.5 hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
      <div className="w-9 h-9 rounded-lg bg-[#0f3057]/8 flex items-center justify-center flex-shrink-0">
        <FileText size={16} className="text-[#0f3057]" />
      </div>
      <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-snug">{name}</p>
      <Download size={15} className="text-[#c9a227] flex-shrink-0" />
    </div>
  );
}

function PersonList({ people }: { people: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {people.map((p: any, i: number) => (
        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-[#0f3057] flex items-center justify-center flex-shrink-0">
            <Users size={18} className="text-[#c9a227]" />
          </div>
          <div>
            <p className="text-[15px] font-bold text-[#0f3057] leading-relaxed">{p.name}</p>
            {p.role && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{p.role}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyNote({ label }: { label: string }) {
  if (!label) return null;
  return (
    <div className="flex items-start gap-3 bg-[#F8FAFC] border border-dashed border-gray-200 rounded-xl px-5 py-6">
      <Info size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-gray-500 leading-relaxed">{label}</p>
    </div>
  );
}

export function FacultyAboutIndex() {
  const { slug, cfg } = useCfg();
  return (
    <Wrap>
      <SectionTitle icon={BookOpen} title={cfg.name + ' في سطور'} />
      <p className="text-[#c9a227] font-bold mb-6">{cfg.tagline}</p>
      {cfg.aboutText ? (
        <div className="flex flex-col gap-4 mb-8">
          {cfg.aboutText.map((p: string, i: number) => (
            <p key={i} className="text-gray-700 leading-[2.1] text-justify text-[16px]">{p}</p>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 leading-[2.1] text-justify text-[16px] mb-8">{cfg.intro}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(cfg.about || []).map((k: string) => (
          <Link key={k} to={'/faculty/' + slug + '/about/' + k} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-3.5 hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
            <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
            <p className="text-sm font-semibold text-[#0f3057]">{k === 'vision' && cfg.visionLabel ? cfg.visionLabel : ABOUT_LABELS[k]}</p>
          </Link>
        ))}
      </div>
      {cfg.contactTable && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-[#0f3057]">
                {cfg.contactTable.columns.map((c: string, i: number) => (
                  <th key={i} className="px-5 py-3.5 text-[13.5px] font-bold text-white">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cfg.contactTable.rows.map((r: string[], i: number) => (
                <tr key={i} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                  {r.map((c: string, j: number) => (
                    <td key={j} className="px-5 py-3.5 text-[14px] text-[#0f3057] border-t border-gray-100" dir={j ? 'ltr' : undefined}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {cfg.contactExtra && (
        <div className="mt-6 flex flex-col gap-3">
          {cfg.contactExtra.map((l: string, i: number) => (
            <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-3.5 bg-white">
              <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
              <p className="text-[14.5px] font-semibold text-[#0f3057]">{l}</p>
            </div>
          ))}
        </div>
      )}
    </Wrap>
  );
}

export function FacultyDean() {
  const { cfg } = useCfg();
  return (
    <Wrap>
      <SectionTitle icon={Users} title="مكتب العميد" />
      <p className="text-[#c9a227] font-bold mb-6">الكلمة الترحيبية</p>
      <div className="flex flex-col lg:flex-row gap-8 items-start mb-8">
        <div className="w-full lg:w-[38%]">
          <ImageWithFallback src={cfg.dean.photo} alt={cfg.dean.name} className="w-full max-h-[340px] object-cover rounded-2xl border border-gray-100 shadow-sm" />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          {cfg.dean.words.length > 0
            ? cfg.dean.words.map((p: string, i: number) => <p key={i} className="text-gray-700 leading-[2.1] text-justify text-[16px]">{p}</p>)
            : <EmptyNote label="ينشر موقع الكلية الكلمة الترحيبية لمكتب العميد بصورة واسم العميد فقط دون نص تفصيلي." />}
        </div>
      </div>
      <div className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 mb-8">
        <p className="font-bold text-[#0f3057] mb-1">{cfg.dean.name}</p>
        <p className="text-sm text-gray-600">{cfg.dean.title}</p>
      </div>
      {cfg.deanOffice && (
        <section>
          <h3 className="text-[18px] font-bold text-[#0f3057] mb-5">أعضاء مكتب العميد</h3>
          <PersonList people={cfg.deanOffice} />
        </section>
      )}
    </Wrap>
  );
}

export function FacultyVision() {
  const { cfg } = useCfg();
  return (
    <Wrap>
      <SectionTitle icon={Target} title={cfg.visionLabel || ABOUT_LABELS.vision} />
      {cfg.visionNote ? (
        <>
          <EmptyNote label={cfg.visionNote} />
          {cfg.visionImages && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
              {cfg.visionImages.map((src: string, i: number) => (
                <ImageWithFallback key={i} src={src} alt={'الرؤية والرسالة ' + (i + 1)} className="w-full max-h-[420px] object-contain rounded-2xl border border-gray-100 bg-white" />
              ))}
            </div>
          )}
        </>
      ) : cfg.visionData ? (
        <div className="flex flex-col gap-8">
          <div className="bg-gradient-to-l from-[#0f3057] to-[#16457a] rounded-3xl p-8">
            <p className="text-[#c9a227] text-xs font-bold tracking-widest mb-3">الرؤية</p>
            <p className="text-white text-[17px] leading-[2] text-justify">{cfg.visionData.vision}</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <p className="text-[#c9a227] text-xs font-bold tracking-widest mb-3">الرسالة</p>
            <p className="text-gray-700 text-[16.5px] leading-[2.1] text-justify">{cfg.visionData.mission}</p>
          </div>
          <div>
            <h3 className="text-[19px] font-bold text-[#0f3057] mb-5">{cfg.visionData.goalsLabel || 'الأهداف'}</h3>
            <div className="flex flex-col gap-3">
              {cfg.visionData.goals.map((g: string, i: number) => (
                <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm">
                  <span className="w-8 h-8 rounded-lg bg-[#0f3057] text-[#c9a227] flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</span>
                  <p className="text-[15.5px] text-gray-700 leading-[2]">{g}</p>
                </div>
              ))}
            </div>
          </div>
          {cfg.goalsExtra && (
            <div>
              <h3 className="text-[19px] font-bold text-[#0f3057] mb-5">{cfg.goalsExtra.title}</h3>
              <div className="flex flex-col gap-3">
                {cfg.goalsExtra.items.map((g: string, i: number) => (
                  <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm">
                    <span className="w-8 h-8 rounded-lg bg-[#0f3057] text-[#c9a227] flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</span>
                    <p className="text-[15.5px] text-gray-700 leading-[2]">{g}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: cfg.visionData.values.length ? undefined : 'none' }}>
            <h3 className="text-[19px] font-bold text-[#0f3057] mb-5">القيم الجوهرية</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cfg.visionData.values.map((v: string, i: number) => (
                <div key={i} className="border border-gray-200 rounded-2xl px-6 py-6 bg-white flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
                  <p className="text-[15px] font-bold text-[#0f3057] leading-relaxed">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-l from-[#0f3057] to-[#16457a] rounded-2xl p-8 mb-8">
            <p className="text-[#c9a227] text-xs font-bold uppercase tracking-widest mb-3">شعار الكلية</p>
            <h3 className="text-white text-2xl font-bold leading-snug">{cfg.tagline}</h3>
          </div>
          <EmptyNote label="لا توجد عناصر منشورة في هذه الصفحة على موقع الكلية حالياً." />
        </>
      )}
    </Wrap>
  );
}

export function FacultyStrategy() {
  const { cfg } = useCfg();
  const files = cfg.links.filter((l: string) => /استراتيج|استيراتيج/.test(l));
  return (
    <Wrap>
      <SectionTitle icon={Target} title="الخطة الاستيراتيجية" />
      {cfg.strategyNote && cfg.strategyFiles ? (
        <div className="flex flex-col gap-5">
          <p className="text-gray-700 text-[16px] leading-[2]">{cfg.strategyNote}</p>
          {cfg.strategyFiles.map((f: string, i: number) => <FileRow key={i} name={f} />)}
        </div>
      ) : cfg.strategyData ? (
        <div className="flex flex-col gap-6">
          <p className="text-gray-700 text-[16.5px] leading-[2.1] text-justify">{cfg.strategyData.intro}</p>
          {cfg.strategyFiles && (
            <div className="flex flex-col gap-3">
              {cfg.strategyFiles.map((f: string, i: number) => <FileRow key={i} name={f} />)}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cfg.strategyData.items.map((it: string, i: number) => (
              <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 bg-white">
                <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
                <p className="text-[15px] font-semibold text-[#0f3057] leading-relaxed">{it}</p>
              </div>
            ))}
          </div>
        </div>
      ) : cfg.strategyFiles ? (
        <div className="flex flex-col gap-3">
          {cfg.strategyFiles.map((l: string, i: number) => <FileRow key={i} name={l} />)}
        </div>
      ) : cfg.strategyNote ? (
        <EmptyNote label={cfg.strategyNote} />
      ) : files.length > 0 ? (
        <div className="flex flex-col gap-3">
          {files.map((l: string, i: number) => <FileRow key={i} name={l} />)}
        </div>
      ) : (
        <EmptyNote label="لا توجد عناصر منشورة في هذه الصفحة على موقع الكلية حالياً." />
      )}
    </Wrap>
  );
}

export function FacultyStructure() {
  const { cfg } = useCfg();
  return (
    <Wrap>
      <SectionTitle icon={Layers} title="الهيكل التنظيمي" />
      {cfg.structureImage ? (
        <figure className="m-0 rounded-2xl overflow-hidden border border-gray-100 bg-white p-4">
          <ImageWithFallback src={cfg.structureImage} alt="الهيكل التنظيمي" className="w-full max-h-[620px] object-contain" />
          {cfg.structureNote && <figcaption className="text-gray-600 text-[15px] leading-[2] mt-4 px-2">{cfg.structureNote}</figcaption>}
        </figure>
      ) : (
        <EmptyNote label={cfg.structureNote || "لا توجد عناصر منشورة في هذه الصفحة على موقع الكلية حالياً."} />
      )}
    </Wrap>
  );
}

function ListPage({ icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <Wrap>
      <SectionTitle icon={icon} title={title} />
      <EmptyNote label="لا توجد عناصر منشورة في هذه الصفحة على موقع الكلية حالياً." />
    </Wrap>
  );
}

export function FacultyCouncil() {
  const { cfg } = useCfg();
  if (!cfg.council) {
    if (cfg.councilNote) return (<Wrap><SectionTitle icon={Users} title="مجلس الكلية" /><EmptyNote label={cfg.councilNote} /></Wrap>);
    return <ListPage icon={Users} title="مجلس الكلية" />;
  }
  return (
    <Wrap>
      <SectionTitle icon={Users} title="مجلس الكلية" />
      {cfg.councilNote && <p className="text-gray-600 text-[15.5px] leading-[2] mb-6">{cfg.councilNote}</p>}
      <PersonList people={cfg.council} />
    </Wrap>
  );
}

export function FacultyCommittees() {
  const { cfg } = useCfg();
  if (cfg.committeeTables) {
    return (
      <Wrap>
        <SectionTitle icon={Users} title="لجان الكلية" />
        {cfg.committeeIntro && <p className="text-[#c9a227] font-bold mb-6">{cfg.committeeIntro}</p>}
        {cfg.committeeTables.every((c: any) => !(c.rows || []).length) ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cfg.committeeTables.map((c: any, i: number) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl px-5 py-5 shadow-sm flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
                <p className="text-[15px] font-bold text-[#0f3057] leading-relaxed">{c.name}</p>
              </div>
            ))}
          </div>
        ) : cfg.committeeTables.map((c: any, ci: number) => (
          <section key={ci} className="mb-9">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1.5 h-6 rounded-full bg-[#c9a227] block" />
              <h3 className="text-[17px] font-bold text-[#0f3057]">{c.name}</h3>
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-100">
              <table className="w-full text-right border-collapse">
                <tbody>
                  {(c.rows || []).map((r: string[], i: number) => (
                    <tr key={i} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 text-[13px] font-bold text-gray-400 border-t border-gray-100 w-10">{i + 1}</td>
                      <td className="px-4 py-3 text-[14.5px] font-semibold text-[#0f3057] border-t border-gray-100">{r[0]}</td>
                      <td className="px-4 py-3 text-[13px] text-[#c9a227] font-bold border-t border-gray-100 w-24">{r[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </Wrap>
    );
  }
  if (cfg.committeesData) {
    return (
      <Wrap>
        <SectionTitle icon={Users} title="لجان الكلية" />
        <div className="flex flex-col gap-4">
          {cfg.committeesData.map((c: any, i: number) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm">
              <p className="text-[16px] font-bold text-[#0f3057] mb-1 leading-relaxed">{c.name}</p>
              {c.note && <p className="text-sm text-gray-600 leading-[1.95]">{c.note}</p>}
            </div>
          ))}
        </div>
      </Wrap>
    );
  }
  if (!cfg.committeesNote) return <ListPage icon={Users} title="لجان الكلية" />;
  return (
    <Wrap>
      <SectionTitle icon={Users} title={cfg.committeesTitle || 'لجان الكلية'} />
      <EmptyNote label={cfg.committeesNote} />
      {cfg.committeeImages && (
        <div className="flex flex-col gap-5 mt-6">
          {cfg.committeeImages.map((src: string, i: number) => (
            <ImageWithFallback key={i} src={src} alt={'لجان الكلية — صفحة ' + (i + 1)} className="w-full max-h-[900px] object-contain rounded-2xl border border-gray-100 bg-white" />
          ))}
        </div>
      )}
    </Wrap>
  );
}
export function FacultyFormerDeans() {
  const { cfg } = useCfg();
  if (!cfg.formerDeans) {
    if (cfg.formerDeansNote) return (<Wrap><SectionTitle icon={Award} title="العمداء السابقون" /><EmptyNote label={cfg.formerDeansNote} /></Wrap>);
    return <ListPage icon={Award} title="العمداء السابقون" />;
  }
  return (
    <Wrap>
      <SectionTitle icon={Award} title={cfg.formerDeansTitle || 'العمداء السابقون'} />
      <div className="flex flex-col gap-3">
        {cfg.formerDeans.map((d: any, i: number) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm">
            <p className="text-[15.5px] font-bold text-[#0f3057] flex-1 leading-relaxed">{d.name}</p>
            <span className="text-[13px] font-bold text-[#c9a227] flex-shrink-0" dir="ltr">{d.role}</span>
          </div>
        ))}
      </div>
    </Wrap>
  );
}

export function FacultyStaff() {
  const { cfg } = useCfg();
  if (cfg.adminStaffGroups) {
    return (
      <Wrap>
        <SectionTitle icon={Users} title="الموظفون الاداريون" />
        {cfg.adminStaffGroups.map((g: any, gi: number) => (
          <section key={gi} className="mb-9">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1.5 h-6 rounded-full bg-[#c9a227] block" />
              <h3 className="text-[17px] font-bold text-[#0f3057]">{g.group}</h3>
              <span className="text-xs font-bold text-gray-400">{(g.people || []).length}</span>
            </div>
            <PersonList people={g.people || []} />
          </section>
        ))}
      </Wrap>
    );
  }
  if (!cfg.adminStaff) {
    if (cfg.adminStaffNote) return (<Wrap><SectionTitle icon={Users} title="الموظفون الاداريون" /><EmptyNote label={cfg.adminStaffNote} /></Wrap>);
    return <ListPage icon={Users} title="الموظفون الاداريون" />;
  }
  return (
    <Wrap>
      <SectionTitle icon={Users} title="الموظفون الاداريون" />
      <PersonList people={cfg.adminStaff} />
    </Wrap>
  );
}
export function FacultyFormerFaculty() { return <ListPage icon={Users} title="أعضاء هيئة التدريس السابقين" />; }
export function FacultyConferences() {
  const { slug, cfg } = useCfg();
  return (
    <Wrap>
      <SectionTitle icon={Newspaper} title="المؤتمرات" />
      {cfg.conferencesList ? (
        <div className="flex flex-col gap-3">
          {cfg.conferencesList.map((c: any, i: number) => (
            <Link key={i} to={'/f-item/' + slug + '/conferences/' + i} className="bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 hover:border-[#c9a227] hover:shadow-md transition-all">
              <p className="text-[15px] font-semibold text-[#0f3057] leading-[1.9] flex-1">{c.title}</p>
              <span className="text-xs font-bold text-[#c9a227] flex-shrink-0" dir="ltr">{c.date}</span>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyNote label={cfg.conferencesNote || 'لا توجد عناصر منشورة في هذه الصفحة على موقع الكلية حالياً.'} />
      )}
    </Wrap>
  );
}
export function FacultyForms() {
  const { cfg } = useCfg();
  if (cfg.formsNote) {
    return (
      <Wrap>
        <SectionTitle icon={FileText} title="النماذج" />
        <EmptyNote label={cfg.formsNote} />
      </Wrap>
    );
  }
  if (!cfg.formsData) return <ListPage icon={FileText} title="النماذج" />;
  return (
    <Wrap>
      <SectionTitle icon={FileText} title="النماذج" />
      <div className="flex flex-col gap-3">
        {cfg.formsData.map((f: any, i: number) => (
          <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 bg-white hover:border-[#c9a227] transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#0f3057]/8 flex items-center justify-center flex-shrink-0">
              <FileText size={16} className="text-[#0f3057]" />
            </div>
            <p className="text-[14.5px] font-semibold text-[#0f3057] flex-1 leading-relaxed">{f.name}</p>
            {f.audience && <span className="text-[11px] font-bold text-gray-400 flex-shrink-0">{f.audience}</span>}
            <Download size={15} className="text-[#c9a227] flex-shrink-0" />
          </div>
        ))}
      </div>
      {cfg.contactTable && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-[#0f3057]">
                {cfg.contactTable.columns.map((c: string, i: number) => (
                  <th key={i} className="px-5 py-3.5 text-[13.5px] font-bold text-white">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cfg.contactTable.rows.map((r: string[], i: number) => (
                <tr key={i} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                  {r.map((c: string, j: number) => (
                    <td key={j} className="px-5 py-3.5 text-[14px] text-[#0f3057] border-t border-gray-100" dir={j ? 'ltr' : undefined}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {cfg.contactExtra && (
        <div className="mt-6 flex flex-col gap-3">
          {cfg.contactExtra.map((l: string, i: number) => (
            <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-3.5 bg-white">
              <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
              <p className="text-[14.5px] font-semibold text-[#0f3057]">{l}</p>
            </div>
          ))}
        </div>
      )}
    </Wrap>
  );
}
export function FacultyDocuments() {
  const { cfg } = useCfg();
  const groups = cfg.plansData || (cfg.documentsList ? [{ group: '', items: cfg.documentsList }] : null);
  if (!groups) return <ListPage icon={FileText} title="الوثائق" />;
  return (
    <Wrap>
      <SectionTitle icon={FileText} title="الوثائق" />
      {cfg.documentsIntro && <p className="text-gray-600 text-[15.5px] leading-[2] mb-6">{cfg.documentsIntro}</p>}
      {cfg.documentsIntro && <p className="text-gray-600 text-[15.5px] leading-[2] mb-6">{cfg.documentsIntro}</p>}
      <div className="flex flex-col gap-9">
        {groups.map((g: any, gi: number) => (
          <section key={gi}>
            {g.group && (
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1.5 h-6 rounded-full bg-[#c9a227] block" />
                <h3 className="text-[17px] font-bold text-[#0f3057]">{g.group}</h3>
                <span className="text-xs font-bold text-gray-400">{g.items.length}</span>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {g.items.map((d: string, i: number) => <FileRow key={i} name={d} />)}
            </div>
          </section>
        ))}
      </div>
    </Wrap>
  );
}

export function FacultyAchievements() {
  const { slug, cfg } = useCfg();
  const title = cfg.achievementsLabel || EXTRA_LABELS.achievements;
  if (cfg.achievementsNote) {
    return (
      <Wrap>
        <SectionTitle icon={Award} title={title} />
        <EmptyNote label={cfg.achievementsNote} />
      </Wrap>
    );
  }
  if (cfg.achievementsList) {
    return (
      <Wrap>
        <SectionTitle icon={Award} title={title} />
        <div className="flex flex-col gap-3">
          {cfg.achievementsList.map((it: any, i: number) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <p className="text-[15px] font-semibold text-[#0f3057] leading-[1.9] flex-1">{it.title}</p>
              {it.date && <span className="text-xs font-bold text-[#c9a227] flex-shrink-0" dir="ltr">{it.date}</span>}
            </div>
          ))}
        </div>
      </Wrap>
    );
  }
  if (!cfg.achievementsData) return <ListPage icon={Award} title={title} />;
  return (
    <Wrap>
      <SectionTitle icon={Award} title={title} />
      <div className="flex flex-col gap-5">
        {cfg.achievementsData.map((it: any, i: number) => (
          <Link key={i} to={'/f-item/' + slug + '/achievements/' + i} className="block bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:border-[#c9a227] hover:shadow-md transition-all">
            <h3 className={'text-[18px] font-bold text-[#0f3057]' + (it.body.length ? ' mb-4' : '')}>{it.title}</h3>
            {it.body.length > 0 && (
              <div className="flex flex-col gap-3">
                {it.body.map((p: string, j: number) => (
                  <p key={j} className="text-[15.5px] text-gray-700 leading-[2] text-justify">{p}</p>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
      {cfg.contactTable && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-[#0f3057]">
                {cfg.contactTable.columns.map((c: string, i: number) => (
                  <th key={i} className="px-5 py-3.5 text-[13.5px] font-bold text-white">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cfg.contactTable.rows.map((r: string[], i: number) => (
                <tr key={i} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                  {r.map((c: string, j: number) => (
                    <td key={j} className="px-5 py-3.5 text-[14px] text-[#0f3057] border-t border-gray-100" dir={j ? 'ltr' : undefined}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {cfg.contactExtra && (
        <div className="mt-6 flex flex-col gap-3">
          {cfg.contactExtra.map((l: string, i: number) => (
            <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-3.5 bg-white">
              <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
              <p className="text-[14.5px] font-semibold text-[#0f3057]">{l}</p>
            </div>
          ))}
        </div>
      )}
    </Wrap>
  );
}

export function FacultyPrograms() {
  const { cfg } = useCfg();
  return (
    <Wrap>
      <SectionTitle icon={BookOpen} title="البرامج الاكاديمية" />
      {cfg.programTables ? (
        <div className="flex flex-col gap-10">
          {cfg.programsNote && <p className="text-gray-600 text-[15.5px] leading-[2]">{cfg.programsNote}</p>}
          {cfg.programTables.map((tb: any, ti: number) => (
            <section key={ti}>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1.5 h-6 rounded-full bg-[#c9a227] block" />
                <h3 className="text-[17.5px] font-bold text-[#0f3057]">{tb.group}</h3>
              </div>
              <div className="overflow-hidden rounded-2xl border border-gray-100">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-[#0f3057]">
                      {tb.columns.map((c: string, i: number) => (
                        <th key={i} className="px-5 py-3.5 text-[13.5px] font-bold text-white">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tb.rows.map((r: string[], i: number) => (
                      <tr key={i} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                        {r.map((c: string, j: number) => (
                          <td key={j} className="px-5 py-3.5 text-[14.5px] text-[#0f3057] border-t border-gray-100 leading-relaxed">{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      ) : cfg.programsData ? (
        <div className="flex flex-col gap-10">
          {cfg.programsData.map((g: any, gi: number) => (
            <section key={gi}>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-1.5 h-6 rounded-full bg-[#c9a227] block" />
                <h3 className="text-[17.5px] font-bold text-[#0f3057]">{g.group}</h3>
              </div>
              {g.items.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {g.items.map((it: any, i: number) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                      <p className="text-[16px] font-bold text-[#0f3057] mb-2 leading-relaxed">{it.name}</p>
                      {it.dept && <p className="text-xs font-bold text-[#c9a227] mb-3">{it.dept}</p>}
                      {it.note && <p className="text-sm text-gray-600 leading-[1.95]">{it.note}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyNote label={g.empty || 'لا توجد برامج مدرجة حالياً.'} />
              )}
            </section>
          ))}
        </div>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cfg.programs.map((p: string) => (
          <div key={p} className="border border-gray-200 rounded-2xl px-6 py-8 text-center">
            <p className="text-lg font-bold text-[#0f3057]">{PROGRAM_LABELS[p]}</p>
          </div>
        ))}
      </div>
      )}
    </Wrap>
  );
}

function ProgramPage({ kind }: { kind: string }) {
  const { cfg } = useCfg();
  const items = cfg.programData && cfg.programData[kind];
  return (
    <Wrap>
      <SectionTitle icon={BookOpen} title={PROGRAM_LABELS[kind]} />
      <p className="text-[#c9a227] font-bold mb-6">{cfg.name}</p>
      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((it: any, i: number) => (
            <div key={i} className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm">
              <p className="text-[17px] font-bold text-[#0f3057] mb-2 leading-relaxed">{it.name}</p>
              {it.dept && <p className="text-xs font-bold text-[#c9a227] mb-4">{it.dept}</p>}
              {it.note && <p className="text-[15px] text-gray-600 leading-[2]">{it.note}</p>}
            </div>
          ))}
        </div>
      ) : (
        <EmptyNote label="لا توجد برامج مدرجة حالياً." />
      )}
    </Wrap>
  );
}

export function FacultyBachelor() { return <ProgramPage kind="bachelor" />; }
export function FacultyGraduate() { return <ProgramPage kind="graduate" />; }
export function FacultyOther() { return <ProgramPage kind="other" />; }

export function FacultyLinks() {
  const { cfg } = useCfg();
  return (
    <Wrap>
      <SectionTitle icon={Link2} title="روابط هامة" />
      <div className="flex flex-col gap-3">
        {cfg.links.map((l: string, i: number) => <FileRow key={i} name={l} />)}
      </div>
      {cfg.contactTable && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-[#0f3057]">
                {cfg.contactTable.columns.map((c: string, i: number) => (
                  <th key={i} className="px-5 py-3.5 text-[13.5px] font-bold text-white">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cfg.contactTable.rows.map((r: string[], i: number) => (
                <tr key={i} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                  {r.map((c: string, j: number) => (
                    <td key={j} className="px-5 py-3.5 text-[14px] text-[#0f3057] border-t border-gray-100" dir={j ? 'ltr' : undefined}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {cfg.contactExtra && (
        <div className="mt-6 flex flex-col gap-3">
          {cfg.contactExtra.map((l: string, i: number) => (
            <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-3.5 bg-white">
              <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
              <p className="text-[14.5px] font-semibold text-[#0f3057]">{l}</p>
            </div>
          ))}
        </div>
      )}
    </Wrap>
  );
}

export function FacultyContact() {
  const { cfg } = useCfg();
  return (
    <Wrap>
      <SectionTitle icon={Phone} title="إتصل بنا" />
      <p className="text-[#c9a227] font-bold mb-6">{cfg.name} — جامعة مؤتة</p>
      {cfg.contactNote && <p className="text-gray-600 text-[15.5px] leading-[2] mb-6">{cfg.contactNote}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-gray-200 rounded-2xl px-6 py-6 flex items-start gap-3">
          <Phone size={18} className="text-[#c9a227] mt-1 flex-shrink-0" />
          <div>
            <p className="text-xs font-bold text-gray-400 mb-1">هاتف</p>
            <p className="text-sm font-bold text-[#0f3057]" dir="ltr">{(cfg.contact && cfg.contact.phone) || '+962-03-2372380'}</p>
          </div>
        </div>
        <div className="border border-gray-200 rounded-2xl px-6 py-6 flex items-start gap-3">
          <Mail size={18} className="text-[#c9a227] mt-1 flex-shrink-0" />
          <div>
            <p className="text-xs font-bold text-gray-400 mb-1">البريد الإلكتروني</p>
            <p className="text-sm font-bold text-[#0f3057]" dir="ltr">{(cfg.contact && cfg.contact.email) || 'Unit_admin@mutah.edu.jo'}</p>
          </div>
        </div>
        <div className="border border-gray-200 rounded-2xl px-6 py-6 flex items-start gap-3">
          <MapPin size={18} className="text-[#c9a227] mt-1 flex-shrink-0" />
          <div>
            <p className="text-xs font-bold text-gray-400 mb-1">العنوان</p>
            <p className="text-sm font-bold text-[#0f3057]">{(cfg.contact && cfg.contact.address) || 'جامعة مؤتة — الكرك :: الأردن'}</p>
          </div>
        </div>
      </div>
      {cfg.contactTable && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-[#0f3057]">
                {cfg.contactTable.columns.map((c: string, i: number) => (
                  <th key={i} className="px-5 py-3.5 text-[13.5px] font-bold text-white">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cfg.contactTable.rows.map((r: string[], i: number) => (
                <tr key={i} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                  {r.map((c: string, j: number) => (
                    <td key={j} className="px-5 py-3.5 text-[14px] text-[#0f3057] border-t border-gray-100" dir={j ? 'ltr' : undefined}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {cfg.contactExtra && (
        <div className="mt-6 flex flex-col gap-3">
          {cfg.contactExtra.map((l: string, i: number) => (
            <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-3.5 bg-white">
              <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
              <p className="text-[14.5px] font-semibold text-[#0f3057]">{l}</p>
            </div>
          ))}
        </div>
      )}
    </Wrap>
  );
}

export function FacultyIndicativePlan() { return <ListPage icon={FileText} title="الخطة الإسترشادية" />; }
export function FacultyFacilities() {
  const { cfg } = useCfg();
  if (!cfg.facilitiesList) return <ListPage icon={Layers} title="المرافق" />;
  return (
    <Wrap>
      <SectionTitle icon={Layers} title="المرافق" />
      {cfg.facilitiesIntro && <p className="text-gray-600 text-[15.5px] leading-[2] mb-6">{cfg.facilitiesIntro}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
        {cfg.facilitiesList.map((f: string, i: number) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl px-5 py-5 shadow-sm flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
            <p className="text-[14.5px] font-bold text-[#0f3057] leading-relaxed">{f}</p>
          </div>
        ))}
      </div>
      {cfg.facilitiesNote && <p className="text-gray-600 text-[15.5px] leading-[2]">{cfg.facilitiesNote}</p>}
    </Wrap>
  );
}
export function FacultyLearningOutcomes() {
  const { cfg } = useCfg();
  if (!cfg.learningOutcomesList) return <ListPage icon={Target} title="مخرجات التعلم" />;
  return (
    <Wrap>
      <SectionTitle icon={Target} title="مخرجات التعلم" />
      {cfg.learningOutcomesIntro && <p className="text-gray-600 text-[15.5px] leading-[2] mb-7">{cfg.learningOutcomesIntro}</p>}
      <h3 className="text-[17px] font-bold text-[#0f3057] mb-4">البرامج المشمولة</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {cfg.learningOutcomesList.map((p: string, i: number) => (
          <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 bg-white">
            <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
            <p className="text-[15px] font-semibold text-[#0f3057] leading-relaxed">{p}</p>
          </div>
        ))}
      </div>
      {cfg.learningOutcomesSamples && (
        <>
          <h3 className="text-[17px] font-bold text-[#0f3057] mb-4">نماذج من المقررات</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {cfg.learningOutcomesSamples.map((c: string, i: number) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl px-4 py-3.5 shadow-sm">
                <p className="text-[14px] text-[#0f3057] font-semibold leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </Wrap>
  );
}
export function FacultyDiploma() { return <ProgramPage kind="diploma" />; }

export function FacultyActivities() {
  const { cfg } = useCfg();
  if (!cfg.activitiesList) return <ListPage icon={Newspaper} title="نشاطات الكلية" />;
  return (
    <Wrap>
      <SectionTitle icon={Newspaper} title="نشاطات الكلية" />
      <NewsGrid>
        {cfg.activitiesList.map((n: string, i: number) => <NewsCard key={i} title={n} />)}
      </NewsGrid>
    </Wrap>
  );
}
