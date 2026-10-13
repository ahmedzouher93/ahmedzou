import React, { useEffect, useRef, useState } from 'react';
import { AArrowUp, AArrowDown, BetweenHorizontalStart, Contrast, Volume2, VolumeX, Accessibility, RotateCcw, X } from 'lucide-react';

// Accessibility tools in the site header: text size, line spacing, high contrast and text-to-speech.
// Settings are saved per visitor and applied as data-* attributes on <html> (styles in styles/a11y.css).
type Settings = { font: number; lh: number; contrast: boolean };
const KEY = 'mutah-a11y';
const DEFAULTS: Settings = { font: 0, lh: 0, contrast: false };
const FONT_STEPS = ['100%', '115%', '130%', '150%'];
const LH_STEPS = ['عادي', 'متوسط', 'واسع'];

function load(): Settings {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return DEFAULTS; }
}
function apply(s: Settings) {
  const el = document.documentElement;
  el.dataset.a11yFont = String(s.font);
  el.dataset.a11yLh = String(s.lh);
  if (s.contrast) el.dataset.a11yContrast = 'high'; else delete el.dataset.a11yContrast;
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* storage unavailable */ }
}

// Text that should be read aloud: the selection, or the page content without header, menus and footer
function pageText(): string {
  const sel = window.getSelection()?.toString().trim();
  if (sel) return sel;
  const root = document.getElementById('root');
  if (!root) return '';
  const clone = root.cloneNode(true) as HTMLElement;
  clone.querySelectorAll('header, footer, nav, aside, script, style, [aria-hidden="true"], .fixed').forEach(n => n.remove());
  return (clone.innerText || clone.textContent || '').replace(/\s+/g, ' ').trim();
}
function chunks(text: string): string[] {
  const parts = text.split(/(?<=[.!؟?،:\n])\s+/);
  const out: string[] = []; let cur = '';
  for (const p of parts) {
    if ((cur + ' ' + p).length > 220) { if (cur) out.push(cur); cur = p; } else cur = cur ? cur + ' ' + p : p;
  }
  if (cur) out.push(cur);
  return out;
}

export function useAccessibility() {
  const [s, setS] = useState<Settings>(DEFAULTS);
  const [speaking, setSpeaking] = useState(false);
  const [notice, setNotice] = useState('');
  useEffect(() => { const v = load(); setS(v); apply(v); }, []);
  useEffect(() => () => { try { window.speechSynthesis?.cancel(); } catch { /* ignore */ } }, []);
  const update = (patch: Partial<Settings>) => setS(prev => { const next = { ...prev, ...patch }; apply(next); return next; });
  const flash = (m: string) => { setNotice(m); window.setTimeout(() => setNotice(''), 2600); };

  const speak = () => {
    const synth = window.speechSynthesis;
    if (!synth || typeof SpeechSynthesisUtterance === 'undefined') { flash('المتصفح لا يدعم ميزة النطق'); return; }
    if (speaking) { synth.cancel(); setSpeaking(false); return; }
    const text = pageText();
    if (!text) { flash('لا يوجد نص للقراءة'); return; }
    synth.cancel();
    const voice = synth.getVoices().find(v => v.lang?.toLowerCase().startsWith('ar'));
    const list = chunks(text);
    list.forEach((t, i) => {
      const u = new SpeechSynthesisUtterance(t);
      u.lang = voice?.lang || 'ar-SA';
      if (voice) u.voice = voice;
      u.rate = 0.95;
      if (i === list.length - 1) { u.onend = () => setSpeaking(false); u.onerror = () => setSpeaking(false); }
      synth.speak(u);
    });
    setSpeaking(true);
    flash(window.getSelection()?.toString().trim() ? 'جارٍ قراءة النص المحدد' : 'جارٍ قراءة محتوى الصفحة');
  };

  return {
    s, speaking, notice, speak,
    fontUp: () => update({ font: Math.min(FONT_STEPS.length - 1, s.font + 1) }),
    fontDown: () => update({ font: Math.max(0, s.font - 1) }),
    lineSpacing: () => update({ lh: (s.lh + 1) % LH_STEPS.length }),
    toggleContrast: () => update({ contrast: !s.contrast }),
    reset: () => { update(DEFAULTS); try { window.speechSynthesis?.cancel(); } catch { /* ignore */ } setSpeaking(false); },
  };
}

type Tool = { id: string; label: string; icon: React.ReactNode; onClick: () => void; pressed?: boolean; disabled?: boolean; hint?: string };

export function AccessibilityTools({ iconBtn }: { iconBtn: (label: string, onClick?: () => void, children?: React.ReactNode, extra?: React.ButtonHTMLAttributes<HTMLButtonElement>) => React.ReactNode }) {
  const a = useAccessibility();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const tools: Tool[] = [
    { id: 'up', label: 'تكبير الخط', icon: <AArrowUp size={18} />, onClick: a.fontUp, disabled: a.s.font >= FONT_STEPS.length - 1, hint: FONT_STEPS[a.s.font] },
    { id: 'down', label: 'تصغير الخط', icon: <AArrowDown size={18} />, onClick: a.fontDown, disabled: a.s.font <= 0, hint: FONT_STEPS[a.s.font] },
    { id: 'lh', label: 'تباعد الأسطر: ' + LH_STEPS[a.s.lh], icon: <BetweenHorizontalStart size={17} />, onClick: a.lineSpacing, pressed: a.s.lh > 0 },
    { id: 'contrast', label: a.s.contrast ? 'إلغاء التباين العالي' : 'التباين العالي', icon: <Contrast size={17} />, onClick: a.toggleContrast, pressed: a.s.contrast },
    { id: 'tts', label: a.speaking ? 'إيقاف القراءة' : 'قراءة الصفحة بصوت مسموع', icon: a.speaking ? <VolumeX size={17} /> : <Volume2 size={17} />, onClick: a.speak, pressed: a.speaking },
  ];
  const changed = a.s.font || a.s.lh || a.s.contrast;

  return (
    <>
      {/* Wide screens: tools side by side in the header */}
      <div role="toolbar" aria-label="أدوات الوصول" className="hidden lg:flex items-center gap-0.5 rounded-xl px-1" style={{ background: 'rgba(255,255,255,0.06)' }}>
        {tools.map(t => (
          <React.Fragment key={t.id}>
            {iconBtn(t.label, t.onClick, t.icon, { 'aria-pressed': t.pressed, disabled: t.disabled, style: t.disabled ? { opacity: 0.35 } : t.pressed ? { color: '#c9a227', background: 'rgba(201,162,39,0.15)' } : undefined } as any)}
          </React.Fragment>
        ))}
        {changed ? iconBtn('إعادة الضبط', a.reset, <RotateCcw size={16} />) : null}
      </div>

      {/* Small screens: one accessibility button opening the same tools */}
      <div className="relative lg:hidden flex items-center">
        {iconBtn('أدوات الوصول', () => setOpen(!open), <Accessibility size={18} />, { 'aria-expanded': open, 'aria-haspopup': 'true' } as any)}
        {open && (
          <>
            <div className="fixed inset-0 z-[60]" onClick={() => setOpen(false)} />
            <div ref={panelRef} role="dialog" aria-label="أدوات الوصول" className="fixed top-[76px] left-3 z-[61] w-[260px] max-w-[calc(100vw-24px)] rounded-2xl p-3 shadow-2xl" style={{ background: '#0f3057', border: '1px solid rgba(201,162,39,0.3)' }}>
              <div className="flex items-center justify-between px-1 pb-2 mb-2 border-b border-white/10">
                <span className="text-[13px] font-bold text-white">أدوات الوصول</span>
                <button onClick={() => setOpen(false)} aria-label="إغلاق" className="text-white/60 hover:text-white"><X size={16} /></button>
              </div>
              {tools.map(t => (
                <button key={t.id} onClick={t.onClick} disabled={t.disabled} aria-pressed={t.pressed}
                  className={'w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-right transition-colors ' + (t.pressed ? 'bg-[#c9a227]/20 text-[#c9a227]' : 'text-white/90 hover:bg-white/10') + (t.disabled ? ' opacity-40' : '')}>
                  {t.icon}<span className="flex-1">{t.label}</span>{t.hint && <span className="text-[11px] text-white/50" dir="ltr">{t.hint}</span>}
                </button>
              ))}
              {changed ? (
                <button onClick={a.reset} className="w-full mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-white/70 hover:bg-white/10">
                  <RotateCcw size={16} /> إعادة الضبط
                </button>
              ) : null}
            </div>
          </>
        )}
      </div>

      {a.notice && (
        <div role="status" aria-live="polite" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] rounded-xl bg-[#0f3057] text-white text-[13.5px] font-semibold px-5 py-3 shadow-2xl border border-[#c9a227]/40">
          {a.notice}
        </div>
      )}
    </>
  );
}
