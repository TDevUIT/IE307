import { MaterialIcons } from '@expo/vector-icons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
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
      className="mb-4 rounded-lg p-4"
      style={{
        backgroundColor: '#F9F9F9',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        borderColor: '#E6E6E6',
        borderWidth: 1,
      }}
      android_ripple={{ color: '#F2F2F2', borderless: false }}>
      <View className="flex-row items-center">
        {item.thumbnail ? (
          <Image
            source={{ uri: item.thumbnail }}
            className="mr-4 h-16 w-16 rounded-md"
            style={{
              resizeMode: 'cover',
              borderColor: '#FFD9A0',
              borderWidth: 0.5,
            }}
          />
        ) : (
          <View className="mr-4 flex h-16 w-16 items-center justify-center rounded-md bg-gray-100">
            <MaterialIcons name="image" size={28} color="#FFC89B" />
            <Text className="mt-1 text-xs text-gray-500">No Image</Text>
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text
            className="mb-1 text-base font-semibold"
            style={{
              color: '#333',
              flexShrink: 1,
            }}>
            {item.title}
          </Text>
          <Text
            className="text-sm"
            style={{
              color: '#666',
              lineHeight: 18,
              flexShrink: 1,
            }}
            numberOfLines={2}>
            {item.content}
          </Text>
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
            <View className="mr-4 flex-1">
              <Text
                className="text-3xl font-bold text-gray-800"
                numberOfLines={2}
                ellipsizeMode="tail">
                {lessonTitle}
              </Text>
            </View>
            <TouchableOpacity
              className="mb-1"
              onPress={() => {
                router.push({
                  pathname: '/cources',
                });
              }}>
              <EvilIcons name="navicon" size={28} color="black" />
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
