import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useCallback } from 'react';
import tw from '@/theme';
import { Images } from '@/assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '@/navigation/name';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/params_list';

type NavigationType = NativeStackNavigationProp<
  RootStackParamList,
  ScreenNames.Welcome
>;

const Welcome = () => {
  const { bottom } = useSafeAreaInsets();
  const { navigate } = useNavigation<NavigationType>();

  const handleNextButton = useCallback(() => {
    navigate(ScreenNames.Home);
  }, []);

  return (
    <View style={tw.style('flex-1 bg-sky-100')}>
      <View style={tw.style('flex-0.7 bg-sky-100')}>
        <View style={tw.style('flex-0.6 justify-end items-center')}>
          <Image source={Images.noImage} />
          <Text>Logo here</Text>
        </View>
        <View style={tw.style('mt-4 flex-0.4 mx-5')}>
          <Text style={tw.style('text-6xl font-semibold')}>
            Your app, almost ready!
          </Text>
          <Text style={tw.style('text-xl font-normal mt-2')}>
            Get ready to dive in! 🥳
          </Text>
        </View>
      </View>
      <View
        style={tw.style('flex-0.3 bg-white rounded-t-3xl px-5', {
          paddingBottom: bottom + 16,
        })}>
        <View style={tw.style('flex-1')}>
          <Text style={tw.style('mt-5 text-xl font-normal')}>
            Kickstart your next React Native project with this flexible,
            production-ready template. Save time, stay organized, and focus on
            building amazing apps—right from the start!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleNextButton}
          style={tw.style('bg-black rounded-md items-center')}>
          <Text style={tw.style('text-white text-lg font-semibold py-3')}>
            Let's go!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
