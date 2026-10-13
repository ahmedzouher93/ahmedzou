import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { 
  Menu, ChevronLeft, ChevronDown, Info, Target, Users, Award, 
  FileText, ShieldAlert, BookOpen, Download, Building
} from 'lucide-react';
import { Button } from '../components/ui/button';
import aboutImg from "../../imports/image-4.png";

const ABOUT_LINKS = [
  { id: 'about', name: 'نبذة عن الجامعة', icon: Info },
  { id: 'vision', name: 'الرؤية والرسالة والقيم', icon: Target },
  { id: 'presidency', name: 'رئاسة الجامعة', icon: Award },
  { id: 'vp', name: 'نواب الرئيس', icon: Users },
  { id: 'trustees', name: 'مجلس الأمناء', icon: Building },
  { id: 'council', name: 'مجلس الجامعة', icon: Users },
  { id: 'deans', name: 'مجلس العمداء', icon: Users },
  { id: 'former', name: 'الرؤساء السابقون', icon: Award },
  { id: 'strategic', name: 'الخطة الاستراتيجية', icon: FileText },
  { id: 'conduct', name: 'مدونات السلوك', icon: FileText },
  { id: 'procedural', name: 'الخطة الإجرائية', icon: FileText },
  { id: 'risk', name: 'خطة إدارة المخاطر', icon: ShieldAlert },
  { id: 'journal', name: 'مجلة جامعة مؤتة', icon: BookOpen },
  { id: 'report', name: 'التقرير السنوي', icon: FileText },
];

// Data Arrays
const TRUSTEES = [
  { name: "سعادة د. يوسف موسى القسوس", role: "رئيس المجلس" },
  { name: "الأستاذ الدكتور رئيس الجامعة", role: "عضواً" },
  { name: "معالي أ.د. كامل عودة الله المحادين", role: "عضواً" },
  { name: "سعادة أ.د. رنا محمد نذير أبو الذهـب", role: "عضواً" },
  { name: "سعادة أ.د. إبراهيم فتحي الغلايني", role: "عضواً" },
  { name: "سعادة أ.د. حسين عمر الخزاعي", role: "عضواً" },
  { name: "سعادة د.معن فهد النسـور", role: "عضواً" },
  { name: "سعادة د.سالم سليمان ختاتنة", role: "عضواً" },
  { name: "سعادة د.محسن فايز أبو عـوض", role: "عضواً" },
  { name: "معالي السيد ياسين مهيب 'محمد علي' الخياط", role: "عضواً" },
  { name: "سعادة السيد زياد محمد لافي الشمايلة", role: "عضواً" },
  { name: "سعادة الدكتور زيد محمد حسين النوايسة", role: "عضواً" },
  { name: "سعادة السيد عاطف حسين السحيمات", role: "عضواً" },
  { name: "السيد حكمت العضايلة", role: "أمين سر المجالس" },
];

const FORMER_PRESIDENTS = [
  { name: "عطوفة الاستاذ الدكتور على مفلح عبدالله محافظة", period: "1985/8/8 - 1989/12/18" },
  { name: "معالي الاستاذ الدكتور عوض محمد عودة خليفات", period: "1989/12/18 - 1991/11/21" },
  { name: "عطوفة الاستاذ الدكتور محمد عدنان سلامه البخيت", period: "1991/12/18 - 1993/04/01" },
  { name: "معالي الاستاذ الدكتور 'محمد خير' علي مامسر (بالوكالة)", period: "1993/03/15 - 1993/09/03" },
  { name: "عطوفة الاستاذ الدكتور عبدالرحمن شعبان عطيات", period: "1993/12/22 - 1997/3/1" },
  { name: "معالي الاستاذ الدكتور عيد عبدالله قبلان الدحيات", period: "1997/03/01 - 2005/03/01" },
  { name: "معالي الاستاذ الدكتور سليمان عربيات", period: "2005/03/01 - 2009/03/01" },
  { name: "عطوفة الاستاذ الدكتور عبدالرحيم الحنيطي", period: "2009/03/01 - 2013/12/31" },
  { name: "عطوفة الاستاذ الدكتور رضا شبلي الخوالده", period: "2013/04/04 - 2016/05/31" },
  { name: "عطوفة الأستاذ الدكتور ظافر الصرايرة", period: "2016/08/10 - 2020/07/08" },
  { name: "عطوفة الأستاذ الدكتور عرفات عوجان", period: "2020/08/23 - 2023/05/18" },
];

const VP_LIST = [
  { name: "العميد الركن عوض علي الطهاروة", role: "نائب الرئيس للشؤون العسكرية", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
  { name: "أ.د.محمد سليمان الصرايرة", role: "نائب الرئيس للشؤون الإدارية", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { name: "أ.د.امين عقل", role: "نائب الرئيس لشؤون الكليات العلمية", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" },
  { name: "أ.د.محمد داود المجالي", role: "نائب الرئيس للتعليم الالكتروني والجودة", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
];

const COUNCIL = [
  { name: "معالي أ.د. سلامة صالح النعيمات", role: "رئيس الجامعة" },
  { name: "العميد الركن عطالله سالم الحماد", role: "نائب الرئيس للشؤون العسكرية" },
  { name: "أ.د.محمد داوود المجالي", role: "نائب الرئيس للشؤون الأكاديمية والتعليم الإلكتروني والجودة" },
  { name: "أ.د. محمد سليمان الصرايرة", role: "نائب الرئيس للشؤون الإدارية والمالية" },
  { name: "د.معاذ الطراونة", role: "عميد كلية العلوم" },
  { name: "أ.د.ماهر المبيضين", role: "عميد كلية الآداب" },
  { name: "أ.د رائد العضايلة", role: "عميد شؤون الطلبة" },
  { name: "أ.د. جمال بني سلامة", role: "عميد كلية الهندسة" },
  { name: "أ.د.فيصل الكساسبة", role: "ممثل كلية العلوم" },
  { name: "د.وليد المناصرة", role: "ممثل كلية العلوم" },
  { name: "د. معاوية العساسفة", role: "ممثل كلية الزراعة" },
  { name: "د.مصطفى الرواشدة", role: "ممثل كلية الزراعة" },
  { name: "أ.د. يزيد السبوع", role: "ممثل كلية الهندسة" },
  { name: "د.العنود الصرايرة", role: "ممثل كلية الهندسة" },
  { name: "د.أحمد السقرات", role: "ممثل كلية التمريض" },
  { name: "السيد رائد جرادات", role: "ممثل كلية التمريض" },
  { name: "أ.د. يوسف الصرايرة", role: "ممثل كلية الطب" },
  { name: "د.عماد أبو راجوح", role: "ممثل كلية الطب" },
  { name: "د. محمد الملاحمة", role: "ممثل كلية الآداب" },
  { name: "د.باسم البديرات", role: "ممثل كلية الآداب" },
  { name: "أ.د. نايف البنوي", role: "ممثل كلية العلوم الاجتماعية" },
  { name: "د. مسلم الرواحنة", role: "ممثل كلية العلوم الاجتماعية" },
  { name: "د.أحمد الضلاعين", role: "ممثل كلية الحقوق" },
  { name: "د.وسام الشواورة", role: "ممثل كلية الحقوق" },
  { name: "د. سليمان المعايطة", role: "ممثل كلية الأعمال" },
  { name: "السيد راتب الخرشة", role: "ممثل كلية الأعمال" },
  { name: "أ.د.أحمد الطويسي", role: "ممثل كلية العلوم التربوية" },
  { name: "أ.د. وجدان الكركي", role: "ممثل كلية العلوم التربوية" },
  { name: "أ.د.نايل أبو زيد", role: "ممثل كلية الشريعة" },
  { name: "د.مروان الرياحنة", role: "ممثل كلية الشريعة" },
  { name: "د.عمر الجعافرة", role: "ممثل كلية علوم الرياضة" },
  { name: "د.بلال الضمور", role: "ممثل كلية علوم الرياضة" },
  { name: "أ.د.أحمد الحسنات", role: "ممثل كلية تكنولوجيا المعلومات" },
  { name: "د.معاذ الحجايا", role: "ممثل كلية تكنولوجيا المعلومات" },
  { name: "أ.د.وائل أبو دية", role: "ممثل كلية الصيدلة" },
  { name: "د. نسرين موافي", role: "ممثل كلية العلوم الطبية المساندة" },
  { name: "السيد علي القضاة", role: "مدير وحدة الشؤون المالية" },
  { name: "د. ليث خالد إبراهيم", role: "ممثل كلية الدراسات العليا" },
  { name: "السيد جعفر الطراونة", role: "مدير وحدة اللوازم" },
  { name: "السيد محمد ذباح الجمل", role: "مدير وحدة القبول والتسجيل" },
  { name: "عطوفة منار محاسنة", role: "ممثل المجتمع المحلي" },
  { name: "سعادة السيد سمير المصاروة", role: "ممثل المجتمع المحلي" },
  { name: "الطالب راشد عبدالله العدينات", role: "رئيس مجلس اتحاد طلبة/ ممثل طلبة الجامعة" },
  { name: "الخريج صخر حسين السحيمات", role: "ممثل خريجي الجامعة" },
  { name: "الطالبة ميسون مرتضى الضلاعين", role: "عضو مجلس اتحاد الطلبة/ ممثل طلبة الجامعة" },
];

const DEANS = [
  { name: "معالي أ.د. سلامة صالح النعيمات", role: "رئيس الجامعة" },
  { name: "العميد الركن عطالله سالم الحماد", role: "نائب الرئيس للشؤون العسكرية" },
  { name: "أ.د محمد داوود المجالي", role: "نائب الرئيس للشؤون الأكاديمية والتعليم الإلكتروني والجودة" },
  { name: "أ.د. محمد سليمان الصرايرة", role: "نائب الرئيس للشؤون الإدارية والمالية" },
  { name: "أ.د أمين عقل", role: "نائب الرئيس لشؤون الكليات العلمية" },
  { name: "أ.د محمد العمايرة", role: "عميد كلية العلوم الاجتماعية" },
  { name: "أ.د عمر الجرادات", role: "عميد كلية الدراسات العليا" },
  { name: "أ.د نوفل العميري", role: "عميد كلية الزراعة" },
  { name: "أ.د رانية العقاربة", role: "عميد كلية الآداب" },
  { name: "أ.د أمجد مدانات", role: "عميد كلية علوم الرياضة" },
  { name: "أ.د أسامه مهاوش", role: "عميد البحث العلمي" },
  { name: "أ.د.ماهر المبيضين", role: "عميد شؤون الطلبة" },
  { name: "د. عامر العقيلي", role: "عميد عمادة الشؤون الأكاديمية/الجناح العسكري" },
  { name: "أ.د خالد الحطيبات", role: "عميد كلية الأعمال" },
  { name: "أ.د جمال بني سلامة", role: "عميد كلية الهندسة" },
  { name: "أ.د وائل أبو دية", role: "عميد كلية الصيدلة" },
  { name: "أ.د عبدالإله النوايسة", role: "عميد كلية الحقوق" },
  { name: "أ.د. عبد الناصر القرالة", role: "عميد كلية العلوم التربوية" },
  { name: "د. مصطفى حماد", role: "عميد كلية تكنولوجيا المعلومات" },
  { name: "د. معاذ الطراونة", role: "القائم بأعمال عميد كلية العلوم" },
  { name: "د. رائد الشديفات", role: "القائم بأعمال عميد كلية التمريض" },
  { name: "د.محود المعايطة", role: "القائم بأعمال عميد كلية الشريعة" },
  { name: "د. فادي سواقد", role: "القائم بأعمال عميد كلية الطب" },
  { name: "د. نسرين موافي", role: "القائم بأعمال عميد كلية العلوم الطبية المساندة" },
  { name: "أ.د أيمن قطيطات", role: "عميد كلية طب الأسنان" },
];


export function About() {
  const location = useLocation();
  const routeParams = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('about');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = routeParams.tab || params.get('tab');
    if (tabParam && ABOUT_LINKS.some(link => link.id === tabParam)) {
      setActiveItem(tabParam);
    }
  }, [location.search]);

  const handleTabClick = (tabId: string) => {
    setActiveItem(tabId);
    navigate(`/about/${tabId}`);
  };

  const getSectionTitle = (id: string): string => {
    const link = ABOUT_LINKS.find(l => l.id === id);
    return link ? link.name : 'عن الجامعة';
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'about':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
                <Info className="text-[#0f3057] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#0f3057]">نبذة عن الجامعة</h2>
            </div>
            <img src={aboutImg} alt="جامعة مؤتة" className="w-full h-80 object-cover rounded-xl shadow-sm mb-8 border border-gray-100" />
            <div className="text-gray-700 leading-8 space-y-6 text-lg text-justify">
              <p>صدرت الإرادة الملكية السامية بتأسيس جامعة مؤتة الجناح العسكري سنة 1981 لتكون ثالث الجامعات الأردنية في اقليم الجنوب بعد الجامعة الأردنية في اقليم الوسط وجامعة اليرموك في اقليم الشمال ، وفي سنة 1986 صدر قرار مجلس التعليم العالي بإنشاء الجناح المدني للجامعة. فاكتملت الجامعة بجناحيها العسكري والمدني، فتميزت عن شقيقاتها من الجامعات الأردنية بأنها جامعة السيف والقلم ، حيث يوجد في الجناح العسكري 6 كليات هي : كلية العلوم الشرطية ، كلية العلوم العسكرية ، كلية الأميرة منى للتمريض والمهن الطبية المساندة ، كلية الدفاع الوطني الملكية الأردنية ، كلية القيادة والأركان الملكية وكلية الامير حسن للعلوم الاسلامية.</p>
              <p>تبلغ مساحة الجامعة في موقعها الرئيسي (4000) دونم ، وتضم الجامعة (15 ) كلية، منها (7) كليات علمية و (7) كليات إنسانية، وكلية الدارسات العليا، إضافة لعمادتين عمادة البحث العلمي، وعمادة شؤون الطلبة، وعمادة الشؤون الأكاديمية / الجناح العسكري ، وتطرح الجامعة (105) برامج أكاديمية ، منها (53) برنامجا على مستوى البكالوريوس، وبرنامجا على مستوى الدبلوم العالي ، و (42) برنامجا على مستوى الماجستير، و (9) برامج على مستوى الدكتوراة.</p>
              <p>بلغ العدد الإجمالي لطلبة الجامعة للعام الدارسي (2020/2021) (19735) طالباً وطالبة ، منهم (14773) طالباً في برامج البكالوريوس ،و (2826) طالباً في برامج الدراسات العليا بنسبة (16.06%) من إجمالي طلبة الجامعة، وبلغ عدد الطلبة غير الأردنيين في الجامعة (2136) طالباً موزعين على (28) دولة عربية وإسلامية وأجنبية بنسبة (8%) تقريباً من إجمالي طلبة الجامعة.</p>
              <p>بلغ عدد أعضاء هيئة التدريس في الجامعة (626) عضو هيئة تدريس، ويبلغ عدد المبتعثين على مقاعد الدراسة والمرشحين للإيفاد لغاية نهاية (2020/2019) (107) منهم (99) على مقاعد الدراسة ، و (8) مرشحين للإيفاد ، ويبلغ عدد الموظفين العاملين في الجامعة (1786) موظفاً إدارياً.</p>
              <p>تسير الجامعة اليوم بخطوات واثقة نحو التحسين المستمر للارتقاء بمدخلاتها وعملياتها ومخرجاتها، مستمدة رؤيتها من رؤية جلالة الملك المفدى (حفظه الله) التي تناولتها الورقة النقاشية السابعة "بناء قدارتنا البشرية وتطوير العملية التعليمية جوهر نهضة الأمة" التي أشار فيها جلالته إلى "إننا نريد أن نرى جامعاتنا مصانع للعقول المفكرة، والأيدي العاملة الماهرة، والطاقات المنتجة".</p>
              <p>تسعى الجامعة وفقا لرؤيتها ورسالتها إلى أن تكون جامعة منافسة، تتميز بالريادة في مجالات التعليم الأكاديمي والعسكري والبحث العلمي والتنمية المستدامة للمجتمع. من خلال توفير بيئة جامعية تعزز منظومة الريادة والابتكار، وتدعم قدارت التعليم، والبحث العلمي التطبيقي، وتؤهل خريجين قادرين على المنافسة في سوق العمل محليا واقليميا وعالميا ، لتحقيق التنمية المجتمعية المستدامة.</p>
              <p>يأتي هذا التقرير السنوي ليظهر إنجازات الجامعة للعام الجامعي (2020/2021) وجاء في محاور رئيسة تناولت: العالمية، والاعتماد وضمان الجودة، والتدريس، والبحث العلمي، والمشاريع، والموارد البشرية والمالية، والإدارة والإجراءات الإدارية، والبنية التحتية، وخدمة المجتمع المحلي والنشاطات.</p>
            </div>
          </div>
        );

      case 'vision':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
                <Target className="text-[#0f3057] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#0f3057]">الرؤية والرسالة والقيم</h2>
            </div>
            
            <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80" alt="الرؤية والرسالة" className="w-full h-[300px] object-cover rounded-xl shadow-sm mb-8 border border-gray-100" />
            
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 border-r-4 border-r-[#c9a227]">
                <h3 className="text-2xl font-bold text-[#0f3057] mb-3">رُؤيتُنا</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  تطمح جامعة مؤتة أن تكون منافسة ورائدة في التعليم والتعلّم، والبحث العلمي، والتنمية الاقتصادية والاجتماعية المستدامة.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 border-r-4 border-r-[#0f3057]">
                <h3 className="text-2xl font-bold text-[#0f3057] mb-3">رِسالتُنا</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  توفير بيئة جامعية تعزِّز منظومة الريادة والابتكار، وتدعم قدرات التعليم والتعلّم المتميزتين، والبحث العلمي التطبيقي، وتحقق التنمية المستدامة للمجتمع، وتؤهل خريجين قادرين على مواجهة تحديات الحياة، والمنافسة في سوق العمل المحلي والإقليمي والعالمي.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#0f3057] mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c9a227]"></span>
                  قِيَمُنا
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "التحسين المستمر",
                    "النزاهة والشفافية",
                    "التعلم المستمر",
                    "المسؤولية المجتمعية",
                    "الحرية الأكاديمية",
                    "الريادة والتميز"
                  ].map((value, idx) => (
                    <div key={idx} className="flex gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:border-[#c9a227]/30 items-center justify-center text-center">
                      <p className="text-[#0f3057] font-bold text-lg">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'presidency':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
                <Award className="text-[#0f3057] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#0f3057]">رئاسة الجامعة</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="w-full md:w-1/3 shrink-0 flex flex-col gap-4">
                <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80" alt="رئيس الجامعة" className="w-full aspect-[3/4] object-cover rounded-2xl shadow-md border-4 border-white" />
                <div className="text-center bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h3 className="text-xl font-bold text-[#0f3057]">معالي الاستاذ الدكتور سلامة صالح النعيمات</h3>
                  <p className="text-[#c9a227] font-medium mb-4">رئيس الجامعة</p>
                  
                  <div className="space-y-3 text-sm text-gray-600 text-right mt-4 pt-4 border-t border-gray-200">
                    <p className="flex justify-between items-center"><strong>الهاتف:</strong> <span className="dir-ltr">00962-32372380</span></p>
                    <p className="flex justify-between items-center"><strong>فرعي:</strong> <span>6000</span></p>
                    <p className="flex justify-between items-center"><strong>فاكس:</strong> <span className="dir-ltr">962-03-2375540</span></p>
                    <p className="flex justify-between items-center"><strong>البريد:</strong> <span>president@mutah.edu.jo</span></p>
                    <p className="flex justify-between items-center"><strong>الموقع:</strong> <span>مؤتة - الكرك - الاردن</span></p>
                  </div>
                  
                  <Button className="w-full mt-6 bg-[#0f3057] hover:bg-[#0a2040] text-white">
                    <Download size={16} className="mr-2" />
                    Download CV
                  </Button>
                </div>
              </div>
              
              <div className="w-full md:w-2/3 text-gray-700 leading-8 space-y-6 text-lg text-justify">
                <h3 className="text-2xl font-bold text-[#0f3057] mb-4 border-b pb-2 inline-block border-[#c9a227]">كلمة الرئيس</h3>
                <p>إنه لمن دواعي سرورنا الترحيب بكم في جامعة مؤتة، هذه الجامعة التي أصبحت تشكل منارة علم مضيئة في مسيرة التعليم العالي والتنمية والإبداع والتفكير وتحقيق النجاح، جامعة رائدة في المملكة الأردنية الهاشمية ومنطقة الشرق الأوسط والعالم، وإنه لشرف عظيم لجامعة مؤتة أن تحمل اسم معركة مؤتة الخالدة، وأن تضم في رحابها جناحين، أحدهما عسكري منذ عام (1981م)، والآخر مدني منذ عام (1986م)، محققة بذلك ثورة من المكتسبات والإنجازات العسكرية والأكاديمية والبحثية والمؤسسية، وقد ساعدها ذلك في أن تكون شريكاً فاعلاً ومؤثراً في المجتمع الأردني، وأن تكون إحدى الجامعات المرموقة في المنطقة.</p>
                <p>تستلهم جامعة مؤتة رؤيتها من توجيهات حضرة صاحب الجلالة الهاشمية الملك عبد الله الثاني ابن الحسين المعظم يحفظه الله ويرعاه، فالتعليم العالي وفق هذه الرؤية يحتاج إلى إستراتيجية تعنى بالكيف ونوعية التعليم؛ ليتوافق مع أفضل المعايير الدولية، ويضع النظام التعليمي في درجة عالية من التنافس؛ إذ إن الكفاءات المدربة والمواكبة لمتطلبات العصر أدوات اقتصادية مولدة للنشاط الاقتصادي والثروة، وهي رصيد إنساني ومعرفي يساهم في تنمية المجتمعات الوطنية والدولية.</p>
                <p>وفي ضوء ذلك، تسعى جامعة مؤتة إلى أن تحقق لنفسها سمعة وطنية ودولية، وأن تؤسس مكانة رفيعة بين الجامعات الأردنية والعالمية من خلال وضع إستراتيجية تعالج متطلبات النهوض العلمي؛ لتستشرف احتياجات المستقبل، وتواجه تحديات التعليم العالي، وتواكب في هذه المرحلة الحوار الجاد، والبحث العلمي، والتجاذب الذي تشهده الجامعات الوطنية والعالمية، والحركة النشطة لتعديل المسار باتجاه نوعية التعليم ومتطلبات المجتمع، وربط التعليم العالي بالحاجات الحقيقية للنماء.</p>
                <p>وفي سياق متصل، تعتز جامعة مؤتة بالعلاقة الوثيقة التي تربطها بالجامعات الوطنية والعربية والعالمية من خلال العديد من مذكرات التفاهم واتفاقيات التعاون التي ترتب عليها استحداث الكثير من التخصصات والبرامج؛ وذلك في محاولة من الجامعة لمضاهاة أعرق الجامعات العالمية، والتميز والتفوق على المستوى المحلي والعالمي.بكل فخر واعتزاز أرحب بكم أجمل ترحيب بمشاعر تتدفق بالحب والولاء لهذا الصرح العلمي الشامخ، وأدعوكم لتصفح كافة محتويات موقع جامعة مؤتة الإلكتروني بهدف التعرف بشكل أوسع وأكبر على الجامعة وإنجازاتها وخطتها وبنيتها التحتية المتطورة، والله يوفقكم ويحقق آمالكم وطموحاتكم، ويديم عليكم نعمتي الصحة والعافية.</p>
                <p className="font-bold text-[#0f3057]">والسلام عل​يكم ورحمة ا​لله وبركاته</p>
              </div>
            </div>
          </div>
        );

      case 'vp':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
                <Users className="text-[#0f3057] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#0f3057]">نواب الرئيس</h2>
            </div>
            <img src={aboutImg} alt="نواب الرئيس" className="w-full h-64 object-cover rounded-xl shadow-sm mb-10 border border-gray-100" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {VP_LIST.map((vp, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow items-center sm:items-start text-center sm:text-right">
                  <img src={vp.img} alt={vp.name} className="w-24 h-24 rounded-full object-cover shadow-sm border-2 border-white" />
                  <div className="flex-1 flex flex-col justify-center h-full">
                    <h3 className="text-lg font-bold text-[#0f3057] mb-1">{vp.name}</h3>
                    <p className="text-[#c9a227] font-medium text-sm mb-4">{vp.role}</p>
                    <Button variant="outline" size="sm" className="w-fit mx-auto sm:mx-0 border-[#0f3057] text-[#0f3057] hover:bg-[#0f3057] hover:text-white">
                      السيرة الذاتية
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'trustees':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
                <Building className="text-[#0f3057] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#0f3057]">مجلس الأمناء</h2>
            </div>
            <img src={aboutImg} alt="مجلس الأمناء" className="w-full h-64 object-cover rounded-xl shadow-sm mb-10 border border-gray-100" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TRUSTEES.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-[#0f3057]/5 transition-colors">
                  <span className="font-bold text-[#0f3057]">{item.name}</span>
                  <span className="text-sm px-3 py-1 bg-white rounded-full text-[#c9a227] border border-gray-200 shadow-sm">{item.role}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'council':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
                <Users className="text-[#0f3057] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#0f3057]">مجلس الجامعة</h2>
            </div>
            <img src={aboutImg} alt="مجلس الجامعة" className="w-full h-64 object-cover rounded-xl shadow-sm mb-10 border border-gray-100" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {COUNCIL.map((item, idx) => (
                <div key={idx} className="flex flex-col p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-[#c9a227]/40 transition-colors shadow-sm">
                  <span className="font-bold text-[#0f3057] mb-1">{item.name}</span>
                  <span className="text-xs text-gray-500">{item.role}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'deans':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
                <Users className="text-[#0f3057] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#0f3057]">مجلس العمداء</h2>
            </div>
            <img src={aboutImg} alt="مجلس العمداء" className="w-full h-64 object-cover rounded-xl shadow-sm mb-10 border border-gray-100" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DEANS.map((item, idx) => (
                <div key={idx} className="flex flex-col p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-[#c9a227]/40 transition-colors shadow-sm">
                  <span className="font-bold text-[#0f3057] mb-1">{item.name}</span>
                  <span className="text-xs text-gray-500">{item.role}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'former':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
                <Award className="text-[#0f3057] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#0f3057]">الرؤساء السابقون</h2>
            </div>
            <img src={aboutImg} alt="الرؤساء السابقون" className="w-full h-64 object-cover rounded-xl shadow-sm mb-10 border border-gray-100" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FORMER_PRESIDENTS.map((item, idx) => (
                <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col shadow-sm">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                    <Award size={20} className="text-[#c9a227]" />
                  </div>
                  <h3 className="font-bold text-[#0f3057] text-lg mb-2">{item.name}</h3>
                  <span className="text-gray-500 text-sm font-medium dir-ltr inline-block text-right">{item.period}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'strategic':
      case 'procedural':
      case 'risk':
      case 'journal':
        const detailsMap: Record<string, {title: string, img: string, text: string}> = {
          'strategic': {
            title: 'الخطة الاستراتيجية',
            img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
            text: 'ايماناً من جامعة مؤتة بالمسؤولية نحو أجيال الوطن ومستقبلهم، وسعياً من الجامعة نحو خلق البيئة التعليمية الملائمة والمناسبة لهم بما ينسجم مع التطورات التي يشهدها العالم اليوم، وحرصا منا على تحقيق مستقبل متميز لجامعة مؤتة من خلال تنفيذ برامج أكاديمية رفيعة المستوى تلبي احتياجات السوق ومتطلبات التغيير الذي فرضته العولمة والتقدم التكنولوجي في كافة مناحي الحياة، بالاضافة الى جانب التركيز على البحث العلمي الهادف والمسؤولية الاجتماعية لتنمية المجتمع المحلي باعتباره شريكاً حقيقياً في تحقيق الأهداف المنشودة ، قامت جامعة مؤتة بإعداد خطة إستراتيجية وفق أفضل الممارسات والتطبيقات المؤدية إلى النجاح الحقيقي المبني على أساس التخطيط القائم على الفهم الصحيح والتحليل الدقيق لواقع الجامعة وإمكاناتها.'
          },
          'procedural': {
            title: 'الخطة الإجرائية',
            img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80',
            text: 'تتضمن الخطة الإجرائية مجموعة من الآليات والبرامج التنفيذية المرتبطة بخطط الجامعة وتوجهاتها الاستراتيجية لضمان تنفيذ المبادرات والأنشطة الأكاديمية والإدارية ضمن مؤشرات قياس أداء محددة.'
          },
          'risk': {
            title: 'خطة إدارة المخاطر',
            img: aboutImg,
            text: 'يوفر معيار إدارة المخاطر أساسيات وخطوط إرشادية لإدارة المخاطر وتبعا لهذا المعيار فإن "نجاح إدارة المخاطر في الجامعة يعتمد على فاعلية الهيكل التنظيمي وضمان تنفيذ جميع إجراءات إدارة المخاطر وعملياتها وأنشطتها ضمن الهيكل التنظيمي وفي إطار الوحدات الأكاديمية والإدارية في الجامعة".'
          },
          'journal': {
            title: 'مجلة جامعة مؤتة',
            img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&q=80',
            text: 'مجلة جامعة مؤتة للبحوث والدراسات هي مجلة علمية محكمة ومفهرسة تصدر عن عمادة البحث العلمي في جامعة مؤتة، وتُعنى بنشر الأبحاث العلمية الأصيلة في مختلف التخصصات العلمية والإنسانية.'
          }
        };
        const currentDetail = detailsMap[activeItem];
        
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
                <FileText className="text-[#0f3057] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#0f3057]">{currentDetail.title}</h2>
            </div>
            <img src={currentDetail.img} alt={currentDetail.title} className="w-full h-[300px] object-cover rounded-xl shadow-sm mb-8 border border-gray-100" />
            <div className="text-gray-700 leading-8 space-y-6 text-lg text-justify bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
              <p>{currentDetail.text}</p>
            </div>
            
            <Button className="bg-[#c9a227] hover:bg-[#b08d20] text-white">
              <Download size={18} className="ml-2" />
              تحميل ملف PDF
            </Button>
          </div>
        );

      case 'conduct':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
                <ShieldAlert className="text-[#0f3057] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#0f3057]">مدونات السلوك</h2>
            </div>
            <img src={aboutImg} alt="مدونات السلوك" className="w-full h-64 object-cover rounded-xl shadow-sm mb-10 border border-gray-100" />
            
            <div className="space-y-8">
              <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-[#0f3057]/5 p-4 border-b border-gray-100">
                  <h3 className="font-bold text-[#0f3057] text-xl">مدونة السلوك الأخلاقي لأعضاء هيئة التدريس</h3>
                </div>
                <div className="p-6 bg-white">
                  <p className="text-gray-700 leading-relaxed mb-6">تلتزم جامعة مؤتة بأقصى معايير السلوك الأخلاقي في جميع أنشطتها وذلك انطلاقاً من رسالة الجامعة وقيمها، بحيث يعكس سلوك أعضاء الهيئة التدريسية في الجامعة مبادئ: عدم الأنانية والنزاهة والموضوعية والمساءلة والانفتاح والصدق والقيادة. وتؤمن الجامعة إن القيام بمهام التدريس والبحث والخدمة العامة يتطلب التزاماً مشتركاً بالقيم الأساسية للجامعة بالإضافة إلى الالتزام بالسلوك الأخلاقي لجميع أنشطة الجامعة.</p>
                  <Button variant="outline" className="text-[#0f3057] border-[#0f3057] hover:bg-[#0f3057] hover:text-white">
                    <Download size={16} className="ml-2" />
                    مدونة السلوك الأخلاقي للمدرسين
                  </Button>
                </div>
              </div>

              <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-[#0f3057]/5 p-4 border-b border-gray-100">
                  <h3 className="font-bold text-[#0f3057] text-xl">مدونة السلوك الأخلاقي لأعضاء الهيئة الإدارية</h3>
                </div>
                <div className="p-6 bg-white">
                  <p className="text-gray-700 leading-relaxed mb-6">تهدف مدونة السلوك الأخلاقي إلى أن تكون وثيقة حية تعكس بأفضل شكل ثقافة وقيم جامعة مؤتة. وتصف معايير السلوك والنزاهة التي تتفق مع المهمة والقيم الأخلاقية التي يتبناها بيان رسالة جامعة مؤتة. تسري هذه المدونة على جميع أعضاء الهيئة الإدارية في جامعة مؤتة. وتهدف إلى توجيه هؤلاء الأفراد في تحديد وحل مسائل السلوك الأخلاقي التي قد تنشأ.</p>
                  <Button variant="outline" className="text-[#0f3057] border-[#0f3057] hover:bg-[#0f3057] hover:text-white">
                    <Download size={16} className="ml-2" />
                    مدونة السلوك الأخلاقي للموظفين
                  </Button>
                </div>
              </div>

              <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-[#0f3057]/5 p-4 border-b border-gray-100">
                  <h3 className="font-bold text-[#0f3057] text-xl">مدونة سلوك الطالب</h3>
                </div>
                <div className="p-6 bg-white">
                  <p className="text-gray-700 leading-relaxed mb-6"><strong>أهدافها:</strong> تهدف هذه المدونة إلى بيان قواعد السلوك المقبول للطلبة ومساعدتهم على فهم العواقب الناجمه عن انتهاك أو مخالفة تلك القواعد في البيئة التعليمية.</p>
                  <Button variant="outline" className="text-[#0f3057] border-[#0f3057] hover:bg-[#0f3057] hover:text-white">
                    <Download size={16} className="ml-2" />
                    تحميل ملف PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'report':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
                <FileText className="text-[#0f3057] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#0f3057]">التقرير السنوي</h2>
            </div>
            <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80" alt="التقرير السنوي" className="w-full h-64 object-cover rounded-xl shadow-sm mb-10 border border-gray-100" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['2022', '2021', '2020'].map((year) => (
                <div key={year} className="bg-gray-50 border border-gray-100 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all group hover:border-[#c9a227]/40">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <FileText size={24} className="text-[#0f3057] group-hover:text-[#c9a227] transition-colors" />
                  </div>
                  <h3 className="font-bold text-[#0f3057] text-lg mb-4">التقرير السنوي {year}</h3>
                  <Button variant="outline" className="w-full text-[#c9a227] border-[#c9a227] hover:bg-[#c9a227] hover:text-white">
                    <Download size={16} className="ml-2" />
                    تحميل PDF
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px] flex items-center justify-center">
            <div className="text-center text-gray-500">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <p>محتوى الصفحة قيد الإعداد.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] rtl bg-[#F5F7F9]"
      dir="rtl"
      style={{ "--sidebar-offset": sidebarOpen ? "320px" : "0px" } as React.CSSProperties}
    >

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed z-[45] flex items-center justify-center bg-[#c9a227] hover:bg-[#b08d20] text-[#0f3057] transition-all shadow-lg"
        style={{
          top: "85px",
          right: sidebarOpen ? "320px" : "0",
          width: "40px",
          height: "40px",
          borderRadius: "10px 0 0 10px",
          transition: "right 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
        aria-label="Toggle Sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar Navigation */}
      <div
        className="fixed top-0 right-0 h-full w-[320px] bg-[#0f3057] shadow-[2px_0_15px_rgba(0,0,0,0.1)] z-40 flex flex-col transition-transform duration-300"
        style={{ transform: sidebarOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="pt-[70px] px-6 pb-6 flex-1 overflow-y-auto no-scrollbar">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10 mt-6">
            <h2 className="text-xl font-bold text-white tracking-wide">عن الجامعة</h2>
          </div>

          <nav className="flex flex-col gap-2 relative z-50">
            {ABOUT_LINKS.map((link) => {
              const isActive = activeItem === link.id;
              const Icon = link.icon;

              return (
                <button
                  key={link.id}
                  onClick={() => handleTabClick(link.id)}
                  className="flex items-center gap-3 w-full px-4 py-3.5 transition-all text-right rounded-lg group"
                  style={{
                    background: isActive ? "rgba(201,162,39,0.15)" : "transparent",
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.7)",
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  <Icon size={18} style={{ color: isActive ? "#c9a227" : "rgba(255,255,255,0.5)" }} />
                  <span style={{ fontSize: "14.5px", flex: 1 }}>{link.name}</span>
                  {isActive && <ChevronLeft size={16} style={{ color: "#c9a227" }} />}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Page Content Wrapper */}
      <div 
        className="flex-1 flex flex-col transition-all min-w-0"
        style={{
          marginRight: sidebarOpen ? "320px" : "0",
          transition: "margin-right 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Full-width Page Hero */}
        <div className="relative overflow-hidden pt-[150px] pb-[80px] mb-[60px]">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#0f3057]/85 z-10" />
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="About Hero"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container relative z-20 mx-auto px-4 md:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                <Building size={16} className="text-[#c9a227]" />
                <span className="text-white/90 text-sm font-medium tracking-wide">
                  جامعة مؤتة - عن الجامعة
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {getSectionTitle(activeItem)}
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                تعرف على جامعة مؤتة، تاريخها، رؤيتها، وهيكلها التنظيمي وأبرز الخطط والتقارير الاستراتيجية.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 w-full relative z-10 mb-20 px-4 md:px-8 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
