import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="mt-6 flex-row items-center justify-between px-6">
        <View>
          <Text className="text-4xl font-extrabold text-orange-500">こんにちは!</Text>
          <Text className="mt-2 text-lg text-gray-600">Ready to learn today?</Text>
        </View>
        <TouchableOpacity className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 shadow-md">
          <Link href="/(routes)/profile">
            <MaterialCommunityIcons name="account-circle" size={50} color="#f1872f" />
          </Link>
        </TouchableOpacity>
      </View>
      <ScrollView className="mt-6 px-4" showsVerticalScrollIndicator={false}>
        <View>
          <Text className="text-xl font-semibold text-gray-800">Quick Options</Text>
          <ScrollView
            className="mt-4"
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}>
            <View className="flex-row gap-x-4">
              {[
                {
                  icon: <FontAwesome5 name="chalkboard-teacher" size={28} color="#f1872f" />,
                  label: 'Flashcards',
                },
                {
                  icon: <MaterialCommunityIcons name="book-outline" size={30} color="#f1872f" />,
                  label: 'Grammar',
                },
                {
                  icon: (
                    <MaterialCommunityIcons name="format-list-bulleted" size={30} color="#f1872f" />
                  ),
                  label: 'Vocabulary',
                },
                {
                  icon: <MaterialCommunityIcons name="alarm" size={30} color="#f1872f" />,
                  label: 'Reminders',
                },
                {
                  icon: <FontAwesome5 name="calendar-check" size={28} color="#f1872f" />,
                  label: 'Daily Lessons',
                },
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="items-center rounded-2xl bg-orange-100 p-5 shadow-md">
                  {item.icon}
                  <Text className="mt-2 text-sm font-medium text-gray-800">{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View className="mt-8">
          <Text className="text-xl font-semibold text-gray-800">Your Courses</Text>
          <View className="mt-4 rounded-xl bg-white p-6 shadow-lg">
            <Text className="text-lg font-bold text-orange-500">Japanese 101</Text>
            <Text className="mt-2 text-base text-gray-600">
              Complete the next lesson to unlock new vocabulary.
            </Text>
            <TouchableOpacity className="mt-6 rounded-lg bg-orange-400 p-4 shadow-md">
              <Text className="text-center text-base font-semibold text-white">
                Continue Learning
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-8">
          <Text className="text-xl font-semibold text-gray-800">Your Progress</Text>
          <View className="mt-4 rounded-xl bg-orange-50 p-5 shadow-md">
            <View className="flex-row items-center justify-between">
              <Text className="text-base text-gray-700">Daily Goal</Text>
              <Text className="text-base font-bold text-orange-500">80%</Text>
            </View>
            <View className="mt-2 h-4 rounded-full bg-gray-200">
              <View className="h-4 w-4/5 rounded-full bg-orange-400" />
            </View>
          </View>
        </View>

        <View className="mt-8">
          <Text className="text-xl font-semibold text-gray-800">Today's Tasks</Text>
          <ScrollView
            className="mt-4"
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingHorizontal: 8 }}>
            {[
              {
                icon: (
                  <MaterialCommunityIcons name="book-open-page-variant" size={28} color="#f1872f" />
                ),
                label: 'Review Grammar',
              },
              {
                icon: <FontAwesome5 name="book-reader" size={28} color="#f1872f" />,
                label: 'Vocabulary Review',
              },
              {
                icon: <FontAwesome5 name="chalkboard-teacher" size={28} color="#f1872f" />,
                label: 'Flashcard Practice',
              },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                className="items-center rounded-xl bg-orange-100 p-5 shadow-lg">
                {item.icon}
                <Text className="mt-2 text-center text-sm font-medium text-gray-800">
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
