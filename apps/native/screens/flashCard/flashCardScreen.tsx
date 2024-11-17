import { Ionicons } from '@expo/vector-icons'; // Sử dụng biểu tượng từ @expo/vector-icons
import { useRouter } from 'expo-router'; // Sử dụng Expo Router cho điều hướng
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import FlipCard from '~/components/flipCard';

type FlashCard = {
  id: string;
  term: string;
  definition: string;
  kanji: string;
};

type Lesson = {
  id: string;
  title: string;
  flashCards: FlashCard[];
};

const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Bài 1: Chào hỏi cơ bản',
    flashCards: [
      { id: '1', term: 'こんにちは', definition: 'Xin chào', kanji: '今日は' },
      { id: '2', term: 'さようなら', definition: 'Tạm biệt', kanji: '左様なら' },
    ],
  },
  {
    id: '2',
    title: 'Bài 2: Số đếm',
    flashCards: [
      { id: '1', term: '一', definition: 'Số một', kanji: '一' },
      { id: '2', term: '二', definition: 'Số hai', kanji: '二' },
      { id: '3', term: '三', definition: 'Số ba', kanji: '三' },
    ],
  },
];

const LessonListFlashCard: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter(); 

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (selectedLesson && currentIndex < selectedLesson.flashCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {!selectedLesson ? (
        lessons.map((lesson) => (
          <TouchableOpacity
            key={lesson.id}
            onPress={() => handleSelectLesson(lesson)}
            className="mb-4 flex-row items-center rounded-lg bg-white p-4 shadow-md">
            <Ionicons name="book-outline" size={24} color="#f18b2f" className="mr-4" />
            <Text className="text-lg font-bold text-gray-800">{lesson.title}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <View className="flex-1 items-center">
          <TouchableOpacity
            onPress={() => setSelectedLesson(null)}
            className="mb-4 flex-row items-center rounded-lg bg-orange-400 p-2 shadow-md">
            <Ionicons name="arrow-back-outline" size={20} color="white" className="mr-2" />
            <Text className="text-center text-white">Quay lại danh sách bài học</Text>
          </TouchableOpacity>

          {selectedLesson.flashCards.length > 0 && (
            <FlipCard
              term={selectedLesson.flashCards[currentIndex].term}
              definition={selectedLesson.flashCards[currentIndex].definition}
              kanji={selectedLesson.flashCards[currentIndex].kanji}
            />
          )}
          <View className="mt-4 flex-row">
            <TouchableOpacity
              onPress={handlePrevious}
              disabled={currentIndex === 0}
              className={`mr-4 flex-row items-center rounded-lg border p-2 ${
                currentIndex === 0 ? 'border-gray-300 bg-gray-200' : 'border-blue-500 bg-blue-500'
              }`}>
              <Ionicons
                name="chevron-back-outline"
                size={20}
                color={currentIndex === 0 ? 'gray' : 'white'}
              />
              <Text className={`ml-1 ${currentIndex === 0 ? 'text-gray-500' : 'text-white'}`}>
                Quay lại
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNext}
              disabled={selectedLesson && currentIndex === selectedLesson.flashCards.length - 1}
              className={`flex-row items-center rounded-lg border p-2 ${
                selectedLesson && currentIndex === selectedLesson.flashCards.length - 1
                  ? 'border-gray-300 bg-gray-200'
                  : 'border-blue-500 bg-blue-500'
              }`}>
              <Text
                className={`mr-1 ${
                  selectedLesson && currentIndex === selectedLesson.flashCards.length - 1
                    ? 'text-gray-500'
                    : 'text-white'
                }`}>
                Tiếp theo
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={
                  selectedLesson && currentIndex === selectedLesson.flashCards.length - 1
                    ? 'gray'
                    : 'white'
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default LessonListFlashCard;
