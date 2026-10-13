// Every editable content list in the site, keyed by a stable "scope" key.
// Drupal stores each news / announcement / event item with one of these keys
// (taxonomy "الجهات" → field_scope_key); the loader in ./drupal.ts puts Drupal's
// items into these same lists, so list pages and their detail pages both show them.
import ITEMS from '../pages/ItemsRegistry';
import FACULTIES from '../pages/Faculties/FacultyData';
import LEGACY_NEWS from '../pages/Faculties/LegacyNewsData';
import { facultyNews, setFacultyNews } from '../pages/Faculties/facultyNews';
import DAA_NEWS from '../pages/Deanships/DaaNewsData';
import RESEARCH_ITEMS from '../pages/Research/ResearchNewsData';
import CC_NEWS from '../pages/Centers/ComputerCenterNews';
import UNIVERSITY_NEWS from '../pages/News/NewsData';
import MED_ACTIVITIES from '../pages/Medicine/MedicineActivitiesData';
import INNOVATION from '../pages/Centers/InnovationData';
import CENTERS from '../pages/Centers/OfficialCentersData';
import OFFICES from '../pages/Offices/OfficesData';
import { NEWS as GRAD_NEWS, ANNOUNCEMENTS as GRAD_ANN } from '../pages/GraduateStudies';
import { newsItems as ADC_NEWS } from '../pages/Centers/AcademicDevelopmentCenter';

export type Kind = 'news' | 'announcement' | 'event';
export type Scope = {
  key: string;
  label: string; // shown in Drupal as the term name
  kind: Kind; // default content type for this list
  get: () => any[];
  set: (items: any[]) => void;
};

// Replace an array's contents in place (other modules keep the same reference)
const fill = (arr: any[]) => (items: any[]) => { arr.splice(0, arr.length, ...items); };
const kindOf = (key: string): Kind => (/ann|announc|info/.test(key) ? 'announcement' : /activit|event/.test(key) ? 'event' : 'news');

export function allScopes(): Scope[] {
  const out: Scope[] = [];

  // University-wide news (/news, home page)
  out.push({ key: 'university', label: 'جامعة مؤتة — الأخبار العامة', kind: 'news', get: () => UNIVERSITY_NEWS, set: fill(UNIVERSITY_NEWS) });

  // Units, departments and centers listed in ItemsRegistry (/u-list/:key, /u-item/:key/:idx)
  for (const [key, set] of Object.entries(ITEMS)) {
    out.push({ key: 'items:' + key, label: set.scope + ' — ' + set.label, kind: kindOf(key), get: () => set.items, set: (items) => fill(set.items)(items) });
  }

  // Colleges and their departments
  for (const [slug, cfg] of Object.entries<any>(FACULTIES)) {
    out.push({ key: 'faculty:' + slug, label: cfg.name + ' — الأخبار والإعلانات', kind: 'news', get: () => facultyNews(slug), set: (items) => setFacultyNews(slug, items) });
    for (const d of cfg.departments || []) {
      out.push({ key: 'dept:' + slug + ':' + d.id, label: cfg.name + ' — ' + d.name + ' — أخبار القسم', kind: 'news', get: () => d.news || [], set: (items) => { d.news = items; } });
    }
  }
  for (const [slug, leg] of Object.entries<any>(LEGACY_NEWS)) {
    if (!FACULTIES[slug]) out.push({ key: 'faculty:' + slug, label: leg.name + ' — الأخبار والإعلانات', kind: 'news', get: () => facultyNews(slug), set: (items) => setFacultyNews(slug, items) });
  }
  out.push({ key: 'medicine:activities', label: 'كلية الطب — النشاطات والإنجازات', kind: 'event', get: () => MED_ACTIVITIES, set: fill(MED_ACTIVITIES) });

  // Deanships
  out.push({ key: 'daa', label: 'عمادة الشؤون الأكاديمية — أخبار وأحداث', kind: 'news', get: () => DAA_NEWS, set: fill(DAA_NEWS) });
  for (const [kind, set] of Object.entries<any>(RESEARCH_ITEMS)) {
    out.push({ key: 'research:' + kind, label: 'عمادة البحث العلمي — ' + set.label, kind: kindOf(kind), get: () => set.items, set: (items) => fill(set.items)(items) });
  }
  out.push({ key: 'grad:news', label: 'كلية الدراسات العليا — أخبار وأحداث', kind: 'news', get: () => GRAD_NEWS, set: fill(GRAD_NEWS) });
  out.push({ key: 'grad:ann', label: 'كلية الدراسات العليا — إعلانات', kind: 'announcement', get: () => GRAD_ANN, set: fill(GRAD_ANN) });

  // Centers
  for (const [kind, set] of Object.entries<any>(CC_NEWS)) {
    out.push({ key: 'cc:' + kind, label: 'مركز الحاسوب — ' + set.label, kind: kindOf(kind), get: () => set.items, set: (items) => fill(set.items)(items) });
  }
  out.push({ key: 'adc:news', label: 'مركز التطوير الأكاديمي وضمان الجودة — أخبار وأحداث', kind: 'news', get: () => ADC_NEWS, set: fill(ADC_NEWS) });
  for (const category of ['news', 'events'] as const) {
    out.push({
      key: 'innovation:' + category,
      label: 'مركز الريادة والابتكار — ' + (category === 'news' ? 'أخبار المركز' : 'الفعاليات والإعلانات'),
      kind: category === 'news' ? 'news' : 'event',
      get: () => INNOVATION.articles.filter((a: any) => a.category === category),
      set: (items) => {
        const rest = INNOVATION.articles.filter((a: any) => a.category !== category);
        INNOVATION.articles.splice(0, INNOVATION.articles.length, ...rest, ...items.map((it) => ({ ...it, category })));
      },
    });
  }
  // Official centers and offices: dated cards on their pages (/c-item/:scope/:tab/:idx)
  for (const [src, prefix] of [[CENTERS, 'center'], [OFFICES, 'office']] as const) {
    for (const [ckey, cfg] of Object.entries<any>(src)) {
      for (const [tab, page] of Object.entries<any>(cfg.pages || {})) {
        if (!(page.cards || []).some((c: any) => c.date && !c.tab)) continue;
        out.push({
          key: prefix + ':' + ckey + ':' + tab,
          label: cfg.name + ' — ' + (page.title || tab),
          kind: kindOf(tab),
          get: () => (page.cards || []).filter((c: any) => c.date && !c.tab),
          set: (items) => { page.cards = [...(page.cards || []).filter((c: any) => !(c.date && !c.tab)), ...items]; },
        });
      }
    }
  }
  return out;
}
