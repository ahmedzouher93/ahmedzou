import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { BookOpen, FileText, Video, Link as LinkIcon, Download, Clock, Info, CheckCircle } from "lucide-react";
import { Link } from "react-router";
import { Attachments, samplePair } from '../../components/Attachments';

export function AnatomyCourseDetail() {
  return (
    <div className="flex flex-col gap-12 animate-in fade-in duration-500 pb-20">
      {/* Course Header */}
      <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a227]/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="bg-[#0f3057] text-white border-none text-sm px-3 py-1 font-mono" dir="ltr">ANAT-101</Badge>
              <Badge className="bg-[#c9a227]/10 text-[#c9a227] hover:bg-[#c9a227]/20 border-none font-medium px-3 py-1 text-sm">متطلب إجباري</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#0f3057] mb-4">تشريح الإنسان (1)</h1>
            <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
              دراسة تفصيلية للجهاز العظمي والعضلي والجهاز العصبي المحيطي، مع التركيز على التطبيقات السريرية والتشريحية التي تخدم طلاب الطب البشري في مراحلهم المتقدمة.
            </p>
          </div>
          
          <div className="flex gap-4 md:flex-col items-end shrink-0">
            <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center min-w-[120px] border border-gray-100">
              <span className="text-3xl font-bold text-[#c9a227] mb-1">3</span>
              <span className="text-sm font-bold text-gray-500">ساعات معتمدة</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* About Course */}
          <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-[#0f3057] mb-5 flex items-center gap-2">
              <Info className="w-5 h-5 text-[#c9a227]" />
              وصف المادة
            </h2>
            <div className="text-gray-600 leading-loose space-y-4">
              <p>
                يهدف هذا المقرر إلى تزويد الطالب بالمعرفة الأساسية والتفصيلية عن تركيب جسم الإنسان، متضمناً الجهاز الهيكلي، العضلي، والمفاصل. يتم التركيز بشكل خاص على تشريح الأطراف العليا والسفلى، والصدر والظهر.
              </p>
              <p>
                كما يشمل المقرر دراسة الأوعية الدموية والأعصاب المغذية لهذه المناطق، مع التطرق إلى التطبيقات الإكلينيكية والسريرية التي تواجه الطبيب في حياته العملية المتعلقة بتشريح هذه الأجزاء.
              </p>
            </div>
            
            <h3 className="font-bold text-[#0f3057] mt-8 mb-4">مخرجات التعلم:</h3>
            <ul className="space-y-3">
              {[
                "التعرف على العظام والمفاصل والعضلات الرئيسية في الجسم.",
                "فهم الإمداد الدموي والعصبي للأطراف والصدر.",
                "القدرة على تحديد المعالم التشريحية السطحية للجسم.",
                "ربط المعرفة التشريحية بالحالات السريرية الشائعة."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Attachments files={[...samplePair('وصف المادة'), ...samplePair('خطة المادة')]} />
          </section>

          {/* Slides */}
          <section>
            <h2 className="text-xl font-bold text-[#0f3057] mb-5 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#c9a227]" />
              السلايدات والمحاضرات
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "المحاضرة 1: مقدمة في علم التشريح", size: "2.4 MB" },
                { title: "المحاضرة 2: تشريح الطرف العلوي (الجزء الأول)", size: "4.1 MB" },
                { title: "المحاضرة 3: تشريح الطرف العلوي (الجزء الثاني)", size: "3.8 MB" },
                { title: "المحاضرة 4: تشريح الطرف السفلي", size: "5.2 MB" },
                { title: "المحاضرة 5: جدار الصدر والقفص الصدري", size: "3.1 MB" },
              ].map((slide, i) => (
                <div key={i} className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 hover:border-[#c9a227]/40 hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0f3057] text-sm group-hover:text-[#c9a227] transition-colors">{slide.title}</h4>
                      <span className="text-xs text-gray-400" dir="ltr">PDF • {slide.size}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-[#0f3057] transition-colors">
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Videos */}
          <section>
            <h2 className="text-xl font-bold text-[#0f3057] mb-5 flex items-center gap-2">
              <Video className="w-5 h-5 text-[#c9a227]" />
              الفيديوهات التعليمية
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { title: "تشريح عظام الطرف العلوي", duration: "45:20", thumb: "https://images.unsplash.com/photo-1559757175-9b7e7c992d9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
                { title: "العضلات والأعصاب للطرف العلوي", duration: "52:10", thumb: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
              ].map((video, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all group cursor-pointer">
                  <div className="aspect-video relative overflow-hidden bg-gray-900">
                    <img src={video.thumb} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" alt={video.title} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/40 group-hover:bg-[#c9a227] group-hover:border-[#c9a227] transition-colors">
                        <Video className="w-5 h-5 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-mono" dir="ltr">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-[#0f3057] group-hover:text-[#c9a227] transition-colors">{video.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar (Resources & Details) */}
        <div className="flex flex-col gap-6">
          {/* Quick Info */}
          <Card className="border-gray-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-[#0f3057]">معلومات المقرر</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-500">مدرس المادة</span>
                <span className="font-bold text-[#0f3057]">د. سارة أحمد</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-500">الفصل الدراسي</span>
                <span className="font-bold text-[#0f3057]">الأول</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-gray-500">المتطلب السابق</span>
                <span className="font-bold text-[#0f3057]">لا يوجد</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-500">لغة التدريس</span>
                <span className="font-bold text-[#0f3057]">الإنجليزية</span>
              </div>
            </CardContent>
          </Card>

          {/* Files */}
          <Card className="border-gray-100 shadow-sm rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-[#0f3057] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#c9a227]" />
                المواد والملفات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "الخطة الدراسية التفصيلية (Syllabus)", type: "DOCX" },
                { title: "ملخص التشريح العملي", type: "DOCX" },
                { title: "أسئلة سنوات سابقة", type: "HTML" },
              ].map((file, i) => (
                <button key={i} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-right group">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-400 group-hover:text-[#c9a227]" />
                    <span className="text-sm font-medium text-gray-700">{file.title}</span>
                  </div>
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </CardContent>
          </Card>

          {/* External Links */}
          <Card className="border-gray-100 shadow-sm rounded-2xl bg-gray-50/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-[#0f3057] flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-[#c9a227]" />
                روابط إضافية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "أطلس التشريح التفاعلي", url: "#" },
                { title: "المكتبة الطبية الإلكترونية", url: "#" },
                { title: "بنك الصور التشريحية", url: "#" },
              ].map((link, i) => (
                <a key={i} href={link.url} className="flex items-center gap-2 text-sm font-medium text-[#0f3057] hover:text-[#c9a227] transition-colors p-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227]" />
                  {link.title}
                </a>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
