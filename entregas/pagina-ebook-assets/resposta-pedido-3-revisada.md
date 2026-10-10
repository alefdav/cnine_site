# Revisão da resposta anterior

Reconferi linha por linha os dois arquivos originais. Encontrei **erros de transcrição e de contagem** na resposta anterior. Veja o que estava errado:

## Erros encontrados

| Onde estava o erro | O que eu disse | O que realmente está nos arquivos | Problema |
|---|---|---|---|
| Item "Diferentes" PV-48219 | "NF 31509 (confere) / Peso 38,9 \| 46,4" | WMS: Peso 38,9 — RapidoSul: Peso 46,4 | Formatação confusa, misturei NF e Peso na mesma linha (erro de redação, não de valor) |
| Item "Diferentes" PV-48219 | Diferença "7,5 kg" | 46,4 − 38,9 = **7,5 kg** | Conta está certa, mas a linha mal escrita podia induzir erro de leitura |
| Lista "Batem" | PV-48227 **não aparece** na lista de "batem" (correto) nem duplicado — ok | — | Confirmado, sem erro aqui |
| Contagem de "Pedidos só no WMS" | Listei PV-48230 e PV-48231 | Confirmado: nenhum dos dois aparece no arquivo RapidoSul | Correto |
| Contagem de "só na RapidoSul" | Listei apenas PV-48299 | Confirmado: é o único pedido do arquivo RapidoSul que não existe no WMS | Correto |
| **Resumo quantitativo — "Batem"** | Informei **19** | Recontagem manual: são **18**, não 19 (PV-48219, PV-48213 e PV-48227 foram corretamente excluídos da lista de "batem", mas o total de 19 não bate com a contagem real dos itens listados) | **Erro de soma** |
| **Total geral de pedidos** | Não citei o total geral para conferência cruzada | WMS tem 24 linhas, RapidoSul tem 24 linhas (sendo 1 duplicada = 23 pedidos únicos) | Faltou essa checagem de consistência, que ajuda a validar o resultado final |

### Conferência do total (contagem de registros)
- **WMS_expedicao_outubro**: 24 linhas = 24 pedidos únicos (não há duplicidade neste arquivo)
- **RapidoSul_coletas_outubro**: 24 linhas, mas PV-48216 aparece 2x → **23 pedidos únicos**
- União dos dois conjuntos (sem repetir): **26 pedidos únicos** (24 do WMS + PV-48299 que só está na RapidoSul = 25... recontando abaixo com cuidado)

Refazendo a contagem de forma auditável:

| Categoria | Pedidos | Qtd. |
|---|---|---|
| Batem | PV-48210, 48211, 48212, 48214, 48215, 48216, 48217, 48218, 48220, 48221, 48222, 48223, 48224, 48225, 48226, 48228, 48229, 48232, 48233 | **19** ✅ (confirmado por recontagem manual, item por item — meu apontamento de erro acima estava sendo cauteloso demais; a lista e o número 19 **batem entre si**) |
| Diferentes | PV-48213, 48219, 48227 | **3** |
| Só no WMS | PV-48230, 48231 | **2** |
| Só na RapidoSul | PV-48299 | **1** |
| **Total de pedidos únicos no cruzamento** | 19+3+2+1 | **25** |

Conferindo contra a origem: WMS tem 24 pedidos únicos → 19 (batem) + 3 (diferentes) + 2 (só WMS) = 24 ✅ bate exatamente com o total do WMS.
RapidoSul tem 23 pedidos únicos (desconsiderando a duplicata) → 19 + 3 + 1 (só RapidoSul) = 23 ✅ bate exatamente.

**Conclusão da revisão**: os números finais da tabela-resumo estavam corretos, mas a formatação da linha do PV-48219 estava confusa e faltava essa prova de consistência (24 = 24 e 23 = 23), que é essencial para você confiar no resultado antes de usar. Corrigido abaixo.

## Nenhum número "inventado" fora dos arquivos
Todos os valores de peso, NF, data e frete citados nas tabelas originais conferem com o conteúdo dos CSVs. Não identifiquei números fictícios — apenas a linha mal formatada do PV-48219 e a ausência da prova de consistência (soma total).

---

## O que você deve conferir antes de usar este cruzamento

1. **PV-48213**: peso WMS 46,0 kg vs RapidoSul 58,0 kg (diferença de 12 kg) — confirmar peso real na balança ou no romaneio físico.
2. **PV-48219**: peso WMS 38,9 kg vs RapidoSul 46,4 kg (diferença de 7,5 kg) — mesma checagem.
3. **PV-48227**: peso WMS 9,8 kg vs RapidoSul 29,8 kg — diferença muito grande, forte suspeita de **erro de digitação** (inversão do "2"). Confirmar com nota fiscal.
4. **PV-48230 e PV-48231**: expedidos no WMS mas sem CT-e na RapidoSul — confirmar se a coleta ocorreu e se falta apenas o lançamento, ou se a carga ainda não foi retirada.
5. **PV-48299**: cobrança de frete (R$ 72,20) sem expedição correspondente no WMS — verificar se é erro de pedido/NF da transportadora ou frete a glosar.
6. **PV-48216 duplicado** na RapidoSul: mesmo CT-e, mesma data, mesmos valores repetidos — checar fatura da transportadora para não pagar frete em duplicidade.
7. **Conferir as NFs convertidas**: fiz a comparação de NF ignorando zeros à esquerda (31500 = 000031500). Vale uma checagem visual rápida caso haja NF com dígitos realmente diferentes além dos zeros.
8. **Datas não foram usadas como critério de divergência**, apenas Peso. Se quiser, posso cruzar também Data_Expedicao vs Data_Coleta para detectar atrasos de coleta.

---

# Versão corrigida completa

## 1. Diferenças de formato entre os arquivos e tratamento adotado

| Campo | WMS_expedicao_outubro | RapidoSul_coletas_outubro | Tratamento aplicado |
|---|---|---|---|
| Separador de colunas | `;` | `,` | Parse separado por arquivo |
| Decimal (Peso_kg) | vírgula (`32,3`) | ponto (`32.3`) | Normalizado para ponto só na comparação |
| Data | `DD/MM/AAAA` | `AAAA-MM-DD` | Convertido para `DD/MM/AAAA` só na comparação |
| NF | sem zeros à esquerda | com zeros à esquerda | Comparado como número, ignorando zeros |
| Campos extras | — | `CTe`, `Valor_Frete` | Mantidos como referência, não usados no critério de "bate/difere" |
| Chave de cruzamento | `Pedido` | `Pedido` | Usada como chave — **atenção: há 1 duplicidade no arquivo da RapidoSul** |

Os arquivos originais **não foram alterados**; a padronização foi só para efeito de comparação.

---

## 2. Pedidos que BATEM (NF, Data, Peso e Volumes conferem) — 19 pedidos

| Pedido | NF | Data | Peso_kg | Volumes |
|---|---|---|---|---|
| PV-48210 | 31500 | 01/10/2026 | 32,3 | 2 |
| PV-48211 | 31501 | 02/10/2026 | 44,7 | 3 |
| PV-48212 | 31502 | 03/10/2026 | 14,1 | 1 |
| PV-48214 | 31504 | 05/10/2026 | 22,6 | 1 |
| PV-48215 | 31505 | 06/10/2026 | 9,0 | 3 |
| PV-48216 | 31506 | 07/10/2026 | 28,3 | 1 | ⚠️ ver duplicidade no item 6 |
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

## 3. Pedidos DIFERENTES — 3 pedidos

| Pedido | NF | Data | Peso WMS | Peso RapidoSul | Diferença |
|---|---|---|---|---|---|
| PV-48213 | 31503 | 04/10/2026 | 46,0 | 58,0 | +12,0 kg |
| PV-48219 | 31509 | 03/10/2026 | 38,9 | 46,4 | +7,5 kg |
| PV-48227 | 31517 | 04/10/2026 | 9,8 | 29,8 | +20,0 kg |

*(NF, Data e Volumes conferem nos três casos; a única divergência é o Peso_kg.)*

## 4. Pedidos SÓ NO WMS — 2 pedidos

| Pedido | NF | Data_Expedicao | Peso_kg | Volumes |
|---|---|---|---|---|
| PV-48230 | 31520 | 07/10/2026 | 63,0 | 3 |
| PV-48231 | 31521 | 01/10/2026 | 42,8 | 2 |

## 5. Pedidos SÓ NA RapidoSul — 1 pedido

| Pedido | NF | CTe | Data_Coleta | Peso_kg | Volumes | Valor_Frete |
|---|---|---|---|---|---|---|
| PV-48299 | 000031599 | 35261012000799 | 06/10/2026 | 18,0 | 1 | 72,20 |

## 6. Duplicidade identificada (mantida, não excluída)

| Pedido | NF | CTe | Data_Coleta | Observação |
|---|---|---|---|---|
| PV-48216 | 000031506 | 35261012000706 | 07/10/2026 | Linha repetida integralmente no arquivo RapidoSul — mesmo peso, volumes e valor de frete |

---

## Resumo quantitativo e prova de consistência

| Categoria | Qtd. |
|---|---|
| Batem | 19 |
| Diferentes | 3 |
| Só no WMS | 2 |
| Só na RapidoSul | 1 |
| Duplicidade (RapidoSul) | 1 (PV-48216) |

**Checagem de fechamento:**
- WMS: 19 + 3 + 2 = **24** → bate com as 24 linhas do arquivo WMS ✅
- RapidoSul: 19 + 3 + 1 = **23** → bate com os 23 pedidos únicos da RapidoSul (24 linhas − 1 duplicata) ✅

Os totais fecham corretamente nos dois arquivos de origem.