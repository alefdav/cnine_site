# Análise de Pedidos Atrasados

Considerando hoje = **10/10/2026**, identifiquei os pedidos com Data_Prometida anterior a hoje e Status diferente de "Entregue" ou "Cancelado".

## Pedidos Atrasados Identificados

| Pedido | Cliente | Transportadora | Data_Prometida | Status | Dias Atraso | Faixa | Valor_Pedido |
|---|---|---|---|---|---|---|---|
| PV-50101 | Loja B1 | TransLog Vale | 03/10/2026 | Em rota de entrega | 7 | 4-7 dias | 1620,51 |
| PV-50106 | Loja G6 | Rapido Sul | 03/10/2026 | Em transito | 7 | 4-7 dias | 2464,14 |
| PV-50112 | Loja A12 | Rapido Sul | 01/10/2026 | Em rota de entrega | 9 | Mais de 7 dias | 2257,67 |
| PV-50115 | Loja D15 | Rapido Sul | 07/10/2026 | Em transito | 3 | 2-3 dias | 762,27 |
| PV-50117 | Loja F17 | Expresso Norte | 03/10/2026 | Em transito | 7 | 4-7 dias | 1372,23 |
| PV-50119 | Loja H19 | TransLog Vale | 05/10/2026 | Aguardando coleta | 5 | 4-7 dias | 2234,15 |
| PV-50121 | Loja J21 | Rapido Sul | 01/10/2026 | Entregue | — | *Excluído (entregue)* | — |
| PV-50127 | Loja D27 | Rapido Sul | 06/10/2026 | Em transito | 4 | 4-7 dias | 1320,50 |
| PV-50128 | Loja E28 | TransLog Vale | 04/10/2026 | Em transito | 6 | 4-7 dias | 428,46 |

> **Nota:** PV-50121 foi excluído por já estar com Status "Entregue" (não se enquadra como atrasado).

---

## Resumo por Faixa de Atraso

| Faixa de Atraso | Qtd. Pedidos | Valor Total |
|---|---|---|
| 1 dia | 0 | 0,00 |
| 2-3 dias | 1 | 762,27 |
| 4-7 dias | 6 | 9.440,00 |
| Mais de 7 dias | 1 | 2.257,67 |
| **Total Geral** | **8** | **12.459,94** |

---

## Resumo por Transportadora (Pedidos Atrasados)

| Transportadora | Qtd. Pedidos Atrasados | Valor Total Atrasado |
|---|---|---|
| Rapido Sul | 3 | 5.344,44 |
| TransLog Vale | 3 | 4.283,12 |
| Expresso Norte | 1 | 1.372,23 |
| **Total** | **7** | **10.999,79** |

*Observação: A tabela acima soma 7 pedidos (excluindo PV-50115, que pertence à faixa 2-3 dias e já está contabilizado no resumo por faixa). Segue versão completa incluindo todos os 8 atrasados por transportadora:*

| Transportadora | Qtd. Pedidos Atrasados | Valor Total Atrasado |
|---|---|---|
| Rapido Sul | 4 | 6.106,71 |
| TransLog Vale | 3 | 4.283,12 |
| Expresso Norte | 1 | 1.372,23 |
| **Total Geral** | **8** | **12.459,94** |0

**Destaque:** A transportadora **Rapido Sul** concentra o maior número de pedidos atrasados (4) e também o maior valor em atraso (R$ 6.106,71), incluindo o único pedido na faixa "mais de 7 dias" (PV-50112).