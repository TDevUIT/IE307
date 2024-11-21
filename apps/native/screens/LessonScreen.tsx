import { MaterialIcons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import axiosInstance from '~/helper/axios';
import { getCourseid } from '~/utils/store';

interface Lesson {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
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
        const courseId = await getCourseid();
        const response = await axiosInstance.get(`/course/${courseId}`);
        setLessonTitle(response.data.data.title);
        setLessons(response.data.data.lessons);
        console.log(response.data.data);
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
      className="mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
      style={{
        backgroundColor: '#FDFCFB',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
      }}>
      <View className="flex-row items-center">
        {item.thumbnail ? (
          <Image
            source={{ uri: item.thumbnail }}
            className="mr-4 h-16 w-16 rounded"
            style={{ resizeMode: 'cover' }}
          />
        ) : (
          <View className="mr-4 flex h-16 w-16 items-center justify-center rounded bg-gray-200">
            <MaterialIcons name="image" size={32} color="#CCCCCC" />
          </View>
        )}
        <View>
          <Text className="mb-1 text-lg font-bold text-gray-800">{item.title}</Text>
          <Text className="text-sm text-gray-600">{item.content}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-4">
      {isLoading ? (
        <View className="flex h-full w-full items-center justify-center">
          <ActivityIndicator size="large" color="#F17F2F" />
        </View>
      ) : (
        <>
          <View className="flex flex-row items-center justify-between py-2">
            <Text className="mr-4 text-3xl font-bold text-gray-800">{lessonTitle}</Text>
            <TouchableOpacity
              className="rounded-full bg-gray-200 p-2"
              onPress={() => {
                router.push({
                  pathname: '/cources',
                });
              }}>
              <MaterialIcons name="settings" size={24} color="gray" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={lessons}
            keyExtractor={(item) => item.id}
            renderItem={renderLesson}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default LessonScreen;
