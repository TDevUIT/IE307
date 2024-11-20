import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <View>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
