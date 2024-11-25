import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MiniTest } from '~/types/type';
import { convertStringToObject } from '~/utils/convertStringToObject';

const MiniTestIndex = () => {
  const router = useRouter();
  const { data } = useLocalSearchParams();
  const parsedData = convertStringToObject(data as string) as MiniTest[];

  const navigateTo = (path: string, data: MiniTest[]) => {
    router.push({
      pathname: `/miniTests/${path}` as any,
      params: { data: JSON.stringify(data) },
    });
  };

  return (
    <ScrollView className="bg-[#f7fafc] p-6">
      <View className="bg-white p-6 rounded-xl shadow-xl mb-6">
        <Text className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Mini Test Options
        </Text>
        <Text className="text-xl text-gray-700 mb-4 text-center">
          Choose an option to get started:
        </Text>

        <TouchableOpacity
          onPress={() => navigateTo('essay', parsedData)}
          className="bg-green-500 px-6 py-3 rounded-xl mb-4 items-center"
        >
          <Text className="text-white font-semibold text-lg">Essay Test</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateTo('multipleChoice', parsedData)}
          className="bg-blue-500 px-6 py-3 rounded-xl mb-4 items-center"
        >
          <Text className="text-white font-semibold text-lg">Multiple Choice Test</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateTo('answer', parsedData)}
          className="bg-purple-500 px-6 py-3 rounded-xl items-center"
        >
          <Text className="text-white font-semibold text-lg">View Answers</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MiniTestIndex;