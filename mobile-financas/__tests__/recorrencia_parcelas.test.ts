import { addMonthsIso, toMesRef } from '../src/shared/utils/date';

test('gera meses corretamente para parcelamento', () => {
  expect(addMonthsIso('2026-02-10', 1)).toBe('2026-03-10');
  expect(toMesRef('2026-12-31')).toBe('2026-12');
});
