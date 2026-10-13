import { MonitorSmartphone, UserCircle, FileSpreadsheet, CalendarCheck, BookOpen } from "lucide-react";

const cards = [
  { label: "بوابة الطالب", icon: MonitorSmartphone },
  { label: "بوابة الموظف", icon: UserCircle },
  { label: "الامتحانات الإلكترونية", icon: FileSpreadsheet },
  { label: "التسجيل الإلكتروني", icon: CalendarCheck },
  { label: "الجدول الدراسي", icon: BookOpen },
];

export function MostVisited() {
  return (
    <section
      dir="rtl"
      className="py-20"
      style={{
        background: "linear-gradient(135deg, #0a2240 0%, #0f3057 60%, #0d2a4a 100%)",
        borderBottom: "1px solid rgba(201,162,39,0.15)",
      }}
    >
      <div className="mx-auto px-10" style={{ maxWidth: "1440px" }}>

        {/* Centered title with gold divider */}
        <div className="text-center mb-14">
          <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#fff", marginBottom: "16px", letterSpacing: "0.5px" }}>
            الأكثر وصولاً
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span style={{ display: "inline-block", width: "40px", height: "3px", background: "#c9a227", borderRadius: "100px" }} />
          </div>
        </div>

        {/* Cards row */}
        <div className="flex gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="flex-1 flex flex-col items-center justify-center gap-5 py-10 px-6 cursor-pointer group transition-all"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "20px",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(201,162,39,0.12)";
                  el.style.borderColor = "rgba(201,162,39,0.45)";
                  el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)";
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(255,255,255,0.07)";
                  el.style.borderColor = "rgba(255,255,255,0.12)";
                  el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="transition-all group-hover:scale-110"
                  style={{
                    width: "64px",
                    height: "64px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Icon size={28} style={{ color: "#c9a227", strokeWidth: 1.5 }} />
                </div>
                <span style={{ fontSize: "15px", fontWeight: 600, color: "#fff", textAlign: "center", lineHeight: 1.5 }}>
                  {card.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
