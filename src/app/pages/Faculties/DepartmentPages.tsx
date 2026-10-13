import React from 'react';
import { Link, useLocation } from 'react-router';
import { Info, Users, BookOpen, FileText, Download, Layers, Newspaper, GraduationCap, Target, Award, Link2 } from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { departmentOf, DEPT_TABS, PROGRAM_LABELS } from './FacultyNav';

function useDept() {
  const location = useLocation();
  return departmentOf(location.pathname)!;
}

function Wrap({ children }: { children: React.ReactNode }) {
  return <div className="w-full animate-in fade-in duration-500" dir="rtl">{children}</div>;
}

function SectionTitle({ icon: Icon, title, sub }: { icon: React.ElementType; title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <span className="w-1 h-8 rounded-full bg-[#c9a227] block flex-shrink-0" />
        <div className="w-9 h-9 rounded-lg bg-[#0f3057] flex items-center justify-center flex-shrink-0">
          <Icon size={18} className="text-[#c9a227]" />
        </div>
        <h2 className="text-xl font-bold text-[#0f3057]">{title}</h2>
      </div>
      {sub && <p className="text-gray-500 text-[15px] mt-3 pr-12">{sub}</p>}
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

export function DepartmentHome() {
  const { slug, cfg, dept } = useDept();
  const base = '/faculty/' + slug + '/departments/' + dept.id;
  const news = dept.news || [];
  const links = dept.links || cfg.links.slice(0, 6);
  return (
    <Wrap>
      <section className="mb-16">
        <SectionTitle icon={Layers} title={dept.aboutHeading || 'نبذة عن القسم'} sub={dept.facultyLine || cfg.name + ' :: جامعة مؤتة'} />
        <div className="flex flex-col lg:flex-row gap-10 bg-white p-8 rounded-[28px] border border-gray-100 shadow-[0_8px_30px_rgba(15,48,87,0.04)]">
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-[#0f3057] mb-4">{dept.pageTitle || dept.name}</h3>
            <p className="text-[#c9a227] font-bold mb-5">{cfg.tagline}</p>
            {dept.about ? (
              <div className="flex flex-col gap-4 mb-6">
                {dept.about.map((p: string, i: number) => (
                  <p key={i} className="text-gray-600 leading-[2.1] text-justify text-[16px]">{p}</p>
                ))}
              </div>
            ) : dept.aboutNote ? (
              <div className="mb-6"><EmptyNote label={dept.aboutNote} /></div>
            ) : (
              <p className="text-gray-600 leading-[2.1] text-justify text-[16px] mb-6">
                {dept.name} هو أحد الأقسام الأكاديمية في {cfg.name} بجامعة مؤتة، ويشارك في تدريس
                مساقات الكلية والإشراف على مشاريع الطلبة وأبحاثهم ضمن البرامج الأكاديمية المعتمدة.
              </p>
            )}
            {dept.headWords && (
              <div className="flex flex-col gap-3 mb-6">
                {dept.headWords.map((p: string, i: number) => (
                  <p key={i} className="text-gray-600 leading-[2.05] text-justify text-[15.5px]">{p}</p>
                ))}
              </div>
            )}
            {dept.head && (
              <div className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 mb-6">
                <p className="text-xs font-bold text-gray-400 mb-1">{dept.headTitle || 'رئيس القسم'}</p>
                <p className="font-bold text-[#0f3057] text-[16px]">{dept.head}</p>
                {dept.headNote && <p className="text-xs text-gray-500 mt-2 leading-relaxed">{dept.headNote}</p>}
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              <Link to={base + '/programs'} className="bg-[#0f3057] text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-[#16457a] transition-colors">البرامج الدراسية</Link>
              <Link to={base + '/faculty'} className="border border-gray-200 text-[#0f3057] text-sm font-bold px-6 py-3 rounded-xl hover:border-[#c9a227] transition-colors">الهيئة التدريسية</Link>
            </div>
          </div>
          <div className="w-full lg:w-[42%] aspect-[4/3] bg-gray-100 rounded-[20px] overflow-hidden">
            <ImageWithFallback src={dept.hero || cfg.hero} alt={dept.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {dept.extraSections && dept.extraSections.map((sec: any, si: number) => (
        <section key={si} className="mb-16">
          <SectionTitle icon={GraduationCap} title={sec.title} sub={dept.pageTitle || dept.name} />
          <div className="flex flex-col gap-3">
            {sec.items.map((it: string, i: number) => (
              <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm">
                <span className="w-8 h-8 rounded-lg bg-[#0f3057] text-[#c9a227] flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</span>
                <p className="text-[15.5px] text-gray-700 leading-[2]">{it}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      {dept.labs && (
        <section className="mb-16">
          <SectionTitle icon={Layers} title="المختبرات" sub={dept.pageTitle || dept.name} />
          {dept.labsNote && <p className="text-gray-600 text-[15.5px] leading-[2] mb-5">{dept.labsNote}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dept.labs.map((l: string, i: number) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl px-5 py-5 shadow-sm flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
                <p className="text-[14.5px] font-bold text-[#0f3057] leading-relaxed">{l}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {dept.specialties && (
        <section className="mb-16">
          <SectionTitle icon={GraduationCap} title="التخصصات الفرعية" sub={dept.pageTitle || dept.name} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {dept.specialties.map((s: string, i: number) => (
              <div key={i} className="border border-gray-200 rounded-2xl px-6 py-7 text-center bg-white">
                <p className="text-lg font-bold text-[#0f3057]">{s}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-16">
        <SectionTitle icon={Link2} title="جديد الكلية" sub={'روابط ووثائق ' + cfg.name} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((l: string, i: number) => (
            <Link key={i} to={'/faculty/' + slug + '/links'} className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 hover:border-[#c9a227] hover:shadow-md transition-all group">
              <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
              <span className="font-bold text-[#0f3057] text-sm group-hover:text-[#c9a227] leading-relaxed">{l}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <SectionTitle icon={Newspaper} title="أخبار وإعلانات القسم" sub={dept.name} />
        {news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {news.map((n: any, i: number) => (
              <Link key={i} to={'/d-item/' + slug + '/' + dept.id + '/news/' + i} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:border-[#c9a227] hover:shadow-md transition-all group">
                <span className="text-xs font-bold text-[#c9a227] mb-3 block" dir="ltr">{n.date}</span>
                <h3 className="text-[16px] font-bold text-[#0f3057] leading-relaxed group-hover:text-[#c9a227]">{n.title}</h3>
                {n.body && n.body.slice(0, 1).map((p: string, j: number) => (
                  <p key={j} className="text-[14.5px] text-gray-600 leading-[2] mt-3 text-justify">{p}</p>
                ))}
                <span className="text-xs font-bold text-[#0f3057] mt-4 inline-flex items-center gap-1.5">اقرأ التفاصيل <span className="rotate-180">→</span></span>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyNote label={dept.newsNote || 'لا توجد أخبار أو إعلانات منشورة لهذا القسم على موقع الكلية حالياً.'} />
        )}
      </section>

      <section>
        <SectionTitle icon={GraduationCap} title="صفحات القسم" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEPT_TABS.filter((tb) => tb.id).map((tb) => (
            <Link key={tb.id} to={base + '/' + tb.id} className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 hover:border-[#c9a227] hover:shadow-md transition-all group">
              <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
              <span className="font-bold text-[#0f3057] text-sm group-hover:text-[#c9a227]">{tb.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </Wrap>
  );
}

function official(dept: any, heading: string, fallbackNote: string) {
  return dept.verifiedEmpty
    ? 'لا توجد عناصر لعرضها في قائمة «' + heading + '» على موقع الكلية.'
    : fallbackNote;
}

function Narrative({ lead, intro, items }: { lead: string; intro?: string; items?: any[] }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-1.5 h-6 rounded-full bg-[#c9a227] block" />
        <h3 className="text-[18px] font-bold text-[#0f3057]">{lead}</h3>
      </div>
      {intro && <p className="text-gray-700 text-[16px] leading-[2.1] text-justify mb-5">{intro}</p>}
      {items && (
        <div className="flex flex-col gap-4">
          {items.map((it: any, i: number) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-lg bg-[#0f3057] text-[#c9a227] flex items-center justify-center text-[13px] font-bold flex-shrink-0">{i + 1}</span>
                <p className="text-[16px] font-bold text-[#0f3057]">{it.t}</p>
              </div>
              <p className="text-[15.5px] text-gray-700 leading-[2.05] text-justify">{it.b}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function DepartmentStrategy() {
  const { dept, cfg } = useDept();
  const st = dept.strategy;
  if (st && st.visionItems) {
    return (
      <Wrap>
        <SectionTitle icon={Target} title={st.title || 'الاستيراتيجية'} sub={dept.pageTitle || dept.name} />
        <Narrative lead={st.visionLead} items={st.visionItems} />
        <Narrative lead={st.missionLead} items={st.missionItems} />
        <Narrative lead={st.goalsLead} intro={st.goalsIntro} />
        <Narrative lead={st.goalsSummaryLead} items={st.goalsItems} />
      </Wrap>
    );
  }
  return (
    <Wrap>
      <SectionTitle icon={Target} title={(st && st.title) || 'الاستيراتيجية'} sub={dept.pageTitle || dept.name} />
      {!st && dept.strategyNote ? (
        <EmptyNote label={dept.strategyNote} />
      ) : !st ? (
        <>
          <div className="bg-gradient-to-l from-[#0f3057] to-[#16457a] rounded-2xl p-8 mb-8">
            <p className="text-[#c9a227] text-xs font-bold uppercase tracking-widest mb-3">شعار الكلية</p>
            <h3 className="text-white text-2xl font-bold leading-snug">{cfg.tagline}</h3>
          </div>
          <EmptyNote label={official(dept, 'الاستيراتيجية', 'لا توجد عناصر منشورة في هذه الصفحة على موقع الكلية حالياً.')} />
        </>
      ) : (
        <div className="flex flex-col gap-8">
          {st.intro && <EmptyNote label={st.intro} />}
          {dept.strategyFiles && (
            <div className="flex flex-col gap-3">
              {dept.strategyFiles.map((f: string, i: number) => (
                <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 bg-white">
                  <div className="w-9 h-9 rounded-lg bg-[#0f3057]/8 flex items-center justify-center flex-shrink-0">
                    <FileText size={16} className="text-[#0f3057]" />
                  </div>
                  <p className="text-[14.5px] font-semibold text-[#0f3057] flex-1 leading-relaxed">{f}</p>
                  <Download size={15} className="text-[#c9a227] flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
          <div className="bg-gradient-to-l from-[#0f3057] to-[#16457a] rounded-3xl p-8">
            <p className="text-[#c9a227] text-xs font-bold tracking-widest mb-3">رؤيتنا</p>
            <p className="text-white text-[17px] leading-[2] text-justify">{st.vision}</p>
          </div>
          {st.mission && (
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
              <p className="text-[#c9a227] text-xs font-bold tracking-widest mb-3">رسالتنا</p>
              <p className="text-gray-700 text-[16.5px] leading-[2.1] text-justify">{st.mission}</p>
            </div>
          )}
          {dept.strategyFootnote && <p className="text-sm text-gray-500 leading-relaxed">{dept.strategyFootnote}</p>}
          <div style={{ display: st.goals.length ? undefined : 'none' }}>
            <h3 className="text-[19px] font-bold text-[#0f3057] mb-5">{st.goalsLabel || 'الأهداف'}</h3>
            <div className="flex flex-col gap-3">
              {st.goals.map((g: string, i: number) => (
                <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm">
                  <span className="w-8 h-8 rounded-lg bg-[#0f3057] text-[#c9a227] flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</span>
                  <p className="text-[15.5px] text-gray-700 leading-[2]">{g}</p>
                </div>
              ))}
            </div>
          </div>
          {st.values && st.values.length > 0 && (
            <div>
              <h3 className="text-[19px] font-bold text-[#0f3057] mb-5">القيم</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {st.values.map((v: string, i: number) => (
                  <div key={i} className="border border-gray-200 rounded-2xl px-6 py-5 bg-white flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
                    <p className="text-[15px] font-bold text-[#0f3057] leading-relaxed">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {st.outcomes && st.outcomes.length > 0 && (
            <div>
              <h3 className="text-[19px] font-bold text-[#0f3057] mb-5">{st.outcomesLabel || 'مخرجات الطلاب'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {st.outcomes.map((v: string, i: number) => (
                  <div key={i} className="border border-gray-200 rounded-xl px-5 py-4 bg-white flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
                    <p className="text-[15px] font-semibold text-[#0f3057] leading-relaxed">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {st.note && <p className="text-gray-600 text-[15.5px] leading-[2] text-justify">{st.note}</p>}
        </div>
      )}
    </Wrap>
  );
}

export function DepartmentPrograms() {
  const { dept } = useDept();
  return (
    <Wrap>
      <SectionTitle icon={GraduationCap} title={'برامج ' + (dept.pageTitle || dept.name)} sub="البرامج الدراسية" />
      {dept.progGroups ? (
        <div className="flex flex-col gap-9">
          {[['البكالوريوس', dept.progGroups.bachelor], ['الدراسات العليا', dept.progGroups.graduate]].map(([label, items]: any, gi: number) => (
            items && items.length > 0 ? (
              <section key={gi}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-1.5 h-6 rounded-full bg-[#c9a227] block" />
                  <h3 className="text-[17px] font-bold text-[#0f3057]">{label}</h3>
                  <span className="text-xs font-bold text-gray-400">{items.length}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((p: string, i: number) => (
                    <div key={i} className="bg-white border border-gray-100 rounded-2xl px-6 py-6 shadow-sm flex items-start gap-4">
                      <span className="w-9 h-9 rounded-lg bg-[#0f3057] text-[#c9a227] flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                      <p className="text-[15.5px] font-bold text-[#0f3057] leading-relaxed">{p}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null
          ))}
        </div>
      ) : dept.programsList ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dept.programsList.map((p: string, i: number) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl px-6 py-7 shadow-sm flex items-start gap-4">
              <span className="w-9 h-9 rounded-lg bg-[#0f3057] text-[#c9a227] flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
              <p className="text-[15.5px] font-bold text-[#0f3057] leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      ) : (
        <EmptyNote label={dept.programsNote || 'لا توجد برامج دراسية منشورة لهذا القسم على موقع الكلية حالياً.'} />
      )}
    </Wrap>
  );
}

function SimpleDeptPage({ icon, title, sub, note }: { icon: React.ElementType; title: string; sub: string; note: string }) {
  return (
    <Wrap>
      <SectionTitle icon={icon} title={title} sub={sub} />
      <EmptyNote label={note} />
    </Wrap>
  );
}

export function DepartmentFaculty() {
  const { dept } = useDept();
  if (!dept.staff) {
    return <SimpleDeptPage icon={Users} title="الهيئة التدريسية" sub={dept.pageTitle || dept.name} note={official(dept, 'الهيئة التدريسية', 'لا توجد عناصر منشورة في هذه الصفحة على موقع الكلية حالياً.')} />;
  }
  const hasRanks = dept.staff.some((s: any) => s.rank);
  const ranks: string[] = [];
  dept.staff.forEach((s: any) => { if (s.rank && !ranks.includes(s.rank)) ranks.push(s.rank); });
  const card = (s: any, i: number) => (
    <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
      <div className="w-11 h-11 rounded-full bg-[#0f3057] flex items-center justify-center flex-shrink-0">
        <Users size={18} className="text-[#c9a227]" />
      </div>
      <div>
        <p className="text-[15px] font-bold text-[#0f3057] leading-relaxed">{s.name}</p>
        {s.rank && <p className="text-xs text-gray-500 mt-1">{s.rank}</p>}
      </div>
    </div>
  );
  return (
    <Wrap>
      <SectionTitle icon={Users} title="الهيئة التدريسية" sub={dept.pageTitle || dept.name} />
      {dept.staffNote && <p className="text-gray-600 text-[15.5px] leading-[2] mb-5">{dept.staffNote}</p>}
      <div className="bg-[#0f3057] text-white rounded-3xl p-8 mb-10 flex items-center gap-6">
        <span className="text-5xl font-bold text-[#c9a227]">{dept.staffTotal}</span>
        <p className="text-[17px] leading-relaxed">عضو هيئة تدريس في القسم</p>
      </div>
      {hasRanks ? (
        ranks.map((rank) => (
          <section key={rank} className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1.5 h-6 rounded-full bg-[#c9a227] block" />
              <h3 className="text-[17px] font-bold text-[#0f3057]">{rank}</h3>
              <span className="text-xs font-bold text-gray-400">{dept.staff.filter((s: any) => s.rank === rank).length}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dept.staff.filter((s: any) => s.rank === rank).map(card)}
            </div>
          </section>
        ))
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dept.staff.map(card)}
        </div>
      )}
    </Wrap>
  );
}

export function DepartmentCourses() {
  const { dept } = useDept();
  if (dept.courseTable) {
    return (
      <Wrap>
        <SectionTitle icon={BookOpen} title={'المواد الدراسية لقسم ' + dept.name} sub="الملفات المنشورة على موقع الكلية" />
        {dept.courseTable.groups.map((g: any, gi: number) => (
          <section key={gi} className="mb-9">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1.5 h-6 rounded-full bg-[#c9a227] block" />
              <h3 className="text-[17px] font-bold text-[#0f3057]">{g.group}</h3>
              <span className="text-xs font-bold text-gray-400">{g.rows.length}</span>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-right border-collapse min-w-[620px]">
                <thead>
                  <tr className="bg-[#0f3057]">
                    {dept.courseTable.columns.map((c: string, i: number) => (
                      <th key={i} className="px-5 py-3.5 text-[13.5px] font-bold text-white whitespace-nowrap">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {g.rows.map((r: string[], i: number) => (
                    <tr key={i} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                      {r.map((c: string, j: number) => (
                        <td key={j} className={'px-5 py-4 text-[14.5px] border-t border-gray-100 leading-relaxed ' + (j === r.length - 1 ? 'text-[#c9a227] font-bold' : 'text-[#0f3057]')}>{c}</td>
                      ))}
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
  if (!dept.courses) {
    return <SimpleDeptPage icon={BookOpen} title={'المواد الدراسية لقسم ' + dept.name} sub="المواد الدراسية" note={dept.coursesNote || official(dept, 'المواد الدراسية', 'لا توجد عناصر منشورة في هذه الصفحة على موقع الكلية حالياً.')} />;
  }
  return (
    <Wrap>
      <SectionTitle icon={BookOpen} title={'المواد الدراسية لقسم ' + dept.name} sub="المسارات الأكاديمية ومساقاتها" />
      {dept.coursesNote && <p className="text-sm text-gray-500 mb-8 leading-relaxed">{dept.coursesNote}</p>}
      {dept.courses.map((c: any, ci: number) => (
        <section key={ci} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-6 rounded-full bg-[#c9a227] block" />
            <h3 className="text-[17.5px] font-bold text-[#0f3057]">{c.track}</h3>
            <span className="text-xs font-bold text-gray-400">{c.items.length} مادة</span>
          </div>
          {c.note && <p className="text-sm text-gray-500 mb-4 pr-5 leading-relaxed">{c.note}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {c.items.map((m: string, i: number) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl px-4 py-3.5 shadow-sm flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227] flex-shrink-0" />
                <p className="text-[14px] text-[#0f3057] font-semibold leading-relaxed">{m}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </Wrap>
  );
}

export function DepartmentPlans() {
  const { dept } = useDept();
  if (dept.planTable) {
    return (
      <Wrap>
        <SectionTitle icon={FileText} title={'الخطط الدراسية لقسم ' + dept.name} sub="الخطط المنشورة على موقع الكلية" />
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-right border-collapse min-w-[620px]">
            <thead>
              <tr className="bg-[#0f3057]">
                {dept.planTable.columns.map((c: string, i: number) => (
                  <th key={i} className="px-5 py-3.5 text-[13.5px] font-bold text-white whitespace-nowrap">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dept.planTable.rows.map((r: string[], i: number) => (
                <tr key={i} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                  {r.map((c: string, j: number) => (
                    <td key={j} className={'px-5 py-4 text-[14.5px] border-t border-gray-100 leading-relaxed ' + (j === 0 ? 'font-semibold text-[#0f3057]' : 'text-gray-600')}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Wrap>
    );
  }
  if (!dept.plans) {
    return <SimpleDeptPage icon={FileText} title={'الخطط الدراسية لقسم ' + dept.name} sub="الخطط الدراسية" note={dept.plansNote || official(dept, 'الخطط الدراسية', 'لا توجد عناصر منشورة في هذه الصفحة على موقع الكلية حالياً.')} />;
  }
  return (
    <Wrap>
      <SectionTitle icon={FileText} title={'الخطط الدراسية لقسم ' + dept.name} sub="الخطط المدرجة على موقع الكلية" />
      {dept.plans.map((g: any, gi: number) => (
        <section key={gi} className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1.5 h-6 rounded-full bg-[#c9a227] block" />
            <h3 className="text-[17px] font-bold text-[#0f3057]">{g.group}</h3>
            <span className="text-xs font-bold text-gray-400">{g.items.length}</span>
          </div>
          <div className="flex flex-col gap-3">
            {g.items.map((p: string, i: number) => (
              <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 bg-white hover:border-[#c9a227] transition-colors">
                <div className="w-9 h-9 rounded-lg bg-[#0f3057]/8 flex items-center justify-center flex-shrink-0">
                  <FileText size={16} className="text-[#0f3057]" />
                </div>
                <p className="text-[14.5px] font-semibold text-[#0f3057] flex-1 leading-relaxed">{p}</p>
                <Download size={15} className="text-[#c9a227] flex-shrink-0" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </Wrap>
  );
}

export function DepartmentForms() {
  const { dept } = useDept();
  if (!dept.forms) {
    return <SimpleDeptPage icon={Download} title="نماذج القسم" sub={dept.pageTitle || dept.name} note={dept.formsNote || official(dept, 'نماذج القسم', 'لا توجد عناصر منشورة في هذه الصفحة على موقع الكلية حالياً.')} />;
  }
  return (
    <Wrap>
      <SectionTitle icon={Download} title="نماذج القسم" sub={dept.pageTitle || dept.name} />
      <div className="flex flex-col gap-3">
        {dept.forms.map((f: any, i: number) => (
          <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 bg-white hover:border-[#c9a227] transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#0f3057]/8 flex items-center justify-center flex-shrink-0">
              <FileText size={16} className="text-[#0f3057]" />
            </div>
            <p className="text-[14.5px] font-semibold text-[#0f3057] flex-1 leading-relaxed">{f.name}</p>
            <span className="text-[11px] font-bold text-gray-400 flex-shrink-0">{f.audience}</span>
            <Download size={15} className="text-[#c9a227] flex-shrink-0" />
          </div>
        ))}
      </div>
    </Wrap>
  );
}

export function DepartmentAchievements() {
  const { slug, dept } = useDept();
  if (!dept.achievements) {
    return <SimpleDeptPage icon={Award} title={dept.achievementsTitle || 'النشاطات والجوائز وبراءات الاختراع'} sub={dept.pageTitle || dept.name} note={dept.achievementsNote || dept.achievementsNote || official(dept, 'النشاطات والجوائز وبراءات الاختراع', 'لا توجد عناصر منشورة في هذه الصفحة على موقع الكلية حالياً.')} />;
  }
  const total = dept.achievements.reduce((a: number, g: any) => a + g.items.length, 0);
  return (
    <Wrap>
      <SectionTitle icon={Award} title={dept.achievementsTitle || 'النشاطات والجوائز وبراءات الاختراع'} sub={dept.pageTitle || dept.name} />
      <div className="bg-[#0f3057] text-white rounded-3xl p-8 mb-10 flex items-center gap-6">
        <span className="text-5xl font-bold text-[#c9a227]">{total}</span>
        <p className="text-[17px] leading-relaxed">نشاطاً وإنجازاً منشوراً للقسم</p>
      </div>
      {dept.achievements.map((g: any, gi: number) => (
        <section key={gi} className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1.5 h-6 rounded-full bg-[#c9a227] block" />
            <h3 className="text-[18px] font-bold text-[#0f3057]">{g.year}</h3>
            <span className="text-xs font-bold text-gray-400">{g.items.length}</span>
          </div>
          <div className="flex flex-col gap-3">
            {g.items.map((it: any, i: number) => (
              <Link key={i} to={'/d-item/' + slug + '/' + dept.id + '/achievements/' + (gi * 1000 + i)} className="bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 hover:border-[#c9a227] hover:shadow-md transition-all">
                <p className="text-[15px] font-semibold text-[#0f3057] leading-[1.9] flex-1">{it.title}</p>
                <span className="text-xs font-bold text-[#c9a227] flex-shrink-0" dir="ltr">{it.date}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </Wrap>
  );
}
