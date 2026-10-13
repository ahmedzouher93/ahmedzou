import { useParams, useNavigate, useLocation } from "react-router";
import { router } from "./routes";

export function go(path: string) {
  let p = (path || '/').replace(/^#/, '');
  p = p.replace(/\?tab=([^&]+)$/, (_m, tab) => '/' + tab);
  const target = p.startsWith('/') ? p : '/' + p;
  router.navigate(target);
  window.scrollTo({ top: 0 });
}

/* Keeps the open tab in the URL: /hr/about, /student-affairs/services … */
export function useTabRoute(def = 'home') {
  const params = useParams() as any;
  const navigate = useNavigate();
  const location = useLocation();
  const active = params.tab || def;
  const base = params.tab
    ? location.pathname.replace(new RegExp('/' + params.tab + '$'), '')
    : location.pathname.replace(/\/$/, '');
  const set = (id: string) => {
    navigate(base + '/' + id);
    window.scrollTo({ top: 0 });
  };
  return [active, set] as [string, (id: string) => void];
}

/* Section tabs that live on a page with several independent switchers */
export function useQueryTab(key: string, def: string) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const active = params.get(key) || def;
  const set = (id: string) => {
    const next = new URLSearchParams(location.search);
    if (id === def) next.delete(key); else next.set(key, id);
    const qs = next.toString();
    navigate(location.pathname + (qs ? '?' + qs : ''), { replace: true });
  };
  return [active, set] as [string, (id: string) => void];
}
