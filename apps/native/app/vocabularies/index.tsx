import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { Vocabulary } from '~/types/type';
import { convertStringToObject } from '~/utils/convertStringToObject';

const Vocabularies = () => {
  const { data } = useLocalSearchParams();
  const parsedData = convertStringToObject(data as string) as Vocabulary[];

  const [showModal, setShowModal] = useState(false);
  const [selectedVocabulary, setSelectedVocabulary] = useState<Vocabulary | null>(null);

  const handlePress = (vocabulary: Vocabulary) => {
    setSelectedVocabulary(vocabulary);
    setShowModal(true);
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <FlatList
        data={parsedData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            className="mb-4 rounded-lg bg-white p-4 shadow-md">
            <Text className="text-lg font-semibold text-black">{item.wordJP}</Text>
            <Text className="text-sm text-gray-600">{item.wordVN}</Text>
            <Text className="mt-2 text-xs text-gray-400">{item.kanji}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}
        swipeDirection="left"
        onSwipeComplete={() => setShowModal(false)}
        animationIn="slideInLeft"
        animationInTiming={500}
        animationOut="slideOutLeft"
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropOpacity={0.0}
        backdropTransitionOutTiming={500}>
        <View className="rounded-lg bg-orange-100 p-5">
          {selectedVocabulary && (
            <>
                <View className="flex-col justify-between items-center">
                <Text className="mb-2 text-lg font-semibold text-gray-700">
                  Hiragana: {selectedVocabulary.wordJP}
                </Text>
                <Text className="text-sm text-gray-600">
                  Vietnamese: {selectedVocabulary.wordVN}
                </Text>
                <Text className="text-6xl font-bold mt-8 text-gray-900">
                  {selectedVocabulary.kanji}
                </Text>
                </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default Vocabularies;
