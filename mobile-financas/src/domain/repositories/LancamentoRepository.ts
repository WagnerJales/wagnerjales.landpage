import { Lancamento } from '../entities/Lancamento';

export interface LancamentoFilters {
  mesRef?: string;
  tipo?: string;
  prioridade?: string;
  fonte?: string;
  modo?: string;
  status?: string;
  texto?: string;
  inicio?: string;
  fim?: string;
}

export interface LancamentoRepository {
  create(lancamento: Lancamento): Promise<void>;
  update(lancamento: Lancamento): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Lancamento | null>;
  list(filters?: LancamentoFilters): Promise<Lancamento[]>;
  markAsPaid(id: string, dataPagamento: string): Promise<void>;
  duplicate(id: string): Promise<Lancamento>;
  generateRecurringForMonth(mesRef: string): Promise<number>;
  createInstallments(base: Lancamento, parcelas: number): Promise<void>;
}
