export function AnatomyForms() {
  return (
    <div className="flex flex-col w-full">
      <div className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-bold text-[#0f3057] mb-2">النماذج</h1>
        <p className="text-lg text-gray-600">النماذج الخاصة بالقسم</p>
      </div>

      <section className="py-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "دليل القسم 2024-2025", icon: "📄" },
            { title: "النماذج الأكاديمية", icon: "📋" },
          ].map((link, i) => (
            <a key={i} href="#" className="flex flex-col items-center justify-center p-5 bg-gray-50 rounded-xl hover:bg-[#0f3057] hover:text-white transition-all group border border-gray-100">
              <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{link.icon}</span>
              <span className="font-medium text-sm text-[#0f3057] group-hover:text-white">{link.title}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}