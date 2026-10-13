import { FileText, Download } from "lucide-react";

export function MedicineForms() {
  const forms = [
    "طلب اجازة عضو هيئة تدريس",
    "مباشرة عمل عضو هيئة تدريس",
    "استخدام قاعة",
    "نموذج رفع معدل -الايميل داخل النموذج",
  ];

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      <div className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-bold text-[#0f3057] mb-2">النماذج</h1>
        <p className="text-gray-600 text-[15px]">النماذج والطلبات الخاصة بأعضاء الهيئة التدريسية والطلبة</p>
      </div>

      <section className="py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {forms.map((form, i) => (
            <a key={i} href="#" className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 bg-white hover:border-[#c9a227] hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-[#c9a227]/10 transition-colors shrink-0">
                <FileText className="w-6 h-6 text-[#0f3057] group-hover:text-[#c9a227] transition-colors" />
              </div>
              <span className="font-bold text-[#0f3057] text-[15px] flex-1 group-hover:text-[#c9a227] transition-colors">
                {form}
              </span>
              <Download className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}