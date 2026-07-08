import { parseCurrencyBrl } from '../src/shared/utils/currency';
import { csvToLancamentos, csvHeader } from '../src/shared/utils/csv';

test('parseia moeda BRL', () => {
  expect(parseCurrencyBrl('1.234,56')).toBe(1234.56);
});

test('parseia csv básico', () => {
  const csv = `${csvHeader}\n2026-02,Aluguel,2026-02-05,,1800.00,ROTINA,NECESSIDADE,NUBANK,PIX`;
  const res = csvToLancamentos(csv);
  expect(res).toHaveLength(1);
  expect(res[0].descricao).toBe('Aluguel');
});
