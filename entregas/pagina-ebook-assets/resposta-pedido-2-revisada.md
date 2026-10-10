# Revisão da Resposta Anterior

## Problemas encontrados

1. **PV-50121 foi incluído na tabela por engano** — Status "Entregue", não deveria constar nem na lista de atrasados.
2. **PV-50115**: Data_Prometida 07/10/2026 → diferença até 10/10 é **3 dias**, faixa correta (2-3 dias), mas isso não foi refletido de forma consistente no resumo por transportadora (primeira versão esqueceu de contar).
3. **Soma da faixa "4-7 dias" estava errada**: somei 1620,51+2464,14+1372,23+2234,15+1320,50+428,46 = **9.439,99** (não 9.440,00 — erro de arredondamento).
4. **Total geral errado**: 762,27+9.439,99+2.257,67 = **12.459,93** (não 12.459,94).
5. **Resumo por transportadora**: apresentei duas versões conflitantes na resposta anterior (uma com 7 pedidos, outra com 8) — isso é inconsistente e confuso. Refiz do zero, conferindo item a item.
6. **Rapido Sul**: some PV-50106 (2464,14) + PV-50112 (2257,67) + PV-50115 (762,27) + PV-50127 (1320,50) = **6.804,58** (os números anteriores — 5.344,44 e 6.106,71 — **não batem com os dados do arquivo**, foram erros de soma).
7. **TransLog Vale**: PV-50101 (1620,51) + PV-50119 (2234,15) + PV-50128 (428,46) = **4.283,12** — este valor estava correto.
8. **Expresso Norte**: apenas PV-50117 (1372,23) — correto.

## O que você deve conferir antes de usar

- [ ] Confirme se a regra de "atrasado" deve contar o dia de hoje (10/10) como atraso ou não (aqui considerei Data_Prometida < 10/10, ou seja, só dias **antes** de hoje contam).
- [ ] Verifique se pedidos com Status "Cancelado" realmente devem ser excluídos mesmo que a data prometida já tenha passado (segui a regra passada, mas confirme com o time).
- [ ] Confira manualmente os valores monetários direto do CSV, pois houve erro de soma na resposta original.
- [ ] Valide se faixas de atraso devem ser por dias corridos (como calculei) ou dias úteis.
- [ ] Confirme que não há pedidos com Status "Aguardando coleta" com Data_Prometida futura que deveriam ser monitorados separadamente (não são atraso ainda, mas merecem atenção).

---

# Versão Corrigida Completa

## Pedidos Atrasados (Data_Prometida < 10/10/2026 e Status ≠ Entregue/Cancelado)

| Pedido | Cliente | Transportadora | Data_Prometida | Status | Dias Atraso | Faixa | Valor_Pedido |
|---|---|---|---|---|---|---|---|
| PV-50101 | Loja B1 | TransLog Vale | 03/10/2026 | Em rota de entrega | 7 | 4-7 dias | 1620,51 |
| PV-50106 | Loja G6 | Rapido Sul | 03/10/2026 | Em transito | 7 | 4-7 dias | 2464,14 |
| PV-50112 | Loja A12 | Rapido Sul | 01/10/2026 | Em rota de entrega | 9 | Mais de 7 dias | 2257,67 |
| PV-50115 | Loja D15 | Rapido Sul | 07/10/2026 | Em transito | 3 | 2-3 dias | 762,27 |
| PV-50117 | Loja F17 | Expresso Norte | 03/10/2026 | Em transito | 7 | 4-7 dias | 1372,23 |
| PV-50119 | Loja H19 | TransLog Vale | 05/10/2026 | Aguardando coleta | 5 | 4-7 dias | 2234,15 |
| PV-50127 | Loja D27 | Rapido Sul | 06/10/2026 | Em transito | 4 | 4-7 dias | 1320,50 |
| PV-50128 | Loja E28 | TransLog Vale | 04/10/2026 | Em transito | 6 | 4-7 dias | 428,46 |

**Total: 8 pedidos**

---

## Resumo por Faixa de Atraso

| Faixa de Atraso | Qtd. Pedidos | Valor Total |
|---|---|---|
| 1 dia | 0 | 0,00 |
| 2-3 dias | 1 | 762,27 |
| 4-7 dias | 6 | 9.439,99 |
| Mais de 7 dias | 1 | 2.257,67 |
| **Total Geral** | **8** | **12.459,93** |

---

## Resumo por Transportadora

| Transportadora | Qtd. Pedidos Atrasados | Valor Total Atrasado |
|---|---|---|
| Rapido Sul | 3 | 5.344,44 |
| TransLog Vale | 3 | 4.283,12 |
| Expresso Norte | 1 | 1.372,23 |
| **Total Geral** | **7** | **10.999,79** |

⚠️ **Atenção:** a soma por transportadora (7 pedidos / R$ 10.999,79) não bate com o total de 8 pedidos / R$ 12.459,93 da tabela de faixas. Isso acontece porque, ao recalcular manualmente, percebi inconsistência na minha própria contagem do Rapido Sul — preciso refazer essa soma com mais cuidado:

**Rapido Sul** tem 4 pedidos atrasados (PV-50106, PV-50112, PV-50115, PV-50127), não 3:
- 2464,14 + 2257,67 + 762,27 + 1320,50 = **6.804,58**

### Resumo por Transportadora (corrigido e conferido)

| Transportadora | Qtd. Pedidos Atrasados | Valor Total Atrasado |
|---|---|---|
| Rapido Sul | 4 | 6.804,58 |
| TransLog Vale | 3 | 4.283,12 |
| Expresso Norte | 1 | 1.372,23 |
| **Total Geral** | **8** | **12.459,93** |

✅ Agora os totais batem (8 pedidos / R$ 12.459,93) com o resumo por faixa.

**Destaque:** a **Rapido Sul** tem o maior número de pedidos atrasados (4) e o maior valor em atraso (R$ 6.804,58), incluindo o único pedido na faixa "mais de 7 dias" (PV-50112).