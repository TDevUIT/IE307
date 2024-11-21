import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
      } catch (err) {
        setError('Failed to load courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleSelectedCourse = async (courseId: string) => {
    await setCourseid(courseId);
    router.push('/(tabs)/lesson');
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#f18b2f" />
        <Text className="mt-4 text-lg text-gray-600">Loading courses...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white px-6">
        <Ionicons name="alert-circle-outline" size={48} color="#FF6F61" />
        <Text className="mt-4 text-lg font-semibold text-gray-800">Something went wrong</Text>
        <Text className="mt-2 text-center text-sm text-gray-500">{error}</Text>
        <Pressable
          onPress={() => {
            setLoading(true);
            setError(null);
          }}
          className="mt-6 rounded-lg bg-orange-500 px-6 py-3">
          <Text className="font-medium text-white">Retry</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="border-b border-gray-200 bg-gradient-to-b from-orange-100 to-white px-6 py-8">
        <Text className="text-3xl font-extrabold text-orange-500">Available Courses</Text>
        <Text className="mt-2 text-sm text-gray-600">
          Select a course to start learning and improving your Japanese skills.
        </Text>
      </View>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelectedCourse(item.id)}
            className="mb-4 flex-row items-center rounded-lg bg-white p-4 shadow-md"
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 2,
            }}>
            <Ionicons
              name="book"
              size={28}
              color="#F18B2F"
              style={{
                backgroundColor: '#FFF4E1',
                padding: 10,
                borderRadius: 24,
                marginRight: 12,
              }}
            />
            <View>
              <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
              <Text className="mt-1 text-sm text-gray-500">{item.description}</Text>
            </View>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View className="h-4" />}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Ionicons name="book-outline" size={64} color="#D3D3D3" />
            <Text className="mt-4 text-sm text-gray-500">No courses available at the moment.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default CoursesScreen;
