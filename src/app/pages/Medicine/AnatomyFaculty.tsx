import { Card } from "../../components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

const FACULTY_MEMBERS = [
  {
    name: "أ.د. أبو المعاطي",
    role: "رئيس القسم",
    specialty: "أستاذ",
    email: "abualmaati@mutah.edu.jo",
    ext: "4432",
    office: "مبنى الكلية - ط 2",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "أ.د. سارة أحمد",
    role: "عضو هيئة تدريس",
    specialty: "أستاذ",
    email: "sarah.a@mutah.edu.jo",
    ext: "4435",
    office: "مبنى الكلية - ط 2",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "د. محمد الحسن",
    role: "عضو هيئة تدريس",
    specialty: "أستاذ مشارك",
    email: "m.hasan@mutah.edu.jo",
    ext: "4438",
    office: "مبنى الكلية - ط 2",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "د. نورة السعيد",
    role: "عضو هيئة تدريس",
    specialty: "أستاذ مساعد",
    email: "noura.s@mutah.edu.jo",
    ext: "4441",
    office: "مبنى الكلية - ط 2",
    image: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "د. أحمد خليل",
    role: "عضو هيئة تدريس",
    specialty: "أستاذ مساعد",
    email: "a.khalil@mutah.edu.jo",
    ext: "4445",
    office: "مبنى الكلية - ط 2",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "د. ليلى عبد الرحمن",
    role: "مدرس",
    specialty: "مدرس",
    email: "laila.ab@mutah.edu.jo",
    ext: "4450",
    office: "مبنى الكلية - ط 2",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export function AnatomyFaculty() {
  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-500 pb-20">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[#0f3057] mb-3 flex items-center gap-3">
          <span className="text-4xl">👥</span> الهيئة التدريسية
        </h2>
        <p className="text-gray-500 text-lg pr-14">
          نخبة من الأكاديميين المتميزين في قسم التشريح وعلم
          الأنسجة
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {FACULTY_MEMBERS.map((prof, i) => (
          <a
            key={i}
            href="https://academics.mutah.edu.jo/Files/index.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="block group h-full"
          >
            <Card className="rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(15,48,87,0.03)] hover:shadow-[0_12px_40px_rgba(15,48,87,0.12)] transition-all hover:-translate-y-2 bg-white h-full relative overflow-hidden flex flex-col">
              
              <div className="h-[280px] w-full relative overflow-hidden bg-gray-50 border-b border-gray-100">
                <img 
                  src={prof.image} 
                  alt={prof.name} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
              </div>

              <div className="flex flex-col p-6 text-center items-center justify-center relative z-20">
                <h3 className="font-bold text-[#0f3057] text-xl mb-1 group-hover:text-[#c9a227] transition-colors">
                  {prof.name}
                </h3>
                <p className="text-gray-500 font-medium text-sm mb-4">
                  {prof.role}
                </p>
                
                <span className="inline-block text-[#0f3057] px-4 py-1.5 rounded-full text-sm font-bold bg-[#c9a227]/10 border border-[#c9a227]/20">
                  {prof.specialty}
                </span>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}