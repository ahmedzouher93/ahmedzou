import React from 'react';
import {
  FileText, Download, Phone, Mail, Facebook,
  User, Users, Award, Building2, MapPin, ChevronLeft, Globe
} from 'lucide-react';
import orgChart from '@/imports/org23-4.jpg';
import ncaaaLogo from '@/imports/mutah55.png';
import etimadLogo from '@/imports/55553.png';
import iaoLogo from '@/imports/iao-logo.png';

/* ─── Shared section title ─── */
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

/* ══════════════════════════════════════════
   1. الخطة الاستراتيجية
══════════════════════════════════════════ */
export function StrategicPlanContent() {
  const plans = [
    {
      title: 'الخطة الاستراتيجية لمركز التطوير الأكاديمي',
      period: '2015 – 2020',
      description: 'الخطة الاستراتيجية الأولى للمركز التي تغطي الفترة من 2015 إلى 2020، وتتضمن الأهداف الاستراتيجية ومؤشرات الأداء ومحاور العمل الرئيسية.',
      size: 'PDF',
    },
    {
      title: 'الخطة الاستراتيجية لمركز التطوير الأكاديمي',
      period: '2021 – 2025',
      description: 'الخطة الاستراتيجية المحدّثة للمركز للفترة من 2021 إلى 2025، وتتضمن التوجهات المستقبلية ومحاور التطوير الأكاديمي وضمان الجودة.',
      size: 'PDF',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 w-full">
      <SectionTitle icon={FileText} title="الخطة الاستراتيجية" />
      <p className="text-sm text-gray-600 leading-relaxed mb-8">
        يضع مركز التطوير الأكاديمي وضمان الجودة خططاً استراتيجية دورية تُحدد توجهاته وأهدافه لتطوير منظومة الجودة الأكاديمية في جامعة مؤتة. يمكنكم الاطلاع على الخطط الاستراتيجية للمركز وتنزيلها من خلال الروابط أدناه.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.period}
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all group"
          >
            {/* Card header */}
            <div className="bg-[#0f3057] px-6 py-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#c9a227]/20 flex items-center justify-center flex-shrink-0">
                <FileText size={28} className="text-[#c9a227]" />
              </div>
              <div>
                <p className="text-white font-bold text-base leading-snug">{plan.title}</p>
                <span className="inline-block mt-1 bg-[#c9a227] text-[#0f3057] text-xs font-bold px-3 py-0.5 rounded-full">
                  {plan.period}
                </span>
              </div>
            </div>
            {/* Card body */}
            <div className="px-6 py-5">
              <p className="text-sm text-gray-600 leading-relaxed mb-5">{plan.description}</p>
              <button className="flex items-center gap-2 bg-[#0f3057] hover:bg-[#0a2440] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors w-full justify-center">
                <Download size={16} />
                تنزيل الخطة ({plan.size})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   2. مجلس المركز
══════════════════════════════════════════ */
const councilMembers = [
  { role: 'رئيساً', name: 'رئيس الجامعة', college: '' },
  { role: 'عضواً', name: 'أ.د. نائب الرئيس للبحث والتطوير والعلاقات الدولية', college: '' },
  { role: 'عضواً', name: 'أ.د. نائب الرئيس للشؤون الإدارية', college: '' },
  { role: 'عضواً', name: 'أ.د. عبد السلام أبو طبنجة', college: 'كلية الأعمال' },
  { role: 'عضواً', name: 'أ.د. أمين عقل', college: 'كلية الطب' },
  { role: 'عضواً', name: 'د. مدير مركز الحاسوب', college: '' },
  { role: 'عضواً', name: 'أ.د. مدير مركز التطوير الأكاديمي وضمان الجودة', college: '' },
  { role: 'عضواً', name: 'د. معتز الطراونة', college: 'كلية الهندسة' },
];

export function CouncilContent() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 w-full">
      <SectionTitle icon={Users} title="مجلس المركز" />

      {/* Council table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#0f3057]">
              <th className="text-right text-white font-bold px-5 py-3.5 w-28">الصفة</th>
              <th className="text-right text-white font-bold px-5 py-3.5">الاسم / المنصب</th>
              <th className="text-right text-white font-bold px-5 py-3.5 w-40">الكلية / الوحدة</th>
              <th className="text-right text-white font-bold px-5 py-3.5 w-32">الهاتف</th>
            </tr>
          </thead>
          <tbody>
            {councilMembers.map((m, i) => (
              <tr
                key={i}
                className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F5F7F9]'} hover:bg-[#0f3057]/5 transition-colors`}
              >
                <td className="px-5 py-3.5">
                  <span className="inline-block bg-[#c9a227]/15 text-[#0f3057] text-xs font-bold px-2.5 py-1 rounded-full">
                    {m.role}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-semibold text-[#0f3057]">{m.name}</td>
                <td className="px-5 py-3.5 text-gray-500">{m.college || '—'}</td>
                <td className="px-5 py-3.5">
                  <span className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Phone size={12} />
                    —
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Director card */}
      <SectionTitle icon={User} title="مدير المركز" />
      <div className="flex items-center gap-5 p-5 rounded-xl border border-[#c9a227]/30 bg-[#0f3057]/3">
        <div className="w-16 h-16 rounded-full bg-[#0f3057] flex items-center justify-center flex-shrink-0">
          <User size={28} className="text-[#c9a227]" />
        </div>
        <div>
          <p className="text-lg font-bold text-[#0f3057]">د. عادل أركم سلوم</p>
          <p className="text-sm text-gray-500 mb-2">مدير مركز التطوير الأكاديمي وضمان الجودة</p>
          <a
            href="mailto:a.salloum@mutah.edu.jo"
            className="flex items-center gap-1.5 text-sm text-[#0f3057] hover:text-[#c9a227] transition-colors"
          >
            <Mail size={14} />
            a.salloum@mutah.edu.jo
          </a>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   3. الهيكل التنظيمي
══════════════════════════════════════════ */
export function OrgChartContent() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 w-full">
      <SectionTitle icon={Building2} title="الهيكل التنظيمي" />
      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        الهيكل التنظيمي لمركز التطوير الأكاديمي وضمان الجودة في جامعة مؤتة لعام 2023، يوضح الدوائر الرئيسية والشعب التابعة لها.
      </p>
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="bg-[#0f3057] px-5 py-3 flex items-center gap-2">
          <Building2 size={16} className="text-[#c9a227]" />
          <span className="text-white text-sm font-bold">الهيكل التنظيمي لمركز التطوير الأكاديمي وضمان الجودة — 2023</span>
        </div>
        <div className="bg-white p-4 flex justify-center">
          <img
            src={orgChart}
            alt="الهيكل التنظيمي لمركز التطوير الأكاديمي وضمان الجودة"
            className="max-w-full rounded-lg"
            style={{ maxHeight: '700px', objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   4. كلمة مدير المركز
══════════════════════════════════════════ */
export function DirectorMessageContent() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 w-full">
      <SectionTitle icon={User} title="كلمة مدير المركز" />

      {/* Director info */}
      <div className="flex items-center gap-5 p-5 rounded-xl bg-[#0f3057] mb-8">
        <div className="w-20 h-20 rounded-full bg-[#c9a227]/20 border-2 border-[#c9a227]/40 flex items-center justify-center flex-shrink-0">
          <User size={32} className="text-[#c9a227]" />
        </div>
        <div>
          <p className="text-xl font-bold text-white">د. عادل سلوم</p>
          <p className="text-[#c9a227] text-sm mt-1">مدير مركز التطوير الأكاديمي وضمان الجودة</p>
          <p className="text-white/60 text-xs mt-0.5">جامعة مؤتة</p>
        </div>
      </div>

      {/* Message text */}
      <div className="space-y-4 text-sm text-gray-700 leading-[2]">
        <p>
          في كل مؤسسة في العصر الحالي لابد من الأخذ في الاعتبار التطوير التنظيمي وضمان الجودة. ونحن هنا في مركز التطوير الأكاديمي وضمان الجودة نسعى لتطبيق قيم الجودة أولاً قبل المعايير والمقاييس الكمية، ومن القيم الخاصة بالجودة، تمكين الهيئة التدريسية والإدارية بالإضافة لطلبة الجامعة وزيادة انخراطهم مع أهداف المنظمة والتحسين الشخصي، وزيادة الحس بالمسؤولية وملكية البيئة. إيماناً منا بأن الجودة تبدأ أولاً من القيم قبل المقاييس.
        </p>
        <p>
          يهدف مركز التطوير الأكاديمي وضمان الجودة إلى الوصول لأبعد من الالتزام بالمعايير والأنظمة الخاصة بالجودة من خلال نشر الوعي بثقافة الجودة، إيماناً منا أن لثقافة الجودة منافع كثيرة لنتائج أعمال الجامعة في كل النواحي الخاصة بالطلبة والمجتمع والعاملين في الجامعة. بهذا تصبح الجودة نمط وأسلوب متغلل في الجامعة من خلال الحرص على التغييرات المستمرة نحو صقل نموذج إدارة جودة متكامل في الجامعة.
        </p>
        <p>
          لذلك يراعي مركز التطوير الأكاديمي الالتزام بتفعيل الجودة من خلال التدريب المستمر لكل من أعضاء هيئة التدريس والموظفين الإداريين، وأيضاً من خلال الدراسات والتطوير ومتابعة الخطة الاستراتيجية والإجرائية للجامعة.
        </p>
        <p>
          في مركز التطوير الأكاديمي وضمان الجودة نهتم برضا الطلاب من خلال استطلاع الآراء الخاصة بهم عبر عدة استبانات للرضا حول المدرسين والعملية التعليمية والتعلم الإلكتروني وخدمات الجامعة، وهذا لأننا نطمح لتجاوز توقعات الطلبة من خلال تقديم تجربة جامعية ذات جودة عالية. بالإضافة إلى التزامنا بتمكين الموظفين في الجامعة سواء الهيئة التدريسية أم الإدارية من خلال تشكيل فرق عمل خاصة بضمان الجودة حتى يشعر الجميع بأنهم جزء من فريق واحد لتشجيع الإبداع والابتكار وتقديم الأفكار.
        </p>
        <p>
          يوجد مساعد عميد لشؤون ضبط الجودة والتعليم الإلكتروني بالإضافة لشعبة ضمان الجودة في كل كلية أكاديمية، ونطمح لإنشاء شعب لمتابعة ضمان الجودة في باقي العمادات والمراكز والوحدات والدوائر المستقلة في جامعة مؤتة. إن إدارة الجودة هي الحجر الأساسي نحو النمو المستدام حيث تزودنا بإطار للعمل على تحديد وحل المشاكل قبل تفاقمها والحرص على تكييف أنفسنا للتأقلم مع البيئة الجامعية التعليمية التي تتصف بالديناميكية، حيث أن الجودة ليست وجهة للوصول إليها إنما رحلة تدفعنا للأمام.
        </p>
        <p>
          لذلك نقوم في مركز التطوير الأكاديمي بالنظر إلى جميع الكليات والعمادات والمراكز والوحدات والدوائر المستقلة في جامعة مؤتة بأنها شريك فاعل في عملية التحسين المستمر المرادف للجودة في أدبيات علم ضبط الجودة. وهو ما نسعى له من خلال تطوير برامج تدريب العاملين والأكاديميين في جامعة مؤتة بالإضافة إلى عمل دراسات لاحقة للتأكد من عملية التطوير، وأخيراً، تكييف أنشطة متابعة الجودة لتكون موائمة مع رؤية ورسالة جامعة مؤتة نحو توجه استراتيجي واعد.
        </p>
        <p>
          وفي الختام، يشكر مركز التطوير تعاون الكليات والعمادات والمراكز والوحدات والدوائر المستقلة المختلفة في جامعة مؤتة، متطلعين إلى مزيد من التعاون والتطوير ليكون العمل مشتركاً بين الجميع.
        </p>
      </div>

      {/* Signature */}
      <div className="mt-10 pt-6 border-t border-gray-100 text-center space-y-1">
        <p className="text-gray-500 text-sm">والله المستعان</p>
        <p className="text-[#0f3057] font-bold text-base">مدير مركز التطوير الأكاديمي وضمان الجودة</p>
        <p className="text-[#c9a227] font-bold">د. عادل سلوم</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   5. موظفو المركز
══════════════════════════════════════════ */
const staffList = [
  { title: 'المساعد الفني / مدير دائرة الاعتماد وضمان الجودة', name: 'د. عبير خرشيد', email: '', phone: '' },
  { title: 'مدير دائرة التطوير والدراسات', name: 'السيد بكر الزغيلات', email: '', phone: '' },
  { title: 'مدير دائرة الاستراتيجيات والمبادرات', name: 'د. سيف الدين المدادحة', email: '', phone: '' },
  { title: 'رئيس شعبة الاستراتيجيات والمبادرات', name: 'السيد عمر الصرايرة', email: 'omsar2019@mutah.edu.jo', phone: '' },
  { title: 'شعبة المعلومات والتوثيق', name: '—', email: '', phone: '' },
  { title: 'شعبة التطوير والتدريب', name: '—', email: '', phone: '' },
  { title: 'رئيس الديوان / سكرتير / طابع', name: 'السيد عماد الدين الذنيبات', email: '', phone: '' },
  { title: 'شعبة الاعتماد والتصنيف', name: 'السيد إبراهيم الصرايرة', email: '', phone: '' },
  { title: 'شعبة ضمان الجودة', name: 'السيدة أحلام النوايسة', email: '', phone: '' },
];

export function StaffContent() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 w-full">
      <SectionTitle icon={Users} title="موظفو المركز" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {staffList.map((s, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-xl p-5 hover:shadow-sm hover:border-[#c9a227]/30 transition-all"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#0f3057]/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                <User size={18} className="text-[#0f3057]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#c9a227] font-bold leading-snug mb-1">{s.title}</p>
                <p className="font-bold text-[#0f3057] text-sm leading-snug">{s.name}</p>
              </div>
            </div>
            {s.email && (
              <a
                href={`mailto:${s.email}`}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0f3057] transition-colors mt-2"
              >
                <Mail size={12} />
                {s.email}
              </a>
            )}
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1.5">
              <Phone size={12} />
              <span>—</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   7. معايير الاعتماد الوطني
══════════════════════════════════════════ */
const nationalAccreditationFiles = [
  { name: 'استحداث تخصصات', file: 'استحداث تخصصات.pdf' },
  { name: 'اعتماد أعضاء هيئة التدريس في البكالوريوس', file: 'اعتماد اعضاء هيئة التدريس في البكالوريوس.pdf' },
  { name: 'اعتماد أعضاء هيئة التدريس في التخصصات التطبيقية', file: 'اعتماد اعضاء هيئة التدريس في التخصصات التطبيقية.pdf' },
  { name: 'الاعتماد العام لبرامج الدراسات العليا', file: 'اعتماد العام لبرامج الدراسات العليا.pdf' },
  { name: 'الإطار العام لمعايير الاعتماد الخاص لتخصصات الإنسانية والعلمية', file: 'الاطار العام لمعايير الاعتماد الخاص لتخصصات الانسانية والعلمية.pdf' },
  { name: 'الاعتماد الخاص لبرنامج الماجستير', file: 'الاعتماد الخاص لبرنامج الماجستير.pdf' },
  { name: 'الاعتماد الخاص لدرجة البكالوريوس', file: 'الاعتماد الخاص لدرجة البكالوريوس.pdf' },
  { name: 'متابعة الاعتماد الخاص لدرجة البكالوريوس', file: 'متابعة الاعتماد الخاص لدرجة البكالوريوس.pdf' },
  { name: 'متابعة الاعتماد العام', file: 'متابعة الاعتماد العام.pdf' },
  { name: 'معايير الاعتماد الخاص لتخصصات الآداب والعلوم الاجتماعية', file: 'معايير الاعتماد الخاص لتخصصات الاداب والعلوم الاجتماعية.pdf' },
  { name: 'معايير الاعتماد الخاص لتخصصات الشريعة', file: 'معايير الاعتماد الخاص لتخصصات الشريعة.pdf' },
  { name: 'معايير الاعتماد الخاص لتخصصات العلوم الإدارية', file: 'معايير الاعتماد الخاص لتخصصات العلوم الادارية.pdf' },
  { name: 'معايير الاعتماد الخاص لتخصصات العلوم الرياضية', file: 'معايير الاعتماد الخاص لتخصصات العلوم الرياضية.pdf' },
  { name: 'معايير الاعتماد الخاص لتخصصات العلوم الزراعية', file: 'معايير الاعتماد الخاص لتخصصات العلوم الزراعية.pdf' },
  { name: 'معايير الاعتماد الخاص لتخصصات العلوم الطبية', file: 'معايير الاعتماد الخاص لتخصصات العلوم الطبية.pdf' },
  { name: 'معايير الاعتماد الخاص لتخصصات العلوم الطبيعية', file: 'معايير الاعتماد الخاص لتخصصات العلوم الطبيعية.pdf' },
  { name: 'معايير الاعتماد الخاص لتخصصات القانون', file: 'معايير الاعتماد الخاص لتخصصات القانون.pdf' },
  { name: 'معايير الاعتماد الخاص لتخصصات اللغات', file: 'معايير الاعتماد الخاص لتخصصات اللغات.pdf' },
  { name: 'معايير الاعتماد الخاص لتخصصات المعلوماتية', file: 'معايير الاعتماد الخاص لتخصصات المعلوماتية.pdf' },
  { name: 'معايير الاعتماد الخاص لتخصصات الهندسة', file: 'معايير الاعتماد الخاص لتخصصات الهندسة.pdf' },
];

export function NationalAccreditationContent() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 w-full" dir="rtl">
      <SectionTitle icon={Award} title="معايير الاعتماد الوطني" />

      {/* NCAAA Logo Banner */}
      <div className="flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-l from-[#0f3057] to-[#1a4a7a] rounded-2xl p-6 mb-8">
        <div className="bg-white rounded-xl p-4 flex items-center justify-center flex-shrink-0 shadow-md" style={{ minWidth: 120, minHeight: 100 }}>
          <img
            src={ncaaaLogo}
            alt="شعار هيئة اعتماد مؤسسات التعليم العالي وضمان جودتها NCAAA"
            className="object-contain"
            style={{ width: 100, height: 80 }}
          />
        </div>
        <div className="text-center sm:text-right">
          <p className="text-[#c9a227] text-xs font-bold uppercase tracking-widest mb-1">هيئة اعتماد مؤسسات التعليم العالي وضمان جودتها</p>
          <h3 className="text-white text-xl font-bold leading-snug mb-2">معايير الاعتماد الوطني</h3>
          <p className="text-white/70 text-sm leading-relaxed">
            وثائق ومعايير الاعتماد الأكاديمي الوطني الصادرة عن الهيئة، تشمل البرامج الأكاديمية المختلفة وأعضاء هيئة التدريس.
          </p>
        </div>
      </div>

      {/* PDF Files List */}
      <div className="mb-4 flex items-center gap-2">
        <FileText size={16} className="text-[#c9a227]" />
        <span className="text-base font-bold text-[#0f3057]">الوثائق والملفات ({nationalAccreditationFiles.length})</span>
      </div>
      <div className="space-y-2">
        {nationalAccreditationFiles.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 px-5 py-4 rounded-xl border border-gray-100 bg-[#F8FAFC] hover:border-[#c9a227]/40 hover:bg-[#fffbf0] transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                <FileText size={16} className="text-red-500" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-[#0f3057] transition-colors leading-snug truncate">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 truncate" dir="ltr">{item.file}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs font-bold text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded">PDF</span>
              <div className="w-8 h-8 rounded-lg bg-[#0f3057] group-hover:bg-[#c9a227] flex items-center justify-center transition-colors">
                <Download size={14} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   8. قرارات اعتماد البرامج
══════════════════════════════════════════ */
export function AccreditationDecisionsContent() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 w-full" dir="rtl">
      <SectionTitle icon={Award} title="قرارات اعتماد البرامج" />
      <div className="flex items-center justify-center py-6">
        <img
          src={etimadLogo}
          alt="شعار اعتماد Etimad"
          className="object-contain"
          style={{ width: 220, height: 130 }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   9. الاعتماد الدولي
══════════════════════════════════════════ */
export function InternationalAccreditationContent() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 w-full" dir="rtl">
      <SectionTitle icon={Globe} title="الاعتماد الدولي" />
      <div className="flex items-center justify-center py-6">
        <img
          src={iaoLogo}
          alt="شعار International Accreditation Organization"
          className="object-contain"
          style={{ width: 320, height: 190 }}
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   6. اتصل بنا
══════════════════════════════════════════ */
const phoneLines = [
  { label: 'مدير المركز', ext: '6150' },
  { label: 'السكرتير', ext: '6149' },
  { label: 'مساعد المدير', ext: '3289' },
  { label: 'الديوان', ext: '3473' },
  { label: 'شعبة التقييم', ext: '3469' },
  { label: 'امتحان MUCDL', ext: '3469' },
  { label: 'المتابعة والتوثيق', ext: '3687' },
];

export function ContactContent() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-10 w-full">
      <SectionTitle icon={Phone} title="اتصل بنا" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Phone extensions */}
        <div>
          <h3 className="text-base font-bold text-[#0f3057] mb-4 flex items-center gap-2">
            <Phone size={16} className="text-[#c9a227]" />
            أرقام التحويل الداخلي
          </h3>
          <div className="space-y-2">
            {phoneLines.map((line) => (
              <div
                key={line.label}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#F5F7F9] border border-gray-100 hover:border-[#0f3057]/20 transition-all"
              >
                <span className="text-sm text-gray-700 font-medium">{line.label}</span>
                <span className="font-bold text-[#0f3057] text-sm bg-[#c9a227]/15 px-3 py-1 rounded-full">
                  {line.ext}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Email & Social */}
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-[#0f3057] mb-4 flex items-center gap-2">
              <Mail size={16} className="text-[#c9a227]" />
              البريد الإلكتروني
            </h3>
            <a
              href="mailto:cen_develop@mutah.edu.jo"
              className="flex items-center gap-3 px-5 py-4 rounded-xl bg-[#0f3057] text-white hover:bg-[#0a2440] transition-colors"
            >
              <Mail size={18} className="text-[#c9a227] flex-shrink-0" />
              <span className="font-semibold text-sm" dir="ltr">cen_develop@mutah.edu.jo</span>
            </a>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#0f3057] mb-4 flex items-center gap-2">
              <Facebook size={16} className="text-[#c9a227]" />
              صفحة الفيسبوك
            </h3>
            <div className="flex items-center gap-3 px-5 py-4 rounded-xl border border-gray-200 bg-[#F5F7F9] hover:border-[#0f3057]/30 transition-all cursor-pointer">
              <Facebook size={20} className="text-[#0f3057] flex-shrink-0" />
              <span className="text-sm text-gray-700 font-medium">
                مركز التطوير الأكاديمي وضبط الجودة — جامعة مؤتة
              </span>
              <ChevronLeft size={14} className="text-gray-400 mr-auto" />
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#0f3057] mb-4 flex items-center gap-2">
              <MapPin size={16} className="text-[#c9a227]" />
              الموقع
            </h3>
            <div className="px-5 py-4 rounded-xl border border-gray-200 bg-[#F5F7F9]">
              <p className="text-sm text-gray-700 font-medium">جامعة مؤتة — الكرك، المملكة الأردنية الهاشمية</p>
              <p className="text-xs text-gray-500 mt-1">مركز التطوير الأكاديمي وضمان الجودة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
