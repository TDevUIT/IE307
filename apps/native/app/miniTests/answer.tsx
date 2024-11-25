import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { MiniTest } from '~/types/type';
import { convertStringToObject } from '~/utils/convertStringToObject';

const MiniTests = () => {
  const { data } = useLocalSearchParams();
  const parsedData = convertStringToObject(data as string) as MiniTest[];

  return (
    <ScrollView className="bg-gray-100 p-4">
      {parsedData.map((item) => (
        <View key={item.id} className="mb-6 rounded-lg  bg-white p-4 shadow-md">
          <Text className="text-lg font-semibold text-gray-700">{item.question}</Text>
          <View className="mt-2">
            <Text className="text-base text-gray-600">Answer: {item.answer}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default MiniTests;