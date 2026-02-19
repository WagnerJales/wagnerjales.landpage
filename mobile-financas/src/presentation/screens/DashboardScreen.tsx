import React, { useEffect, useMemo } from 'react';
import { ScrollView, Text, View, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { getStatusLancamento } from '../../domain/entities/Lancamento';
import { toCurrencyBrl } from '../../shared/utils/currency';
import { useLancamentos } from '../viewmodels/useLancamentos';

export const DashboardScreen = () => {
  const { items, load } = useLancamentos();
  useEffect(() => { load(); }, [load]);

  const stats = useMemo(() => {
    const pago = items.filter((i) => getStatusLancamento(i) === 'PAGO').reduce((a, b) => a + b.valor, 0);
    const pendente = items.filter((i) => getStatusLancamento(i) === 'PENDENTE').reduce((a, b) => a + b.valor, 0);
    const atrasado = items.filter((i) => getStatusLancamento(i) === 'ATRASADO').reduce((a, b) => a + b.valor, 0);
    return { pago, pendente, atrasado };
  }, [items]);

  const ranking = [...items].sort((a, b) => b.valor - a.valor).slice(0, 5);

  return (
    <ScrollView contentContainerStyle={{ padding: 12, gap: 8 }}>
      <Text>Total pago: {toCurrencyBrl(stats.pago)}</Text>
      <Text>Total pendente: {toCurrencyBrl(stats.pendente)}</Text>
      <Text>Total atrasado: {toCurrencyBrl(stats.atrasado)}</Text>
      <PieChart
        data={[
          { name: 'Pago', population: stats.pago, color: '#2ecc71', legendFontColor: '#777', legendFontSize: 12 },
          { name: 'Pendente', population: stats.pendente, color: '#f39c12', legendFontColor: '#777', legendFontSize: 12 },
          { name: 'Atrasado', population: stats.atrasado, color: '#e74c3c', legendFontColor: '#777', legendFontSize: 12 }
        ]}
        width={Dimensions.get('window').width - 24}
        height={180}
        chartConfig={{ color: () => '#000' }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="8"
      />
      <Text>Ranking maiores despesas</Text>
      {ranking.map((r) => <View key={r.id}><Text>{r.descricao} - {toCurrencyBrl(r.valor)}</Text></View>)}
    </ScrollView>
  );
};
