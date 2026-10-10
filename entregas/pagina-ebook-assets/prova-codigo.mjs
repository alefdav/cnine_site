// Prova real com execucao de codigo ligada (como no claude.ai quando a pessoa anexa planilhas:
// o Claude roda Python para cruzar e somar). Mesmos arquivos e mesmos pedidos do guia.
//   node --env-file=../../.env prova-codigo.mjs

import fs from 'node:fs';
import path from 'node:path';
import Anthropic from '@anthropic-ai/sdk';

const DIR = import.meta.dirname;
const MODEL = process.env.CLAUDE_AGENT_MODEL || 'claude-sonnet-5';
const client = new Anthropic();
const prova = JSON.parse(fs.readFileSync(path.join(DIR, 'prova.json'), 'utf8'));
const anexo = (nome) => `<arquivo nome="${nome}.csv">\n${fs.readFileSync(path.join(DIR, `${nome}.csv`), 'utf8')}\n</arquivo>`;
const SYS = 'Voce e o Claude ajudando um profissional do administrativo logistico. Os arquivos anexados estao no texto da mensagem; use a ferramenta de codigo para ler e calcular. Responda em portugues do Brasil, com tabelas em Markdown e sem mostrar o codigo.';
let custo = 0;

async function rodar(arquivos, pedido, saida) {
  const messages = [{ role: 'user', content: `${arquivos.map(anexo).join('\n')}\n\n${pedido}` }];
  let res;
  for (let i = 0; i < 6; i++) {
    res = await client.messages.create({ model: MODEL, max_tokens: 12000, system: SYS, tools: [{ type: 'code_execution_20260521', name: 'code_execution' }], messages });
    const u = res.usage;
    custo += ((u.input_tokens + (u.cache_creation_input_tokens || 0) * 1.25 + (u.cache_read_input_tokens || 0) * 0.1) * 2 + u.output_tokens * 10) / 1e6;
    if (res.stop_reason !== 'pause_turn') break;
    messages.push({ role: 'assistant', content: res.content });
  }
  const texto = res.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
  fs.writeFileSync(path.join(DIR, saida), texto);
  return res.stop_reason;
}

const s3 = await rodar(['WMS_expedicao_outubro', 'RapidoSul_coletas_outubro'], prova.pedido3, 'resposta-pedido-3-codigo.md');
const s2 = await rodar(['WMS_pedidos_abertos'], prova.pedido2, 'resposta-pedido-2-codigo.md');
console.log(`ok · ${s3} / ${s2} · US$ ${custo.toFixed(4)} (sem contar horas de container de codigo)`);
