import { Megaphone, ArrowLeft } from "lucide-react";

const announcements = [
  "🎓 فتح باب القبول والتسجيل للفصل الأول من العام الجامعي ٢٠٢٥/٢٠٢٦",
  "📢 إعلان عن مسابقة جوائز التميز الأكاديمي للطلبة المتفوقين",
  "📅 تقديم طلبات الدراسات العليا للعام الجامعي ٢٠٢٥/٢٠٢٦",
  "🏆 جامعة مؤتة تحتفي بخريجي الفصل الثاني — حفل التخرج ١٥ يونيو ٢٠٢٥",
  "🔬 ورشة عمل دولية حول تطبيقات الذكاء الاصطناعي في التعليم العالي",
  "📝 الجدول الزمني للامتحانات النهائية للفصل الثاني ٢٠٢٤/٢٠٢٥",
  "🌐 شراكة جديدة مع جامعة برلين التقنية في مجال البحث العلمي المشترك",
  "🎯 إعلان عن وظائف أكاديمية وإدارية شاغرة في جامعة مؤتة",
];

export function AnnouncementsTicker() {
  const text = announcements.join("   ·   ");

  return (
    <div
      dir="rtl"
      className="relative flex items-center overflow-hidden"
      style={{
        background: "#0f3057",
        height: "44px",
        borderBottom: "2px solid #c9a227",
      }}
    >
      {/* Label badge */}
      <div
        className="flex items-center gap-2 px-5 flex-shrink-0 z-10"
        style={{
          background: "#c9a227",
          height: "100%",
          minWidth: "120px",
        }}
      >
        <Megaphone size={15} style={{ color: "#0f3057" }} />
        <span style={{ fontSize: "13px", fontWeight: 700, color: "#0f3057", whiteSpace: "nowrap" }}>
          إعلانات
        </span>
      </div>

      {/* Gradient fade (right edge — start of scroll in RTL) */}
      <div
        className="absolute z-[5] pointer-events-none"
        style={{
          right: "120px",
          top: 0,
          bottom: 0,
          width: "60px",
          background: "linear-gradient(to left, #0f3057, transparent)",
        }}
      />

      {/* Scrolling text */}
      <div className="flex-1 overflow-hidden" style={{ height: "100%" }}>
        <div
          className="flex items-center h-full"
          style={{
            animation: "tickerScroll 40s linear infinite",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {[text, text].map((t, idx) => (
            <span
              key={idx}
              style={{
                fontSize: "13.5px",
                color: "rgba(255,255,255,0.88)",
                paddingLeft: "60px",
                letterSpacing: "0.2px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Gradient fade (left edge) */}
      <div
        className="absolute z-[5] pointer-events-none"
        style={{
          left: "160px",
          top: 0,
          bottom: 0,
          width: "60px",
          background: "linear-gradient(to right, #0f3057, transparent)",
        }}
      />

      {/* Read more button */}
      <button
        className="flex items-center gap-1.5 px-4 flex-shrink-0 h-full z-10 transition-all"
        style={{
          background: "rgba(201,162,39,0.12)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          fontSize: "12.5px",
          color: "#c9a227",
          fontWeight: 600,
          whiteSpace: "nowrap",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(201,162,39,0.22)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(201,162,39,0.12)"; }}
      >
        اقرأ المزيد
        <ArrowLeft size={13} />
      </button>

      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
