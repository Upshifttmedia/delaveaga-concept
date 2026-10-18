import type { Hole } from '../data/course';

/** Deterministic random so each hole's trees always land in the same place. */
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

/** Draws a stylized top-down map of a hole as an SVG string (fallback when no photo/video loads). */
export function drawHole(d: Hole): string {
  const i = d.n - 1;
  const r = rng(i * 97 + 13);
  const W = 200, H = 320;
  const len = d.par === 3 ? 0.55 : d.par === 4 ? 0.8 : 0.92;
  const t = { x: 100, y: H - 28 };
  const gy = H - 28 - (H - 70) * len;
  const gx = 100 + d.dogleg * 44;
  const cx = 100 - d.dogleg * 30;
  const cy = (t.y + gy) / 2 + 10;
  const path = `M${t.x} ${t.y} Q${cx} ${cy} ${gx} ${gy}`;
  const haz = d.hazard ?? '';

  let s = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">`;
  s += `<rect x="-50" y="-50" width="300" height="420" fill="#24473A"/>`;
  for (let k = 0; k < 7; k++) {
    const y = 40 + k * 42;
    s += `<path d="M-10 ${y} C 50 ${y - 18 + k * 3}, 140 ${y + 20 - k * 2}, 210 ${y - 6}" fill="none" stroke="rgba(255,255,255,.05)"/>`;
  }
  if (haz.includes('L')) s += `<path d="M${gx - 58} ${gy + 10} Q ${cx - 62} ${cy} ${t.x - 50} ${t.y - 30}" fill="none" stroke="#7FA9B5" stroke-width="12" stroke-linecap="round" opacity=".85"/>`;
  if (haz === 'R') s += `<path d="M${gx + 58} ${gy + 10} Q ${cx + 62} ${cy} ${t.x + 50} ${t.y - 30}" fill="none" stroke="#7FA9B5" stroke-width="12" stroke-linecap="round" opacity=".85"/>`;
  if (haz === 'OB') for (let y = gy; y < t.y - 20; y += 14) s += `<circle cx="${Math.max(gx, t.x) + 52}" cy="${y}" r="1.8" fill="#fff" opacity=".7"/>`;
  s += `<path d="${path}" fill="none" stroke="#33634B" stroke-width="56" stroke-linecap="round"/>`;
  s += `<path d="${path}" fill="none" stroke="#6B9A70" stroke-width="30" stroke-linecap="round"/>`;
  if (haz.includes('ravine')) {
    const ry = d.par === 3 ? (t.y + gy) / 2 : gy + 40;
    s += `<path d="M0 ${ry} C 60 ${ry - 10}, 140 ${ry + 12}, 200 ${ry}" fill="none" stroke="#173328" stroke-width="18"/>`;
  }
  s += `<ellipse cx="${gx - 22}" cy="${gy + 14}" rx="9" ry="6" fill="#E6DCC0"/>`;
  if (d.par !== 5) s += `<ellipse cx="${gx + 21}" cy="${gy + 8}" rx="7" ry="5" fill="#E6DCC0"/>`;
  if (d.par > 3) s += `<ellipse cx="${cx + (d.dogleg ? d.dogleg * -16 : 18)}" cy="${cy - 6}" rx="8" ry="5" fill="#E6DCC0"/>`;
  s += `<ellipse cx="${gx}" cy="${gy}" rx="20" ry="16" fill="#9CCB9F"/>`;
  s += `<line x1="${gx + 2}" y1="${gy + 2}" x2="${gx + 2}" y2="${gy - 30}" stroke="#fff" stroke-width="1.6"/>`;
  s += `<path d="M${gx + 3} ${gy - 30} h15 l-4 5 l4 5 h-15z" fill="#C29D63"/>`;
  s += `<rect x="${t.x - 12}" y="${t.y - 6}" width="24" height="12" rx="2" fill="#9CCB9F"/>`;
  for (let k = 0; k < 38; k++) {
    const side = r() < 0.5 ? -1 : 1;
    const y = 10 + r() * (H - 20);
    const pr = (t.y - y) / (t.y - gy);
    const c = pr < 0 || pr > 1 ? 100 : (1 - pr) * (1 - pr) * t.x + 2 * (1 - pr) * pr * cx + pr * pr * gx;
    const x = c + side * (44 + r() * 40);
    if (x < 4 || x > 196) continue;
    s += `<circle cx="${x}" cy="${y}" r="${6 + r() * 7}" fill="${r() < 0.5 ? '#132B21' : '#1A3A2C'}"/>`;
  }
  return s + '</svg>';
}

/** Background for a hole: drawn map, with the real hole image layered on top when it loads. */
export function holeMedia(d: Hole, lazy = false): string {
  return drawHole(d) + `<img src="${d.image}" alt="" ${lazy ? 'loading="lazy"' : ''} onerror="this.remove()">`;
}
