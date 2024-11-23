import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const getCourseTitleAndDescription = async () => {
  try {
    const courseTitle = await AsyncStorage.getItem('courseTitle');
    const courseDescription = await AsyncStorage.getItem('courseDescription');
    return {
      courseTitle: courseTitle || 'No title available',
      courseDescription: courseDescription || 'No description available',
    };
  } catch (error) {
    console.error('Error fetching course details', error);
    return { courseTitle: 'Error', courseDescription: 'Error fetching data' };
  }
};

const HomeScreen = () => {
  const router = useRouter();
  const [courseDetails, setCourseDetails] = useState({
    courseTitle: 'Loading...',
    courseDescription: 'Please wait...',
  });

  const motivationalQuotes = [
    '継続は力なり  - Perseverance is power.',
    '失敗は成功のもと - Failure is the foundation of success.',
    '毎日少しずつ進歩しよう - Improve a little every day.',
    '挑戦し続ける人だけが成功する - Only those who keep challenging succeed.',
    "今日も頑張りましょう！- Let's do our best today!",
  ];

  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const details = await getCourseTitleAndDescription();
      setCourseDetails(details);
    };
    fetchCourseDetails();

    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setCurrentQuote(randomQuote);
  }, []);
  const openWebPage = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        <View className="mt-6 flex-row items-center justify-between px-6">
          <View>
            <Text className="text-4xl font-extrabold text-orange-600">こんにちは!</Text>
            <Text className="mt-2 text-lg text-gray-600">Unlock your potential today!</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push('/profile')}
            className="h-16 w-16 items-center justify-center rounded-full bg-orange-100 shadow-lg">
            <MaterialCommunityIcons name="account-circle" size={48} color="#f97316" />
          </TouchableOpacity>
        </View>

        <View className="w-full px-4">
          <Image
            source={{
              uri: 'https://png.pngtree.com/background/20230412/original/pngtree-japanese-style-original-painting-scene-map-picture-image_2397028.jpg',
            }}
            className="mt-6 h-44 w-full rounded-3xl"
            resizeMode="cover"
          />
        </View>

        <View className="mx-6 mt-6 rounded-3xl bg-orange-50 p-6 shadow-md">
          <Text className="text-center text-lg font-medium text-gray-800">{currentQuote}</Text>
        </View>
        <View className="mt-8 px-6">
          <Text className="text-2xl font-semibold text-gray-800">Course Information</Text>
          <View className="mt-6 rounded-3xl bg-white p-6 shadow-xl">
            <Text className="text-xl font-bold text-orange-600">{courseDetails.courseTitle}</Text>
            <Text className="mt-2 text-base text-gray-600">{courseDetails.courseDescription}</Text>
            <TouchableOpacity
              className="mt-6 rounded-xl bg-orange-500 py-4 shadow-lg"
              onPress={() => {
                router.push('/(tabs)/lesson');
              }}>
              <Text className="text-center text-lg font-semibold text-white">
                Continue Learning
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mb-10 mt-10 px-6">
          <Text className="text-2xl font-semibold text-gray-800">Explore Japanese Culture</Text>
          <View className="mt-6 flex-row gap-x-4">
            <TouchableOpacity
              className="flex-1 rounded-3xl bg-orange-50 p-4 shadow-lg"
              onPress={() => openWebPage('https://japanstartshere.com/mt-fuji-travel-guide/')}>
              <Image
                source={{
                  uri: 'https://th.bing.com/th/id/OIP.eAqi3cJK6PtrhXKoNLO5_AHaE5?rs=1&pid=ImgDetMain',
                }}
                className="h-24 w-full rounded-2xl"
                resizeMode="cover"
              />
              <Text className="mt-3 text-center text-sm font-medium text-gray-700">Mount Fuji</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 rounded-3xl bg-orange-50 p-4 shadow-lg"
              onPress={() => openWebPage('https://www.insidekyoto.com/best-temples-in-kyoto')}>
              <Image
                source={{
                  uri: 'https://www.tripsavvy.com/thmb/ev0007c95KFudpJxlJjcbthkWbM=/2121x1414/filters:fill(auto,1)/GettyImages-530105220-5c337bae46e0fb00012fcdfb.jpg',
                }}
                className="h-24 w-full rounded-2xl"
                resizeMode="cover"
              />
              <Text className="mt-3 text-center text-sm font-medium text-gray-700">
                Kyoto Temples
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
