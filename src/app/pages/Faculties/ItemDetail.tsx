import { dateDir } from '../../dateDir';
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Calendar, ArrowRight, Newspaper, Award } from 'lucide-react';
import { WireframeHeader } from '../../components/WireframeHeader';
import { WireframeFooter } from '../../components/WireframeFooter';
import FACULTIES from './FacultyData';
import LEGACY_NEWS from './LegacyNewsData';
import { Breadcrumbs } from '../../components/Breadcrumbs';

const KIND_LABEL: Record<string, string> = {
  news: 'أخبار وإعلانات',
  conferences: 'المؤتمرات',
  achievements: 'الإنجازات',
};

function groupsOf(cfg: any, dept: any) {
  const src = dept || cfg;
  return src.achievements || (dept ? null : cfg.achievements) || null;
}

function collect(cfg: any, dept: any, kind: string) {
  const src = dept || cfg;
  if (kind === 'news') return src.news || [];
  if (kind === 'conferences') return cfg.conferencesList || [];
  if (kind === 'achievements') {
    const groups = groupsOf(cfg, dept);
    if (groups) {
      const out: any[] = [];
      groups.forEach((g: any, gi: number) => (g.items || []).forEach((it: any, i: number) => out.push({ ...it, key: gi * 1000 + i })));
      return out;
    }
    return src.achievementsData || (dept ? [] : cfg.achievementsData) || [];
  }
  return [];
}


export function ItemDetail() {
  const { slug, dept: deptId, kind, idx } = useParams();
  const navigate = useNavigate();
  const legacy = LEGACY_NEWS[slug as string];
  const base = FACULTIES[slug as string];
  const useLegacyNews = !!legacy && kind === 'news' && !deptId && (!base || !base.news || base.news.length === 0);
  const cfg = useLegacyNews
    ? { ...(base || {}), name: (base && base.name) || legacy.name, news: legacy.items, departments: (base && base.departments) || [] }
    : base || (legacy ? { name: legacy.name, news: legacy.items, departments: [] } : null);
  if (!cfg) return null;
  const dept = deptId ? (cfg.departments || []).find((d: any) => d.id === deptId) : null;
  const items = collect(cfg, dept, kind as string);
  const n = Number(idx);
  const keyed = items.length > 0 && items[0] && items[0].key !== undefined;
  const item = (keyed ? items.find((it: any) => it.key === n) : items[n]) || {};
  const backTo = deptId
    ? '/faculty/' + slug + '/departments/' + deptId
    : (useLegacyNews || !base)
      ? legacy.back
      : '/faculty/' + slug + (kind === 'news' ? '' : '/' + kind);
  const others = items.map((it: any, i: number) => ({ ...it, i: it.key !== undefined ? it.key : i })).filter((it: any) => it.i !== n).slice(0, 4);
  const body: string[] = Array.isArray(item.body) ? item.body : [];
  const Icon = kind === 'achievements' ? Award : Newspaper;

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] bg-white">
      <WireframeHeader />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '110px 40px 60px', width: '100%' }}>
        <Breadcrumbs tone="light" className="mb-6" items={[{ label: 'كليات وعمادات', to: '/faculties' }, { label: cfg.name, to: base ? '/faculty/' + slug : backTo }, ...(dept ? [{ label: dept.name, to: '/faculty/' + slug + '/departments/' + deptId }] : []), { label: kind === 'achievements' ? 'الإنجازات' : kind === 'conferences' ? 'المؤتمرات' : 'الأخبار والإعلانات' }, { label: item.title }]} />
        <button
          onClick={() => navigate(backTo)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(15,48,87,0.15)', background: '#fff', color: '#0f3057', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', marginBottom: 26, fontFamily: 'inherit' }}
        >
          <ArrowRight size={15} /> {dept ? 'الرجوع إلى ' + dept.name : 'الرجوع إلى ' + cfg.name}
        </button>

        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#0f3057] bg-[#0f3057]/[0.06] px-3 py-1.5 rounded-full">
            <Icon size={13} className="text-[#c9a227]" /> {KIND_LABEL[kind as string] || 'خبر'}
          </span>
          <span className="text-[12.5px] text-gray-500">{dept ? dept.name + ' — ' + cfg.name : cfg.name}</span>
          {item.date && (
            <span className="inline-flex items-center gap-1.5 text-[12.5px] text-gray-500" dir={dateDir(item.date)}>
              <Calendar size={13} style={{ color: '#c9a227' }} /> {item.date}
            </span>
          )}
        </div>

        <h1 style={{ fontSize: 34, fontWeight: 800, color: '#0f3057', lineHeight: 1.55, marginBottom: 26 }}>{item.title}</h1>

        {item.image && (
          <img src={item.image} alt={item.title} style={{ width: '100%', maxHeight: 460, objectFit: 'cover', borderRadius: 20, marginBottom: 26, background: '#eef1f4' }} />
        )}

        {body.length > 0 ? (
          <div style={{ maxWidth: 900 }}>
            {body.map((p, i) => (
              <p key={i} style={{ fontSize: 16.5, lineHeight: 2.05, color: '#374151', marginBottom: 16, textAlign: 'justify' }}>{p}</p>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: 15.5, lineHeight: 2, color: '#6b7280', maxWidth: 900 }}>
            ينشر موقع الكلية هذا العنوان دون نص تفصيلي مرفق.
          </p>
        )}

        {others.length > 0 && (
          <div style={{ borderTop: '1px solid rgba(15,48,87,0.09)', marginTop: 44, paddingTop: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f3057', marginBottom: 18 }}>عناوين أخرى</h2>
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {others.map((n: any) => (
                <Link
                  key={n.i}
                  to={(deptId ? '/d-item/' + slug + '/' + deptId : '/f-item/' + slug) + '/' + kind + '/' + n.i}
                  style={{ display: 'block', textAlign: 'start', padding: '16px 20px', borderRadius: 14, border: '1px solid rgba(15,48,87,0.09)', background: '#F5F7F9' }}
                >
                  {n.date && <span style={{ display: 'block', fontSize: 12.5, color: '#9ca3af', marginBottom: 6 }} dir={dateDir(n.date)}>{n.date}</span>}
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#0f3057', lineHeight: 1.8 }}>{n.title}</span>
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
