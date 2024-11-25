import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

import FlipCard from '~/components/flipCard';
import { FlashCard } from '~/types/type';
import { convertStringToObject } from '~/utils/convertStringToObject';
const Flashcards = () => {
  const { data } = useLocalSearchParams();
  const parsedData = convertStringToObject(data as string).map(
    (flashcard: FlashCard, index: any) => ({
      ...flashcard,
      originalIndex: index,
    })
  );
  const goToNextFlashcard = () => {
    if (totalFlashcards > 0) {
      setCurrentFlashcardIndex((prevIndex) => (prevIndex + 1) % totalFlashcards);
    }
  };

  const goToPreviousFlashcard = () => {
    if (totalFlashcards > 0) {
      setCurrentFlashcardIndex((prevIndex) => (prevIndex - 1 + totalFlashcards) % totalFlashcards);
    }
  };
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [knownCards, setKnownCards] = useState<number[]>([]);
  const [filter, setFilter] = useState<'all' | 'known' | 'unknown'>('all');

  const filteredFlashcards = parsedData.filter((flashcard: FlashCard) => {
    if (filter === 'known') return knownCards.includes(flashcard.originalIndex!);
    if (filter === 'unknown') return !knownCards.includes(flashcard.originalIndex!);
    return true;
  });

  const totalFlashcards = filteredFlashcards.length;
  const currentFlashcard = filteredFlashcards[currentFlashcardIndex] || null;

  const handleFilterChange = (newFilter: 'all' | 'known' | 'unknown') => {
    setFilter(newFilter);
    setCurrentFlashcardIndex(0);
  };

  const toggleKnownStatus = () => {
    if (currentFlashcard) {
      setKnownCards((prev) =>
        prev.includes(currentFlashcard.originalIndex)
          ? prev.filter((index) => index !== currentFlashcard.originalIndex)
          : [...prev, currentFlashcard.originalIndex]
      );
    }
  };

  return (
    <ScrollView className="min-h-full bg-gray-50 p-4">
      <View className="mb-4 flex-row justify-center space-x-4">
        <TouchableOpacity
          onPress={() => handleFilterChange('all')}
          className={`rounded-full px-4 py-2 ${filter === 'all' ? 'bg-blue-500' : 'bg-gray-300'}`}>
          <Text className="font-semibold text-white">All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFilterChange('known')}
          className={`rounded-full px-4 py-2 ${
            filter === 'known' ? 'bg-green-500' : 'bg-gray-300'
          }`}>
          <Text className="font-semibold text-white">Known</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleFilterChange('unknown')}
          className={`rounded-full px-4 py-2 ${
            filter === 'unknown' ? 'bg-red-500' : 'bg-gray-300'
          }`}>
          <Text className="font-semibold text-white">Unknown</Text>
        </TouchableOpacity>
      </View>

      {totalFlashcards > 0 ? (
        currentFlashcard && (
          <View className="mt-10 items-center justify-center">
            <Text className="mb-4 mt-4 text-xl font-semibold text-gray-800">
              {currentFlashcardIndex + 1} / {totalFlashcards}
            </Text>
            <FlipCard
              term={currentFlashcard.term}
              definition={currentFlashcard.definition}
              kanji={currentFlashcard.kanji}
            />
            <View className="mt-6 w-full flex-row justify-between">
              <TouchableOpacity
                onPress={goToPreviousFlashcard}
                className="rounded-full bg-blue-500 px-6 py-3 shadow-lg">
                <Text className="text-base font-semibold text-white">Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={goToNextFlashcard}
                className="rounded-full bg-blue-500 px-6 py-3 shadow-lg">
                <Text className="text-base font-semibold text-white">Next</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={toggleKnownStatus}
              className={`mt-6 w-3/4 rounded-full px-6 py-3 shadow-lg ${
                knownCards.includes(currentFlashcard.originalIndex) ? 'bg-green-500' : 'bg-gray-400'
              }`}>
              <Text className="text-base font-semibold text-white">
                {knownCards.includes(currentFlashcard.originalIndex)
                  ? 'Mark as Unknown'
                  : 'Mark as Known'}
              </Text>
            </TouchableOpacity>
          </View>
        )
      ) : (
        <Text className="mt-10 text-center text-xl font-semibold text-gray-600">
          No flashcards found for the selected filter.
        </Text>
      )}
    </ScrollView>
  );
};
export default Flashcards;
