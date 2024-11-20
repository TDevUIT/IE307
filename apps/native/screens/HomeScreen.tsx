import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="mt-4 flex-row items-center justify-between px-6">
        <View>
          <Text className="text-3xl font-extrabold text-orange-500">こんにちは!</Text>
          <Text className="mt-1 text-base text-gray-700">Ready to learn today?</Text>
        </View>
        <View className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-orange-400 bg-gray-200">
          <Link href="/(routes)/profile">
            <MaterialCommunityIcons name="account-circle" size={50} color="#f1872f" />
          </Link>
        </View>
      </View>
      <ScrollView className="mt-6 flex-1 px-6" showsVerticalScrollIndicator={false}>
        <Text className="text-xl font-semibold text-gray-800">Quick Options</Text>
        <ScrollView className="mt-4 flex-1" horizontal showsHorizontalScrollIndicator={false}>
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
                className="items-center rounded-2xl bg-orange-100 p-5 shadow-lg">
                {item.icon}
                <Text className="mt-2 text-sm font-medium text-gray-800">{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Text className="mt-8 text-xl font-semibold text-gray-800">Your Courses</Text>
        <View className="mt-4 rounded-xl bg-white p-4 shadow-sm">
          <Text className="text-lg font-bold text-orange-500">Japanese 101</Text>
          <Text className="mt-2 text-sm text-gray-600">
            Complete the next lesson to unlock new vocabulary.
          </Text>
          <TouchableOpacity className="mt-4 rounded-lg bg-orange-400 p-3">
            <Text className="text-center text-base font-semibold text-white">
              Continue Learning
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="mt-8 text-xl font-semibold text-gray-800">Your Progress</Text>
        <View className="mt-4 rounded-xl bg-orange-50 p-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <Text className="text-base text-gray-700">Daily Goal</Text>
            <Text className="text-base font-bold text-orange-500">80%</Text>
          </View>
          <View className="mt-2 h-3 rounded-full bg-gray-200">
            <View className="h-3 w-4/5 rounded-full bg-orange-400" />
          </View>
        </View>

        <Text className="mt-8 text-xl font-semibold text-gray-800">Today's Tasks</Text>
        <View className="mt-4 flex-row justify-between gap-x-2">
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
              className="flex-1 items-center rounded-xl bg-orange-100 p-4 shadow-sm">
              {item.icon}
              <Text className="mt-2 text-center text-sm font-medium text-gray-800">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
