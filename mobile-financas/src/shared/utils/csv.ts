import { Lancamento } from '../../domain/entities/Lancamento';
import { NaturezaLancamento, PrioridadeLancamento, TipoLancamento } from '../../domain/enums/LancamentoEnums';
import { parseCurrencyBrl } from './currency';

export const csvHeader = 'MES REF,DESPESA,DATA VENC,DATA PG,R$,TIPO,PRIORIDADE,FONTE,MODO';

export const lancamentosToCsv = (lancamentos: Lancamento[]): string => {
  const rows = lancamentos.map((l) =>
    [l.mesRef, l.descricao, l.dataVencimento, l.dataPagamento ?? '', l.valor.toFixed(2), l.tipo, l.prioridade, l.fonte, l.modo].join(',')
  );
  return [csvHeader, ...rows].join('\n');
};

export const csvToLancamentos = (csv: string): Lancamento[] => {
  const [header, ...rows] = csv.trim().split('\n');
  if (header !== csvHeader) throw new Error('Cabeçalho CSV inválido');
  return rows.filter(Boolean).map((row, i) => {
    const [mesRef, descricao, dataVencimento, dataPagamento, valor, tipo, prioridade, fonte, modo] = row.split(',');
    return {
      id: `import-${i}`,
      mesRef: mesRef as `${number}-${string}`,
      descricao,
      dataVencimento,
      dataPagamento: dataPagamento || undefined,
      valor: parseCurrencyBrl(valor),
      tipo: tipo as TipoLancamento,
      prioridade: prioridade as PrioridadeLancamento,
      fonte,
      modo,
      natureza: NaturezaLancamento.DESPESA
    };
  });
};
