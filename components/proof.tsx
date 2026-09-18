'use client';

import type { ContentType } from '@/lib/content';

export function Proof({ t }: { t: ContentType }) {
  return (
    <section className="border-b border-line bg-background">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {t.proof.items.map((item, i) => (
            <div
              key={item.label}
              className={[
                'border-line py-8 md:py-10',
                i % 2 === 1 ? 'border-l pl-6 md:pl-8' : '',
                i >= 2 ? 'border-t lg:border-t-0' : '',
                i > 0 ? 'lg:border-l lg:pl-8' : '',
                i === 2 ? 'lg:pl-8' : '',
              ].join(' ')}
            >
              <dt className="font-mono text-4xl font-medium tracking-tight text-primary md:text-[2.75rem]">
                {item.value}
              </dt>
              <dd className="mt-2.5 max-w-[22ch] text-sm leading-snug text-muted">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
