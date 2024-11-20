import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { Grammar } from '~/types/type';
import { convertStringToObject } from '~/utils/convertStringToObject';

const Grammars = () => {
  const { data } = useLocalSearchParams();
  const parsedData = convertStringToObject(data as string) as Grammar[];

  return (
    <ScrollView className="bg-gray-100 px-5 py-8">
      {parsedData.map((grammar) => (
        <TouchableOpacity
          key={grammar.id}
          className="mb-4 flex-row items-center rounded-xl bg-white p-5 shadow-lg">
          <View className="flex-1">
            <Text className="mb-2 text-xl font-bold text-gray-900">{grammar.rule}</Text>
            <Text className="mb-2 text-base text-gray-700">{grammar.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Grammars;
