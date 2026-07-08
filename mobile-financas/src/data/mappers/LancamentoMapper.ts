import { Lancamento } from '../../domain/entities/Lancamento';
import { LancamentoDTO } from '../dto/LancamentoDTO';

export const toDomain = (dto: LancamentoDTO): Lancamento => ({
  ...dto,
  recorrente: Boolean(dto.recorrente),
  tags: dto.tags ? JSON.parse(dto.tags) : []
} as Lancamento);

export const toDTO = (domain: Lancamento): LancamentoDTO => ({
  ...domain,
  recorrente: domain.recorrente ? 1 : 0,
  tags: JSON.stringify(domain.tags ?? [])
});
