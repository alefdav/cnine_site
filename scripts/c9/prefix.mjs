// Prefixa cada seletor com ".c9 " (exceto os que já começam com ".c9").
// Uso: node prefix.mjs <src.css> <out.css>. Comentários no topo ficam como estão.
import { readFileSync, writeFileSync } from 'node:fs';
const [src, out] = process.argv.slice(2);
const css = readFileSync(src, 'utf8');
let o = '', i = 0;
const atStack = [];
function prefixSel(sel) {
  return sel
    .split(',')
    .map((s) => {
      const t = s.trim();
      if (!t) return t;
      if (t.startsWith('.c9') || t.startsWith('[data-theme')) return t;
      if (t.startsWith('::selection')) return `.c9 ${t}, .c9${t}`;
      return `.c9 ${t}`;
    })
    .join(', ');
}
while (i < css.length) {
  if (css.startsWith('/*', i)) {
    const e = css.indexOf('*/', i) + 2;
    o += css.slice(i, e);
    i = e;
    continue;
  }
  const ch = css[i];
  if (ch === '}') { o += ch; i++; atStack.pop(); continue; }
  if (/\s/.test(ch)) { o += ch; i++; continue; }
  // read a prelude up to { or ;
  let j = i;
  while (j < css.length && css[j] !== '{' && css[j] !== ';' && css[j] !== '}') {
    if (css.startsWith('/*', j)) j = css.indexOf('*/', j) + 2; else j++;
  }
  const prelude = css.slice(i, j);
  if (css[j] === '{') {
    const p = prelude.trim();
    const inRuleBody = atStack.length && atStack[atStack.length - 1] === 'rule';
    if (inRuleBody) {
      // declarations inside a rule never contain {; this shouldn't happen
      o += prelude + '{';
    } else if (p.startsWith('@keyframes')) {
      // keyframes: os passos (0%, 50%…) não são seletores; copia o bloco inteiro como está
      let k = j + 1, d = 1;
      while (d) { if (css[k] === '{') d++; else if (css[k] === '}') d--; k++; }
      o += css.slice(i, k);
      i = k;
      continue;
    } else if (p.startsWith('@')) {
      o += prelude + '{';
      atStack.push('at');
    } else {
      o += prefixSel(p) + ' {';
      atStack.push('rule');
    }

    i = j + 1;
    // if rule: copy body verbatim to matching }
    if (atStack[atStack.length - 1] === 'rule') {
      let k = i, d = 1;
      while (d) { if (css[k] === '{') d++; else if (css[k] === '}') d--; k++; }
      o += css.slice(i, k - 1) + '}';
      i = k; atStack.pop();
    }
    continue;
  }
  o += prelude + (css[j] ?? '');
  i = j + 1;
}
writeFileSync(out, o);
console.log('ok', o.length);
