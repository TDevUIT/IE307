import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useAuth } from '~/context/AuthContext';
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

interface DialogueFlow {
  turn: number;
  question: string;
  answer: string | null;
}

const ConversationDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [conversationDetails, setConversationDetails] = useState<Conversation | null>(null);
  const [dialogueFlow, setDialogueFlow] = useState<DialogueFlow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userMessage, setUserMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const { profile } = useAuth();

  useEffect(() => {
    const handleGetConversation = async () => {
      if (id) {
        try {
          const response = await axiosInstance.get(`/conversation/${id}`, {
            headers: {
              userId: profile?.id,
            },
          });
          const conversation = response.data.data;
          setConversationDetails(conversation.conversationDetails);
          const parsedFlow = JSON.parse(conversation.conversationHistory.jsonContentTotals);
          setDialogueFlow(parsedFlow);
        } catch (error) {
          console.error('Error fetching conversation details', error);
        } finally {
          setLoading(false);
        }
      }
    };

    handleGetConversation();
  }, [id]);

  const handleSendMessage = async () => {
    if (userMessage.trim() !== '' && dialogueFlow) {
      setIsSending(true);
      const updatedFlow = dialogueFlow.map((item, index) =>
        index === dialogueFlow.length - 1 ? { ...item, answer: userMessage } : item
      );

      try {
        setDialogueFlow(updatedFlow);
        setUserMessage('');
        const response = await axiosInstance.post(
          `/conversation/save-answer`,
          {
            conversation: {
              id: conversationDetails?.id,
              scene: conversationDetails?.title,
              target: conversationDetails?.target,
              description: conversationDetails?.description,
            },
            dialogueFlow: updatedFlow,
          },
          {
            headers: {
              userId: profile?.id,
            },
          }
        );

        const jsonNextTurn: DialogueFlow = JSON.parse(response.data.data);
        setDialogueFlow((prev) => (prev ? [...prev, jsonNextTurn] : [jsonNextTurn]));
      } catch (error) {
        console.error('Error updating dialogue flow', error);
      } finally {
        setIsSending(false);
      }
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#1D4ED8" />
        <Text className="mt-4 text-lg text-gray-600">Loading Conversation...</Text>
      </View>
    );
  }

  if (!conversationDetails || !dialogueFlow) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-lg text-gray-600">No conversation details found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="mb-6 text-center text-gray-500">{conversationDetails.description}</Text>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 16 }}>
        {dialogueFlow.map((turn, index) => (
          <View key={index}>
            <View className="mb-4 max-w-[75%] self-start rounded-lg bg-gray-100 p-4">
              <View className="flex flex-row items-center">
                <FontAwesome5 name="robot" size={24} color="black" />
                <Text className="ml-2 mt-1 text-lg font-semibold text-blue-600">Kapi</Text>
              </View>
              <Text className="mt-2 text-lg">{turn.question}</Text>
            </View>
            {turn.answer && (
              <View className="mb-4 max-w-[75%] self-end rounded-lg bg-blue-100 p-4">
                <View className="flex-row items-center justify-end">
                  <Text className="mr-2 text-lg font-semibold text-green-600">User</Text>
                  <Ionicons name="person" size={18} color="#16A34A" />
                </View>
                <Text className="mt-2 text-lg">{turn.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input Field */}
      <View className="mt-4 flex-row items-center">
        <TextInput
          value={userMessage}
          onChangeText={setUserMessage}
          placeholder="Type a message..."
          className="flex-1 rounded-lg border border-gray-300 p-3"
        />
        <TouchableOpacity onPress={handleSendMessage} className="ml-2 rounded-full bg-blue-500 p-3">
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConversationDetails;
