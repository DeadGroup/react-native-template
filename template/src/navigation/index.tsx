import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/screens/home';
import Startup from '@/screens/startup';
import { RootStackParamList } from './params_list';
import { ScreenNames } from './name';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ScreenNames.Startup} component={Startup} />
      <Stack.Screen name={ScreenNames.Home} component={Home} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
