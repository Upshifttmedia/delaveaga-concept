import { HOLES, TEES, type TeeKey } from '../data/course';
import { holeMedia } from './holeArt';

const WORDS = ['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen'];
/** How long each image-based hole preview runs (ms). Real videos use their own length. */
const DUR = 9000;

const $ = (id: string) => document.getElementById(id)!;

interface Clock { readonly t: number; play(): void; pause(): void; cancel(): void }

export function initCourseTour() {
  let cur = 0;
  let tee: TeeKey = 'b';
  let playing = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  let inView = false;
  let clock: Clock | null = null;
  let raf = 0;
  let lines: string[] = [];

  const media = $('media');
  const bars = $('bars');

  function setPP() {
    $('pp').setAttribute('aria-label', playing ? 'Pause flyover' : 'Play flyover');
    $('ppicon').innerHTML = playing
      ? '<rect x="2" y="1" width="3.5" height="12" fill="#fff"/><rect x="8.5" y="1" width="3.5" height="12" fill="#fff"/>'
      : '<path d="M3 1l10 6-10 6z" fill="#fff"/>';
  }

  function loadFly(i: number) {
    const h = HOLES[i];
    $('f-num').textContent = String(i + 1);
    $('f-meta').textContent = `Par ${h.par} · ${h.yards[tee]} yds · Hcp ${h.hcpMen}`;
    lines = h.howToPlay.match(/[^.]+\./g) ?? [h.howToPlay];
    [...bars.children].forEach((el, j) => {
      el.className = j < i ? 'done' : '';
      (el.firstElementChild as HTMLElement).style.transform = '';
    });
    clock?.cancel();
    media.getAnimations().forEach((a) => a.cancel());
    const next = () => { if (playing && inView) show(cur + 1); };

    if (h.video) {
      media.innerHTML = `<video muted playsinline preload="auto" src="${h.video}"></video>`;
      const v = media.firstElementChild as HTMLVideoElement;
      v.onended = next;
      v.onerror = () => { h.video = ''; loadFly(i); };
      clock = {
        get t() { return v.duration ? v.currentTime / v.duration : 0; },
        play: () => { v.play().catch(() => {}); },
        pause: () => v.pause(),
        cancel: () => v.pause(),
      };
    } else {
      media.innerHTML = holeMedia(h);
      const a = media.animate(
        [{ transform: 'scale(1.12) translateY(7%)' }, { transform: 'scale(1.5) translateY(-9%)' }],
        { duration: DUR, easing: 'cubic-bezier(.45,0,.4,1)', fill: 'forwards' },
      );
      a.onfinish = next;
      clock = {
        get t() { return Number(a.currentTime ?? 0) / DUR; },
        play: () => a.play(),
        pause: () => a.pause(),
        cancel: () => a.cancel(),
      };
    }
    playing && inView ? clock.play() : clock.pause();
    cancelAnimationFrame(raf);
    loop();
  }

  function loop() {
    if (!clock) return;
    const p = Math.min(1, clock.t);
    (bars.children[cur].firstElementChild as HTMLElement).style.transform = `scaleX(${p})`;
    const li = $('f-line');
    const txt = lines[Math.min(lines.length - 1, Math.floor(p * lines.length))].trim();
    if (li.dataset.t !== txt) {
      li.dataset.t = txt;
      li.style.opacity = '0';
      setTimeout(() => { li.textContent = txt; li.style.opacity = '1'; }, 180);
    }
    raf = requestAnimationFrame(loop);
  }

  function syncPlay() {
    if (!clock) return;
    playing && inView ? clock.play() : clock.pause();
    setPP();
  }

  function renderCard() {
    const sum = (a: number, b: number, f: (h: (typeof HOLES)[number]) => number) =>
      HOLES.slice(a, b).reduce((s, h) => s + f(h), 0);
    const row = (label: string, fn: (h: (typeof HOLES)[number], i: number) => string | number,
      o: string | number, inn: string | number, tot: string | number, head = false, cls = '') => {
      let cells = '';
      HOLES.forEach((h, i) => {
        cells += `<td ${head ? `data-i="${i}" class="${i === cur ? 'sel' : ''}" tabindex="0" role="button" aria-label="Hole ${i + 1}"` : ''}>${fn(h, i)}</td>`;
        if (i === 8) cells += `<td class="sum">${o}</td>`;
      });
      return `<tr class="${cls}"><th>${label}</th>${cells}<td class="sum">${inn}</td><td class="sum">${tot}</td></tr>`;
    };
    const teeRow = (k: TeeKey) => {
      const y = (h: (typeof HOLES)[number]) => h.yards[k];
      return row(TEES[k].name, y, sum(0, 9, y).toLocaleString(), sum(9, 18, y).toLocaleString(),
        sum(0, 18, y).toLocaleString(), false, `tee-${k} ${k === tee ? 'on' : 'dim'}`);
    };
    const par = (h: (typeof HOLES)[number]) => h.par;
    $('card').innerHTML =
      `<thead>${row('Hole', (_h, i) => i + 1, 'Out', 'In', 'Tot', true)}</thead><tbody>` +
      teeRow('b') + teeRow('w') + teeRow('r') +
      row("Men's hcp", (h) => h.hcpMen, '', '', '') +
      row('Par', par, sum(0, 9, par), sum(9, 18, par), sum(0, 18, par)) +
      row("Women's hcp", (h) => h.hcpWomen, '', '', '') + '</tbody>';
    const T = TEES[tee];
    const total = sum(0, 18, (h) => h.yards[tee]).toLocaleString();
    $('teeinfo').innerHTML = `<b>${T.name} tees</b> · ${total} yards · Rating / slope ${T.men} men${T.women ? `, ${T.women} women` : ''}`;
    document.querySelectorAll<HTMLElement>('#card td[data-i]').forEach((td) => {
      td.onclick = () => show(Number(td.dataset.i));
      td.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(Number(td.dataset.i)); } };
    });
  }

  function show(i: number) {
    cur = (i + 18) % 18;
    const h = HOLES[cur];
    $('h-num').textContent = String(cur + 1);
    $('h-lbl').textContent = 'Hole ' + WORDS[cur];
    $('h-par').textContent = String(h.par);
    $('h-yds').textContent = String(h.yards[tee]);
    $('h-hcp').textContent = String(h.hcpMen);
    $('h-hcpw').textContent = String(h.hcpWomen);
    $('h-note').textContent = h.howToPlay;
    $('ep-title').textContent = `Episode ${cur + 1}: ${h.episode}`;
    const b = $('h-badge');
    if (h.badge) { b.hidden = false; b.textContent = h.badge; } else b.hidden = true;
    renderCard();
    loadFly(cur);
    window.dispatchEvent(new CustomEvent('hole:changed', { detail: cur }));
  }

  $('prev').onclick = () => show(cur - 1);
  $('next').onclick = () => show(cur + 1);
  $('tapL').onclick = () => show(cur - 1);
  $('tapR').onclick = () => show(cur + 1);
  $('pp').onclick = () => { playing = !playing; syncPlay(); };
  document.querySelectorAll<HTMLButtonElement>('.tees button').forEach((btn) => {
    btn.onclick = () => {
      tee = btn.dataset.tee as TeeKey;
      document.querySelectorAll('.tees button').forEach((x) => x.setAttribute('aria-pressed', String(x === btn)));
      show(cur);
    };
  });
  // Other sections (the episode strip) can open a hole in the player.
  window.addEventListener('hole:show', (e) => show((e as CustomEvent<number>).detail));

  new IntersectionObserver((es) => { inView = es[0].isIntersecting; syncPlay(); }, { threshold: 0.5 }).observe($('fly'));
  setPP();
  show(0);
}
