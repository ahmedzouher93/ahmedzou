// Faculty member websites, from https://academics.mutah.edu.jo/Files/index.aspx
// Each entry: name, college, url (site address follows the member's university email username)
export type FacultySite = {
  name: string;
  college?: string;
  department?: string;
  email?: string;
  url: string;
};

export const DIRECTORY_URL = "https://academics.mutah.edu.jo/Files/index.aspx";
export const DIRECTORY_TOTAL = 587;

export const FACULTY_SITES: FacultySite[] = [
  { name: "احمد سليمان النوافلة", college: "كلية الآداب", url: "https://academics.mutah.edu.jo/Anawafleh" },
  { name: "محمد محمود المطالقة", college: "كلية الآداب", url: "https://academics.mutah.edu.jo/Artcolloq" },
  { name: "أيمن الصمادي", college: "كلية الآداب", url: "https://academics.mutah.edu.jo/Alsmadiayman1979" },
  { name: "حمود الرحاوي", college: "كلية الآداب", url: "https://academics.mutah.edu.jo/Hmoud58mutah" },
  { name: "ليث ابراهيم", college: "كلية الآداب", url: "https://academics.mutah.edu.jo/Laithib" },
  { name: "أحمد البطوش", college: "كلية الآداب", url: "https://academics.mutah.edu.jo/Ahmadbtoush87" },
  { name: "عالية محاسنه", college: "كلية الآداب", url: DIRECTORY_URL },
  { name: "ظافر الصرايره", college: "كلية الآداب", url: "https://academics.mutah.edu.jo/dafer" },
  { name: "جزاء محمد المصاروة", college: "كلية الآداب", url: "https://academics.mutah.edu.jo/jaza" },
  { name: "سيف الدين طه الفقراء", college: "كلية الآداب", url: "https://academics.mutah.edu.jo/fugara" },
];
