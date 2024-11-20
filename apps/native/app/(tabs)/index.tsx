import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeScreen from '~/screens/HomeScreen';

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <HomeScreen />
    </SafeAreaView>
  );
};

export default Home;
