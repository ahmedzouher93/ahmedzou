// Just enough of a browser for the site's modules to load under Node (no rendering happens).
const noop = () => {};
const loc = { href: 'http://localhost/#/', hash: '#/', pathname: '/', search: '', origin: 'http://localhost', protocol: 'http:', host: 'localhost' };
const el = (): any => ({ style: {}, setAttribute: noop, getAttribute: () => null, appendChild: noop, addEventListener: noop, removeEventListener: noop, classList: { add: noop, remove: noop, toggle: noop, contains: () => false } });
const doc: any = { createElement: el, documentElement: el(), head: el(), body: el(), getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener: noop, removeEventListener: noop };
const win: any = { location: loc, history: { state: null, length: 1, pushState: noop, replaceState: noop, go: noop }, document: doc, addEventListener: noop, removeEventListener: noop, matchMedia: () => ({ matches: false, addEventListener: noop, removeEventListener: noop }), localStorage: { getItem: () => null, setItem: noop }, navigator: { userAgent: 'node' }, speechSynthesis: undefined, setTimeout, clearTimeout };
doc.defaultView = win;
const g: any = globalThis;
g.window ??= win; g.document ??= doc; g.localStorage ??= win.localStorage;
if (!g.navigator) g.navigator = win.navigator;
