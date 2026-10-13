import React from "react";
import { Link } from "react-router";
import { FileText, ArrowLeft, ExternalLink } from "lucide-react";
import { Attachments, samplePair } from '../../components/Attachments';

function PageHead({ title }: { title: string }) {
  return (
    <div className="mb-8 border-b border-gray-100 pb-6">
      <Link
        to="/medicine/programs"
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-[#c9a227] transition-colors mb-4"
      >
        <ArrowLeft size={14} className="rotate-180" />
        البرامج الأكاديمية
      </Link>
      <h1 className="text-3xl font-bold text-[#0f3057]">{title}</h1>
    </div>
  );
}

function ProgramRow({ title, dept }: { title: string; dept?: string }) {
  return (
    <div className="flex items-center gap-4 border border-gray-200 rounded-xl px-5 py-4 hover:border-[#c9a227] hover:bg-[#fffbf0] transition-colors">
      <div className="w-10 h-10 rounded-lg bg-[#0f3057]/8 flex items-center justify-center flex-shrink-0">
        <FileText size={17} className="text-[#0f3057]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-bold text-[#0f3057] leading-snug">{title}</p>
        {dept && <p className="text-xs text-gray-500 mt-1">{dept}</p>}
      </div>
      <span className="inline-flex items-center gap-1.5 text-[#c9a227] text-xs font-bold flex-shrink-0">
        الخطط الدراسية
        <ExternalLink size={13} />
      </span>
    </div>
  );
}

/* ─── برامج البكالوريوس ─── */
export function MedicineBachelor() {
  const items = [
    "بكالوريوس الطب والجراحة",
    "سمات الخطة الاسترشادية",
    "اعتمادية الكلية في الجهات الخارجية",
    "الدراسة باللغة الانجليزية",
    "التعديل للخطة الدراسية للسنوات 2013-2014-2015",
    "تعديل مسمى شهادة البكالوريس",
    "نتيجة المواد ناجح راسب في جائحة كورونا",
    "توزيع المختبرات",
  ];
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500" dir="rtl">
      <PageHead title="برامج البكالوريوس" />
      <div className="flex flex-col gap-3">
        {items.map((t) => <ProgramRow key={t} title={t} />)}
      </div>
      <Attachments files={samplePair('الخطة الدراسية - بكالوريوس الطب والجراحة')} />
    </div>
  );
}

/* ─── برامج الدراسات العليا ─── */
export function MedicineGraduate() {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500" dir="rtl">
      <PageHead title="برامج الدراسات العليا" />
      <div className="flex flex-col gap-3">
        <ProgramRow
          title="ماجستير الصحة العامة / الادراة الصحية"
          dept="قسم الصحة العامة وطب المجتمع"
        />
      </div>
      <Attachments files={samplePair('الخطة الدراسية - ماجستير الصحة العامة')} />
    </div>
  );
}

/* ─── برامج أخرى ─── */
export function MedicineOtherPrograms() {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500" dir="rtl">
      <PageHead title="برامج أخرى" />
      <div className="flex flex-col gap-3">
        <ProgramRow title="التعليمات المقترحة لمنح شهادة الاختصاص العالي في الطب / جامعة مؤته" />
      </div>
    </div>
  );
}
