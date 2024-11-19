import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native';

import axiosInstance from '~/helper/axios';

interface Lesson {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const LessonScreen = () => {
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonTitle, setLessonTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleRouter = (id: string, title: string) => {
    router.push({
      pathname: '/lessons/[id]',
      params: { id, title },
    });
  };

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axiosInstance.get('/course/1929263e-a607-420b-95d4-31d7d87c04ad');
        setLessonTitle(response.data.data.title);
        setLessons(response.data.data.lessons);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const renderLesson = ({ item }: { item: Lesson }) => (
    <Pressable
      onPress={() => handleRouter(item.id, item.title)}
      className="mb-4 rounded-lg border border-gray-300 bg-white p-4 shadow">
      <Text className="mb-2 text-lg font-semibold">{item.title}</Text>
      <Text className="mb-2 text-sm font-medium">{item.content}</Text>
    </Pressable>
  );

  return (
    <View className="p-4">
      {isLoading ? (
        <View className="flex h-full w-full items-center justify-center">
          <ActivityIndicator size="large" color="#F17F2F" />
        </View>
      ) : (
        <>
          <Text className="mb-6 text-2xl font-bold">{lessonTitle}</Text>
          <FlatList
            data={lessons}
            keyExtractor={(item) => item.id}
            renderItem={renderLesson}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </>
      )}
    </View>
  );
};

export default LessonScreen;
