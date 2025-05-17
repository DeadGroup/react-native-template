import React from 'react';

import AppNavigation from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

if (__DEV__) {
  require('./reactotron.config');
}

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
