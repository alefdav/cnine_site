'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { Moon, Sun, Sunrise, Sunset, type LucideIcon } from 'lucide-react';
import {
  DAYPARTS,
  daypartFromHour,
  type ContentType,
  type Daypart,
} from '@/lib/content';

const STORAGE_KEY = 'c9-sky';

const ICONS: Record<Daypart, LucideIcon> = {
  dawn: Sunrise,
  day: Sun,
  dusk: Sunset,
  night: Moon,
};

/*
  O céu vive no atributo `data-daypart` do <html>, escrito antes da primeira
  pintura pelo script de `app/layout.tsx`. O componente lê esse estado externo
  em vez de manter uma cópia própria, então nunca há duas verdades sobre qual
  céu está no ar. Snapshot serializado como "<ativo>|<fixado>".
*/
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readPinned(): Daypart | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Daypart | null;
    return stored && DAYPARTS.includes(stored) ? stored : null;
  } catch {
    return null;
  }
}

function getSnapshot(): string {
  const active = (document.documentElement.dataset.daypart as Daypart) ?? 'night';
  return `${active}|${readPinned() ?? ''}`;
}

/* Durante a hidratação vale o que o HTML trouxe: a noite. */
function getServerSnapshot(): string {
  return 'night|';
}

/* Escrita do estado externo, fora do componente: o <html> é a fonte da verdade. */
function writeSky(next: Daypart, pin: boolean) {
  document.documentElement.setAttribute('data-daypart', next);
  try {
    if (pin) localStorage.setItem(STORAGE_KEY, next);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* localStorage bloqueado: a escolha ainda vale nesta sessão. */
  }
  emit();
}

export function SkySwitch({ t }: { t: ContentType }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [active, pinnedRaw] = snapshot.split('|');
  const pinned = pinnedRaw ? (pinnedRaw as Daypart) : null;

  useEffect(() => {
    // Só depois da primeira pintura, para a carga não animar as cores.
    document.documentElement.classList.add('sky-shift');
  }, []);

  function choose(daypart: Daypart) {
    const backToAuto = pinned === daypart;
    writeSky(
      backToAuto ? daypartFromHour(new Date().getHours()) : daypart,
      !backToAuto,
    );
  }

  return (
    <div
      role="group"
      aria-label={t.sky.label}
      className="flex items-center gap-0.5 rounded-full border border-hero-line p-1"
    >
      {DAYPARTS.map((daypart) => {
        const Icon = ICONS[daypart];
        const isActive = active === daypart;
        const label = t.sky.names[daypart];
        const title = isActive
          ? `${label} · ${pinned === daypart ? t.sky.pinned : t.sky.auto}`
          : label;

        return (
          <button
            key={daypart}
            type="button"
            onClick={() => choose(daypart)}
            aria-pressed={isActive}
            title={title}
            className={[
              'flex h-7 w-7 items-center justify-center rounded-full transition-colors',
              isActive
                ? 'bg-accent text-accent-ink'
                : 'text-hero-soft hover:bg-hero-faint hover:text-hero-ink',
            ].join(' ')}
          >
            <Icon size={15} strokeWidth={1.5} aria-hidden />
            <span className="sr-only">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
