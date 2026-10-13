import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, FileText, Download, Wallet } from 'lucide-react';
import { WireframeHeader } from '../components/WireframeHeader';
import { WireframeFooter } from '../components/WireframeFooter';

const GROUPS = [
  {
    no: '1',
    title: 'الرسوم الجامعية لبرنامج البكالوريوس',
    items: [
      'الرسوم الجامعيه للبرنامج الدولي للبكالوريوس',
      'الرسوم لبرنامج التجسير الموازي بكالوريوس',
      'رسوم برنامج البكالوريوس العادي - قبول موحد',
      'رسوم برنامج البكالوريوس الموازي',
      'رسوم برنامج التجسير العادي بكالوريوس - قبول موحد',
    ],
  },
  {
    no: '2',
    title: 'الرسوم الجامعية لبرنامج الدكتوراة',
    items: [
      'رسوم برنامج الدكتوراة للطلبة الأردنيين',
      'رسوم برنامج الدكتوراة الدولي للطلبة الوافدين',
    ],
  },
  {
    no: '3',
    title: 'الرسوم الجامعية لبرنامج الماجستير',
    items: [
      'رسوم برنامج الإختصاص العالي في كلية الطب',
      'رسوم برنامج الماجستير الدولي للطلبة الوافدين',
      'رسوم برنامج الماجستير للطلبة الأردنيين',
    ],
  },
  {
    no: '4',
    title: 'برنامج الدبلوم',
    items: ['الرسوم الجامعيه لبرنامج الدبلوم'],
  },
];

export function UniversityFees() {
  const navigate = useNavigate();
  const total = GROUPS.reduce((a, g) => a + g.items.length, 0);
  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-['Noto_Kufi_Arabic'] bg-white">
      <WireframeHeader />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '110px 40px 60px', width: '100%' }}>
        <button
          onClick={() => navigate('/graduate-studies/stu-fees')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, border: '1px solid rgba(15,48,87,0.15)', background: '#fff', color: '#0f3057', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', marginBottom: 26, fontFamily: 'inherit' }}
        >
          <ArrowRight size={15} /> الرجوع إلى الرسوم الجامعية
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl bg-[#0f3057] flex items-center justify-center">
            <Wallet size={20} className="text-[#c9a227]" />
          </div>
          <h1 className="text-[34px] font-bold text-[#0f3057]">جدول الرسوم الجامعية</h1>
        </div>
        <p className="text-gray-600 text-[15.5px] leading-[2] mb-10 pb-6 border-b border-gray-100">
          جامعة مؤتة — جداول الرسوم المعتمدة لجميع البرامج الأكاديمية · {total} جدولاً
        </p>

        <div className="flex flex-col gap-10">
          {GROUPS.map((g) => (
            <section key={g.no}>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-9 h-9 rounded-lg bg-[#0f3057] text-[#c9a227] flex items-center justify-center font-bold flex-shrink-0">{g.no}</span>
                <h2 className="text-[19px] font-bold text-[#0f3057] leading-relaxed">{g.title}</h2>
                <span className="text-xs font-bold text-gray-400">{g.items.length}</span>
              </div>
              <div className="overflow-hidden rounded-2xl border border-gray-100">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-[#0f3057]">
                      <th className="px-5 py-3.5 text-[13.5px] font-bold text-white w-16">#</th>
                      <th className="px-5 py-3.5 text-[13.5px] font-bold text-white">جدول الرسوم</th>
                      <th className="px-5 py-3.5 text-[13.5px] font-bold text-white w-28">الصيغة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.items.map((name, i) => (
                      <tr key={i} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-5 py-4 text-[14px] text-gray-500 border-t border-gray-100" dir="ltr">{g.no}.{i + 1}</td>
                        <td className="px-5 py-4 text-[15px] font-semibold text-[#0f3057] border-t border-gray-100 leading-relaxed">
                          <span className="inline-flex items-center gap-3">
                            <FileText size={16} className="text-[#0f3057]/50 flex-shrink-0" />
                            {name}
                          </span>
                        </td>
                        <td className="px-5 py-4 border-t border-gray-100">
                          <span className="inline-flex items-center gap-2 text-[12.5px] font-bold text-[#c9a227]">
                            <Download size={14} /> PDF
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      </div>
      <WireframeFooter />
    </div>
  );
}
