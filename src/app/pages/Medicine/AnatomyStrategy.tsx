import { Card, CardContent } from "../../components/ui/card";
import { CheckCircle2, Target, Eye, BrainCircuit } from "lucide-react";

export function AnatomyStrategy() {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      <div className="mb-10 border-b border-gray-100 pb-6">
        <h1 className="text-3xl font-bold text-[#0f3057] mb-2">الرؤية والرسالة والأهداف</h1>
        <p className="text-lg text-gray-600">قسم التشريح وعلم الأنسجة</p>
      </div>

      {/* General Goals */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[#0f3057] mb-6 flex items-center gap-3">
          <Target className="w-6 h-6 text-[#c9a227]" />
          الأهداف العامة
        </h2>
        <Card className="border-none shadow-md bg-white">
          <CardContent className="p-8">
            <p className="text-lg text-gray-700 leading-loose">
              يركز القسم جهوده على الجانب المعرفي؛ لتقديم المعرفة العملية، والتطبيقية لعلم التشريح، والأنسجة والتكوين الجنيني للجوانب العامة والتفصيلية لأجهزة جسم الإنسان المختلفة، متوافقاً بما يمكن أن يربط التركيب بالوظيفة، وبالجوانب التطبيقية والسريرية.
            </p>
          </CardContent>
        </Card>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Specific Goals */}
        <section>
          <h2 className="text-2xl font-bold text-[#0f3057] mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#c9a227]" />
            أهداف القسم
          </h2>
          <div className="space-y-4">
            {[
              "تخريج طبيب قادر علي معرفة الأجزاء التشريحيه لجسم الانسان وعلاقاتها بالأمراض المختلفة.",
              "دراسة التركيب الميكروسكوبى للخلايا والأنسجة والأعضاء المختلفة للجسم.",
              "التزود بالمفاهيم والمعلومات الحديثة لمادة علم الأجنة.",
              "استخدام الأجهزة المتوفرة في اجراء أبحاث علميه متقدمة."
            ].map((goal, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#0f3057]/10 flex items-center justify-center shrink-0 font-bold text-[#0f3057]">
                  {i + 1}
                </div>
                <p className="text-gray-700 leading-relaxed flex-1 pt-1">{goal}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-bold text-[#0f3057] mb-6 flex items-center gap-3">
            <BrainCircuit className="w-6 h-6 text-[#c9a227]" />
            المهارات
          </h2>
          <div className="space-y-4">
            {[
              "اكتساب القدرة علي الفحص الإكلينيكى لأجزاء الجسم اعتمادا علي المعرفة التشريحية.",
              "التمكن من اكتساب القدرة على استخدام الميكروسكوب الضوئى لفحص العينات وكتابة التقارير.",
              "اتباع الأسلوب العلمي في اجراء الأبحاث وطرق تدوينها."
            ].map((skill, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#c9a227]/10 flex items-center justify-center shrink-0 font-bold text-[#c9a227]">
                  {i + 1}
                </div>
                <p className="text-gray-700 leading-relaxed flex-1 pt-1">{skill}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}