import React, { useState } from 'react';
import { Calendar, Search, ArrowRight } from 'lucide-react';
import { useParams } from 'react-router';
import NEWS from './NewsData';
import { WireframeHeader } from '../../components/WireframeHeader';
import { WireframeFooter } from '../../components/WireframeFooter';
import { go } from '../../nav';
import { Breadcrumbs } from '../../components/Breadcrumbs';

const YEARS = Array.from(new Set(NEWS.map((n: any) => n.date.slice(0, 4)))).sort().reverse();
const TAGS = Array.from(new Set(NEWS.map((n: any) => n.tag)));

export function NewsList() {
  const [q, setQ] = useState('');
  const [year, setYear] = useState('all');
  const [tag, setTag] = useState('all');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const items = NEWS.filter((n: any) => {
    if (q && !(n.title + ' ' + n.body.join(' ')).includes(q)) return false;
    if (year !== 'all' && n.date.slice(0, 4) !== year) return false;
    if (tag !== 'all' && n.tag !== tag) return false;
    if (from && n.date < from) return false;
    if (to && n.date > to) return false;
    return true;
  }).sort((a: any, b: any) => (a.date < b.date ? 1 : -1));

  const chip = (active: boolean) => ({
    padding: '8px 18px', borderRadius: 100, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
    border: '1px solid ' + (active ? '#0f3057' : 'rgba(15,48,87,0.15)'),
    background: active ? '#0f3057' : '#fff', color: active ? '#fff' : '#0f3057',
  });

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] bg-white">
      <WireframeHeader />
      <div style={{ background: '#0f3057', padding: '110px 40px 72px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <Breadcrumbs className="mb-6" items={[{ label: 'جميع الأخبار' }]} />
          <p style={{ color: '#c9a227', fontSize: 12, letterSpacing: 3, fontWeight: 700, marginBottom: 12 }}>المستجدات</p>
          <h1 style={{ color: '#fff', fontSize: 40, fontWeight: 800, marginBottom: 10 }}>جميع الأخبار</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16 }}>أخبار الجامعة وفعالياتها ومؤتمراتها وإعلاناتها.</p>
        </div>
      </div>

      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '40px 48px 64px', width: '100%' }}>
        <div style={{ display: 'grid', gap: 18, background: '#F5F7F9', border: '1px solid rgba(15,48,87,0.07)', borderRadius: 18, padding: 22, marginBottom: 32 }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', insetInlineStart: 16, top: 14, color: '#9ca3af' }} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث في الأخبار…"
              style={{ width: '100%', padding: '13px 48px', borderRadius: 12, border: '1px solid rgba(15,48,87,0.15)', fontSize: 15, background: '#fff', fontFamily: 'inherit' }} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 600 }}>السنة:</span>
            <button onClick={() => setYear('all')} style={chip(year === 'all')}>الكل</button>
            {YEARS.map((y) => <button key={y} onClick={() => setYear(y)} style={chip(year === y)}>{y}</button>)}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 600 }}>التصنيف:</span>
            <button onClick={() => setTag('all')} style={chip(tag === 'all')}>الكل</button>
            {TAGS.map((t: any) => <button key={t} onClick={() => setTag(t)} style={chip(tag === t)}>{t}</button>)}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 600 }}>من تاريخ:</span>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} style={{ padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(15,48,87,0.15)', background: '#fff', fontSize: 14, fontFamily: 'inherit' }} />
            <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 600 }}>إلى تاريخ:</span>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} style={{ padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(15,48,87,0.15)', background: '#fff', fontSize: 14, fontFamily: 'inherit' }} />
            <button onClick={() => { setQ(''); setYear('all'); setTag('all'); setFrom(''); setTo(''); }}
              style={{ padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(15,48,87,0.15)', background: '#fff', color: '#0f3057', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              إعادة ضبط
            </button>
          </div>
        </div>

        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>عدد النتائج: {items.length}</p>

        {items.length === 0 ? (
          <p style={{ fontSize: 16, color: '#6b7280', padding: '40px 0' }}>لا توجد أخبار مطابقة لمعايير البحث.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 24 }}>
            {items.map((n: any) => (
              <div key={n.id} onClick={() => go('/news/' + n.id)}
                style={{ cursor: 'pointer', background: '#fff', border: '1px solid rgba(15,48,87,0.07)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 12px rgba(15,48,87,0.06)' }}>
                <img src={n.img} alt={n.title} onError={(ev) => { (ev.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'; }} style={{ width: '100%', height: 200, objectFit: 'cover', background: '#eef1f4' }} />
                <div style={{ padding: 22 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#0f3057', background: 'rgba(15,48,87,0.06)', padding: '4px 12px', borderRadius: 100 }}>{n.tag}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#9ca3af' }}><Calendar size={13} style={{ color: '#c9a227' }} />{n.dateAr}</span>
                  </div>
                  <h3 style={{ fontSize: 16.5, fontWeight: 700, color: '#0f3057', lineHeight: 1.7 }}>{n.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <WireframeFooter />
    </div>
  );
}

export function NewsDetail() {
  const { id } = useParams();
  const item = NEWS.find((n: any) => n.id === id) || NEWS[0];
  const others = NEWS.filter((n: any) => n.id !== item.id).slice(0, 3);
  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] bg-white">
      <WireframeHeader />
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '110px 40px 56px', width: '100%' }}>
        <Breadcrumbs tone="light" className="mb-6" items={[{ label: 'جميع الأخبار', to: '/news' }, { label: item.title }]} />
        <button onClick={() => go('/news')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(15,48,87,0.15)', background: '#fff', color: '#0f3057', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', marginBottom: 24, fontFamily: 'inherit' }}>
          <ArrowRight size={15} /> الرجوع إلى جميع الأخبار
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#0f3057', background: 'rgba(15,48,87,0.06)', padding: '4px 12px', borderRadius: 100 }}>{item.tag}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#9ca3af' }}><Calendar size={14} style={{ color: '#c9a227' }} />{item.dateAr}</span>
        </div>
        <h1 style={{ fontSize: 38, fontWeight: 800, color: '#0f3057', lineHeight: 1.45, marginBottom: 24, maxWidth: 1000 }}>{item.title}</h1>
        <img src={item.img} alt={item.title} onError={(ev) => { (ev.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'; }} style={{ width: '100%', borderRadius: 20, marginBottom: 28, maxHeight: 520, objectFit: 'cover', background: '#eef1f4' }} />
        <div style={{ maxWidth: 900 }}>
          {item.body.map((p: string, i: number) => (
            <p key={i} style={{ fontSize: 17, lineHeight: 2, color: '#374151', marginBottom: 18 }}>{p}</p>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(15,48,87,0.09)', marginTop: 40, paddingTop: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f3057', marginBottom: 18 }}>أخبار أخرى</h2>
          <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {others.map((n: any) => (
              <button key={n.id} onClick={() => go('/news/' + n.id)}
                style={{ textAlign: 'start', padding: '16px 20px', borderRadius: 14, border: '1px solid rgba(15,48,87,0.09)', background: '#F5F7F9', cursor: 'pointer', fontFamily: 'inherit' }}>
                <span style={{ display: 'block', fontSize: 12.5, color: '#9ca3af', marginBottom: 6 }}>{n.dateAr}</span>
                <span style={{ fontSize: 15.5, fontWeight: 700, color: '#0f3057', lineHeight: 1.7 }}>{n.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <WireframeFooter />
    </div>
  );
}
