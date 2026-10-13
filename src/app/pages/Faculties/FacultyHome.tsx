import { Link, useLocation } from "react-router";
import { Card, CardContent } from "../../components/ui/card";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import FACULTIES from "./FacultyData";
import { facultySlug, PROGRAM_LABELS } from "./FacultyNav";
import { NewsCard, NewsGrid } from '@/app/components/NewsCard';

export function FacultyHome() {
  const location = useLocation();
  const slug = facultySlug(location.pathname);
  const cfg = FACULTIES[slug];
  const root = "/faculty/" + slug;

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      <section className="mb-16">
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-bold text-[#0f3057] mb-2">عن الكلية</h2>
          <p className="text-gray-600 text-lg">{cfg.name} في سطور</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-10 items-start">
          <div className="flex-1">
            <p className="text-[#c9a227] font-bold mb-6 text-lg">{cfg.tagline}</p>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
              <h3 className="text-[#0f3057] font-bold mb-3">الكلمة الترحيبية</h3>
              <div className="text-gray-700 leading-loose space-y-4">
                {cfg.dean.words.length > 0 ? (
                  cfg.dean.words.slice(0, 2).map((p: string, i: number) => <p key={i}>{p}</p>)
                ) : (
                  <p>{cfg.intro}</p>
                )}
                <p className="text-sm font-bold text-[#0f3057]">{cfg.dean.name}</p>
              </div>
            </div>
            <Link to={root + "/about/dean"} className="inline-flex items-center gap-2 text-[#0f3057] font-bold hover:text-[#c9a227] transition-colors">
              قراءة المزيد <span className="rotate-180">→</span>
            </Link>
          </div>
          <div className="flex-1 w-full">
            <div className="relative">
              <div className="absolute -inset-3 bg-[#0f3057]/5 rounded-2xl transform rotate-2 z-0"></div>
              <ImageWithFallback src={cfg.dean.photo} alt={cfg.name} className="rounded-2xl shadow-lg relative z-10 w-full max-h-[320px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16 bg-[#0f3057] text-white rounded-3xl overflow-hidden relative shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a227] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 p-8 md:p-12">
          <div className="grid grid-cols-3 gap-8 text-center divide-x divide-x-reverse divide-white/10">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-[#c9a227] mb-3">{cfg.departments.length}</span>
              <span className="text-sm md:text-base font-medium">أقسام أكاديمية</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-[#c9a227] mb-3">{cfg.programs.length}</span>
              <span className="text-sm md:text-base font-medium">مسارات برامج أكاديمية</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-[#c9a227] mb-3">{cfg.links.length}</span>
              <span className="text-sm md:text-base font-medium">روابط ووثائق مهمة</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-bold text-[#0f3057] mb-2">معرض الكلية</h2>
          <p className="text-gray-600">الصور المنشورة على الصفحة الرئيسية لموقع الكلية</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cfg.slides.map((s: any, i: number) => (
            <figure key={i} className="m-0 rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm">
              <ImageWithFallback src={s.img} alt={s.title} className="w-full max-h-[220px] object-cover" />
              <figcaption className="p-4">
                <p className="text-[14.5px] font-bold text-[#0f3057] leading-relaxed">{s.title}</p>
                {s.sub && <p className="text-xs text-[#c9a227] font-bold mt-1">{s.sub}</p>}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="departments" className="mb-16 scroll-mt-24">
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-bold text-[#0f3057] mb-2">الاقسام</h2>
          <p className="text-[#c9a227] font-bold text-lg mb-1">الأقسام الأكاديمية</p>
          <p className="text-gray-600">{cfg.departments.length} أقسام في {cfg.name}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cfg.departments.map((d: any, i: number) => (
            <Link key={d.id} to={root + "/departments/" + d.id} className="block h-full">
              <Card className="border border-gray-100 shadow-sm overflow-hidden bg-white h-full hover:border-[#c9a227] hover:shadow-md transition-all">
                <CardContent className="p-5 flex items-center gap-4">
                  <span className="w-9 h-9 rounded-lg bg-[#0f3057] text-[#c9a227] flex items-center justify-center font-bold flex-shrink-0">{i + 1}</span>
                  <h3 className="font-bold text-[15px] text-[#0f3057] leading-relaxed">{d.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-bold text-[#0f3057] mb-2">الأخبار</h2>
          <p className="text-[#c9a227] font-bold text-lg mb-1">أخبار وإعلانات</p>
          <p className="text-gray-600">آخر المستجدات في {cfg.name}</p>
        </div>
        {(!cfg.news || cfg.news.length === 0) && (
          <p className="text-[15px] text-gray-500 leading-[2] bg-[#F8FAFC] border border-dashed border-gray-200 rounded-xl px-5 py-6">لا توجد أخبار أو إعلانات منشورة على الصفحة الرئيسية للكلية حالياً — تُنشر أخبار الأقسام في صفحة كل قسم.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(cfg.news || []).map((n: any, i: number) => (
            <NewsCard key={i} to={'/f-item/' + slug + '/news/' + i} title={n.title} date={n.date} img={n.img} excerpt={n.body?.[0]} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-3xl font-bold text-[#0f3057] mb-2">روابط</h2>
          <p className="text-[#c9a227] font-bold text-lg mb-1">روابط مهمة</p>
          <p className="text-gray-600">أهم المستندات والتعليمات المنشورة على موقع الكلية</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cfg.links.map((l: string, i: number) => (
            <Link key={i} to={root + "/links"} className="flex items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 hover:border-[#c9a227] hover:shadow-md transition-all group">
              <span className="w-2 h-2 rounded-full bg-[#c9a227] flex-shrink-0" />
              <span className="font-bold text-[#0f3057] text-sm group-hover:text-[#c9a227] leading-relaxed">{l}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
