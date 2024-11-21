import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Conversation {
  id: string;
  title: string;
  description: string;
  profilePic: string;
}

const conversations: Conversation[] = [
  {
    id: '1',
    title: 'Basic Greetings in Japanese',
    description: 'Learn the basic greetings like "Hello", "Goodbye", and "How are you?"',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    title: 'Japanese Numbers',
    description: 'Learn how to count in Japanese from 1 to 100.',
    profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    title: 'Common Phrases in Japanese',
    description: 'Master useful phrases for traveling in Japan.',
    profilePic: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
];

const ConversationsScreen = () => {
  const router = useRouter();
  const handleRouter = (conversationId: string, conversationTitle: string) => {
    router.push({
      pathname: '/conversation/[id]',
      params: {
        id: conversationId,
        conversationTitle,
      },
    });
  };

  const renderItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity
      onPress={() => handleRouter(item.id, item.title)}
      className="mx-4 mb-4 flex-row items-center rounded-lg bg-white p-5 shadow-md hover:bg-gray-50">
      <Image source={{ uri: item.profilePic }} className="mr-5 h-16 w-16 rounded-lg" />
      <View className="flex-1">
        <Text className="text-xl font-semibold text-gray-900">{item.title}</Text>
        <Text className="mt-2 text-sm text-gray-600">{item.description}</Text>
      </View>
      <Text className="text-lg text-gray-500">→</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="px-4 py-6">
        <Text className="text-3xl font-bold text-gray-800">Japanese Conversation</Text>
        <Text className="mt-2 text-lg text-gray-600">
          Discover various lessons to learn Japanese—from greetings to numbers and common phrases.
        </Text>
      </View>

      <FlatList data={conversations} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </SafeAreaView>
  );
};

export default ConversationsScreen;
