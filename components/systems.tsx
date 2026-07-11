'use client';

import Image from 'next/image';
import { BarChart3, Bot, Layers } from 'lucide-react';
import type { ContentType, SystemIcon } from '@/lib/content';
import { Reveal } from './reveal';

const icons: Record<SystemIcon, React.ReactNode> = {
  performance: <BarChart3 size={28} strokeWidth={1.5} />,
  intelligence: <Bot size={28} strokeWidth={1.5} />,
  experience: <Layers size={28} strokeWidth={1.5} />,
};

const CELL_IMAGE =
  'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1000&q=70';

export function Systems({ t }: { t: ContentType }) {
  const [performance, intelligence, experience] = t.systems.items;

  return (
    <section id="sistemas" className="border-t border-line bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <h2 className="text-4xl font-extrabold tracking-tighter md:text-5xl">
            {t.systems.title}
          </h2>
          <p className="mt-4 max-w-[50ch] text-lg text-muted">{t.systems.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 md:grid-rows-2">
          <Reveal className="md:row-span-2">
            <article className="relative flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-[20px] bg-deep p-8 text-white md:p-10">
              <Image
                src={CELL_IMAGE}
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-25"
              />
              <div className="relative">
                <div className="mb-5 inline-flex rounded-full bg-white/10 p-3">
                  {icons[performance.icon]}
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{performance.title}</h3>
                <p className="mt-3 max-w-[40ch] leading-relaxed text-white/75">
                  {performance.desc}
                </p>
              </div>
            </article>
          </Reveal>

          {[intelligence, experience].map((item, i) => (
            <Reveal key={item.icon} delay={0.08 * (i + 1)}>
              <article className="flex h-full flex-col rounded-[20px] border border-line bg-background p-8 md:p-10">
                <div className="mb-5 inline-flex self-start rounded-full bg-tint p-3 text-primary">
                  {icons[item.icon]}
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
                <p className="mt-3 max-w-[44ch] leading-relaxed text-muted">{item.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
