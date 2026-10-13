import DAA_NEWS from './DaaNewsData';
import { Link } from "react-router";
import { useTabRoute } from "../../nav";
import React, { useState } from 'react';
import {
  DeanshipShell, PageTitle, Prose, DocRow, LinkRow, NumList, Waiting,
  getSectionTitle, type NavLink
} from './DeanshipShell';
import { Phone, Mail, MapPin, Eye, Target, Users, CheckCircle } from 'lucide-react';

const DAA_LINKS: NavLink[] = [
  { id: 'home', name: 'الرئيسية' },
  {
    id: 'about', name: 'عن العمادة',
    children: [
      { id: 'about-dean', name: 'كلمة العميد' },
      { id: 'about-plan', name: 'الخطة الاستراتيجية' },
      { id: 'about-vision', name: 'الرؤيا، الرسالة والأهداف' },
      { id: 'about-structure', name: 'الهيكل التنظيمي' },
      { id: 'about-sign', name: 'شعار العمادة' },
      { id: 'about-committees', name: 'اللجان' }
    ]
  },
  {
    id: 'departments', name: 'الاقسام',
    children: [
      { id: 'dep-scientific', name: 'قسم التخصصات العلمية', url: 'https://www.mutah.edu.jo/ar/ScientificDept' },
      { id: 'dep-humanities', name: 'قسم التخصصات الإنسانية', url: 'https://www.mutah.edu.jo/ar/HumanitiesDept' }
    ]
  },
  {
    id: 'honor', name: 'لوحة شرف العمادة',
    children: [
      { id: 'honor-deans', name: 'لوحة شرف عمداء الشؤون الأكاديمية' },
      { id: 'honor-coordination', name: 'لوحة شرف رؤساء دائرة التنسيق الأكاديمي' }
    ]
  },
  {
    id: 'instructions', name: 'التعليمات',
    children: [
      { id: 'ins-deanship', name: 'تعليمات العمادة' },
      { id: 'ins-bachelor', name: 'تعليمات درجة البكالوريوس' },
      { id: 'ins-internal', name: 'النظام الداخلي' }
    ]
  },
  { id: 'activities', name: 'نشاطات وانجازات العمادة' },
  { id: 'students-activities', name: 'نشاطات التلاميذ' },
  { id: 'graduates', name: 'كلمات اوائل الخريجين' }
];

export function AcademicAffairs() {
  const [activeItem, setActiveItem] = useTabRoute('home');

  const render = () => {
    switch (activeItem) {
      case 'home':
        return (
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { img: 'https://www.mutah.edu.jo/ar/daa/PublishingImages/100.jpg', t: 'مئة عام على تأسيس الدولة الأردنية الهاشمية' },
                { img: 'https://www.mutah.edu.jo/ar/daa/PublishingImages/mil06.JPG', t: 'عمادة الشؤون الأكاديمية / الجناح العسكري' },
                { img: 'https://www.mutah.edu.jo/ar/daa/PublishingImages/news_3261_9281_1464591063.jpg', t: 'أهلاً وسهلاً بكم في عمادة الشؤون الأكاديمية' },
              ].map((s, i) => (
                <figure key={i} className="m-0 rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm">
                  <img src={s.img} alt={s.t} loading="lazy" className="w-full h-[190px] object-cover bg-gray-100" />
                  <figcaption className="p-4 text-[14px] font-bold text-[#0f3057] leading-relaxed">{s.t}</figcaption>
                </figure>
              ))}
            </div>

            <Prose>
              <p className="font-bold text-[#0f3057] text-lg">عمادة الشؤون الأكاديمية / الجناح العسكري</p>
              <p>
                عمادة الشؤون الأكاديمية في الجناح العسكري بجامعة مؤتة، تتبع لها أقسام التخصصات العلمية
                والتخصصات الإنسانية، وتشرف على الشؤون الأكاديمية للتلاميذ العسكريين في كلية العلوم
                العسكرية وكلية العلوم الشرطية.
              </p>
            </Prose>

            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">أخبار وأحداث</h3>
              <div className="flex flex-col gap-3">
                {DAA_NEWS.map((n, i) => (
                  <Link key={i} to={'/daa-news/' + i} className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-4 hover:border-[#c9a227] transition-colors">
                    <span className="w-1.5 h-10 rounded-full bg-[#c9a227] shrink-0" />
                    <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-snug">{n.title}</p>
                    <span className="text-xs font-bold text-gray-400 shrink-0" dir="ltr">{n.date}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">معلومات تهمك</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <LinkRow name="البريد الإلكتروني" url="https://login.microsoftonline.com/" />
                <LinkRow name="البوابات الإلكترونية" url="http://www.mutah.edu.jo/Lists/Services/StudentServices.aspx" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">روابط سريعة</h3>
              <div className="flex flex-col gap-3">
                <DocRow name="وصف المواد — كلية العلوم الشرطية" url="https://www.mutah.edu.jo/ar/daa/Documents/%D9%88%D8%B5%D9%81%20%D9%85%D9%88%D8%A7%D8%AF%20%D8%A7%D9%84%D8%B4%D8%B1%D8%B7%D8%A9.pdf" />
                <DocRow name="وصف مواد كلية العلوم العسكرية" url="https://www.mutah.edu.jo/ar/daa/Documents/%D9%88%D8%B5%D9%81%20%D9%85%D9%88%D8%A7%D8%AF%20%D8%A7%D9%84%D8%B9%D8%B3%D9%83%D8%B1%D9%8A.pdf" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">معلومات عامة</h3>
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex gap-4">
                <img src="https://www.mutah.edu.jo/ar/daa/PublishingImages/l-main.png" alt="" loading="lazy" className="w-14 h-14 rounded-xl object-contain bg-gray-50 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[15px] font-bold text-[#0f3057] leading-relaxed">
                    القيادة العامة للقوات المسلحة الأردنية — الجيش العربي
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-5">إعلانات</h3>
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex gap-4">
                <img src="https://www.mutah.edu.jo/ar/daa/PublishingImages/l-main.png" alt="" loading="lazy" className="w-16 h-16 rounded-xl object-contain bg-gray-50 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[15px] font-bold text-[#0f3057] leading-relaxed mb-1">
                    القيادة العامة للقوات المسلحة الأردنية — الجيش العربي
                  </p>
                  <span className="text-xs font-bold text-[#c9a227]" dir="ltr">12/21/2021</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'activities': {
        const ARTICLES = [
          { t: 'كلية العلوم الشرطية وعمادة الشؤون الأكاديمية تنظمان لقاءً أكاديمياً في جامعة مؤتة', d: '30/10/2025', img: 'https://www.mutah.edu.jo/ar/daa/PublishingImages/356680e3-2f3e-45af-8f72-2d387d262313.jpg' },
          { t: 'جولة نائب الرئيس للقاعات الدراسية يرافقه آمار الكليات وعميد الشؤون الاكاديميه بالاضافه لثلة من الضباط والأكاديميين', d: '23/4/2024', img: 'https://www.mutah.edu.jo/ar/daa/PublishingImages/35.jpg' },
          { t: 'عمادة الشؤون الأكاديمية الجناح العسكري جامعة مؤته 2024', d: '22/4/2024', img: 'https://www.mutah.edu.jo/ar/daa/PublishingImages/%d8%b4%d8%b9%d8%a7%d8%b1%20%d8%a7%d9%84%d8%b9%d9%85%d8%a7%d8%af%d8%a9.jpg' },
          { t: 'مواكبة العملية التعليمية الالكتروانية في ظل جائحة كورونا', d: '3/2/2021', img: 'https://www.mutah.edu.jo/ar/daa/PublishingImages/l-main.png' }
        ];
        return (
          <div className="space-y-8">
            <PageTitle title="نشاطات وانجازات العمادة" sub="المقالات" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {ARTICLES.map((a, i) => (
                <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-[#c9a227]/40 transition-all">
                  <div className="h-48 bg-gray-50 overflow-hidden">
                    <img src={a.img} alt={a.t} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold text-[#c9a227] mb-2 block" dir="ltr">{a.d}</span>
                    <h3 className="font-bold text-[#0f3057] text-[15px] leading-relaxed">{a.t}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'students-activities':
        return (
          <div className="space-y-8">
            <PageTitle title="نشاطات التلاميذ" />
            <DocRow
              name="صور التدريب الميداني (العملي) لتلاميذ تخصص إدارة الأزمات في المركز الوطني لإدارة الأزمات"
              url="https://www.mutah.edu.jo/ar/daa/SiteAssets/Pages/Forms/EditForm/%d8%b5%d9%88%d8%b1%20%d8%a7%d9%84%d8%aa%d8%af%d8%b1%d9%8a%d8%a8%20%d8%a7%d9%84%d9%85%d9%8a%d8%af%d8%a7%d9%86%d9%8a%20%28%20%d8%a7%d9%84%d8%b9%d9%85%d9%84%d9%8a%20%29%20%d9%84%d8%aa%d9%84%d8%a7%d9%85%d9%8a%d8%b0%20%d8%aa%d8%ae%d8%b5%d8%b5%20%d8%a5%d8%af%d8%a7%d8%b1%d8%a9%20%d8%a7%d9%84%d8%a3%d8%b2%d9%85%d8%a7%d8%aa%20%d9%81%d9%8a%20%d8%a7%d9%84%d9%85%d8%b1%d9%83%d8%b2%20%d8%a7%d9%84%d9%88%d8%b7%d9%86%d9%8a%20%d9%84%d8%a5%d8%af%d8%a7%d8%b1%d8%a9%20%d8%a7%d9%84%d8%a3%d8%b2%d9%85%d8%a7%d8%aa.pdf"
            />
          </div>
        );

      case 'graduates':
        return (
          <div className="space-y-8">
            <PageTitle title="مناسبات وطنية" />
          </div>
        );

      case 'about-structure':
        return (
          <div className="space-y-8">
            <PageTitle title="الهيكل التنظيمي" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white p-4">
              <img src="https://www.mutah.edu.jo/ar/daa/SiteAssets/Pages/Forms/EditForm/Or-St.png" alt="الهيكل التنظيمي لعمادة الشؤون الأكاديمية" className="w-full max-h-[560px] object-contain" />
            </div>
          </div>
        );

      case 'about-plan':
        return (
          <div className="space-y-8">
            <PageTitle title="الأهداف الاستراتيجية" sub="اهداف عمادة الشؤون الاكاديمية" />
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <NumList items={[
                'تجذير الثقافة المؤسسية المستنبطة من رؤية ورسالة القوات المسلحة الأردنية وجامعة مؤتة.',
                'التركيز على تعميق العقيدة الإسلامية وقيمها الروحية والأخلاقية والاعتزاز الوطني الأردني والانتماء العربي وتنمية مواهب التلاميذ وتوكيد صفات القيادة والمواطنة المنتجة لديهم، والربط الوثيق بين شحذ العقل والتحلي بالخلق الكريم في جميع النشاطات.',
                'إبراز دور الجناح العسكري محلياً وإقليمياً ودولياً وتهيئة البيئة الجامعية التي تُلبي تطلعات الطلبة العرب والأجانب.',
                'إتاحة فرص التعليم العالي وتجويد محتواه ورفع مستواه للتلميذ العسكري.',
                'تزويد الأجهزة العسكرية بالضباط والقادة المؤهلين لمواجهة التحديات المعاصرة والمستقبلية بالمختصين في ميادين العلوم والتكنولوجيا والآداب والفنون في الميادين العسكرية والمدنية سواء بسواء.',
                'تعزيز فتح باب الجامعة / الجناح العسكري للطلبة المؤهلين للقبول فيها من أبناء الدول العربية الشقيقة.',
                'توثيق الصلات مع الجامعات الأردنية والعربية والعالمية والاستفادة من خبراتها ونقل خبرة الجامعة / الجناح العسكري إليها.',
                'تشجيع البحث العلمي العسكري ووضع نتائجه موضع التطبيق في خدمة التنمية الأردنية الشاملة ونجاعة الأداء والإنجاز في الميادين العسكرية والمدنية.',
                'تحقيق أعلى قدر من معايير الاعتماد العالمية في جميع البرامج والحقول الأكاديمية والعسكرية.',
                'تطبيق إدارة الجودة الشاملة في كافة الخدمات التي يقدمها الجناح العسكري.',
                'استيعاب التكنولوجيا الحديثة ونقلها واستخدامها في الفعاليات الأردنية المدنية والعسكرية.',
                'ربط الخطط والبرامج الدراسية كمّاً ونوعاً بمتطلبات جامعة مؤتة وفقاً لحاجات القوات المسلحة الأردنية ومديرية الأمن العام.',
                'نشر المعرفة ولا سيما ما يتصل منها بالحضارة العربية الإسلامية والإسهام في رقي الحضارة الإنسانية.',
                'العمل على استقلالية توفير كفاءات تدريسية بالتعاون مع الجامعة والقيادة العامة للقوات المسلحة الأردنية ومديرية الأمن العام.',
                'زيادة الاهتمام في تنفيذ البرامج والبحوث العلمية والعسكرية الأساسية والتطبيقية التي تتواكب والمستجدات العلمية والتكنولوجية وتساهم في التطوير وتشجيع الإبداع والابتكار والتميز.',
                'المساهمة في زيادة الإيرادات على مستوى القوات المسلحة والجامعة وضبط الإنفاق وترشيد الاستهلاك.',
                'تعزيز النشاطات التي ترقى بمستوى تفكير التلاميذ أخلاقياً وسلوكياً.',
                'تطوير سياسة القبول ومعاييره بما يتلاءم مع تحقيق العدالة وتكافؤ الفرص التنافسية والاستجابة لمعايير وحاجة القوات المسلحة الأردنية والأمن العام.',
                'الاستمرار في تطوير الخطط والبرامج الدراسية وتحديثها.',
                'الارتقاء بمستوى التأهيل والكفاءة والخبرة للقوى البشرية العاملة في مجالات التدريس والتدريب والإدارة.',
                'تتبنى العمادة أحدث الوسائل وأنجح الأساليب في التعليم والتعلم واختيار المساقات وموضوعات البحث بتطبيق قواعد التنظيم العسكري والانضباط على جميع التلاميذ.',
                'إتاحة فرص التربية المستديمة والمستمرة في جميع الدراسات الأكاديمية والعسكرية لجميع التلاميذ من المنتسبين للقوات العسكرية وغيرهم، بقصد رفع مستوى مؤهلاتهم أو تحديث معلوماتهم.',
                'اعتبار التطبيق الميداني العسكري جزءاً لا يتجزأ من الدراسة النظرية وتقديره بعدد الساعات المعتمدة حق قدره.',
                'ضبط عملية استقطاب مدرسي العمل الإضافي من الجناح العسكري والمجتمع المحلي بالتنسيق المباشر مع عمداء الكليات المعنية.',
                'تطوير مناهج البحث العلمي والدراسات وخاصة في المجالات الميدانية والتطبيقية.',
                'تعزيز روح التنافس الإيجابي الشريف بين التلاميذ.',
                'تنمية شخصية التلاميذ وزيادة ثقتهم بأنفسهم وتعويدهم على تحمل المسؤولية من خلال إشراكهم في النشاطات والفعاليات القيادية والتدريبية.',
                'تعزيز برامج الإرشاد الأكاديمي والعسكري والنفسي والاجتماعي لضبط السلوك للتلاميذ بتوجيههم نحو التسامح وحرية التعبير واحترام الرأي الآخر والابتعاد عن التعصب.',
                'التركيز على تنمية القدرات الذهنية للتعلم الذاتي والتفكير الناقد واستخدام الأسلوب العلمي في حل المعاضل.',
                'تعميق مفهوم الضبط والربط العسكري من خلال مراقبة سلوك التلميذ داخل وخارج القاعات الدراسية.',
                'تعزيز وإثارة مفهوم الأداء والعمل بروح الفريق الواحد.'
              ]} />
            </div>
          </div>
        );

      case 'honor-coordination': {
        const HEADS = [
          { rank: 'عميد متقاعد دكتور', name: 'تحسين احمد الطراونه', period: '8/8/1993 - 10/7/1995' },
          { rank: 'عميد متقاعد دكتور', name: 'احمد عودة الغويري', period: '10/7/1995 - 1/10/1997' },
          { rank: 'مقدم دكتور مهندس', name: 'محمود زعل ابو زيد', period: '1/10/1997 - 1/10/1998' },
          { rank: 'مقدم دكتور', name: 'فواز عودة الوريكات', period: '1/10/1998 - 7/3/1999' },
          { rank: 'عميد دكتور', name: 'محمد احمد الحراحشة', period: '7/3/1999 - 12/9/2000' },
          { rank: 'عميد دكتور مهندس', name: 'منذر اديب النمري', period: '12/9/2000 - 7/7/2002' },
          { rank: 'عميد دكتور', name: 'محمد احمد الحراحشة', period: '8/7/2002 - 31/8/2004' },
          { rank: 'رائد دكتور', name: 'احمد خلف السكارنة', period: '1/9/2004 - 16/9/2007' },
          { rank: 'عميد متقاعد دكتور', name: 'شمسي سالم البواعنه', period: '16/9/2007 - 15/6/2008' },
          { rank: 'مقدم متقاعد دكتور', name: 'محمد علي العبادي', period: '16/6/2008 - 1/4/2014' },
          { rank: 'عقيد دكتور مهندس', name: 'خالد سمارة الزعبي', period: '1/4/2014 - 1/9/2015' },
          { rank: 'الأستاذ الدكتور', name: 'فايز عبدالقادر المجالي', period: '1/9/2015 - 27/9/2017' },
          { rank: 'الأستاذ الدكتور', name: 'محمود محمد الرويضي', period: '27/9/2017 - 13/9/2020' }
        ];
        return (
          <div className="space-y-8">
            <PageTitle title="لوحة شرف رؤساء دائرة التنسيق الاكاديمي" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {HEADS.map((h, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:border-[#c9a227]/50 transition-all">
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden bg-[#0f3057]">
                    <img
                      src={i === 12
                        ? 'https://www.mutah.edu.jo/ar/daa/PublishingImages/HonorOfDeanship/fffff.png'
                        : 'https://www.mutah.edu.jo/ar/daa/PublishingImages/HonorOfDeanship/Manager.png'}
                      alt={h.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[11px] font-bold text-[#c9a227] mb-1.5">{h.rank}</p>
                  <h3 className="font-bold text-[#0f3057] text-[15px] mb-3 leading-snug">{h.name}</h3>
                  <span className="inline-block text-[11px] font-bold text-[#0f3057] px-3 py-1 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/20" dir="ltr">{h.period}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'ins-deanship':
        return (
          <div className="space-y-8">
            <PageTitle title="تعليمات عمادة الشؤون الأكاديمية - الجناح العسكري" />
            <DocRow
              name="تعليمات عمادة الشؤون الأكاديمية"
              url="https://www.mutah.edu.jo/ar/daa/SiteAssets/Pages/Forms/EditForm/%d8%aa%d8%b9%d9%84%d9%8a%d9%85%d8%a7%d8%aa%20%d8%b9%d9%85%d8%a7%d8%af%d8%a9%20%d8%a7%d9%84%d8%b4%d8%a4%d9%88%d9%86%20%d8%a7%d9%84%d8%a3%d9%83%d8%a7%d8%af%d9%8a%d9%85%d9%8a%d8%a9.pdf"
            />
          </div>
        );

      case 'ins-bachelor':
        return (
          <div className="space-y-8">
            <PageTitle title="تعليمات منح درجة البكالوريوس لتلاميذ الجناح العسكري في جامعة مؤتة 2025/2024" />
            <DocRow
              name="تعليمات منح درجة البكالوريوس لتلاميذ الجناح العسكري في جامعة مؤتة"
              url="https://www.mutah.edu.jo/ar/daa/SiteAssets/Pages/Forms/EditForm/%d8%aa%d8%b9%d9%84%d9%8a%d9%85%d8%a7%d8%aa%20%d9%85%d9%86%d8%ad%20%d8%af%d8%b1%d8%ac%d8%a9%20%d8%a7%d9%84%d8%a8%d9%83%d8%a7%d9%84%d9%88%d8%b1%d9%8a%d9%88%d8%b3%20%d9%84%d8%aa%d9%84%d8%a7%d9%85%d9%8a%d8%b0%20%d8%a7%d9%84%d8%ac%d9%86%d8%a7%d8%ad%20%d8%a7%d9%84%d8%b9%d8%b3%d9%83%d8%b1%d9%8a%20%d9%81%d9%8a%20%d8%ac%d8%a7%d9%85%d8%b9%d8%a9%20%d9%85%d8%a4%d8%aa%d8%a9.pdf"
            />
          </div>
        );

      case 'ins-internal':
        return (
          <div className="space-y-8">
            <PageTitle title="النظام الداخلي" />
          </div>
        );

      case 'about-dean':
        return (
          <div className="space-y-8">
            <PageTitle title="كلمة العميد" />
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 shrink-0 bg-gray-50 rounded-3xl p-5 border border-gray-100 text-center">
                <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden bg-[#0f3057]">
                  <img src="https://www.mutah.edu.jo/ar/daa/PublishingImages/Dr.Amer%20Personal.jpeg" alt="عميد الشؤون الأكاديمية" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-lg font-bold text-[#0f3057] leading-snug">الأستاذ الدكتور عامر العقيلي</h3>
                <p className="text-[#c9a227] font-bold text-sm mt-1">عميد الشؤون الأكاديمية — الجناح العسكري</p>
                <p className="text-xs text-gray-500 mt-3" dir="ltr">dean_aca@mutah.edu.jo</p>
              </div>
              <div className="w-full md:w-2/3">
                <Prose>
                  <p className="font-bold text-[#0f3057] text-lg">عمادة الشؤون الأكاديمية – الجناح العسكري</p>
                  <p>
                    تُعَدُّ جامعة مؤتة – بجناحها العسكري إحدى المكرمات الهاشمية السامية التي أسسها جلالة
                    المغفور له الملك الحسين بن طلال طيّب الله ثراه في مطلع ثمانينيات القرن الماضي، لتكون
                    منارة علمية وعسكرية رائدة تخدم الوطن، وتدعم مسيرة القوات المسلحة الأردنية – الجيش
                    العربي – والأجهزة الأمنية. وقد جاء هذا الصرح تجسيداً للرؤية الملكية الحكيمة الهادفة
                    إلى إعداد جيل من الضباط الشباب المؤهلين أكاديمياً وعسكرياً، القادرين على تحمّل
                    المسؤولية وصون مقدرات الأردن والدفاع عن أمنه واستقراره، والمشاركة بجدارة في المحافل
                    العسكرية ومهام حفظ السلام على المستويين الإقليمي والدولي.
                  </p>
                  <p>
                    وانسجاماً مع توجيهات القيادة الهاشمية، حظي الجناح العسكري بدعم ورعاية متواصلة من
                    القيادة العامة للقوات المسلحة الأردنية ومديرية الأمن العام، وبمتابعة حثيثة من جلالة
                    الملك عبدالله الثاني ابن الحسين حفظه الله، الذي أولى تطوير البرامج الأكاديمية
                    والعسكرية في الجناح اهتماماً كبيراً لضمان تخرج ضباط مؤهلين علمياً وعسكرياً، قادرين
                    على الإسهام في حماية الوطن ورفع كفاءته على كافة الأصعدة.
                  </p>
                  <p>
                    وفي إطار السعي لمواكبة التطورات الأكاديمية وتطبيق معايير الجودة والاعتماد، جرى في
                    عام 2020 تحويل مسمى <span className="font-bold">دائرة التنسيق الأكاديمي</span> إلى
                    عمادة الشؤون الأكاديمية – الجناح العسكري، تنفيذاً لرؤية اللجنة الملكية التي أقرت عام
                    1993، وبموجب قرار مجلس التعليم العالي الصادر بتاريخ 2020/3/5.
                  </p>
                  <p>
                    تُشكّل عمادة الشؤون الأكاديمية ركيزة أساسية من ركائز الجناح العسكري، إذ تتولى إعداد
                    وتصميم وتطوير البرامج الأكاديمية وفق أرقى المعايير العالمية، بما يمكّن الطلبة من
                    الجمع بين التأهيل العلمي الرصين والتدريب العسكري المتقدم. وتضع العمادة نصب عينيها
                    إعداد ضباط مؤهلين يتحملون مسؤولياتهم الوطنية بكفاءة واقتدار، ويساهمون في حماية
                    الأردن وترسيخ أمنه واستقراره.
                  </p>
                  <p>
                    كما تسعى العمادة إلى تطوير خططها الدراسية وبرامجها الأكاديمية باستمرار، وتوفير بيئة
                    تعليمية حديثة قائمة على التكنولوجيا المتقدمة، فضلاً عن استقطاب نخبة من أعضاء هيئة
                    التدريس من خريجي الجامعات المرموقة عربياً ودولياً، لضمان جودة التعليم وتخريج كوادر
                    قادرة على التفاعل مع المستجدات الأكاديمية والعلمية محلياً وعالمياً.
                  </p>
                </Prose>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#0f3057] mb-6">البرامج الأكاديمية (درجة البكالوريوس)</h3>

              <h4 className="text-base font-bold text-[#c9a227] mb-4">البرامج الإنسانية</h4>
              <div className="overflow-x-auto rounded-2xl border border-gray-100 mb-8">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ['القانون والعلوم العسكرية', 'القانون والعلوم الشرطية'],
                      ['الإدارة والعلوم العسكرية', 'الإدارة والعلوم الشرطية'],
                      ['اللغة الإنجليزية والعلوم العسكرية', 'اللغة الإنجليزية والعلوم الشرطية'],
                      ['إدارة الأزمات والعلوم العسكرية', 'إدارة الأزمات والعلوم الشرطية'],
                      ['اللغات والعلوم العسكرية', 'اللغات والعلوم الشرطية'],
                      ['الجغرافيا والعلوم العسكرية', 'التاريخ والعلوم العسكرية']
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'border-t border-gray-100 bg-white' : 'border-t border-gray-100 bg-[#F8FAFC]'}>
                        <td className="px-5 py-3.5 font-semibold text-[#0f3057] w-1/2">{row[0]}</td>
                        <td className="px-5 py-3.5 font-semibold text-[#0f3057] w-1/2">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h4 className="text-base font-bold text-[#c9a227] mb-4">البرامج العلمية</h4>
              <div className="overflow-x-auto rounded-2xl border border-gray-100">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ['الحاسوب والعلوم العسكرية', 'الحاسوب والعلوم الشرطية'],
                      ['علم البيانات والذكاء الاصطناعي والعلوم العسكرية', 'علم البيانات والذكاء الاصطناعي والعلوم الشرطية'],
                      ['الرياضيات والعلوم العسكرية', 'أمن المعلومات والأدلة الرقمية والعلوم الشرطية']
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'border-t border-gray-100 bg-white' : 'border-t border-gray-100 bg-[#F8FAFC]'}>
                        <td className="px-5 py-3.5 font-semibold text-[#0f3057] w-1/2">{row[0]}</td>
                        <td className="px-5 py-3.5 font-semibold text-[#0f3057] w-1/2">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'about-vision':
        return (
          <div className="space-y-8">
            <PageTitle title="الرؤية، الاهداف والسياسات" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5">
                  <Eye className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">الرؤية</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  تخريج قيادات وطنية وإقليمية تمزج بين تكاملية الإعداد العسكري الكامل والتأهيل العلمي
                  ضمن أعلى معايير الجودة والتميز.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mb-5">
                  <Target className="w-7 h-7 text-[#c9a227]" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-4">الرسالة</h3>
                <p className="text-gray-700 leading-[2] text-justify">
                  إعداد وتخريج قيادات شابة تتمتع بشخصية عسكرية وعلمية وتتمتع بحس مسؤولية المواطنة
                  والانتماء الأصيل لقياداتها وأمتها.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#0f3057] mb-6">الأهداف</h3>
              <NumList items={[
                'تجذير الثقافة المؤسسية المستنبطة من رؤية ورسالة القوات المسلحة الأردنية وجامعة مؤتة.',
                'التركيز على تعميق العقيدة الإسلامية وقيمها الروحية والأخلاقية والاعتزاز الوطني الأردني والانتماء العربي وتنمية مواهب التلاميذ وتوكيد صفات القيادة والمواطنة المنتجة لديهم، والربط الوثيق بين شحذ العقل والتحلي بالخلق الكريم في جميع النشاطات.',
                'إبراز دور الجناح العسكري محلياً وإقليمياً ودولياً وتهيئة البيئة الجامعية التي تُلبي تطلعات الطلبة العرب والأجانب.',
                'إتاحة فرص التعليم العالي وتجويد محتواه ورفع مستواه للتلميذ العسكري.',
                'تزويد الأجهزة العسكرية بالضباط والقادة المؤهلين لمواجهة التحديات المعاصرة والمستقبلية بالمختصين في ميادين العلوم والتكنولوجيا والآداب والفنون في الميادين العسكرية والمدنية سواء بسواء.',
                'تعزيز فتح باب الجامعة / الجناح العسكري للطلبة المؤهلين للقبول فيها من أبناء الدول العربية الشقيقة.',
                'توثيق الصلات مع الجامعات الأردنية والعربية والعالمية والاستفادة من خبراتها ونقل خبرة الجامعة / الجناح العسكري إليها.',
                'تشجيع البحث العلمي العسكري ووضع نتائجه موضع التطبيق في خدمة التنمية الأردنية الشاملة ونجاعة الأداء والإنجاز في الميادين العسكرية والمدنية.',
                'تحقيق أعلى قدر من معايير الاعتماد العالمية في جميع البرامج والحقول الأكاديمية والعسكرية.',
                'تطبيق إدارة الجودة الشاملة في كافة الخدمات التي يقدمها الجناح العسكري.',
                'استيعاب التكنولوجيا الحديثة ونقلها واستخدامها في الفعاليات الأردنية المدنية والعسكرية.',
                'ربط الخطط والبرامج الدراسية كمّاً ونوعاً بمتطلبات جامعة مؤتة وفقاً لحاجات القوات المسلحة الأردنية ومديرية الأمن العام.',
                'نشر المعرفة ولا سيما ما يتصل منها بالحضارة العربية الإسلامية والإسهام في رقي الحضارة الإنسانية.',
                'العمل على استقلالية توفير كفاءات تدريسية بالتعاون مع الجامعة والقيادة العامة للقوات المسلحة الأردنية ومديرية الأمن العام.',
                'زيادة الاهتمام في تنفيذ البرامج والبحوث العلمية والعسكرية الأساسية والتطبيقية التي تتواكب والمستجدات العلمية والتكنولوجية وتساهم في التطوير وتشجيع الإبداع والابتكار والتميز.',
                'المساهمة في زيادة الإيرادات على مستوى القوات المسلحة والجامعة وضبط الإنفاق وترشيد الاستهلاك.',
                'تعزيز النشاطات التي ترقى بمستوى تفكير التلاميذ أخلاقياً وسلوكياً.',
                'تطوير سياسة القبول ومعاييره بما يتلاءم مع تحقيق العدالة وتكافؤ الفرص التنافسية والاستجابة لمعايير وحاجة القوات المسلحة الأردنية والأمن العام.',
                'الاستمرار في تطوير الخطط والبرامج الدراسية وتحديثها.',
                'الارتقاء بمستوى التأهيل والكفاءة والخبرة للقوى البشرية العاملة في مجالات التدريس والتدريب والإدارة.',
                'تتبنى العمادة أحدث الوسائل وأنجح الأساليب في التعليم والتعلم واختيار المساقات وموضوعات البحث بتطبيق قواعد التنظيم العسكري والانضباط على جميع التلاميذ.',
                'إتاحة فرص التربية المستديمة والمستمرة في جميع الدراسات الأكاديمية والعسكرية لجميع التلاميذ من المنتسبين للقوات العسكرية وغيرهم، بقصد رفع مستوى مؤهلاتهم أو تحديث معلوماتهم.',
                'اعتبار التطبيق الميداني العسكري جزءاً لا يتجزأ من الدراسة النظرية وتقديره بعدد الساعات المعتمدة حق قدره.',
                'ضبط عملية استقطاب مدرسي العمل الإضافي من الجناح العسكري والمجتمع المحلي بالتنسيق المباشر مع عمداء الكليات المعنية.',
                'تطوير مناهج البحث العلمي والدراسات وخاصة في المجالات الميدانية والتطبيقية.',
                'تعزيز روح التنافس الإيجابي الشريف بين التلاميذ.',
                'تنمية شخصية التلاميذ وزيادة ثقتهم بأنفسهم وتعويدهم على تحمل المسؤولية من خلال إشراكهم في النشاطات والفعاليات القيادية والتدريبية.',
                'تعزيز برامج الإرشاد الأكاديمي والعسكري والنفسي والاجتماعي لضبط السلوك للتلاميذ بتوجيههم نحو التسامح وحرية التعبير واحترام الرأي الآخر والابتعاد عن التعصب.',
                'التركيز على تنمية القدرات الذهنية للتعلم الذاتي والتفكير الناقد واستخدام الأسلوب العلمي في حل المعاضل.',
                'تعميق مفهوم الضبط والربط العسكري من خلال مراقبة سلوك التلميذ داخل وخارج القاعات الدراسية.',
                'تعزيز وإثارة مفهوم الأداء والعمل بروح الفريق الواحد.'
              ]} />
            </div>
          </div>
        );

      case 'about-committees': {
        const COMMITTEES = [
          { title: 'اللجنة العليا', rows: [
            ['الأستاذ الدكتور رئيس الجامعة', 'رئيساً'],
            ['عطوفة نائب رئيس جامعة مؤتة للشؤون العسكرية', 'عضواً'],
            ['الأستاذ الدكتور نائب الرئيس للشؤون الأكاديمية', 'عضواً'],
            ['الأستاذ الدكتور عميد عمادة الشؤون الأكاديمية', 'عضواً'],
            ['عطوفة آمر كلية العلوم العسكرية', 'عضواً'],
            ['عطوفة آمر كلية العلوم الشرطية', 'عضواً'],
            ['الدكتور عميد كلية الأميرة منى للتمريض', 'عضواً'],
            ['المستشار القانوني للجناح العسكري', 'عضواً'],
            ['مدير وحدة القبول والتسجيل', 'عضواً'],
            ['ركن/1 تنسيق وعلاقات عامة', 'أمين سر']
          ] },
          { title: 'لجنة قضايا التلاميذ', rows: [
            ['عطوفة نائب رئيس جامعة مؤتة للشؤون العسكرية', 'رئيساً'],
            ['الأستاذ الدكتور عميد عمادة الشؤون الأكاديمية', 'عضواً'],
            ['عطوفة آمر كلية العلوم العسكرية', 'عضواً'],
            ['عطوفة آمر كلية العلوم الشرطية', 'عضواً'],
            ['مدير وحدة القبول والتسجيل', 'عضواً'],
            ['ركن/1 تنسيق وعلاقات عامة', 'أمين سر']
          ] },
          { title: 'لجنة خطة العمادة', rows: [
            ['نائب العميد العميد / د. أحمد محمد الجعافرة', 'رئيساً'],
            ['رئيس قسم التخصصات الإنسانية / د. أحمد عبد الكريم الصرايرة', 'عضواً'],
            ['رئيس قسم التخصصات العلمية / د. قصي عادل الكساسبة', 'عضواً'],
            ['رئيس القسم المعني في الجناح المدني بتجديد الخطط أو استحداث برامج جديدة وتنتهي عضويته بانتهاء إقرار خطط قسمه', 'عضواً']
          ] },
          { title: 'لجنة خطة قسم التخصصات الإنسانية', rows: [
            ['رئيس قسم التخصصات الإنسانية / د. أحمد عبد الكريم الصرايرة', 'رئيساً'],
            ['رئيس قسم الإدارة العامة / د. عبدالرحمن العبادلة', 'عضواً'],
            ['رئيس القسم المعني في الجناح المدني بتجديد الخطط أو استحداث برامج جديدة وتنتهي عضويته بانتهاء إقرار خطط قسمه', 'عضواً']
          ] },
          { title: 'لجنة خطة قسم التخصصات العلمية', rows: [
            ['رئيس قسم التخصصات العلمية / د. قصي عادل الكساسبة', 'رئيساً'],
            ['رئيس قسم علم البيانات والذكاء الاصطناعي / د. أحمد سالم الطراونة', 'عضواً'],
            ['رئيس القسم المعني في الجناح المدني بتجديد الخطط أو استحداث برامج جديدة وتنتهي عضويته بانتهاء إقرار خطط قسمه', 'عضواً']
          ] },
          { title: 'مجلس العمادة', rows: [
            ['عميد الشؤون الأكاديمية / د. عامر العقيلي', 'رئيساً'],
            ['نائب العميد العميد / د. أحمد محمد الجعافرة', 'أمين سر'],
            ['رئيس قسم التخصصات العلمية / د. قصي عادل الكساسبة', 'عضواً'],
            ['رئيس قسم التخصصات الإنسانية / د. أحمد عبد الكريم الصرايرة', 'عضواً'],
            ['رئيس قسم علم البيانات والذكاء الاصطناعي / د. أحمد سالم الطراونة', 'عضواً'],
            ['رئيس قسم التاريخ / أ.د. ميسون عبيدات', 'عضواً'],
            ['رئيس قسم إدارة الأعمال / د. محمد الغبابشة', 'عضواً'],
            ['مكتب تنسيق كلية العلوم العسكرية / الرائد إبراهيم الجبور', 'عضواً'],
            ['مكتب تنسيق كلية العلوم الشرطية / النقيب ثامر الصرايره', 'عضواً']
          ] },
          { title: 'مجلس قسم التخصصات الإنسانية', rows: [
            ['رئيس قسم التخصصات الإنسانية / د. أحمد عبد الكريم الصرايرة', 'رئيساً'],
            ['قسم التاريخ / أ.د. صبحي العزام', 'عضواً'],
            ['قسم اللغة الإنجليزية / د. عيسى الخطبا', 'عضواً'],
            ['قسم الإدارة العامة / د. راتب الخرشة', 'عضواً']
          ] },
          { title: 'مجلس قسم التخصصات العلمية', rows: [
            ['رئيس قسم التخصصات العلمية / د. قصي عادل الكساسبة', 'رئيساً'],
            ['قسم هندسة البرمجيات / أ.د. مصطفى حماد', 'عضواً'],
            ['قسم علم البيانات والذكاء الاصطناعي / د. معاذ الحجايا', 'عضواً'],
            ['قسم الرياضيات والاحصاء / د. رابعه المعايطة', 'عضواً']
          ] }
        ];
        return (
          <div className="space-y-8">
            <PageTitle title="اللجان" />
            <div className="flex flex-col gap-8">
              {COMMITTEES.map((c) => (
                <div key={c.title}>
                  <div className="bg-[#0f3057] text-white px-6 py-3 rounded-xl font-bold mb-4 inline-block">{c.title}</div>
                  <div className="overflow-x-auto rounded-2xl border border-gray-100">
                    <table className="w-full text-sm">
                      <tbody>
                        {c.rows.map((r, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'border-t border-gray-100 bg-white' : 'border-t border-gray-100 bg-[#F8FAFC]'}>
                            <td className="px-5 py-3.5 font-semibold text-[#0f3057]">{r[0]}</td>
                            <td className="px-5 py-3.5 w-32">
                              <span className="inline-block text-xs font-bold text-[#0f3057] px-3 py-1 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/20">{r[1]}</span>
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
      }

      case 'honor-deans':
        return (
          <div className="space-y-8">
            <PageTitle title="لوحة شرف عمداء عمادة الشؤون الاكاديمية" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: 'الاستاذ الدكتور محمود الرويضي', period: '13/9/2020 - 13/9/2024', img: 'https://www.mutah.edu.jo/ar/daa/PublishingImages/HonorOfDeanship/fffff.png' },
                { name: 'الأستاذ الدكتور عامر العقيلي', period: '15/9/2024 - حتى الآن', img: 'https://www.mutah.edu.jo/ar/daa/PublishingImages/Dr.Amer%20Personal.jpeg' }
              ].map((d) => (
                <div key={d.name} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center hover:border-[#c9a227]/50 transition-all">
                  <div className="w-32 h-32 rounded-full mx-auto mb-5 overflow-hidden bg-[#0f3057]">
                    <img src={d.img} alt={d.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs font-bold text-[#c9a227] mb-2">عميد عمادة الشؤون الأكاديمية</p>
                  <h3 className="font-bold text-[#0f3057] text-lg mb-3 leading-snug">{d.name}</h3>
                  <span className="inline-block text-xs font-bold text-[#0f3057] px-3 py-1 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/20" dir="ltr">{d.period}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'about-sign':
        return (
          <div className="space-y-8">
            <PageTitle title="شعار العمادة" />
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white p-6 flex items-center justify-center">
              <img
                src="https://www.mutah.edu.jo/ar/daa/PublishingImages/HonorOfDeanship/%D8%B4%D8%B9%D8%A7%D8%B1%20%D8%A7%D9%84%D8%B9%D9%85%D8%A7%D8%AF%D8%A9.jpg"
                alt="شعار عمادة الشؤون الأكاديمية"
                className="max-w-full h-auto object-contain"
                style={{ maxHeight: 420 }}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            <PageTitle title={getSectionTitle(activeItem, DAA_LINKS)} />
            <Waiting />
          </div>
        );
    }
  };

  return (
    <DeanshipShell
      brand="عمادة الشؤون الأكاديمية"
      tagline="الإشراف على الشؤون الأكاديمية للتلاميذ العسكريين في الجناح العسكري بجامعة مؤتة."
      heroImage="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      links={DAA_LINKS} activeItem={activeItem} setActiveItem={setActiveItem}>
      {render()}
    </DeanshipShell>
  );
}
