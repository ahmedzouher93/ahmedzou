import React from "react";
import { Info } from "lucide-react";

function DeptPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500" dir="rtl">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-bold text-[#0f3057]">{title}</h1>
        <p className="text-gray-500 text-[15px] mt-2">قسم العلوم السنية والطبية</p>
      </div>
      <div className="flex items-start gap-3 bg-[#F8FAFC] border border-dashed border-gray-200 rounded-xl px-5 py-6">
        <Info size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-500 leading-relaxed">لا توجد عناصر لعرضها في هذه الصفحة.</p>
      </div>
    </div>
  );
}

export function DentalSciencesStrategy() { return <DeptPage title="الاستيراتيجية" />; }
export function DentalSciencesCourses() { return <DeptPage title="المواد الدراسية" />; }
export function DentalSciencesPrograms() { return <DeptPage title="البرامج الدراسية" />; }
export function DentalSciencesPlans() { return <DeptPage title="الخطط الدراسية" />; }
export function DentalSciencesForms() { return <DeptPage title="النماذج" />; }
export function DentalSciencesAchievements() { return <DeptPage title="الإنجازات" />; }
