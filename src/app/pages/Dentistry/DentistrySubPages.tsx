import React from 'react';
import { Link } from "react-router";
import { Target, FileText, Download, ExternalLink, Users, Award, BookOpen, Phone, Mail, MapPin, Info } from 'lucide-react';
import { NewsCard, NewsGrid } from '@/app/components/NewsCard';

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

/* ─── عن الكلية (كلمة العميد الكاملة) ─── */
export function DentistryAbout() {
  const paragraphs = [
    'بكل فخر واعتزاز، يسرني أن أرحب بكم في كلية طب الأسنان في جامعة مؤتة هذا الصرح الأكاديمي الجديد والذي يمثل بداية مشوار حافل بالتميز والإبداع للجميع.',
    'إن تأسيس هذه الكلية جاء نتاجاً لسنوات من التخطيط المتأنّي والعمل الدؤوب، حيث وضعنا نصب أعيننا تزويد الكلية بأحدث ما توصل إليه العلم في مجال طب وجراحة الفم والأسنان، من خلال مناهج تعليمية متطورة، ومرافق متقدمة، وأعضاء هيئة تدريسية وكوادر فنية وإدارية متميزة تتمتع بخبرة وكفاءة عالية. هدفنا الأساسي هو إعداد جيل من أطباء الأسنان المتفوقين علمياً، الملتزمين بأعلى معايير الأخلاق المهنية، والذين يتفهمون أهمية دورهم في خدمة المجتمع ورفعة مهنة طب الأسنان في الأردن وخارجها.',
    'طلابنا الأعزاء، أنتم اليوم على أعتاب مستقبل مشرق، أمامكم فرصة فريدة لتكونوا جزءاً من مسيرة علمية ومهنية ستشكل حياتكم المستقبلية. إن انضمامكم إلى كلية طب الأسنان ليس مجرد دخول إلى مجال دراسي جديد، بل هو بداية رحلة نحو التفوق والإبداع. سنكون معكم في كل خطوة تخطونها، نوجهكم، ندعمكم، ونمدكم بالمعرفة والتدريب الذي تحتاجونه لتكونوا رواداً في مجالكم.',
    'ولن تكون مهمتنا في الكلية مقتصرة على تعليمكم المهارات العلمية والعملية فقط، بل نسعى أيضاً إلى بناء الشخصية وتعزيز روح البحث العلمي والابتكار فيكم. فنحن نؤمن أن طبيب الأسنان الناجح لا يكتفي فقط بالتعلم، بل يسعى دائماً إلى تطوير ذاته والبحث عن الحلول الجديدة.',
    'وفي هذا السياق، نؤكد على التزامنا بتقديم تعليم عالي الجودة يواكب المعايير العالمية، مع توفير بيئة تعليمية محفزة تشجع على التفاعل والإبداع. كما سنحرص على توفير التدريب العملي المتقدم من خلال عياداتنا المتطورة، لتتمكنوا من تطبيق ما تتعلمونه بشكل عملي وملموس.',
    'إنني على ثقة تامة بأنكم تمتلكون كل المقومات اللازمة للنجاح والتميز. وأحثكم على بذل قصارى جهدكم في استثمار هذه الفرصة العظيمة، وأتطلع إلى رؤية إنجازاتكم العلمية والمهنية التي ستسهم في رفع راية هذه الكلية وهذه الجامعة عالياً.',
    'في الختام، أتقدم بخالص الشكر والتقدير لجميع من ساهم في تحقيق هذا الحلم من لجان أكاديمية وفنية وأفراد على مستوى الجامعة وكذلك أعضاء الهيئة التدريسية والإدارية، وأخص بالشكر إدارة الجامعة التي لم تألُ جهداً في دعم هذا المشروع الكبير. وأتمنى لكل فرد منكم عاماً دراسياً مليئاً بالنجاح والتفوق، وأن تكون هذه البداية المباركة خطوة نحو مستقبل مشرق حافل بالإنجازات، خدمة لبلدنا الأردن الحبيب وتحت ظل الراية الهاشمية.',
  ];
  return (
    <Wrap>
      <SectionTitle icon={BookOpen} title="كلية طب وجراحة الأسنان في سطور" />
      <p className="text-[#c9a227] font-bold mb-6">كلمة العميد</p>
      <div className="flex flex-col gap-4 mb-8">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-gray-700 leading-[2.1] text-justify text-[16px]">{p}</p>
        ))}
      </div>
      <div className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5">
        <p className="font-bold text-[#0f3057] mb-1">الأستاذ الدكتور أيمن إبراهيم القطيطات</p>
        <p className="text-sm text-gray-600">عميد كلية طب وجراحة الفم والأسنان — جامعة مؤتة</p>
      </div>
    </Wrap>
  );
}

/* ─── الرؤية والرسالة والأهداف ─── */
export function DentistryVision() {
  return (
    <Wrap>
      <SectionTitle icon={Target} title="الرؤيا والرسالة والاهداف" />
      <div className="bg-gradient-to-l from-[#0f3057] to-[#16457a] rounded-2xl p-8 mb-8">
        <p className="text-[#c9a227] text-xs font-bold uppercase tracking-widest mb-3">شعار الكلية</p>
        <h3 className="text-white text-2xl font-bold leading-snug">
          من أجل بيئة تعليمية صحية للتفوق المهني
        </h3>
      </div>
      <EmptyNote label="تنشر الكلية الرؤيا والرسالة والأهداف على موقعها الرسمي بصيغة صورة واحدة؛ يمكن استعراضها من صفحة الكلية أو ضمن الخطة الاستراتيجية 2025." />
      <div className="mt-6">
        <FileRow name="الخطة الاستراتيجية 2025" note="PDF" />
      </div>
    </Wrap>
  );
}

/* ─── الخطة الاستراتيجية ─── */
export function DentistryStrategy() {
  return (
    <Wrap>
      <SectionTitle icon={Target} title="الخطة الاستيراتيجية" />
      <div className="flex flex-col gap-3">
        <FileRow name="الخطة الاستراتيجية 2025" note="PDF" />
        <FileRow name="الخطة الإسترشادية لطلبة كلية طب الأسنان" note="PDF" />
        <FileRow name="2025 دليل الإرشاد الأكاديمي لكلية طب وجراحة الأسنان" note="PDF" />
      </div>
    </Wrap>
  );
}

/* ─── مكتب العميد ─── */
export function DentistryDean() {
  return (
    <Wrap>
      <SectionTitle icon={Users} title="مكتب العميد" />
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 mb-6">
        <p className="text-[#c9a227] text-xs font-bold uppercase tracking-widest mb-2">عميد الكلية</p>
        <h3 className="text-xl font-bold text-[#0f3057] mb-1">الأستاذ الدكتور أيمن إبراهيم القطيطات</h3>
        <p className="text-sm text-gray-600 mb-6">عميد كلية طب وجراحة الفم والأسنان — جامعة مؤتة</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
            <Phone size={16} className="text-[#0f3057] flex-shrink-0" />
            <span className="text-sm font-bold text-[#0f3057]" dir="ltr">+962-03-2372380</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
            <Mail size={16} className="text-[#0f3057] flex-shrink-0" />
            <span className="text-sm font-bold text-[#0f3057]" dir="ltr">Unit_admin@mutah.edu.jo</span>
          </div>
        </div>
      </div>
      <EmptyNote label="قائمة أعضاء مكتب العميد تُدار عبر قائمة إلكترونية على موقع الكلية." />
    </Wrap>
  );
}

/* ─── مجلس الكلية / لجان الكلية / العمداء السابقون / الإداريون ─── */
export function DentistryCouncil() {
  return (
    <Wrap>
      <SectionTitle icon={Users} title="مجلس الكلية" />
      <EmptyNote label="أعضاء مجلس الكلية يُنشرون في قائمة إلكترونية على موقع الكلية الرسمي." />
    </Wrap>
  );
}

export function DentistryCommittees() {
  return (
    <Wrap>
      <SectionTitle icon={Users} title="لجان الكلية" />
      <EmptyNote label="لجان الكلية تُنشر في صفحة مخصصة على موقع الكلية الرسمي." />
    </Wrap>
  );
}

export function DentistryFormerDeans() {
  return (
    <Wrap>
      <SectionTitle icon={Award} title="العمداء السابقون" />
      <EmptyNote label="الكلية حديثة التأسيس، ولا يوجد عمداء سابقون منشورون حتى الآن." />
    </Wrap>
  );
}

export function DentistryStaff() {
  return (
    <Wrap>
      <SectionTitle icon={Users} title="الموظفون الاداريون" />
      <EmptyNote label="قائمة الموظفين الإداريين تُدار عبر قائمة إلكترونية على موقع الكلية." />
    </Wrap>
  );
}

/* ─── البرامج الأكاديمية ─── */
export function DentistryPrograms() {
  const programs = [
    { title: 'البكالوريوس', desc: 'برنامج بكالوريوس طب وجراحة الفم والأسنان.', icon: '🦷', path: '/dentistry/programs/bachelor' },
    { title: 'الدراسات العليا', desc: 'برامج الدراسات العليا في تخصصات طب الأسنان.', icon: '🎓', path: '/dentistry/programs/graduate' },
    { title: 'برامج أخرى', desc: 'برامج ودورات تخصصية أخرى تقدمها الكلية.', icon: '📚', path: '/dentistry/programs/other' },
  ];
  return (
    <Wrap>
      <SectionTitle icon={BookOpen} title="البرامج الاكاديمية" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {programs.map((p) => (
          <Link key={p.title} to={p.path} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 hover:shadow-md hover:border-[#c9a227]/40 transition-all block">
            <span className="text-3xl block mb-4">{p.icon}</span>
            <h3 className="font-bold text-[#0f3057] text-lg mb-2">{p.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <FileRow name="الإطار العام لتخصص طب الأسنان" note="PDF" />
      </div>
    </Wrap>
  );
}

/* ─── الانجازات ─── */
export function DentistryAchievements() {
  const items = [
    { title: '14 مختبراً أساسياً وتخصصياً', desc: 'لتمكين الطلبة من المهارات الأساسية لطب الأسنان.' },
    { title: 'فعالية دعم الحياة الأساسي والإسعافات الطارئة', desc: 'تدريب عملي لطلبة الكلية على الإسعافات الأولية.' },
    { title: 'تكريم بيزا هاوس لدعمها كلية طب الأسنان', desc: 'تقدير للشراكات المجتمعية الداعمة للكلية.' },
    { title: '"رحلة ابتسامة سعيدة"', desc: 'فعالية توعوية بصحة الفم والأسنان.' },
  ];
  return (
    <Wrap>
      <SectionTitle icon={Award} title="الانجازات" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((it) => (
          <div key={it.title} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-[#0f3057] mb-2 leading-snug">{it.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{it.desc}</p>
          </div>
        ))}
      </div>
    </Wrap>
  );
}

/* ─── المؤتمرات ─── */
export function DentistryConferences() {
  return (
    <Wrap>
      <SectionTitle icon={Users} title="المؤتمرات" />
      <EmptyNote label="مؤتمرات الكلية تُنشر في قائمة إلكترونية على موقع الكلية الرسمي." />
    </Wrap>
  );
}

/* ─── النماذج ─── */
export function DentistryForms() {
  return (
    <Wrap>
      <SectionTitle icon={FileText} title="النماذج" />
      <EmptyNote label="مكتبة نماذج الكلية تُدار عبر مكتبة مستندات على موقع الكلية الرسمي." />
    </Wrap>
  );
}

/* ─── أخبار وإعلانات ─── */
export function DentistryNews() {
  const news = [
    { date: '18/8/2026', title: 'معلومات تهم الطلبة المقبلين الى كلية طب الأسنان' },
    { date: '2/6/2026', title: '"رحلة ابتسامة سعيدة"' },
    { date: '2/6/2026', title: 'فعالية دعم الحياة الأساسي والإسعافات الطارئة' },
    { date: '26/4/2026', title: 'تكريم بيزا هاوس لدعمها كلية طب الأسنان' },
  ];
  return (
    <Wrap>
      <SectionTitle icon={FileText} title="أخبار وإعلانات" />
      <NewsGrid>
        {news.map((n: any, i: number) => (
          <NewsCard key={i} to={'/f-item/dentistry/news/' + i} title={n.title} date={n.date} img={n.img} excerpt={n.excerpt} />
        ))}
      </NewsGrid>
    </Wrap>
  );
}

/* ─── روابط هامة ─── */
export function DentistryLinks() {
  const links = [
    { name: 'دليل معايير الإعتماد و ضمان الجودة', note: 'DOCX' },
    { name: 'الإطار العام لتخصص طب الأسنان', note: 'DOCX' },
    { name: 'تعليمات موظفي جامعة مؤتة', note: 'DOCX' },
    { name: 'تعليمات حوافز البحث العلمي', note: 'DOCX' },
    { name: 'اسس تكريم الباحثين المتميزين', note: 'DOCX' },
    { name: 'كود صفحة الفيسبوك لكلية طب الأسنان', note: 'DOCX' },
    { name: 'دليل اخلاقيات البحث العلمي والذكاء الاصطناعي', note: 'DOCX' },
    { name: 'الخطة الإسترشادية لطلبة كلية طب الأسنان', note: 'DOCX' },
    { name: '2025 دليل الإرشاد الأكاديمي لكلية طب وجراحة الأسنان', note: 'DOCX' },
    { name: 'الخطة الاستراتيجية 2025', note: 'DOCX' },
  ];
  return (
    <Wrap>
      <SectionTitle icon={ExternalLink} title="روابط هامة" />
      <div className="flex flex-col gap-3 mb-6">
        {links.map((l) => <FileRow key={l.name} name={l.name} note={l.note} />)}
      </div>
      <a
        href="https://denti.mutah.edu.jo/Pages/Staff-Publications.aspx"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 bg-[#0f3057] hover:bg-[#16457a] active:bg-[#0b2540] text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        <ExternalLink size={16} className="text-[#c9a227]" />
        الإنتاج العلمي لأعضاء هيئة التدريس
      </a>
    </Wrap>
  );
}

/* ─── إتصل بنا ─── */
export function DentistryContact() {
  return (
    <Wrap>
      <SectionTitle icon={Phone} title="إتصل بنا" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <Phone size={18} className="text-[#c9a227] mb-3" />
          <p className="text-xs text-gray-500 mb-1">الهاتف</p>
          <p className="text-sm font-bold text-[#0f3057]" dir="ltr">+962-03-2372380</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <Mail size={18} className="text-[#c9a227] mb-3" />
          <p className="text-xs text-gray-500 mb-1">البريد الإلكتروني</p>
          <p className="text-sm font-bold text-[#0f3057]" dir="ltr">Unit_admin@mutah.edu.jo</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <MapPin size={18} className="text-[#c9a227] mb-3" />
          <p className="text-xs text-gray-500 mb-1">العنوان</p>
          <p className="text-sm font-bold text-[#0f3057]">جامعة مؤتة — الكرك، الأردن</p>
        </div>
      </div>
    </Wrap>
  );
}
