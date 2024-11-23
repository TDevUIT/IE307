import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import axiosInstance from '~/helper/axios';

interface Conversation {
  id: string;
  title: string;
  description: string;
  defaultFirstMessage: string;
  timesToMatchTarget: number;
  target: string;
  jsonContent?: string;
  createdAt: string;
  updatedAt: string;
  profilePic?: string;
}

const ConversationsScreen = () => {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleGetConversations = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get('/conversation');
        const conversationsData = response.data.data;
        setConversations(conversationsData);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    handleGetConversations();
  }, []);

  const handleRouter = (
    conversationId: string,
    conversationTitle: string,
    target: string,
    description: string,
    timesToMatchTarget: number | string
  ) => {
    router.push({
      pathname: '/conversation/[id]',
      params: {
        id: conversationId,
        conversationTitle,
        target,
        description,
        timesToMatchTarget,
      },
    });
  };

  const renderItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity
      onPress={() =>
        handleRouter(item.id, item.title, item.target, item.description, item.timesToMatchTarget)
      }
      className="mx-4 mb-4 flex-row items-center rounded-lg bg-white p-5 shadow-lg hover:bg-gray-50">
      <Image source={{ uri: item.profilePic }} className="mr-5 h-16 w-16 rounded-full" />
      <View className="flex-1">
        <Text className="text-xl font-semibold text-gray-900">{item.title}</Text>
        <Text className="mt-2 text-sm text-gray-600">{item.description}</Text>
      </View>
      <Text className="text-xl text-gray-500">→</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="px-4 py-6">
        <Text className="text-4xl font-bold text-black">Conversations with AI</Text>
        <Text className="mt-2 text-lg">
          Practice Japanese with interactive and dynamic AI lessons.
        </Text>
      </View>
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#f18b2f" />
        </View>
      ) : (
        <FlatList
          data={conversations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text className="mt-20 text-center text-lg text-gray-500">
              No conversations available. Start your journey now!
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

export default ConversationsScreen;
