import React from 'react';
import { useParams, Link } from 'react-router';
import { Info, Layers, FileText, Download, Link2 } from 'lucide-react';

const NAMES: Record<string, string> = {
  biochemistry: 'الكيمياء الحيوية وعلم وظائف الأعضاء',
  'public-health': 'الصحة العامة وطب المجتمع',
  pediatrics: 'الأطفال',
  'internal-medicine': 'الطب الباطني والطب الشرعي',
  microbiology: 'علم الأحياء الدقيقة وعلم الأمراض',
  obgyn: 'النسائية والتوليد',
  pharmacology: 'علم الأدوية',
  'special-surgery': 'الجراحة الخاصة',
  'general-surgery': 'الجراحة العامة والتخدير',
};

const FACULTY_LINKS = [
  'تعليمات موظفي جامعة مؤتة المعدلة',
  'روابط مهمة',
  'WFME',
  'الرابط الخاص بامتحانات كلية الطب',
  'تعليمات أعضاء الهيئة التدريسية المعدلة',
  'روابط التقييم',
  'هيئة اعتماد مؤسسات التعليم العالي وضمان جودتها',
  'دليل كليه الطب 2023-2024',
];

export function MedicineDeptGeneric() {
  const { dept } = useParams();
  const name = NAMES[dept as string] || 'قسم أكاديمي';
  return (
    <div className="w-full animate-in fade-in duration-500" dir="rtl">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-1 h-8 rounded-full bg-[#c9a227] block flex-shrink-0" />
        <div className="w-9 h-9 rounded-lg bg-[#0f3057] flex items-center justify-center flex-shrink-0">
          <Layers size={18} className="text-[#c9a227]" />
        </div>
        <h2 className="text-xl font-bold text-[#0f3057]">{name}</h2>
      </div>
      <p className="text-[#c9a227] font-bold mb-8 pr-12">كلية الطب :: جامعة مؤتة — من أجل بيئة تعليمية صحية للتفوق المهني</p>

      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-1.5 h-6 rounded-full bg-[#c9a227] block" />
          <h3 className="text-[17.5px] font-bold text-[#0f3057]">جديد الكلية</h3>
          <span className="text-xs font-bold text-gray-400">{FACULTY_LINKS.length}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FACULTY_LINKS.map((l, i) => (
            <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-3.5 bg-white">
              <div className="w-9 h-9 rounded-lg bg-[#0f3057]/8 flex items-center justify-center flex-shrink-0">
                {i === 1 || i === 5 ? <Link2 size={16} className="text-[#0f3057]" /> : <FileText size={16} className="text-[#0f3057]" />}
              </div>
              <p className="text-sm font-semibold text-[#0f3057] flex-1 leading-snug">{l}</p>
              <Download size={15} className="text-[#c9a227] flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-1.5 h-6 rounded-full bg-[#c9a227] block" />
          <h3 className="text-[17.5px] font-bold text-[#0f3057]">أخبار وإعلانات القسم</h3>
        </div>
        <div className="flex items-start gap-3 bg-[#F8FAFC] border border-dashed border-gray-200 rounded-xl px-5 py-6">
          <Info size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-500 leading-relaxed">
            لا توجد عناصر لعرضها في قائمة أخبار وإعلانات هذا القسم على موقع الكلية.
          </p>
        </div>
      </section>

      <Link to="/medicine/departments" className="inline-flex items-center gap-2 text-[#0f3057] font-bold text-sm hover:text-[#c9a227] transition-colors">
        عرض جميع الأقسام <span className="rotate-180">→</span>
      </Link>
    </div>
  );
}
