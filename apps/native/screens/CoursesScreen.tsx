import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, Pressable, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import axiosInstance from '~/helper/axios';
import { setCourseid } from '~/utils/store';

export interface Course {
  id: string;
  title: string;
  description: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
}

const CoursesScreen = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/course/all');
        setCourses(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        setError('Failed to load courses. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);
  const handleSeletedCourse = async (courseId: string) => {
    await setCourseid(courseId);
    router.push('/(tabs)/lesson');
  }
  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#f18b2f" />
        <Text className="mt-4 text-lg text-gray-700">Loading courses...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white px-6">
        <Ionicons name="alert-circle" size={48} color="red" />
        <Text className="mt-4 text-lg font-bold text-red-500">Error</Text>
        <Text className="mt-2 text-center text-sm text-gray-600">{error}</Text>
        <Pressable
          onPress={() => {
            setLoading(true);
            setError(null);
          }}
          className="mt-4 rounded bg-orange-500 px-4 py-2">
          <Text className="text-white">Retry</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="border-b border-gray-200 px-4 py-4">
        <Text className="text-2xl font-bold text-orange-500">Available Courses</Text>
        <Text className="mt-1 text-sm text-gray-500">
          Select a course to start learning and improving your Japanese skills.
        </Text>
      </View>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <Pressable
            className="mb-4 rounded-lg bg-orange-100 p-4 shadow-sm hover:bg-orange-200"
            onPress={() => {
              handleSeletedCourse(item.id as string)
            }}>
            <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
            <Text className="mt-2 text-sm text-gray-600">{item.description}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="items-center justify-center py-16">
            <Ionicons name="book-outline" size={48} color="gray" />
            <Text className="mt-4 text-gray-500">No courses available right now.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default CoursesScreen;
