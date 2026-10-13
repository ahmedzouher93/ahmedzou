import { dateDir } from '../../dateDir';
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Calendar, ArrowRight, Newspaper, Bell } from 'lucide-react';
import CC_NEWS from './ComputerCenterNews';
import { WireframeHeader } from '../../components/WireframeHeader';
import { WireframeFooter } from '../../components/WireframeFooter';

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

export function ComputerCenterNewsList() {
  const { kind } = useParams();
  const navigate = useNavigate();
  const set = CC_NEWS[kind as string] || CC_NEWS.news;
  const Icon = kind === 'info' ? Bell : Newspaper;
  return (
    <Shell>
      <BackBtn onClick={() => navigate('/computer-center')} label="الرجوع إلى مركز الحاسوب" />
      <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-5">
        <div className="w-10 h-10 rounded-lg bg-[#0f3057]/5 flex items-center justify-center">
          <Icon className="text-[#0f3057] w-5 h-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#0f3057]">{set.label}</h1>
          <p className="text-gray-600 text-[14.5px] mt-1">مركز الحاسوب — جامعة مؤتة · {set.items.length} عنصراً</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {set.items.map((n: any, i: number) => (
          <Link key={i} to={'/cc-item/' + (kind || 'news') + '/' + i} className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:border-[#c9a227] hover:shadow-md transition-all group">
            {n.date && <span className="text-xs font-bold text-[#c9a227] mb-3 block" dir={dateDir(n.date)}>{n.date}</span>}
            {n.tag && <span className="text-xs font-bold text-[#c9a227] mb-3 block">{n.tag}</span>}
            <h3 className="text-[16px] font-bold text-[#0f3057] leading-relaxed group-hover:text-[#c9a227]">{n.title}</h3>
            <span className="text-xs font-bold text-[#0f3057] mt-4 inline-flex items-center gap-1.5">اقرأ التفاصيل <span className="rotate-180">→</span></span>
          </Link>
        ))}
      </div>
    </Shell>
  );
}

export function ComputerCenterItemDetail() {
  const { kind, idx } = useParams();
  const navigate = useNavigate();
  const set = CC_NEWS[kind as string] || CC_NEWS.news;
  const n = Number(idx);
  const item = set.items[n] || {};
  const others = set.items.map((it: any, i: number) => ({ ...it, i })).filter((it: any) => it.i !== n).slice(0, 4);
  const Icon = kind === 'info' ? Bell : Newspaper;
  return (
    <Shell>
      <BackBtn onClick={() => navigate('/cc-list/' + (kind || 'news'))} label={'الرجوع إلى ' + set.label} />
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#0f3057] bg-[#0f3057]/[0.06] px-3 py-1.5 rounded-full">
          <Icon size={13} className="text-[#c9a227]" /> {set.label}
        </span>
        <span className="text-[12.5px] text-gray-500">مركز الحاسوب — جامعة مؤتة</span>
        {item.date && <span className="inline-flex items-center gap-1.5 text-[12.5px] text-gray-500" dir={dateDir(item.date)}><Calendar size={13} style={{ color: '#c9a227' }} /> {item.date}</span>}
        {item.tag && <span className="text-[12.5px] font-bold text-[#c9a227]">{item.tag}</span>}
      </div>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0f3057', lineHeight: 1.6, marginBottom: 24 }}>{item.title}</h1>
      {item.image && <img src={item.image} alt={item.title} style={{ width: '100%', maxHeight: 460, objectFit: 'cover', borderRadius: 20, marginBottom: 26, background: '#eef1f4' }} />}
      <div style={{ maxWidth: 900 }}>
        {(item.body || []).map((p: string, i: number) => (
          <p key={i} style={{ fontSize: 16.5, lineHeight: 2.05, color: '#374151', marginBottom: 16, textAlign: 'justify' }}>{p}</p>
        ))}
      </div>
      {others.length > 0 && (
        <div style={{ borderTop: '1px solid rgba(15,48,87,0.09)', marginTop: 44, paddingTop: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f3057', marginBottom: 18 }}>عناوين أخرى</h2>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {others.map((o: any) => (
              <Link key={o.i} to={'/cc-item/' + (kind || 'news') + '/' + o.i} style={{ display: 'block', padding: '16px 20px', borderRadius: 14, border: '1px solid rgba(15,48,87,0.09)', background: '#F5F7F9' }}>
                {o.date && <span style={{ display: 'block', fontSize: 12.5, color: '#9ca3af', marginBottom: 6 }} dir={dateDir(o.date)}>{o.date}</span>}
                <span style={{ fontSize: 15, fontWeight: 700, color: '#0f3057', lineHeight: 1.8 }}>{o.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Shell>
  );
}
