import Image from 'next/image';
import { Check, HeartHandshake, LayoutDashboard, MoveRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CITY, LEGAL_ID, LEGAL_NAME } from '@/lib/content';
import type { SosPage } from '@/lib/sos-content';
import { Reveal } from '@/components/reveal';
import { SosForm } from '@/components/sos/sos-form';

const CLOUDS =
  'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1600&q=80';
const NIGHT =
  'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1600&q=70';

const wrap = 'mx-auto max-w-6xl px-5 md:px-8';
const band = 'py-20 md:py-28';
const h2 = 'text-[2.125rem] font-extrabold leading-[1.05] tracking-tighter md:text-[2.875rem]';
const lede = 'mt-4 max-w-[46ch] text-lg leading-relaxed text-muted md:text-[19px]';

function Well({ icon: Icon, onWhite }: { icon: LucideIcon; onWhite?: boolean }) {
  return (
    <span
      className={`flex size-[46px] flex-none items-center justify-center rounded-full text-primary ${onWhite ? 'bg-background' : 'bg-tint'}`}
    >
      <Icon size={22} strokeWidth={1.5} aria-hidden />
    </span>
  );
}

function Grain({ id }: { id?: string }) {
  return (
    <svg className="grain-layer pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      {id && (
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
      )}
      <rect width="100%" height="100%" filter={`url(#${id ?? 'lp-grain'})`} />
    </svg>
  );
}

function Hero({ page }: { page: SosPage }) {
  const night = page.variant === 'night';
  return (
    <section
      className={`relative overflow-hidden text-background ${night ? 'lp-night pb-20 md:pb-32' : 'lp-sky lp-fade pb-44 md:pb-56'}`}
    >
      {night ? (
        <div className="lp-texture pointer-events-none absolute inset-0" aria-hidden>
          <Image src={NIGHT} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
      ) : (
        <div className="lp-clouds pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[260px] md:h-[340px]">
          <Image
            src={CLOUDS}
            alt="Mar de nuvens visto de cima, com céu limpo acima da camada"
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>
      )}
      <Grain id="lp-grain" />

      <div className={`relative z-20 ${wrap}`}>
        <nav className="flex h-16 items-center justify-between md:h-[72px]">
          {/* Logo sem link: LP de anúncio não manda o visitante pra home. */}
          <span className="text-[22px] font-extrabold tracking-tighter">
            C9<span className="opacity-60">.</span>
          </span>
          <div className="flex items-center gap-2.5">
            <a
              href={page.nav.secondaryHref}
              className="hidden h-10 items-center rounded-full border border-background/40 px-5 text-sm font-bold transition-colors hover:border-background hover:bg-background/10 sm:inline-flex"
            >
              {page.nav.secondary}
            </a>
            <a
              href="#form"
              className="inline-flex h-10 items-center rounded-full bg-background px-5 text-sm font-bold text-primary transition-colors hover:bg-tint active:translate-y-px"
            >
              {page.nav.primary}
            </a>
          </div>
        </nav>

        <div className="grid items-start gap-10 pt-8 md:pt-14 lg:grid-cols-[1fr_460px] lg:gap-[72px]">
          <div>
            <span className="rise inline-flex h-[30px] items-center gap-2 rounded-full bg-background/12 px-3.5 text-[13.5px] font-bold">
              <i
                className={`size-2 rounded-full ${night ? 'bg-[var(--lp-moon)]' : 'bg-background'} shadow-[0_0_0_4px_color-mix(in_oklch,currentColor_20%,transparent)]`}
              />
              {page.offer}
            </span>
            <h1 className="rise rise-1 mt-5 text-[clamp(2.5rem,7vw,4.125rem)] font-extrabold leading-[1.03] tracking-tighter">
              {page.hero.headline}
              {page.hero.headlineAccent && (
                <>
                  {' '}
                  <span className="text-[var(--lp-moon)]">{page.hero.headlineAccent}</span>
                </>
              )}
            </h1>
            <p className="rise rise-2 mt-5 max-w-[44ch] text-lg leading-relaxed text-background/80 md:text-[19px]">
              {page.hero.lead && <strong className="font-bold text-background">{page.hero.lead} </strong>}
              {page.hero.sub}
            </p>

            {page.hero.facts && (
              <dl className="rise rise-3 mt-8 grid grid-cols-3 border-t border-background/25 sm:inline-grid md:mt-10">
                {page.hero.facts.map((f) => (
                  <div
                    key={f.label}
                    className="border-r border-background/25 px-3 pt-5 first:pl-0 last:border-r-0 last:pr-0 sm:px-6"
                  >
                    <dt className="font-mono text-xl font-medium tracking-tight sm:text-2xl md:text-[28px]">{f.value}</dt>
                    <dd className="mt-1 text-[13px] leading-snug text-background/75 sm:text-sm">{f.label}</dd>
                  </div>
                ))}
              </dl>
            )}

            {page.hero.tools && (
              <div className="rise rise-3 mt-8 md:mt-9">
                <p className="mb-3 text-sm text-background/60">{page.hero.tools.label}</p>
                <ul className="flex flex-wrap gap-2">
                  {page.hero.tools.items.map((tool) => (
                    <li
                      key={tool}
                      className="inline-flex h-9 items-center rounded-full border border-background/20 bg-background/5 px-4 text-[14.5px] font-bold"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="rise rise-2">
            <SosForm copy={page.form} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Signs({ page }: { page: SosPage }) {
  const s = page.signs;
  return (
    <section className={`bg-background ${band}`}>
      <div className={wrap}>
        <Reveal className="max-w-[50ch]">
          <h2 className={h2}>{s.title}</h2>
          <p className={lede}>{s.lede}</p>
        </Reveal>
        <ul className="mt-12 grid md:mt-14 md:grid-cols-2 md:gap-x-[72px]">
          {s.items.map((item) => (
            <li key={item.text} className="flex items-center gap-4 border-t border-line py-5">
              <Well icon={item.icon} />
              <span className="text-[17px] font-medium leading-snug tracking-tight md:text-[17.5px]">{item.text}</span>
            </li>
          ))}
        </ul>
        {s.relief && (
          <Reveal className="mt-10 flex flex-col items-start gap-4 rounded-[20px] bg-tint p-6 sm:flex-row sm:gap-5 md:mt-12 md:p-8">
            <Well icon={HeartHandshake} onWhite />
            <p className="max-w-[60ch] text-lg font-medium leading-relaxed tracking-tight md:text-[19px]">
              <strong className="font-extrabold text-primary">{s.relief.strong}</strong> {s.relief.rest}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Mechanism({ page }: { page: SosPage }) {
  const m = page.mechanism;
  if (!m) return null;
  return (
    <section className={`bg-surface ${band}`}>
      <div className={`${wrap} grid gap-12 lg:grid-cols-2 lg:gap-24`}>
        <Reveal>
          <p className="text-[1.875rem] font-extrabold leading-[1.12] tracking-tighter md:text-[2.5rem]">
            {m.quote} <span className="text-primary">{m.quoteAccent}</span>
          </p>
          <p className="mt-5 max-w-[40ch] leading-relaxed text-muted">{m.by}</p>
        </Reveal>
        <div>
          <h2 className="text-[1.75rem] font-extrabold leading-[1.1] tracking-tighter md:text-[2.125rem]">{m.title}</h2>
          <ul className="mt-8">
            {m.reasons.map((r, i) => (
              <li
                key={r.title}
                className={`grid grid-cols-[46px_1fr] gap-5 py-6 ${i ? 'border-t border-line' : 'pt-0'}`}
              >
                <Well icon={r.icon} onWhite />
                <div>
                  <h3 className="text-[19px] font-extrabold tracking-tight">{r.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{r.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Cost({ page }: { page: SosPage }) {
  const c = page.cost;
  const tone = page.mechanism ? 'bg-background' : 'bg-surface';
  return (
    <section id={c.id} className={`scroll-mt-4 ${tone} ${band}`}>
      <div className={wrap}>
        <Reveal className="max-w-[50ch]">
          <h2 className={h2}>{c.title}</h2>
          <p className={lede}>{c.lede}</p>
        </Reveal>
        <div className="mt-12 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
          {c.cards.map((card, i) => (
            <Reveal
              key={card.title}
              delay={0.05 * i}
              className="flex gap-5 rounded-[20px] border border-line bg-background p-6 md:p-8"
            >
              <Well icon={card.icon} />
              <div>
                <h3 className="text-xl font-extrabold leading-tight tracking-tight">{card.title}</h3>
                <p className="mt-2.5 text-[15.5px] leading-relaxed text-muted">{card.body}</p>
                {card.tech && (
                  <span className="mt-3.5 inline-block rounded-full bg-tint px-3 py-1 font-mono text-[12.5px] text-primary">
                    {card.tech}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        {c.note && <p className="mt-7 max-w-[70ch] text-[14.5px] leading-relaxed text-muted">{c.note}</p>}
      </div>
    </section>
  );
}

function Steps({ page }: { page: SosPage }) {
  const s = page.steps;
  const tone = page.mechanism ? 'bg-surface' : 'bg-background';
  return (
    <section className={`${tone} ${band}`}>
      <div className={wrap}>
        <Reveal className="max-w-[50ch]">
          <h2 className={h2}>{s.title}</h2>
          <p className={lede}>{s.lede}</p>
        </Reveal>
        <ol className="mt-12 grid border-t border-line md:mt-14 md:grid-cols-3">
          {s.items.map((step, i) => (
            <li
              key={step.title}
              className={`py-8 md:py-0 md:pt-8 ${i ? 'border-t border-line md:border-l md:border-t-0 md:pl-9' : ''} md:pr-9`}
            >
              <span className="font-mono text-[15px] font-medium text-primary">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 text-[22px] font-extrabold tracking-tight">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
              {step.highlight && (
                <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-tint px-3 py-1.5 text-[13px] font-bold text-primary">
                  <LayoutDashboard size={16} strokeWidth={1.5} aria-hidden />
                  {step.highlight}
                </span>
              )}
              {step.tags && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full border border-line px-3 py-1 text-[13px] font-bold ${tag.startsWith('R$') ? 'font-mono font-medium' : ''}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Pricing({ page }: { page: SosPage }) {
  const p = page.pricing;
  if (!p) return null;
  return (
    <section id={p.id} className={`scroll-mt-4 bg-surface ${band}`}>
      <div className={wrap}>
        <Reveal className="max-w-[50ch]">
          <h2 className={h2}>{p.title}</h2>
          <p className={lede}>{p.lede}</p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          {p.plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-[20px] bg-background p-7 md:p-10 ${
                plan.featured
                  ? 'border-2 border-primary shadow-[0_24px_60px_-30px_color-mix(in_oklch,var(--primary)_60%,transparent)]'
                  : 'border border-line'
              }`}
            >
              {plan.featured && (
                <span className="mb-4 self-start rounded-full bg-primary px-3 py-1 text-[12.5px] font-bold text-background">
                  {plan.featured}
                </span>
              )}
              <span className="text-[15px] font-medium text-muted">{plan.who}</span>
              <h3 className="mt-2 text-[28px] font-extrabold tracking-tight">{plan.name}</h3>
              <p className="mt-4 text-[15.5px] leading-relaxed text-muted">{plan.pitch}</p>
              <ul className="mt-7 grid gap-3.5 border-t border-line pt-6">
                {plan.items.map((item) => (
                  <li key={item} className="flex gap-3 leading-normal">
                    <Check size={20} strokeWidth={1.5} className="mt-0.5 flex-none text-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <a
                  href="#form"
                  className={`inline-flex h-[52px] w-full items-center justify-center rounded-full font-bold transition-colors active:translate-y-px ${
                    plan.featured
                      ? 'bg-primary text-background hover:bg-primary-hover'
                      : 'border border-line hover:border-primary hover:text-primary'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq({ page }: { page: SosPage }) {
  return (
    <section className={`bg-background ${band}`}>
      <div className={wrap}>
        <h2 className={h2}>O que costumam perguntar.</h2>
        <dl className="mt-10 md:mt-12">
          {page.faq.map((item) => (
            <div
              key={item.q}
              className="grid gap-3 border-t border-line py-7 last:border-b md:grid-cols-[360px_1fr] md:gap-14"
            >
              <dt className="text-[19px] font-bold leading-snug tracking-tight">{item.q}</dt>
              <dd className="max-w-[58ch] leading-relaxed text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Close({ page }: { page: SosPage }) {
  return (
    <section className="lp-close relative overflow-hidden py-24 text-center text-background md:py-32">
      <Grain />
      <div className={`relative z-10 ${wrap}`}>
        <h2 className="mx-auto max-w-[22ch] text-[2.375rem] font-extrabold leading-[1.05] tracking-tighter md:text-[3.375rem]">
          {page.close.title}
        </h2>
        <p className="mx-auto mt-5 max-w-[46ch] text-lg leading-relaxed text-background/80 md:text-[19px]">
          {page.close.body}
        </p>
        <a
          href="#form"
          className="group mt-9 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-background px-8 text-base font-bold text-primary transition-colors hover:bg-tint active:translate-y-px"
        >
          {page.close.cta}
          <MoveRight size={20} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}

function Footer({ page }: { page: SosPage }) {
  return (
    <footer className="bg-deep py-10 text-sm text-background/60">
      <div className={`${wrap} flex flex-col gap-3 md:flex-row md:items-center md:justify-between`}>
        <span className="text-xl font-extrabold tracking-tighter text-background">
          C9<span className="opacity-60">.</span>
        </span>
        <p>{page.footer}</p>
        <p>
          {LEGAL_NAME} · {LEGAL_ID} · {CITY}
        </p>
      </div>
    </footer>
  );
}

export function SosLanding({ page }: { page: SosPage }) {
  return (
    <div className="lp-lock">
      <main>
        <Hero page={page} />
        <Signs page={page} />
        <Mechanism page={page} />
        <Cost page={page} />
        <Steps page={page} />
        <Pricing page={page} />
        <Faq page={page} />
        <Close page={page} />
      </main>
      <Footer page={page} />
    </div>
  );
}
