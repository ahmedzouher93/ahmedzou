import { go } from "../nav";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  Search, Globe, Menu, X, ChevronLeft, Check,
  Mail, Phone, Calendar, Facebook,
  Home, Info, GraduationCap, Building2, FileText, Scale, Phone as PhoneIcon, Microscope, BookOpen,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import mutahLogo from "@/imports/MUTAH_LOGO.png";
import { getLang, setLang, applyDir, t } from "@/app/i18n";

const navItems = [
  {
    label: "الرئيسية",
    icon: Home,
    hasChildren: false,
    path: "/",
  },
  {
    label: "عن الجامعة",
    icon: Info,
    hasChildren: true,
    path: "/about",
    children: [
      "نبذة عن الجامعة", "الرؤية والرسالة والقيم", "رئاسة الجامعة",
      "نواب الرئيس", "مجلس الأمناء", "مجلس الجامعة",
      "مجلس العمداء", "الرؤساء السابقون", "الخطة الاستراتيجية",
      "مدونات السلوك", "الخطة الإجرائية", "خطة إدارة المخاطر",
      "مجلة جامعة مؤتة", "التقرير السنوي"
    ],
  },
  {
    label: "الكليات والعمادات",
    icon: GraduationCap,
    hasChildren: true,
    childrenCategories: [
      {
        title: "الدراسات العليا",
        items: [{ label: "كلية الدراسات العليا", path: "/graduate-studies" }]
      },
      {
        title: "الكليات العلمية",
        items: [
          { label: "الطب", path: "/medicine" }, { label: "طب وجراحة الأسنان", path: "/dentistry" },
          { label: "الصيدلة", path: "/faculty/pharmacy" }, { label: "العلوم الطبية المساندة", path: "/faculty/ams" },
          { label: "التمريض", path: "/faculty/nursing" }, { label: "الهندسة", path: "/faculty/engineering" },
          { label: "العلوم", path: "/faculty/science" }, { label: "تكنولوجيا المعلومات", path: "/faculty/it" },
          { label: "الزراعة", path: "/faculty/agriculture" }
        ]
      },
      {
        title: "الكليات الإنسانية",
        items: [
          { label: "الآداب", path: "/faculty/arts" }, { label: "الأعمال", path: "/faculty/business" }, { label: "الحقوق", path: "/faculty/law" }, { label: "العلوم الاجتماعية", path: "/faculty/social" },
          { label: "الشريعة", path: "/faculty/sharia" }, { label: "العلوم التربوية", path: "/faculty/education" }, { label: "علوم الرياضة", path: "/faculty/sport" }
        ]
      },
      {
        title: "العمادات",
        items: [{ label: "عمادة البحث العلمي", path: "/scientific-research" }, { label: "عمادة شؤون الطلبة", path: "/student-affairs" }, { label: "عمادة الشؤون الأكاديمية", path: "/academic-affairs" }]
      }
    ],
  },
  {
    label: "الوحدات والمراكز",
    icon: Building2,
    hasChildren: true,
    childrenCategories: [
      {
        title: "الوحدات",
        items: [
          { label: "الموارد البشرية", path: "/hr" },
          { label: "القبول والتسجيل", path: "/admission" },
          { label: "المكتبة", path: "/library" },
          { label: "وحدة الصيانة والخدمات الهندسية", path: "/maintenance" },
          { label: "وحدة التواصل وخدمة المجتمع المحلي", path: "/community-service" },
          { label: "المدرسة النموذجية", path: "/model-school" },
          { label: "وحدة الخدمات العامة", path: "/general-services" }
        ]
      },
      {
        title: "الدوائر",
        items: [
          { label: "دائرة الرئاسة", path: "/presidency" }, { label: "دائرة أمانة سر المجالس", path: "/secretariat-councils" }, { label: "دائرة الرقابة والتدقيق الداخلية", path: "/internal-audit" },
          { label: "دائرة العلاقات العامة والثقافية", path: "/public-relations" }, { label: "الأمن الجامعي", path: "/security" }, { label: "المعلومات والتخطيط", path: "/info-planning" },
          { label: "الشؤون القانونية", path: "/legal-affairs" }, { label: "العطاءات المركزية", path: "/tenders/list" }
        ]
      },
      {
        title: "المراكز",
        items: [
          { label: "مركز الحاسوب", path: "/computer-center" }, 
          { label: "مركز التطوير الأكاديمي وضمان الجودة", path: "/academic-development-center" }, 
          { label: "مركز التعليم الالكتروني ومصادر التعلم", path: "/elearning-center" },
          { label: "مركز الريادة والابتكار", path: "/innovation-center" }, 
          { label: "مركز التدريب والاستشارات", path: "/training-center" }, 
          { label: "مركز الملكة رانيا العبدالله للدراسات التربوية والنفسية", path: "/queen-rania-center" },
          { label: "مركز الأمير فيصل لدراسات البحر الميت", path: "/prince-faisal-center" }, 
          { label: "مركز اللغات", path: "/language-center" }, 
          { label: "المركز الصحي", path: "/health-center" }, 
          { label: "المختبرات المركزية الافتراضية", path: "/virtual-labs" }
        ]
      },
      {
        title: "مكاتب الجامعة",
        items: [
          { label: "العلاقات الدولية", path: "/international-relations" },
          { label: "المكتب الهندسي", path: "/engineering-office" },
          { label: "المشاغل الهندسية", path: "/engineering-workshops" },
          { label: "صندوق الاستثمار", path: "/investment-fund" },
          { label: "صندوق الإسكان", path: "/housing-fund" }
        ]
      },
      {
        title: "أخرى",
        items: [{ label: "نادي العاملين", path: "/employees-club" }]
      }
    ],
  },
  {
    label: "العطاءات",
    icon: FileText,
    hasChildren: true,
    children: [
      { label: "نظام المشتريات الحكومي", href: "https://www.mutah.edu.jo/Pages/Gov-procu-sys.pdf" },
      { label: "تعليمات تنظيم المشتريات", href: "https://www.mutah.edu.jo/Pages/Procurement-inst.pdf" },
      { label: "شروط العطاءات العامة الرئيسية", href: "https://www.mutah.edu.jo/Pages/tender-con.pdf" },
      { label: "العطاءات", path: "/tenders/list" },
      { label: "الاحالات المبدئية للعطاءات", path: "/tenders/initial" }
    ],
  },
  {
    label: "التشريعات",
    icon: Scale,
    hasChildren: true,
    children: [
      { label: "القوانين", path: "/legislation/rules" },
      { label: "الأنظمة", path: "/legislation/regulations" },
      { label: "التعليمات", path: "/legislation/instructions" }
    ],
  },
  {
    label: "اتصل بنا",
    icon: PhoneIcon,
    hasChildren: false,
    path: "/contact",
  },
];

export function WireframeHeader() {
  const [lang, setLangState] = useState<'ar' | 'en'>(getLang());
  useEffect(() => {
    applyDir(lang);
    const onChange = (e: any) => setLangState(e.detail);
    window.addEventListener('mutah-lang-change', onChange);
    return () => window.removeEventListener('mutah-lang-change', onChange);
  }, [lang]);
  const tr = (s: string) => t(s, lang);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [openSubAccordion, setOpenSubAccordion] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isMedicine = location.pathname.startsWith("/medicine");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  const handleNavClick = (item: any) => {
    if (item.hasChildren) {
      if (openAccordion === item.label) {
        setOpenAccordion(null);
        setOpenSubAccordion(null);
      } else {
        setOpenAccordion(item.label);
        setOpenSubAccordion(null);
      }
    } else {
      setMenuOpen(false);
      setOpenAccordion(null);
      setOpenSubAccordion(null);
      if (item.path) {
        go(item.path);
      }
    }
  };

  const handleChildClick = (parentItem: any, child: any) => {
    setMenuOpen(false);
    setOpenAccordion(null);
    setOpenSubAccordion(null);
    
    const label = typeof child === 'string' ? child : child.label;
    const customPath = typeof child === 'string' ? null : child.path;
    const href = typeof child === 'string' ? null : child.href;

    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    if (customPath) {
      go(customPath);
    } else if (parentItem.path) {
      go(`${parentItem.path}/${encodeURIComponent(label)}`);
    }
  };

  const iconBtn = (label: string, onClick?: () => void, children?: React.ReactNode) => (
    <div className="relative group/tooltip flex items-center justify-center">
      <button
        onClick={onClick}
        className="w-9 h-9 flex items-center justify-center transition-all group relative"
        aria-label={tr(label)}
        style={{ color: "rgba(255,255,255,0.85)", borderRadius: "10px" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.12)"; el.style.color = "#c9a227"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "rgba(255,255,255,0.85)"; }}
      >
        {children}
      </button>
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-[#0f3057] text-white text-[13px] rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-lg border border-white/10 font-['Noto_Kufi_Arabic'] font-medium">
        {tr(label)}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0f3057] rotate-45 border-l border-t border-white/10" />
      </div>
    </div>
  );

  return (
    <>
      <header
        className="fixed top-0 left-0 z-50"
        dir="rtl"
        style={{
          right: "var(--sidebar-offset, 0px)",
          background: scrolled ? "rgba(15,48,87,0.97)" : "rgba(15,48,87,0.82)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(201,162,39,0.15)",
          transition: "background 0.35s ease, right 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="mx-auto flex items-center justify-between px-8" style={{ maxWidth: "1440px", height: "68px" }}>
          {/* RIGHT: Logo */}
          <div 
            className="flex items-center relative z-10" 
            style={{ 
              cursor: 'pointer', 
            }} 
            onClick={() => navigate('/')}
          >
            <ImageWithFallback
              src={mutahLogo}
              alt="شعار جامعة مؤتة"
              className="h-11 w-auto object-contain"
              style={{}}
            />
          </div>

          {/* CENTER: Title for Medicine */}
          <div className="flex-1 flex justify-center items-center pointer-events-none absolute left-0 right-0 top-0 bottom-0">
            {isMedicine && (
              <span style={{ fontSize: "18px", fontWeight: 700, color: "#fff", letterSpacing: "0.5px" }}>
                كلية الطب
              </span>
            )}
          </div>

          {/* LEFT: Icons + Hamburger */}
          <div className="relative z-10 flex items-center gap-0.5">
          <div className="flex items-center gap-0.5">
            {iconBtn("بحث", () => setSearchOpen(true), <Search size={17} />)}
            {iconBtn("البريد الإلكتروني", () => { window.location.href = 'mailto:unit_admin@mutah.edu.jo'; }, <Mail size={17} />)}
            {iconBtn("الهاتف", () => { window.location.href = 'tel:+96232372380'; }, <Phone size={17} />)}
            {iconBtn("التقويم الجامعي", () => navigate('/calendar'), <Calendar size={17} />)}
            <div className="relative" style={{ display: 'flex', alignItems: 'center' }}>
              {iconBtn(lang === 'ar' ? 'اللغة' : 'Language', () => setLangOpen(!langOpen), <Globe size={17} />)}
              {langOpen && (
                <>
                  <div style={{ position: 'fixed', inset: 0, zIndex: 60 }} onClick={() => setLangOpen(false)} />
                  <div style={{ position: 'absolute', top: '44px', insetInlineStart: 0, zIndex: 61, minWidth: '170px', background: '#0f3057', border: '1px solid rgba(201,162,39,0.28)', borderRadius: '12px', padding: '6px', boxShadow: '0 18px 40px rgba(0,0,0,0.32)' }}>
                    {([['ar', 'العربية'], ['en', 'English']] as const).map(([code, name]) => (
                      <button
                        key={code}
                        onClick={() => { setLang(code); setLangOpen(false); }}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', padding: '10px 12px', borderRadius: '9px', background: lang === code ? 'rgba(201,162,39,0.16)' : 'transparent', color: lang === code ? '#c9a227' : 'rgba(255,255,255,0.85)', fontSize: '14.5px', fontWeight: lang === code ? 700 : 500, textAlign: 'start' }}
                        onMouseEnter={ev => { if (lang !== code) (ev.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; }}
                        onMouseLeave={ev => { if (lang !== code) (ev.currentTarget as HTMLElement).style.background = 'transparent'; }}
                      >
                        <span>{name}</span>
                        {lang === code && <Check size={16} />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Divider */}
            <div style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.15)", margin: "0 10px" }} />

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 px-4 py-2 transition-all mr-2"
              style={{
                color: "#fff",
                background: "#0f3057",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 600,
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#c9a227"; el.style.color = "#0f3057"; el.style.borderColor = "#c9a227"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#0f3057"; el.style.color = "#fff"; el.style.borderColor = "rgba(255,255,255,0.2)"; }}
              aria-label="فتح القائمة"
            >
              <Menu size={18} />
              <span>القائمة</span>
            </button>
          </div>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[55]"
          style={{ background: "rgba(5,15,35,0.75)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
          onClick={() => { setMenuOpen(false); setOpenAccordion(null); setOpenSubAccordion(null); }}
        />
      )}

      {/* Full-screen menu drawer */}
      <div
        dir="rtl"
        className="fixed top-0 right-0 bottom-0 z-[60] flex flex-row-reverse"
        style={{
          width: "100vw",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {/* 1. Empty overlay to close menu */}
        <div
          className="flex-1 h-full"
          style={{
            background: "transparent",
            cursor: "pointer",
          }}
          onClick={() => { setMenuOpen(false); setOpenAccordion(null); setOpenSubAccordion(null); }}
        />

        {/* 1.5. Level 3 panel (opens next to level 2) */}
        <div
          className="h-full flex flex-col"
          style={{
            width: openSubAccordion ? "380px" : "0",
            background: "#174276",
            borderLeft: openSubAccordion ? "1px solid rgba(255,255,255,0.06)" : "none",
            transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
            overflow: "hidden",
            flexShrink: 0,
            whiteSpace: "nowrap"
          }}
        >
          {openSubAccordion && openAccordion && (
            <div className="flex-1 py-5 px-6 overflow-y-auto w-[380px]">
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid rgba(201,162,39,0.2)" }}>
                {tr(openSubAccordion)}
              </h3>
              
              <div className="flex flex-col gap-2">
                {(() => {
                  const currentItem = navItems.find(item => item.label === openAccordion);
                  const currentCategory = currentItem?.childrenCategories?.find((c: any) => c.title === openSubAccordion);
                  if (currentCategory) {
                    return currentCategory.items.map((child: any) => {
                      const label = typeof child === 'string' ? child : child.label;
                      return (
                      <button
                        key={tr(label)}
                        onClick={() => handleChildClick(currentItem, child)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-right transition-all"
                        style={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: "14.5px",
                          background: "rgba(255,255,255,0.03)",
                          borderRadius: "10px",
                          fontWeight: 500,
                        }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#fff"; el.style.background = "rgba(255,255,255,0.08)"; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(255,255,255,0.8)"; el.style.background = "rgba(255,255,255,0.03)"; }}
                      >
                        <span
                          style={{
                            width: "5px", height: "5px", borderRadius: "50%",
                            background: "#c9a227", flexShrink: 0, display: "inline-block",
                          }}
                        />
                        {tr(label)}
                      </button>
                    )});
                  }
                  return null;
                })()}
              </div>
            </div>
          )}
        </div>

        {/* 2. Sub-menu panel (Level 2, opens next to main nav) */}
        <div
          className="h-full flex flex-col"
          style={{
            width: openAccordion ? "380px" : "0",
            background: "#0f3057",
            borderLeft: openAccordion ? "1px solid rgba(255,255,255,0.06)" : "none",
            transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
            overflow: "hidden",
            flexShrink: 0,
            whiteSpace: "nowrap"
          }}
        >
          {openAccordion && (
            <div className="flex-1 py-5 px-6 overflow-y-auto w-[380px]">
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "20px", paddingBottom: "15px", borderBottom: "1px solid rgba(201,162,39,0.2)" }}>
                {tr(openAccordion)}
              </h3>
              
              <div className="flex flex-col gap-2">
                {(() => {
                  const currentItem = navItems.find(item => item.label === openAccordion);
                  if (currentItem?.childrenCategories) {
                    return currentItem.childrenCategories.map((category: any, idx: number) => {
                      const isOpen = openSubAccordion === category.title;
                      return (
                        <button
                          key={idx}
                          onClick={() => setOpenSubAccordion(isOpen ? null : category.title)}
                          className="w-full flex items-center justify-between px-4 py-3 text-right transition-all"
                          style={{
                            color: isOpen ? "#c9a227" : "rgba(255,255,255,0.8)",
                            fontSize: "15px",
                            background: isOpen ? "rgba(201,162,39,0.08)" : "rgba(255,255,255,0.03)",
                            borderRadius: "10px",
                            fontWeight: isOpen ? 700 : 500,
                            borderRight: isOpen ? "3px solid #c9a227" : "3px solid transparent",
                          }}
                          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; if(!isOpen) { el.style.color = "#fff"; el.style.background = "rgba(255,255,255,0.08)"; } }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; if(!isOpen) { el.style.color = "rgba(255,255,255,0.8)"; el.style.background = "rgba(255,255,255,0.03)"; } }}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              style={{
                                width: "6px", height: "6px", borderRadius: "50%",
                                background: "#c9a227", flexShrink: 0, display: "inline-block",
                              }}
                            />
                            {tr(category.title)}
                          </div>
                          <ChevronLeft
                            size={15}
                            style={{
                              color: isOpen ? "#c9a227" : "rgba(255,255,255,0.35)",
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 0.22s ease",
                            }}
                          />
                        </button>
                      );
                    });
                  } else {
                    return currentItem?.children?.map((child: any) => {
                      const label = typeof child === 'string' ? child : child.label;
                      return (
                      <button
                        key={tr(label)}
                        onClick={() => handleChildClick(currentItem, child)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-right transition-all"
                        style={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: "15px",
                          background: "rgba(255,255,255,0.03)",
                          borderRadius: "10px",
                          fontWeight: 500,
                        }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#c9a227"; el.style.background = "rgba(201,162,39,0.08)"; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(255,255,255,0.8)"; el.style.background = "rgba(255,255,255,0.03)"; }}
                      >
                        <span
                          style={{
                            width: "6px", height: "6px", borderRadius: "50%",
                            background: "#c9a227", flexShrink: 0, display: "inline-block",
                          }}
                        />
                        {tr(label)}
                      </button>
                    )});
                  }
                })()}
              </div>
            </div>
          )}
        </div>

        {/* 3. Main nav panel (RIGHT side) */}
        <div
          className="flex flex-col h-full overflow-y-auto"
          style={{ width: "380px", flexShrink: 0, background: "#0a1e3d" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-7 py-5 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(201,162,39,0.15)" }}
          >
            <ImageWithFallback src={mutahLogo} alt="شعار جامعة مؤتة" className="h-9 w-auto object-contain" style={{}} />
            <button
              onClick={() => { setMenuOpen(false); setOpenAccordion(null); setOpenSubAccordion(null); }}
              className="w-9 h-9 flex items-center justify-center transition-all"
              style={{ color: "rgba(255,255,255,0.6)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.08)"; el.style.color = "#fff"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "rgba(255,255,255,0.6)"; }}
              aria-label="إغلاق القائمة"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 py-5 px-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isOpen = openAccordion === item.label;
              return (
                <div key={tr(item.label)}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className="w-full flex items-center justify-between px-5 py-4 transition-all"
                    style={{
                      color: isOpen ? "#c9a227" : "rgba(255,255,255,0.88)",
                      background: isOpen ? "rgba(201,162,39,0.08)" : "transparent",
                      borderRadius: "12px",
                      fontSize: "16px",
                      fontWeight: isOpen ? 700 : 400,
                      borderRight: isOpen ? "3px solid #c9a227" : "3px solid transparent",
                    }}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isOpen ? "rgba(201,162,39,0.15)" : "rgba(255,255,255,0.06)",
                          borderRadius: "10px",
                        }}
                      >
                        <Icon size={17} style={{ color: isOpen ? "#c9a227" : "rgba(255,255,255,0.65)" }} />
                      </div>
                      <span>{tr(item.label)}</span>
                    </div>
                    {item.hasChildren && (
                      <ChevronLeft
                        size={15}
                        style={{
                          color: isOpen ? "#c9a227" : "rgba(255,255,255,0.35)",
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.22s ease",
                        }}
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center"
          dir="rtl"
          style={{
            background: "rgba(5,15,35,0.88)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) { setSearchOpen(false); setSearchQuery(""); } }}
        >
          <div className="w-full px-10" style={{ maxWidth: "680px" }}>
            <h2 className="text-center mb-8" style={{ fontSize: "34px", fontWeight: 800, color: "#fff" }}>
              ع��ّ تبحث؟
            </h2>
            <div className="relative mb-8">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => { if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); } }}
                placeholder="كلية، بوابة، خدمة..."
                className="w-full outline-none transition-all"
                style={{
                  padding: "18px 24px",
                  paddingLeft: "56px",
                  fontSize: "17px",
                  color: "#0f3057",
                  background: "#fff",
                  border: "2.5px solid #c9a227",
                  borderRadius: "14px",
                  boxShadow: "0 0 0 6px rgba(201,162,39,0.15)",
                  direction: "rtl",
                }}
              />
              <Search size={20} style={{ position: "absolute", top: "50%", left: "20px", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                style={{
                  padding: "12px 36px", fontSize: "14px", fontWeight: 600,
                  color: "#fff", background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px", cursor: "pointer",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; }}
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}