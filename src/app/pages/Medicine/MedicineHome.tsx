import { dateDir } from '../../dateDir';
import image_photo_1559839734_2b71ea197ec2_3 from '@/imports/photo-1559839734-2b71ea197ec2-3.jpeg'
import { Link } from "react-router";
import { Card, CardContent } from "../../components/ui/card";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { NewsCard, NewsGrid } from '@/app/components/NewsCard';

export function MedicineHome() {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      {/* 1. About the Faculty */}
      <section className="mb-16">
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-bold text-[#0f3057] mb-2">
            عن الكلية
          </h2>
          <p className="text-gray-600 text-lg">
            كلية الطب في سطور
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-10 items-start">
          <div className="flex-1">
            <p className="text-[#c9a227] font-bold mb-6 text-lg">
              مسيرة حافلة بالعطاء والتميز الأكاديمي منذ التأسيس
            </p>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
              <h3 className="text-[#0f3057] font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">🧑‍⚕️</span> كلمة
                ترحيبية
              </h3>
              <div className="text-gray-700 leading-loose space-y-4">
                <p>
                  تتألق كلية الطب في مؤتة كمنارة للعلم والمعرفة
                  في جنوب المملكة الأردنية الهاشمية، وتحلق
                  عالياً كمكون أساسي ورئيسي من جامعة مؤتة "جامعة
                  السيف والقلم"، بجناحيها العسكري والمدني.
                </p>
                <p>
                  تأسست عام 2001 لتصبح صرحاً شامخاً من صروح
                  العلم، معتمدة على نخبة من أعضاء هيئة التدريس
                  المتميزين وأحدث المختبرات والمرافق التعليمية.
                </p>
              </div>
            </div>
            <Link
              to="/medicine/about"
              className="inline-flex items-center gap-2 text-[#0f3057] font-bold hover:text-[#c9a227] transition-colors"
            >
              قراءة المزيد <span className="rotate-180">→</span>
            </Link>
          </div>
          <div className="flex-1 w-full">
            <div className="relative">
              <div className="absolute -inset-3 bg-[#0f3057]/5 rounded-2xl transform rotate-2 z-0"></div>
              <ImageWithFallback
                src={image_photo_1559839734_2b71ea197ec2_3}
                alt="مبنى كلية الطب"
                className="rounded-2xl shadow-lg relative z-10 w-full h-[320px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Facts & Figures */}
      <section className="mb-16 bg-[#0f3057] text-white rounded-3xl overflow-hidden relative shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a227] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-x-reverse divide-white/10">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-[#c9a227] mb-3">
                2001+
              </span>
              <span className="text-sm md:text-base font-medium">
                عام التأسيس
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-[#c9a227] mb-3">
                10+
              </span>
              <span className="text-sm md:text-base font-medium">
                أقسام أكاديمية
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-[#c9a227] mb-3">
                80+
              </span>
              <span className="text-sm md:text-base font-medium">
                عضو هيئة تدريس
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-[#c9a227] mb-3">
                1200+
              </span>
              <span className="text-sm md:text-base font-medium">
                خريج
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Academic Departments */}
      <section id="departments" className="mb-16 scroll-mt-24">
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-bold text-[#0f3057] mb-2 flex items-center gap-3">
            <span className="text-3xl">🔬</span> الأقسام
          </h2>
          <p className="text-[#c9a227] font-bold text-lg mb-1">
            الأقسام الأكاديمية
          </p>
          <p className="text-gray-600">
            عشرة أقسام تغطي جميع التخصصات الطبية
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "التشريح وعلم الأنسجة", icon: "🧬", link: "/medicine/departments/anatomy" },
            { title: "الكيمياء الحيوية وعلم وظائف الأعضاء", icon: "⚗️", link: "/medicine/departments/biochemistry" },
            { title: "الصحة العامة وطب المجتمع", icon: "🏥", link: "/medicine/departments/public-health" },
            { title: "الأطفال", icon: "👶", link: "/medicine/departments/pediatrics" },
            { title: "الطب الباطني والطب الشرعي", icon: "🫀", link: "/medicine/departments/internal-medicine" },
            { title: "علم الأحياء الدقيقة وعلم الأمراض", icon: "🔬", link: "/medicine/departments/microbiology" },
            { title: "النسائية والتوليد", icon: "👩‍⚕️", link: "/medicine/departments/obgyn" },
            { title: "علم الأدوية", icon: "💊", link: "/medicine/departments/pharmacology" },
            { title: "الجراحة الخاصة", icon: "🔪", link: "/medicine/departments/special-surgery" },
            { title: "الجراحة العامة والتخدير", icon: "🩺", link: "/medicine/departments/general-surgery" },
          ].map((dept, i) => (
            <Card
              key={i}
              className="hover:shadow-md transition-shadow border border-gray-100 shadow-sm overflow-hidden group cursor-pointer bg-white"
            >
              {dept.link ? (
                <Link
                  to={dept.link}
                  className="block w-full h-full"
                >
                  <CardContent className="p-5 flex items-center gap-4 group-hover:bg-[#0f3057] transition-colors">
                    <span className="text-3xl group-hover:scale-110 transition-transform">
                      {dept.icon}
                    </span>
                    <h3 className="font-bold text-[15px] text-[#0f3057] group-hover:text-white transition-colors">
                      {dept.title}
                    </h3>
                  </CardContent>
                </Link>
              ) : (
                <CardContent className="p-5 flex items-center gap-4 group-hover:bg-gray-50 transition-colors">
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {dept.icon}
                  </span>
                  <h3 className="font-bold text-[15px] text-[#0f3057]">
                    {dept.title}
                  </h3>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* 4. News & Announcements */}
      <section className="mb-16">
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-bold text-[#0f3057] mb-2 flex items-center gap-3">
            <span className="text-3xl">📰</span> الأخبار
          </h2>
          <p className="text-[#c9a227] font-bold text-lg mb-1">
            أخبار وإعلانات
          </p>
          <p className="text-gray-600">
            آخر المستجدات في كلية الطب
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              date: "🤝 1 أغسطس 2026",
              title:
                "جامعة مؤتة توقّع مذكرة تفاهم مع جمعية الأطباء الأردنيين الأميركيين",
              desc: "لتعزيز التعاون الأكاديمي والطبي.",
              image:
                "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            },
            {
              date: "🌍 21 أكتوبر 2025",
              title:
                "محاضرة حول الصحة العالمية بتنظيم من كلية الطب",
              desc: "محاضرة علمية حول التحديات الصحية.",
              image:
                "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            },
            {
              date: "🏆 15 سبتمبر 2025",
              title: "الكلية تحصل على الاعتماد البرامجي الدولي",
              desc: "إنجاز جديد يضاف لسلسلة النجاحات.",
              image:
                "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            },
          ].map((news, i) => (
            <NewsCard key={i} to={'/f-item/medicine/news/' + i} title={news.title} date={news.date} img={news.image} excerpt={news.desc} />
          ))}
        </div>
      </section>

      {/* 5. Important Links */}
      <section className="mb-8">
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-bold text-[#0f3057] mb-2 flex items-center gap-3">
            <span className="text-3xl">🔗</span> روابط
          </h2>
          <p className="text-[#c9a227] font-bold text-lg mb-1">
            روابط مهمة
          </p>
          <p className="text-gray-600">
            أهم المستندات والتعليمات
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { title: "دليل كلية الطب 2023-2024", icon: "📄" },
            { title: "ماجستير الصحة العامة", icon: "📚" },
            { title: "عقد الالتزام الأخلاقي", icon: "📝" },
            { title: "الشراكة", icon: "🤝" },
            { title: "الخطط الاستراتيجية", icon: "📊" },
            { title: "تعليمات موظفي الجامعة", icon: "📋" },
            { title: "تعليمات أعضاء هيئة التدريس", icon: "👨‍🏫" },
            { title: "القانون المعدل للجامعات", icon: "⚖️" },
            { title: "نظام الموظفين المعدل", icon: "📑" },
            {
              title: "النظام المعدل للهيئة التدريسية",
              icon: "📘",
            },
            { title: "روابط مهمة", icon: "🔗" },
            { title: "WFME — معايير الجودة", icon: "🏅" },
          ].map((link, i) => (
            <Link
              key={i}
              to="/medicine/links"
              className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-[#c9a227] hover:shadow-md transition-all text-center group"
            >
              <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                {link.icon}
              </span>
              <span className="font-bold text-[#0f3057] text-sm group-hover:text-[#c9a227]">
                {link.title}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}