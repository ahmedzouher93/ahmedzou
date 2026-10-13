import { dateDir } from '../../dateDir';
import { Link } from "react-router";
import { Card, CardContent } from "../../components/ui/card";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export function DentistryHome() {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      {/* 1. About the Faculty */}
      <section className="mb-16">
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-bold text-[#0f3057] mb-2">عن الكلية</h2>
          <p className="text-gray-600 text-lg">كلية طب وجراحة الأسنان في سطور</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-10 items-start">
          <div className="flex-1">
            <p className="text-[#c9a227] font-bold mb-6 text-lg">
              من أجل بيئة تعليمية صحية للتفوق المهني
            </p>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
              <h3 className="text-[#0f3057] font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">🦷</span> كلمة العميد
              </h3>
              <div className="text-gray-700 leading-loose space-y-4">
                <p>
                  بكل فخر واعتزاز، يسرني أن أرحب بكم في كلية طب الأسنان في جامعة مؤتة، هذا
                  الصرح الأكاديمي الجديد الذي يمثل بداية مشوار حافل بالتميز والإبداع للجميع.
                </p>
                <p>
                  إن تأسيس هذه الكلية جاء نتاجاً لسنوات من التخطيط المتأنّي والعمل الدؤوب، حيث
                  وضعنا نصب أعيننا تزويد الكلية بأحدث ما توصل إليه العلم في مجال طب وجراحة الفم
                  والأسنان، من خلال مناهج تعليمية متطورة، ومرافق متقدمة، وأعضاء هيئة تدريسية
                  وكوادر فنية وإدارية متميزة تتمتع بخبرة وكفاءة عالية.
                </p>
                <p className="text-sm font-bold text-[#0f3057]">
                  الأستاذ الدكتور أيمن إبراهيم القطيطات — عميد كلية طب وجراحة الفم والأسنان
                </p>
              </div>
            </div>
            <Link
              to="/dentistry/about"
              className="inline-flex items-center gap-2 text-[#0f3057] font-bold hover:text-[#c9a227] transition-colors"
            >
              قراءة المزيد <span className="rotate-180">→</span>
            </Link>
          </div>
          <div className="flex-1 w-full">
            <div className="relative">
              <div className="absolute -inset-3 bg-[#0f3057]/5 rounded-2xl transform rotate-2 z-0"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="عيادات كلية طب وجراحة الأسنان"
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
              <span className="text-4xl md:text-5xl font-bold text-[#c9a227] mb-3">5</span>
              <span className="text-sm md:text-base font-medium">أقسام أكاديمية</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-[#c9a227] mb-3">14</span>
              <span className="text-sm md:text-base font-medium">مختبر أساسي وتخصصي</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-[#c9a227] mb-3">3</span>
              <span className="text-sm md:text-base font-medium">مسارات برامج أكاديمية</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-[#c9a227] mb-3">2025</span>
              <span className="text-sm md:text-base font-medium">الخطة الاستراتيجية</span>
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
          <p className="text-[#c9a227] font-bold text-lg mb-1">الأقسام الأكاديمية</p>
          <p className="text-gray-600">خمسة أقسام تغطي تخصصات طب وجراحة الفم والأسنان</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: "العلوم السنية والطبية", icon: "🧬", path: "/dentistry/departments/dental-sciences" },
            { title: "جراحة الوجه والفكين وأمراض الفم واللثة", icon: "🔪" },
            { title: "طب أسنان الأطفال والتقويم", icon: "👶" },
            { title: "الاستعاضة السنية الثابتة والمتحركة", icon: "🦷" },
            { title: "المعالجة التحفظية", icon: "🩺" },
          ].map((dept, i) => {
            const card = (
              <Card className="hover:shadow-md transition-shadow border border-gray-100 shadow-sm overflow-hidden group cursor-pointer bg-white h-full">
                <CardContent className="p-5 flex items-center gap-4 group-hover:bg-gray-50 transition-colors">
                  <span className="text-3xl group-hover:scale-110 transition-transform">{dept.icon}</span>
                  <h3 className="font-bold text-[15px] text-[#0f3057]">{dept.title}</h3>
                </CardContent>
              </Card>
            );
            return dept.path
              ? <Link key={i} to={dept.path} className="block h-full">{card}</Link>
              : <div key={i}>{card}</div>;
          })}
        </div>
      </section>

      {/* 4. News & Announcements */}
      <section className="mb-16">
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-bold text-[#0f3057] mb-2 flex items-center gap-3">
            <span className="text-3xl">📰</span> الأخبار
          </h2>
          <p className="text-[#c9a227] font-bold text-lg mb-1">أخبار وإعلانات</p>
          <p className="text-gray-600">آخر المستجدات في كلية طب وجراحة الأسنان</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              date: "🎓 18 أغسطس 2026",
              title: "معلومات تهم الطلبة المقبلين إلى كلية طب الأسنان",
              desc: "دليل ومعلومات أساسية للطلبة الجدد قبل بدء العام الدراسي.",
              image:
                "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            },
            {
              date: "😀 2 يونيو 2026",
              title: "\"رحلة ابتسامة سعيدة\"",
              desc: "فعالية توعوية لصحة الفم والأسنان بمشاركة طلبة الكلية.",
              image:
                "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            },
            {
              date: "🚑 2 يونيو 2026",
              title: "فعالية دعم الحياة الأساسي والإسعافات الطارئة",
              desc: "تدريب عملي على الإسعافات الأولية ودعم الحياة الأساسي.",
              image:
                "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            },
          ].map((news, i) => (
            <Link
              key={i}
              to={'/f-item/dentistry/news/' + i}
              className="flex flex-col rounded-2xl border border-gray-100 hover:shadow-lg transition-all bg-white overflow-hidden group cursor-pointer shadow-sm"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-[#0f3057]/10 group-hover:bg-transparent transition-colors z-10" />
                <ImageWithFallback
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col p-6 flex-1">
                <span className="text-xs font-bold text-[#c9a227] mb-3 block" dir={dateDir(news.date)}>
                  {news.date}
                </span>
                <h3 className="text-[16px] font-bold text-[#0f3057] mb-3 group-hover:text-[#c9a227] transition-colors leading-relaxed">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-1 leading-relaxed">{news.desc}</p>
                <span
                  className="text-xs font-bold text-[#0f3057] flex items-center gap-1 group-hover:text-[#c9a227] mt-auto w-fit"
                >
                  قراءة المزيد <span className="rotate-180">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Important Links */}
      <section className="mb-8">
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-bold text-[#0f3057] mb-2 flex items-center gap-3">
            <span className="text-3xl">🔗</span> روابط
          </h2>
          <p className="text-[#c9a227] font-bold text-lg mb-1">روابط مهمة</p>
          <p className="text-gray-600">أهم المستندات والتعليمات</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            { title: "دليل معايير الاعتماد وضمان الجودة", icon: "🏅" },
            { title: "الإطار العام لتخصص طب الأسنان", icon: "📘" },
            { title: "تعليمات موظفي جامعة مؤتة", icon: "📋" },
            { title: "تعليمات حوافز البحث العلمي", icon: "📝" },
            { title: "أسس تكريم الباحثين المتميزين", icon: "🏆" },
            { title: "دليل أخلاقيات البحث العلمي والذكاء الاصطناعي", icon: "⚖️" },
            { title: "الخطة الإسترشادية للطلبة", icon: "🗂️" },
            { title: "دليل الإرشاد الأكاديمي 2025", icon: "📄" },
            { title: "الخطة الاستراتيجية 2025", icon: "📊" },
            { title: "الإنتاج العلمي لأعضاء هيئة التدريس", icon: "🔍" },
            { title: "كود صفحة الفيسبوك للكلية", icon: "📱" },
            { title: "إتصل بنا", icon: "📞" },
          ].map((link, i) => (
            <Link
              key={i}
              to="/dentistry/links"
              className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-[#c9a227] hover:shadow-md transition-all text-center group"
            >
              <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{link.icon}</span>
              <span className="font-bold text-[#0f3057] text-sm group-hover:text-[#c9a227]">{link.title}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
