import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import VideoScreen from '~/screens/VideoScreen';

const videos = () => {
  return (
    <SafeAreaView>
      <VideoScreen />
    </SafeAreaView>
  );
};

export default videos;
