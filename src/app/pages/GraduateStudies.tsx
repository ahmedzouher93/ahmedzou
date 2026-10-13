import { useTabRoute } from "../nav";
import React, { useState } from 'react';
import { WireframeHeader } from '../components/WireframeHeader';
import { WireframeFooter } from '../components/WireframeFooter';
import {ChevronRight, Users, FileText, Menu, GraduationCap,
  Coins, BookOpen, ChevronLeft, MapPin, Phone, Mail,
  Building, Calendar, Download, Info, ChevronDown, ExternalLink, Globe, ArrowLeft} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import orgChart2024 from '@/imports/org-chart-2024.png';
import { NewsCard, NewsGrid } from '@/app/components/NewsCard';
import { Breadcrumbs, navTrail } from '../components/Breadcrumbs';

const GRADUATE_LINKS = [
  { id: 'home', name: 'الرئيسية' },
  {
    id: 'about',
    name: 'عن الكلية',
    children: [
      { id: 'about-genesis', name: 'نشأة الكلية' },
      { id: 'about-strategy', name: 'استراتيجية الكلية' },
      { id: 'about-plan', name: 'الخطة الاستيراتيجية' },
      { id: 'about-board', name: 'مجلس الكلية' },
      { id: 'about-dean', name: 'كلمة العميد' },
      { id: 'about-staff', name: 'موظفو الكلية' },
      { id: 'about-structure', name: 'الهيكل التنظيمي' },
      { id: 'about-former', name: 'العمداء السابقون' },
      { id: 'about-honory', name: 'الدكتوراة الفخرية' },
      { id: 'about-stats', name: 'ارقام واحصائيات' },
      { id: 'about-map', name: 'خريطة الكلية' }
    ]
  },
  {
    id: 'programs',
    name: 'برامج الكلية',
    children: [
      { id: 'prog-phd', name: 'برامج الدكتوراة' },
      { id: 'prog-master', name: 'برامج الماجستير' },
      { id: 'master-med', name: '— الكليات الطبية' },
      { id: 'master-sci', name: '— الكليات العلمية' },
      { id: 'master-huma', name: '— الكليات الإنسانية' },
      { id: 'prog-shared', name: 'البرامج المشتركة ماجستير' },
      { id: 'prog-nursing', name: 'الدبلوم العالي في التمريض \\ القبالة' },
      { id: 'prog-teachers', name: 'الدبلوم العالي لإعداد المعلمين' }
    ]
  },
  {
    id: 'students',
    name: 'شؤون الطلبة',
    children: [
      { id: 'stu-fees', name: 'الرسوم الجامعية' },
      { id: 'stu-laws', name: 'التشريعات' },
      { id: 'stu-thesis', name: 'الرسائل الجامعية' },
      { id: 'stu-wishing', name: 'الطلبة الراغبون بالالتحاق' },
      { id: 'stu-current', name: 'الطلبة على مقاعد الدراسة' },
      { id: 'stu-calendar', name: 'التقويم الجامعي' },
      { id: 'stu-plans', name: 'الخطط الدراسية لكلية الدراسات العليا' },
      { id: 'stu-english', name: 'امتحان اللغة الانجليزية' },
      { id: 'stu-sites', name: 'مواقع تهم الطلبة' }
    ]
  },
  {
    id: 'scholarships',
    name: 'دائرة البعثات',
    children: [
      { id: 'schol-about', name: 'عن الدائرة' },
      { id: 'schol-committee', name: 'لجنة البعثات' },
      { id: 'schol-stats', name: 'إحصائيات وأرقام' }
    ]
  },
  { id: 'admission', name: 'معلومات خاصة بالقبول' },
  { id: 'forms', name: 'النماذج' },
  { id: 'gallery', name: 'معرض الصور' },
  { id: 'contact', name: 'إتصل بنا' }
];

const NEWS = [
  { id: 'grad-36', date: '21/7/2025', title: 'تخريج الفوج السادس والثلاثين لطلبة الدراسات العليا – جامعة مؤتة', img: 'https://www.mutah.edu.jo/ar/GraduateStudies/SiteAssets/Lists/MainSlideShow/EditForm/463097745_934558445381531_2053696325672575625_n.jpg' },
  { id: 'top-students-36', date: '20/7/2025', title: 'أوائل التخصصات في برامج الدراسات العليا للفوج السادس والثلاثين', img: 'https://www.mutah.edu.jo/ar/GraduateStudies/SiteAssets/Lists/MainSlideShow/EditForm/455249957_890894076414635_1811359401118425394_n.jpg' },
  { id: 'police-academy-19', date: '14/10/2024', title: 'تخريج الفوج التاسع عشر لبرنامج الماجستير في أكاديمية الشرطة الملكية بالتعاون مع جامعة مؤتة', img: 'https://www.mutah.edu.jo/ar/GraduateStudies/SiteAssets/Lists/MainSlideShow/EditForm/463276580_934558708714838_4527933639320416840_n.jpg' },
  { id: 'grad-ceremony-2024', date: '14/8/2024', title: 'تخريج طلبة الدراسات العليا', img: 'https://www.mutah.edu.jo/ar/GraduateStudies/SiteAssets/Lists/MainSlideShow/EditForm/WhatsApp%20Image%202024-10-20%20at%2010.56.08%20AM.jpeg' }
];

const ANNOUNCEMENTS = [
  { id: 'arabic-proficiency', date: '29/7/2026', title: 'امتحان الكفاية في اللغة العربية' },
  { id: 'jordanian-applications', date: '29/7/2026', title: 'بدء استقبال طلبات الالتحاق في برامج كلية الدراسات العليا للطلبة الإردنيين' },
  { id: 'medical-specialty', date: '23/7/2026', title: 'إعلان لطلبة الاختصاص العالي في الطب جامعة مؤتة' }
];

const USEFUL = [
  { name: 'التعليم الالكتروني', url: 'https://elearn.mutah.edu.jo/', icon: Globe },
  { name: 'البريد الالكتروني', url: 'https://outlook.office.com/owa/', icon: Mail },
  { name: 'المكتبة', url: 'http://wwwn.mutah.edu.jo/ar/library/Home.aspx', icon: BookOpen },
  { name: 'تقديم طلبات الجاهزية للدراسات العليا', url: 'https://hec.mutah.edu.jo/', icon: FileText }
];

const QUICK_LINKS = [
  { name: 'التعليم الالكتروني', url: 'https://www.mutah.edu.jo/Pages/E-Learninig.aspx' },
  { name: 'البريد الالكتروني', url: 'https://outlook.office.com/owa/' },
  { name: 'الابحاث الالكترونية', url: 'https://e-print.mutah.edu.jo/index.php/en/' },
  { name: 'الرسائل الالكترونية', url: 'https://e-thesis.mutah.edu.jo/index.php/en/' }
];

const PHD_PROGRAMS = [
  { faculty: 'كلية الآداب', items: ['الدراسات الأدبية', 'الدراسات اللغوية'] },
  { faculty: 'كلية الأعمال', items: ['الفلسفة في الإدارة الإستراتيجية'] },
  { faculty: 'كلية العلوم التربوية', items: ['الإرشاد النفسي والتربوي', 'الفلسفة في المناهج وأساليب التدريس'] },
  { faculty: 'كلية الحقوق', items: ['القانون'] },
  { faculty: 'كلية الشريعة', items: ['الفلسفة في الفقه وأصوله'] },
  { faculty: 'كلية العلوم الإجتماعية', items: ['التاريخ', 'العلوم السياسيّة', 'علم الجريمة'] }
];

const BOARD = [
  { role: 'عميد كلية الدراسات العليا', name: 'أ.د. عمر خالد جرادات', img: 'https://www.mutah.edu.jo/ar/GraduateStudies/PublishingImages/%D8%AF.%20%D8%B9%D9%85%D8%B1%20%D8%AE%D8%A7%D9%84%D8%AF%20%20%D8%AC%D8%B1%D8%A7%D8%AF%D8%A7%D8%AA.jpg' },
  { role: 'عميد البحث العلمي', name: 'أ.د أسامة مهاوش' },
  { role: 'نائب عميد كلية الدراسات العليا', name: 'أ.د. حسن العمرو', img: 'https://www.mutah.edu.jo/ar/GraduateStudies/PublishingImages/2024-2025/Dr.Hasan.jpeg' },
  { role: 'نائب عميد كلية العلوم التربوية', name: 'أ.د. احمد الطراونة' },
  { role: 'نائب عميد كلية الهندسة', name: 'د. زياد المجالي' },
  { role: 'نائب عميد كلية العلوم الاجتماعية', name: 'أ.د. صبحي العزام' },
  { role: 'نائب عميد كلية الطب', name: 'أ.د. يوسف الصرايرة' },
  { role: 'عميد كلية الأميرة منى للتمريض', name: 'العميد الطبيب خلود غالب المطر' },
  { role: 'نائب عميد كلية الزراعة', name: 'د. معاوية العساسفة' },
  { role: 'نائب عميد كلية الحقوق', name: 'د. احمد الضلاعين' },
  { role: 'نائب عميد كلية الاداب', name: 'د. محمد الملاحمة' },
  { role: 'نائب عميد كلية علوم الرياضة', name: 'د. ابتهال الخوالدة' },
  { role: 'نائب عميد كلية الشريعة', name: 'د. علي الحريرات' },
  { role: 'نائب كلية إدارة الاعمال', name: 'أ.د. علاء الدين أبو الحمص' },
  { role: 'نائب عميد كلية تكنولوجيا المعلومات', name: 'د. عبادة الحباشنه' },
  { role: 'نائب عميد كلية العلوم', name: 'د. محمد الليمون' },
  { role: 'نائب عميد كلية التمريض', name: 'أ.د. أحمد السقرات' },
  { role: 'نائب عميد كلية الصيدلة', name: 'د. حياة البطوش' },
  { role: 'المجتمع المحلي', name: 'الدكتور أكرم إخليف القرالة' },
  { role: 'المجتمع المحلي', name: 'المهندس وسام توفيق المجالي' },
  { role: 'كلية الدراسات العليا / أميناً للسر', name: 'السيدة دينا رعد المجالي' }
];

const STAFF = [
  { role: 'عميد كلية الدراسات العليا', name: 'أ.د. عمر خالد جرادات', ext: '6132', email: 'Jaradat@mutah.edu.jo', img: 'https://www.mutah.edu.jo/ar/GraduateStudies/PublishingImages/2024-2025/%D8%AF.%20%D8%B9%D9%85%D8%B1%20%D8%AE%D8%A7%D9%84%D8%AF%20%20%D8%AC%D8%B1%D8%A7%D8%AF%D8%A7%D8%AA.jpg' },
  { role: 'نائب العميد', name: 'أ.د حسن العمرو', ext: '6130', email: 'hassan.a@mutah.edu.Jo', img: 'https://www.mutah.edu.jo/ar/GraduateStudies/PublishingImages/2024-2025/Dr.Hasan.jpeg' },
  { role: 'مساعد العميد لشؤون البرامج والجودة', name: 'د. نجاة المصاروه', ext: '3613', email: 'Najat.eid@mutah.edu.jo' },
  { role: 'مساعد العميد للشؤون الفنية', name: 'د. مجد الحجوج', ext: '3613', email: 'majdhjoj@mutah.edu.jo', img: 'https://www.mutah.edu.jo/ar/GraduateStudies/PublishingImages/%D9%85%D8%AC%D8%AF%20%D8%A7%D9%84%D8%AD%D8%AC%D9%88%D8%AC.jpg' },
  { role: 'مدير دائرة البعثات', name: 'د. محمد المجالي', ext: '4449' },
  { role: 'مدير البرامج الداخلية', name: 'مدير البرامج الداخلية', ext: '3483' },
  { role: 'مدير البرامج الخارجية', name: 'مدير البرامج الخارجية', ext: '3440' },
  { role: 'رئيس ديوان', name: 'الآنسة رغد الطراونة', ext: '4050' },
  { role: 'رئيس شعبة الرسائل الجامعية', name: 'السيد ضياء الخرشة', ext: '3401' },
  { role: 'سكرتير عميد الكلية', name: 'سكرتير عميد الكلية', ext: '6131' },
  { role: 'رئيس شعبة البرامج الخارجية', name: 'السيد سيف المبيضين', ext: '3090' },
  { role: 'رئيس شعبة متابعة المعلومات', name: 'السيدة دينا المجالي', ext: '3046' },
  { role: 'اداري ديوان', name: 'السيد يحيى الرواشدة' },
  { role: 'موظف ديوان', name: 'السيد أمجد الطراونة' },
  { role: 'موظف ديوان', name: 'السيد نسيم البيايضة' }
];

const FORMER_DEANS = [
  { name: 'أ.د. ذياب البداينة', period: '2/9/2001 - 10/9/2004' },
  { name: 'أ.د. أحمد القطامين', period: '9/9/2004 - 1/9/2006' },
  { name: 'أ.د. حسام الدين المبيضين', period: '31/8/2006 - 20/9/2008' },
  { name: 'أ.د. نضال الحوامدة', period: '21/9/2008 - 31/8/2010' },
  { name: 'أ.د. صالح الكساسبة', period: '1/9/2010 - 3/9/2011' },
  { name: 'أ.د. عبدالفتاح الخليفات', period: '4/9/2011 - 31/8/2013' },
  { name: 'أ.د. علي الضمور', period: '1/9/2013 - 31/8/2015' },
  { name: 'أ.د. محمد المحاسنة', period: '1/9/2015 - 31/8/2017' },
  { name: 'د. هشام المبيضين', period: '1/9/2017 - 31/8/2018' },
  { name: 'أ.د. نضال الحوامدة', period: '1/9/2018 - 30/11/2018' },
  { name: 'أ.د. عمر المعايطة', period: '31/11/2018 - 30/08/2020' },
  { name: 'أ.د مخلد الطراونة', period: '01/09/2020 - 01/09/2023' },
  { name: 'أ.د عمر خالد الجرادات', period: '01/09/2023 - حتى الآن' }
];

const MASTER_MED = [
  { faculty: 'كلية الطب', items: ['إدارة الصحّة العامّة'] },
  { faculty: 'كلية الصيدلة', items: ['العلوم الصيدلانيّة'] },
  { faculty: 'كلية التمريض', items: ['تمريض صحة الأم وحديثي الولادة', 'التمريض السريري'] }
];

const MASTER_SCI = [
  { faculty: 'كلية العلوم', items: ['الرياضيات', 'الفيزياء', 'الكيمياء', 'العلوم الحياتية'] },
  { faculty: 'كلية الهندسة', items: ['الإدارة الهندسيّة', 'هندسة المياه والبيئة', 'الهندسة الكيميائية', 'اتصالات الفضاء', 'الشبكات الذكية في أنظمة القوى الكهربائية', 'الأمن السيبراني والسحب الحاسوبية', 'الهندسة الميكانيكية', 'الهندسة الميكانيكية / الطاقة المتجددة'] },
  { faculty: 'كلية العلوم الزراعية', items: ['الإنتاج النباتي', 'علم الغذاء والتغذية'] },
  { faculty: 'كلية تكنولوجيا المعلومات', items: ['علم الحاسوب'] }
];

const MASTER_HUMA = [
  { faculty: 'كلية الآداب', items: ['الدراسات الأدبية', 'الدراسات اللغوية', 'الأدب الإنجليزي', 'اللغويات التطبيقية'] },
  { faculty: 'كلية الأعمال', items: ['إدارة الأعمال MBA', 'الإدارة العامّة', 'المحاسبة', 'الاقتصاد', 'نظم معلومات إدارية', 'تكنولوجيا الحكومة الإلكترونية', 'التمويل والاستثمار'] },
  { faculty: 'كلية العلوم التربوية', items: ['الإدارة التربوية', 'الإرشاد النفسي والتربوي', 'التربية الخاصة', 'تكنولوجيا التعليم', 'مناهج وأساليب التدريس', 'علم النفس التربوي'] },
  { faculty: 'كلية الحقوق', items: ['الحقوق'] },
  { faculty: 'كلية علوم الرياضة', items: ['التأهيل الرياضي', 'التربية الرياضية'] },
  { faculty: 'كلية الشريعة', items: ['أصول الدين', 'الفقه وأصوله'] },
  { faculty: 'كلية العلوم الإجتماعية', items: ['الآثار', 'العلاقات الدولية', 'علم الجريمة', 'التاريخ'] }
];

function MasterGroups({ groups }: { groups: { faculty: string; items: string[] }[] }) {
  return (
    <div className="flex flex-col gap-8">
      {groups.map((g) => (
        <div key={g.faculty}>
          <div className="bg-[#0f3057] text-white px-6 py-3 rounded-xl font-bold mb-4 inline-block">{g.faculty}</div>
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] text-[#0f3057]">
                  <th className="px-5 py-3 text-right font-bold w-16">#</th>
                  <th className="px-5 py-3 text-right font-bold">البرنامج</th>
                  <th className="px-5 py-3 text-center font-bold w-40">مسار الرسالة</th>
                  <th className="px-5 py-3 text-center font-bold w-40">مسار الشامل</th>
                </tr>
              </thead>
              <tbody>
                {g.items.map((it, i) => (
                  <tr key={it} className="border-t border-gray-100 hover:bg-[#fffbf0] transition-colors">
                    <td className="px-5 py-3.5 text-gray-400 font-mono text-xs">{i + 1}</td>
                    <td className="px-5 py-3.5 font-bold text-[#0f3057]">{it}</td>
                    <td className="px-5 py-3.5 text-center">
                      <span className="inline-flex items-center gap-1.5 text-[#c9a227] text-xs font-bold">
                        <Download size={14} /> الخطة الدراسية
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className="inline-flex items-center gap-1.5 text-[#c9a227] text-xs font-bold">
                        <Download size={14} /> الخطة الدراسية
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

const TOEFL_ROWS = [
  { ielts: '4', ibt: '41-52', cbt: '123-150', paper: '437-473', toeic: '405-600' },
  { ielts: '4.5 - 5', ibt: '53-64', cbt: '153-180', paper: '477-510', toeic: '—' }
];

const FAQ_MASTER = [
  { q: 'ما هي علامة النجاح في المواد الاستدراكية لطلبة الماجستير؟', a: '50%.' },
  { q: 'ما هو الحد الأدنى للمدة التي يقضيها الطالب في الجامعة لاستكمال متطلبات درجة الماجستير؟', a: 'ثلاثة فصول دراسية.' },
  { q: 'ما هو الحد الأعلى للمدة التي يقضيها الطالب في الجامعة لاستكمال متطلبات درجة الماجستير؟', a: 'ثمانية فصول دراسية ما عدا الصيفي.' },
  { q: 'ما هو الحد الأدنى للعبء الدراسي للطالب في الفصل الواحد؟', a: 'ثلاث ساعات معتمدة.' },
  { q: 'هل تعادل مواد درسها الطالب في مرحلة الماجستير في جامعة أردنية أخرى؟', a: 'لعميد كلية الدراسات العليا — وبناءً على توصية مجلس القسم وتنسيب لجنة الكلية — أن يعادل للطالب المنتقل من الجامعات الأردنية بعض المواد التي درسها بما يعادلها من مواد برامج ماجستير الدراسات العليا، على أن لا تتجاوز المواد المعادلة (9) ساعات معتمدة، ولا تقل علامته في أي منها عن (76%) أو ما يعادلها، وأن لا يكون مضى أكثر من خمس سنوات، ويثبت في سجله نتيجة ناجح ولا تدخل في حساب معدله التراكمي.' }
];

const FAQ_PHD = [
  { q: 'ما هي علامة النجاح في المواد الاستدراكية لطلبة الدكتوراه؟', a: '70%.' },
  { q: 'ما هو الحد الأدنى للمدة التي يقضيها الطالب في الجامعة لاستكمال متطلبات درجة الدكتوراه؟', a: 'خمسة فصول دراسية.' },
  { q: 'ما هو الحد الأعلى للمدة التي يقضيها الطالب في الجامعة لاستكمال متطلبات درجة الدكتوراه؟', a: 'اثنا عشر فصلاً دراسياً ما عدا الصيفي.' },
  { q: 'متى يجوز لطالب الدكتوراه التقدم لامتحان الكفاءة المعرفية؟', a: 'بعد انهاء (21) ساعة دراسية معتمدة من خطة التخصص في البرنامج بمعدل تراكمي لا يقل عن (76%).' }
];

const STUDENT_LINKS = [
  { name: 'وزارة التعليم العالي و البحث العلمي', url: 'http://www.mohe.gov.jo/en/Pages/default.aspx' },
  { name: 'نتائج الإمتحان الوطني باللغة الإنجليزية', url: 'http://exam.heac.org.jo/' },
  { name: 'مجلة مؤتة للبحوث و الدراسات — سلسلة العلوم الانسانية و الإجتماعية', url: 'https://www.mutah.edu.jo/darj' },
  { name: 'مجلة مؤتة للبحوث و الدراسات — سلسلة العلوم الطبيعية و التطبيقية', url: 'https://www.mutah.edu.jo/darj/Natural/index.php' },
  { name: 'المجلة الأردنية في القانون و العلوم السياسية', url: 'https://www.mutah.edu.jo/dar/ar/jjlaw.htm' },
  { name: 'المجلة الأردنية للغة العربية و آدابها', url: 'https://www.mutah.edu.jo/dar/ar/jjour.htm' },
  { name: 'للتقدم للمشاريع و الأبحاث العلمية في جامعة مؤتة', url: 'https://www.mutah.edu.jo/dar/ar/jjour.htm' },
  { name: 'محرك بحث مكتبة جامعة مؤتة', url: 'http://ihip.jopuls.org.jo/web/mu' }
];

function ToeflTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#0f3057] text-white" dir="ltr">
            <th className="px-5 py-3.5 font-bold">IELTS</th>
            <th className="px-5 py-3.5 font-bold">TOEFL IBT</th>
            <th className="px-5 py-3.5 font-bold">TOEFL CBT</th>
            <th className="px-5 py-3.5 font-bold">TOEFL PAPER</th>
            <th className="px-5 py-3.5 font-bold">TOEIC</th>
          </tr>
        </thead>
        <tbody dir="ltr">
          {TOEFL_ROWS.map((r, i) => (
            <tr key={i} className={`border-t border-gray-100 text-center ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}>
              <td className="px-5 py-3.5 font-bold text-[#0f3057]">{r.ielts}</td>
              <td className="px-5 py-3.5 text-gray-700">{r.ibt}</td>
              <td className="px-5 py-3.5 text-gray-700">{r.cbt}</td>
              <td className="px-5 py-3.5 text-gray-700">{r.paper}</td>
              <td className="px-5 py-3.5 text-gray-700">{r.toeic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((f, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <div className="flex items-start gap-3 mb-3">
            <span className="w-7 h-7 rounded-full bg-[#0f3057] text-[#c9a227] text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
            <p className="font-bold text-[#0f3057] leading-relaxed">{f.q}</p>
          </div>
          <p className="text-gray-700 text-sm leading-[2] pr-10 text-justify">{f.a}</p>
        </div>
      ))}
    </div>
  );
}

const SCHOL_COMMITTEE = [
  { role: 'رئيس المجلس', name: 'الاستاذ الدكتور رئيس الجامعة' },
  { role: 'عضواً', name: 'الأستاذ الدكتور نائب الرئيس للشؤون الإدارية' },
  { role: 'عضواً', name: 'الأستاذ الدكتور نائب الرئيس لشؤون الكليات العلمية' },
  { role: 'عضواً', name: 'نائب الرئيس للتعليم الالكتروني والجودة' },
  { role: 'عضواً', name: 'نائب الرئيس للشؤون العسكرية' },
  { role: 'عضواً', name: 'الاستاذ الدكتور عميد كلية الدراسات العليا' },
  { role: 'عضواً', name: 'عميد الكلية المعني' },
  { role: 'أمين السر', name: 'السيد محمد المجالي — كلية الدراسات العليا' }
];

const GRAD_FORMS = [
  { name: 'نموذج تقرير مندوب دراسات', type: 'DOC' },
  { name: 'إنتقال تخصص', type: 'DOC' },
  { name: 'إنتقال جامعة', type: 'DOC' },
  { name: 'نموذج تسليم', type: 'DOC' },
  { name: 'انسحاب', type: 'DOC' },
  { name: 'تقييم عمل طلبة الدراسات العليا', type: 'DOC' },
  { name: 'كشف التشغيل جديد', type: 'DOC' },
  { name: 'نموذج تقرير دوري', type: 'DOC' },
  { name: 'نموذج تعهد', type: 'DOC' },
  { name: 'نموذج تقرير صلاحية', type: 'DOC' },
  { name: 'نموذج تقرير صلاحية عضو خارجي', type: 'DOC' },
  { name: 'نموذج جاهزية الطالب للتقدم للمناقشة', type: 'DOC' },
  { name: 'نموذج جاهزية شامل', type: 'DOC' },
  { name: 'نموذج طلب تشغيل', type: 'DOC' },
  { name: 'نموذج غير مكتمل', type: 'DOC' },
  { name: 'نموذج نتائج الإمتحان شامل', type: 'DOC' },
  { name: 'نموذج نتيجة شامل', type: 'DOC' },
  { name: 'نموذج مشروع خطة', type: 'DOC' },
  { name: 'دليل كتابة الرسائل الجامعية في جامعة مؤتة', type: 'PDF' }
];

function SectionHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-[#0f3057] relative inline-block">
        {title}
        <div className="absolute -bottom-3 right-0 w-1/3 h-1 bg-[#c9a227] rounded-full"></div>
      </h2>
      {sub && <p className="text-gray-500 text-lg mt-6">{sub}</p>}
    </div>
  );
}

function LinkRow({ name, url, note, to }: { name: string; url?: string; note?: string; to?: string }) {
  const inner = (
    <>
      <div className="w-10 h-10 rounded-xl bg-[#0f3057]/5 flex items-center justify-center shrink-0">
        <FileText size={17} className="text-[#0f3057]" />
      </div>
      <span className="font-bold text-[#0f3057] text-[15px] flex-1 leading-snug">{name}</span>
      {note && <span className="text-[11px] font-bold text-gray-400 uppercase shrink-0">{note}</span>}
      {to ? <ArrowLeft size={15} className="text-[#c9a227] shrink-0" /> : <ExternalLink size={15} className="text-[#c9a227] shrink-0" />}
    </>
  );
  const cls = "flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors";
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return url
    ? <a href={url} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
    : <div className={cls}>{inner}</div>;
}

function NotPublished({ label, url }: { label?: string; url?: string }) {
  return (
    <div className="bg-[#F8FAFC] border border-dashed border-gray-200 rounded-2xl p-8">
      <div className="flex items-start gap-3 mb-4">
        <Info size={18} className="text-gray-400 shrink-0 mt-0.5" />
        <p className="text-gray-600 leading-relaxed">
          {label || ''}
        </p>
      </div>
      {url && (
        <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#0f3057] font-bold text-sm hover:text-[#c9a227] transition-colors">
          <ExternalLink size={15} className="text-[#c9a227]" />
          الصفحة على موقع الجامعة
        </a>
      )}
    </div>
  );
}

export function GraduateStudies() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedTab, setExpandedTab] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useTabRoute('home');

  const getSectionTitle = (id: string, links: any[]): string => {
    for (const link of links) {
      if (link.id === id) return link.name;
      if (link.children) {
        const child = link.children.find((c: any) => c.id === id);
        if (child) return child.name;
      }
    }
    return 'المحتوى';
  };

  return (
    <div
      className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] rtl bg-[#F5F7F9]"
      dir="rtl"
      style={{ "--sidebar-offset": sidebarOpen ? "320px" : "0px" } as React.CSSProperties}
    >
      <WireframeHeader />

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed z-[45] flex items-center justify-center bg-[#c9a227] hover:bg-[#b08d20] text-[#0f3057] transition-all shadow-lg"
        style={{
          top: "100px",
          right: sidebarOpen ? "320px" : "0",
          width: "40px",
          height: "40px",
          borderRadius: "10px 0 0 10px",
          transition: "right 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {sidebarOpen ? <ChevronRight size={24} /> : <Menu size={24} />}
      </button>

      <div
        className="fixed top-0 bottom-0 right-0 z-[52] overflow-y-auto"
        style={{
          width: "320px",
          backgroundColor: "#0f3057",
          boxShadow: "-4px 0 24px rgba(15,48,87,0.15)",
          borderLeft: "1px solid rgba(255,255,255,0.05)",
          transform: sidebarOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="p-6 pt-10 pb-20">
          <div className="mb-8 px-4 flex items-center gap-4">
            <h2 className="text-lg font-extrabold text-white leading-snug">
              كلية الدراسات العليا
            </h2>
          </div>
          <nav className="flex flex-col gap-1.5">
            {GRADUATE_LINKS.map((link: any) => {
              const hasChildren = !!link.children;
              const isExpanded = expandedTab === link.id;
              const isChildActive = hasChildren
                ? link.children.some((c: any) => c.id === activeItem)
                : activeItem === link.id;

              return (
                <div key={link.id} className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      if (hasChildren) {
                        setExpandedTab(isExpanded ? null : link.id);
                      } else {
                        setActiveItem(link.id);
                      }
                    }}
                    className="flex items-center justify-between w-full px-4 py-3.5 transition-all text-right"
                    style={{
                      borderRadius: "12px",
                      background: isChildActive && !isExpanded ? "rgba(201,162,39,0.15)" : "transparent",
                      color: isChildActive || isExpanded ? "#ffffff" : "rgba(255,255,255,0.7)",
                      fontWeight: isChildActive || isExpanded ? 700 : 500,
                      border: "1px solid",
                      borderColor: isChildActive && !isExpanded ? "rgba(201,162,39,0.4)" : "transparent",
                    }}
                  >
                    <span style={{ fontSize: "14.5px" }}>{link.name}</span>
                    {hasChildren ? (
                      <ChevronDown
                        size={16}
                        style={{
                          color: isChildActive || isExpanded ? "#c9a227" : "rgba(255,255,255,0.4)",
                          transform: isExpanded ? "rotate(180deg)" : "rotate(90deg)",
                          transition: "transform 0.2s",
                        }}
                      />
                    ) : (
                      isChildActive && <ChevronLeft size={16} style={{ color: "#c9a227" }} />
                    )}
                  </button>

                  {hasChildren && isExpanded && (
                    <div className="flex flex-col gap-1 pr-4 border-r-2 border-white/10 mr-2 py-1">
                      {link.children.map((child: any) => {
                        const isActive = activeItem === child.id;
                        return (
                          <button
                            key={child.id}
                            onClick={() => setActiveItem(child.id)}
                            className="flex items-center justify-between w-full px-4 py-2.5 transition-all text-right rounded-lg"
                            style={{
                              background: isActive ? "rgba(201,162,39,0.15)" : "transparent",
                              color: isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
                              fontWeight: isActive ? 700 : 500,
                            }}
                          >
                            <span style={{ fontSize: "13.5px" }}>{child.name}</span>
                            {isActive && <ChevronLeft size={14} style={{ color: "#c9a227" }} />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      <div
        className="flex-1 flex flex-col transition-all min-w-0"
        style={{
          marginRight: sidebarOpen ? "320px" : "0",
          transition: "margin-right 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="relative overflow-hidden pt-[150px] pb-[80px] mb-[60px]">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#0f3057]/85 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f3057] to-transparent z-10 opacity-70" />
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Graduate Studies"
              className="w-full h-full object-cover mix-blend-overlay"
            />
          </div>
          <div className="mx-auto px-8 relative z-20 flex flex-col items-center justify-center text-center h-full max-w-[1440px]">
            <Breadcrumbs align="center" className="mb-6" items={[{ label: 'كلية الدراسات العليا', onClick: () => setActiveItem('home') }, ...navTrail(GRADUATE_LINKS as any, activeItem).filter((n: any) => n.id !== 'home').map((n: any) => ({ label: n.name })), ...(String(activeItem).startsWith('news-') ? [{ label: 'أخبار وأحداث' }, { label: (NEWS.find((n: any) => 'news-' + n.id === activeItem) || {} as any).title }] : [])]} />
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              كلية الدراسات العليا
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              جامعة مؤته :: نحو بيئة تعليمية أفضل
            </p>
          </div>
        </div>

        <div className="mx-auto px-8 w-full mb-24 relative max-w-[1440px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a227]/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0f3057]/5 rounded-full blur-3xl -z-10" />

          <div className="w-full min-w-0 relative overflow-hidden bg-white rounded-3xl p-10 lg:p-14 shadow-[0_20px_40px_-15px_rgba(15,48,87,0.05),_0_0_0_1px_rgba(15,48,87,0.03)] min-h-[600px]">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#c9a227] to-transparent opacity-40" />

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

              {activeItem === 'home' && (
                <div className="space-y-16">
                  {/* أخبار وأحداث */}
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
                        <Info className="w-6 h-6 text-[#0f3057]" />
                      </div>
                      <h2 className="text-3xl font-bold text-[#0f3057]">أخبار وأحداث</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {NEWS.map((news, i) => (
                        <NewsCard key={i} onClick={() => setActiveItem('news-' + news.id)} title={news.title} date={news.date} img={news.img} />
                      ))}
                    </div>
                  </div>

                  {/* إعلانات */}
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-[#c9a227]/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-[#c9a227]" />
                      </div>
                      <h2 className="text-3xl font-bold text-[#0f3057]">إعلانات</h2>
                    </div>
                    <div className="flex flex-col gap-3">
                      {ANNOUNCEMENTS.map((a, i) => (
                        <div key={i} onClick={() => setActiveItem('ann-' + a.id)} className="cursor-pointer flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
                          <span className="text-xs font-bold text-[#c9a227] shrink-0" dir="ltr">{a.date}</span>
                          <p className="font-bold text-[#0f3057] text-[15px] flex-1 leading-snug">{a.title}</p>
                          <ChevronLeft size={16} className="text-[#0f3057] shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* معلومات تهمك */}
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-[#0f3057]" />
                      </div>
                      <h2 className="text-3xl font-bold text-[#0f3057]">معلومات تهمك</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {USEFUL.map((u) => {
                        const Icon = u.icon;
                        return (
                          <a key={u.name} href={u.url} target="_blank" rel="noreferrer"
                             className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-[#c9a227] transition-all flex flex-col items-center text-center gap-3 group">
                            <div className="w-14 h-14 rounded-full bg-[#0f3057] flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Icon className="w-6 h-6 text-[#c9a227]" />
                            </div>
                            <span className="font-bold text-[#0f3057] text-sm leading-snug">{u.name}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* برامج الكلية */}
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-[#0f3057]" />
                      </div>
                      <h2 className="text-3xl font-bold text-[#0f3057]">برامج الكلية</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { id: 'prog-phd', name: 'برامج الدكتوراة', icon: GraduationCap, dark: true },
                        { id: 'prog-master', name: 'برامج الماجستير', icon: Users, dark: false },
                        { id: 'prog-shared', name: 'البرامج المشتركة ماجستير', icon: Building, dark: true },
                        { id: 'prog-teachers', name: 'الدبلوم العالي', icon: BookOpen, dark: false }
                      ].map((p) => {
                        const Icon = p.icon;
                        return (
                          <button key={p.id} onClick={() => setActiveItem(p.id)}
                                  className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group text-right">
                            <div className={`h-32 relative p-4 flex items-end ${p.dark ? 'bg-gradient-to-br from-[#0f3057] to-[#1a4a85]' : 'bg-gradient-to-br from-[#c9a227] to-[#e0b52c]'}`}>
                              <Icon className="absolute top-4 left-4 text-white/20 w-16 h-16 group-hover:scale-110 transition-transform" />
                              <h3 className="text-xl font-bold text-white relative z-10 leading-snug">{p.name}</h3>
                            </div>
                            <div className="p-4 flex items-center justify-between font-bold text-[#0f3057] group-hover:text-[#c9a227] transition-colors">
                              التفاصيل <ChevronLeft size={16} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* كلمة العميد */}
                  <div className="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100 flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0 bg-gray-100">
                      <img src="https://www.mutah.edu.jo/ar/GraduateStudies/PublishingImages/%D8%AF.%20%D8%B9%D9%85%D8%B1%20%D8%AE%D8%A7%D9%84%D8%AF%20%20%D8%AC%D8%B1%D8%A7%D8%AF%D8%A7%D8%AA.jpg" alt="عميد الكلية" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-center md:text-right">
                      <div className="inline-flex items-center gap-2 text-[#c9a227] font-bold mb-3 bg-[#c9a227]/10 px-4 py-1.5 rounded-full text-sm">
                        كلمة العميد
                      </div>
                      <h3 className="text-2xl font-bold text-[#0f3057] mb-2">أ. د. عمر خالد جرادات</h3>
                      <p className="text-[#c9a227] font-bold text-sm mb-4">عميد كلية الدراسات العليا</p>
                      <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                        يسرني أنْ أرحِّبَ بكم في موقع كلية الدراسات العليا بجامعةِ مؤته، الذي أُنشئَ ليكونَ مصدرًا
                        موثوقًا للمعلومات المُفَصَّلة حولَ برامج الدراسات العُليا المتوفِّرة في جامعَتِكم
                        «جامعة السيف والقلم»، والمهامِّ الموكولةِ إلى الكليّةِ والخدماتِ التي تقدِّمُها.
                      </p>
                      <Button onClick={() => setActiveItem('about-dean')} variant="outline" className="border-[#0f3057] text-[#0f3057] hover:bg-[#0f3057] hover:text-white transition">
                        اقرأ المزيد
                      </Button>
                    </div>
                  </div>

                  {/* روابط سريعة */}
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-[#c9a227]/10 flex items-center justify-center">
                        <ExternalLink className="w-6 h-6 text-[#c9a227]" />
                      </div>
                      <h2 className="text-3xl font-bold text-[#0f3057]">روابط سريعة</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {QUICK_LINKS.map((q) => <LinkRow key={q.name} name={q.name} url={q.url} />)}
                    </div>
                  </div>
                </div>
              )}

              {/* عن الكلية */}
              {activeItem === 'about-genesis' && (
                <div className="space-y-8">
                  <SectionHead title="نشأة الكلية" />
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm leading-relaxed text-gray-700 text-lg">
                    <p className="mb-4 text-justify">أنشئت عمادة الدراسات العليا بجامعة مؤتة عام 1990 وهي احدى العمادات المساندة في الجامعة وقد انيط بها الاشراف على برامج الدراسات العليا والابتعاث بالتنسيق مع كليات الجامعة وأقسامها الاكاديمية انطلاقاً من اهتمام الجامعة ببرامج الدراسات العليا وإتاحة الفرصة للطلاب الراغبين بالالتحاق في برامج الماجستير والدكتوراه لاستكمال دراساتهم.</p>
                    <p className="mb-4 font-bold text-[#c9a227]">وفي عام 2014 تم تحويل عمادة الدراسات العليا لتصبح كلية الدراسات العليا.</p>
                    <p className="mb-4 text-justify">تحرص الكلية على تفعيل دورها في تقديم خدماتها المتميزة للمجتمع كما وتسعى الى المواكبة للمستويات العالمية من خلال تقديم كل الدعم لكافة برامجها وانشطتها ويؤكد ذلك نسبة الزيادة المطردة في برامج الدراسات العليا وما يقابلها من زيادة اعداد الطلبة من مختلف الجنسيات الملتحقين بالبرامج المختلفة.</p>
                    <p className="mb-4 text-justify">كما تعنى كلية الدراسات العليا بوضع القواعد التنظيمية والإجراءات التنفيذية والمؤهلة تأهيلاً علمياً ومهنياً في مختلف المجالات لتلبية احتياجات الجامعة من الهيئات التدريسية من خلال ابتعاث الطلبة المتفوقين الى الجامعات العريقة في العالم.</p>
                    <p className="text-justify">وتسعى الى تطوير كافة أجزاء منظومة الدراسات العليا اكاديمياً وادرياً من خلال الاشراف على برنامج الدراسات العليا في الجامعة بالتنسيق والتعاون مع الكليات واستحداث برامج للدراسات العليا وتطويرها بما يخدم اهداف الجامعة وتلبية احتياجات مؤسسات المجتمع المحلي.</p>
                  </div>
                </div>
              )}

              {activeItem === 'about-strategy' && (
                <div className="space-y-8">
                  <SectionHead title="استراتيجية الكلية" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
                      <h3 className="text-xl font-bold text-[#c9a227] mb-4">الرؤية</h3>
                      <p className="text-gray-700 text-lg text-justify">تتمثل رؤية كلية الدراسات العليا في جامعة مؤتة بأن تكون حاضنة للريادة والتميز عند طلبة الجامعة للوصول بهم الى مستوى عالٍ من المنافسة والابداع في تخصصاتهم على المستويين المحلي والعالمي. وأن نكون رواداً في قطاع التعليم العالي، وان نجّد بالسعي وراء المعرفة والاكتشاف والقدرة على التفكير بعقلانية وموضوعية من خلال تقديم البرامج الاكاديمية عالية الجودة وتعزيز الجهود البحثية الرامية للاكتشاف والابداع.</p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
                      <h3 className="text-xl font-bold text-[#c9a227] mb-4">الرسالة</h3>
                      <p className="text-gray-700 text-lg text-justify">السعي للتميز في الدراسات العليا من خلال برامج دراسات عليا ذات جودة عالية تواكب متطلبات التنمية الشاملة والتطورات العالمية ضمن اعلى معايير الجودة والكفاءة والتميز.</p>
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold text-[#c9a227] mb-6">الأهداف</h3>
                    <ul className="space-y-4 text-gray-700 text-lg list-disc list-inside px-4">
                      <li>التوسع والارتقاء بمستوى برامج الدراسات العليا وضمان جودة مخرجاتها.</li>
                      <li>تحسين مستوى اطروحات الدكتوراه ورسائل الماجستير وتوجيهها نحو قضايا المجتمع واحتياجات التنمية الوطنية.</li>
                      <li>تعزيز التعاون وإقامة الشراكات الاستراتيجية على الصعيدين المحلي والعالمي.</li>
                      <li>تحديد حاجة كليات الجامعة من البعثات الدراسية في التخصصات غير المتوفرة في السوق المحلي وتعزز من مكانتها التنافسية محلياً وعربياً وعالمياً ومتابعة المبتعثين.</li>
                      <li>تنظيم ومتابعة برامج الدراسات العليا بالتنسيق مع مختلف الأقسام الاكاديمية في الجامعة والتأكد من تطبيق اللوائح المنظمة للدراسات العليا.</li>
                      <li>مراجعة وتطوير الاجراءات والتعليمات المتعلقة بطلبة الدراسات العليا والايفاد.</li>
                      <li>التسويق لبرامج الدراسات العليا محلياً واقليمياً وعالمياً.</li>
                      <li>الارتقاء بتصنيف الجامعة محلياً وعربياً وعالمياً.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeItem === 'about-dean' && (
                <div className="space-y-8">
                  <SectionHead title="كلمة العميد" />
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-48 h-48 rounded-2xl overflow-hidden shrink-0 border-4 border-gray-50 shadow-md bg-gray-100">
                      <img src="https://www.mutah.edu.jo/ar/GraduateStudies/PublishingImages/%D8%AF.%20%D8%B9%D9%85%D8%B1%20%D8%AE%D8%A7%D9%84%D8%AF%20%20%D8%AC%D8%B1%D8%A7%D8%AF%D8%A7%D8%AA.jpg" alt="العميد" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#0f3057] mb-2">أ. د. عمر خالد جرادات</h3>
                      <p className="text-[#c9a227] font-bold mb-6">عميد كلية الدراسات العليا</p>
                      <div className="text-gray-700 leading-relaxed text-lg text-justify space-y-4">
                        <p>يسرني أنْ أرحِّبَ بكم في موقع كلية الدراسات العليا بجامعةِ مؤته، الذي أُنشئَ ليكونَ مصدرًا موثوقًا للمعلومات المُفَصَّلة حولَ برامج الدراسات العُليا المتوفِّرة في جامعَتِكم "جامعة السيف والقلم"، والمهامِّ الموكولةِ إلى الكليّةِ والخدماتِ التي تقدِّمُها.</p>
                        <p>وفي ضوء التوجهات الرامية إلى تطوير الدراسات العليا في جامعة مؤته قامت عمادة الكلية برفع شعار التحول الالكتروني وحوسبة جميع المهام والاجراءات الادارية المرافقة لرحلة طالب الدراسات في جامعة مؤته كما وقامت بوضع استراتيجية شاملة لبرامج الدراسات العليا وفق معايير الجودة العالمية لتواكب مستوى نظيراتها من الجامعات المحلية والاقليمية والعالمية، وخطة عمل تنفيذية هادفة لتحقيق احتياجات المجتمع المحلي والاقليمي الحالية والمستقبلية.</p>
                        <p>وايمانا بالدور المناط بها تسعى كلية الدراسات العليا لتحقيق شراكة حقيقة مع كافة الجهات المعنية داخل الجامعة من اجل انجاح دور الجامعة في تطوير التعليم العالي والرقي بمستواه للوصول الى الاهداف السامية من تحول الى مجتمع معرفي مؤهل يقود مسيرة البحث العلمي ويرفد عجلة التطور والتنمية في الاردن.</p>
                        <p>لقد قامت كلية الدراسات العليا بتطوير موقعها من اجل تقديم المعلومة الكاملة لطلبتها والاجابة على جميع التساؤلات الخاصة ببرامج الدراسات وتعليماتها وبناءا على ذلك فقد عزمت الكلية على اعتماد النظام الالكتروني المتكامل في جميع معاملاتها مساهمة منها في تحسين الخدمات المقدمة لكافة عناصر العملية الاكاديمية وعلى درجة عالية من الموثوقية في كافة الاجراءات الادارية التابعة لسير العملية الاكاديمية.</p>
                        <p>وفي الختام اشكر جميع كوادر الكلية الادارية والتي تعمل بروح الفريق كلا حسب المهام الموكولة اليه للوصول للاهداف المنشودة مؤطرة بالرؤية الخاصة بالجامعة. متمنيا للجميع دوام التوفيق والسداد ومرحبين بمقترحاتكم وآرائكم.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* برامج الدكتوراة */}
              {activeItem === 'prog-phd' && (
                <div className="space-y-8">
                  <SectionHead title="برامج الدكتوراه" sub="الخطط الدراسية لبرامج الدكتوراه موزعة حسب الكليات" />
                  <div className="flex flex-col gap-8">
                    {PHD_PROGRAMS.map((g) => (
                      <div key={g.faculty}>
                        <div className="bg-[#0f3057] text-white px-6 py-3 rounded-xl font-bold mb-4 inline-block">{g.faculty}</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {g.items.map((it, idx) => (
                            <div key={it} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
                              <span className="w-7 h-7 rounded-full bg-[#0f3057] text-[#c9a227] text-xs font-bold flex items-center justify-center shrink-0">{idx + 1}</span>
                              <span className="text-sm font-bold text-[#0f3057] flex-1 leading-snug">{it}</span>
                              <Download size={15} className="text-[#c9a227] shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* برامج الماجستير */}
              {activeItem === 'prog-master' && (
                <div className="space-y-8">
                  <SectionHead title="برامج الماجستير" sub="برامج الماجستير موزعة على ثلاث مجموعات من الكليات" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { id: 'master-med', name: 'الكليات الطبية', icon: '🩺', count: '4 برامج' },
                      { id: 'master-sci', name: 'الكليات العلمية', icon: '🔬', count: '15 برنامجاً' },
                      { id: 'master-huma', name: 'الكليات الإنسانية', icon: '📚', count: '26 برنامجاً' }
                    ].map((c) => (
                      <button key={c.id} onClick={() => setActiveItem(c.id)}
                         className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md hover:border-[#c9a227]/50 transition-all text-center group">
                        <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform">{c.icon}</span>
                        <h3 className="font-bold text-xl text-[#0f3057] mb-1">{c.name}</h3>
                        <p className="text-sm text-gray-500 mb-3">{c.count}</p>
                        <span className="inline-flex items-center gap-1.5 text-[#c9a227] text-sm font-bold">
                          تفاصيل البرامج <ChevronLeft size={14} />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeItem === 'master-med' && (
                <div className="space-y-8">
                  <button onClick={() => setActiveItem('prog-master')} className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#c9a227] transition-colors">
                    <ChevronRight size={14} /> برامج الماجستير
                  </button>
                  <SectionHead title="الكليات الطبية" sub="برامج الماجستير في الكليات الطبية" />
                  <MasterGroups groups={MASTER_MED} />
                </div>
              )}

              {activeItem === 'master-sci' && (
                <div className="space-y-8">
                  <button onClick={() => setActiveItem('prog-master')} className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#c9a227] transition-colors">
                    <ChevronRight size={14} /> برامج الماجستير
                  </button>
                  <SectionHead title="الكليات العلمية" sub="برامج الماجستير في الكليات العلمية" />
                  <MasterGroups groups={MASTER_SCI} />
                </div>
              )}

              {activeItem === 'master-huma' && (
                <div className="space-y-8">
                  <button onClick={() => setActiveItem('prog-master')} className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#c9a227] transition-colors">
                    <ChevronRight size={14} /> برامج الماجستير
                  </button>
                  <SectionHead title="الكليات الانسانية" sub="برامج الماجستير في الكليات الإنسانية" />
                  <MasterGroups groups={MASTER_HUMA} />
                </div>
              )}

              {activeItem === 'prog-shared' && (
                <div className="space-y-8">
                  <SectionHead title="برامج دراسات عليا تشترك بها جامعة مؤتة مع جامعات أخرى" />
                  <p className="text-gray-700 text-lg leading-[2.1] text-justify">
                    أنشئ برنامج الدكتوراة في مناهج وأساليب التدريس بالإشتراك والتعاون مع جامعة الحسين،
                    وكذلك برنامج الماجستير في أمن وخدمات السحب الحاسوبية أنشئ بالتعاون مع جامعة الشرق الأوسط.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
                      <div className="w-12 h-12 rounded-xl bg-[#0f3057] flex items-center justify-center mb-5">
                        <GraduationCap className="w-6 h-6 text-[#c9a227]" />
                      </div>
                      <p className="text-xs font-bold text-[#c9a227] mb-2">دكتوراة</p>
                      <h3 className="font-bold text-[#0f3057] text-lg mb-3 leading-snug">مناهج وأساليب التدريس</h3>
                      <p className="text-sm text-gray-600">بالإشتراك والتعاون مع جامعة الحسين</p>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
                      <div className="w-12 h-12 rounded-xl bg-[#c9a227] flex items-center justify-center mb-5">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs font-bold text-[#c9a227] mb-2">ماجستير</p>
                      <h3 className="font-bold text-[#0f3057] text-lg mb-3 leading-snug">أمن وخدمات السحب الحاسوبية</h3>
                      <p className="text-sm text-gray-600">بالتعاون مع جامعة الشرق الأوسط</p>
                    </div>
                  </div>
                </div>
              )}

              {activeItem === 'prog-nursing' && (
                <div className="space-y-8">
                  <SectionHead title="برنامج الدبلوم العالي في التمريض \ القبالة" sub="جامعة مؤتة \ كلية الأميرة منى للتمريض" />

                  <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
                    <p className="text-gray-700 leading-[2.1] text-justify mb-4">
                      يستهدف البرنامج المدنيين والعسكريين من الاناث العاملين في مختلف القطاعات الحكومية
                      والخاصة او الذين لم يجدوا فرص عمل، ويهدف إلى تزويد الطلبة بالمعلومات والمهارات
                      اللازمة لتقديم أعلى مستويات الرعاية التمريضية في القبالة التخصصية.
                    </p>
                    <p className="text-gray-700 leading-[2.1] text-justify">
                      الخطة الدراسية للدبلوم العالي في التمريض/ القبالة في كلية الأميرة منى للتمريض تمكن
                      الطالبة من الحصول على الدبلوم العالي في التمريض/ القبالة من خلال دراسة ما مجموعه
                      (30) ساعة معتمدة موزعة على سنة دراسية / 3 فصول، وبعد اجتيازها بنجاح يتقدم الطالب
                      لامتحان الشامل.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                      <h3 className="text-lg font-bold text-[#c9a227] mb-4">رسالة البرنامج</h3>
                      <p className="text-gray-700 leading-[2] text-justify">
                        الهدف من هذا البرنامج هو تأهيل طالبات القبالة نظرياً وعملياً لتقديم رعاية عالية
                        الجودة في مختلف المستشفيات والمراكز الصحية في المملكة الاردنية الهاشمية.
                      </p>
                    </div>
                    <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                      <h3 className="text-lg font-bold text-[#c9a227] mb-4">فلسفة البرنامج</h3>
                      <p className="text-gray-700 leading-[2] text-justify">
                        فلسفة كلية الأميرة منى للتمريض تتوافق مع فلسفة جامعة مؤتة في اعدادها طالبات
                        القبالة للحصول على المعرفة المهنية وتطوير الكفاءة السريرية، لتقديم رعاية عالية
                        الجودة للنساء واطفالهن.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
                    <h3 className="text-lg font-bold text-[#0f3057] mb-4">مبررات طرح البرنامج</h3>
                    <p className="text-gray-700 leading-[2.1] text-justify mb-4">
                      نقص القابلات في الاردن هو معضلة رئيسية في تقديم الرعاية الشاملة للنساء؛ تشكل
                      القابلات ما نسبته 4.3% فقط من مزودي الرعاية الصحية في الأردن في كلا القطاعين العام
                      والخاص، حيث نسبة القابلات متدنية بالمقارنة مع دول اخرى حول العالم.
                    </p>
                    <p className="text-gray-700 leading-[2.1] text-justify">
                      في الآونة الاخيرة دعا مجلس التمريض الاردني الى اصلاح تعليم القبالة في الاردن،
                      وتركزت هذه الدعوات على تحديث تعليم القبالة والاعتماد على خريجي الجامعات بدلاً من
                      خريجي الكليات.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
                    <h3 className="text-lg font-bold text-[#0f3057] mb-2">أهداف البرنامج</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      تتمثل الحصيلة الكلية لهذا البرنامج في تزويد القابلات بالمعرفة والكفاءة العملية
                      لتوفير الرعاية الشاملة والمبنية على الادلة العلمية للنساء وعائلاتهن، من خلال:
                    </p>
                    <div className="flex flex-col gap-3">
                      {[
                        'اكتساب المعرفة النظرية السليمة والمهارات العملية في جميع مجالات ممارسة القبالة من اجل العمل كقابلات مؤهلات وبشكل مستقل وآمن.',
                        'المشاركة الفاعلة في تقييم وتخطيط وتنفيذ وتقييم رعاية النساء ابتداءً من فترة ما قبل الحمل والحمل والمخاض والولادة وحتى ستة اسابيع ما بعد الولادة، بما في ذلك رعاية الرضيع ورعاية السيدات خلال سن الأمل ورعاية النساء اللاتي يتعرضن للعنف والإيذاء الجسدي والجنسي.',
                        'القدرة على الادارة والعمل بفاعلية في المواقف الطارئة.',
                        'تحديد مسؤوليات اعضاء الفريق الصحي في تنفيذ الممارسات الآمنة.',
                        'اعطاء الحكم السريري السليم والمهارات السريرية الفعالة.',
                        'فهم القضايا الاخلاقية والقانونية التي قد تواجه القابلات.',
                        'فهم مبادئ البحث العلمي واجراء الانشطة البحثية لتطوير مهنة القبالة.',
                        'وضع خطة التثقيف الصحي للمرضى وعائلاتهم حسب احتياجاتهم.',
                        'إظهار المعرفة والمهارات المتعلقة باستخدام وسائل تنظيم الأسرة.',
                        'تقديم خدمات الصحة الإنجابية للمراهقين.',
                        'القدرة على تطبيق المعرفة المتعلقة بالتدريس والقيادة والإدارة في نشاطه المهني، وامتلاك الاستعداد للتعلم الذاتي مدى الحياة والتحسين المهني.'
                      ].map((g, i) => (
                        <div key={i} className="flex items-start gap-3 bg-[#F8FAFC] border border-gray-100 rounded-xl px-5 py-4">
                          <span className="w-6 h-6 rounded-full bg-[#0f3057] text-[#c9a227] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                          <p className="text-sm text-gray-700 leading-relaxed">{g}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
                      <h3 className="text-lg font-bold text-[#0f3057] mb-5">شروط القبول ومعلومات الدراسة</h3>
                      <div className="flex flex-col gap-4 text-sm">
                        <div>
                          <p className="font-bold text-[#c9a227] mb-1">شروط القبول</p>
                          <p className="text-gray-700 leading-relaxed">حسب تعليمات جامعة مؤتة المتعلقة بالدبلوم العالي: أن يكون حاصلاً على درجة البكالوريوس في التمريض أو القبالة أو ما يعادلها من الجامعات والكليات المعترف بها الجامعة.</p>
                        </div>
                        <div>
                          <p className="font-bold text-[#c9a227] mb-1">مدة الدراسة</p>
                          <p className="text-gray-700">سنة دراسية واحدة.</p>
                        </div>
                        <div>
                          <p className="font-bold text-[#c9a227] mb-1">عدد الساعات المعتمدة</p>
                          <p className="text-gray-700 leading-relaxed">ثلاثون ساعة معتمدة تقسم إلى ساعات نظرية وساعات عملية، حيث أن الساعة النظرية الواحدة تعادل 16 ساعة صفية، والساعة العملية تعادل 5 ساعات تطبيق عملي.</p>
                        </div>
                        <div>
                          <p className="font-bold text-[#c9a227] mb-1">لغة التدريس</p>
                          <p className="text-gray-700">اللغة الإنجليزية.</p>
                        </div>
                        <div>
                          <p className="font-bold text-[#c9a227] mb-1">مكان الدراسة</p>
                          <p className="text-gray-700 leading-relaxed">التعليم النظري: كلية الأميرة منى للتمريض. التدريب العملي: أقسام التوليد والنسائية / مستشفيات الخدمات الطبية الملكية. تعليمات النجاح والرسوب: حسب تعليمات جامعة مؤتة.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                      <h3 className="text-lg font-bold text-[#0f3057] mb-5">الوثائق المطلوبة</h3>
                      <div className="flex flex-col gap-3">
                        {[
                          'صورة مصدقة عن الشهادة الجامعية وكشف العلامات.',
                          'صورة شخصية.',
                          'صورة مصدقة عن شهادة الميلاد.',
                          'صورة مصدقة عن شهادة الثانوية العامة.'
                        ].map((d, i) => (
                          <div key={i} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl px-5 py-4">
                            <span className="w-6 h-6 rounded-full bg-[#c9a227]/20 text-[#c9a227] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                            <p className="text-sm text-gray-700 leading-relaxed">{d}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeItem === 'prog-teachers' && (
                <div className="space-y-8">
                  <SectionHead title="الدبلوم العالي لإعداد المعلمين" />
                  <div className="bg-[#F8FAFC] border border-dashed border-gray-200 rounded-3xl p-12 text-center">
                    <Info size={28} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-xl font-bold text-[#0f3057]">تحت الانشاء</p>
                  </div>
                </div>
              )}

              {/* الرسوم الجامعية */}
              {activeItem === 'stu-fees' && (
                <div className="space-y-8">
                  <SectionHead title="الرسوم الجامعية" />
                  <div className="flex flex-col gap-3">
                    <LinkRow name="الأستفسار عن الرسوم المستحقة" url="http://app.mutah.edu.jo:7777/bankfees/" />
                    <LinkRow name="تسديد الرسوم الإلكترونية المباشر" url="http://app.mutah.edu.jo:7777/bankfees/" />
                    <LinkRow name="جدول الرسوم الجامعية" to="/university-fees" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0f3057] mb-4">جداول الرسوم بحسب البرنامج</h3>
                    <div className="flex flex-col gap-3">
                      <LinkRow name="الرسوم الجامعية لبرنامج الماجستير لشعب مقر جامعة مؤتة في مدينة الكرك" note="PDF" url="https://www.mutah.edu.jo/ar/GraduateStudies/Documents/7.pdf" />
                      <LinkRow name="الرسوم الجامعية لبرنامج الماجستير لشعب خارج مقر الجامعة" note="PDF" url="https://www.mutah.edu.jo/ar/GraduateStudies/Documents/12.pdf" />
                      <LinkRow name="الرسوم الجامعية لبرنامج الدكتوراة لشعب مقر جامعة مؤتة في مدينة الكرك" note="PDF" url="https://www.mutah.edu.jo/ar/GraduateStudies/Documents/6.pdf" />
                      <LinkRow name="الرسوم الجامعية في جامعة مؤتة لبرنامج الدكتوراة لشعب خارج مقر الجامعة" note="PDF" url="https://www.mutah.edu.jo/ar/GraduateStudies/Documents/11.pdf" />
                    </div>
                  </div>
                </div>
              )}

              {activeItem === 'stu-laws' && (
                <div className="space-y-8">
                  <SectionHead title="التشريعات" sub="تعليمات منح الدرجات العلمية في جامعة مؤتة" />
                  <div className="flex flex-col gap-3">
                    <LinkRow name="تعليمات منح درجة الماجستير في جامعة مؤتة" note="PDF" url="https://www.mutah.edu.jo/ar/GraduateStudies/SiteAssets/Pages/Forms/EditForm/%D8%AA%D8%B9%D9%84%D9%8A%D9%85%D8%A7%D8%AA%20%D9%85%D9%86%D8%AD%20%D8%AF%D8%B1%D8%AC%D8%A9%20%D8%A7%D9%84%D9%85%D8%A7%D8%AC%D8%B3%D8%AA%D9%8A%D8%B1%20%D9%81%D9%8A%20%D8%AC%D8%A7%D9%85%D8%B9%D8%A9%20%D9%85%D8%A4%D8%AA%D8%A9.pdf" />
                    <LinkRow name="تعليمات منح درجة الدكتوراه في جامعة مؤتة" note="PDF" url="https://www.mutah.edu.jo/ar/GraduateStudies/SiteAssets/Pages/Forms/EditForm/%D8%AA%D8%B9%D9%84%D9%8A%D9%85%D8%A7%D8%AA%20%D9%85%D9%86%D8%AD%20%D8%AF%D8%B1%D8%AC%D8%A9%20%D8%A7%D9%84%D8%AF%D9%83%D8%AA%D9%88%D8%A7%D8%B1%D9%87%20%D9%81%D9%8A%20%D8%AC%D8%A7%D9%85%D8%B9%D8%A9%20%D9%85%D8%A4%D8%AA%D8%A9.pdf" />
                  </div>
                </div>
              )}

              {activeItem === 'stu-wishing' && (
                <div className="space-y-8">
                  <SectionHead title="شروط القبول في برامج الدراسات العليا" />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-bold text-[#c9a227] mb-5">1. شروط القبول في برامج الماجستير</h3>
                      <ul className="space-y-3 text-gray-700 list-disc list-inside">
                        <li>أن يكون حاصلاً على درجة البكالوريوس بتقدير لا يقل عن جيد من جامعة أو معهد علمي أو كلية علمية تعترف بها جامعة مؤتة.</li>
                        <li>أن يكون الطالب منتظماً في دراسته في مرحلة البكالوريوس.</li>
                        <li>اجتياز امتحان التوفل كما هو موضح أدناه.</li>
                      </ul>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-bold text-[#c9a227] mb-5">2. شروط القبول في برامج الدكتوراه</h3>
                      <ul className="space-y-3 text-gray-700 list-disc list-inside">
                        <li>أن يكون حاصلاً على درجة الماجستير أو ما يعادلها بتقدير «جيد» على الأقل من جامعة أو كلية علمية أو معهد علمي تعترف به جامعة مؤتة.</li>
                        <li>أن يكون حاصلاً على درجة البكالوريوس أو ما يعادلها بتقدير «جيد».</li>
                        <li>أن يكون الطالب منتظماً في دراسته في مرحلتي البكالوريوس والماجستير.</li>
                        <li>اجتياز امتحان التوفل كما هو موضح أدناه.</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-700 leading-[2] mb-5 text-justify">
                      يقبل طلبة الدراسات العليا في برامج الدكتوراه والماجستير بشرط اجتياز امتحان اللغة
                      الانجليزية (TOEFL &amp; IELTS) باعتباره شرط قبول وحسب المعطيات في الجدول التالي:
                    </p>
                    <ToeflTable />
                    <div className="mt-5 bg-gray-50 border border-gray-100 rounded-2xl p-6">
                      <p className="font-bold text-[#0f3057] mb-3">ملاحظة</p>
                      <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                        <li>طلبة الكليات الانسانية TOEFL 400</li>
                        <li>طلبة الكليات العلمية TOEFL 500</li>
                        <li>طلبة اللغة الانجليزية ومناهج اللغة الانجليزية TOEFL</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-[#c9a227] mb-4">3. القبول باللغة الفرنسية</h3>
                    <p className="text-gray-700 leading-[2] text-justify">
                      يقبل الطلبة في برامج الدراسات العليا استثناءً من الشروط السابقة في حالة اتقانهم
                      اللغة الفرنسية، وذلك بالحصول على المستوى الخامس في امتحان
                      (Calibrated Test of French) TCF المعادل لامتحان اللغة الانجليزية المعتمد
                      (Paper Based 500).
                    </p>
                  </div>
                </div>
              )}

              {activeItem === 'stu-current' && (
                <div className="space-y-8">
                  <SectionHead title="أسئلة متكررة لطلبة كلية الدراسات العليا" />
                  <div>
                    <h3 className="text-lg font-bold text-[#c9a227] mb-5">أسئلة متكررة تتعلق بطلبة الماجستير</h3>
                    <FaqList items={FAQ_MASTER} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#c9a227] mb-5">أسئلة متكررة تتعلق بطلبة الدكتوراه</h3>
                    <FaqList items={FAQ_PHD} />
                  </div>
                </div>
              )}

              {activeItem === 'stu-english' && (
                <div className="space-y-8">
                  <SectionHead title="امتحان اللغة الانجليزية" />
                  <p className="text-gray-700 leading-[2] text-justify">
                    يقبل طلبة الدراسات العليا في برامج الدكتوراه والماجستير بشرط اجتياز امتحان اللغة
                    الانجليزية (TOEFL &amp; IELTS) باعتباره شرط قبول وحسب المعطيات في الجدول التالي:
                  </p>
                  <ToeflTable />
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                    <p className="font-bold text-[#0f3057] mb-3">ملاحظة</p>
                    <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                      <li>طلبة الكليات الانسانية TOEFL 400</li>
                      <li>طلبة الكليات العلمية TOEFL 500</li>
                      <li>طلبة اللغة الانجليزية ومناهج اللغة الانجليزية TOEFL</li>
                    </ul>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-700 leading-[2] text-justify">
                      يقبل الطلبة في برامج الدراسات العليا استثناءً من الشروط السابقة في حالة اتقانهم
                      اللغة الفرنسية، وذلك بالحصول على المستوى الخامس في امتحان
                      (Calibrated Test of French) TCF المعادل لامتحان اللغة الانجليزية المعتمد
                      (Paper Based 500).
                    </p>
                  </div>
                  <LinkRow name="نتائج الإمتحان الوطني باللغة الإنجليزية" url="http://exam.heac.org.jo/" />
                </div>
              )}

              {activeItem === 'stu-plans' && (
                <div className="space-y-8">
                  <SectionHead title="الخطط الدراسية لكلية الدراسات العليا" sub="الخطط الدراسية موزعة على برامج الدكتوراه والماجستير حسب الكليات" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {[
                      { id: 'prog-phd', name: 'برامج الدكتوراة', icon: '🎓' },
                      { id: 'master-med', name: 'ماجستير — الكليات الطبية', icon: '🩺' },
                      { id: 'master-sci', name: 'ماجستير — الكليات العلمية', icon: '🔬' },
                      { id: 'master-huma', name: 'ماجستير — الكليات الإنسانية', icon: '📚' }
                    ].map((c) => (
                      <button key={c.id} onClick={() => setActiveItem(c.id)}
                        className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-[#c9a227] transition-all text-center group">
                        <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform">{c.icon}</span>
                        <h3 className="font-bold text-[#0f3057] text-sm leading-snug mb-2">{c.name}</h3>
                        <span className="inline-flex items-center gap-1 text-[#c9a227] text-xs font-bold">
                          الخطط الدراسية <ChevronLeft size={13} />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeItem === 'stu-sites' && (
                <div className="space-y-8">
                  <SectionHead title="روابط مهمة لطلبة الدراسات العليا" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {STUDENT_LINKS.map((l) => <LinkRow key={l.name} name={l.name} url={l.url} />)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0f3057] mb-4">خدمات الجامعة الإلكترونية</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {USEFUL.map((u) => <LinkRow key={u.name} name={u.name} url={u.url} />)}
                      {QUICK_LINKS.map((q) => <LinkRow key={q.name} name={q.name} url={q.url} />)}
                    </div>
                  </div>
                </div>
              )}

              {/* معلومات خاصة بالقبول */}
              {activeItem === 'admission' && (
                <div className="space-y-8">
                  <SectionHead title="معلومات تهمك اذا كنت تنوي التقدم بطلب قبول ماجستير أو دكتوراة" />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-bold text-[#c9a227] mb-5">شروط القبول في برامج الماجستير</h3>
                      <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                        <li>أن يكون حاصلاً على درجة البكالوريوس بتقدير لا يقل عن جيد من جامعة أو معهد علمي أو كلية علمية تعترف بها جامعة مؤتة.</li>
                        <li>أن يكون الطالب منتظماً في دراسته في مرحلة البكالوريوس.</li>
                        <li>اجتياز امتحان التوفل.</li>
                      </ol>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-bold text-[#c9a227] mb-5">شروط القبول في برامج الدكتوراه</h3>
                      <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                        <li>أن يكون حاصلاً على درجة الماجستير أو ما يعادلها بتقدير «جيد» على الأقل من جامعة أو كلية علمية أو معهد علمي تعترف به جامعة مؤتة.</li>
                        <li>أن يكون حاصلاً على درجة البكالوريوس أو ما يعادلها بتقدير «جيد».</li>
                        <li>أن يكون الطالب منتظماً في دراسته في مرحلتي البكالوريوس والماجستير.</li>
                        <li>اجتياز امتحان اللغة الانجليزية حسب الاسس المعتمدة من قبل جامعة مؤتة.</li>
                      </ol>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                    <h3 className="text-lg font-bold text-[#0f3057] mb-5">ملاحظات</h3>
                    <ol className="space-y-3 text-gray-700 text-[15px] list-decimal list-inside">
                      <li>يجب تقديم الطلب بشكل الكتروني فقط من خلال رابط ينشر على موقع الجامعة عند فتح باب تقديم طلبات الالتحاق.</li>
                      <li>تحتفظ الجامعة بحق عدم النظر في الطلبات في حال عدم توفر عدد كافي من المتقدمين لتخصص معين ويتم استرجاع الرسوم من خلال مطالبة مالية.</li>
                      <li>يجب تعبئة المعلومات بشكل صحيح ودقيق.</li>
                      <li>يستطيع الطالب التقدم للامتحان الوطني من خلال مركز اللغات في جامعة مؤتة بشكل مباشر.</li>
                      <li>يجب تحقيق شرط اللغة الانجليزية أو تقديم ما يثبت اخفاق المتقدم في الامتحان الوطني لمرة واحدة على الأقل، وبخلاف ذلك يجب دراسة مواد في اللغة الانجليزية خلال السنة الدراسية الأولى من تاريخ القبول.</li>
                      <li>لا يجوز استخدام الوصل المالي لأكثر من طلب (يتم إلغاء الطلب في حال تبين أي خطأ في معلومات الوصل — التاريخ ورقم الوصل).</li>
                      <li>يجب رفع (تحميل) الوثائق المطلوبة في الشاشة المخصصة لذلك ويجب أن تكون الوثائق بصيغة PDF.</li>
                      <li>يتم دفع رسوم طلب الالتحاق من خلال تطبيق فواتيركم (تحت بند رسوم أخرى لجامعة مؤتة) وذلك من خلال رقم الدفع الالكتروني الذي يظهر بعد تسجيل اسم المستخدم.</li>
                      <li>يكون الدوام في مكتب الارتباط — عمان أيام الخميس والجمعة والسبت.</li>
                      <li>الدوام في مكتب الارتباط مستقل عن الدوام في الكرك.</li>
                      <li>للاطلاع على رسوم الساعات يرجى زيارة صفحة رسوم الساعات.</li>
                      <li>لا يجوز التقدم لأي برنامج سبق وأن فُصل منه.</li>
                    </ol>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-[#0f3057] mb-5">الوثائق المطلوبة (إلكترونياً)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['كشوف العلامات والمصدقات الجامعية والثانوية العامة', 'صورة عن الوصل المالي', 'وثيقة الامتحان الوطني أو ما يعادلها'].map((d, i) => (
                        <div key={d} className="flex items-start gap-3 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                          <span className="w-8 h-8 rounded-xl bg-[#c9a227]/20 text-[#c9a227] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                          <p className="text-gray-700 text-sm leading-relaxed">{d}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <LinkRow name="الرسوم الجامعية" url="https://www.mutah.edu.jo/ar/GraduateStudies/Pages/University_fees.aspx" />
                  </div>

                  <div className="bg-[#0f3057] rounded-3xl p-8 text-center">
                    <p className="text-white/70 text-sm mb-1">عميد كلية الدراسات العليا</p>
                    <p className="text-[#c9a227] text-xl font-bold">أ.د عمر خالد جرادات</p>
                  </div>
                </div>
              )}

              {/* التقويم الجامعي */}
              {activeItem === 'stu-calendar' && (
                <div className="space-y-8">
                  <SectionHead title="التقويم الجامعي للدراسات العليا" />
                  <div className="flex flex-col gap-3">
                    <LinkRow name="التقويم الجامعي لكلية الدراسات العليا — الفصل الدراسي الثاني 2025-2026" note="PDF" url="https://www.mutah.edu.jo/ar/GraduateStudies/SiteAssets/Pages/Forms/EditForm/%d8%a7%d9%84%d8%aa%d9%82%d9%88%d9%8a%d9%85%20%d8%a7%d9%84%d8%ac%d8%a7%d9%85%d8%b9%d9%8a%20%d9%84%d9%83%d9%84%d9%8a%d8%a9%20%d8%a7%d9%84%d8%af%d8%b1%d8%a7%d8%b3%d8%a7%d8%aa%20%d8%a7%d9%84%d8%b9%d9%84%d9%8a%d8%a7%20%d8%a7%d9%84%d9%81%d8%b5%d9%84%20%d8%a7%d9%84%d8%af%d8%b1%d8%a7%d8%b3%d9%8a%20%d8%a7%d9%84%d8%ab%d8%a7%d9%86%d9%8a2025-%202026.pdf" />
                  </div>
                  <Link to="/calendar" className="inline-flex items-center gap-2 bg-[#0f3057] hover:bg-[#16457a] text-white text-sm font-bold px-6 py-3 rounded-lg transition-colors">
                    <Calendar size={16} className="text-[#c9a227]" />
                    التقويم الجامعي للجامعة
                  </Link>
                </div>
              )}

              {/* الرسائل الجامعية */}
              {activeItem === 'stu-thesis' && (
                <div className="space-y-8">
                  <SectionHead title="الرسائل الجامعية" sub="مستودع الرسائل الجامعية الإلكتروني لجامعة مؤتة" />
                  <div className="flex flex-col gap-3">
                    <LinkRow name="مستودع الرسائل الجامعية" url="https://mltr.mutah.edu.jo/" />
                    <LinkRow name="الرسائل الالكترونية" url="https://e-thesis.mutah.edu.jo/index.php/en/" />
                  </div>
                </div>
              )}

              {activeItem.startsWith('news-') && (() => {
                const n = NEWS.find((x) => 'news-' + x.id === activeItem);
                if (!n) return null;
                return (
                  <div className="space-y-8">
                    <button onClick={() => setActiveItem('home')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-[#0f3057] text-sm font-bold hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
                      <ChevronRight size={15} /> الرجوع إلى الرئيسية
                    </button>
                    <div>
                      <span className="text-xs font-bold text-[#c9a227] mb-3 block" dir="ltr">{n.date}</span>
                      <h1 className="text-3xl font-bold text-[#0f3057] leading-relaxed">{n.title}</h1>
                    </div>
                    <div className="rounded-3xl overflow-hidden bg-gray-100 border border-gray-100">
                      <img src={n.img} alt={n.title} className="w-full max-h-[460px] object-cover" />
                    </div>
                    <div className="flex items-start gap-3 bg-[#F8FAFC] border border-dashed border-gray-200 rounded-2xl px-6 py-8">
                      <Info size={18} className="text-gray-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-500 leading-relaxed">هذا الخبر منشور في قائمة أخبار كلية الدراسات العليا بعنوانه وتاريخه وصورته فقط، ولم يُنشر له نص تفصيلي.</p>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#0f3057] mb-4">أخبار أخرى</h2>
                      <div className="flex flex-col gap-3">
                        {NEWS.filter((x) => x.id !== n.id).map((x) => (
                          <button key={x.id} onClick={() => setActiveItem('news-' + x.id)} className="text-right flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
                            <span className="text-xs font-bold text-[#c9a227] shrink-0" dir="ltr">{x.date}</span>
                            <p className="font-bold text-[#0f3057] text-[15px] flex-1 leading-snug">{x.title}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {activeItem.startsWith('ann-') && (() => {
                const a = ANNOUNCEMENTS.find((x) => 'ann-' + x.id === activeItem);
                if (!a) return null;
                return (
                  <div className="space-y-8">
                    <button onClick={() => setActiveItem('home')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-[#0f3057] text-sm font-bold hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
                      <ChevronRight size={15} /> الرجوع إلى الرئيسية
                    </button>
                    <div>
                      <span className="text-xs font-bold text-[#c9a227] mb-3 block" dir="ltr">{a.date}</span>
                      <h1 className="text-3xl font-bold text-[#0f3057] leading-relaxed">{a.title}</h1>
                    </div>
                    <div className="flex items-start gap-3 bg-[#F8FAFC] border border-dashed border-gray-200 rounded-2xl px-6 py-8">
                      <Info size={18} className="text-gray-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-500 leading-relaxed">هذا الإعلان منشور في قائمة إعلانات كلية الدراسات العليا بعنوانه وتاريخه، ولم يُنشر له نص تفصيلي.</p>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#0f3057] mb-4">إعلانات أخرى</h2>
                      <div className="flex flex-col gap-3">
                        {ANNOUNCEMENTS.filter((x) => x.id !== a.id).map((x) => (
                          <button key={x.id} onClick={() => setActiveItem('ann-' + x.id)} className="text-right flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
                            <span className="text-xs font-bold text-[#c9a227] shrink-0" dir="ltr">{x.date}</span>
                            <p className="font-bold text-[#0f3057] text-[15px] flex-1 leading-snug">{x.title}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* معرض الصور */}
              {activeItem === 'gallery' && (
                <div className="space-y-8">
                  <SectionHead title="معرض الصور" sub="صور من حفلات تخريج طلبة كلية الدراسات العليا" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {NEWS.map((n) => (
                      <div key={n.img} className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
                        <img src={n.img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt={n.title} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* إتصل بنا */}
              {activeItem === 'contact' && (
                <div className="space-y-8">
                  <SectionHead title="إتصل بنا" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-8 bg-gray-50 rounded-3xl flex flex-col items-center text-center border border-gray-100 shadow-sm">
                      <Phone className="w-10 h-10 text-[#c9a227] mb-4" />
                      <h4 className="font-bold text-[#0f3057] text-lg mb-2">الهاتف</h4>
                      <p className="text-gray-500 font-medium" dir="ltr">+(962) 3 2372380</p>
                    </div>
                    <div className="p-8 bg-gray-50 rounded-3xl flex flex-col items-center text-center border border-gray-100 shadow-sm">
                      <Mail className="w-10 h-10 text-[#c9a227] mb-4" />
                      <h4 className="font-bold text-[#0f3057] text-lg mb-2">البريد الإلكتروني</h4>
                      <p className="text-gray-500 font-medium" dir="ltr">dean_dgs@mutah.edu.jo</p>
                    </div>
                    <div className="p-8 bg-gray-50 rounded-3xl flex flex-col items-center text-center border border-gray-100 shadow-sm">
                      <MapPin className="w-10 h-10 text-[#c9a227] mb-4" />
                      <h4 className="font-bold text-[#0f3057] text-lg mb-2">الموقع</h4>
                      <p className="text-gray-500 font-medium">جامعة مؤته، الكرك :: الأردن</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <LinkRow name="مجموعة الكلية على فيسبوك" url="https://www.facebook.com/groups/600661679977195" />
                  </div>
                </div>
              )}

              {activeItem === 'about-plan' && (
                <div className="space-y-8">
                  <SectionHead title="الخطة الاستيراتيجية" sub="الرؤية والرسالة والاهداف" />
                  <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm mb-6">
                    <img src="https://www.mutah.edu.jo/ar/GraduateStudies/PublishingImages/strategy.jpg" alt="الخطة الاستراتيجية" className="w-full max-h-[420px] object-cover" />
                  </div>
                  <p className="text-gray-700 text-lg">لمشاهدة الخطة الاستراتيجية اضغط على الرابط:</p>
                  <LinkRow name="Strategic plan - Mutah (2).pdf" note="PDF" url="https://www.mutah.edu.jo/ar/GraduateStudies/SiteAssets/Pages/Forms/EditForm/Strategic%20plan%20-%20Mutah.pdf" />
                </div>
              )}

              {activeItem === 'about-board' && (
                <div className="space-y-8">
                  <SectionHead title="مجلس الكلية" sub="أعضاء مجلس كلية الدراسات العليا" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {BOARD.map((m, i) => (
                      <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-[#0f3057] flex items-center justify-center shrink-0">
                          {m.img
                            ? <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                            : <Users className="w-6 h-6 text-[#c9a227]" />}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-[#0f3057] text-[15px] leading-snug mb-1">{m.name}</h3>
                          <p className="text-xs text-gray-500 leading-relaxed">{m.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeItem === 'about-staff' && (
                <div className="space-y-8">
                  <SectionHead title="موظفو الكلية" sub="الكادر الإداري والفني في كلية الدراسات العليا" />
                  <div className="overflow-x-auto rounded-2xl border border-gray-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[#0f3057] text-white">
                          <th className="px-5 py-3.5 text-right font-bold">الاسم</th>
                          <th className="px-5 py-3.5 text-right font-bold">المسمى</th>
                          <th className="px-5 py-3.5 text-right font-bold w-24">الهاتف</th>
                          <th className="px-5 py-3.5 text-right font-bold">البريد الإلكتروني</th>
                        </tr>
                      </thead>
                      <tbody>
                        {STAFF.map((m, i) => (
                          <tr key={i} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}>
                            <td className="px-5 py-3.5 font-bold text-[#0f3057]">{m.name}</td>
                            <td className="px-5 py-3.5 text-gray-700">{m.role}</td>
                            <td className="px-5 py-3.5 text-gray-500 font-mono text-xs" dir="ltr">{m.ext || '—'}</td>
                            <td className="px-5 py-3.5 text-gray-600 text-xs" dir="ltr">{m.email || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeItem === 'about-former' && (
                <div className="space-y-8">
                  <SectionHead title="العمداء السابقون" sub="عمداء كلية / عمادة الدراسات العليا منذ عام 2001" />
                  <div className="flex flex-col gap-3">
                    {FORMER_DEANS.map((d, i) => (
                      <div key={i} className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-[#c9a227] transition-colors">
                        <span className="w-8 h-8 rounded-full bg-[#0f3057] text-[#c9a227] text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                        <p className="font-bold text-[#0f3057] text-[15px] flex-1">{d.name}</p>
                        <span className="text-xs font-bold text-gray-500 shrink-0" dir="ltr">{d.period}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeItem === 'about-honory' && (
                <div className="space-y-8">
                  <SectionHead title="الدكتوراة الفخرية" />
                  <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                    <img src="https://www.mutah.edu.jo/ar/GraduateStudies/Photos/Honor%20Degree%202.jpg" alt="الدكتوراة الفخرية" className="w-full max-h-[420px] object-cover" />
                  </div>
                  <div className="bg-gradient-to-l from-[#8a6d1f] to-[#c9a227] rounded-3xl p-8 md:p-10">
                    <p className="text-white text-lg md:text-xl leading-[2.1] text-justify font-bold">
                      في الأول من شهر كانون الأول من عام 2015 منحت جامعة مؤتة شهادة الدكتوراة الفخرية
                      الأولى التي تقدمها منذ تأسيسها في ادارة الأعمال لرئيس مجموعة طلال أبو غزالة
                      الدولية الدكتور طلال أبو غزالة، صاحب شركة بوابة العلم الثقافية
                      «مركز طلال أبو غزالة للمعرفة».
                    </p>
                  </div>
                </div>
              )}

              {activeItem === 'about-stats' && (
                <div className="space-y-8">
                  <SectionHead title="أرقام و احصائيات" />
                  <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                    <img src="https://www.mutah.edu.jo/ar/GraduateStudies/PublishingImages/Stats.jpg" alt="أرقام واحصائيات" className="w-full max-h-[420px] object-cover" />
                  </div>
                  <div className="bg-[#0f3057] rounded-3xl p-8 md:p-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                      <div>
                        <span className="block text-4xl md:text-5xl font-bold text-[#c9a227] mb-3">2893</span>
                        <span className="text-white text-sm">إجمالي الطلبة المسجلين</span>
                      </div>
                      <div>
                        <span className="block text-4xl md:text-5xl font-bold text-[#c9a227] mb-3">563</span>
                        <span className="text-white text-sm">طلبة الدكتوراة</span>
                      </div>
                      <div>
                        <span className="block text-4xl md:text-5xl font-bold text-[#c9a227] mb-3">2330</span>
                        <span className="text-white text-sm">طلبة الماجستير</span>
                      </div>
                      <div>
                        <span className="block text-4xl md:text-5xl font-bold text-[#c9a227] mb-3">9 / 45</span>
                        <span className="text-white text-sm">برامج دكتوراة / ماجستير</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <LinkRow name="الرسوم الجامعية لبرنامج الماجستير لشعب مقر جامعة مؤتة في مدينة الكرك" note="PDF" url="https://www.mutah.edu.jo/ar/GraduateStudies/Documents/7.pdf" />
                    <LinkRow name="الرسوم الجامعية لبرنامج الماجستير لشعب خارج مقر الجامعة" note="PDF" url="https://www.mutah.edu.jo/ar/GraduateStudies/Documents/12.pdf" />
                    <LinkRow name="الرسوم الجامعية لبرنامج الدكتوراة لشعب مقر جامعة مؤتة في مدينة الكرك" note="PDF" url="https://www.mutah.edu.jo/ar/GraduateStudies/Documents/6.pdf" />
                    <LinkRow name="الرسوم الجامعية في جامعة مؤتة لبرنامج الدكتوراة لشعب خارج مقر الجامعة" note="PDF" url="https://www.mutah.edu.jo/ar/GraduateStudies/Documents/11.pdf" />
                  </div>
                </div>
              )}

              {activeItem === 'about-map' && (
                <div className="space-y-8">
                  <SectionHead title="كيف لك أن تصل لكلية الدراسات العليا؟" />
                  <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                    <img src="https://www.mutah.edu.jo/ar/GraduateStudies/SiteAssets/Pages/Forms/EditForm/%D8%B5%D9%88%D8%B1%D8%A92.jpg" alt="خريطة الكلية" className="w-full max-h-[420px] object-cover" />
                  </div>
                  <p className="text-gray-700 text-lg">يمكنك الوصول الى كلية الدراسات العليا بالاستعانة بخرائط جوجل عبر هذا الرابط:</p>
                  <LinkRow name="موقع الكلية على خرائط جوجل" url="https://www.google.jo/maps/@31.0934159,35.7199732,183m/data=!3m1!1e3?hl=en-JO&authuser=0" />
                </div>
              )}

              {activeItem === 'about-structure' && (
                <div className="space-y-8">
                  <SectionHead title="الهيكل التنظيمي" sub="الهيكل التنظيمي لكلية الدراسات العليا (2024)" />
                  <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white p-4">
                    <img src={orgChart2024} alt="الهيكل التنظيمي لكلية الدراسات العليا 2024" className="w-full max-h-[560px] object-contain" />
                  </div>
                </div>
              )}

              {activeItem === 'schol-about' && (
                <div className="space-y-8">
                  <SectionHead title="عن الدائرة" sub="دائرة البعثات — كلية الدراسات العليا" />
                  <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 md:p-10">
                    <p className="text-gray-700 text-lg leading-[2.1] text-justify mb-6">
                      تُعد دائرة البعثات جزءاً محورياً في تحقيق رسالة الجامعة نحو التميز الأكاديمي
                      والبحثي، حيث تسهم بشكل فعّال في دعم طلبة الدراسات العليا وأعضاء الهيئة التدريسية
                      من خلال توفير فرص الابتعاث والتدريب في أبرز الجامعات والمؤسسات العلمية العالمية.
                    </p>
                    <p className="text-gray-700 text-lg leading-[2.1] text-justify mb-6">
                      نعمل على تأهيل الكوادر الأكاديمية والبحثية بأعلى المستويات، مما يساهم في تطوير
                      القدرات العلمية وتبادل المعرفة على الصعيدين المحلي والدولي.
                    </p>
                    <p className="text-gray-700 text-lg leading-[2.1] text-justify mb-6">
                      من خلال برامج البعثات، نسعى إلى تمكين الباحثين والطلبة من اكتساب مهارات جديدة،
                      والوصول إلى أحدث ما توصلت إليه الأبحاث العلمية في مختلف المجالات، بما يسهم في
                      إثراء البيئة الأكاديمية في جامعة مؤتة، وتعزيز دورها الريادي في خدمة المجتمع
                      وتطوير البحوث والدراسات العليا.
                    </p>
                    <p className="text-gray-700 text-lg leading-[2.1] text-justify">
                      نؤمن في دائرة البعثات بأن الاستثمار في التعليم والتدريب هو استثمار في المستقبل،
                      ونلتزم بتقديم الدعم اللازم لتسهيل فرص الابتعاث وتنمية قدرات الطلبة والباحثين،
                      بما يعود بالفائدة على الجامعة والمجتمع ككل.
                    </p>
                  </div>
                </div>
              )}

              {activeItem === 'schol-committee' && (
                <div className="space-y-8">
                  <SectionHead title="لجنة البعثات" sub="أعضاء لجنة البعثات في جامعة مؤتة" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {SCHOL_COMMITTEE.map((m, i) => (
                      <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-full bg-[#0f3057] flex items-center justify-center shrink-0">
                          <Users className="w-5 h-5 text-[#c9a227]" />
                        </div>
                        <div className="min-w-0">
                          <span className="inline-block text-[11px] font-bold text-[#c9a227] mb-1.5">{m.role}</span>
                          <h3 className="font-bold text-[#0f3057] text-[15px] leading-snug">{m.name}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeItem === 'schol-stats' && (
                <div className="space-y-8">
                  <SectionHead title="إحصائيات وأرقام" sub="دائرة البعثات" />
                  <h3 className="text-xl font-bold text-[#0f3057] leading-relaxed">أعداد الطلبة المبتعثين في الجامعات الاجنبية وأماكن إبتعاثهم</h3>
                  <div className="rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm p-4">
                    <img
                      src="https://www.mutah.edu.jo/ar/GraduateStudies/PublishingImages/2024-2025/%D8%B5%D9%88%D8%B1%D8%A9%32.png"
                      alt="أعداد الطلبة المبتعثين في الجامعات الاجنبية وأماكن إبتعاثهم"
                      className="w-full max-h-[560px] object-contain rounded-2xl"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {activeItem === 'forms' && (
                <div className="space-y-8">
                  <SectionHead title="ملفات ونماذج" sub="نماذج كلية الدراسات العليا ودليل كتابة الرسائل الجامعية" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {GRAD_FORMS.map((f) => (
                      <div key={f.name} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-3.5 hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
                        <div className="w-9 h-9 rounded-lg bg-[#0f3057]/8 flex items-center justify-center shrink-0">
                          <FileText size={16} className="text-[#0f3057]" />
                        </div>
                        <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-snug">{f.name}</p>
                        <span className="text-[10px] font-bold text-gray-400">{f.type}</span>
                        <Download size={15} className="text-[#c9a227] shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* صفحات لم يُنشر لها محتوى على الموقع الرسمي */}
              {[].includes(activeItem) && (
                <div className="space-y-8">
                  <SectionHead title={getSectionTitle(activeItem, GRADUATE_LINKS)} />
                  <NotPublished />
                </div>
              )}
            </div>
          </div>
        </div>

        <WireframeFooter />
      </div>
    </div>
  );
}
