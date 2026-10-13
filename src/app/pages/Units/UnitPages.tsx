import ITEMS from '../ItemsRegistry';
import { Link } from "react-router";
import { useTabRoute } from "../../nav";
import React, { useState } from 'react';
import {
  DeanshipShell, PageTitle, Prose, DocRow, LinkRow, NumList, Waiting,
  getSectionTitle, type NavLink
} from '../Deanships/DeanshipShell';
import { Eye, Target, Users, Phone, Mail, MapPin, CheckCircle, Building2 } from 'lucide-react';

/* ══════════════════════════════════════════
   وحدة الموارد البشرية
══════════════════════════════════════════ */
const HR_LINKS: NavLink[] = [
  { id: 'home', name: 'الرئيسية' },
  {
    id: 'about', name: 'عن الوحدة',
    children: [
      { id: 'about-brief', name: 'نبذة' },
      { id: 'about-vision', name: 'الرؤية، الرسالة، الاهداف' },
      { id: 'about-director', name: 'كلمة المدير' },
      { id: 'about-staff', name: 'الكادر الإداري' },
      { id: 'about-structure', name: 'الهيكل التنظيمي' }
    ]
  },
  {
    id: 'depts', name: 'ادارات الوحدة',
    children: [
      {
        id: 'dep-employees', name: 'دائرة خدمات العاملين',
        children: [
          { id: 'emp-health', name: 'شعبة التامين الصحي' },
          { id: 'emp-social', name: 'شعبة الضمان الاجتماعي' },
          { id: 'emp-general', name: 'شعبة الخدمات العامة' },
          { id: 'emp-training', name: 'شعبة التأهيل والتدريب والدراسات' }
        ]
      },
      {
        id: 'dep-faculty', name: 'دائرة شؤون الهيئة التدريسية',
        children: [
          { id: 'fac-files', name: 'شعبة الملفات والبيانات' },
          { id: 'fac-members', name: 'شعبة اعضاء هيئة التدريس والمحاضرين المتفرغين' }
        ]
      },
      {
        id: 'dep-personnel', name: 'دائرة شؤون الموظفين',
        children: [
          { id: 'per-files', name: 'شعبة الملفات والبيانات' },
          { id: 'per-staff', name: 'شعبة الموظفين' },
          { id: 'per-attendance', name: 'شعبة الدوام الالكتروني' }
        ]
      },
      { id: 'dep-ethics', name: 'مكتب الأمتثال وأخلاقيات الوظيفة' }
    ]
  },
  { id: 'performance', name: 'معايير تقييم الأداء' },
  { id: 'forms', name: 'نماذج' },
  { id: 'guide', name: 'دليل العاملين' },
  { id: 'complaints', name: 'شكاوى واقتراحات' },
  { id: 'contact', name: 'إتصل بنا' }
];

const HR_NEWS = [
  { t: 'عقد دورة (الذكاء الاصطناعي الإداري: أتمتة المهام المكتبية وجدولة الأعمال الذكية) للدفعة الثانية لموظفي الجامعة 23–26/8/2026', d: '31/8/2026' },
  { t: 'عقد دورة (الذكاء الاصطناعي الإداري: أتمتة المهام المكتبية وجدولة الأعمال الذكية) للدفعة الأولى من الموظفين', d: '2/8/2026' },
  { t: 'عقد دورة (السلامة العامة والصحة المهنية والإجراءات المتبعة في الكوارث والحرائق) 13–15/7/2026', d: '15/7/2026' },
  { t: 'عقد دورة (توجيه موظف جديد)', d: '14/7/2026' },
  { t: 'عقد دورة (تأهيل وتطوير القيادات الادارية) 21/6/2026', d: '14/7/2026' },
  { t: 'عقد دورة (Microsoft Excel) 29/6/2026', d: '14/7/2026' },
  { t: 'عقد دورة المهارات الإدارية', d: '17/10/2024' },
  { t: 'عقد دورة القيادات الإدارية لمجموعة من الموظفين الإداريين وذلك لغاية الترفيع', d: '28/1/2024' },
  { t: 'الموارد البشرية ممثلة بدائرة خدمات العاملين وشعبة التأهيل والتدريب تعقدُ دورة إكسل؛ لغايات التأهيل وتطوير المهارات', d: '19/12/2022' }
];

const HR_ANNOUNCE = [
  { t: 'عقد دورة الذكاء الاصطناعي الإداري', d: '20/7/2026' },
  { t: 'تعلن جامعة مؤتة عن حاجتها الى تعيين طبيبة', d: '17/10/2024' },
  { t: 'تعلن جامعة مؤتة عن حاجتها لتكليف مدرسين للعمل (على نظام المكافأة) في برنامج الدبلوم العالي لإعداد المعلمين', d: '5/3/2024' }
];

export function HumanResourcesUnit() {
  const [activeItem, setActiveItem] = useTabRoute('home');
  const render = () => {
    switch (activeItem) {
      case 'home':
        return (
          <div className="space-y-10">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/hr/PublishingImages/hr-002.jpg" alt="وحدة الموارد البشرية" className="w-full max-h-[420px] object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">أخبار وأحداث</h3>
              <div className="flex flex-col gap-3">
                {HR_NEWS.map((n, i) => (
                  <Link key={n.t} to={'/u-item/hr-news/' + i} className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-4 hover:border-[#c9a227] transition-colors">
                    <span className="w-1.5 h-10 rounded-full bg-[#c9a227] shrink-0" />
                    <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-snug">{n.t}</p>
                    <span className="text-xs font-bold text-gray-400 shrink-0" dir="ltr">{n.d}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">إعلانات</h3>
              <div className="flex flex-col gap-3">
                {HR_ANNOUNCE.map((n, i) => (
                  <Link key={n.t} to={'/u-item/hr-ann/' + i} className="flex items-start gap-4 bg-[#F8FAFC] border border-gray-100 rounded-2xl px-6 py-4">
                    <span className="w-1.5 h-10 rounded-full bg-[#0f3057] shrink-0" />
                    <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-relaxed">{n.t}</p>
                    <span className="text-xs font-bold text-gray-400 shrink-0" dir="ltr">{n.d}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">روابط سريعة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <LinkRow name="الخدمات الإلكترونية" url="http://portal1.mutah.edu.jo/eservice/faces/loginView" />
                <LinkRow name="تقارير الموظفين السنوية" url="https://erep.mutah.edu.jo/Default.aspx" />
                <LinkRow name="وظائف الجامعة" url="https://www.mutah.edu.jo/Lists/JobsAndScholarships/Jobs.aspx" />
              </div>
            </div>
          </div>
        );
      case 'dep-employees':
      case 'dep-faculty':
      case 'dep-personnel':
      case 'emp-social':
      case 'emp-general':
      case 'emp-training':
      case 'fac-files':
      case 'fac-members':
      case 'per-files':
      case 'per-staff':
      case 'per-attendance':
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, HR_LINKS)} sub="وحدة الموارد البشرية" />
            <div className="bg-[#F8FAFC] border border-dashed border-gray-200 rounded-3xl p-12 text-center">
              <Building2 size={28} className="text-gray-400 mx-auto mb-4" />
              <p className="text-xl font-bold text-[#0f3057]">تحت الانشاء</p>
            </div>
          </div>
        );

      case 'dep-ethics':
        return (
          <div className="space-y-8">
            <PageTitle title="مكتب الأمتثال وأخلاقيات الوظيفة" sub="وحدة الموارد البشرية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white p-4">
              <img src="https://www.mutah.edu.jo/ar/hr/SiteAssets/Pages/Forms/EditForm/f-sar2.jpeg" alt="مكتب الأمتثال وأخلاقيات الوظيفة" className="w-full max-h-[560px] object-contain" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0f3057] flex items-center justify-center shrink-0"><Users className="w-5 h-5 text-[#c9a227]" /></div>
              <div>
                <p className="text-[11px] font-bold text-[#c9a227] mb-1">مدير مكتب الأمتثال وأخلاقيات الوظيفة</p>
                <h3 className="font-bold text-[#0f3057] text-[15px]">فاطمة الصرايرة</h3>
                <span className="text-xs text-gray-500" dir="ltr">هاتف 4044</span>
              </div>
            </div>
          </div>
        );

      case 'complaints':
        return (
          <div className="space-y-8">
            <PageTitle title="شكاوى واقتراحات" sub="وحدة الموارد البشرية" />
            <a href="https://mupro.mutah.edu.jo/" target="_blank" rel="noreferrer"
               className="block rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:border-[#c9a227] transition-colors bg-white p-4">
              <img src="https://www.mutah.edu.jo/ar/hr/SiteAssets/Pages/Forms/EditForm/5566.png" alt="نظام الشكاوى والاقتراحات" className="w-full max-h-[560px] object-contain" />
            </a>
            <LinkRow name="نظام الشكاوى والاقتراحات في جامعة مؤتة" url="https://mupro.mutah.edu.jo/" />
          </div>
        );

      case 'forms':
        return (
          <div className="space-y-8">
            <PageTitle title="النماذج" sub="وحدة الموارد البشرية" />
            <div className="flex flex-col gap-3">
              {[
                { n: 'بيان معتمد لغايات صرف علاوة العائلة', u: 'https://www.mutah.edu.jo/ar/hr/Documents/fam.pdf' },
                { n: 'شهادة تصفية براءة ذمة اداريين', u: 'https://www.mutah.edu.jo/ar/hr/Documents/f2.bdf' },
                { n: 'شهادة تصفية براءة ذمة اعضاء هيئة تدريس', u: 'https://www.mutah.edu.jo/ar/hr/Documents/f3.pdf' },
                { n: 'نموذج استخراج هوية', u: 'https://www.mutah.edu.jo/ar/hr/Documents/f4.pdf' },
                { n: 'نموذج خاص بالمعاينات الطبية', u: 'https://www.mutah.edu.jo/ar/hr/Documents/f5.pdf' },
                { n: 'نموذج مطالبة مالية خاص بالتأمين الصحي', u: 'https://www.mutah.edu.jo/ar/hr/Documents/f6.pdf' },
                { n: 'نموذج براءة الذمة', u: 'https://www.mutah.edu.jo/ar/hr/Documents/f7.pdf' },
                { n: 'نموذج النواقص' }
              ].map((f) => <DocRow key={f.n} name={f.n} url={f.u} />)}
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-8">
            <PageTitle title="معايير السلوك الوظيفي للمدققين" sub="معايير تقييم الأداء" />
            <div className="bg-[#F8FAFC] border border-dashed border-gray-200 rounded-3xl p-12 text-center">
              <Building2 size={28} className="text-gray-400 mx-auto mb-4" />
              <p className="text-xl font-bold text-[#0f3057]">تحت الانشاء</p>
            </div>
          </div>
        );

      case 'emp-health':
      case 'guide':
        return (
          <div className="space-y-8">
            <PageTitle title="التعليمات" sub="وحدة الموارد البشرية" />
            <DocRow
              name="تعليمات موظفي جامعة مؤتة"
              url="https://www.mutah.edu.jo/ar/hr/SiteAssets/Pages/Forms/EditForm/%d8%aa%d8%b9%d9%84%d9%8a%d9%85%d8%a7%d8%aa%20%d9%85%d9%88%d8%b8%d9%81%d9%8a%20%d8%ac%d8%a7%d9%85%d8%b9%d8%a9%20%d9%85%d8%a4%d8%aa%d8%a9.pdf"
            />
          </div>
        );

      case 'about-structure':
        return (
          <div className="space-y-8">
            <PageTitle title="الهيكل التنظيمي" sub="وحدة الموارد البشرية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white p-4">
              <img src="https://www.mutah.edu.jo/ar/hr/SiteAssets/Pages/Forms/EditForm/HR.png" alt="الهيكل التنظيمي لوحدة الموارد البشرية" className="w-full max-h-[560px] object-contain" />
            </div>
          </div>
        );

      case 'about-structure':
        return (
          <div className="space-y-8">
            <PageTitle title="الهيكل التنظيمي" sub="وحدة الموارد البشرية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white p-4">
              <img src="https://www.mutah.edu.jo/ar/hr/PublishingImages/hr%20chart.png" alt="الهيكل التنظيمي لوحدة الموارد البشرية" className="w-full max-h-[560px] object-contain" />
            </div>
          </div>
        );

      case 'dep-employees':
      case 'dep-faculty':
      case 'dep-personnel':
      case 'dep-ethics':
      case 'emp-health':
      case 'emp-social':
      case 'emp-general':
      case 'emp-training':
      case 'fac-files':
      case 'fac-members':
      case 'per-files':
      case 'per-staff':
      case 'per-attendance':
      case 'performance':
      case 'forms':
      case 'guide':
      case 'complaints':
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, HR_LINKS)} sub="وحدة الموارد البشرية" />
          </div>
        );

      case 'about-staff': {
        const HR_STAFF = [
          { role: 'مدير وحدة الموارد البشرية', name: 'السيد أمية الطراونة', ext: '6026', img: 'A.Tar1.jpeg' },
          { role: 'مدير دائرة شؤون الموظفين', name: 'الدكتور جازي الحروب', ext: '3772', img: 'Dr.Jazi.jpeg' },
          { role: 'مدير مكتب الأمتثال وأخلاقيات الوظيفة', name: 'فاطمة الصرايرة', ext: '4044', img: 'f-sar.jpeg' },
          { role: 'مدير دائرة خدمات العاملين', name: 'ماهر الصرايره', ext: '4014', img: 'maher.sar.jpeg' },
          { role: 'رئيس الديوان', name: 'اشرف القضاه', ext: '4011', img: 'Ashraf.q.jpeg' },
          { role: 'رئيس شعبة الملفات والتوثيق', name: 'موفق العضايله', ext: '3322', img: 'M.Adaileh.jpeg' },
          { role: 'رئيس شعبة التامين الصحي', name: 'ياسر السحيمات', ext: '4731', img: 'yaser.jpg' },
          { role: 'رئيس شعبة خدمات العاملين', name: 'محمد البطوش', ext: '4731', img: 'm-btoush.jpg' },
          { role: 'رئيس شعبة أعضاء هيئة التدريس والمحاضرين المتفرغين', name: 'باسم المجالي', ext: '4015', img: 'majali2025.jpg' },
          { role: 'رئيس شعبة شؤون الموظفين', name: 'منتهى صالح الملاحمة', img: 'mutaha.jpeg' },
          { role: 'رئيس شعبة الدعم الفني', name: 'امين الصرايره', img: 'ameen.jpg' },
          { role: 'اداري', name: 'احمد السبوع', ext: '4015', img: 'A.sbou.jpeg' },
          { role: 'عامل بريد', name: 'نصر البيايضه', ext: '4011', img: 'nasir.jpg' },
          { role: 'موظف ديوان', name: 'فيصل الحموي', ext: '4011', img: 'fisal.jpg' },
          { role: 'رئيس شعبة الملفات والبيانات', name: 'تمارا احمد الطراونة', ext: '3615', img: 'user-01-128.png' }
        ];
        return (
          <div className="space-y-8">
            <PageTitle title="الموظفون" sub={`الكادر الإداري في وحدة الموارد البشرية — ${HR_STAFF.length} موظفاً`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {HR_STAFF.map((m, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 text-center hover:shadow-md hover:border-[#c9a227]/40 transition-all">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-[#0f3057]">
                    <img src={`https://www.mutah.edu.jo/ar/hr/PublishingImages/${m.img}`} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[11px] font-bold text-[#c9a227] mb-1.5 leading-relaxed">{m.role}</p>
                  <h3 className="font-bold text-[#0f3057] text-[15px] leading-snug mb-2">{m.name}</h3>
                  {m.ext && <span className="inline-block text-xs font-bold text-[#0f3057] px-3 py-1 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/20" dir="ltr">هاتف {m.ext}</span>}
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'about-director':
        return (
          <div className="space-y-8">
            <PageTitle title="كلمة المدير" />
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 shrink-0 bg-gray-50 rounded-3xl p-5 border border-gray-100 text-center">
                <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-[#0f3057]">
                  <img src="https://www.mutah.edu.jo/ar/hr/SiteAssets/Pages/Forms/EditForm/A.Tar.jpeg" alt="مدير وحدة الموارد البشرية" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-[#0f3057] leading-snug">أمية عبدالوهاب الطراونة</h3>
                <p className="text-[#c9a227] font-bold text-sm mt-1">مدير وحدة الموارد البشرية</p>
              </div>
              <div className="w-full md:w-2/3">
                <Prose>
                  <p className="font-bold text-[#0f3057]">بسم الله الرحمن الرحيم</p>
                  <p>
                    تُعد وحدة الموارد البشرية إحدى الوحدات الرئيسة في الجامعة، لما تضطلع به من دور
                    محوري في إدارة وتنمية رأس المال البشري، باعتباره الركيزة الأساسية لتحقيق التميز
                    المؤسسي، والارتقاء بالأداء الأكاديمي والإداري، والإسهام في تحقيق الأهداف
                    الاستراتيجية للجامعة.
                  </p>
                  <p>
                    وانطلاقاً من رؤية الجامعة ورسالتها، تلتزم وحدة الموارد البشرية بتقديم خدمات إدارية
                    متكاملة وفق أفضل الممارسات، ترتكز على استقطاب الكفاءات، وتنمية قدراتها، وتحفيزها،
                    وإدارة أدائها بكفاءة وشفافية، مع تبني مفاهيم التحول الرقمي، والتحسين المستمر، وجودة
                    الخدمات، بما يسهم في توفير بيئة عمل محفزة وداعمة للإبداع والابتكار.
                  </p>
                  <p>
                    كما تسعى الوحدة إلى تطوير الأنظمة والإجراءات، وتعزيز الكفاءة المؤسسية، وتوفير فرص
                    التدريب والتطوير المستمر، بما يواكب المتغيرات الحديثة، ويلبي احتياجات الجامعة،
                    ويعزز قدرتها على تحقيق رسالتها ورؤيتها المستقبلية.
                  </p>
                  <p>
                    ونؤمن في وحدة الموارد البشرية بأن الاستثمار في العنصر البشري هو الاستثمار الحقيقي
                    في مستقبل الجامعة، وأن العمل بروح الفريق، وترسيخ قيم العدالة والشفافية، وتعزيز
                    الشراكة الفاعلة مع جميع الوحدات الأكاديمية والإدارية، يمثل الأساس لتحقيق الإنجاز
                    والتميز والريادة.
                  </p>
                  <p>
                    وستواصل الوحدة العمل لتكون شريكاً استراتيجياً فاعلاً في دعم مسيرة الجامعة، من خلال
                    تقديم خدمات موارد بشرية نوعية، وتطوير بيئة العمل، وتمكين الكفاءات، بما يسهم في
                    الارتقاء بالأداء المؤسسي، وتعزيز مكانة الجامعة أكاديمياً وبحثياً ومجتمعياً.
                  </p>
                  <p>ونسأل الله تعالى التوفيق والسداد في خدمة جامعتنا، وتحقيق رسالتها السامية. والله ولي التوفيق،،،</p>
                  <div className="pt-4 border-t border-gray-100 mt-4">
                    <p className="font-bold text-[#0f3057]">مدير وحدة الموارد البشرية</p>
                    <p className="font-bold text-[#c9a227]">أمية عبدالوهاب الطراونة</p>
                  </div>
                </Prose>
              </div>
            </div>
          </div>
        );

      case 'about-vision':
        return (
          <div className="space-y-8">
            <PageTitle title="الرؤية، الرسالة، الاهداف" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/hr/PublishingImages/aduit1.jpg" alt="الرؤية والرسالة والأهداف" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5"><Eye className="w-7 h-7 text-[#c9a227]" /></div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">الرؤية</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  أن تكون وحدة الموارد البشرية رائدة في إدارة وتنمية رأس المال البشري، من خلال تقديم
                  خدمات إدارية ذكية ومتكاملة، وتعزيز التميز المؤسسي، بما يسهم في تحقيق الريادة
                  الأكاديمية والبحثية وخدمة المجتمع.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5"><Target className="w-7 h-7 text-[#c9a227]" /></div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">الرسالة</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  تقديم خدمات موارد بشرية متكاملة وفق أفضل الممارسات، من خلال استقطاب الكفاءات
                  والمحافظة عليها، وتطوير قدراتها، وتحفيزها، وإدارة أدائها بكفاءة وشفافية، وتبني
                  التحول الرقمي والتحسين المستمر، بما يدعم تحقيق الأهداف الاستراتيجية للجامعة ويرفع
                  جودة الأداء المؤسسي.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">الأهداف</h3>
              <NumList items={[
                'استقطاب واستبقاء الكفاءات الأكاديمية والإدارية وفق أسس الكفاءة والجدارة.',
                'تطوير القدرات الوظيفية من خلال تنفيذ برامج تدريب وتأهيل مستدامة تلبي الاحتياجات الفعلية.',
                'تعزيز ثقافة التميز المؤسسي والتحسين المستمر في جميع خدمات الموارد البشرية.',
                'تطوير وتطبيق أنظمة حديثة لإدارة وتقييم الأداء وربطها بالتطوير الوظيفي والحوافز.',
                'التحول الرقمي وأتمتة خدمات وإجراءات الموارد البشرية بما يسهم في رفع الكفاءة وسرعة الإنجاز.',
                'تعزيز رضا العاملين من خلال تحسين بيئة العمل، وترسيخ مبادئ العدالة والشفافية والمشاركة.',
                'دعم التخطيط الاستراتيجي للقوى العاملة والإحلال الوظيفي.',
                'تعزيز الالتزام بالتشريعات والسياسات والأنظمة النافذة، وتطبيق مبادئ الحوكمة وإدارة المخاطر.',
                'رفع كفاءة التواصل بين وحدة الموارد البشرية والعمادات والكليات والوحدات والدوائر والمراكز المختلفة في الجامعة.',
                'دعم تحقيق رؤية ورسالة الجامعة من خلال تطوير رأس المال البشري باعتباره الركيزة الأساسية للتميز والابتكار.'
              ]} />
            </div>
          </div>
        );

      case 'about-brief':
        return (
          <div className="space-y-8">
            <PageTitle title="نبذة عن وحدة الموارد البشرية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/hr/PublishingImages/audit.jpg" alt="وحدة الموارد البشرية" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                أنشئت دائرة شؤون العاملين عام 1985 وتم تغيير مسماها إلى دائرة الموارد البشرية عام 2013
                وتم تغيير مسماها الى وحدة الموارد البشرية 2022.
              </p>
              <p>
                تعد وحدة الموارد البشرية الجهة المسؤولة عن تنفيذ سياسة الجامعة من حيث توفير الكوادر
                البشرية، والأكاديمية، والإدارية، والفنية اللازمة.
              </p>
            </Prose>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">وتضطلع الدائرة بالمهام التالية</h3>
              <NumList items={[
                'المشاركة في إعداد الخطط الهادفة لتأهيل العاملين في الجامعة، ورفع مستوى أدائهم الوظيفي.',
                'متابعة تقديم الخدمات التالية للعاملين من حيث: إجراءات التعيين، التأمين الصحي، التأمين على الحياة، الضمان الاجتماعي، ومتابعة لجان التحقيق مع الموظفين وتنفيذ القرارات الصادرة عن اللجان.',
                'متابعة وإدخال الإجازات السنوية، والمرضية، ودون راتب، والتفرغ العلمي على النظام الخاص بوحدة الموارد البشرية، وإدخال ومعالجة البيانات للموظفين وأعضاء هيئة التدريس.',
                'الاحتفاظ بملفات جميع موظفي الجامعة الإداريين، ومتابعة تجديد العقود، والترفيعات، والزيادات السنوية.',
                'الاحتفاظ بملفات أعضاء الهيئة التدريسية، ومتابعة تجديد العقود، والزيادات السنوية، وتنفيذ قرارات مجلس العمداء، ومتابعة مباشرات العمل بداية كل فصل دراسي لأعضاء هيئة التدريس.',
                'مخاطبة ديوان الخدمة المدنية، وهيئة اعتماد مؤسسات التعليم العالي وضمان جودتها، ووزارة التعليم العالي والبحث العلمي، ووزارة العمل، ووزارة الداخلية، للحصول على توصيات لغايات تجديد التعاقد مع المحاضرين المتفرغين غير الأردنيين، وتجديد إذن الإقامة وتصريح العمل.',
                'إعداد قرارات صرف العلاوات والمكافآت لأعضاء هيئة التدريس والإداريين.',
                'متابعة تنفيذ أعمال لجنة شؤون الموظفين، ولجنة التأمين الصحي.',
                'إعداد وتنفيذ الدورات للموظفين الإداريين في الجامعة.',
                'متابعة الإجازات السنوية وفقاً للنظام الالكتروني (البصمة).',
                'تحديث حوسبة أعمال الوحدة وفقاً للمستجدات ومتابعتها.',
                'إعداد التقارير السنوية للعاملين في الجامعة، ومتابعتها وحفظها في سجلاتهم.',
                'المشاركة في اللجان التي تشكلها رئاسة الجامعة.'
              ]} />
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-8">
            <PageTitle title="إتصل بنا" />
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 flex flex-col gap-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                <div><p className="font-bold text-[#0f3057] mb-0.5">هاتف</p><p className="text-gray-600" dir="ltr">+(962) 3 2372380</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                <div><p className="font-bold text-[#0f3057] mb-0.5">البريد الإلكتروني</p><p className="text-gray-600" dir="ltr">hr@mutah.edu.jo</p></div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                <div><p className="font-bold text-[#0f3057] mb-0.5">العنوان</p><p className="text-gray-600">جامعة مؤتة — الكرك :: الأردن</p></div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, HR_LINKS)} sub="وحدة الموارد البشرية" />
          </div>
        );
    }
  };
  return (
    <DeanshipShell
      brand="وحدة الموارد البشرية"
      tagline="إدارة شؤون العاملين وأعضاء هيئة التدريس، والتأهيل والتدريب، والتأمين الصحي والضمان الاجتماعي."
      heroImage="https://www.mutah.edu.jo/ar/hr/PublishingImages/hr-003.jpg"
      links={HR_LINKS} activeItem={activeItem} setActiveItem={setActiveItem}
    >{render()}</DeanshipShell>
  );
}

/* ══════════════════════════════════════════
   وحدة المكتبة
══════════════════════════════════════════ */
const LIB_LINKS: NavLink[] = [
  { id: 'home', name: 'الرئيسية' },
  {
    id: 'about', name: 'عن المكتبة',
    children: [
      { id: 'about-brief', name: 'نبذة' },
      { id: 'about-vision', name: 'الرؤية' },
      { id: 'about-director', name: 'مدير المكتبة' },
      { id: 'about-structure', name: 'الهيكل التنظيمي' },
      { id: 'about-regulations', name: 'تعليمات خدمات المكتبة' },
      { id: 'about-staff', name: 'الموظفون' }
    ]
  },
  {
    id: 'elibrary', name: 'المكتبة الإلكترونية',
    children: [
      { id: 'el-inside', name: 'قواعد البيانات من داخل الجامعة' },
      { id: 'el-outside', name: 'قواعد البيانات من خارج الجامعة', url: 'https://regweb.mutah.edu.jo/menu' },
      { id: 'el-guide', name: 'تعليمات الدخول من خارج الجامعة' }
    ]
  },
  { id: 'building', name: 'دليل مبنى المكتبة' },
  { id: 'catalog', name: 'فهرس المكتبة', url: 'http://ihip.jopuls.org.jo/web/mu' },
  { id: 'related', name: 'مواقع ذات علاقة' },
  { id: 'gallery', name: 'معرض الصور', url: 'https://www.mutah.edu.jo/ar/library/Photos/Forms/SlideShow.aspx' },
  { id: 'contact', name: 'إتصل بنا' }
];

const LIB_NEWS = [
  { t: 'إعلان توفير تطبيق التشريح الطبي Complete Anatomy لفترة تجريبية', d: '13/11/2025' },
  { t: 'IET Inspec — ادخل للتسجيل في ورشة عمل قاعدة', d: '30/4/2025' },
  { t: 'توفر مواقع الكترونية عربية تحتوي مصادر معلومات عربية', d: '27/5/2024' },
  { t: 'الموسوعة المرئية متاحة على صفحة المكتبة', d: '21/5/2024' },
  { t: 'تغيرات ادارية في وحدة المكتبة', d: '18/4/2024' },
  { t: 'إتاحة قاعدة بيانات IOP science', d: '2/3/2020' },
  { t: 'إتاحة قاعدة بيانات J-Gate', d: '20/1/2020' },
  { t: 'محاضرة حول كيفية استخدام المكتبة الالكترونية لطلبة كلية الصيدلة', d: '14/10/2019' },
  { t: 'تعليمات الغرامات الجديدة', d: '22/8/2019' },
  { t: 'وصول الموسوعة الفلسطينية اهداء من مركز التميز', d: '21/8/2019' }
];

const LIB_ANNOUNCE = [
  { t: 'تعتذر المكتبة عن استقبال روادها في تاريخ 2024/6/5', d: '30/5/2024' },
  { t: 'تعتذر المكتبة عن استقبال روادها في تاريخ 2024/6/9', d: '28/5/2024' },
  { t: 'اعلان من مكتبة جامعة مؤتة للطلبة واعضاء الهيئة التدريسية', d: '2/4/2020' }
];

export function LibraryUnit() {
  const [activeItem, setActiveItem] = useTabRoute('home');
  const render = () => {
    switch (activeItem) {
      case 'home':
        return (
          <div className="space-y-10">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/library/PublishingImages/Library2.jpg" alt="المكتبة الرئيسية في جامعة مؤتة" className="w-full max-h-[420px] object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">روابط سريعة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <LinkRow name="قواعد البيانات من داخل الجامعة" url="http://www.mutah.edu.jo/ar/library/Lists/AnnualSubscriptions/Annual.aspx" />
                <LinkRow name="قواعد البيانات من خارج الجامعة" url="https://regweb.mutah.edu.jo/" />
                <LinkRow name="فهرس المكتبة" url="http://ihip.jopuls.org.jo/web/mu" />
                <LinkRow name="معرض الصور" url="https://www.mutah.edu.jo/ar/library/Photos/Forms/SlideShow.aspx" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-[#0f3057]">أخبار وأحداث</h3>
                <Link to="/u-list/lib-news" className="text-[13px] font-bold text-[#0f3057] hover:text-[#c9a227] border border-gray-200 hover:border-[#c9a227] rounded-xl px-4 py-2 transition-colors">جميع الأخبار</Link>
              </div>
              <div className="flex flex-col gap-3">
                {LIB_NEWS.map((n, i) => (
                  <Link key={n.t} to={'/u-item/lib-news/' + i} className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-4 hover:border-[#c9a227] transition-colors">
                    <span className="w-1.5 h-10 rounded-full bg-[#c9a227] shrink-0" />
                    <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-snug">{n.t}</p>
                    <span className="text-xs font-bold text-gray-400 shrink-0" dir="ltr">{n.d}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold text-[#0f3057]">إعلانات</h3>
                <Link to="/u-list/lib-ann" className="text-[13px] font-bold text-[#0f3057] hover:text-[#c9a227] border border-gray-200 hover:border-[#c9a227] rounded-xl px-4 py-2 transition-colors">جميع الاعلانات</Link>
              </div>
              <div className="flex flex-col gap-3">
                {LIB_ANNOUNCE.map((n, i) => (
                  <Link key={n.t} to={'/u-item/lib-ann/' + i} className="flex items-start gap-4 bg-[#F8FAFC] border border-gray-100 rounded-2xl px-6 py-4 hover:border-[#c9a227] transition-colors">
                    <span className="w-1.5 h-10 rounded-full bg-[#0f3057] shrink-0" />
                    <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-relaxed">{n.t}</p>
                    <span className="text-xs font-bold text-gray-400 shrink-0" dir="ltr">{n.d}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">جديد المكتبة — وصل حديثاً</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {['palistine.jpg','book6.jpg','book7.png','book8.png','book9.png','book10.png','book5.png','book2.jpg','book3.jpg'].map((b) => (
                  <div key={b} className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 aspect-[3/4]">
                    <img src={`https://www.mutah.edu.jo/ar/library/PublishingImages/${b}`} alt="وصل حديثاً" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-8">
            <PageTitle title="إتصل بنا" />
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 flex flex-col gap-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                <div><p className="font-bold text-[#0f3057] mb-0.5">هاتف</p><p className="text-gray-600" dir="ltr">+(962) 3 2372380</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                <div><p className="font-bold text-[#0f3057] mb-0.5">البريد الإلكتروني</p><p className="text-gray-600" dir="ltr">libdir@mutah.edu.jo</p></div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                <div><p className="font-bold text-[#0f3057] mb-0.5">العنوان</p><p className="text-gray-600">جامعة مؤتة — الكرك :: الأردن</p></div>
              </div>
            </div>
          </div>
        );
      case 'el-guide':
        return (
          <div className="space-y-8">
            <PageTitle title="تعليمات الدخول من خارج الجامعة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/library/PublishingImages/libraryimage/collection%20databases4.jpg" alt="قواعد البيانات" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p className="font-bold text-[#0f3057]">
                للدخول الى قواعد البيانات من خارج الجامعة من خلال البوابة الجديدة يتطلب ذلك الخطوات
                التالية:
              </p>
            </Prose>
            <NumList items={[
              'مراجعة مركز الحاسوب للحصول على البريد الالكتروني الخاص بالمستفيد (خاص بالطلبة).',
              'يتم الدخول على بوابة قواعد البيانات من خارج الجامعة (البوابة الجديدة) وانشاء حساب خاص بك من خلال الضغط على «تسجيل حساب جديد» الموجود في اعلى الصفحة.',
              'يتم إدخال المعلومات الخاصة بالمستفيد بالإضافة إلى البريد الإلكتروني الرسمي الخاص بالمستفيد مع مراعاة الارشادات والتعليمات ثم الضغط على زر تقديم.',
              'بعد اتمام العملية بنجاح يقوم المستفيد بالدخول على البريد الالكتروني لمعرفة اسم الدخول وكلمة السر المصرح بها والتي تكون موجودة على شكل رسالة مرسلة من المصدر.',
              'بعد ذلك يتم العودة الى بوابة قواعد البيانات الجديدة والضغط على زر الدخول وادخال اسم المستخدم وكلمة السر ومن ثم الدخول، لتظهر بعد ذلك الصفحة الخاصة بالمستفيد تحتوي جميع قواعد البيانات التي تشترك بها مكتبة جامعة مؤتة بالإضافة الى قواعد البيانات التجريبية المتاحة لفترة محددة.'
            ]} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <LinkRow name="البوابة الجديدة لقواعد البيانات" url="http://mutah.coe.deep-knowledge.net/MUT" />
              <LinkRow name="تسجيل حساب جديد" url="http://mutah.coe.deep-knowledge.net/register" />
            </div>
          </div>
        );

      case 'building': {
        const FLOORS = [
          { f: 'الطابق الأرضي', groups: [
            { t: 'إدارة المكتبة', items: ['مدير وحدة المكتبة', 'مساعد مدير وحدة المكتبة', 'سكرتير مدير الوحدة', 'ديوان المكتبة', 'الطباعة'] },
            { t: 'الدائرة الفنية', items: ['شعبة التزويد', 'شعبة الفهرسة والتصنيف', 'شعبة التجليد'] },
            { t: 'دائرة الخدمات المكتبية', items: ['شعبة الإعارة', 'شعبة الرفوف', 'استعلامات المكتبة', 'كاونتر الاعارة', 'رفوف الكتب العربية من 001 ولغاية 658'] }
          ] },
          { f: 'الطابق الأول', groups: [
            { t: '', items: ['رفوف الكتب العربية من 658 ولغاية 999', 'رفوف الكتب الاجنبية من 001 ولغاية 999', 'قاعات المطالعة'] }
          ] },
          { f: 'الطابق الثاني', groups: [
            { t: 'دائرة المكتبة الالكترونية', items: ['شعبة الدعم الفني', 'شعبة قواعد البيانات', 'مختبر الانترنت وقواعد البيانات'] },
            { t: 'شعبة الدوريات / الدائرة الفنية', items: ['الدوريات الاجنبية', 'الدوريات العربية', 'قاعات المطالعة'] }
          ] },
          { f: 'الطابق الثالث', groups: [
            { t: 'شعبة المراجع / دائرة الخدمات الفنية', items: ['المراجع العربية', 'المراجع الأجنبية', 'قاعات المطالعة'] }
          ] },
          { f: 'طابق التسوية', groups: [
            { t: '', items: ['شعبة الوثائق والمخطوطات / دائرة الخدمات الفنية', 'قاعة الرسائل الجامعية', 'القاعة الهاشمية', 'فرع الأهداء والتبادل / الدائرة الفنية', 'مستودع اللوازم والاثاث', 'مندوب اللوازم', 'مستودع كتب', 'التصوير الفوتوستاتي / دائرة الخدمات الفنية'] }
          ] }
        ];
        return (
          <div className="space-y-8">
            <PageTitle title="دليل مبنى المكتبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/library/PublishingImages/libraryimage/library%20image3.jpg" alt="مبنى المكتبة" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="flex flex-col gap-6">
              {FLOORS.map((fl) => (
                <div key={fl.f} className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
                  <div className="bg-[#0f3057] text-white px-6 py-2.5 rounded-xl font-bold mb-6 inline-block">{fl.f}</div>
                  <div className="flex flex-col gap-5">
                    {fl.groups.map((g, gi) => (
                      <div key={gi}>
                        {g.t && <p className="font-bold text-[#c9a227] mb-3">{g.t}</p>}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                          {g.items.map((it) => (
                            <div key={it} className="flex items-center gap-2.5 bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227] shrink-0" />
                              <span className="text-sm text-gray-700 leading-snug">{it}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'el-inside': {
        const GROUPS = [
          { g: 'قواعد بيانات مركز التميز', items: [
            { n: 'WILEY', u: 'https://www.wileyonlinelibrary.com/' },
            { n: 'Springer', u: 'https://www.springer.com/gp/?countryChanged=true' },
            { n: 'Scopus', u: 'https://www.scopus.com/search/form.uri?display=basic' },
            { n: 'EBSCO', u: 'https://search.ebscohost.com/' },
            { n: 'دليل وفهرس الموسوعة المرئية', u: 'https://vpedia.net/guide/' },
            { n: 'ProQuest Ebook Central', u: 'https://ebookcentral.proquest.com/lib/mutahu-ebooks/home.action?ebraryDocId=null' },
            { n: 'QARARK', u: 'http://Static.qarark.com' },
            { n: 'Deepknowledge database', u: 'https://mutah.coe.deep-knowledge.net/MUT' },
            { n: 'قاعدة بيانات قسطاس', u: 'https://qistas.com/ar/search' },
            { n: 'مكتبة جامعة الشرق الاوسط للتجارب المخبرية الصيدلانية', u: 'https://www.meu.edu.jo/experiment-library/' },
            { n: 'The Biomedical & Life Sciences Collections — قاعدة تجريبية في العلوم الطبية والصحية', u: 'https://hstalks.com/biosci/' },
            { n: 'The Business & Management Collection — قاعدة تجريبية في مجال الادارة والاعمال', u: 'https://hstalks.com/business/' },
            { n: 'أفلام الموسوعة المرئية', u: 'https://vpedia.net/login/?enlogin=Mutahmedia&enlog=Mutahmedia' },
            { n: 'JSTOR', u: 'https://www.jstor.org/' }
          ] },
          { g: 'قواعد بيانات اشتراكات الجامعة', items: [
            { n: 'مجلة أفكار', u: 'https://culture.gov.jo/AR/List/%D9%85%D8%AC%D9%84%D8%A9_%D8%A3%D9%81%D9%83%D8%A7%D8%B1' },
            { n: 'E-MAREFA (فترة تجريبية)', u: 'http://search.emarefa.net' },
            { n: 'Dar Almandumah', u: 'http://search.mandumah.com/' },
            { n: 'المكتبة العربية الرقمية (رسائل جامعية)', u: 'https://dlib.yu.edu.jo/' },
            { n: 'ProQuest dissertations & theses', u: 'https://www.proquest.com/pqdtglobal?accountid=36459' },
            { n: 'Emerald', u: 'https://www.emeraldinsight.com/' },
            { n: 'SciFinder (للتسجيل)', u: 'https://scifinder.cas.org/registration/index.html' },
            { n: 'SciFinder', u: 'https://scifinder-n.cas.org' },
            { n: 'معجم الدوحة العربي', u: 'http://www.dohadictionary.org/' },
            { n: 'الدوريات المصرية', u: 'https://journals.ekb.eg/' },
            { n: 'أرشيف الشارخ للمجلات الأدبية والثقافية العربية', u: 'https://archive.alsharekh.org/' },
            { n: 'كتاب بيديا للكتب العربية', u: 'https://ketabpedia.com/' }
          ] },
          { g: 'المجلات العلمية', items: [
            { n: 'مجلة مؤتة للعلوم الانسانية والاجتماعية', u: 'https://dsr.mutah.edu.jo/index.php/hsss' },
            { n: 'مجلة جامعة مؤتة للعلوم الطبيعية والتطبيقية', u: 'https://dsr.mutah.edu.jo/index.php/nass' },
            { n: 'المجلة الأردنية في اللغة العربية وآدابها', u: 'https://dsr.mutah.edu.jo/index.php/jjall' },
            { n: 'المجلة الأردنية في القانون والعلوم السياسية', u: 'https://dsr.mutah.edu.jo/index.php/jjlps' },
            { n: 'المجلة الأردنية للطاقة', u: 'https://dsr.mutah.edu.jo/index.php/jje' },
            { n: 'مجلة الألوكة للمعرفة', u: 'https://www.alukah.net/culture/1180' }
          ] }
        ];
        return (
          <div className="space-y-8">
            <PageTitle title="الاشتراكات السنوية" sub="قواعد البيانات من داخل الجامعة" />
            <div className="flex flex-col gap-8">
              {GROUPS.map((g) => (
                <div key={g.g}>
                  <div className="bg-[#0f3057] text-white px-6 py-3 rounded-xl font-bold mb-4 inline-block">{g.g}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {g.items.map((l) => <LinkRow key={l.n} name={l.n} url={l.u} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'related':
        return (
          <div className="space-y-8">
            <PageTitle title="مواقع ذات علاقة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/library/PublishingImages/Universities2.png" alt="مواقع ذات علاقة" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { n: 'دائرة المكتبة الوطنية', u: 'http://www.nl.gov.jo/' },
                { n: 'جمعية المكتبات والمعلومات الأردنية', u: 'http://www.jlia.org/' },
                { n: 'مكتبة الجامعة الاردنية', u: 'http://library.ju.edu.jo/AR-library/AR-Library.aspx' },
                { n: 'مكتبة جامعة اليرموك', u: 'https://library.yu.edu.jo/' },
                { n: 'مكتبة جامعة العلوم والتكنولوجيا', u: 'http://www.just.edu.jo/ar/library/Pages/default.aspx' },
                { n: 'مكتبة الجامعة الهاشمية', u: 'https://hu.edu.jo/units_en/?unitid=41000000' },
                { n: 'مكتبة جامعة الطفيلة التقنية', u: 'http://www.ttu.edu.jo/library' },
                { n: 'مكتبة جامعة الحسين بن طلال', u: 'http://www.ahu.edu.jo/TheLibraryAr.aspx' },
                { n: 'مكتبة الجامعة الالمانية الاردنية', u: 'http://www.gju.edu.jo/content/library-439' },
                { n: 'مكتبة جامعة البلقاء التطبيقية', u: 'http://bau.coe.deep-knowledge.net/BAU' },
                { n: 'مكتبة جامعة آل البيت', u: 'https://web2.aabu.edu.jo/faculties_site/arabic/index.jsp?menu_id=1&site_no=100069&col_id=0&dept_id=0' }
              ].map((l) => <LinkRow key={l.n} name={l.n} url={l.u} />)}
            </div>
          </div>
        );

      case 'about-regulations':
        return (
          <div className="space-y-8">
            <PageTitle title="تعليمات خدمات المكتبة" sub="وحدة المكتبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/library/PublishingImages/library.jpg" alt="تعليمات خدمات المكتبة" className="w-full max-h-[420px] object-cover" />
            </div>
            <DocRow name="تعليمات خدمات المكتبات" url="https://www.mutah.edu.jo/ar/library/Documents/library%20instruction%20and%20rules.pdf" />
          </div>
        );

      case 'about-director':
        return (
          <div className="space-y-8">
            <PageTitle title="مدير وحدة المكتبة" />
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 shrink-0 bg-gray-50 rounded-3xl p-5 border border-gray-100 text-center">
                <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-[#0f3057]">
                  <img src="https://www.mutah.edu.jo/ar/library/PublishingImages/Manager.png" alt="مدير وحدة المكتبة" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-[#0f3057] leading-snug">الدكتور خالد عبده الصرايرة</h3>
                <p className="text-[#c9a227] font-bold text-sm mt-1">مدير وحدة المكتبة</p>
              </div>
              <div className="w-full md:w-2/3 flex flex-col gap-6">
                <Prose>
                  <p className="font-bold text-[#0f3057] text-lg">كلمة ترحيبية</p>
                  <p>
                    إنه لمن دواعي فخرنا واعتزازنا أن تكون المكتبة مصدر إشعاع معرفي ومركز معلومات متقدم
                    لإغراض الدراسة والبحث العلمي من خلال خدمات المكتبة الالكترونية المتطورة وفقاً لأحدث
                    المعايير الدولية من خلال استخدام وسائل الاتصال الحديثة التي تفتح آفاقاً واسعة لوسائل
                    المعرفة المتطورة.
                  </p>
                  <div className="pt-4 border-t border-gray-100 mt-4">
                    <p className="font-bold text-[#c9a227]">الدكتور خالد عبده الصرايرة</p>
                  </div>
                </Prose>
                <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 flex flex-col gap-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-[#0f3057] mb-0.5">العنوان</p>
                      <p className="text-gray-600 leading-relaxed">مؤتة (61710) — الكرك، الأردن · صندوق بريد: (5)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-[#0f3057] mb-0.5">هاتف</p>
                      <p className="text-gray-600 leading-relaxed" dir="ltr">+962 3 2372380 / 99 — فرعي (6096) و (6095)</p>
                      <p className="text-gray-600 leading-relaxed" dir="ltr">خلوي: 00962796363999</p>
                      <p className="text-gray-600 leading-relaxed" dir="ltr">فاكس: +962 3 2375703</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-[#0f3057] mb-0.5">البريد الإلكتروني</p>
                      <p className="text-gray-600" dir="ltr">libdir@mutah.edu.jo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'about-brief':
        return (
          <div className="space-y-8">
            <PageTitle title="عن المكتبة" sub="نبذة عن المكتبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/library/PublishingImages/library.jpg" alt="مكتبة جامعة مؤتة" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                تأسست المكتبة عام 1981 وتعد انطلاقتها الأولى في موقع الجامعة الدائم عام 1984، ويتبع
                لها المكتبات الفرعية التالية:
              </p>
            </Prose>
            <NumList items={[
              'مكتبة الجناح العسكري.',
              'مكتبة كلية الأميرة منى للتمريض والمهن الطبية المساندة، وموقعها مدينة الحسين الطبية / عمان.',
              'المكتبة الطبية لكليتي (الطب والتمريض)، وموقعها في منطقة المشيرفة / الكرك.',
              'مكتبة كلية الزراعة، وموقعها في بلدة الربة / لواء القصر / الكرك.',
            ]} />
            <Prose>
              <p>
                وتتولى مكتبة الجامعة تزويد كل من المكتبات الفرعية بالمواد المكتبية بعد معالجتها،
                والإشراف على الأنظمة وحوسبتها.
              </p>
              <p>
                وتمشياً مع تكنولوجيا المكتبة الإلكترونية، بدأت المكتبة منذ عام 2006م استخدام نظام
                حاسوبي متكامل يُعرف بنظام الأفق (Horizon) في جميع خدماتها الفنية والمكتبية، ويستطيع
                الباحث من خلاله البحث عن أي مواد معرفية يريد الحصول عليها من أي من مكتبات الجامعات
                الأردنية الحكومية، علماً أن جميع بيانات المكتبة متاحة من خلال شبكة الإنترنت وموقعها
                الإلكتروني.
              </p>
            </Prose>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">المقتنيات</h3>
              <Prose>
                <p>
                  بلغ العدد الإجمالي لمقتنيات المكتبة (728.150) مادة مكتبية، منها (345.300) مجلداً
                  باللغة العربية، و(104.850) مجلداً باللغات الأجنبية، و(7.000) مجلد دوريات،
                  و(8.000) مادة من الخرائط والنشرات والتقارير والأفلام والأقراص المدمجة والأشرطة.
                </p>
                <p>
                  كما يرد المكتبة حوالي (215) دورية عربية منتظمة، منها (65) دورية تشترك بها المكتبة
                  سنوياً، و(150) دورية على سبيل الإهداء والتبادل.
                </p>
              </Prose>
            </div>
          </div>
        );

      case 'about-vision':
        return (
          <div className="space-y-8">
            <PageTitle title="الرؤية والرسالة والأهداف" sub="وحدة المكتبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/library/PublishingImages/library%20image5.jpg" alt="الرؤية والرسالة والأهداف" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5"><Eye className="w-7 h-7 text-[#c9a227]" /></div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">الرؤية</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  الارتقاء بالمكتبة الى مستوى المكتبات العالمية في مجال إدارة المكتبات ومصادر المعلومات.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5"><Target className="w-7 h-7 text-[#c9a227]" /></div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">الرسالة</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  تقديم الخدمات المكتبية للطلبة وأعضاء الهيئتين التدريسية والادارية وأعضاء المجتمع
                  المحلي وذلك بتوفير ما يلزمهم من مواد مكتبية بمختلف اشكالها بتخزينها وتنظيمها وتسهيل
                  اجراءات الاستفادة منها.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">الاهداف</h3>
              <NumList items={[
                'الاستمرار في تنمية محتويات المكتبة وتنوع مقتنياتها التقليدية والالكترونية وتنظيم المواد المكتبية بفهرستها وتصنيفها واعداد الكشافات والمستخلصات، وتعزيز دورها الثقافي في خدمة المجتمع المحلي وذلك باختيار المواد التي تتلائم مع احتياجات المستفيدين.',
                'تحقيق أفضل معايير جودة الخدمات ومواكبة الجديد في مجال علم المكتبات والمعلومات.',
                'تطوير النظم المتبعة حاليا في الخدمات الفنية والمكتبية والمعلوماتية وصولا إلى المكتبة الالكترونية.',
                'رفع كفاءة الأداء المهني والإداري للعاملين في المكتبة من خلال إشراكهم بالدورات التدريبية وورش العمل المكتبية.',
                'تقديم الخدمات المكتبية التي تتضمن خدمات الاعارة الداخلية والخارجية وخدمات المراجع وخدمات التصوير الفوتوستاتي، والمخطوطات والمجموعات الخاصة والوثائق والقاعة الهاشمية.'
              ]} />
            </div>
          </div>
        );

      case 'about-structure':
        return (
          <div className="space-y-8">
            <PageTitle title="الهيكل التنظيمي" sub="وحدة المكتبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white p-4">
              <img src="https://www.mutah.edu.jo/ar/library/SiteAssets/Pages/Forms/EditForm/a0629fee-b834-4c3c-8653-f6224f983d3e.jpg" alt="الهيكل التنظيمي لوحدة المكتبة" className="w-full max-h-[560px] object-contain" />
            </div>
          </div>
        );

      case 'related':
        return (
          <div className="space-y-8">
            <PageTitle title="مواقع ذات علاقة" sub="وحدة المكتبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/library/PublishingImages/Universities2.png" alt="مواقع ذات علاقة" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { n: 'دائرة المكتبة الوطنية', u: 'http://www.nl.gov.jo/' },
                { n: 'جمعية المكتبات والمعلومات الأردنية', u: 'http://www.jlia.org/' },
                { n: 'مكتبة الجامعة الاردنية', u: 'http://library.ju.edu.jo/AR-library/AR-Library.aspx' },
                { n: 'مكتبة جامعة اليرموك', u: 'https://library.yu.edu.jo/' },
                { n: 'مكتبة جامعة العلوم والتكنولوجيا', u: 'http://www.just.edu.jo/ar/library/Pages/default.aspx' },
                { n: 'مكتبة الجامعة الهاشمية', u: 'https://hu.edu.jo/units_en/?unitid=41000000' },
                { n: 'مكتبة جامعة الطفيلة التقنية', u: 'http://www.ttu.edu.jo/library' },
                { n: 'مكتبة جامعة الحسين بن طلال', u: 'http://www.ahu.edu.jo/TheLibraryAr.aspx' },
                { n: 'مكتبة الجامعة الالمانية الاردنية', u: 'http://www.gju.edu.jo/content/library-439' },
                { n: 'مكتبة جامعة البلقاء التطبيقية', u: 'http://bau.coe.deep-knowledge.net/BAU' },
                { n: 'مكتبة جامعة آل البيت', u: 'https://web2.aabu.edu.jo/faculties_site/arabic/index.jsp?menu_id=1&site_no=100069&col_id=0&dept_id=0' }
              ].map((l) => <LinkRow key={l.n} name={l.n} url={l.u} />)}
            </div>
          </div>
        );

      case 'about-staff':
        return (
          <div className="space-y-8">
            <PageTitle title="الموظفون" sub="وحدة المكتبة — جامعة مؤتة" />
            {[
              { group: 'الإدارة', rows: [['ق. أ. مدير وحدة المكتبة','خالد عبده الصرايرة','6096',''], ['مساعد مدير الوحدة','سامي الطراونة','',''], ['مساعد المدير','عاطف الحرازنة','','']] },
              { group: 'دائرة المكتبة الالكترونية', rows: [['ق. أ. مدير دائرة المكتبة الالكترونية / رئيس شعبة قواعد البيانات','وصفي أحمد المبيضين','3464','wasfimu78@mutah.edu.jo']] },
              { group: 'الدائرة الفنية', rows: [['ق. أ. مدير الدائرة الفنية','محمود يوسف الصرايرة','',''], ['رئيس شعبة الدوريات','فراس ابو عين','3464',''], ['ر. فرع الدوريات العربية','رضوان محمد البشابشة','',''], ['ر. فرع تزويد الكتب العربية','هيام هجهوج الذنيبات','',''], ['ر. فرع تزويد الكتب الاجنبية','وزيره عبدالله الطراونه','',''], ['ر. فرع فهرسة الكتب العربية','فايز سلامه الطراونة','',''], ['موظفة تزويد','أماني حسين الشمايلة','','']] },
              { group: 'دائرة الخدمات المكتبية', rows: [['ق. أ. مدير دائرة الخدمات المكتبية','اديب عبدالله النوايسه','',''], ['رئيس شعبة الاعارة','عدنان هايل المجالي','4253',''], ['رئيس شعبة العلاقات','عامر احمد المحادين','',''], ['رئيس شعبة المراجع','ماهر عبدالمجيد البطوش','',''], ['رئيس شعبة التصوير','محمد عبدالرحمن الطراونة','',''], ['موظف مكتبة','سامي عبدالمسيح الزريقات','',''], ['موظف مكتبة','خلدون عبدالرحمن السحيمات','',''], ['رئيس شعبة الرفوف','كمال صالح العضايلة','',''], ['موظف مكتبة','محمد خليفه الصرايرة','',''], ['ر. فرع التجليد','ايمن عبدالرزاق الصرايرة','',''], ['ر. فرع الإرشاد','رامي حسن قعقور','',''], ['ر. فرع العلاقات','محمد عبدالوهاب الطراونة','','']] },
              { group: 'دائرة المكتبات الفرعية', rows: [['ق. أ. مدير دائرة المكتبات الفرعية','مشعل محمد المجالي','',''], ['رئيس شعبة كلية الحقوق','اسمهان سليمان القطاونة','',''], ['ق. أ. رئيس شعبة مكتبة كلية الزراعة','احلام الرهايفة','',''], ['موظف مكتبة كلية الزراعة','جعفر المجالي','','']] },
              { group: 'الديوان', rows: [['ق. بأعمال رئيس الديوان','مها الطراونة','',''], ['سكرتير','بلال معزي البيايضه','',''], ['عامل','هارون خلف الصرايرة','',''], ['أمين مستودع','عبدالله أحمد المبيضين','','']] },
            ].map((sec: any, si: number) => (
              <section key={si}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-1.5 h-6 rounded-full bg-[#c9a227] block" />
                  <h3 className="text-[17.5px] font-bold text-[#0f3057]">{sec.group}</h3>
                  <span className="text-xs font-bold text-gray-400">{sec.rows.length}</span>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-gray-100">
                  <table className="w-full text-right border-collapse min-w-[640px]">
                    <thead>
                      <tr className="bg-[#0f3057]">
                        {['المسمى الوظيفي', 'الاسم', 'الهاتف', 'البريد الإلكتروني'].map((c) => (
                          <th key={c} className="px-5 py-3.5 text-[13.5px] font-bold text-white whitespace-nowrap">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sec.rows.map((r: string[], i: number) => (
                        <tr key={i} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-5 py-3.5 text-[14px] text-gray-600 border-t border-gray-100 leading-relaxed">{r[0]}</td>
                          <td className="px-5 py-3.5 text-[14.5px] font-semibold text-[#0f3057] border-t border-gray-100">{r[1]}</td>
                          <td className="px-5 py-3.5 text-[13.5px] text-gray-600 border-t border-gray-100" dir="ltr">{r[2] || '—'}</td>
                          <td className="px-5 py-3.5 text-[13px] text-gray-600 border-t border-gray-100" dir="ltr">{r[3] || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}
          </div>
        );

      case 'el-guide':
        return (
          <div className="space-y-8">
            <PageTitle title="تعليمات الدخول من خارج الجامعة" sub="قواعد البيانات الإلكترونية" />
            <Prose>
              <p className="font-bold text-[#0f3057]">
                للدخول الى قواعد البيانات من خارج الجامعة يتطلب ذلك الخطوات التالية:
              </p>
            </Prose>
            <NumList items={[
              'مراجعة مركز الحاسوب للحصول على البريد الالكتروني الخاص بالمستفيد (خاص بالطلبة).',
              'الدخول على بوابة قواعد البيانات من خارج الجامعة وانشاء حساب خاص بك من خلال الضغط على «تسجيل حساب جديد».',
              'إدخال المعلومات الخاصة بالمستفيد بالإضافة إلى البريد الإلكتروني الرسمي مع مراعاة الارشادات والتعليمات ثم الضغط على زر تقديم.',
              'بعد اتمام العملية بنجاح يقوم المستفيد بالدخول على بريده الالكتروني لمعرفة اسم الدخول وكلمة السر المصرح بها.',
              'العودة الى بوابة قواعد البيانات والضغط على زر الدخول وادخال اسم المستخدم وكلمة السر، لتظهر الصفحة الخاصة بالمستفيد وتحتوي جميع قواعد البيانات التي تشترك بها مكتبة جامعة مؤتة بالإضافة الى قواعد البيانات التجريبية المتاحة لفترة محددة.'
            ]} />
            <LinkRow name="بوابة قواعد البيانات من خارج الجامعة" url="https://regweb.mutah.edu.jo/menu" />
          </div>
        );

      case 'building': {
        const FLOORS = [
          { f: 'الطابق الأرضي', groups: [
            { t: 'إدارة المكتبة', items: ['مدير وحدة المكتبة', 'مساعد مدير وحدة المكتبة', 'سكرتير مدير الوحدة', 'ديوان المكتبة', 'الطباعة'] },
            { t: 'الدائرة الفنية', items: ['شعبة التزويد', 'شعبة الفهرسة والتصنيف', 'شعبة التجليد'] },
            { t: 'دائرة الخدمات المكتبية', items: ['شعبة الإعارة', 'شعبة الرفوف', 'استعلامات المكتبة', 'كاونتر الإعارة', 'رفوف الكتب العربية من 001 ولغاية 658'] }
          ] },
          { f: 'الطابق الأول', groups: [
            { t: '', items: ['رفوف الكتب العربية من 658 ولغاية 999', 'رفوف الكتب الأجنبية من 001 ولغاية 999', 'قاعات المطالعة'] }
          ] },
          { f: 'الطابق الثاني', groups: [
            { t: 'دائرة المكتبة الإلكترونية', items: ['شعبة الدعم الفني', 'شعبة قواعد البيانات', 'مختبر الإنترنت وقواعد البيانات'] },
            { t: 'شعبة الدوريات / الدائرة الفنية', items: ['الدوريات الأجنبية', 'الدوريات العربية', 'قاعات المطالعة'] }
          ] },
          { f: 'الطابق الثالث', groups: [
            { t: 'شعبة المراجع / دائرة الخدمات الفنية', items: ['المراجع العربية', 'المراجع الأجنبية', 'قاعات المطالعة'] }
          ] },
          { f: 'طابق التسوية', groups: [
            { t: '', items: ['شعبة الوثائق والمخطوطات / دائرة الخدمات الفنية', 'قاعة الرسائل الجامعية', 'القاعة الهاشمية', 'فرع الإهداء والتبادل / الدائرة الفنية', 'مستودع اللوازم والأثاث', 'مندوب اللوازم', 'مستودع كتب', 'التصوير الفوتوستاتي / دائرة الخدمات الفنية'] }
          ] }
        ];
        return (
          <div className="space-y-8">
            <PageTitle title="دليل مبنى المكتبة" sub="وحدة المكتبة" />
            <div className="flex flex-col gap-6">
              {FLOORS.map((fl) => (
                <div key={fl.f} className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
                  <div className="bg-[#0f3057] text-white px-6 py-2.5 rounded-xl font-bold mb-6 inline-block">{fl.f}</div>
                  <div className="flex flex-col gap-5">
                    {fl.groups.map((g, gi) => (
                      <div key={gi}>
                        {g.t && <p className="font-bold text-[#c9a227] mb-3">{g.t}</p>}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                          {g.items.map((it) => (
                            <div key={it} className="flex items-center gap-2.5 bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227] shrink-0" />
                              <span className="text-sm text-gray-700 leading-snug">{it}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      default:
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, LIB_LINKS)} sub="وحدة المكتبة" />
          </div>
        );

    }
  };
  return (
    <DeanshipShell
      brand="وحدة المكتبة"
      tagline="المكتبة الرئيسية في جامعة مؤتة — مصادر المعلومات وقواعد البيانات الإلكترونية وخدمات الباحثين."
      heroImage="https://www.mutah.edu.jo/ar/library/PublishingImages/Library3.jpg"
      links={LIB_LINKS} activeItem={activeItem} setActiveItem={setActiveItem}
    >{render()}</DeanshipShell>
  );
}

/* ══════════════════════════════════════════
   وحدة الصيانة والخدمات الهندسية
══════════════════════════════════════════ */
const MNT_LINKS: NavLink[] = [
  { id: 'home', name: 'الرئيسية' },
  { id: 'vision', name: 'رؤيتنا ورسالتنا وقيمنا' },
  { id: 'depts', name: 'دوائر الوحدة' },
  { id: 'directors', name: 'مدراء الدوائر' }
];

export function MaintenanceUnit() {
  const [activeItem, setActiveItem] = useTabRoute('home');
  const DEPTS = ['دائرة الابنية والانشاءات', 'دائرة الكهرباء', 'دائرة المتابعة', 'دائرة الميكانيك', 'دائرة الاتصالات', 'دائرة المكتب الهندسي'];
  const DIRECTORS = [
    { name: 'المهندس ناصر بن طريف', role: 'مدير الوحدة — ومدير دائرة الاتصالات' },
    { name: 'المهندس خالد جميل العضايلة', role: 'مدير دائرة الابنية والانشاءات' },
    { name: 'المهندس محمد الشنابلة', role: 'قائم بأعمال مدير دائرة المكتب الهندسي' },
    { name: 'السيد أحمد طاهر محمود', role: 'مدير دائرة الكهرباء' },
    { name: 'السيد حسام محمد السوادحة', role: 'مدير دائرة الميكانيك' },
    { name: 'السيد طلعت المبيضين', role: 'قائم بأعمال مدير دائرة المتابعة' }
  ];
  const render = () => {
    switch (activeItem) {
      case 'vision':
        return (
          <div className="space-y-8">
            <PageTitle title="رؤيتنا ورسالتنا وقيمنا" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5"><Eye className="w-7 h-7 text-[#c9a227]" /></div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">رُؤيتُنا</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  تطمح جامعة مؤتة أن تكون منافسة ورائدة في التعليم والتعلّم، والبحث العلمي، والتنمية
                  الاقتصادية والاجتماعية المستدامة.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5"><Target className="w-7 h-7 text-[#c9a227]" /></div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">رِسالتُنا</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  توفير بيئة جامعية تعزِّز منظومة الريادة والابتكار، وتدعم قدرات التعليم والتعلّم
                  المتميزتين، والبحث العلمي التطبيقي، وتحقق التنمية المستدامة للمجتمع، وتؤهل خريجين
                  قادرين على مواجهة تحديات الحياة، والمنافسة في سوق العمل المحلي والإقليمي والعالمي.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">قِيَمُنا</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['التحسين المستمر', 'المسؤولية المجتمعية'].map((v) => (
                  <div key={v} className="flex items-center gap-2.5 bg-[#F8FAFC] border border-gray-100 rounded-xl px-5 py-3.5">
                    <CheckCircle size={16} className="text-[#c9a227] shrink-0" />
                    <span className="text-sm font-semibold text-gray-700">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'depts':
        return (
          <div className="space-y-8">
            <PageTitle title="دوائر الوحدة" sub="تتكون الوحدة من ٦ دوائر" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DEPTS.map((d, i) => (
                <div key={d} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:border-[#c9a227] transition-colors">
                  <span className="w-9 h-9 rounded-lg bg-[#0f3057] text-[#c9a227] text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="font-bold text-[#0f3057] text-sm leading-snug">{d}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'directors':
        return (
          <div className="space-y-8">
            <PageTitle title="مدراء الدوائر" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DIRECTORS.map((m) => (
                <div key={m.name} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0f3057] flex items-center justify-center shrink-0"><Users className="w-5 h-5 text-[#c9a227]" /></div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-[#0f3057] text-[15px] leading-snug mb-1.5">{m.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-10">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/PublishingImages/maintainance.jpg" alt="وحدة الصيانة والخدمات الهندسية" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-gradient-to-l from-[#8a6d1f] to-[#c9a227] rounded-3xl p-8">
              <p className="text-white/80 text-xs font-bold mb-2">مدير الوحدة</p>
              <h3 className="text-white text-2xl font-bold">المهندس ناصر بن طريف</h3>
            </div>
            <Prose>
              <p>
                أنشئت وحدة الصيانة والادامة في عام ١٩٩٣ وتم اعادة الهيكلة للوحدة لتضم المكتب الهندسي
                عام ٢٠٢٢ حيث اصبحت تسمى وحدة الصيانة والخدمات الهندسية، حيث تتكون من ٦ دوائر وهي:
                (دائرة الابنية والانشاءات، دائرة الكهرباء، دائرة المتابعة، دائرة الميكانيك، دائرة
                الاتصالات، دائرة المكتب الهندسي).
              </p>
              <p>
                تقوم وحدة الصيانة بعدد كبير من الواجبات والمهام التي تتمثل بصيانة وإدامة منشآت الجامعة
                ومبانيها وتطوير البنية التحتية لمختلف مرافق الجامعة وتشغيل جميع الانظمة الكهربائية
                والميكانيكية والصحية والاتصالات وتقديم جميع اعمال الصيانة.
              </p>
            </Prose>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">دوائر الوحدة ومدراؤها</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {DIRECTORS.map((m) => (
                  <div key={m.name} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#0f3057] flex items-center justify-center shrink-0"><Users className="w-5 h-5 text-[#c9a227]" /></div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-[#0f3057] text-[15px] leading-snug mb-1.5">{m.name}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{m.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };
  return (
    <DeanshipShell
      brand="وحدة الصيانة والخدمات الهندسية"
      tagline="صيانة وإدامة منشآت الجامعة وتطوير بنيتها التحتية وتشغيل أنظمتها الكهربائية والميكانيكية والاتصالات."
      heroImage="https://www.mutah.edu.jo/PublishingImages/maintainance.jpg"
      links={MNT_LINKS} activeItem={activeItem} setActiveItem={setActiveItem}
    >{render()}</DeanshipShell>
  );
}

/* ══════════════════════════════════════════
   وحدة التواصل وخدمة المجتمع المحلي
══════════════════════════════════════════ */
const CEDU_LINKS: NavLink[] = [
  { id: 'home', name: 'الرئيسية' },
  {
    id: 'about', name: 'عن الوحدة',
    children: [
      { id: 'about-director', name: 'كلمة المدير' },
      { id: 'about-vision', name: 'الرؤية، الرسالة، الاهداف' },
      { id: 'about-plan', name: 'الخطة الإستراتيجية' },
      { id: 'about-directors', name: 'مدراء الوحدة' },
      { id: 'about-staff', name: 'الكادر الإداري' },
      { id: 'about-structure', name: 'الهيكل التنظيمي' }
    ]
  },
  {
    id: 'activities', name: 'نشاطات الوحدة',
    children: [
      { id: 'act-initiatives', name: 'مبادرات' },
      { id: 'act-projects', name: 'مشاريع' },
      { id: 'act-programs', name: 'برامج' }
    ]
  },
  {
    id: 'depts', name: 'الدوائر',
    children: [
      {
        id: 'dep-outreach', name: 'دائرة التواصل المجتمعي',
        children: [
          { id: 'out-comm', name: 'شعبة التواصل المجتمعي' },
          { id: 'out-archive', name: 'شعبة المتابعة والارشفة' }
        ]
      },
      {
        id: 'dep-initiatives', name: 'دائرة المبادرات والانشطة المجتمعية',
        children: [
          { id: 'ini-support', name: 'شعبة الدعم المجتمعي' },
          { id: 'ini-activities', name: 'شعبة المبادرات والانشطة المجتمعية' }
        ]
      }
    ]
  },
  { id: 'partners', name: 'الشراكات' },
  { id: 'incubator', name: 'حاضنة الأعمال' },
  { id: 'innovation', name: 'مختبر الابداع' },
  { id: 'faq', name: 'الأسئلة الشائعة' },
  { id: 'gallery', name: 'معرض الصور' },
  { id: 'eservices', name: 'الخدمات الإلكترونية' },
  { id: 'contact', name: 'إتصل بنا' }
];

export function CommunityServiceUnit() {
  const [activeItem, setActiveItem] = useTabRoute('home');
  const render = () => {
    switch (activeItem) {
      case 'home':
        return (
          <div className="space-y-10">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/CEDU/PublishingImages/slide10.jpg" alt="وحدة التواصل وخدمة المجتمع المحلي" className="w-full max-h-[420px] object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">أخبار وأحداث</h3>
              <div className="flex flex-col gap-3">
                {ITEMS['comm-news'].items.map((n, i) => (
                  <Link key={i} to={'/u-item/comm-news/' + i} className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-4 hover:border-[#c9a227] transition-colors">
                    <span className="w-1.5 h-10 rounded-full bg-[#c9a227] shrink-0" />
                    <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-snug">{n.t}</p>
                    <span className="text-xs font-bold text-gray-400 shrink-0" dir="ltr">{n.d}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">إعلانات</h3>
              <div className="flex flex-col gap-3">
                {ITEMS['comm-ann'].items.map((n, i) => (
                  <Link key={i} to={'/u-item/comm-ann/' + i} className="flex items-start gap-4 bg-[#F8FAFC] border border-gray-100 rounded-2xl px-6 py-4">
                    <span className="w-1.5 h-10 rounded-full bg-[#0f3057] shrink-0" />
                    <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-relaxed">{n.t}</p>
                    <span className="text-xs font-bold text-gray-400 shrink-0" dir="ltr">{n.d}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">روابط سريعة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <LinkRow name="التعليم الالكتروني" url="https://www.mutah.edu.jo/Pages/E-Learninig.aspx" />
                <LinkRow name="الخدمات الالكترونية" url="http://portal1.mutah.edu.jo/eservice/faces/loginView" />
                <LinkRow name="دليل الحصول على الايميل وكلمة السر لمنصة Microsoft Teams" url="https://www.mutah.edu.jo/ar/ELCenter/Documents/Microsoft%20teams.pdf" />
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-8">
            <PageTitle title="إتصل بنا" />
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 flex flex-col gap-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                <div><p className="font-bold text-[#0f3057] mb-0.5">هاتف</p><p className="text-gray-600" dir="ltr">+(962) 3 2372380 / 3755</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                <div><p className="font-bold text-[#0f3057] mb-0.5">البريد الإلكتروني</p><p className="text-gray-600" dir="ltr">community.service@mutah.edu.jo</p></div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                <div><p className="font-bold text-[#0f3057] mb-0.5">العنوان</p><p className="text-gray-600">جامعة مؤتة — الكرك :: الأردن</p></div>
              </div>
            </div>
          </div>
        );
      case 'act-projects':
      case 'dep-outreach':
      case 'dep-initiatives':
      case 'out-comm':
      case 'out-archive':
      case 'ini-support':
      case 'ini-activities':
      case 'partners':
      case 'incubator':
      case 'innovation':
      case 'faq':
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, CEDU_LINKS)} sub="وحدة التواصل وخدمة المجتمع المحلي" />
            <div className="bg-[#F8FAFC] border border-dashed border-gray-200 rounded-3xl p-12 text-center">
              <Building2 size={28} className="text-gray-400 mx-auto mb-4" />
              <p className="text-xl font-bold text-[#0f3057]">تحت الإنشاء</p>
            </div>
          </div>
        );

      case 'about-plan':
        return (
          <div className="space-y-8">
            <PageTitle title="الاستراتيجية" sub="وحدة التواصل وخدمة المجتمع المحلي" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/CEDU/PublishingImages/biz-services.jpg" alt="الخطة الاستراتيجية" className="w-full max-h-[380px] object-cover" />
            </div>
            <DocRow name="الخطة الاستراتيجية 2023 - 2025" url="https://www.mutah.edu.jo/ar/CEDU/SiteAssets/Pages/Forms/EditForm/%d8%a7%d9%84%d8%ae%d8%b7%d8%a9%20%d8%a7%d9%84%d8%a7%d8%b3%d8%aa%d8%b1%d8%a7%d8%aa%d9%8a%d8%ac%d9%8a%d8%a9%202023%20-%202025.pdf" />
          </div>
        );

      case 'about-directors':
        return (
          <div className="space-y-8">
            <PageTitle title="مدراء الوحدة" sub="مجلس وحدة التواصل وخدمة المجتمع المحلي" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[["نائب رئيس الجامعة - رئيس المجلس","أ.د. محمد المجالي","6014"],["عميد كلية الدراسات العليا","أ.د. مخلد الطراونة","6131"],["عميد كلية تكنولوجيا المعلومات","أ.د. محمد العبادي","6050"],["عميد كلية الهندسة","أ.د محمد الصرايرة","6125"],["عميد كلية العلوم التربوية","أ.د. عبدالله الجراح","6035"],["عميد كلية العلوم الاجتماعية","أ.د. سطام الشقور","6051"],["مدير مركز التعليم الإلكتروني","د. عبادة الحباشنة","6246"],["مدير مركز الحاسوب","السيد المعتز ممدوح المبيضين","6083"],["ممثل عن القطاع الخاص","الدكتور فهمي البلاونة",""]].map((d: string[], i: number) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#0f3057] flex items-center justify-center flex-shrink-0 text-[#c9a227] font-bold">{i + 1}</div>
                  <div>
                    <p className="text-[15px] font-bold text-[#0f3057] leading-relaxed">{d[1]}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{d[0]}</p>
                    {d[2] && <p className="text-xs font-bold text-[#c9a227] mt-2">هاتف: <span dir="ltr">{d[2]}</span></p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'act-programs':
        return (
          <div className="space-y-8">
            <PageTitle title="برامج" sub="نشاطات وحدة التواصل وخدمة المجتمع المحلي" />
            <NumList items={["دورة مجانية بعنوان (السلامة والصحة المهنية والعامة) بواقع (9 ساعات) (31/11/2023) للمعلمين من كافة مديريات التربية والتعليم في محافظة الكرك.","دورة مجانية بعنوان (التوعية والتشخيص المبكر لاضطرابات التوحد) (6-29 أيار 2024).","ندوة الجريمة لدى الشباب: الواقع والأسباب وطرق الوقاية والعلاج، من خلال متخصصين من أساتذة الجامعة والمجتمع المحلي (16/12/2024).","ورشة عمل بعنوان: أخلاقيات النشر الإلكتروني بالتعاون مع وحدة الجرائم الإلكترونية، 2024.","ورشة عمل بعنوان: ترشيد استهلاك المياه والفاقد في ضوء القراءة الجديدة للعدادات الحديثة، بالتعاون مع سلطة مياه الكرك (26/11/2024).","ندوة بعنوان: تحصين الأسر وحمايتها من آفة المخدرات بالتعاون مع إدارة مكافحة المخدرات للعاملات في الجامعة وعدد من طلبة المدارس (19/2/2025).","دورة بعنوان: (مهارات الاتصال والتواصل) بالتعاون مع كلية الحقوق لعدد من أبناء المجتمع المحلي في مختلف الدوائر في محافظة الكرك وعدد من طلبة الجامعة.","المشاركة في العديد من اللقاءات والندوات والمحاضرات داخل وخارج الجامعة حول مختلف القضايا مثل: العنف بأشكاله، ونبذ التطرف والكراهية.","هناك عدد من الأعمال ستقوم بها الوحدة في المستقبل وحسب خطتها الاستراتيجية في إطار الخطة الاستراتيجية العامة للجامعة.","مشاركة وحدة التواصل وخدمة المجتمع المحلي في جامعة مؤتة بالجلسة الحوارية التي نفذتها جمعية شقيرا للتنمية الاجتماعية بالتعاون مع جمعية جوناف."]} />
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-8">
            <PageTitle title="معرض الصور" sub="وحدة التواصل وخدمة المجتمع المحلي" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {["1.1","1.2","1.3","1.4","1.5","1.6","1.7","1.8","1.9","2.1","2.2","2.3","2.4","2.5","2.6","2.7","2.8","2.9","3.1","3.2","3.3","3.4","3.5","3.6","3.7","3.8","3.9","4.1","4.2","4.4","4.6","4.7","4.8","4.9","5.1","5.2","5.3","5.4","5.5","5.6","5.7","5.8","5.9","6.1","6.2","6.3","6.4","6.6","6.7","6.8","6.9","7.1","7.2","7.3","7.4","7.7","7.8","7.9","9.2","9.3","9.4","9.5","9.6","9.7","10.1","10.2","10.3","10.4","u1","u2"].map((n: string) => (
                <a key={n} href={"https://www.mutah.edu.jo/ar/CEDU/SiteAssets/Pages/Forms/EditForm/" + n + '.jpg'} target="_blank" rel="noopener noreferrer" className="block rounded-2xl overflow-hidden border border-gray-100 bg-gray-100 aspect-[4/3]">
                  <img src={"https://www.mutah.edu.jo/ar/CEDU/SiteAssets/Pages/Forms/EditForm/" + n + '.jpg'} alt={'صورة ' + n} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </a>
              ))}
            </div>
          </div>
        );

      case 'eservices':
        return (
          <div className="space-y-8">
            <PageTitle title="الخدمات الإلكترونية" sub="أدلة التعليم الإلكتروني والسياسات" />
            <div className="flex flex-col gap-3">
              {[["دليل الطالب في استخدام التيمز","PDF","https://www.mutah.edu.jo/ar/ELCenter/Documents/1-1.pdf"],["ادخال معلومات المدرس على نظام المدرسين","PDF","https://www.mutah.edu.jo/ar/ELCenter/Documents/1-2.pdf"],["دليل الطالب لاستخدام منصة Moodle","PDF","https://www.mutah.edu.jo/ar/ELCenter/Documents/1-3.pdf"],["دليل المدرس في استخدام برنامج التيمز","PDF","https://www.mutah.edu.jo/ar/ELCenter/Documents/1-4.pdf"],["دليل المدرس في استخدام منصة Moodle","PDF","https://www.mutah.edu.jo/ar/ELCenter/Documents/1-5.pdf"],["طريقة تسجيل المحاضرة على برنامج التيمز","PDF","https://www.mutah.edu.jo/ar/ELCenter/Documents/1-6.pdf"],["طريقه اعطاء الطالب صلاحيات تنزيل التسجيل المحاضرة","PDF","https://www.mutah.edu.jo/ar/ELCenter/Documents/1-7.pdf"],["دليل انشاء امتحان على نظام التعليم الالكتروني","فيديو","https://www.youtube.com/watch?v=v8IR_pWiz6o&t=59s"],["دليل اعدادات الامتحانات - منصة التعلم الإلكتروني","فيديو","https://www.youtube.com/watch?v=wRwtJQlYdv0"],["دليل ادخال الاسئلة على الامتحان","فيديو","https://www.youtube.com/watch?v=fQK3lpuTz8M"],["دليل انشاء انواع مختلفة من الاسئلة","فيديو","https://www.youtube.com/watch?v=GACHIPCUZ4A"],["دليل التعامل مع ملف نتائج الطلبة ومعالجة المشاكل","فيديو","https://www.youtube.com/watch?v=xQ0z2-gcMdU"],["دليل تحميل الملفات على منصة التعلم الإلكتروني","فيديو","https://www.youtube.com/watch?v=Uc2vfAoDdck"],["دليل التعليم الإلكتروني ومصادر التعلم","PDF","https://www.mutah.edu.jo/ar/ELCenter/Documents/ELCenter.pdf"],["دليل الحصول على الايميل وكلمة السر لمنصة Microsoft Teams","PDF","https://www.mutah.edu.jo/ar/ELCenter/Documents/Microsoft%20teams.pdf"],["طريقة عمل وظائف للطلبة (Assignment) على منظومة التعليم الالكتروني","فيديو","https://www.youtube.com/watch?v=vYzIQxQE4jk"],["تقسيم طلبة الشعبة الواحدة الى مجموعات Groups على نظام التعليم الالكتروني","فيديو","https://youtu.be/Pl9gBWne7H0"],["دليل تفعيل فرق التيمز للطلبة","فيديو","https://www.youtube.com/watch?v=Zxu9vTJZ-Y8"],["سياسة تطوير المحتوى الإلكتروني في جامعة مؤته","PDF","https://www.mutah.edu.jo/ar/ELCenter/Documents/s12.pdf"],["سياسة الاستخدام المقبول لمصادر التعلم الالكتروني","PDF","https://www.mutah.edu.jo/ar/ELCenter/Documents/AUP_EC.pdf"],["انشاء الفئات في الامتحان","فيديو","https://www.youtube.com/watch?v=vtX7mIZjjHU"],["الاسئلة المتكررة لبرنامج الدبلوم العالي للتربية","PDF","https://www.mutah.edu.jo/ar/ELCenter/Documents/qr.pdf"]].map((d: string[], i: number) => (
                <DocRow key={i} name={d[0]} type={d[1]} url={d[2]} />
              ))}
            </div>
          </div>
        );

      case 'act-initiatives':
        return (
          <div className="space-y-8">
            <PageTitle title="مبادرات" sub="نشاطات وحدة التواصل وخدمة المجتمع المحلي" />
            <NumList items={[
              'حملة توزيع مادة التمر في شهر رمضان المبارك بالتنسيق مع مديريات التنمية في محافظة الكرك (3–8 كانون الثاني 2024).',
              'مبادرة كسوة الشتاء لعدد من الأسر العفيفة بالتعاون مع جمعية الرحمة ومديريات التنمية الاجتماعية (12–2024).',
              'رعاية الفعاليات مع مؤسسات المجتمع المدني — حفل تكريم المدارس الفائزة في مسابقة اولمبياد الجغرافيا / منطقة محي (8 أيار 2024).',
              'تقديم طرود الخير بالتعاون مع الجمعية الخيرية الهاشمية (خلال شهر رمضان المبارك) تتمثل بمواد عينية لعدد من المحتاجين، من بين ذلك عدد من موظفي الجامعة.',
              'رعاية الفعاليات مع مؤسسات المجتمع المدني / يوم الطفولة / مدرسة إمرع الثانوية (أيار 2024).',
              'أيام طبية مجانية لمنطقة القطرانة، وفقوع (2023).',
              'يوم للدعم النفسي لطلبة مدرسة سيل الحسا الثانوية المختلطة.',
              'استقبال زيارات المدارس ومراكز الشباب وتقديم شرح مفصل عن مسيرة الجامعة وتطورها (18–7–2023).',
              'استقبال ممثلين عن عشائر محافظة الكرك واعطاء فكرة عامة عن الجامعة وانجازاتها ومعوقاتها المالية.',
              'استقبال عدد كبير من طلبة المدارس في محافظة الكرك والقيام بشرح مفصل عن بدايات تأسيس الجامعة ومراحل تطورها وعدد كلياتها وبرامجها الدراسية المستقبلية التي تحاكي المراحل القادمة من توجيه وطني نحو التخصصات المهنية التي يتطلبها سوق العمل.',
              'تنفيذ حملة تحسين وتجميل البوابة الشمالية للجامعة بالتعاون مع جمعية البيئة الاردنية 2024.',
              'مبادرة (جامعتي أحلى) بالتعاون مع وحدة الخدمات وإذاعة صوت الكرك ودائرة العلاقات وبعض كليات الجامعة — حملة نظافة شاملة داخل الحرم الجامعي وخارجه (البوابات الشمالية والجنوبية)، انطلاقاً من مسؤوليتنا المجتمعية ورؤية الجامعة في تعزيز قيم العمل التطوعي والحفاظ على البيئة، يومي الأحد والاثنين 11–12/5/2025م.',
              'المشاركة في عدد من الفعاليات الوطنية داخل وخارج الجامعة.'
            ]} />
          </div>
        );

      case 'about-structure':
        return (
          <div className="space-y-8">
            <PageTitle title="الهيكل التنظيمي" sub="وحدة التواصل وخدمة المجتمع المحلي" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white p-4">
              <img src="https://www.mutah.edu.jo/ar/CEDU/SiteAssets/Pages/Forms/EditForm/OS.jpg" alt="الهيكل التنظيمي للوحدة" className="w-full max-h-[560px] object-contain" />
            </div>
          </div>
        );

      case 'about-staff':
        return (
          <div className="space-y-8">
            <PageTitle title="الموظفون" sub="الكادر الإداري في وحدة التواصل وخدمة المجتمع المحلي" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { role: 'مساعد الرئيس للاتصال المجتمعي / مدير وحدة التواصل وخدمة المجتمع المحلي', name: 'د. قبلان الخرشة' },
                { role: 'مدير دائرة المبادرات والأنشطة المجتمعية', name: 'د. رياض أبو سمهدانة' },
                { role: 'رئيس شعبة التواصل المجتمعي', name: 'عمر الصرايره' },
                { role: 'رئيس شعبة الدعم المجتمعي', name: 'أروى الحطيبات', ext: '3757' },
                { role: 'رئيس شعبة متابعة شؤون الخريجين', name: 'منار الصرايرة' }
              ].map((m, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-start gap-4 hover:shadow-md hover:border-[#c9a227]/40 transition-all">
                  <div className="w-12 h-12 rounded-full bg-[#0f3057] flex items-center justify-center shrink-0"><Users className="w-5 h-5 text-[#c9a227]" /></div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-[#c9a227] mb-1.5 leading-relaxed">{m.role}</p>
                    <h3 className="font-bold text-[#0f3057] text-[15px] leading-snug mb-1">{m.name}</h3>
                    {m.ext && <span className="text-xs text-gray-500" dir="ltr">هاتف {m.ext}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'about-vision':
        return (
          <div className="space-y-8">
            <PageTitle title="الرؤية، الرسالة، الاهداف" sub="وحدة التواصل وخدمة المجتمع المحلي" />
            <div className="flex flex-col gap-5">
              {['New%20Project1.jpg', 'r2.png', 'r3.png'].map((f) => (
                <div key={f} className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white p-4">
                  <img src={`https://www.mutah.edu.jo/ar/CEDU/SiteAssets/Pages/Forms/EditForm/${f}`} alt="الرؤية والرسالة والأهداف" className="w-full max-h-[560px] object-contain" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'about-director':
        return (
          <div className="space-y-8">
            <PageTitle title="نبذة عن الوحدة" sub="كلمة مدير وحدة التواصل وخدمة المجتمع المحلي / جامعة مؤتة" />
            <Prose>
              <p>
                الحمد لله الذي بنعمته تتم الصالحات، والصلاة والسلام على النبي العربي الهاشمي الأمين،
                وعلى آله وصحبه أجمعين.
              </p>
              <p>
                في ظلّ التوجيهات الملكية السامية، وفي إطار سعي جامعة مؤتة إلى تعزيز دورها الوطني
                والتنموي، تأتي وحدة التواصل وخدمة المجتمع المحلي كحلقة وصل أساسية بين الجامعة والمجتمع،
                تسعى إلى البناء والتأثير والتفاعل الإيجابي في محافظة الكرك ومحيطها.
              </p>
              <p>
                إننا في هذه الوحدة نؤمن بأن دور الجامعة لا يقتصر على التعليم والبحث العلمي، بل يتعداه
                إلى التفاعل الحقيقي مع احتياجات المجتمع، وتقديم المبادرات والمشاريع التي تساهم في تحقيق
                التنمية المستدامة، وتعزز من قيم المواطنة والانتماء، وتفتح آفاق الحوار والشراكة بين
                مختلف الجهات الرسمية والأهلية.
              </p>
              <p>
                وقد عملنا خلال الفترة الماضية، ونعمل باستمرار، على بناء شبكة من العلاقات مع مؤسسات
                الدولة وهيئات المجتمع المدني، وإطلاق دراسات وفعاليات تخدم القطاعات الحيوية في المحافظة،
                إلى جانب تنفيذ استطلاعات رأي ومسوحات ميدانية تساعد في رسم صورة واقعية للتحديات والفرص.
              </p>
              <p>
                كل الشكر والتقدير لرئاسة الجامعة، ممثلة بعطوفة رئيس الجامعة ونائب الرئيس للشؤون
                الإدارية والمالية، على دعمهم الموصول، ولكل الزملاء العاملين في الوحدة على جهودهم
                وإخلاصهم، ولكل شركائنا في المجتمع المحلي، الذين نراهم جزءاً أصيلاً من رؤية الجامعة
                ورسالتها.
              </p>
              <p className="font-bold text-[#0f3057]">
                معاً نعمل، ومعاً ننهض بمحافظتنا ووطننا العزيز. والسلام عليكم ورحمة الله وبركاته.
              </p>
              <div className="pt-4 border-t border-gray-100 mt-4">
                <p className="font-bold text-[#c9a227]">الدكتور قبلان الخرشه</p>
                <p className="text-sm text-gray-600">مساعد الرئيس للتواصل المجتمعي — مدير وحدة التواصل وخدمة المجتمع المحلي</p>
              </div>
            </Prose>
          </div>
        );

      case 'about-director':
      case 'about-vision':
      case 'about-plan':
      case 'about-directors':
      case 'about-staff':
      case 'about-structure':
      case 'act-initiatives':
      case 'act-projects':
      case 'act-programs':
      case 'dep-outreach':
      case 'dep-initiatives':
      case 'out-comm':
      case 'out-archive':
      case 'ini-support':
      case 'ini-activities':
      case 'partners':
      case 'incubator':
      case 'innovation':
      case 'faq':
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, CEDU_LINKS)} sub="وحدة التواصل وخدمة المجتمع المحلي" />
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, CEDU_LINKS)} sub="وحدة التواصل وخدمة المجتمع المحلي" />
          </div>
        );
    }
  };
  return (
    <DeanshipShell
      brand="وحدة التواصل وخدمة المجتمع المحلي"
      tagline="مبادرات ومشاريع وبرامج تربط الجامعة بمجتمعها المحلي، وحاضنة أعمال ومختبر إبداع."
      heroImage="https://www.mutah.edu.jo/ar/CEDU/PublishingImages/slide11.png"
      links={CEDU_LINKS} activeItem={activeItem} setActiveItem={setActiveItem}
    >{render()}</DeanshipShell>
  );
}

/* ══════════════════════════════════════════
   المدرسة النموذجية
══════════════════════════════════════════ */
const SCH_LINKS: NavLink[] = [
  { id: 'home', name: 'الرئيسية' },
  {
    id: 'about', name: 'عن المدرسة',
    children: [
      { id: 'about-brief', name: 'نبذة تعريفية' },
      { id: 'about-director', name: 'كلمة مدير المدرسة' },
      { id: 'about-board', name: 'مجلس الإدارة' },
      { id: 'about-strategy', name: 'استراتيجية المدرسة' },
      { id: 'about-admin', name: 'الكادر الإداري' },
      { id: 'about-teachers', name: 'الكادر التدريسي' },
      { id: 'about-former', name: 'المدراء السابقون' }
    ]
  },
  {
    id: 'regulations', name: 'الأنظمة و التعليمات',
    children: [
      { id: 'reg-discipline', name: 'الأنضباط المدرسي' },
      { id: 'reg-uniform', name: 'الزي و التأخير' },
      { id: 'reg-conduct', name: 'مدونة سلوك الطلبة' }
    ]
  },
  {
    id: 'admission', name: 'القبول',
    children: [
      { id: 'adm-application', name: 'طلب التحاق' },
      { id: 'adm-fees', name: 'الرسوم المدرسية' },
      { id: 'adm-marks', name: 'موقع علامات الطالب' }
    ]
  },
  { id: 'activities', name: 'الأنشطة و الفعاليات' },
  { id: 'parliament', name: 'البرلمان الطلابي' },
  { id: 'forms', name: 'النماذج' },
  { id: 'contact', name: 'إتصل بنا' }
];

export function ModelSchoolUnit() {
  const [activeItem, setActiveItem] = useTabRoute('home');
  const render = () => {
    switch (activeItem) {
      case 'home':
      case 'activities':
        return (
          <div className="space-y-10">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/school/PublishingImages/school1.jpg" alt="حفل تخريج طلبة المدرسة النموذجية 2022" className="w-full max-h-[420px] object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">أخبار وأحداث</h3>
              <div className="flex flex-col gap-3">
                {ITEMS['school-news'].items.map((n, i) => (
                  <Link key={i} to={'/u-item/school-news/' + i} className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-4 hover:border-[#c9a227] transition-colors">
                    <span className="w-1.5 h-10 rounded-full bg-[#c9a227] shrink-0" />
                    <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-snug">{n.t}</p>
                    <span className="text-xs font-bold text-gray-400 shrink-0" dir="ltr">{n.d}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">إعلانات</h3>
              <div className="flex flex-col gap-3">
                {ITEMS['school-ann'].items.map((n, i) => (
                  <Link key={i} to={'/u-item/school-ann/' + i} className="flex items-start gap-4 bg-[#F8FAFC] border border-gray-100 rounded-2xl px-6 py-4">
                    <span className="w-1.5 h-10 rounded-full bg-[#0f3057] shrink-0" />
                    <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-relaxed">{n.t}</p>
                    <span className="text-xs font-bold text-gray-400 shrink-0" dir="ltr">{n.d}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">روابط سريعة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <LinkRow name="وزارة التربية والتعليم" url="https://www.moe.gov.jo" />
                <LinkRow name="منظومة الاوبن ايميس" url="https://emis.moe.gov.jo/openemis-core/" />
                <LinkRow name="صفحة المدرسة على فيسبوك" url="https://www.facebook.com/mutahuniversitymodelschooll/" />
                <LinkRow name="التقويم المدرسي" url="http://www.moe.gov.jo/ar/events" />
                <LinkRow name="موقع مدرسة جامعة مؤتة على الخريطة" url="https://goo.gl/maps/PvwNba26EUL2" />
                <LinkRow name="الخدمات الالكترونية للموظفين" url="http://portal1.mutah.edu.jo/eeservice/faces/loginView" />
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-8">
            <PageTitle title="إتصل بنا" />
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 flex flex-col gap-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                <div><p className="font-bold text-[#0f3057] mb-0.5">هاتف</p><p className="text-gray-600" dir="ltr">+(962) 3 2372380</p></div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                <div><p className="font-bold text-[#0f3057] mb-0.5">البريد الإلكتروني</p><p className="text-gray-600" dir="ltr">school@mutah.edu.jo</p></div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                <div><p className="font-bold text-[#0f3057] mb-0.5">العنوان</p><p className="text-gray-600">جامعة مؤتة — الكرك :: الأردن</p></div>
              </div>
            </div>
          </div>
        );
      case 'about-strategy':
        return (
          <div className="space-y-8">
            <PageTitle title="استراتيجية النموذجية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white p-4">
              <img src="https://www.mutah.edu.jo/ar/school/PublishingImages/49653.gif" alt="استراتيجية المدرسة النموذجية" className="w-full max-h-[560px] object-contain" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5"><Eye className="w-7 h-7 text-[#c9a227]" /></div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">رؤية النموذجية</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  إعداد جيل يتسم بالولاء والانتماء لوطنه، قادر على تحمل مسؤولياته والتكيف لمواجهة
                  التحديات المستقبلية من حوله، وقادر على توظيف التقنيات العلمية والعملية؛ ليواكب النهضة
                  التكنولوجية الحديثة بما يفيد مجتمعه ووطنه.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5"><Target className="w-7 h-7 text-[#c9a227]" /></div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">رسالة النموذجية</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  الوصول إلى المدرسة التي تركز على الإتقان وتستثمر الطاقات البشرية والمادية الموجودة
                  فيها واقعياً، لتحقيق مخرجات التعليم التي تحمل اتجاهات مجتمعية إيجابية متكيفة مع
                  متطلبات العصر وتسهم في التطوير والتميز الاجتماعي، بتوظيف فاعل ومثمر لتكنولوجيا
                  المعلومات والاتصالات في العملية التعلمية التعليمية، وتوفير بيئة تعليمية تعلمية تسهم
                  في زيادة دافعية الطلبة والمعلمين وفقاً لقدرة الطلبة الحالية.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#0f3057] mb-6">أهداف النموذجية</h3>
              <NumList items={[
                'التواصل البنّاء مع رئاسة الجامعة وكلية العلوم التربوية ومديرية التعليم الخاص لتحقيق أهداف المدرسة.',
                'التواصل مع كلية العلوم التربوية لإتاحة الفرصة لطلبة التربية العملية بتطبيق أحدث الوسائل والأساليب التربوية في المدرسة للنهوض بمستوى أداء الطلبة والمعلمين معاً لإنجازات أفضل.',
                'توفير كوادر إدارية وتعليمية تربوية مميزة بأخلاقها وسلوكها لإتاحة التعلم بالنمذجة والقدوة للطلبة.',
                'إعداد بيئة تعليمية تربوية محورها الطالب وإثراؤه بالمهارات الحياتية والتعليم المستمر مدى الحياة من خلال النشاطات اللامنهجية لكي يصبح مواطناً مسؤولاً يتحلى بالصفات القيادية.',
                'تنويع استراتيجيات القياس والتقويم المعرفي لدى الطالب لغايات النجاح الأكاديمي.',
                'الاعتناء بنمو الطلبة من النواحي الثقافية والأخلاقية والروحية بتوفير النشاطات المرافقة للمنهاج.',
                'حث الطلبة وتشجيعهم على التفوق والتميز والإبداع بالاستثمار الأمثل لقدراتهم، وتطوير مواقف إيجابية لديهم تجاه الدراسة وإدارة الوقت والتعلم الذاتي.',
                'دمج الطلبة ذوي صعوبات التعلم مع طلبة المدرسة وتوفير نشاطات تتناسب وقدراتهم في العملية التعليمية التعلمية.',
                'تفعيل دور المجتمع المحلي ومشاركة أولياء الأمور وتبادل الزيارات مع المدارس المتميزة لإثراء تقدم أداء المدرسة وتقديم التغذية الراجعة.',
                'توثيق الإنجازات المدرسية المتنوعة للطلبة والمعلمين إلكترونياً وورقياً لتحفظ في مكتبة المدرسة.',
                'تطبق إدارة المدرسة مشاريع تستحث مهارات التفكير العليا وذات صلة بالمحتوى والإجراءات.',
                'تمارس إدارة المدرسة الأدوار القيادية المطلوبة منها أمام الطلبة (تمارس ما تعلمه للطلبة).',
                'تستخدم إدارة المدرسة القيادة الإستراتيجية في إشرافها إدارياً وفنياً.',
                'تحرص إدارة المدرسة على مراجعة وتحديث أهدافها التعليمية بشكل مستمر من خلال التواصل البناء مع كل من له علاقة بأداء المدرسة.'
              ]} />
            </div>
          </div>
        );

      case 'about-director':
        return (
          <div className="space-y-8">
            <PageTitle title="كلمة مدير المدرسة" />
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 shrink-0 bg-gray-50 rounded-3xl p-5 border border-gray-100 text-center">
                <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-[#0f3057]">
                  <img src="https://www.mutah.edu.jo/ar/school/PublishingImages/Dr.maysoon.jpg" alt="مديرة المدرسة" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-[#0f3057] leading-snug">الدكتورة ميسون القضاة</h3>
                <p className="text-[#c9a227] font-bold text-sm mt-1">مديرة المدرسة</p>
              </div>
              <div className="w-full md:w-2/3">
                <Prose>
                  <p className="font-bold text-[#0f3057]">بسم الله الرحمن الرحيم</p>
                  <p>
                    الحمد لله رب العالمين والصلاة والسلام على أفضل الخلق أجمعين سيدنا محمد صلى الله
                    عليه وسلم وبعد، زملائي أعضاء الهيئة التدريسية والإدارية في مدرسة جامعة مؤتة
                    النموذجية، أبنائي الطلبة الأعزاء، أولياء امور الطلبة، نطل عليكم في بداية عام جديد
                    من خلال الموقع الالكتروني للمدرسة، عام مليء بالخير والعطاء والتفاؤل وصولاً إلى
                    تحقيق الاهداف والرؤى المستقبلية لأبنائنا الطلبة في جميع الجوانب العلمية والاجتماعية
                    والفكرية والجسدية والاخلاقية.
                  </p>
                  <p>
                    وتتميز المدرسة بالمستوى الأكاديمي العالي من خلال وجود معلمين ومعلمات من ذوي الكفاءة
                    والقدرة المهنية العالية، بالإضافة إلى وجود كادر إداري على قدرة عالية من الأداء
                    والتميز في خدمة المدرسة، فهم يعملون جميعاً دون كلل أو ملل للحفاظ على مستوى المدرسة
                    بشكل مرموق بين مدارس محافظة الكرك خاصة ومدارس المملكة عامة، ودعم تقدم أبنائنا
                    الطلبة في جميع المجالات وخدمة المجتمع المحلي والوطن الغالي.
                  </p>
                  <div className="pt-4 border-t border-gray-100 mt-4">
                    <p className="font-bold text-[#0f3057]">مديرة المدرسة</p>
                    <p className="font-bold text-[#c9a227]">الدكتورة ميسون القضاة</p>
                  </div>
                </Prose>
              </div>
            </div>
          </div>
        );

      case 'about-brief':
        return (
          <div className="space-y-8">
            <PageTitle title="نبذة عن المدرسة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/school/PublishingImages/school3.gif" alt="المدرسة النموذجية" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                تأسست مدرسة جامعة مؤتة النموذجية عام 1994م وتقوم فلسفتها على تقديم خدمات تعليمية
                وتربوية لأبناء العاملين في الجامعة وأبناء المنطقة من خلال برامج تربوية متطورة تستوعب
                المستجدات التربوية المنسجمة مع التراث العربي والإسلامي، وتعتمد في تحقيق ذلك على معلمين
                مؤهلين يخضعون لأفضل الدورات التدريبية ومناهج استمدت أصولها من تقاليد المجتمع العربي
                والإسلامي وتوفير البيئة المناسبة لتحقيق هذه الأهداف، وتم نقلها عام 2005 للمبنى الجديد
                والذي يقع في حرم جامعة مؤتة.
              </p>
              <p>
                ويشرف على نشاطات المدرسة العديد من اللجان والمجالس وهي: مجلس الإدارة المدرسية، ومجلس
                الإشراف الفني، ومجلس المنسقين، ومجلس الطلبة، بالإضافة إلى اللجان التي يشرف عليها
                المعلمون.
              </p>
              <p>
                كما وتشارك المدرسة في كل عام بالمسابقات الثقافية والدينية والرياضية على مستوى محافظة
                الكرك والمملكة بالتنسيق مع مديرية تربية لواء المزار الجنوبي، وأيضاً تقوم المدرسة بتنظيم
                رحلات وزيارات علمية وترفيهية لطلبتها في مختلف الفصول الدراسية داخل المحافظة وخارجها مع
                تأمين المواصلات.
              </p>
              <p>
                وفي المدرسة مرحلتان: مرحلة للتعليم الأساسي من الصف الأول وحتى الصف العاشر، ومرحلة
                للتعليم الثانوي للصفين الأول الثانوي والثاني الثانوي العلمي والأدبي.
              </p>
            </Prose>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { n: '838', l: 'طالباً وطالبة (2022/2023)' },
                { n: '41', l: 'شعبة صفية' },
                { n: '73', l: 'معلماً ومعلمة' }
              ].map((st) => (
                <div key={st.l} className="bg-[#0f3057] rounded-2xl p-7 text-center">
                  <span className="block text-3xl font-bold text-[#c9a227] mb-2" dir="ltr">{st.n}</span>
                  <span className="text-white text-xs leading-relaxed">{st.l}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'adm-marks':
        return (
          <div className="space-y-8">
            <PageTitle title="موقع علامات الطالب" sub="المدرسة النموذجية" />
            <p className="text-gray-700 leading-[2] text-justify">
              يتم متابعة علامات الطلبة إلكترونياً من خلال منظومة OpenEMIS التابعة لوزارة التربية والتعليم.
            </p>
            <LinkRow name="منظومة الاوبن ايميس (OpenEMIS)" url="https://emis.moe.gov.jo/openemis-core/" />
          </div>
        );

      case 'adm-fees':
        return (
          <div className="space-y-8">
            <PageTitle title="الرسوم المدرسية" sub="المدرسة النموذجية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/school/PublishingImages/fees.jpg" alt="الرسوم المدرسية" className="w-full max-h-[420px] object-cover" />
            </div>
            <DocRow name="رسوم مدرسة جامعة مؤتة النموذجية" url="https://www.mutah.edu.jo/ar/school/Documents/fees2025.pdf" />
          </div>
        );

      case 'adm-application':
        return (
          <div className="space-y-8">
            <PageTitle title="طلب التحاق" sub="المدرسة النموذجية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/school/PublishingImages/main1.jpg" alt="طلب التحاق" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-gradient-to-l from-[#8a6d1f] to-[#c9a227] rounded-3xl p-8">
              <p className="text-white text-xl font-bold leading-[2] mb-2">يرجى مراجعة المدرسة لتقديم طلب الالتحاق</p>
              <p className="text-white/90 text-lg font-bold">تم وقف قبول الطلبات الكترونياً</p>
            </div>
          </div>
        );

      case 'reg-discipline':
        return (
          <div className="space-y-8">
            <PageTitle title="الانضباط المدرسي" sub="المدرسة النموذجية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/school/PublishingImages/student3.jpg" alt="الانضباط المدرسي" className="w-full max-h-[420px] object-cover" />
            </div>
            <DocRow name="تعليمات الانضباط المدرسي 2019" url="https://www.mutah.edu.jo/ar/school/Documents/rules.pdf" />
          </div>
        );

      case 'reg-uniform':
        return (
          <div className="space-y-8">
            <PageTitle title="الزي المدرسي" sub="المدرسة النموذجية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/school/PublishingImages/student2.jpg" alt="الزي المدرسي" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p className="font-bold text-[#0f3057] text-lg">الغرض من ارتداء زي مدرسي موحد في المدرسة</p>
              <p className="font-bold">
                أو ماهي فوائد توحيد الزي في المدرسة هي فوائد وقد لا يعرفها الآباء والأمهات، فبعيداً عن
                كيفية الالتزام فالزي الموحد يعطي للطلاب هوية مدرسية، بمعنى آخر أن الطالب ينتمي إلى
                مدرسة بعينها وأنه فرد ضمن جماعة خاصة.
              </p>
            </Prose>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">فوائد أخرى قد لا تعرفها</h3>
              <NumList items={[
                'عدم الحيرة وضيق الوقت في اختيار ما ترتدي.',
                'المحافظة على جودة الملابس لفترة أطول.',
                'الزي المدرسي مريح في الحركة وعلمياً يشعر الطالب بحرية الحركة.',
                'إمكانية تداول الزي المدرسي بين أطفال الأسرة الواحدة حيث يسلم الكبير للأصغر وهكذا وبالتالي توفر على الأسرة.',
                'سهولة الإقتناع بارتداء الملابس لمعرفة الطالب أن زملاءه يرتدون نفس الملابس.',
                'تنمي روح المساواة بين كافة الطلبة فالكل يلبس نفس الملابس.',
                'تجنب ارتداء الطالب للملابس التي لا تلائم المدرسة والتي تحمل رسومات وشعارات ودعاية لشركات أجنبية وبعضها صور غير لائقة.',
                'الزي المدرسي الموحد مهم وخاصة عند تواجد الطلاب في رحلة تعليمية أو ترفيهية خارج المدرسة، حيث يسهل للمشرفين والمعلمين التعرف على الطلبة وعدم فقدان أحد وتمييزه عن الغرباء.',
                'هناك طلاب يملكون الكثير من الملابس باهظة الثمن في حين يوجد طلاب ظروفهم لا تسمح والذي قد يتعرض للسخرية من جانب الطلاب الأكثر امتلاكاً.',
                'قد تتعرض الملابس للتلف والتمزق أو تلطخها بالألوان.',
                'الكل متساوٍ لا يعرف الغني من الفقير.',
                'يستطيع الطلاب بهذا الزي المدرسي الموحد حضور الحفلات الشعبية والترفيهية والرياضة، وعدم تكليف أسرهم مبالغ مالية كبيرة في حال توفير ملابس لكل مناسبة مدرسية.',
                'هناك بعض المدارس تعطي للطالب حرية الاختيار في ما يلبس، ولكن هذا كابوس مرعب للأسرة لأنه قد يكلفها الكثير من المال بحيث يجعل الطالب يريد أن يرتدي كل يوم نوعاً معيناً.'
              ]} />
            </div>
            <div className="bg-gradient-to-l from-[#8a6d1f] to-[#c9a227] rounded-3xl p-8 text-center">
              <p className="text-white text-xl font-bold">تمنياتنا لأبنائنا عام دراسي موفق</p>
            </div>
          </div>
        );

      case 'parliament':
        return (
          <div className="space-y-8">
            <PageTitle title="البرلمان الطلابي" sub="المدرسة النموذجية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/school/PublishingImages/parlman1.jpg" alt="البرلمان الطلابي" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f3057] text-white">
                    <th className="px-5 py-3.5 text-right font-bold w-48">الصف</th>
                    <th className="px-5 py-3.5 text-right font-bold">الطالبة</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['خامس أ', 'هتون صالح البواليز'],
                    ['سادس أ', 'لينا محمد الصرايره'],
                    ['سابع أ', 'ميرا جعفر العزام'],
                    ['سابع ب', 'جنى محمد المواجده'],
                    ['ثامن أ', 'ليان محمد الصرايره'],
                    ['ثامن ب', 'رولان عاكف الجوازنه'],
                    ['تاسع أ', 'فرح ايمن الصعوب'],
                    ['تاسع ب', 'ندى مسلم الرواحنه'],
                    ['عاشر أ', 'ميسم محمد مصلح'],
                    ['اول ثانوي أ', 'يقين عاطف الصرايره'],
                    ['—', 'لينا محمد الصرايره']
                  ].map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'border-t border-gray-100 bg-white' : 'border-t border-gray-100 bg-[#F8FAFC]'}>
                      <td className="px-5 py-3.5 text-gray-600">{r[0]}</td>
                      <td className="px-5 py-3.5 font-bold text-[#0f3057]">{r[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'reg-conduct':
        return (
          <div className="space-y-8">
            <PageTitle title="مدونة السلوك" sub="المدرسة النموذجية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/school/PublishingImages/student1.jpg" alt="مدونة السلوك" className="w-full max-h-[420px] object-cover" />
            </div>
            {[
              { t: 'أولاً: في مجال الالتزام بالتعليمات والأنظمة', items: [
                'أحترم الأنظمة والتعليمات المدرسية.',
                'التزم بالزي المدرسي وأحافظ على نظافته.',
                'التزم بالحضور إلى المدرسة في الوقت المحدد.',
                'أتجنب الخروج من المدرسة قبل انتهاء الدوام المدرسي إلاّ بإذن الإدارة.',
                'التزم البقاء في الصف في أثناء الحصص وأتجنب الخروج منه إلاّ للضرورة.',
                'التزم الهدوء في أثناء الخروج من الحصص أو من المدرسة.',
                'أتجنب إثارة الفوضى داخل الصف أو خارجه.',
                'أحافظ على نظافة الصف وسلامته.',
                'أحافظ على نظافة المرافق المدرسية وتجهيزاتها.',
                'أتجنب الكتابة على الجدران أو المقاعد.',
                'أتجنب تخريب الممتلكات المدرسية أو العبث بها.',
                'أتجنب استخدام الهاتف النقال في أثناء الحصص أو الاستراحة إلاّ للضرورة القصوى مع أخذ موافقة مربي الصف أو المرشد التربوي.',
                'أتقيد بالتعليمات المنظمة لاستخدام أجهزة الحاسوب.',
                'أتجنب جلب كل ما يمنع استخدامه داخل المدرسة.',
                'أتجنب استخدام مقتنيات الآخرين بدون إذن.'
              ] },
              { t: 'ثانياً: في مجال السلوك', items: [
                'أحترم المعلم والتزم بإرشاداته.',
                'التزم بالصدق والأمانة وأدب الحديث وحُسن الخلق.',
                'أتجنب تناول الأطعمة أو المشروبات في أثناء الحصص.',
                'أتحلى بالأخلاق الحسنة ومخاطبة الجميع بأدب واحترام.',
                'أتجنب الشجار مع الزملاء أو تهديدهم أو التلفظ عليهم بألفاظ نابية.',
                'أحترم حقوق زملائي والتزم بمسؤولياتي وأطالب بحقوقي.'
              ] },
              { t: 'ثالثاً: في مجال العلاقات مع جميع أطراف العملية التربوية', items: [
                'أقوم باختيار الصديق الصالح والذي تتمثل فيه الأخلاق النبيلة.',
                'أحترم كافة أعضاء الهيئة التدريسية.',
                'أتجنب الشجار أو الاعتداء على الزملاء أو العاملين في المدرسة.',
                'أقوم بإيصال المخاطبات الخاصة بأهلي بكل أمانة.',
                'أعتذر في حالة الإساءة للزملاء أو العاملين في المدرسة.',
                'أبتعد عن رفاق السوء.',
                'أحترم حقوق الآخرين وآرائهم، بغض النظر عن جنسهم ودينهم ومعتقداتهم.'
              ] },
              { t: 'رابعاً: المجال التربوي', items: [
                'أعتمد على نفسي وأقوم بأداء الواجبات المدرسية.',
                'التزم بتسليم الواجبات المدرسية بالموعد المحدد.',
                'أقوم بمناقشة المعلم في العقبات التي تواجهني في أثناء أداء الواجبات.',
                'التزم بالتعليمات المدرسية وعدم الغش في الامتحانات المدرسية.',
                'أتابع شرح المعلم بتركيز واهتمام والتزم الهدوء في أثناء الحصة.',
                'أحضّر للمواد الدراسية حسب البرنامج المدرسي اليومي.',
                'أحافظ على الأدوات المدرسية من كتب وقرطاسية أو ملابس رياضية.',
                'أحافظ على نظافة الكتب المدرسية وعدم رميها في حال الانتهاء منها.',
                'أشارك في أنشطة المدرسة وبرامجها ومناسباتها.'
              ] }
            ].map((sec) => (
              <div key={sec.t} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-[#c9a227] mb-6">{sec.t}</h3>
                <NumList items={sec.items} />
              </div>
            ))}
          </div>
        );

      case 'about-board':
        return (
          <div className="space-y-8">
            <PageTitle title="مجلس الإدارة" sub="مجلس إدارة مدرسة جامعة مؤتة النموذجية" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { role: 'عميد كلية الشريعة', name: 'الأستاذ الدكتور خالد بني احمد' },
                { role: 'كلية العلوم', name: 'الدكتور فيصل الكساسبه' },
                { role: 'نائب عميد كلية العلوم التربوية', name: 'الدكتور سامي الختاتنه' },
                { role: 'كلية العلوم التربوية', name: 'الدكتور عبدالله الجراح' },
                { role: 'كلية العلوم التربوية', name: 'الدكتورة اسماء الصرايره' },
                { role: 'مدير المدرسة النموذجية (أميناً للسر)', name: 'الأستاذ رائد المبيضين' }
              ].map((m, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-start gap-4 hover:shadow-md hover:border-[#c9a227]/40 transition-all">
                  <div className="w-12 h-12 rounded-full bg-[#0f3057] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-[#c9a227]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-[#c9a227] mb-1.5 leading-relaxed">{m.role}</p>
                    <h3 className="font-bold text-[#0f3057] text-[15px] leading-snug">{m.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'about-admin':
        return (
          <div className="space-y-8">
            <PageTitle title="الكادر الإداري" sub="المدرسة النموذجية — ١٦ موظفاً" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { role: 'مساعد مدير', name: 'جعفر قراقع' },
                { role: 'مساعدة مدير', name: 'سمية الطراونة' },
                { role: 'رئيس ديوان', name: 'صفاء شعث' },
                { role: 'رئيس شعبة المحاسبة', name: 'امل ابو قديري' },
                { role: 'مشرفة حاسوب', name: 'فاتن البطوش' },
                { role: 'قيمة مختبر العلوم', name: 'رويده المحادين' },
                { role: 'فنية وسائل', name: 'تماضر الصرايرة' },
                { role: 'سكرتيرة', name: 'هناء الجعافره' },
                { role: 'أمينة مكتبة', name: 'عايشة القضاة' },
                { role: 'مندوب لوازم', name: 'حاتم الملاحمة' },
                { role: 'ملفات الطلبة', name: 'عائشة القضاة' },
                { role: 'ممرضة', name: 'حنان قطاونه' },
                { role: 'رئيس شعبة الخدمات', name: 'عبدالحي القرالة' },
                { role: 'مراسل', name: 'شاكر البريكات' },
                { role: 'فني تصوير', name: 'عوض الطراونة' },
                { role: 'مراقب عمال', name: 'نعيم الذنيبات' }
              ].map((m, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-start gap-4 hover:shadow-md hover:border-[#c9a227]/40 transition-all">
                  <div className="w-12 h-12 rounded-full bg-[#0f3057] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-[#c9a227]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-[#c9a227] mb-1.5">{m.role}</p>
                    <h3 className="font-bold text-[#0f3057] text-[15px] leading-snug">{m.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'about-former':
        return (
          <div className="space-y-8">
            <PageTitle title="المدراء السابقون" sub="مدراء مدرسة جامعة مؤتة النموذجية — ١٥ مديراً" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { name: 'رائد المبيضين', img: 'Dirc1.jpg' },
                { name: 'د. صباح النوايسه', img: 'user-01-128.png' },
                { name: 'هند ابوهلاله', img: 'user-01-128.png' },
                { name: 'افنان المصري', img: 'user-01-128.png' },
                { name: 'د. عبدالفتاح الخليفات', img: 'user-01-128.png' },
                { name: 'احمد الطراونه', img: 'user-01-128.png' },
                { name: 'احسين الطراونه', img: 'user-01-128.png' },
                { name: 'د. اسماء الصرايره', img: 'user-01-128.png' },
                { name: 'د. نايل الحجايا', img: 'user-01-128.png' },
                { name: 'د. طارق المجالي', img: 'drtarq.jpg' },
                { name: 'د. محمد الغزيوات', img: 'drmohammed.jpg' },
                { name: 'محمد عبدالرحمن الرهايفه', img: 'user-01-128.png' },
                { name: 'د. ماجد الصعوب', img: 'drmajed.jpg' },
                { name: 'د. اسماعيل الحباشنه', img: 'lastmanage2.jpg' },
                { name: 'د. عبدالقادر البطوش', img: 'dir_2.jpg' }
              ].map((d, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:border-[#c9a227]/50 transition-all">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-[#0f3057]">
                    <img src={`https://www.mutah.edu.jo/ar/school/PublishingImages/${d.img}`} alt={d.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-[#0f3057] text-[15px] leading-snug">{d.name}</h3>
                </div>
              ))}
            </div>
          </div>
        );

      case 'forms':
        return (
          <div className="space-y-8">
            <PageTitle title="ملفات ونماذج" sub="المدرسة النموذجية" />
            <div className="flex flex-col gap-3">
              <DocRow name="نموذج امتحان" type="DOC" url="https://www.mutah.edu.jo/ar/school/Forms/exams_sample%20(1).doc" />
              <DocRow name="نموذج قبول الطالب في النقل" type="DOC" url="https://www.mutah.edu.jo/ar/school/Forms/trans_include.doc" />
              <DocRow name="نموذج استغناء الطالب من النقل" type="DOC" url="https://www.mutah.edu.jo/ar/school/Forms/trans_exclude.doc" />
            </div>
          </div>
        );

      case 'about-teachers':
        return (
          <div className="space-y-8">
            <PageTitle title="الكادر التدريسي" sub="المدرسة النموذجية — ٥٥ معلماً ومعلمة" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { role: 'المرشد', name: 'علي الطراونة' },
                { role: 'مرشدة', name: 'ختام الطراونة' },
                { role: 'معلمة تربية اسلامية', name: 'بتول الطراونه' },
                { role: 'معلم تربية اسلامية', name: 'زياد البطوش' },
                { role: 'معلمة تربية اسلامية', name: 'ابتسام ابو نواس' },
                { role: 'معلم تربية اسلامية', name: 'حامد الجعافره' },
                { role: 'معلم تربية اسلامية', name: 'محمد الرواشدة' },
                { role: 'معلمة لغة عربية', name: 'ميسون القضاه' },
                { role: 'معلمة لغة عربية', name: 'هيام البواليز' },
                { role: 'معلم لغة عربية', name: 'معتصم الجعافره' },
                { role: 'معلم لغة عربية', name: 'ياسر البستنجي' },
                { role: '—', name: 'سفيره الطراونه' },
                { role: 'معلمة لغة عربية', name: 'سماهر معايطه' },
                { role: 'معلمة لغة عربية', name: 'فندية الطراونة' },
                { role: 'معلم لغة عربية', name: 'فراس كفاوين' },
                { role: 'معلم لغة عربية', name: 'مصعب فقوسة' },
                { role: 'معلم اجتماعيات', name: 'نضال الطراونة' },
                { role: 'معلمة اجتماعيات', name: 'سماهر المعايطة' },
                { role: 'معلم تربية اجتماعية', name: 'رفيد المواجده' },
                { role: 'معلمة تربية اجتماعية', name: 'ريم الضمور' },
                { role: 'معلم حاسوب', name: 'خالد الطراونة' },
                { role: 'معلمة حاسوب', name: 'منال الطراونة' },
                { role: 'معلم حاسوب', name: 'احمد الشمايله' },
                { role: 'معلمة لغة انجليزية', name: 'سحر نوايسه' },
                { role: 'معلمة لغة انجليزية', name: 'امل السحيمات' },
                { role: 'معلمة لغة انجليزية', name: 'ماجده الطراونة' },
                { role: 'معلمة لغة انجليزية', name: 'سهام الطراوتة' },
                { role: 'معلمة لغة انجليزية', name: 'آمنه بشابشه' },
                { role: 'معلم لغة انجليزية', name: 'فريوان المجالي' },
                { role: 'معلم لغة انجليزية', name: 'عصام حجازين' },
                { role: 'معلمة رياضيات', name: 'ساجده كفاوين' },
                { role: 'معلمة رياضيات', name: 'رانيا القراله' },
                { role: 'معلم رياضيات', name: 'باجس الخرشه' },
                { role: 'معلمة رياضيات', name: 'غدير مبيضين' },
                { role: 'معلم رياضيات', name: 'نصر الشماعين' },
                { role: 'معلمة كيمياء', name: 'ايمان نصر' },
                { role: 'معلم علوم ارض', name: 'صدام الرماضين' },
                { role: 'معلمة أحياء', name: 'خولة الطراونة' },
                { role: 'معلمة أحياء', name: 'شادية المجالي' },
                { role: 'معلم احياء', name: 'زهير علاوي' },
                { role: 'معلمة رياضه', name: 'ايمان قطاونه' },
                { role: 'معلم رياضه', name: 'محمد الشمايله' },
                { role: 'معلمة موسيقى', name: 'رولا العطار' },
                { role: 'معلمة تربية مهنية', name: 'مي نوايسه' },
                { role: 'معلمة مهني', name: 'باولا حباشنه' },
                { role: 'معلم فن', name: 'محمود المجالي' },
                { role: 'معلمة فن', name: 'ذكريات الشوابكة' },
                { role: 'معلمة صف اول', name: 'زريفه شمايلة' },
                { role: 'معلمة صف اول', name: 'سماهر شوامره' },
                { role: 'معلمة صف ثاني', name: 'ارياف الطراونه' },
                { role: 'معلم صف ثاني', name: 'فاتن طلالعه' },
                { role: 'معلم صف ثاني', name: 'اسلام طراونه' },
                { role: 'معلمة صف ثالث', name: 'غاده الطراونه' },
                { role: 'معلمة صف ثالث', name: 'ملاك عساسفه' },
                { role: 'معلمة مصادر', name: 'آيات الرواشده' },
                { role: 'قيم مختبر', name: 'رويدا محادين' }
              ].map((m, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex items-start gap-3.5 hover:shadow-md hover:border-[#c9a227]/40 transition-all">
                  <div className="w-11 h-11 rounded-full bg-[#0f3057] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-[#c9a227]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-[#c9a227] mb-1">{m.role}</p>
                    <h3 className="font-bold text-[#0f3057] text-[14.5px] leading-snug">{m.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, SCH_LINKS)} sub="المدرسة النموذجية" />
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, SCH_LINKS)} sub="المدرسة النموذجية" />
          </div>
        );
    }
  };
  return (
    <DeanshipShell
      brand="المدرسة النموذجية"
      tagline="مدرسة جامعة مؤتة النموذجية — نحو بيئة تعليمية أفضل."
      heroImage="https://www.mutah.edu.jo/ar/school/PublishingImages/pic8.jpg"
      links={SCH_LINKS} activeItem={activeItem} setActiveItem={setActiveItem}
    >{render()}</DeanshipShell>
  );
}

/* ══════════════════════════════════════════
   وحدة الخدمات العامة
══════════════════════════════════════════ */
const DPS_LINKS: NavLink[] = [
  { id: 'home', name: 'الرئيسية' },
  { id: 'structure', name: 'الهيكل التنظيمي' },
  {
    id: 'depts', name: 'دوائر الوحدة',
    children: [
      { id: 'dep-agri', name: 'دائرة الخدمات الإدارية والزراعية' },
      { id: 'dep-supply', name: 'دائرة التموين والتغذية' },
      { id: 'dep-transport', name: 'دائرة النقل والميكانيك' }
    ]
  },
  { id: 'tasks', name: 'المهام' }
];

export function GeneralServicesUnit() {
  const [activeItem, setActiveItem] = useTabRoute('home');
  const TASKS = [
    'زراعة وتجميل ساحات الجامعة بالحدائق والمسطحات وأشجار الزينة التي يتم أنتاجها داخل مشتل الجامعة، اضافة إلى زراعة الأشجار الحرجية والمثمرة وتقديم الخدمات للمجتمع المحلي وإهداء اشتال الزينة والأشجار للمؤسسات الرسمية والشعبية والمشاركة في كافة الاحتفالات والمناسبات.',
    'الأشراف على توزيع الشقق السكنية لأعضاء الهيئة التدريسية ومتابعة صيانتها بالتنسيق مع أمانة سر لجنة الإسكان.',
    'المحافظة على أدامة النظافة في كافة مرافق الجامعة من مباني وساحات.',
    'تقديم خدمات الطعام والشراب للعاملين والطلبة في الجامعة وباسعار مدعومة وخدمة الندوات والمؤتمرات المقامة داخل الجامعة وخارجها.',
    'تقوم بتأمين وسائط النقل لكافة العاملين في الجامعة للأعمال الرسمية بالإضافة إلى عمليات نقل طلاب الجامعة وبشكل يومي وطلاب المدرسة النموذجية وصيانة وإدامة كافة آليات وسيارات الجامعة بجناحيها المدني والعسكري.',
    'القيام بالاعمال الإدارية وتوثيق المعاملات الخاصة بالوحدة وداوئرها.'
  ];
  const DEPTS = ['دائرة الخدمات الإدارية والزراعية', 'دائرة التموين والتغذية', 'دائرة النقل والميكانيك'];
  const render = () => {
    switch (activeItem) {
      case 'structure':
        return (
          <div className="space-y-8">
            <PageTitle title="الهيكل التنظيمي" sub="وحدة الخدمات العامة" />
            <Prose>
              <p>
                تضم وحدة الخدمات العامة وحسب هيكلها التنظيمي مساعدَين لمدير الوحدة:
              </p>
            </Prose>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {['مساعد المدير للشؤون الفنية', 'مساعد المدير للشؤون الإدارية'].map((r, i) => (
                <div key={r} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-center gap-4">
                  <span className="w-9 h-9 rounded-lg bg-[#0f3057] text-[#c9a227] text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="font-bold text-[#0f3057] text-sm">{r}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-5">وتتألف من الدوائر التالية</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {DEPTS.map((d, i) => (
                  <div key={d} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:border-[#c9a227] transition-colors">
                    <span className="w-9 h-9 rounded-lg bg-[#c9a227]/15 text-[#0f3057] text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <p className="font-bold text-[#0f3057] text-sm leading-snug">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'tasks':
        return (
          <div className="space-y-8">
            <PageTitle title="مهام الوحدة" sub="وتناط بها المهام التالية" />
            <NumList items={TASKS} />
          </div>
        );
      case 'dep-agri':
        return (
          <div className="space-y-8">
            <PageTitle title="دائرة الخدمات الادارية والزراعية" sub="وحدة الخدمات العامة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm"><img src="https://www.mutah.edu.jo/PublishingImages/agrservices.jpg" alt="دائرة الخدمات الادارية والزراعية" className="w-full max-h-[400px] object-cover" /></div>
            <Prose><p>أُنشئت دائرة الخدمات الإدارية والزراعية بتاريخ 1/4/2010م وتضم الدائرة ستة شعب، ولهذه الدائرة دور فعال ومهم سواء على صعيد الجامعة أو على صعيد المجتمع المحلي، وتتلخص المهام والواجبات التي تقوم بها الدائرة من خلال شعبها على النحو التالي:</p></Prose>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">1- شعبة البستنة والحدائق</h3><NumList items={["زراعة الأشجار والغراس على مختلف أنواعها في ساحات وحدائق الجامعة وفي مختلف المواقع.","الاهتمام بالأشجار والغراس المزروعة بالحرم الجامعي من حيث خدمة الري والحراثة والتعشيب والتسميد والتقليم ومن خلال فريق مدرب من أجل المحافظة على ديمومتها.","التعاون مع المؤسسات الحكومية والهيئات التطوعية في المجتمع المحلي مساهمة من الجامعة بإعداد وتصميم المخططات للحدائق وزراعتها وإرسال متخصصين إلى المؤسسات للتشكيل وتقليم الأشجار."]} /></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">2- شعبة المشتل</h3><NumList items={["يقوم المشتل بإنتاج الغراس اللازمة لسد حاجة الجامعة والمجتمع المحلي وبيع الفائض للعاملين في الجامعة وبأسعار رمزية.","إقامة المعارض الزراعية في المشتل كل عام.","تم إنتاج حوالي (15,000) خمسة عشر ألف شتلة داخل مشتل الجامعة لعام (2010/2011) وذلك لتغطية حاجة الجامعة وحاجة المجتمع المحلي.","بلغت كمية الأشتال المهداة من إنتاج مشتل الجامعة إلى مختلف المؤسسات والدوائر والمدارس والبلديات والمستشفيات لمحافظة الكرك لعام 2010م (2147) ألفان ومائة وسبعة وأربعون شتلة."]} /></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">3- شعبة الوقاية</h3><Prose><p>تقوم هذه الشعبة بعمليات معالجة للحشرات والقوارض التي تضر بالصحة العامة وإجراء عمليات الرش للأشجار وحسب برنامج معدّ مسبقاً، بالإضافة إلى الرش الدوري لمرافق السكنات والمكتبة والأندية والمطاعم.</p></Prose></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">4- شعبة النظافة</h3><NumList items={["تقوم الشعبة بتوفير خدمة النظافة وإدامتها لكافة مرافق الجامعة.","تأمين مواد النظافة وصرفها على مندوبي اللوازم في مرافق الجامعة."]} /></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">5- شعبة الإسكان</h3><NumList items={["إعداد محاضر اجتماع لجنة الإسكان.","تسليم الشقق السكنية حسب التعليمات.","إعداد كشوفات الدور الخاصة بأعضاء هيئة التدريس.","إجراء المخاطبات اللازمة مع وحدة الصيانة بخصوص صيانة الشقق السكنية ومتابعة أعمال الصيانة للشقق عند إخلائها.","مخاطبة الدائرة المالية بخصوص أجور السكن والمشاركة مع وحدة الصيانة بخصوص احتساب وتوزيع أجور التدفئة."]} /></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">6- شعبة الديوان</h3><Prose><p>يقوم بتوثيق كافة المراسلات الصادرة والواردة من الدائرة ومتابعتها وحفظ الملفات الشخصية للموظفين.</p><p className="font-bold text-[#0f3057]">فرع اللوازم:</p></Prose><NumList items={["يقوم بتأمين الدائرة بحاجتها من الأثاث واللوازم والقرطاسية.","يقوم بحوسبة المواد على نظام الحوسبة المتبع في اللوازم.","استلام مواد النظافة لكافة مرافق الجامعة وصرفها على مندوبي اللوازم."]} /></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">الرؤية</h3><Prose><p>تتطلع الدائرة إلى إظهار الجامعة بالشكل المناسب من خلال متابعة نظافة مرافق الجامعة، إضافة إلى تقديم الخدمات المتعلقة باللوازم والإسكان، كما تقوم الدائرة بتقديم الخدمات الزراعية المختلفة من أجل إظهار الجامعة بمظهر لائق.</p></Prose></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">الرسالة</h3><Prose><p>إدامة تقديم الخدمات الإدارية والزراعية، والعمل على تطويرها، واستخدام الوسائل والأساليب المناسبة من أجل الارتقاء بمستوى الخدمات التي تقدمها الدائرة، سواء تلك المتعلقة بنظافة مرافق الجامعة المختلفة من أبنية وساحات، أو المتعلقة بالسكن الوظيفي لأعضاء الهيئة التدريسية، أو الخدمات الزراعية المختلفة، والمتمثلة في تحسين المظهر الزراعي، وتجميل مداخل وساحات الجامعة، وكذلك خدمة المجتمع المحلي من خلال تقديم الاستشارات والإهداءات.</p></Prose></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">الأهداف</h3><NumList items={["الارتقاء بالواقع الخدماتي للجامعة إلى المستوى الذي يجعل منها نموذجاً يُحتذى به على مستوى الجامعات والقطاع الحكومي.","تحسين وتطوير إنجاز الخدمات المختلفة (خدمات إسكان، خدمات زراعية، نظافة المرافق والساحات).","تعزيز الوعي البيئي لدى مجتمع الجامعة، وذلك من خلال إرشادات عامة تبين أهمية المظهر الجمالي للجامعة.","التنسيق المشترك مع كافة مرافق الجامعة لإدامة المحافظة على واقع خدمات ريادي، لتظهر الجامعة بالمستوى المنشود.","العمل على تحفيز طاقات العاملين لتطوير قدراتهم في مجال الخدمات، وتمكينهم من أداء أعمالهم على الوجه الأمثل."]} /></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">الهيكل التنظيمي للدائرة يحتوي على الشعب التالية</h3><NumList items={["شعبة اللوازم والإسكان","شعبة النظافة","شعبة البستنة والحدائق","شعبة الوقاية","شعبة المشتل","شعبة الديوان"]} /></div>
          </div>
        );

      case 'dep-supply':
        return (
          <div className="space-y-8">
            <PageTitle title="دائرة التموين والتغذية" sub="وحدة الخدمات العامة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm"><img src="https://www.mutah.edu.jo/PublishingImages/food.png" alt="دائرة التموين والتغذية" className="w-full max-h-[400px] object-cover" /></div>
            <Prose><p>أنشئت دائرة التموين والتغذية كدائرة مستقلة بتاريخ 1/4/2010 وقد كانت دائرة فرعية ضمن وحدة الخدمات في الجامعة، وتضم الدائرة ستة شعب هي:</p></Prose>
            <NumList items={["شعبة الإعداد والتجهيز وتتكون من فرع الحلوانية وفرع الطهاة، وتقوم بتجهيز الوجبات الغذائية المراد تصنيعها للطلبة وأعضاء هيئة التدريس والإداريين، وكذلك للمؤتمرات والحفلات التي يتم إقامتها في الجامعة.","شعبة المقاصف وتضم فرع الصالات، وتقوم بإعداد وتجهيز الساندويشات والعصائر والمشروبات الساخنة بأنواعها للطلبة وأعضاء هيئة التدريس والموظفين.","شعبة التزويد وتضم فرع التزويد وفرع المستودعات، وتقوم بمتابعة طلبات الدائرة وإحضارها وإدخالها في سجلات الدائرة ومن ثم صرف المطلوب منها حسب الأنظمة والقوانين المرعية في الجامعة.","شعبة الضيافة والحفلات وتضم فرع السفرجية وفرع الصالات، تقوم بتجهيز مكان صرف الوجبات للطلبة والموظفين وأعضاء هيئة التدريس وتشغيل الكاونترات المخصصة لذلك، إضافة إلى تقديم خدمة الطعام والشراب للمؤتمرات والحفلات التي تعقد في الجامعة، وكذلك الإشراف على تنظيف معدات الخدمة (كاونترات وفضيات وطاولات).","شعبة التغذية والرقابة الصحية، تقوم بمتابعة آلية التصنيع للوجبات الغذائية وآلية العمل ضمن شروط الصحة والسلامة العامة، ومتابعة ومراقبة سلامة الوجبات والساندويشات المقدمة، وكتابة تقارير دورية عن ذلك بالتعاون مع الجهات الرقابية من خارج وداخل الجامعة.","الديوان: ويقوم بمتابعة دوام الموظفين في الدائرة والإشراف على الكتب الصادرة والواردة من وإلى الدائرة والكثير من الأعمال الأخرى."]} />
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">خدمات الدائرة</h3><Prose><p>تعتبر الدائرة من الدوائر الخدماتية في الجامعة، وتقدم خدماتها وبشكل إجمالي على النحو التالي:</p></Prose><NumList items={["تقوم بتقديم خدمة الطعام والشراب للطلبة والعاملين في الجامعة وبأسعار مدعومة للطلبة.","خدمة الندوات والمؤتمرات المقامة داخل الجامعة، وخارجها إذا طلب منها ذلك رسمياً.","التعاون مع مؤسسة التدريب المهني باستقبال طلبتها لتدريبهم على مهن إنتاج الطعام وتأهيلهم لسوق العمل.","تقدم الدائرة خدمة التواصي والوجبات الخاصة.","يخضع الطعام والشراب المقدم في كافيتريات الجامعة إلى الرقابة المستمرة من قبل مهندسة تغذية متخصصة لضمان الصحة والجودة العالية له."]} /></div>
            <Prose><p>علماً أن الدائرة على استعداد تام لتلبية طلبات أعضاء الهيئة التدريسية والإدارية في الجامعة والمجتمع المحلي من وجبات للمناسبات العامة والخاصة وبأسعار منافسة وبدرجة تصنيع عالية الجودة وتحت مراقبة متخصصة، وكذلك تقوم الدائرة بتوفير وجبات الطعام يومياً.</p></Prose>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5"><p className="text-xs font-bold text-gray-400 mb-1">مدير الدائرة</p><p className="font-bold text-[#0f3057] text-[16px]">محمد علي أبو ريا</p></div>
          </div>
        );

      case 'dep-transport':
        return (
          <div className="space-y-8">
            <PageTitle title="دائرة النقل والميكانيك" sub="وحدة الخدمات العامة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm"><img src="https://www.mutah.edu.jo/PublishingImages/HDEQTTREP_5.jpg" alt="دائرة النقل والميكانيك" className="w-full max-h-[400px] object-cover" /></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">أولاً: نبذة عن الدائرة</h3><Prose><p>واكبت دائرة النقل والميكانيك نشأة الجامعة وذلك لمساندة العملية التعليمية وتقديم الخدمات لكل من أعضاء هيئة التدريس والطلبة على حد سواء، وكذلك إمداد كافة وحدات ودوائر الجامعة ومساندتها للقيام بمتطلبات العمل وخاصة في ضوء بعد الجامعة الأم عن مركز العاصمة.</p><p>لقد طرأت تغيرات على هيكلة الدائرة منذ نشأتها من حيث ارتباطها الإداري بدوائر أخرى، حيث كانت تتبع إلى وحدة الخدمات وكانت شعبة الميكانيك تتبع لإشراف وحدة الصيانة، إلا أن الهيكلة التي شملت دوائر الخدمات في الجامعة جعلت دائرة النقل والميكانيك دائرة مستقلة ولها موازنة مستقلة أيضاً.</p></Prose></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">الرؤية</h3><Prose><p>نحو دائرة نقل وميكانيك قادرة على مواكبة التطور في مجال النقل والمواصلات لتلبية احتياجات الجامعة والمجتمع المحلي.</p></Prose></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">الرسالة</h3><Prose><p>تقوم دائرة النقل والميكانيك بدورها الموكل إليها لمساندة العملية التعليمية للطلبة وأعضاء هيئة التدريس وموظفي الجامعة على مدار الساعة، بما يضمن بيئة تعليمية آمنة ومناسبة.</p></Prose></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">القيم والمبادئ التي تحكم عمل الدائرة</h3><NumList items={["محاكاة الخطة الإستراتيجية للجامعة.","العمل على تنفيذ سياسات وتوجيهات إدارة الجامعة.","العمل بروح الفريق الواحد والمحافظة على ممتلكات الجامعة."]} /></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">الغايات الاستراتيجية</h3><NumList items={["ضبط استخدام المركبات من خلال طلبات الحركة الإلكترونية ومعدلات الوقود وتفعيل المراقبة عبر نظام تتبع المركبات (GPS).","تطوير آلية عمل الدائرة وفق نظام محوسب (طلبات وأوامر الحركة وطلبات الصيانة... إلخ).","برمجة عمليات الصيانة الوقائية والعلاجية والتركيز عليها (مرتان في العام) والتي تنعكس على أداء المركبات واستهلاك الوقود.","تنظيم برنامج نقل طلبة كليات الطب والتمريض والصيدلة والزراعة من خلال برنامج التدريب العملي خارج الجامعة.","العمل على خفض قيمة التأمين على المركبات لتقليل نسبة القسط السنوي.","تحديث أسطول النقل واستبعاد المركبات القديمة منه، وكذلك ذات المحركات الكبيرة.","تغطية برامج النقل المسائي والليلي وحسب الاحتياجات الطارئة أو المبرمجة مسبقاً للطلبة وأعضاء الهيئة التدريسية والضيوف.","تقديم خدمات الصيانة والإصلاح لمركبات الجناح العسكري."]} /></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">أ. النقل الداخلي</h3><Prose><p>برمجة وتشغيل حافلات كبيرة سعة (50) راكباً وذلك لتقليل عدد الباصات العاملة على نقل الطلبة، وبالتالي تقليل استهلاك الوقود وخفض النفقات والانبعاثات الغازية من عوادم المركبات.</p></Prose></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">ب. النقل الخارجي</h3><NumList items={["دمج الرحلات (الرحلات الجماعية) كلما أمكن ذلك، لتقليل استهلاك المحروقات.","تحديد فترة التدريب العملي للطلبة خلال ساعات الدوام الرسمي للجامعة بالتنسيق مع الكليات.","تنظيم دوام السائقين بنظام المناوبات لتغطية ساعات العمل بما يسهّل تنفيذ برامج دمج الرحلات خلال الأسبوع.","تحديث أسطول النقل واستبعاد المركبات القديمة منه، وكذلك ذات المحركات الكبيرة.","التركيز على شراء مركبات النقل الجماعي.","إنشاء وتشغيل نظام تتبع المركبات (GPS) لإدارة الأسطول البالغ (136) مركبة، حيث تم تركيب جهاز تتبع لـ (23) مركبة كمرحلة أولى، بشكل رشيد من خلال السيطرة على السرعات والمسافات وساعات التشغيل والتوقف والمناطق الجغرافية."]} /></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">صيانة المركبات</h3><NumList items={["برمجة عمليات الصيانة الوقائية والتركيز عليها (مرتان في العام) والتي تنعكس على أداء المركبات واستهلاك الوقود والتقليل قدر الإمكان من عوادم المركبات.","ضبط استخدام المركبات ومعدلات استهلاك الوقود، ونقترح العمل على استخدام متدرج لوسائط النقل التي تعمل على الكهرباء وأخرى على الـ (Hybrid)."]} /></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">ملاحظات</h3><Prose><p>تم تخفيض عدد رحلات النقل الداخلي والخارجي في الجامعة السنة الماضية رغم زيادة الحاجة لوسائط النقل، وبالتالي تخفيض النفقات، وذلك بسبب استجابة الإدارة لتوجيهات إدارة الجامعة في تحقيق المراقبة الإدارية والمالية، والتي تتم من خلال خفض قيمة الإنفاق الشهري وحتى نهاية العام على أن تكون مقاربة للمعدلات السنوية المرصودة لدينا.</p></Prose></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">شعبة النقل — الأهداف والمهام</h3><NumList items={["إعداد وتنفيذ برنامج النقل الموحد للتدريب العملي الخارجي لطلبة الجامعة وبالتنسيق مع الكليات المعنية.","تلبية الاحتياجات البحثية والتدريسية المتمثلة بالنقل الداخلي والخارجي للطلبة وأعضاء الهيئة التدريسية.","تأمين وسائل نقل لكليات ووحدات ودوائر ومراكز الجامعة لتؤدي أعمالها على أكمل وجه.","تنظيم دوام السائقين بنظام المناوبات."]} /></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">إنجازات شعبة النقل للعام 2017</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#0f3057] text-white rounded-2xl p-6"><p className="text-4xl font-bold text-[#c9a227]">2064</p><p className="mt-2 text-[15px]">رحلة خارج المحافظة</p></div>
                <div className="bg-[#0f3057] text-white rounded-2xl p-6"><p className="text-4xl font-bold text-[#c9a227]">4208</p><p className="mt-2 text-[15px]">رحلة داخل المحافظة</p></div>
              </div>
            </div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">شعبة الميكانيك</h3><NumList items={["تأمين قطع الغيار والمستلزمات بالتنسيق مع وحدة اللوازم المركزية.","إجراء الصيانة الوقائية والعلاجية لما يقارب (751) مركبة وآلية ومعدة إنشائية وزراعية على مدار العام.","إجراء الصيانة اللازمة لمركبات الجناح العسكري بما يقارب (250) مركبة على مدار العام.","إعداد المواصفات الفنية اللازمة لشراء المركبات والآليات في الجامعة.","تدريب عدد من طلبة قسم هندسة الميكانيك وطلبة المدارس المهنية والصناعية في مشغل الصيانة."]} /></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">نقاط القوة</h3><Prose><p>وتتمثل في إدارة الجامعة الرشيدة والدعم الموصول لعمل الدائرة، ووجود كادر فني وإداري مؤهل وعلى درجة عالية من الكفاءة تؤهله للتعامل مع الأعباء الملقاة على عاتق الدائرة في كل الظروف والأحوال.</p></Prose></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">نقاط الضعف</h3><Prose><p>تتمثل في بعد الجامعة عن العاصمة وقدم بعض الآليات التي بحاجة إلى تحديث، علماً أن إدارة الجامعة وبالتعاون مع كافة مؤسسات الوطن بدأت بالعمل على تحديث أسطول النقل بما يسهم في تحقيق الأهداف الاستراتيجية المنشودة.</p></Prose></div>
          </div>
        );

      default:
        return (
          <div className="space-y-10">
            <Prose>
              <p className="font-bold text-[#0f3057] text-lg">وحدة الخدمات العامة</p>
              <p>
                تضم وحدة الخدمات العامة وحسب هيكلها التنظيمي مساعدي لمدير الوحدة: مساعد المدير للشؤون
                الفنية، ومساعد المدير للشؤون الإدارية، وتتألف من ثلاث دوائر: دائرة الخدمات الإدارية
                والزراعية، دائرة التموين والتغذية، ودائرة النقل والميكانيك.
              </p>
            </Prose>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">دوائر الوحدة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {DEPTS.map((d, i) => (
                  <div key={d} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:border-[#c9a227] transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-[#0f3057] flex items-center justify-center shrink-0"><Building2 className="w-5 h-5 text-[#c9a227]" /></div>
                    <p className="font-bold text-[#0f3057] text-sm leading-snug">{d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">وتناط بها المهام التالية</h3>
              <NumList items={TASKS} />
            </div>
          </div>
        );
    }
  };
  return (
    <DeanshipShell
      brand="وحدة الخدمات العامة"
      tagline="الخدمات الإدارية والزراعية، والتموين والتغذية، والنقل والميكانيك في جامعة مؤتة."
      heroImage="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      links={DPS_LINKS} activeItem={activeItem} setActiveItem={setActiveItem}
    >{render()}</DeanshipShell>
  );
}
