import React from 'react';
import { Target, Eye, Users, Award, Building2, Phone, Mail, MapPin, Info, Star } from 'lucide-react';

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

function Wrap({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="w-full animate-in fade-in duration-500" dir="rtl">
      <div className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-bold text-[#0f3057] mb-2">{title}</h1>
        {sub && <p className="text-lg text-gray-600">{sub}</p>}
      </div>
      <div className="flex flex-col gap-10">{children}</div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 md:p-10 space-y-5 text-gray-700 leading-[2.1] text-justify">{children}</div>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((d, i) => (
        <div key={i} className="flex items-start gap-3 bg-[#F8FAFC] border border-gray-100 rounded-xl px-5 py-3.5">
          <span className="w-6 h-6 rounded-full bg-[#0f3057] text-[#c9a227] text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
          <p className="text-sm text-gray-700 leading-relaxed">{d}</p>
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

export function MedicineVision() {
  return (
    <Wrap title="الرؤيا والرسالة والاهداف" sub="كلية الطب — جامعة مؤتة">
      <div>
        <SectionTitle icon={Eye} title="الرؤية" />
        <Card><p>التميز في التعليم الطبي والبحث العلمي وخدمة المجتمع، والوصول إلى مكانة مرموقة بين كليات الطب على المستوى الوطني والإقليمي.</p></Card>
      </div>
      <div>
        <SectionTitle icon={Target} title="الرسالة" />
        <Card><p>إعداد أطباء مؤهلين علمياً ومهنياً وأخلاقياً، قادرين على تقديم رعاية صحية آمنة وفاعلة، والمساهمة في البحث العلمي وخدمة المجتمع المحلي، وفق معايير الجودة المعتمدة في التعليم الطبي.</p></Card>
      </div>
      <div>
        <SectionTitle icon={Star} title="الأهداف" />
        <Bullets items={[
          'تقديم برنامج دكتور في الطب العام وفق أحدث المناهج والمعايير الأكاديمية المعتمدة.',
          'تنمية مهارات الطلبة السريرية والتشخيصية من خلال التدريب في مستشفى الجامعة والمرافق الصحية المعتمدة.',
          'تشجيع البحث العلمي بين أعضاء هيئة التدريس والطلبة ونشر نتاجه في المجلات العلمية المحكمة.',
          'تعزيز مبادئ أخلاقيات المهنة والالتزام المهني لدى الطلبة.',
          'الإسهام في خدمة المجتمع المحلي عبر الأنشطة والحملات الصحية التوعوية.',
          'بناء شراكات أكاديمية وبحثية مع كليات الطب والمراكز البحثية داخل الأردن وخارجه.',
        ]} />
      </div>
    </Wrap>
  );
}

export function MedicineDean() {
  return (
    <Wrap title="مكتب العميد" sub="كلية الطب — جامعة مؤتة">
      <div>
        <SectionTitle icon={Users} title="مهام مكتب العميد" />
        <Bullets items={[
          'الإشراف على الشؤون الأكاديمية والإدارية في الكلية ومتابعة تنفيذ قرارات مجلس الكلية ومجلس العمداء.',
          'متابعة أعمال الأقسام الأكاديمية واللجان المنبثقة عن مجلس الكلية.',
          'الإشراف على برامج التدريب السريري وعلاقة الكلية بالمستشفيات والمرافق الصحية.',
          'تمثيل الكلية في المجالس واللجان الجامعية وفي علاقاتها مع الجهات الخارجية.',
          'متابعة شؤون الطلبة الأكاديمية والانضباطية بالتنسيق مع الجهات المعنية في الجامعة.',
        ]} />
      </div>
      <div>
        <SectionTitle icon={Phone} title="التواصل مع مكتب العميد" />
        <Card>
          <p className="flex items-center gap-3"><Phone size={16} className="text-[#c9a227]" /> هاتف : 0096232372380</p>
          <p className="flex items-center gap-3"><Mail size={16} className="text-[#c9a227]" /> البريد الإلكتروني : medicine@mutah.edu.jo</p>
          <p className="flex items-center gap-3"><MapPin size={16} className="text-[#c9a227]" /> جامعة مؤتة / كلية الطب — الكرك :: الأردن / ص.ب (7)</p>
        </Card>
      </div>
    </Wrap>
  );
}

export function MedicineCouncil() {
  return (
    <Wrap title="مجلس الكلية" sub="كلية الطب — جامعة مؤتة">
      <div>
        <SectionTitle icon={Users} title="تكوين المجلس" />
        <Card><p>يتكون مجلس الكلية من العميد رئيساً، ونائب العميد، ورؤساء الأقسام الأكاديمية، وأعضاء من هيئة التدريس وفق ما تنص عليه أنظمة الجامعة وتعليماتها النافذة.</p></Card>
      </div>
      <div>
        <SectionTitle icon={Target} title="مهام المجلس" />
        <Bullets items={[
          'إقرار الخطط الدراسية والمساقات المطروحة والتوصية بها لمجلس العمداء.',
          'النظر في شؤون الطلبة الأكاديمية وإقرار نتائج الامتحانات وقوائم المتوقع تخرجهم.',
          'التوصية بتعيين أعضاء هيئة التدريس وترقياتهم وفق التعليمات.',
          'تشكيل لجان الكلية ومتابعة أعمالها وإقرار تقاريرها.',
          'إقرار خطط البحث العلمي وأنشطة خدمة المجتمع في الكلية.',
        ]} />
      </div>
    </Wrap>
  );
}

export function MedicineCommittees() {
  return (
    <Wrap title="لجان الكلية" sub="كلية الطب — جامعة مؤتة">
      <div>
        <SectionTitle icon={Award} title="اللجان الدائمة" />
        <Bullets items={[
          'لجنة الخطط الدراسية والمناهج.',
          'لجنة ضمان الجودة والاعتماد.',
          'لجنة البحث العلمي والدراسات العليا.',
          'لجنة الامتحانات والتقييم.',
          'لجنة الإرشاد الأكاديمي وشؤون الطلبة.',
          'لجنة التدريب السريري والعلاقة مع المستشفيات.',
          'لجنة خدمة المجتمع والأنشطة اللاصفية.',
        ]} />
      </div>
    </Wrap>
  );
}

export function MedicineStrategy() {
  return (
    <Wrap title="الخطة الاستراتيجية" sub="كلية الطب — جامعة مؤتة">
      <div>
        <SectionTitle icon={Target} title="المحاور الاستراتيجية" />
        <Bullets items={[
          'تطوير البرامج الأكاديمية وتحديث المناهج وفق معايير الاعتماد الوطنية والدولية.',
          'تعزيز البحث العلمي ورفع نتاج الكلية المنشور في المجلات المحكمة.',
          'تطوير التدريب السريري والبنية التحتية من مختبرات وقاعات ومرافق تدريب.',
          'تنمية قدرات أعضاء هيئة التدريس والكوادر الإدارية والفنية.',
          'توسيع الشراكات الأكاديمية والبحثية محلياً ودولياً.',
          'تعزيز خدمة المجتمع المحلي عبر البرامج والحملات الصحية.',
        ]} />
      </div>
      <div>
        <SectionTitle icon={Star} title="مؤشرات المتابعة" />
        <Card><p>تُتابع الخطة عبر مؤشرات أداء دورية تشمل نتائج الاعتماد وضمان الجودة، وعدد الأبحاث المنشورة، ونسب رضا الطلبة، ومعدلات النجاح في الامتحانات المهنية.</p></Card>
      </div>
    </Wrap>
  );
}

export function MedicineStructure() {
  return (
    <Wrap title="الهيكل التنظيمي" sub="كلية الطب — جامعة مؤتة">
      <div>
        <SectionTitle icon={Building2} title="مكونات الهيكل" />
        <Bullets items={[
          'العميد.',
          'نائب العميد.',
          'مجلس الكلية.',
          'رؤساء الأقسام الأكاديمية.',
          'الأقسام الأكاديمية ومختبراتها.',
          'مكتب العميد والديوان.',
          'الشعب الإدارية والفنية المساندة.',
        ]} />
      </div>
    </Wrap>
  );
}

export function MedicineStaff() {
  return (
    <Wrap title="الإداريون" sub="كلية الطب — جامعة مؤتة">
      <div>
        <SectionTitle icon={Users} title="الكادر الإداري" />
        <Card><p>يضم الكادر الإداري في الكلية مكتب العميد والديوان والشعب المساندة التي تتولى متابعة شؤون الطلبة والامتحانات والمختبرات واللوازم والمراسلات الرسمية.</p></Card>
        <EmptyNote label="لم تُنشر قائمة أسماء الكادر الإداري وأرقامهم الفرعية على الموقع الرسمي للكلية حتى تاريخ إعداد هذه الصفحة." />
      </div>
      <div>
        <SectionTitle icon={Phone} title="للتواصل" />
        <Card>
          <p className="flex items-center gap-3"><Phone size={16} className="text-[#c9a227]" /> هاتف : 0096232372380</p>
          <p className="flex items-center gap-3"><Mail size={16} className="text-[#c9a227]" /> البريد الإلكتروني : medicine@mutah.edu.jo</p>
        </Card>
      </div>
    </Wrap>
  );
}
