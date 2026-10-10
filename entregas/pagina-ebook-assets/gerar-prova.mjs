// Prova real para a pagina do ebook: planilhas ficticias com divergencias plantadas,
// os pedidos 2 e 3 do guia (texto do PDF, com os [colchetes] preenchidos) e a resposta
// real do Claude. Gera CSVs, as respostas em Markdown e um JSON com tudo.
//
//   node --env-file=../../.env gerar-prova.mjs   (rodar de dentro desta pasta)

import fs from 'node:fs';
import path from 'node:path';
import { chat, usage, MODEL_FAST } from '../../src/llm.js';
import { makeRng } from '../../src/rng.js';

const DIR = import.meta.dirname;
const rng = makeRng(2026);
const TRANSP = ['Rapido Sul', 'TransLog Vale', 'Expresso Norte'];
const pad = (n, k) => String(n).padStart(k, '0');

// ---------- Pedido 3: cruzar WMS x transportadora ----------
const wms = [];
for (let i = 0; i < 24; i++) {
  const pedido = `PV-${48210 + i}`;
  const nf = 31500 + i;
  wms.push({ Pedido: pedido, NF: String(nf), Data_Expedicao: `0${1 + (i % 7)}/10/2026`, Peso_kg: (5 + rng.next() * 60).toFixed(1).replace('.', ','), Volumes: 1 + Math.floor(rng.next() * 4), Transportadora: 'Rapido Sul' });
}
const transp = wms.map((w, i) => ({ Pedido: w.Pedido, NF: pad(w.NF, 9), CTe: `35261012${pad(700 + i, 6)}`, Data_Coleta: `2026-10-0${1 + (i % 7)}`, Peso_kg: w.Peso_kg.replace(',', '.'), Volumes: w.Volumes, Valor_Frete: (38 + Number(w.Peso_kg.replace(',', '.')) * 1.9).toFixed(2) }));
// Divergencias plantadas
transp[3].Peso_kg = (Number(transp[3].Peso_kg) + 12).toFixed(1); // peso maior cobrado
transp[9].Peso_kg = (Number(transp[9].Peso_kg) + 7.5).toFixed(1);
transp[14].Volumes = transp[14].Volumes + 2; // volumes a mais
transp[17].Peso_kg = (Number(transp[17].Peso_kg) + 20).toFixed(1);
const soWms = wms.splice(20, 2); // 2 pedidos expedidos que a transportadora nao lancou
transp.splice(20, 2);
wms.push(...soWms);
transp.push({ Pedido: 'PV-48299', NF: '000031599', CTe: '35261012000799', Data_Coleta: '2026-10-06', Peso_kg: '18.0', Volumes: 1, Valor_Frete: '72.20' }); // so na transportadora
transp.push({ ...transp[6] }); // CT-e duplicado
const toCsv = (rows, sep) => [Object.keys(rows[0]).join(sep), ...rows.map((r) => Object.values(r).join(sep))].join('\n');
const csvWms = toCsv(wms, ';');
const csvTransp = toCsv(transp, ',');
fs.writeFileSync(path.join(DIR, 'WMS_expedicao_outubro.csv'), csvWms);
fs.writeFileSync(path.join(DIR, 'RapidoSul_coletas_outubro.csv'), csvTransp);

const pedido3 = `Cruze WMS_expedicao_outubro e RapidoSul_coletas_outubro por Pedido. Antes, mostre as diferenças
de formato e como vai tratar. Mantenha os originais. Separe em: batem,
diferentes, só na 1, só na 2. Marque duplicidades sem apagar.`;

// ---------- Pedido 2: pedidos atrasados ----------
const status = ['Em transito', 'Em transito', 'Entregue', 'Entregue', 'Entregue', 'Aguardando coleta', 'Cancelado', 'Em rota de entrega'];
const ped = [];
for (let i = 0; i < 30; i++) {
  const dia = 1 + Math.floor(rng.next() * 14);
  ped.push({ Pedido: `PV-${50100 + i}`, Cliente: `Loja ${String.fromCharCode(65 + (i % 12))}${i}`, Transportadora: TRANSP[i % 3], Data_Prometida: `${pad(dia, 2)}/10/2026`, Status: rng.pick(status), Valor_Pedido: (180 + rng.next() * 2400).toFixed(2).replace('.', ',') });
}
const csvPed = toCsv(ped, ';');
fs.writeFileSync(path.join(DIR, 'WMS_pedidos_abertos.csv'), csvPed);
const pedido2 = `Hoje é 10/10/2026.
Atrasado = Data_Prometida antes de hoje e Status
diferente de Entregue e Cancelado. Faixas: 1, 2-3, 4-7 e mais de 7 dias.
Agrupe por transportadora com quantidade e valor. Não altere os dados originais.`;

const SYS = 'Voce e o Claude ajudando um profissional do administrativo logistico. Responda em portugues do Brasil, com tabelas em Markdown.';
const anexo = (nome, csv) => `<arquivo nome="${nome}.csv">\n${csv}\n</arquivo>`;

const r3 = await chat({ system: SYS, user: `${anexo('WMS_expedicao_outubro', csvWms)}\n${anexo('RapidoSul_coletas_outubro', csvTransp)}\n\n${pedido3}`, model: MODEL_FAST, json: false, maxTokens: 6000 });
const r2 = await chat({ system: SYS, user: `${anexo('WMS_pedidos_abertos', csvPed)}\n\n${pedido2}`, model: MODEL_FAST, json: false, maxTokens: 6000 });
fs.writeFileSync(path.join(DIR, 'resposta-pedido-3.md'), r3);
fs.writeFileSync(path.join(DIR, 'resposta-pedido-2.md'), r2);
fs.writeFileSync(path.join(DIR, 'prova.json'), JSON.stringify({ modelo: MODEL_FAST, geradoEm: new Date().toISOString(), pedido3, pedido2, plantado: { pesoDiferente: ['PV-48213', 'PV-48219', 'PV-48227'], volumesDiferente: ['PV-48224'], soNoWms: soWms.map((x) => x.Pedido), soNaTransportadora: ['PV-48299'], duplicado: transp[6].Pedido }, custoUSD: usage.custoUSD }, null, 2));
console.log(`ok · ${MODEL_FAST} · US$ ${usage.custoUSD.toFixed(4)}`);
