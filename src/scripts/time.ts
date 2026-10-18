import { TWILIGHT } from '../data/rates';

/** Current time at the course (America/Los_Angeles), whatever the visitor's timezone. */
export function laNow() {
  const o: Record<string, string> = {};
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: 'numeric', minute: 'numeric', hour12: false,
    weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit',
    timeZoneName: 'short',
  }).formatToParts(new Date()).forEach((p) => (o[p.type] = p.value));
  return {
    h: Number(o.hour) % 24,
    m: Number(o.minute),
    wd: o.weekday,
    iso: `${o.year}-${o.month}-${o.day}`,
    dst: o.timeZoneName === 'PDT',
  };
}

export function fmt(mins: number) {
  let h = Math.floor(mins / 60);
  const m = mins % 60;
  const ap = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')}${ap}`;
}

export function twilightTimes(dst: boolean) {
  return dst ? TWILIGHT.summer : TWILIGHT.winter;
}
