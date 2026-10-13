import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { WireframeHeader } from "./WireframeHeader";
import { WireframeFooter } from "./WireframeFooter";
import { X, Send, ChevronUp, Bot, ChevronLeft } from "lucide-react";

const chatTopics = [
  "القبول والتسجيل",
  "الرسوم الجامعية",
  "البرامج الأكاديمية",
  "بوابة الطلبة",
  "التقويم الجامعي",
  "مواعيد الامتحانات",
  "للتواصل معنا",
  "خدمات أخرى",
];

const popupsData = [
  {
    id: "popup2",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=700",
    title: "فتح باب القبول والتسجيل ٢٠٢٥/٢٠٢٦",
    desc: "تعلن جامعة مؤتة عن فتح باب القبول والتسجيل للفصل الأول من العام الجامعي ٢٠٢٥/٢٠٢٦. آخر موعد للتقديم ٣١ يوليو ٢٠٢٥.",
    btnLabel: "قدّم الآن",
  },
];

export function Layout() {
  const [showTop, setShowTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const location = useLocation();

  // Popups state
  const [closedPopups, setClosedPopups] = useState<string[]>([]);
  const [popupsVisible, setPopupsVisible] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Show popups after 1.2s (only on home ideally, but let's keep it global for now as before)
  useEffect(() => {
    const t = setTimeout(() => setPopupsVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visiblePopups = popupsData.filter((p) => !closedPopups.includes(p.id));
  const allClosed = visiblePopups.length === 0;

  // We only show popup if we are on Home page to be less annoying
  const isHome = location.pathname === "/";

  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "'Noto Kufi Arabic', sans-serif",
        backgroundColor: "#ffffff",
        minWidth: "1440px",
        overflowX: "auto",
      }}
    >
      {/* ── Popups ── */}
      {isHome && popupsVisible && !allClosed && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center"
          style={{ background: "rgba(5,15,35,0.72)", backdropFilter: "blur(8px)" }}
          onClick={() => setClosedPopups(popupsData.map((p) => p.id))}
        >
          <div
            className="flex gap-6 items-start"
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
          >
            {visiblePopups.map((popup) => (
              <div
                key={popup.id}
                className="relative"
                style={{
                  width: "400px",
                  background: "#fff",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
                  border: "1px solid rgba(201,162,39,0.2)",
                }}
              >
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img src={popup.img} alt={popup.title} className="w-full h-full object-cover" />
                  <div
                    className="absolute inset-x-0 top-0"
                    style={{ height: "200px", background: "linear-gradient(to top, rgba(15,48,87,0.5) 0%, transparent 60%)" }}
                  />
                </div>
                <button
                  onClick={() => setClosedPopups((prev) => [...prev, popup.id])}
                  className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center transition-all"
                  style={{ background: "rgba(0,0,0,0.45)", borderRadius: "50%", color: "#fff" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.7)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.45)"; }}
                  aria-label="إغلاق"
                >
                  <X size={14} />
                </button>
                <div className="p-6">
                  <div
                    className="inline-flex items-center mb-3"
                    style={{ background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.3)", padding: "3px 12px", borderRadius: "100px" }}
                  >
                    <span style={{ fontSize: "11px", color: "#c9a227", fontWeight: 700, letterSpacing: "1px" }}>إعلان مهم</span>
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f3057", marginBottom: "10px", lineHeight: 1.5 }}>
                    {popup.title}
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "#6b7280", lineHeight: 1.7, marginBottom: "20px" }}>
                    {popup.desc}
                  </p>
                  <div className="flex gap-3">
                    <button
                      className="flex-1 py-3 transition-all"
                      style={{ background: "#0f3057", color: "#fff", borderRadius: "12px", fontSize: "13.5px", fontWeight: 700 }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#c9a227"; (e.currentTarget as HTMLElement).style.color = "#0f3057"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#0f3057"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                    >
                      {popup.btnLabel}
                    </button>
                    <button
                      onClick={() => setClosedPopups((prev) => [...prev, popup.id])}
                      className="py-3 px-5 transition-all"
                      style={{ border: "1.5px solid rgba(15,48,87,0.15)", color: "#9ca3af", borderRadius: "12px", fontSize: "13px" }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#0f3057"; el.style.color = "#0f3057"; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(15,48,87,0.15)"; el.style.color = "#9ca3af"; }}
                    >
                      لاحقاً
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Chatbot FAB ── */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
        {chatOpen && (
          <div
            style={{
              width: "320px",
              background: "#fff",
              borderRadius: "20px",
              boxShadow: "0 20px 64px rgba(15,48,87,0.22)",
              overflow: "hidden",
              border: "1px solid rgba(15,48,87,0.1)",
            }}
            dir="rtl"
          >
            {/* Chat header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ background: "#0f3057", borderBottom: "2px solid #c9a227" }}
            >
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: "36px", height: "36px",
                    background: "rgba(201,162,39,0.2)",
                    borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid rgba(201,162,39,0.35)",
                  }}
                >
                  <Bot size={18} style={{ color: "#c9a227" }} />
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>نشمي — المساعد الذكي</div>
                  <div className="flex items-center gap-1.5">
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)" }}>متصل الآن</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                style={{ color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Greeting */}
            <div className="px-5 pt-4 pb-2">
              <div
                className="px-4 py-3 mb-1"
                style={{ background: "#F5F7F9", borderRadius: "12px 4px 12px 12px", fontSize: "13px", color: "#374151", lineHeight: 1.7 }}
              >
                بعون الله ماضون.. كيف يمكنني مساعدتك اليوم؟
              </div>
            </div>

            {/* Topic list */}
            <div className="px-5 pb-4 space-y-1.5" style={{ maxHeight: "280px", overflowY: "auto" }}>
              {chatTopics.map((topic) => (
                <button
                  key={topic}
                  className="w-full flex items-center justify-between px-4 py-2.5 transition-all"
                  style={{
                    background: "#0f3057",
                    borderRadius: "10px",
                    fontSize: "13px",
                    color: "#fff",
                    fontWeight: 500,
                    textAlign: "right",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#c9a227"; (e.currentTarget as HTMLElement).style.color = "#0f3057"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#0f3057"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                >
                  {topic}
                  <ChevronLeft size={13} style={{ flexShrink: 0, opacity: 0.6 }} />
                </button>
              ))}
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderTop: "1px solid rgba(15,48,87,0.08)", background: "#F5F7F9" }}
            >
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="اكتب رسالتك..."
                className="flex-1 outline-none bg-transparent"
                style={{ fontSize: "13px", color: "#374151", direction: "rtl" }}
              />
              <button
                className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-all"
                style={{ background: "#0f3057", borderRadius: "10px" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#c9a227"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#0f3057"; }}
              >
                <Send size={14} style={{ color: "#fff" }} />
              </button>
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-between px-5 py-2"
              style={{ background: "#fff", borderTop: "1px solid rgba(15,48,87,0.06)" }}
            >
              <span style={{ fontSize: "10px", color: "#9ca3af" }}>مدعوم من جامعة مؤتة</span>
              <div className="flex gap-1">
                {["AR", "EN"].map((lang) => (
                  <button
                    key={lang}
                    style={{
                      fontSize: "10px", fontWeight: 700,
                      padding: "2px 7px",
                      border: "1px solid rgba(15,48,87,0.15)",
                      borderRadius: "4px",
                      color: "#9ca3af",
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#0f3057"; el.style.color = "#fff"; el.style.borderColor = "#0f3057"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = "#9ca3af"; el.style.borderColor = "rgba(15,48,87,0.15)"; }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FAB button */}
        <button
          onClick={() => setChatOpen((p) => !p)}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
          style={{
            background: chatOpen ? "#0f3057" : "#c9a227",
            boxShadow: chatOpen ? "0 4px 24px rgba(15,48,87,0.35)" : "0 4px 24px rgba(201,162,39,0.45)",
          }}
          aria-label="فتح المساعد الذكي"
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.08)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1)"; }}
        >
          {chatOpen ? (
            <X size={20} style={{ color: "#c9a227" }} />
          ) : (
            <Bot size={22} style={{ color: "#0f3057" }} />
          )}
        </button>
      </div>

      <WireframeHeader />
      
      <Outlet />
      
      <WireframeFooter />

      {/* Scroll to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-6 z-50 w-11 h-11 flex items-center justify-center transition-all rounded-xl"
          style={{ background: "#c9a227", color: "#0f3057" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#b8911f"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#c9a227"; }}
          aria-label="العودة للأعلى"
        >
          <ChevronUp size={18} />
        </button>
      )}
    </div>
  );
}