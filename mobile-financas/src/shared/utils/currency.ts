export const parseCurrencyBrl = (input: string): number => {
  const normalized = input.replace(/\./g, '').replace(',', '.').replace(/[^\d.\-]/g, '');
  const value = Number(normalized);
  if (Number.isNaN(value)) throw new Error('Valor inválido');
  return Number(value.toFixed(2));
};

export const toCurrencyBrl = (value: number): string =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
