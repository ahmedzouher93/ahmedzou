import FACULTIES from './FacultyData';
import LEGACY_NEWS from './LegacyNewsData';

// The news list a college page shows, and that /f-item/:slug/news/:idx reads:
// the college's own news when it has any, otherwise its legacy list.
export function facultyNews(slug: string): any[] {
  const base = FACULTIES[slug];
  if (base && Array.isArray(base.news) && base.news.length) return base.news;
  return (LEGACY_NEWS[slug] && LEGACY_NEWS[slug].items) || [];
}

// Replace a college's news (used by the Drupal content loader)
export function setFacultyNews(slug: string, items: any[]) {
  const base = FACULTIES[slug];
  if (base) base.news = items;
  if (LEGACY_NEWS[slug]) LEGACY_NEWS[slug].items = items;
}
