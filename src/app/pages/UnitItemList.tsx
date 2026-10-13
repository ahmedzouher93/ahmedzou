import React from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import ITEMS from './ItemsRegistry';
import { WireframeHeader } from '../components/WireframeHeader';
import { WireframeFooter } from '../components/WireframeFooter';

export function UnitItemList() {
  const { key } = useParams();
  const navigate = useNavigate();
  const set = ITEMS[key as string];
  if (!set) return null;
  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] bg-white">
      <WireframeHeader />
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '110px 40px 60px', width: '100%' }}>
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
            <Link key={i} to={'/u-item/' + key + '/' + i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:border-[#c9a227] hover:shadow-md transition-all group">
              {n.img && <img src={n.img} alt={n.title || n.t} loading="lazy" className="w-full h-[180px] object-cover bg-gray-100" />}
              <div className="p-5">
                {(n.date || n.d) && <span className="text-xs font-bold text-[#c9a227] mb-2 block">{n.date || n.d}</span>}
                <h3 className="text-[15.5px] font-bold text-[#0f3057] leading-relaxed group-hover:text-[#c9a227]">{n.title || n.t}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <WireframeFooter />
    </div>
  );
}
