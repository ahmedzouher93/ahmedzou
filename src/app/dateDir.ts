export function dateDir(d: any) {
  return typeof d === 'string' && /^[\d\/\-\s.]+$/.test(d) ? 'ltr' : undefined;
}
