# MVP - Controle Financeiro Pessoal (Android + iOS)

Stack escolhida: **React Native + Expo + SQLite (offline-first)** para lançamento rápido e código limpo por camadas.

## Decisões de domínio
- `mesRef` foi modelado como string `YYYY-MM` (ex.: `2026-02`), pois facilita agrupamento, filtros e ordenação sem ambiguidade.
- MVP assume **despesa-only** (natureza já preparada para RECEITA futura).
- `MES REF` = mês do vencimento.
- Sem multiusuário/sync neste MVP.

## Arquitetura
- `src/domain`: entidades, enums, contratos de repositório, validações/regras.
- `src/data`: SQLite datasource, DTOs/mappers e implementação de repositório.
- `src/presentation`: telas, componentes e viewmodel (estado loading/empty/error).
- `src/shared`: utilitários (moeda, datas e CSV).

## Banco / migração
A criação das tabelas acontece em `initDb()`:
- `lancamentos`
- `settings_list`

Arquivo: `src/data/datasources/sqlite.ts`.

## Build e execução
```bash
cd mobile-financas
npm install
npm run start
```
- Android: `npm run android`
- iOS: `npm run ios`

## Testes
```bash
npm test
```

## CSV de importação
Exemplo em `sample-data/sample.csv` com colunas:
`MES REF, DESPESA, DATA VENC, DATA PG, R$, TIPO, PRIORIDADE, FONTE, MODO`.
