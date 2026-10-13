import React from 'react';
import {
  ShieldCheck, Award, FileText, Download, ExternalLink, TrendingUp,
  Target, ClipboardList, BarChart3, BookOpen, Layers, Info
} from 'lucide-react';

/* ─── Shared section title (matching AcademicDevelopmentSubPages) ─── */
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

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 w-full" dir="rtl">
      {children}
    </div>
  );
}

function TaskList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3 bg-[#F8FAFC] border border-gray-100 rounded-xl px-5 py-4">
          <span className="w-6 h-6 rounded-full bg-[#0f3057] text-[#c9a227] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
            {i + 1}
          </span>
          <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
        </div>
      ))}
    </div>
  );
}

function FileRow({ name, note }: { name: string; note?: string }) {
  return (
    <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-3.5 hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
      <div className="w-9 h-9 rounded-lg bg-[#0f3057]/8 flex items-center justify-center flex-shrink-0">
        <FileText size={16} className="text-[#0f3057]" />
      </div>
      <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-snug">{name}</p>
      {note && <span className="text-[11px] font-bold text-gray-400 uppercase">{note}</span>}
      <Download size={15} className="text-[#c9a227] flex-shrink-0" />
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

/* ══════════════════════════════════════════
   الجودة — شعبة ضمان الجودة
══════════════════════════════════════════ */
export function QualityMainContent() {
  return (
    <Card>
      <SectionTitle icon={ShieldCheck} title="الجودة" />
      <h3 className="text-base font-bold text-[#0f3057] mb-1">شعبة ضمان الجودة</h3>
      <p className="text-sm text-gray-500 mb-6">مهام الشعبة</p>
      <TaskList items={[
        'الإشراف على تطبيق معايير ضمان الجودة الصادرة عن هيئة اعتماد مؤسسات جودة التعليم العالي.',
        'التجهيز للتقدم للجهات المانحة لشهادات ضمان الجودة الوطنية والدولية.',
        'إعداد البيانات والمعلومات اللازمة كأدلة وبراهين على تطبيق معايير الجودة.',
        'الإشراف على إعداد ملف المادة ومتابعة العمل به مع الكليات.',
        'متابعة دليل إجراءات معايير وضمان الجودة.',
        'المشاركة بالدورات التدريبية المتعلقة بالجودة والاعتماد بالتعاون مع شعبة التدريب.',
        'عقد الندوات والمحاضرات لنشر الوعي الخاص بتعزيز ثقافة الجودة والتطوير والتحسين المستمر في أداء الجامعة في كليات ووحدات ودوائر الجامعة.',
        'إعداد النماذج المتعلقة بالجودة والإشراف على تنفيذها.',
        'أية مهام أخرى يكلف بها من قبل مدير المركز.',
      ]} />
    </Card>
  );
}

/* ══════════════════════════════════════════
   ضمان الجودة الأكاديمية — معايير ضمان الجودة
══════════════════════════════════════════ */
export function AcademicQualityContent() {
  return (
    <Card>
      <SectionTitle icon={Award} title="معايير ضمان الجودة" />
      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        معايير ضمان الجودة المعتمدة في جامعة مؤتة، متاحة للتنزيل بصيغة PDF.
      </p>
      <FileRow name="معايير ضمان الجودة" note="PDF" />
    </Card>
  );
}

/* ══════════════════════════════════════════
   ميثاق الجودة
══════════════════════════════════════════ */
export function QualityCharterContent() {
  return (
    <Card>
      <SectionTitle icon={ShieldCheck} title="ميثاق الجودة" />
      <FileRow name="معايير ضمان الجودة" note="PDF" />
    </Card>
  );
}

/* ══════════════════════════════════════════
   التصنيفات
══════════════════════════════════════════ */
export function RankingsContent() {
  const main = [
    { name: 'التصنيف الأردني للجامعات', note: 'DOCX' },
    { name: 'الجامعات العالمية المرموقة', note: 'DOCX' },
    { name: 'تصنيف QS-Stars', note: 'DOCX' },
    { name: 'تصنيف الجامعات بقاعدة بيانات سكوبس', note: 'DOCX' },
  ];
  const templates = [
    '1_Ranking_Systems_2019_BAU (1).xls',
    'Subscription_Demand.xls',
    'Template1.xls', 'Template2.xls', 'Template3.xls', 'Template4AboutProgram.xls',
    'Template5.xls', 'Template6.xls', 'Template7.xls', 'Template8.xls', 'Template8 (1).xls',
    'Template9.xls', 'Template10.xls', 'Template11.xls', 'Template12.xls', 'Template13.xls',
    'Template14.xls', 'Template15.xls', 'Template16.xls', 'Template17.xls',
  ];

  return (
    <Card>
      <SectionTitle icon={BarChart3} title="التصنيفات" />
      <div className="flex flex-col gap-3 mb-8">
        {main.map((f) => <FileRow key={f.name} name={f.name} note={f.note} />)}
      </div>
      <div className="mb-4 flex items-center gap-2">
        <Layers size={16} className="text-[#c9a227]" />
        <span className="text-base font-bold text-[#0f3057]">قوالب بيانات التصنيف</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {templates.map((t) => (
          <div key={t} className="flex items-center gap-2.5 border border-gray-200 rounded-lg px-4 py-2.5" dir="ltr">
            <FileText size={14} className="text-[#0f3057] flex-shrink-0" />
            <span className="text-xs font-mono text-gray-600 flex-1">{t}</span>
            <Download size={13} className="text-[#c9a227] flex-shrink-0" />
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════
   شهادة ضمان الجودة الوطنية
══════════════════════════════════════════ */
export function NationalQualityCertificateContent() {
  return (
    <Card>
      <SectionTitle icon={Award} title="منح شهادة ضمان الجودة (المستوى الذهبي)" />
      <div className="bg-gradient-to-l from-[#8a6d1f] to-[#c9a227] rounded-2xl p-6 mb-8">
        <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">
          هيئة اعتماد مؤسسات التعليم العالي وضمان جودتها
        </p>
        <h3 className="text-white text-xl font-bold leading-snug mb-1">
          شهادة ضمان الجودة — المستوى الذهبي
        </h3>
        <p className="text-white/80 text-sm">كلية علوم الرياضة — جامعة مؤتة</p>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed mb-4">
        قرارات مجلس هيئة اعتماد مؤسسات التعليم العالي وضمان جودتها في جلسته رقم (12/2019) التي عقدها
        برئاسة الأستاذ الدكتور بشير الزعبي رئيس المجلس، يوم الأربعاء الموافق 20/3/2019، على النحو التالي:
      </p>
      <div className="flex items-start gap-3 bg-[#F8FAFC] border border-gray-100 rounded-xl px-5 py-4">
        <span className="w-6 h-6 rounded-full bg-[#0f3057] text-[#c9a227] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
        <p className="text-sm text-gray-700 leading-relaxed">
          منح شهادة ضمان الجودة (المستوى الذهبي) لكلية علوم الرياضة في جامعة مؤتة.
        </p>
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════
   التقييم الذاتي
══════════════════════════════════════════ */
export function SelfAssessmentContent() {
  const docs = [
    'ما أنجز من التقييم الذاتي',
    'التقرير النهائي / حقوق',
    'التقييم الذاتي للجامعة',
    'التقييم الذاتي / رياضة',
  ];
  return (
    <Card>
      <SectionTitle icon={ClipboardList} title="التقييم الذاتي" />
      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        تقارير التقييم الذاتي للجامعة وكلياتها، متاحة للتنزيل بصيغة PDF.
      </p>
      <div className="flex flex-col gap-3">
        {docs.map((d) => <FileRow key={d} name={d} note="PDF" />)}
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════
   التطوير الأكاديمي — شعبة التطوير والتدريب
══════════════════════════════════════════ */
export function AcademicDevelopmentContent() {
  return (
    <Card>
      <SectionTitle icon={TrendingUp} title="التطوير الأكاديمي" />
      <h3 className="text-base font-bold text-[#0f3057] mb-1">شعبة التطوير والتدريب</h3>
      <p className="text-sm text-gray-500 mb-6">مهام الشعبة</p>
      <TaskList items={[
        'مسح الاحتياجات التدريبية لأعضاء هيئة التدريس والإداريين.',
        'إعداد وتقييم والإشراف على الدورات التدريبية لأعضاء هيئة التدريس والإداريين.',
        'نشر ثقافة التدريب والتطوير المستمر في الجامعة.',
        'وضع نظام متكامل وملزم لتدريب أعضاء هيئة التدريس والإداريين ورفع كفاءتهم ومهاراتهم.',
        'تنفيذ البرامج التدريبية والمحاضرات والدورات وورش العمل اللازمة لتطوير الأداء التدريسي والبحثي لعضو هيئة التدريس، ومساعدته على تحقيق أقصى درجات النمو المهني.',
        'تنفيذ البرامج التدريبية والمحاضرات والدورات وورش العمل اللازمة لتطوير الأداء الإداري لدى العاملين، ومساعدتهم على تحقيق أقصى درجات النمو المهني والإداري.',
        'متابعة الموقع الإلكتروني للجامعة بشكل منتظم ووضع المقترحات الناجعة لتحسين صورة الموقع وقبوله من قبل الزائرين.',
        'أية مهام أخرى يكلف بها من قبل مدير المركز.',
      ]} />
    </Card>
  );
}

/* ══════════════════════════════════════════
   حجز دورة ممارسة العمل الأكاديمي
══════════════════════════════════════════ */
export function CourseBookingContent() {
  return (
    <Card>
      <SectionTitle icon={BookOpen} title="حجز دورة ممارسة العمل الأكاديمي" />
      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        يتم الحجز والتسجيل في دورة ممارسة العمل الأكاديمي من خلال البوابة الإلكترونية للجامعة.
      </p>
      <a
        href="https://eportal.mutah.edu.jo/adc/main.php"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 bg-[#0f3057] hover:bg-[#16457a] active:bg-[#0b2540] text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        <ExternalLink size={16} className="text-[#c9a227]" />
        الانتقال إلى بوابة الحجز
      </a>
    </Card>
  );
}

/* ══════════════════════════════════════════
   التقييم — تقييم الأداء والاستبانات
══════════════════════════════════════════ */
const SURVEYS = [
  'استبانة قياس رضا طلبة جامعة مؤتة عن خدمات التعليم الإلكتروني',
  'استبانة قياس رضا طلبة جامعة مؤتة عن البيئة الجامعية',
  'استبانة تقييم البرنامج التدريبي (ممارسة العمل الأكاديمي 11)',
  'استبانة تقييم البرنامج التدريبي — مركز التطوير الأكاديمي وضمان الجودة',
  'تقييم أداء رئيس القسم الأكاديمي',
  'استبانة قياس رضا متلقي خدمات المكتبة ومصادر المعلومات في جامعة مؤتة',
  'نموذج تقديم (اقتراح – شكوى – شكر)',
  'استبانة قياس رضا العاملين في جامعة مؤتة عن الخدمات الصحية المقدمة لهم',
  'استبانة قياس رضا العاملين عن وحدة الموارد البشرية في جامعة مؤتة',
  'استبانة قياس رضا الطلبة المستجدين لمستوى الخدمات المقدمة لهم',
  'استبانة قياس رضا الجمهور عن الخدمات الإذاعية في إذاعة صوت الكرك',
  'استبانة قياس رضا الطلبة عن أداء الهيئة التدريسية والإدارية في جامعة مؤتة',
  'استبانة قياس رضا أعضاء هيئة التدريس عن خدمات التعليم الإلكتروني',
  'تقييم أداء مجلس العمداء',
  'دورة الأنماط وأساليب التدريس الحديثة',
  'الخطة الاستراتيجية لجامعة مؤتة (2021–2025) — مقترحة',
  'نموذج التحليل الرباعي SWOT',
  'استمارة تقييم دورة تطوير المحتوى الإلكتروني وأنماط التعلم الحديث',
  'تقييم التعليم الإلكتروني — الفصل الثاني 2022/2023',
  'رضا أعضاء هيئة التدريس 2022/2023',
  'رضا الطلاب عن خدمات التعليم الإلكتروني — الفصل الثاني 2022/2023',
  'استبانة قياس رضا الطلبة عن الخدمات المقدمة من وحدة القبول والتسجيل',
  'نموذج قياس مستوى كفاءة خريجي جامعة مؤتة من وجهة نظر المشغلين',
  'استبانة تقييم الدوران والتمكين والاستقرار الوظيفي في جامعة مؤتة 2024',
  'تقييم برنامج البكالوريوس علم النفس 2023/2024 — كلية العلوم التربوية',
  'تقييم برنامج الدبلوم العالي لإعداد المعلمين 2023/2024 — كلية العلوم التربوية',
  'استمارة تسجيل في البرنامج التدريبي الخاص بإجازة العمل الأكاديمي',
];

const PUBLISHED_LINKS = [
  'نشر الرسالة والرؤية والقيم',
  'نشر الخطة الاستراتيجية',
  'نشر الخطة الإجرائية',
  'نشر خطة إدارة المخاطر',
  'نشر مدونات السلوك',
];

export function EvaluationContent() {
  return (
    <Card>
      <SectionTitle icon={ClipboardList} title="تقييم الأداء" />
      <p className="text-sm text-gray-600 leading-relaxed mb-8">
        استبانات ونماذج تقييم الأداء المعتمدة في الجامعة، تُنشر إلكترونياً ويُتاح لكل فئة رابط التعبئة الخاص بها.
      </p>

      <div className="overflow-x-auto rounded-xl border border-gray-100 mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0f3057] text-white">
              <th className="px-4 py-3 text-right font-bold w-16">#</th>
              <th className="px-4 py-3 text-right font-bold">عنوان الاستبانة</th>
              <th className="px-4 py-3 text-right font-bold w-32">الرابط</th>
            </tr>
          </thead>
          <tbody>
            {SURVEYS.map((s, i) => (
              <tr key={i} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'} hover:bg-[#fffbf0] transition-colors`}>
                <td className="px-4 py-3 text-gray-400 font-mono text-xs">{i + 1}</td>
                <td className="px-4 py-3 text-gray-700 leading-relaxed">{s}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 text-[#0f3057] text-xs font-bold">
                    <ExternalLink size={13} className="text-[#c9a227]" />
                    فتح الاستبانة
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <FileText size={16} className="text-[#c9a227]" />
        <span className="text-base font-bold text-[#0f3057]">روابط النشر المؤسسي</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PUBLISHED_LINKS.map((l) => (
          <div key={l} className="flex items-center gap-2.5 border border-gray-200 rounded-lg px-4 py-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227] flex-shrink-0" />
            <span className="text-sm text-gray-700 flex-1">{l}</span>
            <ExternalLink size={13} className="text-[#0f3057] flex-shrink-0" />
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════
   التقرير السنوي
══════════════════════════════════════════ */
export function YearlyReportContent() {
  return (
    <Card>
      <SectionTitle icon={FileText} title="التقرير السنوي" />
      <FileRow name="التقرير السنوي" note="PDF" />
    </Card>
  );
}

/* ══════════════════════════════════════════
   الدراسات
══════════════════════════════════════════ */
export function StudiesContent() {
  return (
    <Card>
      <SectionTitle icon={BookOpen} title="الدراسات" />
    </Card>
  );
}

/* ══════════════════════════════════════════
   الخطة الاستراتيجية للجامعة
══════════════════════════════════════════ */
export function UniStrategyPlanContent() {
  return (
    <Card>
      <SectionTitle icon={Target} title="الخطة الاستراتيجية للجامعة" />
      <div className="flex flex-col gap-3">
        <FileRow name="الخطة الاستراتيجية للجامعة" note="PDF" />
        <FileRow name="الخطة الاستراتيجية 2021 – 2025" note="PDF" />
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════
   المبادرات
══════════════════════════════════════════ */
export function InitiativesContent() {
  return (
    <Card>
      <SectionTitle icon={Target} title="المبادرات" />
    </Card>
  );
}

/* ══════════════════════════════════════════
   المعلومات والتوثيق
══════════════════════════════════════════ */
export function InformationDocumentationContent() {
  return (
    <Card>
      <SectionTitle icon={Layers} title="المعلومات والتوثيق" />
    </Card>
  );
}

/* ══════════════════════════════════════════
   امتحان الكفاءة الجامعية
══════════════════════════════════════════ */
export function ProficiencyExamContent() {
  return (
    <Card>
      <SectionTitle icon={FileText} title="امتحان الكفاءة الجامعية" />
      <p className="text-sm text-gray-700 leading-relaxed">
        امتحان الكفاءة الجامعية هو عبارة عن مجموعة من الفقرات أو الأسئلة التي تقيس الكفايات العامة
        والمتوسطة والدقيقة المتوقع من الطلبة إتقانها، لطلبة الجامعات الأردنية لمرحلة البكالوريوس
        المتوقع تخرجهم، للوقوف على مخرجات التعليم في الجامعات الأردنية الرسمية والخاصة.
      </p>
    </Card>
  );
}

/* ══════════════════════════════════════════
   النماذج
══════════════════════════════════════════ */
const PROGRAM_EVAL_FORMS: { faculty: string; items: string[] }[] = [
  { faculty: 'كلية الآداب', items: ['اللغات الأوروبية', 'اللغة الإنجليزية', 'اللغة العربية'] },
  { faculty: 'كلية التمريض', items: ['التمريض'] },
  { faculty: 'كلية الحقوق', items: ['الحقوق'] },
  { faculty: 'كلية علوم الرياضة', items: ['التأهيل الرياضي', 'التربية الرياضية'] },
  { faculty: 'كلية الزراعة', items: ['التغذية والصناعات الغذائية', 'الوقاية والمكافحة المتكاملة', 'إنتاج حيواني', 'إنتاج نباتي'] },
  { faculty: 'كلية الشريعة', items: ['أصول الدين', 'الفقه وأصوله'] },
  { faculty: 'كلية الصيدلة', items: ['الصيدلة'] },
  { faculty: 'كلية الطب', items: ['الطب'] },
  { faculty: 'كلية العلوم', items: ['الرياضيات', 'علوم طبية ومخبرية', 'العلوم الحياتية', 'فيزياء', 'كيمياء'] },
  { faculty: 'كلية العلوم التربوية', items: ['الإرشاد والصحة النفسية', 'التربية الخاصة', 'رياض أطفال', 'علم النفس', 'معلم صف'] },
  { faculty: 'كلية الهندسة', items: ['هندسة الحاسوب', 'الكهربائية / إلكترونيات', 'الكهربائية / قوى وتحكم', 'المدنية / مياه وبيئة', 'الميكانيكية', 'الكهربائية / اتصالات', 'الكيماوية', 'الميكانيكية / قوى حرارية وطاقة', 'الميكانيكية / مواد وتصنيع'] },
  { faculty: 'كلية تكنولوجيا المعلومات', items: ['علم الحاسوب', 'نظم المعلومات الحاسوبية', 'هندسة البرمجيات'] },
  { faculty: 'كلية الأعمال', items: ['إدارة الأعمال', 'إدارة عامة', 'اقتصاديات المال والأعمال', 'التسويق', 'العلوم المالية والمصرفية', 'المحاسبة', 'نظم المعلومات الإدارية'] },
  { faculty: 'كلية العلوم الاجتماعية', items: ['الآثار والسياحة', 'التاريخ', 'الجغرافيا', 'العلوم السياسية', 'علم الاجتماع'] },
];

const FACULTY_EVAL_FORMS = [
  { name: 'التقييم الذاتي لعضو هيئة التدريس', note: 'DOCX' },
  { name: 'تقييم أداء عمداء الكليات', note: 'DOCX' },
  { name: 'تقييم عضو هيئة التدريس من قبل رئيس القسم', note: 'DOCX' },
  { name: 'تقييم عضو هيئة التدريس من قبل عميد الكلية', note: 'DOCX' },
  { name: 'مصفوفة الأهداف التعليمية ونتاجات التعلم للبرامج الأكاديمية', note: 'DOCX' },
  { name: 'مصفوفة المجالات المعرفية للتخصص والمواد الدراسية', note: 'DOCX' },
  { name: 'نموذج إنساني', note: 'DOCX' },
  { name: 'تقييم البرامج', note: 'DOCX' },
  { name: 'تقييم المادة', note: 'DOCX' },
  { name: 'كفاءة الخريجين من وجهة نظر سوق العمل', note: 'DOCX' },
];

const COURSE_PROGRAM_FORMS = [
  { name: 'توصيف خطة دراسية باللغة الإنجليزية (Detailed Syllabus Form)', note: 'DOCX' },
  { name: 'توصيف خطة دراسية باللغة العربية', note: 'DOCX' },
  { name: 'ملف المادة', note: 'DOCX' },
  { name: 'إلغاء أو تجميد برنامج أكاديمي', note: 'DOCX' },
  { name: 'طلب استحداث برنامج بكالوريوس', note: 'DOCX' },
  { name: 'طلب استحداث برنامج دراسات عليا (دكتوراه)', note: 'DOCX' },
  { name: 'طلب استحداث برنامج دراسات عليا (ماجستير)', note: 'DOCX' },
  { name: 'إضافة مادة دراسية جديدة', note: 'DOCX' },
  { name: 'إلغاء مادة دراسية قائمة', note: 'DOCX' },
  { name: 'تعديل خطة برنامج أكاديمي قائم', note: 'DOCX' },
];

const PLANNING_FORMS = [
  { name: 'دليل التخطيط الاستراتيجي في الجامعات', note: 'DOCX' },
  { name: 'خطة تنفيذية', note: 'DOCX' },
  { name: 'نموذج خطة استراتيجية للكليات والوحدات الإدارية', note: 'DOCX' },
  { name: 'التقرير السنوي', note: 'DOCX' },
  { name: 'تقييم الرؤية والرسالة والغايات', note: 'DOCX' },
  { name: 'دراسة التقييم', note: 'DOCX' },
  { name: 'أدلة ووثائق ومؤشرات معايير الجودة', note: 'DOCX' },
  { name: 'دليل الجودة لجامعة مؤتة', note: 'DOCX' },
  { name: 'الخطوط العريضة لكتابة الخطة الاستراتيجية', note: 'DOCX' },
];

function GroupHeading({ title }: { title: string }) {
  return (
    <div className="mb-4 mt-8 flex items-center gap-2">
      <FileText size={16} className="text-[#c9a227]" />
      <span className="text-base font-bold text-[#0f3057]">{title}</span>
    </div>
  );
}

export function FormsListContent() {
  return (
    <Card>
      <SectionTitle icon={ClipboardList} title="النماذج" />
      <p className="text-sm text-gray-600 leading-relaxed">
        نماذج تقييم البرامج والمواد وأعضاء هيئة التدريس، ونماذج استحداث وتعديل البرامج الأكاديمية،
        ونماذج التخطيط والتقارير — متاحة للتنزيل.
      </p>

      <GroupHeading title="تقييم البرنامج من قبل الطلبة المتوقع تخرجهم" />
      <div className="flex flex-col gap-5">
        {PROGRAM_EVAL_FORMS.map((g) => (
          <div key={g.faculty}>
            <p className="text-sm font-bold text-[#0f3057] mb-2.5">{g.faculty}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {g.items.map((it) => (
                <div key={it} className="flex items-center gap-2.5 border border-gray-200 rounded-lg px-4 py-2.5 hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
                  <FileText size={14} className="text-[#0f3057] flex-shrink-0" />
                  <span className="text-xs text-gray-700 flex-1 leading-snug">{it}</span>
                  <span className="text-[10px] font-bold text-gray-400">DOCX</span>
                  <Download size={13} className="text-[#c9a227] flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <GroupHeading title="تقييم أعضاء هيئة التدريس والبرامج" />
      <div className="flex flex-col gap-3">
        {FACULTY_EVAL_FORMS.map((f) => <FileRow key={f.name} name={f.name} note={f.note} />)}
      </div>

      <GroupHeading title="ملف المادة والبرامج الأكاديمية" />
      <div className="flex flex-col gap-3">
        {COURSE_PROGRAM_FORMS.map((f) => <FileRow key={f.name} name={f.name} note={f.note} />)}
      </div>

      <GroupHeading title="التخطيط والتقارير وأدلة الجودة" />
      <div className="flex flex-col gap-3">
        {PLANNING_FORMS.map((f) => <FileRow key={f.name} name={f.name} note={f.note} />)}
      </div>
    </Card>
  );
}

/* ══════════════════════════════════════════
   الأدلة
══════════════════════════════════════════ */
const QUALITY_GUIDES = [
  'دليل إجراءات ومعايير ضمان الجودة',
  'دليل معايير ضمان الجودة لبرنامج الآداب',
  'دليل معايير ضمان الجودة لبرنامج التمريض',
  'دليل معايير ضمان الجودة لبرنامج الحاسوب',
  'دليل معايير ضمان الجودة لبرنامج الحقوق',
  'دليل معايير ضمان الجودة لبرنامج الزراعة',
  'دليل معايير ضمان الجودة لبرنامج الشريعة',
  'دليل معايير ضمان الجودة لبرنامج الصيدلة',
  'دليل معايير ضمان الجودة لبرنامج الطب',
  'دليل معايير ضمان الجودة لبرنامج العلوم الإدارية',
  'دليل معايير ضمان الجودة لبرنامج العلوم التربوية',
  'دليل معايير ضمان الجودة لبرنامج اللغات',
  'دليل معايير ضمان الجودة لبرنامج الهندسة',
];

const POLICY_GUIDES = [
  'سياسات التعامل مع المواد الصلبة',
  'سياسات الحاكمية والنزاهة',
  'الاستدامة في استهلاك وجلب المواد الغذائية — جامعة مؤتة',
  'سياسات التعامل مع المواد البلاستيكية',
  'خطة تنفيذية لترشيد استهلاك الطاقة 2019–2020',
  'استهلاك الديزل في جامعة مؤتة لعام 2019',
  'سياسة عدم التمييز',
  'خارطة طريق العودة لمؤسسات التعليم العالي للعام الجامعي 2021/2022',
];

export function GuidesContent() {
  return (
    <Card>
      <SectionTitle icon={BookOpen} title="الأدلة" />
      <p className="text-sm text-gray-600 leading-relaxed">
        أدلة معايير ضمان الجودة للبرامج الأكاديمية، وسياسات الجامعة المنشورة — متاحة للتنزيل بصيغة PDF.
      </p>

      <GroupHeading title="أدلة ضمان الجودة" />
      <div className="flex flex-col gap-3">
        {QUALITY_GUIDES.map((g) => <FileRow key={g} name={g} note="PDF" />)}
      </div>

      <GroupHeading title="السياسات والاستدامة" />
      <div className="flex flex-col gap-3">
        {POLICY_GUIDES.map((g) => <FileRow key={g} name={g} note="PDF" />)}
      </div>
    </Card>
  );
}
