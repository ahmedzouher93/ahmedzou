import { Calendar, ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import MED_ACTIVITIES from "./MedicineActivitiesData";

export function MedicineActivities() {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      <div className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-bold text-[#0f3057] mb-2">نشاطات وانجازات</h1>
        <p className="text-gray-600 text-[15px]">أبرز فعاليات وإنجازات كلية الطب · {MED_ACTIVITIES.length} عنصراً</p>
      </div>

      <section className="py-2">
        <div className="space-y-4">
          {MED_ACTIVITIES.map((activity, i) => (
            <Link key={i} to={"/medicine/activities/" + i} className="flex items-center justify-between p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-md hover:border-[#c9a227] transition-all group">
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-lg text-[#0f3057] group-hover:text-[#c9a227] transition-colors">
                  {activity.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4 text-[#c9a227]" />
                  <span dir="ltr">{activity.date}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#0f3057] transition-colors shrink-0 mr-4">
                <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
