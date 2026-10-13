import { Link } from "react-router";
import { Card, CardContent } from "../../components/ui/card";

export function MedicineDepartments() {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      <div className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-bold text-[#0f3057] mb-2">الأقسام الأكاديمية</h1>
        <p className="text-gray-600 text-[15px]">عشرة أقسام تغطي جميع التخصصات الطبية</p>
      </div>

      <section className="py-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {[
            { title: "التشريح وعلم الأنسجة", link: "/medicine/departments/anatomy" },
            { title: "الكيمياء الحيوية وعلم وظائف الأعضاء", link: "/medicine/departments/biochemistry" },
            { title: "الصحة العامة وطب المجتمع", link: "/medicine/departments/public-health" },
            { title: "الأطفال", link: "/medicine/departments/pediatrics" },
            { title: "الطب الباطني والطب الشرعي", link: "/medicine/departments/internal-medicine" },
            { title: "علم الأحياء الدقيقة وعلم الأمراض", link: "/medicine/departments/microbiology" },
            { title: "النسائية والتوليد", link: "/medicine/departments/obgyn" },
            { title: "علم الأدوية", link: "/medicine/departments/pharmacology" },
            { title: "الجراحة الخاصة", link: "/medicine/departments/special-surgery" },
            { title: "الجراحة العامة والتخدير", link: "/medicine/departments/general-surgery" },
          ].map((dept, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow border border-gray-100 shadow-sm overflow-hidden group cursor-pointer bg-white">
              {dept.link ? (
                <Link to={dept.link} className="block w-full h-full">
                  <CardContent className="p-5 flex items-center justify-center text-center min-h-[100px] group-hover:bg-[#0f3057] transition-colors">
                    <h3 className="font-bold text-[16px] text-[#0f3057] group-hover:text-white transition-colors">{dept.title}</h3>
                  </CardContent>
                </Link>
              ) : (
                <CardContent className="p-5 flex items-center justify-center text-center min-h-[100px] group-hover:bg-gray-50 transition-colors">
                  <h3 className="font-bold text-[16px] text-[#0f3057]">{dept.title}</h3>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}