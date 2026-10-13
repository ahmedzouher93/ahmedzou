import ITEMS from './ItemsRegistry';
import { go, useTabRoute } from "../nav";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { WireframeHeader } from "../components/WireframeHeader";
import { WireframeFooter } from "../components/WireframeFooter";
import {
  ChevronRight,
  Menu,
  Search,
  CalendarDays as Calendar,
  BookOpen as FileText,
  Sliders as Settings,
  User,
  Award as GraduationCap,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  UserCheck,
  Globe,
  ClipboardList,
  BookMarked,
  MessageSquare,
  Microscope,
  Library,
  Briefcase,
  CreditCard,
  BookOpen,
  Award,
  CalendarCheck,
  Network,
  Monitor
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import importedImageMUTAH from "../../imports/MUTAH_LOGO.png"; // We can just use standard logo or an unsplash image for sidebar
import { NewsCard, NewsGrid } from '@/app/components/NewsCard';

const ADMISSION_LINKS = [
  { name: "الرئيسية", go: "top" },
  { name: "أنا طالب حالي", path: "#/admission-programs/current" },
  { name: "أنا طالب مستجد (2026/2027)", path: "#/admission-programs/new" },
  { name: "أنا خريج", path: "#/admission-programs/alumni" },
  {
    name: "عن الوحدة",
    children: [
      { name: "نبذة عن الوحدة", path: "#/admission-programs/about" },
      { name: "كلمة مدير الوحدة", path: "#/admission-programs/director" },
      { name: "اقتراحات واستفسارات", path: "#/admission-programs/suggestions" },
    ],
  },
  {
    name: "البرامج",
    children: [
      { name: "البرنامج العادي", path: "#/admission-programs/normal" },
      { name: "البرنامج الموازي", path: "#/admission-programs/parallel" },
      { name: "البرنامج الدولي", path: "#/admission-programs/international" },
      { name: "برامج الدراسات العليا", path: "#/admission-programs/postgraduate" },
    ],
  },
  { name: "الأخبار والإعلانات", go: "news" },
  { name: "اتصل بنا", go: "contact" },
];

const ServiceItem = ({ icon: Icon, label, subLabel, onClick }: { icon: React.ElementType; label: string; subLabel?: string; onClick?: () => void }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3.5 px-4 py-3.5 cursor-pointer transition-all"
    style={{
      background: "#fff",
      border: "1px solid rgba(15,48,87,0.07)",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(15,48,87,0.04)",
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = "#c9a227";
      el.style.boxShadow = "0 4px 16px rgba(201,162,39,0.1)";
      el.style.transform = "translateX(-3px)";
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = "rgba(15,48,87,0.07)";
      el.style.boxShadow = "0 1px 3px rgba(15,48,87,0.04)";
      el.style.transform = "translateX(0)";
    }}
  >
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{ width: "38px", height: "38px", background: "rgba(15,48,87,0.06)", borderRadius: "10px" }}
    >
      <Icon size={18} style={{ color: "#0f3057" }} />
    </div>
    <div className="flex flex-col">
      <span style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>{label}</span>
      {subLabel && (
        <span style={{ fontSize: "12px", fontWeight: 400, color: "#6b7280", marginTop: "2px" }}>{subLabel}</span>
      )}
    </div>
  </div>
);

const userTabs = [
  {
    id: "students",
    label: "طالب حالي",
    icon: User,
    sections: [
      {
        title: "الخدمات الأكاديمية",
        services: [
          { icon: Monitor, label: "بوابة الطلبة الإلكترونية" },
          { icon: Globe, label: "التعليم الإلكتروني" },
          { icon: ClipboardList, label: "الجداول الدراسية" },
          { icon: FileText, label: "كشف العلامات" },
        ],
      },
      {
        title: "خدمات أخرى",
        services: [
          { icon: BookMarked, label: "عمادة شؤون الطلبة" },
          { icon: MessageSquare, label: "الإرشاد الأكاديمي" },
          { icon: CalendarCheck, label: "تأجيل الفصل" },
        ],
      }
    ],
  },
  {
    id: "new",
    label: "أريد الالتحاق بالجامعة",
    icon: UserCheck,
    sections: [
      {
        title: "القبول والتسجيل",
        services: [
          { icon: FileText, label: "تقديم طلب التحاق", path: "/admission" },
          { icon: BookOpen, label: "البرامج والتخصصات" },
          { icon: CreditCard, label: "الرسوم الجامعية" },
          { icon: Award, label: "أسس القبول" },
        ],
      },
      {
        title: "مساعدة",
        services: [
          { icon: MessageSquare, label: "دليل الطالب المستجد" },
          { icon: CalendarCheck, label: "مواعيد التسجيل" },
        ],
      }
    ],
  },
  {
    id: "alumni",
    label: "أنا خريج",
    icon: GraduationCap,
    sections: [
      {
        title: "الوثائق",
        services: [
          { icon: GraduationCap, label: "إصدار مصدقة" },
          { icon: FileText, label: "طلب كشف علامات" },
          { icon: ClipboardList, label: "براءة الذمة" },
        ],
      },
      {
        title: "التواصل",
        services: [
          { icon: Network, label: "نادي الخريجين" },
          { icon: Briefcase, label: "التدريب والتوظيف" },
          { icon: Globe, label: "التحقق من الشهادات" },
        ],
      }
    ],
  },
];

export function Admission() {
  const goParam = new URLSearchParams(window.location.hash.split('?')[1] || '').get('go');
  useEffect(() => {
    if (!goParam) return;
    const t = setTimeout(() => {
      if (goParam === 'top') { window.scrollTo({ top: 0 }); return; }
      const el = document.getElementById(goParam);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 350);
    return () => clearTimeout(t);
  }, [goParam]);
  const [openGroup, setOpenGroup] = useState<string | null>("عن الوحدة");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useTabRoute("students");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(
    null,
  );

  // Show popup on mount
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const heroImage =
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";

  return (
    <div
      className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] rtl"
      dir="rtl"
      style={
        {
          backgroundColor: "#F5F7F9",
          "--sidebar-offset": sidebarOpen ? "320px" : "0px",
        } as React.CSSProperties
      }
    >
      <WireframeHeader />

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0f3057]/70 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[24px] shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-300 relative border border-[#c9a227]/20">
            {/* Top decorative bar */}
            <div className="h-2 w-full bg-gradient-to-r from-transparent via-[#c9a227] to-transparent" />

            <div className="p-8">
              <div className="inline-flex items-center mb-4 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                إعلان مهم
              </div>

              <h2 className="text-2xl font-bold text-[#0f3057] mb-4 leading-relaxed">
                تمديد فترة التسجيل الإلكتروني للفصل الأول
                2026/2027
              </h2>

              <p className="text-gray-600 leading-loose mb-8 text-[15px]">
                تعلن وحدة القبول والتسجيل تمديد فترة التسجيل
                الإلكتروني حتى نهاية دوام يوم الخميس الموافق
                10/9/2026، وذلك دون احتساب رسوم تأخير. يرجى
                استكمال إجراءات التسجيل ضمن الفترة المحددة.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowPopup(false)}
                  className="flex-1 bg-[#0f3057] hover:bg-[#c9a227] text-white hover:text-[#0f3057] py-3.5 rounded-xl font-bold transition-colors"
                >
                  عرض تفاصيل التسجيل
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-6 py-3.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  لاحقاً
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Toggle Button */}
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
        aria-label="Toggle Sidebar"
      >
        {sidebarOpen ? (
          <ChevronRight size={24} />
        ) : (
          <Menu size={24} />
        )}
      </button>

      {/* Fixed Sidebar */}
      <div
        className="fixed top-0 bottom-0 right-0 z-[52] overflow-y-auto"
        style={{
          width: "320px",
          backgroundColor: "#0f3057",
          boxShadow: "-4px 0 24px rgba(15,48,87,0.15)",
          borderLeft: "1px solid rgba(255,255,255,0.05)",
          transform: sidebarOpen
            ? "translateX(0)"
            : "translateX(100%)",
          transition:
            "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="p-6 pt-10 pb-20">
          <div className="mb-10 px-4 flex items-center gap-4">
            <h2 className="text-[20px] font-bold text-white leading-[1.4]">
              وحدة القبول والتسجيل
            </h2>
          </div>
          <nav className="flex flex-col gap-2">
            {ADMISSION_LINKS.map((link: any, idx: number) => link.children ? (
              <div key={idx} className="flex flex-col">
                <button
                  onClick={() => setOpenGroup(openGroup === link.name ? null : link.name)}
                  className="flex items-center justify-between gap-3 w-full px-4 py-3.5 transition-all text-right rounded-xl text-[14.5px] font-medium text-white/70 hover:bg-white/5 hover:text-white border border-transparent hover:border-white/10"
                >
                  <span>{link.name}</span>
                  <span style={{ fontSize: "11px", transform: openGroup === link.name ? "rotate(180deg)" : "none", transition: "transform .25s" }}>▼</span>
                </button>
                {openGroup === link.name && (
                  <div className="flex flex-col gap-1 mt-1 pr-3" style={{ borderRight: "1px solid rgba(255,255,255,0.15)" }}>
                    {link.children.map((c: any, ci: number) => (
                      <a key={ci} href={c.path} onClick={(ev) => { ev.preventDefault(); go(c.path); }} className="px-4 py-3 rounded-xl text-[13.5px] text-white/60 hover:bg-white/5 hover:text-white transition-all text-right">
                        {c.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={idx}
                onClick={() => {
                  if (link.path) { go(link.path); return; }
                  if (link.go === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
                  const el = document.getElementById(link.go);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-3 w-full px-4 py-3.5 transition-all text-right rounded-xl text-[14.5px] font-medium text-white/70 hover:bg-white/5 hover:text-white group border border-transparent hover:border-white/10"
              >
                <span>{link.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Page Content Wrapper (Pushed by sidebar on desktop) */}
      <div
        className="flex-1 flex flex-col transition-all min-w-0"
        style={{
          marginRight: sidebarOpen ? "320px" : "0",
          transition:
            "margin-right 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Full-width Page Hero */}
        <div
          className="relative overflow-hidden"
          style={{
            paddingTop: "160px",
            paddingBottom: "100px",
            marginBottom: "0px",
          }}
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#0f3057]/85 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f3057] to-transparent z-10 opacity-70" />
            <ImageWithFallback
              src={heroImage}
              alt="القبول والتسجيل"
              className="w-full h-full object-cover mix-blend-overlay"
            />
          </div>
          <div className="mx-auto px-8 relative z-20 flex flex-col items-center justify-center text-center h-full max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-[1.3] text-shadow-lg">
              مرحباً بك، كيف يمكننا مساعدتك اليوم؟
            </h1>
            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">
              بوابتك الشاملة لجميع الخدمات الأكاديمية والتسجيلية
              في جامعة مؤتة. نحن هنا لتبسيط مسيرتك الجامعية.
            </p>
          </div>
        </div>

        {/* Marquee Ticker */}
        <div className="bg-[#c9a227] text-[#0f3057] py-3 overflow-hidden flex items-center relative z-20 shadow-md">
          <div className="absolute right-0 top-0 bottom-0 bg-[#c9a227] z-10 px-6 flex items-center font-bold shadow-[10px_0_20px_#c9a227]">
            إعلانات هامة:
          </div>
          <div className="whitespace-nowrap animate-[marquee-rtl_40s_linear_infinite] hover:[animation-play-state:paused] inline-flex items-center gap-16 mr-36">
            <span className="font-medium text-[15px] flex items-center gap-3">
              بدء استقبال طلبات الالتحاق لبرنامج الموازي للفصل
              الدراسي الأول{" "}
              
            </span>
            <span className="font-medium text-[15px] flex items-center gap-3">
              إعلان هام بخصوص امتحانات المستوى للطلبة الجدد{" "}
              
            </span>
            <span className="font-medium text-[15px] flex items-center gap-3">
              تأجيل موعد بدء السحب والإضافة لمدة يومين{" "}
              
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mx-auto px-6 md:px-10 w-full mb-24 relative mt-16 max-w-[1440px]">
          
          {/* User Categories Tabs */}
          <section className="mb-20" id="categories">
            <div
              style={{
                border: "1px solid rgba(15,48,87,0.12)",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(15,48,87,0.08)",
                backgroundColor: "#fff"
              }}
            >
              {/* Tab bar */}
              <div style={{ background: "#0f3057" }} className="flex">
                {userTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="flex-1 flex items-center justify-center gap-2.5 py-5 transition-all"
                      style={{
                        fontSize: "15px",
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? "#c9a227" : "rgba(255,255,255,0.8)",
                        background: isActive ? "rgba(201,162,39,0.1)" : "transparent",
                        borderBottom: isActive ? "3px solid #c9a227" : "3px solid transparent",
                        borderLeft: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <Icon size={18} style={{ color: isActive ? "#c9a227" : "rgba(255,255,255,0.55)", flexShrink: 0 }} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Content */}
              <div style={{ background: "#F5F7F9" }} className="p-8">
                {userTabs.map((tab) => {
                  if (tab.id !== activeTab) return null;
                  return (
                    <div key={tab.id} className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
                      {tab.sections.map((section) => {
                        const key = `${activeTab}-${section.title}`;
                        const isExpanded = expanded[key];
                        const visible = isExpanded ? section.services : section.services.slice(0, 5);

                        return (
                          <div key={section.title}>
                            {/* Section title */}
                            <div className="mb-4 pb-3" style={{ borderBottom: "2px solid #c9a227", display: "inline-block" }}>
                              <span style={{ fontSize: "14px", fontWeight: 700, color: "#0f3057", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                                {section.title}
                              </span>
                            </div>

                            <div className="space-y-3">
                              {visible.map((svc) => (
                                <ServiceItem 
                                  key={svc.label} 
                                  icon={svc.icon} 
                                  label={svc.label} 
                                  subLabel={(svc as any).subLabel} 
                                  onClick={() => {
                                    if ((svc as any).path) navigate((svc as any).path);
                                  }}
                                />
                              ))}
                            </div>

                            {section.services.length > 5 && (
                              <button
                                onClick={() => setExpanded((prev) => ({ ...prev, [key]: !isExpanded }))}
                                className="flex items-center gap-2 mt-4 transition-all"
                                style={{ fontSize: "14px", color: "#0f3057", fontWeight: 600, background: "transparent" }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c9a227"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#0f3057"; }}
                              >
                                {isExpanded ? "عرض أقل" : "اقرأ المزيد"}
                                {isExpanded ? (
                                  <ChevronDown size={14} style={{ transform: "rotate(180deg)" }} />
                                ) : (
                                  <ArrowLeft size={14} />
                                )}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Calendar Preview Section */}
          <section className="mb-20 bg-[#F5F7F9] rounded-[24px] p-8 md:p-10 border border-gray-200" id="calendar">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[#0f3057] mb-3 flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-[#c9a227]" />{" "}
                  التقويم الجامعي
                </h2>
                <p className="text-gray-600 text-lg">
                  استعرض المواعيد الأكاديمية والفعاليات الجامعية
                </p>
              </div>
              <Link
                to="/calendar"
                className="text-[#0f3057] font-bold hover:text-[#c9a227] bg-white px-6 py-3 rounded-xl border border-gray-200 transition-all shadow-sm flex items-center gap-2"
              >
                التقويم كاملًا <ArrowLeft size={18} />
              </Link>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="ابحث في التقويم..." 
                  className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pr-12 pl-4 focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227] transition-all"
                />
              </div>
              <div className="flex gap-4">
                <select className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 focus:outline-none focus:border-[#0f3057] text-[#0f3057] font-bold min-w-[140px]">
                  <option>السنة الحالية</option>
                  <option>السنة السابقة</option>
                  <option>السنة القادمة</option>
                </select>
                <select className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 focus:outline-none focus:border-[#0f3057] text-[#0f3057] font-bold min-w-[140px]">
                  <option>الفصل الأول</option>
                  <option>الفصل الثاني</option>
                  <option>الفصل الصيفي</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { day: "15", month: "أكتوبر", title: "بدء الفصل الدراسي الأول", desc: "دوام الطلبة وبدء المحاضرات" },
                { day: "22", month: "أكتوبر", title: "نهاية السحب والإضافة", desc: "آخر موعد لتعديل الجداول" },
                { day: "10", month: "نوفمبر", title: "بدء امتحانات المنتصف", desc: "امتحانات الميدتيرم لجميع الكليات" },
                { day: "25", month: "ديسمبر", title: "عطلة رسمية", desc: "عيد الميلاد المجيد" },
              ].map((date, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-gray-100 flex items-center gap-5 hover:border-[#c9a227]/40 hover:shadow-md transition-all group"
                >
                  <div className="flex flex-col items-center justify-center shrink-0 w-[70px] h-[75px] bg-[#F5F7F9] rounded-xl border border-gray-200 group-hover:bg-[#0f3057] group-hover:border-[#0f3057] transition-colors">
                    <span className="text-2xl font-bold text-[#0f3057] group-hover:text-[#c9a227] leading-none mb-1">
                      {date.day}
                    </span>
                    <span className="text-xs font-bold text-gray-500 group-hover:text-white">
                      {date.month}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f3057] mb-1 group-hover:text-[#c9a227] transition-colors">
                      {date.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {date.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
{/* Most Used Services */}
          <section id="services" className="mb-20 bg-white rounded-[24px] p-8 md:p-10 border border-gray-100 shadow-sm">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8 text-center">
              الخدمات الأكثر استخدامًا
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  title: "تقديم طلب التحاق",
                  icon: <UserCheck size={28} />,
                },
                {
                  title: "نظام معلومات الطلبة",
                  icon: <Settings size={28} />,
                },
                {
                  title: "الرسوم الدراسية",
                  icon: <FileText size={28} />,
                },
                {
                  title: "البرامج والتخصصات",
                  icon: <GraduationCap size={28} />,
                },
                {
                  title: "بوابة الخريجين",
                  icon: <GraduationCap size={28} />,
                },
                {
                  title: "التقويم الجامعي",
                  icon: <Calendar size={28} />,
                },
              ].map((srv, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-white flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-gray-100 hover:border-[#c9a227] hover:shadow-[0_8px_20px_rgba(201,162,39,0.15)] transition-all group"
                >
                  <div className="text-[#0f3057] group-hover:text-[#c9a227] group-hover:scale-110 transition-transform">
                    {srv.icon}
                  </div>
                  <span className="font-bold text-sm text-[#0f3057]">
                    {srv.title}
                  </span>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* News and Announcements (Full Width) */}
        <section id="news" className="w-full bg-white py-20 border-y border-gray-100 mb-20 shadow-sm">
          <div className="mx-auto px-6 md:px-10 max-w-[1440px]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-[#0f3057] mb-2 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-[#c9a227]" />{" "}
                  الأخبار والإعلانات
                </h2>
              </div>
              <Link
                to="/u-list/adm-news"
                className="text-[#0f3057] font-bold hover:text-[#c9a227] transition-colors flex items-center gap-2 border border-gray-200 px-5 py-2.5 rounded-xl hover:border-[#c9a227]"
              >
                جميع الأخبار <ArrowLeft size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ITEMS["adm-news"].items.map((news, i) => (
                <NewsCard key={i} to={'/u-item/adm-news/' + i} title={news.title} date={news.date} img={news.img} />
              ))}
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-16 mb-8">
              <h2 className="text-3xl font-bold text-[#0f3057] flex items-center gap-3">
                <FileText className="w-8 h-8 text-[#c9a227]" /> إعلانات
              </h2>
              <Link to="/u-list/adm-ann" className="text-[#0f3057] font-bold hover:text-[#c9a227] transition-colors flex items-center gap-2 border border-gray-200 px-5 py-2.5 rounded-xl hover:border-[#c9a227]">
                جميع الاعلانات <ArrowLeft size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ITEMS["adm-ann"].items.map((an: any, i: number) => (
                <Link key={i} to={'/u-item/adm-ann/' + i} className="flex items-center gap-5 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:border-[#c9a227] hover:shadow-md transition-all group">
                  <img src={an.img} alt={an.title} loading="lazy" className="w-16 h-16 object-contain bg-gray-50 rounded-xl shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-bold text-[#0f3057] leading-relaxed group-hover:text-[#c9a227]">{an.title}</h3>
                    <span className="text-xs font-bold text-[#c9a227] mt-2 block" dir="ltr">{an.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Re-open main container for FAQ */}
        <div className="mx-auto px-6 md:px-10 w-full mb-24 relative max-w-[1440px]">
          {/* FAQ Accordion */}
          <section className="max-w-4xl mx-auto bg-white rounded-[24px] p-8 md:p-10 border border-gray-100 shadow-sm" id="faq">
            <h2 className="text-3xl font-bold text-[#0f3057] mb-8 text-center">
              الأسئلة الشائعة
            </h2>

            <div className="space-y-4 mb-8">
              {[
                {
                  q: "ما هي الأوراق المطلوبة لاستكمال التسجيل للطلبة المستجدين؟",
                  a: "تشمل الأوراق المطلوبة: كشف علامات الثانوية العامة الأصلي، صورة مصدقة عن هوية الأحوال المدنية، شهادة ميلاد أصلية أو مصدقة، 4 صور شخصية، دفتر خدمة العلم للذكور الأردنيين.",
                },
                {
                  q: "كيف يمكنني الحصول على كشف علامات أو مصدقة؟",
                  a: "يمكن تقديم طلب الحصول على الوثائق عبر نظام معلومات الطلبة واختيار 'طلب وثيقة'. يمكن استلامها شخصياً من وحدة القبول والتسجيل بعد يومي عمل.",
                },
                {
                  q: "ما هي شروط الانتقال من تخصص لآخر؟",
                  a: "يُشترط توفر شاغر في التخصص المطلوب، وأن يكون معدل الطالب في الثانوية العامة يسمح بقبوله في التخصص في سنة حصوله على الثانوية، وألا يكون مفصولاً من التخصص.",
                },
                {
                  q: "متى يبدأ السحب والإضافة للفصل القادم؟",
                  a: "تُعلن مواعيد السحب والإضافة عبر التقويم الجامعي وعلى صفحة الإعلانات، وعادة ما تكون في الأسبوع الذي يسبق بدء التدريس وتستمر للأسبوع الأول من الفصل.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() =>
                      setActiveFaq(activeFaq === i ? null : i)
                    }
                    className="w-full flex items-center justify-between p-6 text-right transition-colors hover:bg-gray-50/50"
                  >
                    <span
                      className={`font-bold text-lg transition-colors ${activeFaq === i ? "text-[#c9a227]" : "text-[#0f3057]"}`}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`shrink-0 transition-transform duration-300 ${activeFaq === i ? "rotate-180 text-[#c9a227]" : "text-gray-400"}`}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight:
                        activeFaq === i ? "200px" : "0",
                    }}
                  >
                    <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button className="px-8 py-3.5 bg-white border-2 border-gray-100 hover:border-[#c9a227] text-[#0f3057] font-bold rounded-xl transition-all shadow-sm">
                استعرض المزيد من الأسئلة
              </button>
            </div>
          </section>
        </div>

        {/* We need WireframeFooter inside the scrollable area */}
      <div id="contact"><WireframeFooter /></div>
      </div>

      {/* Required for marquee animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee-rtl {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `,
        }}
      />
    </div>
  );
}