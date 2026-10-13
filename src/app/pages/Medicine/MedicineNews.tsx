import { dateDir } from '../../dateDir';
import { Link } from "react-router";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { NewsCard, NewsGrid } from '@/app/components/NewsCard';

export function MedicineNews() {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      <div className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-bold text-[#0f3057] mb-2">أخبار وإعلانات</h1>
        <p className="text-gray-600 text-[15px]">آخر المستجدات في كلية الطب</p>
      </div>

      <section className="py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { 
              date: "1 أغسطس 2026", 
              title: "جامعة مؤتة توقّع مذكرة تفاهم مع جمعية الأطباء الأردنيين الأميركيين", 
              desc: "لتعزيز التعاون الأكاديمي والطبي وتبادل الخبرات بين الجانبين في مختلف المجالات البحثية والسريرية.",
              image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            },
            { 
              date: "21 أكتوبر 2025", 
              title: "محاضرة حول الصحة العالمية بتنظيم من كلية الطب", 
              desc: "محاضرة علمية حول التحديات الصحية العالمية بمشاركة نخبة من الأطباء والخبراء الدوليين والمحليين.",
              image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            },
            { 
              date: "15 سبتمبر 2025", 
              title: "الكلية تحصل على الاعتماد البرامجي الدولي", 
              desc: "إنجاز جديد يضاف لسلسلة النجاحات التي تحققها الكلية في سبيل رفع مستوى التعليم الطبي المتميز.",
              image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            }
          ].map((news, i) => (
            <NewsCard key={i} to={'/f-item/medicine/news/' + i} title={news.title} date={news.date} img={news.image} excerpt={news.desc} />
          ))}
        </div>
      </section>
    </div>
  );
}