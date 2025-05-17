import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import tw from '@/theme';

const Startup = () => {
  const {reset} = useNavigation();

  const delay = () => {
    return new Promise(resolver => setTimeout(resolver, 5000));
  };

  useEffect(() => {
    const init = async () => {
      await delay();
      reset({index: 0, routes: [{name: 'Home'}]});
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={tw.style('flex-1 items-center justify-center bg-green')}>
      <Text>Startup</Text>
    </View>
  );
};

export default Startup;
