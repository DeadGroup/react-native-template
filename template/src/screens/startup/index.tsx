import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from '@/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/params_list';
import { ScreenNames } from '@/navigation/name';

type Props = NativeStackNavigationProp<RootStackParamList, ScreenNames.Startup>;

const Startup = () => {
  const { reset } = useNavigation<Props>();

  const delay = () => {
    return new Promise(resolver => setTimeout(resolver, 1500));
  };

  useEffect(() => {
    const init = async () => {
      await delay();
      reset({
        index: 0,
        routes: [{ name: ScreenNames.Welcome }],
      });
    };

    init();
  }, []);

  return (
    <View style={tw.style('flex-1 items-center justify-center bg-green')}>
      <Text>Startup</Text>
    </View>
  );
};

export default Startup;
