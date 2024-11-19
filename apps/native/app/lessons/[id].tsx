import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

import axiosInstance from '~/helper/axios';
import { FlashCard, Grammar, MiniTest, Vocabulary } from '~/types/type';

const exampleLessonDetails = {
  flashCards: [
    {
      id: 1,
      term: '日本語',
      definition: 'Japanese language',
      kanji: '日本語',
      lessonId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      term: '勉強',
      definition: 'Study',
      kanji: '勉強',
      lessonId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      term: '漢字',
      definition: 'Kanji characters',
      kanji: '漢字',
      lessonId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  grammars: [
    {
      id: 1,
      rule: '～たい',
      description: 'Used to express a desire to do something.',
      lessonId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      rule: '～ている',
      description: 'Used to describe an ongoing action or a state of being.',
      lessonId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      rule: '～たことがある',
      description: 'Used to express that one has experienced something before.',
      lessonId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      rule: '～から',
      description: 'Used to explain the reason or cause of something.',
      lessonId: 1,
      example: '疲れたから、寝ます。 (Because I’m tired, I will sleep.)',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      rule: '～と思います',
      description: 'Used to express the speaker’s opinion or belief.',
      lessonId: 1,
      example: '明日は晴れると思います。 (I think it will be sunny tomorrow.)',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  vocabularies: [
    {
      id: 1,
      wordJP: '日本語',
      wordVN: 'Japanese language',
      kanji: '日本語',
      lessonId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      wordJP: '勉強',
      wordVN: 'Study',
      kanji: '勉強',
      lessonId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      wordJP: '漢字',
      wordVN: 'Kanji characters',
      kanji: '漢字',
      lessonId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  miniTests: [
    {
      id: 1,
      question: 'What is Japanese for "study"?',
      answer: '勉強',
      lessonId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      question: 'What is Kanji for "Japanese language"?',
      answer: '日本語',
      lessonId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      question: 'What is Kanji for "study"?',
      answer: '勉強',
      lessonId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

export default function LessonDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [lessonDetails, setLessonDetails] =
    useState<typeof exampleLessonDetails>(exampleLessonDetails);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchLessonDetails = async () => {
      try {
        // const response = await axiosInstance.get(`lessons/${id}`);
        // setLessonDetails(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lesson details:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchLessonDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-4">
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="mt-2 text-lg font-medium text-blue-600">Loading lesson details...</Text>
      </View>
    );
  }

  if (!lessonDetails) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-4">
        <Text className="text-center text-lg text-gray-500">No data available</Text>
        <TouchableOpacity
          className="mt-4 rounded-lg bg-blue-600 px-5 py-2 shadow-md"
          onPress={() => router.back()}>
          <Text className="font-semibold text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { flashCards, grammars, vocabularies, miniTests } = lessonDetails;

  const handleRouter = (
    title: string,
    routePrefix: string,
    data: FlashCard[] | Grammar[] | Vocabulary[] | MiniTest[]
  ) => {
    router.push({
      pathname: `/${routePrefix}`,
      params: { title, data: JSON.stringify(data) },
    });
  };

  const sections = [
    {
      title: 'Flashcards',
      data: flashCards,
      icon: 'collections-bookmark' as const,
      routePrefix: 'flashcards',
    },
    {
      title: 'Grammars',
      data: grammars,
      icon: 'text-fields' as const,
      routePrefix: 'grammars',
    },
    {
      title: 'Vocabularies',
      data: vocabularies,
      icon: 'translate' as const,
      routePrefix: 'vocabularies',
    },
    {
      title: 'Mini Tests',
      data: miniTests,
      icon: 'quiz' as const,
      routePrefix: 'miniTests',
    },
  ];

  return (
    <ScrollView className="bg-gray-100 p-4">
      {sections.map((section) => (
        <LessonDetailsSection
          key={section.title}
          title={section.title}
          dataCount={section.data.length}
          icon={section.icon}
          onPress={() => handleRouter(section.title, section.routePrefix, section.data)}
        />
      ))}
    </ScrollView>
  );
}

interface LessonDetailsSectionProps {
  title: string;
  dataCount: number;
  icon: 'quiz' | 'collections-bookmark' | 'text-fields' | 'translate';
  onPress: () => void;
}

const LessonDetailsSection = ({ title, dataCount, icon, onPress }: LessonDetailsSectionProps) => {
  return (
    <View className="mt-8 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <MaterialIcons name={icon} size={28} color="#4F46E5" />
          <Text className="ml-3 text-xl font-bold text-gray-800">{title}</Text>
        </View>
        <TouchableOpacity className="rounded-full bg-indigo-600 px-5 py-2" onPress={onPress}>
          <Text className="text-sm font-semibold text-white">View All</Text>
        </TouchableOpacity>
      </View>
      <Text className="mt-2 text-gray-500">{dataCount} items available</Text>
    </View>
  );
};
