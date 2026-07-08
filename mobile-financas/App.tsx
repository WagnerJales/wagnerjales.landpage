import React, { useMemo } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import { ListaLancamentosScreen } from './src/presentation/screens/ListaLancamentosScreen';
import { FormLancamentoScreen } from './src/presentation/screens/FormLancamentoScreen';
import { DashboardScreen } from './src/presentation/screens/DashboardScreen';
import { ConfiguracoesScreen } from './src/presentation/screens/ConfiguracoesScreen';
import { initDb } from './src/data/datasources/sqlite';

const Stack = createNativeStackNavigator();

initDb();

export default function App() {
  const scheme = useColorScheme();
  const theme = useMemo(() => (scheme === 'dark' ? DarkTheme : DefaultTheme), [scheme]);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Lista" component={ListaLancamentosScreen} />
        <Stack.Screen name="Formulario" component={FormLancamentoScreen} options={{ title: 'Lançamento' }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} options={{ title: 'Configurações' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
