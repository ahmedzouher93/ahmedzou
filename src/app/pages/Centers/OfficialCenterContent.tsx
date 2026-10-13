import React, {useState} from 'react';
import {Link} from 'react-router';
import DATA from './OfficialCentersData';
import {FileText, ArrowUpLeft, Search} from 'lucide-react';
import { NewsCard } from '@/app/components/NewsCard';

function Photos({images,title}:any){
  const [limit,setLimit]=useState(8);
  return <section className="mt-8"><div className="grid sm:grid-cols-2 gap-5">{images.slice(0,limit).map((src:string,i:number)=><figure key={src} className="m-0"><img src={src} alt={`${title} — صورة ${i+1}`} loading="lazy" className="w-full rounded-lg bg-slate-100" style={{maxHeight:420,objectFit:'contain'}} onError={e=>{e.currentTarget.style.display='none';}}/></figure>)}</div>{limit<images.length&&<button onClick={()=>setLimit(limit+12)} className="mt-5 px-5 py-3 border rounded-lg">عرض المزيد من الصور</button>}</section>;
}
export function OfficialCenterContent({center,tab,links,config}:any){
 const cfg=config||DATA[center];
 const [query,setQuery]=useState('');const [limit,setLimit]=useState(24);const [showPdf,setShowPdf]=useState(false);
 const group=links.find((l:any)=>l.id===tab&&l.children);
 const page=cfg.pages[tab]||{title:group?.name||'صفحات المركز',paragraphs:[]};
 const cards=(page.cards||group?.children?.map((c:any)=>({title:c.name,tab:c.id}))||[]).filter((c:any)=>(c.title+' '+(c.summary||'')).includes(query));
 return <article className="bg-white rounded-xl border border-slate-100 p-5 md:p-9 text-[#0f3057] min-h-[320px]">
  <h2 className="text-2xl font-bold mb-6 leading-relaxed">{page.title}</h2>
  {page.notice&&<p className="bg-amber-50 border-r-4 border-amber-500 p-4 mb-6 text-sm text-amber-950 leading-8">{page.notice}</p>}
  <div className="space-y-5 max-w-4xl text-slate-700 leading-9">{(page.paragraphs||[]).map((p:string,i:number)=><p key={i} className={page.boldParagraphs?"font-bold whitespace-pre-wrap":undefined}>{p}</p>)}</div>
  {(page.sections||[]).map((s:any,i:number)=><section key={i} className="mt-8"><h3 className="font-bold text-xl mb-4">{s.title}</h3><ul className="list-disc pr-5 space-y-3 leading-8 text-slate-700">{s.items.map((p:string,j:number)=><li key={j}>{p}</li>)}</ul></section>)}
  {(page.tables||[]).map((t:any,i:number)=><div className="overflow-x-auto my-8" key={i}><table className="w-full text-right text-sm leading-7"><caption className="text-right font-bold text-lg mb-4">{t.title||page.title}</caption><thead><tr className="bg-[#0f3057] text-white">{t.columns.map((c:string,j:number)=><th scope="col" className="p-3" key={j}>{c}</th>)}</tr></thead><tbody>{t.rows.map((r:string[],j:number)=><tr key={j} className="border-b even:bg-slate-50">{r.map((v:string,n:number)=><td className="p-3 align-top" key={n} dir="auto">{v}</td>)}</tr>)}</tbody></table></div>)}
  {page.cards?.length>12&&<label className="flex items-center gap-3 my-6 border rounded-lg px-4"><Search size={18}/><input className="py-3 w-full outline-none" aria-label="البحث في الأخبار والصفحات" placeholder="ابحث بالعنوان أو السنة…" value={query} onChange={e=>{setQuery(e.target.value);setLimit(12);}}/></label>}
  {cards.length>0&&<div className="grid md:grid-cols-2 gap-4 mt-7">{cards.slice(0,limit).map((c:any,i:number)=>{if(c.date&&!c.tab)return <NewsCard key={i} title={c.title} date={c.date} img={c.img} excerpt={c.summary} href={c.url} to={c.url?undefined:'/c-item/'+(center||(cfg.root||'').replace(/^#\//,'')||'')+'/'+tab+'/'+i}/>;const body=<><div className="flex gap-3 justify-between"><h3 className="font-bold leading-8">{c.title}</h3><ArrowUpLeft className="shrink-0 mt-1" size={18}/></div>{c.summary&&<p className="text-sm leading-8 text-slate-600 mt-3">{c.summary}</p>}{c.date&&<p className="text-xs text-slate-500 mt-3" dir="ltr">{c.date}</p>}</>;const href=c.tab?cfg.root+'/'+c.tab:c.url;return href?<a key={i} href={href} target={c.tab?undefined:'_blank'} rel={c.tab?undefined:'noopener noreferrer'} className="p-5 rounded-lg border border-slate-200 hover:border-[#0f3057] hover:bg-slate-50 transition-colors">{body}{!c.tab&&<span className="block mt-3 text-xs text-slate-500">التفاصيل في الموقع الرسمي</span>}</a>:<Link key={i} to={'/c-item/'+(center||(cfg.root||'').replace(/^#\//,'')||'')+'/'+tab+'/'+i} className="p-5 rounded-lg border border-slate-200 hover:border-[#0f3057] hover:bg-slate-50 transition-colors">{body}</Link>;})}</div>}
  {page.cards&&cards.length===0&&query&&<p className="my-8">لا توجد نتائج مطابقة.</p>}
  {cards.length>limit&&<button className="mt-6 border px-5 py-3 rounded-lg" onClick={()=>setLimit(limit+12)}>عرض المزيد ({cards.length-limit})</button>}
  {page.docs?.length>0&&(()=>{const q=query.trim();const list=q?page.docs.filter((d:any)=>d.title.includes(q)):page.docs;return <section className="mt-8"><h3 className="text-xl font-bold mb-3">الملفات والروابط الرسمية</h3>{page.docs.length>1&&<label className="flex items-center gap-3 mb-5 border rounded-lg px-4"><Search size={18}/><input className="py-3 w-full outline-none bg-transparent" aria-label="البحث في القائمة" placeholder="ابحث بالعنوان أو الرقم…" value={query} onChange={e=>setQuery(e.target.value)}/></label>}{q&&<p className="text-sm text-slate-500 mb-3">{list.length} من {page.docs.length}</p>}{list.length===0?<p className="my-6">لا توجد نتائج مطابقة.</p>:<div className="divide-y">{list.map((d:any,i:number)=><a className="flex gap-3 py-4 underline underline-offset-4 leading-7 break-words" href={d.url} target="_blank" rel="noopener noreferrer" key={i}><FileText className="shrink-0 mt-1" size={20}/><span>{d.title}</span></a>)}</div>}</section>;})()}
  {page.pdf&&<section className="mt-7"><button className="px-5 py-3 bg-[#0f3057] rounded-lg text-white" onClick={()=>setShowPdf(!showPdf)}>{showPdf?'إخفاء الدليل':'عرض دليل الأجهزة داخل الصفحة'}</button>{showPdf&&<><p className="text-sm leading-7 my-4">إذا تعذّر عرض الدليل، استخدم رابط الملف الرسمي أعلاه.</p><iframe title={page.title} src={page.pdf} className="w-full h-[720px] border rounded-lg"/></>}</section>}
  {page.images?.length>0&&<Photos images={page.images} title={page.title}/>}
  <p className="mt-10 pt-5 border-t text-xs text-slate-500 leading-7">المصدر: {cfg.hideSource?<span>{cfg.name} — جامعة مؤتة</span>:<a href={page.source||cfg.source} target="_blank" rel="noopener noreferrer" className="underline">{cfg.name} — جامعة مؤتة</a>} · مراجعة المحتوى المتاح: 12 سبتمبر 2026</p>
 </article>;
}
