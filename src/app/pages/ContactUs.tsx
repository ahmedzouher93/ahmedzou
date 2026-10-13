import React, { useState } from 'react';
import { WireframeHeader } from '../components/WireframeHeader';
import { WireframeFooter } from '../components/WireframeFooter';
import { MapPin, Phone, Printer, Mail, Send, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

const CONTACT = [
  { icon: MapPin, label: 'العنوان', lines: ['الكرك - الأردن - الرمز البريدي (61710)'] },
  { icon: Phone, label: 'الهاتف', lines: ['00962 03 2372380', 'فرعي : 6000'], ltr: true },
  { icon: Printer, label: 'الفاكس', lines: ['00962 03 2375540'], ltr: true },
  { icon: Mail, label: 'البريد الإلكتروني', lines: ['unit_reg@mutah.edu.jo', 'president@mutah.edu.jo', 'Unit_admin@mutah.edu.jo'], ltr: true, mail: true },
];

export function ContactUs() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'استفسار', message: '' });
  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  const field = "w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-[#0f3057] bg-white leading-8";

  return (
    <div className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] bg-[#F5F7F9]" dir="rtl">
      <WireframeHeader />

      <section className="relative" style={{ background: '#0f3057' }}>
        <img src="https://www.mutah.edu.jo/PublishingImages/640.jpg" alt="جامعة مؤتة" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="relative max-w-[1180px] mx-auto px-6 py-16">
          <Breadcrumbs className="mb-5" items={[{ label: 'اتصل بنا' }]} />
          <h1 className="text-white font-extrabold" style={{ fontSize: 40 }}>اتصل بنا</h1>
          <p className="text-white/85 mt-4 leading-9" style={{ fontSize: 17 }}>جامعة مؤتة :: الكرك :: الأردن — نسعد بتواصلكم واستفساراتكم ومقترحاتكم.</p>
        </div>
      </section>

      <main className="max-w-[1180px] mx-auto px-6 py-12 w-full">
        <div className="grid md:grid-cols-2 gap-4">
          {CONTACT.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="bg-white rounded-xl border border-slate-200 p-6 flex gap-4">
                <span className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: '#0f3057' }}>
                  <Icon size={20} color="#c9a227" />
                </span>
                <div>
                  <h2 className="font-bold mb-2" style={{ fontSize: 17 }}>{c.label}</h2>
                  <div className="flex flex-col gap-1">
                    {c.lines.map((l) => (
                      <span key={l} className="text-slate-700 leading-8" dir={c.ltr ? 'ltr' : 'rtl'} style={{ textAlign: 'start' }}>
                        {c.mail ? <a href={'mailto:' + l} className="underline underline-offset-4">{l}</a> : l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-10">
          <section className="bg-white rounded-xl border border-slate-200 p-7">
            <h2 className="font-extrabold mb-2" style={{ fontSize: 22 }}>الاستفسارات والاقتراحات</h2>
            <p className="text-slate-600 leading-8 mb-6">أرسل استفسارك أو اقتراحك وسيتم الرد عليك في أقرب وقت.</p>
            {sent ? (
              <div className="flex gap-3 items-start rounded-lg p-5" style={{ background: '#eef6ee' }}>
                <CheckCircle2 className="shrink-0 mt-1" size={22} color="#2f7d32" />
                <div>
                  <p className="font-bold leading-8">تم استلام رسالتك</p>
                  <p className="text-slate-700 leading-8">شكراً لتواصلك مع جامعة مؤتة، سيتم التواصل معك قريباً.</p>
                  <button className="mt-4 px-5 py-2.5 rounded-lg border border-slate-300" onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: 'استفسار', message: '' }); }}>إرسال رسالة أخرى</button>
                </div>
              </div>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="font-bold">الاسم</span>
                    <input required className={field} value={form.name} onChange={set('name')} placeholder="الاسم الكامل" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-bold">البريد الإلكتروني</span>
                    <input required type="email" dir="ltr" className={field} value={form.email} onChange={set('email')} placeholder="name@example.com" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-bold">رقم الهاتف</span>
                    <input dir="ltr" className={field} value={form.phone} onChange={set('phone')} placeholder="07XXXXXXXX" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-bold">نوع الرسالة</span>
                    <select className={field} value={form.subject} onChange={set('subject')}>
                      <option>استفسار</option>
                      <option>اقتراح</option>
                      <option>شكوى</option>
                      <option>طلب معلومات</option>
                    </select>
                  </label>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="font-bold">نص الرسالة</span>
                  <textarea required rows={6} className={field} value={form.message} onChange={set('message')} placeholder="اكتب استفسارك أو اقتراحك هنا…" />
                </label>
                <button type="submit" className="self-start flex items-center gap-3 px-7 py-3.5 rounded-lg text-white font-bold" style={{ background: '#0f3057' }}>
                  <Send size={18} />
                  إرسال
                </button>
              </form>
            )}
          </section>

          <section className="bg-white rounded-xl border border-slate-200 p-7">
            <h2 className="font-extrabold mb-2" style={{ fontSize: 22 }}>موقع الجامعة على الخريطة</h2>
            <p className="text-slate-600 leading-8 mb-6">خريطة تفاعلية لمرافق الحرم الجامعي في مؤتة / الكرك.</p>
            <iframe
              title="خريطة جامعة مؤتة"
              src="https://www.google.com/maps/d/embed?mid=12Ob9gBozlRyt4NTwX7JRP3zMQss-G2iW&ll=31.093560724576136%2C35.71742139688604&z=16"
              className="w-full rounded-lg border border-slate-200"
              style={{ height: 520 }}
              loading="lazy"
            />
          </section>
        </div>
      </main>

      <WireframeFooter />
    </div>
  );
}
