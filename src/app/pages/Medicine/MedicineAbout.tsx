import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Eye, Target, CheckCircle2, Star, FileText, Download } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import aboutImg from "../../../imports/image-6.png";

export function MedicineAbout() {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      <div className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-bold text-[#0f3057] mb-2">عن الكلية</h1>
        <p className="text-lg text-gray-600">كلية الطب في سطور</p>
      </div>

      <section className="py-2 mb-16">
        <div className="flex flex-col xl:flex-row gap-12 items-start">
          <div className="flex-1">
            <p className="text-[#c9a227] font-medium mb-6 text-lg">مسيرة حافلة بالعطاء والتميز الأكاديمي منذ التأسيس</p>
            
            <div className="text-gray-600 text-[16px] leading-loose space-y-4">
              <p>
                تتألق كلية الطب في مؤتة كمنارة للعلم والمعرفة في جنوب المملكة الأردنية الهاشمية، وتحلق عالياً كمكون أساسي ورئيسي من جامعة مؤتة "جامعة السيف والقلم"، بجناحيها العسكري والمدني.
              </p>
              <p>
                تأسست عام 2001 لتصبح صرحاً شامخاً من صروح العلم، معتمدة على نخبة من أعضاء هيئة التدريس المتميزين وأحدث المختبرات والمرافق التعليمية.
              </p>
            </div>
          </div>
          <div className="flex-1 relative w-full">
            <div className="absolute -inset-3 bg-[#0f3057]/5 rounded-2xl transform rotate-2 z-0"></div>
            <ImageWithFallback 
              src={aboutImg}
              alt="مبنى كلية الطب"
              className="rounded-2xl shadow-lg relative z-10 w-full h-[300px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-gray-100 shadow-sm bg-[#0f3057] text-white">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-[#c9a227]" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-[#c9a227]">رؤيتنا</h2>
              <p className="text-lg leading-relaxed text-white/90">
                أن تكون كلية الطب بيئة تعليمية صحية للتفوق المهني.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 shadow-sm bg-gray-50">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-[#0f3057]/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-[#0f3057]" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-[#0f3057]">رسالتنا</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                تخريج طبيب عام كفؤ، وآمن قادر على التعامل مع المشاكل الصحية في المجتمع المحلي ومكتسب الأسس المناسبة التي تؤهله للتخصص والبحث العلمي في مجال الطب مستقبلاً.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Objectives */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0f3057] mb-2">أهدافنا</h2>
          <div className="w-16 h-1 bg-[#c9a227] rounded-full"></div>
        </div>
        <div className="space-y-4">
          {[
            "تخريج أطباء عامين ذو كفاءة عالية، قادرين على التعامل مع المشاكل الصحية للأفراد والمجتمع المحلي، ومؤهلين للتخصص الدقيق، وإجراء البحوث العلمية في فروع الطب المختلفة.",
            "المساهمة في إثراء المعلومات الطبية العلمية عن طريق التعليم الطبي المستمر بأنشطته المختلفة والأبحاث الطبية والدراسات العليا.",
            "المساهمة في رفع مستوى الخدمات الطبية المقدمة من خلال المستشفيات والمراكز الصحية القائمة في المنطقة بالتعاون مع وزارة الصحة ومديرية الخدمات الطبية الملكية في الأردن والقطاع الخاص.",
            "المشاركة في عملية التطوير الصحي من خلال النهوض بمستوى الرعاية الصحية الأولية والطب الوقائي ومبادئ صحة البيئة في الأردن وخاصة في جنوب المملكة."
          ].map((objective, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="mt-1">
                <CheckCircle2 className="w-6 h-6 text-[#c9a227]" />
              </div>
              <p className="text-gray-700 leading-relaxed flex-1 text-[16px]">{objective}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0f3057] mb-2">القيم الجوهرية</h2>
          <div className="w-16 h-1 bg-[#c9a227] rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "المسؤولية المجتمعية",
            "النزاهة والشفافية",
            "الريادة والتميز",
            "التحسين المستمر"
          ].map((value, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center group hover:bg-[#0f3057] hover:text-white transition-colors">
              <Star className="w-8 h-8 text-[#c9a227] mb-3 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-[#0f3057] group-hover:text-white transition-colors">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Plan PDF */}
      <section className="mb-16">
        <Card className="border border-[#c9a227]/30 shadow-md bg-gradient-to-l from-white to-[#c9a227]/5">
          <CardContent className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#0f3057] rounded-2xl flex items-center justify-center shrink-0">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0f3057] mb-1">الخطة الاستراتيجية</h3>
                <p className="text-gray-500 text-sm">ملف PDF يحتوي على الخطة الاستراتيجية لكلية الطب</p>
              </div>
            </div>
            <Button className="bg-[#c9a227] hover:bg-[#b08d20] text-white px-6 py-6 rounded-xl flex items-center gap-2 shrink-0 shadow-lg">
              <Download className="w-5 h-5" />
              تحميل الملف
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Facts & Figures */}
      <section className="py-10 bg-[#0f3057] text-white rounded-3xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a227] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center py-6">
              <span className="text-4xl font-bold text-[#c9a227] mb-2">2001+</span>
              <span className="text-sm font-medium">عام التأسيس</span>
            </div>
            <div className="flex flex-col items-center py-6">
              <span className="text-4xl font-bold text-[#c9a227] mb-2">10+</span>
              <span className="text-sm font-medium">أقسام أكاديمية</span>
            </div>
            <div className="flex flex-col items-center py-6">
              <span className="text-4xl font-bold text-[#c9a227] mb-2">80+</span>
              <span className="text-sm font-medium">عضو هيئة تدريس</span>
            </div>
            <div className="flex flex-col items-center py-6">
              <span className="text-4xl font-bold text-[#c9a227] mb-2">1200+</span>
              <span className="text-sm font-medium">خريج</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}