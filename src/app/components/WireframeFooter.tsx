import { Link } from "react-router";
import { Phone, MapPin, Mail, ExternalLink, Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import mutahLogo from "@/imports/MUTAH_LOGO.png";

const quickLinks = [
  { label: "بوابة الطلبة", to: "/student-services/portal" },
  { label: "بوابة الموظفين", to: "/staff-services/portal" },
  { label: "التعليم الإلكتروني", to: "/elearning-center" },
  { label: "المكتبة", to: "/library" },
  { label: "وزارة التعليم العالي", href: "https://mohe.gov.jo" },
  { label: "وحدة القبول والتسجيل", to: "/admission" },
];
const collegesLinks = [
  { label: "كلية الطب", to: "/medicine" },
  { label: "كلية الهندسة", to: "/faculty/engineering" },
  { label: "كلية العلوم", to: "/faculty/science" },
  { label: "كلية تكنولوجيا المعلومات", to: "/faculty/it" },
  { label: "كلية الآداب", to: "/arts" },
  { label: "عمادة البحث العلمي", to: "/scientific-research" },
];

const socials = [
  { icon: Facebook, label: "فيسبوك" },
  { icon: Twitter, label: "تويتر" },
  { icon: Youtube, label: "يوتيوب" },
  { icon: Instagram, label: "إنستغرام" },
];

export function WireframeFooter() {
  return (
    <footer dir="rtl" style={{ background: "#0f3057" }}>
      <div className="mx-auto px-10 py-16" style={{ maxWidth: "1440px" }}>
        <div className="grid grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div className="flex flex-col gap-5">
            <ImageWithFallback
              src={mutahLogo}
              alt="شعار جامعة مؤتة"
              className="h-14 w-auto object-contain self-start"
              style={{}}
            />
            <p style={{ fontSize: "14.5px", lineHeight: 1.85, color: "rgba(255,255,255,0.5)" }}>
              مؤسسة وطنية للتعليم العالي بجناحيه المدني والعسكري منذ ١٩٨١ — مؤتة، محافظة الكرك، الأردن.
            </p>
            <div className="flex gap-2.5 mt-2">
              {socials.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center transition-all"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)", borderRadius: "10px" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#c9a227"; el.style.color = "#c9a227"; el.style.background = "rgba(201,162,39,0.1)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.12)"; el.style.color = "rgba(255,255,255,0.45)"; el.style.background = "transparent"; }}
                >
                  {label === "تويتر" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ) : (
                    <Icon size={16} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="pb-4 mb-6" style={{ fontSize: "16px", fontWeight: 700, color: "#fff", borderBottom: "2px solid #c9a227", display: "inline-block", letterSpacing: "0.5px" }}>
              ابق على تواصل
            </h3>
            <div className="space-y-4">
              {[
                { icon: Phone, text: "+962 3 2372380" },
                { icon: Mail, text: "ص.ب (7) — قير موآب 61710" },
                { icon: MapPin, text: "مؤتة — الكرك، الأردن" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon size={16} style={{ color: "#c9a227", flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{text}</span>
                </div>
              ))}
              <div className="flex items-start gap-3">
                <ExternalLink size={16} style={{ color: "#c9a227", flexShrink: 0, marginTop: "2px" }} />
                <a
                  href="https://www.google.com/maps/d/u/0/viewer?mid=12Ob9gBozlRyt4NTwX7JRP3zMQss-G2iW"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "14px", color: "#c9a227", textDecoration: "underline", textUnderlineOffset: "3px" }}
                >
                  الموقع على الخريطة
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Quick links */}
          <div>
            <h3 className="pb-4 mb-6" style={{ fontSize: "16px", fontWeight: 700, color: "#fff", borderBottom: "2px solid #c9a227", display: "inline-block", letterSpacing: "0.5px" }}>
              روابط سريعة
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="flex items-center gap-3 transition-all"
                      style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#c9a227"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
                    >
                      <span className="inline-block w-4 h-px flex-shrink-0" style={{ background: "#c9a227" }} />
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 transition-all"
                      style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#c9a227"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
                    >
                      <span className="inline-block w-4 h-px flex-shrink-0" style={{ background: "#c9a227" }} />
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {/* Column 4: Colleges */}
          <div>
            <h3 className="pb-4 mb-6" style={{ fontSize: "16px", fontWeight: 700, color: "#fff", borderBottom: "2px solid #c9a227", display: "inline-block", letterSpacing: "0.5px" }}>
              كليات وعمادات
            </h3>
            <ul className="space-y-3">
              {collegesLinks.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="flex items-center gap-3 transition-all"
                      style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#c9a227"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
                    >
                      <span className="inline-block w-4 h-px flex-shrink-0" style={{ background: "#c9a227" }} />
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 transition-all"
                      style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#c9a227"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
                    >
                      <span className="inline-block w-4 h-px flex-shrink-0" style={{ background: "#c9a227" }} />
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.18)" }}>
        <div className="mx-auto px-10 py-4 flex items-center justify-center" style={{ maxWidth: "1440px" }}>
          <p className="text-center" style={{ fontSize: "13px", color: "rgba(255,255,255,0.28)" }}>
            © 2026 تصميم وتطوير شركة الشعاع الأزرق لحلول البرمجيات
          </p>
        </div>
      </div>
    </footer>
  );
}
