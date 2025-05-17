import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '@/screens/home';
import Startup from '@/screens/startup';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Startup" component={Startup} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
