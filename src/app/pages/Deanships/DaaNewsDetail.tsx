import React from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Calendar, ArrowRight, Newspaper, Info } from 'lucide-react';
import DAA_NEWS from './DaaNewsData';
import { WireframeHeader } from '../../components/WireframeHeader';
import { WireframeFooter } from '../../components/WireframeFooter';

export function DaaNewsDetail() {
  const { idx } = useParams();
  const navigate = useNavigate();
  const n = Number(idx);
  const item = DAA_NEWS[n] || {};
  const others = DAA_NEWS.map((x, i) => ({ ...x, i })).filter((x) => x.i !== n);
  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] bg-white">
      <WireframeHeader />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '110px 40px 60px', width: '100%' }}>
        <button onClick={() => navigate('/academic-affairs')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(15,48,87,0.15)', background: '#fff', color: '#0f3057', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', marginBottom: 26, fontFamily: 'inherit' }}>
          <ArrowRight size={15} /> الرجوع إلى عمادة الشؤون الأكاديمية
        </button>
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#0f3057] bg-[#0f3057]/[0.06] px-3 py-1.5 rounded-full">
            <Newspaper size={13} className="text-[#c9a227]" /> أخبار وأحداث
          </span>
          <span className="text-[12.5px] text-gray-500">عمادة الشؤون الأكاديمية — الجناح العسكري</span>
          {item.date && (
            <span className="inline-flex items-center gap-1.5 text-[12.5px] text-gray-500" dir="ltr">
              <Calendar size={13} style={{ color: '#c9a227' }} /> {item.date}
            </span>
          )}
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: '#0f3057', lineHeight: 1.7, marginBottom: 24, maxWidth: 950 }}>{item.title}</h1>
        {others.length > 0 && (
          <div style={{ borderTop: '1px solid rgba(15,48,87,0.09)', marginTop: 44, paddingTop: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f3057', marginBottom: 18 }}>عناوين أخرى</h2>
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {others.map((o) => (
                <Link key={o.i} to={'/daa-news/' + o.i} style={{ display: 'block', padding: '16px 20px', borderRadius: 14, border: '1px solid rgba(15,48,87,0.09)', background: '#F5F7F9' }}>
                  <span style={{ display: 'block', fontSize: 12.5, color: '#9ca3af', marginBottom: 6 }} dir="ltr">{o.date}</span>
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
