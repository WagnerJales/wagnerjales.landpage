import { useCallback, useMemo, useState } from 'react';
import { SQLiteLancamentoRepository } from '../../data/repositories/SQLiteLancamentoRepository';
import { Lancamento } from '../../domain/entities/Lancamento';
import { LancamentoFilters } from '../../domain/repositories/LancamentoRepository';

const repo = new SQLiteLancamentoRepository();

export const useLancamentos = () => {
  const [items, setItems] = useState<Lancamento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (filters?: LancamentoFilters) => {
    setLoading(true); setError(null);
    try { setItems(await repo.list(filters)); } catch (e: any) { setError(e.message); } finally { setLoading(false); }
  }, []);

  const actions = useMemo(() => ({
    load,
    create: repo.create.bind(repo),
    update: repo.update.bind(repo),
    remove: repo.delete.bind(repo),
    duplicate: repo.duplicate.bind(repo),
    markAsPaid: (id: string) => repo.markAsPaid(id, new Date().toISOString().slice(0, 10)),
    createInstallments: repo.createInstallments.bind(repo),
    generateRecurringForMonth: repo.generateRecurringForMonth.bind(repo)
  }), [load]);

  return { items, loading, error, ...actions };
};
