'use client';

import { useId, useState, type FormEvent } from 'react';
import { MoveRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/content';
import type { SosForm as SosFormCopy } from '@/lib/sos-content';

/*
  Sem backend: o formulário só monta a mensagem e abre o WhatsApp da C9.
  O número de quem pede chega junto com a mensagem, então não pedimos de novo.
*/
export function SosForm({ copy }: { copy: SosFormCopy }) {
  const id = useId();
  const [choice, setChoice] = useState(copy.choices[0]);
  const [link, setLink] = useState('');

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = [
      copy.messageIntro,
      `${copy.choicePrefix}: ${choice}`,
      `${copy.linkPrefix}: ${link.trim()}`,
    ].join('\n');
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  return (
    <form
      id="form"
      onSubmit={onSubmit}
      className="scroll-mt-24 rounded-[20px] bg-background p-6 text-ink shadow-[0_24px_60px_-20px_rgb(8_30_60/0.45)] sm:p-8"
    >
      <h2 className="text-xl font-extrabold tracking-tight">{copy.title}</h2>
      <p className="mt-2 text-[15px] leading-normal text-muted">{copy.hint}</p>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-bold">{copy.choiceLabel}</legend>
        <div className="flex flex-wrap gap-2">
          {copy.choices.map((c) => (
            <label key={c} className="cursor-pointer">
              <input
                type="radio"
                name={`${id}-choice`}
                value={c}
                checked={choice === c}
                onChange={() => setChoice(c)}
                className="peer sr-only"
              />
              <span className="inline-flex h-9 items-center rounded-full border border-line px-3.5 text-sm font-medium transition-colors hover:border-primary peer-checked:border-primary/40 peer-checked:bg-tint peer-checked:font-bold peer-checked:text-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary">
                {c}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <label htmlFor={`${id}-link`} className="mb-2 block text-sm font-bold">
          {copy.linkLabel}
        </label>
        <input
          id={`${id}-link`}
          type="text"
          inputMode="url"
          autoComplete="url"
          required
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder={copy.linkPlaceholder}
          className="h-12 w-full rounded-xl border border-line bg-background px-4 text-[15px] text-ink outline-none transition-shadow placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/15"
        />
      </div>

      <button
        type="submit"
        className="group mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-[15px] font-bold text-background transition-colors hover:bg-primary-hover active:translate-y-px sm:text-base"
      >
        <span className="sm:hidden">{copy.submitShort}</span>
        <span className="hidden sm:inline">{copy.submit}</span>
        <MoveRight size={20} strokeWidth={1.5} className="hidden transition-transform group-hover:translate-x-1 sm:block" />
      </button>
      <p className="mt-3.5 text-center text-[13px] leading-normal text-muted">{copy.legal}</p>
    </form>
  );
}
