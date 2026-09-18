'use client';

import {
  LineChart,
  MessageCircle,
  MonitorSmartphone,
  Phone,
  Search,
  Target,
  type LucideIcon,
} from 'lucide-react';
import type { ContentType, ServiceIcon } from '@/lib/content';
import { Reveal } from '@/components/reveal';

const ICONS: Record<ServiceIcon, LucideIcon> = {
  whatsapp: MessageCircle,
  voice: Phone,
  page: MonitorSmartphone,
  traffic: Target,
  prospect: Search,
  measure: LineChart,
};

export function Services({ t }: { t: ContentType }) {
  return (
    <section id="servicos" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="grid items-end gap-6 lg:grid-cols-2 lg:gap-14">
          <h2 className="text-4xl font-extrabold leading-[1.04] tracking-tighter md:text-5xl">
            {t.services.title}
          </h2>
          <p className="max-w-[48ch] text-lg leading-relaxed text-muted">
            {t.services.lede}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-12">
          {t.services.items.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal key={item.title} delay={0.05 * i}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-tint text-primary">
                  <Icon size={22} strokeWidth={1.5} />
                </span>
                <h3 className="mt-4.5 text-xl font-extrabold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2.5 max-w-[34ch] leading-relaxed text-muted">
                  {item.desc}
                </p>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-14 border-t border-line pt-7 leading-relaxed text-muted">
          <strong className="font-bold text-ink">{t.services.extraLabel}</strong>{' '}
          {t.services.extraText}
        </p>
      </div>
    </section>
  );
}
