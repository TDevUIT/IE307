import { AuthProvider } from '~/context/AuthContext';
import '../global.css';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Alert, TouchableOpacity, View, Text, Modal } from 'react-native';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="lessons/[id]"
          options={({ route }) => {
            const { title } = route.params as { title: string };
            return {
              headerShown: true,
              title: `${title}`,
              headerStyle: { backgroundColor: '#f7c6a3' },
            };
          }}
        />
        <Stack.Screen
          name="conversation/[id]"
          options={({ route }) => {
            const { conversationTitle, target, description, timesToMatchTarget } = route.params as {
              conversationTitle: string;
              target: string;
              description: string;
              timesToMatchTarget: number | string;
            };

            return {
              headerShown: true,
              title: `${conversationTitle}`,
              headerStyle: { backgroundColor: '#f7c6a3' },
              headerRight: () => (
                <TouchableOpacity onPress={toggleModal}>
                  <MaterialIcons name="info" size={24} color="#FF7F50" />
                  <Modal
                    animationType="slide"
                    transparent
                    visible={isModalVisible}
                    onRequestClose={toggleModal}>
                    <View className="inset-0 flex-1 items-center justify-center">
                      <View className="w-3/4 rounded-xl bg-white bg-opacity-70 p-5 shadow-lg backdrop-blur-md">
                        <Text className="mb-3 text-lg font-bold text-orange-500">Guide</Text>
                        <Text className="mb-2 text-base text-gray-800">Detailed Information:</Text>
                        <Text className="mb-2 text-base text-gray-800">- Objective: {target}</Text>
                        <Text className="mb-2 text-base text-gray-800">
                          - Description: {description}
                        </Text>
                        <Text className="mb-4 text-base text-gray-800">
                          - Number of times to reach the target: {timesToMatchTarget}
                        </Text>
                        <TouchableOpacity
                          className="rounded-md bg-orange-500 px-4 py-2"
                          onPress={toggleModal}>
                          <Text className="text-lg text-white">Close</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </TouchableOpacity>
              ),
            };
          }}
        />

        <Stack.Screen
          name="flashcards/index"
          options={({ route }) => {
            const { title } = route.params as { title: string };
            return {
              headerShown: true,
              title: `${title}`,
              headerStyle: { backgroundColor: '#f7c6a3' },
            };
          }}
        />
        <Stack.Screen
          name="grammars/index"
          options={({ route }) => {
            const { title } = route.params as { title: string };
            return {
              headerShown: true,
              title: `${title}`,
              headerStyle: { backgroundColor: '#f7c6a3' },
            };
          }}
        />
        <Stack.Screen
          name="vocabularies/index"
          options={({ route }) => {
            const { title } = route.params as { title: string };
            return {
              headerShown: true,
              title: `${title}`,
              headerStyle: { backgroundColor: '#f7c6a3' },
            };
          }}
        />
        <Stack.Screen
          name="miniTests/index"
          options={({ route }) => {
            const { title } = route.params as { title: string };
            return {
              headerShown: true,
              title: `${title}`,
              headerStyle: { backgroundColor: '#f7c6a3' },
            };
          }}
        />
        <Stack.Screen
          name="miniTests/essay"
          options={({ route }) => {
            const { title } = route.params as { title: string };
            return {
              headerShown: true,
              title: `${title}`,
              headerStyle: { backgroundColor: '#f7c6a3' },
            };
          }}
        />
        <Stack.Screen
          name="miniTests/multipleChoice"
          options={({ route }) => {
            const { title } = route.params as { title: string };
            return {
              headerShown: true,
              title: `${title}`,
              headerStyle: { backgroundColor: '#f7c6a3' },
            };
          }}
        />
        <Stack.Screen
          name="miniTests/answer"
          options={({ route }) => {
            const { title } = route.params as { title: string };
            return {
              headerShown: true,
              title: `${title}`,
              headerStyle: { backgroundColor: '#f7c6a3' },
            };
          }}
        />
        <Stack.Screen
          name="(routes)/profile"
          options={() => {
            return {
              headerShown: true,
              title: `Profile`,
              headerStyle: { backgroundColor: '#f7c6a3' },
            };
          }}
        />
        <Stack.Screen
          name="cources/index"
          options={() => {
            return {
              headerShown: false,
            };
          }}
        />
        <Stack.Screen name="(routes)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
