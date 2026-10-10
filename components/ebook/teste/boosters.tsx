'use client';

/*
  Reforços de urgência e dopamina das variantes de teste (?v=urgencia,
  dopamina, combo). Contador, estoque, "pessoas vendo" e preço riscado saíram
  depois da simulação de 10/10 (vendiam menos). Os compradores são fictícios:
  só renderizam com a variante ativa. Cada
  interação vai ao pixel como TestInteraction, com `test_variant`.
*/

import { useEffect, useRef, useState } from 'react';
import { Gift, Sparkles, X } from 'lucide-react';
import { EBOOK_LOGISTICA, trackCustom } from '@/lib/meta-pixel';
import { BuyButton } from '../buy-button';

function interaction(variant: string | undefined, action: string, extra?: Record<string, unknown>) {
  trackCustom('TestInteraction', {
    action,
    content_ids: EBOOK_LOGISTICA.content_ids,
    ...(variant && { test_variant: variant }),
    ...extra,
  });
}

/* ---------- Urgência ---------- */

const BUYERS = [
  ['Fernanda', 'Campinas/SP'],
  ['Rodrigo', 'Cajamar/SP'],
  ['Juliana', 'Contagem/MG'],
  ['Marcos', 'Itajaí/SC'],
  ['Patrícia', 'Duque de Caxias/RJ'],
  ['Anderson', 'Barueri/SP'],
  ['Camila', 'Joinville/SC'],
  ['Lucas', 'Simões Filho/BA'],
  ['Aline', 'Guarulhos/SP'],
  ['Eduardo', 'Betim/MG'],
];

export function PurchaseToasts() {
  const [i, setI] = useState(-1);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let n = 0;
    const show = () => {
      setI(n % BUYERS.length);
      setShown(true);
      n += 1;
      window.setTimeout(() => setShown(false), 4500);
    };
    const first = window.setTimeout(show, 6000);
    const timer = window.setInterval(show, 14000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, []);

  if (i < 0) return null;
  const [name, city] = BUYERS[i];
  const mins = (i % 9) + 1;

  return (
    <div
      aria-live="polite"
      className={`fixed bottom-20 left-3 z-[55] flex max-w-[19rem] items-center gap-3 rounded-2xl border border-line bg-background p-3 pr-4 text-ink shadow-[0_12px_40px_-12px_oklch(0.2_0.05_250/0.45)] transition-all duration-500 md:bottom-5 md:left-5 ${shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <span className="flex size-10 flex-none items-center justify-center rounded-full bg-[oklch(0.94_0.05_150)] font-extrabold text-[oklch(0.45_0.12_150)]">
        {name[0]}
      </span>
      <p className="text-[13.5px] leading-snug">
        <strong className="font-bold">{name}</strong> de {city} comprou o guia
        <span className="block text-muted">há {mins} min · Pix confirmado</span>
      </p>
    </div>
  );
}

export function ExitIntent({ variant }: { variant?: string }) {
  const [open, setOpen] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    const trigger = () => {
      if (fired.current) return;
      fired.current = true;
      setOpen(true);
      interaction(variant, 'exit_intent_shown');
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    /* Celular não tem mouse saindo: abre ao voltar a rolar para cima depois de passar da metade. */
    let maxY = 0;
    const onScroll = () => {
      maxY = Math.max(maxY, window.scrollY);
      const half = document.documentElement.scrollHeight / 2;
      if (maxY > half && window.scrollY < maxY - 900) trigger();
    };
    document.addEventListener('mouseout', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('mouseout', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, [variant]);

  if (!open) return null;

  const close = () => {
    setOpen(false);
    interaction(variant, 'exit_intent_closed');
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-[oklch(0.15_0.03_255/0.6)] p-3 sm:items-center" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-md rounded-3xl bg-background p-7 text-ink">
        <button type="button" onClick={close} className="absolute top-4 right-4 text-muted" aria-label="Fechar">
          <X size={22} />
        </button>
        <Gift size={34} className="text-[oklch(0.58_0.2_27)]" aria-hidden />
        <h2 className="mt-3 text-[1.75rem] font-extrabold leading-tight tracking-tighter">Espera! Não vai embora sem isso.</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Comprando agora você leva <strong className="text-ink">de bônus</strong> a planilha de exemplo pronta e o roteiro
          para convencer seu gestor. <strong className="text-ink">Só nesta visita.</strong>
        </p>
        <p className="mt-5 text-[2rem] font-extrabold leading-none tracking-tighter">R$ 17,90</p>
        <BuyButton
          variant={variant}
          placement="exit"
          className="mt-5 flex h-14 w-full items-center justify-center rounded-full bg-[oklch(0.55_0.2_27)] text-[17px] font-bold text-white"
        >
          Quero com o bônus
        </BuyButton>
        <button type="button" onClick={close} className="mt-3 w-full text-sm text-muted underline">
          Não, prefiro continuar perdendo tempo no PROCV
        </button>
      </div>
    </div>
  );
}

/* ---------- Dopamina ---------- */

export function confetti(origin?: { x: number; y: number }) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const colors = ['#22c55e', '#f59e0b', '#ef4444', '#3b82f6', '#a855f7', '#facc15'];
  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? window.innerHeight / 2;
  for (let k = 0; k < 70; k += 1) {
    const el = document.createElement('i');
    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 220;
    el.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:8px;height:12px;border-radius:2px;pointer-events:none;z-index:80;background:${colors[k % colors.length]};`;
    document.body.appendChild(el);
    el.animate(
      [
        { transform: 'translate(0,0) rotate(0)', opacity: 1 },
        {
          transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist + 260}px) rotate(${Math.random() * 720}deg)`,
          opacity: 0,
        },
      ],
      { duration: 1100 + Math.random() * 600, easing: 'cubic-bezier(.2,.7,.3,1)' },
    ).onfinish = () => el.remove();
  }
}

export function ScrollProgress() {
  const [pct, setPct] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const p = Math.min(100, (window.scrollY / Math.max(1, doc.scrollHeight - window.innerHeight)) * 100);
      setPct(p);
      if (p >= 90) setUnlocked((was) => {
        if (!was) confetti({ x: window.innerWidth / 2, y: 80 });
        return true;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[65] h-1.5 bg-black/10" aria-hidden>
      <div
        className="h-full bg-gradient-to-r from-[oklch(0.75_0.18_150)] via-[oklch(0.82_0.17_85)] to-[oklch(0.65_0.22_27)] transition-[width] duration-150"
        style={{ width: `${pct}%` }}
      />
      {unlocked && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-[oklch(0.82_0.17_85)] px-3 py-1.5 text-[12.5px] font-extrabold text-[oklch(0.3_0.08_70)] shadow-lg">
          <Sparkles size={14} aria-hidden /> Bônus desbloqueado!
        </div>
      )}
    </div>
  );
}

const CROSS_ROWS = [
  { label: 'batem', value: 18, tone: 'bg-[oklch(0.95_0.04_155)] text-[oklch(0.45_0.12_155)]' },
  { label: 'diferentes', value: 4, tone: 'bg-[oklch(0.95_0.04_70)] text-[oklch(0.5_0.14_55)]' },
  { label: 'faltam', value: 3, tone: 'bg-[oklch(0.94_0.04_20)] text-[oklch(0.5_0.18_25)]' },
  { label: 'duplicado', value: 1, tone: 'bg-[oklch(0.94_0.04_280)] text-[oklch(0.45_0.14_280)]' },
];

function CountUp({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let v = 0;
    const timer = window.setInterval(() => {
      v += 1;
      setN(v);
      if (v >= to) window.clearInterval(timer);
    }, Math.max(30, 700 / to));
    return () => window.clearInterval(timer);
  }, [to, run]);
  return <>{n}</>;
}

export function InteractiveCross({ variant }: { variant?: string }) {
  const [state, setState] = useState<'idle' | 'running' | 'done'>('idle');

  const run = (e: React.MouseEvent) => {
    if (state !== 'idle') return;
    const { clientX, clientY } = e;
    setState('running');
    interaction(variant, 'cross_clicked');
    window.setTimeout(() => {
      setState('done');
      confetti({ x: clientX, y: clientY });
    }, 1400);
  };

  return (
    <div className="rounded-3xl border-2 border-primary bg-tint p-6">
      <p className="font-mono text-[12.5px] uppercase tracking-[0.08em] text-primary">Faça você mesmo</p>
      <h3 className="mt-2 text-[22px] font-extrabold leading-tight tracking-tight">Aperte e veja 26 pedidos cruzados na hora.</h3>
      <div className="mt-5 grid grid-cols-2 gap-2.5">
        {CROSS_ROWS.map((r, i) => (
          <div
            key={r.label}
            className={`rounded-2xl p-4 transition-all duration-500 ${r.tone} ${state === 'idle' ? 'scale-95 opacity-30' : 'scale-100 opacity-100'}`}
            style={{ transitionDelay: state === 'idle' ? '0s' : `${i * 0.25}s` }}
          >
            <p className="font-mono text-[2rem] font-bold leading-none">
              <CountUp to={r.value} run={state !== 'idle'} />
            </p>
            <p className="mt-1 text-sm font-semibold">{r.label}</p>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={run}
        disabled={state !== 'idle'}
        className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-[17px] font-bold text-background transition-transform active:scale-[0.98] disabled:opacity-90"
      >
        {state === 'idle' && <>Cruzar as planilhas agora</>}
        {state === 'running' && <>Cruzando…</>}
        {state === 'done' && <>Pronto em 1,4 segundo. Sem PROCV. 🎉</>}
      </button>
    </div>
  );
}

const TASKS = [
  { label: 'Conferir atrasados', hours: 3 },
  { label: 'Cruzar WMS × transportadora', hours: 4 },
  { label: 'Auditar fatura de frete', hours: 3 },
  { label: 'Montar relatório da semana', hours: 2 },
  { label: 'Escrever cobranças e avisos', hours: 2 },
];
const HOUR_VALUE = 20;

export function SavingsCalculator({ variant }: { variant?: string }) {
  const [picked, setPicked] = useState<boolean[]>(TASKS.map(() => false));
  const hours = TASKS.reduce((sum, t, i) => sum + (picked[i] ? t.hours : 0), 0);
  const monthHours = hours * 4;
  const money = monthHours * HOUR_VALUE;

  const toggle = (i: number, e: React.MouseEvent) => {
    const next = picked.map((p, k) => (k === i ? !p : p));
    setPicked(next);
    if (next[i]) confetti({ x: e.clientX, y: e.clientY });
    interaction(variant, 'calculator_toggle', { task: TASKS[i].label, checked: next[i] });
  };

  return (
    <div className="rounded-3xl bg-deep p-6 text-background">
      <p className="font-mono text-[12.5px] uppercase tracking-[0.08em] text-[var(--lp-moon)]">Calcule</p>
      <h3 className="mt-2 text-[22px] font-extrabold leading-tight tracking-tight">Quanto tempo o PROCV rouba de você?</h3>
      <p className="mt-1 text-sm text-background/70">Toque no que você faz toda semana.</p>
      <div className="mt-5 grid gap-2">
        {TASKS.map((t, i) => (
          <button
            key={t.label}
            type="button"
            onClick={(e) => toggle(i, e)}
            aria-pressed={picked[i]}
            className={`flex min-h-12 items-center justify-between rounded-xl px-4 text-left text-[15px] font-semibold transition-colors ${picked[i] ? 'bg-[oklch(0.75_0.18_150)] text-[oklch(0.2_0.05_150)]' : 'bg-background/10'}`}
          >
            {t.label}
            <span className="font-mono text-sm">{picked[i] ? '✓' : `${t.hours} h`}</span>
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-background/10 p-5 text-center">
        <p className="text-sm text-background/75">Você perde por mês</p>
        <p className="mt-1 font-mono text-[2.5rem] font-bold leading-none tabular-nums">{monthHours} h</p>
        <p className="mt-2 text-lg font-bold">
          = R$ {money.toLocaleString('pt-BR')} do seu tempo
        </p>
        {hours > 0 && (
          <p className="mt-3 rounded-full bg-[oklch(0.82_0.17_85)] px-3 py-1.5 text-sm font-extrabold text-[oklch(0.3_0.08_70)]">
            O guia custa menos que 1 hora disso.
          </p>
        )}
      </div>
    </div>
  );
}
