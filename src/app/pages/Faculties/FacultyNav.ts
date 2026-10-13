import FACULTIES from './FacultyData';

const ABOUT_LABELS: Record<string, string> = {
 "activities": "نشاطات الكلية",
 "indicative-plan": "الخطة الإسترشادية",
 "facilities": "المرافق",
 "vision": "الرؤية والرسالة والاهداف",
 "about": "عن الكلية",
 "strategy": "الخطة الاستيراتيجية",
 "dean": "مكتب العميد",
 "council": "مجلس الكلية",
 "committees": "لجان الكلية",
 "structure": "الهيكل التنظيمي",
 "former-deans": "العمداء السابقون",
 "staff": "الموظفون الاداريون",
 "former-faculty": "أعضاء هيئة التدريس السابقين",
 "documents": "الوثائق"
};
const EXTRA_LABELS: Record<string, string> = {
 "learning-outcomes": "مخرجات التعلم",
 "achievements": "الانجازات",
 "conferences": "المؤتمرات",
 "forms": "النماذج",
 "documents": "الوثائق",
 "links": "روابط هامة",
 "contact": "إتصل بنا"
};
const PROGRAM_LABELS: Record<string, string> = { diploma: 'الدبلوم العالي', bachelor: 'البكالوريوس', graduate: 'الدراسات العليا', other: 'برامج أخرى' };

export function facultySlug(pathname: string) {
  const m = pathname.match(/^\/faculty\/([a-z-]+)/);
  return m ? m[1] : 'pharmacy';
}

export function facultyLinks(slug: string) {
  const cfg = FACULTIES[slug];
  const root = '/faculty/' + slug;
  const links: any[] = [{ name: 'الرئيسية', path: root }];
  links.push({
    name: 'عن الكلية',
    path: root + '/about',
    children: (cfg.about || []).map((k: string) => ({
      name: k === 'vision' && cfg.visionLabel ? cfg.visionLabel : ABOUT_LABELS[k],
      path: root + '/about/' + k,
    })),
  });
  links.push({
    name: 'الاقسام',
    path: root + '#departments',
    children: (cfg.departments || []).map((d: any) => ({ name: d.name, path: root + '/departments/' + d.id })),
  });
  links.push({
    name: 'البرامج الاكاديمية',
    path: root + '/programs',
    children: (cfg.programs || []).map((k: string) => ({ name: PROGRAM_LABELS[k], path: root + '/programs/' + k })),
  });
  for (const k of cfg.extra || []) {
    links.push({ name: k === 'achievements' && cfg.achievementsLabel ? cfg.achievementsLabel : EXTRA_LABELS[k], path: root + '/' + k });
  }
  return links;
}

export { ABOUT_LABELS, EXTRA_LABELS, PROGRAM_LABELS };

export const DEPT_TABS = [
  { id: '', name: 'الرئيسية' },
  { id: 'strategy', name: 'الاستيراتيجية' },
  { id: 'faculty', name: 'الهيئة التدريسية' },
  { id: 'courses', name: 'المواد الدراسية' },
  { id: 'programs', name: 'البرامج الدراسية' },
  { id: 'plans', name: 'الخطط الدراسية' },
  { id: 'forms', name: 'النماذج' },
  { id: 'achievements', name: 'الانجازات' },
];

export function departmentOf(pathname: string) {
  const m = pathname.match(/^\/faculty\/([a-z-]+)\/departments\/([a-z-]+)/);
  if (!m) return null;
  const cfg = FACULTIES[m[1]];
  const dept = (cfg.departments || []).find((d: any) => d.id === m[2]);
  return dept ? { slug: m[1], cfg, dept } : null;
}

export function departmentLinks(slug: string, deptId: string) {
  const base = '/faculty/' + slug + '/departments/' + deptId;
  return DEPT_TABS.map((t) => ({ name: t.name, path: t.id ? base + '/' + t.id : base }));
}
