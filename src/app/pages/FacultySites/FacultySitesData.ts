// Faculty member websites, from https://academics.mutah.edu.jo/Files/index.aspx
// Each member gets an internal profile page at /faculty-sites/:slug.
// Optional profile fields render as sections only when filled in.
export type Publication = { title: string; venue?: string; year?: string; link?: string };
export type Course = { code?: string; title: string; level?: string };
export type Education = { degree: string; field?: string; university?: string; country?: string; year?: string };

export type FacultySite = {
  slug: string;
  name: string;
  college?: string;
  department?: string;
  rank?: string;
  email?: string;
  phone?: string;
  office?: string;
  photo?: string;
  site?: string; // original personal site on academics.mutah.edu.jo
  bio?: string[];
  education?: Education[];
  research?: string[];
  publications?: Publication[];
  courses?: Course[];
  positions?: string[];
};

export const DIRECTORY_URL = "https://academics.mutah.edu.jo/Files/index.aspx";
export const DIRECTORY_TOTAL = 587;

const SITE = (u: string) => `https://academics.mutah.edu.jo/${u}`;
const ARTS = "كلية الآداب";

export const FACULTY_SITES: FacultySite[] = [
  { slug: "Anawafleh", name: "احمد سليمان النوافلة", college: ARTS, email: "Anawafleh@Mutah.Edu.Jo", site: SITE("Anawafleh") },
  {
    slug: "Artcolloq", name: "محمد محمود المطالقة", college: ARTS, email: "Artcolloq@Mutah.Edu.Jo", site: SITE("Artcolloq/sitepages/Home.aspx"),
    rank: "أستاذ", department: "قسم اللغات الأوروبية",
    education: [{ degree: "الدكتوراه", country: "المغرب" }],
  },
  { slug: "Alsmadiayman1979", name: "أيمن الصمادي", college: ARTS, email: "Alsmadiayman1979@Mutah.Edu.Jo", site: SITE("Alsmadiayman1979") },
  { slug: "Hmoud58mutah", name: "حمود الرحاوي", college: ARTS, email: "Hmoud58mutah@Mutah.Edu.Jo", site: SITE("Hmoud58mutah") },
  { slug: "Laithib", name: "ليث ابراهيم", college: ARTS, email: "Laithib@Mutah.Edu.Jo", site: SITE("Laithib") },
  { slug: "Ahmadbtoush87", name: "أحمد البطوش", college: ARTS, email: "Ahmadbtoush87@Mutah.Edu.Jo", site: SITE("Ahmadbtoush87") },
  { slug: "mahasneh", name: "عالية محاسنه", college: ARTS },
  { slug: "dafer", name: "ظافر الصرايره", college: ARTS, email: "dafer@mutah.edu.jo", site: SITE("dafer") },
  { slug: "jaza", name: "جزاء محمد المصاروة", college: ARTS, email: "jaza@mutah.edu.jo", site: SITE("jaza") },
  { slug: "fugara", name: "سيف الدين طه الفقراء", college: ARTS, email: "fugara@mutah.edu.jo", site: SITE("fugara") },
];

export const findMember = (slug?: string) => FACULTY_SITES.find(f => f.slug.toLowerCase() === (slug || '').toLowerCase());
