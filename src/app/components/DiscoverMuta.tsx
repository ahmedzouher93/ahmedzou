import { go, useQueryTab } from "../nav";
import { useState } from "react";
import {
  ExternalLink, Quote,
  Calendar, Building2, Users, BookOpen,
  Heart, Cpu, FlaskConical, Scale, GraduationCap, Briefcase, Microscope,
  Monitor, Globe, CheckCircle, Banknote, Landmark, Megaphone, Network,
  Leaf, Library, Pill, Stethoscope, BookMarked, Languages, ArrowLeft,
} from "lucide-react";

const kpiData = [
  { value: "1981", label: "سنة التأسيس", icon: Calendar },
  { value: "16", label: "كلية أكاديمية", icon: Building2 },
  { value: "+20,000", label: "طالب وطالبة", icon: Users },
  { value: "+100", label: "برنامج أكاديمي", icon: BookOpen },
];

const tabsConfig = [
  { id: "text", label: "في سطور" },
  { id: "photos", label: "بالصور" },
  { id: "numbers", label: "بالأرقام" },
  { id: "testimonials", label: "بكلمات طلبتنا" },
  { id: "colleges", label: "الكليات" },
  { id: "units", label: "الوحدات والمراكز" },
  { id: "military", label: "الجناح العسكري" },
];

const colleges = [
  { label: "كلية الطب", icon: Heart, path: "/medicine" },
  { label: "كلية طب الأسنان", icon: Stethoscope, path: "/dentistry" },
  { label: "كلية الهندسة", icon: Cpu, path: "/faculty/engineering" },
  { label: "كلية العلوم", icon: FlaskConical, path: "/faculty/science" },
  { label: "كلية الحقوق", icon: Scale, path: "/faculty/law" },
  { label: "كلية الآداب", icon: BookOpen, path: "/arts" },
  { label: "كلية العلوم التربوية", icon: GraduationCap, path: "/faculty/education" },
  { label: "كلية الأعمال", icon: Briefcase, path: "/faculty/business" },
  { label: "عمادة البحث العلمي", icon: Microscope, path: "/scientific-research" },
  { label: "كلية تكنولوجيا المعلومات", icon: Monitor, path: "/faculty/it" },
  { label: "كلية الزراعة", icon: Leaf, path: "/faculty/agriculture" },
  { label: "كلية الدراسات العليا", icon: Library, path: "/graduate-studies" },
  { label: "كلية الصيدلة", icon: Pill, path: "/faculty/pharmacy" },
  { label: "كلية التمريض", icon: Stethoscope, path: "/faculty/nursing" },
  { label: "كلية الشريعة", icon: BookMarked, path: "/faculty/sharia" },
  { label: "كلية اللغات الأجنبية", icon: Languages, path: "/arts" },
  { label: "كلية العلوم الاجتماعية", icon: Users, path: "/faculty/social" },
];

const units = [
  { label: "مركز الحاسوب", icon: Monitor, path: "/computer-center" },
  { label: "مركز اللغات", icon: Globe, path: "/language-center" },
  { label: "مركز التدريب والاستشارات", icon: Users, path: "/training-center" },
  { label: "مركز التطوير الأكاديمي وضمان الجودة", icon: CheckCircle, path: "/academic-development-center" },
  { label: "مركز التعليم الإلكتروني", icon: Monitor, path: "/elearning-center" },
  { label: "مركز ريادة الأعمال والابتكار", icon: Network, path: "/innovation-center" },
  { label: "المركز الصحي", icon: Heart, path: "/health-center" },
  { label: "المختبرات الافتراضية", icon: FlaskConical, path: "/virtual-labs" },
  { label: "مركز الملكة رانيا", icon: Library, path: "/queen-rania-center" },
  { label: "مركز الأمير فيصل", icon: Landmark, path: "/prince-faisal-center" },
  { label: "المكتبة الجامعية", icon: Library, path: "/library" },
  { label: "الموارد البشرية", icon: Users, path: "/hr" },
  { label: "الشؤون المالية", icon: Banknote, path: "/admin-services/finance" },
  { label: "الشؤون الإدارية", icon: Landmark, path: "/admin-services/admin" },
  { label: "العلاقات العامة", icon: Megaphone, path: "/public-relations" },
  { label: "العلاقات الدولية", icon: Network, path: "/international-relations" },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1758270704262-ecc82b23dc37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
];

export function DiscoverMuta() {
  const [activeTab, setActiveTab] = useQueryTab("view", "text");
  const [showAllColleges, setShowAllColleges] = useState(false);

  return (
    <section dir="rtl" className="bg-white py-20" style={{ borderBottom: "1px solid rgba(15,48,87,0.08)" }}>
      <div className="mx-auto px-10" style={{ maxWidth: "1440px" }}>
        <div className="mb-12">
          <p style={{ fontSize: "12px", color: "#c9a227", textTransform: "uppercase", letterSpacing: "3px", fontWeight: 700, marginBottom: "12px" }}>
            تعرّف علينا
          </p>
          <h2 style={{ fontSize: "42px", fontWeight: 800, color: "#0f3057", marginBottom: "14px", lineHeight: 1.15 }}>
            اكتشف مؤتة
          </h2>
          <p style={{ fontSize: "17px", color: "#6b7280", lineHeight: 1.7, maxWidth: "560px" }}>
            تعرّف على الجامعة في سطور، بالصور، بالأرقام، وبكلمات طلبتنا.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-10" style={{ borderBottom: "2px solid rgba(15,48,87,0.08)" }}>
          {tabsConfig.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-7 py-3.5 transition-all"
              style={{
                fontSize: "15px",
                fontWeight: activeTab === tab.id ? 700 : 400,
                color: activeTab === tab.id ? "#0f3057" : "#9ca3af",
                borderBottom: activeTab === tab.id ? "3px solid #c9a227" : "3px solid transparent",
                marginBottom: "-2px",
                background: "transparent",
                borderRadius: "0",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-64 mb-16">
          {activeTab === "text" && (
            <div dir="rtl" className="flex gap-10 items-start">
              <div className="flex-shrink-0 w-1 self-stretch" style={{ background: "linear-gradient(to bottom, #c9a227, transparent)", borderRadius: "4px" }} />
              <div className="flex-1">
                <p style={{ fontSize: "17px", lineHeight: 1.95, color: "#374151", marginBottom: "12px" }}>
                  جامعة مؤتة مؤسسة وطنية أردنية رائدة في التعليم العالي، تأسست عام ١٩٨١ في محافظة الكرك جنوب الأردن. تضم الجامعة ستة عشر كلية تغطي طيفاً واسعاً من التخصصات العلمية والإنسانية والعسكرية، وتستقطب أكثر من عشرين ألف طالب وطالبة من مختلف أنحاء المملكة والعالم العربي.
                </p>
                <p style={{ fontSize: "17px", lineHeight: 1.95, color: "#374151", marginBottom: "28px" }}>
                  تسعى الجامعة إلى تحقيق التميز الأكاديمي من خلال برامج دراسية معتمدة دولياً، وشراكات استراتيجية مع مؤسسات بحثية وأكاديمية عالمية، وبيئة تعليمية تحفز الابتكار والتفكير النقدي.
                </p>
                <button
                  className="inline-flex items-center gap-3 transition-all"
                  style={{ border: "1.5px solid #0f3057", padding: "12px 28px", color: "#0f3057", fontSize: "14px", fontWeight: 600, background: "transparent", borderRadius: "12px" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#0f3057"; el.style.color = "#fff"; el.style.boxShadow = "0 8px 24px rgba(15,48,87,0.2)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#0f3057"; el.style.boxShadow = "none"; }}
                  onClick={() => go("/about")}
                >
                  المزيد عن الجامعة
                </button>
              </div>
            </div>
          )}

          {activeTab === "photos" && (
            <div dir="rtl">
              <div className="grid grid-cols-3 gap-4">
                {galleryImages.map((src, i) => (
                  <div key={i} className="overflow-hidden group cursor-pointer relative" style={{ height: "220px", borderRadius: "18px" }}>
                    <img src={src} alt={`صورة الجامعة ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(15,48,87,0.3)", borderRadius: "18px" }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "numbers" && (
            <div dir="ltr">
              <div className="grid grid-cols-4 gap-6">
                {kpiData.map((kpi) => {
                  const Icon = kpi.icon;
                  return (
                    <div
                      key={kpi.value}
                      className="p-8 text-center transition-all"
                      style={{ background: "#F5F7F9", border: "1px solid rgba(15,48,87,0.06)", borderRadius: "20px", borderTop: "3px solid #c9a227", boxShadow: "0 2px 12px rgba(15,48,87,0.05)" }}
                    >
                      <div
                        className="w-12 h-12 flex items-center justify-center mx-auto mb-5"
                        style={{ background: "rgba(15,48,87,0.07)", borderRadius: "14px" }}
                      >
                        <Icon size={22} style={{ color: "#0f3057" }} />
                      </div>
                      <div style={{ fontSize: "46px", fontWeight: 800, color: "#0f3057", lineHeight: 1, marginBottom: "10px", fontFamily: "system-ui, sans-serif", letterSpacing: "-1px" }}>
                        {kpi.value}
                      </div>
                      <div style={{ fontSize: "14px", color: "#6b7280", fontWeight: 500 }} dir="rtl">{kpi.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "testimonials" && (
            <div dir="rtl">
              <div
                className="p-10 max-w-2xl"
                style={{ background: "#F5F7F9", border: "1px solid rgba(15,48,87,0.07)", borderRadius: "24px", borderRight: "4px solid #c9a227", boxShadow: "0 4px 20px rgba(15,48,87,0.07)" }}
              >
                <Quote size={32} style={{ color: "#c9a227", marginBottom: "20px" }} />
                <p style={{ fontSize: "18px", lineHeight: 1.85, color: "#374151", fontStyle: "italic", marginBottom: "28px" }}>
                  "جامعة مؤتة منحتني أكثر من شهادة — منحتني رؤية وأدوات لأكون نسخة أفضل من نفسي. البيئة الأكاديمية هنا تحفّز على التفكير والإبداع والطموح."
                </p>
                <div className="flex items-center gap-4" style={{ borderTop: "1px solid rgba(15,48,87,0.09)", paddingTop: "20px" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#0f3057", color: "#c9a227", fontWeight: 700, fontSize: "18px" }}>
                    أ
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "#0f3057", fontSize: "15px" }}>أحمد الزيود</div>
                    <div style={{ fontSize: "13px", color: "#9ca3af" }}>خريج كلية الهندسة — ٢٠٢٤</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-6 justify-center">
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{ width: i === 0 ? "24px" : "8px", height: "4px", background: i === 0 ? "#c9a227" : "rgba(15,48,87,0.15)", display: "inline-block", borderRadius: "100px", transition: "all 0.3s" }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "colleges" && (
            <div dir="rtl">
              <div className="grid grid-cols-4 gap-4 mb-5">
                {(showAllColleges ? colleges : colleges.slice(0, 8)).map(({ label, icon: Icon, path }) => (
                  <div
                    key={label}
                    onClick={() => path && go(path)}
                    className="flex items-center gap-4 px-5 py-4 transition-all"
                    style={{ background: "#F5F7F9", border: "1px solid rgba(15,48,87,0.07)", borderRadius: "14px", boxShadow: "0 1px 4px rgba(15,48,87,0.04)", cursor: path ? "pointer" : "default" }}
                    onMouseEnter={e => {
                      if (!path) return;
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "#fff";
                      el.style.borderColor = "#c9a227";
                      el.style.boxShadow = "0 4px 16px rgba(201,162,39,0.1)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "#F5F7F9";
                      el.style.borderColor = "rgba(15,48,87,0.07)";
                      el.style.boxShadow = "0 1px 4px rgba(15,48,87,0.04)";
                    }}
                  >
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "rgba(15,48,87,0.08)", borderRadius: "10px" }}>
                      <Icon size={18} style={{ color: "#0f3057" }} />
                    </div>
                    <span style={{ fontSize: "14.5px", fontWeight: 600, color: "#0f3057" }}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAllColleges((p) => !p)}
                  className="inline-flex items-center gap-2.5 transition-all"
                  style={{
                    border: "1.5px solid #0f3057",
                    padding: "11px 32px",
                    color: "#0f3057",
                    fontSize: "14px",
                    fontWeight: 600,
                    background: "transparent",
                    borderRadius: "12px",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#0f3057"; el.style.color = "#fff"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#0f3057"; }}
                >
                  {showAllColleges ? "عرض أقل" : "اقرأ المزيد — باقي الكليات"}
                  <ArrowLeft size={15} style={{ transform: showAllColleges ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
                </button>
              </div>
            </div>
          )}

          {activeTab === "units" && (
            <div dir="rtl">
              <div className="grid grid-cols-4 gap-4">
                {units.map(({ label, icon: Icon, path }) => (
                  <div
                    key={label}
                    onClick={() => path && go(path)}
                    className="flex items-center gap-4 px-5 py-4 cursor-pointer transition-all"
                    style={{ background: "#F5F7F9", border: "1px solid rgba(15,48,87,0.07)", borderRadius: "14px", boxShadow: "0 1px 4px rgba(15,48,87,0.04)" }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "#fff";
                      el.style.borderColor = "#c9a227";
                      el.style.boxShadow = "0 4px 16px rgba(201,162,39,0.1)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = "#F5F7F9";
                      el.style.borderColor = "rgba(15,48,87,0.07)";
                      el.style.boxShadow = "0 1px 4px rgba(15,48,87,0.04)";
                    }}
                  >
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "rgba(15,48,87,0.08)", borderRadius: "10px" }}>
                      <Icon size={18} style={{ color: "#0f3057" }} />
                    </div>
                    <span style={{ fontSize: "14.5px", fontWeight: 600, color: "#0f3057" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "military" && (
            <div dir="rtl" className="flex items-center justify-center py-14">
              <div
                className="text-center px-16 py-12"
                style={{ background: "#F5F7F9", border: "1px solid rgba(15,48,87,0.09)", borderRadius: "24px", borderTop: "4px solid #0f3057", maxWidth: "420px", boxShadow: "0 4px 20px rgba(15,48,87,0.07)" }}
              >
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6" style={{ background: "#0f3057", borderRadius: "20px" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <p style={{ fontSize: "18px", fontWeight: 700, color: "#0f3057", marginBottom: "10px" }}>الجناح العسكري</p>
                <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "28px", lineHeight: 1.7 }}>يتم التوجيه إلى الموقع الرسمي للجناح العسكري لجامعة مؤتة</p>
                <button
                  className="inline-flex items-center gap-3 transition-all"
                  style={{ border: "1.5px solid #0f3057", padding: "12px 24px", color: "#0f3057", fontSize: "14px", fontWeight: 600, background: "transparent", borderRadius: "12px" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#0f3057"; el.style.color = "#fff"; el.style.boxShadow = "0 8px 24px rgba(15,48,87,0.2)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#0f3057"; el.style.boxShadow = "none"; }}
                >
                  <span>زيارة الموقع</span>
                  <ExternalLink size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
