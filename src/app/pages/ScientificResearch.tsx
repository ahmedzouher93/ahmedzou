import { useTabRoute } from "../nav";
import React, { useState } from 'react';
import { WireframeHeader } from '../components/WireframeHeader';
import { WireframeFooter } from '../components/WireframeFooter';
import { 
  ChevronRight, Menu, BookOpen, FileText, Download, 
  ChevronLeft, Layout, Globe, Search, Link as LinkIcon, AlertCircle, Calendar, ChevronDown, Info,
  Users, Mail, Phone, MapPin, Target, Eye, Shield, CheckCircle, BarChart, 
  Briefcase, Star, Clock, File, ExternalLink, List, Award, TrendingUp, Lightbulb, Map
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { NewsCard, NewsGrid } from '@/app/components/NewsCard';
import { Breadcrumbs, navTrail } from '../components/Breadcrumbs';

function DocRow({ name, type = 'PDF' }: { name: string; type?: string }) {
  return (
    <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-3.5 hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
      <div className="w-9 h-9 rounded-lg bg-[#0f3057]/8 flex items-center justify-center shrink-0">
        <FileText size={16} className="text-[#0f3057]" />
      </div>
      <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-snug">{name}</p>
      <span className="text-[10px] font-bold text-gray-400">{type}</span>
      <Download size={15} className="text-[#c9a227] shrink-0" />
    </div>
  );
}

function NumList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((d, i) => (
        <div key={i} className="flex items-start gap-3 bg-[#F8FAFC] border border-gray-100 rounded-xl px-5 py-3.5">
          <span className="w-6 h-6 rounded-full bg-[#0f3057] text-[#c9a227] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
          <p className="text-sm text-gray-700 leading-relaxed">{d}</p>
        </div>
      ))}
    </div>
  );
}

function Waiting({ label = 'الصفحة بانتظار المحتوى.' }: { label?: string }) {
  return (
    <div className="flex items-start gap-3 bg-[#F8FAFC] border border-dashed border-gray-200 rounded-2xl px-6 py-8">
      <Info size={18} className="text-gray-400 shrink-0 mt-0.5" />
      <p className="text-sm text-gray-500 leading-relaxed">{label}</p>
    </div>
  );
}

const RESEARCH_LINKS = [
  { id: 'home', name: 'الرئيسية' },
  { 
    id: 'about', 
    name: 'عن العمادة', 
    children: [
      { id: 'about-dean', name: 'كلمة العميد' },
      { id: 'about-vision', name: 'الرؤية والرسالة والقيم' },
      { id: 'about-plan', name: 'الخطة الاستراتيجية' },
      { id: 'about-office', name: 'مكتب العميد' },
      { id: 'about-structure', name: 'هيكل العمادة والوصف الوظيفي' },
      { id: 'about-goals', name: 'الغايات والأهداف' },
      { id: 'about-former', name: 'العمداء السابقون' },
      { id: 'about-committees', name: 'اللجان الوطنية' },
      { id: 'about-staff', name: 'طاقم العمادة' },
      { id: 'about-contact', name: 'اتصل بنا' }
    ]
  },
  { id: 'rankings', name: 'التصنيفات' },
  { 
    id: 'research', 
    name: 'البحث العلمي',
    children: [
      { id: 'res-committee', name: 'لجنة البحث العلمي' },
      { id: 'res-plan', name: 'الخطة الاستراتيجية' },
      { id: 'res-guide', name: 'دليل البحث العلمي' },
      { id: 'res-priorities', name: 'أولويات البحث العلمي' },
      { id: 'res-support-proj', name: 'دعم الأبحاث والمشاريع العلمية' },
      { id: 'res-support-conf', name: 'دعم المؤتمرات' },
      { id: 'res-support-pub', name: 'دعم النشر' },
      { id: 'res-support-trans', name: 'دعم الترجمة' },
      { id: 'res-sponsors', name: 'الجهات الداعمة للبحث العلمي' },
      { id: 'res-ip', name: 'مكتب حماية الملكية الفكرية ونقل التكنولوجيا' },
      { id: 'res-sustainability', name: 'الاستدامة' },
      { id: 'res-stats', name: 'إحصائيات وأرقام' }
    ]
  },
  { 
    id: 'journals', 
    name: 'المجلات',
    children: [
      { id: 'jour-humanities', name: 'مجلة مؤتة للدراسات الإنسانية والاجتماعية', url: 'https://dsr.mutah.edu.jo/index.php/hsss/en' },
      { id: 'jour-science', name: 'مجلة مؤتة للعلوم الطبيعية والتطبيقية والصحية', url: 'https://dsr.mutah.edu.jo/index.php/nass/en' },
      { id: 'jour-arabic', name: 'المجلة الأردنية في اللغة العربية وآدابها', url: 'https://dsr.mutah.edu.jo/index.php/jjall/en' },
      { id: 'jour-law', name: 'المجلة الأردنية في القانون والعلوم السياسية', url: 'https://dsr.mutah.edu.jo/index.php/jjlps/en' },
      { id: 'jour-energy', name: 'المجلة الأردنية للطاقة', url: 'https://dsr.mutah.edu.jo/index.php/jje' },
      { id: 'jour-security', name: 'مجلة الدراسات الأمنية', url: 'https://amenservices.psd.gov.jo/ojs2/index.php/ssj' }
    ]
  },
  { 
    id: 'publications', 
    name: 'النشر والإصدارات',
    children: [
      { id: 'pub-issues', name: 'الإصدارات' },
      { id: 'pub-gift', name: 'الإهداء والتبادل' },
      { id: 'pub-subs', name: 'الاشتراكات' },
      { id: 'pub-agree', name: 'اتفاقيات النشر الإلكتروني' },
      { id: 'pub-fairs', name: 'المعارض' }
    ]
  },
  { id: 'regulations', name: 'الأنظمة والتعليمات' },
  { 
    id: 'forms', 
    name: 'النماذج والإجراءات',
    children: [
      { id: 'forms-forms', name: 'النماذج' },
      { id: 'forms-procs', name: 'الإجراءات' }
    ]
  },
  { 
    id: 'services', 
    name: 'الخدمات الإلكترونية',
    children: [
      { id: 'srv-eresearch', name: 'خدمات البحث العلمي الإلكتروني' },
      { id: 'srv-proj-sys', name: 'نظام التقدم للمشاريع' },
      { id: 'srv-scopus', name: 'SCOPUS' },
      { id: 'srv-google', name: 'Google Scholar' },
      { id: 'srv-researchgate', name: 'ResearchGate' },
      { id: 'srv-equip', name: 'البحث عن الأجهزة' }
    ]
  },
  { 
    id: 'production', 
    name: 'الإنتاج العلمي',
    children: [
      { id: 'prod-db', name: 'قاعدة البيانات' },
      { id: 'prod-univ-proj', name: 'المشاريع المدعومة من الجامعة' },
      { id: 'prod-fund-proj', name: 'المشاريع المدعومة من صندوق دعم البحث العلمي' },
      { id: 'prod-ext-proj', name: 'المشاريع المدعومة خارجياً' }
    ]
  }
];

export function ScientificResearch() {
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
    switch (activeItem) {
      case 'home':
        return (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* About Section - Hero Style */}
            <div className="bg-gradient-to-br from-[#0f3057] to-[#153e71] rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl border border-[#0f3057]/20 flex flex-col md:flex-row gap-10 items-center">
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#c9a227] rounded-full blur-[80px] opacity-20 -z-0 translate-x-1/2 -translate-y-1/2"></div>
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-white/10 shadow-2xl overflow-hidden shrink-0 relative z-10">
                <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80" alt="Research" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 relative z-10 text-center md:text-right">
                <div className="inline-flex items-center gap-2 text-[#c9a227] font-bold mb-4 bg-[#c9a227]/10 px-4 py-1.5 rounded-full text-sm border border-[#c9a227]/20">
                  مرحباً بكم في عمادة البحث العلمي
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-4 leading-tight">ندعم الابتكار والبحث العلمي<br />لأجل مستقبل مشرق</h2>
                <p className="text-white/80 leading-relaxed text-lg mb-6 max-w-2xl">
                  نسعى في عمادة البحث العلمي إلى توفير بيئة محفزة للباحثين، ودعم المشاريع العلمية الرائدة التي تسهم في خدمة المجتمع ورفع مكانة الجامعة محلياً ودولياً.
                </p>
                <Button onClick={() => setActiveItem('about-dean')} className="bg-[#c9a227] text-[#0f3057] hover:bg-[#b08d20] font-bold rounded-xl px-8 shadow-lg hover:shadow-xl transition-all">
                  تعرف على العمادة
                </Button>
              </div>
            </div>

            {/* Quick Links grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: 'res-guide', title: 'دليل البحث العلمي', icon: <BookOpen className="text-white w-6 h-6" />, bg: 'bg-[#0f3057]' },
                { id: 'srv-proj-sys', title: 'نظام المشاريع', icon: <Briefcase className="text-white w-6 h-6" />, bg: 'bg-[#c9a227]' },
                { id: 'forms-forms', title: 'النماذج والإجراءات', icon: <FileText className="text-[#0f3057] w-6 h-6" />, bg: 'bg-white border-2 border-gray-100 hover:border-[#c9a227]', text: 'text-[#0f3057]' },
                { id: 'srv-eresearch', title: 'الخدمات الإلكترونية', icon: <Globe className="text-[#0f3057] w-6 h-6" />, bg: 'bg-white border-2 border-gray-100 hover:border-[#c9a227]', text: 'text-[#0f3057]' }
              ].map((link, i) => (
                <button key={i} onClick={() => setActiveItem(link.id)} className={`${link.bg} rounded-2xl p-6 text-right transition-all hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col gap-4 group`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${link.bg === 'bg-[#0f3057]' || link.bg === 'bg-[#c9a227]' ? 'bg-white/20' : 'bg-[#0f3057]/5'}`}>
                    {link.icon}
                  </div>
                  <h3 className={`font-bold text-lg ${link.text || (link.bg === 'bg-[#0f3057]' || link.bg === 'bg-[#c9a227]' ? 'text-white' : 'text-[#0f3057]')}`}>
                    {link.title}
                  </h3>
                </button>
              ))}
            </div>

            {/* Split Section: News & Announcements */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* News - takes 7 columns */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgba(15,48,87,0.04)]">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#0f3057]/5 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-[#0f3057]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#0f3057]">الأخبار والأحداث</h2>
                  </div>
                  <Link to="/r-list/news" className="text-[#c9a227] text-sm font-bold px-3 py-2 rounded-lg hover:bg-[#c9a227]/10 transition-colors">عرض الكل</Link>
                </div>
                
                <NewsGrid>
                  {[
                    { date: "٢٢ أكتوبر ٢٠٢٤", title: "دعوة لتقديم مقترحات بحثية لعام 2024", desc: "تعلن عمادة البحث العلمي عن فتح باب التقدم للمنح البحثية الداخلية لأعضاء الهيئة التدريسية المتميزين في كافة الكليات لتطوير مشاريعهم المبتكرة..." },
                    { date: "١٥ أكتوبر ٢٠٢٤", title: "ورشة عمل حول النشر العلمي", desc: "تنظم العمادة ورشة عمل متخصصة حول أسس ومعايير النشر في المجلات العالمية المرموقة، وتجنب المجلات الوهمية، بمشاركة خبراء من قواعد بيانات دولية..." }
                  ].map((news, i) => (
                    <NewsCard key={i} to={"/r-item/news/" + i} title={news.title} date={news.date} img={(news as any).img} excerpt={news.desc} />
                  ))}
                </NewsGrid>
              </div>

              {/* Announcements - takes 5 columns */}
              <div className="lg:col-span-5 bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgba(15,48,87,0.04)] h-full">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-[#c9a227]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#0f3057]">إعلانات هامة</h2>
                  </div>
                  <Link to="/r-list/announcements" className="text-[#c9a227] text-sm font-bold px-3 py-2 rounded-lg hover:bg-white transition-colors">عرض الكل</Link>
                </div>

                <ul className="space-y-4 relative before:absolute before:right-3 before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-200">
                  {[
                    { title: "تمديد فترة استقبال الأبحاث المدعومة", desc: "تم تمديد الفترة حتى نهاية الشهر الحالي لإعطاء الباحثين فرصة إضافية." },
                    { title: "إعلان جوائز البحث العلمي المتميز", desc: "سيتم تكريم الفائزين بالجوائز البحثية لعام 2023 الأسبوع القادم في مدرج عمادة شؤون الطلبة." },
                    { title: "تحديث تعليمات النشر", desc: "يرجى الاطلاع على التعليمات الجديدة المتعلقة بدعم النشر العلمي ورسومه." }
                  ].map((ann, i) => (
                    <li key={i} className="relative group">
                      <Link to={"/r-item/announcements/" + i} className="block pr-8 pl-4 py-2 hover:bg-white rounded-xl transition-colors">
                      <div className="absolute right-[9px] top-4 w-2.5 h-2.5 bg-[#c9a227] rounded-full ring-4 ring-gray-50 group-hover:ring-white transition-all"></div>
                      <h4 className="font-bold text-[#0f3057] mb-1 leading-tight group-hover:text-[#c9a227] transition-colors">{ann.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{ann.desc}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        );
      
      case 'about-dean':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">كلمة العميد</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/3 shrink-0 bg-gray-50 rounded-2xl p-4 border border-gray-100 text-center">
                <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img src="https://www.mutah.edu.jo/ar/research/PublishingImages/Osama.jpg" alt="عميد البحث العلمي" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-[#0f3057]">أ.د. أسامه عيسى مهاوش</h3>
                <p className="text-[#c9a227] font-bold mb-2">عميد البحث العلمي</p>
                <p className="text-xs text-gray-500" dir="ltr">osama@mutah.edu.jo</p>
              </div>
              <div className="w-full md:w-2/3 space-y-4 text-gray-700 leading-[2.1] text-justify">
                <p className="font-bold text-[#0f3057]">يسرني، وباسمي وباسم الزملاء العاملين أن أرحب بكم في الموقع الألكتروني لعمادة البحث العلمي في جامعة مؤتة.</p>
                <p>وإيماناً بأهمية ودور البحث العلمي في تنمية المعرفــة والتطوير والتنمية، أولت جامعة مؤتة منذ نشأتها عناية خاصة للبحث العلمي وأسست عمادة البحث العلمي منذ العام 1990م تكون هي الجهة المسئولة عن تطوير عملية البحث العلمي في الجامعة، والإشراف على تنظيم شؤون البحث العلمي وتشجيعه ودعمه باعتباره أحد أهم وسائل التطور والتقدم.</p>
                <p>كما وتشرف عمادة البحث العلمي على تنفيذ سياسات وأنشطة البحث العلمي في الجامعة، حيث تسعى العمادة لتطوير وإيجاد أنظمة وتعليمات وآليات فعالة تخدم احتياجات وأولويات البحث العلمي والباحثين. وكذلك تقوم العمادة بإدارة ودعم المشاريع البحثية والأبحاث العلمية بما في ذلك، الدعم الداخلي عن طريق لجنة البحث العلمي في الجامعة، والدعم الخارجي عن طريق صندوق دعم البحث العلمي التابع لوزارة التعليم العالي والبحث العلمي. كما تقوم العمادة بتشجيع الابتكار وتفعيل نظام الملكية الفكرية ونقل التكنولوجيا والمعرفة.</p>
                <p>وكذلك تشمل مهام عمادة البحث العلمي في الجامعة الإشراف على عمليات النشر العلمي بما في ذلك نشر وطباعة الكتب والمجلات العلمية وإدارة حضور المؤتمرات من قبل الباحثين والمشاركة في معارض الكتب.</p>
                <p>راجياً أن تجدوا في هذا الموقع المعلومات الكافية المتعلقة بالبحث العلمي في جامعة مؤتة، متمنياً لكم التوفيق والنجاح في خططكم ومشاريعكم البحثية.</p>
                <div className="pt-4 border-t border-gray-100 mt-6">
                  <p className="font-bold text-[#0f3057]">عميد البحث العلمي</p>
                  <p className="font-bold text-[#c9a227]">أ.د. أسامه عيسى مهاوش</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'about-vision':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">الرؤية والرسالة والقيم</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-[#c9a227] transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-[#0f3057]/5 flex items-center justify-center mb-6 group-hover:bg-[#0f3057] transition-colors">
                  <Eye className="w-8 h-8 text-[#0f3057] group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0f3057] mb-4">الرؤية</h3>
                <p className="text-gray-600 leading-relaxed">نحو عمادة حاضنة لبحث علمي متميز يرتقي بتصنيف الجامعة محلياً وإقليمياً وعالمياً.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-[#c9a227] transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-[#0f3057]/5 flex items-center justify-center mb-6 group-hover:bg-[#0f3057] transition-colors">
                  <Target className="w-8 h-8 text-[#0f3057] group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0f3057] mb-4">الرسالة</h3>
                <p className="text-gray-600 leading-relaxed">تأمين بيئة قادرة على إنتاج بحوث علمية تسهم في تعزيز دور الجامعة في البحث والابتكار محلياً وإقليمياً وعالمياً.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-[#c9a227] transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-[#0f3057]/5 flex items-center justify-center mb-6 group-hover:bg-[#0f3057] transition-colors">
                  <Star className="w-8 h-8 text-[#0f3057] group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0f3057] mb-4">القيم</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#c9a227]" /> التحسين المستمر</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#c9a227]" /> الأمانة العلمية</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#c9a227]" /> الشفافية والنزاهة</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#c9a227]" /> التنوع البحثي</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-[#c9a227]" /> الإبداع والتميز</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'about-plan':
      case 'res-plan':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">الخطة الإستراتيجية</h2>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 space-y-5">
              <p className="text-gray-700 leading-[2.1] text-justify font-bold">
                أنشئت عمادة البحث العلمي في جامعة مؤتة لتكون مسؤولة عن الإشراف وتطوير ودعم البحث العلمي
                في الجامعة، وكذلك لتتولى تنفيذ السياسات العامة للبحث العلمي التي نص عليها قانون التعليم
                العالي والبحث العلمي وقانون الجامعات الأردنية ونظام البحث العلمي في جامعة مؤتة.
              </p>
              <p className="text-gray-700 leading-[2.1] text-justify font-bold">
                ولتحقيق ذلك تقوم العمادة — ومن خلال لجنة البحث العلمي في الجامعة — بدعم البحوث والمشاريع
                العلمية للباحثين من داخل الجامعة في مختلف التخصصات، خصوصاً البحوث العلمية التطبيقية،
                ودعم النشر، ودعم عقد والمشاركة في المؤتمرات والندوات العلمية.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                'الخطة الاستراتيجية لعمادة البحث العلمي 2021 – 2025',
                'تقرير إنجازات عمادة البحث العلمي 2021 – 2023'
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-3.5 hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-[#0f3057]/8 flex items-center justify-center shrink-0">
                    <FileText size={16} className="text-[#0f3057]" />
                  </div>
                  <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-snug">{d}</p>
                  <span className="text-[10px] font-bold text-gray-400">PDF</span>
                  <Download size={15} className="text-[#c9a227] shrink-0" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'about-goals':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">الغاية الاستراتيجية</h2>
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white p-4">
              <img src="https://www.mutah.edu.jo/ar/research/PublishingImages/55555555.png" alt="الغاية الاستراتيجية لعمادة البحث العلمي" className="w-full max-h-[560px] object-contain" />
            </div>
          </div>
        );

      case 'res-stats':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">إحصائيات وأرقام</h2>
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/research/PublishingImages/010.jpg" alt="إحصائيات وأرقام" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white p-4">
              <img src="https://www.mutah.edu.jo/ar/research/SiteAssets/Pages/Forms/EditForm/combined_charts.png" alt="الرسوم البيانية لإحصائيات البحث العلمي" className="w-full object-contain" style={{ maxHeight: 1100 }} />
            </div>
          </div>
        );

      case 'res-sustainability': {
        const SUS_GROUPS = [
          {
            group: 'تقارير الاستدامة',
            items: [
              'تقرير الاستدامه 2020-2021',
              'تقرير الاستدامة 2018-2020',
            ],
          },
          {
            group: 'البرامج والمساقات',
            items: [
              'المساقات الدراسية المرتبطة بأهداف الاستدامة',
              'برامج الدراسات العليا التي تتوائم ورؤية الجامعة في تحقيق التنمية المستدامة',
              'المساقات العملية التربوية',
            ],
          },
          {
            group: 'الصحة والبيئة الجامعية',
            items: [
              'سياسة منع التدخين',
              'نموذج لإرشادات سياسة عدم التدخين في جامعة مؤتة',
              'الاستدامة والرعاية الصحية في جامعة مؤتة للعام 2020',
              'النشاطات الصحية في جامعة مؤتة',
            ],
          },
          {
            group: 'المجتمع المحلي والمناخ',
            items: [
              'النشاطات التعليمية المقدمة للمجتمع المحلي 2020',
              'Climate Action plan',
            ],
          },
          {
            group: 'اللجان',
            items: [
              'لجنة الاستدامه',
              'لجنة الشفافية والتنوع وحقوق الانسان',
            ],
          },
        ];
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-2">تقرير الاستدامة</h2>
            <p className="text-gray-600 text-[15px] leading-[2] mb-2">
              تنشر عمادة البحث العلمي وثائق الاستدامة في جامعة مؤتة، وتشمل تقارير الاستدامة الدورية،
              والمساقات والبرامج المرتبطة بأهداف التنمية المستدامة، وسياسات الصحة والبيئة الجامعية،
              وخطة العمل المناخي، ولجان الاستدامة والشفافية.
            </p>
            {SUS_GROUPS.map((g, gi) => (
              <section key={gi}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-1.5 h-6 rounded-full bg-[#c9a227] block" />
                  <h3 className="text-[17.5px] font-bold text-[#0f3057]">{g.group}</h3>
                  <span className="text-xs font-bold text-gray-400">{g.items.length}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {g.items.map((name, i) => (
                    <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 bg-white hover:border-[#c9a227] transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-[#0f3057]/[0.08] flex items-center justify-center shrink-0">
                        <FileText size={16} className="text-[#0f3057]" />
                      </div>
                      <p className="text-[14.5px] font-semibold text-[#0f3057] flex-1 leading-relaxed">{name}</p>
                      <span className="text-[11px] font-bold text-gray-400 shrink-0">PDF</span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        );
      }

      case 'res-guide':
      case 'regulations': {
        const REGS = activeItem === 'regulations'
          ? [
              'نظام البحث العلمي في جامعة مؤتة',
              'تعليمات البحث العلمي في جامعة مؤتة',
              'تعليمات صندوق دعم البحث العلمي للطلبة المبدعين',
              'سياسة الحرية الأكاديمية في جامعة مؤتة',
              'المدونة الأردنية لأخلاقيات البحث العلمي',
              'حوافز البحث العلمي'
            ]
          : [
              'دليل التقدم للحصول على حوافز البحث العلمي الإلكترونية للعام 2024',
              'دليل التقدم للمشاريع',
              'تعليمات دعم المشاريع',
              'تعليمات الاشتراك في المؤتمرات',
              'المجلات المقرصنة والمشبوهة'
            ];
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">
              {activeItem === 'res-guide' ? 'دليل البحث العلمي' : 'الأنظمة والتعليمات — أنظمة وتعليمات البحث العلمي في جامعة مؤتة'}
            </h2>
            <div className="flex flex-col gap-3">
              {REGS.map((doc, i) => (
                <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-3.5 hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-[#0f3057]/8 flex items-center justify-center shrink-0">
                    <FileText size={16} className="text-[#0f3057]" />
                  </div>
                  <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-snug">{doc}</p>
                  <span className="text-[10px] font-bold text-gray-400">PDF</span>
                  <Download size={15} className="text-[#c9a227] shrink-0" />
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'about-staff':
      case 'about-office': {
        const OFFICE = [
          { role: 'عميد البحث العلمي', name: 'الأستاذ الدكتور أسامه عيسى مهاوش', ext: '6017', email: 'osama@mutah.edu.jo', img: 'https://www.mutah.edu.jo/ar/research/PublishingImages/Osama.jpg', cv: true },
          { role: 'نائب عميد البحث العلمي', name: 'الأستاذ الدكتور أحمد عبد القادر المجالي', ext: '6169', email: 'majalia@mutah.edu.jo', cv: true },
          { role: 'مساعد العميد لشؤون التصنيفات والجودة', name: 'الدكتور ليث خالد ابراهيم', email: 'laithib@mutah.edu.jo', cv: true },
          { role: 'مساعد العميد لشؤون البحث العلمي', name: 'الدكتورة إسراء راضي الطراونة', ext: '3773', email: 'erat@mutah.edu.jo', cv: true }
        ];
        const STAFF = [
          { role: 'مدير المطبوعات', name: 'الدكتور خالد الصرايره', ext: '4041', email: 'dr.khaledsarairah@mutah.edu.jo' },
          { role: 'رئيسة شعبة المؤتمرات العلمية', name: 'السيدة نوار النوايسه', ext: '4034' },
          { role: 'رئيس شعبة التصنيفات', name: 'عرين خالد الضلاعين', ext: '+962796060866', email: 'areen-khaled@mutah.edu.jo' },
          { role: 'موظف ديوان — قائم بأعمال رئيس الديوان', name: 'السيد هاني السحيمات', ext: '6117' },
          { role: 'اداري', name: 'السيد علي الرواشدة', ext: '4026' }
        ];
        const people = activeItem === 'about-office' ? OFFICE : STAFF;
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">{activeItem === 'about-office' ? 'مكتب العميد' : 'طاقم العمادة'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {people.map((m, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:border-[#c9a227]/50 transition-all">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-[#0f3057] flex items-center justify-center">
                    {m.img
                      ? <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                      : <Users className="w-10 h-10 text-[#c9a227]" />}
                  </div>
                  <h3 className="font-bold text-[#0f3057] text-lg mb-1 leading-snug">{m.name}</h3>
                  <p className="text-[#c9a227] text-sm font-medium mb-4">{m.role}</p>
                  <div className="flex flex-col gap-2 text-sm text-gray-500">
                    {m.ext && <span className="flex items-center justify-center gap-2"><Phone className="w-4 h-4" /> <span dir="ltr">{m.ext}</span></span>}
                    {m.email && <span className="flex items-center justify-center gap-2 break-all"><Mail className="w-4 h-4 shrink-0" /> <span dir="ltr">{m.email}</span></span>}
                    {m.cv && <span className="flex items-center justify-center gap-2 text-[#0f3057] font-bold text-xs"><FileText className="w-4 h-4" /> السيرة الذاتية</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'forms-forms': {
        const RES_FORMS = [
          { name: 'تعهد نشر مجلات', type: 'PDF' },
          { name: 'نموذج تحكيم مجلات', type: 'DOC' },
          { name: 'جائزة الباحث المتميز', type: 'DOC' },
          { name: 'نموذج وتقرير الزيارة العلمية', type: 'DOCX' },
          { name: 'المدونة الأردنية لأخلاقيات البحث العلمي 2017', type: 'PDF' },
          { name: 'اتفاقية تعيين وصرف مكافأة مساعد باحث للمشاريع المدعومة من خارج جامعة مؤتة', type: 'DOCX' },
          { name: 'اتفاقية تعيين وصرف مكافأة مساعد باحث للمشاريع المدعومة من داخل جامعة مؤتة', type: 'DOCX' },
          { name: 'تعهد المدونة الأردنية لأخلاقيات البحث العلمي', type: 'DOCX' },
          { name: 'تعهد دعم المشاريع من داخل جامعة مؤتة', type: 'DOCX' },
          { name: 'تعهد دعم مشاريع مدعومة من خارج جامعة مؤتة', type: 'DOCX' },
          { name: 'تعهد دعم مشاريع مدعومة من داخل جامعة مؤتة لطلبة الدراسات العليا', type: 'DOCX' },
          { name: 'تقرير سير مشروع بحث علمي مدعوم', type: 'DOCX' },
          { name: 'طلب تحويل مخصص مالي لمشروع بحث مدعوم', type: 'DOCX' },
          { name: 'طلب زيادة ميزانية مشروع بحث مدعوم', type: 'DOCX' },
          { name: 'نموذج اعتماد بحث طلبة الدكتوراة', type: 'DOCX' },
          { name: 'نموذج الإفصاح عن استخدام أدوات وتطبيقات الذكاء الاصطناعي', type: 'DOCX' },
          { name: 'نموذج الإفصاح عن استخدام أدوات وتطبيقات الذكاء الاصطناعي', type: 'PDF' },
          { name: 'نموذج التقدم للحصول على الزيارة العلمية', type: 'DOCX' },
          { name: 'نموذج بحث إجازة تفرغ علمي', type: 'DOCX' },
          { name: 'نموذج دعم تفصيلي — صندوق دعم البحث العلمي', type: 'DOCX' },
          { name: 'نموذج دعم طلبة البكالوريوس', type: 'DOCX' },
          { name: 'نموذج دعم طلبة الدراسات العليا', type: 'DOCX' },
          { name: 'نموذج طلب دعم عقد مؤتمر / ورشة عمل / يوم علمي', type: 'DOCX' },
          { name: 'نموذج طلب دعم مشاريع', type: 'DOCX' },
          { name: 'نموذج طلب شراء لوازم من مخصصات مشروع بحث مدعوم', type: 'DOCX' },
          { name: 'نموذج طلب صرف سلفة مالية من مخصصات مشروع بحث مدعوم', type: 'DOCX' },
          { name: 'نموذج مخطط إجازة تفرغ علمي', type: 'DOCX' },
          { name: 'نموذج وتعهد نشر كتاب', type: 'DOC' },
          { name: 'Academic Programs Handbook', type: 'PDF' },
          { name: 'دليل التخصصات الجامعية', type: 'PDF' }
        ];
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">النماذج</h2>
            <div className="flex items-start gap-3 bg-[#fffbf0] border border-[#c9a227]/30 rounded-2xl px-6 py-5">
              <Info size={18} className="text-[#c9a227] shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 leading-relaxed">
                يرجى استخدام برنامج <span className="font-bold text-[#0f3057]">PDF ESCAPE</span> لتعبئة النماذج.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {RES_FORMS.map((f, i) => (
                <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-3.5 hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
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
        );
      }

      case 'about-former': {
        const DEANS = [
          { period: '1/9/2021 - 4/9/2022', name: 'الأستاذ الدكتور عبد الله العدينات', img: 'https://www.mutah.edu.jo/ar/research/PublishingImages/Odienat_JPG.jpg' },
          { period: '9/4/2019 - 30/8/2021', name: 'الأستاذ الدكتور أسامه عيسى مهاوش', img: 'https://www.mutah.edu.jo/ar/research/PublishingImages/Osama.jpg' },
          { period: '1/9/2017 - 8/4/2019', name: 'الأستاذ الدكتور أحمد خلف السكارنه', img: 'https://www.mutah.edu.jo/ar/research/PublishingImages/ProfDr.jpg' },
          { period: '1/9/2013 - 31/8/2017', name: 'الأستاذ الدكتور حسين الكساسبه', img: 'https://www.mutah.edu.jo/ar/research/PublishingImages/hussin1.jpeg' },
          { period: '22/11/2009 - 31/8/2013', name: 'الأستاذ الدكتور أمين العضايله', img: 'https://www.mutah.edu.jo/ar/research/PublishingImages/Ameen11.png' },
          { period: '1/9/2009 - 21/11/2009', name: 'الأستاذ الدكتور قبلان المجالي', img: 'https://www.mutah.edu.jo/ar/research/PublishingImages/majaly1.jpg' },
          { period: '5/1/2008 - 21/8/2009', name: 'الأستاذ الدكتور محمد سالم الطراونه', img: 'https://www.mutah.edu.jo/ar/research/PublishingImages/download1.jpg' },
          { period: '26/9/2006 - 4/1/2008', name: 'الأستاذ الدكتور قبلان المجالي', img: 'https://www.mutah.edu.jo/ar/research/PublishingImages/majaly1.jpg' },
          { period: '1/8/2005 - 4/9/2006', name: 'الأستاذ الدكتور ذياب البداينه', img: 'https://www.mutah.edu.jo/ar/research/PublishingImages/diab1.png' },
          { period: '16/2/2003 - 31/7/2005', name: 'الأستاذ الدكتور محمد أمين العبادي', img: 'https://www.mutah.edu.jo/ar/research/PublishingImages/Abadi1.jpg' },
          { period: '2/9/2001 - 15/2/2003', name: 'الأستاذ الدكتور طه الخميس', img: 'https://www.mutah.edu.jo/ar/research/PublishingImages/taha1.jpeg' }
        ];
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">العمداء السابقون</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DEANS.map((d, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:border-[#c9a227]/50 transition-all">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-[#0f3057]">
                    <img src={d.img} alt={d.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-[#0f3057] text-[15px] mb-2 leading-snug">{d.name}</h3>
                  <span className="inline-block text-xs font-bold text-[#0f3057] px-3 py-1 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/20" dir="ltr">{d.period}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'about-committees': {
        const NAT = [
          { name: 'أ.د. ظافر الصرايرة', role: 'رئيس هيئة اعتماد مؤسسات التعليم العالي وضمان جودتها', faculty: 'اللغة الانجليزية / الآداب' },
          { name: 'أ.د. حامد الزعبي', role: 'عضو المجلس الوطني لمكافحة الأوبئة والأمراض السارية', faculty: 'كلية الطب' },
          { name: 'أ.د. منير أبو هلالة', role: 'المدير التنفيذي للمركز الإقليمي للتحكم والوقاية من الأمراض — عمان / الأردن', faculty: 'كلية الطب' },
          { name: 'أ.د. علي الضمور', role: 'لجنة الشراكة بين القطاع العام والقطاع الأكاديمي لدراسة المواضيع المتعلقة بالنظام الكهربائي', faculty: 'كلية الهندسة' },
          { name: 'أ.د. مروان الموسى', role: 'عضو اللجنة القطاعية المتخصصة للعلوم الأساسية', faculty: 'كلية العلوم' },
          { name: 'أ.د. أسامه مهاوش', role: 'رئيس اللجنة القطاعية للعلوم الزراعية والطب البيطري · عضو لجنة الدراسة الوطنية لمعالجة مادة الزيبار الناتج من عصر الزيتون · عضو اللجنة القطاعية المتخصصة للعلوم الزراعية والبيطرة', faculty: 'كلية الزراعة' },
          { name: 'أ.د. أنور جريس', role: 'عضو اللجنة القطاعية المتخصصة لعلوم الطاقة والمياه والبيئة · عضو في اللجنة العلمية لصندوق دعم البحث العلمي والإبتكار', faculty: 'كلية العلوم' },
          { name: 'أ.د. عمر نواف المعايطة', role: 'عضو اللجنة القطاعية المتخصصة للعلوم الهندسية والتكنولوجية وقطاع الإتصالات وتكنولوجيا المعلومات', faculty: 'كلية الهندسة' },
          { name: 'أ.د. عبد الله العدينات', role: 'عضو اللجنة القطاعية المتخصصة لعلوم الطاقة وقطاع المياه والبيئة', faculty: 'كلية الهندسة' },
          { name: 'أ.د. محمد داوود المجالي', role: 'عضو اللجنة القطاعية المتخصصة للعلوم الإنسانية والاجتماعية والاقتصادية للصندوق', faculty: 'كلية العلوم التربوية' },
          { name: 'د. عفاف النداف', role: 'عضو في اللجنة الفنية لتسجيل الأدوية التي لا مثيل لها / مديرية الدواء في المؤسسة العامة للغذاء والدواء', faculty: 'كلية الصيدلة' },
          { name: 'أ.د. أسامه عيسى مهاوش', role: 'عضو لجنة التغير المناخي — صندوق دعم البحث العلمي والابتكار', faculty: 'كلية الزراعة' }
        ];
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">اللجان الوطنية</h2>
            <p className="text-gray-700 leading-[2.1] text-justify">
              إن عمادة البحث العلمي تسعى لأن تكون عنصراً مؤثراً على الصعيد المحلي والوطني والإقليمي،
              وذلك من خلال تفعيل دور أعضاء هيئة التدريس فيها باتخاذ القرارات التي تهم الوطن والأمة
              وتؤثر على صناعة القرار على المستويات العليا، ولذلك فإن هذا الدور المؤثر يأخذ أشكالاً عدة
              ومن هذه الأشكال اشتراك أعضاء الهيئة التدريسية في اللجان الوطنية والمحلية والعالمية،
              ومن الأمثلة على ذلك:
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f3057] text-white">
                    <th className="px-5 py-3.5 text-right font-bold w-56">الدكتور</th>
                    <th className="px-5 py-3.5 text-right font-bold">الموقع</th>
                    <th className="px-5 py-3.5 text-right font-bold w-48">الكلية</th>
                  </tr>
                </thead>
                <tbody>
                  {NAT.map((m, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'border-t border-gray-100 bg-white' : 'border-t border-gray-100 bg-[#F8FAFC]'}>
                      <td className="px-5 py-4 font-bold text-[#0f3057] align-top">{m.name}</td>
                      <td className="px-5 py-4 text-gray-700 leading-relaxed">{m.role}</td>
                      <td className="px-5 py-4 text-gray-500 align-top">{m.faculty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      case 'about-structure':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">الهيكل التنظيمي والوصف الوظيفي لعمادة البحث العلمي</h2>
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-white p-4">
              <img src="https://www.mutah.edu.jo/ar/research/PublishingImages/%d8%a7%d9%84%d9%87%d9%8a%d9%83%d9%84%202023.png" alt="الهيكل التنظيمي 2023" className="w-full max-h-[560px] object-contain" />
            </div>
            <h3 className="text-2xl font-bold text-[#0f3057]">الوصف الوظيفي</h3>
            <div className="flex flex-col gap-5">
              {[
                { t: 'العميد', b: ['عميد البحث العلمي.'] },
                { t: 'نائب العميد', b: ['القيام بالمهام والصلاحيات التي يفوضها له العميد.'] },
                { t: 'مساعد العميد لشؤون البحث العلمي', n: 'على المساعد إتقان اللغة الإنجليزية قراءة وكتابة ومحادثة، ويتولى الواجبات التالية:', b: ['الإشراف على دعم الأبحاث العلمية الداخلية والخارجية ومتابعتها.','الإشراف على دعم المؤتمرات الداخلية والخارجية ومتابعتها مع الكليات العلمية.','الإشراف على دعم المشاريع الداخلية والخارجية ومتابعتها مع الكليات العلمية.','متابعة تحديث الموقع الإلكتروني فيما يخص البحث العلمي للكليات العلمية.','يعمل كحلقة وصل مع الكليات العلمية والإنسانية فيما يخص الأبحاث والمؤتمرات والمشاريع الخاصة بالكليات والمراكز العلمية.','تشجيع أعضاء هيئة التدريس والباحثين وحثهم على إجراء البحوث العلمية المبتكرة وتهيئة الوسائل والإمكانات البحثية لهم.','التنسيق مع مراكز البحوث المختلفة محلياً وإقليمياً وعالمياً، وتنظيم عملية الاتصال بها وتنمية التعاون معها للاستفادة من كل ما هو حديث ومفيد.','حث أعضاء هيئة التدريس بالجامعة على المشاركة بالمشاريع البحثية المعلن عنها من الجهات البحثية المختلفة.','توجيه الباحثين لمعالجة احتياجات المجتمع وخدمة خططه التنموية الحالية والمستقبلية.'] },
                { t: 'مساعد العميد لشؤون التصنيفات والجودة', n: 'على المساعد إتقان اللغة الإنجليزية قراءة وكتابة ومحادثة، ويتولى الواجبات التالية:', b: ['متابعة تجهيز ملفات التصنيفات العالمية.','أرشفة قواعد البيانات فيما يخص الإنتاج العلمي وملفات التصنيفات.','التواصل مع كافة الكليات في الجامعة لأرشفة الإنتاج العلمي والنشاطات اللازم توثيقها.','متابعة ملفات الجودة في عمادة البحث العلمي.','القيام بمهام أمانة سر لجنة البحث العلمي في الجامعة.','أي مهام أو صلاحيات يفوضها العميد.'] },
                { t: 'شعبة التصنيفات', b: ['متابعة سياسات التصنيفات وشروط التقدم لها وفقاً للمعايير الدولية واحتياجات الجامعة.','متابعة (الهيئة التدريسية والإدارية والطلابية) في الجامعة لتحقيق متطلبات التصنيف الدولي وتطبيقها بشكل صحيح.','التعاون مع الجهات الخارجية (الدولية والمحلية) والتفاعل مع هيئات التصنيفات لمتابعة التطورات الدولية في مجال التصنيف وتحسين آلية التقدم.','جمع البيانات والمعلومات المطلوبة لغايات التقديم للتصنيفات.','متابعة بيانات الخريجين في سوق العمل ومتابعة أمور السمعة التشغيلية للجامعة.','تحليل البيانات وتقديم تقارير دورية تسلط الضوء على أداء التصنيف واقتراحات تحسينية مستقبلية.','تحديث المعلومات وملفات التصنيفات الدولية بعد الحصول على البيانات من الجهات المطلوبة بالطريقة الرسمية.','متابعة الأمور التي من شأنها رفع ترتيب الجامعة وتقدمها.','كتابة تقرير سنوي عن إنجازات الشعبة.','أي أمور أخرى يكلف بها بما يتماشى مع المتطلبات المتغيرة للمعايير الدولية للتصنيفات.'] },
                { t: 'رئيس الديوان', b: ['التنسيق مع كافة دوائر وشعب العمادة لمتابعة حركة العمل اليومي والأسبوعي حسب توجيهات العميد، وإعداد الكتب الرسمية حسب الأصول.','متابعة الصادر والوارد وتنسيق البريد اليومي.','الإشراف على طلب اللوازم ومتابعة صيانتها.','الإشراف على استلام القرطاسية وتوزيعها على دوائر العمادة.','الإشراف على عمال البريد وتوزيع أعمالهم اليومية.','تقديم تقرير شهري للعميد عن أعمال العمادة بدمج التقارير الواردة من الدوائر.','تنظيم وترتيب الإجازات والمغادرات وتقديم تقرير شهري للعميد بخصوصها.','أي أمور أخرى يكلف بها.'] },
                { t: 'سكرتير العميد', b: ['متابعة المراسلات التي تصل إلى مكتب العميد أو تصدر منه وتسليمها إلى ديوان العمادة.','تحديد مواعيد اجتماعات العميد مع موظفي العمادة ومع اللجان والمجالس المختلفة في الجامعة وخارجها.','استقبال المكالمات الهاتفية وتدوين المعلومات المطلوبة في حال غياب العميد.','تشكيل حلقة وصل بين العميد ودوائر وشعب العمادة.','القيام بأعمال الطباعة الخاصة بالعميد.','أي أمور أخرى تكلف بها.'] },
                { t: 'مكتب حماية الملكية الفكرية ونقل التكنولوجيا', b: ['تكون مهامه متوافقة مع تعليمات مكتب حماية الملكية الفكرية ونقل التكنولوجيا الصادرة بقرار مجلس العمداء رقم (610/2016) الموافق 14/11/2016.'] },
                { t: 'دائرة المجلات العلمية والدعم الإلكتروني — مدير الدائرة', n: 'تُعنى بإدارة مهام شؤون المجلات العلمية الصادرة عن عمادة البحث العلمي في الجامعة، سواء أكانت مجلات وطنية أم مجلات مؤتة للبحوث والدراسات.', b: ['متابعة تحكيم البحوث المقدمة للنشر في المجلات الصادرة عن العمادة.','تسليم البحوث المقبولة للنشر إلى دائرة المطبوعات والنشر.','متابعة فاعلية أداء الأنظمة الإلكترونية للمجلات.','التنسيق مع عميد البحث العلمي لتكليف أمين / أمناء سر للمجلات العلمية.','تحديد مهام أمناء السر بالتنسيق مع عميد البحث العلمي ورؤساء هيئات التحرير.','المشاركة في اللجان المشكلة ذات العلاقة بالمجلات العلمية الصادرة عن العمادة.','التأكد من قيام رؤساء الشعب بالمهام الموكولة إليهم.','أية أمور أخرى يكلف بها.'] },
                { t: 'شعبة مجلات مؤتة', b: ['تسجيل المراسلات الخاصة بمجلات مؤتة في سجل خاص.','حفظ البحوث المقبولة للنشر في ملفات خاصة.','ترتيب البحوث المقبولة وفقاً لتسلسل تاريخ قبولها.','إعداد جميع المراسلات التي تتعلق بالشعبة.','إعداد الإحصائيات اللازمة المتعلقة بالمجلة.','كتابة تقرير سنوي عن إنجازات المجلة.','أي أمور أخرى يكلف بها.'] },
                { t: 'شعبة المجلات الوطنية', b: ['تسجيل المراسلات الخاصة بالمجلات الوطنية في سجل خاص.','حفظ البحوث المقبولة للنشر في ملفات خاصة.','ترتيب البحوث المقبولة وفقاً لتسلسل تاريخ قبولها.','إعداد جميع المراسلات التي تتعلق بالشعبة.','إعداد الإحصائيات اللازمة المتعلقة بالمجلة.','كتابة تقرير سنوي عن إنجازات المجلة.','أي أمور أخرى يكلف بها.'] },
                { t: 'شعبة الدعم الإلكتروني', b: ['الإشراف على موقع العمادة إلكترونياً.','الإشراف على تحديث البيانات والموقع بشكل مستمر.','الإشراف الإلكتروني على أنظمة نشر المجلات في الدائرة.','متابعة التحديثات الخاصة بقواعد البيانات الخاصة بنشر المجلات.','التواصل الداخلي والخارجي من خلال البريد الإلكتروني الخاص بالعمادة.','متابعة مواقع التواصل الاجتماعي الخاصة بعمادة البحث العلمي.','نشر الإعلانات الخاصة بالعمادة بما يخص المجلات والمؤتمرات والتعاميم.','كتابة وتصدير جميع المراسلات الخاصة بالشعبة.','أية أمور يتم التكليف بها.'] },
                { t: 'دائرة شؤون البحث العلمي والتطوير', n: 'تقوم بالمهام والمسؤوليات التي تضمنتها المادة (5) من نظام البحث العلمي في جامعة مؤتة رقم (39) لسنة 2003 — مهام وصلاحيات لجنة البحث العلمي:', b: ['تنفيذ سياسة الجامعة المتعلقة بدعم البحوث العلمية ونشرها.','إعداد مشروع خطة البحث العلمي ووسائل تنفيذها ورفع المشروع إلى المجلس لإقراره.','تحديد الأسس اللازمة لحفظ حقوق الجامعة والباحثين في البحوث العلمية ونتائج هذه البحوث.','مناقشة مخصصات البحث العلمي لإدراجها في موازنة الجامعة.','جمع المعلومات عن البحوث العلمية في الجامعة وخارجها.','التنسيب إلى المجلس بإصدار التعليمات الخاصة بتنظيم شؤون البحث العلمي في الجامعة وتشجيعه ودعمه ونشره ومتابعة تقييمه.'] },
                { t: 'مدير دائرة شؤون البحث العلمي والتطوير', b: ['الإشراف على متابعة أعمال الشعب من استلام الأبحاث ومشاريع البحث والمؤتمرات المقدمة للدعم والتأكد من انطباق التعليمات عليها.','متابعة تحكيم البحوث والمخطوطات والكتب المقدمة للتحكيم في الدائرة.','الإشراف على مشاريع الأبحاث والأبحاث المدعومة داخل الجامعة وخارجها.','متابعة تنفيذ القرارات الصادرة عن لجنة البحث العلمي.','متابعة المشاريع والأبحاث مع الجهات الخارجية الداعمة حسب الاتفاقات المبرمة.','التواصل مع وحدة الشؤون المالية لتسيير الأمور المتعلقة بشؤون البحث العلمي.','الإشراف على تسليم الكتب والمخطوطات المقبولة للنشر لدائرة المطبوعات حسب الأصول.','تزويد دائرة الدعم الإلكتروني بكافة المعاملات الخاصة بالمشاريع المراد أرشفتها إلكترونياً وورقياً.','إقامة دورات تدريبية ومحاضرات في مجالات البحث العلمي.','المشاركة في اللجان المشكلة ذات العلاقة بالمجلات العلمية.','متابعة الصادر والوارد وتنسيق البريد اليومي في الدائرة.','أية أمور أخرى يكلف بها.'] },
                { t: 'شعبة دعم الأبحاث والمشاريع العلمية', b: ['استلام نموذج طلب دعم الأبحاث المقدمة إلكترونياً وورقياً والتأكد من مطابقتها للتعليمات.','توثيق القرارات الخاصة بالأبحاث وفتح ملف خاص بكل بحث.','كتابة المخاطبات الخاصة بالأبحاث العلمية ومتابعتها.','استلام جميع أوراق المشروع بعد إقرارها من لجنة البحث العلمي والتأكد من مطابقتها للتعليمات.','توثيق القرارات الخاصة بالمشاريع، وفتح ملف خاص بكل مشروع.','متابعة تنفيذ مشاريع البحث العلمي.','متابعة الأمور المالية والإدارية للمشاريع البحثية التي تدخل ضمن صلاحيات العمادة.','كتابة تقرير سنوي عن إنجازات الشعبة.','كتابة وتصدير جميع المراسلات الخاصة بالشعبة.','أي أمور أخرى يكلف بها.'] },
                { t: 'شعبة دعم المؤتمرات العلمية', b: ['استلام الطلبات المقدمة لدعم المؤتمرات والندوات والأيام العلمية ورقياً وإلكترونياً والتأكد من مطابقتها للتعليمات.','توثيق القرارات الخاصة بالمؤتمرات، وفتح ملف خاص بكل مؤتمر.','تنفيذ قرار لجنة البحث العلمي بخصوص دعم المؤتمرات والندوات والأيام العلمية بالتنسيق مع الجهات المعنية.','متابعة تنفيذ المؤتمرات العلمية.','متابعة التقرير الفني والمالي عن نتائج المؤتمر وتوصياته والأوراق العلمية الناتجة عنه مع الجهة المنظمة.','المتابعة مع الكليات لتزويد العمادة بخطتها السنوية من المؤتمرات أو الندوات أو الأيام العلمية.','استلام الطلبات الواردة من أعضاء الهيئة التدريسية لدعم مشاركتهم في المؤتمرات الخارجية والتأكد من مطابقتها للتعليمات.','كتابة تقرير سنوي عن إنجازات الشعبة.','كتابة وتصدير جميع المراسلات الخاصة بالشعبة.','أي أمور أخرى يكلف بها.'] },
                { t: 'دائرة المطبوعات — مدير الدائرة', n: 'تُعنى الدائرة باستلام البحوث المقبولة للنشر وتدقيقها وتحريرها ثم تحويلها إلى الطباعة بالشكل النهائي، ووضع خطة لتوزيع إصدارات العمادة، بحيث يكون في الدائرة محررون للغة العربية والإنجليزية.', b: ['استلام البحوث المقبولة للنشر من دائرة المجلات بموجب قيود رسمية.','التنسيق مع عميد البحث العلمي ورؤساء هيئات التحرير لاختيار البحوث للنشر حسب الأصول والتعليمات.','استلام الكتب والمخطوطات المعتمدة للنشر.','المشاركة في وضع الشروط والمواصفات الفنية لطباعة إصدارات العمادة.','التنسيق مع لجنة العطاءات المركزية للتأكد من توافق شروط ومواصفات عطاءات الإحالة للطباعة.','الإشراف على إنشاء موقع جديد لعمادة البحث العلمي.','الإشراف على تحديث بيانات الموقع بشكل دائم.','الإشراف على تسويق العمادة وإصداراتها إلكترونياً.','التأكد من نشر المجلات الصادرة عن عمادة البحث العلمي إلكترونياً.','المشاركة في اللجان المشكلة ذات العلاقة بالمطبوعات الصادرة عن العمادة.','متابعة شؤون الإصدارات مع المطابع ذات العلاقة.','التأكد من قيام رؤساء الشعب بالمهام الموكولة إليهم.','أية أمور أخرى يكلف بها.'] },
                { t: 'شعبة الطباعة', b: ['استلام البحوث المرشحة للنشر من مدير الدائرة.','طباعة أعداد مجلة مؤتة للبحوث والدراسات.','طباعة أعداد المجلات الوطنية.','طباعة الإصدارات الخاصة بالعمادة.','كتابة تقرير سنوي عن إنجازات الشعبة.','كتابة وتصدير جميع المراسلات الخاصة بالشعبة.','أية أمور أخرى يكلف بها.'] },
                { t: 'شعبة التحرير والإصدارات', b: ['تحرير البحوث المقبولة للنشر بعد استلامها من الباحثين والتأكد من مطابقتها لشروط وتعليمات النشر.','القيام بمهام التحرير لجميع إصدارات العمادة.','تصحيح البروفات الخاصة بالمجلات والكتب المرشحة للنشر.','المتابعة النهائية مع المطابع المعتمدة لتنفيذ الأعمال المطلوبة وحسب الشروط المعتمدة.','التأكد من إصدار منشورات العمادة والمجلات والكتب بشكليها الورقي والإلكتروني.','التدقيق اللغوي للمعلومات المنشورة على الموقع الإلكتروني للعمادة.','كتابة تقرير سنوي عن إنجازات الشعبة.','كتابة وتصدير جميع المراسلات الخاصة بالشعبة.','أية أمور أخرى يكلف بها.'] }
              ].map((j, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-3xl shadow-sm p-7">
                  <h4 className="text-lg font-bold text-[#c9a227] mb-3">{j.t}</h4>
                  {j.n && <p className="text-sm text-gray-600 leading-[1.9] mb-4 text-justify">{j.n}</p>}
                  <NumList items={j.b} />
                </div>
              ))}
            </div>
          </div>
        );

      case 'res-committee':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">لجنة البحث العلمي</h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f3057] text-white">
                    <th className="px-5 py-3.5 text-right font-bold">العضو</th>
                    <th className="px-5 py-3.5 text-right font-bold w-32">الصفة</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'الأستاذ الدكتور سلامة النعيمات / رئيس الجامعة', role: 'رئيساً' },
                    { name: 'الأستاذ الدكتور محمد الصرايرة / نائب الرئيس للشؤون الإدارية والمالية', role: 'عضواً' },
                    { name: 'الأستاذ الدكتور أسامه عيسى مهاوش / عميد البحث العلمي', role: 'عضواً' },
                    { name: 'الأستاذ الدكتور محمد الأشرم / كلية العلوم', role: 'عضواً' },
                    { name: 'الأستاذ الدكتور أحمد النوافلة / كلية الآداب', role: 'عضواً' },
                    { name: 'الدكتور فواز الشواورة / كلية الأعمال', role: 'عضواً' },
                    { name: 'الدكتورة ليديا الهلسا / كلية الصيدلة', role: 'عضواً' },
                    { name: 'السيدة حنان ابو هيكل / عمادة البحث العلمي', role: 'أمين السر' }
                  ].map((m, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'border-t border-gray-100 bg-white' : 'border-t border-gray-100 bg-[#F8FAFC]'}>
                      <td className="px-5 py-4 font-bold text-[#0f3057]">{m.name}</td>
                      <td className="px-5 py-4">
                        <span className="inline-block text-xs font-bold text-[#0f3057] px-3 py-1 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/20">{m.role}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'res-priorities':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">أولويات البحث العلمي</h2>
            <p className="text-gray-700 text-lg font-bold">تتبنى عمادة البحث العلمي الأولويات البحثية التالية:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {['استغلال المصادر الطبيعية في اقليم الجنوب','الطاقة المستجدة والبطاريات','استقرار الشبكات الكهربائية','الاسعافات الأولية والتقييم الأولي للحالات المرضية','التعليم الإلكتروني','الأمن السيبراني','الغذاء والدواء'].map((pr, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-[#c9a227] transition-all flex items-start gap-4">
                  <span className="w-8 h-8 rounded-lg bg-[#0f3057] text-[#c9a227] text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="font-bold text-[#0f3057] leading-relaxed">{pr}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'res-support-proj':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">دعم الأبحاث والمشاريع العلمية</h2>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 space-y-6">
              <p className="text-gray-700 leading-[2.1] text-justify font-bold">
                لا يمكن إنتاج بحث علمي دقيق دون دعم مالي منتظم، لذا تعمل الجامعة على تنظيم شؤون البحث
                العلمي وتشجيعه ودعمه بمختلف الوسائل المادية والمعنوية والبشرية، ولهذا أنشأت في عمادة
                البحث العلمي دائرة متخصصة تساعد الباحثين وأعضاء الهيئة التدريسية على تأمين الدعم اللازم
                لإنجاز مشاريعهم وأبحاثهم العلمية، والعمل على نشر نتائجهم البحثية في مجلات علمية عالمية
                مرموقة، حيث تُعطى الأولوية في الدعم للبحوث العلمية التطبيقية والبحوث المتعلقة بأغراض
                التنمية في المملكة، وتتولى هذه الدائرة رعاية الأبحاث منذ مراحلها المبكرة إلى أن تصل إلى
                مراحل الإنتاج الأخيرة.
              </p>
              <p className="text-gray-700 leading-[2.1] text-justify font-bold">
                إن عمادة البحث العلمي هي المسؤولة عن الإشراف وتطوير ودعم المشاريع البحثية لتنفيذ رؤية
                الجامعة وأهدافها، وتتولى تنفيذ السياسات العامة للبحث العلمي التي نص عليها قانون التعليم
                العالي والبحث العلمي ونظام البحث العلمي في جامعة مؤتة، وذلك عن طريق تشجيع الباحثين على
                العمل من خلال فرق بحثية، حيث يكون دور العمادة متابعة دعم هذه المشاريع والوصول بها إلى
                الإنتاجية.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {['تعليمات دعم المشاريع','إجراءات طلب دعم مشروع بحثي من جامعة مؤتة','إجراءات الحصول على دعم مشروع بحثي من صندوق دعم البحث العلمي','إحصائيات المشاريع المدعومة'].map((d) => <DocRow key={d} name={d} />)}
            </div>
          </div>
        );

      case 'res-support-conf':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">دعم المؤتمرات</h2>
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/research/PublishingImages/mu2.jpg" alt="دعم المؤتمرات" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 space-y-5">
              <p className="text-gray-700 leading-[2.1] text-justify font-bold">
                تقدم جامعة مؤتة دعماً مالياً إلى أعضاء الهيئة التدريسية للمشاركة في المؤتمرات والندوات
                وحلقات العمل العلمية، بهدف ربط المجتمع البحثي في جامعة مؤتة مع أقرانهم محلياً ودولياً،
                بالإضافة إلى نشر ثقافة البحث والوعي ضمن المجتمع بصورة شاملة عن أنشطة البحث العلمي
                والفرص المتاحة من خلاله.
              </p>
              <p className="text-gray-700 leading-[2.1] text-justify font-bold">
                كذلك تقدم جامعة مؤتة من خلال عمادة البحث العلمي (لجنة البحث العلمي) دعماً مالياً إلى
                كليات الجامعة المختلفة لإقامة وعقد المؤتمرات المحلية والاقليمية والدولية والندوات
                العلمية، من أجل خلق فرص التواصل بين الباحثين محلياً ودولياً لتبادل الأفكار وبناء
                المعارف حول المستجدات في مختلف حقول البحث العلمي، وتمكين الباحثين في الجامعة من تأسيس
                روابط وعلاقات علمية وثيقة مع أقرانهم من خارج الجامعة.
              </p>
              <p className="text-gray-700 leading-[2.1] text-justify font-bold">
                هذا وقد شهد العام 2017/2018 تطوراً ملحوظاً في عدد المؤتمرات المدعومة من الجامعة مما شكل
                نقلة نوعية في تاريخ جامعة مؤتة، حيث بلغ عدد المؤتمرات المدعومة من جامعة مؤتة (عشرة
                مؤتمرات)، أما المؤتمرات المدعومة من صندوق دعم البحث العلمي لنفس العام فبلغت (ستة
                مؤتمرات).
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {['تعليمات دعم المؤتمرات','إجراءات طلب دعم عقد مؤتمر من جامعة مؤتة (للكليات والعمادات والمراكز)','إجراءات مشاركة عضو هيئة تدريس في مؤتمر','إحصائيات بالمؤتمرات المدعومة','المؤتمرات المدعومة من جامعة مؤتة','المؤتمرات المدعومة من صندوق دعم البحث العلمي'].map((d) => <DocRow key={d} name={d} />)}
            </div>
          </div>
        );

      case 'res-support-pub':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">دعم النشر</h2>
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/research/PublishingImages/dean.jpg" alt="دعم النشر" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
              <p className="text-gray-700 leading-[2.1] text-justify font-bold mb-6">
                تعمل عمادة البحث العلمي على دعم وتشجيع أعضاء هيئة التدريس على تأليف البحوث والكتب
                والمؤلفات العلمية المبتكرة، والعمل على نشر إنتاجاتهم في المجلات والدوريات العلمية
                المصنفة عالمياً والتي تتبنى معايير علمية رصينة ولها معامل تأثير، من أجل تحسين جودة
                الإنتاج العلمي وتبادل المعرفة والنتائج، لما في ذلك من أهمية بالغة في تصنيف الجامعة ضمن
                مصاف الجامعات العالمية المرموقة.
              </p>
              <p className="font-bold text-[#0f3057] mb-4">تهدف العمادة من هذا الدعم إلى:</p>
              <NumList items={['توجيه وتشجيع أعضاء هيئة التدريس إلى النشر في مجلات علمية مصنفة ذات معامل تأثير عالٍ بما يسهم في ارتفاع عدد الاستشهادات المرجعية.','تعزيز ثقافة البحث العلمي في الجامعة.','تحفيز أعضاء هيئة التدريس إلى التميز بالأبحاث العلمية.','إبراز الدور النشط والحضاري للجامعة في إثراء الفكر والثقافة والمعرفة.','ربط الجامعة بالمجتمع من خلال طرح قضاياه ومشكلاته وإيجاد الحلول المناسبة لها.','توطيد الصلات العلمية والفكرية بين جامعة مؤتة والجامعات ومعاهد البحوث الأخرى.','توسيع قاعدة نشر الإنتاج العلمي بما يسهم في تطوير البحث العلمي في الجامعة وبما يحقق دعم مسيرة التنمية في المجتمع.']} />
            </div>
            <DocRow name="تعليمات دعم النشر" />
          </div>
        );

      case 'res-support-trans':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">دعم الترجمة</h2>
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
              <img src="https://www.mutah.edu.jo/ar/research/PublishingImages/dean.jpg" alt="دعم الترجمة" className="w-full max-h-[420px] object-cover" />
            </div>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
              <p className="text-gray-700 leading-[2.1] text-justify font-bold mb-6">
                تعد الترجمة للمؤلفات والأبحاث في جميع المجالات الأدبية والعلمية من أهم روافد نقل
                المعرفة والثقافات بين الشعوب، ولذلك تسعى عمادة البحث العلمي إلى دعم الترجمة العلمية من
                اللغات الأجنبية إلى اللغة العربية لأعضاء هيئة التدريس والباحثين في مختلف التخصصات بما
                يحقق بناء بيئة علمية عالية الجودة.
              </p>
              <p className="font-bold text-[#0f3057] mb-4">تهدف العمادة من توفير هذا الدعم إلى:</p>
              <NumList items={['تشجيع تبادل الثقافة والمعرفة بين الشعوب.','إثراء البحث العلمي في الجامعة والمجتمع معرفياً وثقافياً.','تشجيع وتحفيز أعضاء هيئة التدريس والباحثين والمهتمين بالترجمة لتحقيق عمل علمي متميز.']} />
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
              <p className="font-bold text-[#0f3057] mb-4">يجب أن تتوفر الشروط التالية في العمل المترجم المقدم للحصول على الدعم:</p>
              <NumList items={['أن يكون للعمل المترجم إضافة علمية مميزة في تخصصه.','أن يكون العمل المترجم ضمن مجالات وأولويات البحث العلمي في الجامعة والمملكة.','أن تكون الترجمة دقيقة واحترافية بحيث تحفظ سلامة المعنى للعمل الأصلي.','مراعاة الأخلاقيات العلمية والملكية الفكرية للآخرين.','ألا يكون قد سبق نشر النسخة المترجمة أو تقديمها في الوقت نفسه للنشر في أي جهة أخرى.']} />
            </div>
          </div>
        );

      case 'res-sponsors':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">الجهات الداعمة للبحث العلمي</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'لجنة البحث العلمي في الجامعة', desc: 'الدعم الداخلي للأبحاث والمشاريع العلمية' },
                { name: 'صندوق دعم البحث العلمي', desc: 'التابع لوزارة التعليم العالي والبحث العلمي' },
                { name: 'مؤسسة عبدالحميد شومان', desc: 'دعم البحث العلمي والأنشطة الثقافية' }
              ].map((sp, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:border-[#c9a227] transition-all text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#0f3057] flex items-center justify-center mx-auto mb-5">
                    <Award className="w-7 h-7 text-[#c9a227]" />
                  </div>
                  <h3 className="font-bold text-[#0f3057] text-lg mb-2 leading-snug">{sp.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{sp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'res-ip':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">مكتب حماية الملكية الفكرية ونقل التكنولوجيا</h2>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
              <p className="text-gray-700 leading-[2.1] text-justify">
                يعمل المكتب على التأكد من أن الاكتشافات العملية للبحث العلمي سوف تُبث وتُستخدم للمنفعة
                العامة، كما يقوم على تقييم العائد التجاري للاكتشافات العلمية في الجامعة وحماية وترخيص
                وتتجير اختراعات الجامعة حيثما كان مناسباً، وكل ما ينجم عن التتجير يُرصد داخلياً للدعم
                المستقبلي للبحث العلمي والتطوير.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-7">
                <h3 className="text-lg font-bold text-[#c9a227] mb-4">الهدف</h3>
                <p className="text-sm text-gray-700 leading-[2] text-justify">
                  العمل كجسر بين الباحثين في جامعة مؤتة من أكاديميين وموظفين أو طلاب من جهة، وبين مجتمع
                  الأعمال من الجهة الأخرى، بحيث يتأتى من عملية نقل التكنولوجيا تحويل الإبداعات إلى
                  منتجات وخدمات تنفع بشكل مباشر المجتمع، كما تنفع في ذات الوقت البحث والتدريس في الجامعة.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-7">
                <h3 className="text-lg font-bold text-[#c9a227] mb-4">الرؤيا</h3>
                <p className="text-sm text-gray-700 leading-[2] text-justify">
                  العمل على خلق وتعزيز الثقافة والبيئة الإبداعية في جامعة مؤتة، وحماية وتتجير الاختراعات
                  والأعمال الابتكارية للباحثين بما يخدم البحث العلمي في الجامعة والمجتمع في الأردن
                  والمنطقة العربية.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-7">
                <h3 className="text-lg font-bold text-[#c9a227] mb-4">الرسالة</h3>
                <p className="text-sm text-gray-700 leading-[2] mb-3">تقديم نظام نقل تكنولوجيا شامل:</p>
                <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside leading-relaxed">
                  <li>تتجير الاكتشافات البحثية في جامعة مؤتة لمنفعة المجتمع في الأردن والمنطقة العربية.</li>
                  <li>المساهمة في دعم وتوفير الدخل للمشاريع البحثية المستقبلية ولتطوير العملية الأكاديمية.</li>
                  <li>حفظ حقوق الباحثين والمؤلفين في الجامعة.</li>
                  <li>توفير الدعم للنمو الاقتصادي والمعرفي للمجتمع المحلي.</li>
                </ul>
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
              <h3 className="text-xl font-bold text-[#0f3057] mb-6">واجبات ومهام المكتب</h3>
              <p className="font-bold text-[#0f3057] mb-4">1. حماية الملكية الفكرية وبراءات الاختراع</p>
              <div className="mb-8">
                <NumList items={['توفير واستقبال وتوثيق طلبات الإفصاح عن براءات الاختراع من الباحثين حسب النماذج المعمول بها في الجامعة.','تصميم طلبات الإفصاح وتعهد البراءة واتفاقيات التراخيص بالتنسيق مع الجهات المعنية في الجامعة.','العمل مع لجنة البحث العلمي للحفاظ على حقوق الجامعة والباحثين حسب التعليمات المعمول بها.','دراسة طلبات الإفصاح عن براءات اختراع وتقييمها من الناحية الفنية والتأكد من صلاحيتها.','العمل مع قسم تتجير الإبداع والريادة لدراسة الطلبات المقدمة وتقييمها من الناحية التجارية.','القيام بالمهام اللازمة لتسجيل براءات الاختراع واستصدارها ومتابعة الأمور الإدارية والفنية والمالية المتعلقة بها.','نشر الوعي بين الباحثين فيما يتعلق بحقوق الملكية من خلال برامج دورية بالتعاون مع لجنة البحث العلمي وعمادات الكليات.','تطوير تعليمات الملكية الفكرية بما يتلاءم مع ما يستجد من تعليمات أو تكنولوجيات.','توثيق جميع الوثائق المتعلقة بالحصول على براءات الاختراع وحفظها وتبويبها وعمل سجلات خاصة لكل براءة مستصدرة.','متابعة الأعمال القانونية المترتبة على استصدار براءات الاختراع وفض النزاعات بالتنسيق مع لجنة البحث العلمي.','بناء قاعدة بيانات خاصة بمشاريع البحث العلمي وكل ما يتعلق بحقوق الملكية الفكرية في الجامعة.']} />
              </div>
              <p className="font-bold text-[#0f3057] mb-4">2. تتجير الإبداع والريادة</p>
              <div className="mb-8">
                <NumList items={['العمل مع لجنة البحث العلمي على دراسة عوائد نتاج البحث العلمي لإدراجها في موازنة الجامعة أو صندوق خاص.','إدارة وتسويق محافظ الملكية الفكرية الخاصة بالجامعة.','ربط القطاع الخاص بمراكز البحث العلمي التطبيقي في الجامعة.','دعم نمو وخلق البحث والتطوير من خلال تطوير الشراكة البحثية التعاونية مع الصناعة المحلية والخارجية.','تسهيل تطوير منشآت الأعمال الناجمة عن نتاج البحث العلمي داخل الجامعة بكافة أشكالها.','التفاوض بشأن الاتفاقيات المتعلقة بالملكية الفكرية وتنفيذها: عقود المشاريع المدعومة مع الصناعة، اتفاقيات التراخيص، اتفاقيات نقل المواد، اتفاقيات الأبحاث التعاونية.','ترويج الإبداع واتفاقيات التتجير الناجمة عن النشاط البحثي لباحثي الجامعة.','تشجيع المشاريع البحثية القابلة للتتجير.','إدارة شبكة الإبداع مع مراكز الإبداع والبحث العلمي في الجامعة وخارجها.','مراقبة العائد على الاستثمار وفعاليته للمشاريع البحثية التابعة للجامعة.','بناء قاعدة بيانات للمشاريع البحثية والمتحولة لمنشآت تجارية ومتابعتها.']} />
              </div>
              <div className="bg-[#0f3057] rounded-2xl px-6 py-5">
                <p className="text-white leading-relaxed">
                  <span className="font-bold text-[#c9a227]">3.</span> العمل على تشجيع الفعاليات
                  الابتكارية داخل الجامعة من خلال مركز دعم التكنولوجيا والابتكار التابع للمكتب.
                </p>
              </div>
            </div>
          </div>
        );

      case 'pub-issues':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">إصدارات العمادة</h2>
            <div className="bg-gradient-to-l from-[#8a6d1f] to-[#c9a227] rounded-3xl p-8">
              <p className="text-white/80 text-xs font-bold tracking-widest mb-3">صدر حديثاً</p>
              <h3 className="text-white text-2xl font-bold leading-snug mb-4">الزراعة في الأراضي المقدسة في فلسطين</h3>
              <span className="inline-flex items-center gap-2 text-white text-sm font-bold"><Download size={15} /> تحميل الإصدار (PDF)</span>
            </div>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
              <p className="text-gray-700 leading-[2.1] text-justify font-bold">
                صدر عن العمادة منذ نشأتها ما مجموعه (57) عنواناً لأعضاء هيئة التدريس من مختلف التخصصات
                الأكاديمية من المؤلفات الخاصة بهم، كما تقوم الجامعة بإصدار أعداد المجلة بسلسلتيها:
                سلسلة العلوم الإنسانية والاجتماعية بواقع (6) أعداد كل سنة، بالإضافة إلى سلسلة العلوم
                الطبيعية والتطبيقية، كما وتصدر العمادة المجلات المتخصصة في مجال اللغة العربية وآدابها
                والمجلة في القانون والعلوم السياسية بواقع أربعة أعداد لكل منهما في السنة، وتقوم العمادة
                بدورها في تشجيع أعضاء هيئة التدريس على دعم نشر الكتاب ذات الصبغة العلمية.
              </p>
            </div>
            <DocRow name="إصدارات عمادة البحث العلمي (القائمة الكاملة)" />
          </div>
        );

      case 'pub-gift':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">الإهداء والتبادل</h2>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
              <p className="text-gray-700 leading-[2.1] text-justify font-bold">
                تقوم العمادة بتبادل الإصدارات الصادرة عنها من مختلف المجلات مع العديد من الجامعات
                وعمادات البحث العلمي في الأردن وخارجها بهدف توزيعها على أكبر قدر ممكن من الباحثين
                والدارسين، كما وتتبادل مع هذه الجامعات — سواء المحلية منها أو الخارجية — كافة الإصدارات
                لتعريف أعضاء هيئة التدريس بكافة الموضوعات التي يتم نشر البحوث فيها.
              </p>
            </div>
          </div>
        );

      case 'pub-subs':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">الاشتراكات</h2>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
              <p className="text-gray-700 leading-[2.1] text-justify font-bold">
                عملت العمادة على تسويق إصداراتها داخلياً وخارجياً، لذا فهناك العديد من دور النشر
                والباحثين المشتركين في المجلات الصادرة عنها وهي: مجلة مؤتة للبحوث والدراسات بسلسلتيها
                (سلسلة العلوم الإنسانية والاجتماعية، وسلسلة العلوم الطبيعية والتطبيقية)، بالإضافة إلى
                المجلة الأردنية في اللغة العربية وآدابها، والمجلة الأردنية في القانون والعلوم السياسية.
              </p>
            </div>
            <DocRow name="للاشتراك يرجى التفضل بتعبئة النموذج" />
          </div>
        );

      case 'pub-agree':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">اتفاقيات النشر الإلكتروني</h2>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
              <p className="text-gray-700 leading-[2.1] text-justify font-bold">
                تشترك العمادة في هذا المجال مع عدد من المؤسسات الخاصة بنشر الأبحاث الأكاديمية في الوطن
                العربي.
              </p>
            </div>
          </div>
        );

      case 'pub-fairs':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">المعارض</h2>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
              <p className="text-gray-700 leading-[2.1] text-justify font-bold mb-6">
                شاركت العمادة بالعديد من المعارض بهدف التعريف بإنجازات البحث العلمي من إصدارات وتسويق
                هذه الإصدارات من كتب ومجلات، ومن هذه المعارض:
              </p>
              <div className="mb-6">
                <NumList items={['معرض الكتاب الدولي / عمان للسنوات من 2002 – 2009','معرض الكتاب (أنا الأردن إنجاز) 2015','معرض الكتاب في مجمع اللغة العربية / الجامعة الأردنية 2017']} />
              </div>
              <p className="text-gray-700 leading-[2.1] text-justify font-bold">
                هذا بالإضافة إلى المعارض المقامة على هامش عمل الندوات والمؤتمرات العلمية المقامة في
                جامعة مؤتة، وأيضاً المشاركة في المعارض المحلية داخل محافظة الكرك التي تهدف إلى عرض
                إنجازات عمادة البحث العلمي في خدمة المجتمع المحلي.
              </p>
            </div>
          </div>
        );

      case 'forms-procs':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">الإجراءات</h2>
            <div className="flex flex-col gap-3">
              {['إجراءات إغلاق المشاريع البحثية المدعومة من جامعة مؤتة','إجراءات الحصول على دعم مشروع بحثي من صندوق دعم البحث العلمي','إجراءات طلب دعم مشروع بحثي من جامعة مؤتة','إجراءات عقد مؤتمر أو مشاركة في مؤتمر'].map((d) => <DocRow key={d} name={d} />)}
            </div>
          </div>
        );

      case 'srv-eresearch':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">خدمات البحث العلمي الإلكتروني</h2>
            <p className="text-gray-700 leading-[2] text-justify">بوابة خدمات البحث العلمي الإلكتروني لأعضاء الهيئة التدريسية في جامعة مؤتة.</p>
            <a href="https://eportal.mutah.edu.jo/portf/main.php" target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-2 bg-[#0f3057] hover:bg-[#16457a] text-white text-sm font-bold px-6 py-3 rounded-lg transition-colors">
              <ExternalLink size={16} className="text-[#c9a227]" /> الانتقال إلى البوابة
            </a>
          </div>
        );

      case 'srv-scopus':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">SCOPUS</h2>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
              <p className="text-gray-700 leading-[2.1] text-justify font-bold">
                سكوبوس (Scopus) هي قاعدة بيانات تحتوي على ملخصات ومراجع من مقالات منشورة في مجلات
                أكاديمية محكمة، وتغطي تقريباً 22000 عنوان من أكثر من 5000 ناشر، منها 20000 مجلة يتم
                تقييمها بواسطة خبراء في التخصصات العلمية والتقنية والطبية والاجتماعية.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="https://www.scopus.com/sources.uri?zone=TopNavBar&origin=mylist" target="_blank" rel="noreferrer" className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-[#c9a227] transition-all block">
                <h3 className="font-bold text-[#0f3057] mb-2">المجلات المعتمدة في Scopus</h3>
                <span className="inline-flex items-center gap-1.5 text-[#c9a227] text-xs font-bold">فتح الرابط <ExternalLink size={13} /></span>
              </a>
              <a href="https://www.scopus.com/search/form.uri?display=basic&zone=TopNavBar&origin=sbrowse" target="_blank" rel="noreferrer" className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-[#c9a227] transition-all block">
                <h3 className="font-bold text-[#0f3057] mb-2">البحث عن مؤلفين أو أبحاث في Scopus</h3>
                <span className="inline-flex items-center gap-1.5 text-[#c9a227] text-xs font-bold">فتح الرابط <ExternalLink size={13} /></span>
              </a>
            </div>
          </div>
        );

      case 'srv-google':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">Google Scholar</h2>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
              <p className="text-gray-700 leading-[2.1] text-justify font-bold">
                هو محرك بحث للمؤلفات العلمية والأكاديمية التي يحتاج إليها الباحثون، يمكّن الباحث من
                البحث عبر العديد من المجالات العلمية كالأبحاث والرسائل العلمية والكتب من ناشرين
                أكاديميين ومؤسسات متخصصة ومراكز علمية وجامعات وغير ذلك من مؤسسات البحث العلمي، ويساعد
                الباحث على التعرف على أكثر الأبحاث العلمية صلة بمجال اختصاصه.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="https://scholar.google.com" target="_blank" rel="noreferrer" className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-[#c9a227] transition-all block">
                <h3 className="font-bold text-[#0f3057] mb-2">الموقع الإلكتروني</h3>
                <span className="inline-flex items-center gap-1.5 text-[#c9a227] text-xs font-bold">scholar.google.com <ExternalLink size={13} /></span>
              </a>
              <a href="https://www.mutah.edu.jo/docs/Google_Scholar_manual.pdf" target="_blank" rel="noreferrer" className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-[#c9a227] transition-all block">
                <h3 className="font-bold text-[#0f3057] mb-2">دليل استخدام Google Scholar</h3>
                <span className="inline-flex items-center gap-1.5 text-[#c9a227] text-xs font-bold">تحميل PDF <Download size={13} /></span>
              </a>
              <a href="https://accounts.google.com/SignUp?continue=https%3A%2F%2Fscholar.google.com%2F&hl=en" target="_blank" rel="noreferrer" className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-[#c9a227] transition-all block">
                <h3 className="font-bold text-[#0f3057] mb-2">إنشاء حساب</h3>
                <span className="inline-flex items-center gap-1.5 text-[#c9a227] text-xs font-bold">التسجيل <ExternalLink size={13} /></span>
              </a>
            </div>
          </div>
        );

      case 'srv-researchgate':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">ResearchGate</h2>
            <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
              <p className="text-gray-700 leading-[2.1] text-justify font-bold">
                هو موقع لشبكة علمية وأداة تعاون مجانية موجهة للباحثين العلميين من جميع تخصصات العلوم،
                توفر تطبيقات كالبحث، وتبادل الملفات، وتقاسم قاعدة البيانات للمنشورات، والمنتديات،
                والمناقشات المنهجية، ومجموعات البحث.
              </p>
            </div>
            <a href="https://www.researchgate.net/signup.SignUp.html" target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-2 bg-[#0f3057] hover:bg-[#16457a] text-white text-sm font-bold px-6 py-3 rounded-lg transition-colors">
              <ExternalLink size={16} className="text-[#c9a227]" /> إنشاء حساب على ResearchGate
            </a>
          </div>
        );

      case 'srv-proj-sys':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">نظام التقدم للمشاريع</h2>
            <p className="text-gray-700 leading-[2] text-justify">
              نظام إلكتروني للتقدم بطلبات دعم المشاريع البحثية في جامعة مؤتة.
            </p>
            <div className="flex flex-col gap-3">
              <DocRow name="دليل التقدم للمشاريع" />
              <DocRow name="تعليمات دعم المشاريع" />
            </div>
          </div>
        );

      case 'prod-db':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">قاعدة البيانات</h2>
            <Waiting />
          </div>
        );

      case 'srv-equip':
      case 'prod-equip':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[#0f3057] mb-2">اجهزة البحث العلمي في مختبرات الجامعة</h2>
              <p className="text-gray-600 text-[15px] leading-[2]">
                خدمة إلكترونية تتيح البحث عن الأجهزة البحثية المتوفرة في مختبرات جامعة مؤتة، من خلال اسم
                الجهاز أو الموديل، لتسهيل وصول الباحثين إلى الأجهزة اللازمة لأبحاثهم.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-6 rounded-full bg-[#c9a227] block" />
                <h3 className="text-[17.5px] font-bold text-[#0f3057]">نموذج البحث — find device</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13.5px] font-bold text-[#0f3057] mb-2">اسم الجهاز — Item Name</label>
                  <input
                    type="text"
                    placeholder="أدخل اسم الجهاز"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14.5px] focus:border-[#c9a227] focus:outline-none"
                    style={{ fontFamily: 'inherit' }}
                  />
                </div>
                <div>
                  <label className="block text-[13.5px] font-bold text-[#0f3057] mb-2">الموديل — Model</label>
                  <input
                    type="text"
                    placeholder="أدخل رقم الموديل"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[14.5px] focus:border-[#c9a227] focus:outline-none"
                    style={{ fontFamily: 'inherit' }}
                  />
                </div>
              </div>
              <button
                type="button"
                className="mt-6 px-8 py-3 rounded-xl bg-[#0f3057] text-white text-[14px] font-bold hover:bg-[#16457a] transition-colors"
                style={{ fontFamily: 'inherit' }}
              >
                بحث
              </button>
            </div>

            <div className="flex items-start gap-3 bg-[#F8FAFC] border border-dashed border-gray-200 rounded-2xl px-6 py-6">
              <Info size={18} className="text-gray-400 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-500 leading-relaxed">
                تعمل نتائج البحث على نظام العمادة الإلكتروني، ولا تُعرض قائمة الأجهزة ضمن صفحة الخدمة نفسها.
              </p>
            </div>

            <p className="text-[13px] text-gray-500 border-t border-gray-100 pt-5">
              تحليل وتصميم : د. أنس علي الكساسبة — كلية تكنولوجيا المعلومات
            </p>
          </div>
        );

      case 'prod-univ-proj':
      case 'prod-fund-proj':
      case 'prod-ext-proj': {
        const UNIV = ['Funded projects in 2006','Funded projects in 2007','Funded projects in 2008','Funded projects in 2009','Funded projects in 2011','Funded projects in 2013','Funded projects in 2014','Funded projects in 2015','Funded projects in 2016','Funded projects in 2016','Funded projects in 2018','Funded projects in 2019','Funded projects in 2020','Funded projects in 2021','Funded projects in 2022','Funded projects in 2023','Funded projects in 2024'];
        const SRSF = ['2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','SRSF sponsored Projects 2020','SRSF sponsored Projects 2021','SRSF sponsored Projects 2022','SRSF sponsored Projects 2023','SRSF sponsored Projects 2024'];
        const EXT = ['2005','2006','2008','2009','2010','2011','2012','2013','2014','2015','2018','2019','2020','External funded Projects 2021','External funded Projects 2022','External funded Projects 2023','External funded Projects 2024'];
        const map = {
          'prod-univ-proj': { title: 'المشاريع المدعومة من الجامعة', items: UNIV },
          'prod-fund-proj': { title: 'المشاريع المدعومة من صندوق دعم البحث العلمي', items: SRSF },
          'prod-ext-proj': { title: 'المشاريع المدعومة خارجياً', items: EXT }
        };
        const cur = map[activeItem];
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">{cur.title}</h2>
            <p className="text-gray-600 text-sm">قوائم المشاريع بحسب السنة — {cur.items.length} ملفاً.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cur.items.map((d) => <DocRow key={d} name={d} />)}
            </div>
          </div>
        );
      }

      case 'about-contact':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8">اتصل بنا</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8">
                <p className="text-xs font-bold text-[#c9a227] mb-2">العميد</p>
                <h3 className="text-xl font-bold text-[#0f3057] mb-6">الأستاذ الدكتور أسامه عيسى مهاوش</h3>
                <div className="flex flex-col gap-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-[#0f3057] mb-0.5">البريد الإلكتروني</p>
                      <p className="text-gray-600" dir="ltr">dean_dar@mutah.edu.jo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-[#0f3057] mb-0.5">هاتف</p>
                      <p className="text-gray-600" dir="ltr">0096232372380 — فرعي 6117</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="text-[#c9a227] w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-[#0f3057] mb-0.5">فاكس</p>
                      <p className="text-gray-600" dir="ltr">0096232370706</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <div className="flex items-start gap-3">
                  <MapPin className="text-[#c9a227] w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#0f3057] mb-3">العنوان</h4>
                    <p className="text-gray-700 leading-[2]">
                      عمادة البحث العلمي<br />
                      جامعة مؤتة<br />
                      الكرك، 61710، الأردن
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8 relative inline-block">
              {getSectionTitle(activeItem, RESEARCH_LINKS)}
              <div className="absolute -bottom-3 right-0 w-1/3 h-1 bg-[#c9a227] rounded-full"></div>
            </h2>
            <Waiting />
          </div>
        );
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] rtl bg-[#F8FAFC]"
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
              عمادة البحث العلمي
            </h2>
          </div>
          <nav className="flex flex-col gap-1.5">
            {RESEARCH_LINKS.map((link) => {
              const hasChildren = !!link.children;
              const isExpanded = expandedTab === link.id;
              const isChildActive = hasChildren ? link.children!.some(c => c.id === activeItem) : activeItem === link.id;

              return (
                <div key={link.id} className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      if (hasChildren) {
                        setExpandedTab(isExpanded ? null : link.id);
                        const first = link.children![0] as { id: string; url?: string } | undefined;
                        if (!isExpanded && first && !first.url) {
                          setActiveItem(first.id);
                        }
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
                      {link.children!.map((child) => {
                        const isActive = activeItem === child.id;
                        return (
                          <button
                            key={child.id}
                            onClick={() => {
                              if ((child as { url?: string }).url) {
                                window.open((child as { url?: string }).url, '_blank');
                                return;
                              }
                              setActiveItem(child.id);
                            }}
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
              src="https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Scientific Research"
              className="w-full h-full object-cover mix-blend-overlay"
            />
          </div>
          <div className="mx-auto px-8 relative z-20 flex flex-col items-center justify-center text-center h-full max-w-[1440px]">
            <Breadcrumbs align="center" className="mb-6" items={[{ label: 'عمادة البحث العلمي', onClick: () => setActiveItem('home') }, ...navTrail(RESEARCH_LINKS as any, activeItem).filter((n: any) => n.id !== 'home').map((n: any) => ({ label: n.name }))]} />
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight text-shadow-lg">
              عمادة البحث العلمي
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              الريادة والتميز في دعم وتوجيه البحث العلمي في الجامعة لخدمة المجتمع وتطوير المعرفة.
            </p>
          </div>
        </div>

        <div className="mx-auto px-6 md:px-10 w-full mb-24 relative max-w-[1440px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a227]/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0f3057]/5 rounded-full blur-3xl -z-10" />

          <div className="w-full min-w-0 relative overflow-hidden bg-white rounded-3xl p-8 lg:p-14 shadow-[0_20px_40px_-15px_rgba(15,48,87,0.05),_0_0_0_1px_rgba(15,48,87,0.03)] min-h-[600px]">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#c9a227] to-transparent opacity-40" />
            
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {renderContent()}
            </div>
          </div>
        </div>

        <WireframeFooter />
      </div>
    </div>
  );
}
