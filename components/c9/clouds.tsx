'use client';

import { useEffect, useRef } from 'react';

/*
  Nuvem em retícula (halftone) desenhada num <canvas>: a nuvem é a união de
  "puffs" (círculos) e "banks" (fileiras de puffs sorteados), com textura de
  ruído fbm; cada ponto da grade ganha raio pela densidade. Render em 2x.

  Sem largura fixa (`w`), o canvas ocupa a largura do pai e as coordenadas x
  dos puffs são escritas para 1440px e escaladas; redesenha quando o pai muda
  de largura. As cores saem dos tokens do `.c9` (nunca literal):
  `col` é o nome de um token (`far`, `sky-4`, `ht-post`…) ou uma rampa
  vertical (`sky`, `rise`, `near`). É decoração: aria-hidden, e sem JS a
  seção continua legível (o degradê do fundo segue lá).
*/

type Puff = [x: number, y: number, r: number];
type Bank = { y: number; rmin: number; rmax: number; jit?: number; step?: number };
export type Ramp = 'sky' | 'rise' | 'near';

export interface CloudsProps {
  w?: number;
  h?: number;
  seed?: number;
  cell?: number;
  ang?: number;
  col: Ramp | string;
  puffs?: Puff[];
  banks?: Bank[];
  body?: { y: number; soft?: number };
  base?: number;
  tex?: number;
  ns?: number;
  pow?: number;
  className?: string;
}

const RAMPS: Record<Ramp, (y: number) => string> = {
  sky: (y) => (y < 0.3 ? 'sky-4' : y < 0.5 ? 'sky-3' : 'sky-2'),
  rise: (y) => (y < 0.4 ? 'sky-2' : y < 0.62 ? 'sky-3' : 'sky-4'),
  near: (y) => (y < 0.82 ? 'sky-2' : y < 0.9 ? 'sky-3' : 'sky-4'),
};

function draw(cv: HTMLCanvasElement, o: CloudsProps) {
  const parent = cv.parentElement;
  if (!parent) return;
  const W = o.w || Math.max(parent.offsetWidth, 320);
  const H = o.h || 900;
  const q = 2;
  const kx = o.w ? 1 : W / 1440;
  cv.width = W * q;
  cv.height = H * q;
  cv.style.width = `${W}px`;
  cv.style.height = `${H}px`;
  const c = cv.getContext('2d');
  if (!c) return;
  c.setTransform(q, 0, 0, q, 0, 0);
  c.clearRect(0, 0, W, H);

  const css = getComputedStyle(cv);
  const tok = (n: string) => css.getPropertyValue(`--${n}`).trim();
  const ramp = (RAMPS as Record<string, (y: number) => string>)[o.col];
  const cache = new Map<string, string>();
  const colour = (y: number) => {
    const name = ramp ? ramp(y) : o.col;
    let v = cache.get(name);
    if (!v) {
      v = tok(name);
      cache.set(name, v);
    }
    return v;
  };

  const seed = o.seed || 7;
  let s = seed;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const hs = (i: number, j: number) => {
    const v = Math.sin(i * 127.1 + j * 311.7 + seed * 17.3) * 43758.5453;
    return v - Math.floor(v);
  };
  const vn = (x: number, y: number) => {
    const i = Math.floor(x), j = Math.floor(y), fx = x - i, fy = y - j;
    const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
    const a = hs(i, j), b = hs(i + 1, j), e = hs(i, j + 1), d = hs(i + 1, j + 1);
    return a + (b - a) * u + (e - a) * v + (a - b - e + d) * u * v;
  };
  const fbm = (x: number, y: number) => {
    let t = 0, a = 0.5, f = 1;
    for (let k = 0; k < 4; k++) {
      t += a * vn(x * f, y * f);
      f *= 2.03;
      a *= 0.5;
    }
    return t;
  };

  const P: Puff[] = (o.puffs || []).map((p) => [p[0] * kx, p[1], p[2]]);
  (o.banks || []).forEach((b) => {
    let x = -80;
    while (x < W + 80) {
      const r = b.rmin + rnd() * (b.rmax - b.rmin);
      P.push([x, b.y + (rnd() - 0.5) * (b.jit ?? 40), r]);
      x += r * (b.step || 1.05);
    }
  });

  const B = o.body, ns = o.ns || 110, base = o.base ?? 0.72, tex = o.tex ?? 0.7, pw = o.pow ?? 0.55;
  const dens = (x: number, y: number) => {
    let m = 0;
    for (const p of P) {
      const dx = x - p[0], dy = y - p[1];
      const t = 1 - Math.sqrt(dx * dx + dy * dy) / p[2];
      if (t > m) m = t;
    }
    if (B && y > B.y) m = Math.max(m, Math.min(1, 0.6 + (y - B.y) / (B.soft || 220)));
    if (m <= 0) return 0;
    return Math.max(0, Math.min(1, Math.pow(m, pw) * (base + tex * (fbm(x / ns, y / ns) - 0.5))));
  };

  const cell = o.cell || 8;
  const an = ((o.ang ?? 45) * Math.PI) / 180, ca = Math.cos(an), sa = Math.sin(an);
  const R = Math.hypot(W, H) / 2 + cell;
  for (let u = -R; u <= R; u += cell) {
    for (let v = -R; v <= R; v += cell) {
      const x = W / 2 + u * ca - v * sa, y = H / 2 + u * sa + v * ca;
      if (x < -cell || y < -cell || x > W + cell || y > H + cell) continue;
      const d = dens(x, y);
      const r = cell * 0.56 * Math.sqrt(Math.max(0, d));
      if (r < 0.35) continue;
      c.fillStyle = colour(y / H);
      c.beginPath();
      c.arc(x, y, r, 0, 6.2832);
      c.fill();
    }
  }
}

export function Clouds({ className, ...o }: CloudsProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const opts = JSON.stringify(o);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const props = JSON.parse(opts) as CloudsProps;
    draw(cv, props);
    if (props.w || !cv.parentElement) return;
    let last = cv.parentElement.offsetWidth;
    let t: ReturnType<typeof setTimeout> | undefined;
    const ro = new ResizeObserver(() => {
      const now = cv.parentElement?.offsetWidth ?? last;
      if (now === last) return;
      last = now;
      clearTimeout(t);
      t = setTimeout(() => draw(cv, props), 150);
    });
    ro.observe(cv.parentElement);
    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [opts]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}

/* Grão de revista (feTurbulence em overlay). `id` precisa ser único na página. */
export function Grain({ id }: { id: string }) {
  return (
    <svg className="gr" aria-hidden="true">
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves={3} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}

/* Os dois bancos que sempre fecham a hero noturna (longe e perto). */
export function HeroClouds({ h = 940 }: { h?: number }) {
  return (
    <>
      <Clouds h={h} seed={4} cell={5} ang={0} col="far" base={0.62}
        puffs={[[90, 700, 190], [300, 660, 150], [1150, 640, 160], [1350, 690, 200], [1440, 780, 180], [0, 840, 200]]}
        body={{ y: 860, soft: 120 }} />
      <Clouds h={h} seed={13} cell={6} ang={0} col="near"
        puffs={[[60, 830, 170], [250, 870, 150], [420, 900, 130], [1020, 900, 130], [1190, 860, 150], [1380, 820, 180], [720, 950, 140]]}
        body={{ y: 900, soft: 60 }} />
    </>
  );
}

/* Teto e chão de uma faixa escura: nuvem descendo do papel e subindo para ele. */
export function BandClouds({ seed, endBand = false }: { seed: number; endBand?: boolean }) {
  return (
    <>
      <Clouds h={380} seed={seed} cell={6} ang={0} col="sky"
        banks={[{ y: 10, rmin: 110, rmax: 190, jit: 30 }, { y: 120, rmin: 55, rmax: 105, jit: 70, step: 1.5 }]} />
      {endBand ? (
        <Clouds className="bot" h={420} seed={seed + 2} cell={6} ang={0} col="rise"
          banks={[{ y: 180, rmin: 60, rmax: 130, jit: 80, step: 1.35 }, { y: 270, rmin: 100, rmax: 180, jit: 40 }]}
          body={{ y: 300, soft: 80 }} />
      ) : (
        <Clouds className="bot" h={380} seed={seed + 2} cell={6} ang={0} col="rise"
          banks={[{ y: 170, rmin: 60, rmax: 120, jit: 70, step: 1.4 }, { y: 250, rmin: 90, rmax: 170, jit: 40 }]}
          body={{ y: 270, soft: 80 }} />
      )}
    </>
  );
}
