export function MedicineLinks() {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      <div className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-bold text-[#0f3057] mb-2">روابط مهمة</h1>
        <p className="text-gray-600 text-[15px]">أهم المستندات والتعليمات</p>
      </div>

      <section className="py-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { title: "دليل كلية الطب 2023-2024" },
            { title: "ماجستير الصحة العامة" },
            { title: "عقد الالتزام الأخلاقي" },
            { title: "الشراكة" },
            { title: "الخطط الاستراتيجية" },
            { title: "تعليمات الهيئة التدريسية" }
          ].map((link, i) => (
            <a key={i} href="#" className="flex flex-col items-center justify-center p-6 bg-[#0f3057] text-white rounded-2xl hover:bg-[#c9a227] transition-colors group min-h-[120px]">
              <span className="font-bold text-[16px] text-center">{link.title}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}