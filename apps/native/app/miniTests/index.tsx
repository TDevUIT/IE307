import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { MiniTest } from '~/types/type';
import { convertStringToObject } from '~/utils/convertStringToObject';

const MiniTestIndex = () => {
  const router = useRouter();
  const { data } = useLocalSearchParams();
  const parsedData = convertStringToObject(data as string) as MiniTest[];

  const navigateTo = (path: string, data: MiniTest[], title: string) => {
    router.push({
      pathname: `/miniTests/${path}` as any,
      params: { data: JSON.stringify(data), title },
    });
  };

  return (
    <ScrollView className="bg-[#f7fafc] p-6">
      <View className="mb-6 rounded-xl bg-white p-6 shadow-xl">
        <Text className="mb-4 text-center text-3xl font-bold text-gray-800">Mini Test Options</Text>
        <Text className="mb-4 text-center text-xl text-gray-700">
          Choose an option to get started:
        </Text>

        <TouchableOpacity
          onPress={() => navigateTo('essay', parsedData, 'Essay Test')}
          className="mb-4 items-center rounded-xl bg-green-500 px-6 py-3">
          <Text className="text-lg font-semibold text-white">Essay Test</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateTo('multipleChoice', parsedData, 'Multiple Choice Test')}
          className="mb-4 items-center rounded-xl bg-blue-500 px-6 py-3">
          <Text className="text-lg font-semibold text-white">Multiple Choice Test</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateTo('answer', parsedData, 'View Answers')}
          className="items-center rounded-xl bg-purple-500 px-6 py-3">
          <Text className="text-lg font-semibold text-white">View Answers</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MiniTestIndex;
