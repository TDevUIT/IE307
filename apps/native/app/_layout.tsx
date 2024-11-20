import { AuthProvider } from '~/context/AuthContext';
import { CourseProvider } from '~/context/CourseContext';
import '../global.css';

import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
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
          name="(routes)/profile"
          options={() => {
            return {
              headerShown: true,
              title: `Profile`,
              headerStyle: { backgroundColor: '#f7c6a3' },
            };
          }}
        />
        <Stack.Screen name="(routes)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
