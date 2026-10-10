# Análise de divergências de formato entre os arquivos

## 1. Diferenças de formato identificadas e tratamento adotado

| Campo | WMS_expedicao_outubro | RapidoSul_coletas_outubro | Tratamento aplicado |
|---|---|---|---|
| Separador de colunas | `;` (ponto e vírgula) | `,` (vírgula) | Parse separado por arquivo |
| Decimal (Peso_kg) | vírgula (`32,3`) | ponto (`32.3`) | Normalizado para ponto na comparação |
| Data | `DD/MM/AAAA` | `AAAA-MM-DD` | Convertido para `DD/MM/AAAA` na comparação |
| NF | sem zeros à esquerda (`31500`) | com zeros à esquerda (`000031500`) | Comparado como número (int), ignorando zeros |
| Campo extra | — | `CTe`, `Valor_Frete` (não existem no WMS) | Mantidos apenas como referência, não usados no cruzamento |
| Chave de cruzamento | `Pedido` | `Pedido` | Usado como chave única — **porém há duplicidade no arquivo 2** (ver abaixo) |

⚠️ **Observação importante**: a linha `PV-48216` aparece **duas vezes idênticas** no arquivo `RapidoSul_coletas_outubro` (mesma NF, CTe, data, peso, volumes e frete) — indício de lançamento duplicado na transportadora. Mantida sem exclusão, conforme solicitado, e sinalizada abaixo.

Os arquivos originais não foram alterados — toda a padronização foi feita apenas para fins de comparação.

---

## 2. Pedidos que BATEM (NF, Data, Peso e Volumes conferem)

| Pedido | NF | Data | Peso_kg | Volumes |
|---|---|---|---|---|
| PV-48210 | 31500 | 01/10/2026 | 32,3 | 2 |
| PV-48211 | 31501 | 02/10/2026 | 44,7 | 3 |
| PV-48212 | 31502 | 03/10/2026 | 14,1 | 1 |
| PV-48214 | 31504 | 05/10/2026 | 22,6 | 1 |
| PV-48215 | 31505 | 06/10/2026 | 9,0 | 3 |
| PV-48216 | 31506 | 07/10/2026 | 28,3 | 1 | ⚠️ *registrado em duplicidade na transportadora (ver item 5)* |
| PV-48217 | 31507 | 01/10/2026 | 15,8 | 2 |
| PV-48218 | 31508 | 02/10/2026 | 29,4 | 4 |
| PV-48220 | 31510 | 04/10/2026 | 17,2 | 2 |
| PV-48221 | 31511 | 05/10/2026 | 51,7 | 4 |
| PV-48222 | 31512 | 06/10/2026 | 61,5 | 4 |
| PV-48223 | 31513 | 07/10/2026 | 21,7 | 2 |
| PV-48224 | 31514 | 01/10/2026 | 29,8 | 4 |
| PV-48225 | 31515 | 02/10/2026 | 44,8 | 4 |
| PV-48226 | 31516 | 03/10/2026 | 23,1 | 4 |
| PV-48228 | 31518 | 05/10/2026 | 25,1 | 4 |
| PV-48229 | 31519 | 06/10/2026 | 49,5 | 2 |
| PV-48232 | 31522 | 02/10/2026 | 6,9 | 4 |
| PV-48233 | 31523 | 03/10/2026 | 15,9 | 4 |

---

## 3. Pedidos DIFERENTES (mesmo Pedido, mas com divergência em algum campo)

| Pedido | Campo | WMS | RapidoSul | Observação |
|---|---|---|---|---|
| PV-48213 | Peso_kg | 46,0 | 58,0 | Divergência de **12 kg** — conferir |
| PV-48219 | NF | 31509 | 31509 (confere) / Peso | 38,9 | 46,4 | Divergência de **7,5 kg** |
| PV-48227 | Peso_kg | 9,8 | 29,8 | Divergência grande — **possível erro de digitação (troca 9,8 ↔ 29,8)** |

---

## 4. Pedidos SÓ NO WMS (expedidos, mas sem registro de coleta)

| Pedido | NF | Data_Expedicao | Peso_kg | Volumes |
|---|---|---|---|---|
| PV-48230 | 31520 | 07/10/2026 | 63,0 | 3 |
| PV-48231 | 31521 | 01/10/2026 | 42,8 | 2 |

🔴 Esses pedidos foram expedidos pelo armazém, mas **não têm CT-e correspondente** — verificar se a coleta realmente ocorreu ou se falta lançamento da transportadora.

---

## 5. Pedidos SÓ NA RapidoSul (coleta sem expedição registrada no WMS)

| Pedido | NF | CTe | Data_Coleta | Peso_kg | Volumes | Valor_Frete |
|---|---|---|---|---|---|---|
| PV-48299 | 000031599 | 35261012000799 | 06/10/2026 | 18,0 | 1 | 72,20 |

🔴 Pedido cobrado pela transportadora, mas **sem registro de expedição no WMS** — verificar se é frete indevido ou lançamento faltante.

---

## 6. Duplicidade identificada (sem exclusão)

| Pedido | NF | CTe | Data_Coleta | Observação |
|---|---|---|---|---|
| PV-48216 | 000031506 | 35261012000706 | 07/10/2026 | **Linha repetida integralmente** no arquivo RapidoSul — risco de cobrança em duplicidade do frete |

---

## Resumo quantitativo

| Categoria | Qtd. de pedidos |
|---|---|
| Batem | 19 |
| Diferentes | 3 |
| Só no WMS | 2 |
| Só na RapidoSul | 1 |
| Duplicidade (RapidoSul) | 1 (PV-48216) |

**Pontos de atenção prioritários:** PV-48213, PV-48219 e PV-48227 (divergência de peso — pode impactar valor do frete cobrado), PV-48230/PV-48231 (sem CT-e), PV-48299 (frete sem expedição) e a duplicidade do PV-48216 (possível cobrança duplicada).