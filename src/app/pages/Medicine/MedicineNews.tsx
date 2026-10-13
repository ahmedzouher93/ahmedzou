import { dateDir } from '../../dateDir';
import { Link } from "react-router";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { NewsCard, NewsGrid } from '@/app/components/NewsCard';
import { facultyNews } from '../Faculties/facultyNews';

export function MedicineNews() {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      <div className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-bold text-[#0f3057] mb-2">أخبار وإعلانات</h1>
        <p className="text-gray-600 text-[15px]">آخر المستجدات في كلية الطب</p>
      </div>

      <section className="py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facultyNews('medicine').map((news: any, i: number) => (
            <NewsCard key={i} to={'/f-item/medicine/news/' + i} title={news.title} date={news.date} img={news.img || news.image} excerpt={news.desc || news.body?.[0]} />
          ))}
        </div>
      </section>
    </div>
  );
}