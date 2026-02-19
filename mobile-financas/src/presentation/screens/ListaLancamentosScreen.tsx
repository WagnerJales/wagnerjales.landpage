import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { Chip } from '../components/Chip';
import { getStatusLancamento } from '../../domain/entities/Lancamento';
import { useLancamentos } from '../viewmodels/useLancamentos';
import { toCurrencyBrl } from '../../shared/utils/currency';

export const ListaLancamentosScreen = ({ navigation }: any) => {
  const { items, load, loading, error, markAsPaid, duplicate, remove } = useLancamentos();
  const [texto, setTexto] = useState('');

  useEffect(() => { load(); }, [load]);

  return (
    <View style={{ flex: 1, padding: 12, gap: 8 }}>
      <TextInput placeholder="Buscar por descrição" value={texto} onChangeText={setTexto} onSubmitEditing={() => load({ texto })}
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 }} />
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Pressable onPress={() => navigation.navigate('Formulario')}><Text>Novo</Text></Pressable>
        <Pressable onPress={() => navigation.navigate('Dashboard')}><Text>Dashboard</Text></Pressable>
        <Pressable onPress={() => navigation.navigate('Configuracoes')}><Text>Config</Text></Pressable>
      </View>
      {loading && <Text>Carregando...</Text>}
      {error && <Text>Erro: {error}</Text>}
      {!loading && !items.length && <Text>Sem lançamentos.</Text>}
      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => {
          const status = getStatusLancamento(item);
          return (
            <View style={{ borderWidth: 1, borderColor: status === 'ATRASADO' ? '#ff3b30' : '#ddd', borderRadius: 10, padding: 10, marginBottom: 8 }}>
              <Text style={{ fontWeight: '700' }}>{item.descricao}</Text>
              <Text>{item.dataVencimento} • {toCurrencyBrl(item.valor)}</Text>
              <View style={{ flexDirection: 'row', gap: 6, marginTop: 6 }}>
                <Chip label={item.tipo} color="#1f8ef1" />
                <Chip label={item.prioridade} color="#9b59b6" />
                <Chip label={status} color={status === 'PAGO' ? '#2ecc71' : status === 'ATRASADO' ? '#e74c3c' : '#f39c12'} />
              </View>
              <Text>🏦 {item.fonte} • 💳 {item.modo}</Text>
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 6 }}>
                <Pressable onPress={async () => { await markAsPaid(item.id); await load(); }}><Text>Pagar</Text></Pressable>
                <Pressable onPress={() => navigation.navigate('Formulario', { id: item.id })}><Text>Editar</Text></Pressable>
                <Pressable onPress={async () => { await duplicate(item.id); await load(); }}><Text>Duplicar</Text></Pressable>
                <Pressable onPress={async () => { await remove(item.id); await load(); }}><Text>Excluir</Text></Pressable>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
