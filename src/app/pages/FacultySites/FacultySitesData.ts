// Faculty member websites, from https://academics.mutah.edu.jo/Files/index.aspx
// Each entry: name, college, email, url (site address follows the member's university email username)
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
  { name: "احمد سليمان النوافلة", college: "كلية الآداب", email: "Anawafleh@Mutah.Edu.Jo", url: "https://academics.mutah.edu.jo/Anawafleh" },
  { name: "محمد محمود المطالقة", college: "كلية الآداب", email: "Artcolloq@Mutah.Edu.Jo", url: "https://academics.mutah.edu.jo/Artcolloq" },
  { name: "أيمن الصمادي", college: "كلية الآداب", email: "Alsmadiayman1979@Mutah.Edu.Jo", url: "https://academics.mutah.edu.jo/Alsmadiayman1979" },
  { name: "حمود الرحاوي", college: "كلية الآداب", email: "Hmoud58mutah@Mutah.Edu.Jo", url: "https://academics.mutah.edu.jo/Hmoud58mutah" },
  { name: "ليث ابراهيم", college: "كلية الآداب", email: "Laithib@Mutah.Edu.Jo", url: "https://academics.mutah.edu.jo/Laithib" },
  { name: "أحمد البطوش", college: "كلية الآداب", email: "Ahmadbtoush87@Mutah.Edu.Jo", url: "https://academics.mutah.edu.jo/Ahmadbtoush87" },
  { name: "عالية محاسنه", college: "كلية الآداب", url: DIRECTORY_URL },
  { name: "ظافر الصرايره", college: "كلية الآداب", email: "dafer@mutah.edu.jo", url: "https://academics.mutah.edu.jo/dafer" },
  { name: "جزاء محمد المصاروة", college: "كلية الآداب", email: "jaza@mutah.edu.jo", url: "https://academics.mutah.edu.jo/jaza" },
  { name: "سيف الدين طه الفقراء", college: "كلية الآداب", email: "fugara@mutah.edu.jo", url: "https://academics.mutah.edu.jo/fugara" },
];
