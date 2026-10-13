import { Link } from "react-router";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

const events = [
  { to: "/events/conferences",
    id: 1,
    title: "المؤتمر الدولي الثالث للذكاء الاصطناعي والتعليم العالي",
    date: "١٥ يوليو ٢٠٢٥",
    location: "قاعة المؤتمرات الكبرى — جامعة مؤتة",
    category: "مؤتمر دولي",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  { to: "/events/activities",
    id: 2,
    title: "احتفالية تخريج الفوج الرابع والأربعين",
    date: "٢٠ يونيو ٢٠٢٥",
    location: "الحرم الجامعي — مدرج مؤتة",
    category: "فعالية رسمية",
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  { to: "/events/conferences",
    id: 3,
    title: "ملتقى الشراكات الأكاديمية والبحثية الدولية ٢٠٢٥",
    date: "٣ أغسطس ٢٠٢٥",
    location: "مركز الابتكار والريادة — مؤتة",
    category: "ملتقى بحثي",
    img: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  { to: "/events/activities",
    id: 4,
    title: "أسبوع العلوم والتكنولوجيا — عرض مشاريع التخرج",
    date: "١٠ أغسطس ٢٠٢٥",
    location: "كلية الهندسة — مبنى المختبرات",
    category: "فعالية أكاديمية",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
];

export function EventsSection() {
  return (
    <section dir="rtl" className="py-20 bg-white" style={{ borderBottom: "1px solid rgba(15,48,87,0.08)" }}>
      <div className="mx-auto px-10" style={{ maxWidth: "1440px" }}>
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p style={{ fontSize: "12px", color: "#c9a227", textTransform: "uppercase", letterSpacing: "3px", fontWeight: 700, marginBottom: "12px" }}>
              أحداث الجامعة
            </p>
            <h2 style={{ fontSize: "42px", fontWeight: 800, color: "#0f3057", lineHeight: 1.15 }}>
              آخر الفعاليات والمؤتمرات
            </h2>
          </div>
          <Link
            to="/events/activities"
            className="flex items-center gap-2.5 transition-all flex-shrink-0 mb-1"
            style={{
              border: "1.5px solid #0f3057",
              padding: "12px 28px",
              color: "#0f3057",
              fontSize: "14px",
              fontWeight: 600,
              background: "transparent",
              borderRadius: "12px",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#0f3057"; el.style.color = "#fff"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#0f3057"; }}
          >
            عرض جميع الفعاليات والمؤتمرات
            <ArrowLeft size={15} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-6">
          {events.map((event) => (
            <Link
              key={event.id}
              to={(event as any).to || "/events/activities"}
              className="group cursor-pointer transition-all block"
              style={{
                background: "#fff",
                border: "1px solid rgba(15,48,87,0.07)",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(15,48,87,0.06)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 16px 48px rgba(15,48,87,0.14)";
                el.style.transform = "translateY(-5px)";
                el.style.borderColor = "rgba(201,162,39,0.35)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 2px 12px rgba(15,48,87,0.06)";
                el.style.transform = "translateY(0)";
                el.style.borderColor = "rgba(15,48,87,0.07)";
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: "190px" }}>
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,48,87,0.6) 0%, transparent 60%)" }} />
                {/* Category badge */}
                <div
                  className="absolute top-4 right-4"
                  style={{
                    background: "#c9a227",
                    padding: "4px 12px",
                    borderRadius: "100px",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#0f3057",
                  }}
                >
                  {event.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="mb-4 leading-snug"
                  style={{ fontSize: "15px", fontWeight: 700, color: "#0f3057", lineHeight: 1.5, minHeight: "44px" }}
                >
                  {event.title}
                </h3>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2">
                    <Calendar size={13} style={{ color: "#c9a227", flexShrink: 0 }} />
                    <span style={{ fontSize: "12.5px", color: "#6b7280" }}>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={13} style={{ color: "#c9a227", flexShrink: 0 }} />
                    <span style={{ fontSize: "12.5px", color: "#6b7280", lineHeight: 1.4 }}>{event.location}</span>
                  </div>
                </div>

                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: "1px solid rgba(15,48,87,0.07)" }}
                >
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#0f3057" }}>اقرأ المزيد</span>
                  <div
                    className="flex items-center justify-center transition-all"
                    style={{
                      width: "32px", height: "32px",
                      background: "rgba(15,48,87,0.06)",
                      borderRadius: "8px",
                    }}
                  >
                    <ArrowLeft size={14} style={{ color: "#0f3057" }} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
