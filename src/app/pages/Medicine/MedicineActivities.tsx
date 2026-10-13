import { Calendar, ChevronLeft } from "lucide-react";
import { Link } from "react-router";
import MED_ACTIVITIES from "./MedicineActivitiesData";
import { NewsCard, NewsGrid } from '@/app/components/NewsCard';

export function MedicineActivities() {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      <div className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-bold text-[#0f3057] mb-2">نشاطات وانجازات</h1>
        <p className="text-gray-600 text-[15px]">أبرز فعاليات وإنجازات كلية الطب · {MED_ACTIVITIES.length} عنصراً</p>
      </div>

      <section className="py-2">
        <NewsGrid>
          {MED_ACTIVITIES.map((activity, i) => (
            <NewsCard key={i} to={"/medicine/activities/" + i} title={activity.title} date={activity.date} img={(activity as any).img} />
          ))}
        </NewsGrid>
      </section>
    </div>
  );
}
