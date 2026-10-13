import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Link } from "react-router";
import { BookOpen, FileText, Layers, Stethoscope, Microscope, Brain, Link as LinkIcon, FileSpreadsheet, Book } from "lucide-react";
import { Attachments, samplePair } from '../../components/Attachments';

export function AnatomyCourses() {
  return (
    <div className="flex flex-col gap-20 animate-in fade-in duration-500 pb-20">
      {/* القسم الأول: المقررات الدراسية */}
      <section id="courses" className="scroll-mt-24">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f3057] mb-3 flex items-center gap-3">
            <span className="text-3xl">📚</span> المقررات الدراسية
          </h2>
          <p className="text-gray-500 text-lg pr-12">المواد التي يدرسها القسم</p>
          <p className="text-gray-500 text-sm pr-12 mt-1">قائمة المقررات الأساسية والتخصصية في التشريح والأنسجة والتكوين الجنيني</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "تشريح الإنسان (1)", code: "ANAT-101", hours: "3", type: "نظري", desc: "دراسة تفصيلية للجهاز العظمي والعضلي والجهاز العصبي المحيطي، مع تطبيقات سريرية." },
            { title: "تشريح الإنسان (2)", code: "ANAT-201", hours: "4", type: "نظري + عملي", desc: "التشريح الجهازي للجهاز التنفسي والهضمي والبولي والتناسلي، مع تشريح عملي على النماذج." },
            { title: "علم الأنسجة الأساسي", code: "HIST-101", hours: "3", type: "نظري", desc: "مبادئ الأنسجة العامة، والتعرف على الأنسجة الأربعة الأساسية (الظهاري، الضام، العضلي، العصبي)." },
            { title: "علم الأنسجة الجهازي", code: "HIST-202", hours: "3", type: "نظري + عملي", desc: "التركيب النسيجي للأعضاء المختلفة، مع تدريبات مخبرية على الشرائح النسيجية." },
            { title: "التكوين الجنيني", code: "EMBR-101", hours: "3", type: "نظري", desc: "مراحل التطور الجنيني من الإخصاب حتى الأسبوع الثامن، مع تشوهات خلقية شائعة." },
            { title: "تشريح الأعصاب", code: "NEUR-301", hours: "3", type: "نظري", desc: "دراسة متخصصة للجهاز العصبي المركزي والمحيطي، والمسالك العصبية، والتطبيقات الإكلينيكية." },
          ].map((course, i) => (
            <Link to="/medicine/departments/anatomy/courses/detail" key={i} className="block"><Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group bg-white hover:-translate-y-1 h-full">
              <div className="h-1.5 bg-[#0f3057] w-full group-hover:bg-[#c9a227] transition-colors" />
              <CardHeader className="pb-3 pt-5">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="outline" className="bg-gray-50 border-gray-200 text-gray-700 rounded-md font-mono" dir="ltr">{course.code}</Badge>
                  <div className="flex gap-2">
                    <Badge className="bg-[#0f3057]/10 text-[#0f3057] hover:bg-[#0f3057]/20 border-none font-medium">{course.hours} ساعات</Badge>
                    <Badge className="bg-[#c9a227]/10 text-[#c9a227] hover:bg-[#c9a227]/20 border-none font-medium">{course.type}</Badge>
                  </div>
                </div>
                <CardTitle className="text-[18px] text-[#0f3057] leading-relaxed group-hover:text-[#c9a227] transition-colors">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-[14.5px] leading-relaxed">
                  {course.desc}
                </p>
              </CardContent>
            </Card></Link>
          ))}
        </div>
      </section>

      {/* القسم الثاني: الخطط الدراسية */}
      <section id="plans" className="scroll-mt-24">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#0f3057] mb-3 flex items-center gap-3">
            <span className="text-3xl">📋</span> الخطط الدراسية
          </h2>
          <p className="text-gray-500 text-lg pr-12">الخطط الأكاديمية</p>
          <p className="text-gray-500 text-sm pr-12 mt-1">الخطط المعتمدة لبرامج البكالوريوس والدراسات العليا في القسم</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            { title: "خطة بكالوريوس الطب (المسار الرئيسي)", hours: "162", semesters: "6", desc: "تشمل المقررات الأساسية في التشريح والأنسجة والتكوين الجنيني، مع تدريب سريري مبكر." },
            { title: "خطة بكالوريوس العلوم الطبية المساعدة", hours: "132", semesters: "4", desc: "تركيز على علوم التشريح والأنسجة التطبيقية، مع مساقات في التصوير الطبي." },
            { title: "ماجستير التشريح السريري", hours: "36", semesters: "4", desc: "برنامج متقدم في التشريح السريري والجراحي، مع مشروع بحثي." },
            { title: "دبلوم علم الأنسجة المخبرية", hours: "72", semesters: "3", desc: "تدريب عملي مكثف على تقنيات الأنسجة والتحضيرات المخبرية." },
          ].map((plan, i) => (
            <Card key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all bg-white group">
              <div className="w-16 h-16 rounded-2xl bg-[#0f3057]/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform text-[#0f3057]">
                📄
              </div>
              <div className="flex-1 text-center sm:text-right">
                <h3 className="font-bold text-lg text-[#0f3057] mb-2">{plan.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{plan.desc}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">ساعات: {plan.hours}</Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">فصول: {plan.semesters}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <Attachments files={[...samplePair('وصف المواد الدراسية - قسم التشريح وعلم الأنسجة'), ...samplePair('الخطط الدراسية - قسم التشريح وعلم الأنسجة')]} />
    </div>
  );
}
