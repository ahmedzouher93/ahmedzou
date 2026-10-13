// Faculty member websites, from https://academics.mutah.edu.jo/Files/index.aspx
// Each entry: name, college (optional), department (optional), email (optional), url
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
  { name: "د. أحمد العبادلة", url: "https://academics.mutah.edu.jo/abadleh_a" },
  { name: "د. محمد عوده عطيه الليمون", url: "https://academics.mutah.edu.jo/moallimoun" },
  { name: "أمل فرحان المعايطة", url: "https://academics.mutah.edu.jo/Amal_almaaita" },
  { name: "أحمد بهجت البطوش", url: "https://academics.mutah.edu.jo/Ahmadbtoush87" },
  { name: "د. رامي العساسفة", url: "https://academic.mutah.edu.jo/rami84" },
];
