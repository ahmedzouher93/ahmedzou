import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { WireframeHeader } from "../../components/WireframeHeader";
import { WireframeFooter } from "../../components/WireframeFooter";
import { ChevronLeft, ChevronDown, ChevronRight, Menu, Mail, Phone, ExternalLink, GraduationCap } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import importedImage5 from "../../../imports/image-5.png";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

const MEDICINE_LINKS = [
  { name: "الرئيسية", path: "/medicine" },
  {
    name: "عن الكلية",
    path: "/medicine/about",
    children: [
      { name: "الرؤيا والرسالة والاهداف", path: "/medicine/about/vision" },
      { name: "مكتب العميد", path: "/medicine/about/dean" },
      { name: "مجلس الكلية", path: "/medicine/about/council" },
      { name: "لجان الكلية", path: "/medicine/about/committees" },
      { name: "الخطة الاستراتيجية", path: "/medicine/about/strategy" },
      { name: "الهيكل التنظيمي", path: "/medicine/about/structure" },
      { name: "الإداريون", path: "/medicine/about/staff" },
    ],
  },
  {
    name: "الاقسام",
    path: "/medicine/departments",
    expandOnly: true,
    children: [
      { name: "التشريح وعلم الأنسجة", path: "/medicine/departments/anatomy" },
      { name: "الكيمياء الحيوية وعلم وظائف الأعضاء", path: "/medicine/departments/biochemistry" },
      { name: "الصحة العامة وطب المجتمع", path: "/medicine/departments/public-health" },
      { name: "الأطفال", path: "/medicine/departments/pediatrics" },
      { name: "الطب الباطني والطب الشرعي", path: "/medicine/departments/internal-medicine" },
      { name: "علم الأحياء الدقيقة وعلم الأمراض", path: "/medicine/departments/microbiology" },
      { name: "النسائية والتوليد", path: "/medicine/departments/obgyn" },
      { name: "علم الأدوية", path: "/medicine/departments/pharmacology" },
      { name: "الجراحة الخاصة", path: "/medicine/departments/special-surgery" },
      { name: "الجراحة العامة والتخدير", path: "/medicine/departments/general-surgery" },
    ],
  },
  {
    name: "البرامج الاكاديمية",
    path: "/medicine/programs",
    children: [
      { name: "البكالوريس", path: "/medicine/programs/bachelor" },
      { name: "الدراسات العليا", path: "/medicine/programs/graduate" },
      { name: "أخرى", path: "/medicine/programs/other" },
    ],
  },
  { name: "اخبار وإعلانات", path: "/medicine/news" },
  { name: "نشاطات و انجازات", path: "/medicine/activities" },
  { name: "النماذج", path: "/medicine/forms" },
  { name: "روابط مهمه", path: "/medicine/links" },
];


const FACULTY_MEMBERS = [
  {name: "أ.د. أبو المعاطي", role: "رئيس القسم", specialty: "أستاذ", email: "abualmaati@mutah.edu.jo", ext: "4432", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"},
  {name: "أ.د. سارة أحمد", role: "عضو هيئة تدريس", specialty: "أستاذ", email: "sarah.a@mutah.edu.jo", ext: "4435", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"},
  {name: "د. محمد الحسن", role: "عضو هيئة تدريس", specialty: "أستاذ مشارك", email: "m.hasan@mutah.edu.jo", ext: "4438", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"},
  {name: "د. نورة السعيد", role: "عضو هيئة تدريس", specialty: "أستاذ مساعد", email: "noura.s@mutah.edu.jo", ext: "4441", image: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
];

const ANATOMY_LINKS = [
  { name: "الرئيسية", path: "/medicine/departments/anatomy" },
  { 
    name: "التخصصات الاكاديمية", 
    path: "#",
    children: [
      { name: "علم التشريح", path: "/medicine/departments/anatomy/courses?spec=anatomy" },
      { name: "علم الأنسجة", path: "/medicine/departments/anatomy/courses?spec=histology" },
      { name: "علم الأجنة", path: "/medicine/departments/anatomy/courses?spec=embryology" },
      { name: "علم الأحياء الخلوي", path: "/medicine/departments/anatomy/courses?spec=cellbiology" },
    ]
  },
  { name: "الهيئة التدريسية", path: "/medicine/departments/anatomy#faculty" },
  { name: "البرامج", path: "/medicine/departments/anatomy/programs" },
  { name: "النماذج", path: "/medicine/departments/anatomy/forms" },
  { name: "روابط هامة", path: "/medicine/departments/anatomy/links" },
];

export function MedicineLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedTab, setExpandedTab] = useState<string | null>(null);

  const isAnatomy = location.pathname.includes("anatomy");
  const isDept = location.pathname.startsWith("/medicine/departments/");
  const isAnatomyCourses = location.pathname.includes("anatomy/courses");
  
  let currentLinks = MEDICINE_LINKS;
  let sidebarTitle = "كلية الطب";
  
  if (isAnatomy) {
    currentLinks = ANATOMY_LINKS;
    sidebarTitle = "قسم التشريح وعلم الأنسجة";
  }

  let heroTitle = "كلية الطب";
  let heroSubtitle = "صرح علمي شامخ في جنوب المملكة الأردنية الهاشمية، تأسس عام 2001 ليخرج أجيالاً من الأطباء المتميزين.";
  let heroImage = importedImage5;

  if (isAnatomyCourses) {
    currentLinks = [
      { name: "العودة للقسم", path: "/medicine/departments/anatomy" },
      { name: "المقررات الدراسية", path: "#courses" },
      { name: "الخطط الدراسية", path: "#plans" }
    ];
    
    const searchParams = new URLSearchParams(location.search);
    const spec = searchParams.get('spec');
    
    if (spec === 'anatomy') heroTitle = "علم التشريح";
    else if (spec === 'histology') heroTitle = "علم الأنسجة";
    else if (spec === 'embryology') heroTitle = "علم الأجنة";
    else if (spec === 'cellbiology') heroTitle = "علم الأحياء الخلوي";
    else heroTitle = "التخصصات الاكاديمية";

    heroSubtitle = "دليل شامل للمواد التي يدرسها قسم التشريح وعلم الأنسجة، والخطط الأكاديمية لطلبة الطب والعلوم الصحية.";
    heroImage = "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
  } else if (isAnatomy) {
    heroTitle = "قسم التشريح وعلم الأنسجة";
    heroSubtitle = "أحد الأقسام الأساسية في كلية الطب بجامعة مؤتة، يهتم بتدريس علوم التشريح البشري، وعلم الأنسجة، والتكوين الجنيني لطلبة الطب والعلوم الصحية.";
    heroImage = "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
  }

  
  return (
    <div
      className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] rtl"
      dir="rtl"
      style={{ backgroundColor: "#F5F7F9", "--sidebar-offset": sidebarOpen ? "320px" : "0px" } as React.CSSProperties}
    >
      <WireframeHeader />

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
        {sidebarOpen ? <ChevronRight size={24} /> : <Menu size={24} />}
      </button>

      {/* Fixed Sidebar */}
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
            {/* Logo image removed as requested */}
            <h2
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: "1.4"
              }}
            >
              {sidebarTitle}
            </h2>
          </div>
          <nav className="flex flex-col gap-1.5">
            {currentLinks.map((link) => {
              if (link.children) {
                const isExpanded = expandedTab === link.name;
                const isChildActive = link.children.some((c) => (location.pathname + location.search) === c.path) || location.pathname === link.path;

                return (
                  <div key={link.name} className="flex flex-col gap-1">
                      <button
                        onClick={() => {
                          setExpandedTab(isExpanded ? null : link.name);
                          if (!(link as any).expandOnly && link.path && link.path !== "#" && link.path !== location.pathname) {
                            navigate(link.path);
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
                      onMouseEnter={(e) => {
                        if (!isChildActive && !isExpanded) {
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isChildActive && !isExpanded) {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                        }
                      }}
                    >
                      <span style={{ fontSize: "14.5px" }}>{link.name}</span>
                      <ChevronDown
                        size={16}
                        style={{
                          color: isChildActive || isExpanded ? "#c9a227" : "rgba(255,255,255,0.4)",
                          transform: isExpanded ? "rotate(180deg)" : "rotate(90deg)",
                          transition: "transform 0.2s",
                        }}
                      />
                    </button>
                    {isExpanded && (
                      <div className="flex flex-col gap-1 pr-4 border-r-2 border-white/10 mr-2 py-1">
                        {link.children.map((child) => {
                          const isActive = (location.pathname + location.search) === child.path || (location.pathname === link.path && !location.search && child.path === link.children[0].path);
                          return (
                            <Link
                              key={child.path}
                              to={child.path}
                              className="flex items-center justify-between w-full px-4 py-2.5 transition-all text-right rounded-lg"
                              style={{
                                background: isActive ? "rgba(201,162,39,0.15)" : "transparent",
                                color: isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
                                fontWeight: isActive ? 700 : 500,
                              }}
                              onMouseEnter={(e) => {
                                if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                              }}
                              onMouseLeave={(e) => {
                                if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
                              }}
                            >
                              <span style={{ fontSize: "13.5px" }}>{child.name}</span>
                              {isActive && <ChevronLeft size={14} style={{ color: "#c9a227" }} />}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive =
                location.pathname === link.path ||
                (!isAnatomy && link.path === "/medicine" && location.pathname === "/medicine/") ||
                (isAnatomy && link.path === "/medicine/departments/anatomy/strategy" && location.pathname === "/medicine/departments/anatomy");
              
              const isHashLink = link.path.includes('#');

              const linkContent = (
                <>
                  <span style={{ fontSize: "14.5px" }}>{link.name}</span>
                  {isActive && <ChevronLeft size={16} style={{ color: "#c9a227" }} />}
                </>
              );

              const linkProps = {
                className: "flex items-center justify-between w-full px-4 py-3.5 transition-all text-right",
                style: {
                  borderRadius: "12px",
                  background: isActive ? "rgba(201,162,39,0.15)" : "transparent",
                  color: isActive ? "#ffffff" : "rgba(255,255,255,0.7)",
                  fontWeight: isActive ? 700 : 500,
                  border: "1px solid",
                  borderColor: isActive ? "rgba(201,162,39,0.4)" : "transparent",
                },
                onMouseEnter: (e: any) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  }
                },
                onMouseLeave: (e: any) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }
                }
              };

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => {
                    if (isHashLink) {
                      const hash = link.path.split('#')[1];
                      const element = document.getElementById(hash);
                      
                      if (element) {
                        e.preventDefault();
                        element.scrollIntoView({ behavior: 'smooth' });
                        window.history.pushState(null, '', link.path);
                      }
                    }
                  }}
                  {...linkProps}
                >
                  {linkContent}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Page Content Wrapper (Pushed by sidebar on desktop) */}
      <div 
        className="flex-1 flex flex-col transition-all min-w-0"
        style={{
          marginRight: sidebarOpen ? "320px" : "0",
          transition: "margin-right 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Full-width Page Hero */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            paddingTop: "150px",
            paddingBottom: "80px",
            marginBottom: "60px",
          }}
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#0f3057]/85 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f3057] to-transparent z-10 opacity-70" />
            <ImageWithFallback
              src={heroImage}
              alt={heroTitle}
              className="w-full h-full object-cover mix-blend-overlay"
            />
          </div>
          <div
            className="mx-auto px-8 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 h-full"
            style={{ maxWidth: "1440px" }}
          >
            {/* Right Side: Title & Paragraph */}
            <div className={`w-full ${isAnatomy ? 'lg:w-[60%]' : 'lg:w-[45%]'} flex flex-col justify-center`}>
              {isDept && (
                <div className="flex mb-5" style={{ justifyContent: "flex-start" }}>
                  <button
                    onClick={() => navigate("/medicine")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "#c9a227", fontSize: "13.5px", fontWeight: 700 }}
                  >
                    <ChevronRight size={16} />
                    <span>العودة إلى كلية الطب</span>
                  </button>
                </div>
              )}
              <h1
                style={{
                  fontSize: "48px",
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: "20px",
                  lineHeight: "1.5",
                  textShadow: "0 4px 20px rgba(0,0,0,0.3)"
                }}
              >
                {heroTitle}
                {!isAnatomy && <span className="block text-[#c9a227] mt-2 text-3xl">جامعة مؤتة</span>}
              </h1>
              <p
                style={{
                  fontSize: "19px",
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: "1.8",
                  marginBottom: "32px",
                }}
              >
                {heroSubtitle}
              </p>

              <div className="flex flex-wrap gap-4">
                {isAnatomyCourses ? (
                  <>
                    <button 
                      onClick={() => {
                        document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-[#c9a227] hover:bg-[#b08d20] text-white text-lg px-8 py-3.5 rounded-xl font-bold transition-all shadow-[0_8px_20px_rgba(201,162,39,0.3)] hover:shadow-[0_8px_25px_rgba(201,162,39,0.4)] hover:-translate-y-1"
                    >
                      📚 المقررات
                    </button>
                    <button 
                      onClick={() => {
                        document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="border border-white/30 text-white hover:bg-white/10 text-lg px-8 py-3.5 rounded-xl font-bold transition-all backdrop-blur-sm"
                    >
                      📋 الخطط الدراسية
                    </button>
                  </>
                ) : (
                  <>
                    <button className="bg-[#c9a227] hover:bg-[#b08d20] text-white text-lg px-8 py-3.5 rounded-xl font-bold transition-all shadow-[0_8px_20px_rgba(201,162,39,0.3)] hover:shadow-[0_8px_25px_rgba(201,162,39,0.4)] hover:-translate-y-1">
                      {isAnatomy ? "عن القسم" : "استكشف الكلية"}
                    </button>
                    
                  </>
                )}
              </div>
            </div>

            {/* Left Side: Tabs / Features side-by-side on large screens if possible, or arranged nicely */}
            {!isAnatomy && (
              <div className="w-full lg:w-[50%] flex justify-end">
                <div 
                  className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-5" 
                >
                  {/* Feature 1 */}
                  <div className="flex flex-col gap-3 bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md transition-all group">
                    <div className="w-12 h-12 rounded-full bg-[#c9a227]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🏆
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#c9a227] mb-1">
                        برنامج البكالوريوس
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        برنامج الطب البشري المعتمد دولياً، 6 سنوات من التعليم المتميز.
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex flex-col gap-3 bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md transition-all group">
                    <div className="w-12 h-12 rounded-full bg-[#c9a227]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🏢
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#c9a227] mb-1">
                        10 أقسام أكاديمية
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        تغطي جميع التخصصات الطبية الأساسية والسريرية بأحدث المعامل.
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex flex-col gap-3 bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md transition-all group">
                    <div className="w-12 h-12 rounded-full bg-[#c9a227]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      🌍
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#c9a227] mb-1">
                        اعتماد دولي
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        معايير جودة عالمية وكادر تدريسي متميز من أكاديميين واستشاريين.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div
          className="mx-auto px-8 w-full mb-24 relative"
          style={{ maxWidth: "1440px" }}
        >
          {/* Decorative background blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a227]/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0f3057]/5 rounded-full blur-3xl -z-10" />

          <div
            className="w-full min-w-0 relative overflow-hidden"
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "50px 60px",
              boxShadow: "0 20px 40px -15px rgba(15,48,87,0.05), 0 0 0 1px rgba(15,48,87,0.03)",
              minHeight: "600px",
            }}
          >
            {/* Subtle top border gradient */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#c9a227] to-transparent opacity-40" />
            
            {location.pathname === "/medicine/departments/anatomy" || location.pathname === "/medicine/departments/anatomy/" ? (
              <div className="flex flex-col gap-20">
                {/* Section 1 */}
                <section>
                  <h2 className="text-2xl font-bold text-[#0f3057] mb-8 flex items-center gap-3">
                    <span className="text-[#c9a227] text-3xl">✦</span> عن القسم
                  </h2>
                  <div className="flex flex-col lg:flex-row gap-10 bg-white p-8 lg:p-10 rounded-[28px] border border-gray-100 shadow-[0_8px_30px_rgba(15,48,87,0.04)]">
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-[#0f3057] mb-6">قسم التشريح وعلم الأنسجة</h3>
                      <div className="inline-block bg-[#c9a227]/10 px-4 py-2 rounded-lg w-max mb-4 border border-[#c9a227]/20">
                        <h4 className="text-lg font-bold text-[#c9a227] flex items-center gap-2">
                          <span>📖</span> نبذة عن القسم
                        </h4>
                      </div>
                      <p className="text-gray-600 leading-[2.2] text-justify text-[16.5px]">
                        يركز القسم جهوده على الجانب المعرفي؛ لتقديم المعرفة العملية والتطبيقية لعلم التشريح والأنسجة والتكوين الجنيني للجوانب العامة والتفصيلية لأجهزة جسم الإنسان المختلفة، متوافقاً مع ما يمكن أن يربط التركيب بالوظيفة وبالجوانب التطبيقية والسريرية.
                      </p>
                    </div>
                    <div className="w-full lg:w-[45%] aspect-[4/3] bg-gray-100 rounded-[20px] overflow-hidden shadow-inner">
                      <ImageWithFallback src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" className="w-full h-full object-cover" alt="قسم التشريح" />
                    </div>
                  </div>
                </section>

                {/* Section 2 */}
                <section id="faculty">
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-[#0f3057] mb-3 flex items-center gap-3">
                      <span className="text-3xl">👥</span> الهيئة التدريسية
                    </h2>
                    <p className="text-gray-500 text-lg pr-12">نخبة من الأكاديميين المتميزين في القسم</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FACULTY_MEMBERS.map((prof, i) => (
                      <Dialog key={i}>
                        <DialogTrigger asChild>
                          <button className="block group text-right w-full h-full">
                            <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(15,48,87,0.03)] hover:shadow-[0_12px_40px_rgba(15,48,87,0.12)] transition-all hover:-translate-y-2 h-full relative overflow-hidden flex flex-col">
                              <div className="h-[280px] w-full relative overflow-hidden bg-gray-50 border-b border-gray-100">
                                <img src={prof.image} alt={prof.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" />
                              </div>
                              <div className="flex flex-col p-6 text-center items-center justify-center relative z-20">
                                <h3 className="font-bold text-[#0f3057] text-lg mb-1 group-hover:text-[#c9a227] transition-colors">{prof.name}</h3>
                                <p className="text-gray-500 font-medium text-sm mb-4">{prof.role}</p>
                                <span className="inline-block text-[#0f3057] px-4 py-1.5 rounded-full text-xs font-bold bg-[#c9a227]/10 border border-[#c9a227]/20">
                                  {prof.specialty}
                                </span>
                              </div>
                            </div>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] bg-white rounded-2xl overflow-hidden p-0 border-0 font-['Noto_Kufi_Arabic']" dir="rtl">
                          <DialogTitle className="sr-only">الملف الشخصي لـ {prof.name}</DialogTitle>
                          <DialogDescription className="sr-only">تفاصيل عضو الهيئة التدريسية ومعلومات التواصل</DialogDescription>
                          
                          <div className="flex flex-col md:flex-row h-full max-h-[400px]">
                            <div className="w-full md:w-2/5 h-[200px] md:h-full relative shrink-0">
                              <img src={prof.image} alt={prof.name} className="w-full h-full object-cover object-top" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0f3057]/90 via-[#0f3057]/20 to-transparent md:bg-gradient-to-l md:from-[#0f3057]/90 md:via-transparent md:to-transparent"></div>
                              <div className="absolute bottom-4 right-4 left-4 md:hidden text-white">
                                <h3 className="text-xl font-bold mb-1">{prof.name}</h3>
                                <p className="text-[#c9a227] font-bold text-sm">{prof.role}</p>
                              </div>
                            </div>
                            
                            <div className="w-full md:w-3/5 p-5 flex flex-col justify-between bg-white relative overflow-y-auto">
                              <div className="hidden md:block mb-4 border-b border-gray-100 pb-3">
                                <h3 className="text-xl font-bold text-[#0f3057] mb-1">{prof.name}</h3>
                                <p className="text-[#c9a227] font-semibold text-sm">{prof.role}</p>
                              </div>

                              <div className="mb-4">
                                <span className="inline-flex items-center gap-1.5 text-[#0f3057] px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0f3057]/5 border border-[#0f3057]/10">
                                  <GraduationCap className="w-3.5 h-3.5 text-[#c9a227]" />
                                  {prof.specialty}
                                </span>
                              </div>
                              
                              <div className="flex flex-col gap-2.5 text-sm w-full mb-5">
                                <div className="flex items-center gap-3 bg-gray-50/80 hover:bg-gray-50 transition-colors p-3 rounded-xl border border-gray-100">
                                  <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 text-[#0f3057]">
                                    <Mail className="w-4 h-4" />
                                  </div>
                                  <div className="overflow-hidden">
                                    <p className="text-[10px] text-gray-500 mb-0.5 font-medium">البريد الإلكتروني</p>
                                    <a href={`mailto:${prof.email}`} className="font-bold text-[#0f3057] hover:text-[#c9a227] transition-colors truncate block text-sm">
                                      {prof.email}
                                    </a>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-3 bg-gray-50/80 hover:bg-gray-50 transition-colors p-3 rounded-xl border border-gray-100">
                                  <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 text-[#0f3057]">
                                    <Phone className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-gray-500 mb-0.5 font-medium">رقم الهاتف (فرعي)</p>
                                    <p className="font-bold text-[#0f3057] text-sm">{prof.ext}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <Button 
                                  className="bg-[#0f3057] hover:bg-[#0a2040] text-white px-4 py-4 rounded-xl font-bold text-sm w-full shadow-md shadow-[#0f3057]/10 flex items-center justify-center gap-2 group transition-all"
                                  onClick={() => window.open('https://academics.mutah.edu.jo/Files/index.aspx', '_blank')}
                                >
                                  الصفحة الأكاديمية
                                  <ExternalLink className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </section>

                {/* Section 3 */}
                <section>
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold text-[#0f3057] mb-3 flex items-center gap-3">
                      <span className="text-3xl">🔗</span> روابط مهمة
                    </h2>
                    <p className="text-gray-500 text-lg pr-12">أهم المستندات والتعليمات</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                      {title: "دليل القسم 2024-2025", icon: "📄"},
                      {title: "النماذج الأكاديمية", icon: "📋"},
                      {title: "الخطة الدراسية", icon: "📘"},
                      {title: "الخطة الاستراتيجية للقسم", icon: "📊"},
                      {title: "الإنجازات", icon: "🏆"},
                      {title: "روابط مهمة", icon: "🔗"}
                    ].map((link, i) => (
                      <button key={i} className="flex items-center gap-5 bg-white p-5 rounded-[20px] border border-gray-100 shadow-sm hover:border-[#c9a227]/40 hover:bg-[#c9a227]/[0.02] hover:shadow-md transition-all text-right group">
                        <span className="text-3xl bg-gray-50 group-hover:bg-white w-14 h-14 flex items-center justify-center rounded-[14px] transition-colors shadow-inner group-hover:shadow-sm">{link.icon}</span>
                        <span className="font-bold text-[#0f3057] text-[16px]">{link.title}</span>
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>

        <WireframeFooter />
      </div>
    </div>
  );
}
