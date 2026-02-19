import { NaturezaLancamento, PrioridadeLancamento, StatusLancamento, TipoLancamento } from '../enums/LancamentoEnums';

export type MesRef = `${number}-${string}`;

export interface Lancamento {
  id: string;
  serieId?: string;
  recorrente?: boolean;
  parcelaAtual?: number;
  parcelaTotal?: number;
  mesRef: MesRef;
  descricao: string;
  dataVencimento: string;
  dataPagamento?: string;
  valor: number;
  tipo: TipoLancamento;
  prioridade: PrioridadeLancamento;
  fonte: string;
  modo: string;
  natureza: NaturezaLancamento;
  observacoes?: string;
  tags?: string[];
}

export const getStatusLancamento = (lancamento: Lancamento, hoje = new Date()): StatusLancamento => {
  if (lancamento.dataPagamento) return StatusLancamento.PAGO;
  const vencimento = new Date(lancamento.dataVencimento);
  return hoje > vencimento ? StatusLancamento.ATRASADO : StatusLancamento.PENDENTE;
};
