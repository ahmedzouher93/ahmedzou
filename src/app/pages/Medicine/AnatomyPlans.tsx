import { Card, CardContent } from "../../components/ui/card";
import { FileText, Download, Layers } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Attachments, samplePair } from '../../components/Attachments';

const PLANS = [
  {
    title: "الخطة الدراسية القديمة كلية الطب",
    desc: "بكالوريوس الطب والجراحة"
  },
  {
    title: "الخطة الدراسية لدرجة البكالوريوس في الطب والجراحة / سنة ثانية",
    desc: "بكالوريوس الطب والجراحة"
  },
  {
    title: "الخطة الدراسية لدرجة البكالوريوس في الطب والجراحة / سنة ثالثة",
    desc: "بكالوريوس الطب والجراحة"
  },
  {
    title: "الخطة الدراسية لدرجة البكالوريوس في الطب والجراحة / سنة رابعة",
    desc: "بكالوريوس الطب والجراحة"
  },
  {
    title: "الخطة الدراسية لدرجة البكالوريوس في الطب والجراحة / سنة خامسة",
    desc: "بكالوريوس الطب والجراحة"
  },
  {
    title: "الخطة الدراسية لدرجة البكالوريوس في الطب والجراحة / سنة سادسة",
    desc: "بكالوريوس الطب والجراحة"
  },
  {
    title: "الخطة الدراسية والاسترشادية",
    desc: "سمات الخطة الاسترشادية"
  },
  {
    title: "الخطة الدراسية لبرنامج ماجستير الصحة العامة /الادراة الصحية",
    desc: "الصحة العامة وطب المجتمع | ماجستير الصحة العامة /الادراة الصحية"
  },
  {
    title: "Master Students 2017-2018",
    desc: "الصحة العامة وطب المجتمع | ماجستير الصحة العامة /الادراة الصحية"
  },
  {
    title: "الخطة الدراسية لدرجة البكالوريوس في الطب والجراحة / سنة اولى",
    desc: "بكالوريوس الطب والجراحة"
  },
  {
    title: "الخطة الدراسية لعلم المناعة العام",
    desc: "علم الأحياء الدقيقة وعلم الامراض"
  },
  {
    title: "الخطة الدراسية لعلم الاحياء الدقيقة",
    desc: "علم الأحياء الدقيقة وعلم الامراض"
  },
  {
    title: "الخطة الدراسية لمادة الامراض النفسيه",
    desc: "الطب الباطني والطب الشرعي"
  },
  {
    title: "التعليمات المقترحة لمنح شهادة الاختصاص العالي في",
    desc: "ملف مرفق"
  },
  {
    title: "التعديل للخطة الدراسية للسنوات 2013-2014-2015",
    desc: "ملف مرفق"
  },
  {
    title: "الدراسة باللغة الانجليزية",
    desc: "ملف مرفق"
  },
  {
    title: "اعتمادية الكلية في الجهات الخارجية",
    desc: "ملف مرفق"
  },
  {
    title: "تعديل مسمى شهادة البكالوريس",
    desc: "ملف مرفق"
  },
  {
    title: "نتيجة المواد ناجح راسب في جائحة كورونا",
    desc: "ملف مرفق"
  },
  {
    title: "توزيع المختبرات",
    desc: "ملف مرفق"
  },
  {
    title: "الخطة الدراسية 2025-2026 المحدثة",
    desc: "بكالوريوس الطب والجراحة"
  }
];

export function AnatomyPlans() {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-500">
      <div className="mb-10 border-b border-gray-100 pb-6 flex items-center gap-4">
        <div className="w-14 h-14 bg-[#0f3057]/5 rounded-2xl flex items-center justify-center">
          <Layers className="w-8 h-8 text-[#0f3057]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#0f3057] mb-2">الخطط الدراسية</h1>
          <p className="text-gray-600 text-[15px]">الخطط المعتمدة لبرامج البكالوريوس والدراسات العليا</p>
        </div>
      </div>

      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PLANS.map((plan, i) => (
            <Card key={i} className="border border-gray-100 shadow-sm hover:shadow-md transition-all bg-white group hover:-translate-y-1">
              <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 h-full">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0f3057] mb-1 group-hover:text-[#c9a227] transition-colors line-clamp-2">{plan.title.replace('#', '')}</h3>
                    <p className="text-gray-500 text-sm">{plan.desc}</p>
                  </div>
                </div>
                <Button variant="outline" size="icon" className="shrink-0 border-gray-200 text-gray-400 group-hover:border-[#0f3057] group-hover:text-[#0f3057] group-hover:bg-[#0f3057]/5 self-end sm:self-auto rounded-xl h-10 w-10">
                  <Download className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Attachments files={samplePair('الخطط الدراسية - قسم التشريح وعلم الأنسجة')} />
    </div>
  );
}