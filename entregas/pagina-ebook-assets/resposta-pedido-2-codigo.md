# Análise de Pedidos Atrasados — WMS

**Data de referência:** 10/10/2026
**Critério de atraso:** Data_Prometida anterior a hoje, com Status diferente de "Entregue" e "Cancelado"

## 📋 Detalhamento dos Pedidos Atrasados

| Pedido | Transportadora | Data Prometida | Status | Dias de Atraso | Faixa | Valor (R$) |
|---|---|---|---|---|---|---|
| PV-50112 | Rapido Sul | 01/10/2026 | Em rota de entrega | 9 | Mais de 7 dias | 2.257,67 |
| PV-50101 | TransLog Vale | 03/10/2026 | Em rota de entrega | 7 | 4-7 dias | 1.620,51 |
| PV-50106 | Rapido Sul | 03/10/2026 | Em transito | 7 | 4-7 dias | 2.464,14 |
| PV-50117 | Expresso Norte | 03/10/2026 | Em transito | 7 | 4-7 dias | 1.372,23 |
| PV-50128 | TransLog Vale | 04/10/2026 | Em transito | 6 | 4-7 dias | 428,46 |
| PV-50119 | TransLog Vale | 05/10/2026 | Aguardando coleta | 5 | 4-7 dias | 2.234,15 |
| PV-50127 | Rapido Sul | 06/10/2026 | Em transito | 4 | 4-7 dias | 1.320,50 |
| PV-50115 | Rapido Sul | 07/10/2026 | Em transito | 3 | 2-3 dias | 762,27 |

**Total de pedidos atrasados: 8** (de 30 pedidos no arquivo)

---

## 📊 Resumo por Transportadora e Faixa de Atraso

| Transportadora | 1 dia | 2-3 dias | 4-7 dias | Mais de 7 dias | **Total Qtd** | **Total Valor (R$)** |
|---|---|---|---|---|---|---|
| Expresso Norte | — | — | 1 (R$ 1.372,23) | — | **1** | **1.372,23** |
| Rapido Sul | — | 1 (R$ 762,27) | 2 (R$ 3.784,64) | 1 (R$ 2.257,67) | **4** | **6.804,58** |
| TransLog Vale | — | — | 3 (R$ 4.283,12) | — | **3** | **4.283,12** |
| **TOTAL GERAL** | **0** | **1** | **6** | **1** | **8** | **12.459,93** |

---

## 🔍 Destaques

- **Rapido Sul** concentra o maior número de pedidos atrasados (4 de 8) e o maior valor em risco (R$ 6.804,58 — cerca de 55% do total atrasado).
- **PV-50112** (Rapido Sul) é o caso mais crítico, com **9 dias de atraso** e ainda em "Em rota de entrega" — único pedido na faixa "Mais de 7 dias".
- A faixa **4-7 dias** concentra a maioria dos casos (6 de 8 pedidos, 75% da quantidade e ~76% do valor atrasado), sinalizando um gargalo recorrente nesse intervalo.
- Nenhum pedido foi identificado na faixa de **1 dia** de atraso neste recorte.
- **Expresso Norte** apresenta a menor exposição, com apenas 1 pedido atrasado.

Nenhuma alteração foi feita no arquivo original — os cálculos foram realizados apenas para esta análise.