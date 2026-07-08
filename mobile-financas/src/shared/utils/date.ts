export const toMesRef = (dateIso: string): `${number}-${string}` => {
  const d = new Date(dateIso);
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  return `${d.getFullYear()}-${month}`;
};

export const addMonthsIso = (dateIso: string, months: number): string => {
  const d = new Date(dateIso);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
};
