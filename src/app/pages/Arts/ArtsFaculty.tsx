import { Link } from 'react-router';
import { useTabRoute } from "../../nav";
import React, { useState } from 'react';
import {
  DeanshipShell, PageTitle, Prose, DocRow, LinkRow, NumList, Waiting,
  getSectionTitle, type NavLink
} from '../Deanships/DeanshipShell';
import { Eye, Target, Users, Phone, Mail, MapPin, GraduationCap, BookOpen } from 'lucide-react';
import { NewsCard, NewsGrid } from '@/app/components/NewsCard';
import { Attachments, samplePair } from '../../components/Attachments';

const ARTS_LINKS: NavLink[] = [
  { id: 'home', name: 'الرئيسية' },
  {
    id: 'about', name: 'عن الكلية',
    children: [
      { id: 'about-vision', name: 'الرؤية والرسالة والاهداف' },
      { id: 'about-plan', name: 'الخطة الاستراتيجية' },
      { id: 'about-dean', name: 'مكتب العميد' },
      { id: 'about-council', name: 'مجلس الكلية' },
      { id: 'about-committees', name: 'لجان الكلية' },
      { id: 'about-former', name: 'العمداء السابقون' },
      { id: 'about-staff', name: 'الموظفون الاداريون' }
    ]
  },
  {
    id: 'departments', name: 'الاقسام',
    children: [
      { id: 'dep-arabic', name: 'اللغة العربية وآدابها', url: '#/faculty/arts/departments/arabic' },
      { id: 'dep-english', name: 'اللغة الإنجليزية وآدابها', url: '#/faculty/arts/departments/english' },
      { id: 'dep-european', name: 'اللغات الأوروبية', url: '#/faculty/arts/departments/european' },
      { id: 'dep-translation', name: 'الترجمة', url: '#/faculty/arts/departments/translation' }
    ]
  },
  {
    id: 'programs', name: 'البرامج الاكاديمية',
    children: [
      { id: 'prog-bachelor', name: 'البكالوريوس' },
      { id: 'prog-graduate', name: 'الدراسات العليا' },
      { id: 'prog-other', name: 'برامج أخرى' }
    ]
  },
  { id: 'achievements', name: 'الانجازات' },
  { id: 'conferences', name: 'المؤتمرات' },
  { id: 'forms', name: 'النماذج' },
  {
    id: 'links', name: 'روابط هامة',
    children: [
      { id: 'lnk-plan', name: 'الخطة الاستراتيجية 2023-2025', url: 'https://www.mutah.edu.jo/ar/arts/Documents/%D8%A7%D9%84%D8%AE%D8%B7%D8%A9%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B1%D8%A7%D8%AA%D9%8A%D8%AC%D9%8A%D8%A9%20%D9%84%D9%83%D9%84%D9%8A%D8%A9%20%D8%A7%D9%84%D8%A7%D9%93%D8%AF%D8%A7%D8%A8.pdf' },
      { id: 'lnk-fb', name: 'انضم للمجموعة الرسمية للكلية على الفيس بوك', url: 'https://web.facebook.com/groups/712425126153837' },
      { id: 'lnk-bsc', name: 'تعليمات منح درجة البكالوريوس', url: 'https://www.mutah.edu.jo/Instructions/Instructions3.pdf' },
      { id: 'lnk-discipline', name: 'تعليمات انضباط الطلبة المدنيين في جامعة مؤتة', url: 'https://www.mutah.edu.jo/Instructions/instructions11.pdf' },
      { id: 'lnk-guide', name: 'دليل الإرشاد الأكاديمي للطلبة', url: 'https://www.mutah.edu.jo/ar/arts/Documents/Student%20Guidebook%20-%20College%20of%20Arts.pdf' },
      { id: 'lnk-exam', name: 'الورقة التعريفية بامتحان الكفاءة الجامعية', url: 'https://www.mutah.edu.jo/ar/arts/Documents/University%20Proficiency%20Exam.pdf' },
      { id: 'lnk-video', name: 'خريجو كلية الآداب - حكايات نجاح', url: 'https://www.mutah.edu.jo/mutah2025.mp4' }
    ]
  },
  { id: 'contact', name: 'إتصل بنا' }
];

const DEAN_IMG = 'https://www.mutah.edu.jo/ar/arts/PublishingImages/%D8%A7%D9%84%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D8%A9%20%D8%B1%D8%A7%D9%86%D9%8A%D8%A7%20%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D8%A8%D8%A9%20%D9%A2.jpg';
const CAMPUS_IMG = 'https://www.mutah.edu.jo/ar/arts/PublishingImages/Campus.jpg';

const DEAN_OFFICE = [
  { name: 'الاستاذة الدكتورة رانيه العقاربه', role: 'عميدة كلية الآداب' },
  { name: 'الدكتور محمد الملاحمة', role: 'نائب عميد كلية الآداب' },
  { name: 'الدكتور علي النوايسة', role: 'مساعد العميد لشؤون الطلبة' },
  { name: 'الدكتورة لبنى عبدالهادي', role: 'مساعد العميد لشؤون ضبط الجودة والتعليم الإلكتروني' }
];

const COUNCIL = [
  { name: 'الأستاذة الدكتورة رانيه العقاربه', role: 'عميدة كلية الآداب' },
  { name: 'الدكتور محمد الملاحمة', role: 'مساعد عميد كلية الآداب' },
  { name: 'الدكتور علي النوايسة', role: 'مساعد العميد لشؤون الطلبة' },
  { name: 'الدكتورة لبنى عبدالهادي', role: 'مساعد العميد لشؤون ضبط الجودة والتعليم الإلكتروني' },
  { name: 'الاستاذة الدكتورة رابعة المجالي', role: 'رئيسة قسم اللغة العربية وآدابها' },
  { name: 'الدكتورة عبير الرواشدة', role: 'رئيسة قسم اللغة الانجليزية وآدابها' },
  { name: 'الدكتور أحمد البطوش', role: 'رئيس قسم اللغات الأوروبية' },
  { name: 'الدكتور نادر البكور', role: 'رئيس قسم الترجمة' },
  { name: 'الاستاذ الدكتور جزاء المصاروة', role: 'ممثل قسم اللغة العربية وآدابها' },
  { name: 'الدكتورة عنود الطراونة', role: 'ممثلة قسم اللغة الانجليزية وآدابها' },
  { name: 'الدكتور أيمن الصمادي', role: 'ممثل قسم اللغات الأوروبية' },
  { name: 'الدكتور هيثم الدريبي', role: 'ممثل قسم الترجمة' },
  { name: 'الأديب نايف النوايسة', role: 'عضواً خارجياً' }
];

const FORMER_DEANS = [
  { name: 'الأستاذ الدكتور أنور أبو سويلم', period: '3/3/1990 - 16/8/1992' },
  { name: 'الاستاذ الدكتور عادل الطويسي', period: '17/8/1992 - 4/11/1994' },
  { name: 'الاستاذ الدكتور محمود القضاة', period: '15/11/1994 - 7/6/1996' },
  { name: 'الاستاذ الدكتور طه الطراونة', period: '8/6/1996 - 30/6/1997' },
  { name: 'الاستاذ الدكتور عادل الطويسي', period: '1/7/1997 - 8/12/1997' },
  { name: 'الاستاذ الدكتور جهاد المجالي', period: '8/12/1997 - 30/6/1998' },
  { name: 'الاستاذ الدكتور محمد الشوابكة', period: '1/7/1998 - 31/8/1999' },
  { name: 'الأستاذ الدكتور علي الهروط', period: '1/9/1999 - 17/5/2003' },
  { name: 'الاستاذ الدكتور زهير المنصور', period: '26/5/2003 - 6/1/2005' },
  { name: 'الأستاذ الدكتور جهاد المجالي', period: '1/9/2003 - 6/1/2005' },
  { name: 'الأستاذ الدكتور عبد الفتاح الحموز', period: '6/1/2005 - 11/9/2005' },
  { name: 'الأستاذ الدكتور سامح الرواشدة', period: '11/9/2005 - 18/9/2008' },
  { name: 'الأستاذ الدكتور حسام الدين المبيضين', period: '18/9/2008 - 31/8/2011' },
  { name: 'الاستاذ الدكتور ظافر الصرايره', period: '4/9/2011 - 31/8/2013' },
  { name: 'الاستاذ الدكتور خليل الرفوع', period: '1/9/2013 - 31/8/2017' },
  { name: 'الاستاذ الدكتور محمد المطالقه', period: '1/9/2017 - 31/8/2019' },
  { name: 'الاستاذ الدكتور جزاء مصاروة', period: '1/9/2019 - 31/8/2021' },
  { name: 'الاستاذ الدكتور محمد المطالقة', period: '1/9/2021 - 31/8/2023' },
  { name: 'الاستاذ الدكتور ماهر المبيضين', period: '7/9/2023 - 8/9/2024' },
  { name: 'الاستاذة الدكتورة رانيه العقاربه', period: '8/9/2024 - حتى الآن' }
];

const NEWS = [
  { t: 'اليوم العلمي لكلية الآداب 2025', d: '30/7/2025' },
  { t: 'كلية الآداب تنظم يوماً علمياً شاملاً يجمع الإبداع الثقافي والعلمي', d: '30/7/2025' },
  { t: 'المؤتمر الدولي السابع لكلية الآداب', d: '15/7/2025' },
  { t: 'حفل تكريم طلبة كلية الآداب لإنجازاتهم لعام ٢٠٢٤–٢٠٢٥', d: '21/5/2025' }
];

const IMPORTANT_LINKS = [
  { name: 'الخطة الاستراتيجية 2023-2025', url: 'https://www.mutah.edu.jo/ar/arts/Documents/%D8%A7%D9%84%D8%AE%D8%B7%D8%A9%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B1%D8%A7%D8%AA%D9%8A%D8%AC%D9%8A%D8%A9%20%D9%84%D9%83%D9%84%D9%8A%D8%A9%20%D8%A7%D9%84%D8%A7%D9%93%D8%AF%D8%A7%D8%A8.pdf' },
  { name: 'خريجو كلية الآداب - حكايات نجاح', url: 'https://www.mutah.edu.jo/mutah2025.mp4' },
  { name: 'دليل الإرشاد الأكاديمي للطلبة', url: 'https://www.mutah.edu.jo/ar/arts/Documents/Student%20Guidebook%20-%20College%20of%20Arts.pdf' },
  { name: 'انضم للمجموعة الرسمية للكلية على الفيس بوك', url: 'https://web.facebook.com/groups/712425126153837' },
  { name: 'تعليمات منح درجة البكالوريوس', url: 'https://www.mutah.edu.jo/Instructions/Instructions3.pdf' },
  { name: 'تعليمات انضباط الطلبة المدنيين في جامعة مؤتة', url: 'https://www.mutah.edu.jo/Instructions/instructions11.pdf' },
  { name: 'الورقة التعريفية بامتحان الكفاءة الجامعية', url: 'https://www.mutah.edu.jo/ar/arts/Documents/University%20Proficiency%20Exam.pdf' }
];

const COMMITTEES: { title: string; note?: string; rows: string[][] }[] = [
  { title: 'أولاً: لجنة مجلس الكلية', rows: [
    ['عميد كلية الآداب', 'الأستاذ الدكتور ماهر المبيضين', 'رئيساً'],
    ['نائب عميد كلية الآداب', 'الدكتور أيمن الصمادي', 'عضواً'],
    ['مساعد العميد لشؤون الطلبة', 'الدكتور علي النوايسة', 'عضواً وأمين سر المجلس'],
    ['مساعد العميد لشؤون ضبط الجودة والتعليم الإلكتروني', 'الدكتورة لبنى عبدالهادي', 'عضواً'],
    ['رئيس قسم اللغة العربية', 'الأستاذ الدكتور فايز المحاسنة', 'عضواً'],
    ['رئيس قسم اللغة الانجليزية', 'الدكتورة عبير الرواشدة', 'عضواً'],
    ['رئيس قسم اللغات الأوروبية', 'الدكتور أحمد البطوش', 'عضواً'],
    ['رئيس قسم الترجمة', 'الدكتور نادر البكور', 'عضواً'],
    ['ممثل قسم اللغة العربية وآدابها', 'الاستاذ الدكتور جزاء المصاروة', 'عضواً'],
    ['ممثل قسم اللغة الانجليزية وآدابها', 'الأستاذ الدكتور عاطف الصرايرة', 'عضواً'],
    ['ممثل قسم اللغات الأوروبية', 'الأستاذ الدكتور أحمد النوافلة', 'عضواً'],
    ['ممثل قسم الترجمة', 'الدكتور هيثم الدريبي', 'عضواً'],
    ['ممثل المجتمع المحلي', 'الدكتور يوسف الحباشنة', 'عضواً خارجياً'],
    ['ممثل المجتمع المحلي', 'السيدة عروبة الشمايلة / مديرة ثقافة محافظة الكرك', 'عضواً خارجياً']
  ] },
  { title: 'ثانياً: ممثل مجلس القسم في الكلية', rows: [
    ['ممثل قسم اللغة العربية وآدابها', 'الأستاذ الدكتور جزاء المصاروة', ''],
    ['ممثل قسم اللغة الانجليزية وآدابها', 'الأستاذ الدكتور عاطف الصرايرة', ''],
    ['ممثل قسم اللغات الأوروبية', 'الأستاذ الدكتور أحمد النوافلة', ''],
    ['ممثل قسم الترجمة', 'الدكتور هيثم الدريبي', '']
  ] },
  { title: 'ثالثاً: لجنة الدراسات العليا في الكلية', rows: [
    ['', 'الدكتور أيمن الصمادي', 'رئيساً'],
    ['', 'الأستاذ الدكتور عاطف الصرايرة', 'عضواً'],
    ['', 'الأستاذ الدكتور جزاء المصاروة', 'عضواً'],
    ['', 'الأستاذ الدكتور فايز المحاسنة', 'عضواً'],
    ['', 'الدكتور أحمد البطوش', 'عضواً'],
    ['', 'الدكتورة عبير الرواشدة', 'عضواً'],
    ['', 'الدكتور نادر البكور', 'عضواً']
  ] },
  { title: 'رابعاً: لجنة الخطة الدراسية على مستوى مجلس الكلية', rows: [
    ['', 'الأستاذ الدكتور فايز المحاسنة', 'رئيساً'],
    ['', 'الدكتور حامد الجرادات', 'عضواً'],
    ['', 'الدكتورة لبنى عبدالهادي', 'عضواً'],
    ['', 'الدكتور أحمد البطوش', 'عضواً'],
    ['', 'الدكتورة عبير الرواشدة', 'عضواً'],
    ['', 'الدكتور نادر البكور', 'عضواً']
  ] },
  { title: 'خامساً: لجنة البحث العلمي', rows: [
    ['', 'الأستاذ الدكتور جزاء المصاروة', 'رئيساً'],
    ['', 'الأستاذ الدكتور محمد المطالقة', 'عضواً'],
    ['', 'الأستاذ الدكتور فايز المحاسنة', 'عضواً'],
    ['', 'الأستاذ الدكتور عاطف الصرايرة', 'عضواً']
  ] },
  { title: 'سادساً: لجنة النشاط الثقافي والاجتماعي', rows: [
    ['', 'الدكتورة لبنى عبدالهادي', 'رئيساً'],
    ['', 'الدكتور علي النوايسة', 'عضواً'],
    ['', 'الدكتور أحمد البطوش', 'عضواً'],
    ['', 'الدكتور ليث إبراهيم', 'عضواً']
  ] },
  { title: 'سابعاً: لجنة ضبط الجودة', rows: [
    ['', 'الدكتورة لبنى عبدالهادي', 'رئيساً'],
    ['', 'الأستاذ الدكتور أحمد الزعبي', 'عضواً'],
    ['', 'الدكتورة عبير الرواشدة', 'عضواً'],
    ['', 'الدكتور هيثم الدريبي', 'عضواً']
  ] },
  { title: 'ثامناً: لجان التحقيق مع الطلبة', rows: [
    ['', 'الدكتور علي النوايسة', 'رئيساً'],
    ['', 'الدكتورة عبير الرواشدة', 'عضواً'],
    ['', 'الدكتور نادر البكور', 'عضواً'],
    ['', 'الدكتور باسم البديرات', 'عضواً'],
    ['', 'الدكتور أحمد البطوش', 'عضواً']
  ] },
  { title: 'تاسعاً: لجنة التعليم عن بُعد والمحتوى الإلكتروني', rows: [
    ['', 'الدكتورة لبنى عبدالهادي', 'رئيساً'],
    ['', 'الدكتور خلف الجرادات', 'عضواً'],
    ['', 'الدكتور علي النوايسة', 'عضواً'],
    ['', 'الدكتور ليث إبراهيم', 'عضواً']
  ] },
  { title: 'عاشراً: ممثل المجتمع المحلي في مجلس الكلية', rows: [
    ['', 'الدكتور يوسف الحباشنة', 'عضواً خارجياً (عضو هيئة تدريس سابق في جامعة الطفيلة التقنية وناشط ثقافي واجتماعي)'],
    ['', 'السيدة عروبة الشمايلة', 'عضواً خارجياً / مديرة ثقافة الكرك']
  ] }
];

function PersonGrid({ people }: { people: { name: string; role: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {people.map((m, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-start gap-4 hover:shadow-md hover:border-[#c9a227]/40 transition-all">
          <div className="w-12 h-12 rounded-full bg-[#0f3057] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-[#c9a227]" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-[#0f3057] text-[15px] leading-snug mb-1.5">{m.name}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{m.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ArtsFaculty() {
  const [activeItem, setActiveItem] = useTabRoute('home');

  const render = () => {
    switch (activeItem) {
      case 'home':
        return (
          <div className="space-y-10">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm relative">
              <img src={CAMPUS_IMG} alt="كلية الآداب" className="w-full max-h-[420px] object-cover" />
            </div>

            <div className="text-center">
              <p className="text-xs font-bold text-[#c9a227] mb-3">كلية الآداب :: جامعة مؤتة</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f3057] leading-snug">
                من أجل بيئة تعليمية للتفوق المهني
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 shrink-0 bg-gray-50 rounded-3xl p-5 border border-gray-100 text-center">
                <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-[#0f3057]">
                  <img src={DEAN_IMG} alt="عميدة كلية الآداب" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-[#0f3057] leading-snug">الأستاذة الدكتورة رانيه العقاربة</h3>
                <p className="text-[#c9a227] font-bold text-sm mt-1">عميدة كلية الآداب</p>
              </div>
              <div className="w-full md:w-2/3">
                <Prose>
                  <p className="font-bold text-[#0f3057] text-lg">كلمة ترحيبية</p>
                  <p>
                    يسرني في هذا المقام باسمي وبإسم أعضاء الهيئتين التدريسية والادارية في كلية الآداب
                    العريقة أن أرحب أجمل ترحيب بزوار موقع الكلية الإلكتروني والذي من خلاله نتعرف على
                    برامجها وفعاليتها وانشطتها لبلوغ آفاق التميز في تحقيق الأهداف التي نصبو إليها منذ
                    اللحظة الأولى لانطلاق فكرة انشائها عام ١٩٨٤.
                  </p>
                  <p>
                    تتوق كلية الآداب في جامعة مؤتة إلى بلوغ أهدافها في مواكبة العصر، وتعمل على مراجعة
                    البرامج الأكاديمية، وتحفيز البحث العلمي، وتطوير عملها وخططها، وتفعيل الأنشطة
                    الطلابية، بما يحقق للكلية أداء أكثر تميزا وتطورا، لذلك تسير ضمن خطة منهجية سعيا إلى
                    تحقيق العالمية في إنجازاتها وطموحاتها من خلال اقسامها الاكاديمية الاربعة، اللغة
                    العربية وآدابها واللغة الانجليزية وآدابها واللغات الاوروبية والترجمة.
                  </p>
                  <p>
                    وقد حققت الكلية منذ العام الماضي معايير ضمان الجودة في برامجها الأكاديمية، وفي
                    مخرجاتها، وفي نظمها ولوائحها الداخلية، وتمكنت من تحقيق معايير الاعتماد الخاص، على
                    مستوى البرامج الأكاديمية المختلفة في الكلية، ولا شك أن كل هذه الخطوات ستضيف خلال
                    السنوات المقبلة إلى رصيد التميز الأكاديمي الذي تتمتع به الكلية، والذي تحرص دائما على
                    دعمه وتطويره. وعلى الرغم من وجود بعض التحديات إلا أن الكلية تسعى للارتقاء برسالتها
                    إلى مستوى الطموح من خلال العمل الجماعي والشعور بالمسؤولية وقبول التحدي، وما حققناه
                    من نجاحات يجعلنا أكثر تفاؤلاً وحرصاً على بلوغ المبتغى، وتحقيق التميّز الذي يضعنا في
                    المكان المكشوف على خريطة العالم.
                  </p>
                  <div className="pt-4 border-t border-gray-100 mt-4">
                    <p className="font-bold text-[#0f3057]">عميدة كلية الآداب</p>
                    <p className="font-bold text-[#c9a227]">الأستاذة الدكتورة رانيه العقاربة</p>
                  </div>
                </Prose>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">أخبار وإعلانات</h3>
              <NewsGrid>
                {NEWS.map((n: any, i: number) => (
                  <NewsCard key={i} to={'/f-item/arts/news/' + i} title={n.t} date={n.d} img={n.img} excerpt={n.excerpt} />
                ))}
              </NewsGrid>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">روابط مهمة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {IMPORTANT_LINKS.map((l) => <LinkRow key={l.name} name={l.name} url={l.url} />)}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">الأقسام الأكاديمية</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { id: 'dep-arabic', name: 'اللغة العربية وآدابها' },
                  { id: 'dep-english', name: 'اللغة الإنجليزية وآدابها' },
                  { id: 'dep-european', name: 'اللغات الأوروبية' },
                  { id: 'dep-translation', name: 'الترجمة' }
                ].map((d) => (
                  <button key={d.id} onClick={() => setActiveItem(d.id)}
                    className="p-7 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-[#c9a227] transition-all text-center group">
                    <div className="w-12 h-12 rounded-xl bg-[#0f3057] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <BookOpen className="w-6 h-6 text-[#c9a227]" />
                    </div>
                    <h4 className="font-bold text-[#0f3057] text-sm leading-snug">{d.name}</h4>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'about-vision':
        return (
          <div className="space-y-8">
            <PageTitle title="الرؤية والرسالة والأهداف" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src={CAMPUS_IMG} alt="كلية الآداب" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5">
                  <Eye className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">رؤية الكلية</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  رفد الطلبة بالمؤهلات العلمية، والخبرات المعرفية العالية الجودة، وتطوير البحث العلمي
                  وإثرائه، وتعزيز القيم الوطنية والعربية والإسلامية والإنسانية لدى الطلبة، وتهيئة سبل
                  الإبداع والابتكار والتفكير لديهم، وتنمية روح المسؤولية، والعمل الخلاق عندهم، للإسهام
                  في تنمية الوطن والأمة.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5">
                  <Target className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">رسالة الكلية</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  نحو تميز علمي في الآداب واللغات والإسهام في مجتمع المعرفة.
                </p>
              </div>
            </div>
            <Prose>
              <p className="font-bold text-[#0f3057] text-lg">أهداف الكلية</p>
              <p>
                تهدف الكلية إلى تحفيز البحث العلمي، ومراجعة البرامج الأكاديمية، وتطوير عملها وخططها،
                وتفعيل الأنشطة الطلابية، مع الأخذ بعين الاعتبار مواكبة مقتضيات العصر، لا بد لتحقيق ذلك
                كله، من الانفتاح على الكليات المماثلة محلياً وعالمياً، والتواصل معها لتبادل الخبرات ما
                أمكن.
              </p>
            </Prose>
          </div>
        );

      case 'about-plan':
        return (
          <div className="space-y-8">
            <PageTitle title="الخطة الاستراتيجية" sub="الخطة الاستراتيجية لكلية الآداب 2023 – 2025" />
            <DocRow
              name="الخطة الاستراتيجية لكلية الآداب 2023-2025"
              url="https://www.mutah.edu.jo/ar/arts/Documents/%D8%A7%D9%84%D8%AE%D8%B7%D8%A9%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B1%D8%A7%D8%AA%D9%8A%D8%AC%D9%8A%D8%A9%20%D9%84%D9%83%D9%84%D9%8A%D8%A9%20%D8%A7%D9%84%D8%A7%D9%93%D8%AF%D8%A7%D8%A8.pdf"
            />
          </div>
        );

      case 'about-dean':
        return (
          <div className="space-y-8">
            <PageTitle title="مكتب العميد" />
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 shrink-0 bg-gray-50 rounded-3xl p-5 border border-gray-100 text-center">
                <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-[#0f3057]">
                  <img src={DEAN_IMG} alt="عميدة كلية الآداب" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-[#0f3057] leading-snug">الاستاذة الدكتورة رانيه العقاربه</h3>
                <p className="text-[#c9a227] font-bold text-sm mt-1">عميدة كلية الآداب</p>
              </div>
              <div className="w-full md:w-2/3">
                <PersonGrid people={DEAN_OFFICE} />
              </div>
            </div>
          </div>
        );

      case 'about-council':
        return (
          <div className="space-y-8">
            <PageTitle title="مجلس الكلية" sub={`أعضاء مجلس كلية الآداب — ${COUNCIL.length} أعضاء`} />
            <PersonGrid people={COUNCIL} />
          </div>
        );

      case 'dep-translation':
      case 'tr-home':
        return (
          <div className="space-y-8">
            <PageTitle title="قسم الترجمة" sub="كلية الآداب :: جامعة مؤتة — من أجل بيئة تعليمية للتفوق المهني" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/arts/PublishingImages/Faculty%20of%20Arts%20Image.jpg" alt="قسم الترجمة" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p className="font-bold text-[#0f3057] text-lg">كلمة ترحيبية</p>
              <p>
                يعد قسم الترجمة في جامعة مؤتة الاول من نوعه الذي يخدم إقليم الجنوب في الأردن والذي يمنح
                شهادة بكالوريوس في الترجمة، اذ تم تأسيسه عام ٢٠١٧ ضمن قسم اللغة الإنجليزية وآدابها ثم
                أصبح قسماً مستقلاً عام ٢٠٢٢. يعتبر قسم الترجمة من الأقسام التي تتبع أساليب التدريس
                الحديثة التي تقدم البرامج الدراسية بطريقة مميزة لإعداد مترجمين مجهزين تجهيزاً جيداً من
                الناحية اللغوية الى جانب الإدراك المعرفي من الناحية الثقافية وذلك لتعزيز التواصل بين
                المجتمعات.
              </p>
              <p>
                تتمحور أهداف قسم الترجمة حول المجتمع المحلي إذ يهدف القسم الى ترسيخ قيم المجتمع سعياً
                الى إيصالها الى مختلف مجتمعات العالم من خلال إنتاج مشاريع مرئية ومسموعة تحاكي القيم
                المجتمعية بالإضافة الى ابتكار مشاريع قابلة للتطبيق على أرض الواقع.
              </p>
            </Prose>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">أخبار وإعلانات القسم</h3>
              <div className="flex flex-col gap-3">
                {[
                  { t: 'قسم الترجمة ينظم فعالية عرض ومناقشة فيلم', d: '19/5/2025' },
                  { t: 'دعوة عامة لحضور عرض فيلم ومناقشة', d: '19/5/2025' },
                  { t: 'نادي القصة القصيرة في الترجمة - الجلسة الحادية عشرة', d: '7/5/2025' },
                  { t: 'نادي القصة القصيرة في الترجمة - الجلسة العاشرة', d: '7/4/2025' }
                ].map((n) => (
                  <div key={n.t} className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-4 hover:border-[#c9a227] transition-colors">
                    <span className="w-1.5 h-10 rounded-full bg-[#c9a227] shrink-0" />
                    <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-snug">{n.t}</p>
                    <span className="text-xs font-bold text-gray-400 shrink-0" dir="ltr">{n.d}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">جديد الكلية</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {IMPORTANT_LINKS.map((l) => <LinkRow key={l.name} name={l.name} url={l.url} />)}
              </div>
            </div>
          </div>
        );

      case 'tr-staff':
        return (
          <div className="space-y-8">
            <PageTitle title="الهيئة التدريسية" sub="قسم الترجمة" />
            <PersonGrid people={[
              { name: 'الدكتور محمد الضلاعين', role: 'أستاذ مشارك ب' },
              { name: 'الدكتور نادر البكور', role: 'أستاذ مساعد ب — رئيس القسم' },
              { name: 'الدكتور هيثم الدريبي', role: 'أستاذ مساعد ب' },
              { name: 'الدكتورة لبنى عبد الهادي', role: 'أستاذ مساعد ب' }
            ]} />
          </div>
        );

      case 'tr-programs':
        return (
          <div className="space-y-8">
            <PageTitle title="البرامج الدراسية" sub="قسم الترجمة" />
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-7 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0f3057] flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 text-[#c9a227]" />
              </div>
              <div>
                <h3 className="font-bold text-[#0f3057] text-lg">بكالوريوس ترجمة</h3>
                <p className="text-sm text-gray-500 mt-1">درجة البكالوريوس — قسم الترجمة</p>
              </div>
            </div>
          </div>
        );

      case 'tr-strategy':
      case 'tr-courses':
      case 'tr-plans':
      case 'tr-forms':
      case 'tr-achievements':
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, ARTS_LINKS)} sub="قسم الترجمة" />
          </div>
        );

      case 'dep-arabic':
      case 'dep-english':
      case 'dep-european':
        return (
          <div className="space-y-8">
            <PageTitle title={'قسم ' + getSectionTitle(activeItem, ARTS_LINKS)} sub="كلية الآداب :: جامعة مؤتة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/arts/PublishingImages/Faculty%20of%20Arts%20Image.jpg" alt={getSectionTitle(activeItem, ARTS_LINKS)} className="w-full max-h-[420px] object-cover" />
            </div>
          </div>
        );

      case 'prog-bachelor':
      case 'prog-graduate':
      case 'prog-other':
      case 'programs': {
        const BSC = [
          { n: 'بكالوريوس اللغة الإنجليزية وآدابها', d: 'قسم اللغة الإنجليزية وآدابها' },
          { n: 'بكالوريوس اللغة العربية وآدابها', d: 'قسم اللغة العربية وآدابها' },
          { n: 'بكالوريوس اللغات الأوروبية', d: 'قسم اللغات الأوروبية' },
          { n: 'بكالوريوس ترجمة', d: 'قسم الترجمة' },
          { n: 'بكالوريوس اللغة الإنجليزية التطبيقية', d: 'قسم اللغة الإنجليزية وآدابها' }
        ];
        const GRAD = [
          { n: 'ماجستير عربي شعبة الدراسات اللغوية', d: 'قسم اللغة العربية وآدابها' },
          { n: 'ماجستير عربي شعبة الدراسات الأدبية', d: 'قسم اللغة العربية وآدابها' },
          { n: 'ماجستير الأدب الإنجليزي', d: 'قسم اللغة الإنجليزية وآدابها' },
          { n: 'ماجستير اللغويات التطبيقية', d: 'قسم اللغة الإنجليزية وآدابها' },
          { n: 'دكتوراه عربي شعبة الدراسات اللغوية', d: 'قسم اللغة العربية وآدابها' },
          { n: 'دكتوراه عربي شعبة الدراسات الأدبية', d: 'قسم اللغة العربية وآدابها' }
        ];

        if (activeItem === 'programs') {
          return (
            <div className="space-y-8">
              <PageTitle title="البرامج الأكاديمية" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'prog-bachelor', name: 'البكالوريوس', count: '5 برامج' },
                  { id: 'prog-graduate', name: 'الدراسات العليا', count: '6 برامج' },
                  { id: 'prog-other', name: 'برامج أخرى', count: '' }
                ].map((c) => (
                  <button key={c.id} onClick={() => setActiveItem(c.id)}
                    className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md hover:border-[#c9a227] transition-all text-center group">
                    <div className="w-12 h-12 rounded-xl bg-[#0f3057] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-6 h-6 text-[#c9a227]" />
                    </div>
                    <h3 className="font-bold text-xl text-[#0f3057] mb-1">{c.name}</h3>
                    {c.count && <p className="text-sm text-gray-500">{c.count}</p>}
                  </button>
                ))}
              </div>
            </div>
          );
        }

        if (activeItem === 'prog-other') {
          return (
            <div className="space-y-8">
              <PageTitle title="برامج أخرى" />
            </div>
          );
        }

        const items = activeItem === 'prog-bachelor' ? BSC : GRAD;
        return (
          <div className="space-y-8">
            <PageTitle title={activeItem === 'prog-bachelor' ? 'برامج البكالوريوس' : 'برامج الدراسات العليا'} />
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f3057] text-white">
                    <th className="px-5 py-3.5 text-right font-bold w-14">#</th>
                    <th className="px-5 py-3.5 text-right font-bold">البرنامج</th>
                    <th className="px-5 py-3.5 text-right font-bold w-64">القسم</th>
                    <th className="px-5 py-3.5 text-center font-bold w-40">الخطط الدراسية</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, i) => (
                    <tr key={it.n} className={i % 2 === 0 ? 'border-t border-gray-100 bg-white' : 'border-t border-gray-100 bg-[#F8FAFC]'}>
                      <td className="px-5 py-3.5 text-gray-400 font-mono text-xs">{i + 1}</td>
                      <td className="px-5 py-3.5 font-bold text-[#0f3057]">{it.n}</td>
                      <td className="px-5 py-3.5 text-gray-600">{it.d}</td>
                      <td className="px-5 py-3.5 text-center">
                        <span className="inline-flex items-center gap-1.5 text-[#c9a227] text-xs font-bold">
                          <BookOpen size={14} /> الخطط الدراسية
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Attachments files={items.flatMap((it) => samplePair('الخطة الدراسية - ' + it.n))} />
          </div>
        );
      }

      case 'conferences':
        return (
          <div className="space-y-8">
            <PageTitle title="المؤتمرات" />
            <div className="flex flex-col gap-3">
              {[
                { t: 'ندوة في اللسانيات الحديثة (Modern Linguistics Symposium)', d: '26/7/2022' },
                { t: 'المؤتمر العلمي لكلية الآداب في جامعة مؤتة: الدراسات اللغويّة والأدبية لطلبة الدراسات العليا في الجامعات الأردنية', d: '15/4/2020' },
                { t: 'اليوم العالمي للغة العربية', d: '18/12/2019' },
                { t: 'المؤتمر الدولي السادس لكلية الآداب في جامعة مؤتة: الأدب واللغة منصة للتفاعل الحضاري', d: '7/2/2019' }
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-5 hover:border-[#c9a227] transition-colors">
                  <span className="w-1.5 h-12 rounded-full bg-[#c9a227] shrink-0" />
                  <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-relaxed">{c.t}</p>
                  <span className="text-xs font-bold text-gray-400 shrink-0" dir="ltr">{c.d}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-8">
            <PageTitle title="الجوائز وبراءات الاختراع" />
            <div className="flex flex-col gap-4">
              {[
                { t: 'إنجاز جديد لجامعة مؤتة: المركز الأول في مسابقة الترجمة مع أربع جامعات أردنية', d: '10/4/2025', dep: 'قسم' },
                { t: 'فريق جامعة مؤتة يحقق الفوز في أولمبياد اللغة الإنجليزية 2024 بالأداء المسرحي', d: '12/8/2024', dep: 'قسم' },
                { t: 'جائزة كلية الآداب جامعة الشارقة للعطاء الأكاديمي المتميز 2011/2012 — الأستاذ الدكتور ماهر مبيضين', dep: 'قسم اللغة العربية وآدابها' },
                { t: 'جائزة كلية الآداب جامعة الشارقة للعطاء الأكاديمي المتميز وخدمة المجتمع المحلي 2012/2013 — الأستاذ الدكتور ماهر مبيضين', dep: 'قسم اللغة العربية وآدابها' },
                { t: 'فاز الأستاذ الدكتور أنور أبو سويلم بجائزة شومان للعلماء الشباب.', dep: 'قسم اللغة العربية وآدابها' },
                { t: 'فاز الأستاذ الدكتور سمير الدروبي بجائزة الدولة لتحقيق التراث.', dep: 'قسم اللغة العربية وآدابها' },
                { t: 'مختبر اللغويات الحديث', dep: 'قسم اللغة الإنجليزية وآدابها' }
              ].map((a, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 hover:border-[#c9a227] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0f3057] flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5 text-[#c9a227]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-[#0f3057] text-[15px] leading-relaxed mb-2">{a.t}</p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="inline-block text-[11px] font-bold text-[#0f3057] px-3 py-1 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/20">{a.dep}</span>
                        {a.d && <span className="text-xs font-bold text-gray-400" dir="ltr">{a.d}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'forms':
        return (
          <div className="space-y-8">
            <PageTitle title="النماذج" sub="أدلة الإرشاد الأكاديمي لطلبة أقسام الكلية" />
            <div className="flex flex-col gap-3">
              {[
                { n: 'دليل الإرشاد الأكاديمي لطلبة قسم الترجمة', u: 'https://www.mutah.edu.jo/ar/arts/FacultyForms/%D8%AF%D9%84%D9%8A%D9%84%20%D8%A7%D9%84%D8%A5%D8%B1%D8%B4%D8%A7%D8%AF%20%D8%A7%D9%84%D8%A3%D9%83%D8%A7%D8%AF%D9%8A%D9%85%D9%8A%20%D9%84%D8%B7%D9%84%D8%A8%D8%A9%20%D9%82%D8%B3%D9%85%20%D8%A7%D9%84%D8%AA%D8%B1%D8%AC%D9%85%D8%A9.pdf' },
                { n: 'دليل الإرشاد الأكاديمي لطلبة قسم اللغة العربية وآدابها', u: 'https://www.mutah.edu.jo/ar/arts/FacultyForms/%D8%AF%D9%84%D9%8A%D9%84%20%D8%A7%D9%84%D8%A5%D8%B1%D8%B4%D8%A7%D8%AF%20%D8%A7%D9%84%D8%A3%D9%83%D8%A7%D8%AF%D9%8A%D9%85%D9%8A%20%D9%84%D8%B7%D9%84%D8%A8%D8%A9%20%D9%82%D8%B3%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D8%A9%20%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D8%A9%20%D9%88%D8%A2%D8%AF%D8%A7%D8%A8%D9%87%D8%A7.pdf' },
                { n: 'دليل الإرشاد الأكاديمي لطلبة قسم اللغات الأوروبية', u: 'https://www.mutah.edu.jo/ar/arts/FacultyForms/%D8%AF%D9%84%D9%8A%D9%84%20%D8%A7%D9%84%D8%A5%D8%B1%D8%B4%D8%A7%D8%AF%20%D8%A7%D9%84%D8%A3%D9%83%D8%A7%D8%AF%D9%8A%D9%85%D9%8A%20%D9%84%D8%B7%D9%84%D8%A8%D8%A9%20%D9%82%D8%B3%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D8%A7%D8%AA%20%D8%A7%D9%84%D8%A3%D9%88%D8%B1%D9%88%D8%A8%D9%8A%D8%A9.pdf' },
                { n: 'دليل الإرشاد الأكاديمي لطلبة قسم اللغة الإنجليزية وآدابها', u: 'https://www.mutah.edu.jo/ar/arts/FacultyForms/%D8%AF%D9%84%D9%8A%D9%84%20%D8%A7%D9%84%D8%A5%D8%B1%D8%B4%D8%A7%D8%AF%20%D8%A7%D9%84%D8%A3%D9%83%D8%A7%D8%AF%D9%8A%D9%85%D9%8A%20%D9%84%D8%B7%D9%84%D8%A8%D8%A9%20%D9%82%D8%B3%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D8%A9%20%D8%A7%D9%84%D8%A5%D9%86%D8%AC%D9%84%D9%8A%D8%B2%D9%8A%D8%A9%20%D9%88%D8%A2%D8%AF%D8%A7%D8%A8%D9%87%D8%A7.pdf' }
              ].map((f) => <DocRow key={f.n} name={f.n} url={f.u} />)}
            </div>
          </div>
        );

      case 'about-staff':
        return (
          <div className="space-y-8">
            <PageTitle title="الموظفون الإداريون" />
            <PersonGrid people={[
              { name: 'وزيرة الطراونة', role: 'رئيسة الديوان وسكرتيرة عميد كلية الآداب' },
              { name: 'عامر الضمور', role: 'مشرف مختبر' },
              { name: 'صخر التخاينة', role: 'إداري' },
              { name: 'جمعة النوايشة', role: 'عامل بريد' },
              { name: 'وليد الطراونة', role: 'عامل بريد' }
            ]} />
          </div>
        );

      case 'about-committees':
        return (
          <div className="space-y-8">
            <PageTitle title="كلية الآداب: لجان الكلية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/arts/PublishingImages/arts.jpg" alt="لجان كلية الآداب" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p className="font-bold text-[#0f3057]">
                فاستناداً للمادة رقم (14) فقرة (أ) من قانون الجامعات الأردنية المعمول به في جامعة مؤتة،
                وبناءً على تنسيب مجالس الأقسام في الكلية، يوصي مجلس الكلية بأن تكون لجان كلية الآداب
                للعام الجامعي 2023/2024م على النحو الآتي:
              </p>
            </Prose>
            <div className="flex flex-col gap-8">
              {COMMITTEES.map((c) => (
                <div key={c.title}>
                  <div className="bg-[#0f3057] text-white px-6 py-3 rounded-xl font-bold mb-4 inline-block">{c.title}</div>
                  <div className="overflow-x-auto rounded-2xl border border-gray-100">
                    <table className="w-full text-sm">
                      <tbody>
                        {c.rows.map((r, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'border-t border-gray-100 bg-white' : 'border-t border-gray-100 bg-[#F8FAFC]'}>
                            <td className="px-4 py-3.5 text-gray-400 font-mono text-xs w-12">{i + 1}</td>
                            {r[0] ? <td className="px-4 py-3.5 text-gray-600">{r[0]}</td> : null}
                            <td className="px-4 py-3.5 font-semibold text-[#0f3057]">{r[1]}</td>
                            <td className="px-4 py-3.5 w-56">
                              {r[2] ? (
                                <span className="inline-block text-xs font-bold text-[#0f3057] px-3 py-1 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/20">{r[2]}</span>
                              ) : null}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'about-former':
        return (
          <div className="space-y-8">
            <PageTitle title="عمداء الكلية السابقون" />
            <div className="flex flex-col gap-3">
              {FORMER_DEANS.map((d, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-[#c9a227] transition-colors">
                  <span className="w-8 h-8 rounded-full bg-[#0f3057] text-[#c9a227] text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="font-bold text-[#0f3057] text-[15px] flex-1 leading-snug">{d.name}</p>
                  <span className="text-xs font-bold text-gray-500 shrink-0" dir="ltr">{d.period}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'departments':
        return (
          <div className="space-y-8">
            <PageTitle title="الأقسام الأكاديمية" sub="كلية الآداب — جامعة مؤتة" />
            {true ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { id: 'dep-arabic', name: 'اللغة العربية وآدابها' },
                  { id: 'dep-english', name: 'اللغة الإنجليزية وآدابها' },
                  { id: 'dep-european', name: 'اللغات الأوروبية' },
                  { id: 'dep-translation', name: 'الترجمة' }
                ].map((d) => (
                  <button key={d.id} onClick={() => setActiveItem(d.id)}
                    className="p-7 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-[#c9a227] transition-all text-right flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0f3057] flex items-center justify-center shrink-0">
                      <BookOpen className="w-6 h-6 text-[#c9a227]" />
                    </div>
                    <h4 className="font-bold text-[#0f3057] leading-snug">{d.name}</h4>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-8">
            <PageTitle title="إتصل بنا" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 flex flex-col gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#0f3057] mb-0.5">هاتف</p>
                    <p className="text-gray-600" dir="ltr">+962-03-2372380</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#0f3057] mb-0.5">البريد الإلكتروني</p>
                    <p className="text-gray-600" dir="ltr">Unit_admin@mutah.edu.jo</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#0f3057] mb-0.5">فيسبوك</p>
                    <a href="https://www.facebook.com/mutaharts/" target="_blank" rel="noreferrer" className="text-gray-600" dir="ltr">facebook.com/mutaharts</a>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <div className="flex items-start gap-3">
                  <MapPin className="text-[#c9a227] w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#0f3057] mb-3">العنوان</h4>
                    <p className="text-gray-700 leading-[2]">
                      كلية الآداب<br />
                      جامعة مؤتة<br />
                      الكرك — الأردن
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'links':
        return (
          <div className="space-y-8">
            <PageTitle title="روابط هامة" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {IMPORTANT_LINKS.map((l) => <LinkRow key={l.name} name={l.name} url={l.url} />)}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, ARTS_LINKS)} />
            <Waiting />
          </div>
        );
    }
  };

  return (
    <DeanshipShell
      brand="كلية الآداب"
      tagline="من أجل بيئة تعليمية للتفوق المهني — أربعة أقسام أكاديمية في الآداب واللغات منذ عام ١٩٨٤."
      heroImage={CAMPUS_IMG}
      links={ARTS_LINKS}
      activeItem={activeItem}
      setActiveItem={setActiveItem}
    >
      {render()}
    </DeanshipShell>
  );
}
