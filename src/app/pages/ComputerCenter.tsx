import { useTabRoute } from "../nav";
import React, { useState } from 'react';
import { WireframeHeader } from '../components/WireframeHeader';
import { WireframeFooter } from '../components/WireframeFooter';
import { 
  ChevronRight, Search, User, Users, FileText, Menu, GraduationCap, 
  Coins, BookOpen, ChevronLeft, MapPin, Phone, Mail, Image as ImageIcon,
  Building, Calendar, Download, Info, ChevronDown, Monitor, Server, Wrench, Globe, Bell, Link as LinkIcon
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import structureImg from '../../imports/Org.png';
import { NewsCard, NewsGrid } from '@/app/components/NewsCard';
import { Breadcrumbs, navTrail } from '../components/Breadcrumbs';

const CENTER_LINKS = [
  { id: 'home', name: 'الرئيسية' },
  { 
    id: 'about', 
    name: 'عن المركز', 
    children: [
      { id: 'about-genesis', name: 'نبذة عن المركز' },
      { id: 'about-dean', name: 'كلمة مدير المركز' },
      { id: 'about-former', name: 'المدراء السابقون' },
      { id: 'about-staff', name: 'الموظفون' }
    ]
  },
  { 
    id: 'departments', 
    name: 'دوائر المركز', 
    children: [
      { id: 'dept-app', name: 'دائرة تطوير التطبيقات والنشر الإلكتروني' },
      { id: 'dept-net', name: 'دائرة الشبكات وادارة الانظمة' },
      { id: 'dept-support', name: 'دائرة الصيانة والدعم الفني' }
    ]
  },
  { id: 'structure', name: 'الهيكل التنظيمي' },
  { id: 'strategy', name: 'الاستيراتيجية' },
  { id: 'gallery', name: 'معرض الصور' },
  { id: 'forms', name: 'النماذج' },
  { id: 'contact', name: 'اتصل بنا' }
];

export function ComputerCenter() {
  try {
    return <ComputerCenterContent />;
  } catch (e: any) {
    return <div style={{ color: 'red', padding: 20 }}>Error rendering ComputerCenter: {e.message}</div>;
  }
}

function ComputerCenterContent() {
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


  const renderContent = () => {
    if (activeItem === 'home') {
      return (
        <div className="space-y-16">
          {/* About the Center Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
                <Info className="text-[#0f3057] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#0f3057]">نبذة عن المركز</h2>
            </div>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <p>تأسس مركز الحاسوب في جامعة مؤتة ليكون القلب التقني النابض للجامعة، حيث يتولى إدارة وتطوير البنية التحتية التكنولوجية وتقديم الخدمات الإلكترونية المتقدمة للطلبة وأعضاء الهيئة التدريسية والإدارية.</p>
              <p>نسعى باستمرار لتطوير الأنظمة والتطبيقات التي تسهل الإجراءات الأكاديمية والإدارية، ونضمن توفير شبكة اتصالات آمنة وسريعة تلبي احتياجات مجتمع الجامعة في عصر التحول الرقمي.</p>
            </div>
          </section>

          {/* Center Departments Cards Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#c9a227]/10 flex items-center justify-center">
                <Server className="text-[#c9a227] w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-[#0f3057]">دوائر المركز</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-[#c9a227]/30">
                <div className="w-14 h-14 rounded-xl bg-[#0f3057]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="text-[#0f3057] w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-3">دائرة تطوير التطبيقات والنشر الإلكتروني</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  تُعنى بتصميم وتطوير وبرمجة أنظمة الجامعة المختلفة وصيانتها، وإدارة محتوى الموقع الإلكتروني الرسمي وتطبيقات الهواتف الذكية.
                </p>
                <button 
                  onClick={() => { setExpandedTab('departments'); setActiveItem('dept-app'); }}
                  className="text-[#c9a227] font-medium flex items-center gap-2 hover:gap-3 transition-all text-sm"
                >
                  التفاصيل <ChevronLeft size={16} />
                </button>
              </div>

              <div className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-[#c9a227]/30">
                <div className="w-14 h-14 rounded-xl bg-[#0f3057]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Server className="text-[#0f3057] w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-3">دائرة الشبكات وادارة الانظمة</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  مسؤولة عن إدارة خوادم الجامعة وشبكة الإنترنت السلكية واللاسلكية، وضمان أمن المعلومات وحماية البيانات والموارد التقنية.
                </p>
                <button 
                  onClick={() => { setExpandedTab('departments'); setActiveItem('dept-net'); }}
                  className="text-[#c9a227] font-medium flex items-center gap-2 hover:gap-3 transition-all text-sm"
                >
                  التفاصيل <ChevronLeft size={16} />
                </button>
              </div>

              <div className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-[#c9a227]/30">
                <div className="w-14 h-14 rounded-xl bg-[#0f3057]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Wrench className="text-[#0f3057] w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-3">دائرة الصيانة والدعم الفني</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  تقدم خدمات الصيانة الوقائية والعلاجية لأجهزة الحاسوب وملحقاتها، وتوفر الدعم الفني المباشر للمستخدمين في كافة الكليات والدوائر.
                </p>
                <button 
                  onClick={() => { setExpandedTab('departments'); setActiveItem('dept-support'); }}
                  className="text-[#c9a227] font-medium flex items-center gap-2 hover:gap-3 transition-all text-sm"
                >
                  التفاصيل <ChevronLeft size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* News & Announcements Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0f3057]/5 flex items-center justify-center">
                    <FileText className="text-[#0f3057] w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0f3057]">الأخبار والأحداث</h2>
                </div>
                <Link to="/cc-list/news" className="text-[#c9a227] hover:text-[#b08d20] hover:bg-[#c9a227]/10 text-sm font-medium px-3 py-2 rounded-lg">
                  عرض الكل
                </Link>
              </div>
              <div className="space-y-4">
                <NewsCard to="/cc-item/news/0" title="موقع الكتروني جديد يتناسب ومقتضيات المرحلة في الجامعة" date="3 ديسمبر 2019" img="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" />
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#c9a227]/10 flex items-center justify-center">
                    <Bell className="text-[#c9a227] w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0f3057]">معلومات تهمك</h2>
                </div>
                <Link to="/cc-list/info" className="text-[#c9a227] hover:text-[#b08d20] hover:bg-[#c9a227]/10 text-sm font-medium px-3 py-2 rounded-lg">
                  عرض الكل
                </Link>
              </div>
              <div className="space-y-4">
                <Link to="/cc-item/info/0" className="flex gap-4 group cursor-pointer p-4 bg-gray-50 hover:bg-[#0f3057]/5 rounded-xl transition-colors border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-[#0f3057]">
                    <Bell size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f3057] mb-1 group-hover:text-[#c9a227] transition-colors text-sm">
                      التعليم الالكتروني هو وسيلة حديثة تدعم التعليم
                    </h4>
                    <span className="text-xs text-gray-500">التعليم الالكتروني</span>
                  </div>
                </Link>
                <Link to="/cc-item/info/1" className="flex gap-4 group cursor-pointer p-4 bg-gray-50 hover:bg-[#0f3057]/5 rounded-xl transition-colors border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-[#0f3057]">
                    <Bell size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f3057] mb-1 group-hover:text-[#c9a227] transition-colors text-sm">
                      المواد المحوسبة بشكل كامل وتدرس من خلال موقع التعليم الالكتروني
                    </h4>
                    <span className="text-xs text-gray-500">المواد المحوسبة</span>
                  </div>
                </Link>
              </div>
            </section>
          </div>

          {/* General Info & Quick Links Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section className="bg-[#0f3057] rounded-2xl shadow-sm p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a227]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <Info className="text-[#c9a227] w-6 h-6" />
                  <h2 className="text-2xl font-bold text-white">معلومات عامة</h2>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-[#c9a227]" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">الموقع</h4>
                      <p className="text-white/70 text-sm">جامعة مؤتة، الكرك :: الأردن</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-[#c9a227]" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">الهاتف</h4>
                      <p className="text-white/70 text-sm">+(962) 3 2372380</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-[#c9a227]" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">البريد الإلكتروني</h4>
                      <p className="text-white/70 text-sm">CC@mutah.edu.jo</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-lg bg-[#0f3057]/5 flex items-center justify-center">
                  <LinkIcon className="text-[#0f3057] w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-[#0f3057]">روابط سريعة</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'التعليم الاكتروني',
                  'البريد الالكتروني',
                  'المواد المحوسبة',
                  'الخدمات الالكترونية'
                ].map((link, idx) => (
                  <a href="#" key={idx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#0f3057]/5 text-gray-700 hover:text-[#0f3057] font-medium transition-colors border border-transparent hover:border-gray-100">
                    <ChevronLeft size={16} className="text-[#c9a227]" />
                    <span className="text-sm">{link}</span>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      );
    }

    if (activeItem === 'about-genesis') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
              <Info className="text-[#0f3057] w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#0f3057]">نبذة عن مركز الحاسوب</h2>
          </div>
          <div className="text-gray-700 leading-8 space-y-6 text-lg">
            <p>انطلاقا من إيمان إدارة جامعة مؤتة بأهمية المعلوماتية والاتصالات وتكنولوجيا المعلومات في تطوير وتدعيم المؤسسات التعليمية, أنشئ مركز الحاسوب في الجامـعة منذ عام 1993 بغرض توظيف واســتخدام ومواكبة التطورالتكنولوجي في العمليتين الأكاديمية والادارية في الجامعة, والارتقاء بمستوى الأداء لكافة كلياتها و مراكزهاودوائرها والوصول إلى مكانة عالية للجامعة بين المؤسسات التعليمة الأخرى .</p>
            <p>ويشكل مركز الحاسوب في الجامعة احد المحاور الرئيسيه في مجال إستخدام تقنية المعلومات الحديثة في الجامعة لتطوير خدمات الجامعه ورفع سويتها التعليميه وتحقيق رؤيتها ورسالتها ودعم اصحاب القرار فيها بالمعلومه الدقيقه والتقارير التحليليه التي تساعدهم لاتخاذ القرار الصحيح في الوقت المناسب ، حيث يعمل المركز على مواكبة التطور السريع في مجال تكنولوجيا المعلومات ووضع الجامعة في مسار مواكبة هذا التطور.</p>
            <p>يقوم مركز الحاسوب بالعديد من المهام الاساسية في الجامعة للكادر الاكاديمي والاداري والطلبة على حد سواء ، حيث يقدم خدمة صيانة وتهيئة و تحديث شبكة الجامعة السلكية واللاسلكية ، حيث وصلت سرعة الانترنت المزودة للجامعة الى 600 ميغا بت / ثانية ، اضافة الى الخطوط الاحتياطية . كما ويعمل المركز على انشاء الانظمة و قواعد البيانات البيانات كنظام المالية ونظام القبول والتسجيل ونظام المركز الصحي ونظام عمادة شؤون الطلبة و غيرها من الانظمة المتعددة ، بالاضافة الى ذلك يقدم المركز خدمة الانترنت والبريد الإلكتروني والامتحانات الإلكترونية كما و يقوم المركز بالمشاركة في إعداد مواصفات العطاءات المتعلقة بالحواسيب والخوادم والشبكات ومتابعة دراستها و تنفيذها والاشراف عليها .</p>
            <p>كما و يحرص مركز الحاسوب على تطوير موقع الجامعة الإلكتروني والمواقع التابعة له، مثل مواقع الكليات والمراكز والدوائر المختلفة، وإنشاء بوابات إلكترونية لاعضاء الهيئة التدريسية والموظفين والطلاب لتقديم الخدمات المختلفة.</p>
            <p>اضافة الى هذه الخدمات تقوم دائرة الصيانة والدعم الفني في المركز بتقديم خدمات الدعم الفني والصيانة لأجهزة الكمبيوتر وتوابعها المستخدمة في الجامعة من قبل أعضاء الهيئتين التدريسية والإدارية والطلبة. كما تقوم بتوفير المختبرات اللازمة لخدمة الطلبة، والعمل على تحديثها، لتواكب متطلبات العصر.</p>
            <p>علاوة على ذلك تم استحداث دائرة التخطيط و التدريب و المراكز لمتابعة جميع برامج التدريب المتعلقة بالمركز و كوادره بالاضافة الى متابعة جميع برامج التدريب الخاصة بطلبة هندسة الحاسوب وهندسة الاتصالات و طلبة تكنولوجيا المعلومات ، كما تقوم هذه الدائرة بمتابعة برامج التدريب المدعومة من وزارة الاشغال العامة والاسكان ووزارة تكنولوجيا المعلومات ونقابة المهندسين الادنيين.</p>
          </div>
        </div>
      );
    }

    if (activeItem === 'about-dean') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
              <Users className="text-[#0f3057] w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#0f3057]">كلمة مدير المركز</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3 shrink-0">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="مدير المركز" className="w-full aspect-[3/4] object-cover rounded-2xl shadow-md border-4 border-white" />
              <div className="text-center mt-4">
                <h3 className="text-xl font-bold text-[#0f3057]">المعتز ممدوح المبيضين</h3>
                <p className="text-[#c9a227] font-medium">مدير مركز الحاسوب</p>
              </div>
            </div>
            <div className="w-full md:w-2/3 text-gray-700 leading-8 space-y-6 text-lg">
              <p>يعتبر مركز الحاسوب منذ انطلاقته عام 1993 البوابة الإلكترونية لجامعة مؤته والتي من خلالها يتم دعم وتقديم جميع الخدمات الالكترونية للطلبة والعاملين في الجامعة. إن مركز الحاسوب من خلال شعبه المختلفة يضطلع بدور اساسي ومهم في تقديم الخدمة الإلكترونية بأحدث الوسائل والتقنيات التكنولوجية المتنوعة، حيث يتبنى مركز الحاسوب من خلال كادره المؤهل حوسبة وصيانة جميع البرمجيات التي تسهل إجراءات تقديم الخدمة للطلبة والعاملين بحرفية ومسؤولية عالية.</p>
              <p>وانطلاقا من توجهات إدارة الجامعة ممثلة بعطوفة رئيس الجامعة يقوم مركز الحاسوب بدور ريادي من خلال تبنية لمنظومة متكاملة من البرامج الموجهة للطلبة وايضا لكافة دوائر الجامعة الاكاديمية والإدارية والخدمة. هذا ويسعى مركز الحاسوب للتشاركية مع مختلف الجامعات الوطنية وكذلك الشركات العالمية في قطاع تكنولوجيا المعلومات والاتصالات من خلال تبادل الخبرات والزيارات العلمية لنقل المعرفة وتوظيفها لخدمة جامعتنا الحبيبة وتحقيق اعلى معايير الجودة على المستوى المحلي والعالمي.</p>
              <p>إن مركز الحاسوب في جامعة مؤتة يحتل مكانه مرموقة على مستوى الجامعات الوطنية في تكامل الخدمات وتلبيتها الحاجة المتزايدة لتوظيف الامكانيات التكنولوجيا الحديثة في عمل الجامعات على الصعيد الأكاديمي والإداري ممثله بأعضاء الهيئتين التدريسية والإدارية والركن الأساسي وهم الطلبة.</p>
              <p>اخيرا لا يسعني الا تقديم الشكر والثناء على الجنود المجهولين كادر مركز الحاسوب الذين يواصلون العمل ليلا ونهارا لتقديم خدمات متميزة ترتقي إلى غايات رؤية ورسالة الجامعة من خلال إدارتها الرشيدة.</p>
            </div>
          </div>
        </div>
      );
    }

    if (activeItem === 'dept-app') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
              <Globe className="text-[#0f3057] w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#0f3057]">دائرة تطوير التطبيقات والنشر الإلكتروني</h2>
          </div>
          <div className="text-gray-700 leading-8 space-y-6 text-lg">
            <p>تعنى دائرة التحليل و البرمجة بإعداد البرامج والأنظمة التي تحتاجها مرافق الجامعة المختلفة من وكليات، عمادات، مراكز، وحدات ودوائر لإنجاز عملها حسب طلب كل دائرة كما تقوم الدائرة بالربط بين الدوائر المختلفة, من خلال البرامج التي تعدها وذلك لتحقيق هدف الدقة في العمل، وترابط المعلومات وبذلك يسهل على الدوائر المعنية انجاز عملها، كما تزود الدائرة مؤسسات الدولة والوزارات بما تحتاجه من معلومات من قواعد البيانات المتوفرة لديها.</p>
            
            <h3 className="text-xl font-bold text-[#0f3057] mt-8">انجازات الدائرة</h3>
            <p>أعدت الدائرة مجموعة من الأنظمة المحوسبة العاملة في دوائر الجامعة المختلفة ومنها:</p>
            <ul className="list-disc list-inside pr-6 space-y-2">
              <li>نظام الموارد البشرية وتعمل عليه دائرة الموارد البشرية.</li>
              <li>الأنظمة المالية الخاصة بالدائرة المالية ومنها الرواتب، النفقات، الموازنة، الصناديق، الرسوم.</li>
              <li>نظام القبول والتسجيل ونظام التسجيل الألكتروني العامل لدى وحدة القبول والتسجيل.</li>
              <li>نظام اللوازم والذي يعمل في دائرة اللوازم كمستودعات رئيسية ونظام آخر خاص بالمستودعات الفرعية.</li>
              <li>نظام المركز الصحي والصيدلية لدى المركز الصحي.</li>
              <li>مجموعة من الأنظمة التي تعمل لدى عمادة شؤون الطلبة ومنها: بطاقة أحوال الطالب، التشغيل، القروض.</li>
              <li>نظام العطاءات المركزية والعطاءات الفرعية لدى دائرة العطاءات.</li>
              <li>نظام البحث العلمي الذي يعمل لدى عمادة البحث العلمي.</li>
              <li>نظام النقل والميكانيك الذي يعمل لدى شعبة الحركة والكراج.</li>
              <li>نظام المقسم و هو ما يعرف بلجنة تدقيق الهواتف العامل في المقسم.</li>
              <li>برنامج الدراسات العليا العامل في كلية الدراسات العليا.</li>
              <li>البوابات الألكترونية وتتضمن: نظام الهيئة التدريسية، نظام الخدمات الألكترونية للموظفين والطلبة، بوابة الرئاسة.</li>
            </ul>

            <h3 className="text-xl font-bold text-[#0f3057] mt-8 mb-4">كادر الدائرة</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-[#0f3057] text-white">
                    <th className="p-3 rounded-tr-lg">الاسم</th>
                    <th className="p-3">المسمى الوظيفي</th>
                    <th className="p-3">الهاتف</th>
                    <th className="p-3 rounded-tl-lg">البريد الالكتروني</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">سناء الطراونه</td><td className="p-3">مديرة دائرة</td><td className="p-3">3047</td><td className="p-3">sana@mutah.edu.jo</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">عرين السبوع</td><td className="p-3">محلل انظمه / رئيس شعبة</td><td className="p-3">3627</td><td className="p-3">areens@mutah.edu.jo</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">ايهاب المحادين</td><td className="p-3">رئيس شعبة قواعد البيانات</td><td className="p-3">3627</td><td className="p-3">mahadeen_eyhab@mutah.edu.jo</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">علي العضايلة</td><td className="p-3">رئيس شعبة النشر الإلكتروني</td><td className="p-3">3045</td><td className="p-3">adaileh@mutah.edu.jo</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">ايناس القطاونه</td><td className="p-3">مبرمج</td><td className="p-3">3550</td><td className="p-3">enas_q@mutah.edu.jo</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">جمانة الملاحمه</td><td className="p-3">مبرمج</td><td className="p-3">3550</td><td className="p-3">Jomana_k@mutah.edu.jo</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">وسام الصناع</td><td className="p-3">مبرمج</td><td className="p-3">3550</td><td className="p-3">wsunna@mutah.edu.jo</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3">احمد اكريم الضمور</td><td className="p-3">مبرمج</td><td className="p-3">3550</td><td className="p-3">ahmadkrayyim@mutah.edu.jo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }


    if (activeItem === 'dept-net') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
              <Server className="text-[#0f3057] w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#0f3057]">دائرة الشبكات وإدارة الأنظمة</h2>
          </div>
          <div className="text-gray-700 leading-8 space-y-6 text-lg">
            <p>تعد دائرة الشبكات وادارة الانظمة من الدوائر الحيوية والمهمة في الجامعة ويعود ذلك الى نوعية الخدمات التي تقدمها هذه الدائرة ، اذ تشمل هذه الخدمات تركيب الشبكات السلكية واللاسلكية داخل كليات ووحدات و مراكز الجامعة المختلفة و الحفاظ على ديمومة عملها بالشكل المطلوب و متابعة عمل الخوادم الموجودة في مركز الحاسوب والعمل على صيانتها و تحديثها بشكل مستمر.</p>
            
            <h3 className="text-xl font-bold text-[#0f3057] mt-8">الانجازات</h3>
            <ul className="list-disc list-inside pr-6 space-y-2">
              <li>تقوم الدائرة بشعبها المختلفة بادارة شبكة الجامعه السلكية واللاسلكية وصيانتها وتحديثها اول بأول للتتماشى مع التكنولوجية الحديثة، كما تقوم بادارة الانظمة الحاسوبية العاملة في الجامعه.</li>
              <li>دراسة العطاءات المتعددة المتعلقة بتوريد و تركيب و تشغيل الخوادم و الموزعات الرئيسية و الفرعية للجامعة و ملحقاتها.</li>
              <li>تقديم الدراسات الفنية المفصلة عن مد شبكة الانترنت داخل الحرم الجامعي و شراء الخوادم المطلوبة لمركز الحاسوب و تقديم التكلفة المالية التقريبية وذلك اعتمادا على عمل المسح الميداني للتعرف على حاجات الجامعة ومتطلباتها.</li>
              <li>تحديث وتطوير البرمجيات المسؤولة عن البريد الالكتروني ليتماشى والتكنولوجيا الحديثة.</li>
              <li>متابعة برامج النسخ الاحتياطي لقواعد البيانات والخاصة برفع النسخ الاحتياطية لجميع الانظمة المحوسبة المعمول بها في الجامعة والايميلات والموقع الالكتروني.</li>
              <li>العمل على متابعة تجديد الاشتراكات السنوية لجميع البرمجيات المعمول بها داخل الجامعة.</li>
              <li>عمل دراسات وتقديم تقارير تتضمن مواصفات فنية لشراء الاجهزة المتنوعة من خوادم وموزعات بحيث تكون ذات مواصفات حديثة.</li>
              <li>الاشراف على متابعة وتركيب واستلام العطاءات المتعلقة بهذه الدائرة.</li>
              <li>القيام بعمل صيانة تفقدية دورية للاجهزة الموجودة في مركز الحاسوب وذلك بالتنسيق مع الشركات التي تقدم خدمة الكفالة على هذه الاجهزة.</li>
            </ul>

            <h3 className="text-xl font-bold text-[#0f3057] mt-8 mb-4">كادر الدائرة</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-[#0f3057] text-white">
                    <th className="p-3 rounded-tr-lg">الاسم</th>
                    <th className="p-3">المسمى الوظيفي</th>
                    <th className="p-3">الهاتف</th>
                    <th className="p-3 rounded-tl-lg">البريد الالكتروني</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">علي الطراونة</td><td className="p-3">مدير الدائرة</td><td className="p-3">3337</td><td className="p-3">ali@mutah.edu.jo</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">م.عابد الضلاعين</td><td className="p-3">رئيس شعبة الشبكات</td><td className="p-3">3337</td><td className="p-3">abedd@mutah.edu.jo</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">م.آيات الصرايره</td><td className="p-3">رئيس شعبة البربد الالكتروني</td><td className="p-3">3161</td><td className="p-3">Ayat_ace@mutah.edu.jo</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">عماد قلجة</td><td className="p-3">رئيس شعبة إدارة الانظمة</td><td className="p-3">3045</td><td className="p-3">qalaja@mutah.edu.jo</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">أنس النواصرة</td><td className="p-3">رئيس شعبة أمن المعلومات</td><td className="p-3">3337</td><td className="p-3">anas_man2002@mutah.edu.jo</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3">خالد الطراونه</td><td className="p-3">رئيس شعبة المراقبة الإلكترونية</td><td className="p-3">4655</td><td className="p-3">hmam_as@mutah.edu.jo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }


    if (activeItem === 'dept-support') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
              <Wrench className="text-[#0f3057] w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#0f3057]">دائرة الصيانة والدعم الفني</h2>
          </div>
          <div className="text-gray-700 leading-8 space-y-6 text-lg">
            <p>تعتبر الدائره مسؤوله عن جميع أعمال الصيانة اللازمه لأجهزة الحاسوب وملحقاتها من الطابعات وأجهزة المسح ضوئي وأجهزة العرض والتأكد من تشغيلها وضمان عملها بشكل جيد في جميع مرافق الجامعة بالإضافة إلى تنزيل البرمجيات اللازمة لتعمل جميع الأجهزة بشكل فعال.</p>
            
            <h3 className="text-xl font-bold text-[#0f3057] mt-8">إنجازات الدائرة</h3>
            <ol className="list-decimal list-inside pr-6 space-y-2">
              <li>وضع المواصفات الفنية للأجهزة وملحقاتها.</li>
              <li>دراسة العطاءات المتعلقة بتوريد و تركيب و تشغيل الأجهزه وملحقاتها.</li>
              <li>استلام الأجهزة والمستلزمات الخاصة بها وتركيبها وإعدادها للعمل.</li>
              <li>إعداد وتوفير النماذج الموثقة للعمل مثل (طلبات الصيانة، قسيمة الاستلام والتسليم).</li>
              <li>تخطيط الصيانة الدورية والوقائية للأجهزة وبرامج النظم ومتابعة تنفيذها وتوفير الدعم الفني لها.</li>
              <li>ضمان ربط أجهزة المستخدمين بشبكة المعلومات بالتنسيق مع دائرة الشبكات.</li>
              <li>متابعة الأعطال الطارئة والعمل على حلها.</li>
              <li>متابعة عقود الصيانة والتأكد من التزام الشركات بها.</li>
              <li>تركيب وتشغيل الأجهزة وبرامج النظم الخاصة بالمختبرات.</li>
              <li>تحديد احتياجات العمل والتوصية بتوفيرها بالتنسيق مع الجهات المختصة.</li>
              <li>متابعة التطورات في مجال أجهزة الحاسوب والبرامج والتوصية بالتحديثات اللازمة.</li>
              <li>عمل إحصاءات بإعداد وأنواع الأجهزة العاملة في الجامعة وإعداد التقارير الدورية عن المختبرات.</li>
              <li>وضع الخطط اللازمة لتحديث الأجهزة الحاسوبية اللازمة في الجامعة بشكل عام.</li>
            </ol>

            <h3 className="text-xl font-bold text-[#0f3057] mt-8 mb-4">كادر الدائرة</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-[#0f3057] text-white">
                    <th className="p-3 rounded-tr-lg">الاسم</th>
                    <th className="p-3">المسمى الوظيفي</th>
                    <th className="p-3 rounded-tl-lg">البريد الالكتروني</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">م.سمر عبدالكريم الضمور</td><td className="p-3">مديرة دائرة</td><td className="p-3">samar2005@mutah.edu.jo</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">محمود القضاه</td><td className="p-3">رئيس شعبة الدعم الفني</td><td className="p-3">mqudah@mutah.edu.jo</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">غادة المعايطة</td><td className="p-3">رئيس شعبة المراكز</td><td className="p-3">ghada@mutah.edu.jo</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">رغد الجرادات</td><td className="p-3">رئيس شعبة التدريب</td><td className="p-3">ragad78@mutah.edu.jo</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">مجدي الرواشده</td><td className="p-3">فني</td><td className="p-3">majdi@mutah.edu.jo</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="p-3">ايهاب العابد</td><td className="p-3">فني</td><td className="p-3">ehab@mutah.edu.jo</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }


    if (activeItem === 'about-former') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
              <Users className="text-[#0f3057] w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#0f3057]">المدراء السابقون</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'د. محمد الطراونة', period: '2015 - 2018' },
              { name: 'د. خالد الصرايرة', period: '2010 - 2015' },
              { name: 'د. رائد النوايسة', period: '2005 - 2010' },
            ].map((director, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border-2 border-[#c9a227]/20">
                  <User size={32} className="text-[#0f3057]" />
                </div>
                <h3 className="font-bold text-[#0f3057] text-lg mb-1">{director.name}</h3>
                <span className="text-[#c9a227] text-sm font-medium">{director.period}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeItem === 'about-staff') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
              <Users className="text-[#0f3057] w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#0f3057]">الهيئة الإدارية والموظفون</h2>
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full text-right text-sm">
              <thead className="bg-[#0f3057] text-white">
                <tr>
                  <th className="p-4 font-semibold">الاسم</th>
                  <th className="p-4 font-semibold">المسمى الوظيفي</th>
                  <th className="p-4 font-semibold">البريد الإلكتروني</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { name: 'أحمد المجالي', role: 'مساعد مدير المركز', email: 'ahmad.m@mutah.edu.jo' },
                  { name: 'فاطمة الكركي', role: 'رئيس ديوان المركز', email: 'fatima.k@mutah.edu.jo' },
                  { name: 'محمود الصعوب', role: 'إداري أول', email: 'mahmoud.s@mutah.edu.jo' },
                  { name: 'سناء الضمور', role: 'سكرتيرة المركز', email: 'sanaa.d@mutah.edu.jo' },
                ].map((staff, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-[#0f3057]">{staff.name}</td>
                    <td className="p-4 text-gray-600">{staff.role}</td>
                    <td className="p-4 text-[#c9a227]">{staff.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeItem === 'structure') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
              <Users className="text-[#0f3057] w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#0f3057]">الهيكل التنظيمي</h2>
          </div>
          <div className="flex justify-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
            <img src={structureImg} alt="الهيكل التنظيمي" className="w-full max-w-4xl max-h-[560px] object-contain rounded-lg shadow-sm border border-gray-100" />
          </div>
        </div>
      );
    }

    if (activeItem === 'strategy') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
              <FileText className="text-[#0f3057] w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#0f3057]">استراتيجية المركز</h2>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 border-r-4 border-r-[#c9a227]">
              <h3 className="text-xl font-bold text-[#0f3057] mb-3">الرؤية</h3>
              <p className="text-gray-700 leading-relaxed">
                الريادة والتميز في تقديم الخدمات التكنولوجية والرقمية لدعم مسيرة جامعة مؤتة نحو التحول الرقمي الشامل، وبناء بيئة تعليمية وإدارية ذكية ومبتكرة.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 border-r-4 border-r-[#0f3057]">
              <h3 className="text-xl font-bold text-[#0f3057] mb-3">الرسالة</h3>
              <p className="text-gray-700 leading-relaxed">
                تطوير وإدارة البنية التحتية لتكنولوجيا المعلومات والاتصالات في الجامعة، وتوفير أحدث الأنظمة والبرمجيات المتكاملة والآمنة التي تلبي احتياجات الطلبة وأعضاء الهيئة التدريسية والإدارية، مع الالتزام بأعلى معايير الجودة وخدمة المستفيدين.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0f3057] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c9a227]"></span>
                الأهداف الاستراتيجية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "أتمتة كافة الإجراءات الأكاديمية والإدارية في الجامعة.",
                  "توفير شبكة اتصالات سلكية ولاسلكية سريعة وموثوقة تغطي كافة مرافق الجامعة.",
                  "تعزيز منظومة أمن المعلومات وحماية البيانات الجامعية من الاختراقات.",
                  "تطوير منصات التعلم الإلكتروني ودعم تقنيات التعليم عن بعد.",
                  "رفع كفاءة وقدرات الكادر البشري في التعامل مع التقنيات الحديثة.",
                  "تقديم دعم فني سريع وفعال لكافة مستخدمي الأنظمة في الجامعة."
                ].map((goal, idx) => (
                  <div key={idx} className="flex gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 rounded-full bg-[#0f3057]/5 flex items-center justify-center shrink-0">
                      <span className="text-[#0f3057] font-bold">{idx + 1}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed pt-1">{goal}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeItem === 'gallery') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
              <ImageIcon className="text-[#0f3057] w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#0f3057]">معرض الصور</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
              "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
              "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
              "https://images.unsplash.com/photo-1531482615713-2afd69097998",
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
              "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
            ].map((img, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden shadow-sm aspect-video bg-gray-100 cursor-pointer">
                <img 
                  src={`${img}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`} 
                  alt={`صورة ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeItem === 'forms') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
              <FileText className="text-[#0f3057] w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#0f3057]">النماذج الإلكترونية</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'نموذج طلب بريد إلكتروني رسمي', 
              'نموذج طلب استضافة موقع فرعي', 
              'نموذج الدعم الفني والصيانة', 
              'نموذج طلب صلاحيات على الأنظمة', 
              'نموذج براءة ذمة إلكترونية',
              'نموذج طلب خدمة شبكة إنترنت'
            ].map((form, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-[#c9a227]/40 hover:shadow-md transition-all group">
                <div className="flex items-center gap-3">
                  <FileText className="text-gray-400 group-hover:text-[#0f3057] transition-colors" size={20} />
                  <span className="font-medium text-gray-700 group-hover:text-[#0f3057] transition-colors">{form}</span>
                </div>
                <Button size="sm" variant="ghost" className="text-[#c9a227] hover:bg-[#c9a227]/10">
                  تحميل
                </Button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeItem === 'contact') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
              <Phone className="text-[#0f3057] w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#0f3057]">اتصل بنا</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-8 bg-gray-50 rounded-3xl flex flex-col items-center text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-[#c9a227]">
                <Phone size={24} />
              </div>
              <h3 className="font-bold text-[#0f3057] mb-2">الهاتف</h3>
              <p className="text-gray-600 font-medium dir-ltr">+(962) 3 2372380</p>
              <p className="text-gray-500 text-sm mt-1">فرعي: 3337</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-3xl flex flex-col items-center text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-[#c9a227]">
                <Mail size={24} />
              </div>
              <h3 className="font-bold text-[#0f3057] mb-2">البريد الإلكتروني</h3>
              <p className="text-gray-600 font-medium">CC@mutah.edu.jo</p>
            </div>
            <div className="p-8 bg-gray-50 rounded-3xl flex flex-col items-center text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-[#c9a227]">
                <MapPin size={24} />
              </div>
              <h3 className="font-bold text-[#0f3057] mb-2">الموقع</h3>
              <p className="text-gray-600 font-medium">جامعة مؤتة - الكرك</p>
              <p className="text-gray-500 text-sm mt-1">مبنى عمادة شؤون الطلبة - الطابق الأرضي</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-1">بحاجة إلى مساعدة تقنية سريعة؟</h3>
              <p className="text-gray-600 text-sm">يمكنك تقديم طلب دعم فني إلكتروني عبر نظام الدعم الفني الخاص بالجامعة.</p>
            </div>
            <Button className="bg-[#c9a227] hover:bg-[#b08d20] text-white">
              تقديم طلب دعم فني
            </Button>
          </div>
        </div>
      );
    }

    // Default placeholder for unpopulated tabs
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
            <FileText className="text-[#0f3057] w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#0f3057]">{getSectionTitle(activeItem, CENTER_LINKS)}</h2>
        </div>
        <div className="text-gray-500 flex flex-col items-center justify-center h-[250px] gap-4">
          <ImageIcon size={48} className="text-gray-300" />
          <p>محتوى الصفحة قيد الإعداد والإضافة.</p>
          <Button 
            variant="outline" 
            onClick={() => setActiveItem('home')}
            className="mt-4 border-[#0f3057] text-[#0f3057] hover:bg-[#0f3057] hover:text-white"
          >
            العودة للرئيسية
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] rtl bg-[#F5F7F9]"
      dir="rtl"
      style={{ "--sidebar-offset": sidebarOpen ? "320px" : "0px" } as React.CSSProperties}
    >
      <WireframeHeader />

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
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-white tracking-wide">مركز الحاسوب</h2>
          </div>

          <nav className="flex flex-col gap-2 relative z-50">
            {CENTER_LINKS.map((link) => {
              const hasChildren = !!link.children;
              const isChildActive = hasChildren && link.children!.some((child: any) => 
                child.id === activeItem || (child.children && child.children.some((c: any) => c.id === activeItem))
              );
              const isActive = activeItem === link.id || isChildActive;
              const isExpanded = expandedTab === link.id || isChildActive;

              return (
                <div key={link.id} className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      if (hasChildren) {
                        setExpandedTab(isExpanded && !isChildActive ? null : link.id);
                        if (!isChildActive) setActiveItem(link.children![0].id);
                      } else {
                        setActiveItem(link.id);
                        setExpandedTab(null);
                      }
                    }}
                    className="flex items-center justify-between w-full px-4 py-3 transition-all text-right rounded-lg group relative overflow-hidden"
                    style={{
                      background: isActive ? "rgba(201,162,39,0.1)" : "transparent",
                      color: isActive ? "#ffffff" : "rgba(255,255,255,0.7)",
                      fontWeight: isActive ? 700 : 500,
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
                      {link.children!.map((child: any) => {
                        const hasSubChildren = !!child.children;
                        const isChildExpanded = expandedTab === child.id || (hasSubChildren && child.children.some((c: any) => c.id === activeItem));
                        const isChildItemActive = hasSubChildren ? isChildExpanded : activeItem === child.id;

                        return (
                          <div key={child.id} className="flex flex-col gap-1">
                            <button
                              onClick={() => {
                                if (hasSubChildren) {
                                  setExpandedTab(isChildExpanded ? link.id : child.id);
                                }
                                setActiveItem(child.id);
                              }}
                              className="flex items-center justify-between w-full px-4 py-2.5 transition-all text-right rounded-lg"
                              style={{
                                background: isChildItemActive && !hasSubChildren ? "rgba(201,162,39,0.15)" : "transparent",
                                color: isChildItemActive ? "#ffffff" : "rgba(255,255,255,0.6)",
                                fontWeight: isChildItemActive ? 700 : 500,
                              }}
                            >
                              <span style={{ fontSize: "13.5px" }}>{child.name}</span>
                              {hasSubChildren ? (
                                <ChevronDown
                                  size={14}
                                  style={{
                                    color: isChildItemActive ? "#c9a227" : "rgba(255,255,255,0.4)",
                                    transform: isChildExpanded ? "rotate(180deg)" : "rotate(90deg)",
                                    transition: "transform 0.2s",
                                  }}
                                />
                              ) : (
                                isChildItemActive && <ChevronLeft size={14} style={{ color: "#c9a227" }} />
                              )}
                            </button>
                            {hasSubChildren && isChildExpanded && (
                              <div className="flex flex-col gap-1 pr-4 border-r-2 border-white/10 mr-2 py-1">
                                {child.children.map((subChild: any) => {
                                  const isSubActive = activeItem === subChild.id;
                                  return (
                                    <button
                                      key={subChild.id}
                                      onClick={() => setActiveItem(subChild.id)}
                                      className="flex items-center justify-between w-full px-4 py-2 transition-all text-right rounded-lg"
                                      style={{
                                        background: isSubActive ? "rgba(201,162,39,0.15)" : "transparent",
                                        color: isSubActive ? "#ffffff" : "rgba(255,255,255,0.5)",
                                        fontWeight: isSubActive ? 700 : 500,
                                      }}
                                    >
                                      <span style={{ fontSize: "12.5px" }}>{subChild.name}</span>
                                      {isSubActive && <ChevronLeft size={14} style={{ color: "#c9a227" }} />}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
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
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Computer Center Hero"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container relative z-20 mx-auto px-4 md:px-8">
            <div className="max-w-4xl">
              <Breadcrumbs className="mb-6" items={[{ label: 'مركز الحاسوب', onClick: () => setActiveItem('home') }, ...navTrail(CENTER_LINKS as any, activeItem).filter((n: any) => n.id !== 'home').map((n: any) => ({ label: n.name }))]} />
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                <Monitor size={16} className="text-[#c9a227]" />
                <span className="text-white/90 text-sm font-medium tracking-wide">
                  جامعة مؤتة - مركز الحاسوب
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {activeItem === 'home' ? 'مركز الحاسوب' : getSectionTitle(activeItem, CENTER_LINKS)}
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                {activeItem === 'home' 
                  ? 'نعمل على تقديم أفضل الخدمات التقنية والفنية لتطوير المنظومة التكنولوجية في جامعة مؤتة، ودعم المسيرة الأكاديمية والإدارية.'
                  : 'توفير بيئة تكنولوجية متطورة تلبي احتياجات الجامعة.'}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
          <div className="flex-1 w-full relative z-10 mb-20 px-4 md:px-8 max-w-7xl mx-auto">
            {renderContent()}
          </div>
        <WireframeFooter />
      </div>
    </div>
  );
}
