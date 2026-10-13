import React, { useState } from 'react';
import { CenterLayout, PlaceholderContent, CenterLink } from './CenterLayout';
import { AboutBriefContent } from './AcademicDevelopmentAbout';
import {
  StrategicPlanContent,
  CouncilContent,
  OrgChartContent,
  DirectorMessageContent,
  StaffContent,
  ContactContent,
  NationalAccreditationContent,
  AccreditationDecisionsContent,
  InternationalAccreditationContent,
} from './AcademicDevelopmentSubPages';
import {
  QualityMainContent,
  AcademicQualityContent,
  QualityCharterContent,
  RankingsContent,
  NationalQualityCertificateContent,
  SelfAssessmentContent,
  AcademicDevelopmentContent,
  CourseBookingContent,
  EvaluationContent,
  YearlyReportContent,
  StudiesContent,
  UniStrategyPlanContent,
  InitiativesContent,
  InformationDocumentationContent,
  ProficiencyExamContent,
  FormsListContent,
  GuidesContent,
} from './AcademicDevelopmentQualityPages';
import {
  Home, Info, Award, ShieldCheck, TrendingUp, Target, FileText,
  CheckCircle, Calendar, ChevronLeft, Megaphone, BookOpen,
  Scale, ClipboardList, Link2, Bell, AlertCircle, ExternalLink
} from 'lucide-react';

/* ─── Sidebar links ─── */
const LINKS: CenterLink[] = [
  { id: 'home', name: 'الرئيسية', icon: Home },
  {
    id: 'about', name: 'عن المركز', icon: Info,
    children: [
      { id: 'about-brief', name: 'نبذة عن المركز' },
      { id: 'about-strategy', name: 'الخطة الاستراتيجية' },
      { id: 'about-council', name: 'مجلس المركز' },
      { id: 'about-org-chart', name: 'الهيكل التنظيمي' },
      { id: 'about-director', name: 'كلمة مدير المركز' },
      { id: 'about-staff', name: 'موظفو المركز' },
      { id: 'about-brochures', name: 'نشرات المركز' },
      { id: 'about-contact', name: 'اتصل بنا' },
    ],
  },
  {
    id: 'accreditation', name: 'الاعتماد', icon: Award,
    children: [
      { id: 'acc-national', name: 'معايير الاعتماد الوطني' },
      { id: 'acc-decisions', name: 'قرارت اعتماد البرامج' },
      { id: 'acc-international', name: 'الاعتماد الدولي' },
    ],
  },
  {
    id: 'quality', name: 'الجودة', icon: ShieldCheck,
    children: [
      { id: 'quality-main', name: 'الجودة' },
      { id: 'quality-academic', name: 'ضمان الجودة الأكاديمية' },
      { id: 'quality-charter', name: 'ميثاق الجودة' },
      { id: 'quality-rankings', name: 'التصنيفات' },
      { id: 'quality-certificate', name: 'شهادة ضمان الجودة الوطنية' },
      { id: 'quality-self-assess', name: 'التقييم الذاتي' },
    ],
  },
  {
    id: 'development', name: 'التطوير والدراسات', icon: TrendingUp,
    children: [
      { id: 'dev-academic', name: 'التطوير الأكاديمي' },
      { id: 'dev-course', name: 'حجز دورة ممارسة العمل الأكاديمي' },
      { id: 'dev-evaluation', name: 'التقييم' },
      { id: 'dev-report', name: 'التقرير السنوي' },
      { id: 'dev-studies', name: 'الدراسات' },
    ],
  },
  {
    id: 'strategies', name: 'الاستراتيجيات والمبادرات', icon: Target,
    children: [
      { id: 'strat-uni', name: 'الخطة الاستراتيجية للجامعة' },
      { id: 'strat-initiatives', name: 'المبادرات' },
      { id: 'strat-info', name: 'المعلومات والتوثيق' },
    ],
  },
  { id: 'evaluation', name: 'التقييم', icon: CheckCircle },
  { id: 'proficiency-exam', name: 'امتحان الكفاءة الجامعية', icon: FileText },
  {
    id: 'forms', name: 'النماذج والادلة', icon: FileText,
    children: [
      { id: 'forms-main', name: 'النماذج' },
      { id: 'forms-guides', name: 'الأدلة' },
    ],
  },
];

/* ─── Data ─── */
const newsItems = [
  {
    id: 1,
    title: 'استبانة رضى المتعاملين مع صندوق الملك عبدالله — مكتب الإرشاد الوظيفي ومتابعة الخريجين',
    date: '5/28/2024',
    category: 'استبانة',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
  },
  {
    id: 2,
    title: 'استبانة قياس رضا طلبة جامعة مؤتة عن البيئة الجامعية للعام الجامعي 2024/2023',
    date: '5/27/2024',
    category: 'استبانة',
    image: 'https://images.unsplash.com/photo-1530099486328-e021101a494a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
  },
  {
    id: 3,
    title: 'استمارة تقييم أعضاء هيئة التدريس',
    date: '5/21/2024',
    category: 'تقييم',
    image: 'https://images.unsplash.com/photo-1580894732930-0babd100d356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
  },
  {
    id: 4,
    title: 'امتحان الكفاءة الجامعية',
    date: '5/6/2019',
    category: 'امتحانات',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
  },
  {
    id: 5,
    title: 'هيئة اعتماد مؤسسات التعليم العالي توشح مؤتة بشهادة هي الأولى على مستوى كليات علوم الرياضة في الجامعات الأردنية',
    date: '4/1/2019',
    category: 'اعتماد',
    image: 'https://images.unsplash.com/photo-1780851592243-e13ca24a7e8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
  },
  {
    id: 6,
    title: 'كلية طب مؤتة في المركز الأول لامتحان الكفاءة',
    date: '2/27/2019',
    category: 'إنجازات',
    image: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
  },
  {
    id: 7,
    title: 'دراسة تقييمية تبرهن على كفاءة خريجي جامعة مؤتة من وجهة نظر المشغلين',
    date: '2/27/2019',
    category: 'دراسات',
    image: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
  },
  {
    id: 8,
    title: 'مركز الملك عبدالله الثاني للتميز يعقد مبادرة يوم في التميّز في جامعة مؤتة',
    date: '2/25/2019',
    category: 'فعاليات',
    image: 'https://images.unsplash.com/photo-1561489404-42f13a2f09a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
  },
];

const announcements = [
  {
    id: 1,
    title: 'قام مركز التطوير الأكاديمي وضمان الجودة بعقد دورة بعنوان التعلم الإلكتروني (MOODLE)',
    date: '4/1/2019',
    image: 'https://images.unsplash.com/photo-1673515335586-f9f662c01482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
  },
  {
    id: 2,
    title: 'قام مركز التطوير الأكاديمي وضمان الجودة بعقد دورة "أخلاقيات مهنة التدريس"',
    date: '3/5/2019',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
  },
  {
    id: 3,
    title: 'قام مركز التطوير الأكاديمي وضمان الجودة بعقد دورة "أخلاقيات والتوثيق في البحث العلمي"',
    date: '3/5/2019',
    image: 'https://images.unsplash.com/photo-1636797581198-1bb1f2d961b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
  },
];

/* ─── Reusable section title bar ─── */
function SectionTitle({ icon: Icon, title, linkLabel }: { icon: React.ElementType; title: string; linkLabel?: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <span className="w-1 h-8 rounded-full bg-[#c9a227] block" />
        <div className="w-9 h-9 rounded-lg bg-[#0f3057] flex items-center justify-center">
          <Icon size={18} className="text-[#c9a227]" />
        </div>
        <h2 className="text-xl font-bold text-[#0f3057]">{title}</h2>
      </div>
      {linkLabel && (
        <button className="flex items-center gap-1 text-sm text-[#0f3057] hover:text-[#c9a227] font-semibold transition-colors border border-[#0f3057]/20 hover:border-[#c9a227] px-3 py-1.5 rounded-lg">
          {linkLabel}
          <ChevronLeft size={14} />
        </button>
      )}
    </div>
  );
}

/* ─── News card ─── */
function NewsCard({ item }: { item: typeof newsItems[0] }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col">
      <div className="relative overflow-hidden h-44">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f3057]/60 to-transparent" />
        <span className="absolute bottom-3 right-3 bg-[#c9a227] text-[#0f3057] text-xs font-bold px-2.5 py-1 rounded-full">
          {item.category}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 flex-1 group-hover:text-[#0f3057] transition-colors">
          {item.title}
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Calendar size={13} />
            <span className="text-xs">{item.date}</span>
          </div>
          <span className="text-xs text-[#c9a227] font-semibold flex items-center gap-1">
            اقرأ المزيد <ChevronLeft size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Announcement card ─── */
function AnnouncementCard({ item }: { item: typeof announcements[0] }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col">
      <div className="relative overflow-hidden h-44">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f3057]/70 to-transparent" />
        <div className="absolute top-3 right-3 bg-[#0f3057] text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Megaphone size={11} /> إعلان
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 flex-1 group-hover:text-[#0f3057] transition-colors">
          {item.title}
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Calendar size={13} />
            <span className="text-xs">{item.date}</span>
          </div>
          <ExternalLink size={14} className="text-gray-300 group-hover:text-[#c9a227] transition-colors" />
        </div>
      </div>
    </div>
  );
}

/* ─── Home page ─── */
function HomeContent() {
  const [showAll, setShowAll] = useState(false);
  const visibleNews = showAll ? newsItems : newsItems.slice(0, 6);

  return (
    <div className="space-y-12">

      {/* 1. أخبار وأحداث */}
      <section>
        <SectionTitle icon={Bell} title="أخبار وأحداث" linkLabel="جميع الأخبار" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
        {newsItems.length > 6 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 rounded-xl border-2 border-[#0f3057] text-[#0f3057] font-semibold text-sm hover:bg-[#0f3057] hover:text-white transition-all flex items-center gap-2"
            >
              {showAll ? 'عرض أقل' : 'عرض المزيد'}
              <ChevronLeft size={15} className={showAll ? 'rotate-90' : '-rotate-90'} />
            </button>
          </div>
        )}
      </section>

      {/* 2. معلومات تهمك */}
      <section>
        <SectionTitle icon={AlertCircle} title="معلومات تهمك" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              icon: ClipboardList,
              label: 'التعليمات',
              desc: 'اطلع على جميع التعليمات الخاصة بالمركز والعمليات الأكاديمية.',
              image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
            },
            {
              icon: BookOpen,
              label: 'الأنظمة',
              desc: 'الأنظمة المعتمدة التي تحكم سير العمل الأكاديمي والإداري.',
              image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
            },
            {
              icon: Scale,
              label: 'القوانين',
              desc: 'القوانين والتشريعات الجامعية ذات الصلة بمركز التطوير والجودة.',
              image: 'https://images.unsplash.com/photo-1618771623063-6c3faa854a61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
            },
          ].map(({ icon: Icon, label, desc, image }) => (
            <div
              key={label}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
            >
              <div className="relative overflow-hidden h-40">
                <img src={image} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#0f3057]/60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-[#c9a227] flex items-center justify-center">
                    <Icon size={22} className="text-[#0f3057]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{label}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{desc}</p>
                <span className="text-xs text-[#c9a227] font-bold flex items-center gap-1">
                  عرض <ChevronLeft size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. معلومات عامة */}
      <section>
        <SectionTitle icon={Info} title="معلومات عامة" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            {
              icon: AlertCircle,
              title: 'امتحان الكفاءة مهم',
              body: 'إن التقدم لامتحان الكفاءة الجامعي شرط أساسي لاستلام المصدقات والشهادات الجامعية، ولن يتم تخريج أي طالب أو طالبة دون التقدم للامتحان.',
              image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
            },
            {
              icon: CheckCircle,
              title: 'شهادات الكفاءة',
              body: 'على الطلبة الذين تقدموا لامتحان الكفاءة الجامعية للفصل الأول من العام الجامعي 2018/2019 مراجعة ديوان الكلية لاستلام شهادات امتحان الكفاءة الجامعية.',
              image: 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80',
            },
          ].map(({ icon: Icon, title: t, body, image }) => (
            <div
              key={t}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group flex"
            >
              <div className="relative w-40 flex-shrink-0 overflow-hidden">
                <img src={image} alt={t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#0f3057]/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon size={32} className="text-[#c9a227]" />
                </div>
              </div>
              <div className="p-5 flex flex-col justify-center">
                <h3 className="text-base font-bold text-[#0f3057] mb-2">{t}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. إعلانات */}
      <section>
        <SectionTitle icon={Megaphone} title="إعلانات" linkLabel="جميع الإعلانات" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {announcements.map((item) => (
            <AnnouncementCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 5. روابط سريعة */}
      <section>
        <SectionTitle icon={Link2} title="روابط سريعة" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: 'قائمة القوانين', icon: Scale },
            { label: 'معايير الاعتماد الوطني', icon: Award },
            { label: 'التقرير السنوي', icon: FileText },
            { label: 'نماذج التقييم', icon: ClipboardList },
            { label: 'الخطة الاستراتيجية للجامعة', icon: Target },
            { label: 'ميثاق الجودة', icon: ShieldCheck },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex items-center justify-between px-5 py-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:bg-[#0f3057] hover:border-[#0f3057] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0f3057]/5 group-hover:bg-white/10 flex items-center justify-center transition-colors">
                  <Icon size={17} className="text-[#0f3057] group-hover:text-[#c9a227] transition-colors" />
                </div>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors">{label}</span>
              </div>
              <ChevronLeft size={15} className="text-gray-300 group-hover:text-[#c9a227] transition-colors" />
            </button>
          ))}
        </div>
      </section>

    </div>
  );
}

/* ─── Export ─── */
export function AcademicDevelopmentCenter() {
  return (
    <CenterLayout
      centerName="مركز التطوير الأكاديمي وضمان الجودة"
      links={LINKS}
      heroDescription="يعمل المركز على نشر ثقافة الجودة والتطوير الأكاديمي للوصول إلى التميز في كافة البرامج والمخرجات التعليمية."
      heroImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=2000&q=80"
    >
      {(activeItem) => {
        if (activeItem === 'home') return <HomeContent />;
        if (activeItem === 'about-brief') return <AboutBriefContent />;
        if (activeItem === 'about-strategy') return <StrategicPlanContent />;
        if (activeItem === 'about-council') return <CouncilContent />;
        if (activeItem === 'about-org-chart') return <OrgChartContent />;
        if (activeItem === 'about-director') return <DirectorMessageContent />;
        if (activeItem === 'about-staff') return <StaffContent />;
        if (activeItem === 'about-contact') return <ContactContent />;
        if (activeItem === 'acc-national') return <NationalAccreditationContent />;
        if (activeItem === 'acc-decisions') return <AccreditationDecisionsContent />;
        if (activeItem === 'acc-international') return <InternationalAccreditationContent />;
        if (activeItem === 'quality-main') return <QualityMainContent />;
        if (activeItem === 'quality-academic') return <AcademicQualityContent />;
        if (activeItem === 'quality-charter') return <QualityCharterContent />;
        if (activeItem === 'quality-rankings') return <RankingsContent />;
        if (activeItem === 'quality-certificate') return <NationalQualityCertificateContent />;
        if (activeItem === 'quality-self-assess') return <SelfAssessmentContent />;
        if (activeItem === 'dev-academic') return <AcademicDevelopmentContent />;
        if (activeItem === 'dev-course') return <CourseBookingContent />;
        if (activeItem === 'dev-evaluation' || activeItem === 'evaluation') return <EvaluationContent />;
        if (activeItem === 'dev-report') return <YearlyReportContent />;
        if (activeItem === 'dev-studies') return <StudiesContent />;
        if (activeItem === 'strat-uni') return <UniStrategyPlanContent />;
        if (activeItem === 'strat-initiatives') return <InitiativesContent />;
        if (activeItem === 'strat-info') return <InformationDocumentationContent />;
        if (activeItem === 'proficiency-exam') return <ProficiencyExamContent />;
        if (activeItem === 'forms-main') return <FormsListContent />;
        if (activeItem === 'forms-guides') return <GuidesContent />;

        let title = 'المحتوى';
        for (const link of LINKS) {
          if (link.id === activeItem) title = link.name;
          if (link.children) {
            const child = link.children.find((c) => c.id === activeItem);
            if (child) title = child.name;
          }
        }
        return <PlaceholderContent title={title} onHomeClick={() => {}} />;
      }}
    </CenterLayout>
  );
}
