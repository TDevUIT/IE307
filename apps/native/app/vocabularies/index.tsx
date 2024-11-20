import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { Vocabulary } from '~/types/type';
import { convertStringToObject } from '~/utils/convertStringToObject';

const Vocabularies = () => {
  const { data } = useLocalSearchParams();
  const parsedData = convertStringToObject(data as string) as Vocabulary[];

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        data={parsedData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mb-4 rounded-lg bg-white p-4 shadow-md">
            <Text className="text-lg font-semibold text-black">{item.wordJP}</Text>
            <Text className="text-sm text-gray-600">{item.wordVN}</Text>
            <Text className="mt-2 text-xs text-gray-400">{item.kanji}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Vocabularies;
