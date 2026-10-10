// Segunda volta, como o guia ensina: manda o pedido 12 ("Revisar a propria resposta")
// na mesma conversa e salva a versao revisada.
//   node --env-file=../../.env revisar.mjs

import fs from 'node:fs';
import path from 'node:path';
import Anthropic from '@anthropic-ai/sdk';

const DIR = import.meta.dirname;
const MODEL = process.env.CLAUDE_AGENT_MODEL || 'claude-sonnet-5';
const client = new Anthropic();
const SYS = 'Voce e o Claude ajudando um profissional do administrativo logistico. Responda em portugues do Brasil, com tabelas em Markdown.';
const prova = JSON.parse(fs.readFileSync(path.join(DIR, 'prova.json'), 'utf8'));
const anexo = (nome) => `<arquivo nome="${nome}.csv">\n${fs.readFileSync(path.join(DIR, `${nome}.csv`), 'utf8')}\n</arquivo>`;
const PEDIDO12 = `Revise a resposta anterior. Confira as contas, aponte qualquer número
que não esteja nos arquivos e liste o que eu devo conferir antes de usar.
Depois, entregue a versão corrigida completa.`;

let custo = 0;
async function revisar(arquivos, pedido, respostaFile, saida) {
  const primeira = fs.readFileSync(path.join(DIR, respostaFile), 'utf8');
  const res = await client.messages.create({
    model: MODEL, max_tokens: 8000, system: SYS, thinking: { type: 'disabled' },
    messages: [
      { role: 'user', content: `${arquivos.map(anexo).join('\n')}\n\n${pedido}` },
      { role: 'assistant', content: primeira },
      { role: 'user', content: PEDIDO12 },
    ],
  });
  const u = res.usage;
  custo += ((u.input_tokens + (u.cache_creation_input_tokens || 0) * 1.25 + (u.cache_read_input_tokens || 0) * 0.1) * 2 + u.output_tokens * 10) / 1e6;
  fs.writeFileSync(path.join(DIR, saida), res.content.filter((b) => b.type === 'text').map((b) => b.text).join(''));
}

await revisar(['WMS_expedicao_outubro', 'RapidoSul_coletas_outubro'], prova.pedido3, 'resposta-pedido-3.md', 'resposta-pedido-3-revisada.md');
await revisar(['WMS_pedidos_abertos'], prova.pedido2, 'resposta-pedido-2.md', 'resposta-pedido-2-revisada.md');
console.log(`ok · US$ ${custo.toFixed(4)}`);
