import { go, useQueryTab } from "../nav";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  GraduationCap, Users, Globe, Building2,
  FileText, CalendarCheck, BookOpen, Award, CreditCard,
  Briefcase, FlaskConical, BookMarked, Library, Network,
  HeartPulse, Monitor, ClipboardList, MessageSquare, Microscope,
  ArrowLeft, ChevronDown,
} from "lucide-react";

const ServiceItem = ({ icon: Icon, label, subLabel, onClick }: { icon: React.ElementType; label: string; subLabel?: string; onClick?: () => void }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3.5 px-4 py-3.5 cursor-pointer transition-all"
    style={{
      background: "#fff",
      border: "1px solid rgba(15,48,87,0.07)",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(15,48,87,0.04)",
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = "#c9a227";
      el.style.boxShadow = "0 4px 16px rgba(201,162,39,0.1)";
      el.style.transform = "translateX(-3px)";
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLElement;
      el.style.borderColor = "rgba(15,48,87,0.07)";
      el.style.boxShadow = "0 1px 3px rgba(15,48,87,0.04)";
      el.style.transform = "translateX(0)";
    }}
  >
    <div
      className="flex items-center justify-center flex-shrink-0"
      style={{ width: "38px", height: "38px", background: "rgba(15,48,87,0.06)", borderRadius: "10px" }}
    >
      <Icon size={18} style={{ color: "#0f3057" }} />
    </div>
    <div className="flex flex-col">
      <span style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>{label}</span>
      {subLabel && (
        <span style={{ fontSize: "12px", fontWeight: 400, color: "#6b7280", marginTop: "2px" }}>{subLabel}</span>
      )}
    </div>
  </div>
);

const tabs = [
  {
    id: "students",
    label: "الطلبة",
    icon: GraduationCap,
    sections: [
      {
        title: "طالب جديد",
        to: "/admission",
        services: [
          { icon: FileText, label: "القبول والتسجيل", path: "/admission" },
          { icon: BookOpen, label: "البرامج الأكاديمية", path: "/student-services/programs" },
          { icon: CreditCard, label: "الرسوم الجامعية", path: "/student-services/fees" },
          { icon: Award, label: "المنح والمساعدات", path: "/student-services/scholarships" },
          { icon: CalendarCheck, label: "التقويم الأكاديمي", path: "/calendar" },
        ],
      },
      {
        title: "طالب حالي",
        to: "/student-services/portal",
        services: [
          { icon: Monitor, label: "بوابة الطلبة الإلكترونية", path: "/student-services/portal" },
          { icon: Globe, label: "التعليم الإلكتروني", path: "/elearning-center" },
          { icon: ClipboardList, label: "الجداول الدراسية", path: "/student-services/schedules" },
          { icon: BookMarked, label: "عمادة شؤون الطلبة", path: "/student-affairs" },
          { icon: MessageSquare, label: "الإرشاد الأكاديمي", path: "/student-services/advising" },
        ],
      },
      {
        title: "خريج",
        to: "/admission-programs/alumni",
        services: [
          { icon: GraduationCap, label: "الوثائق والشهادات", path: "/admission-programs/alumni" },
          { icon: Microscope, label: "الدراسات العليا", path: "/graduate-studies" },
          { icon: Briefcase, label: "مركز التدريب والاستشارات", path: "/training-center" },
          { icon: Library, label: "مكتبة الخريجين", path: "/library" },
          { icon: Network, label: "شبكة الخريجين", path: "/student-services/alumni-network" },
        ],
      },
    ],
  },
  {
    id: "staff",
    label: "الموظفون وأعضاء هيئة التدريس",
    icon: Users,
    sections: [
      {
        title: "الخدمات الإدارية",
        to: "/staff-services/portal",
        services: [
          { icon: Monitor, label: "بوابة الموظفين", path: "/staff-services/portal" },
          { icon: Users, label: "الموارد البشرية", path: "/hr" },
          { icon: Building2, label: "صندوق الإسكان", path: "/housing-fund" },
          { icon: CalendarCheck, label: "الإجازات والغيابات", path: "/staff-services/leaves" },
          { icon: CreditCard, label: "كشوف الرواتب", path: "/staff-services/payroll" },
        ],
      },
      {
        title: "الخدمات الأكاديمية",
        to: "/staff-services/publishing",
        services: [
          { icon: Microscope, label: "عمادة البحث العلمي", path: "/scientific-research" },
          { icon: Monitor, label: "مركز الحاسوب", path: "/computer-center" },
          { icon: BookOpen, label: "النشر والمجلات العلمية", path: "/staff-services/publishing" },
          { icon: Globe, label: "المؤتمرات الأكاديمية", path: "/staff-services/conferences" },
          { icon: Network, label: "شبكة الهيئة التدريسية", path: "/staff-services/faculty-network" },
        ],
      },
    ],
  },
  {
    id: "public",
    label: "الخدمات العامة",
    icon: Globe,
    sections: [
      {
        title: "الخدمات المتاحة",
        to: "/student-services/programs",
        services: [
          { icon: Library, label: "المكتبة الجامعية", path: "/library" },
          { icon: HeartPulse, label: "المركز الصحي", path: "/health-center" },
          { icon: CalendarCheck, label: "التقويم الجامعي", path: "/calendar" },
          { icon: FlaskConical, label: "المختبرات العلمية", path: "/virtual-labs" },
          { icon: MessageSquare, label: "خدمة الاستعلامات", path: "/contact" },
        ],
      },
    ],
  },
  {
    id: "visitors",
    label: "الزوار",
    icon: Building2,
    sections: [
      {
        title: "تعرف على الجامعة",
        to: "/about",
        services: [
          { icon: Building2, label: "عن الجامعة", path: "/about" },
          { icon: Users, label: "رئاسة الجامعة", path: "/presidency" },
          { icon: Globe, label: "العلاقات الدولية", path: "/international-relations" },
          { icon: Network, label: "العلاقات العامة", path: "/public-relations" },
          { icon: CalendarCheck, label: "الفعاليات القادمة", path: "/events/activities" },
        ],
      },
    ],
  },
  {
    id: "events",
    label: "الفعاليات والمؤتمرات",
    icon: CalendarCheck,
    sections: [
      {
        title: "الفعاليات",
        to: "/events/activities",
        services: [
          { icon: CalendarCheck, label: "يوم علمي لطلبة الدراسات العليا — الابتكار البحثي في عصر الذكاء الاصطناعي", subLabel: "٢٤ مايو ٢٠٢٦", path: "/events/activities" },
          { icon: CalendarCheck, label: "المؤتمر العلمي حول التمكين الأكاديمي والعلمي للذكاء الاصطناعي", subLabel: "١٣ أغسطس ٢٠٢٦", path: "/events/activities" },
          { icon: CalendarCheck, label: "الحفل الختامي لتخريج الفوج السابع والثلاثين", subLabel: "١٣ أغسطس ٢٠٢٦", path: "/events/activities" },
        ],
      },
      {
        title: "المؤتمرات",
        to: "/events/conferences",
        services: [
          { icon: CalendarCheck, label: "ETCEA 2027 — Emerging Trends in Computing and Engineering Applications", subLabel: "٩ أغسطس ٢٠٢٦", path: "/events/conferences" },
          { icon: CalendarCheck, label: "Advancing Community and Mental Health Nursing", subLabel: "١١ مارس ٢٠٢٦", path: "/events/conferences" },
          { icon: CalendarCheck, label: "المؤتمر العلمي السابع لكلية العلوم الاجتماعية", subLabel: "٢٥ يناير ٢٠٢٦", path: "/events/conferences" },
        ],
      },
    ],
  },
];

export function QuickServicesHub() {
  const [activeTab, setActiveTab] = useQueryTab("aud", "students");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const currentTab = tabs.find((t) => t.id === activeTab)!;

  return (
    <section dir="rtl" className="bg-white py-10" style={{ borderBottom: "1px solid rgba(15,48,87,0.08)" }}>
      <div className="mx-auto px-10" style={{ maxWidth: "1440px" }}>
        <div
          style={{
            border: "1px solid rgba(15,48,87,0.12)",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(15,48,87,0.08)",
          }}
        >
          {/* Tab bar */}
          <div style={{ background: "#0f3057" }} className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-1 flex items-center justify-center gap-2.5 py-5 transition-all"
                  style={{
                    fontSize: "14px",
                    fontWeight: isActive ? 700 : 400,
                    color: isActive ? "#c9a227" : "rgba(255,255,255,0.8)",
                    background: isActive ? "rgba(201,162,39,0.1)" : "transparent",
                    borderBottom: isActive ? "3px solid #c9a227" : "3px solid transparent",
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <Icon size={17} style={{ color: isActive ? "#c9a227" : "rgba(255,255,255,0.55)", flexShrink: 0 }} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div style={{ background: "#F5F7F9" }} className="p-8">
            <div className={`grid gap-8 ${currentTab.sections.length > 1 ? "grid-cols-" + currentTab.sections.length : "grid-cols-1 max-w-sm"}`}
              style={{ gridTemplateColumns: `repeat(${Math.min(currentTab.sections.length, 3)}, 1fr)` }}
            >
              {currentTab.sections.map((section) => {
                const key = `${activeTab}-${section.title}`;
                const isExpanded = expanded[key];
                const visible = isExpanded ? section.services : section.services.slice(0, 5);

                return (
                  <div key={section.title}>
                    {/* Section title */}
                    <div className="mb-4 pb-3" style={{ borderBottom: "2px solid #c9a227", display: "inline-block" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#0f3057", textTransform: "uppercase", letterSpacing: "1.5px" }}>
                        {section.title}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {visible.map((svc) => (
                        <ServiceItem 
                          key={svc.label} 
                          icon={svc.icon} 
                          label={svc.label} 
                          subLabel={(svc as any).subLabel} 
                          onClick={() => {
                            if ((svc as any).path) go((svc as any).path);
                          }}
                        />
                      ))}
                    </div>

                    {section.services.length > 5 && (
                      <button
                        onClick={() => setExpanded((prev) => ({ ...prev, [key]: !isExpanded }))}
                        className="flex items-center gap-2 mt-3 transition-all"
                        style={{ fontSize: "13px", color: "#0f3057", fontWeight: 600, background: "transparent" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c9a227"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#0f3057"; }}
                      >
                        {isExpanded ? "عرض أقل" : "عرض المزيد"}
                        {isExpanded ? (
                          <ChevronDown size={14} style={{ transform: "rotate(180deg)" }} />
                        ) : (
                          <ArrowLeft size={14} />
                        )}
                      </button>
                    )}

                    {section.services.length <= 5 && (
                      <button
                        onClick={() => go(((section as any).to) || "/about")}
                        className="flex items-center gap-2 mt-3 transition-all"
                        style={{ fontSize: "13px", color: "#0f3057", fontWeight: 600, background: "transparent", cursor: "pointer" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#c9a227"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#0f3057"; }}
                      >
                        اقرأ المزيد
                        <ArrowLeft size={14} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
