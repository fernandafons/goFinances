import React from 'react';
import { StatusBar } from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/en-US';
import AppLoading from 'expo-app-loading';
import { Register } from './src/screens/Register';
// import { Dashboard } from './src/screens/Dashboard';
import {ThemeProvider} from 'styled-components';
import theme from './src/global/styles/theme';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes} from './src/routes/app.routes';
import {SignIn} from './src/screens/SignIn';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <SignIn />
      </NavigationContainer>
    </ThemeProvider>
  );
}
