import React from 'react';

import AppNavigation from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDeviceContext } from 'twrnc';
import tw from './theme';

if (__DEV__) {
  require('./reactotron.config');
}

const App = () => {
  useDeviceContext(tw);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
