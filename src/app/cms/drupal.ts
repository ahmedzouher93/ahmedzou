// Loads the site's content from Drupal (module mutah_content) before the first render.
// The theme puts the API base on <html data-mutah-api="/api/mutah">. Without it (the
// single-file site, local preview) the built-in content is used as is.
import { allScopes } from './sources';
import { FACULTY_SITES, FacultySite } from '../pages/FacultySites/FacultySitesData';
import { TRUSTEES, VP_LIST, COUNCIL, DEANS, PRESIDENT } from '../pages/About';
import { setDocuments, DocFile } from './documents';

type Node = Record<string, any[]>;

const val = (n: Node, f: string): any => n[f]?.[0]?.value ?? undefined;
const vals = (n: Node, f: string): any[] => (n[f] || []).map((x: any) => x.value).filter((x: any) => x != null && x !== '');
const str = (n: Node, f: string): string => String(val(n, f) ?? '');
const fileUrl = (n: Node, f: string): string | undefined => n[f]?.[0]?.url || undefined;
const links = (n: Node, f: string): { uri: string; title: string }[] => (n[f] || []).map((x: any) => ({ uri: linkHref(x.uri), title: x.title || '' }));
const firstLink = (n: Node, f: string): string | undefined => links(n, f)[0]?.uri || undefined;
const pipes = (s: string) => s.split('|').map((x) => x.trim());

function linkHref(uri = ''): string {
  if (uri.startsWith('internal:')) return uri.slice('internal:'.length) || '/';
  if (uri.startsWith('entity:')) return '/' + uri.slice('entity:'.length);
  return uri;
}

function paragraphs(n: Node): string[] {
  const html: string = n.body?.[0]?.processed ?? n.body?.[0]?.value ?? '';
  if (!html.trim()) return [];
  const box = document.createElement('div');
  box.innerHTML = html;
  const blocks = Array.from(box.querySelectorAll('p, li, h2, h3, h4, blockquote'));
  const texts = (blocks.length ? blocks.map((b) => b.textContent || '') : [box.textContent || '']).map((t) => t.trim());
  return texts.filter(Boolean);
}

const AR_MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
const arDigits = (s: string) => s.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[+d]);
function arDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return arDigits(`${d} ${AR_MONTHS[m - 1]} ${y}`);
}

// One news / announcement / event node → the item shape every list of the site understands
function toItem(n: Node): any {
  const title = str(n, 'title');
  const iso: string | undefined = val(n, 'field_date') || (val(n, 'created') ? String(val(n, 'created')).slice(0, 10) : undefined);
  const date = str(n, 'field_date_text') || iso || '';
  const gallery = vals(n, 'field_gallery');
  const img = fileUrl(n, 'field_image') || str(n, 'field_image_url') || gallery[0] || undefined;
  const paras = paragraphs(n);
  const summary = String(n.body?.[0]?.summary || '').trim();
  const source = firstLink(n, 'field_source_link');
  const tag = str(n, 'field_tag') || undefined;
  const docs = [
    ...(n.field_attachments || []).map((f: any) => [f.url, f.description || decodeURIComponent(String(f.url).split('/').pop() || '')]),
    ...links(n, 'field_related_links').map((l) => [l.uri, l.title || l.uri.split('/').pop()]),
  ];
  const item: any = {
    nid: val(n, 'nid'),
    id: str(n, 'field_item_id') || String(val(n, 'nid')),
    title, t: title,
    date, d: date,
    paragraphs: paras, body: paras,
    images: gallery.length ? gallery : img ? [img] : [],
    docs,
  };
  if (iso) item.dateAr = arDate(iso);
  if (img) { item.img = img; item.image = img; }
  if (summary) { item.desc = summary; item.excerpt = summary; }
  if (tag) { item.tag = tag; item.category = tag; }
  if (source) { item.source = source; item.url = source; item.link = source; }
  return item;
}

function toMember(n: Node): FacultySite {
  const rows = (f: string) => vals(n, f).map((s: string) => pipes(String(s)));
  const files = [
    ...(n.field_files || []).map((f: any) => ({ title: f.description || decodeURIComponent(String(f.url).split('/').pop() || ''), url: f.url })),
    ...links(n, 'field_file_links').map((l) => ({ title: l.title || l.uri, url: l.uri })),
  ];
  const m: FacultySite = {
    slug: str(n, 'field_slug'),
    name: str(n, 'title'),
    college: str(n, 'field_college') || undefined,
    department: str(n, 'field_department') || undefined,
    photo: fileUrl(n, 'field_photo'),
    site: firstLink(n, 'field_personal_site'),
    cv: firstLink(n, 'field_cv'),
    scholar: firstLink(n, 'field_scholar'),
    researchgate: firstLink(n, 'field_researchgate'),
    about: paragraphs(n),
    phone: str(n, 'field_phone') || undefined,
    fax: str(n, 'field_fax') || undefined,
    email: str(n, 'field_email') || undefined,
    research: vals(n, 'field_research'),
    publications: rows('field_publications').map(([title, venue, year, link]) => ({ title, venue, year, link })),
    courses: rows('field_courses').map(([title, code]) => ({ title, code })),
    news: rows('field_member_news').map(([title, date, text, link]) => ({ title, date, text, link })),
    officeHours: rows('field_office_hours').map(([day, time]) => ({ day, time })),
    otherInfo: vals(n, 'field_other_info'),
    books: rows('field_books').map(([title, publisher, year, link]) => ({ title, publisher, year, link })),
    supervision: rows('field_supervision').map(([title, student, degree, year, role]) => ({ title, student, degree, year, role })),
    achievements: rows('field_achievements').map(([title, year, text]) => ({ title, year, text })),
    fundedResearch: rows('field_funded_research').map(([title, funder, year, role]) => ({ title, funder, year, role })),
    files,
    links: links(n, 'field_important_links').map((l) => ({ title: l.title || l.uri, url: l.uri })),
  };
  // Drop empty values so the profile hides those sections, as with the built-in data
  for (const k of Object.keys(m) as (keyof FacultySite)[]) {
    const v = m[k];
    if (v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) delete m[k];
  }
  return m;
}

async function getJson(url: string, ms: number): Promise<any[]> {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), ms);
  try {
    const res = await fetch(url + (url.includes('?') ? '&' : '?') + '_format=json', { signal: ctl.signal, credentials: 'same-origin', headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(url + ': ' + res.status);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } finally {
    clearTimeout(timer);
  }
}

const replace = <T,>(arr: T[], items: T[]) => { arr.splice(0, arr.length, ...items); };

export async function loadDrupalContent(): Promise<boolean> {
  const api = document.documentElement.dataset.mutahApi;
  if (!api) return false;
  try {
    const [scopes, news, people, documents] = await Promise.all(
      ['scopes', 'news', 'people', 'documents'].map((p) => getJson(api.replace(/\/$/, '') + '/' + p, 8000)),
    );

    // News, announcements and events → every list of the site
    const keyByTid = new Map<number, string>();
    for (const t of scopes) {
      const key = str(t, 'field_scope_key');
      if (key) keyByTid.set(val(t, 'tid'), key);
    }
    const byKey = new Map<string, any[]>();
    for (const key of keyByTid.values()) byKey.set(key, []);
    for (const n of news) {
      const item = toItem(n);
      for (const ref of n.field_scope || []) {
        const key = keyByTid.get(ref.target_id);
        if (key) byKey.get(key)!.push({ ...item });
      }
    }
    for (const scope of allScopes()) {
      if (byKey.has(scope.key)) scope.set(byKey.get(scope.key)!);
    }

    // Faculty member sites
    const members = people.filter((n) => n.type?.[0]?.target_id === 'faculty_member').map(toMember).filter((m) => m.slug);
    replace(FACULTY_SITES, members);

    // Presidency and councils
    const boards: Record<string, any[]> = { president: [], vp: [], trustees: [], council: [], deans: [] };
    for (const n of people.filter((n) => n.type?.[0]?.target_id === 'council_member')) {
      const board = str(n, 'field_council');
      if (!boards[board]) continue;
      boards[board].push({
        name: str(n, 'title'),
        role: str(n, 'field_role'),
        img: fileUrl(n, 'field_photo'),
        phone: str(n, 'field_phone'), ext: str(n, 'field_phone_ext'), fax: str(n, 'field_fax'),
        email: str(n, 'field_email'), location: str(n, 'field_location'),
        speech: paragraphs(n),
      });
    }
    const pick = ({ name, role, img }: any) => ({ name, role, img });
    replace(TRUSTEES, boards.trustees.map(pick));
    replace(VP_LIST, boards.vp.map(pick));
    replace(COUNCIL, boards.council.map(pick));
    replace(DEANS, boards.deans.map(pick));
    const p = boards.president[0];
    if (p) {
      Object.assign(PRESIDENT, {
        name: p.name || PRESIDENT.name,
        role: p.role || PRESIDENT.role,
        img: p.img || PRESIDENT.img,
        phone: p.phone, ext: p.ext, fax: p.fax, email: p.email, location: p.location,
        speech: p.speech.length ? p.speech : PRESIDENT.speech,
      });
    }

    // Attachments under course descriptions and study plans
    const docs = new Map<string, DocFile[]>();
    for (const n of documents) {
      const files: DocFile[] = (n.field_document || []).map((f: any) => {
        const name = decodeURIComponent(String(f.url).split('/').pop() || '');
        return { name, url: f.url, type: /\.html?$/i.test(name) ? 'html' : 'docx' };
      });
      if (files.length) docs.set(str(n, 'title').trim(), files);
    }
    setDocuments(docs);
    document.documentElement.dataset.mutahContent = 'drupal';
    return true;
  } catch (e) {
    console.warn('[mutah] Drupal content not loaded, showing built-in content.', e);
    return false;
  }
}
