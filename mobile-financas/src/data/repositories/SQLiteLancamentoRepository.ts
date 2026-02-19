import uuid from 'react-native-uuid';
import { Lancamento, getStatusLancamento } from '../../domain/entities/Lancamento';
import { LancamentoFilters, LancamentoRepository } from '../../domain/repositories/LancamentoRepository';
import { addMonthsIso, toMesRef } from '../../shared/utils/date';
import { db } from '../datasources/sqlite';
import { toDTO, toDomain } from '../mappers/LancamentoMapper';

export class SQLiteLancamentoRepository implements LancamentoRepository {
  async create(lancamento: Lancamento): Promise<void> {
    const dto = toDTO(lancamento);
    db.runSync(`INSERT INTO lancamentos (id,serieId,recorrente,parcelaAtual,parcelaTotal,mesRef,descricao,dataVencimento,dataPagamento,valor,tipo,prioridade,fonte,modo,natureza,observacoes,tags)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [dto.id, dto.serieId ?? null, dto.recorrente ?? 0, dto.parcelaAtual ?? null, dto.parcelaTotal ?? null, dto.mesRef, dto.descricao, dto.dataVencimento, dto.dataPagamento ?? null, dto.valor, dto.tipo, dto.prioridade, dto.fonte, dto.modo, dto.natureza, dto.observacoes ?? null, dto.tags ?? '[]']);
  }

  async update(l: Lancamento): Promise<void> {
    const d = toDTO(l);
    db.runSync(`UPDATE lancamentos SET mesRef=?,descricao=?,dataVencimento=?,dataPagamento=?,valor=?,tipo=?,prioridade=?,fonte=?,modo=?,natureza=?,observacoes=?,tags=? WHERE id=?`,
      [d.mesRef, d.descricao, d.dataVencimento, d.dataPagamento ?? null, d.valor, d.tipo, d.prioridade, d.fonte, d.modo, d.natureza, d.observacoes ?? null, d.tags ?? '[]', d.id]);
  }

  async delete(id: string): Promise<void> { db.runSync('DELETE FROM lancamentos WHERE id=?', [id]); }

  async findById(id: string): Promise<Lancamento | null> {
    const row = db.getFirstSync('SELECT * FROM lancamentos WHERE id=?', [id]) as any;
    return row ? toDomain(row) : null;
  }

  async list(filters?: LancamentoFilters): Promise<Lancamento[]> {
    const rows = db.getAllSync('SELECT * FROM lancamentos ORDER BY dataVencimento ASC') as any[];
    return rows.map(toDomain).filter((l) => {
      if (!filters) return true;
      const status = getStatusLancamento(l);
      return (!filters.mesRef || l.mesRef === filters.mesRef)
        && (!filters.tipo || l.tipo === filters.tipo)
        && (!filters.prioridade || l.prioridade === filters.prioridade)
        && (!filters.fonte || l.fonte === filters.fonte)
        && (!filters.modo || l.modo === filters.modo)
        && (!filters.status || status === filters.status)
        && (!filters.texto || l.descricao.toLowerCase().includes(filters.texto.toLowerCase()))
        && (!filters.inicio || l.dataVencimento >= filters.inicio)
        && (!filters.fim || l.dataVencimento <= filters.fim);
    });
  }

  async markAsPaid(id: string, dataPagamento: string): Promise<void> {
    db.runSync('UPDATE lancamentos SET dataPagamento=? WHERE id=?', [dataPagamento, id]);
  }

  async duplicate(id: string): Promise<Lancamento> {
    const current = await this.findById(id);
    if (!current) throw new Error('Lançamento não encontrado');
    const copy = { ...current, id: String(uuid.v4()), dataPagamento: undefined };
    await this.create(copy);
    return copy;
  }

  async generateRecurringForMonth(mesRef: string): Promise<number> {
    const recorrentes = (db.getAllSync('SELECT * FROM lancamentos WHERE recorrente=1') as any[]).map(toDomain);
    let count = 0;
    for (const base of recorrentes) {
      const exists = db.getFirstSync('SELECT id FROM lancamentos WHERE serieId=? AND mesRef=?', [base.serieId ?? base.id, mesRef]);
      if (!exists) {
        const next: Lancamento = {
          ...base,
          id: String(uuid.v4()),
          serieId: base.serieId ?? base.id,
          mesRef,
          dataVencimento: `${mesRef}-${base.dataVencimento.slice(8, 10)}`,
          dataPagamento: undefined
        };
        await this.create(next);
        count += 1;
      }
    }
    return count;
  }

  async createInstallments(base: Lancamento, parcelas: number): Promise<void> {
    const serieId = String(uuid.v4());
    for (let i = 1; i <= parcelas; i += 1) {
      const venc = addMonthsIso(base.dataVencimento, i - 1);
      await this.create({
        ...base,
        id: String(uuid.v4()),
        serieId,
        parcelaAtual: i,
        parcelaTotal: parcelas,
        descricao: `${base.descricao} - ${i}/${parcelas}`,
        dataVencimento: venc,
        mesRef: toMesRef(venc),
        dataPagamento: undefined
      });
    }
  }
}
