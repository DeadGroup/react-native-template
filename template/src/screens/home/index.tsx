import {Text, View} from 'react-native';
import React from 'react';
import tw from '@/theme';

const Home = () => {
  return (
    <View style={tw.style('flex-1 bg-red items-center justify-center')}>
      <Text style={tw.style('text-green')}>Home</Text>
    </View>
  );
};

export default Home;
