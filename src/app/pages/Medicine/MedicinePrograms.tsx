import { Link } from "react-router";
import { Card, CardContent } from "../../components/ui/card";
import { GraduationCap, BookOpen, Layers } from "lucide-react";

export function MedicinePrograms() {
  const programs = [
    { title: "البكالوريوس", icon: GraduationCap, path: "/medicine/programs/bachelor" },
    { title: "الدراسات العليا", icon: BookOpen, path: "/medicine/programs/graduate" },
    { title: "برامج أخرى", icon: Layers, path: "/medicine/programs/other" },
  ];

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      <div className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-bold text-[#0f3057] mb-2">البرامج الأكاديمية</h1>
        <p className="text-gray-600 text-[15px]">البرامج والدرجات العلمية التي تمنحها الكلية</p>
      </div>

      <section className="py-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {programs.map((prog, i) => {
            const Icon = prog.icon;
            return (
              <Link key={i} to={prog.path} className="block h-full">
              <Card className="hover:shadow-lg transition-all border border-gray-100 shadow-sm bg-white cursor-pointer group overflow-hidden">
                <CardContent className="p-8 flex flex-col items-center justify-center text-center gap-4 group-hover:bg-[#0f3057] transition-colors h-full">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Icon className="w-8 h-8 text-[#c9a227] group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-bold text-xl text-[#0f3057] group-hover:text-white transition-colors">{prog.title}</h3>
                </CardContent>
              </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}