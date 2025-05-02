import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';

import PaginaInicial from './screens/PaginaInicial';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#705aa9',
    secondary: '#9c8bc2',
    accent: '#9c8bc2',
    background: '#f6f6f6',
    surface: '#ffffff',
    elevation: {
      level2: '#705aa920',
      level3: '#705aa930',
    },
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Inicial"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: '#fff' }
            }}
          >
            <Stack.Screen name="Inicial" component={PaginaInicial} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
