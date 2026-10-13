import ITEMS from '../ItemsRegistry';
import { Link } from "react-router";
import { useTabRoute } from "../../nav";
import React, { useState } from 'react';
import {
  DeanshipShell, PageTitle, Prose, DocRow, LinkRow, NumList, Waiting,
  getSectionTitle, type NavLink
} from '../Deanships/DeanshipShell';
import { Eye, Target, Users, Phone, Mail, MapPin, Shield, FileText } from 'lucide-react';
import { NewsCard, NewsGrid } from '@/app/components/NewsCard';

const CAMPUS = 'https://www.mutah.edu.jo/PublishingImages/Mutah22.JPG';

function StaffGrid({ people }: { people: { role: string; name: string; ext?: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {people.map((m, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-start gap-4 hover:shadow-md hover:border-[#c9a227]/40 transition-all">
          <div className="w-12 h-12 rounded-full bg-[#0f3057] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-[#c9a227]" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-[#c9a227] mb-1.5 leading-relaxed">{m.role}</p>
            <h3 className="font-bold text-[#0f3057] text-[15px] leading-snug">{m.name}</h3>
            {m.ext && <p className="text-xs text-gray-500 mt-1.5" dir="ltr">فرعي {m.ext}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

function VisionMission({ vision, mission }: { vision: string; mission: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5"><Eye className="w-7 h-7 text-[#c9a227]" /></div>
        <h3 className="text-xl font-bold text-[#0f3057] mb-4">الرؤيا</h3>
        <p className="text-gray-700 leading-[2] text-justify">{vision}</p>
      </div>
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5"><Target className="w-7 h-7 text-[#c9a227]" /></div>
        <h3 className="text-xl font-bold text-[#0f3057] mb-4">الرسالة</h3>
        <p className="text-gray-700 leading-[2] text-justify">{mission}</p>
      </div>
    </div>
  );
}

function ContactBlock({ phone, ext, fax, emails }: { phone: string; ext?: string; fax?: string; emails: string[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 flex flex-col gap-4 text-sm">
        <div className="flex items-start gap-3">
          <Phone className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <p className="font-bold text-[#0f3057] mb-0.5">هاتف</p>
            <p className="text-gray-600" dir="ltr">{phone}</p>
            {ext && <p className="text-gray-600" dir="ltr">فرعي: {ext}</p>}
            {fax && <p className="text-gray-600" dir="ltr">فاكس: {fax}</p>}
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Mail className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <p className="font-bold text-[#0f3057] mb-0.5">البريد الإلكتروني</p>
            {emails.map((e) => <p key={e} className="text-gray-600" dir="ltr">{e}</p>)}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
        <div className="flex items-start gap-3">
          <MapPin className="text-[#c9a227] w-6 h-6 mt-1 shrink-0" />
          <div>
            <h4 className="font-bold text-[#0f3057] mb-3">العنوان</h4>
            <p className="text-gray-700 leading-[2]">جامعة مؤتة<br />الكرك — الأردن<br />الرمز البريدي (61710)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   دائرة الرئاسة
══════════════════════════════════════════ */
const PRES_LINKS: NavLink[] = [
  { id: 'home', name: 'الرئيسية' },
  { id: 'vision', name: 'الرؤيا والرسالة' },
  { id: 'tasks', name: 'مهام الدائرة' },
  { id: 'contact', name: 'إتصل بنا' }
];

export function PresidencyDept() {
  const [activeItem, setActiveItem] = useTabRoute('home');
  const TASK = `مهام الإشراف على جميع المراسلات الواردة والمخاطبات الصادرة عن رئاسة الجامعة، وتدقيقها، ومتابعة توزيعها، ويشمل ذلك إعداد المراسلات الصادرة عن الرئاسة إلى الجهات المختلفة داخل الجامعة وخارجها واستقبال المراسلات الواردة من داخل الجامعة وخارجها ومتابعة تنفيذ الإجراءات والقرارات المتخذة بشأنها وتوثيقها، بالإضافة إلى المساهمة في إعداد فهرس موحد لملفات الجامعة ومتابعة تحديثه، وكذلك حفظ الوثائق والتقارير والسجلات والمراسلات الرسمية العادية والمكتوبة.`;
  const VISION = 'السعي لتحقيق تطور نوعي في مهام الإشراف على تنفيذ السياسات والقرارات التي تتخذها الجامعة، وجميع المراسلات الواردة والمخاطبات الصادرة عن رئاسة الجامعة، وتقديم أفضل الخدمات بما يحقق بيئة جامعية تعكس التطور النوعي للجامعة.';
  const MISSION = 'التنسيق والتواصل مع كافة الجهات الداخلية والخارجية؛ لضمان تدفق المعلومات لتحقيق تطور نوعي في عملية تنفيذ أعمال الدائرة المتعلقة بمراسلات الجامعة، وأرشفتها، والإجراءات والقرارات المتخذة بخصوصها.';

  const render = () => {
    switch (activeItem) {
      case 'vision':
        return (
          <div className="space-y-8">
            <PageTitle title="الرؤيا والرسالة" sub="دائرة الرئاسة" />
            <VisionMission vision={VISION} mission={MISSION} />
          </div>
        );
      case 'tasks':
        return (
          <div className="space-y-8">
            <PageTitle title="مهام الدائرة" sub="تتولى دائرة الرئاسة في جامعة مؤتة المهام الآتية" />
            <Prose><p>{TASK}</p></Prose>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-8">
            <PageTitle title="إتصل بنا" sub="دائرة الرئاسة" />
            <ContactBlock phone="00962 03 2372380" ext="6000" fax="00962 03 2375540" emails={['president@mutah.edu.jo', 'Unit_admin@mutah.edu.jo']} />
          </div>
        );
      default:
        return (
          <div className="space-y-10">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src={CAMPUS} alt="دائرة الرئاسة" className="w-full max-h-[420px] object-cover" />
            </div>
            <VisionMission vision={VISION} mission={MISSION} />
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">تتولى دائرة الرئاسة في جامعة مؤتة المهام الآتية</h3>
              <p className="text-gray-700 leading-[2.1] text-justify">{TASK}</p>
            </div>
          </div>
        );
    }
  };
  return (
    <DeanshipShell brand="دائرة الرئاسة"
      tagline="الإشراف على مراسلات رئاسة الجامعة الواردة والصادرة وتدقيقها وأرشفتها ومتابعة القرارات المتخذة بشأنها."
      heroImage={CAMPUS} links={PRES_LINKS} activeItem={activeItem} setActiveItem={setActiveItem}
    >{render()}</DeanshipShell>
  );
}

/* ══════════════════════════════════════════
   دائرة الأمن الجامعي
══════════════════════════════════════════ */
const SEC_LINKS: NavLink[] = [
  { id: 'home', name: 'الرئيسية' },
  { id: 'divisions', name: 'شعب الدائرة' },
  { id: 'tasks', name: 'مهام الدائرة' },
  { id: 'staff', name: 'الكادر الوظيفي' },
  { id: 'contact', name: 'إتصل بنا' }
];

export function SecurityDept() {
  const [activeItem, setActiveItem] = useTabRoute('home');
  const DIVS = ['شعبة الامن الداخلي والمرافق الخارجية', 'شعبة الاستعلامات وامن المداخل', 'شعبة السلامة العامة ومراقبة القاعات', 'الديوان'];
  const DIST = [
    '(42) موظف أمن جامعي يعملون بالدوام الصباحي موزعين على جميع الكليات والعمادات ومجمعات القاعات والساحات والمرافق المختلفة للجامعة.',
    '(39) موظف أمن جامعي يعملون بنظام الشفتات وعددها ثلاثة شفتات، كل شفت ثلاثة عشر موظفاً يعملون ستة عشر ساعة دوام متتابع من الساعة الرابعة مساءً ولغاية الساعة الثامنة من صباح اليوم التالي، وتكون استراحتهم 48 ساعة.',
    '(13) موظف أمن في كلية الزراعة: أربعة موظفين على نظام الدوام الصباحي، وتسعة موظفين على نظام الشفتات كل شفت ثلاثة موظفين كما هو الحال بشفتات الجامعة.',
    '(3) ثلاثة موظفين أمن في كلية التمريض يعملون على نظام الدوام الصباحي، ويُغطى الدوام الليلي بموظف أمن عن طريق الشفتات بالجامعة.',
    '(24) موظف أمن موزعين على الباب الشمالي والباب الجنوبي وأبواب الرئاسة، ويعملون على نظام الدوام الصباحي.',
    '(5) موظفات أمن موزعات على الباب الشمالي والباب الجنوبي وأحياناً على باب الرئاسة.',
    '(4) موظفين سلامة عامة.',
    '(2) موظفين مراقبين قاعات المجمع القديم والمجمع الجديد.'
  ];
  const TASKS = 'المحافظة على النظام العام وضمان الأمن داخل الحرم الجامعي والمحافظة على أمن الطلبة والعاملين، وكذلك ضمان حماية كافة ممتلكات الجامعة وتنظيم دخول وخروج العاملين والطلبة من وإلى الحرم الجامعي حسب التعليمات الموضوعة لذلك.';
  const IMG = 'https://www.mutah.edu.jo/PublishingImages/security.jpg';

  const render = () => {
    switch (activeItem) {
      case 'divisions':
        return (
          <div className="space-y-8">
            <PageTitle title="شعب الدائرة" sub="تضم دائرة الأمن الجامعي الشعب التالية" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {DIVS.map((d, i) => (
                <div key={d} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:border-[#c9a227] transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-[#0f3057] flex items-center justify-center shrink-0"><Shield className="w-5 h-5 text-[#c9a227]" /></div>
                  <p className="font-bold text-[#0f3057] text-sm leading-snug">{d}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'tasks':
        return (
          <div className="space-y-8">
            <PageTitle title="المهام التي تقوم بها الدائرة" />
            <Prose><p className="font-bold">{TASKS}</p></Prose>
          </div>
        );
      case 'staff':
        return (
          <div className="space-y-8">
            <PageTitle title="الكادر الوظيفي" sub="يتوزع الكادر الوظيفي على النحو التالي" />
            <NumList items={DIST} />
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-8">
            <PageTitle title="إتصل بنا" sub="دائرة الأمن الجامعي" />
            <ContactBlock phone="00962 03 2372380" ext="6000" fax="00962 03 2375540" emails={['Unit_admin@mutah.edu.jo']} />
          </div>
        );
      default:
        return (
          <div className="space-y-10">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src={IMG} alt="دائرة الأمن الجامعي" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                أنشئت دائرة الأمن الجامعي في عام 1991 كدائرة تتبع لوحدة الخدمات، وبتاريخ 24/8/2009
                أصبحت دائرة مستقلة تتبع لرئاسة الجامعة، وتضم دائرة الأمن الجامعي الشعب التالية:
              </p>
            </Prose>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {DIVS.map((d) => (
                <div key={d} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#0f3057] flex items-center justify-center shrink-0"><Shield className="w-5 h-5 text-[#c9a227]" /></div>
                  <p className="font-bold text-[#0f3057] text-sm leading-snug">{d}</p>
                </div>
              ))}
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">المهام التي تقوم بها الدائرة</h3>
              <p className="text-gray-700 leading-[2.1] text-justify mb-6">{TASKS}</p>
              <p className="font-bold text-[#0f3057] mb-4">ويتوزع الكادر الوظيفي على النحو التالي:</p>
              <NumList items={DIST} />
            </div>
          </div>
        );
    }
  };
  return (
    <DeanshipShell brand="دائرة الأمن الجامعي"
      tagline="المحافظة على النظام العام وأمن الطلبة والعاملين وحماية ممتلكات الجامعة داخل الحرم الجامعي."
      heroImage={IMG} links={SEC_LINKS} activeItem={activeItem} setActiveItem={setActiveItem}
    >{render()}</DeanshipShell>
  );
}

/* ══════════════════════════════════════════
   دائرة المعلومات والتخطيط
══════════════════════════════════════════ */
const INFO_LINKS: NavLink[] = [
  { id: 'home', name: 'الرئيسية' },
  { id: 'about', name: 'التعريف بالدائرة ومهمتها' },
  { id: 'goals', name: 'أهداف الدائرة' },
  { id: 'divisions', name: 'مهام الشعب' },
  { id: 'staff', name: 'العاملون في الدائرة' },
  { id: 'contact', name: 'الاتصال' }
];

export function InfoPlanningDept() {
  const [activeItem, setActiveItem] = useTabRoute('home');
  const IMG = 'https://www.mutah.edu.jo/PublishingImages/infplaning.jpg';
  const MISSION = 'دائرة المعلومات والتخطيط هي إحدى الدوائر الإدارية في جامعة مؤتة، وتتلخص مهامها في توفير المعلومات ذات العلاقة بأعمال الجامعة وأنشطتها المختلفة، وكذلك توفير الإحصاءات اللازمة لمساعدة راسمي السياسة في وضع الخطة الاستراتيجية والخطط التنفيذية من خلال التنسيق بين كافة مرافق الجامعة بما يضمن النهضة الشاملة في مستوى أداء الجامعة. وتعتبر الدائرة الجهة الرئيسية المسؤولة عن توفير المعلومات التي من شأنها المساعدة في اتخاذ القرار الإداري، وكذلك تزويد الجهات الرسمية بالمعلومات المتعلقة بالجامعة.';
  const GOALS = [
    'إعداد الدراسات والخطط المتعلقة بتوسع الجامعة بما يتفق مع التوجهات الاستراتيجية لها.',
    'بناء قاعدة بيانات متكاملة لكافة النشاطات في الجامعة.',
    'نشر الوعي التخطيطي في الوحدات والدوائر من خلال عمل محاضرات تتعلق بالتخطيط وأهميته.',
    'التعاون والتنسيق مع المرافق الأخرى لتخطيط ودراسة المشاريع التطويرية في الجامعة.',
    'التعاون والتنسيق وتقديم الاستشارات اللازمة لكافة الخطط المتعلقة بالكليات والوحدات والدوائر لضمان التزامها بنطاق الخطة الاستراتيجية والخطط التنفيذية.',
    'المشاركة والتنسيق مع وحدة الشؤون المالية بخصوص إعداد الموازنة.',
    'المساهمة في إعداد وتحديث الهياكل التنظيمية والوصف الوظيفي لكافة الوظائف في مختلف مرافق الجامعة.'
  ];
  const STAFF = [
    { role: 'مدير الدائرة', name: 'الدكتور فايز المجالي' },
    { role: 'رئيس شعبة التخطيط والتطوير', name: 'الدكتور قبلان الخرشة' },
    { role: 'موظف ديوان', name: 'السيد فيصل الصرايرة' },
    { role: 'عامل بريد', name: 'السيد محمد الطراونة' }
  ];

  const render = () => {
    switch (activeItem) {
      case 'about':
        return (
          <div className="space-y-8">
            <PageTitle title="التعريف بالدائرة ومهمتها" />
            <div className="bg-gradient-to-l from-[#8a6d1f] to-[#c9a227] rounded-3xl p-8">
              <p className="text-white/80 text-xs font-bold mb-2">التعريف بالدائرة</p>
              <h3 className="text-white text-xl font-bold leading-snug">دائرة مركزية متكاملة للمعلومات والبيانات لتفعيل القرار الإداري</h3>
            </div>
            <Prose><p className="font-bold text-[#0f3057]">مهمة الدائرة</p><p>{MISSION}</p></Prose>
          </div>
        );
      case 'goals':
        return (
          <div className="space-y-8">
            <PageTitle title="أهداف الدائرة" />
            <NumList items={GOALS} />
          </div>
        );
      case 'divisions':
        return (
          <div className="space-y-8">
            <PageTitle title="مهام الشعب" />
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">مهام شعبة التخطيط</h3>
              <p className="text-gray-700 leading-[2] text-justify">
                ما يقع في صلب مهام هذه الشعبة هو إرساء تقنيات التخطيط في عمل كافة الوحدات والدوائر في
                الجامعة، وذلك من خلال عمل محاضرات تتعلق بالتخطيط مع بعض الجهات المعنية وأهميته،
                بالإضافة إلى موافقة التنسيق بين خطط مرافق الجامعة المختلفة بما يضمن التزامها بنطاق
                الخطط الاستراتيجية والتنفيذية للجامعة.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">مهام شعبة البيانات</h3>
              <p className="text-gray-700 leading-[2] text-justify">
                تتولى شعبة البيانات في الدائرة مهام جمع المعلومات الإحصائية لمختلف مرافق الجامعة
                الأكاديمية والمتعلقة بالطلاب وأعضاء هيئة التدريس، وكذلك بما يتعلق بالموظفين الإداريين
                والفنيين والنشاطات الإدارية، والمشاركة في كافة أعمال لجان المطبوعات المتعلقة بالجامعة.
              </p>
            </div>
          </div>
        );
      case 'staff':
        return (
          <div className="space-y-8">
            <PageTitle title="العاملون في الدائرة" />
            <StaffGrid people={STAFF} />
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-8">
            <PageTitle title="الاتصال" sub="دائرة المعلومات والتخطيط" />
            <ContactBlock phone="032372380" ext="6147 – 6148" emails={['planning@mutah.edu.jo']} />
            <p className="text-sm text-gray-500">جامعة مؤتة — ص. ب (7)</p>
          </div>
        );
      default:
        return (
          <div className="space-y-10">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src={IMG} alt="دائرة المعلومات والتخطيط" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-gradient-to-l from-[#8a6d1f] to-[#c9a227] rounded-3xl p-8">
              <p className="text-white/80 text-xs font-bold mb-2">مدير الدائرة</p>
              <h3 className="text-white text-2xl font-bold">الدكتور فايز المجالي</h3>
            </div>
            <Prose>
              <p className="font-bold text-[#0f3057]">التعريف بالدائرة</p>
              <p>دائرة مركزية متكاملة للمعلومات والبيانات لتفعيل القرار الإداري.</p>
              <p className="font-bold text-[#0f3057] pt-2">مهمة الدائرة</p>
              <p>{MISSION}</p>
            </Prose>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#0f3057] mb-6">أهداف الدائرة</h3>
              <NumList items={GOALS} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">العاملون في الدائرة</h3>
              <StaffGrid people={STAFF} />
            </div>
          </div>
        );
    }
  };
  return (
    <DeanshipShell brand="دائرة المعلومات والتخطيط"
      tagline="دائرة مركزية متكاملة للمعلومات والبيانات لتفعيل القرار الإداري."
      heroImage={IMG} links={INFO_LINKS} activeItem={activeItem} setActiveItem={setActiveItem}
    >{render()}</DeanshipShell>
  );
}

/* ══════════════════════════════════════════
   دائرة الشؤون القانونية
══════════════════════════════════════════ */
const LEGAL_LINKS: NavLink[] = [
  { id: 'home', name: 'الرئيسية' },
  { id: 'about', name: 'نبذة عن الدائرة' },
  { id: 'vision', name: 'رؤية ورسالة الدائرة' },
  { id: 'director', name: 'كلمة المدير' },
  { id: 'tasks', name: 'مهام الدائرة' },
  { id: 'staff', name: 'الكادر الإداري' },
  { id: 'structure', name: 'الهيكل التنظيمي' },
  { id: 'contact', name: 'إتصل بنا' }
];

export function LegalAffairsDept() {
  const [activeItem, setActiveItem] = useTabRoute('home');
  const IMG = 'https://www.mutah.edu.jo/PublishingImages/legalaffairs.jpg';
  const DIR_IMG = 'https://www.mutah.edu.jo/SiteAssets/Pages/Forms/EditForm/ss10.jpg';
  const CHART = 'https://www.mutah.edu.jo/SiteAssets/Pages/Forms/EditForm/st10.png';
  const TASKS = [
    'المشاركة في صياغة العقود والاتفاقيات ومذكرات التفاهم التي تكون الجامعة طرفاً فيها.',
    'تقديم الاستشارات القانونية لرئيس الجامعة ونواب الرئيس.',
    'مراجعة ومتابعة منظومة التشريعات الناظمة للعمل في الجامعة وتحديثها حسب الأصول.',
    'متابعة قضايا الجامعة الداخلية والخارجية ومتابعتها مع محامي الجامعة والجهات ذات العلاقة.',
    'المشاركة في اللجان القانونية والفنية في الجامعة.',
    'متابعة تعديلات القوانين والأنظمة والتعليمات المعمول بها في الجامعة والأسس والقرارات الصادرة بمقتضاها.'
  ];
  const STAFF = [
    { role: 'مستشار الرئيس للشؤون القانونية / مدير دائرة الشؤون القانونية', name: 'أ.د. سيف إبراهيم المصاروة', ext: '6028' },
    { role: 'مساعد مدير دائرة الشؤون القانونية', name: 'الدكتور نايف احمد الذنيبات', ext: '4054' },
    { role: 'رئيس شعبة متابعة القضايا', name: 'السيد جهاد الكردي', ext: '4042' },
    { role: 'رئيس شعبة الاستشارات وتطوير التشريعات', name: 'السيدة سميرة الرولة', ext: '6027' },
    { role: 'رئيس الديوان', name: 'الدكتور ناصر المعايطة', ext: '4048' },
    { role: 'رئيس فرع القضايا الخارجية', name: 'السيد محمد الصرايرة', ext: '4048' }
  ];
  const ABOUT1 = 'أنشئت هذه الدائرة في عام 1990م تحت مسمى مكتب الشؤون القانونية في الجامعة، وأعيدت هيكلتها بشكلها الحالي في عام 1999م، حيث تشارك الدائرة في اقتراح التعديلات للأنظمة والتعليمات المعمول بها لتنسجم مع منظومة التشريعات الأردنية ذات العلاقة، كما تتابع تعديلات القوانين والأنظمة المعمول بها في الجامعة والأسس والقرارات الصادرة بمقتضاها وإصدار الدليل الخاص بها بالتعاون مع الجهات ذات العلاقة.';
  const ABOUT2 = 'وكما تتولى الدائرة بالتعاون مع محامي الجامعة متابعة القضايا التي تكون الجامعة طرفاً فيها، وإبداء الرأي في النزاعات الحقوقية والجزائية والإدارية المتعلّقة بالعاملين فيها، كما تشارك في صياغة العقود والاتفاقيات التي تكون الجامعة طرفاً فيها، وتقديم الاستشارات القانونية لجميع وحدات الجامعة من خلال رئيس الجامعة ونوابه، إضافة إلى العديد من المهام القانونية الأخرى المناطة بالدائرة.';
  const DIR_TEXT = 'تعتبر دائرة الشؤون القانونية في جامعة مؤتة من الدوائر الهامة في الجامعة التي تضمن قانونية سير العمل وحسن الأداء في تقديم الخدمات والأعمال في الجامعة من خلال المهام الموكلة إليها والمتميزة بالصفة النظامية والقانونية. وهذا يعود إلى كونها تضطلع بمهام أساسية تساهم في مراجعة ودراسة مشاريع القوانين والأنظمة والتعليمات والقرارات وتطويرها لضمان مشروعيتها، وتقديم الاستشارات القانونية بمختلف المواضيع ذات العلاقة بعملها، بالإضافة إلى أنها تقوم بمتابعة تطبيق المنظومة التشريعية بما يكفل تحقيق العدالة والمساواة، كما تقوم دائرة الشؤون القانونية بتقديم الرأي القانوني في كل ما يعرض عليها من موضوعات ومراجعة كافة العقود والاتفاقيات ومذكرات التفاهم التي تكون الجامعة طرفاً فيها ومتابعة قضايا الجامعة الداخلية والخارجية.';

  const render = () => {
    switch (activeItem) {
      case 'about':
        return (
          <div className="space-y-8">
            <PageTitle title="نبذة عن الدائرة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src={IMG} alt="دائرة الشؤون القانونية" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose><p>{ABOUT1}</p><p>{ABOUT2}</p></Prose>
          </div>
        );
      case 'vision':
        return (
          <div className="space-y-8">
            <PageTitle title="رؤية ورسالة الدائرة" />
            <VisionMission
              vision="تسعى دائرة الشؤون القانونية في جامعة مؤتة أن تكون مرجعية قانونية لجميع كليات ودوائر الجامعة ومراكزها، وترسيخ قيم العدالة والمساواة في الحقوق والواجبات بين جميع المنتسبين للجامعة؛ مدرسين وموظفين وطلبة."
              mission="نشر الثقافة القانونية المبنية على الالتزام بالمنظومة التشريعية الناظمة للعمل داخل الجامعة والتي تحدد حقوق وواجبات جميع العاملين والطلبة في الجامعة، بما يحقق رؤية الجامعة ورسالتها وأهدافها."
            />
          </div>
        );
      case 'director':
        return (
          <div className="space-y-8">
            <PageTitle title="كلمة المدير" />
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 shrink-0 bg-gray-50 rounded-3xl p-5 border border-gray-100 text-center">
                <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-[#0f3057]">
                  <img src={DIR_IMG} alt="مدير دائرة الشؤون القانونية" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-[#0f3057] leading-snug">أ.د. سيف إبراهيم المصاروة</h3>
                <p className="text-[#c9a227] font-bold text-sm mt-1">مستشار الرئيس للشؤون القانونية — مدير الدائرة</p>
              </div>
              <div className="w-full md:w-2/3">
                <Prose>
                  <p>{DIR_TEXT}</p>
                  <div className="pt-4 border-t border-gray-100 mt-4">
                    <p className="font-bold text-[#0f3057]">مستشار الرئيس للشؤون القانونية · مدير دائرة الشؤون القانونية</p>
                    <p className="font-bold text-[#c9a227]">أ.د. سيف إبراهيم المصاروة</p>
                  </div>
                </Prose>
              </div>
            </div>
          </div>
        );
      case 'tasks':
        return (
          <div className="space-y-8">
            <PageTitle title="مهام الدائرة" />
            <NumList items={TASKS} />
          </div>
        );
      case 'staff':
        return (
          <div className="space-y-8">
            <PageTitle title="الكادر الإداري" sub="دائرة الشؤون القانونية" />
            <StaffGrid people={STAFF} />
          </div>
        );
      case 'structure':
        return (
          <div className="space-y-8">
            <PageTitle title="الهيكل التنظيمي للدائرة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white p-4">
              <img src={CHART} alt="الهيكل التنظيمي لدائرة الشؤون القانونية" className="w-full max-h-[560px] object-contain" />
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-8">
            <PageTitle title="إتصل بنا" sub="دائرة الشؤون القانونية" />
            <ContactBlock phone="032372380" ext="6028 / 6027 — الديوان: 6028" emails={['Unit_admin@mutah.edu.jo']} />
          </div>
        );
      default:
        return (
          <div className="space-y-10">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src={IMG} alt="دائرة الشؤون القانونية" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p className="font-bold text-[#0f3057] text-lg">نبذة عن الدائرة</p>
              <p>{ABOUT1}</p>
              <p>{ABOUT2}</p>
            </Prose>
            <VisionMission
              vision="تسعى دائرة الشؤون القانونية في جامعة مؤتة أن تكون مرجعية قانونية لجميع كليات ودوائر الجامعة ومراكزها، وترسيخ قيم العدالة والمساواة في الحقوق والواجبات بين جميع المنتسبين للجامعة؛ مدرسين وموظفين وطلبة."
              mission="نشر الثقافة القانونية المبنية على الالتزام بالمنظومة التشريعية الناظمة للعمل داخل الجامعة والتي تحدد حقوق وواجبات جميع العاملين والطلبة في الجامعة، بما يحقق رؤية الجامعة ورسالتها وأهدافها."
            />
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#0f3057] mb-6">مهام الدائرة</h3>
              <NumList items={TASKS} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">الكادر الإداري</h3>
              <StaffGrid people={STAFF} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">الهيكل التنظيمي للدائرة</h3>
              <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white p-4">
                <img src={CHART} alt="الهيكل التنظيمي" className="w-full max-h-[560px] object-contain" />
              </div>
            </div>
          </div>
        );
    }
  };
  return (
    <DeanshipShell brand="دائرة الشؤون القانونية"
      tagline="مرجعية قانونية لكليات الجامعة ودوائرها ومراكزها، وترسيخ قيم العدالة والمساواة بين جميع المنتسبين."
      heroImage={IMG} links={LEGAL_LINKS} activeItem={activeItem} setActiveItem={setActiveItem}
    >{render()}</DeanshipShell>
  );
}

/* ══════════════════════════════════════════
   دائرة الرقابة والتدقيق الداخلية
══════════════════════════════════════════ */
const ICA_LINKS: NavLink[] = [
  { id: 'home', name: 'الرئيسية' },
  {
    id: 'about', name: 'عن الدائرة',
    children: [
      { id: 'about-brief', name: 'نبذة' },
      { id: 'about-strategy', name: 'الرؤية، الرسالة، الاهداف' },
      { id: 'about-director', name: 'كلمة المدير' },
      { id: 'about-staff', name: 'الكادر الإداري' },
      { id: 'about-structure', name: 'الهيكل التنظيمي' }
    ]
  },
  {
    id: 'divisions', name: 'الشعب',
    children: [
      { id: 'div-technical', name: 'الرقابة الفنية' },
      { id: 'div-admin', name: 'الرقابة الإدارية' },
      { id: 'div-tracking', name: 'المتابعة' },
      { id: 'div-finance', name: 'الرقابة المالية' },
      { id: 'div-diwan', name: 'الديوان' }
    ]
  },
  { id: 'behaviour', name: 'معايير السلوك الوظيفي للمدققين' },
  { id: 'standards', name: 'معايير الاداء الرقابي' },
  { id: 'regulations', name: 'التشريعات' },
  { id: 'gallery', name: 'معرض الصور' },
  { id: 'contact', name: 'إتصل بنا' }
];

export function InternalAuditDept() {
  const [activeItem, setActiveItem] = useTabRoute('home');
  const IMG = 'https://www.mutah.edu.jo/ar/ica/PublishingImages/audit.jpg';
  const HERO = 'https://www.mutah.edu.jo/ar/ica/PublishingImages/ica5.jpg';
  const DIVS = ['شعبة الرقابة المالية', 'شعبة الرقابة الإدارية', 'شعبة الرقابة الفنية', 'شعبة المتابعة'];
  const ABOUT1 = 'تم بموجب المادة (25/ج) من قانون الجامعات الأردنية رقم (2) لسنة 2009 ونظام الرقابة الداخلية وتعديلاته رقم (3) لسنة 2011 تطوير دائرة الرقابة الذي تم إنشاؤه في الجامعة بموجب المادة (37) من النظام المالي في جامعة مؤتة رقم (35) لسنة 1987م، بحيث أصبح يرتبط إدارياً بمجلس أمناء الجامعة وتحت مسمى دائرة الرقابة والتدقيق الداخلية، وتقوم بمهامها من خلال:';
  const ABOUT2 = 'وتتولى الدائرة القيام بمهمة الرقابة المالية على كافة إيرادات الجامعة والرقابة المباشرة على الإنفاق من خلال التدقيق المسبق على كافة سندات الصرف، بالإضافة إلى دراسة المعاملات المحولة إليها من قبل عطوفة رئيس الجامعة والأساتذة نواب الرئيس لبيان الرأي فيها قبل اتخاذ القرارات، علاوة على ممارسة الأعمال الرقابية على كافة مرافق الجامعة من خلال الرقابة الميدانية.';
  const GOALS = [
    'المحافظة على أموال الجامعة وموجوداتها والتأكد من استخدامها بالشكل الأمثل.',
    'العمل على تطوير النظام المالي في الجامعة لتمكين الجامعة من زيادة إيراداتها وضبط النفقات فيها.',
    'المساهمة في إعادة صياغة التشريعات لتصبح أكثر شمولية ومواكبة للتطور في الجامعة وبما يتفق مع أسس الرقابة الداخلية.',
    'تعزيز القيم والمبادئ الأخلاقية في أداء العمل في الجامعة.',
    'المساعدة في استخدام موارد الجامعة بكفاءة وفاعلية.',
    'تعزيز القيم المؤسسية والمبادئ الأخلاقية في أداء العمل في الجامعة.'
  ];

  const render = () => {
    switch (activeItem) {
      case 'about-brief':
        return (
          <div className="space-y-8">
            <PageTitle title="نبذة عن دائرة الرقابة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src={IMG} alt="دائرة الرقابة والتدقيق الداخلية" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose><p className="font-bold text-[#0f3057]">دائرة الرقابة والتدقيق الداخلية</p><p>{ABOUT1}</p></Prose>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DIVS.map((d, i) => (
                <div key={d} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-center gap-4">
                  <span className="w-9 h-9 rounded-lg bg-[#0f3057] text-[#c9a227] text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="font-bold text-[#0f3057] text-sm">{d}</p>
                </div>
              ))}
            </div>
            <Prose><p>{ABOUT2}</p></Prose>
            <LinkRow name="للتواصل أو تقديم أي شكوى: auditing@mutah.edu.jo" url="mailto:auditing@mutah.edu.jo" />
          </div>
        );
      case 'about-strategy':
        return (
          <div className="space-y-8">
            <PageTitle title="الرؤية، الرسالة، الاهداف" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/ica/PublishingImages/aduit1.jpg" alt="الرؤية والرسالة والأهداف" className="w-full max-h-[420px] object-cover" />
            </div>
            <VisionMission
              vision="مساندة إدارة الجامعة للقيام بأعمالها على الوجه الأكمل لتحقيق أهدافها بكفاية عالية."
              mission="تحقيق رقابة فعالة على أموال وقرارات الجامعة، وفقاً لأفضل الممارسات الرقابية والمعايير المهنية، والعمل باستقلالية وموضوعية."
            />
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#0f3057] mb-6">الأهداف</h3>
              <NumList items={GOALS} />
            </div>
          </div>
        );
      case 'about-director':
        return (
          <div className="space-y-8">
            <PageTitle title="كلمة المدير" sub="دائرة الرقابة والتدقيق الداخلية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm"><img src="https://www.mutah.edu.jo/ar/ica/PublishingImages/ica1.jpg" alt="كلمة المدير" className="w-full max-h-[380px] object-cover" /></div>
            <Prose>
              <p>تقوم دائرة الرقابة والتدقيق الداخلية منذ إنشائها بكافة الأعمال المناطة بها وفقاً للأنظمة والتشريعات النافذة في الجامعة والمعايير المهنية والموضوعية، وتواكب في عملها السعي إلى التطوير في الأداء من خلال تطبيق المعايير الدولية في التدقيق.</p>
              <p>وتقوم الدائرة بكافة الأعمال الرقابية على الجامعة مالياً وإدارياً وقانونياً، وتسعى دوماً للارتقاء بجامعة مؤتة لتحقيق الأهداف المرجوة من وجود الجامعة.</p>
            </Prose>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5"><p className="text-xs font-bold text-gray-400 mb-1">مدير دائرة الرقابة والتدقيق الداخلية</p><p className="font-bold text-[#0f3057] text-[16px]">د. حازم المعايطة</p></div>
          </div>
        );

      case 'about-staff':
        return (
          <div className="space-y-8">
            <PageTitle title="الموظفون" sub="الكادر الإداري — دائرة الرقابة والتدقيق الداخلية" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[["مدير الدائرة","الدكتور حازم المعايطة","6022"],["مساعد مدير دائرة الرقابة والتدقيق الداخلية","ميسون حدادين","4025"],["رئيس الديوان","حنان الصرايرة","4123"],["رئيس شعبة المتابعة","شاغر","3698"],["رئيس شعبة الرقابة المالية","جمانه الضمور","4738"],["رئيس شعبة الرقابة الميدانية","دعاء الصعوب","3693"],["رئيس شعبة الرقابة الادارية","لمى المبيضين","4738"],["رئيس شعبة الرقابة الفنية","بلال العساسفه","3628"],["مدقق مالي","زيد البقاعين","3628"],["عامل بريد","سليمان العشوش","4123"],["كاتب ديوان","محمد الصرايره","4123"]].map((d: string[], i: number) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#0f3057] flex items-center justify-center flex-shrink-0 text-[#c9a227] font-bold">{i + 1}</div>
                  <div>
                    <p className="text-[15px] font-bold text-[#0f3057] leading-relaxed">{d[1]}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{d[0]}</p>
                    <p className="text-xs font-bold text-[#c9a227] mt-2">هاتف فرعي: <span dir="ltr">{d[2]}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'about-structure':
        return (
          <div className="space-y-8">
            <PageTitle title="الهيكل التنظيمي" sub="دائرة الرقابة والتدقيق الداخلية" />
            <DocRow name="بطاقة تحليل وظيفي" url="https://www.mutah.edu.jo/ar/ica/SiteAssets/Pages/Forms/EditForm/%d8%a8%d8%b7%d8%a7%d9%82%d8%a9%20%d8%aa%d8%ad%d9%84%d9%8a%d9%84%20%d9%88%d8%b8%d9%8a%d9%81%d9%8a.pdf" />
            <figure className="m-0 bg-white border border-gray-100 rounded-3xl p-4 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/ica/SiteAssets/Pages/Forms/EditForm/org-str.png" alt="الهيكل التنظيمي" className="w-full max-h-[620px] object-contain" />
            </figure>
          </div>
        );

      case 'div-technical':
        return (
          <div className="space-y-8">
            <PageTitle title="الرقابة الفنية" sub="دائرة الرقابة والتدقيق الداخلية" />
            
            <Prose><p>تقع هذه الوظيفة ضمن دائرة الرقابة والتدقيق الداخلية، تتولى مهمة الإشراف على تطبيق نظام الرقابة الداخلية ومتابعة تطبيق معايير الرقابة المعتمدة من قبل وزارة المالية، وتتولى كذلك مهام تدقيق كافة القرارات والمعاملات الإدارية والمالية المتعلقة بأعضاء هيئة التدريس من عمل إضافي وإجازات وخطط الجدول الدراسي ولجان الإشراف على رسائل الدراسات العليا، ومتابعة كافة اللجان المشكلة في الجامعة وتنفيذ القرارات الصادرة بموجبها.</p></Prose>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">الوصف (الواجبات والمسؤوليات الوظيفية)</h3><NumList items={["الإشراف على تطبيق نظام الرقابة الداخلية ومعايير التدقيق المعتمدة من وزارة المالية.","الإشراف على أعمال الشعبة وتقسيم العمل على الموظفين وتقييم أدائهم.","الإشراف على تدقيق القرارات والإجراءات المالية والإدارية المتخذة لأعضاء هيئة التدريس حسب القوانين والأنظمة والتعليمات النافذة.","إعداد الردود والتقارير اللازمة بعد الانتهاء من عملية التدقيق وتقديم النتائج للرئيس المباشر.","إبداء الرأي والاستشارات الإدارية والمالية في المعاملات التي تحال إليه والخاصة بأعضاء هيئة التدريس فيما يتعلق بتدقيق العمل الإضافي والجداول الدراسية والخطط والمكافآت وغيرها.","المشاركة في اللجان المختلفة في الجامعة ضمن مجال العمل.","أية أعمال أخرى يكلف بها من قبل الرئيس المباشر ضمن حدود مهامه ومسؤولياته الوظيفية."]} /></div>
          </div>
        );

      case 'div-admin':
        return (
          <div className="space-y-8">
            <PageTitle title="الرقابة الإدارية" sub="دائرة الرقابة والتدقيق الداخلية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm"><img src="https://www.mutah.edu.jo/ar/ica/PublishingImages/audit_rr.jpg" alt="الرقابة الإدارية" className="w-full max-h-[380px] object-cover" /></div>
            <Prose><p>تقع هذه الوظيفة ضمن دائرة الرقابة والتدقيق الداخلية، وتتولى مهام التأكد من صحة وسلامة الإجراءات والقرارات الإدارية التي تتخذها الجامعة ومراقبة تطبيقها في إطار التشريعات والتعليمات المعمول بها، والكشف عن الانحرافات السلبية وكتابة التقارير للرئيس المباشر.</p></Prose>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">الوصف (الواجبات والمسؤوليات الوظيفية)</h3><NumList items={["الإشراف على أعمال الشعبة وتقسيم العمل على الموظفين وتقييم أدائهم.","تدقيق صحة القرارات المتخذة وإجراءات العمل المعمول بها وحسب القوانين والأنظمة والتعليمات النافذة.","القيام بالزيارات الميدانية المفاجئة لمرافق الجامعة للتحقق من مطابقة بيانات السجلات على الواقع، بما فيها التأكد من دوام الموظفين وإجازاتهم وكتابة التقارير بالانحرافات.","تقديم الرأي والاستشارات الإدارية والمالية في المعاملات التي تحال إليه من قبل الرئيس المباشر وفقاً للتشريعات المعمول بها.","إعداد الردود والتقارير اللازمة بعد الانتهاء من عملية التدقيق وتقديم النتائج للرئيس المباشر.","التأكد من سلامة العمليات المالية والإدارية والقرارات المتخذة وانسجامها مع التشريعات النافذة.","تدقيق الوثائق المعززة والضرورية للمعاملات الإدارية والمالية والتحقق من وجودها وصحتها.","المشاركة في اللجان المختلفة في الجامعة ضمن مجال العمل.","أية أعمال أخرى يكلف بها من قبل الرئيس المباشر ضمن حدود مهامه ومسؤولياته الوظيفية."]} /></div>
          </div>
        );

      case 'div-tracking':
        return (
          <div className="space-y-8">
            <PageTitle title="المتابعة" sub="دائرة الرقابة والتدقيق الداخلية" />
            
            <Prose><p>تقع هذه الوظيفة ضمن دائرة الرقابة والتدقيق الداخلية، وتتولى مهام متابعة وتوثيق تنفيذ كافة التوصيات الصادرة عن الدائرة ومتابعة الاستيضاحات الموجهة إلى الجامعة من مختلف الجهات الرقابية.</p></Prose>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">الوصف (الواجبات والمسؤوليات الوظيفية)</h3><NumList items={["الإشراف على أعمال الشعبة وتقسيم العمل على الموظفين وتقييم أدائهم.","إعداد الردود والتقارير اللازمة بعد الانتهاء من عملية التدقيق وتقديم النتائج للرئيس المباشر.","إبداء الرأي والاستشارات الإدارية والمالية في المعاملات التي تحال إليه من قبل مدير الدائرة.","المشاركة في اللجان المختلفة في الجامعة ضمن مجال العمل.","أية أعمال أخرى يكلف بها من قبل الرئيس المباشر ضمن حدود مهامه ومسؤولياته الوظيفية."]} /></div>
          </div>
        );

      case 'div-finance':
        return (
          <div className="space-y-8">
            <PageTitle title="الرقابة المالية" sub="دائرة الرقابة والتدقيق الداخلية" />
            
            <Prose><p>تقع هذه الوظيفة ضمن دائرة الرقابة والتدقيق الداخلية، وتتولى مهام التأكد من صحة وسلامة الإجراءات ذات الأثر المالي التي تتخذها الجامعة من خلال فحص دقة البيانات الحسابية وسلامة الإجراءات والتطبيقات المالية وآلية تنفيذها في إطار التشريعات والتعليمات المالية المعمول بها، إضافة للتأكد من صحة وأصولية السجلات والمستندات المالية وحسن استخدامها وحفظها.</p></Prose>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">الوصف (الواجبات والمسؤوليات الوظيفية)</h3><NumList items={["الإشراف على أعمال الشعبة وتقسيم العمل على الموظفين وتقييم أدائهم.","تدقيق القرارات والمعاملات والمستندات المالية والوثائق المتعلقة بالإيرادات والنفقات والعطاءات ذات الأثر المالي للتأكد من صحتها وسلامتها وفقاً للتشريعات والمبادئ المحاسبية المعمول بها في الجامعة.","التحقق من كافة العمليات والإجراءات المالية والمحاسبية وطلبات الشراء ومتابعة الالتزام بها وفقاً للتشريعات.","القيام بالزيارات الميدانية المفاجئة لمرافق الجامعة للتحقق من مطابقة بيانات السجلات على الواقع.","القيام بالزيارات المفاجئة والجرد على الصندوق العام والصناديق الفرعية الأخرى في الجامعة.","المشاركة في اللجان التي يترتب على عملها أثر مالي مثل لجان (الجرد، الإتلاف، المشتريات...).","إبداء الرأي في المعاملات التي تحال إليه ذات الصبغة المالية.","أية أعمال أخرى يكلف بها من قبل الرئيس المباشر ضمن اختصاص العمل."]} /></div>
          </div>
        );

      case 'behaviour':
        return (
          <div className="space-y-8">
            <PageTitle title="معايير السلوك الوظيفي للمدققين" sub="دائرة الرقابة والتدقيق الداخلية" />
            <NumList items={["معيار الكفاءة المهنية: أن يكون كادر الدائرة حاصلاً على مستوى من المعرفة المهنية والمهارات والكفاءة المطلوبة للقيام بواجباته.","معيار العناية المهنية: من خلال بذل العناية المهنية عند القيام بنشاطات التدقيق.","معيار الاستقلالية والموضوعية والحياد: بأن يكون نشاط التدقيق مستقلاً والمدقق موضوعياً، وأن يكون بمنأى عن أي تدخل قد يؤدي إلى تحديد نطاق التدقيق.","معيار السرية: من خلال المحافظة على سرية المعلومات والبيانات التي يطلعون عليها بحكم عملهم، وأن لا يكشف عن هذه المعلومات لأي طرف إلا وفق ما نصت عليه التشريعات.","معيار رقابة الجودة: تطوير جودة نشاطات التدقيق وتحسين برامجه، ومتابعتها والتأكد من الالتزام بمعايير الجودة في تنفيذ المهام وكافة نواحي نشاطات الرقابة المالية، والعمل على متابعة فعاليتها باستمرار."]} />
          </div>
        );

      case 'standards':
        return (
          <div className="space-y-8">
            <PageTitle title="معايير الأداء الرقابي" sub="دائرة الرقابة والتدقيق الداخلية" />
            <NumList items={["معيار إدارة المخاطر: مخاطر التدقيق هي المخاطر الناشئة عن احتمال إجازة المدقق لمعاملة مالية غير صحيحة أو إبداء رأي غير مناسب في بيانات أو قوائم مالية محرفة أو غير دقيقة.","معيار التخطيط: إعداد خطة لنشاطات التدقيق التي تم تحديدها وفق المخاطر المحتملة وأن يتم اعتماد هذه الخطة من قبل مجلس أمناء الجامعة، بحيث تضمن إجراء تدقيق ذي جودة عالية بصورة اقتصادية وفعالة وذات كفاءة وفي الوقت المناسب.","معيار التوثيق وأدلة الإثبات: على المدقق توثيق عملية التدقيق في أوراق عمل سواء كان ورقياً أو إلكترونياً.","معيار التحكم المؤسسي: يجب على نشاط الرقابة المساهمة في عمليات توجيه حوكمة العمل في الجامعة.","معيار الإشراف: ينبغي الإشراف بصورة مناسبة على العمل في كل مرحلة من مراحل عملية التدقيق.","معيار تحليل البيانات المالية: يجب على المدقق دراسة وتحليل التقارير والبيانات المالية تحليلاً تاماً، كالقوائم المالية أو الحسابات الختامية والإيضاحات المتعلقة بها.","معيار التقارير: يجب على دائرة الرقابة والتدقيق الداخلية تقديم تقارير منتظمة وكلما دعت الحاجة إلى مجلس أمناء الجامعة، عن نشاطات التدقيق والإنجازات من الخطة المعتمدة، وأن تتضمن التقارير أهداف مهام التدقيق ونطاقها واستنتاجاتها، ويجب أن يحتوي التقرير النهائي رأياً أو تقريراً مكتوباً للمدقق، وأن يكون التقرير موضوعياً وواضحاً وموجزاً.","معيار التدقيق على الأنظمة المحوسبة: التأكد من أن الأنظمة المحوسبة المستخدمة معتمدة من المرجع المختص، وأن يشمل التدقيق على الأنظمة المحوسبة التدقيق العام والتدقيق التطبيقي، والتأكد من أن النظام المحوسب يحافظ على سلامة وأمن المعلومات.","معيار مراعاة التشريعات: التحقق من الالتزام بتطبيق القوانين والأنظمة والتعليمات التي تخضع لها الجامعة، وكذلك التأكد من كفاءة وملاءمة هذه التشريعات لما يستجد من تطورات.","معيار إدارة موارد التدقيق: التأكد من أن موارد التدقيق مناسبة وكافية ويتم توظيفها توظيفاً فعالاً لتحقيق الخطة المعتمدة، ووضع السياسات والإجراءات الكفيلة بتوجيه نشاط التدقيق بكفاءة وفعالية.","معيار دراسة النظام المحاسبي وتقييم أنظمة الرقابة المالية: دراسة وتقييم مصداقية النظام المحاسبي عند تحديد مدى ونطاق مهمة التدقيق."]} />
          </div>
        );

      case 'regulations':
        return (
          <div className="space-y-8">
            <PageTitle title="تعليمات جهاز الرقابة" sub="التشريعات — دائرة الرقابة والتدقيق الداخلية" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[["https://www.mutah.edu.jo/ar/ica/SiteAssets/Pages/Forms/EditForm/111.jpg","https://www.mutah.edu.jo/ar/ica/Documents/CCF_001102.pdf"],["https://www.mutah.edu.jo/ar/ica/SiteAssets/Pages/Forms/EditForm/222.jpg","https://www.mutah.edu.jo/ar/ica/Documents/CCF_001101.pdf"],["https://www.mutah.edu.jo/ar/ica/SiteAssets/Pages/Forms/EditForm/33.jpg","https://www.mutah.edu.jo/ar/ica/Documents/Instructions.pdf"],["https://www.mutah.edu.jo/ar/ica/SiteAssets/Pages/Forms/EditForm/55.jpg","https://www.mutah.edu.jo/ar/ica/Documents/Instructions2.pdf"]].map((r: string[], i: number) => (
                <a key={i} href={r[1]} target="_blank" rel="noopener noreferrer" className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:border-[#c9a227] hover:shadow-md transition-all">
                  <div className="aspect-[3/4] bg-gray-100 overflow-hidden"><img src={r[0]} alt={'وثيقة ' + (i + 1)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                  <div className="px-4 py-3 flex items-center justify-between"><span className="text-[13.5px] font-bold text-[#0f3057]">وثيقة {i + 1}</span><span className="text-[11px] font-bold text-[#c9a227]">PDF</span></div>
                </a>
              ))}
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-8">
            <PageTitle title="معرض الصور" sub="دائرة الرقابة والتدقيق الداخلية" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {["https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-18-40-22-102.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-18-56-13-114.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-18-13-36-802.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-18-35-43-490.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-18-44-09-846.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-18-53-53-726.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-19-06-24-438.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-19-07-13-594.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-19-18-58-707.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-19-20-00-678.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-19-20-59-753.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-19-21-50-221.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-19-24-05-525.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-19-25-02-849.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-19-25-48-475.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-19-26-34-992.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-19-27-27-568.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-19-28-10-007.jpg","https://www.mutah.edu.jo/ar/ica/Photos/C360_2019-01-08-19-29-14-397.jpg","https://www.mutah.edu.jo/ar/ica/Photos/46954919_2170132083225567_8680607141234475008_n.jpg","https://www.mutah.edu.jo/ar/ica/Photos/46995377_2170132023225573_9846199641178112_n.jpg","https://www.mutah.edu.jo/ar/ica/Photos/47042259_2170132273225548_7566965560680906752_n.jpg","https://www.mutah.edu.jo/ar/ica/Photos/47089551_2170131953225580_5198955970759229440_n.jpg","https://www.mutah.edu.jo/ar/ica/Photos/47218303_2170132366558872_3309346462768300032_n.jpg","https://www.mutah.edu.jo/ar/ica/Photos/47260173_2170131829892259_1233451673255411712_n.jpg","https://www.mutah.edu.jo/ar/ica/Photos/47323810_2170131736558935_2941606947658399744_n.jpg","https://www.mutah.edu.jo/ar/ica/Photos/47684926_2176835959221846_8908595313955045376_n.jpg"].map((src: string, i: number) => (
                <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="block rounded-2xl overflow-hidden border border-gray-100 bg-gray-100 aspect-[4/3]">
                  <img src={src} alt={'صورة ' + (i + 1)} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </a>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-8">
            <PageTitle title="إتصل بنا" sub="دائرة الرقابة والتدقيق الداخلية" />
            <ContactBlock phone="+(962) 3 2372380" emails={['ica@mutah.edu.jo', 'auditing@mutah.edu.jo']} />
          </div>
        );
      case 'home':
        return (
          <div className="space-y-10">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src={HERO} alt="دائرة الرقابة والتدقيق الداخلية" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p className="font-bold text-[#0f3057] text-lg">دائرة الرقابة والتدقيق الداخلية</p>
              <p>{ABOUT1}</p>
            </Prose>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DIVS.map((d, i) => (
                <div key={d} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:border-[#c9a227] transition-colors">
                  <span className="w-9 h-9 rounded-lg bg-[#0f3057] text-[#c9a227] text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="font-bold text-[#0f3057] text-sm">{d}</p>
                </div>
              ))}
            </div>
            <Prose><p>{ABOUT2}</p></Prose>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">روابط سريعة</h3>
              <div className="flex flex-col gap-3">
                <DocRow name="سياسة مكافحة الرق والاتجار بالبشر" url="https://www.mutah.edu.jo/ar/ica/Documents/ASHT.pdf" />
                <LinkRow name="للتواصل أو تقديم أي شكوى: auditing@mutah.edu.jo" url="mailto:auditing@mutah.edu.jo" />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, ICA_LINKS)} sub="دائرة الرقابة والتدقيق الداخلية" />
          </div>
        );
    }
  };
  return (
    <DeanshipShell brand="دائرة الرقابة والتدقيق الداخلية"
      tagline="رقابة فعالة على أموال الجامعة وقراراتها وفق أفضل الممارسات الرقابية والمعايير المهنية."
      heroImage={HERO} links={ICA_LINKS} activeItem={activeItem} setActiveItem={setActiveItem}
    >{render()}</DeanshipShell>
  );
}

/* ══════════════════════════════════════════
   دائرة أمانة سر المجالس
══════════════════════════════════════════ */
const SEC_C_LINKS: NavLink[] = [
  { id: 'home', name: 'الرئيسية' },
  {
    id: 'about', name: 'عن الدائرة',
    children: [
      { id: 'about-brief', name: 'نبذة' },
      { id: 'about-strategy', name: 'الرؤية، الرسالة، الاهداف' },
      { id: 'about-director', name: 'كلمة المدير' },
      { id: 'about-staff', name: 'الكادر الإداري' },
      { id: 'about-structure', name: 'الهيكل التنظيمي' },
      { id: 'about-plan', name: 'الخطة الاستراتيجية' }
    ]
  },
  {
    id: 'divisions', name: 'الشعب',
    children: [
      { id: 'div-councils', name: 'المجالس' },
      { id: 'div-committees', name: 'اللجان' },
      { id: 'div-correspondence', name: 'المراسلات' },
      { id: 'div-court', name: 'الديوان' }
    ]
  },
  {
    id: 'publishing', name: 'قوائم النشر والمجلات المعتمدة',
    children: [
      { id: 'pub-arabic', name: 'قائمة المجلات العربية المعتمدة' },
      { id: 'pub-foreign', name: 'قواعد بيانات النشر الاجنبية' },
      { id: 'pub-decisions', name: 'قرارات مجلس العمداء المتعلقة بأعضاء الهيئة التدريسية' },
      { id: 'pub-supported', name: 'قائمة المجلات المدعومة من البحث العلمي' }
    ]
  },
  { id: 'forms', name: 'النماذج' },
  { id: 'info', name: 'معلومات مهمة' },
  { id: 'partners', name: 'الشركاء' },
  { id: 'contact', name: 'إتصل بنا' }
];

export function SecretariatCouncilsDept() {
  const [activeItem, setActiveItem] = useTabRoute('home');
  const HERO = 'https://www.mutah.edu.jo/ar/SecretariatCouncils/PublishingImages/slide-05.jpg';
  const VISION = 'أن تكون دائرة أمانة سر المجالس نموذجاً رائداً في دعم الحوكمة الأكاديمية وتعزيز كفاءة اتخاذ القرار من خلال تقديم خدمات إدارية متميزة، تعتمد على الاحترافية والشفافية واستخدام أحدث الوسائل التقنية لتحقيق أهداف الجامعة وتطلعاتها.';
  const MISSION = 'تلتزم دائرة أمانة سر المجالس بدعم العملية الأكاديمية والإدارية في جامعة مؤتة من خلال تقديم خدمات تنظيمية وإدارية فعّالة للمجالس واللجان، وضمان توثيق القرارات والسياسات بدقة وشفافية، مع تعزيز بيئة عمل تعكس الالتزام بالتميز والابتكار والتطوير المستمر.';
  const BRIEF = 'تعدّ إحدى الركائز الأساسية لدعم العمل الإداري والأكاديمي في الجامعة، إن دور الدائرة يتجاوز المهام التقليدية ليشمل الإسهام في تعزيز الحوكمة المؤسسية وتنظيم العمل الإداري، بما يضمن تحقيق التميز في دعم المجالس واللجان الأكاديمية والإدارية.';
  const ANN = [
    { t: 'حاجة جامعة مؤتة لتعيين أعضاء هيئة تدريس للعمل في الكليات التالية (الأعمال، تكنولوجيا المعلومات، الحقوق، الشريعة، التمريض، الهندسة، العلوم، الآداب، الزراعة، العلوم الاجتماعية)', d: '14/7/2025' },
    { t: 'تعلن جامعة مؤتة عن حاجتها لتعيين أعضاء هيئة تدريس للعمل في كلية العلوم الطبية المساندة', d: '13/4/2025' },
    { t: 'حاجة الجامعة لتعيين أعضاء هيئة تدريس للعمل في كلية طب الأسنان (اعلان مفتوح)', d: '17/3/2025' }
  ];

  const render = () => {
    switch (activeItem) {
      case 'about-brief':
        return (
          <div className="space-y-8">
            <PageTitle title="نبذة" sub="دائرة أمانة سر المجالس" />
            <Prose><p className="font-bold">{BRIEF}</p></Prose>
          </div>
        );
      case 'about-strategy':
        return (
          <div className="space-y-8">
            <PageTitle title="الرؤية، الرسالة، الاهداف" sub="دائرة أمانة سر المجالس" />
            <VisionMission vision={VISION} mission={MISSION} />
          </div>
        );
      case 'about-director':
        return (
          <div className="space-y-8">
            <PageTitle title="كلمة المدير" sub="دائرة أمانة سر المجالس" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm"><img src="https://www.mutah.edu.jo/ar/SecretariatCouncils/PublishingImages/ica1.jpg" alt="كلمة المدير" className="w-full max-h-[380px] object-cover" /></div>
            <Prose>
              <p className="font-bold text-[#0f3057]">بسم الله الرحمن الرحيم</p>
              <p>يسعدني أن أرحب بكم في دائرة أمانة سر المجالس في جامعة مؤتة، التي تعدّ إحدى الركائز الأساسية لدعم العمل الإداري والأكاديمي في الجامعة، إن دور الدائرة يتجاوز المهام التقليدية ليشمل الإسهام في تعزيز الحوكمة المؤسسية وتنظيم العمل الإداري، بما يضمن تحقيق التميز في دعم المجالس واللجان الأكاديمية والإدارية.</p>
              <p>نلتزم في الدائرة بتوفير بيئة عمل مبنية على الاحترافية والدقة والشفافية، ونعمل باستمرار على تطوير آليات العمل باستخدام أحدث الوسائل التقنية لتسهيل الإجراءات وتوثيق القرارات وضمان تنفيذها بما يخدم مصلحة الجامعة.</p>
              <p>إننا فخورون بكوننا جزءاً من جامعة مؤتة، التي تحمل رسالة العلم والمعرفة، ونسعى دومًا لتقديم خدمات ترتقي لتطلعات الجامعة وتحقق أهدافها الاستراتيجية.</p>
              <p>وفي الختام، نؤكد على أهمية التعاون مع جميع مكونات الجامعة لتحقيق مزيد من الإنجازات، ونرحب بجميع الملاحظات والمقترحات التي تسهم في تطوير عمل الدائرة وتعزيز أدائها.</p>
              <p>والسلام عليكم ورحمة الله وبركاته.</p>
            </Prose>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5"><p className="text-xs font-bold text-gray-400 mb-1">مديرة الدائرة</p><p className="font-bold text-[#0f3057] text-[16px]">زينب محمد الطراونة</p></div>
          </div>
        );

      case 'about-staff':
        return (
          <div className="space-y-8">
            <PageTitle title="الموظفون" sub="الكادر الإداري — دائرة أمانة سر المجالس" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[["مديرة الدائرة","زينب محمد الطراونة"],["رئيسة شعبة المراسلات والمتابعات الإلكترونية ومكلفة بالقيام بمهام رئيس شعبة اللجان","إيمان المبيضين"],["قائم بأعمال رئيس الديوان","ياسمين إبراهيم الطراونة"],["طابعة","ناريمان نجاح الخطيب"],["أرشفة ملفات وتصوير","نورس صايل ابن طريف"]].map((d: string[], i: number) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#0f3057] flex items-center justify-center flex-shrink-0 text-[#c9a227] font-bold">{i + 1}</div>
                  <div><p className="text-[15px] font-bold text-[#0f3057] leading-relaxed">{d[1]}</p><p className="text-xs text-gray-500 mt-1 leading-relaxed">{d[0]}</p></div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'about-structure':
        return (
          <div className="space-y-8">
            <PageTitle title="الهيكل التنظيمي" sub="دائرة أمانة سر المجالس" />
            <NumList items={["مديرة الدائرة","شعبة المجالس","شعبة اللجان","شعبة المراسلات والمتابعات الإلكترونية","الديوان"]} />
          </div>
        );

      case 'about-plan':
        return (
          <div className="space-y-8">
            <PageTitle title="الخطة الاستراتيجية للدائرة" sub="2024 - 2028" />
            <div className="bg-gradient-to-l from-[#0f3057] to-[#16457a] rounded-3xl p-8"><p className="text-[#c9a227] text-xs font-bold tracking-widest mb-3">الرؤية</p><p className="text-white text-[17px] leading-[2]">أن تكون دائرة أمانة سر المجالس نموذجًا متميزًا في دعم الحوكمة المؤسسية وتنظيم العمل الإداري والأكاديمي من خلال الابتكار والشفافية والجودة.</p></div>
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm"><p className="text-[#c9a227] text-xs font-bold tracking-widest mb-3">الرسالة</p><p className="text-gray-700 text-[16.5px] leading-[2.1]">تعزيز كفاءة العمل الإداري للمجالس واللجان في جامعة مؤتة من خلال تقديم خدمات احترافية، ودعم اتخاذ القرار، وضمان توثيق وتنفيذ القرارات بدقة وفعالية، بما يحقق أهداف الجامعة الاستراتيجية.</p></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">القيم</h3><NumList items={["الشفافية: الالتزام بالوضوح في الإجراءات والسياسات.","الدقة: ضمان توثيق المعلومات والقرارات بشكل منهجي ومنظم.","التميز: تقديم خدمات بجودة عالية تواكب التطلعات.","التطوير المستمر: تحسين الأداء الإداري باستخدام التقنيات الحديثة.","التعاون: تعزيز روح الفريق مع مكونات الجامعة لتحقيق الأهداف المشتركة."]} /></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">الأهداف الاستراتيجية</h3>
              {[["تعزيز الحوكمة المؤسسية",["تطوير الأنظمة والسياسات الخاصة بالمجالس واللجان بما يتوافق مع أفضل الممارسات.","دعم عملية اتخاذ القرار المستند إلى البيانات الدقيقة والتحليلات."]],["رفع كفاءة العمل الإداري",["أتمتة العمليات والإجراءات الخاصة بالمجالس واللجان.","توفير التدريب المستمر للموظفين لرفع كفاءتهم وتعزيز مهاراتهم."]],["تطوير آليات التوثيق والمتابعة",["إنشاء نظام إلكتروني شامل لتوثيق ومتابعة القرارات.","تحسين إجراءات المتابعة لضمان تنفيذ القرارات الصادرة عن المجالس."]],["تعزيز التواصل والتعاون الداخلي",["بناء قنوات تواصل فعالة بين الدائرة وكافة وحدات الجامعة.","تطوير دليل إرشادي لخدمات الدائرة يسهل على الأطراف المستفيدة الوصول للمعلومات والإجراءات."]],["تحقيق رضا المتعاملين",["تقديم خدمات متميزة وسريعة تلبي احتياجات أعضاء المجالس واللجان.","تنفيذ استطلاعات دورية لقياس رضا المتعاملين واستخدام نتائجها في التحسين المستمر."]]].map((g: any, i: number) => (
                <div key={i} className="mb-5"><p className="font-bold text-[#0f3057] mb-3">{g[0]}</p><NumList items={g[1]} /></div>
              ))}
            </div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">آليات التنفيذ</h3><NumList items={["تطبيق برامج إدارة إلكترونية للمجالس واللجان.","إنشاء تقارير دورية حول أداء الدائرة ومتابعة تنفيذ القرارات.","التعاون مع دوائر ووحدات الجامعة لتسهيل التدفق المعلوماتي وتعزيز التنسيق."]} /></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">مؤشرات الأداء الرئيسية (KPIs)</h3><NumList items={["نسبة تنفيذ القرارات الصادرة عن المجالس في الوقت المحدد.","معدل رضا المتعاملين عن خدمات الدائرة.","عدد الأنظمة والسياسات المطورة سنويًا.","نسبة التحول إلى العمليات الإلكترونية في العمل الإداري."]} /></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">الإطار الزمني للتنفيذ</h3><Prose><p>تمتد الخطة الاستراتيجية على مدى خمس سنوات (2024-2028)، وتُراجع سنويًا لتحديثها بما يواكب المستجدات.</p></Prose></div>
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">المخرجات المتوقعة</h3><NumList items={["تعزيز الكفاءة الإدارية وتسهيل الإجراءات.","رفع مستوى الشفافية والمصداقية في العمل المؤسسي.","تحقيق نقلة نوعية في دعم المجالس واللجان الأكاديمية والإدارية.","تحقيق التكامل بين أهداف الدائرة والخطة الاستراتيجية العامة للجامعة."]} /></div>
          </div>
        );

      case 'div-councils':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة المجالس" sub="القائم بأعمال رئيس الشعبة: زينب الطراونة" />
            <h3 className="text-xl font-bold text-[#0f3057] mb-4">مهام شعبة المجالس</h3>
            <NumList items={["استلام ودراسة ومتابعة جميع القضايا التي تُحال إلى المجالس الثلاث في الجامعة وهي: (مجلس الأمناء، مجلس الجامعة، ومجلس العمداء)، كلٌ حسب اختصاصه ومهامه، وتدقيقها وتجهيزها وفق آلية معينة لعرضها على تلك المجالس، ومن ثم متابعة الإجراءات الخاصة بها بعد عرضها على المجالس المختصة واتخاذ القرارات، من حيث إنشاء وتحرير وتدقيق المحاضر الخاصة بها وتوزيع القرارات المنبثقة عن تلك المجالس بشأنها للجهات المختصة.","التنسيق مع شعبتي اللجان والمراسلات الإلكترونية في الدائرة، بشأن الإعداد للجلسات ومتطلبات عرض المعاملات على المجالس المختصة.","الأهداف الرئيسة للشعبة هي الوصول إلى أعلى درجات الدقة والإتقان في العمل في كل المراحل التي تمر بها المعاملات التي تُحال إلى المجالس الثلاث.","ولتحقيق الأهداف التي تسعى إليها الشعبة، يتم توفير التنسيق والتعاون بين دائرة أمانة سر المجالس وبين الجهات التي تُحيل القضايا إلى المجالس الثلاث بشكل فعّال، وتوفير بيئة العمل المناسبة."]} />
          </div>
        );

      case 'div-committees':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة اللجان" sub="القائم بأعمال مهام رئيس الشعبة: إيمان المبيضين" />
            <h3 className="text-xl font-bold text-[#0f3057] mb-4">مهام شعبة اللجان</h3>
            <NumList items={["استلام ودراسة ومتابعة جميع القضايا التي تُحال إلى لجنة التعيين والترقية وتدقيقها وتجهيزها وفق آلية معينة لعرضها على اللجنة، ومن ثم متابعة الإجراءات الخاصة بها بعد عرضها على اللجنة واتخاذ التوصيات، من حيث إنشاء وتحرير وتدقيق المحاضر الخاصة بها وترحيل هذه التوصيات إلى شعبة المجالس ليصار إلى صياغتها كقرارات.","تطوير وتحديث النماذج المستخدمة في آلية عمل الشعبة، والخاصة بأعضاء الهيئة التدريسية.","إعداد إحصائيات دورية عن أعضاء الهيئة التدريسية خاصة بالإجازات والإعارات، وتجديد العقود للمحاضرين المتفرغين.","التنسيق مع شعبة المتابعة والمراسلات الإلكترونية لعمل ملفات إلكترونية بالمعلومات الأساسية عن أعضاء هيئة التدريس تكون مرادفة للملفات الورقية، مع ضرورة المتابعة مع الجهات المعنية على حوسبة العمل في الشعبة.","متابعة الاستحقاقات القانونية والواردة في القوانين والأنظمة والتعليمات المتعلقة بأعضاء هيئة التدريس، والتوصية بعرضها على مجلس العمداء لاتخاذ القرار المناسب."]} />
          </div>
        );

      case 'div-correspondence':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة المراسلات والمتابعات الإلكترونية" sub="رئيسة الشعبة: إيمان المبيضين" />
            <h3 className="text-xl font-bold text-[#0f3057] mb-4">مهام الشعبة</h3>
            <NumList items={["العمل على تنفيذ التعديلات التي تقرر من المجالس المختصة في الجامعة على كافة الأنظمة والتعليمات المعمول بها في الجامعة، ونشرها على موقع الجامعة الرسمي كلما دعت الحاجة إلى ذلك.","تطوير نظام المراسلات مع أعضاء الهيئتين الإدارية والتدريسية، وأية أمور إدارية تصدر عن مجالس الجامعة المختصة.","تحضير كل ما يمكن طلبه من إحصائيات وتقارير تخص أعضاء الهيئة التدريسية لوضعها أمام صاحب القرار عند الطلب."]} />
          </div>
        );

      case 'div-court':
        return (
          <div className="space-y-8">
            <PageTitle title="الديوان" sub="القائم بأعمال رئيسة الديوان: ياسمين الطراونة" />
            <h3 className="text-xl font-bold text-[#0f3057] mb-4">مهام شعبة الديوان</h3>
            <NumList items={["استلام وتسليم البريد (الداخلي والخارجي)، وإعطاء أرقام صادر للكتب الرسمية الصادرة عن الدائرة، وإعطاء أرقام وارد للكتب الواردة للدائرة وتسليم البريد للمدير.","توزيع البريد بعد شرح المدير على المعنيين.","أرشفة البريد (الصادر والوارد) ورقياً وإلكترونياً.","إرسال البريد كلٌ حسب جهته إلكترونياً وورقياً.","إدخال القرارات على دفتر الصادر وإرسالها إلكترونياً كلٌ حسب الجهة المعنية.","متابعة دوام الموظفين وتوثيق (الإجازات والمغادرات) إلكترونياً.","متابعة حفظ وأرشفة القرارات مع مرفقاتها.","متابعة الأمور التي تتعلق بصيانة الأجهزة الإلكترونية في الدائرة.","توفير لوازم الدائرة من القرطاسية والورق الخاص بها، وحبر الطابعات وآلة التصوير وأية مستلزمات أخرى.","القيام بأية أعمال أخرى يكلف بها من قبل المدير."]} />
          </div>
        );

      case 'forms':
        return (
          <div className="space-y-8">
            <PageTitle title="ملفات ونماذج" sub="دائرة أمانة سر المجالس" />
            <div className="flex flex-col gap-3">
              {[["استمارة طلب تعيين لأعضاء هيئة التدريس","https://www.mutah.edu.jo/ar/SecretariatCouncils/Forms/%D8%A7%D8%B3%D8%AA%D9%85%D8%A7%D8%B1%D8%A9%20%D8%B7%D9%84%D8%A8%20%D8%AA%D8%B9%D9%8A%D9%8A%D9%86%20%D9%84%D8%A3%D8%B9%D8%B6%D8%A7%D8%A1%20%D9%87%D9%8A%D8%A6%D8%A9%20%D8%A7%D9%84%D8%AA%D8%AF%D8%B1%D9%8A%D8%B3.pdf"],["نموذج تحقيق هوية","https://www.mutah.edu.jo/ar/SecretariatCouncils/Forms/%D9%86%D9%85%D9%88%D8%B0%D8%AC%20%D8%AA%D8%AD%D9%82%D9%8A%D9%82%20%D9%87%D9%88%D9%8A%D8%A9.pdf"],["أنموذج تقييم أداء عضو هيئة التدريس المتقدم للترقية/للنقل في جامعة مؤتة","https://www.mutah.edu.jo/ar/SecretariatCouncils/Forms/%D8%A3%D9%86%D9%85%D9%88%D8%B0%D8%AC%20%D8%AA%D9%82%D9%8A%D9%8A%D9%85%20%D8%A3%D8%AF%D8%A7%D8%A1%20%D8%B9%D8%B6%D9%88%20%D9%87%D9%8A%D8%A6%D8%A9%20%D8%A7%D9%84%D8%AA%D8%AF%D8%B1%D9%8A%D8%B3%20%D8%A7%D9%84%D9%85%D8%AA%D9%82%D8%AF%D9%85%20%D9%84%D9%84%D8%AA%D8%B1%D9%82%D9%8A%D8%A9%D9%84%D9%84%D9%86%D9%82%D9%84%20%D9%81%D9%8A%20%D8%AC%D8%A7%D9%85%D8%B9%D8%A9%20%D9%85%D8%A4%D8%AA%D8%A9.pdf"],["أنموذج تقييم أداء عضو هيئة التدريس المتقدم للتثبيت في جامعة مؤتة","https://www.mutah.edu.jo/ar/SecretariatCouncils/Forms/%D8%A3%D9%86%D9%85%D9%88%D8%B0%D8%AC%20%D8%AA%D9%82%D9%8A%D9%8A%D9%85%20%D8%A3%D8%AF%D8%A7%D8%A1%20%D8%B9%D8%B6%D9%88%20%D9%87%D9%8A%D8%A6%D8%A9%20%D8%A7%D9%84%D8%AA%D8%AF%D8%B1%D9%8A%D8%B3%20%D8%A7%D9%84%D9%85%D8%AA%D9%82%D8%AF%D9%85%20%D9%84%D9%84%D8%AA%D8%AB%D8%A8%D9%8A%D8%AA%20%D9%81%D9%8A%20%D8%AC%D8%A7%D9%85%D8%B9%D8%A9%20%D9%85%D8%A4%D8%AA%D8%A9.pdf"],["أنموذج بحث إجازة تفرغ علمي","https://www.mutah.edu.jo/ar/SecretariatCouncils/Forms/%D8%A3%D9%86%D9%85%D9%88%D8%B0%D8%AC%20%20%D8%A8%D8%AD%D8%AB%20%D8%A5%D8%AC%D8%A7%D8%B2%D8%A9%20%D8%AA%D9%81%D8%B1%D8%BA%20%D8%B9%D9%84%D9%85%D9%8A.pdf"],["أنموذج مخطط بحث إجازة تفرغ علمي","https://www.mutah.edu.jo/ar/SecretariatCouncils/Forms/%D8%A3%D9%86%D9%85%D9%88%D8%B0%D8%AC%20%D9%85%D8%AE%D8%B7%D8%B7%20%D8%A8%D8%AD%D8%AB%20%D8%A5%D8%AC%D8%A7%D8%B2%D8%A9%20%D8%AA%D9%81%D8%B1%D8%BA%20%D8%B9%D9%84%D9%85%D9%8A.pdf"],["أنموذج الافصاح عن استخدام ادوات الذكاء الاصطناعي","https://www.mutah.edu.jo/ar/SecretariatCouncils/Forms/%D8%A3%D9%86%D9%85%D9%88%D8%B0%D8%AC%20%D8%A7%D9%84%D8%A7%D9%81%D8%B5%D8%A7%D8%AD%20%D8%B9%D9%86%20%D8%A7%D8%B3%D8%AA%D8%AE%D8%AF%D8%A7%D9%85%20%D8%A7%D8%AF%D9%88%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1%20%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A.pdf"],["أنموذج التقدم للحصول على الزيارة العلمية","https://www.mutah.edu.jo/ar/SecretariatCouncils/Forms/%D8%A3%D9%86%D9%85%D9%88%D8%B0%D8%AC%20%D8%A7%D9%84%D8%AA%D9%82%D8%AF%D9%85%20%D9%84%D9%84%D8%AD%D8%B5%D9%88%D9%84%20%D8%B9%D9%84%D9%89%20%D8%A7%D9%84%D8%B2%D9%8A%D8%A7%D8%B1%D8%A9%20%D8%A7%D9%84%D8%B9%D9%84%D9%85%D9%8A%D8%A9.pdf"]].map((d: string[], i: number) => (
                <DocRow key={i} name={d[0]} url={d[1]} />
              ))}
            </div>
          </div>
        );

      case 'partners':
        return (
          <div className="space-y-8">
            <PageTitle title="الشركاء" sub="دائرة أمانة سر المجالس" />
            <Prose>
              <p>تُعد دائرة أمانة سر المجالس إحدى الركائز الأساسية في دعم عمل المجالس المختلفة داخل الجامعة، حيث تُعنى بتنظيم العمل الإداري والتنسيق بين الجهات ذات العلاقة لضمان تحقيق الأهداف المرسومة، وفي إطار تحقيق مهامها بكفاءة، تعتمد الدائرة على بناء شراكات فعّالة مع جهات داخلية وخارجية تسهم في تعزيز أدائها.</p>
              <p>وتعكس شراكات دائرة أمانة سر المجالس مع وزارة التعليم العالي والبحث العلمي، وهيئة اعتماد مؤسسات التعليم العالي وضمان جودتها، والجهات الأخرى أهمية التعاون والتكامل لتحقيق أهداف المؤسسة بكفاءة، ومن خلال تعزيز هذه الشراكات، يمكن تحسين جودة الأداء المؤسسي وضمان تحقيق معايير الجودة والتميز الأكاديمي.</p>
            </Prose>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["وزارة التعليم العالي والبحث العلمي","هيئة اعتماد مؤسسات التعليم العالي وضمان جودتها","الجهات الداخلية والخارجية ذات العلاقة"].map((p: string, i: number) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl px-6 py-6 shadow-sm flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
                  <p className="text-[15px] font-bold text-[#0f3057] leading-relaxed">{p}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-8">
            <PageTitle title="إتصل بنا" sub="دائرة أمانة سر المجالس" />
            <ContactBlock phone="+(962) 3 2372380" emails={['Unit_admin@mutah.edu.jo']} />
          </div>
        );
      case 'home':
        return (
          <div className="space-y-10">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src={HERO} alt="دائرة أمانة سر المجالس" className="w-full max-h-[420px] object-cover" />
            </div>
            <VisionMission vision={VISION} mission={MISSION} />
            <Prose><p className="font-bold text-[#0f3057]">نبذة</p><p>{BRIEF}</p></Prose>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">أخبار وأحداث</h3>
              <NewsGrid>{ITEMS['sec-news'].items.map((n: any, i: number) => <NewsCard key={i} to={'/u-item/sec-news/' + i} title={n.title || n.t} date={n.date || n.d} img={n.img} excerpt={n.excerpt} />)}</NewsGrid>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">إعلانات</h3>
              <div className="flex flex-col gap-3">
                {ANN.map((n, i) => (
                  <Link key={i} to={'/u-item/sec-ann/' + i} className="flex items-start gap-4 bg-[#F8FAFC] border border-gray-100 rounded-2xl px-6 py-4">
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
                <LinkRow name="طلبات التوظيف للأكاديميين" url="https://appo.mutah.edu.jo/" />
                <LinkRow name="الخدمات الإلكترونية" url="http://portal1.mutah.edu.jo/eservice/faces/loginView" />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, SEC_C_LINKS)} sub="دائرة أمانة سر المجالس" />
          </div>
        );
    }
  };
  return (
    <DeanshipShell brand="دائرة أمانة سر المجالس"
      tagline="دعم الحوكمة الأكاديمية وتعزيز كفاءة اتخاذ القرار بخدمات تنظيمية وإدارية للمجالس واللجان."
      heroImage={HERO} links={SEC_C_LINKS} activeItem={activeItem} setActiveItem={setActiveItem}
    >{render()}</DeanshipShell>
  );
}

/* ══════════════════════════════════════════
   دائرة العطاءات المركزية
══════════════════════════════════════════ */
const TENDER_LINKS: NavLink[] = [
  { id: 'home', name: 'الرئيسية' },
  { id: 'tenders', name: 'قائمة العطاءات' },
  { id: 'docs', name: 'أنظمة وتعليمات العطاءات' },
  { id: 'assignments', name: 'الاحالات المبدئية للعطاءات', url: 'https://www.mutah.edu.jo/Lists/Initial_assignment/Initial_assignment.aspx' },
  { id: 'contact', name: 'إتصل بنا' }
];

export function CentralTendersDept() {
  const [activeItem, setActiveItem] = useTabRoute('home');
  const HERO = CAMPUS;
  const TENDERS = [
    { n: '(49/ت/2026) اعادة طرح / تأجير كافتيريات ومقاصف', id: 424 },
    { n: '(59/ش/2026) عزل اسطح مباني / الجناح العسكري', id: 436 },
    { n: '(60/ل ف/2026) توريد كتب مقررات دراسية / الجناح العسكري', id: 435 },
    { n: '(58/ل ف/2025) توريد وتركيب وتشغيل شاشة تفاعلية قياس 98 انش / كلية الاداب', id: 434 },
    { n: '(51/ت/2026) تأجير مقصف المدرسة النموذجية / اعادة طرح', id: 425 },
    { n: '(52+53+54+55+57/ت/2026) تمديد مدة تقديم العروض للاستثمارات', id: 433 },
    { n: '(50/ل ر/2026) تقديم خدمات قانونية لجامعة مؤتة', id: 432 },
    { n: '(52/ت/2026) تشغيل وادارة مبنى الصالة الاموية', id: 426 },
    { n: '(53/ت/2026) تشغيل وادارة خدمة النقل الداخلي بواسطة مركبات كهربائية', id: 427 },
    { n: '(54/ت/2026) تشغيل وادارة كافتيريا كلية تكنولوجيا المعلومات', id: 428 },
    { n: '(55/ت/2026) تركيب وتشغيل وادارة الات قهوة ذاتية الخدمة', id: 429 },
    { n: '(56/ت/2026) تصميم وتشغيل وادارة الموقع المحاذي لمبنى الاذاعة', id: 430 },
    { n: '(57/ت/2026) تشغيل وادارة كشك نادي العاملين والمبنى القائم بجانبه', id: 431 }
  ];
  const DOCS = [
    { n: 'نظام المشتريات الحكومي', u: 'https://www.mutah.edu.jo/Pages/Gov-procu-sys.pdf' },
    { n: 'تعليمات تنظيم المشتريات', u: 'https://www.mutah.edu.jo/Pages/Procurement-inst.pdf' },
    { n: 'شروط العطاءات العامة الرئيسية', u: 'https://www.mutah.edu.jo/Pages/tender-con.pdf' }
  ];

  const TenderList = (
    <div className="flex flex-col gap-3">
      {TENDERS.map((t) => (
        <a
          key={t.id}
          href={`https://www.mutah.edu.jo/Lists/Tenders/Disp_Form.aspx?ID=${t.id}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-4 hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0f3057] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-[#c9a227]" />
          </div>
          <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-snug">{t.n}</p>
        </a>
      ))}
    </div>
  );

  const render = () => {
    switch (activeItem) {
      case 'tenders':
        return (
          <div className="space-y-8">
            <PageTitle title="قائمة العطاءات" sub={`العطاءات المطروحة — ${TENDERS.length} عطاءً`} />
            {TenderList}
          </div>
        );
      case 'docs':
        return (
          <div className="space-y-8">
            <PageTitle title="أنظمة وتعليمات العطاءات" sub="دائرة العطاءات المركزية" />
            <div className="flex flex-col gap-3">
              {DOCS.map((d) => <DocRow key={d.n} name={d.n} url={d.u} />)}
              <LinkRow name="الاحالات المبدئية للعطاءات" url="https://www.mutah.edu.jo/Lists/Initial_assignment/Initial_assignment.aspx" />
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-8">
            <PageTitle title="إتصل بنا" sub="دائرة العطاءات المركزية" />
            <ContactBlock phone="00962 03 2372380" ext="6000" fax="0096232375706" emails={['Unit_admin@mutah.edu.jo']} />
          </div>
        );
      default:
        return (
          <div className="space-y-10">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src={HERO} alt="دائرة العطاءات المركزية" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-gradient-to-l from-[#8a6d1f] to-[#c9a227] rounded-3xl p-8">
              <p className="text-white/80 text-xs font-bold mb-2">دائرة العطاءات المركزية</p>
              <h3 className="text-white text-2xl font-bold" dir="ltr">فاكس : 0096232375706</h3>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">قائمة العطاءات</h3>
              {TenderList}
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">أنظمة وتعليمات العطاءات</h3>
              <div className="flex flex-col gap-3">
                {DOCS.map((d) => <DocRow key={d.n} name={d.n} url={d.u} />)}
                <LinkRow name="الاحالات المبدئية للعطاءات" url="https://www.mutah.edu.jo/Lists/Initial_assignment/Initial_assignment.aspx" />
              </div>
            </div>
          </div>
        );
    }
  };
  return (
    <DeanshipShell brand="دائرة العطاءات المركزية"
      tagline="طرح عطاءات الجامعة المركزية وإعلان قوائمها وإحالاتها المبدئية وفق نظام المشتريات الحكومي."
      heroImage={HERO} links={TENDER_LINKS} activeItem={activeItem} setActiveItem={setActiveItem}
    >{render()}</DeanshipShell>
  );
}

/* ══════════════════════════════════════════
   دائرة العلاقات العامة والثقافية
══════════════════════════════════════════ */
const PR_LINKS: NavLink[] = [
  { id: 'home', name: 'الرئيسية' },
  {
    id: 'about', name: 'عن الدائرة',
    children: [
      { id: 'about-brief', name: 'نبذة' },
      { id: 'about-strategy', name: 'الرؤية، الرسالة، الاهداف' },
      { id: 'about-director', name: 'كلمة المدير' },
      { id: 'about-staff', name: 'الكادر الوظيفي' },
      { id: 'about-structure', name: 'الهيكل التنظيمي' }
    ]
  },
  {
    id: 'divisions', name: 'الشعب',
    children: [
      { id: 'div-media', name: 'شعبة الإعلام' },
      { id: 'div-pr', name: 'شعبة العلاقات العامة' },
      { id: 'div-protocol', name: 'الخدمات' }
    ]
  },
  { id: 'news', name: 'أخبار الجامعة' },
  { id: 'gallery', name: 'معرض الصور' },
  { id: 'contact', name: 'إتصل بنا' }
];

export function PublicRelationsDept() {
  const [activeItem, setActiveItem] = useTabRoute('home');
  const HERO = CAMPUS;
  const render = () => {
    switch (activeItem) {
      case 'about-brief':
        return (
          <div className="space-y-8">
            <PageTitle title="نبذة عن الدائرة" sub="دائرة العلاقات الثقافية والعامة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm"><img src="https://www.mutah.edu.jo/ar/publicrelations/PublishingImages/%D8%A7%D9%84%D8%AC%D8%A7%D9%85%D8%B9%D8%A9%20%D8%AC%D9%88%D9%8A%D8%A9.jpg" alt="نبذة عن الدائرة" className="w-full max-h-[400px] object-cover" /></div>
            <Prose>
              <p>جاء إنشاء دائرة العلاقات الثقافية والعامة في جامعة مؤتة مع ولادة جامعة مؤتة عندما أعلن المغفور له الملك الحسين بن طلال طيب الله ثراه في الثاني من شهر آذار عام 1981 تأسيس جامعة مؤتة، وكانت نواتها كلية الشرطة الملكية / كلية العلوم الشرطية فيما بعد.</p>
              <p>ولِما للعلاقات من دور هام فقد جاء إنشاؤها كجزء مهم من هيكل الجامعة، ذلك أنها تُعد إحدى أهم الفواعل الرئيسة فيها، حيث تم إنشاؤها على أسس ثقافية واجتماعية وفنية متعددة، كما أنها تنهض بمهام تنظيم علاقات الجامعة مع الجهات الرسمية والشعبية المحلية والعربية والدولية الشاملة في مختلف المجالات، سواء في محيطها المجتمعي بشكل خاص وعلى مستوى المملكة بشكل عام.</p>
              <p>وتقوم الدائرة بمهامها من خلال جهازها الإداري والفني والمكون من الهيكل التنظيمي للدائرة من مدير الدائرة ومساعد المدير ورئيس الديوان وأربع شعب وهي:</p>
            </Prose>
            <NumList items={["شعبة المطبوعات والخدمات الفنية.","شعبة العلاقات الثقافية والاتفاقيات الدولية.","شعبة الإعلام.","شعبة العلاقات العامة."]} />
            <Prose>
              <p>وتنطلق الخطة الاستراتيجية للدائرة من خطة الجامعة، وهي تسعى لتقديم صور التميز العلمي والأكاديمي والعمل الثقافي والتنمية المجتمعية من خلال التواصل الدائم والمستمر مع المؤسسات الإعلامية على اختلافها، وحملت الدائرة على عاتقها رسالة الجامعة الثقافية والإعلامية والعلاقات العامة، من خلال استخدام وسائل متطورة وملائمة للأهداف والغايات التي تسعى الجامعة لتحقيقها.</p>
              <p>وتُعد العلاقات الثقافية والعامة منهجية استراتيجية محددة ذات رؤى مستنيرة من خلال إنشاء قاعدة بيانات ومعلومات واسعة تضم جميع كليات ومرافق الجامعة المختلفة منها العلمي والأكاديمي والاجتماعي والثقافي والمجتمعي.</p>
            </Prose>
          </div>
        );

      case 'about-strategy':
        return (
          <div className="space-y-8">
            <PageTitle title="الرؤية، الرسالة، الاهداف" sub="دائرة العلاقات الثقافية والعامة" />
            <div className="bg-gradient-to-l from-[#0f3057] to-[#16457a] rounded-3xl p-8"><p className="text-[#c9a227] text-xs font-bold tracking-widest mb-3">الرؤية</p><p className="text-white text-[17px] leading-[2]">نحو إعلام وعلاقات عامة تحقق تطلعات الجامعة ورسالتها العلمية والأكاديمية نحو العالمية.</p></div>
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm"><p className="text-[#c9a227] text-xs font-bold tracking-widest mb-3">الرسالة</p><p className="text-gray-700 text-[16.5px] leading-[2.1]">تسليط الضوء على الجامعة وفعالياتها ونشاطاتها وخططها وطموحاتها في الوسائل الإعلامية المختلفة كافة.</p></div>
          </div>
        );

      case 'about-director':
        return (
          <div className="space-y-8">
            <PageTitle title="كلمة مدير الدائرة" sub="دائرة العلاقات الثقافية والعامة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm"><img src="https://www.mutah.edu.jo/ar/publicrelations/PublishingImages/41301870_1890506761257782_4006878151257882624_o.jpg" alt="كلمة مدير الدائرة" className="w-full max-h-[400px] object-cover" /></div>
            <Prose>
              <p>جاء إنشاء دائرة العلاقات الثقافية والعامة في جامعة مؤتة مع ولادة جامعة مؤتة عندما أعلن المغفور له الملك الحسين بن طلال طيب الله ثراه في الثاني من شهر آذار عام 1981 تأسيس جامعة مؤتة، وكانت نواتها كلية الشرطة الملكية / كلية العلوم الشرطية فيما بعد.</p>
              <p>ولِما للعلاقات من دور هام فقد جاء إنشاؤها كجزء مهم من هيكل الجامعة، ذلك أنها تُعد إحدى أهم الفواعل الرئيسة فيها، حيث تم إنشاؤها على أسس ثقافية واجتماعية وفنية متعددة، كما أنها تنهض بمهام تنظيم علاقات الجامعة مع الجهات الرسمية والشعبية المحلية والعربية والدولية الشاملة في مختلف المجالات، سواء في محيطها المجتمعي بشكل خاص وعلى مستوى المملكة بشكل عام.</p>
              <p>وتقوم الدائرة بمهامها من خلال جهازها الإداري والفني والمكون من الهيكل التنظيمي للدائرة من مدير الدائرة ومساعد المدير ورئيس الديوان وأربع شعب وهي:</p>
            </Prose>
            <NumList items={["شعبة المطبوعات والخدمات الفنية.","شعبة العلاقات الثقافية والاتفاقيات الدولية.","شعبة الإعلام.","شعبة العلاقات العامة."]} />
            <Prose>
              <p>وتنطلق الخطة الاستراتيجية للدائرة من خطة الجامعة، وهي تسعى لتقديم صور التميز العلمي والأكاديمي والعمل الثقافي والتنمية المجتمعية من خلال التواصل الدائم والمستمر مع المؤسسات الإعلامية على اختلافها، وحملت الدائرة على عاتقها رسالة الجامعة الثقافية والإعلامية والعلاقات العامة، من خلال استخدام وسائل متطورة وملائمة للأهداف والغايات التي تسعى الجامعة لتحقيقها.</p>
              <p>وتُعد العلاقات الثقافية والعامة منهجية استراتيجية محددة ذات رؤى مستنيرة من خلال إنشاء قاعدة بيانات ومعلومات واسعة تضم جميع كليات ومرافق الجامعة المختلفة منها العلمي والأكاديمي والاجتماعي والثقافي والمجتمعي، حيث تعمل دائرة العلاقات العامة على تعميق الإحساس العام بالانتماء لمكان العمل بالجامعة والعمل بروح الفريق الواحد. ويعمل موظفو العلاقات العامة وفقاً لقاعدة أنهم قادرون على كسب ود وثقة العاملين والمتعاملين. وتعتبر دائرة العلاقات العامة شبكة متنامية من التواصل مع مختلف الإدارات والكليات الداخلية والهيئات الخارجية.</p>
              <p>تتعدد المهام التي تقوم بها دائرة العلاقات العامة بالجامعة، ومن أهم هذه المهام: القيام بكافة الأعمال والتجهيزات المختلفة التي تتعلق بمشاركة جمهور الجامعة الداخلي في مختلف المناسبات والفعاليات، وتنظيم الحفلات الرسمية والمناسبات المختلفة على مستوى عالٍ من الدقة، والمساعدة على إزالة الصعوبات التي تواجه المنتسبين للجامعة.</p>
              <p>تمتلك الدائرة قنوات اتصال مباشرة مع الجهات الداخلية والخارجية، وذلك في جميع حالات التواصل، والتركيز على تنمية خدمة المتعاملين، والعمل على توفير قنوات اتصال مباشر مع الجهات الداخلية والخارجية، وتتميز بوجود فريق عمل على قدر عالٍ من الكفاءة يمكن تكليفهم بمبادرات جديدة لتحقيق الاستراتيجية التي تعمل عليها الجامعة.</p>
              <p>تعمل دائرة العلاقات العامة بكامل قوتها الوظيفية بالمشاركة مع الجهات ذات العلاقة بأي حدث في الجامعة من أجل الوصول إلى أبهى صورة للجامعة.</p>
              <p>بقي أن نقول إن دور العلاقات العامة يبقى دوراً حيوياً وهاماً في كافة الجهات، مما يمكّن الدائرة من أن تكون في مركز أفضل لتحقيق رؤيتها وأهدافها الاستراتيجية، وهو ما سيؤدي بدوره إلى تحسين مساهمة الإدارة في نجاح الاستراتيجية العامة للجامعة.</p>
            </Prose>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5"><p className="text-xs font-bold text-gray-400 mb-1">مدير الدائرة</p><p className="font-bold text-[#0f3057] text-[16px]">وليد عيد الرواضة</p></div>
          </div>
        );

      case 'about-staff':
        return (
          <div className="space-y-8">
            <PageTitle title="الكادر الوظيفي" sub="دائرة العلاقات الثقافية والعامة" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[["مدير الدائرة","وليد عيد الرواضة"],["رئيس شعبة المطبوعات والخدمات الفنية","ناصر عبدالفتاح المعايطة"],["رئيس الديوان","امل المجالي"],["رئيس شعبة العلاقات العامة","ضامن سلمان المعايطة"],["موظف اداري","مشعل الطلالعة"],["رئيس شعبة الاعلام","علي مطلب المجالي"],["رئيس فرع","ماهر الصناع"],["رئيس فرع الارشيف","سامر عبد القيسي"],["موظف علاقات عامة","حازم السحيمات"],["موظف ديوان","ابراهيم الصرايرة"],["موظف اداري","صالح البنوي"],["رئيس فرع التصوير","بلال البنوي"],["موظف علاقات عامة","صقر الطراونة"],["موظف استقبال","ناجح الجمعات"],["موظف ديوان","حسن المحادين"]].map((d: string[], i: number) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#0f3057] flex items-center justify-center flex-shrink-0 text-[#c9a227] font-bold">{i + 1}</div>
                  <div><p className="text-[15px] font-bold text-[#0f3057] leading-relaxed">{d[1]}</p><p className="text-xs text-gray-500 mt-1 leading-relaxed">{d[0]}</p></div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'about-structure':
        return (
          <div className="space-y-8">
            <PageTitle title="الهيكل التنظيمي" sub="دائرة العلاقات الثقافية والعامة" />
            <NumList items={["مدير الدائرة","مساعد المدير","رئيس الديوان","شعبة المطبوعات والخدمات الفنية","شعبة العلاقات الثقافية والاتفاقيات الدولية","شعبة الإعلام","شعبة العلاقات العامة"]} />
            <DocRow name="الخطة الاستراتيجية للدائرة" url="https://www.mutah.edu.jo/ar/publicrelations/Documents/ppp.pdf" />
          </div>
        );

      case 'div-media':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الإعلام" sub="دائرة العلاقات الثقافية والعامة" />
            <Prose><p>تتولى شعبة الإعلام مهام كثيرة، منها تغطية جميع أخبار الجامعة وأنشطتها في وسائل الإعلام المختلفة المقروءة والمسموعة والمرئية، وإعداد التقارير والتحقيقات الصحفية والمقابلات عن مختلف مرافق الجامعة، وتزويد الصحف اليومية والأسبوعية بأخبار الجامعة وأنشطتها وتقارير وتحقيقات صحفية عن أهم المستجدات في الجامعة، ومتابعة نشر الأخبار في وسائل الإعلام المختلفة وتوثيقها حسب الأصول وتوزيعها على المعنيين داخل الجامعة وخارجها.</p><p>وتقوم الشعبة بهذه المهام من خلال الفرعين التابعين لها:</p></Prose>
            <NumList items={["فرع الإعلانات والاشتراكات.","فرع المتابعات الإعلامية."]} />
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">الخطط والطموحات المستقبلية لشعبة الإعلام</h3><NumList items={["تعزيز أواصر الصلة مع وسائل الإعلام المختلفة ومندوبيها سواء أكانت وطنية أو عربية أو إقليمية أو دولية.","توسيع الدائرة الإعلامية من خلال النشاطات النوعية كالمؤتمرات المحلية والدولية وبشكل دوري ضمن تشاركية الجامعة ومؤسسات المجتمع المدني والجهات العربية والدولية، خصوصاً الجهات ذات الاختصاص بشأن التعليم وسبل تطويره.","العمل على مواكبة روح العصر في المجال الإعلامي من حيث الوسائل والسبل والتقنيات، وتوفير الأجهزة والمعدات اللازمة لكل مرحلة لتحقيق الأفضل."]} /></div>
          </div>
        );

      case 'div-pr':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة العلاقات العامة" sub="دائرة العلاقات الثقافية والعامة" />
            <h3 className="text-xl font-bold text-[#0f3057] mb-4">المهام والواجبات</h3>
            <NumList items={["استقبال ضيوف الجامعة وإعداد برامج زيارة لهم ومرافقتهم في جولاتهم واطلاعهم على منجزات الجامعة في شتى الميادين والمجالات، والتنسيق مع مختلف مرافق الجامعة لإنجاح هذه الزيارات.","الإشراف على تجهيز أماكن عقد مختلف الأنشطة وتزويدها بما يلزم من أجهزة صوت وتسجيل وتصوير وأجهزة عرض البيانات وأجهزة الرأس المرتفع وغيرها.","الإشراف على توزيع بعض المطبوعات الصادرة عن الجامعة على مختلف المؤسسات الرسمية والأهلية داخل المملكة.","تأمين المفردات الإعلامية (الهدايا التذكارية) التي تقدم لكبار ضيوف الجامعة من قبل رئيس الجامعة أو نوابه، أو المفردات الخاصة بالأنشطة الطلابية، والاحتفاظ بسجلات تبين أنواع وأعداد هذه المفردات.","العمل على إعداد أرشيف للصور (الفوتوغرافية) لمختلف النشاطات وإرسال نسخ منها للمعنيين داخل الجامعة وخارجها على سبيل الإهداء.","الإشراف على كافة النشاطات التي يرعاها رئيس الجامعة من حيث تنظيم مكان النشاط وتوجيه الدعوات الداخلية والخارجية، والتنسيق مع الجهات المسؤولة في الجامعة كالخدمات والصيانة لإبراز هذه الأنشطة بالشكل اللائق.","تنظيم المؤتمرات والندوات والمواسم الثقافية والعمل على إنجاحها حسب الأصول.","المشاركة في بعض اللجان ذات الطابع التنظيمي كالتخريج العسكري والمدني والمؤتمرات العلمية والندوات.","دعوة وسائل الإعلام المختلفة المقروءة والمرئية والمسموعة لتغطية أنشطة الجامعة، وعقد المؤتمرات الصحفية مع المسؤولين في الجامعة لإبراز إنجازات الجامعة على كافة الأصعدة.","إظهار الجامعة في المناسبات الوطنية والقومية بالشكل اللائق وتزيين مرافقها."]} />
            <div><h3 className="text-xl font-bold text-[#0f3057] mb-4">الخطط والطموحات المستقبلية لشعبة العلاقات العامة</h3><Prose><p>تتطلع الشعبة وفق رؤيتها المنشودة إلى الارتقاء في مستوى أدائها، من خلال توسيع مهامها في تنظيم اللقاءات والندوات ومنحها صيغة إيجابية في الأداء وفق منهجية قائمة على قواعد علمية لماهية عمل العلاقات العامة، وذلك بالاستفادة من خبرات مؤسساتنا الوطنية وما تمتلك من رؤى مستقبلية يمكن أن تصب في صالح العمل.</p><p>طموحنا... وصول موظف العلاقات إلى أعلى مستوى من مستويات التعامل المبني على معرفة ودراية مع كافة الجهات ذات العلاقة بالجامعة، عن طريق التأهيل بدورات متخصصة تسهم في أداء ما هو مطلوب بأقل جهد وأقل تكلفة.</p></Prose></div>
          </div>
        );

      case 'div-protocol':
        return (
          <div className="space-y-8">
            <PageTitle title="الخدمات" sub="دائرة العلاقات الثقافية والعامة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm"><img src="https://www.mutah.edu.jo/ar/publicrelations/PublishingImages/IMG_7532.JPG" alt="الخدمات" className="w-full max-h-[400px] object-cover" /></div>
            <Prose>
              <p>تسعى دائرة العلاقات الثقافية والعامة دائماً لتطوير الأهداف وتحقيق المشاركة الفاعلة والمساهمة بكل فعل علمي وثقافي واجتماعي وتنموي للجامعة والمجتمع المحلي وإحداث تغيير إيجابي، وتنسيق جميع الأنشطة التي تقوم بها الكليات والعمادات مثل الأنشطة الثقافية والاجتماعية والفنية، وتنظيم علاقة الجامعة مع الجهات الرسمية والشعبية والمحلية والعربية والدولية، حيث تقوم بإعداد وتنظيم العديد من الدورات والمؤتمرات وإقامة المعارض وترتيب الزيارات للوفود الرسمية والشعبية، وإصدار العديد من النشرات والكتيبات، وإصدار الكتاب السنوي للخريجين، وإصدار مجلة راية مؤتة بشكل فصلي من خلال هيئة تحرير متخصصة، والتعاون مع وسائل الإعلام المختلفة من وكالات أنباء وصحف يومية ومواقع إلكترونية وغيرها وتزويدهم بكل ما يسهل مهمتهم. كما تقوم الدائرة بتقديم العديد من الخدمات الفنية من خلال عمل اليافطات والقارمات ووضع التصاميم للعديد من المفردات الإعلامية لمجتمع الجامعة والمجتمع المحلي، وتصوير جميع المناسبات والأنشطة من احتفالات وطنية ورسمية ودينية وندوات وزيارات ومعارض ومؤتمرات وورش عمل وحملات تبرع بالدم وأيام طبية مجانية وأمسيات أدبية وثقافية، وتوثيقها وإهداؤها لزوار الجامعة وضيوفها.</p>
              <p>وبناءً على ذلك فإن دائرة العلاقات الثقافية والعامة قد بنت خطتها الاستراتيجية على مجموعة عوامل جعلتها تحقق الهدف والغاية في آن واحد، وذلك بتوفير البيئة المناسبة للعمل وتوفر كوادر إدارية وفنية ومساعدة مؤهلة للقيام بالمهام الوظيفية المطلوبة بصورة جيدة، ويعتبر هذا العامل الداخلي عاملاً إيجابياً جداً مساهماً في تحقيق النجاح الملائم للعمل. كما أن هناك عوامل خارجية جيدة مثل العلاقة المتميزة والتواصل الدائم مع مؤسسات المجتمع المحلي من رسمية وشخصية وهيئات أهلية وثقافية واجتماعية ساهمت في نجاح العديد من أنشطة العلاقات الثقافية والعامة بشكل عام وعلى مدار سنوات.</p>
            </Prose>
          </div>
        );

      case 'news':
        return (
          <div className="space-y-8">
            <PageTitle title="أخبار وأحداث" sub="دائرة العلاقات الثقافية والعامة" />
            <NewsGrid>
              {ITEMS['pr-news'].items.map((n: any, i: number) => (
                <NewsCard key={i} to={'/u-item/pr-news/' + i} title={n.t} date={n.d} img={n.img} excerpt={n.excerpt} />
              ))}
            </NewsGrid>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-8">
            <PageTitle title="إتصل بنا" sub="دائرة العلاقات العامة والثقافية" />
            <ContactBlock phone="+(962) 3 2372380" emails={['Unit_admin@mutah.edu.jo']} />
          </div>
        );
      case 'home':
        return (
          <div className="space-y-10">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src={HERO} alt="دائرة العلاقات العامة والثقافية" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                تتولى دائرة العلاقات العامة والثقافية في جامعة مؤتة التعريف بالجامعة وأنشطتها، وتغطية
                فعالياتها إعلامياً، وتنظيم المناسبات والاحتفالات الرسمية، والتواصل مع وسائل الإعلام
                والجهات الرسمية والمجتمع المحلي.
              </p>
            </Prose>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">روابط سريعة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <LinkRow name="أخبار الجامعة" url="https://www.mutah.edu.jo/ar/publicrelations/Home.aspx" />
                <LinkRow name="معرض الصور" url="https://www.mutah.edu.jo/ar/publicrelations/Photos/Forms/SlideShow.aspx" />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, PR_LINKS)} sub="دائرة العلاقات العامة والثقافية" />
          </div>
        );
    }
  };
  return (
    <DeanshipShell brand="دائرة العلاقات العامة والثقافية"
      tagline="التعريف بالجامعة وأنشطتها، وتغطية فعالياتها إعلامياً، وتنظيم المناسبات والاحتفالات الرسمية."
      heroImage={HERO} links={PR_LINKS} activeItem={activeItem} setActiveItem={setActiveItem}
    >{render()}</DeanshipShell>
  );
}
