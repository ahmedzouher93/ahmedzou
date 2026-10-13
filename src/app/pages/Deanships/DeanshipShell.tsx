import React, { useState } from 'react';
import { WireframeHeader } from '../../components/WireframeHeader';
import { WireframeFooter } from '../../components/WireframeFooter';
import { Breadcrumbs, navTrail } from '../../components/Breadcrumbs';
import {
  ChevronRight, ChevronLeft, ChevronDown, Menu, FileText, Download,
  ExternalLink, Info, Globe
} from 'lucide-react';

export function DocRow({ name, type = 'PDF', url }: { name: string; type?: string; url?: string }) {
  const inner = (
    <>
      <div className="w-9 h-9 rounded-lg bg-[#0f3057]/8 flex items-center justify-center shrink-0">
        <FileText size={16} className="text-[#0f3057]" />
      </div>
      <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-snug">{name}</p>
      <span className="text-[10px] font-bold text-gray-400">{type}</span>
      <Download size={15} className="text-[#c9a227] shrink-0" />
    </>
  );
  const cls = "flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-3.5 hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors";
  return url
    ? <a href={url} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
    : <div className={cls}>{inner}</div>;
}

export function LinkRow({ name, url }: { name: string; url?: string }) {
  return (
    <a href={url} target="_blank" rel="noreferrer"
       className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-3.5 hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
      <div className="w-9 h-9 rounded-lg bg-[#0f3057]/8 flex items-center justify-center shrink-0">
        <Globe size={16} className="text-[#0f3057]" />
      </div>
      <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-snug">{name}</p>
      <ExternalLink size={15} className="text-[#c9a227] shrink-0" />
    </a>
  );
}

export function NumList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((d, i) => (
        <div key={i} className="flex items-start gap-3 bg-[#F8FAFC] border border-gray-100 rounded-xl px-5 py-3.5">
          <span className="w-6 h-6 rounded-full bg-[#0f3057] text-[#c9a227] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
          <p className="text-sm text-gray-700 leading-relaxed">{d}</p>
        </div>
      ))}
    </div>
  );
}

export function Waiting({ label = 'الصفحة بانتظار المحتوى.' }: { label?: string }) {
  return (
    <div className="flex items-start gap-3 bg-[#F8FAFC] border border-dashed border-gray-200 rounded-2xl px-6 py-8">
      <Info size={18} className="text-gray-400 shrink-0 mt-0.5" />
      <p className="text-sm text-gray-500 leading-relaxed">{label}</p>
    </div>
  );
}

export function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-[#0f3057] relative inline-block">
        {title}
        <div className="absolute -bottom-3 right-0 w-1/3 h-1 bg-[#c9a227] rounded-full" />
      </h2>
      {sub && <p className="text-gray-500 mt-6">{sub}</p>}
    </div>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 md:p-10 space-y-5 text-gray-700 leading-[2.1] text-justify">
      {children}
    </div>
  );
}

export type NavLink = { id: string; name: string; url?: string; children?: NavLink[] };

export function getSectionTitle(id: string, links: NavLink[]): string {
  for (const l of links) {
    if (l.id === id) return l.name;
    if (l.children) {
      for (const c of l.children) {
        if (c.id === id) return c.name;
        if (c.children) {
          for (const g of c.children) if (g.id === id) return g.name;
        }
      }
    }
  }
  return '';
}

/* Deanship shell — identical layout to عمادة البحث العلمي */
export function DeanshipShell({
  brand, tagline, heroImage, links, activeItem, setActiveItem, children
}: {
  brand: string;
  tagline: string;
  heroImage: string;
  links: NavLink[];
  activeItem: string;
  setActiveItem: (id: string) => void;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedTab, setExpandedTab] = useState<string | null>(null);
  const [expandedSub, setExpandedSub] = useState<string | null>(null);

  const renderChild = (child: NavLink, depth: number) => {
    const isActive = activeItem === child.id;
    const hasKids = !!child.children;
    const isSubOpen = expandedSub === child.id;
    return (
      <div key={child.id} className="flex flex-col gap-1">
        <button
          onClick={() => {
            if (child.url) { if (child.url.startsWith('#')) { window.location.hash = child.url.slice(1); return; } window.open(child.url, '_blank'); return; }
            if (hasKids) { setExpandedSub(isSubOpen ? null : child.id); return; }
            setActiveItem(child.id);
          }}
          className="flex items-center justify-between w-full px-4 py-2.5 transition-all text-right rounded-lg"
          style={{
            paddingInlineStart: `${16 + depth * 10}px`,
            background: isActive ? 'rgba(201,162,39,0.15)' : 'transparent',
            color: isActive || isSubOpen ? '#ffffff' : 'rgba(255,255,255,0.6)',
            fontWeight: isActive ? 700 : 500,
          }}
        >
          <span style={{ fontSize: '13.5px', lineHeight: 1.6 }}>{child.name}</span>
          {child.url && !child.url.startsWith('#')
            ? <ExternalLink size={13} style={{ color: 'rgba(255,255,255,0.4)' }} />
            : hasKids
              ? <ChevronDown size={14} style={{ color: isSubOpen ? '#c9a227' : 'rgba(255,255,255,0.4)', transform: isSubOpen ? 'rotate(180deg)' : 'rotate(90deg)', transition: 'transform 0.2s' }} />
              : isActive ? <ChevronLeft size={14} style={{ color: '#c9a227' }} /> : null}
        </button>
        {hasKids && isSubOpen && (
          <div className="flex flex-col gap-1 pr-3 border-r border-white/10 mr-3">
            {child.children!.map((g) => renderChild(g, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] rtl bg-[#F8FAFC]"
      dir="rtl"
      style={{ "--sidebar-offset": sidebarOpen ? "320px" : "0px" } as React.CSSProperties}
    >
      <WireframeHeader />

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed z-[45] flex items-center justify-center bg-[#c9a227] hover:bg-[#b08d20] text-[#0f3057] transition-all shadow-lg"
        style={{
          top: "100px",
          right: sidebarOpen ? "320px" : "0",
          width: "40px",
          height: "40px",
          borderRadius: "10px 0 0 10px",
          transition: "right 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {sidebarOpen ? <ChevronRight size={24} /> : <Menu size={24} />}
      </button>

      <div
        className="fixed top-0 bottom-0 right-0 z-[52] overflow-y-auto"
        style={{
          width: "320px",
          backgroundColor: "#0f3057",
          boxShadow: "-4px 0 24px rgba(15,48,87,0.15)",
          borderLeft: "1px solid rgba(255,255,255,0.05)",
          transform: sidebarOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="p-6 pt-10 pb-20">
          <div className="mb-8 px-4 flex items-center gap-4">
            <h2 className="text-lg font-extrabold text-white leading-snug">{brand}</h2>
          </div>
          <nav className="flex flex-col gap-1.5">
            {links.map((link) => {
              const hasChildren = !!link.children;
              const isExpanded = expandedTab === link.id;
              const isChildActive = hasChildren
                ? link.children!.some(c => c.id === activeItem || (c.children || []).some(g => g.id === activeItem))
                : activeItem === link.id;
              return (
                <div key={link.id} className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      if (link.url) { if (link.url.startsWith('#')) { window.location.hash = link.url.slice(1); return; } window.open(link.url, '_blank'); return; }
                      if (hasChildren) {
                        setExpandedTab(isExpanded ? null : link.id);
                        const first = link.children![0];
                        if (!isExpanded && first && !first.url && !first.children) setActiveItem(first.id);
                      } else {
                        setActiveItem(link.id);
                      }
                    }}
                    className="flex items-center justify-between w-full px-4 py-3.5 transition-all text-right"
                    style={{
                      borderRadius: "12px",
                      background: isChildActive && !isExpanded ? "rgba(201,162,39,0.15)" : "transparent",
                      color: isChildActive || isExpanded ? "#ffffff" : "rgba(255,255,255,0.7)",
                      fontWeight: isChildActive || isExpanded ? 700 : 500,
                      border: "1px solid",
                      borderColor: isChildActive && !isExpanded ? "rgba(201,162,39,0.4)" : "transparent",
                    }}
                  >
                    <span style={{ fontSize: "14.5px" }}>{link.name}</span>
                    {hasChildren ? (
                      <ChevronDown
                        size={16}
                        style={{
                          color: isChildActive || isExpanded ? "#c9a227" : "rgba(255,255,255,0.4)",
                          transform: isExpanded ? "rotate(180deg)" : "rotate(90deg)",
                          transition: "transform 0.2s",
                        }}
                      />
                    ) : link.url && !link.url.startsWith("#") ? (
                      <ExternalLink size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
                    ) : (
                      isChildActive && <ChevronLeft size={16} style={{ color: "#c9a227" }} />
                    )}
                  </button>

                  {hasChildren && isExpanded && (
                    <div className="flex flex-col gap-1 pr-4 border-r-2 border-white/10 mr-2 py-1">
                      {link.children!.map((c) => renderChild(c, 0))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      <div
        className="flex-1 flex flex-col transition-all min-w-0"
        style={{
          marginRight: sidebarOpen ? "320px" : "0",
          transition: "margin-right 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="relative overflow-hidden pt-[150px] pb-[80px] mb-[60px]">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#0f3057]/85 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f3057] to-transparent z-10 opacity-70" />
            <img src={heroImage} alt={brand} className="w-full h-full object-cover mix-blend-overlay" />
          </div>
          <div className="mx-auto px-8 relative z-20 flex flex-col items-center justify-center text-center h-full max-w-[1440px]">
            <Breadcrumbs align="center" className="mb-6" items={[
              { label: brand, onClick: links[0] && !links[0].url ? () => setActiveItem(links[0].id) : undefined },
              ...navTrail(links, activeItem).filter(n => n.id !== links[0]?.id).map(n => ({ label: n.name })),
            ]} />
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight text-shadow-lg">
              {brand}
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              {tagline}
            </p>
          </div>
        </div>

        <div className="mx-auto px-6 md:px-10 w-full mb-24 relative max-w-[1440px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a227]/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0f3057]/5 rounded-full blur-3xl -z-10" />

          <div className="w-full min-w-0 relative overflow-hidden bg-white rounded-3xl p-8 lg:p-14 shadow-[0_20px_40px_-15px_rgba(15,48,87,0.05),_0_0_0_1px_rgba(15,48,87,0.03)] min-h-[600px]">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#c9a227] to-transparent opacity-40" />
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {children}
            </div>
          </div>
        </div>

        <WireframeFooter />
      </div>
    </div>
  );
}
