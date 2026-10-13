import { useTabRoute } from "../../nav";
import React, { useState } from 'react';
import {
  DeanshipShell, PageTitle, Prose, DocRow, LinkRow, NumList, Waiting,
  getSectionTitle, type NavLink
} from './DeanshipShell';
import { Eye, Target, Star, CheckCircle, Phone, Mail, MapPin, Users, Info, FileText } from 'lucide-react';

const DSA_STAFF: { role: string; name: string; ext?: string; email?: string; f?: boolean }[] = [
  { role: 'عميد شؤون الطلبة', name: 'ماهر احمد علي المبيضين', ext: '6043' },
  { role: 'نائب عميد شؤون الطلبة', name: 'عمر جميل مفلح الجعافرة', ext: '6048' },
  { role: 'مساعد عميد شؤون الطلبة', name: 'غيث محمد مدالله المحادين' },
  { role: 'مساعدة عميد شؤون الطلبة', name: 'زينب صالح سليم الكساسبة', f: true },
  { role: 'أمين سر المجلس التأديبي', name: 'باسم عبدالمجيد محمد المعايطة', email: 'basem22@mutah.edu.jo' },
  { role: 'رئيس الديوان / ديوان عمادة شؤون الطلبة', name: 'مطر سالم مطر السبوع', ext: '3050', email: 'matar22@mutah.edu.jo' },
  { role: 'مكلف أعمال رئيس فرع الصادر / ديوان عمادة شؤون الطلبة', name: 'جميل طه احميدان الذنيبات', ext: '3050', email: 'jameel22@mutah.edu.jo' },
  { role: 'ديوان عمادة شؤون الطلبة', name: 'سامي عبدالرحمن احمد البواليز', ext: '3050', email: 'sami22@mutah.edu.jo' },
  { role: 'عامل بريد', name: 'فراس حمد موسى عودة البيايضة', ext: '3050', email: 'feras22@mutah.edu.jo' },
  { role: 'مندوب لوازم / ديوان عمادة شؤون الطلبة', name: 'مجيد عبدالرحمن ياسين القويدر', ext: '3058', email: 'majeed22@mutah.edu.jo' },
  { role: 'مديرة دائرة الخدمات الطلابية', name: 'هنادي ياسين ضامن المجالي', ext: '3236', email: 'hanadi22@mutah.edu.jo', f: true },
  { role: 'رئيس شعبة القروض والإعفاءات / دائرة الخدمات الطلابية', name: 'سليمان محمد فلاح الرواشدة', ext: '3236', email: 'suliman1978@mutah.edu.jo' },
  { role: 'رئيس شعبة التأمينات / دائرة الخدمات الطلابية', name: 'احمد سالم سلامه القطاونه', ext: '3579', email: 'ahmad22@mutah.edu.jo' },
  { role: 'رئيس شعبة سجل الطالب / دائرة الخدمات الطلابية', name: 'حسان مرجي سليمان السحيم', ext: '3236', email: 'hassan78@mutah.edu.jo' },
  { role: 'رئيس شعبة الحاسوب / دائرة الخدمات الطلابية', name: 'احمد فلاح محمد الضمور', ext: '3236', email: 'moh12119_79@mutah.edu.jo' },
  { role: 'مدير مكتب الإرشاد الوظيفي ومتابعة الخريجين', name: 'وليد علي ذياب المجالي', ext: '3399', email: 'waleedmajali22@mutah.edu.jo' },
  { role: 'رئيس شعبة متابعة الخريجين / مكتب الإرشاد الوظيفي', name: 'رعد محمد عبدالرحمن الطراونة', ext: '3050', email: 'raedtarawnh694@gmail.com' },
  { role: 'مدير دائرة النشاط الثقافي والفني', name: 'هشال عبدالله عبدالعزيز العضايله', ext: '3214', email: 'hashal22@mutah.edu.jo' },
  { role: 'رئيس شعبة الموسيقى / دائرة النشاط الثقافي والفني', name: 'شامان جريس موسى القسوس', ext: '3214', email: 'shaman22@mutah.edu.jo' },
  { role: 'مشرف نشاط فني / دائرة النشاط الثقافي والفني', name: 'رائد راضي عبدالله المعايطه', ext: '3214', email: 'raed@mutah.edu.jo' },
  { role: 'مكلف بأعمال مهام رئيس فرع الخزف / دائرة النشاط الثقافي والفني', name: 'رائد حسن اعبيد الضمور', ext: '3214', email: 'raed22@mutah.edu.jo' },
  { role: 'رئيس شعبة الإقامات / مكتب الطلبة الوافدين', name: 'يحيى احمد سليم المحادين', email: 'yahya22@mutah.edu.jo' },
  { role: 'قائم بأعمال رئيس شعبة رعاية الطلبة الوافدين / مكتب الطلبة الوافدين', name: 'محمد عبيدالله هلال الفرايه', email: 'mohfarayeh22@mutah.edu.jo' },
  { role: 'مكلف بمهام أعمال مدير دائرة الأنشطة الرياضية', name: 'مدالله وادي حمود المجالي', email: 'madallah22@mutyah.edu.jo' },
  { role: 'مشرف رياضة ألعاب قوى / دائرة الأنشطة الرياضية', name: 'محمد مدالله مفلح الصرايره', email: 'mohsarayrih22@mutah.edu.jo' },
  { role: 'مشرف رياضة كرة طائرة / دائرة الأنشطة الرياضية', name: 'غيث عصام محمد المعايطه', email: 'qaith22@mutah.edu.jo' },
  { role: 'مراقب ملاعب / دائرة الأنشطة الرياضية', name: 'زياد مفرح محمد الطراونه', email: 'zyadmtar22@mutah.edu.jo' },
  { role: 'مساعد سفرجي / دائرة الأنشطة الرياضية', name: 'وليد مازن جميل البيايضه', email: 'waleedbayaydah22@mutah.ed.jo' },
  { role: 'مشرف أندية طلابية / دائرة الأنشطة الرياضية', name: 'محمد عبدالمهدي سليمان المعايطه', email: 'mohmaytah22@mutah.edu.jo' },
  { role: 'مدير دائرة الهيئات الطلابية والأنشطة الحزبية', name: 'ايمن نايل عبدالفتاح الضمور', ext: '3052', email: 'ayman22@mutah.edu.jo' },
  { role: 'رئيس فرع متابعة الأنشطة / دائرة الهيئات الطلابية', name: 'نضال مدالله عبدربه الرهايفه', email: 'nedalrahayfeh22@mutah.edu.jo' },
  { role: 'رئيس شعبة النشاط الاجتماعي', name: 'نضال عقلة اسماعيل الرواشدة', email: 'nedalrawahdeh22@mutah.edu.jo' },
  { role: 'رئيس شعبة الإشراف على الطالبات / دائرة المنازل الداخلية', name: 'اماني عبدالحق عبدالله الضمور', email: 'Amany22@mutah.edu.jo', f: true },
  { role: 'مشرفة سكن / دائرة المنازل الداخلية', name: 'ايمان عبدالفتاح عطالله المجالي', email: 'eman22@mutah.edu.jo', f: true },
  { role: 'مشرفة سكن / دائرة المنازل الداخلية', name: 'عالية موسى جراد الطراونه', email: 'alyah22@mutah.edu.jo', f: true },
  { role: 'مشرفة سكن / دائرة المنازل الداخلية', name: 'ايمان كريم فارس المعايطه', email: 'emanmaaytah22@mutah.edu.jo', f: true },
  { role: 'مشرفة سكن / دائرة المنازل الداخلية', name: 'لحظه كريم حميد الجعافره', email: 'lahthajaafreh22@mutah.edu.jo', f: true },
  { role: 'مشرفة سكن / دائرة المنازل الداخلية', name: 'صالحه مدالله عساف النوايسه', email: 'salha22@mutah.edu.jo', f: true },
  { role: 'مشرفة سكن / دائرة المنازل الداخلية', name: 'استناد محمد مسلم المجالي', email: 'estenad22@mutah.edu.jo', f: true },
  { role: 'مشرفة سكن / دائرة المنازل الداخلية', name: 'رشا سالم عطالله المعايطه', email: 'rasha22@mutah.edu.jo', f: true },
  { role: 'مشرفة سكن / دائرة المنازل الداخلية', name: 'ختام عطالله سالم القراله', email: 'khetam22@mutah.edu.jo', f: true },
  { role: 'مشرفة سكن / دائرة المنازل الداخلية', name: 'اعتدال جميل عبدالرحيم الجعافره', email: 'aietidal@mutah.edu.jo', f: true },
  { role: 'مشرفة سكن / دائرة المنازل الداخلية', name: 'امل عودة حمدان العمرو', email: 'amal22@mutah.edu.jo', f: true },
  { role: 'مشرفة سكن / دائرة المنازل الداخلية', name: 'ايمان يونس صادق الصرايره', email: 'emansarayrih22@mutah.edu.jo', f: true },
  { role: 'مشرفة سكن / دائرة المنازل الداخلية', name: 'انصاف محمد سالم الصرايره', email: 'ansaf22@mutah.edu.jo', f: true },
  { role: 'مكتب الإرشاد الوظيفي ومتابعة الخريجين', name: 'زينات طه سالم الفقراء', email: 'zenat22@mutah.edu.jo', f: true },
  { role: 'مشرفة سكن / دائرة المنازل الداخلية', name: 'عبير كمال محمد ابراهيم', email: 'abeer22@mutah.edu.jo', f: true },
  { role: 'مشرفة سكن / دائرة المنازل الداخلية', name: 'زينب سالم خليل الحجوج', email: 'zaynab22@mutah.edu.jo', f: true }
];

const DSA_LINKS: NavLink[] = [
  { id: 'home', name: 'الرئيسية' },
  {
    id: 'about', name: 'عن العمادة',
    children: [
      { id: 'about-brief', name: 'عمادة شؤون الطلبة في سطور' },
      { id: 'about-dean', name: 'كلمة عميد شؤون الطلبة' },
      { id: 'about-plan', name: 'الخطة الاستراتيجية' },
      { id: 'about-vision', name: 'الرؤية والرسالة والاهداف' },
      { id: 'about-structure', name: 'الهيكل التنظيمي' },
      {
        id: 'about-diwan', name: 'ديوان عمادة شؤون الطلبة',
        children: [
          { id: 'diwan-building', name: 'شعبة اللوازم والمباني' },
          { id: 'diwan-out', name: 'فرع الصادر' },
          { id: 'diwan-in', name: 'فرع الوارد' }
        ]
      },
      { id: 'about-karak-center', name: 'مركز الكرك للتطوير الوظيفي' },
      {
        id: 'about-dean-office', name: 'الشعب التابعة لمكتب العميد',
        children: [{ id: 'office-financial', name: 'شعبة المتابعات المالية' }]
      },
      { id: 'about-services', name: 'الخدمات المقدمة للطلبة' },
      { id: 'about-honor', name: 'لوحة شرف الخدمة' },
      { id: 'about-bulletins', name: 'نشرات العمادة' },
      { id: 'about-suggestions', name: 'صندوق الشكاوى والاقتراحات' },
      { id: 'about-staff', name: 'الكادر الإداري' }
    ]
  },
  {
    id: 'services', name: 'الخدمات والتشغيل والمساعدات',
    children: [
      { id: 'srv-electronic', name: 'الخدمات الالكترونية' },
      { id: 'srv-guide', name: 'دليل الطالب' },
      { id: 'srv-medical', name: 'المركز الصحي' },
      { id: 'srv-work', name: 'طلبات التشغيل' },
      { id: 'srv-newstudents', name: 'نشرة إرشادية للطلبة الجدد' },
      { id: 'srv-fees', name: 'تأجيل الرسوم الجامعية' },
      { id: 'srv-antismoking', name: 'استبيان مكافحة التبغ والتدخين' },
      { id: 'srv-manaseer', name: 'طلبات منح جمعية مؤسسة زياد المناصير الخيرية' }
    ]
  },
  {
    id: 'offices', name: 'المكاتب',
    children: [
      {
        id: 'off-career', name: 'مكتب الإرشاد الوظيفي ومتابعة الخريجين',
        children: [
          { id: 'career-brief', name: 'نبذة عن المكتب' },
          { id: 'career-strategy', name: 'الرؤية، الرسالة والقيم' },
          { id: 'career-services', name: 'خدمات المكتب' },
          { id: 'career-specialist', name: 'أخصائي إرشاد وظيفي' },
          { id: 'career-training', name: 'شعبة التدريب (منسق إداري)' },
          { id: 'career-partnerships', name: 'منسق نشاطات وشراكات' },
          { id: 'career-alumni', name: 'شعبة الخريجين (منسق إداري)' },
          { id: 'career-contact', name: 'اتصل بنا' }
        ]
      },
      {
        id: 'off-international', name: 'مكتب الطلبة الدوليين',
        children: [
          { id: 'intl-brief', name: 'نبذة عن المكتب' },
          { id: 'intl-care', name: 'شعبة رعاية الطلبة الوافدين' },
          { id: 'intl-accom', name: 'شعبة الإقامات' },
          { id: 'intl-club', name: 'نادي الطلبة الوافدين' },
          { id: 'intl-services', name: 'الخدمات المقدمة للطلبة الوافدين' },
          { id: 'intl-contact', name: 'اتصل بنا' }
        ]
      },
      { id: 'off-cases', name: 'مكتب القضايا الطلابية' }
    ]
  },
  {
    id: 'departments', name: 'دوائر العمادة',
    children: [
      {
        id: 'dep-student-services', name: 'دائرة الخدمات الطلابية',
        children: [
          { id: 'ss-about', name: 'نبذة عن الدائرة' },
          { id: 'ss-status', name: 'شعبة أحوال الطلبة' },
          { id: 'ss-insurance', name: 'شعبة التأمينات للطلبة' },
          { id: 'ss-loans', name: 'شعبة القروض والاعفاءات' },
          { id: 'ss-computer', name: 'شعبة الخدمات الحاسوبية' },
          { id: 'ss-disabilities', name: 'شعبة ذوي الاعاقة' }
        ]
      },
      {
        id: 'dep-activities', name: 'دائرة الهيئات والنشاطات الطلابية',
        children: [
          { id: 'act-about', name: 'نبذة عن الدائرة' },
          { id: 'act-union', name: 'شعبة الأندية الطلابية واتحاد الطلبة' },
          { id: 'act-alumni', name: 'شعبة شؤون التخريج والفرق الطلابية' },
          { id: 'act-party', name: 'شعبة الانشطة الحزبية' },
          { id: 'act-initiatives', name: 'شعبة المبادرات والنشاط الإجتماعي' },
          {
            id: 'act-guidance', name: 'شعبة الارشاد والتوجيه الاكاديمي',
            children: [
              { id: 'gd-welcome', name: 'نبذة عن المكتب' },
              { id: 'gd-strategy', name: 'الخطة الاستراتيجية' },
              { id: 'gd-goals', name: 'الرؤية والرسالة والقيم والمهام والأهداف' },
              { id: 'gd-orgchart', name: 'الهيكل التنظيمي' },
              { id: 'gd-statistics', name: 'تقارير احصائية' },
              { id: 'gd-activities', name: 'نشاطات المكتب' },
              { id: 'gd-instructions', name: 'التعليمات والخطط والمعايير' },
              { id: 'gd-issues', name: 'القضايا التي يتعامل معها المكتب' },
              { id: 'gd-disabilities', name: 'شعبة ذوي الاعاقة' },
              { id: 'gd-forms', name: 'النماذج والاوراق المطلوبة' },
              { id: 'gd-faq', name: 'الاسئلة المتكررة' },
              { id: 'gd-staff', name: 'طاقم المكتب' },
              { id: 'gd-contact', name: 'اتصل بنا' }
            ]
          }
        ]
      },
      {
        id: 'dep-culture', name: 'دائرة النشاط الثقافي والفني والاعلام',
        children: [
          { id: 'cu-about', name: 'نبذة عن الدائرة' },
          { id: 'cu-culture', name: 'شعبة النشاط الثقافي' },
          { id: 'cu-music', name: 'شعبة الموسيقى والمسرح' },
          { id: 'cu-arts', name: 'شعبة الفنون الجميلة' },
          { id: 'cu-media', name: 'شعبة الاعلام' },
          { id: 'cu-porcelain', name: 'فرع الخزف' },
          { id: 'cu-design', name: 'فرع الخط والتصميم' }
        ]
      },
      {
        id: 'dep-sport', name: 'دائرة النشاط الرياضي',
        children: [
          { id: 'sp-about', name: 'نبذة عن الدائرة' },
          { id: 'sp-halls', name: 'شعبة الصالات والملاعب' },
          { id: 'sp-training', name: 'شعبة التدريب' },
          { id: 'sp-org', name: 'شعبة التنظيم' }
        ]
      },
      {
        id: 'dep-residence', name: 'دائرة المنازل الداخلية',
        children: [
          { id: 'res-about', name: 'نبذة عن الدائرة' },
          { id: 'res-supervision', name: 'شعبة الإشراف على الطالبات' },
          { id: 'res-followup', name: 'شعبة متابعة منازل الطالبات' }
        ]
      }
    ]
  },
  {
    id: 'international', name: 'الطلبة الدوليين',
    children: [
      { id: 'intl-welcome', name: 'كلمة ترحيبية' },
      { id: 'intl-care2', name: 'شعبة رعاية الطلبة الوافدين' },
      { id: 'intl-accom2', name: 'شعبة الإقامات' },
      { id: 'intl-club2', name: 'نادي الطلبة الوافدين' },
      { id: 'intl-services2', name: 'الخدمات' },
      { id: 'intl-contact2', name: 'اتصل بنا' }
    ]
  },
  { id: 'contact', name: 'إتصل بنا' },
  { id: 'yearbook', name: 'الكتاب السنوي' },
  { id: 'gallery', name: 'معرض الصور' }
];

export function StudentAffairs() {
  const [activeItem, setActiveItem] = useTabRoute('home');

  const render = () => {
    switch (activeItem) {
      case 'home':
        return (
          <div className="space-y-10">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="عمادة شؤون الطلبة" className="w-full max-h-[420px] object-cover" />
            </div>

            <Prose>
              <p className="font-bold text-[#0f3057] text-lg">عمادة شؤون الطلبة</p>
              <p>
                بدأت عمادة شؤون الطلبة في جامعة مؤتة كدائرة من دوائر الجامعة عند بداية إنشاء الجناح
                المدني فيها وحتى العام 1990، حيث صدر قرار مجلس التعليم العالي رقم (409) تاريخ
                13/1/1990 باعتمادها عمادة من عمادات الجامعة.
              </p>
              <p>
                تتولى عمادة شؤون الطلبة الإشراف الكامل على كل ما يتعلق بشؤون الطلبة أثناء دراستهم
                الجامعية من خلال دوائرها وموظفيها، وتقدم لهم الخدمات التي من شأنها تهيئة الجو الأكاديمي
                الملائم للطلبة.
              </p>
            </Prose>

            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">معلومات تهمك</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'تعليمات تأديب الطلبة المدنيين', img: 'https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/The%20disciplinary%20council.jpg' },
                  { name: 'اسس تنظيم إعلانات طلبة جامعة مؤتة/الجناح المدني', img: 'https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/Advertising.jpg' },
                  { name: 'تعليمات اتحاد الطلبة', img: 'https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/MU%20Students%20Union.jpg' },
                  { name: 'تعليمات الابتعاث للطلبة', img: 'https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/Scholarships.png' },
                  { name: 'تعليمات التامين الصحي للطلبة', img: 'https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/Insurance.jpg' },
                  { name: 'تعليمات صندوق دعم البحث العلمي للطلبة المبدعين في الجامعة', img: 'https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/Scientific%20Researcj%20Support%20Fund.jpg' },
                  { name: 'تعليمات التفوق العلمي', img: 'https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/Scientific%20excellence.jpeg' },
                ].map((it, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:border-[#c9a227] hover:shadow-md transition-all">
                    <img src={it.img} alt={it.name} loading="lazy" className="w-full h-[150px] object-cover bg-gray-100" />
                    <div className="p-5 flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#c9a227] shrink-0 mt-2" />
                      <p className="text-[14.5px] font-bold text-[#0f3057] leading-relaxed">{it.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">معلومات عامة</h3>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {[
                  { q: 'البطاقة الجامعية — MUcard', a: 'البطاقة الجامعية (MUcard) للطلبة في جامعة مؤتة.', img: 'https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/MUcard.png' },
                  { q: 'كيف يراجع الطالب المركز الصحي ؟', a: 'يراجع الطالب ديوان كليته قبل مراجعة مركز صحي الجامعة، ويبرز الهوية الجامعية للموظف المعني، ثم يقوم الموظف المعني بإعطاء الطالب إذن المركز الصحي إلكترونياً.', img: 'https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/Insurance.jpg' },
                  { q: 'ما هي مواصفات الصورة للهوية الجامعية؟', a: 'أن تكون الصورة حديثة · حجم الصورة 4×6 · أن يكون الرأس للذكور مكشوفاً · أن تكون الصورة باللباس المدني العادي.', img: 'https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/person.jpg' },
                  { q: 'ما هي إجراءات براءة الذمة وما هي أنواعها والفرق بينهما؟', a: 'يوجد نوعان من براءة الذمة: براءة الذمة الداخلية — يقوم الطالب بمراجعة وحدة القبول والتسجيل للحصول على النموذج، ثم يراجع المسجل السابق لترحيل ملفه ومراجعة المسجل الجديد لتثبيت التخصص الجديد؛ وبراءة الذمة الخارجية.', img: 'https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/free.jpg' },
                  { q: 'ما هي الاوراق المطلوبة لمنحة أبناء المصابين ( الجسيم ) ؟', a: 'بعد حصول الطالب على الرقم الجامعي يستخرج إثبات طالب من وحدة القبول والتسجيل، ويراجع مديرية الثقافة العسكرية ليحصل على كتاب موجه للجامعة، مع قرار التقاعد وقيد فردي مدني، ثم يتقدم بالمعاملة إلى وحدة الرئاسة محضراً معه قرار التقاعد حيث تعتمد معاملته اعتباراً من الفصل.', img: 'https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/Mill.jpg' },
                ].map((it, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex gap-4">
                    <img src={it.img} alt={"صورة توضيحية للسؤال: " + it.q} loading="lazy" className="w-14 h-14 rounded-xl object-cover bg-gray-100 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[15px] font-bold text-[#0f3057] leading-relaxed mb-2">{it.q}</p>
                      <p className="text-[13.5px] text-gray-600 leading-[1.95]">{it.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { id: 'about-vision', t: 'الرؤية والرسالة والأهداف' },
                { id: 'about-services', t: 'الخدمات المقدمة للطلبة' },
                { id: 'contact', t: 'إتصل بنا' }
              ].map((c) => (
                <button key={c.id} onClick={() => setActiveItem(c.id)}
                  className="p-7 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-[#c9a227] transition-all text-right">
                  <h4 className="font-bold text-[#0f3057] text-lg mb-2">{c.t}</h4>
                  <span className="text-[#c9a227] text-xs font-bold">عرض الصفحة ←</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'about-brief':
        return (
          <div className="space-y-8">
            <PageTitle title="عمادة شؤون الطلبة في سطور" />
            <Prose>
              <p className="font-bold text-[#0f3057] text-lg">عمادة شؤون الطلبة</p>
              <p>
                بدأت عمادة شؤون الطلبة في جامعة مؤتة كدائرة من دوائر الجامعة عند بداية إنشاء الجناح
                المدني فيها وحتى العام 1990، حيث صدر قرار مجلس التعليم العالي رقم (409) تاريخ
                13/1/1990 باعتمادها عمادة من عمادات الجامعة.
              </p>
              <p>
                تتولى عمادة شؤون الطلبة الإشراف الكامل على كل ما يتعلق بشؤون الطلبة أثناء دراستهم
                الجامعية من خلال دوائرها وموظفيها، وتقدم لهم الخدمات التي من شأنها تهيئة الجو الأكاديمي
                الملائم للطلبة. كما تطرح عدداً من البرامج الفصلية والأنشطة المتنوعة التي تهدف إلى تفعيل
                ثقافة الطلبة وتوسيع مداركهم، كما تساعدهم على تحصيل المعارف والخبرات النافعة وتعودهم على
                المشاركة الاجتماعية، وتؤكد انتماءهم إلى أمتهم ووطنهم، وتمنحهم فرصة ممارسة الأنشطة
                المتوافقة مع ميولهم ومواهبهم، تحت مظلة رسمية تمكنهم من المشاركة داخل الجامعة وخارجها.
              </p>
            </Prose>
          </div>
        );

      case 'about-vision':
        return (
          <div className="space-y-8">
            <PageTitle title="الرؤية والرسالة والأهداف" />

            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="الرؤية والرسالة والأهداف" className="w-full max-h-[420px] object-cover" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5">
                  <Eye className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">رؤية العمادة</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  نحو عمادة متميزة في تقديم أفضل الخدمات والأنشطة (المنهجية واللامنهجية) ومنبر حر
                  للطلبة يتسم بالقدرة التنافسية على المستوى العالمي والإقليمي والوطني المتقدم.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5">
                  <Target className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">رسالة العمادة</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  تبني مواهب الطلبة الابتكارية والإبداعية والمبادرات في سياق إعداد خريجين مؤهلين لسوق
                  العمل بأداء متميز، وتقديم أفضل خدمة للمجتمع المحلي والعالمي بكل يسر وشفافية وعدالة،
                  وذلك لرفد الوطن والمنطقة بالقوى البشرية المؤهلة التي تمكن من النهوض والقيام بالدور
                  الحضاري المنشود، مع المحافظة على أصالة التراث العربي الإسلامي، والمساهمة في نشر
                  المعرفة والتقدم الفكري، وتعزيز روح الانتماء الوطني والعمل الجماعي للوصول إلى حالة من
                  التنمية المستدامة، وإيجاد نسيج من علاقات التعاون مع معظم العمادات في الجامعات
                  الأردنية والعالمية.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <Star className="w-6 h-6 text-[#c9a227]" />
                <h3 className="text-xl font-bold text-[#0f3057]">قيم العمادة</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'التحسين المستمر في الأداء.',
                  'مكافأة الأداء المتميز.',
                  'منبر حر وصوت مسموع.',
                  'تبني أدوات التمكين الإيجابية.',
                  'العمل بروح الفريق.',
                  'إضافة خدمات جديدة في ضوء المستجدات المستقبلية.',
                  'استخدام وسائل التكنولوجيا.'
                ].map((v) => (
                  <div key={v} className="flex items-start gap-2.5 bg-[#F8FAFC] border border-gray-100 rounded-xl px-5 py-3.5">
                    <CheckCircle size={16} className="text-[#c9a227] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <Prose>
              <p className="font-bold text-[#0f3057] text-lg">فلسفة العمادة</p>
              <p>
                تقوم فلسفة العمادة على أسس إدارية حديثة تمزج بين الوسائل الإدارية والجهود الابتكارية
                لخدمة طلبة الجامعة، والمهارات الفنية المتخصصة من أجل الارتقاء بمستوى الأداء والتطوير
                المستمرين، ويتم ذلك من خلال تضافر الجهود كلها واستثمار الموارد البشرية والمادية المتاحة.
              </p>
              <p className="font-bold text-[#0f3057] text-lg pt-2">أهداف العمادة</p>
              <p>
                تهدف عمادة شؤون الطلبة إلى تنمية الوعي الثقافي والاجتماعي لدى الطلبة وتوطيد علاقتهم
                بجامعتهم وبالمجتمع المحلي، وذلك من خلال ما تقوم به من الإعداد للانتخابات الطلابية
                وتنمية روح المسؤولية والانتماء لدى الطلاب، وإصدار المطبوعات ذات العلاقة بالطلبة،
                ومتابعة أحوالهم، وتقديم المساعدات المادية وغير المادية وتأمين السكن والإشراف على
                المعسكر الصيفي، وإعداد البرامج للنشاطات الثقافية والفنية والرياضية للطلاب، ومتابعة
                كثير من القضايا عن طريق مكتب الإرشاد وتوفير الحلول الممكنة لها، وتقديم الخدمات الطبية
                للطلبة بالتعاون مع المركز الصحي في الجامعة، وإلقاء المحاضرات وعقد الندوات في المجال
                الصحي، وتقديم الجوائز الرمزية والعينية والمادية للطلبة المتفوقين أكاديمياً، وتقديم
                القروض والمنح للطلبة المحتاجين.
              </p>
            </Prose>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#0f3057] mb-2">دوائر العمادة</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                تؤدي عمادة شؤون الطلبة في جامعة مؤتة أعمالها من خلال دوائرها المختلفة دوراً مهماً في
                رعاية الطلبة، وهي على النحو الآتي:
              </p>
              <NumList items={[
                'دائرة الخدمات الطلابية.',
                'دائرة الهيئات الطلابية.',
                'مكتب الطلبة الوافدين.',
                'دائرة النشاط الثقافي والفني.',
                'دائرة الأنشطة الرياضية.',
                'دائرة المنازل الداخلية.',
                'مكتب الإرشاد الوظيفي ومتابعة الخريجين.',
                'دائرة التوثيق والإعلام الطلابي.'
              ]} />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#0f3057] mb-2">الخدمات والنشاطات</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                تتولى هذه الدوائر الإشراف على شؤون العمادة والمشاركة في رسم السياسة العامة لمجمل
                الأنشطة التي تعقد فيها، حيث تقوم بتوفير الخدمات والنشاطات الآتية:
              </p>
              <NumList items={[
                'الإسهام في إعداد الشباب الجامعي لتحقق لهم الشخصية المتوازنة المتكاملة، وتنمية طاقات الطلبة ومواهبهم وتوظيفها في عمل مثمر، مع الإفادة من أوقات الفراغ وحسن توجيهها.',
                'تشجيع الابتكار العلمي لدى الطلبة والكشف عن مواهبهم وقدراتهم الإبداعية، وتعويدهم على المشاركة الاجتماعية، وتنمية العلاقات الأخوية بينهم وبين أساتذتهم.',
                'متابعة مسيرة الطلبة الأكاديمية برعايتها للأنشطة المنهجية واللامنهجية، مثل إصدار دليل الطالب السنوي، وصحيفة مؤتة الطلابية الشهرية، وإصدار الكتاب السنوي الذي يضم إبداعات الطلبة.',
                'تقديم ما يحتاج إليه الطالب من خدمات، مثل إصدار الهوية الجامعية، والتأمين الصحي، والتأمين على الحياة.',
                'دعم النشاطات الطلابية الثقافية والاجتماعية والرياضية والفنية، مثل عقد الندوات الثقافية، والمعارض الفنية، والبطولات الرياضية، والمعسكرات الكشفية، والرحلات الترفيهية والعلمية مثل رحلة تتبع مسار الثورة العربية الكبرى.',
                'توجيه الطلبة وتنمية إحساسهم بالمسؤولية والانتماء للوطن، عن طريق عقد الندوات التي تعالج مواضيع وطنية وسياسية، وإعداد برامج زيارات لعدد من المؤسسات الوطنية والمواقع التاريخية.',
                'تقديم المنح للطلبة المتميزين أكاديمياً، وتقديم الدعم المادي للطلبة غير المقتدرين على شكل قروض ومساعدات فصلية والمساعدات الطارئة.',
                'الإرشاد الوظيفي الفردي والجماعي، ودعم الإبداع والتميز، والدعم المادي لمشاريع التخرج، وتمويل منح للطلبة المتفوقين غير المقتدرين، وتمويل براءات الاختراع من خلال صندوق الملك عبدالله الثاني للتنمية بالتعاون مع مؤسسات المجتمع المدني المختلفة.',
                'رعاية الطالبات في السكنات الداخلية، وتأمين الإشراف والتوجيه والإرشاد والرعاية الصحية لهن.',
                'رعاية الطلبة الوافدين الدارسين في الجامعة وتقديم الخدمات اللازمة لهم منذ لحظة وصولهم إلى المملكة وحتى إقامة حفل تخريجهم، وبالتعاون مع دوائر العمادة المختلفة.',
                'رعاية الطلبة من ذوي الاحتياجات الخاصة ومتابعتهم أكاديمياً وتوفير الإمكانيات كافة لمساعدتهم في مواصلة مسيرتهم التعليمية، وكذلك مختبر خاص بهم مجهز بالوسائل والأجهزة والبرمجيات كافة اللازمة لهذه الغاية.'
              ]} />
            </div>

            <Prose>
              <p>
                وانسجاماً مع توجيهات جلالة الملك عبدالله الثاني بإيلاء الشباب الرعاية والعناية اللازمة
                ورفع مستوى قدراتهم، جاء إنشاء البرلمان الطلابي في عمادة شؤون الطلبة، من أجل إسماع صوت
                الطلبة إلى جميع شرائح المجتمع بشكل عام ومتخذي القرار بشكل خاص، وترسيخ نهج وقواعد
                وتقاليد الديمقراطية لديهم.
              </p>
              <p>
                كما تحرص العمادة على تفعيل دور اتحاد الطلبة والأندية والفرق الطلابية لتمكين الطلبة من
                المساهمة في صنع القرارات التي تهم جميع شؤونهم، مثل تعيين أعضاء ممثلين للطلبة في مجالس
                ولجان الجامعة المختلفة، كما تعمل على استحداث الأندية التي من شأنها أن تطور مهارات
                الطلبة وتثري خبراتهم الوطنية والسياسية.
              </p>
              <p>
                وتسعى عمادة شؤون الطلبة إلى إقامة أنشطة عامة ومشاريع صغيرة لدعم برامجها الخاصة بالطلبة
                للارتقاء بمستوى الخدمة المقدمة للمجتمع المحلي، كما تقوم العمادة بتفعيل استفادة المجتمع
                المحلي من الإمكانيات الفنية والثقافية المتوفرة فيها، على نحو ما يتم من عقد دورات
                لاكتساب مهارات صنع الخزف، وتدريب الفرق الرياضية التابعة للأندية، واستخدام الصالات
                الرياضية التابعة للعمادة من قبل المجتمع المحلي.
              </p>
              <p>
                كما تسعى العمادة إلى جعل مبناها المكان الأمثل لاستقطاب الطلبة، فعمدت إلى توفير الخدمات
                المتميزة لهم ووسائل الترفيه المختلفة والأنشطة الرياضية والفنية والفعاليات الثقافية
                والاجتماعية المختلفة.
              </p>
              <p>
                وانسجاماً مع توجهات الجامعة في التوسع في البرامج والأنشطة والحوسبة التي تسهم في تطوير
                العمل وتقديم الخدمات المتميزة للطلبة، فقد أنشئ في عمادة شؤون الطلبة قاعات ومختبرات
                أعدت لهذه الغاية، حيث تم إنشاء مجمع طلال أبو غزالة للمعرفة يشمل قاعةً مزودةً بأحدث
                أجهزة الحاسوب، وكذلك تم إنشاء مختبر حاسوب مزود بأحدث أجهزة الحاسوب والأثاث في دائرة
                الخدمات الطلابية، يسهل عملية تعبئة النماذج الطلابية الخاصة بعمادة شؤون الطلبة.
              </p>
            </Prose>
          </div>
        );

      case 'act-party':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الأنشطة الحزبية" />
          </div>
        );

      case 'diwan-building':
        return (
          <div className="space-y-8">
            <PageTitle title="طلبات التشغيل" sub="شعبة اللوازم والمباني — ديوان عمادة شؤون الطلبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="طلبات التشغيل" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                تسعى عمادة شؤون الطلبة على توفير الخدمات التي من شأنها توفير الوقت والجهد على طلبتنا،
                حيث تقوم عمادة شؤون الطلبة بتشغيل الطلبة في مختلف مرافق الجامعة ضمن الشروط التالية:
              </p>
            </Prose>
            <NumList items={[
              'أن يكون الطالب أردني الجنسية.',
              'التشغيل للطلبة الذين معدلاتهم لا تقل عن 60% لمرحلة البكالوريوس فقط.',
              'أن يكون الطالب المتقدم للتشغيل قد مضى على انتظامه في الجامعة فصل دراسي واحد على الأقل.',
              'أن لا يكون الطالب المتقدم للتشغيل مبعوثاً من جهة رسمية أو غير رسمية.',
              'أن لا يكون الطالب المتقدم للتشغيل موظفاً.',
              'أن لا يكون الطالب المتقدم للتشغيل قد صدر بحقه أي عقوبة تأديبية باستثناء عقوبة التنبيه.',
              'لا يسمح بتسجيل الطالب الذي عمل على الفصل السابق بالتقدم لطلبات التشغيل (التشغيل على فصلين متتاليين).',
              'يُطبق نظام التشغيل للطلبة على الفصلين الدراسيين الأول والثاني فقط.',
              'أن لا يكون الطالب المتقدم للتشغيل متوقع تخرجه على الفصل الذي يتقدم فيه للتشغيل.',
              'يُستثنى من الشروط السابقة الطلبة المرافقون مع ذوي الإعاقة.',
            ]} />
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-3">خطوات تقديم طلبات التشغيل إلكترونياً</h3>
              <Prose>
                <p>
                  تقدم طلبات التشغيل إلكترونياً بعد نشر الإعلان عن بدء استقبال طلبات التشغيل على موقع
                  الجامعة وصفحة عمادة شؤون الطلبة على الفيس بوك deanship of students affairs.
                </p>
              </Prose>
            </div>
            <NumList items={[
              'ادخل إلى موقع جامعة مؤتة — الصفحة الرئيسية (www.mutah.edu.jo).',
              'انقر على الرابط (E-portals).',
              'انقر على رابط «تشغيل الطلبة».',
              'ادخل الرقم الجامعي وكلمة المرور ثم انقر على زر حفظ.',
              'تابع الإعلانات على موقع الجامعة وصفحة الفيس بوك deanship of students affairs لمعرفة النتيجة.',
            ]} />
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-4">ملاحظات</h3>
              <NumList items={[
                'سيتم تحديد عدد المستفيدين بناءً على حاجة كليات ودوائر الجامعة.',
                'سيتم استثناء أي طالب يحصل على عقوبة أو منحة أو قرض تعليم عالٍ أو تغيير مصدر الإنفاق، حيث سيتم حذف اسمه من القوائم النهائية أو تغيير وضع الطالب.',
                'لن يتم استقبال أي طلب بعد انتهاء المدة المحددة حيث سيتم إيقافه إلكترونياً، ولن يتم استقبال أي طلب بشكل يدوي.',
              ]} />
            </div>
            <Prose>
              <p className="font-bold text-[#0f3057]">
                على الطلبة الراغبين بالعمل تقديم الطلب على موقع الجامعة / الصفحة الرئيسية — برنامج تشغيل الطلبة.
              </p>
            </Prose>
          </div>
        );

      case 'office-financial':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة المتابعات المالية" sub="الشعب التابعة لمكتب العميد" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة المتابعات المالية" className="w-full max-h-[420px] object-cover" />
            </div>
          </div>
        );

      case 'diwan-out':
      case 'diwan-in':
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, DSA_LINKS)} sub="عمادة شؤون الطلبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt={getSectionTitle(activeItem, DSA_LINKS)} className="w-full max-h-[420px] object-cover" />
            </div>
          </div>
        );

      case 'about-plan':
        return (
          <div className="space-y-8">
            <PageTitle title="الخطة الاستراتيجية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="الخطة الاستراتيجية" className="w-full max-h-[420px] object-cover" />
            </div>
            <h3 className="text-xl font-bold text-[#0f3057]">الخطط الاستراتيجية</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DocRow name="الخطة الاستراتيجية 2015-2020" />
              <DocRow name="الخطة الاستراتيجية 2021-2022" />
            </div>
          </div>
        );

      case 'srv-fees':
        return (
          <div className="space-y-8">
            <PageTitle title="تأجيل الرسوم الجامعية" />
            <Prose>
              <p>
                تسعى عمادة شؤون الطلبة على توفير الخدمات التي من شأنها توفير الوقت والجهد على طلبتنا
                الاعزاء في اجراء معاملاتهم، منها تأجيل دفع الرسوم الجامعية وهو اختياري يتم الإعلان عنه
                ضمن الشروط التالية:
              </p>
            </Prose>
            <NumList items={[
              'تقدم طلبات تأجيل الرسوم الدراسية إلكترونياً بعد صدور كشف العلامات واحتساب المعدل التراكمي للفصل الدراسي الذي يسبق الفصل المنوي تأجيل الرسوم الدراسية وفقاً للتقويم الجامعي المعمول به، ولا يقبل أي طلب بعد ذلك (قابل للتعديل).',
              'يتم التأجيل للطلبة الذين معدلاتهم لا تقل عن 60% لمرحلة البكالوريوس و70% لمرحلة الدراسات العليا (قابل للتعديل).',
              'لا يسمح بتسجيل الطالب المتخلف عن تسديد الرسوم الدراسية المؤجلة على الفصل الدراسي اللاحق ما لم يقم بتسديد كامل قيمة الرسوم الدراسية المؤجلة عن الفصل السابق.',
              'يجب على الطالب الذي يقوم بالتأجيل دفع الرسوم الفصلية قبل الدخول لاستكمال إجراءات التأجيل الإلكتروني.',
              'تطبق معاملات التأجيل على الطلبة للفصلين الدراسيين الأول والثاني فقط.',
              'أن يكون الطالب المؤجل للرسوم الجامعية قد مضى على انتظامه في الجامعة فصل دراسي واحد على الأقل.',
              'أن لا يكون الطالب المؤجل للرسوم الجامعية متوقع تخرجه على الفصل المنوي تأجيل الرسوم فيه.',
              'يقوم الطالب الذي تمت الموافقة على تأجيل الرسوم الدراسية بتأمين ضمانات مالية للجامعة وذلك بتوقيع شيك بنكي شريطة توقيع كفيل مليء مالياً عليها بصفته ضامن احتياط.',
              'يتم التنسيب إلى رئيس الجامعة كشف بأسماء الطلبة المتقدمين لتأجيل دفع الرسوم الدراسية دفعة واحدة من قبل عميد شؤون الطلبة.',
            ]} />
            <h3 className="text-xl font-bold text-[#0f3057]">خطوات تأجيل دفع الرسوم إلكترونياً</h3>
            <NumList items={[
              'ادفع الرسوم الفصلية.',
              'ادخل إلى موقع جامعة مؤتة — الصفحة الرئيسية (www.mutah.edu.jo).',
              'انقر على الرابط (E-portals).',
              'انقر على رابط «تأجيل الرسوم».',
              'ادخل الرقم الجامعي وكلمة المرور ثم انقر على زر حفظ.',
              'قم بمراجعة وحدة الشؤون المالية الرئيسية خلف بنك القاهرة عمان وسلّم الشيك البنكي المثبت عليه قيمة المبلغ المراد تأجيله لهم.',
              'قم بتسجيل المواد التي ترغب بها.',
            ]} />
          </div>
        );

      case 'srv-manaseer':
        return (
          <div className="space-y-8">
            <PageTitle title="طلبات منح جمعية مؤسسة زياد المناصير الخيرية" />
            <Prose>
              <p>
                تقدم جمعية المناصير الخيرية منحة رسوم دراسية جزئية و/أو كلية لمدة سنة دراسية كاملة
                (فصلان عاديان وفصل صيفي على الأكثر) يستفيد منها بحد أقصاه (20) طالباً حسب خطة الطالب
                الدراسية، من الطلبة الذين هم على مقاعد الدراسة لدى جامعة مؤتة، ضمن الشروط التالية:
              </p>
            </Prose>
            <NumList items={[
              'أن يكون المرشح أردني الجنسية.',
              'أن يكون الطالب المرشح مقبولاً على أساس القبول الموحد (التنافس) لدرجة البكالوريوس فقط.',
              'أن لا يتعدى عمر الطالب المرشح (23) سنة.',
              'أن لا يقل معدل الطالب المرشح التراكمي عن 60%.',
              'أن لا يكون المرشح أو المبعوث حاصلاً على إنذار غير أكاديمي (سلوكي).',
              'أن لا يكون المرشح حاصلاً على بعثة أو مبعوثاً من قبل جهة أخرى.',
              'أن لا يكون المرشح حاصلاً على إعفاء كلي أو جزئي.',
              'تقديم تفصيل اجتماعي واقتصادي عن حالة كل طالب من الطلبة المرشحين للاستفادة من المنحة وبموجب المعطيات المتوفرة لديه.',
              'يجب الحصول على الموافقة من جمعية مؤسسة زياد المناصير الخيرية مسبقاً على تحويل التخصص إذا أراد الطالب المبتعث التحويل.',
            ]} />
            <Prose>
              <p className="font-bold text-[#0f3057]">
                لتقديم الطلبات: منح جمعية مؤسسة زياد المناصير الخيرية — عبر بوابة الجامعة الإلكترونية.
              </p>
            </Prose>
          </div>
        );

      case 'srv-antismoking':
        return (
          <div className="space-y-8">
            <PageTitle title="استبانة واقع التدخين في الجامعات الاردنيه" />
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-3">تعريف التدخين</h3>
              <Prose>
                <p>
                  التدخين هو قيام المدخن بإدخال الدخان إلى الفم ومن ثم إلى الشعب الهوائية، ومن ثم إلى
                  الرئتين، ويحصل المدخن على هذا الدخان من الأرجيلة والسيجار والسيجارة أيضاً، وأيضاً من
                  خلال الغليون المائي. والدخان يحتوي على مجموعة كبيرة من المواد السامة لجسم الإنسان،
                  ومن هذه المواد: غاز أول أوكسيد الكربون، والنيكوتين وهو من المواد السامة بشكل كبير
                  للإنسان، وعنصر الرصاص الثقيل، ومادة القطران حيث إنّ هذه المادة هي المسبب الرئيسي
                  لاصفرار الأسنان، وعنصر البلونيوم وهذا العنصر يتراكم في الرئتين ويعمل على إتلافهما،
                  ومادة الزرنيخ وهذه المادة سامة وتستخدم في القضاء على الحشرات، وأيضاً الكحول حيث
                  يضيفها مصنعو الدخان لإضافة المذاق الطيب إلى الدخان وأيضاً لإضفاء الرطوبة عليه.
                </p>
              </Prose>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-3">تاريخ التدخين</h3>
              <Prose>
                <p>
                  أوّل ظهور للسجائر كان عام ألف وأربعمئة واثنين وتسعين، حيث اكتشف البحارة الإسبان
                  القارة الأمريكية ورأوا هناك شجرة التبغ، بينما ظهرت السجائر في الدول العربية في سنة
                  الألف من الهجرة النبوية، والذين أدخلوا السجائر إلى البلاد الإسلامية هم النصارى، وكان
                  التدخين في هذه الأوقات دليلاً على الرقي والغنى.
                </p>
              </Prose>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-4">أسباب التدخين</h3>
              <NumList items={[
                'الضيق الناتج عن البطالة التي تواجه قسماً كبيراً من الشباب، وبالتالي يهرعون إلى التدخين.',
                'عدم الاستقرار العائلي.',
                'التقليد الأعمى للوالد والأقران، وإعطاء الأطفال والمراهقين بعض الأموال وعدم سؤالهم عن كيفية صرفهم لهذه النقود، أي قلّة رقابة الوالدين على أبنائهم.',
                'البيئة المدرسية السيئة كتدخين المعلم أمام التلاميذ.',
                'ويجدر الانتباه إلى أنّ تلك ليست مبرّرات لكي يقحم المدخن صحته في هذه الحالة السيئة.',
              ]} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-4">أضرار التدخين</h3>
              <NumList items={[
                'يرفع من نسبة الإصابة ببعض أنواع السرطانات مثل سرطان الرئة وسرطان اللسان والمريء والمعدة والبنكرياس والإثني عشر.',
                'يسبب العديد من المشاكل في الجهاز الهضمي، منها فقدان التذوّق بالشكل الصحيح وقرحة المعدة وأيضاً عسر الهضم.',
                'تدخين المرأة الحامل أو تعرّضها للدخان السلبي يزيد من احتمالية الولادة المبكّرة، وذلك لأنّ مواد التدخين تعمل على فصل المشيمة عن جدار الرحم، كما أنّ أول أوكسيد الكربون والنيكوتين يمنعان وصول الأوكسجين والغذاء إلى الجنين بالشكل المطلوب، كما أنّ مواد التدخين ترفع من نسبة الإجهاض.',
                'يقرب من مرحلة الشيخوخة حيث إنّه يزيد من أعداد التجاعيد والخيوط الرفيعة على البشرة.',
                'يقلل من القدرات الجنسية، كما أنّه يسبّب العقم.',
                'يسبّب رائحة كريهة للفم، ويغيّر من لون اللثة والشفتين، ويضعف الأسنان وبالتالي تسقط.',
                'يلوّث الهواء وذلك بسبب الدخان المنبعث منه، كما أنّه يلوّث جمال ونظافة البيئة عند رمي المدخّنين أعقاب السيجارة من السيارة.',
                'يسبّب السعال الشديد للأفراد، كما أنّه يؤخّر من شفائهم من نزلات البرد والإنفلونزا.',
                'في التدخين صرف للأموال بلا وجه شرعي.',
              ]} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DocRow name="استبانة واقع التدخين في الجامعات الاردنيه" type="نموذج إلكتروني" />
            </div>
          </div>
        );

      case 'srv-guide':
      case 'srv-newstudents':
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, DSA_LINKS)} />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt={getSectionTitle(activeItem, DSA_LINKS)} className="w-full max-h-[420px] object-cover" />
            </div>
          </div>
        );

      case 'about-suggestions':
        return (
          <div className="space-y-8">
            <PageTitle title="صندوق الاقتراحات والشكاوى والثناء" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="صندوق الاقتراحات والشكاوى والثناء" className="w-full max-h-[420px] object-cover" />
            </div>
          </div>
        );

      case 'about-bulletins':
        return (
          <div className="space-y-8">
            <PageTitle title="نشرات / دراسات / قرارات" sub="نشرات عمادة شؤون الطلبة" />
            <div className="flex flex-col gap-3">
              <DocRow name="النشرة الإخبارية الشهرية لغاية شهر 11 - 2022" url="https://www.mutah.edu.jo/ar/studentaffairs/Forms/Newspaper11.pdf" />
              <DocRow name="النشرة الإخبارية الشهرية لشهر 12 - 2022" url="https://www.mutah.edu.jo/ar/studentaffairs/Forms/Newspaper122022.pdf" />
              <DocRow name="النشرة الاخبارية خلال من 1-1 إلى 31-03-2023" url="https://www.mutah.edu.jo/ar/studentaffairs/Forms/Newspaper31032023.pdf" />
              <DocRow name="النشرة السنوية لنشاطات عمادة شؤون الطلبة 15-09-2024 ولغاية 15-09-2025" url="https://www.mutah.edu.jo/ar/studentaffairs/Forms/Annual%20bulletin%20of%20activities%20of%20the%20Deanship%20of%20Student%20Affairs15092025.pdf" />
            </div>
          </div>
        );

      case 'about-honor': {
        const HONOR = [
          { name: 'الاستاذ الدكتور محمد سليم الطراونة', period: '11/9/2000 - 25/9/2002' },
          { name: 'الاستاذ الدكتور محمد سالم القضاة', period: '26/9/2002 - 25/9/2004' },
          { name: 'الاستاذ الدكتور احمد فلاح المجالي', period: '26/9/2004 - 31/8/2006' },
          { name: 'الاستاذ الدكتور محمد عبدالكريم الحوراني', period: '1/9/2006 - 20/9/2008' },
          { name: 'الاستاذ الدكتور مفلح محمد المجالي', period: '21/9/2008 - 31/8/2010' },
          { name: 'الاستاذ الدكتور موسى سالم القضاة', period: '1/9/2010 - 31/8/2012' },
          { name: 'الاستاذ الدكتور احمد سالم النوايسة', period: '1/9/2012 - 31/8/2014' },
          { name: 'الاستاذ الدكتور محمد سليمان الرحاحلة', period: '1/9/2014 - 31/8/2016' },
          { name: 'الاستاذ الدكتور خالد محمد الصرايرة', period: '1/9/2016 - 31/8/2018' },
          { name: 'الاستاذ الدكتور عمر علي الطراونة', period: '1/9/2018 - 31/8/2020' },
          { name: 'الاستاذ الدكتور ماهر احمد المبيضين', period: '1/9/2020 - حتى الآن' }
        ];
        return (
          <div className="space-y-8">
            <PageTitle title="لوحة شرف الخدمة" sub="عمداء شؤون الطلبة في جامعة مؤتة" />
            <div className="flex flex-col gap-3">
              {HONOR.map((d, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-[#c9a227] transition-colors">
                  <span className="w-8 h-8 rounded-full bg-[#0f3057] text-[#c9a227] text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="font-bold text-[#0f3057] text-[15px] flex-1 leading-snug">{d.name}</p>
                  <span className="text-xs font-bold text-gray-500 shrink-0" dir="ltr">{d.period}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'about-staff':
        return (
          <div className="space-y-8">
            <PageTitle title="الموظفون" sub={`الكادر الإداري في عمادة شؤون الطلبة — ${DSA_STAFF.length} موظفاً`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DSA_STAFF.map((m, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 hover:shadow-md hover:border-[#c9a227]/40 transition-all">
                  <div className="w-14 h-14 rounded-full bg-[#0f3057] flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-[#c9a227]" />
                  </div>
                  <p className="text-[11px] font-bold text-[#c9a227] mb-1.5 leading-relaxed">{m.role}</p>
                  <h3 className="font-bold text-[#0f3057] text-[15px] leading-snug mb-3">{m.name}</h3>
                  <div className="flex flex-col gap-1 text-xs text-gray-500">
                    {m.ext && <span dir="ltr">هاتف فرعي: {m.ext}</span>}
                    {m.email && <span dir="ltr" className="break-all">{m.email}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gd-issues':
      case 'gd-strategy':
      case 'gd-orgchart':
      case 'gd-statistics':
      case 'gd-activities':
      case 'gd-instructions':
      case 'gd-forms':
      case 'gd-faq':
      case 'gd-staff':
      case 'gd-contact':
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, DSA_LINKS)} sub="مكتب التوجيه والإرشاد الطلابي والمجتمعي" />
          </div>
        );

      case 'gd-goals':
        return (
          <div className="space-y-8">
            <PageTitle title="الرؤية، والرسالة، والأهداف" sub="مكتب التوجيه والإرشاد الطلابي والمجتمعي — نحو بيئة جامعية تعليمية ومجتمعية آمنة نفسياً" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5">
                  <Eye className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">الرؤية</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  جامعة يتمتع فيها الطلبة بصحة نفسية تحقق لهم الإنجاز الأكاديمي والمشاركة الفاعلة
                  القائمة على المبادرة وحب العمل، ومجتمع آمن نفسياً قادر على التعامل مع ضغوط الحياة
                  المختلفة.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5">
                  <Target className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">الرسالة</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  إعداد برامج إرشادية نمائية من أجل تطوير الذات، ووقائية من شأنها التوعية بالمشكلات
                  النفسية وكيفية الوقاية منها لدى طلبة الجامعة وأفراد المجتمع المحلي، وكذلك إعداد برامج
                  إرشادية علاجية تهدف إلى مساعدة الطلبة أو أفراد المجتمع على التعامل مع المشاكل النفسية
                  وضغوط الحياة المختلفة.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <Star className="w-6 h-6 text-[#c9a227]" />
                <h3 className="text-xl font-bold text-[#0f3057]">القيم</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['السرّية التامة.','الاحترام المتبادل.','التحلي بالصبر والإخلاص والأمانة.'].map((v) => (
                  <div key={v} className="flex items-start gap-2.5 bg-[#F8FAFC] border border-gray-100 rounded-xl px-5 py-3.5">
                    <CheckCircle size={16} className="text-[#c9a227] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-2">مهام مكتب التوجيه والإرشاد الطلابي والمجتمعي</h3>
              <p className="text-sm text-gray-600 mb-6">تتلخص مهام المكتب في جامعة مؤتة بالنقاط التالية:</p>
              <NumList items={[
                'مساعدة طلبة الجامعة على اكتشاف ذواتهم وقدراتهم ومهاراتهم وفهم المشاكل التي يعانون منها، ومن ثم مساعدتهم على تجاوز مثل هذه المشاكل، وعلى تحقيق قدر كافٍ من الصحة النفسية.',
                'تحديد الاحتياجات المستقبلية للطلبة في ظل رؤية الجامعة وتطلعاتها المستقبلية.',
                'دراسة حالات التعثر الأكاديمي لدى طلبة الجامعة وعلاجها بشكل منفرد.',
                'عقد الندوات والدورات اللازمة لتنمية مهارات الطلبة الأكاديمية والتوعية بمستجدات وقضايا العصر الحالي.',
                'تعريف الطلبة المستجدين في الجامعة بمهام المكتب، ومساعدتهم على التكيف والاندماج في الجو التعليمي.',
                'الاهتمام بقضايا الطلبة ذوي الإعاقة في الجامعة ومساعدتهم على التكيف النفسي والاجتماعي.',
                'تقديم خدمات الإرشاد النفسي لأفراد المجتمع المحلي ومساعدتهم في التغلب على مشاكلهم النفسية والتعامل مع ضغوط الحياة المختلفة.',
                'يعمل عضو فريق مكتب التوجيه والإرشاد الطلابي والمجتمعي كمستشار في لجان التحقيق مع الطلبة المدنيين.'
              ]} />
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">أهداف مكتب التوجيه والإرشاد الطلابي والمجتمعي</h3>
              <p className="text-sm text-gray-700 leading-[2] mb-4">
                تنبثق أهداف المكتب من الأهداف الرئيسة للإرشاد النفسي والتربوي، وهي: الأهداف النمائية،
                الأهداف الوقائية، الأهداف العلاجية.
              </p>
              <p className="font-bold text-[#0f3057] mb-4">أهداف المكتب في عمادة شؤون الطلبة:</p>
              <NumList items={[
                'تقديم الخدمات الإرشادية النفسية والتربوية والاجتماعية والأسرية والمهنية والانفعالية للطلبة لتحقيق التكيف بكافة أشكاله.',
                'تقديم الخدمات الإرشادية لأفراد المجتمع المحلي لمساعدتهم على التعامل مع مشاكلهم النفسية وضغوط الحياة المختلفة.',
                'توعية الطلبة بكيفية التعامل مع المشاكل النفسية وضغوط الحياة ومقتضيات العصر الحالي.',
                'توعية الطلبة بكيفية التعامل مع الهواتف الذكية، وإدمان الإنترنت، ومواقع التواصل الاجتماعي.',
                'تنمية اتجاهات إيجابية للطلبة نحو أنفسهم ونحو الجامعة والتخصص والمدرسين، ونحو الطلبة ذوي الإعاقة.',
                'مساعدة الطلبة على التكيف مع الحياة الجامعية وإكسابهم المهارات الحياتية المختلفة.',
                'مساعدة الطلبة المتعثرين دراسياً في رفع مستوى تحصيلهم الدراسي.',
                'تبني البرامج التي تدعم الطلبة المتفوقين والموهوبين.',
                'مساعدة الطلبة الذين وقعت عليهم العقوبات الطلابية — ما أمكن ذلك.',
                'تقديم الاستشارة النفسية للجان التحقيق بخصوص الطلبة المدنيين المحالين لها — ما أمكن ذلك.'
              ]} />
            </div>
          </div>
        );

      case 'gd-welcome':
        return (
          <div className="space-y-8">
            <PageTitle title="مكتب التوجيه والارشاد الطلابي والمجتمعي" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="مكتب التوجيه والإرشاد الطلابي والمجتمعي" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                يقدم مكتب التوجيه والإرشاد الطلابي والمجتمعي في جامعة مؤتة خدمات إرشادية نمائية أو
                وقائية أو علاجية متنوعة لطلبة الجامعة وأفراد المجتمع المحلي كافة. ويأتي هذا المكتب
                باسمه الجديد وانطلاقته الجديدة تماشياً مع إجراءات ومعايير ضمان الجودة في مؤسسات التعليم
                العالي خلال الأعوام (2015 – 2020).
              </p>
              <p>
                إن من أهم المبررات لإنشاء وتطوير هذا المكتب، هي حاجة طلبة الجامعة وأفراد المجتمع المحلي
                لخدمات الإرشاد النفسي للتعامل مع المشكلات والأزمات النفسية التي تلم بهم في ظل عصر سريع
                التغيّر، ويسوده الكثير من التطرّف الفكري والثقافي. ويقدم المكتب خدماته الإرشادية
                النمائية أو الوقائية أو العلاجية من قبل فريق متخصص من أعضاء هيئة التدريس في قسم الإرشاد
                والتربية الخاصة في كلية العلوم التربوية. وفي هذا فرصة لعضو هيئة التدريس في فريق المكتب
                لممارسة أحد أدواره المتمثلة بخدمة المجتمع المحلي.
              </p>
            </Prose>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ويتعامل المكتب في إطار من السرية التامة مع العديد من القضايا مثل</h3>
              <NumList items={[
                'حالات التعثر الدراسي لطلبة الجامعة.',
                'المشكلات النفسية لطلبة الجامعة أو أفراد المجتمع المحلي مثل: (تدني مفهوم الذات، الخجل، القلق، التكيف النفسي والاجتماعي، الصدمات النفسية، مشكلات أسر الأطفال ذوي الإعاقة … الخ).',
                'المشكلات ذات الطبيعة الخاصة والحساسة.',
                'تقديم الإرشاد النفسي والمعلومات التوضيحية حول كيفية تعامل أسر الأشخاص ذوي الإعاقة في المجتمع المحلي مع أبنائهم.'
              ]} />
            </div>

            <div className="bg-gradient-to-l from-[#8a6d1f] to-[#c9a227] rounded-3xl p-8">
              <p className="text-white text-lg leading-[2] font-bold text-justify">
                إن خدمة المجتمع المحلي من خلال هذا المكتب، هي انطلاقة نوعية وتطوّرية للجامعة فيما يتعلق
                بدورها في تنمية قدرات المجتمع المحلي.
              </p>
            </div>
          </div>
        );

      case 'intl-contact':
      case 'intl-contact2':
        return (
          <div className="space-y-8">
            <PageTitle title="اتصل بنا / مكتب الطلبة الوافدين" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="مكتب الطلبة الوافدين" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <div className="flex items-start gap-3">
                  <MapPin className="text-[#c9a227] w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#0f3057] mb-3">للاتصال بنا</h4>
                    <p className="text-gray-700 leading-[2]">
                      المملكة الأردنية الهاشمية<br />
                      وزارة التعليم العالي<br />
                      الأردن – الكرك – جامعة مؤتة<br />
                      مكتب الطلبة الوافدين<br />
                      ص.ب: 7
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 flex flex-col gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#0f3057] mb-0.5">هاتف</p>
                    <p className="text-gray-600" dir="ltr">+962-3-2372380 — الفرعي 3061</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#0f3057] mb-0.5">فاكس</p>
                    <p className="text-gray-600" dir="ltr">+962-3-2397185</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#0f3057] mb-0.5">البريد الإلكتروني</p>
                    <p className="text-gray-600 leading-relaxed" dir="ltr">
                      foreignstud2@mutah.edu.jo<br />
                      foreignstud1@mutah.edu.jo<br />
                      foreignstud@mutah.edu.jo
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <LinkRow name="صفحة الفيس بوك — نادي الطلبة الوافدين" url="https://www.facebook.com/groups/180594552022486/" />
          </div>
        );

      case 'intl-club':
      case 'intl-club2':
        return (
          <div className="space-y-8">
            <PageTitle title="نادي الطلبة الوافدين" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="نادي الطلبة الوافدين" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                يوجد في مكتب الطلبة الوافدين — عمادة شؤون الطلبة، جامعة مؤتة — نادي ثقافي اجتماعي رياضي
                يعنى بشؤون الطلبة الوافدين الدارسين في جامعة مؤتة، ويقوم بتنظيم جميع نشاطات الطلبة
                الوافدين من رحلات وإقامة احتفالات التخرج للطلبة الوافدين والمشاركة في المناسبات الوطنية
                والدينية للمملكة الأردنية الهاشمية، وإقامة الأيام الوطنية للدول التي يوجد لها طلبة في
                جامعة مؤتة، وكذلك مشاركة المجتمع المحلي بتقديم مساعدات لدور الأيتام ومراكز التربية
                الخاصة وزيارة المدارس الأقل حظاً، وكذلك متابعة أمور الطلبة الوافدين خارج أوقات الدوام
                ومتابعة أمور سكنهم برعاية مكتب الطلبة الوافدين.
              </p>
              <p>
                وتشكل الهيئة الإدارية حسب تعليمات جامعة مؤتة من الطلبة الوافدين أنفسهم، وتتكون الهيئة
                من رئيس وستة أعضاء من الطلبة الوافدين من كافة الجنسيات عن طريق الانتخاب لمدة عام دراسي
                كامل، ويوجد لهم تعليمات تنظم عملهم ضمن نشاطات عمادة شؤون الطلبة.
              </p>
              <p>
                نادي الطلبة الوافدين: الاهتمام بأبنائها وبناتها من الطلبة الوافدين اهتماماً كبيراً، من
                شأنه الإسهام في عملية استقطاب أكبر عدد ممكن من الطلبة يساعدوا في نشر ثقافات وعادات
                بلدانهم، وكذلك تعرفهم على ثقافة وعادات الأردن الحاضن بلد الأمن والأمان لتكون البلد
                الثاني لهم، وبعد سنوات من الجد والدراسة يعودون إلى بلادهم حاملين شهاداتهم العلمية بعد
                أن استقوا العلم والمعرفة على أيدي الكفاءات من أهل العلم في جامعتنا العريقة.
              </p>
            </Prose>
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f3057] text-white">
                    <th className="px-5 py-3 text-right font-bold">الطالب / ـة</th>
                    <th className="px-5 py-3 text-right font-bold w-40">المنصب</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['معين حسن يحيى كزمان', 'رئيساً'],
                    ['عمار حميد مجيد', 'نائب الرئيس'],
                    ['اكرم عبدالله محمد مقبل', 'أميناً للصندوق'],
                    ['احمد صفاء حسين', 'أميناً للسر'],
                    ['فاروق محمد ادريس', 'عضواً'],
                    ['سورينيا عاوي كجي', 'عضواً'],
                    ['ابراهيم ناندنج', 'عضواً']
                  ].map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'border-t border-gray-100 bg-white' : 'border-t border-gray-100 bg-[#F8FAFC]'}>
                      <td className="px-5 py-3.5 font-semibold text-[#0f3057]">{r[0]}</td>
                      <td className="px-5 py-3.5 text-gray-600">{r[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'intl-accom':
      case 'intl-accom2':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الإقامات" />
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">وتقوم بالمهام الآتية</h3>
              <NumList items={[
                'إنجاز معاملات الإقامة الخاصة بالطلبة الوافدين في وزارة الداخلية.',
                'مساعدة الطلبة الوافدين في إدخال ملفهم الإلكتروني ومتابعة إصدار هوياتهم لدى شعبة سجل الطالب والحوسبة.',
                'إعداد إحصائيات سنوية تبين أعداد الطلبة الوافدين وجنسياتهم.'
              ]} />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-2">الخطوات والأوراق المطلوبة لمعاملة الإقامة</h3>
              <p className="text-sm text-gray-600 mb-6">إحضار الوثائق التالية لمكتب الطلبة الوافدين — شعبة الإقامات.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                  <h4 className="font-bold text-[#c9a227] mb-4">الأوراق المطلوبة لأول مرة</h4>
                  <ul className="space-y-2.5 text-sm text-gray-700 list-disc list-inside leading-relaxed">
                    <li>إثبات طالب موقع ومختوم من وحدة القبول والتسجيل.</li>
                    <li>صورة عن جواز السفر.</li>
                    <li>صورة عن ختم آخر دخول إلى المملكة.</li>
                  </ul>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                  <h4 className="font-bold text-[#c9a227] mb-4">الأوراق المطلوبة لتجديد الإقامة</h4>
                  <ul className="space-y-2.5 text-sm text-gray-700 list-disc list-inside leading-relaxed">
                    <li>إثبات طالب موقع ومختوم من وحدة القبول والتسجيل.</li>
                    <li>صورة عن جواز السفر.</li>
                    <li>صورة عن ختم آخر دخول إلى المملكة.</li>
                    <li>صورة عن الإقامة القديمة.</li>
                    <li>كشف بعدد الساعات التي درسها الطالب.</li>
                  </ul>
                </div>
              </div>

              <NumList items={[
                'تحميل الوثائق المذكورة أعلاه على جهاز الحاسوب من خلال الماسح الضوئي.',
                'رفع الوثائق على نظام وزارة الداخلية وصرف رقم المعاملة من خلال النظام.',
                'متابعة المعاملة والتشييك عليها من خلال النظام.',
                'تسليم الرد بالموافقة للطالب لاستلام الإقامة من مكتب الإقامات في مديرية الأمن العام.'
              ]} />
            </div>
          </div>
        );

      case 'intl-care':
      case 'intl-care2':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة رعاية الطلبة الوافدين" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة رعاية الطلبة الوافدين" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">وتقوم بالمهام الآتية</h3>
              <NumList items={[
                'التواصل مع الملحقيات الثقافية وسفارات الدول العربية والإسلامية والصديقة التي لها طلبة في الجامعة.',
                'مساعدة الطلبة الوافدين في إيجاد حلول لمشاكلهم حسب الطرق الرسمية.',
                'تنظيم لقاء وحوار موسعين بحضور رئيس الجامعة ونوابه والعمداء والملحقين الثقافيين لمرة أو أكثر خلال العام، للتباحث في القضايا التي تهم الطلبة الوافدين.',
                'المساهمة في إنجاح الأيام الثقافية التي تنظمها الملحقيات الثقافية في الأردن داخل الحرم الجامعي.',
                'إقامة معرض تراثي دولي تشارك فيه بلدان الطلبة الوافدين الدارسين في الجامعة.',
                'تنظيم رحلات ثقافية لإطلاع الطلبة على المعالم السياحية والدينية والأثرية والمعالم الحضارية في الأردن.',
                'إقامة بطولات رياضية للجاليات بالتنسيق مع دائرة النشاط الرياضي.',
                'عمل حفل تخريج خاص بالطلبة الوافدين كل عام دراسي.'
              ]} />
            </div>
          </div>
        );

      case 'intl-services':
      case 'intl-services2':
        return (
          <div className="space-y-8">
            <PageTitle title="الخدمات المقدمة للطلبة الوافدين" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="الخدمات المقدمة للطلبة الوافدين" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <NumList items={[
                'يقوم المكتب باستقبال الطلبة الوافدين الجدد ومساعدتهم في إجراءات القبول والتسجيل، حيث يتم استقبالهم من قبل ممثلي المكتب الذين يقدمون المساعدة في متابعة الإجراءات الإدارية الخاصة بالقبول والتسجيل لهم تمهيداً لالتحاقهم بالدراسة.',
                'يقوم المكتب بمتابعة كل ما يتعلق بالمعاملات والإجراءات الرسمية الخاصة بإقاماتهم في المملكة الأردنية الهاشمية.',
                'يقوم المكتب بمساعدة الطلبة في إيجاد السكن المناسب لهم وتوفير فرص المشاركة فيما بينهم في السكن، ويستطيع الطالب اختيار السكن المناسب له حسب إمكانياته المادية، علماً بأن بعد السكن عن الجامعة لا يزيد عن 200م، كما تتوفر سكنات بالمناطق المحيطة بالجامعة والتي لا تزيد المسافة عن 1 كم، بالإضافة إلى أنه يوجد سكنات خاصة للطالبات داخل الحرم الجامعي لمن يرغب.',
                'المساهمة مع دائرة النشاط الرياضي في إعداد برامج لبطولات رياضية ولقاءات ودية بين الطلبة الوافدين من مختلف الجنسيات.',
                'الطالب مؤمن صحياً ما دام مسجلاً للفصل الدراسي من خلال المستشفيات الحكومية ومراكز وزارة الصحة الأردنية بالإضافة إلى مركز صحي جامعة مؤتة، وفي حال تعرض أي منهم لوعكة صحية يتم متابعتهم سواء مع عيادة الطلبة أو المستشفيات الأخرى، والاطمئنان على مراحل العلاج اللازمة.',
                'الطالب مؤمن على الحياة في حال العجز الجزئي أو الكلي أو الوفاة، وللمزيد من المعلومات على الطالب مراجعة شعبة التأمينات والإعفاءات في عمادة شؤون الطلبة.',
                'ينظم المكتب لقاء للطلبة الوافدين وسفاراتهم مع الأستاذ رئيس الجامعة خلال العام الدراسي لطرح ومناقشة القضايا والمشاكل التي تواجه الطلبة الوافدين، إذ يعمل المكتب على تذليل الصعوبات وحل المشكلات التي قد تواجه الطلبة خلال فترة دراستهم في الجامعة.',
                'يعمل المكتب على تنظيم العديد من الأنشطة الثقافية كالمعرض التراثي السنوي للطلبة الوافدين والذي يضم أجنحة تمثل دول الطلبة الوافدين المشاركة، ويتخلل المعرض إقامة العشاء الذي تقدم فيه أطباق ومأكولات شعبية تشتهر بها البلدان العربية والأجنبية، كما ينظم المكتب حفلاً فنياً فلكلورياً دولياً يشتمل على فقرات فلكلورية يقدمها الطلبة الوافدون من مختلف الجنسيات.',
                'يعمل المكتب وبشكل دوري على دراسة علمية مسحية للوقوف إلى جانب الطلبة الوافدين ومساعدتهم في حل مشاكلهم في المجالات كافة — الدراسية والاقتصادية والاجتماعية والانفعالية والصحية — التي يعاني منها الطلاب، كما ينظم المكتب نشاطات هادفة لخدمة المجتمع المحلي مما يكون له أثر نفسي واجتماعي للطلبة الوافدين، ويكون ذلك من خلال برامج موجهة لخدمة قطاعات المجتمع الأردني كرعاية الأيتام والعجزة وكبار السن.',
                'ينظم المكتب برامج ونشاطات ورحلات للطلبة الوافدين خاصة وزملائهم من الطلبة الأردنيين إلى العديد من المناطق الحضارية والسياحية والأثرية في المملكة والسياحة الدينية، ليتعرف الطالب من خلالها على أبرز الآثار وتاريخ المملكة الأردنية الهاشمية.',
                'يوجد في مكتب الطلبة الوافدين نادي باسم (نادي الطلبة الوافدين) وهو مشكل إدارياً ومنتخب من قبل الطلبة الوافدين، والذي يقوم بمتابعة الطلبة وتفقد أحوالهم والاجتماع معهم بصفة دورية والبحث في مطالبهم وقضاياهم من خلال النادي وحل مشاكلهم.',
                'تقوم الجامعة بعمل حفل خاص لتخريج الطلبة الوافدين في كل فصل دراسي تحت رعاية عطوفة الأستاذ الدكتور رئيس الجامعة، ويقوم بتنظيمه مكتب الطلبة الوافدين ونادي الطلبة الوافدين.',
                'توفر الجامعة خدمة بوابة السفارات من خلال موقعها حيث تتمكن الملحقيات الثقافية من معرفة أوضاع طلبتهم الأكاديمية والسلوكية ومتابعتهم.',
                'توفير قاعة مكيفة خاصة للطلبة الوافدين للراحة والاجتماع والدراسة في أوقات فراغهم، كما توفر قاعة مجهزة بأجهزة حاسوب وشاشات عرض تلفزيونية وخدمات الإنترنت ومختلف وسائل التواصل والبحث العلمي لطلبة الدراسات العليا.'
              ]} />
            </div>
          </div>
        );

      case 'res-supervision':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الإشراف على الطالبات" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة الإشراف على الطالبات" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <NumList items={[
                'الإشراف على سير العمل داخل الوحدات السكنية.',
                'متابعة استقبال الطالبات المستجدات وإعداد الملفات الخاصة بذلك.',
                'وضع الخطط والبرامج التثقيفية والترفيهية لطالبات المساكن.'
              ]} />
            </div>
          </div>
        );

      case 'res-followup':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة متابعة منازل الطالبات" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة متابعة منازل الطالبات" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <NumList items={[
                'متابعة كل ما يتعلق بصيانة السكنات وتأمين اللوازم والتجهيزات الخاصة بها بالتنسيق مع شعبة اللوازم والمباني والتجهيزات في العمادة.',
                'الإشراف على أمور السلامة العامة في السكنات ومرافقها المختلفة.'
              ]} />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ولدائرة السكنات خطط فصلية تتضمن</h3>
              <NumList items={[
                'إقامة بازارات خيرية ولمناسبات مختلفة، وذلك من خلال اللجان المختلفة المشكلة في السكنات.',
                'إقامة أطباق خيرية أسبوعية الهدف منها توفير وجبات غذائية مرة في الأسبوع للطالبات داخل السكنات وذلك حسب الطلب والمناسبات المختلفة.',
                'عقد دورات في السلامة العامة بالتعاون مع مديرية الدفاع المدني لمشرفات السكنات الداخلية من أجل إعادة تأهيل وتدريب المشرفات على الإسعافات الأولية الضرورية وكلما دعت الحاجة.',
                'عقد ندوات دينية، تربوية، صحية بالتعاون والتنسيق مع كلية الشريعة، وكلية العلوم التربوية، وعيادة الطلبة في المركز الصحي.',
                'تنظيم وتشكيل اللجان الداخلية للطالبات في كل وحدة سكنية للتنسيق والمتابعة والتواصل مع المشرفات في سبيل إنجاح النشاطات المختلفة داخل السكنات.',
                'تنظيم الرحلات الجامعية الترفيهية لطالبات السكنات بشكل عام إلى مناطق مختلفة من الأردن.',
                'إقامة حفلات التخرج للطالبات القاطنات في السكن الداخلي وتكريم الطالبات المتفوقات.'
              ]} />
            </div>
          </div>
        );

      case 'sp-halls':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الصالات والملاعب الرياضية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة الصالات والملاعب الرياضية" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ومن مهامها</h3>
              <NumList items={[
                'الإشراف على الصالات والملاعب الرياضية وجاهزيتها.',
                'متابعة صيانة المرافق الرياضية مع شعبة اللوازم والمباني والتجهيزات.'
              ]} />
            </div>
          </div>
        );

      case 'sp-org':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة التنظيم الرياضي" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة التنظيم الرياضي" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ومن مهامها</h3>
              <NumList items={[
                'إعداد خطط الأنشطة الرياضية وتحديد متطلباتها.',
                'تنظيم البطولات والمسابقات الرياضية للطلبة.',
                'تحديد احتياجات الفرق الطلابية بالتنسيق مع المعنيين.',
                'تأمين الاحتياجات الخاصة بالبطولات الرياضية (إسعافات أولية وغيرها).',
                'إعداد التقارير عن المشاركات الرياضية.'
              ]} />
            </div>
          </div>
        );

      case 'sp-training':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة التدريب الرياضية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة التدريب الرياضية" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ومن مهامها</h3>
              <NumList items={[
                'وضع وتنفيذ خطط التدريب للفرق الرياضية.',
                'تحديد طبيعة الدورات التدريبية للمدربين والمشرفين الرياضيين.',
                'تقييم أداء الفرق الرياضية في الجامعة وتجهيز التقارير الخاصة بذلك.',
                'تحديد احتياجات الفرق الطلابية بالتنسيق مع المعنيين.',
                'إعداد التقارير عن المشاركات الرياضية.'
              ]} />
            </div>
          </div>
        );

      case 'cu-media':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الاعلام" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة الاعلام" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">شعبة صحيفة مؤتة والمواد المطبعية</h3>
              <p className="text-gray-700 leading-[2.1] text-justify">
                وتتولى مسؤولية إصدار المطبوعة الطلابية الرئيسية في الجامعة، وهي صحيفة مؤتة، وتشمل على
                النشاطات الطلابية والأخبار الجامعية، بالإضافة إلى نشاطات المجتمع المحلي، وكذلك إصدار
                دليل الطالب، والإشراف على أية مطبوعات تصدرها العمادة.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">شعبة التوثيق والإعلام الطلابي</h3>
              <p className="text-gray-700 leading-[2.1] text-justify">
                وتتولى توثيق الأخبار المتعلقة بالنشاطات الجامعية الطلابية وتلك الخاصة بعمادة شؤون
                الطلبة، بالإضافة إلى توفير التغطية الإخبارية بمختلف وسائل الإعلام للنشاطات الطلابية.
              </p>
            </div>
          </div>
        );

      case 'cu-arts':
      case 'cu-porcelain':
      case 'cu-design':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الفنون التشكيلية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة الفنون التشكيلية" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                وهي المسؤولة عن كل ما يتعلق بنشاطات الطلبة في مجالات الرسم والأشغال اليدوية والتصويري
                والخط وتشكيل النحاس، ويتبع لها فرع الخزف الذي يشمل استديو خاص للخزف.
              </p>
            </Prose>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">فرع الخزف</h3>
              <p className="text-gray-700 leading-[2.1] text-justify">
                يعنى فرع الخزف — والذي يضم استوديو الخزف (الفخار) — بأعمال الخزف وتدريب الطلبة على
                المهارات كافة المتعلقة بإنتاج الخزف، ولذلك تقوم العمادة بتوفير جميع المواد التي تلزم
                لصقل هذه المهارات لدى الطلبة، وبالإضافة إلى ذلك تقوم العمادة بالتعاون مع المجتمع المحلي
                بتدريب عدد من المهتمين في هذا المجال، وتوفر لهم الإمكانات كافة مساهمة منها في مساعدتهم
                لإيجاد فرص عمل تؤمن لهم دخلاً منتظماً وتمنحهم شهادات موقعة من عميد شؤون الطلبة ومدير
                مؤسسة التدريب المهني في محافظة الكرك.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">المرسم والخط</h3>
              <p className="text-gray-700 leading-[2.1] text-justify">
                يتبنى المرسم الطلبة المبدعين ويوفر لهم الفرصة الكاملة بتوجيه بنّاء لإنتاج اللوحات الفنية
                التي تعرض بمعارض فنية في قاعات داخل الجامعة وخارجها، كما يقدم المرسم عنايته للطلبة
                المهتمين بفن الكاريكاتير، وتهتم الشعبة بتنمية مهارات الطلبة في الخط العربي من خلال
                إقامة الدورات الأولية والمتقدمة لهم، وإشراك المميزين منهم بالمسابقات التي تقام على
                مستوى الجامعة والجامعات الأردنية.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">وتهدف شعبة الفنون التشكيلية إلى</h3>
              <NumList items={[
                'تدريب الطلبة على مبادئ الرسم والخزف والخط بشتى أنواعه.',
                'توجيه الطلبة الموهوبين في الرسم والخزف والخط وصقل مواهبهم وعمل لوحات بأسمائهم.',
                'تنظيم دورات في الرسم والخزف والخط.',
                'تدريب المهتمين من الجامعة والمجتمع المحلي في مجال الخزف مع الإمكانات الفنية كافة مساهمة منها في مساعدتهم لإيجاد فرص عمل تؤمن لهم دخلاً منتظماً، وتمنحهم شهادات موقعة من الجامعة وبالتعاون مع مؤسسة التدريب المهني.',
                'تطوير عمل المشرفين في مختلف التخصصات: الرسم، والخزف، والأشغال اليدوية، والخط.',
                'تدريب الطلبة على المهارات كافة المتعلقة بإنتاج الخزف.',
                'إقامة المعارض الفنية داخل الجامعة، والمشاركة في المعارض التي تقام خارجها وتدعى لها الجامعة.',
                'اختيار وتدريب الطلبة المتميزين في مجال الرسم والخط والخزف، سواء كانوا من طلبة التفوق الفني أو طلبة الجامعة أصحاب المواهب.',
                'متابعة التزام الطلبة المقبولين على أساس التفوق الفني في الفنون التشكيلية.',
                'الإشراف على إقامة المعارض من أعمال الطلبة داخل الجامعة وخارجها في مختلف المهارات.',
                'تعلم الرسم على القماش والمخمل والحرير والزجاج بوساطة الألوان الزيتية والمائية والطباشير والباستيل عن طريق الدورات المستمرة.'
              ]} />
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">القبول على أساس التفوق الفني</h3>
              <p className="text-sm text-gray-700 leading-[2] text-justify mb-6">
                تقبل جامعة مؤتة كل عام مجموعة من الطلبة على أساس التفوق الفني من الطلبة المميزين في هذا
                المجال، والذين تم قبولهم في الجامعة ضمن أي برنامج للدراسة في العام الدراسي الحالي أو
                ضمن الدورة الشتوية. وتقوم دائرة النشاط الثقافي والفني بإعداد برنامج لقبول الطلبة ضمن
                هذا التفوق ممن لديهم مهارات:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {['العزف','الغناء','المسرح','الرسم','الخط العربي','الخزف'].map((sk, i) => (
                  <div key={sk} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-5 py-3.5">
                    <span className="w-6 h-6 rounded-full bg-[#0f3057] text-[#c9a227] text-[11px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="text-sm font-semibold text-[#0f3057]">{sk}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-[2] mb-4">
                وتقوم الدائرة باختبار الطلبة المتفوقين ضمن البرنامج وفق تعليمات التفوق الفني المعمول
                بها في الجامعة:
              </p>
              <NumList items={[
                'أن يكون الطالب مقبولاً في الجامعة.',
                'أن يكون لديه وثائق تثبت تفوقه في المهارة التي يتقدم لها.',
                'أن يخضع لامتحان المقابلة الشخصية وامتحان المهارة العملي والتحريري.'
              ]} />
            </div>
          </div>
        );

      case 'cu-music':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الموسيقى والمسرح" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة الموسيقى والمسرح" className="w-full max-h-[420px] object-cover" />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">النشاط المسرحي</h3>
              <p className="text-gray-700 leading-[2.1] text-justify mb-6">
                يتبنى هذا النشاط الطلبة الموهوبين ممن لديهم الميول المسرحية بإقامة الورشات المسرحية في
                التمثيل والإخراج والإدارة المسرحية، حيث يستطيع الطالب ممارسة النشاط من خلال الالتحاق
                بفرقة المسرح الجامعي، حيث تقوم الفرقة بالأعمال المسرحية المحلية داخل الجامعة وخارجها.
              </p>
              <NumList items={[
                'اختيار وتدريب أعضاء الفرق المسرحية من الطلبة الموهوبين.',
                'متابعة التزام الطلبة المقبولين على أساس التفوق الفني في أنشطة المسرح.',
                'الإشراف على مشاركات الفرق المسرحية داخل وخارج الجامعة.'
              ]} />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">النشاط الموسيقي</h3>
              <p className="text-gray-700 leading-[2.1] text-justify mb-4">
                ويهتم بالطلبة الهواة، حيث يتم عقد دورات تدريبية تمكن الطالب من خلالها تعلم العزف على
                الآلات الموسيقية المختلفة، وتعلم قراءة النوتة الموسيقية، وتعلم المقامات والغناء بشكل
                صحيح. وفرقة الحركات الأدائية والدبكات الشعبية، وفرقة الشباب (الجيتارات) وفرقة الإنشاد
                الديني.
              </p>
              <p className="text-gray-700 leading-[2.1] text-justify mb-6">
                كما يمكن للطلبة الذين يتقنون العزف استخدام صالات النشاط الموسيقي لممارسة هواياتهم في
                أوقات فراغهم.
              </p>
              <NumList items={[
                'تدريب الطلبة على العزف والغناء المنفرد والجماعي.',
                'تكوين فريق غناء (كورال).',
                'تدريب الطلبة المشاركين في جائزة الحسن للشباب.',
                'المشاركة في الاحتفالات الوطنية التي تقام داخل الجامعة وخارجها.',
                'متابعة التزام الطلبة المقبولين على أساس التفوق الفني الموسيقي وتدريبهم.'
              ]} />
            </div>
          </div>
        );

      case 'cu-culture':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة النشاط الثقافي والإعلامي" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة النشاط الثقافي والإعلامي" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                تهتم هذه الشعبة في عمادة شؤون الطلبة بالطالب الجامعي بوصفه محور العملية التعليمية
                الرامية إلى بناء شخصيته وتشجيعها بشكل متكامل ودعم مواهبه وهواياته المتنوعة، وتركز
                الشعبة على الجانب الثقافي والأدبي وذلك في إفساح فرص المشاركة للطلبة في النشاطات
                الثقافية التي تتماشى وميولهم واستعداداتهم، وإبراز ثقافتهم ومهاراتهم وتنمية إبداعاتهم
                الأدبية في مختلف المجالات.
              </p>
            </Prose>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">وتناط بها المهام الآتية</h3>
              <NumList items={[
                'إعداد خطة النشاطات الثقافية فصلياً والعمل على تنفيذها.',
                'الإعداد للمسابقات الثقافية داخل الجامعة.',
                'تنظيم مشاركات الطلبة في المسابقات الثقافية المختلفة التي تنظمها الجامعات الشقيقة والمؤسسات المحلية والخارجية.',
                'متابعة إصدار صحيفة مؤتة، من حيث التحرير والطباعة والتدقيق.',
                'متابعة إصدار دليل الطالب على الموقع الإلكتروني للعمادة.',
                'متابعة الإعلان عن الأنشطة الطلابية للعمادة كاملة مع دائرة العلاقات الثقافية والعامة.',
                'تشجيع أصحاب القلم والفكر في الجامعة وتنمية موهبة الكتابة لدى الطلبة.'
              ]} />
            </div>
          </div>
        );

      case 'act-alumni':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الفرق الطلابية وشؤون التخريج" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة الفرق الطلابية وشؤون التخريج" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ومهامها</h3>
              <NumList items={[
                'إعداد السجلات الخاصة بالخريجين.',
                'متابعة كل ما يتعلق باحتفالات التخريج.',
                'متابعة الخريجين وإدامة التواصل معهم.',
                'تشكيل فرق الجوالة وإقامة المعسكرات التدريبية.',
                'تنسيق برنامج جائزة الحسن للشباب والسابلة.',
                'الإشراف على فريق الرواد والقيادة الواعدة لإعداد الأهداف.',
                'التنسيق والإعداد للكتاب السنوي.'
              ]} />
            </div>
          </div>
        );

      case 'act-initiatives':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة المبادرات والنشاط الإجتماعي" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة المبادرات والنشاط الاجتماعي" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p className="font-bold text-[#0f3057]">شعبة المبادرات الطلابية</p>
              <p>
                تسعى هذه الشعبة إلى تبنّي أفكار ومبادرات الطلبة من خلال ترجمتها إجرائياً على أرض
                الواقع، وتهدف إلى النهوض بأفكار الطلبة وصقل شخصياتهم من خلال تحمل الطلبة روح المسؤولية.
              </p>
            </Prose>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-2">شعبة الأنشطة الاجتماعية</h3>
              <p className="text-sm text-gray-600 mb-6">ومهامها</p>
              <NumList items={[
                'الإشراف على الرحلات الترفيهية والوطنية للطلبة.',
                'الإشراف التام على مختلف الأنشطة الاجتماعية للطلبة.',
                'تخطيط وتنفيذ الأعمال التطوعية والتنسيق مع المجتمع المحلي.'
              ]} />
            </div>
          </div>
        );

      case 'act-union':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الأندية الطلابية واتحاد الطلبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة الأندية الطلابية واتحاد الطلبة" className="w-full max-h-[420px] object-cover" />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ومهامها</h3>
              <NumList items={[
                'الإشراف التام على الهيئات الطلابية (الأندية الطلابية واتحاد الطلبة).',
                'الإعداد لانتخابات الطلبة (لعضوية مجلس اتحاد الطلبة، وعضوية الأندية الطلابية).',
                'إعداد الخطط والبرامج الخاصة بالأندية الطلابية ومتابعتها.',
                'متابعة أنشطة الاتحاد والاحتفاظ بسجلات مفهرسة ومنظمة.'
              ]} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-5">وتضم الشعبة الأندية التالية</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  'نادي النهضة والتراث / دائرة الهيئات الطلابية',
                  'النادي البيئي والصحي / دائرة الهيئات الطلابية',
                  'النادي الطبي / دائرة الهيئات الطلابية',
                  'النادي الأدبي / دائرة الهيئات الطلابية',
                  'نادي كلنا الأردن / دائرة الهيئات الطلابية',
                  'نادي حقوق الإنسان / دائرة الهيئات الطلابية',
                  'النادي العلمي / دائرة الهيئات الطلابية',
                  'النادي الهندسي / دائرة الهيئات الطلابية',
                  'نادي الشطرنج / دائرة الهيئات الطلابية',
                  'النادي الزراعي / دائرة الهيئات الطلابية',
                  'النادي الرياضي / دائرة الهيئات الطلابية',
                  'نادي الريادة / دائرة الهيئات الطلابية',
                  'نادي سفراء جامعة مؤتة',
                  'نادي ذوي الإعاقة / مكتب التوجيه والإرشاد الطلابي والمجتمعي',
                  'نادي الطلبة الوافدين / مكتب الطلبة الدوليين'
                ].map((c) => (
                  <div key={c} className="flex items-start gap-2.5 border border-gray-200 rounded-xl px-5 py-3.5 hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227] shrink-0 mt-2" />
                    <span className="text-sm text-gray-700 leading-relaxed">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">أهداف الأندية والجمعيات الطلابية</h3>
              <NumList items={[
                'تشجيع الميول التطوعية والخدمة العامة والعمل الجماعي بين طلبة الجامعة.',
                'تنمية المواهب والهوايات وتشجيعها.',
                'إفساح الفرص لطلبة الجامعة للمشاركة في النشاطات التي تتناسب مع ميولهم وقدراتهم واستعداداتهم العلمية.',
                'إفساح المجال للطلبة غير الأردنيين للمشاركة في النشاطات الطلابية وإظهار ثقافتهم وميولهم ومهاراتهم.',
                'تنمية الاهتمام بالنواحي الجمالية والذوقية.',
                'تنمية الاهتمام بالتراث الحضاري في الأردن والوطن العربي والعالم الإسلامي والعناية بالثقافة المحلية والعالمية.'
              ]} />
              <p className="text-sm text-gray-700 leading-[2] mt-6">
                تمارس الأندية والجمعيات اختصاصها وتعمل على تحقيق أهدافها من خلال الهيئتين التاليتين:
                أ‌. الهيئة العامة. ب‌. الهيئة الإدارية.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">وتضم شعبة الأندية الطلابية واتحاد الطلبة فرع متابعة الأنشطة</h3>
              <p className="text-sm text-gray-700 leading-[2] text-justify">
                يهدف هذا الفرع إلى متابعة الأنشطة، سواء داخل الجامعة أو خارجها، والتي يقوم بها الطلبة
                من خلال مشاركتهم الفاعلة أو حضور هذه الأنشطة، والتي تهدف إلى بناء شخصية الطالب
                المتكاملة، والمساهمة في بناء وتقدم جامعته ووطنه.
              </p>
            </div>
          </div>
        );

      case 'ss-disabilities':
      case 'gd-disabilities':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة رعاية ذوي الاحتياجات الخاصة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة رعاية ذوي الاحتياجات الخاصة" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                تم إنشاء شعبة لذوي الاحتياجات الخاصة في عمادة شؤون الطلبة / جامعة مؤتة بموجب قرار مجلس
                التعليم العالي رقم (320) تاريخ 19/9/2007، وتناط بالشعبة المهام الآتية.
              </p>
            </Prose>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">مهام الشعبة</h3>
              <NumList items={[
                'احترام حقوق طلبة ذوي الاحتياجات الخاصة في الحصول على التعليم والمعرفة.',
                'الدعم النفسي لطلبة الجامعة ذوي الاحتياجات الخاصة بفئاتهم الثلاث: الإعاقة البصرية، والسمعية، والحركية — ويشمل: مساعدة الطالب على تقبل ذاته بوضعه الراهن، وتعزيز مفهوم الذات الإيجابي ورفع تقدير الذات، وتعزيز اعتماده على ذاته ورعايتها ودراسة مشكلاتهم والعمل على حلها.',
                'تطوير مهارات التواصل وإدارة الضغط النفسي لديهم، من خلال تمكين الطلبة ذوي الاحتياجات الخاصة الملتحقين في الجامعة على تحقيق أعلى درجة من التكيف النفسي والاجتماعي والتحصيل الأكاديمي وفقاً لما تسمح به قدراتهم.',
                'عقد دورات تمكن الطلبة ذوي الاحتياجات الخاصة من بناء المهارات كل حسب مجاله وحاجاته.',
                'دراسة مشكلات هؤلاء الطلبة والعمل على حلها.',
                'دمج طلبة ذوي الاحتياجات الخاصة مع أقرانهم من غير ذوي الاحتياجات الخاصة في برامج تدريبية وتثقيفية وترفيهية معدة مسبقاً.',
                'المساهمة في تذليل وإيجاد الحلول للمشاكل والمعيقات كافة التي تواجه الطلبة ذوي الاحتياجات الخاصة في الجامعة.',
                'تحقيق مساهمة الطلبة ذوي الاحتياجات الخاصة في المشاركة الفاعلة في النشاطات الطلابية كافة في الجامعة وعلى قدر المساواة.',
                'العمل على توفير مجموعة من الطلبة المتطوعين لقراءة المواد الأكاديمية للطلبة المكفوفين بشكل مباشر.',
                'التعاون مع الجهات الرسمية وغير الرسمية كافة التي تعنى بهذه الفئة.',
                'دعم الإبداعات الفردية والجماعية للطلبة ذوي الاحتياجات الخاصة، مثل الدعم الذي قدمته الجامعة لأحد الطلبة الصم حيث قام بتصميم برنامج حاسوبي لتعليم لغة الإشارة العربية الموحدة، وقد تكفلت الجامعة بطباعة أغلفة القرص التعليمي ورشحته لجائزة الملك عبد الله الثاني ابن الحسين للإبداع، وقدمت له الدعم المناسب لحضور مؤتمر في دولة قطر بوصفه خبيراً في لغة الإشارة.'
              ]} />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">الخدمات المقدمة للطلبة ذوي الاحتياجات الخاصة في الجامعة</h3>
              <NumList items={[
                'خصم على الرسوم الجامعية وبنسبة تصل إلى (90%) من رسوم الساعات المعتمدة.',
                'توفير طلبة مرافقين لطلبة ذوي الاحتياجات الخاصة وعلى نظام تشغيل الطلبة.',
                'زيادة قدرة الجامعة لتلبية احتياجات ذوي الاحتياجات الخاصة.',
                'مساعدة طلبة ذوي الاحتياجات الخاصة في التغلب على التحديات التي تواجههم في الدراسة.',
                'توفر قاعة مخصصة ومجهزة بأجهزة كمبيوتر حديثة للطلبة ذوي الاحتياجات الخاصة لاستخدامها في دراستهم ونشاطاتهم.',
                'العمل على توفير برامج حاسوبية ناطقة للطلبة المكفوفين وضعاف البصر في الدائرة.',
                'تسهيل آلية التواصل مع الطلبة ذوي الاحتياجات الخاصة.',
                'عقد دورات متخصصة لطلبة الجامعة من ذوي الاحتياجات الخاصة في مجالات: لغة الإشارة (دورات للمبتدئين وأخرى متقدمة) وطريقة «برايل» ومهارات الحاسوب الناطق، ومهارات الحاسوب للطلبة الصم، ومهارات الحركة والتنقل.',
                'الإشراف على نادي أصدقاء ذوي الاحتياجات الخاصة.',
                'العمل على توفير نسخ مطبوعة بطريقة «برايل» للطلبة المكفوفين.',
                'توفير الخدمات الترفيهية من رحلات وأنشطة ثقافية.',
                'تقديم خدمات الإرشاد والتوجيه النفسي للطلبة ذوي الاحتياجات الخاصة في الجامعة ودراسة مشكلاتهم الأسرية والأكاديمية والتكيفية والاجتماعية والعمل على حلها.',
                'التواصل مع الدوائر والأقسام المختلفة داخل الجامعة لحل مشكلات الطلبة ذوي الاحتياجات الخاصة.',
                'مساعدة الطلبة ذوي الاحتياجات الخاصة في تسجيل المواد وتنظيم الجدول الدراسي في كل فصل دراسي، حيث يتم تحديد وقت مبكر يسبق تسجيل طلبة الجامعة الآخرين ليتمكن الطالب من تحديد جدوله الدراسي بشكل يتناسب ووضعه الصحي، والعمل على نقل قاعات المحاضرات لهؤلاء الطلبة بما يتناسب مع وضعهم الصحي.'
              ]} />
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">نادي أصدقاء ذوي الإعاقة</h3>
              <p className="text-sm text-gray-700 leading-[2] text-justify mb-6">
                يتم العمل داخل النادي على يد مجموعة من الخبراء والمدربين لتقديم المساعدة على أساس علمي
                ونفسي سليم يعمل على تصحيح مسار الإعاقة لدى الفتيات والشباب من ذوي الاحتياجات الخاصة
                والعمل على دمجهم داخل المجتمع.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#0f3057] text-white">
                      <th className="px-5 py-3 text-right font-bold">الطالب/ ـة</th>
                      <th className="px-5 py-3 text-right font-bold w-40">المنصب</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['نغم علي المواجدة', 'رئيساً'],
                      ['ادهم مالك المدادحة', 'نائب الرئيس'],
                      ['محمد حامد السحيمات', 'أميناً للصندوق'],
                      ['مجد احمد المعايطة', 'أميناً للسر'],
                      ['علي فراس المواجدة', 'عضواً'],
                      ['سرين سليمان الرماحنة', 'عضواً'],
                      ['اسراء فايز النوايسة', 'عضواً']
                    ].map((r, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'border-t border-gray-100 bg-white' : 'border-t border-gray-100 bg-[#F8FAFC]'}>
                        <td className="px-5 py-3.5 font-semibold text-[#0f3057]">{r[0]}</td>
                        <td className="px-5 py-3.5 text-gray-600">{r[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-5">وحدة رعاية ذوي الاحتياجات الخاصة</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  '02%20at%2010.56.50.jpeg',
                  '-11-02%20at%2010.55.12.jpeg',
                  '0.55.12%20%281%29.jpeg',
                  '-02%20at%2010.56.52.jpeg'
                ].map((f) => (
                  <div key={f} className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 aspect-[4/3]">
                    <img src={`https://www.mutah.edu.jo/ar/studentaffairs/SiteAssets/Pages/Forms/EditForm/${f}`} alt="وحدة رعاية ذوي الاحتياجات الخاصة" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'ss-loans':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة القروض والمساعدات" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة القروض والمساعدات" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ومهامها</h3>
              <NumList items={[
                'إجراء جميع المخاطبات والمراسلات الخاصة بتشغيل الطلبة في مرافق الجامعة من الصناديق الخاصة بذلك ومتابعة سير عملهم في دوائر وكليات الجامعة.',
                'الإعداد لاجتماعات لجنة صندوق الطلبة المدنيين وصندوق التبرعات وتنفيذ القرارات الصادرة عنها.',
                'متابعة معاملات تأجيل دفع الرسوم الفصلية ورفعها إلى الدائرة المالية وذلك من خلال النظام المحوسب المعد لهذه الغاية.',
                'تقديم المنح المالية للطلبة المتفوقين أكاديمياً.',
                'تسديد ملاحظات الطلبة على النظام.'
              ]} />
            </div>
          </div>
        );

      case 'ss-computer':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الحاسوب" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة الحاسوب" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                تم استحداث شعبة الحاسوب في عمادة شؤون الطلبة بحيث تتبع مباشرة إلى مكتب عميد شؤون
                الطلبة، بهدف إعداد البرامج والأنظمة التي تحتاجها دوائر عمادة شؤون الطلبة، لإنجاز عملها
                بالسرعة وتوفيراً للوقت والجهد المبذولين من خلال البرامج التي يعدها مركز الحاسوب
                بالتنسيق مع شعبة الحاسوب في العمادة، وذلك لتحقيق الدقة في العمل، وترابط المعلومات،
                وبذلك يسهل على الدوائر المعنية إنجاز عملها، وأرشفة البيانات والأنشطة كافة إلكترونياً
                ليسهل الرجوع إليها وقت الحاجة للوصول إلى عمادة شؤون الطلبة إلكترونياً.
              </p>
            </Prose>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">وتناط بالشعبة المهام الآتية</h3>
              <NumList items={[
                'متابعة البرامج المحوسبة في عمادة شؤون الطلبة والعمل على تطويرها وإنشاء برامج جديدة تنسجم مع متطلبات العمل وبما يخدم العمل ويوفر الوقت والجهد.',
                'عمل الإحصائيات المتعلقة بطلبة الجامعة بشكل عام من حيث أعداد الطلبة المقبولين في كل فصل والطلبة الخريجين والفاقدين لمقاعدهم لأي سبب كان.',
                'عمل البروشورات التوضيحية للطلبة والبروشورات الخاصة بأنشطة الطلبة وفعالياتهم على مستوى العمادة.',
                'متابعة الصيانة مع مركز الحاسوب وشعبة اللوازم في الجامعة.',
                'متابعة وتطوير وتحديث موقع عمادة شؤون الطلبة ونشر الإعلانات الخاصة بعمادة شؤون الطلبة أو المجتمع المحلي.',
                'متابعة حساب (عمادة شؤون الطلبة) وصفحة العمادة (deanship of students’ affairs) ونشر الإعلانات المتعلقة بعمادة شؤون الطلبة أو المجتمع المحلي على الفيس بوك.',
                'متابعة المجموعات المنشأة على الفيس بوك (إعلانات العمادة، صندوق اقتراحات العمادة).',
                'تطوير وتحديث موقع عمادة شؤون الطلبة.',
                'أية أعمال أخرى تكلف بها الشعبة بما يخدم دوائر العمادة.'
              ]} />
            </div>
          </div>
        );

      case 'ss-status':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة أحوال الطلبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة أحوال الطلبة" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">وتقوم بالمهام التالية</h3>
              <NumList items={[
                'استقبال الطلبة الجدد على جميع المستويات.',
                'تثبيت بيانات الطالب إلكترونياً من خلال موقع الجامعة وإصدار هوية جامعية والاحتفاظ بذلك حاسوبياً، وتوثيق المعلومات الواردة من الكليات عن الطالب.',
                'متابعة تسليم مفقودات الطلبة حسب الأصول.',
                'إصدار (باجات) لبعض عمادات ووحدات ودوائر الجامعة في الجناح المدني والعسكري بالإضافة إلى بعض الدوائر الحكومية في قصبة الكرك.',
                'إعداد البرامج الحاسوبية اللازمة لمختلف دوائر العمادة.',
                'عمل الإحصائيات الفصلية اللازمة وإعداد البرامج اللازمة لاستقبال الطلبة المستجدين.',
                'إصدار الوثائق التي يحتاجها الطلبة (مثل حسن السلوك) … الخ.',
                'تصميم وتجهيز النشرات والمطويات التثقيفية التي تصدرها العمادة.',
                'تسديد ملاحظات الطلبة على النظام.'
              ]} />
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-[#c9a227] mb-5">تضم شعبة أحوال الطلبة فرع براءة الذمة</h3>
              <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside leading-relaxed">
                <li>يُعنى هذا الفرع بإصدار وثائق براءة الذمة للطلبة ومتابعتها.</li>
                <li>تسديد جميع الملاحظات المتعلقة ببراءة الذمة على النظام.</li>
              </ul>
            </div>
          </div>
        );

      case 'ss-insurance':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة التأمينات و الإعفاءات للطلبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة التأمينات والإعفاءات للطلبة" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ومهامها</h3>
              <NumList items={[
                'متابعة إجراءات التأمين الصحي للطلبة، وذلك حسب العقود المبرمة مع الجهة المتعاقد معها.',
                'إعداد محاضر اجتماع لجنة التأمين الصحي للطلبة للنظر في فواتير العلاج والمطالبات المقدمة منهم ليتم صرفها حسب الأصول.',
                'إتمام معاملات التأمين على حياة الطلبة في الجامعة وطلبة المدرسة النموذجية والطلبة المبعوثين في حالات الوفاة أو الإصابة، ومتابعتها مع الشركة المعنية، وإجراء جميع المخاطبات والمراسلات الخاصة بذلك.',
                'تسديد جميع الملاحظات على معاملات الطلبة فيما يتعلق بالتأمين الصحي والتأمين على الحياة، وإنشاء قاعدة بيانات خاصة بذلك لزيادة الدقة والتوثيق وسهولة استخراج المعلومات والإحصائيات عند الحاجة.',
                'تجهيز معاملات إعفاء الطلبة من أبناء الشهداء والمصابين العسكريين، وإعداد جداول الأعمال ومحاضر الاجتماعات الخاصة بذلك.',
                'إتمام معاملات الطلبة ذوي الإعاقة ومتابعتها مع اللجنة الطبية في الجامعة وإعطاءهم الخصم الخاص من الرسوم الدراسية حسب الأصول.'
              ]} />
            </div>
          </div>
        );

      case 'about-diwan':
        return (
          <div className="space-y-8">
            <PageTitle title="ديوان عمادة شؤون الطلبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="ديوان عمادة شؤون الطلبة" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p className="font-bold text-[#0f3057]">ديوان عمادة شؤون الطلبة</p>
              <p>ويضم ديوان عمادة شؤون الطلبة فرعين: فرع الوارد، وفرع الصادر.</p>
              <p>يقوم ديوان عمادة شؤون الطلبة بالإشراف على الكتب الصادرة والواردة من خلال فرعيه.</p>
            </Prose>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">مهام الديوان</h3>
              <NumList items={[
                'مخاطبة الجهات الرسمية داخل وخارج الجامعة والرد عليها من خلال المراسلات الرسمية (ورقي، فاكس، أيميل).',
                'التنسيق المباشر مع دوائر عمادة شؤون الطلبة بخصوص أي كتاب عاجل وارد إلى الديوان.',
                'استلام البريد من جميع الجهات الداخلية في الجامعة والخارجية.',
                'توزيع البريد الصادر من عمادة شؤون الطلبة مباشرة كل ضمن اختصاصه والتدقيق عليه.',
                'استقبال وإرسال الفاكسات ومعرفة مسارها وأين انتهت.',
                'تقديم النصح والمشورة إلى الطلبة وتحويلهم إلكترونياً إلى المركز الصحي.',
                'الإشراف على الطباعة من حيث الدقة وسرعة الإنجاز وتوزيع العمل بين الطابعات وعمال البريد.',
                'فتح ملف لكل موظف في العمادة ومتابعة دوام العاملين والتدقيق عليه وتنظيم السجلات الخاصة بالعمل الإضافي والإجازات والمغادرات والعقوبات.',
                'تصوير البريد الصادر والوارد كل ضمن اختصاصه وتوزيع الإعلانات الخاصة بالطلبة.',
                'توفير القرطاسية للدوائر.',
                'متابعة تنفيذ قرارات العميد.',
                'المشاركة في اجتماعات الدوائر في العمادة مع العميد.',
                'أية مهام أخرى يكلف بها من قبل العميد.'
              ]} />
            </div>
          </div>
        );

      case 'srv-work':
        return (
          <div className="space-y-8">
            <PageTitle title="طلبات التشغيل" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="طلبات التشغيل" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                تسعى عمادة شؤون الطلبة إلى توفير الخدمات التي من شأنها توفير الوقت والجهد على طلبتنا،
                حيث تقوم عمادة شؤون الطلبة بتشغيل الطلبة في مختلف مرافق الجامعة ضمن الشروط التالية:
              </p>
            </Prose>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">شروط التشغيل</h3>
              <NumList items={[
                'أن يكون الطالب أردني الجنسية.',
                'التشغيل للطلبة الذين معدلاتهم لا تقل عن 60% لمرحلة البكالوريوس فقط.',
                'أن يكون الطالب المتقدم للتشغيل قد مضى على انتظامه في الجامعة فصل دراسي واحد على الأقل.',
                'أن لا يكون الطالب المتقدم للتشغيل مبعوثاً من جهة رسمية أو غير رسمية.',
                'أن لا يكون الطالب المتقدم للتشغيل موظفاً.',
                'أن لا يكون الطالب المتقدم للتشغيل قد صدر بحقه أي عقوبة تأديبية باستثناء عقوبة التنبيه.',
                'لا يسمح بتسجيل الطالب الذي عمل على الفصل السابق بالتقدم لطلبات التشغيل (التشغيل على فصلين متتاليين).',
                'تطبق نظام التشغيل للطلبة على الفصلين الدراسيين الأول والثاني فقط.',
                'أن لا يكون الطالب المتقدم للتشغيل متوقع تخرجه على الفصل الذي يتقدم فيه للتشغيل.',
                'يستثنى من الشروط السابقة الطلبة المرافقين مع ذوي الإعاقة.'
              ]} />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-2">خطوات تقديم طلبات التشغيل إلكترونياً</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                تقدم طلبات التشغيل إلكترونياً بعد نشر الإعلان عن بدء استقبال طلبات التشغيل على موقع
                الجامعة وصفحة عمادة شؤون الطلبة على الفيس بوك deanship of students affairs.
              </p>
              <NumList items={[
                'ادخل إلى موقع جامعة مؤتة الصفحة الرئيسية (www.mutah.edu.jo).',
                'انقر على الرابط (E-portals).',
                'انقر على رابط تشغيل الطلبة.',
                'ادخل الرقم الجامعي وكلمة المرور ثم انقر على زر حفظ.',
                'تابع الإعلانات على موقع الجامعة وصفحة الفيس بوك deanship of students affairs لمعرفة النتيجة.'
              ]} />
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-[#c9a227] mb-5">ملاحظات</h3>
              <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside leading-relaxed">
                <li>سيتم تحديد عدد المستفيدين بناءً على حاجة كليات ودوائر الجامعة.</li>
                <li>سيتم استثناء أي طالب يحصل على عقوبة أو منحة أو قرض تعليم عالي أو تغيير مصدر الإنفاق، حيث سيتم حذف اسمه من القوائم النهائية أو تغيير وضع الطالب.</li>
                <li>لن يتم استقبال أي طلب بعد انتهاء المدة المحددة حيث سيتم إيقافه إلكترونياً، ولن يتم استقبال أي طلب بشكل يدوي.</li>
              </ul>
            </div>
            <LinkRow name="برنامج تشغيل الطلبة" url="http://portal1.mutah.edu.jo/v/faces/VForm?_adf.ctrl-state=x0kzi041x_7" />
          </div>
        );

      case 'about-structure':
        return (
          <div className="space-y-8">
            <PageTitle title="الهيكل التنظيمي" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white p-4">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/dsa1%20%283%29.png" alt="الهيكل التنظيمي لعمادة شؤون الطلبة" className="w-full max-h-[560px] object-contain" />
            </div>
          </div>
        );

      case 'act-about':
        return (
          <div className="space-y-8">
            <PageTitle title="دائرة الهيئات والنشاطات الطلابية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="دائرة الهيئات والنشاطات الطلابية" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                تقدم هذه الدائرة الدعم للطلبة من حيث توفير المناخ الطبيعي لهم جنباً إلى جنب مع رحلة
                الدراسة الجامعية، ولذلك تعمل الدائرة على ملاءمة البيئة الجامعية من حيث إفساح المجال
                للطلبة كافة بالمشاركة الشاملة في مجالات الأنشطة المختلفة والمتنوعة في رحاب الجامعة
                وخارجها، حيث يتحقق ذلك من خلال إشراك الطلبة في التخطيط والتنفيذ والتقييم للأنشطة
                المختلفة، علاوة على الانتقال من حيز النظرية إلى الواقع الميداني عن طريق تحضير أبنائها
                الطلبة عامة نحو الجمع ما بين الأنشطة المنهجية واللامنهجية التي تخدم أهداف التنمية
                الوطنية بشكل عام، وتشكل نقلة نوعية في الخدمة التي تقدم للطلبة عبر قنوات الاتصال
                والتشاركية التي يبحث عنها الطلبة في كل جامعة. وتقوم الدائرة بمهامها من خلال الشعب
                الآتية:
              </p>
            </Prose>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['شعبة الأندية الطلابية واتحاد الطلبة','شعبة الأنشطة الاجتماعية','شعبة الفرق الطلابية وشؤون التخريج'].map((d, i) => (
                <div key={d} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:border-[#c9a227] transition-colors">
                  <span className="w-9 h-9 rounded-lg bg-[#0f3057] text-[#c9a227] text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="font-bold text-[#0f3057] text-sm leading-snug">{d}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'career-strategy':
        return (
          <div className="space-y-8">
            <PageTitle title="الرؤية، الرسالة والقيم" sub="مكتب الإرشاد الوظيفي ومتابعة الخريجين" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5">
                  <Eye className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">الرؤية</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  أن يكون شبابنا قادرين على اتخاذ قرارات صحيحة بما يتعلق بحياتهم ومساراتهم الوظيفية،
                  من خلال تقديم العديد من الخدمات والبرامج التدريبية لتطوير مهاراتهم وتهيئتهم للانخراط
                  في سوق العمل.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5">
                  <Target className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">الرسالة</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  العمل على تدريب وتأهيل طلبة الجامعة عن طريق إكسابهم مهارات مهنية وكفايات شخصية لتحقيق
                  أهداف التنمية والتشجيع على الإبداع والتميز، من خلال التعاون مع مؤسسات المجتمع المدني
                  الخاصة والعامة للوصول إلى الاستثمار الأمثل لطاقات أبناء الوطن الكامنة، مما يزيد من
                  فرص توظيفهم ويمهد لهم مساراً وظيفياً ناجحاً.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <Star className="w-6 h-6 text-[#c9a227]" />
                <h3 className="text-xl font-bold text-[#0f3057]">القيم</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {['المهنية والاحتراف.','الجودة والإتقان.','الأمانة والمساواة.','التحسين المستمر.','الاستدامة.'].map((v) => (
                  <div key={v} className="flex items-start gap-2.5 bg-[#F8FAFC] border border-gray-100 rounded-xl px-5 py-3.5">
                    <CheckCircle size={16} className="text-[#c9a227] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'career-brief':
        return (
          <div className="space-y-8">
            <PageTitle title="لمحة تاريخية عن المكتب" sub="مكتب الإرشاد الوظيفي ومتابعة الخريجين / صندوق الملك عبدالله الثاني للتنمية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="مكتب الإرشاد الوظيفي ومتابعة الخريجين" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                إن فكرة «مكتب الإرشاد الوظيفي ومتابعة الخريجين» ظهرت كإحدى توصيات ملتقى شباب الأردن
                لسنة 2003، الذي عقد تحت رعاية جلالة الملك عبدالله الثاني ابن الحسين المعظم، حيث كانت
                التوجيهات الملكية السامية تؤكد على أهمية إيجاد حلقة للتواصل والشراكة بين الطلبة
                ومؤسسات المجتمع المدني التي تساعد على دعم ورعاية التميز والإبداع لدى الطلبة، وإيجاد
                آليات وبرامج في الجامعات لربط الخريجين بسوق العمل وتعريفهم به.
              </p>
              <p>
                وبناءً على توجيهات سيد البلاد بدأت فكرة تأسيس مكاتب الإرشاد الوظيفي ومتابعة الخريجين /
                صندوق الملك عبدالله الثاني للتنمية في الجامعات الأردنية العامة والخاصة، لتعمل على تأهيل
                طلبة الجامعات عن طريق إكسابهم مهارات حياتية وكفايات شخصية لتحقيق أهداف التنمية والتشجيع
                على الإبداع والتميز للوصول إلى الاستثمار الأمثل لطاقات أبناء الوطن الكامنة، مما يزيد من
                فرص توظيفهم ويمهد لهم مساراً وظيفياً ناجحاً.
              </p>
              <p>
                في العام 2004م تم إنشاء مكتب الإرشاد الوظيفي ومتابعة الخريجين / صندوق الملك عبدالله
                الثاني للتنمية في جامعة مؤتة، وكان يحمل اسم «مكتب صندوق الملك عبدالله الثاني للتنمية
                للإرشاد والتأهيل المهني»، وكان نشاطه مقتصراً على تقديم بعض الخدمات لطلبة الجامعة.
              </p>
              <p>
                بتاريخ 24/12/2014م اتخذ مجلس هيئة اعتماد مؤسسات التعليم العالي في جلسته رقم (24/2014)
                القرار رقم (538/24/2014)، والذي ينص على ما يلي: (الموافقة على إضافة بند في معايير
                الاعتماد العام للجامعات العاملة في المملكة الأردنية الهاشمية، يلزم الجامعات بإنشاء مكتب
                تابع لعمادة شؤون الطلبة يسمى — مكتب الإرشاد الوظيفي ومتابعة الخريجين / صندوق الملك
                عبدالله الثاني للتنمية).
              </p>
            </Prose>
          </div>
        );

      case 'off-cases':
        return (
          <div className="space-y-8">
            <PageTitle title="مكتب القضايا الطلابية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="مكتب القضايا الطلابية" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">يقوم المكتب بالمهام التالية</h3>
              <NumList items={[
                'استقبال كافة ملفات المخالفات الطلابية التي يحيلها عطوفة رئيس الجامعة إلى عميد شؤون الطلبة وإلى لجان التحقيق المختصة في عمادة شؤون الطلبة والتي تخرج عن صلاحيات لجان التحقيق في الكليات.',
                'استقبال كافة ملفات المخالفات الطلابية التي يحيلها عطوفة رئيس الجامعة إلى المجلس التأديبي.',
                'التنسيق مع أعضاء المجلس التأديبي ولجان التحقيق بخصوص تحديد مواعيد جلسات التحقيق.',
                'استدعاء الطلبة المحالين إلى المجلس التأديبي ولجان التحقيق خطياً لحضور جلسات التحقيق من خلال عميد شؤون الطلبة للاستماع إلى أقوالهم في المخالفات المنسوبة إليهم، أو الإعلان لهم عن طريق لوحة الإعلانات.',
                'التواصل ودعوة أعضاء المجلس لحضور جلسات المجلس لمناقشة القضايا التأديبية المحالة إلى المجلس والاستماع إلى أقوال الطلبة وشهادات الشهود.',
                'كتابة محاضر اجتماعات المجلس التأديبي ولجان التحقيق.',
                'صياغة كافة المخاطبات والقرارات المتعلقة بالمجلس التأديبي والتوصيات الصادرة عن لجان التحقيق.',
                'متابعة تنفيذ قرارات المجلس التأديبي.',
                'إبلاغ الطلبة بالقرارات الصادرة عن المجلس التأديبي.',
                'الإجابة / الرد عن أية استفسارات ترد إلى أمين السر تتعلق بمخالفات الطلبة بالتنسيق مع رئيس المجلس التأديبي ورؤساء لجان التحقيق.',
                'الاحتفاظ بأصول المخالفات التأديبية ونسخ من قرارات المجلس التأديبي وتوصيات لجان التحقيق.',
                'التعاون مع شعبة إرشاد الطلبة وإيجاد الحلول المناسبة لحل مشكلاتهم.',
                'المتابعة مع لجان التحقيق داخل الكليات ووحدة القبول والتسجيل والأمن الجامعي في القضايا الطلابية.',
                'متابعة تنفيذ قرارات المجلس التأديبي وقرارات عميد شؤون الطلبة المتعلقة بالعقوبات التأديبية.',
                'إبلاغ الكليات والجهات ذات الاختصاص بالقرارات الصادرة عن المجلس التأديبي وعن عميد شؤون الطلبة.',
                'مساعدة الطلبة بحل مشكلاتهم ومتابعتها في كليات ودوائر ومراكز الجامعة.'
              ]} />
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
              <p className="text-sm font-bold text-[#c9a227] mb-1">مدير مكتب القضايا الطلابية</p>
              <p className="text-lg font-bold text-[#0f3057]">د. باسم عبدالمجيد المعايطة</p>
            </div>
          </div>
        );

      case 'srv-electronic':
        return (
          <div className="space-y-8">
            <PageTitle title="الخدمات الإلكترونية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="الخدمات الإلكترونية" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                تسعى عمادة شؤون الطلبة إلى توفير الخدمات التي من شأنها توفير الوقت والجهد على طلبتنا،
                من خلال إنشاء تبويب خاص بعمادة شؤون الطلبة باسم (عمادتي) ضمن الخدمات الإلكترونية، وتحتوي
                على الملاحظات والإعلانات والاستبيانات.
              </p>
            </Prose>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-2">الملاحظات</h3>
              <p className="text-sm text-gray-600 mb-6">يستطيع الطالب من خلالها تدقيق ملفه ومعرفة ما يلي:</p>
              <NumList items={[
                'الملاحظات العامة الخاصة بالطالب المسددة عليه.',
                'ملاحظات براءة الذمة للطالب.',
                'وضع الطالب السلوكي في الجامعة.'
              ]} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['تبويب الإعلانات: تحت الإنشاء.','تبويب الاستبيانات: تحت الإنشاء.'].map((t) => (
                <div key={t} className="flex items-start gap-3 bg-[#F8FAFC] border border-dashed border-gray-200 rounded-xl px-5 py-4">
                  <Info size={16} className="text-gray-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600 leading-relaxed">{t}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-gray-700 mb-4">لمعرفة وضعك في الجامعة انقر على:</p>
              <LinkRow name="الخدمات الإلكترونية" url="http://portal1.mutah.edu.jo/eservice/faces/loginView" />
            </div>
          </div>
        );

      case 'srv-medical':
        return (
          <div className="space-y-8">
            <PageTitle title="خدمات المركز الصحي" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="المركز الصحي" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p className="font-bold text-[#0f3057]">المركز الصحي</p>
              <p>
                تسعى عمادة شؤون الطلبة — ممثلة بدائرة الخدمات الطلابية — إلى تقديم كل سبل المساعدة لطلبة
                الجامعة لتلقي الخدمة الطبية المناسبة في المركز الصحي، وذلك من خلال التنسيق المستمر مع
                إدارة المركز الصحي وكليات الجامعة.
              </p>
            </Prose>
          </div>
        );

      case 'res-about':
        return (
          <div className="space-y-8">
            <PageTitle title="دائرة المنازل الداخلية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="دائرة المنازل الداخلية" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                يعد سكن الطالبات أحد العوامل الرئيسية المؤثرة إيجابياً في حياة الطالبات، وذلك للدور
                الكبير الذي تقوم به عمادة شؤون الطلبة ممثلة في إدارة السكن، حيث سعت إلى إيجاد وتوفير
                بيئة تنظيمية اجتماعية تعليمية ثقافية ورياضية من قاعات للمطالعة وتلفاز وخدمات هاتف،
                وتوصيل خدمة الإنترنت في السكنات وملاعب رياضية ومصليات، بهدف توفير سبل الراحة والطمأنينة
                للطالبات ومتابعة أمورهن داخل السكنات وخارجها، وتهيئة الجو المناسب لهن للرقي بهن إلى
                أعلى مستوى في التحصيل العلمي والدراسي، كما تقدم الرعاية الصحية اللازمة لهن في ظل ما هو
                متوفر لخدمتهن في مرافق الجامعة كافة طوال اليوم.
              </p>
              <p>
                كما تشرف الدائرة على إقامة المحاضرات والندوات التثقيفية وتسيير الرحلات الترفيهية
                للطالبات القاطنات داخل السكنات، وبناءً على قرار مجلس الأمناء بتسليم المساكن الخارجية
                والإبقاء على المساكن الداخلية فقط، فقد أصبحت عمادة شؤون الطلبة تشرف على (6) سكنات
                الطاقة الاستيعابية لها (1000) طالبة بواقع أربع طالبات في الغرفة، وهناك غرف ثلاثية
                وثنائية.
              </p>
            </Prose>

            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-5">رسوم السكن</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  { t: 'غرفة ثلاثية', p: '180 ديناراً' },
                  { t: 'غرفة ثنائية', p: '250 ديناراً' },
                  { t: 'غرفة منفردة', p: '350 ديناراً' }
                ].map((r) => (
                  <div key={r.t} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-7 text-center">
                    <p className="font-bold text-[#0f3057] mb-3">{r.t}</p>
                    <p className="text-2xl font-extrabold text-[#c9a227]">{r.p}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <h3 className="text-lg font-bold text-[#c9a227] mb-5">إدارة السكنات</h3>
                <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside leading-relaxed">
                  <li>مديرة سكنات.</li>
                  <li>رئيسة شعبة الإشراف على الطالبات.</li>
                  <li>رئيسة شعبة متابعة منازل الطالبات (الصيانة).</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <h3 className="text-lg font-bold text-[#c9a227] mb-5">وتضم هذه الدائرة الشعب الآتية</h3>
                <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside leading-relaxed">
                  <li>شعبة الإشراف على الطالبات.</li>
                  <li>شعبة متابعة منازل الطالبات.</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-5">صور من السكنات</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'home%20%2801%29.jpeg','home%20%282%29.jpeg','home%20%283%29.jpeg',
                  'bed.png','home%20%286%29.jpeg','hole2.png',
                  'hole.png','hole1.png','kit.png',
                  'street%20hpme2.png','street%20hpme3.png','home.png'
                ].map((f) => (
                  <div key={f} className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 aspect-[4/3]">
                    <img
                      src={`https://www.mutah.edu.jo/ar/studentaffairs/SiteAssets/Pages/Forms/EditForm/${f}`}
                      alt="سكنات الطالبات"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'cu-about':
        return (
          <div className="space-y-8">
            <PageTitle title="دائرة النشاط الثقافي والفني" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="دائرة النشاط الثقافي والفني" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                لتحقيق المزيد من التفاعل تعمل هذه الدائرة في إطار فلسفة الجامعة التي تقوم على غرس
                الحياة الجامعية الصحيحة في نفوس الطلبة ومواءمتها مع ميولهم واتجاهاتهم، وإرساء كل ما هو
                فاضل ونبيل ووطني، مساهمة منها في خلق جيل مؤمن بقضايا وطنه وأمته العادلة، وهي في هذا
                الصدد تعمل على تطوير النشاطات (اللامنهجية) من خلال برامجها الثقافية والفنية وتهيئة
                الفضاء المناسب لاكتشاف الإبداعات الطلابية وتشجيعها وتنميتها، وتنظيم النشاطات التي تبرز
                مواهب الطلبة وتعمل على صقلها ورعايتها، وإعداد المسابقات في الشعر والقصة والمقالة والنص
                المسرحي والتحقيق الصحفي، إلى جانب الاهتمام بالأنشطة الفنية حيث النشاط الموسيقي والمسرحي
                والمرسم الجامعي والخط العربي، ومشاركة طلبة هذه الأنشطة مثل فرقة وكورال الجامعة،
                بالإضافة إلى فرقة المسرح الجامعي والمعارض الفنية والأمسيات الثقافية، إضافة إلى الإشراف
                على المطبوعات والنشرات الخاصة بالطلبة.
              </p>
            </Prose>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5">
                  <Target className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">الرسالة</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  العمل على توفير نشاطات فكرية وثقافية تسهم في تكوين شخصية متكاملة للطلبة.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5">
                  <Eye className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">الرؤية</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  الوصول بالطالب الجامعي إلى الإبداع في المجال الثقافي والأدبي والخطابي.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">الأهداف</h3>
              <NumList items={[
                'تعزيز القيم الأصيلة لدى الطلبة.',
                'تنمية الاهتمام بالتراث الحضاري الأردني والعربي والإسلامي والعالمي.',
                'تشجيع الميول الثقافية والإبداعية لدى الطلبة.',
                'إفساح فرص المشاركة أمام الطلبة في الأنشطة الثقافية والمعرفية على مستوى الجامعة والجامعات الأردنية.',
                'دعم النشاطات الطلابية في المجالات الثقافية والوطنية.',
                'الإسهام في تدريب الطلبة على إبداء الآراء والكتابة الصحفية.',
                'رعاية وتنمية مواهب الطلبة في المجالات الثقافية المختلفة والأدبية والعلمية كافة.'
              ]} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <h3 className="text-lg font-bold text-[#c9a227] mb-5">وسائل تحقيق الأهداف</h3>
                <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside leading-relaxed">
                  <li>تنظيم المواسم الثقافية السنوية.</li>
                  <li>تنظيم أمسيات شعرية للطلبة.</li>
                  <li>تنظيم جلسات للقراءات الإبداعية الأدبية.</li>
                  <li>تنظيم زيارات الطلبة للصحف والمؤسسات الثقافية.</li>
                  <li>المشاركة في المؤتمرات والمهرجانات الثقافية على مستوى الجامعات الأردنية والعربية والعالمية.</li>
                  <li>تنظيم مشاركة الطلبة في المسابقات الثقافية المعرفية والثقافية الإبداعية.</li>
                  <li>تنظيم عقد لقاءات حوارية للطلبة مع الأدباء الأردنيين والعرب.</li>
                  <li>تنظيم معارض للكتاب.</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <h3 className="text-lg font-bold text-[#c9a227] mb-5">تضم هذه الدائرة الشعب الآتية</h3>
                <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside leading-relaxed">
                  <li>شعبة النشاط الثقافي.</li>
                  <li>شعبة الإعلام.</li>
                  <li>شعبة الموسيقى والمسرح.</li>
                  <li>شعبة الفنون الجميلة.</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'sp-about':
        return (
          <div className="space-y-8">
            <PageTitle title="دائرة الأنشطة الرياضية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="دائرة الأنشطة الرياضية" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                أخي الطالب / أختي الطالبة، إن مقولة (العقل السليم في الجسم السليم) لم تأت من فراغ، بل
                كانت وما زالت تعمّق أثر الرياضة في بني البشر، ومن هذا المنطلق تعمل دائرة النشاط الرياضي
                على دفع الطالب لممارسة الأنشطة الرياضية المختلفة المنهجية واللامنهجية عبر خطط مدروسة
                لتنمية روح المشاركة والتعاون وصقل شخصيته كطالب جامعي بخط موازٍ لعملية تحصيله الدراسي
                بما يتناسب وأوقات فراغ الطلبة.
              </p>
              <p>
                وتتولى الدائرة الإشراف على الفرق الرياضية لمختلف الألعاب، وتعمل على تنمية الروح الرياضية
                وروح المنافسة الشريفة لدى الطلبة المشاركين في الفرق الرياضية وتوجيههم إلى ممارسة هذه
                الأنشطة بما يتناسب وقدراتهم البدنية، إضافة إلى إشراف الدائرة على تدريب وتقييم الطلبة
                المشاركين في جائزة الحسن للشباب كمركز معتمد من قبل مكتب جائزة الحسن للشباب لإقليم
                الجنوب.
              </p>
            </Prose>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">تعمل دائرة النشاط الرياضي على تحقيق الأهداف الآتية</h3>
              <NumList items={[
                'تنمية شخصية الطالب القيادية.',
                'رفع مستوى اللياقة البدنية المرتبطة بالصحة لدى الطالب في الحياة الجامعية.',
                'تفعيل دور الطالب في الحياة الجامعية عبر ممارسة النشاط الرياضي.',
                'تقديم خدمة للمجتمع المحلي عبر التعاون وتنظيم الأنشطة اللامنهجية.',
                'استغلال وقت الفراغ في أنشطة رياضية تعود بالفائدة البدنية لدى الطالب.',
                'تفعيل دور الطلبة في الجامعات الأردنية المختلفة.'
              ]} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <h3 className="text-lg font-bold text-[#c9a227] mb-5">وسائل تحقيق الأهداف رياضياً</h3>
                <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside leading-relaxed">
                  <li>لقاءات فردية.</li>
                  <li>منافسات منظمة.</li>
                  <li>ألعاب ترويحية.</li>
                  <li>مباريات رسمية.</li>
                </ul>
                <p className="text-sm text-gray-600 leading-[1.9] mt-5 text-justify">
                  من خلال البطولات الرياضية بين كليات الجامعة لمختلف الألعاب الرياضية، والمشاركة في
                  الدورات والبطولات الرياضية الداخلية والخارجية التي يقيمها الاتحاد الرياضي للجامعات
                  الأردنية، وكذلك تشكيل الفرق الرياضية الجامعية بمختلف الألعاب الرياضية.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <h3 className="text-lg font-bold text-[#c9a227] mb-5">وتضم الدائرة الشعب الآتية</h3>
                <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside leading-relaxed">
                  <li>شعبة الصالات والملاعب الرياضية.</li>
                  <li>شعبة التدريب الرياضي.</li>
                  <li>شعبة التنظيم الرياضي.</li>
                </ul>
              </div>
            </div>

            <Prose>
              <p>
                كما تسهم الدائرة — وبالتعاون مع المجتمع المحلي من خلال الأندية الرياضية والمؤسسات
                الشبابية — بإقامة مختلف النشاطات التي تنظم من قبلهم على ملاعب الجامعة، وكذلك رفد تلك
                المؤسسات والأندية بالكوادر الفنية والتدريبية مساهمة منها في رفع كفاءة الفرق الرياضية
                التي تخدم المنطقة.
              </p>
            </Prose>
          </div>
        );

      case 'ss-about':
        return (
          <div className="space-y-8">
            <PageTitle title="دائرة الخدمات الطلابية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="دائرة الخدمات الطلابية" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                تماشياً مع السياسة التي تسعى إلى توفير أفضل سبل الراحة للطالب وتلبية لاحتياجاته بأسرع
                الطرق وأنجحها، أنشئت دائرة الخدمات الطلابية في عمادة شؤون الطلبة لتقدم الخدمات اللازمة
                للطالب بهدف تخفيف العبء عن كاهله، والاهتمام به من جميع الجوانب، تسهيلاً عليه إنهاء
                دراسته الجامعية بأقل قدر ممكن من العناء سعياً وراء التطوير.
              </p>
              <p>
                وفي ضوء الازدياد المستمر لأعداد الطلبة في الجامعة والتقدم المستمر في مجال الحاسوب
                والمعلوماتية، فقد تمت حوسبة جميع أعمالها وتطوير الأنظمة المعمول بها خلال الفترة القليلة
                الماضية محققة بذلك نقلة نوعية في أدائها، حيث تم تطوير النظام المحوسب لغايات الاحتفاظ
                بالسجلات والمعلومات الخاصة بجميع طلبة الجامعة لمتابعة مسيرتهم طيلة فترة دراستهم
                الجامعية، وإعداد الدراسات اللازمة لطلبات القروض والمساعدات والتشغيل التي يتقدمون بها،
                هذا بالإضافة لإعداد الإحصائيات والكشوفات المختلفة وإصدار الهويات الجامعية على نظام
                الحاسوب وغيرها من الأعمال، لذا تعمل هذه الدائرة على تقديم الخدمات الضرورية للطلبة
                وتهيئة الأجواء المناسبة لهم من خلال الشعب الآتية:
              </p>
            </Prose>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['شعبة الخدمات الحاسوبية','شعبة أحوال الطلبة','شعبة التأمينات والإعفاءات للطلبة','شعبة القروض والمساعدات'].map((d, i) => (
                <div key={d} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex items-center gap-4 hover:border-[#c9a227] transition-colors">
                  <span className="w-9 h-9 rounded-lg bg-[#0f3057] text-[#c9a227] text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="font-bold text-[#0f3057] text-sm leading-snug">{d}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'about-karak-center':
        return (
          <div className="space-y-8">
            <PageTitle title="مركز الكرك للتطوير الوظيفي" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="مركز الكرك للتطوير الوظيفي" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                تم إنشاء هذا المركز في العام 2009/2010 في جامعة مؤتة بموجب اتفاقية منحة مقدمة من برنامج
                التنمية الاقتصادية سابقاً الممول من الوكالة الأمريكية للتنمية الدولية (USAID) وبإشراف من
                مركز الحصن للتطوير الوظيفي في جامعة البلقاء التطبيقية. وتنبع أهمية تأسيس مركز الكرك
                للتطوير الوظيفي من كونه أحد المراكز النوعية الرائدة بجامعة مؤتة، وقد جاء ليُعنى بتقديم
                برامج مساندة شاملة تتضمن المشورة العملية والمساعدة الفنية والعلمية والتوجيه المهني
                لجميع طلبة الجامعة وتنمية مهاراتهم ومساعدتهم لتفهم قدراتهم الشخصية وخصائصها والقدرة على
                التعامل مع مشكلاتهم وتهيئة الفرص أمامهم لمواجهة متطلبات الحياة العملية بشكل أفضل.
                إضافة إلى كونه يتماشى مع فلسفة الجامعة وتميزها في تقديم خدماتها خارج أسوار الجامعة، فقد
                جاء هذا المركز ليقدم المشورة والنصيحة للطلبة في المؤسسات التعليمية في منطقة الكرك
                والشباب من المجتمعات المحلية وطلبة المدارس الحكومية والخاصة.
              </p>
              <p>
                مركز الكرك للتطوير الوظيفي في جامعة مؤتة سيوفر الدعم للطلاب الجامعيين وطلاب الدراسات
                العليا والخريجين في جميع مراحل التطوير الوظيفي، وسوف يقدم المساعدة للموظفين من خلال
                الإرشاد الفردي الوظيفي والبرامج والفعاليات والتدريب الداخلي وتوفير فرص العمل. في هذه
                البيئة الفريدة سوف يشجع الطلاب على دمج التطوير الوظيفي مع الإنجاز الأكاديمي، كما سيحث
                الطلبة على التعامل مع المركز للسيطرة على المشاكل الدراسية أو الاجتماعية في وقت مبكر من
                حدوثها في الجامعة من أجل تحقيق أقصى قدر من الاستفادة في الجامعة، كما يشجع الطلاب على
                توطيد الشراكة مع أعضاء هيئة التدريس والمستشارين وطلب المشورة منهم.
              </p>
            </Prose>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5">
                  <Eye className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">رؤيتنا</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  تمكين طلاب جامعة مؤتة وجميع المؤسسات التربوية في منطقة الكرك ليكونوا عوامل للتغيير
                  والنجاح في مجتمعاتهم، ومساعدتهم في العثور على العمل المناسب داخل وخارج الأردن.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5">
                  <Target className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">مهمتنا</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  نشر الوعي لدى الطلبة بالمهن المختلفة، وتمكين الطالب الجامعي من امتلاك الكفاءات
                  الضرورية للنجاح في عمله.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-2">أهداف المركز</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                يتولى مركز الكرك للتطوير الوظيفي تدريب الطلاب والطالبات الذين ما زالوا على مقاعد الدراسة
                أو الذين تخرجوا لتزويدهم بالخبرات العلمية لتأهيلهم للالتحاق بسوق العمل، وبالتعاون مع
                المتطوعين من القطاعين العام والخاص وفق برنامج دورات مجانية، وكذلك العمل على:
              </p>
              <NumList items={[
                'تشغيل الطلبة الخريجين في الكرك الباحثين عن عمل بما يتناسب مع ما يطمحون إليه من خلال الربط الوظيفي بين الطلبة والخريجين والشركات، بالتعاون مع القطاعين العام والخاص في محافظة الكرك والمناطق المحيطة، وبالتنسيق مع صندوق الملك عبد الله الثاني للتنمية / عمادة شؤون الطلبة.',
                'التنسيق والإعداد لليوم الوظيفي.',
                'عمل علاقات محلية وإقليمية وعالمية لغايات توظيف الطلبة.',
                'البحث عن الموارد المالية التي تساعد في دعم المشاريع الصغيرة داخل الجامعة، وعقد الاتفاقيات مع المنظمات والجهات الداعمة.',
                'توفير فرص تدريبية عملية للطلاب والطالبات تزودهم بالخبرات العملية لتأهيلهم للالتحاق بسوق العمل.',
                'إعداد أدلة ومواد تطوير المسار الوظيفي والاستكشاف المهني وتوفيرها عبر الموقع الإلكتروني للمركز بالتعاون مع الجهات المختصة مثل صندوق الملك عبدالله للتنمية والمركز الوطني لتنمية الموارد البشرية ومركز الاستشارات والتدريب وبرنامج إنجاز وغيرها.'
              ]} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <h3 className="text-lg font-bold text-[#c9a227] mb-5">خدماتنا</h3>
                <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside leading-relaxed">
                  <li>الربط الوظيفي بين الطلبة الخريجين والشركات.</li>
                  <li>إعداد وتصميم وتنفيذ البرامج والدورات الإرشادية المهنية المتخصصة للموظفين في مؤسسات المجتمع المحلي، وتقديم الاستشارات للمؤسسات والهيئات والأفراد.</li>
                  <li>توطيد الشراكة مع شركات القطاع الخاص.</li>
                  <li>التنسيق مع هيئات ودوائر الجامعة المختلفة لتحقيق التكامل.</li>
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <h3 className="text-lg font-bold text-[#c9a227] mb-5">نشاطاتنا</h3>
                <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside leading-relaxed">
                  <li>تنظيم محاضرات وحوارات مفتوحة بالتنسيق مع الجهات ذات الصلة وبالتعاون مع ضباط ارتباط المركز في كليات الجامعة المختلفة.</li>
                  <li>تقديم الخدمات الإرشادية التربوية والمهنية على المستوى الفردي والجماعي لطلبة الجامعة.</li>
                  <li>عقد دورات وورش عمل للطلبة والباحثين عن عمل لإكسابهم المهارات اللازمة لدخول سوق العمل.</li>
                  <li>تطوير قاعدة بيانات خاصة بالوظائف الشاغرة والتعاون مع المؤسسات التي تقدم خدمات مماثلة لتوفير هذه الوظائف عبر الموقع الإلكتروني للمركز.</li>
                </ul>
              </div>
            </div>

            <Prose>
              <p className="font-bold text-[#0f3057]">كادرنا</p>
              <p>
                يتميز الكادر العامل في مركز الكرك للتطوير الوظيفي بالمهارات اللازمة لتقديم الخدمات
                المختلفة للطلبة، ويدفع العاملين في المركز إيمانهم بقدرات الطلبة وأهمية حصولهم على الفرص
                المناسبة لتحقيق النجاح في سوق العمل، ويعمل الكادر جنباً إلى جنب مع الكادر الأكاديمي
                والإداري في سبيل تنفيذ رسالة ورؤية المركز.
              </p>
              <p>
                التعاون مع فرق السلام في عقد الدورات وورش العمل للطلبة من خلال متطوعين أجانب، ونسعى في
                المستقبل لعقد مذكرة تفاهم لتوسيع النشاط في تنفيذ دورات خاصة لطلبة الجامعة مجانية في عدة
                تخصصات من قبل هؤلاء المتطوعين.
              </p>
              <p>
                ونظراً لتحقيق الهدف الأساسي من إنشاء مركز الكرك للتطوير الوظيفي، تمت الموافقة على إنشاء
                مصنع لإعادة تصنيع الورق والكرتون وعبوات التغليف والمنتجات الورقية كافة التي تخلفها
                جامعة مؤتة نتيجة الاستهلاك اليومي بدعم من الوكالة الأمريكية (USAID).
              </p>
            </Prose>

            <div className="bg-[#0f3057] rounded-2xl px-6 py-5 text-center">
              <p className="text-white font-bold">وقد تم دمج هذا المركز مع مكتب الإرشاد الوظيفي ومتابعة الخريجين</p>
            </div>
          </div>
        );

      case 'about-plan':
        return (
          <div className="space-y-8">
            <PageTitle title="الخطة الاستراتيجية" sub="الخطط الاستراتيجية لعمادة شؤون الطلبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="الخطة الاستراتيجية" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="flex flex-col gap-3">
              <DocRow name="الخطة الاستراتيجية 2015 – 2020" url="https://www.mutah.edu.jo/ar/studentaffairs/Documents/%d8%a7%d9%84%d8%ae%d8%b7%d8%a9%20%d8%a7%d9%84%d8%a7%d8%b3%d8%aa%d8%b1%d8%a7%d8%aa%d9%8a%d8%ac%d9%8a%d8%a9.pdf" />
              <DocRow name="الخطة الاستراتيجية 2021 – 2022" url="https://www.mutah.edu.jo/ar/studentaffairs/Documents/plan%20y2021-2022.pdf" />
            </div>
          </div>
        );

      case 'act-party':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الأنشطة الحزبية" />
          </div>
        );

      case 'diwan-building':
      case 'diwan-out':
      case 'diwan-in':
      case 'office-financial':
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, DSA_LINKS)} sub="عمادة شؤون الطلبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt={getSectionTitle(activeItem, DSA_LINKS)} className="w-full max-h-[420px] object-cover" />
            </div>
          </div>
        );

      case 'srv-guide':
      case 'srv-newstudents':
      case 'srv-fees':
      case 'srv-antismoking':
      case 'srv-manaseer':
      case 'about-plan':
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, DSA_LINKS)} />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt={getSectionTitle(activeItem, DSA_LINKS)} className="w-full max-h-[420px] object-cover" />
            </div>
          </div>
        );

      case 'about-suggestions':
        return (
          <div className="space-y-8">
            <PageTitle title="صندوق الاقتراحات والشكاوى والثناء" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="صندوق الاقتراحات والشكاوى والثناء" className="w-full max-h-[420px] object-cover" />
            </div>
          </div>
        );

      case 'about-bulletins':
        return (
          <div className="space-y-8">
            <PageTitle title="نشرات / دراسات / قرارات" sub="نشرات عمادة شؤون الطلبة" />
            <div className="flex flex-col gap-3">
              <DocRow name="النشرة الإخبارية الشهرية لغاية شهر 11 - 2022" url="https://www.mutah.edu.jo/ar/studentaffairs/Forms/Newspaper11.pdf" />
              <DocRow name="النشرة الإخبارية الشهرية لشهر 12 - 2022" url="https://www.mutah.edu.jo/ar/studentaffairs/Forms/Newspaper122022.pdf" />
              <DocRow name="النشرة الاخبارية خلال من 1-1 إلى 31-03-2023" url="https://www.mutah.edu.jo/ar/studentaffairs/Forms/Newspaper31032023.pdf" />
              <DocRow name="النشرة السنوية لنشاطات عمادة شؤون الطلبة 15-09-2024 ولغاية 15-09-2025" url="https://www.mutah.edu.jo/ar/studentaffairs/Forms/Annual%20bulletin%20of%20activities%20of%20the%20Deanship%20of%20Student%20Affairs15092025.pdf" />
            </div>
          </div>
        );

      case 'about-honor': {
        const HONOR = [
          { name: 'الاستاذ الدكتور محمد سليم الطراونة', period: '11/9/2000 - 25/9/2002' },
          { name: 'الاستاذ الدكتور محمد سالم القضاة', period: '26/9/2002 - 25/9/2004' },
          { name: 'الاستاذ الدكتور احمد فلاح المجالي', period: '26/9/2004 - 31/8/2006' },
          { name: 'الاستاذ الدكتور محمد عبدالكريم الحوراني', period: '1/9/2006 - 20/9/2008' },
          { name: 'الاستاذ الدكتور مفلح محمد المجالي', period: '21/9/2008 - 31/8/2010' },
          { name: 'الاستاذ الدكتور موسى سالم القضاة', period: '1/9/2010 - 31/8/2012' },
          { name: 'الاستاذ الدكتور احمد سالم النوايسة', period: '1/9/2012 - 31/8/2014' },
          { name: 'الاستاذ الدكتور محمد سليمان الرحاحلة', period: '1/9/2014 - 31/8/2016' },
          { name: 'الاستاذ الدكتور خالد محمد الصرايرة', period: '1/9/2016 - 31/8/2018' },
          { name: 'الاستاذ الدكتور عمر علي الطراونة', period: '1/9/2018 - 31/8/2020' },
          { name: 'الاستاذ الدكتور ماهر احمد المبيضين', period: '1/9/2020 - حتى الآن' }
        ];
        return (
          <div className="space-y-8">
            <PageTitle title="لوحة شرف الخدمة" sub="عمداء شؤون الطلبة في جامعة مؤتة" />
            <div className="flex flex-col gap-3">
              {HONOR.map((d, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-[#c9a227] transition-colors">
                  <span className="w-8 h-8 rounded-full bg-[#0f3057] text-[#c9a227] text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="font-bold text-[#0f3057] text-[15px] flex-1 leading-snug">{d.name}</p>
                  <span className="text-xs font-bold text-gray-500 shrink-0" dir="ltr">{d.period}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'about-staff':
        return (
          <div className="space-y-8">
            <PageTitle title="الموظفون" sub={`الكادر الإداري في عمادة شؤون الطلبة — ${DSA_STAFF.length} موظفاً`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {DSA_STAFF.map((m, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 hover:shadow-md hover:border-[#c9a227]/40 transition-all">
                  <div className="w-14 h-14 rounded-full bg-[#0f3057] flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-[#c9a227]" />
                  </div>
                  <p className="text-[11px] font-bold text-[#c9a227] mb-1.5 leading-relaxed">{m.role}</p>
                  <h3 className="font-bold text-[#0f3057] text-[15px] leading-snug mb-3">{m.name}</h3>
                  <div className="flex flex-col gap-1 text-xs text-gray-500">
                    {m.ext && <span dir="ltr">هاتف فرعي: {m.ext}</span>}
                    {m.email && <span dir="ltr" className="break-all">{m.email}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'gd-issues':
      case 'gd-strategy':
      case 'gd-orgchart':
      case 'gd-statistics':
      case 'gd-activities':
      case 'gd-instructions':
      case 'gd-forms':
      case 'gd-faq':
      case 'gd-staff':
      case 'gd-contact':
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, DSA_LINKS)} sub="مكتب التوجيه والإرشاد الطلابي والمجتمعي" />
          </div>
        );

      case 'gd-goals':
        return (
          <div className="space-y-8">
            <PageTitle title="الرؤية، والرسالة، والأهداف" sub="مكتب التوجيه والإرشاد الطلابي والمجتمعي — نحو بيئة جامعية تعليمية ومجتمعية آمنة نفسياً" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5">
                  <Eye className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">الرؤية</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  جامعة يتمتع فيها الطلبة بصحة نفسية تحقق لهم الإنجاز الأكاديمي والمشاركة الفاعلة
                  القائمة على المبادرة وحب العمل، ومجتمع آمن نفسياً قادر على التعامل مع ضغوط الحياة
                  المختلفة.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5">
                  <Target className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">الرسالة</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  إعداد برامج إرشادية نمائية من أجل تطوير الذات، ووقائية من شأنها التوعية بالمشكلات
                  النفسية وكيفية الوقاية منها لدى طلبة الجامعة وأفراد المجتمع المحلي، وكذلك إعداد برامج
                  إرشادية علاجية تهدف إلى مساعدة الطلبة أو أفراد المجتمع على التعامل مع المشاكل النفسية
                  وضغوط الحياة المختلفة.
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <Star className="w-6 h-6 text-[#c9a227]" />
                <h3 className="text-xl font-bold text-[#0f3057]">القيم</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['السرّية التامة.','الاحترام المتبادل.','التحلي بالصبر والإخلاص والأمانة.'].map((v) => (
                  <div key={v} className="flex items-start gap-2.5 bg-[#F8FAFC] border border-gray-100 rounded-xl px-5 py-3.5">
                    <CheckCircle size={16} className="text-[#c9a227] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 leading-relaxed">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-2">مهام مكتب التوجيه والإرشاد الطلابي والمجتمعي</h3>
              <p className="text-sm text-gray-600 mb-6">تتلخص مهام المكتب في جامعة مؤتة بالنقاط التالية:</p>
              <NumList items={[
                'مساعدة طلبة الجامعة على اكتشاف ذواتهم وقدراتهم ومهاراتهم وفهم المشاكل التي يعانون منها، ومن ثم مساعدتهم على تجاوز مثل هذه المشاكل، وعلى تحقيق قدر كافٍ من الصحة النفسية.',
                'تحديد الاحتياجات المستقبلية للطلبة في ظل رؤية الجامعة وتطلعاتها المستقبلية.',
                'دراسة حالات التعثر الأكاديمي لدى طلبة الجامعة وعلاجها بشكل منفرد.',
                'عقد الندوات والدورات اللازمة لتنمية مهارات الطلبة الأكاديمية والتوعية بمستجدات وقضايا العصر الحالي.',
                'تعريف الطلبة المستجدين في الجامعة بمهام المكتب، ومساعدتهم على التكيف والاندماج في الجو التعليمي.',
                'الاهتمام بقضايا الطلبة ذوي الإعاقة في الجامعة ومساعدتهم على التكيف النفسي والاجتماعي.',
                'تقديم خدمات الإرشاد النفسي لأفراد المجتمع المحلي ومساعدتهم في التغلب على مشاكلهم النفسية والتعامل مع ضغوط الحياة المختلفة.',
                'يعمل عضو فريق مكتب التوجيه والإرشاد الطلابي والمجتمعي كمستشار في لجان التحقيق مع الطلبة المدنيين.'
              ]} />
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">أهداف مكتب التوجيه والإرشاد الطلابي والمجتمعي</h3>
              <p className="text-sm text-gray-700 leading-[2] mb-4">
                تنبثق أهداف المكتب من الأهداف الرئيسة للإرشاد النفسي والتربوي، وهي: الأهداف النمائية،
                الأهداف الوقائية، الأهداف العلاجية.
              </p>
              <p className="font-bold text-[#0f3057] mb-4">أهداف المكتب في عمادة شؤون الطلبة:</p>
              <NumList items={[
                'تقديم الخدمات الإرشادية النفسية والتربوية والاجتماعية والأسرية والمهنية والانفعالية للطلبة لتحقيق التكيف بكافة أشكاله.',
                'تقديم الخدمات الإرشادية لأفراد المجتمع المحلي لمساعدتهم على التعامل مع مشاكلهم النفسية وضغوط الحياة المختلفة.',
                'توعية الطلبة بكيفية التعامل مع المشاكل النفسية وضغوط الحياة ومقتضيات العصر الحالي.',
                'توعية الطلبة بكيفية التعامل مع الهواتف الذكية، وإدمان الإنترنت، ومواقع التواصل الاجتماعي.',
                'تنمية اتجاهات إيجابية للطلبة نحو أنفسهم ونحو الجامعة والتخصص والمدرسين، ونحو الطلبة ذوي الإعاقة.',
                'مساعدة الطلبة على التكيف مع الحياة الجامعية وإكسابهم المهارات الحياتية المختلفة.',
                'مساعدة الطلبة المتعثرين دراسياً في رفع مستوى تحصيلهم الدراسي.',
                'تبني البرامج التي تدعم الطلبة المتفوقين والموهوبين.',
                'مساعدة الطلبة الذين وقعت عليهم العقوبات الطلابية — ما أمكن ذلك.',
                'تقديم الاستشارة النفسية للجان التحقيق بخصوص الطلبة المدنيين المحالين لها — ما أمكن ذلك.'
              ]} />
            </div>
          </div>
        );

      case 'gd-welcome':
        return (
          <div className="space-y-8">
            <PageTitle title="مكتب التوجيه والارشاد الطلابي والمجتمعي" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="مكتب التوجيه والإرشاد الطلابي والمجتمعي" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                يقدم مكتب التوجيه والإرشاد الطلابي والمجتمعي في جامعة مؤتة خدمات إرشادية نمائية أو
                وقائية أو علاجية متنوعة لطلبة الجامعة وأفراد المجتمع المحلي كافة. ويأتي هذا المكتب
                باسمه الجديد وانطلاقته الجديدة تماشياً مع إجراءات ومعايير ضمان الجودة في مؤسسات التعليم
                العالي خلال الأعوام (2015 – 2020).
              </p>
              <p>
                إن من أهم المبررات لإنشاء وتطوير هذا المكتب، هي حاجة طلبة الجامعة وأفراد المجتمع المحلي
                لخدمات الإرشاد النفسي للتعامل مع المشكلات والأزمات النفسية التي تلم بهم في ظل عصر سريع
                التغيّر، ويسوده الكثير من التطرّف الفكري والثقافي. ويقدم المكتب خدماته الإرشادية
                النمائية أو الوقائية أو العلاجية من قبل فريق متخصص من أعضاء هيئة التدريس في قسم الإرشاد
                والتربية الخاصة في كلية العلوم التربوية. وفي هذا فرصة لعضو هيئة التدريس في فريق المكتب
                لممارسة أحد أدواره المتمثلة بخدمة المجتمع المحلي.
              </p>
            </Prose>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ويتعامل المكتب في إطار من السرية التامة مع العديد من القضايا مثل</h3>
              <NumList items={[
                'حالات التعثر الدراسي لطلبة الجامعة.',
                'المشكلات النفسية لطلبة الجامعة أو أفراد المجتمع المحلي مثل: (تدني مفهوم الذات، الخجل، القلق، التكيف النفسي والاجتماعي، الصدمات النفسية، مشكلات أسر الأطفال ذوي الإعاقة … الخ).',
                'المشكلات ذات الطبيعة الخاصة والحساسة.',
                'تقديم الإرشاد النفسي والمعلومات التوضيحية حول كيفية تعامل أسر الأشخاص ذوي الإعاقة في المجتمع المحلي مع أبنائهم.'
              ]} />
            </div>

            <div className="bg-gradient-to-l from-[#8a6d1f] to-[#c9a227] rounded-3xl p-8">
              <p className="text-white text-lg leading-[2] font-bold text-justify">
                إن خدمة المجتمع المحلي من خلال هذا المكتب، هي انطلاقة نوعية وتطوّرية للجامعة فيما يتعلق
                بدورها في تنمية قدرات المجتمع المحلي.
              </p>
            </div>
          </div>
        );

      case 'intl-contact':
      case 'intl-contact2':
        return (
          <div className="space-y-8">
            <PageTitle title="اتصل بنا / مكتب الطلبة الوافدين" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="مكتب الطلبة الوافدين" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <div className="flex items-start gap-3">
                  <MapPin className="text-[#c9a227] w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#0f3057] mb-3">للاتصال بنا</h4>
                    <p className="text-gray-700 leading-[2]">
                      المملكة الأردنية الهاشمية<br />
                      وزارة التعليم العالي<br />
                      الأردن – الكرك – جامعة مؤتة<br />
                      مكتب الطلبة الوافدين<br />
                      ص.ب: 7
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 flex flex-col gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#0f3057] mb-0.5">هاتف</p>
                    <p className="text-gray-600" dir="ltr">+962-3-2372380 — الفرعي 3061</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#0f3057] mb-0.5">فاكس</p>
                    <p className="text-gray-600" dir="ltr">+962-3-2397185</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#0f3057] mb-0.5">البريد الإلكتروني</p>
                    <p className="text-gray-600 leading-relaxed" dir="ltr">
                      foreignstud2@mutah.edu.jo<br />
                      foreignstud1@mutah.edu.jo<br />
                      foreignstud@mutah.edu.jo
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <LinkRow name="صفحة الفيس بوك — نادي الطلبة الوافدين" url="https://www.facebook.com/groups/180594552022486/" />
          </div>
        );

      case 'intl-club':
      case 'intl-club2':
        return (
          <div className="space-y-8">
            <PageTitle title="نادي الطلبة الوافدين" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="نادي الطلبة الوافدين" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                يوجد في مكتب الطلبة الوافدين — عمادة شؤون الطلبة، جامعة مؤتة — نادي ثقافي اجتماعي رياضي
                يعنى بشؤون الطلبة الوافدين الدارسين في جامعة مؤتة، ويقوم بتنظيم جميع نشاطات الطلبة
                الوافدين من رحلات وإقامة احتفالات التخرج للطلبة الوافدين والمشاركة في المناسبات الوطنية
                والدينية للمملكة الأردنية الهاشمية، وإقامة الأيام الوطنية للدول التي يوجد لها طلبة في
                جامعة مؤتة، وكذلك مشاركة المجتمع المحلي بتقديم مساعدات لدور الأيتام ومراكز التربية
                الخاصة وزيارة المدارس الأقل حظاً، وكذلك متابعة أمور الطلبة الوافدين خارج أوقات الدوام
                ومتابعة أمور سكنهم برعاية مكتب الطلبة الوافدين.
              </p>
              <p>
                وتشكل الهيئة الإدارية حسب تعليمات جامعة مؤتة من الطلبة الوافدين أنفسهم، وتتكون الهيئة
                من رئيس وستة أعضاء من الطلبة الوافدين من كافة الجنسيات عن طريق الانتخاب لمدة عام دراسي
                كامل، ويوجد لهم تعليمات تنظم عملهم ضمن نشاطات عمادة شؤون الطلبة.
              </p>
              <p>
                نادي الطلبة الوافدين: الاهتمام بأبنائها وبناتها من الطلبة الوافدين اهتماماً كبيراً، من
                شأنه الإسهام في عملية استقطاب أكبر عدد ممكن من الطلبة يساعدوا في نشر ثقافات وعادات
                بلدانهم، وكذلك تعرفهم على ثقافة وعادات الأردن الحاضن بلد الأمن والأمان لتكون البلد
                الثاني لهم، وبعد سنوات من الجد والدراسة يعودون إلى بلادهم حاملين شهاداتهم العلمية بعد
                أن استقوا العلم والمعرفة على أيدي الكفاءات من أهل العلم في جامعتنا العريقة.
              </p>
            </Prose>
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f3057] text-white">
                    <th className="px-5 py-3 text-right font-bold">الطالب / ـة</th>
                    <th className="px-5 py-3 text-right font-bold w-40">المنصب</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['معين حسن يحيى كزمان', 'رئيساً'],
                    ['عمار حميد مجيد', 'نائب الرئيس'],
                    ['اكرم عبدالله محمد مقبل', 'أميناً للصندوق'],
                    ['احمد صفاء حسين', 'أميناً للسر'],
                    ['فاروق محمد ادريس', 'عضواً'],
                    ['سورينيا عاوي كجي', 'عضواً'],
                    ['ابراهيم ناندنج', 'عضواً']
                  ].map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'border-t border-gray-100 bg-white' : 'border-t border-gray-100 bg-[#F8FAFC]'}>
                      <td className="px-5 py-3.5 font-semibold text-[#0f3057]">{r[0]}</td>
                      <td className="px-5 py-3.5 text-gray-600">{r[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'intl-accom':
      case 'intl-accom2':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الإقامات" />
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">وتقوم بالمهام الآتية</h3>
              <NumList items={[
                'إنجاز معاملات الإقامة الخاصة بالطلبة الوافدين في وزارة الداخلية.',
                'مساعدة الطلبة الوافدين في إدخال ملفهم الإلكتروني ومتابعة إصدار هوياتهم لدى شعبة سجل الطالب والحوسبة.',
                'إعداد إحصائيات سنوية تبين أعداد الطلبة الوافدين وجنسياتهم.'
              ]} />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-2">الخطوات والأوراق المطلوبة لمعاملة الإقامة</h3>
              <p className="text-sm text-gray-600 mb-6">إحضار الوثائق التالية لمكتب الطلبة الوافدين — شعبة الإقامات.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                  <h4 className="font-bold text-[#c9a227] mb-4">الأوراق المطلوبة لأول مرة</h4>
                  <ul className="space-y-2.5 text-sm text-gray-700 list-disc list-inside leading-relaxed">
                    <li>إثبات طالب موقع ومختوم من وحدة القبول والتسجيل.</li>
                    <li>صورة عن جواز السفر.</li>
                    <li>صورة عن ختم آخر دخول إلى المملكة.</li>
                  </ul>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                  <h4 className="font-bold text-[#c9a227] mb-4">الأوراق المطلوبة لتجديد الإقامة</h4>
                  <ul className="space-y-2.5 text-sm text-gray-700 list-disc list-inside leading-relaxed">
                    <li>إثبات طالب موقع ومختوم من وحدة القبول والتسجيل.</li>
                    <li>صورة عن جواز السفر.</li>
                    <li>صورة عن ختم آخر دخول إلى المملكة.</li>
                    <li>صورة عن الإقامة القديمة.</li>
                    <li>كشف بعدد الساعات التي درسها الطالب.</li>
                  </ul>
                </div>
              </div>

              <NumList items={[
                'تحميل الوثائق المذكورة أعلاه على جهاز الحاسوب من خلال الماسح الضوئي.',
                'رفع الوثائق على نظام وزارة الداخلية وصرف رقم المعاملة من خلال النظام.',
                'متابعة المعاملة والتشييك عليها من خلال النظام.',
                'تسليم الرد بالموافقة للطالب لاستلام الإقامة من مكتب الإقامات في مديرية الأمن العام.'
              ]} />
            </div>
          </div>
        );

      case 'intl-care':
      case 'intl-care2':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة رعاية الطلبة الوافدين" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة رعاية الطلبة الوافدين" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">وتقوم بالمهام الآتية</h3>
              <NumList items={[
                'التواصل مع الملحقيات الثقافية وسفارات الدول العربية والإسلامية والصديقة التي لها طلبة في الجامعة.',
                'مساعدة الطلبة الوافدين في إيجاد حلول لمشاكلهم حسب الطرق الرسمية.',
                'تنظيم لقاء وحوار موسعين بحضور رئيس الجامعة ونوابه والعمداء والملحقين الثقافيين لمرة أو أكثر خلال العام، للتباحث في القضايا التي تهم الطلبة الوافدين.',
                'المساهمة في إنجاح الأيام الثقافية التي تنظمها الملحقيات الثقافية في الأردن داخل الحرم الجامعي.',
                'إقامة معرض تراثي دولي تشارك فيه بلدان الطلبة الوافدين الدارسين في الجامعة.',
                'تنظيم رحلات ثقافية لإطلاع الطلبة على المعالم السياحية والدينية والأثرية والمعالم الحضارية في الأردن.',
                'إقامة بطولات رياضية للجاليات بالتنسيق مع دائرة النشاط الرياضي.',
                'عمل حفل تخريج خاص بالطلبة الوافدين كل عام دراسي.'
              ]} />
            </div>
          </div>
        );

      case 'intl-services':
      case 'intl-services2':
        return (
          <div className="space-y-8">
            <PageTitle title="الخدمات المقدمة للطلبة الوافدين" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="الخدمات المقدمة للطلبة الوافدين" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <NumList items={[
                'يقوم المكتب باستقبال الطلبة الوافدين الجدد ومساعدتهم في إجراءات القبول والتسجيل، حيث يتم استقبالهم من قبل ممثلي المكتب الذين يقدمون المساعدة في متابعة الإجراءات الإدارية الخاصة بالقبول والتسجيل لهم تمهيداً لالتحاقهم بالدراسة.',
                'يقوم المكتب بمتابعة كل ما يتعلق بالمعاملات والإجراءات الرسمية الخاصة بإقاماتهم في المملكة الأردنية الهاشمية.',
                'يقوم المكتب بمساعدة الطلبة في إيجاد السكن المناسب لهم وتوفير فرص المشاركة فيما بينهم في السكن، ويستطيع الطالب اختيار السكن المناسب له حسب إمكانياته المادية، علماً بأن بعد السكن عن الجامعة لا يزيد عن 200م، كما تتوفر سكنات بالمناطق المحيطة بالجامعة والتي لا تزيد المسافة عن 1 كم، بالإضافة إلى أنه يوجد سكنات خاصة للطالبات داخل الحرم الجامعي لمن يرغب.',
                'المساهمة مع دائرة النشاط الرياضي في إعداد برامج لبطولات رياضية ولقاءات ودية بين الطلبة الوافدين من مختلف الجنسيات.',
                'الطالب مؤمن صحياً ما دام مسجلاً للفصل الدراسي من خلال المستشفيات الحكومية ومراكز وزارة الصحة الأردنية بالإضافة إلى مركز صحي جامعة مؤتة، وفي حال تعرض أي منهم لوعكة صحية يتم متابعتهم سواء مع عيادة الطلبة أو المستشفيات الأخرى، والاطمئنان على مراحل العلاج اللازمة.',
                'الطالب مؤمن على الحياة في حال العجز الجزئي أو الكلي أو الوفاة، وللمزيد من المعلومات على الطالب مراجعة شعبة التأمينات والإعفاءات في عمادة شؤون الطلبة.',
                'ينظم المكتب لقاء للطلبة الوافدين وسفاراتهم مع الأستاذ رئيس الجامعة خلال العام الدراسي لطرح ومناقشة القضايا والمشاكل التي تواجه الطلبة الوافدين، إذ يعمل المكتب على تذليل الصعوبات وحل المشكلات التي قد تواجه الطلبة خلال فترة دراستهم في الجامعة.',
                'يعمل المكتب على تنظيم العديد من الأنشطة الثقافية كالمعرض التراثي السنوي للطلبة الوافدين والذي يضم أجنحة تمثل دول الطلبة الوافدين المشاركة، ويتخلل المعرض إقامة العشاء الذي تقدم فيه أطباق ومأكولات شعبية تشتهر بها البلدان العربية والأجنبية، كما ينظم المكتب حفلاً فنياً فلكلورياً دولياً يشتمل على فقرات فلكلورية يقدمها الطلبة الوافدون من مختلف الجنسيات.',
                'يعمل المكتب وبشكل دوري على دراسة علمية مسحية للوقوف إلى جانب الطلبة الوافدين ومساعدتهم في حل مشاكلهم في المجالات كافة — الدراسية والاقتصادية والاجتماعية والانفعالية والصحية — التي يعاني منها الطلاب، كما ينظم المكتب نشاطات هادفة لخدمة المجتمع المحلي مما يكون له أثر نفسي واجتماعي للطلبة الوافدين، ويكون ذلك من خلال برامج موجهة لخدمة قطاعات المجتمع الأردني كرعاية الأيتام والعجزة وكبار السن.',
                'ينظم المكتب برامج ونشاطات ورحلات للطلبة الوافدين خاصة وزملائهم من الطلبة الأردنيين إلى العديد من المناطق الحضارية والسياحية والأثرية في المملكة والسياحة الدينية، ليتعرف الطالب من خلالها على أبرز الآثار وتاريخ المملكة الأردنية الهاشمية.',
                'يوجد في مكتب الطلبة الوافدين نادي باسم (نادي الطلبة الوافدين) وهو مشكل إدارياً ومنتخب من قبل الطلبة الوافدين، والذي يقوم بمتابعة الطلبة وتفقد أحوالهم والاجتماع معهم بصفة دورية والبحث في مطالبهم وقضاياهم من خلال النادي وحل مشاكلهم.',
                'تقوم الجامعة بعمل حفل خاص لتخريج الطلبة الوافدين في كل فصل دراسي تحت رعاية عطوفة الأستاذ الدكتور رئيس الجامعة، ويقوم بتنظيمه مكتب الطلبة الوافدين ونادي الطلبة الوافدين.',
                'توفر الجامعة خدمة بوابة السفارات من خلال موقعها حيث تتمكن الملحقيات الثقافية من معرفة أوضاع طلبتهم الأكاديمية والسلوكية ومتابعتهم.',
                'توفير قاعة مكيفة خاصة للطلبة الوافدين للراحة والاجتماع والدراسة في أوقات فراغهم، كما توفر قاعة مجهزة بأجهزة حاسوب وشاشات عرض تلفزيونية وخدمات الإنترنت ومختلف وسائل التواصل والبحث العلمي لطلبة الدراسات العليا.'
              ]} />
            </div>
          </div>
        );

      case 'res-supervision':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الإشراف على الطالبات" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة الإشراف على الطالبات" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <NumList items={[
                'الإشراف على سير العمل داخل الوحدات السكنية.',
                'متابعة استقبال الطالبات المستجدات وإعداد الملفات الخاصة بذلك.',
                'وضع الخطط والبرامج التثقيفية والترفيهية لطالبات المساكن.'
              ]} />
            </div>
          </div>
        );

      case 'res-followup':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة متابعة منازل الطالبات" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة متابعة منازل الطالبات" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <NumList items={[
                'متابعة كل ما يتعلق بصيانة السكنات وتأمين اللوازم والتجهيزات الخاصة بها بالتنسيق مع شعبة اللوازم والمباني والتجهيزات في العمادة.',
                'الإشراف على أمور السلامة العامة في السكنات ومرافقها المختلفة.'
              ]} />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ولدائرة السكنات خطط فصلية تتضمن</h3>
              <NumList items={[
                'إقامة بازارات خيرية ولمناسبات مختلفة، وذلك من خلال اللجان المختلفة المشكلة في السكنات.',
                'إقامة أطباق خيرية أسبوعية الهدف منها توفير وجبات غذائية مرة في الأسبوع للطالبات داخل السكنات وذلك حسب الطلب والمناسبات المختلفة.',
                'عقد دورات في السلامة العامة بالتعاون مع مديرية الدفاع المدني لمشرفات السكنات الداخلية من أجل إعادة تأهيل وتدريب المشرفات على الإسعافات الأولية الضرورية وكلما دعت الحاجة.',
                'عقد ندوات دينية، تربوية، صحية بالتعاون والتنسيق مع كلية الشريعة، وكلية العلوم التربوية، وعيادة الطلبة في المركز الصحي.',
                'تنظيم وتشكيل اللجان الداخلية للطالبات في كل وحدة سكنية للتنسيق والمتابعة والتواصل مع المشرفات في سبيل إنجاح النشاطات المختلفة داخل السكنات.',
                'تنظيم الرحلات الجامعية الترفيهية لطالبات السكنات بشكل عام إلى مناطق مختلفة من الأردن.',
                'إقامة حفلات التخرج للطالبات القاطنات في السكن الداخلي وتكريم الطالبات المتفوقات.'
              ]} />
            </div>
          </div>
        );

      case 'sp-halls':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الصالات والملاعب الرياضية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة الصالات والملاعب الرياضية" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ومن مهامها</h3>
              <NumList items={[
                'الإشراف على الصالات والملاعب الرياضية وجاهزيتها.',
                'متابعة صيانة المرافق الرياضية مع شعبة اللوازم والمباني والتجهيزات.'
              ]} />
            </div>
          </div>
        );

      case 'sp-org':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة التنظيم الرياضي" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة التنظيم الرياضي" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ومن مهامها</h3>
              <NumList items={[
                'إعداد خطط الأنشطة الرياضية وتحديد متطلباتها.',
                'تنظيم البطولات والمسابقات الرياضية للطلبة.',
                'تحديد احتياجات الفرق الطلابية بالتنسيق مع المعنيين.',
                'تأمين الاحتياجات الخاصة بالبطولات الرياضية (إسعافات أولية وغيرها).',
                'إعداد التقارير عن المشاركات الرياضية.'
              ]} />
            </div>
          </div>
        );

      case 'sp-training':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة التدريب الرياضية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة التدريب الرياضية" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ومن مهامها</h3>
              <NumList items={[
                'وضع وتنفيذ خطط التدريب للفرق الرياضية.',
                'تحديد طبيعة الدورات التدريبية للمدربين والمشرفين الرياضيين.',
                'تقييم أداء الفرق الرياضية في الجامعة وتجهيز التقارير الخاصة بذلك.',
                'تحديد احتياجات الفرق الطلابية بالتنسيق مع المعنيين.',
                'إعداد التقارير عن المشاركات الرياضية.'
              ]} />
            </div>
          </div>
        );

      case 'cu-media':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الاعلام" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة الاعلام" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">شعبة صحيفة مؤتة والمواد المطبعية</h3>
              <p className="text-gray-700 leading-[2.1] text-justify">
                وتتولى مسؤولية إصدار المطبوعة الطلابية الرئيسية في الجامعة، وهي صحيفة مؤتة، وتشمل على
                النشاطات الطلابية والأخبار الجامعية، بالإضافة إلى نشاطات المجتمع المحلي، وكذلك إصدار
                دليل الطالب، والإشراف على أية مطبوعات تصدرها العمادة.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">شعبة التوثيق والإعلام الطلابي</h3>
              <p className="text-gray-700 leading-[2.1] text-justify">
                وتتولى توثيق الأخبار المتعلقة بالنشاطات الجامعية الطلابية وتلك الخاصة بعمادة شؤون
                الطلبة، بالإضافة إلى توفير التغطية الإخبارية بمختلف وسائل الإعلام للنشاطات الطلابية.
              </p>
            </div>
          </div>
        );

      case 'cu-arts':
      case 'cu-porcelain':
      case 'cu-design':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الفنون التشكيلية" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة الفنون التشكيلية" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                وهي المسؤولة عن كل ما يتعلق بنشاطات الطلبة في مجالات الرسم والأشغال اليدوية والتصويري
                والخط وتشكيل النحاس، ويتبع لها فرع الخزف الذي يشمل استديو خاص للخزف.
              </p>
            </Prose>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">فرع الخزف</h3>
              <p className="text-gray-700 leading-[2.1] text-justify">
                يعنى فرع الخزف — والذي يضم استوديو الخزف (الفخار) — بأعمال الخزف وتدريب الطلبة على
                المهارات كافة المتعلقة بإنتاج الخزف، ولذلك تقوم العمادة بتوفير جميع المواد التي تلزم
                لصقل هذه المهارات لدى الطلبة، وبالإضافة إلى ذلك تقوم العمادة بالتعاون مع المجتمع المحلي
                بتدريب عدد من المهتمين في هذا المجال، وتوفر لهم الإمكانات كافة مساهمة منها في مساعدتهم
                لإيجاد فرص عمل تؤمن لهم دخلاً منتظماً وتمنحهم شهادات موقعة من عميد شؤون الطلبة ومدير
                مؤسسة التدريب المهني في محافظة الكرك.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">المرسم والخط</h3>
              <p className="text-gray-700 leading-[2.1] text-justify">
                يتبنى المرسم الطلبة المبدعين ويوفر لهم الفرصة الكاملة بتوجيه بنّاء لإنتاج اللوحات الفنية
                التي تعرض بمعارض فنية في قاعات داخل الجامعة وخارجها، كما يقدم المرسم عنايته للطلبة
                المهتمين بفن الكاريكاتير، وتهتم الشعبة بتنمية مهارات الطلبة في الخط العربي من خلال
                إقامة الدورات الأولية والمتقدمة لهم، وإشراك المميزين منهم بالمسابقات التي تقام على
                مستوى الجامعة والجامعات الأردنية.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">وتهدف شعبة الفنون التشكيلية إلى</h3>
              <NumList items={[
                'تدريب الطلبة على مبادئ الرسم والخزف والخط بشتى أنواعه.',
                'توجيه الطلبة الموهوبين في الرسم والخزف والخط وصقل مواهبهم وعمل لوحات بأسمائهم.',
                'تنظيم دورات في الرسم والخزف والخط.',
                'تدريب المهتمين من الجامعة والمجتمع المحلي في مجال الخزف مع الإمكانات الفنية كافة مساهمة منها في مساعدتهم لإيجاد فرص عمل تؤمن لهم دخلاً منتظماً، وتمنحهم شهادات موقعة من الجامعة وبالتعاون مع مؤسسة التدريب المهني.',
                'تطوير عمل المشرفين في مختلف التخصصات: الرسم، والخزف، والأشغال اليدوية، والخط.',
                'تدريب الطلبة على المهارات كافة المتعلقة بإنتاج الخزف.',
                'إقامة المعارض الفنية داخل الجامعة، والمشاركة في المعارض التي تقام خارجها وتدعى لها الجامعة.',
                'اختيار وتدريب الطلبة المتميزين في مجال الرسم والخط والخزف، سواء كانوا من طلبة التفوق الفني أو طلبة الجامعة أصحاب المواهب.',
                'متابعة التزام الطلبة المقبولين على أساس التفوق الفني في الفنون التشكيلية.',
                'الإشراف على إقامة المعارض من أعمال الطلبة داخل الجامعة وخارجها في مختلف المهارات.',
                'تعلم الرسم على القماش والمخمل والحرير والزجاج بوساطة الألوان الزيتية والمائية والطباشير والباستيل عن طريق الدورات المستمرة.'
              ]} />
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">القبول على أساس التفوق الفني</h3>
              <p className="text-sm text-gray-700 leading-[2] text-justify mb-6">
                تقبل جامعة مؤتة كل عام مجموعة من الطلبة على أساس التفوق الفني من الطلبة المميزين في هذا
                المجال، والذين تم قبولهم في الجامعة ضمن أي برنامج للدراسة في العام الدراسي الحالي أو
                ضمن الدورة الشتوية. وتقوم دائرة النشاط الثقافي والفني بإعداد برنامج لقبول الطلبة ضمن
                هذا التفوق ممن لديهم مهارات:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {['العزف','الغناء','المسرح','الرسم','الخط العربي','الخزف'].map((sk, i) => (
                  <div key={sk} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-5 py-3.5">
                    <span className="w-6 h-6 rounded-full bg-[#0f3057] text-[#c9a227] text-[11px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="text-sm font-semibold text-[#0f3057]">{sk}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-700 leading-[2] mb-4">
                وتقوم الدائرة باختبار الطلبة المتفوقين ضمن البرنامج وفق تعليمات التفوق الفني المعمول
                بها في الجامعة:
              </p>
              <NumList items={[
                'أن يكون الطالب مقبولاً في الجامعة.',
                'أن يكون لديه وثائق تثبت تفوقه في المهارة التي يتقدم لها.',
                'أن يخضع لامتحان المقابلة الشخصية وامتحان المهارة العملي والتحريري.'
              ]} />
            </div>
          </div>
        );

      case 'cu-music':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الموسيقى والمسرح" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة الموسيقى والمسرح" className="w-full max-h-[420px] object-cover" />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">النشاط المسرحي</h3>
              <p className="text-gray-700 leading-[2.1] text-justify mb-6">
                يتبنى هذا النشاط الطلبة الموهوبين ممن لديهم الميول المسرحية بإقامة الورشات المسرحية في
                التمثيل والإخراج والإدارة المسرحية، حيث يستطيع الطالب ممارسة النشاط من خلال الالتحاق
                بفرقة المسرح الجامعي، حيث تقوم الفرقة بالأعمال المسرحية المحلية داخل الجامعة وخارجها.
              </p>
              <NumList items={[
                'اختيار وتدريب أعضاء الفرق المسرحية من الطلبة الموهوبين.',
                'متابعة التزام الطلبة المقبولين على أساس التفوق الفني في أنشطة المسرح.',
                'الإشراف على مشاركات الفرق المسرحية داخل وخارج الجامعة.'
              ]} />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">النشاط الموسيقي</h3>
              <p className="text-gray-700 leading-[2.1] text-justify mb-4">
                ويهتم بالطلبة الهواة، حيث يتم عقد دورات تدريبية تمكن الطالب من خلالها تعلم العزف على
                الآلات الموسيقية المختلفة، وتعلم قراءة النوتة الموسيقية، وتعلم المقامات والغناء بشكل
                صحيح. وفرقة الحركات الأدائية والدبكات الشعبية، وفرقة الشباب (الجيتارات) وفرقة الإنشاد
                الديني.
              </p>
              <p className="text-gray-700 leading-[2.1] text-justify mb-6">
                كما يمكن للطلبة الذين يتقنون العزف استخدام صالات النشاط الموسيقي لممارسة هواياتهم في
                أوقات فراغهم.
              </p>
              <NumList items={[
                'تدريب الطلبة على العزف والغناء المنفرد والجماعي.',
                'تكوين فريق غناء (كورال).',
                'تدريب الطلبة المشاركين في جائزة الحسن للشباب.',
                'المشاركة في الاحتفالات الوطنية التي تقام داخل الجامعة وخارجها.',
                'متابعة التزام الطلبة المقبولين على أساس التفوق الفني الموسيقي وتدريبهم.'
              ]} />
            </div>
          </div>
        );

      case 'cu-culture':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة النشاط الثقافي والإعلامي" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة النشاط الثقافي والإعلامي" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                تهتم هذه الشعبة في عمادة شؤون الطلبة بالطالب الجامعي بوصفه محور العملية التعليمية
                الرامية إلى بناء شخصيته وتشجيعها بشكل متكامل ودعم مواهبه وهواياته المتنوعة، وتركز
                الشعبة على الجانب الثقافي والأدبي وذلك في إفساح فرص المشاركة للطلبة في النشاطات
                الثقافية التي تتماشى وميولهم واستعداداتهم، وإبراز ثقافتهم ومهاراتهم وتنمية إبداعاتهم
                الأدبية في مختلف المجالات.
              </p>
            </Prose>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">وتناط بها المهام الآتية</h3>
              <NumList items={[
                'إعداد خطة النشاطات الثقافية فصلياً والعمل على تنفيذها.',
                'الإعداد للمسابقات الثقافية داخل الجامعة.',
                'تنظيم مشاركات الطلبة في المسابقات الثقافية المختلفة التي تنظمها الجامعات الشقيقة والمؤسسات المحلية والخارجية.',
                'متابعة إصدار صحيفة مؤتة، من حيث التحرير والطباعة والتدقيق.',
                'متابعة إصدار دليل الطالب على الموقع الإلكتروني للعمادة.',
                'متابعة الإعلان عن الأنشطة الطلابية للعمادة كاملة مع دائرة العلاقات الثقافية والعامة.',
                'تشجيع أصحاب القلم والفكر في الجامعة وتنمية موهبة الكتابة لدى الطلبة.'
              ]} />
            </div>
          </div>
        );

      case 'act-alumni':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الفرق الطلابية وشؤون التخريج" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة الفرق الطلابية وشؤون التخريج" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ومهامها</h3>
              <NumList items={[
                'إعداد السجلات الخاصة بالخريجين.',
                'متابعة كل ما يتعلق باحتفالات التخريج.',
                'متابعة الخريجين وإدامة التواصل معهم.',
                'تشكيل فرق الجوالة وإقامة المعسكرات التدريبية.',
                'تنسيق برنامج جائزة الحسن للشباب والسابلة.',
                'الإشراف على فريق الرواد والقيادة الواعدة لإعداد الأهداف.',
                'التنسيق والإعداد للكتاب السنوي.'
              ]} />
            </div>
          </div>
        );

      case 'act-initiatives':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة المبادرات والنشاط الإجتماعي" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة المبادرات والنشاط الاجتماعي" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p className="font-bold text-[#0f3057]">شعبة المبادرات الطلابية</p>
              <p>
                تسعى هذه الشعبة إلى تبنّي أفكار ومبادرات الطلبة من خلال ترجمتها إجرائياً على أرض
                الواقع، وتهدف إلى النهوض بأفكار الطلبة وصقل شخصياتهم من خلال تحمل الطلبة روح المسؤولية.
              </p>
            </Prose>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-2">شعبة الأنشطة الاجتماعية</h3>
              <p className="text-sm text-gray-600 mb-6">ومهامها</p>
              <NumList items={[
                'الإشراف على الرحلات الترفيهية والوطنية للطلبة.',
                'الإشراف التام على مختلف الأنشطة الاجتماعية للطلبة.',
                'تخطيط وتنفيذ الأعمال التطوعية والتنسيق مع المجتمع المحلي.'
              ]} />
            </div>
          </div>
        );

      case 'act-union':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الأندية الطلابية واتحاد الطلبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة الأندية الطلابية واتحاد الطلبة" className="w-full max-h-[420px] object-cover" />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ومهامها</h3>
              <NumList items={[
                'الإشراف التام على الهيئات الطلابية (الأندية الطلابية واتحاد الطلبة).',
                'الإعداد لانتخابات الطلبة (لعضوية مجلس اتحاد الطلبة، وعضوية الأندية الطلابية).',
                'إعداد الخطط والبرامج الخاصة بالأندية الطلابية ومتابعتها.',
                'متابعة أنشطة الاتحاد والاحتفاظ بسجلات مفهرسة ومنظمة.'
              ]} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-5">وتضم الشعبة الأندية التالية</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  'نادي النهضة والتراث / دائرة الهيئات الطلابية',
                  'النادي البيئي والصحي / دائرة الهيئات الطلابية',
                  'النادي الطبي / دائرة الهيئات الطلابية',
                  'النادي الأدبي / دائرة الهيئات الطلابية',
                  'نادي كلنا الأردن / دائرة الهيئات الطلابية',
                  'نادي حقوق الإنسان / دائرة الهيئات الطلابية',
                  'النادي العلمي / دائرة الهيئات الطلابية',
                  'النادي الهندسي / دائرة الهيئات الطلابية',
                  'نادي الشطرنج / دائرة الهيئات الطلابية',
                  'النادي الزراعي / دائرة الهيئات الطلابية',
                  'النادي الرياضي / دائرة الهيئات الطلابية',
                  'نادي الريادة / دائرة الهيئات الطلابية',
                  'نادي سفراء جامعة مؤتة',
                  'نادي ذوي الإعاقة / مكتب التوجيه والإرشاد الطلابي والمجتمعي',
                  'نادي الطلبة الوافدين / مكتب الطلبة الدوليين'
                ].map((c) => (
                  <div key={c} className="flex items-start gap-2.5 border border-gray-200 rounded-xl px-5 py-3.5 hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227] shrink-0 mt-2" />
                    <span className="text-sm text-gray-700 leading-relaxed">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">أهداف الأندية والجمعيات الطلابية</h3>
              <NumList items={[
                'تشجيع الميول التطوعية والخدمة العامة والعمل الجماعي بين طلبة الجامعة.',
                'تنمية المواهب والهوايات وتشجيعها.',
                'إفساح الفرص لطلبة الجامعة للمشاركة في النشاطات التي تتناسب مع ميولهم وقدراتهم واستعداداتهم العلمية.',
                'إفساح المجال للطلبة غير الأردنيين للمشاركة في النشاطات الطلابية وإظهار ثقافتهم وميولهم ومهاراتهم.',
                'تنمية الاهتمام بالنواحي الجمالية والذوقية.',
                'تنمية الاهتمام بالتراث الحضاري في الأردن والوطن العربي والعالم الإسلامي والعناية بالثقافة المحلية والعالمية.'
              ]} />
              <p className="text-sm text-gray-700 leading-[2] mt-6">
                تمارس الأندية والجمعيات اختصاصها وتعمل على تحقيق أهدافها من خلال الهيئتين التاليتين:
                أ‌. الهيئة العامة. ب‌. الهيئة الإدارية.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">وتضم شعبة الأندية الطلابية واتحاد الطلبة فرع متابعة الأنشطة</h3>
              <p className="text-sm text-gray-700 leading-[2] text-justify">
                يهدف هذا الفرع إلى متابعة الأنشطة، سواء داخل الجامعة أو خارجها، والتي يقوم بها الطلبة
                من خلال مشاركتهم الفاعلة أو حضور هذه الأنشطة، والتي تهدف إلى بناء شخصية الطالب
                المتكاملة، والمساهمة في بناء وتقدم جامعته ووطنه.
              </p>
            </div>
          </div>
        );

      case 'ss-disabilities':
      case 'gd-disabilities':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة رعاية ذوي الاحتياجات الخاصة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة رعاية ذوي الاحتياجات الخاصة" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                تم إنشاء شعبة لذوي الاحتياجات الخاصة في عمادة شؤون الطلبة / جامعة مؤتة بموجب قرار مجلس
                التعليم العالي رقم (320) تاريخ 19/9/2007، وتناط بالشعبة المهام الآتية.
              </p>
            </Prose>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">مهام الشعبة</h3>
              <NumList items={[
                'احترام حقوق طلبة ذوي الاحتياجات الخاصة في الحصول على التعليم والمعرفة.',
                'الدعم النفسي لطلبة الجامعة ذوي الاحتياجات الخاصة بفئاتهم الثلاث: الإعاقة البصرية، والسمعية، والحركية — ويشمل: مساعدة الطالب على تقبل ذاته بوضعه الراهن، وتعزيز مفهوم الذات الإيجابي ورفع تقدير الذات، وتعزيز اعتماده على ذاته ورعايتها ودراسة مشكلاتهم والعمل على حلها.',
                'تطوير مهارات التواصل وإدارة الضغط النفسي لديهم، من خلال تمكين الطلبة ذوي الاحتياجات الخاصة الملتحقين في الجامعة على تحقيق أعلى درجة من التكيف النفسي والاجتماعي والتحصيل الأكاديمي وفقاً لما تسمح به قدراتهم.',
                'عقد دورات تمكن الطلبة ذوي الاحتياجات الخاصة من بناء المهارات كل حسب مجاله وحاجاته.',
                'دراسة مشكلات هؤلاء الطلبة والعمل على حلها.',
                'دمج طلبة ذوي الاحتياجات الخاصة مع أقرانهم من غير ذوي الاحتياجات الخاصة في برامج تدريبية وتثقيفية وترفيهية معدة مسبقاً.',
                'المساهمة في تذليل وإيجاد الحلول للمشاكل والمعيقات كافة التي تواجه الطلبة ذوي الاحتياجات الخاصة في الجامعة.',
                'تحقيق مساهمة الطلبة ذوي الاحتياجات الخاصة في المشاركة الفاعلة في النشاطات الطلابية كافة في الجامعة وعلى قدر المساواة.',
                'العمل على توفير مجموعة من الطلبة المتطوعين لقراءة المواد الأكاديمية للطلبة المكفوفين بشكل مباشر.',
                'التعاون مع الجهات الرسمية وغير الرسمية كافة التي تعنى بهذه الفئة.',
                'دعم الإبداعات الفردية والجماعية للطلبة ذوي الاحتياجات الخاصة، مثل الدعم الذي قدمته الجامعة لأحد الطلبة الصم حيث قام بتصميم برنامج حاسوبي لتعليم لغة الإشارة العربية الموحدة، وقد تكفلت الجامعة بطباعة أغلفة القرص التعليمي ورشحته لجائزة الملك عبد الله الثاني ابن الحسين للإبداع، وقدمت له الدعم المناسب لحضور مؤتمر في دولة قطر بوصفه خبيراً في لغة الإشارة.'
              ]} />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">الخدمات المقدمة للطلبة ذوي الاحتياجات الخاصة في الجامعة</h3>
              <NumList items={[
                'خصم على الرسوم الجامعية وبنسبة تصل إلى (90%) من رسوم الساعات المعتمدة.',
                'توفير طلبة مرافقين لطلبة ذوي الاحتياجات الخاصة وعلى نظام تشغيل الطلبة.',
                'زيادة قدرة الجامعة لتلبية احتياجات ذوي الاحتياجات الخاصة.',
                'مساعدة طلبة ذوي الاحتياجات الخاصة في التغلب على التحديات التي تواجههم في الدراسة.',
                'توفر قاعة مخصصة ومجهزة بأجهزة كمبيوتر حديثة للطلبة ذوي الاحتياجات الخاصة لاستخدامها في دراستهم ونشاطاتهم.',
                'العمل على توفير برامج حاسوبية ناطقة للطلبة المكفوفين وضعاف البصر في الدائرة.',
                'تسهيل آلية التواصل مع الطلبة ذوي الاحتياجات الخاصة.',
                'عقد دورات متخصصة لطلبة الجامعة من ذوي الاحتياجات الخاصة في مجالات: لغة الإشارة (دورات للمبتدئين وأخرى متقدمة) وطريقة «برايل» ومهارات الحاسوب الناطق، ومهارات الحاسوب للطلبة الصم، ومهارات الحركة والتنقل.',
                'الإشراف على نادي أصدقاء ذوي الاحتياجات الخاصة.',
                'العمل على توفير نسخ مطبوعة بطريقة «برايل» للطلبة المكفوفين.',
                'توفير الخدمات الترفيهية من رحلات وأنشطة ثقافية.',
                'تقديم خدمات الإرشاد والتوجيه النفسي للطلبة ذوي الاحتياجات الخاصة في الجامعة ودراسة مشكلاتهم الأسرية والأكاديمية والتكيفية والاجتماعية والعمل على حلها.',
                'التواصل مع الدوائر والأقسام المختلفة داخل الجامعة لحل مشكلات الطلبة ذوي الاحتياجات الخاصة.',
                'مساعدة الطلبة ذوي الاحتياجات الخاصة في تسجيل المواد وتنظيم الجدول الدراسي في كل فصل دراسي، حيث يتم تحديد وقت مبكر يسبق تسجيل طلبة الجامعة الآخرين ليتمكن الطالب من تحديد جدوله الدراسي بشكل يتناسب ووضعه الصحي، والعمل على نقل قاعات المحاضرات لهؤلاء الطلبة بما يتناسب مع وضعهم الصحي.'
              ]} />
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-[#c9a227] mb-4">نادي أصدقاء ذوي الإعاقة</h3>
              <p className="text-sm text-gray-700 leading-[2] text-justify mb-6">
                يتم العمل داخل النادي على يد مجموعة من الخبراء والمدربين لتقديم المساعدة على أساس علمي
                ونفسي سليم يعمل على تصحيح مسار الإعاقة لدى الفتيات والشباب من ذوي الاحتياجات الخاصة
                والعمل على دمجهم داخل المجتمع.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#0f3057] text-white">
                      <th className="px-5 py-3 text-right font-bold">الطالب/ ـة</th>
                      <th className="px-5 py-3 text-right font-bold w-40">المنصب</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['نغم علي المواجدة', 'رئيساً'],
                      ['ادهم مالك المدادحة', 'نائب الرئيس'],
                      ['محمد حامد السحيمات', 'أميناً للصندوق'],
                      ['مجد احمد المعايطة', 'أميناً للسر'],
                      ['علي فراس المواجدة', 'عضواً'],
                      ['سرين سليمان الرماحنة', 'عضواً'],
                      ['اسراء فايز النوايسة', 'عضواً']
                    ].map((r, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'border-t border-gray-100 bg-white' : 'border-t border-gray-100 bg-[#F8FAFC]'}>
                        <td className="px-5 py-3.5 font-semibold text-[#0f3057]">{r[0]}</td>
                        <td className="px-5 py-3.5 text-gray-600">{r[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-5">وحدة رعاية ذوي الاحتياجات الخاصة</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  '02%20at%2010.56.50.jpeg',
                  '-11-02%20at%2010.55.12.jpeg',
                  '0.55.12%20%281%29.jpeg',
                  '-02%20at%2010.56.52.jpeg'
                ].map((f) => (
                  <div key={f} className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 aspect-[4/3]">
                    <img src={`https://www.mutah.edu.jo/ar/studentaffairs/SiteAssets/Pages/Forms/EditForm/${f}`} alt="وحدة رعاية ذوي الاحتياجات الخاصة" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'ss-loans':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة القروض والمساعدات" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة القروض والمساعدات" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ومهامها</h3>
              <NumList items={[
                'إجراء جميع المخاطبات والمراسلات الخاصة بتشغيل الطلبة في مرافق الجامعة من الصناديق الخاصة بذلك ومتابعة سير عملهم في دوائر وكليات الجامعة.',
                'الإعداد لاجتماعات لجنة صندوق الطلبة المدنيين وصندوق التبرعات وتنفيذ القرارات الصادرة عنها.',
                'متابعة معاملات تأجيل دفع الرسوم الفصلية ورفعها إلى الدائرة المالية وذلك من خلال النظام المحوسب المعد لهذه الغاية.',
                'تقديم المنح المالية للطلبة المتفوقين أكاديمياً.',
                'تسديد ملاحظات الطلبة على النظام.'
              ]} />
            </div>
          </div>
        );

      case 'ss-computer':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة الحاسوب" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة الحاسوب" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                تم استحداث شعبة الحاسوب في عمادة شؤون الطلبة بحيث تتبع مباشرة إلى مكتب عميد شؤون
                الطلبة، بهدف إعداد البرامج والأنظمة التي تحتاجها دوائر عمادة شؤون الطلبة، لإنجاز عملها
                بالسرعة وتوفيراً للوقت والجهد المبذولين من خلال البرامج التي يعدها مركز الحاسوب
                بالتنسيق مع شعبة الحاسوب في العمادة، وذلك لتحقيق الدقة في العمل، وترابط المعلومات،
                وبذلك يسهل على الدوائر المعنية إنجاز عملها، وأرشفة البيانات والأنشطة كافة إلكترونياً
                ليسهل الرجوع إليها وقت الحاجة للوصول إلى عمادة شؤون الطلبة إلكترونياً.
              </p>
            </Prose>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">وتناط بالشعبة المهام الآتية</h3>
              <NumList items={[
                'متابعة البرامج المحوسبة في عمادة شؤون الطلبة والعمل على تطويرها وإنشاء برامج جديدة تنسجم مع متطلبات العمل وبما يخدم العمل ويوفر الوقت والجهد.',
                'عمل الإحصائيات المتعلقة بطلبة الجامعة بشكل عام من حيث أعداد الطلبة المقبولين في كل فصل والطلبة الخريجين والفاقدين لمقاعدهم لأي سبب كان.',
                'عمل البروشورات التوضيحية للطلبة والبروشورات الخاصة بأنشطة الطلبة وفعالياتهم على مستوى العمادة.',
                'متابعة الصيانة مع مركز الحاسوب وشعبة اللوازم في الجامعة.',
                'متابعة وتطوير وتحديث موقع عمادة شؤون الطلبة ونشر الإعلانات الخاصة بعمادة شؤون الطلبة أو المجتمع المحلي.',
                'متابعة حساب (عمادة شؤون الطلبة) وصفحة العمادة (deanship of students’ affairs) ونشر الإعلانات المتعلقة بعمادة شؤون الطلبة أو المجتمع المحلي على الفيس بوك.',
                'متابعة المجموعات المنشأة على الفيس بوك (إعلانات العمادة، صندوق اقتراحات العمادة).',
                'تطوير وتحديث موقع عمادة شؤون الطلبة.',
                'أية أعمال أخرى تكلف بها الشعبة بما يخدم دوائر العمادة.'
              ]} />
            </div>
          </div>
        );

      case 'ss-status':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة أحوال الطلبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة أحوال الطلبة" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">وتقوم بالمهام التالية</h3>
              <NumList items={[
                'استقبال الطلبة الجدد على جميع المستويات.',
                'تثبيت بيانات الطالب إلكترونياً من خلال موقع الجامعة وإصدار هوية جامعية والاحتفاظ بذلك حاسوبياً، وتوثيق المعلومات الواردة من الكليات عن الطالب.',
                'متابعة تسليم مفقودات الطلبة حسب الأصول.',
                'إصدار (باجات) لبعض عمادات ووحدات ودوائر الجامعة في الجناح المدني والعسكري بالإضافة إلى بعض الدوائر الحكومية في قصبة الكرك.',
                'إعداد البرامج الحاسوبية اللازمة لمختلف دوائر العمادة.',
                'عمل الإحصائيات الفصلية اللازمة وإعداد البرامج اللازمة لاستقبال الطلبة المستجدين.',
                'إصدار الوثائق التي يحتاجها الطلبة (مثل حسن السلوك) … الخ.',
                'تصميم وتجهيز النشرات والمطويات التثقيفية التي تصدرها العمادة.',
                'تسديد ملاحظات الطلبة على النظام.'
              ]} />
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
              <h3 className="text-lg font-bold text-[#c9a227] mb-5">تضم شعبة أحوال الطلبة فرع براءة الذمة</h3>
              <ul className="space-y-3 text-sm text-gray-700 list-disc list-inside leading-relaxed">
                <li>يُعنى هذا الفرع بإصدار وثائق براءة الذمة للطلبة ومتابعتها.</li>
                <li>تسديد جميع الملاحظات المتعلقة ببراءة الذمة على النظام.</li>
              </ul>
            </div>
          </div>
        );

      case 'ss-insurance':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة التأمينات و الإعفاءات للطلبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة التأمينات والإعفاءات للطلبة" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-[#0f3057] mb-6">ومهامها</h3>
              <NumList items={[
                'متابعة إجراءات التأمين الصحي للطلبة، وذلك حسب العقود المبرمة مع الجهة المتعاقد معها.',
                'إعداد محاضر اجتماع لجنة التأمين الصحي للطلبة للنظر في فواتير العلاج والمطالبات المقدمة منهم ليتم صرفها حسب الأصول.',
                'إتمام معاملات التأمين على حياة الطلبة في الجامعة وطلبة المدرسة النموذجية والطلبة المبعوثين في حالات الوفاة أو الإصابة، ومتابعتها مع الشركة المعنية، وإجراء جميع المخاطبات والمراسلات الخاصة بذلك.',
                'تسديد جميع الملاحظات على معاملات الطلبة فيما يتعلق بالتأمين الصحي والتأمين على الحياة، وإنشاء قاعدة بيانات خاصة بذلك لزيادة الدقة والتوثيق وسهولة استخراج المعلومات والإحصائيات عند الحاجة.',
                'تجهيز معاملات إعفاء الطلبة من أبناء الشهداء والمصابين العسكريين، وإعداد جداول الأعمال ومحاضر الاجتماعات الخاصة بذلك.',
                'إتمام معاملات الطلبة ذوي الإعاقة ومتابعتها مع اللجنة الطبية في الجامعة وإعطاءهم الخصم الخاص من الرسوم الدراسية حسب الأصول.'
              ]} />
            </div>
          </div>
        );

      case 'about-diwan':
        return (
          <div className="space-y-8">
            <PageTitle title="ديوان عمادة شؤون الطلبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="ديوان عمادة شؤون الطلبة" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p className="font-bold text-[#0f3057]">يضم ديوان عمادة شؤون الطلبة فرعين:</p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-block bg-[#0f3057] text-white text-sm font-bold px-5 py-2 rounded-full">فرع الوارد</span>
                <span className="inline-block bg-[#0f3057] text-white text-sm font-bold px-5 py-2 rounded-full">فرع الصادر</span>
              </div>
            </Prose>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
              <h3 className="text-lg font-bold text-[#0f3057] mb-2">مهام الديوان</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                يقوم ديوان عمادة شؤون الطلبة بالإشراف على الكتب الصادرة والواردة من خلال فرعيه:
              </p>
              <NumList items={[
                'مخاطبة الجهات الرسمية داخل وخارج الجامعة والرد عليها من خلال المراسلات الرسمية (ورقي، فاكس، إيميل).',
                'التنسيق المباشر مع دوائر عمادة شؤون الطلبة بخصوص أي كتاب عاجل وارد إلى الديوان.',
                'استلام البريد من جميع الجهات الداخلية في الجامعة والخارجية.',
                'توزيع البريد الصادر من عمادة شؤون الطلبة مباشرة كل ضمن اختصاصه والتدقيق عليه.',
                'استقبال وإرسال الفاكسات ومعرفة مسارها وأين انتهت.',
                'تقديم النصح والمشورة إلى الطلبة وتحويلهم إلكترونياً إلى المركز الصحي.',
                'الإشراف على الطباعة من حيث الدقة وسرعة الإنجاز وتوزيع العمل بين الطابعات وعمال البريد.',
                'فتح ملف لكل موظف في العمادة ومتابعة دوام العاملين والتدقيق عليه وتنظيم السجلات الخاصة بالعمل الإضافي والإجازات والمغادرات والعقوبات.',
                'تصوير البريد الصادر والوارد كل ضمن اختصاصه وتوزيع الإعلانات الخاصة بالطلبة.',
                'توفير القرطاسية للدوائر.',
                'متابعة تنفيذ قرارات العميد.',
                'المشاركة في اجتماعات الدوائر في العمادة مع العميد.',
                'أية مهام أخرى يكلف بها من قبل العميد.'
              ]} />
            </div>
          </div>
        );

      case 'about-dean':
        return (
          <div className="space-y-8">
            <PageTitle title="كلمة عميد شؤون الطلبة" />
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 shrink-0 bg-gray-50 rounded-3xl p-5 border border-gray-100 text-center">
                <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-[#0f3057]">
                  <img src="https://www.mutah.edu.jo/ar/studentaffairs/SiteAssets/Pages/Forms/EditForm/maher%20mobaideen.JPG" alt="عميد شؤون الطلبة" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-[#0f3057] leading-snug">أ.د. ماهر أحمد المبيضين</h3>
                <p className="text-[#c9a227] font-bold text-sm mt-1">عميد شؤون الطلبة</p>
              </div>
              <div className="w-full md:w-2/3">
                <Prose>
                  <p className="font-bold text-[#0f3057]">أبنائي الطلبة:</p>
                  <p>
                    أحييكم تحية مودة واعتزاز بكم جميعاً وأنتم تستعدون لبدء عام جامعي جديد في جامعة مؤتة
                    جامعة السيف والقلم، تنتهلون من مشاربها مختلف أنواع العلم والمعرفة، أرحب بكم طلبة
                    أعزاء في عمادة شؤون الطلبة البيت الدافئ الذي يستقبل إبداعاتكم ومهاراتكم وأنشطتكم
                    الثقافية والعلمية والفنية والرياضية وغيرها.
                  </p>
                  <p>
                    إننا في عمادة شؤون الطلبة نقف من جميع طلبتنا الأعزاء على مسافة واحدة، نحترم آراءهم،
                    ونقدر إبداعاتهم، ونساهم في صقل شخصياتهم، ونعزز ما لديهم من قدرات معرفية وثقافية
                    وفكرية ورياضية، ونهيئ لهم الأماكن الرحبة لكي يتمكنوا من ممارسة أنشطتهم كافة.
                  </p>
                  <p>
                    وأخيراً أرجو لكم التوفيق والسداد وحياة جامعية حافلة بالعطاء والتميز والنجاح ليسهم
                    في رقي الجامعة وتميزها لتكون في مصاف الجامعات العالمية المرموقة.
                  </p>
                  <div className="pt-4 border-t border-gray-100 mt-4">
                    <p className="font-bold text-[#0f3057]">عميد شؤون الطلبة</p>
                    <p className="font-bold text-[#c9a227]">أ.د. ماهر أحمد المبيضين</p>
                  </div>
                </Prose>
              </div>
            </div>
          </div>
        );

      case 'about-services':
        return (
          <div className="space-y-8">
            <PageTitle title="الخدمات المقدمة للطلبة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="الخدمات المقدمة للطلبة" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                تمشياً مع السياسة التي تسعى إلى توفير أفضل سبل الراحة للطالب وتلبية لاحتياجاته بأسرع
                الطرق وأنجعها، تقدم عمادة شؤون الطلبة الكثير من الخدمات اللازمة للطالب بهدف تخفيف
                العبء عن كاهله، والاهتمام به من جميع الجوانب ليسهل عليه إنهاء دراسته الجامعية بأقل قدر
                ممكن من العناء سعياً وراء التطوير.
              </p>
              <p>
                وفي ضوء الازدياد المستمر لأعداد الطلبة في الجامعة والتقدم المستمر في مجال الحاسوب
                والمعلوماتية، فقد تمت حوسبة جميع أعمالها وتطوير الأنظمة المعمول بها خلال الفترة القليلة
                الماضية محققة بذلك نقلة نوعية في أدائها، حيث تم استخدام الحاسوب في الاحتفاظ بسجلات
                ومعلومات خاصة لجميع طلبة الجامعة لمتابعة مسيرتهم طيلة فترة دراستهم الجامعية، وإعداد
                الدراسات اللازمة لطلبات القروض والمساعدات والتشغيل التي يتقدمون بها، هذا بالإضافة
                لإعداد الإحصائيات والكشوفات المختلفة وإصدار الهويات الجامعية على نظام الحاسوب وغيرها من
                الأعمال، لذا تعمل هذه الدائرة على تقديم الخدمات الضرورية للطلبة وتهيئة الأجواء المناسبة
                لهم.
              </p>
            </Prose>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {['السكنات','الخدمات الصحية','الخدمات الرياضية','الخدمات الدينية (مساجد، كنائس)','الخدمات الوظيفية','المكتبة','خدمات مركز الحاسوب','خدمات المجتمع المحلي'].map((sv, i) => (
                <div key={sv} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 hover:border-[#c9a227] transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-[#0f3057] text-[#c9a227] text-xs font-bold flex items-center justify-center mb-4">{i + 1}</span>
                  <p className="font-bold text-[#0f3057] text-sm leading-snug">{sv}</p>
                </div>
              ))}
            </div>
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
                    <p className="text-gray-600" dir="ltr">+(962) 3 2372380</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-[#0f3057] mb-0.5">البريد الإلكتروني</p>
                    <p className="text-gray-600" dir="ltr">Unit_admin@mutah.edu.jo</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <div className="flex items-start gap-3">
                  <MapPin className="text-[#c9a227] w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#0f3057] mb-3">العنوان</h4>
                    <p className="text-gray-700 leading-[2]">
                      عمادة شؤون الطلبة<br />
                      جامعة مؤتة<br />
                      الكرك — الأردن
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'career-services':
        return (
          <div className="space-y-8">
            <PageTitle title="خـدمــــات المكتب" sub="مكتب الإرشاد الوظيفي ومتابعة الخريجين" />
            <Prose>
              <p>
                الخدمات التي يقدمها مكتب الإرشاد الوظيفي ومتابعة الخريجين / صندوق الملك عبدالله الثاني
                للتنمية:
              </p>
            </Prose>
            <NumList items={[
              'خدمات الإرشاد الوظيفي.',
              'خدمات التدريب.',
              'خدمات النشاطات والشراكات (التشبيك).',
              'خدمات متابعة الخريجين.',
            ]} />
            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-3">خدمات التدريب</h3>
              <Prose>
                <p>
                  يعرف التدريب على أنه الجهد المنظم الذي يهدف إلى تزويد الطلبة بمهارات ومعارف وقدرات
                  واتجاهات، ومحاولة إحداث تغيير إيجابي في مهاراتهم وقدراتهم من ناحية وفي سلوكهم
                  واتجاهاتهم من ناحية أخرى. ويهدف التدريب إلى تطوير مهارات وقدرات الطلبة وتمكينهم خلال
                  مراحل الدراسة، بحيث تتلاءم مع متطلبات سوق العمل المحلي والخارجي وتساعدهم في إيجاد فرص
                  عمل، من خلال توفير دورات وورش عمل تدريبية متخصصة وفرص تطوع ومحاضرات توعية.
                </p>
              </Prose>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-4">1- مهارات التوظيف والعمل</h3>
              <NumList items={[
                'مهارات البحث عن فرص العمل.',
                'مهارات إعداد السيرة الذاتية.',
                'كتابة رسالة التغطية.',
                'مهارات إجراء مقابلات العمل عند التقدم للوظائف.',
                'أخلاقيات العمل.',
                'قانون العمل والعمال.',
                'قانون الضمان الاجتماعي.',
                'توفير تدريب للطلبة حسب تخصصاتهم لغاية التمكين والتوظيف.',
              ]} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-4">2- تدريب مهارات الريادة والعمل الذاتي</h3>
              <NumList items={['تأسيس المشاريع.','ريادة الأعمال.','خطط الأعمال.','تدبير التمويل.','المهارات الإدارية والمالية.']} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-4">3- تدريب مهارات الاتصال والتواصل</h3>
              <NumList items={['مهارات الاتصال.','لغة الجسد.','مهارات خدمة العملاء.','البرمجة اللغوية والعصبية.']} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-4">4- التدريب على اللغات</h3>
              <NumList items={['اللغة الإنجليزية.','مهارات الكتابة الفنية في اللغة الإنجليزية.']} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-4">5- التدريب على تطبيقات الحاسوب</h3>
              <NumList items={[
                'التحليل المالي باستخدام Excel.',
                'العرض PowerPoint.',
                'استخدام Microsoft Office.',
                'الرسم الفني AutoCAD.',
                'أي برامج ودورات تفيد الطلبة في مجال دراستهم وتفيدهم في سوق العمل.',
              ]} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-4">6- البرامج التوعوية والمجتمعية والتطوع</h3>
              <NumList items={[
                'الديمقراطية.','حقوق الإنسان.','العمل التطوعي.','المخدرات.','التطرف.','حقوق المرأة.',
                'حقوق الطفل.','حقوق الأشخاص ذوي الإعاقة.','خدمة المجتمع.','التطوع بكافة أشكاله.',
              ]} />
            </div>
          </div>
        );

      case 'career-training':
        return (
          <div className="space-y-8">
            <PageTitle title="خـــدمــات الـتدريــــــب" sub="شعبة التدريب (منسق إداري)" />
            <Prose>
              <p>
                يعرف التدريب على أنه الجهد المنظم الذي يهدف إلى تزويد الطلبة بمهارات ومعارف وقدرات
                واتجاهات، ومحاولة إحداث تغيير إيجابي في مهاراتهم وقدراتهم من ناحية وفي سلوكهم واتجاهاتهم
                من ناحية أخرى. ويهدف التدريب إلى تطوير مهارات وقدرات الطلبة وتمكينهم خلال مراحل الدراسة،
                بحيث تتلاءم مع متطلبات سوق العمل المحلي والخارجي وتساعدهم في إيجاد فرص عمل، من خلال
                توفير دورات وورش عمل تدريبية متخصصة وفرص تطوع ومحاضرات توعية.
              </p>
              <p>ويشتمل التدريب المطلوب حالياً لطلبة الجامعة على ما يلي:</p>
            </Prose>
            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-4">1- مهارات التوظيف والعمل</h3>
              <NumList items={[
                'مهارات البحث عن فرص العمل.','مهارات إعداد السيرة الذاتية.','كتابة رسالة التغطية.',
                'مهارات إجراء مقابلات العمل عند التقدم للوظائف.','أخلاقيات العمل.','قانون العمل والعمال.',
                'قانون الضمان الاجتماعي.','توفير تدريب للطلبة حسب تخصصاتهم لغاية التمكين والتوظيف.',
              ]} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-4">2- تدريب مهارات الريادة والعمل الذاتي</h3>
              <NumList items={['تأسيس المشاريع.','ريادة الأعمال.','خطط الأعمال.','تدبير التمويل.','المهارات الإدارية والمالية.']} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-4">3- تدريب مهارات الاتصال والتواصل</h3>
              <NumList items={['مهارات الاتصال.','لغة الجسد.','مهارات خدمة العملاء.','البرمجة اللغوية والعصبية.']} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-4">4- التدريب على اللغات</h3>
              <NumList items={['اللغة الإنجليزية.','مهارات الكتابة الفنية في اللغة الإنجليزية.']} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-4">5- التدريب على تطبيقات الحاسوب</h3>
              <NumList items={[
                'التحليل المالي باستخدام Excel.','العرض PowerPoint.','استخدام Microsoft Office.',
                'الرسم الفني AutoCAD.','أي برامج ودورات تفيد الطلبة في مجال دراستهم وتفيدهم في سوق العمل.',
              ]} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-4">6- البرامج التوعوية والمجتمعية والتطوع</h3>
              <NumList items={[
                'الديمقراطية.','حقوق الإنسان.','العمل التطوعي.','المخدرات.','التطرف.','حقوق المرأة.',
                'حقوق الطفل.','حقوق الأشخاص ذوي الإعاقة.','خدمة المجتمع.','التطوع بكافة أشكاله.',
              ]} />
            </div>
          </div>
        );

      case 'intl-care':
      case 'intl-care2':
        return (
          <div className="space-y-8">
            <PageTitle title="شعبة رعاية الطلبة الوافدين" sub="مكتب الطلبة الدوليين" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="شعبة رعاية الطلبة الوافدين" className="w-full max-h-[420px] object-cover" />
            </div>
            <h3 className="text-xl font-bold text-[#0f3057]">وتقوم بالمهام الآتية</h3>
            <NumList items={[
              'التواصل مع الملحقيات الثقافية وسفارات الدول العربية والإسلامية والصديقة التي لها طلبة في الجامعة.',
              'مساعدة الطلبة الوافدين في إيجاد حلول لمشاكلهم حسب الطرق الرسمية.',
              'تنظيم لقاء وحوار موسعين بحضور رئيس الجامعة ونوابه والعمداء والملحقين الثقافيين لمرة أو أكثر خلال العام، للتباحث في القضايا التي تهم الطلبة الوافدين.',
              'المساهمة في إنجاح الأيام الثقافية التي تنظمها الملحقيات الثقافية في الأردن داخل الحرم الجامعي.',
              'إقامة معرض تراثي دولي تشارك فيه بلدان الطلبة الوافدين الدارسين في الجامعة.',
              'تنظيم رحلات ثقافية لإطلاع الطلبة على المعالم السياحية والدينية والأثرية والمعالم الحضارية في الأردن.',
              'إقامة بطولات رياضية للجاليات بالتنسيق مع دائرة النشاط الرياضي.',
              'عمل حفل تخريج خاص بالطلبة الوافدين كل عام دراسي.',
            ]} />
          </div>
        );

      case 'intl-welcome':
      case 'intl-brief':
        return (
          <div className="space-y-8">
            <PageTitle title="كلمة مكتب الطلبة الوافدين" sub="مكتب الطلبة الدوليين" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg" alt="كلمة مكتب الطلبة الوافدين" className="w-full max-h-[420px] object-cover" />
            </div>
            <Prose>
              <p>
                تفخر عمادة شؤون الطلبة من خلال مكتب الطلبة الوافدين فيها بأن تحتضن في بيتها الدافئ عدداً
                كبيراً من الطلبة العرب والأجانب لأكثر من خمس وعشرين جنسية عربية وأجنبية، وعمادة شؤون
                الطلبة في الجامعة هي من أهم المرافق الجامعية التي تعنى بتقديم الخدمات الطلابية والإشراف
                على إقامة الاحتفالات الوطنية والتراثية لبلدانهم، ومتابعة أعيادهم ومناسباتهم الوطنية
                والخاصة، ومتابعة تحصيلهم العلمي، وحثّهم على ممارسة أنشطتهم اللامنهجية المتنوعة بيسر
                وسهولة والتعامل معهم بوضوح ومحبة ومودة.
              </p>
              <p>
                إن مكتب الطلبة الوافدين في عمادة شؤون الطلبة يعمل على إدماج الطلبة الوافدين ضمن نسيج
                طلبة الجامعة والمجتمع المحلي في إطار العادات والتقاليد والأعراف الأردنية وقوانين الجامعة
                وأنظمتها النافذة، من منطلق إدراك المكتب لاهتمامات الطلبة الوافدين واحتياجاتهم المتنوعة
                التي تختلف أحياناً عن حاجات نظرائهم من الطلبة الأردنيين.
              </p>
              <p>
                وبهذه المناسبة فإننا ندعو الطلبة العرب والأجانب أن يمدوا جسور الاتصال مباشرة مع مكتب
                الطلبة الوافدين لإبداء أية ملحوظة يرونها مناسبة لتحقيق رغباتهم وتطلعاتهم، كما نحثُّ
                أبناءنا على أهمية المشاركة في الأنشطة الجامعية والتفاعل والتواصل الاجتماعي البنّاء،
                والتميز الأكاديمي الذي توليه الجامعة جُلّ اهتمامها بمتابعتهم داخلياً ومع سفارات دولهم
                التي يتبعون لها.
              </p>
              <p>
                نرحب بإخواننا وأبنائنا من الطلبة الوافدين في جامعة مؤتة ليكونوا خير سفراء لها وللأردن في
                مجتمعاتهم مستقبلاً.
              </p>
              <p className="font-bold text-[#0f3057]">
                والله ولي التوفيق، والسلام عليكم ورحمة الله وبركاته
              </p>
            </Prose>
          </div>
        );

      case 'yearbook':
        return (
          <div className="space-y-8">
            <PageTitle title="الكتاب السنوي" sub="عمادة شؤون الطلبة — جامعة مؤتة الراية" />
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-right border-collapse min-w-[560px]">
                <thead>
                  <tr className="bg-[#0f3057]">
                    {['ت','العام','الفوج','صورة الغلاف'].map((c) => (
                      <th key={c} className="px-5 py-3.5 text-[13.5px] font-bold text-white whitespace-nowrap">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { n: '1', y: '2023', g: 'الفوج الرابع والثلاثين', img: 'https://www.mutah.edu.jo/ar/studentaffairs/SiteAssets/Pages/Forms/EditForm/2023.jpg' },
                    { n: '2', y: '2024', g: 'الفوج الخامس والثلاثين', img: '' },
                    { n: '3', y: '2025', g: 'الفوج السادس والثلاثين', img: 'https://www.mutah.edu.jo/ar/studentaffairs/SiteAssets/Pages/Forms/EditForm/by2025.jpg' },
                  ].map((r, i) => (
                    <tr key={i} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-5 py-4 text-[14.5px] text-[#0f3057] border-t border-gray-100" dir="ltr">{r.n}</td>
                      <td className="px-5 py-4 text-[14.5px] text-[#0f3057] border-t border-gray-100" dir="ltr">{r.y}</td>
                      <td className="px-5 py-4 text-[14.5px] font-semibold text-[#0f3057] border-t border-gray-100 leading-relaxed">{r.g}</td>
                      <td className="px-5 py-4 border-t border-gray-100">
                        {r.img
                          ? <img src={r.img} alt={r.g} loading="lazy" className="w-[110px] h-[150px] object-cover rounded-lg border border-gray-100 bg-gray-100" />
                          : <span className="text-gray-400 text-[13px]">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-8">
            <PageTitle title="معرض الصور" sub="عمادة شؤون الطلبة" />
          </div>
        );

      case 'career-partnerships':
        return (
          <div className="space-y-8">
            <PageTitle title="خـــدمــات الـنشــاطـات والـشـراكـــات ( التـشـبيك )" sub="منسق نشاطات وشراكات" />
            <Prose>
              <p>
                تهدف النشاطات والشراكات (التشبيك) إلى فتح قنوات اتصال وبناء علاقات إستراتيجية ودائمة مع
                الشركاء ذوي العلاقة، من مؤسسات القطاع العام والخاص والمؤسسات المانحة ومؤسسات المجتمع
                المدني والنقابات المهنية وجمعيات الأعمال والخريجين وشركات التوظيف، والمحافظة على هذه
                العلاقات وتمتينها وتطويرها لتحقيق الأهداف الإستراتيجية للمكتب والجامعة.
              </p>
              <p>وتشتمل النشاطات والشراكات (التشبيك) على تقديم الخدمات التالية:</p>
            </Prose>
            <div>
              <h4 className="text-[16px] font-bold text-[#0f3057] mb-3">1- التدريب أثناء العمل بهدف التوظيف</h4>
              <Prose>
                <p>
                  يساعد التدريب أثناء العمل بهدف التوظيف على إيجاد فرص عمل للخريجين من خلال التعاون مع
                  المؤسسات الحكومية ومنظمات المجتمع المدني والجهات الممولة والمانحة لمثل هذه المشاريع.
                </p>
              </Prose>
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-[#0f3057] mb-3">2- فرص التطوع</h4>
              <Prose><p>تساعد فرص التطوع مع المؤسسات ومنظمات المجتمع المدني الطلبة على تطوير مهارات الطالب الحياتية.</p></Prose>
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-[#0f3057] mb-3">3- العمل الجزئي</h4>
              <Prose><p>تساعد فرص العمل الجزئي على تطوير مهارات الطالب الحياتية وحصول الطالب على دخل مادي لتغطية تكاليف الحياة.</p></Prose>
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-[#0f3057] mb-3">4- معرض التوظيف / اليوم الوظيفي</h4>
              <Prose>
                <p>
                  يهدف اليوم الوظيفي إلى إتاحة الفرصة للطلبة والباحثين عن عمل للتواصل مع أصحاب العمل
                  ومعرفة فرص العمل المتاحة لديهم، حيث يشارك في هذه المعارض عدد من الشركات المحلية
                  والأجنبية في القطاعات الاقتصادية المختلفة وشركات التوظيف والموارد البشرية.
                </p>
              </Prose>
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-[#0f3057] mb-3">5- طلبات التوظيف</h4>
              <Prose>
                <p>
                  الاتصال والتنسيق مع مؤسسات القطاع العام والخاص في الحصول على فرص التوظيف المتاحة في
                  السوق والإعلان عنها داخل الجامعة، وذلك لمساعدة الطلبة في الحصول على الوظائف.
                </p>
              </Prose>
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-[#0f3057] mb-3">6- مواقع وشركات التوظيف</h4>
              <Prose>
                <p>
                  وهي المواقع الإلكترونية وشركات التوظيف التي تعمل على إيجاد وتسهيل فرص العمل في السوق
                  المحلي والخارجي، حيث يهدف التشبيك مع هذه المواقع والشركات إلى تعريف الطلبة بهذه الجهات
                  ومتطلباتها وبالتالي مساعدة الطلبة في عملية التوظيف.
                </p>
              </Prose>
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-[#0f3057] mb-4">7- توفير التمويل</h4>
              <Prose><p>يهدف التشبيك مع المؤسسات المانحة إلى ما يلي:</p></Prose>
              <div className="mt-4">
                <NumList items={[
                  'تمويل مشاريع دورات تدريبية للطلبة.',
                  'تمويل مشاريع الإرشاد الوظيفي الفردي والجمعي.',
                  'تمويل مشاريع التطوير الداخلي بمكتب الإرشاد الوظيفي ومتابعة الخريجين (قاعات تدريب، تنظيم، أدلة).',
                  'تمويل مشاريع قواعد البيانات الخاصة بالخريجين.',
                  'تمويل مصاريف اليوم الوظيفي ومعارض التوظيف.',
                  'تمويل الدراسات الخاصة بتحديد الاحتياجات والدراسات.',
                  'تمويل مؤتمرات الخريجين.',
                  'تمويل المبادرات الطلابية ومشاريع التطوع.',
                ]} />
              </div>
            </div>
          </div>
        );

      case 'career-contact':
        return (
          <div className="space-y-8">
            <PageTitle title="إتصل بنا" sub="مكتب الإرشاد الوظيفي ومتابعة الخريجين" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8 space-y-5">
                <div className="flex items-start gap-3">
                  <Users className="text-[#c9a227] w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-[#0f3057] mb-0.5">مدير المكتب</p>
                    <p className="text-gray-600">وليد علي ذياب المجالي</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-[#c9a227] w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-[#0f3057] mb-0.5">الهاتف</p>
                    <p className="text-gray-600" dir="ltr">+(962) 3 2372380 — فرعي 3399</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="text-[#c9a227] w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <p className="font-bold text-[#0f3057] mb-0.5">البريد الإلكتروني</p>
                    <p className="text-gray-600" dir="ltr">waleedmajali22@mutah.edu.jo</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <div className="flex items-start gap-3">
                  <MapPin className="text-[#c9a227] w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#0f3057] mb-3">العنوان</h4>
                    <p className="text-gray-700 leading-[2]">
                      مكتب الإرشاد الوظيفي ومتابعة الخريجين<br />
                      عمادة شؤون الطلبة — جامعة مؤتة<br />
                      الكرك — الأردن
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'career-alumni':
        return (
          <div className="space-y-8">
            <PageTitle title="خـــدمــات مـتابـعـــــة الـخـريــــجـين" sub="شعبة الخريجين (منسق إداري)" />
            <Prose>
              <p>
                هي عملية التواصل المستمر ما بين الجامعة وخريجيها، وإبقاء الخريجين على اتصال دائم مع
                الجامعة وكلياتها لمتابعة الوضع الوظيفي لهم ومدى مواءمة مخرجات الجامعة مع حاجة السوق
                وزيادة ولائهم وانتمائهم للجامعة. ومن خلال متابعة الخريجين يمكن تحقيق الأهداف الفرعية
                التالية:
              </p>
            </Prose>
            <NumList items={[
              'بناء قاعدة بيانات الخريجين.',
              'متابعة شؤون الخريجين في مواقع عملهم ومع جهات التوظيف.',
              'إعداد الدراسات المختلفة عن الخريجين وسوق العمل.',
              'تنظيم لقاءات الخريجين (مؤتمر الخريجين، منتديات الخريجين).',
              'الحصول على قصص نجاح الخريجين.',
            ]} />
            <h3 className="text-xl font-bold text-[#0f3057]">تشتمل متابعة الخريجين على تقديم الخدمات التالية</h3>
            <div>
              <h4 className="text-[16px] font-bold text-[#0f3057] mb-3">1- قاعدة بيانات الخريجين</h4>
              <Prose>
                <p>
                  وهي قاعدة بيانات تشتمل على معلومات متعلقة بالاسم، الجنس، الجنسية، تاريخ الميلاد،
                  المؤهل العلمي، سنة التخرج، الكلية، القسم، الوظيفة الحالية، البلد الذي تعمل به، التلفون،
                  الإيميل.
                </p>
              </Prose>
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-[#0f3057] mb-3">2- مؤتمرات الخريجين</h4>
              <Prose><p>وهي مؤتمرات سنوية تُعقد ويتم دعوة الخريجين إليها لزيادة ارتباط الخريجين.</p></Prose>
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-[#0f3057] mb-3">3- النوادي الافتراضية</h4>
              <Prose><p>وهي منتديات تقوم الجامعات بتطويرها بهدف زيادة التواصل مع الخريجين باستخدام شبكات التواصل الاجتماعي.</p></Prose>
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-[#0f3057] mb-3">4- متابعة الوضع الوظيفي للخريجين</h4>
              <Prose>
                <p>
                  من خلال الاستبيانات المتخصصة (تعتبر هذه الدراسة من أهم الدراسات لأنه يتم من خلالها
                  قياس قدرة الخريجين على التوظيف في السوق المحلي والخارجي وإقامة المشاريع الذاتية).
                </p>
              </Prose>
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-[#0f3057] mb-4">5- البيانات والدراسات</h4>
              <NumList items={[
                'بيانات التعليم العالي في وزارة التعليم العالي.',
                'بيانات قوة العمل، وتتألف من معلومات إحصائية عن المشتغلين والمتعطلين الأردنيين في سوق العمل كما تصدرها مسوحات دائرة الإحصاءات العامة.',
                'بيانات عن المشتغلين الخاضعين لنظام الخدمة المدنية والضمان الاجتماعي.',
                'التخصصات الراكدة والمشبعة في ديوان الخدمة المدنية.',
                'دراسات عن احتياجات سوق العمل من التخصصات.',
                'دراسات عن الخريجين وسوق العمل.',
                'دراسات عن متطلبات سوق التوظيف من الوظائف والمهارات.',
                'دراسات عن مواءمة الخريجين لسوق العمل.',
              ]} />
            </div>
          </div>
        );

      case 'career-specialist':
        return (
          <div className="space-y-8">
            <PageTitle title="خـــدمــات الإرشـــاد الـوظـيـفـــــي" sub="أخصائي إرشاد وظيفي" />
            <Prose>
              <p>
                يهدف الإرشاد الوظيفي بكافة أشكاله إلى توجيه وإرشاد الطلاب خلال مراحل الدراسة المختلفة،
                لاختيار التخصص المناسب والمهنة المناسبة للطالب بناءً على قدراته واستعداداته العقلية
                والبدنية وميوله التعليمية والوظيفية.
              </p>
            </Prose>
            <h3 className="text-xl font-bold text-[#0f3057]">أشكال الإرشاد الوظيفي</h3>
            <div>
              <h4 className="text-[16px] font-bold text-[#0f3057] mb-3">1- الإرشاد الوظيفي الفردي</h4>
              <Prose>
                <p>
                  يهدف الإرشاد الوظيفي الفردي إلى إقامة علاقة مهنية بين المرشد والطالب للحصول على معلومات
                  وبيانات حول الفرد وتفسير هذه المعلومات والبيانات بعد ذلك للمساعدة في فهم سلوك وشخصية
                  الطالب، لتساعده في معرفة ذاته ومشكلته إن وجدت وكيفية تجاوزها. كما يشتمل الإرشاد الفردي
                  على تنفيذ الاختبارات السيكولوجية — وهي عدة اختبارات تقيس القدرات الفردية مثل اختبارات
                  الكفاية والاستعدادات والشخصية والميول — لتساعد الطالب على اختيار مساره الوظيفي.
                </p>
              </Prose>
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-[#0f3057] mb-3">2- الإرشاد الوظيفي الجمعي</h4>
              <Prose>
                <p>
                  يهدف إلى إرشاد الطلاب باحتياجات سوق العمل وسلوكيات العمل الإيجابي والمهارات التي يطلبها
                  أصحاب العمل والتحديات التي تواجه الطلبة في سوق العمل، كما يشمل الإرشاد الوظيفي الجمعي
                  معالجة مشكلة أو تحدٍّ يواجه مجموعة من الطلبة، حيث يتم إرشادهم بطريقة جمعية لتحويل سلوكهم
                  إلى الناحية الإيجابية.
                </p>
              </Prose>
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-[#0f3057] mb-3">3- الإرشاد الوظيفي الفردي الإلكتروني</h4>
              <Prose>
                <p>
                  يهدف الإرشاد الوظيفي الفردي الإلكتروني إلى تقديم خدمات الإرشاد إلى الطالب إلكترونياً
                  للمساعدة في فهم سلوك وشخصية الطالب، وتساعده في معرفة ذاته ومشكلته إن وجدت وكيفية
                  تجاوزها، كما يشتمل على تنفيذ الاختبارات السيكولوجية التي تقيس القدرات الفردية مثل
                  اختبارات الكفاية والاستعدادات والشخصية والميول، لتساعد الطالب على اختيار مساره الوظيفي.
                </p>
              </Prose>
            </div>
            <div>
              <h4 className="text-[16px] font-bold text-[#0f3057] mb-3">4- التوجيه الجمعي</h4>
              <Prose>
                <p>يهدف إلى توجيه وتوعية الطلبة في موضوعات متخصصة في مجال التوظيف والعمل.</p>
              </Prose>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, DSA_LINKS)} />
            <Waiting />
          </div>
        );
    }
  };

  return (
    <DeanshipShell
      brand="عمادة شؤون الطلبة"
      tagline="بيت الطلبة الدافئ: خدمات وأنشطة ومنبر حر يرتقي بمواهب الطلبة ويهيئ لهم بيئة جامعية متميزة."
      heroImage="https://www.mutah.edu.jo/ar/studentaffairs/PublishingImages/636153378410340710.jpg"
      links={DSA_LINKS} activeItem={activeItem} setActiveItem={setActiveItem}>
      {render()}
    </DeanshipShell>
  );
}
