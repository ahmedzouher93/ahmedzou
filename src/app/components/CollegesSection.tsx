import { ArrowLeft } from "lucide-react";

const colleges = [
  {
    label: "الكليات الطبية",
    img: "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  {
    label: "الهندسة والعلوم",
    img: "https://images.unsplash.com/photo-1614713223639-819abc4a7645?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  {
    label: "تكنولوجيا المعلومات",
    img: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  {
    label: "الكليات الإنسانية",
    img: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
];

export function CollegesSection() {
  return (
    <section dir="rtl" className="py-20 bg-white" style={{ borderBottom: "1px solid rgba(15,48,87,0.08)" }}>
      <div className="mx-auto px-10" style={{ maxWidth: "1440px" }}>
        <div className="mb-12">
          <p style={{ fontSize: "12px", color: "#c9a227", textTransform: "uppercase", letterSpacing: "3px", fontWeight: 700, marginBottom: "12px" }}>
            الأقسام الأكاديمية
          </p>
          <h2 style={{ fontSize: "42px", fontWeight: 800, color: "#0f3057", marginBottom: "14px", lineHeight: 1.15 }}>
            الكليات
          </h2>
          <p style={{ fontSize: "17px", color: "#6b7280", lineHeight: 1.7 }}>
            ستة عشر كلية علمية وإنسانية — اختر كليتك وانطلق.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-5 mb-10">
          {colleges.map((college) => (
            <div
              key={college.label}
              className="overflow-hidden cursor-pointer group transition-all"
              style={{
                background: "#fff",
                borderRadius: "20px",
                boxShadow: "0 2px 12px rgba(15,48,87,0.07)",
                border: "1px solid rgba(15,48,87,0.06)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 16px 48px rgba(15,48,87,0.14)";
                el.style.transform = "translateY(-4px)";
                el.style.borderColor = "rgba(201,162,39,0.4)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 2px 12px rgba(15,48,87,0.07)";
                el.style.transform = "translateY(0)";
                el.style.borderColor = "rgba(15,48,87,0.06)";
              }}
            >
              <div className="overflow-hidden" style={{ height: "200px", borderRadius: "20px 20px 0 0" }}>
                <img
                  src={college.img}
                  alt={college.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex items-center justify-between">
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0f3057" }}>
                  {college.label}
                </h3>
                <ArrowLeft size={16} style={{ color: "#c9a227", flexShrink: 0 }} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            className="inline-flex items-center gap-3 transition-all"
            style={{
              border: "1.5px solid #0f3057",
              padding: "13px 40px",
              color: "#0f3057",
              fontSize: "15px",
              fontWeight: 600,
              background: "transparent",
              borderRadius: "14px",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "#0f3057";
              el.style.color = "#fff";
              el.style.boxShadow = "0 8px 24px rgba(15,48,87,0.25)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.color = "#0f3057";
              el.style.boxShadow = "none";
            }}
          >
            جميع الكليات
          </button>
        </div>
      </div>
    </section>
  );
}
