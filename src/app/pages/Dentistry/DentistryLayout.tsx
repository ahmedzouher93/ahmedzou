import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { Breadcrumbs, pathTrail } from "../../components/Breadcrumbs";
import { WireframeHeader } from "../../components/WireframeHeader";
import { WireframeFooter } from "../../components/WireframeFooter";
import { ChevronLeft, ChevronDown, ChevronRight, Menu } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { useState } from "react";

const DENTISTRY_LINKS = [
  { name: "الرئيسية", path: "/dentistry" },
  {
    name: "عن الكلية",
    path: "/dentistry/about",
    children: [
      { name: "الرؤية والرسالة والاهداف", path: "/dentistry/about/vision" },
      { name: "الخطة الاستيراتيجية", path: "/dentistry/about/strategy" },
      { name: "مكتب العميد", path: "/dentistry/about/dean" },
      { name: "مجلس الكلية", path: "/dentistry/about/council" },
      { name: "لجان الكلية", path: "/dentistry/about/committees" },
      { name: "العمداء السابقون", path: "/dentistry/about/former-deans" },
      { name: "الموظفون الاداريون", path: "/dentistry/about/staff" },
    ],
  },
  { name: "الاقسام", path: "/dentistry#departments" },
  {
    name: "البرامج الاكاديمية",
    path: "/dentistry/programs",
    children: [
      { name: "البكالوريوس", path: "/dentistry/programs/bachelor" },
      { name: "الدراسات العليا", path: "/dentistry/programs/graduate" },
      { name: "برامج أخرى", path: "/dentistry/programs/other" },
    ],
  },
  { name: "الانجازات", path: "/dentistry/achievements" },
  { name: "المؤتمرات", path: "/dentistry/conferences" },
  { name: "النماذج", path: "/dentistry/forms" },
  { name: "روابط هامة", path: "/dentistry/links" },
  { name: "إتصل بنا", path: "/dentistry/contact" },
];

const DENTAL_SCIENCES_LINKS = [
  { name: "الرئيسية", path: "/dentistry/departments/dental-sciences" },
  { name: "الاستيراتيجية", path: "/dentistry/departments/dental-sciences/strategy" },
  { name: "الهيئة التدريسية", path: "/dentistry/departments/dental-sciences#faculty" },
  { name: "المواد الدراسية", path: "/dentistry/departments/dental-sciences/courses" },
  { name: "البرامج الدراسية", path: "/dentistry/departments/dental-sciences/programs" },
  { name: "الخطط الدراسية", path: "/dentistry/departments/dental-sciences/plans" },
  { name: "النماذج", path: "/dentistry/departments/dental-sciences/forms" },
  { name: "الإنجازات", path: "/dentistry/departments/dental-sciences/achievements" },
];

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";

export function DentistryLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedTab, setExpandedTab] = useState<string | null>(null);

  const isDept = location.pathname.includes("/departments/dental-sciences");

  const currentLinks = isDept ? DENTAL_SCIENCES_LINKS : DENTISTRY_LINKS;
  const sidebarTitle = isDept ? "قسم العلوم السنية والطبية" : "كلية طب وجراحة الأسنان";
  const heroTitle = isDept ? "قسم العلوم السنية والطبية" : "كلية طب وجراحة الأسنان";
  const heroSubtitle = isDept
    ? "ركيزة أساسية في منظومة الكلية، وجسر يربط بين العلوم الطبية الأساسية والتخصصات السنية التطبيقية، ليُكوّن قاعدة علمية متينة تُبنى عليها مهارات الطبيب المتميز."
    : "صرح أكاديمي جديد في جامعة مؤتة، يجمع مناهج تعليمية متطورة ومرافق متقدمة وعيادات حديثة لإعداد جيل متميز من أطباء الأسنان.";

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
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#ffffff", lineHeight: "1.4" }}>
              {sidebarTitle}
            </h2>
          </div>
          <nav className="flex flex-col gap-1.5">
            {currentLinks.map((link) => {
              if (link.children) {
                const isExpanded = expandedTab === link.name;
                const isChildActive =
                  link.children.some((c) => location.pathname + location.search === c.path) ||
                  location.pathname === link.path;

                return (
                  <div key={link.name} className="flex flex-col gap-1">
                    <button
                      onClick={() => {
                        setExpandedTab(isExpanded ? null : link.name);
                        if (link.path && link.path !== "#" && link.path !== location.pathname) {
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
                          const isActive = location.pathname + location.search === child.path;
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
                (link.path === "/dentistry" && location.pathname === "/dentistry/");
              const isHashLink = link.path.includes("#");

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => {
                    if (isHashLink) {
                      const hash = link.path.split("#")[1];
                      const element = document.getElementById(hash);
                      if (element) {
                        e.preventDefault();
                        const top = element.getBoundingClientRect().top + window.scrollY - 90;
                        window.scrollTo({ top, behavior: "smooth" });
                      } else {
                        e.preventDefault();
                        navigate("/dentistry");
                        setTimeout(() => {
                          const el = document.getElementById(hash);
                          if (el) {
                            const t = el.getBoundingClientRect().top + window.scrollY - 90;
                            window.scrollTo({ top: t, behavior: "smooth" });
                          }
                        }, 350);
                      }
                    }
                  }}
                  className="flex items-center justify-between w-full px-4 py-3.5 transition-all text-right"
                  style={{
                    borderRadius: "12px",
                    background: isActive ? "rgba(201,162,39,0.15)" : "transparent",
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.7)",
                    fontWeight: isActive ? 700 : 500,
                    border: "1px solid",
                    borderColor: isActive ? "rgba(201,162,39,0.4)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <span style={{ fontSize: "14.5px" }}>{link.name}</span>
                  {isActive && <ChevronLeft size={16} style={{ color: "#c9a227" }} />}
                </Link>
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
              src={HERO_IMAGE}
              alt={heroTitle}
              className="w-full h-full object-cover mix-blend-overlay"
            />
          </div>
          <div
            className="mx-auto px-8 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-12 h-full"
            style={{ maxWidth: "1440px" }}
          >
            <div className={`w-full ${isDept ? "lg:w-[60%]" : "lg:w-[45%]"} flex flex-col justify-center`}>
              <Breadcrumbs className="mb-6" items={[
                { label: 'كليات وعمادات', to: '/faculties' },
                { label: 'كلية طب وجراحة الأسنان', to: '/dentistry' },
                ...(isDept ? [{ label: 'الأقسام' }, { label: 'قسم العلوم السنية والطبية', to: '/dentistry/departments/dental-sciences' }] : []),
                ...pathTrail(currentLinks, location.pathname)
                  .filter((n: any) => n.path !== '/dentistry' && n.path !== '/dentistry/departments/dental-sciences')
                  .map((n: any) => ({ label: n.name, to: n.children ? undefined : n.path })),
              ]} />
              <h1
                style={{
                  fontSize: "48px",
                  fontWeight: 800,
                  color: "#ffffff",
                  marginBottom: "20px",
                  lineHeight: "1.2",
                  textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
              >
                {heroTitle}
                {!isDept && <span className="block text-[#c9a227] mt-2 text-3xl">جامعة مؤتة</span>}
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
                <button className="bg-[#c9a227] hover:bg-[#b08d20] text-white text-lg px-8 py-3.5 rounded-xl font-bold transition-all shadow-[0_8px_20px_rgba(201,162,39,0.3)] hover:shadow-[0_8px_25px_rgba(201,162,39,0.4)] hover:-translate-y-1">
                  {isDept ? "عن القسم" : "استكشف الكلية"}
                </button>
              </div>
            </div>

            {!isDept && (
            <div className="w-full lg:w-[50%] flex justify-end">
              <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-5">
                <div className="flex flex-col gap-3 bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md transition-all group">
                  <div className="w-12 h-12 rounded-full bg-[#c9a227]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    🦷
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#c9a227] mb-1">بكالوريوس طب الأسنان</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      برنامج طب وجراحة الفم والأسنان بمناهج تعليمية متطورة وتدريب سريري.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md transition-all group">
                  <div className="w-12 h-12 rounded-full bg-[#c9a227]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    🏢
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#c9a227] mb-1">5 أقسام أكاديمية</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      تغطي العلوم السنية والطبية والجراحة والتقويم والاستعاضة والمعالجة التحفظية.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md transition-all group">
                  <div className="w-12 h-12 rounded-full bg-[#c9a227]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    🔬
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#c9a227] mb-1">14 مختبراً</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      مختبرات أساسية وتخصصية لتمكين الطلبة من المهارات الأساسية لطب الأسنان.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mx-auto px-8 w-full mb-24 relative" style={{ maxWidth: "1440px" }}>
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
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#c9a227] to-transparent opacity-40" />
            <Outlet />
          </div>
        </div>

        <WireframeFooter />
      </div>
    </div>
  );
}
