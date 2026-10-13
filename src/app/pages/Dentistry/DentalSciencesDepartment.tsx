import React from "react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Info, GraduationCap, ExternalLink, User } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

const FACULTY = [
  { name: "الأستاذ الدكتور أيمن إبراهيم القطيطات", rank: "أستاذ" },
  { name: "الأستاذ الدكتور رابعة محمود أبو بكر حسن", rank: "أستاذ" },
  { name: "الأستاذ الدكتور خالد أحمد عبد الساتر", rank: "أستاذ" },
  { name: "د. أمل عقيل عودة البطوش", rank: "أستاذ مشارك ب" },
  { name: "الدكتورة هبه شرف الدين", rank: "أستاذ مشارك ب" },
  { name: "آيه احمد احمد محمد الحنفي", rank: "أستاذ مشارك ب" },
  { name: "د. نورا محمد بكر غريب", rank: "أستاذ مشارك ب" },
  { name: "د. لمياء محمد مغاوري", rank: "أستاذ مشارك ب" },
  { name: "د. رشا عبد العزيز محمد", rank: "أستاذ مشارك ب" },
  { name: "د. محمد السيد الرفاعي", rank: "أستاذ مساعد ب" },
  { name: "الدكتور سامر يوسف القرالة", rank: "مدرس ب" },
];

const NEW_ITEMS = [
  "كود صفحة الفيسبوك لكلية طب الأسنان",
  "الإطار العام لتخصص طب الأسنان",
  "دليل اخلاقيات البحث العلمي والذكاء الاصطناعي",
  "الخطة الإسترشادية لطلبة كلية طب الأسنان",
  "2025 دليل الإرشاد الأكاديمي لكلية طب وجراحة الأسنان",
  "الخطة الاستراتيجية 2025",
  "الإنتاج العلمي لأعضاء هيئة التدريس في كلية طب الأسنان",
  "تعليمات حوافز البحث العلمي",
];

export function DentalSciencesDepartment() {
  return (
    <div className="flex flex-col gap-20" dir="rtl">
      {/* عن القسم — كلمة رئيس القسم */}
      <section>
        <h2 className="text-2xl font-bold text-[#0f3057] mb-8 flex items-center gap-3">
          <span className="text-[#c9a227] text-3xl">✦</span> عن القسم
        </h2>
        <div className="flex flex-col lg:flex-row gap-10 bg-white p-8 lg:p-10 rounded-[28px] border border-gray-100 shadow-[0_8px_30px_rgba(15,48,87,0.04)]">
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-[#0f3057] mb-6">قسم العلوم السنية والطبية الأساسية</h3>
            <div className="inline-block bg-[#c9a227]/10 px-4 py-2 rounded-lg w-max mb-4 border border-[#c9a227]/20">
              <h4 className="text-lg font-bold text-[#c9a227] flex items-center gap-2">
                <span>📖</span> كلمة رئيس القسم
              </h4>
            </div>
            <div className="flex flex-col gap-4 text-gray-600 leading-[2.2] text-justify text-[16.5px]">
              <p>بسم الله الرحمن الرحيم</p>
              <p>
                الحمد لله رب العالمين، والصلاة والسلام على سيدنا محمدٍ خاتم الأنبياء والمرسلين،
                وعلى آله وصحبه أجمعين.
              </p>
              <p>الأخوة الزملاء الأعزاء، أبنائي وبناتي الطلبة الكرام،</p>
              <p>
                يسعدني أن أرحب بكم أجمل ترحيب في قسم العلوم السنية والطبية، هذا القسم الذي يُعدّ
                ركيزة أساسية في منظومة كليتنا، وجسراً يربط بين العلوم الطبية الأساسية والتخصصات
                السنية التطبيقية، ليُكوّن قاعدة علمية متينة تُبنى عليها مهارات الطبيب المتميز.
              </p>
              <p>
                إن رؤيتنا في هذا القسم تقوم على إعداد جيل من أطباء الأسنان القادرين على الجمع بين
                المعرفة العلمية العميقة، والمهارة السريرية المتقنة، والتفكير النقدي القائم على
                الدليل. ونعمل من خلال برامجنا الأكاديمية المتطورة على تهيئة بيئة تعليمية …
              </p>
            </div>
          </div>
          <div className="w-full lg:w-[45%] aspect-[4/3] bg-gray-100 rounded-[20px] overflow-hidden shadow-inner">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              className="w-full h-full object-cover"
              alt="قسم العلوم السنية والطبية"
            />
          </div>
        </div>
      </section>

      {/* الهيئة التدريسية */}
      <section id="faculty">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f3057] mb-3 flex items-center gap-3">
            <span className="text-3xl">👥</span> الهيئة التدريسية
          </h2>
          <p className="text-gray-500 text-lg pr-12">أعضاء الهيئة التدريسية في القسم</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACULTY.map((prof, i) => (
            <Dialog key={i}>
              <DialogTrigger asChild>
                <button className="block group text-right w-full h-full">
                  <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(15,48,87,0.03)] hover:shadow-[0_12px_40px_rgba(15,48,87,0.12)] transition-all hover:-translate-y-2 h-full relative overflow-hidden flex flex-col">
                    <div className="h-[280px] w-full relative overflow-hidden bg-[#0f3057] border-b border-gray-100 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-white/10 border border-white/15 flex items-center justify-center group-hover:scale-105 transition-transform duration-700 ease-out">
                        <User className="w-11 h-11 text-[#c9a227]" />
                      </div>
                    </div>
                    <div className="flex flex-col p-6 text-center items-center justify-center relative z-20">
                      <h3 className="font-bold text-[#0f3057] text-lg mb-1 group-hover:text-[#c9a227] transition-colors leading-snug">{prof.name}</h3>
                      <p className="text-gray-500 font-medium text-sm mb-4">عضو هيئة تدريس</p>
                      <span className="inline-block text-[#0f3057] px-4 py-1.5 rounded-full text-xs font-bold bg-[#c9a227]/10 border border-[#c9a227]/20">
                        {prof.rank}
                      </span>
                    </div>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-white rounded-2xl overflow-hidden p-0 border-0 font-['Noto_Kufi_Arabic']" dir="rtl">
                <DialogTitle className="sr-only">الملف الشخصي لـ {prof.name}</DialogTitle>
                <DialogDescription className="sr-only">تفاصيل عضو الهيئة التدريسية في قسم العلوم السنية والطبية</DialogDescription>

                <div className="flex flex-col md:flex-row h-full max-h-[400px]">
                  <div className="w-full md:w-2/5 h-[200px] md:h-full relative shrink-0 bg-[#0f3057] flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                      <User className="w-14 h-14 text-[#c9a227]" />
                    </div>
                  </div>

                  <div className="w-full md:w-3/5 p-5 flex flex-col justify-between bg-white relative overflow-y-auto">
                    <div className="mb-4 border-b border-gray-100 pb-3">
                      <h3 className="text-xl font-bold text-[#0f3057] mb-1 leading-snug">{prof.name}</h3>
                      <p className="text-[#c9a227] font-semibold text-sm">قسم العلوم السنية والطبية</p>
                    </div>

                    <div className="mb-4">
                      <span className="inline-flex items-center gap-1.5 text-[#0f3057] px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0f3057]/5 border border-[#0f3057]/10">
                        <GraduationCap className="w-3.5 h-3.5 text-[#c9a227]" />
                        {prof.rank}
                      </span>
                    </div>

                    <div>
                      <Button
                        className="bg-[#0f3057] hover:bg-[#0a2040] text-white px-4 py-4 rounded-xl font-bold text-sm w-full shadow-md shadow-[#0f3057]/10 flex items-center justify-center gap-2 group transition-all"
                        onClick={() => window.open('https://academics.mutah.edu.jo/Files/index.aspx', '_blank')}
                      >
                        الصفحة الأكاديمية
                        <ExternalLink className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>

      {/* جديد الكلية */}
      <section>
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f3057] mb-3 flex items-center gap-3">
            <span className="text-3xl">🔗</span> جديد الكلية
          </h2>
          <p className="text-gray-500 text-lg pr-12">أحدث المستندات والتعليمات المنشورة</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {NEW_ITEMS.map((title) => (
            <div
              key={title}
              className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#c9a227] hover:shadow-md transition-all flex items-start gap-3 cursor-pointer group"
            >
              <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">📄</span>
              <p className="font-bold text-[#0f3057] text-sm leading-relaxed group-hover:text-[#c9a227] transition-colors">
                {title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* أخبار وإعلانات القسم */}
      <section>
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f3057] mb-3 flex items-center gap-3">
            <span className="text-3xl">📰</span> أخبار وإعلانات القسم
          </h2>
        </div>
        <div className="flex items-start gap-3 bg-[#F8FAFC] border border-dashed border-gray-200 rounded-xl px-5 py-6">
          <Info size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-500 leading-relaxed">لا توجد عناصر لعرضها في هذه الصفحة.</p>
        </div>
      </section>
    </div>
  );
}
