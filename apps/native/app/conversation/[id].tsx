import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
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
const LIMITED_ANSWER = 15;

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
  const scrollViewRef = useRef<ScrollView>(null);
  const [kapiIsTyping, setKapiIsTyping] = useState<boolean>(false);
  const [currentIndexAnswers, setCurrentIndexAnswers] = useState<number>(0);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [currentTypingTurn, setCurrentTypingTurn] = useState<DialogueFlow | null>(null);

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
          const parsedFlow: DialogueFlow[] = conversation.conversationHistory.jsonContentTotals
            ? JSON.parse(conversation.conversationHistory.jsonContentTotals)
            : [];
          setDialogueFlow(parsedFlow);
          setCurrentIndexAnswers(parsedFlow.filter((item) => item.turn !== null).length);
        } catch (error) {
          console.error('Error fetching conversation details', error);
        } finally {
          setLoading(false);
        }
      }
    };

    handleGetConversation();
  }, [id]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [dialogueFlow, loading, currentTypingTurn]);

  const handleSendMessage = async () => {
    if (userMessage.trim() !== '' && dialogueFlow && currentIndexAnswers <= LIMITED_ANSWER) {
      setIsSending(true);
      const updatedFlow = [...dialogueFlow];
      updatedFlow[dialogueFlow.length - 1] = {
        ...updatedFlow[dialogueFlow.length - 1],
        answer: userMessage,
      };

      try {
        setDialogueFlow(updatedFlow);
        setUserMessage('');
        setKapiIsTyping(true);
        const response = await axiosInstance.post(
          `/conversation/save-answer`,
          {
            conversationId: id,
            conversation: {
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
        simulateTypingAnimation(jsonNextTurn.question, () => {
          setDialogueFlow((prev) => [...prev, jsonNextTurn]);
          setKapiIsTyping(false);
        });
      } catch (error) {
        console.error('Error updating dialogue flow', error);
      } finally {
        setCurrentIndexAnswers(currentIndexAnswers + 1);
        setIsSending(false);
        setKapiIsTyping(false);
      }
    }
  };

  const simulateTypingAnimation = (message: string, onComplete: () => void) => {
    let index = 0;
    setCurrentTypingTurn({
      turn: dialogueFlow.length,
      question: 'Kapi is typing...',
      answer: null,
    });

    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    typingIntervalRef.current = setInterval(() => {
      if (index < message.length) {
        setCurrentTypingTurn((prev) =>
          prev
            ? {
                ...prev,
                question:
                  prev.question === 'Kapi is typing...'
                    ? message[index]
                    : prev.question + message[index],
              }
            : null
        );
        index++;
      } else {
        clearInterval(typingIntervalRef.current as NodeJS.Timeout);
        onComplete();
        setCurrentTypingTurn(null);
      }
    }, 100);
  };

  const isSendButtonDisabled =
    currentIndexAnswers === LIMITED_ANSWER || currentTypingTurn !== null || isSending;

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#1D4ED8" />
        <Text className="mt-4 text-lg text-gray-600">Loading Conversation...</Text>
      </View>
    );
  }

  if (!conversationDetails || !dialogueFlow.length) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-lg text-gray-600">No conversation details found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="mb-6 text-center text-gray-500">{conversationDetails.description}</Text>
      <Text className="text-center text-2xl text-blue-500">
        {currentIndexAnswers} / {LIMITED_ANSWER}
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 16 }}
        ref={scrollViewRef}>
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
        {currentTypingTurn ? (
          <View className="mb-4 max-w-[75%] self-start rounded-lg bg-gray-100 p-4">
            <View className="flex flex-row items-center">
              <FontAwesome5 name="robot" size={24} color="black" />
              <Text className="ml-2 mt-1 text-lg font-semibold text-blue-600">Kapi</Text>
            </View>
            <Text className="mt-2 text-lg">{currentTypingTurn.question}</Text>
          </View>
        ) : (
          kapiIsTyping && (
            <View className="mb-4 max-w-[75%] self-start rounded-lg bg-gray-100 p-4">
              <View className="flex flex-row items-center">
                <FontAwesome5 name="robot" size={24} color="black" />
                <Text className="ml-2 mt-1 text-lg font-semibold text-blue-600">Kapi</Text>
              </View>
              <Text className="mt-2 text-lg">Kapi is typing...</Text>
            </View>
          )
        )}
      </ScrollView>

      {currentIndexAnswers === LIMITED_ANSWER ? (
        <View className="mt-4 flex-row items-center justify-center">
          <TouchableOpacity
            onPress={() => alert('Feedback Button Pressed')}
            className="flex-row items-center justify-center rounded-full bg-blue-500 p-4">
            <Ionicons name="thumbs-up" size={24} color="white" />
            <Text className="ml-2 text-white">Go to Your Feedback</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="mt-4 flex-row items-center">
          <TextInput
            placeholder="Your message..."
            value={userMessage}
            onChangeText={setUserMessage}
            className="flex-1 rounded-lg border border-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            className={`ml-4 rounded-full p-4 ${isSendButtonDisabled ? 'bg-gray-400' : 'bg-blue-500'}`}
            disabled={isSendButtonDisabled}>
            <Ionicons name="send" size={24} color={isSendButtonDisabled ? '#A0AEC0' : 'white'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ConversationDetails;
