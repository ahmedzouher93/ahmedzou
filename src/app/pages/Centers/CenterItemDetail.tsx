import { dateDir } from '../../dateDir';
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import CENTERS from './OfficialCentersData';
import OFFICES from '../Offices/OfficesData';
import { WireframeHeader } from '../../components/WireframeHeader';
import { WireframeFooter } from '../../components/WireframeFooter';

export function CenterItemDetail() {
  const { scope, tab, idx } = useParams();
  const navigate = useNavigate();
  const find = (src: any) => (src as any)[scope as string] || Object.values(src as any).find((c: any) => ((c.root || '').replace(/^#\//, '') === scope));
  const cfg: any = find(CENTERS) || find(OFFICES);
  if (!cfg) return null;
  const page = (cfg.pages || {})[tab as string] || {};
  const items = page.cards || [];
  const n = Number(idx);
  const item = items[n] || {};
  const root = (cfg.root || '#/' + scope).replace(/^#/, '');
  const backTo = root + '/' + tab;
  const others = items.map((it: any, i: number) => ({ ...it, i })).filter((it: any) => it.i !== n && !it.tab).slice(0, 4);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] bg-white">
      <WireframeHeader />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '110px 40px 60px', width: '100%' }}>
        <button
          onClick={() => navigate(backTo)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(15,48,87,0.15)', background: '#fff', color: '#0f3057', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', marginBottom: 26, fontFamily: 'inherit' }}
        >
          <ArrowRight size={15} /> الرجوع إلى {page.title || cfg.name}
        </button>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#0f3057] bg-[#0f3057]/[0.06] px-3 py-1.5 rounded-full">
            <Newspaper size={13} className="text-[#c9a227]" /> {page.title || 'أخبار وأحداث'}
          </span>
          <span className="text-[12.5px] text-gray-500">{cfg.name}</span>
          {item.date && (
            <span className="inline-flex items-center gap-1.5 text-[12.5px] text-gray-500" dir={dateDir(item.date)}>
              <Calendar size={13} style={{ color: '#c9a227' }} /> {item.date}
            </span>
          )}
        </div>

        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0f3057', lineHeight: 1.6, marginBottom: 24 }}>{item.title}</h1>

        {item.summary ? (
          <p style={{ fontSize: 16.5, lineHeight: 2.05, color: '#374151', maxWidth: 900, textAlign: 'justify' }}>{item.summary}</p>
        ) : (
          <p style={{ fontSize: 15.5, lineHeight: 2, color: '#6b7280', maxWidth: 900 }}></p>
        )}

        {others.length > 0 && (
          <div style={{ borderTop: '1px solid rgba(15,48,87,0.09)', marginTop: 44, paddingTop: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f3057', marginBottom: 18 }}>عناوين أخرى</h2>
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {others.map((o: any) => (
                <Link key={o.i} to={'/c-item/' + scope + '/' + tab + '/' + o.i} style={{ display: 'block', padding: '16px 20px', borderRadius: 14, border: '1px solid rgba(15,48,87,0.09)', background: '#F5F7F9' }}>
                  {o.date && <span style={{ display: 'block', fontSize: 12.5, color: '#9ca3af', marginBottom: 6 }} dir={dateDir(o.date)}>{o.date}</span>}
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#0f3057', lineHeight: 1.8 }}>{o.title}</span>
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
