import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

import FlipCard from '~/components/flipCard';
import { FlashCard } from '~/types/type';
import { convertStringToObject } from '~/utils/convertStringToObject';

const Flashcards = () => {
  const { data } = useLocalSearchParams();
  const parsedData = convertStringToObject(data as string) as FlashCard[];

  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const totalFlashcards = parsedData.length;

  const goToNextFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) => (prevIndex + 1) % totalFlashcards);
  };

  const goToPreviousFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) => (prevIndex - 1 + totalFlashcards) % totalFlashcards);
  };

  const [knownCards, setKnownCards] = useState<number[]>([]);

  const toggleKnownStatus = () => {
    setKnownCards((prev) =>
      prev.includes(currentFlashcardIndex)
        ? prev.filter((index) => index !== currentFlashcardIndex)
        : [...prev, currentFlashcardIndex]
    );
  };

  return (
    <ScrollView className="bg-gray-100 p-4">
      {parsedData && parsedData.length > 0 && (
        <View className="mt-10 flex-1 items-center justify-center">
          <Text className="mb-4 text-xl font-semibold text-gray-800">
             {currentFlashcardIndex + 1} / {totalFlashcards}
          </Text>
          <View className="w-full">
            <FlipCard
              term={parsedData[currentFlashcardIndex].term}
              definition={parsedData[currentFlashcardIndex].definition}
              kanji={parsedData[currentFlashcardIndex].kanji}
            />
          </View>
          <View className="mt-6 flex-row space-x-16">
            <TouchableOpacity
              onPress={goToPreviousFlashcard}
              className="rounded-full bg-blue-500 px-4 py-2 shadow-lg">
              <Text className="font-semibold text-white">Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goToNextFlashcard}
              className="rounded-full bg-blue-500 px-4 py-2 shadow-lg">
              <Text className="font-semibold text-white">Next</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={toggleKnownStatus}
            className={`mt-6 rounded-full px-6 py-3 shadow-lg ${
              knownCards.includes(currentFlashcardIndex) ? 'bg-green-500' : 'bg-gray-400'
            }`}>
            <Text className="font-semibold text-white">
              {knownCards.includes(currentFlashcardIndex) ? 'Mark as Unknown' : 'Mark as Known'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default Flashcards;
