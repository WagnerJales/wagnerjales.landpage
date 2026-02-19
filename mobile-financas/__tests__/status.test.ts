import { getStatusLancamento } from '../src/domain/entities/Lancamento';

const base = {
  id: '1', mesRef: '2026-02' as const, descricao: 'Teste', dataVencimento: '2026-02-10', valor: 10,
  tipo: 'ROTINA' as any, prioridade: 'NECESSIDADE' as any, fonte: 'NUBANK', modo: 'PIX', natureza: 'DESPESA' as any
};

test('retorna PAGO quando dataPagamento existe', () => {
  expect(getStatusLancamento({ ...base, dataPagamento: '2026-02-09' } as any, new Date('2026-02-11'))).toBe('PAGO');
});

test('retorna ATRASADO quando vencido e não pago', () => {
  expect(getStatusLancamento(base as any, new Date('2026-02-11'))).toBe('ATRASADO');
});
