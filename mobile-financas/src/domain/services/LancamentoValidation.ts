import { z } from 'zod';
import { PrioridadeLancamento, TipoLancamento, NaturezaLancamento } from '../enums/LancamentoEnums';

export const lancamentoSchema = z.object({
  descricao: z.string().min(2),
  mesRef: z.string().regex(/^\d{4}-\d{2}$/),
  dataVencimento: z.string(),
  dataPagamento: z.string().optional(),
  valor: z.number().positive(),
  tipo: z.nativeEnum(TipoLancamento),
  prioridade: z.nativeEnum(PrioridadeLancamento),
  fonte: z.string().min(1),
  modo: z.string().min(1),
  natureza: z.nativeEnum(NaturezaLancamento)
});

export const validatePagamentoAntesVencimento = (venc: string, pag?: string): string | null => {
  if (!pag) return null;
  if (new Date(pag) < new Date(venc)) return 'Pagamento antes do vencimento. Permitido com aviso.';
  return null;
};
