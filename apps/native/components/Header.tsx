import { Href, useRouter } from 'expo-router';
import * as React from 'react';
import { SafeAreaView, View, Image, TouchableOpacity } from 'react-native';

import { images } from '~/utils/icon';

const Header = () => {
  const router = useRouter();
  const handleNavigation = (url: string) => {
    router.push(url as Href);
  };
  return (
    <SafeAreaView className="relative h-24 w-full bg-[#f28b2f]">
      <View className="relative h-full w-full">
        <View className="absolute right-0  top-[2px] h-[30px] w-full bg-[#f1aa6a]" />
        <View className="absolute  top-1/2 h-8 w-[390px] -translate-x-1/2 transform flex-row items-center justify-start">
          <View className="flex w-full flex-row items-center justify-between gap-x-4">
            <View />
            <View className="mr-2 flex-row items-center justify-between gap-x-4">
              <TouchableOpacity onPress={() => handleNavigation('/fire')}>
                <Image
                  source={images.local_fire}
                  className="h-10 w-10"
                  accessibilityLabel="Fire Icon"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNavigation('/notification')}>
                <Image
                  source={images.circle_notifications}
                  className="h-10 w-10"
                  accessibilityLabel="Notifications Icon"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleNavigation('/profile')}>
                <Image
                  source={images.account_circle}
                  className="h-10 w-10"
                  accessibilityLabel="Profile Icon"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
