Vou analisar os dois arquivos, identificar as diferenças de formato e depois cruzar os dados.
Agora vou realizar o cruzamento completo entre os dois arquivos.
# Cruzamento WMS × Coletas RapidoSul — Outubro/2026

## 1. Diferenças de formato encontradas e tratamento aplicado

| Campo | WMS_expedicao | RapidoSul_coletas | Como tratei |
|---|---|---|---|
| Separador do arquivo | `;` | `,` | Li cada arquivo com o separador correto (não alterei os originais) |
| Decimal do Peso_kg | vírgula (`32,3`) | ponto (`32.3`) | Convertido ambos para `float` padrão antes de comparar |
| Data | `DD/MM/AAAA` (texto) | `AAAA-MM-DD` (texto) | Convertidas para `datetime` e comparadas pela data real (não pela string) |
| NF | número sem zeros à esquerda (`31500`) | número com zeros à esquerda (`000031500`) | Ambos convertidos para inteiro — zeros à esquerda são só formatação, não mudam o valor |
| Colunas exclusivas | `Transportadora` | `CTe`, `Valor_Frete` | Mantidas no resultado como informação extra, não usadas como critério de "bate/não bate" |
| Chave de cruzamento | `Pedido` | `Pedido` | Igual nos dois — usada como chave do merge |

**Observação importante:** encontrei um **registro duplicado** no arquivo RapidoSul_coletas (pedido `PV-48216` aparece 2x, com os mesmos valores). Não apaguei nada — a duplicidade está sinalizada na aba `Duplicidades_RapidoSul` do Excel e marcada na coluna `Duplicidade_Origem` do resultado.

---

## 2. Resumo da comparação

| Categoria | Qtde |
|---|---|
| ✅ Batem | 18 |
| ⚠️ Diferentes (mesmo pedido, dados divergentes) | 4 |
| 🟦 Só no WMS (não coletado/sem registro na transportadora) | 2 |
| 🟨 Só na RapidoSul (não consta na expedição do WMS) | 1 |
| 🔁 Duplicidade na origem (RapidoSul) | 1 pedido (2 linhas idênticas) |
| Total de linhas WMS | 24 |
| Total de linhas RapidoSul (brutas, com duplicidade) | 24 |

---

## 3. Batem (18 pedidos) — NF, peso, volumes e data conferem

| Pedido | NF | Data | Peso (kg) | Volumes |
|---|---|---|---|---|
| PV-48210 | 31500 | 01/10/2026 | 32,3 | 2 |
| PV-48211 | 31501 | 02/10/2026 | 44,7 | 3 |
| PV-48212 | 31502 | 03/10/2026 | 14,1 | 1 |
| PV-48214 | 31504 | 05/10/2026 | 22,6 | 1 |
| PV-48215 | 31505 | 06/10/2026 | 9,0 | 3 |
| PV-48216 | 31506 | 07/10/2026 | 28,3 | 1 |
| PV-48217 | 31507 | 01/10/2026 | 15,8 | 2 |
| PV-48218 | 31508 | 02/10/2026 | 29,4 | 4 |
| PV-48220 | 31510 | 04/10/2026 | 17,2 | 2 |
| PV-48221 | 31511 | 05/10/2026 | 51,7 | 4 |
| PV-48222 | 31512 | 06/10/2026 | 61,5 | 4 |
| PV-48223 | 31513 | 07/10/2026 | 21,7 | 2 |
| PV-48225 | 31515 | 02/10/2026 | 44,8 | 4 |
| PV-48226 | 31516 | 03/10/2026 | 23,1 | 4 |
| PV-48228 | 31518 | 05/10/2026 | 25,1 | 4 |
| PV-48229 | 31519 | 06/10/2026 | 49,5 | 2 |
| PV-48232 | 31522 | 02/10/2026 | 6,9 | 4 |
| PV-48233 | 31523 | 03/10/2026 | 15,9 | 4 |

> ⚠️ **PV-48216** bate nos valores, mas está **duplicado** no arquivo da RapidoSul (CTe `35261012000706` repetido 2x). Vale confirmar com a transportadora se houve cobrança em duplicidade no frete.

---

## 4. Diferentes (4 pedidos) — mesmo pedido, dado divergente

| Pedido | NF | Data | Peso WMS | Peso RapidoSul | Volumes WMS | Volumes RapidoSul | Divergência |
|---|---|---|---|---|---|---|---|
| PV-48213 | 31503 | 04/10/2026 | 46,0 | 58,0 | 4 | 4 | Peso: 46,0 → 58,0 kg (+12 kg) |
| PV-48219 | 31509 | 03/10/2026 | 38,9 | 46,4 | 1 | 1 | Peso: 38,9 → 46,4 kg (+7,5 kg) |
| PV-48224 | 31514 | 01/10/2026 | 29,8 | 29,8 | **2** | **4** | Volumes: 2 → 4 |
| PV-48227 | 31517 | 04/10/2026 | 9,8 | 29,8 | 1 | 1 | Peso: 9,8 → 29,8 kg (+20 kg, parece erro de digitação) |

> Essas divergências de peso impactam diretamente o cálculo do frete cobrado pela RapidoSul — recomendo conferência física antes de aprovar o pagamento.

---

## 5. Só no WMS (2 pedidos) — expedidos, mas sem registro de coleta na RapidoSul

| Pedido | NF | Data Expedição | Peso (kg) | Volumes |
|---|---|---|---|---|
| PV-48230 | 31520 | 07/10/2026 | 63,0 | 3 |
| PV-48231 | 31521 | 01/10/2026 | 42,8 | 2 |

> Verificar se foram coletados por outra transportadora, estão pendentes de coleta ou se há um registro faltante no arquivo da RapidoSul.

---

## 6. Só na RapidoSul (1 pedido) — coletado, mas sem registro no WMS

| Pedido | NF | Data Coleta | Peso (kg) | Volumes | Valor Frete |
|---|---|---|---|---|---|
| PV-48299 | 31599 | 06/10/2026 | 18,0 | 1 | R$ 72,20 |

> Pode ser pedido de um sistema/filial não integrado ao WMS consultado, ou falha de lançamento no WMS — vale checar a NF 31599 na origem.

---

## 7. Duplicidade sinalizada (sem exclusão)

| Pedido | NF | CTe | Data Coleta | Peso (kg) | Valor Frete | Ocorrências |
|---|---|---|---|---|---|---|
| PV-48216 | 31506 | 35261012000706 | 07/10/2026 | 28,3 | R$ 91,77 | **2x no arquivo RapidoSul** |

---

📎 Gerei o arquivo **`Cruzamento_WMS_x_RapidoSul.xlsx`** com todas as abas separadas (Resumo, Batem, Diferentes, Só_na_WMS, Só_na_RapidoSul, Duplicidades_RapidoSul) e também as duas bases originais sem alteração, para conferência e uso no seu processo.