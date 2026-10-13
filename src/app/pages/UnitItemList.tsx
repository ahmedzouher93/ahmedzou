import React from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import ITEMS from './ItemsRegistry';
import { WireframeHeader } from '../components/WireframeHeader';
import { WireframeFooter } from '../components/WireframeFooter';
import { NewsCard, NewsGrid } from '@/app/components/NewsCard';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function UnitItemList() {
  const { key } = useParams();
  const navigate = useNavigate();
  const set = ITEMS[key as string];
  if (!set) return null;
  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] bg-white">
      <WireframeHeader />
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '110px 40px 60px', width: '100%' }}>
        <Breadcrumbs tone="light" className="mb-6" items={[{ label: set.scope, to: set.back }, { label: set.label }]} />
        <button onClick={() => navigate(set.back)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(15,48,87,0.15)', background: '#fff', color: '#0f3057', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', marginBottom: 26, fontFamily: 'inherit' }}>
          <ArrowRight size={15} /> الرجوع إلى {set.scope}
        </button>
        <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-5">
          <div className="w-11 h-11 rounded-xl bg-[#0f3057] flex items-center justify-center">
            <Newspaper className="text-[#c9a227] w-5 h-5" />
          </div>
          <div>
            <h1 className="text-[32px] font-bold text-[#0f3057]">{set.label}</h1>
            <p className="text-gray-600 text-[14.5px] mt-1">{set.scope} · {set.items.length} عنصراً</p>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {set.items.map((n: any, i: number) => (
            <NewsCard key={i} to={'/u-item/' + key + '/' + i} title={n.title || n.t} date={n.date || n.d} img={n.img} excerpt={n.desc} />
          ))}
        </div>
      </div>
      <WireframeFooter />
    </div>
  );
}
