import React, { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Notifications from 'expo-notifications';
import { csvToLancamentos, lancamentosToCsv } from '../../shared/utils/csv';
import { useLancamentos } from '../viewmodels/useLancamentos';

export const ConfiguracoesScreen = () => {
  const { items, create } = useLancamentos();
  const [fonte, setFonte] = useState('NUBANK,B_BRASIL');
  const [modo, setModo] = useState('PIX,DEBITO,CREDITO');

  const exportarCsv = async () => {
    const csv = lancamentosToCsv(items);
    const path = `${FileSystem.documentDirectory}lancamentos.csv`;
    await FileSystem.writeAsStringAsync(path, csv);
    Alert.alert('Exportado', path);
  };

  const importarCsvExemplo = async () => {
    const path = `${FileSystem.bundleDirectory}sample.csv`;
    const raw = await FileSystem.readAsStringAsync(path);
    const list = csvToLancamentos(raw);
    for (const l of list) await create(l as any);
    Alert.alert('Importado', `${list.length} lançamentos`);
  };

  const agendarLembrete = async (diasAntes: number) => {
    await Notifications.scheduleNotificationAsync({
      content: { title: 'Vencimento próximo', body: `Você tem contas vencendo em ${diasAntes} dia(s).` },
      trigger: null
    });
    Alert.alert('OK', 'Lembrete configurado');
  };

  return (
    <View style={{ flex: 1, padding: 12, gap: 10 }}>
      <Text>Fontes customizáveis</Text>
      <TextInput value={fonte} onChangeText={setFonte} style={{ borderWidth: 1, padding: 10 }} />
      <Text>Modos customizáveis</Text>
      <TextInput value={modo} onChangeText={setModo} style={{ borderWidth: 1, padding: 10 }} />
      <Pressable onPress={() => agendarLembrete(3)}><Text>Lembrar 3 dias antes</Text></Pressable>
      <Pressable onPress={() => agendarLembrete(0)}><Text>Lembrar no dia do vencimento</Text></Pressable>
      <Pressable onPress={exportarCsv}><Text>Exportar CSV</Text></Pressable>
      <Pressable onPress={importarCsvExemplo}><Text>Importar CSV (exemplo)</Text></Pressable>
    </View>
  );
};
