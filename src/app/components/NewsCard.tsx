import React, { useState } from 'react';
import { Link } from 'react-router';
import { CalendarDays } from 'lucide-react';
import mutahLogo from '@/imports/MUTAH_LOGO.png';

// Shared news / event card: large image on top, then date, title, excerpt and "read more".
// Items without a photo (or whose photo fails to load) get a branded placeholder.
export type NewsCardProps = {
  title: string;
  date?: string;
  img?: string;
  excerpt?: string;
  to?: string; // internal route
  href?: string; // external link
  onClick?: () => void; // in-page navigation
  more?: string;
};

function Placeholder() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0a2342] via-[#0f3057] to-[#1d4e89] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '18px 18px' }} />
      <img src={mutahLogo} alt="" className="relative w-[58%] max-w-[220px] opacity-25 brightness-0 invert" />
    </div>
  );
}

export function NewsCard({ title, date, img, excerpt, to, href, onClick, more = 'قراءة المزيد' }: NewsCardProps) {
  const [broken, setBroken] = useState(false);
  const body = (
    <>
      <div className="h-[190px] overflow-hidden bg-[#0f3057] shrink-0">
        {img && !broken
          ? <img src={img} alt={title} loading="lazy" onError={() => setBroken(true)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          : <Placeholder />}
      </div>
      <div className="p-5 flex flex-col flex-1 text-right">
        {date && (
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#c9a227] mb-2.5">
            <CalendarDays size={14} className="shrink-0" /><span dir="ltr">{date}</span>
          </span>
        )}
        <h3 className="text-[16px] font-bold text-[#0f3057] leading-[1.75] line-clamp-2 group-hover:text-[#c9a227] transition-colors">{title}</h3>
        {excerpt && <p className="text-[13.5px] text-gray-500 leading-[1.9] mt-2 line-clamp-2">{excerpt}</p>}
        {(to || href || onClick) && (
          <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#0f3057]">
            {more} <span aria-hidden="true">←</span>
          </span>
        )}
      </div>
    </>
  );
  const cls = 'group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full';
  if (to) return <Link to={to} className={cls}>{body}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{body}</a>;
  if (onClick) return <button type="button" onClick={onClick} className={cls + ' w-full cursor-pointer'}>{body}</button>;
  return <div className={cls}>{body}</div>;
}

// Responsive grid that adapts to the width of the column it sits in
export function NewsGrid({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={'grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))] ' + className}>{children}</div>;
}

// First paragraph of a news body (string or string[]), for the excerpt line
export function firstText(body: unknown): string | undefined {
  if (!body) return undefined;
  if (typeof body === 'string') return body;
  if (Array.isArray(body)) { const s = body.find(x => typeof x === 'string' && x.trim()); return s as string | undefined; }
  return undefined;
}
