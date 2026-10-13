import React from "react";
import { Link } from "react-router";
import { FileText, ArrowLeft, ExternalLink, Info } from "lucide-react";

function PageHead({ title }: { title: string }) {
  return (
    <div className="mb-8 border-b border-gray-100 pb-6">
      <Link
        to="/dentistry/programs"
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

function NoItems() {
  return (
    <div className="flex items-start gap-3 bg-[#F8FAFC] border border-dashed border-gray-200 rounded-xl px-5 py-6">
      <Info size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-gray-500 leading-relaxed">لا توجد عناصر لعرضها في هذه الصفحة.</p>
    </div>
  );
}

export function DentistryBachelor() {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500" dir="rtl">
      <PageHead title="برامج البكالوريوس" />
      <div className="flex flex-col gap-3">
        <ProgramRow title="خطة البكالوريس لطب الأسنان 2024" />
      </div>
    </div>
  );
}

export function DentistryGraduate() {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500" dir="rtl">
      <PageHead title="برامج الدراسات العليا" />
      <NoItems />
    </div>
  );
}

export function DentistryOtherPrograms() {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500" dir="rtl">
      <PageHead title="برامج أخرى" />
      <NoItems />
    </div>
  );
}
