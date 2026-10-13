import React from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Calendar, ArrowRight, Newspaper, Info } from 'lucide-react';
import ITEMS from './ItemsRegistry';
import { WireframeHeader } from '../components/WireframeHeader';
import { WireframeFooter } from '../components/WireframeFooter';

export function UnitItemDetail() {
  const { key, idx } = useParams();
  const navigate = useNavigate();
  const set = ITEMS[key as string];
  if (!set) return null;
  const n = Number(idx);
  const it = set.items[n] || {};
  const title = it.title || it.t || '';
  const date = it.date || it.d || '';
  const body = it.desc || it.summary || '';
  const others = set.items.map((x: any, i: number) => ({ ...x, i })).filter((x: any) => x.i !== n).slice(0, 4);
  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] bg-white">
      <WireframeHeader />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '110px 40px 60px', width: '100%' }}>
        <button onClick={() => navigate(set.back)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(15,48,87,0.15)', background: '#fff', color: '#0f3057', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', marginBottom: 26, fontFamily: 'inherit' }}>
          <ArrowRight size={15} /> الرجوع إلى {set.scope}
        </button>
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#0f3057] bg-[#0f3057]/[0.06] px-3 py-1.5 rounded-full">
            <Newspaper size={13} className="text-[#c9a227]" /> {set.label}
          </span>
          <span className="text-[12.5px] text-gray-500">{set.scope}</span>
          {date && (
            <span className="inline-flex items-center gap-1.5 text-[12.5px] text-gray-500" dir="ltr">
              <Calendar size={13} style={{ color: '#c9a227' }} /> {date}
            </span>
          )}
        </div>
        <h1 style={{ fontSize: 29, fontWeight: 800, color: '#0f3057', lineHeight: 1.75, marginBottom: 24, maxWidth: 950 }}>{title}</h1>
        {body && (
          <p style={{ fontSize: 16.5, lineHeight: 2.05, color: '#374151', maxWidth: 900, textAlign: 'justify' }}>{body}</p>
        )}
        {others.length > 0 && (
          <div style={{ borderTop: '1px solid rgba(15,48,87,0.09)', marginTop: 44, paddingTop: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f3057', marginBottom: 18 }}>عناوين أخرى</h2>
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {others.map((o: any) => (
                <Link key={o.i} to={'/u-item/' + key + '/' + o.i} style={{ display: 'block', padding: '16px 20px', borderRadius: 14, border: '1px solid rgba(15,48,87,0.09)', background: '#F5F7F9' }}>
                  {(o.date || o.d) && <span style={{ display: 'block', fontSize: 12.5, color: '#9ca3af', marginBottom: 6 }} dir="ltr">{o.date || o.d}</span>}
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#0f3057', lineHeight: 1.8 }}>{o.title || o.t}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <WireframeFooter />
    </div>
  );
}
