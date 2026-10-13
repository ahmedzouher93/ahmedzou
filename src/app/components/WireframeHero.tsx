import { Link } from "react-router";
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, GraduationCap, Users } from "lucide-react";

const slides = [
  {
    image: "https://usercontents.nohat.cc/u/amrdr01/editor/ai_up2x_7wMHCF9U6GL15De9.png",
    label: "التميز الأكاديمي",
    heading: "جامعة مؤتة",
    sub: "مؤسسة وطنية للتعليم العالي بجناحيه المدني والعسكري — منذ ١٩٨١",
    to: "/about",
  },
  {
    image: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    label: "حياة الحرم الجامعي",
    heading: "بيئة أكاديمية متميزة",
    sub: "نوفر بيئة تعليمية راقية تعزز النمو الفكري وتصنع قادة المستقبل",
    to: "/student-affairs",
  },
  {
    image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    label: "بحث علمي رائد",
    heading: "ريادة في البحث والابتكار",
    sub: "أكثر من ١٠٠ برنامج أكاديمي وشراكات دولية تفتح آفاق المعرفة",
    to: "/scientific-research",
  },
];

const portalTabs = [
  {
    id: "student",
    label: "بوابة الطالب",
    icon: GraduationCap,
    tagline: "كل ما يحتاجه الطالب في مكان واحد",
    btnLabel: "دخول بوابة الطالب",
    href: "https://portal.mutah.edu.jo",
  },
  {
    id: "staff",
    label: "بوابة الموظفين",
    icon: Users,
    tagline: "خدمات الموظفين والهيئة التدريسية",
    btnLabel: "دخول بوابة الموظف",
    href: "https://staff.mutah.edu.jo",
  },
];

export function WireframeHero() {
  const [active, setActive] = useState(0);
  const [activePortal, setActivePortal] = useState("student");

  const prev = useCallback(() => setActive((p) => (p - 1 + slides.length) % slides.length), []);
  const next = useCallback(() => setActive((p) => (p + 1) % slides.length), []);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[active];
  const portal = portalTabs.find((t) => t.id === activePortal)!;

  return (
    <section dir="rtl" className="relative w-full overflow-hidden" style={{ height: "75vh", minHeight: "520px" }}>
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: i === active ? 1 : 0,
            backgroundImage: `url(${s.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Overlays */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to left, rgba(15,48,87,0.8) 0%, rgba(15,48,87,0.5) 50%, rgba(0,0,0,0.15) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,48,87,0.9) 0%, transparent 55%)" }} />

      {/* Prev arrow */}
      <button
        onClick={prev}
        className="absolute z-10 flex items-center justify-center transition-all"
        aria-label="Previous slide"
        style={{ left: "28px", top: "50%", transform: "translateY(-50%)", width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", backdropFilter: "blur(8px)" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#c9a227"; el.style.borderColor = "#c9a227"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.1)"; el.style.borderColor = "rgba(255,255,255,0.2)"; }}
      >
        <ArrowLeft size={18} />
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        className="absolute z-10 flex items-center justify-center transition-all"
        aria-label="Next slide"
        style={{ right: "28px", top: "50%", transform: "translateY(-50%)", width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", backdropFilter: "blur(8px)" }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#c9a227"; el.style.borderColor = "#c9a227"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.1)"; el.style.borderColor = "rgba(255,255,255,0.2)"; }}
      >
        <ArrowRight size={18} />
      </button>

      {/* Portal Box — 2 tabs */}
      <div
        className="absolute z-10"
        style={{ left: "80px", top: "50%", transform: "translateY(-50%)", width: "320px" }}
      >
        <div
          style={{
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            background: "rgba(6,18,42,0.62)",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
            border: "1px solid rgba(201,162,39,0.35)",
            borderTop: "2px solid rgba(201,162,39,0.6)",
          }}
        >
          {/* Tab buttons */}
          <div className="flex">
            {portalTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activePortal === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActivePortal(tab.id)}
                  className="flex-1 flex flex-col items-center gap-2 py-5 px-3 transition-all"
                  style={{
                    fontSize: "15px",
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? "#c9a227" : "rgba(255,255,255,0.55)",
                    background: isActive ? "rgba(201,162,39,0.1)" : "transparent",
                    borderBottom: isActive ? "3px solid #c9a227" : "3px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <TabIcon size={24} style={{ color: isActive ? "#c9a227" : "rgba(255,255,255,0.4)" }} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="px-6 py-8">
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", marginBottom: "24px", lineHeight: 1.6, textAlign: "center" }}>
              {portal.tagline}
            </p>

            <a
              href={portal.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full transition-all"
              style={{
                background: "#c9a227",
                borderRadius: "12px",
                padding: "16px 20px",
                textDecoration: "none",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#b8911f"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#c9a227"; }}
            >
              <span style={{ fontSize: "16px", fontWeight: 700, color: "#0f3057" }}>{portal.btnLabel}</span>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="#0f3057" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3.3333L3.3333 8L8 12.6667" /><path d="M12.6667 8H3.3333" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col justify-between pr-20 pl-10" style={{ paddingTop: "68px", paddingBottom: "60px" }}>
        <div className="flex flex-col justify-center flex-1" style={{ minHeight: 0 }}>
          <div style={{ maxWidth: "560px" }}>
            <div
              className="inline-flex items-center gap-2 mb-5"
              style={{ background: "rgba(201,162,39,0.15)", border: "1px solid rgba(201,162,39,0.4)", padding: "6px 18px", borderRadius: "100px" }}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#c9a227" }} />
              <span style={{ fontSize: "11px", color: "#c9a227", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600 }}>
                {slide.label}
              </span>
            </div>

            <h1 className="text-white mb-5" style={{ fontSize: "54px", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.5px" }}>
              {slide.heading}
            </h1>

            <p style={{ fontSize: "17px", lineHeight: 1.75, color: "rgba(255,255,255,0.78)", marginBottom: "30px" }}>
              {slide.sub}
            </p>

            <Link
              to={slide.to || "/about"}
              className="inline-flex items-center gap-3 transition-all"
              style={{ border: "1.5px solid #c9a227", padding: "13px 30px", color: "#c9a227", fontSize: "14px", fontWeight: 600, background: "transparent", borderRadius: "12px" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#c9a227"; el.style.color = "#0f3057"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#c9a227"; }}
            >
              <span>اقرأ المزيد</span>
              <ArrowLeft size={15} />
            </Link>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === active ? "28px" : "8px",
                height: "4px",
                background: i === active ? "#c9a227" : "rgba(255,255,255,0.35)",
                border: "none",
                transition: "all 0.4s ease",
                cursor: "pointer",
                borderRadius: "100px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom gold accent */}
      <div className="absolute bottom-0 right-0" style={{ width: "200px", height: "3px", background: "linear-gradient(to left, #c9a227, transparent)" }} />
    </section>
  );
}
