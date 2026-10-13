// Real attachment files from Drupal (content type «ملف مرفق»), keyed by attachment title,
// e.g. "الخطة الدراسية - بكالوريوس الطب والجراحة". Filled by ./drupal.ts.
export type DocFile = { name: string; url: string; type: 'docx' | 'html' };

const DOCS = new Map<string, DocFile[]>();

export function setDocuments(docs: Map<string, DocFile[]>) {
  DOCS.clear();
  docs.forEach((files, title) => DOCS.set(title, files));
}

export const documentFiles = (title: string): DocFile[] | undefined => DOCS.get(title.trim());

// Every attachment title the site shows (read by the content export to list them in Drupal)
export const SEEN_TITLES = new Set<string>();
if (typeof window !== 'undefined') (window as any).__mutahAttachmentTitles = SEEN_TITLES;
