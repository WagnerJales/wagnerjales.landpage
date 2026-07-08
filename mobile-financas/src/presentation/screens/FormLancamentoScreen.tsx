import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import uuid from 'react-native-uuid';
import { NaturezaLancamento, PrioridadeLancamento, TipoLancamento } from '../../domain/enums/LancamentoEnums';
import { parseCurrencyBrl } from '../../shared/utils/currency';
import { lancamentoSchema, validatePagamentoAntesVencimento } from '../../domain/services/LancamentoValidation';
import { useLancamentos } from '../viewmodels/useLancamentos';
import { toMesRef } from '../../shared/utils/date';

export const FormLancamentoScreen = ({ navigation }: any) => {
  const { create, createInstallments } = useLancamentos();
  const [descricao, setDescricao] = useState('');
  const [venc, setVenc] = useState(new Date().toISOString().slice(0, 10));
  const [pag, setPag] = useState('');
  const [valor, setValor] = useState('0,00');
  const [tipo, setTipo] = useState<TipoLancamento>(TipoLancamento.ROTINA);
  const [prioridade, setPrioridade] = useState<PrioridadeLancamento>(PrioridadeLancamento.NECESSIDADE);
  const [fonte, setFonte] = useState('NUBANK');
  const [modo, setModo] = useState('PIX');
  const [parcelas, setParcelas] = useState('1');
  const [recorrente, setRecorrente] = useState(false);

  const salvar = async () => {
    try {
      const model = {
        id: String(uuid.v4()),
        mesRef: toMesRef(venc),
        descricao,
        dataVencimento: venc,
        dataPagamento: pag || undefined,
        valor: parseCurrencyBrl(valor),
        tipo,
        prioridade,
        fonte,
        modo,
        natureza: NaturezaLancamento.DESPESA,
        recorrente
      };
      lancamentoSchema.parse(model);
      const warning = validatePagamentoAntesVencimento(venc, pag || undefined);
      if (warning) Alert.alert('Aviso', warning);
      if (tipo === TipoLancamento.TEMPORARIO && Number(parcelas) > 1) {
        await createInstallments(model as any, Number(parcelas));
      } else {
        await create(model as any);
      }
      navigation.goBack();
    } catch (e: any) {
      Alert.alert('Erro', e.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 12, gap: 8 }}>
      <TextInput placeholder="Descrição" value={descricao} onChangeText={setDescricao} style={{ borderWidth: 1, padding: 10 }} />
      <TextInput placeholder="Data vencimento YYYY-MM-DD" value={venc} onChangeText={setVenc} style={{ borderWidth: 1, padding: 10 }} />
      <TextInput placeholder="Data pagamento opcional" value={pag} onChangeText={setPag} style={{ borderWidth: 1, padding: 10 }} />
      <TextInput placeholder="Valor" keyboardType="numeric" value={valor} onChangeText={setValor} style={{ borderWidth: 1, padding: 10 }} />
      <Text>Tipo</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>{Object.values(TipoLancamento).map((t) => <Pressable key={t} onPress={() => setTipo(t)}><Text>{t}</Text></Pressable>)}</View>
      <Text>Prioridade</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>{Object.values(PrioridadeLancamento).map((p) => <Pressable key={p} onPress={() => setPrioridade(p)}><Text>{p}</Text></Pressable>)}</View>
      <TextInput placeholder="Fonte (customizável)" value={fonte} onChangeText={setFonte} style={{ borderWidth: 1, padding: 10 }} />
      <TextInput placeholder="Modo (customizável)" value={modo} onChangeText={setModo} style={{ borderWidth: 1, padding: 10 }} />
      <Pressable onPress={() => setRecorrente((v) => !v)}><Text>Recorrente mensal: {recorrente ? 'Sim' : 'Não'}</Text></Pressable>
      {tipo === TipoLancamento.TEMPORARIO && <TextInput placeholder="Parcelas" keyboardType="numeric" value={parcelas} onChangeText={setParcelas} style={{ borderWidth: 1, padding: 10 }} />}
      <Pressable onPress={salvar}><Text>Salvar</Text></Pressable>
    </ScrollView>
  );
};
