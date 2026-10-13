import { ArrowLeft, Calendar } from "lucide-react";

import NEWS from "../pages/News/NewsData";
import { go } from "../nav";

const news = NEWS.slice(0, 3).map((n: any) => ({ id: n.id, date: n.dateAr, title: n.title, img: n.img, tag: n.tag }));


export function LatestNews() {
  return (
    <section dir="rtl" className="py-20 bg-white" style={{ borderBottom: "1px solid rgba(15,48,87,0.08)" }}>
      <div className="mx-auto px-10" style={{ maxWidth: "1440px" }}>
        <div className="flex items-end justify-between mb-12">
          <div>
            <p style={{ fontSize: "12px", color: "#c9a227", textTransform: "uppercase", letterSpacing: "3px", fontWeight: 700, marginBottom: "12px" }}>
              المستجدات
            </p>
            <h2 style={{ fontSize: "42px", fontWeight: 800, color: "#0f3057", marginBottom: "12px", lineHeight: 1.15 }}>
              آخر الأخبار
            </h2>
            <p style={{ fontSize: "17px", color: "#6b7280", lineHeight: 1.7 }}>
              أبرز ما يجري في الجامعة من فعاليات وإنجازات.
            </p>
          </div>
          <button
            onClick={() => go("/news")}
            className="inline-flex items-center gap-3 self-end transition-all"
            style={{ border: "1.5px solid #0f3057", padding: "12px 24px", color: "#0f3057", fontSize: "14px", fontWeight: 600, background: "transparent", borderRadius: "12px" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#0f3057"; el.style.color = "#fff"; el.style.boxShadow = "0 8px 24px rgba(15,48,87,0.2)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#0f3057"; el.style.boxShadow = "none"; }}
          >
            جميع الأخبار
            <ArrowLeft size={15} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {news.map((item, i) => (
            <div
              key={i}
              onClick={() => go("/news/" + (item as any).id)}
              className="overflow-hidden cursor-pointer group transition-all"
              style={{ background: "#fff", borderRadius: "20px", border: "1px solid rgba(15,48,87,0.07)", boxShadow: "0 2px 12px rgba(15,48,87,0.06)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 20px 56px rgba(15,48,87,0.13)"; el.style.transform = "translateY(-4px)"; el.style.borderColor = "rgba(201,162,39,0.35)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = "0 2px 12px rgba(15,48,87,0.06)"; el.style.transform = "translateY(0)"; el.style.borderColor = "rgba(15,48,87,0.07)"; }}
            >
              <div className="overflow-hidden" style={{ height: "220px", borderRadius: "20px 20px 0 0" }}>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span style={{ fontSize: "11px", fontWeight: 800, color: "#0f3057", background: "rgba(15,48,87,0.06)", padding: "4px 12px", letterSpacing: "1px", textTransform: "uppercase", borderRadius: "100px" }}>
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} style={{ color: "#c9a227" }} />
                    <span style={{ fontSize: "12.5px", color: "#9ca3af" }}>{item.date}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: "16.5px", fontWeight: 700, color: "#0f3057", lineHeight: 1.7 }}>
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 mt-5">
                  <span style={{ fontSize: "13px", color: "#c9a227", fontWeight: 600 }}>اقرأ المزيد</span>
                  <ArrowLeft size={14} style={{ color: "#c9a227" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
