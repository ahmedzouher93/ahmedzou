import React from 'react';
import { Link } from 'react-router';
import { ChevronLeft, House } from 'lucide-react';

// "Current path" trail shown at the top of every page: الرئيسية › section › page.
// The first crumb (home) is added automatically; the last crumb is the current page.
export type Crumb = { label: string; to?: string; onClick?: () => void };

export function Breadcrumbs({ items, tone = 'dark', align = 'start', pill = false, className = '' }: {
  items: Crumb[];
  pill?: boolean; // translucent backdrop, for trails placed over busy photos
  tone?: 'dark' | 'light'; // dark = on a navy hero, light = on a white background
  align?: 'start' | 'center';
  className?: string;
}) {
  const trail = [{ label: 'الرئيسية', to: '/' } as Crumb, ...items.filter(c => c && c.label)];
  // drop consecutive duplicates (e.g. a section whose first page has the same name)
  const crumbs = trail.filter((c, i) => i === 0 || c.label !== trail[i - 1].label);
  const muted = tone === 'dark' ? 'text-white/65 hover:text-[#c9a227]' : 'text-gray-500 hover:text-[#c9a227]';
  const sep = tone === 'dark' ? 'text-white/35' : 'text-gray-300';
  return (
    <nav aria-label="breadcrumb" className={'w-full ' + className}>
      <ol className={'flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] leading-6 ' + (align === 'center' ? 'justify-center' : 'justify-start')
        + (pill ? ' w-fit max-w-full rounded-full bg-[#0a2342]/70 backdrop-blur-sm px-4 py-1.5 ' + (align === 'center' ? 'mx-auto' : '') : '')}>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          const inner = i === 0 ? <span className="inline-flex items-center gap-1.5"><House size={13} />{c.label}</span> : c.label;
          return (
            <li key={i} className="inline-flex items-center gap-2 min-w-0">
              {i > 0 && <ChevronLeft size={14} className={sep + ' shrink-0'} aria-hidden="true" />}
              {last
                ? <span aria-current="page" className="font-bold text-[#c9a227] truncate max-w-[60vw]">{inner}</span>
                : c.to
                  ? <Link to={c.to} className={muted + ' transition-colors'}>{inner}</Link>
                  : c.onClick
                    ? <button type="button" onClick={c.onClick} className={muted + ' transition-colors'}>{inner}</button>
                    : <span className={tone === 'dark' ? 'text-white/65' : 'text-gray-500'}>{inner}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Trail of sidebar labels leading to the active item: [group, sub-group, item]
type NavNode = { id: string; name: string; url?: string; children?: NavNode[] };
export function navTrail(links: NavNode[], activeId: string): NavNode[] {
  for (const l of links) {
    if (l.id === activeId) return [l];
    if (l.children) {
      const sub = navTrail(l.children, activeId);
      if (sub.length) return [l, ...sub];
    }
  }
  return [];
}

// Trail for path-based menus ({ name, path, children }): nodes leading to the current route.
// Falls back to the closest parent route (e.g. /medicine/activities/3 → النشاطات).
type PathNode = { name: string; path?: string; children?: PathNode[] };
const cleanPath = (p?: string) => (p || '').split('#')[0].split('?')[0].replace(/\/$/, '');
function findTrail(links: PathNode[], match: (p: string) => boolean): PathNode[] {
  for (const l of links) {
    if (l.children) {
      const sub = findTrail(l.children, match);
      if (sub.length) return [l, ...sub];
    }
    if (l.path && !l.path.startsWith('#') && match(cleanPath(l.path))) return [l];
  }
  return [];
}
export function pathTrail(links: PathNode[], pathname: string): PathNode[] {
  const here = cleanPath(pathname);
  const exact = findTrail(links, p => p === here);
  if (exact.length) return exact;
  const parts = here.split('/');
  for (let n = parts.length - 1; n > 2; n--) {
    const parent = parts.slice(0, n).join('/');
    const t = findTrail(links, p => p === parent);
    if (t.length) return t;
  }
  return [];
}
