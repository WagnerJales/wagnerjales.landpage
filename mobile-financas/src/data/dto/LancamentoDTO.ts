export interface LancamentoDTO {
  id: string;
  serieId?: string;
  recorrente?: number;
  parcelaAtual?: number;
  parcelaTotal?: number;
  mesRef: string;
  descricao: string;
  dataVencimento: string;
  dataPagamento?: string;
  valor: number;
  tipo: string;
  prioridade: string;
  fonte: string;
  modo: string;
  natureza: string;
  observacoes?: string;
  tags?: string;
}
