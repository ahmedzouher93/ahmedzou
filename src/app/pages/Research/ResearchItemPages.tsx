import React from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Calendar, ArrowRight, FileText, AlertCircle } from 'lucide-react';
import RESEARCH_ITEMS from './ResearchNewsData';
import { WireframeHeader } from '../../components/WireframeHeader';
import { WireframeFooter } from '../../components/WireframeFooter';
import { NewsCard, NewsGrid } from '@/app/components/NewsCard';
import { Breadcrumbs } from '../../components/Breadcrumbs';

function Shell({ children }: any) {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] bg-white">
      <WireframeHeader />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '110px 40px 60px', width: '100%' }}>{children}</div>
      <WireframeFooter />
    </div>
  );
}

function BackBtn({ onClick, label }: any) {
  return (
    <button onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(15,48,87,0.15)', background: '#fff', color: '#0f3057', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', marginBottom: 26, fontFamily: 'inherit' }}>
      <ArrowRight size={15} /> {label}
    </button>
  );
}

export function ResearchItemList() {
  const { kind } = useParams();
  const navigate = useNavigate();
  const set = RESEARCH_ITEMS[kind as string] || RESEARCH_ITEMS.news;
  const Icon = kind === 'announcements' ? AlertCircle : FileText;
  return (
    <Shell>
      <Breadcrumbs tone="light" className="mb-6" items={[{ label: 'عمادة البحث العلمي', to: '/scientific-research' }, { label: set.label }]} />
      <BackBtn onClick={() => navigate('/scientific-research')} label="الرجوع إلى عمادة البحث العلمي" />
      <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-5">
        <div className="w-11 h-11 rounded-xl bg-[#0f3057] flex items-center justify-center">
          <Icon className="text-[#c9a227] w-5 h-5" />
        </div>
        <div>
          <h1 className="text-[32px] font-bold text-[#0f3057]">{set.label}</h1>
          <p className="text-gray-600 text-[14.5px] mt-1">عمادة البحث العلمي — جامعة مؤتة · {set.items.length} عنصراً</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {set.items.map((n: any, i: number) => (
          <NewsCard key={i} to={'/r-item/' + (kind || 'news') + '/' + i} title={n.title} date={n.date} img={n.img} excerpt={n.desc} />
        ))}
      </div>
    </Shell>
  );
}

export function ResearchItemDetail() {
  const { kind, idx } = useParams();
  const navigate = useNavigate();
  const set = RESEARCH_ITEMS[kind as string] || RESEARCH_ITEMS.news;
  const n = Number(idx);
  const item = set.items[n] || {};
  const others = set.items.map((it: any, i: number) => ({ ...it, i })).filter((it: any) => it.i !== n).slice(0, 4);
  const Icon = kind === 'announcements' ? AlertCircle : FileText;
  return (
    <Shell>
      <Breadcrumbs tone="light" className="mb-6" items={[{ label: 'عمادة البحث العلمي', to: '/scientific-research' }, { label: set.label, to: '/r-list/' + (kind || 'news') }, { label: item.title }]} />
      <BackBtn onClick={() => navigate('/r-list/' + (kind || 'news'))} label={'الرجوع إلى ' + set.label} />
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#0f3057] bg-[#0f3057]/[0.06] px-3 py-1.5 rounded-full">
          <Icon size={13} className="text-[#c9a227]" /> {set.label}
        </span>
        <span className="text-[12.5px] text-gray-500">عمادة البحث العلمي — جامعة مؤتة</span>
        {item.date && (
          <span className="inline-flex items-center gap-1.5 text-[12.5px] text-gray-500">
            <Calendar size={13} style={{ color: '#c9a227' }} /> {item.date}
          </span>
        )}
      </div>
      <h1 style={{ fontSize: 31, fontWeight: 800, color: '#0f3057', lineHeight: 1.65, marginBottom: 24, maxWidth: 950 }}>{item.title}</h1>
      <div style={{ maxWidth: 900 }}>
        <p style={{ fontSize: 16.5, lineHeight: 2.05, color: '#374151', textAlign: 'justify' }}>{item.desc}</p>
      </div>
      {others.length > 0 && (
        <div style={{ borderTop: '1px solid rgba(15,48,87,0.09)', marginTop: 44, paddingTop: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f3057', marginBottom: 18 }}>عناوين أخرى</h2>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {others.map((o: any) => (
              <Link key={o.i} to={'/r-item/' + (kind || 'news') + '/' + o.i} style={{ display: 'block', padding: '16px 20px', borderRadius: 14, border: '1px solid rgba(15,48,87,0.09)', background: '#F5F7F9' }}>
                {o.date && <span style={{ display: 'block', fontSize: 12.5, color: '#9ca3af', marginBottom: 6 }}>{o.date}</span>}
                <span style={{ fontSize: 15, fontWeight: 700, color: '#0f3057', lineHeight: 1.8 }}>{o.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Shell>
  );
}
