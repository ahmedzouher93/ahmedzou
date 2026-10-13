// Dumps every editable list of the site to JSON, for seeding Drupal (drupal/mutah_content).
// Run: npm run export:content
import './dom-stub';
import { writeFileSync, mkdirSync, rmSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { allScopes } from '../src/app/cms/sources';
import { FACULTY_SITES } from '../src/app/pages/FacultySites/FacultySitesData';
import { TRUSTEES, VP_LIST, COUNCIL, DEANS, PRESIDENT } from '../src/app/pages/About';

const out = process.argv[2] || 'drupal/mutah_content/content/content.json';
const scopes = allScopes().map((s) => ({ key: s.key, label: s.label, kind: s.kind, items: s.get() }));
const councils = {
  president: [PRESIDENT],
  vp: VP_LIST, trustees: TRUSTEES, council: COUNCIL, deans: DEANS,
};

// Inlined images (data: URIs) become files next to the JSON: "file:<name>"
const dir = out.replace(/\/[^/]+$/, '');
rmSync(dir + '/files', { recursive: true, force: true });
mkdirSync(dir + '/files', { recursive: true });
const EXT: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/svg+xml': 'svg' };
const unpack = (v: any): any => {
  if (typeof v === 'string') {
    const m = /^data:([^;,]+);base64,(.*)$/s.exec(v);
    if (!m) return v;
    const buf = Buffer.from(m[2], 'base64');
    const name = createHash('sha1').update(buf).digest('hex').slice(0, 16) + '.' + (EXT[m[1]] || 'bin');
    writeFileSync(dir + '/files/' + name, buf);
    return 'file:' + name;
  }
  if (Array.isArray(v)) return v.map(unpack);
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, unpack(x)]));
  return v;
};
// Attachment titles shown under course descriptions / study plans (collected by crawling the built site)
const documents: string[] = JSON.parse(readFileSync('scripts/attachment-titles.json', 'utf8'));
writeFileSync(out, JSON.stringify(unpack({ scopes, faculty: FACULTY_SITES, councils, documents }), null, 1));
console.log('scopes', scopes.length, 'items', scopes.reduce((n, s) => n + s.items.length, 0), 'faculty', FACULTY_SITES.length, 'documents', documents.length, '->', out);
