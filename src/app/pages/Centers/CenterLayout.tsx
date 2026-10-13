import { go } from "../../nav";
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { WireframeHeader } from '../../components/WireframeHeader';
import { WireframeFooter } from '../../components/WireframeFooter';
import { Breadcrumbs, navTrail } from '../../components/Breadcrumbs';
import { Menu, ChevronLeft, ChevronDown, FileText, Monitor, Target, Users, Image as ImageIcon } from 'lucide-react';
import { Button } from '../../components/ui/button';

export interface CenterLink {
  id: string;
  name: string;
  path?: string;
  icon?: any;
  children?: CenterLink[];
}

interface CenterLayoutProps {
  centerName: string;
  links: CenterLink[];
  heroImage?: string;
  heroDescription?: string;
  heroVariant?: 'default' | 'photo';
  children: (activeItem: string) => React.ReactNode;
}

export function CenterLayout({
  centerName,
  links,
  heroImage = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
  heroDescription = "توفير بيئة تكنولوجية متطورة تلبي احتياجات الجامعة.",
  children,
  heroVariant = 'default'
}: CenterLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedTab, setExpandedTab] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use URL query parameters or default to the first link
  const params = useParams();
  const basePath = params.tab ? location.pathname.replace(new RegExp('/' + params.tab + '$'), '') : location.pathname;
  const initialTab = params.tab || new URLSearchParams(location.search).get('tab') || (links[0]?.id || 'home');
  const [activeItem, setActiveItem] = useState<string>(initialTab);

  useEffect(() => {
    const tabParam = params.tab || new URLSearchParams(location.search).get('tab');
    if (tabParam && tabParam !== activeItem) {
      setActiveItem(tabParam);
    }
  }, [params.tab, location.search]);

  const handleTabChange = (tabId: string) => {
    setActiveItem(tabId);
    navigate(`${basePath}/${tabId}`);
  };

  const getSectionTitle = (id: string, searchLinks: CenterLink[]): string => {
    for (const link of searchLinks) {
      if (link.id === id) return link.name;
      if (link.children) {
        const childTitle = getSectionTitle(id, link.children);
        if (childTitle !== 'المحتوى') return childTitle;
      }
    }
    return 'المحتوى';
  };

  return (
    <div
      className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] rtl bg-[#F5F7F9]"
      dir="rtl"
      style={{ "--sidebar-offset": sidebarOpen ? "320px" : "0px" } as React.CSSProperties}
    >
      <WireframeHeader />

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed z-[45] flex items-center justify-center bg-[#c9a227] hover:bg-[#b08d20] text-[#0f3057] transition-all shadow-lg"
        style={{
          top: "85px",
          right: sidebarOpen ? "320px" : "0",
          width: "40px",
          height: "40px",
          borderRadius: "10px 0 0 10px",
          transition: "right 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
        aria-label="Toggle Sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar Navigation */}
      <div
        className="fixed top-0 right-0 h-full w-[320px] bg-[#0f3057] shadow-[2px_0_15px_rgba(0,0,0,0.1)] z-40 flex flex-col transition-transform duration-300"
        style={{ transform: sidebarOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="pt-[70px] px-6 pb-6 flex-1 overflow-y-auto no-scrollbar">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10 mt-4">
            <h2 className="text-xl font-bold text-white tracking-wide">{centerName}</h2>
          </div>

          <nav className="flex flex-col gap-2 relative z-50">
            {links.map((link) => {
              const hasChildren = !!link.children;
              const isChildActive = hasChildren && link.children!.some((child) => 
                child.id === activeItem || (child.children && child.children.some((c) => c.id === activeItem))
              );
              const isActive = activeItem === link.id || isChildActive;
              const isExpanded = expandedTab === link.id || isChildActive;
              const Icon = link.icon || FileText;

              return (
                <div key={link.id} className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      if ((link as any).path) { go((link as any).path); return; }
                      if (hasChildren) {
                        setExpandedTab(isExpanded && !isChildActive ? null : link.id);
                        if (!isChildActive) handleTabChange(link.children![0].id);
                      } else {
                        handleTabChange(link.id);
                        setExpandedTab(null);
                      }
                    }}
                    className="flex items-center justify-between w-full px-4 py-3 transition-all text-right rounded-lg group relative overflow-hidden"
                    style={{
                      background: isActive ? "rgba(201,162,39,0.15)" : "transparent",
                      color: isActive ? "#ffffff" : "rgba(255,255,255,0.7)",
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {!hasChildren && <Icon size={16} style={{ color: isActive ? "#c9a227" : "rgba(255,255,255,0.5)" }} />}
                      <span style={{ fontSize: "14.5px" }}>{link.name}</span>
                    </div>
                    {hasChildren ? (
                      <ChevronDown
                        size={16}
                        style={{
                          color: isChildActive || isExpanded ? "#c9a227" : "rgba(255,255,255,0.4)",
                          transform: isExpanded ? "rotate(180deg)" : "rotate(90deg)",
                          transition: "transform 0.2s",
                        }}
                      />
                    ) : (
                      isActive && <ChevronLeft size={16} style={{ color: "#c9a227" }} />
                    )}
                  </button>
                  
                  {hasChildren && isExpanded && (
                    <div className="flex flex-col gap-1 pr-4 border-r-2 border-white/10 mr-2 py-1">
                      {link.children!.map((child) => {
                        const hasSubChildren = !!child.children;
                        const isChildExpanded = expandedTab === child.id || (hasSubChildren && child.children!.some((c) => c.id === activeItem));
                        const isChildItemActive = hasSubChildren ? isChildExpanded : activeItem === child.id;

                        return (
                          <div key={child.id} className="flex flex-col gap-1">
                            <button
                              onClick={() => {
                                if ((child as any).path) { go((child as any).path); return; }
                                if (hasSubChildren) {
                                  setExpandedTab(isChildExpanded ? link.id : child.id);
                                }
                                handleTabChange(child.id);
                              }}
                              className="flex items-center justify-between w-full px-4 py-2.5 transition-all text-right rounded-lg"
                              style={{
                                background: isChildItemActive && !hasSubChildren ? "rgba(201,162,39,0.15)" : "transparent",
                                color: isChildItemActive ? "#ffffff" : "rgba(255,255,255,0.6)",
                                fontWeight: isChildItemActive ? 700 : 500,
                              }}
                            >
                              <span style={{ fontSize: "13.5px" }}>{child.name}</span>
                              {hasSubChildren ? (
                                <ChevronDown
                                  size={14}
                                  style={{
                                    color: isChildItemActive ? "#c9a227" : "rgba(255,255,255,0.4)",
                                    transform: isChildExpanded ? "rotate(180deg)" : "rotate(90deg)",
                                    transition: "transform 0.2s",
                                  }}
                                />
                              ) : (
                                isChildItemActive && <ChevronLeft size={14} style={{ color: "#c9a227" }} />
                              )}
                            </button>
                            {hasSubChildren && isChildExpanded && (
                              <div className="flex flex-col gap-1 pr-4 border-r-2 border-white/10 mr-2 py-1">
                                {child.children!.map((subChild) => {
                                  const isSubActive = activeItem === subChild.id;
                                  return (
                                    <button
                                      key={subChild.id}
                                      onClick={() => handleTabChange(subChild.id)}
                                      className="flex items-center justify-between w-full px-4 py-2 transition-all text-right rounded-lg"
                                      style={{
                                        background: isSubActive ? "rgba(201,162,39,0.15)" : "transparent",
                                        color: isSubActive ? "#ffffff" : "rgba(255,255,255,0.5)",
                                        fontWeight: isSubActive ? 700 : 500,
                                      }}
                                    >
                                      <span style={{ fontSize: "12.5px" }}>{subChild.name}</span>
                                      {isSubActive && <ChevronLeft size={14} style={{ color: "#c9a227" }} />}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Page Content Wrapper */}
      <div 
        className="flex-1 flex flex-col transition-all min-w-0"
        style={{
          marginRight: sidebarOpen ? "320px" : "0",
          transition: "margin-right 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Full-width Page Hero */}
        <div className="relative overflow-hidden pt-[150px] pb-[80px] mb-[60px]">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 z-10" style={{backgroundColor: heroVariant === "photo" ? "rgba(15,48,87,0.52)" : "rgba(15,48,87,0.85)"}} />
            {heroImage && <img
              src={heroImage}
              alt={`${centerName} Hero`}
              className="w-full h-full object-cover"
              style={{objectPosition: heroVariant === "photo" ? "center 40%" : "center"}}
            />}
          </div>

          <div className={heroVariant === "photo" ? "container relative z-20 mx-auto px-4 md:px-8 text-center" : "container relative z-20 mx-auto px-4 md:px-8"}>
            <div className={heroVariant === "photo" ? "max-w-4xl mx-auto" : "max-w-4xl"}>
              <Breadcrumbs align={heroVariant === "photo" ? "center" : "start"} pill={heroVariant === "photo"} className="mb-6" items={[
                { label: centerName, onClick: links[0] ? () => handleTabChange(links[0].id) : undefined },
                ...navTrail(links, activeItem).filter(n => n.id !== links[0]?.id).map(n => ({ label: n.name })),
              ]} />
              {heroVariant !== "photo" && <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                <Target size={16} className="text-[#c9a227]" />
                <span className="text-white/90 text-sm font-medium tracking-wide">
                  جامعة مؤتة - {centerName}
                </span>
              </div>}

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                style={heroVariant === "photo" ? {textShadow:"0 2px 12px rgba(0,0,0,0.4)"} : undefined}>
                {heroVariant === 'photo' || activeItem === links[0]?.id ? centerName : getSectionTitle(activeItem, links)}
              </h1>
              
              <p className={heroVariant === "photo" ? "text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed" : "text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed"}>
                {heroVariant === 'photo' || activeItem === links[0]?.id ? heroDescription : 'توفير بيئة متطورة تلبي احتياجات الجامعة والمجتمع.'}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 w-full relative z-10 mb-20 px-4 md:px-8 max-w-7xl mx-auto">
          {children(activeItem)}
        </div>
        
        <WireframeFooter />
      </div>
    </div>
  );
}

export function PlaceholderContent({ title, onHomeClick }: { title: string, onHomeClick: () => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <div className="w-12 h-12 rounded-xl bg-[#0f3057]/5 flex items-center justify-center">
          <FileText className="text-[#0f3057] w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-[#0f3057]">{title}</h2>
      </div>
      <div className="text-gray-500 flex flex-col items-center justify-center h-[250px] gap-4">
        <ImageIcon size={48} className="text-gray-300" />
        <p>محتوى الصفحة قيد الإعداد والإضافة. سيتم تزويده لاحقاً.</p>
        <Button 
          variant="outline" 
          onClick={onHomeClick}
          className="mt-4 border-[#0f3057] text-[#0f3057] hover:bg-[#0f3057] hover:text-white"
        >
          العودة للرئيسية
        </Button>
      </div>
    </div>
  );
}
