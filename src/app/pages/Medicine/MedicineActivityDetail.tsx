import React from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Calendar, ArrowRight, Award, Info } from "lucide-react";
import MED_ACTIVITIES from "./MedicineActivitiesData";

export function MedicineActivityDetail() {
  const { idx } = useParams();
  const navigate = useNavigate();
  const n = Number(idx);
  const item = MED_ACTIVITIES[n] || {};
  const others = MED_ACTIVITIES.map((a, i) => ({ ...a, i })).filter((a) => a.i !== n).slice(0, 4);

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500" dir="rtl">
      <button
        onClick={() => navigate("/medicine/activities")}
        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(15,48,87,0.15)", background: "#fff", color: "#0f3057", fontSize: 13.5, fontWeight: 600, cursor: "pointer", marginBottom: 26, fontFamily: "inherit", alignSelf: "flex-start" }}
      >
        <ArrowRight size={15} /> الرجوع إلى نشاطات وانجازات
      </button>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#0f3057] bg-[#0f3057]/[0.06] px-3 py-1.5 rounded-full">
          <Award size={13} className="text-[#c9a227]" /> نشاطات وانجازات
        </span>
        <span className="text-[12.5px] text-gray-500">كلية الطب — جامعة مؤتة</span>
        {item.date && (
          <span className="inline-flex items-center gap-1.5 text-[12.5px] text-gray-500" dir="ltr">
            <Calendar size={13} style={{ color: "#c9a227" }} /> {item.date}
          </span>
        )}
      </div>

      <h1 style={{ fontSize: 30, fontWeight: 800, color: "#0f3057", lineHeight: 1.7, marginBottom: 24, maxWidth: 950 }}>{item.title}</h1>

      {item.body && item.body.length > 0 ? (
        <div style={{ maxWidth: 900 }}>
          {item.body.map((p: string, i: number) => (
            <p key={i} style={{ fontSize: 16.5, lineHeight: 2.05, color: "#374151", marginBottom: 16, textAlign: "justify" }}>{p}</p>
          ))}
        </div>
      ) : (
        <div className="flex items-start gap-3 bg-[#F8FAFC] border border-dashed border-gray-200 rounded-xl px-5 py-6" style={{ maxWidth: 900 }}>
          <Info size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-500 leading-relaxed">
            العنوان والتاريخ كما هما في قائمة النشاطات والإنجازات لكلية الطب.
          </p>
        </div>
      )}

      {others.length > 0 && (
        <div style={{ borderTop: "1px solid rgba(15,48,87,0.09)", marginTop: 44, paddingTop: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f3057", marginBottom: 18 }}>عناوين أخرى</h2>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {others.map((o) => (
              <Link key={o.i} to={"/medicine/activities/" + o.i} style={{ display: "block", padding: "16px 20px", borderRadius: 14, border: "1px solid rgba(15,48,87,0.09)", background: "#F5F7F9" }}>
                <span style={{ display: "block", fontSize: 12.5, color: "#9ca3af", marginBottom: 6 }} dir="ltr">{o.date}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#0f3057", lineHeight: 1.8 }}>{o.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
