import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { SafeAreaView, Text, View } from 'react-native';

export default function TabLayout() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#F39C12',
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel: false,
            headerShown: false,
          }}>
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: ({ color }) => <FontAwesome name="home" size={30} color={color} />,
            }}
          />
          <Tabs.Screen
            name="lesson"
            options={{
              tabBarIcon: ({ color }) => <FontAwesome name="book" size={30} color={color} />,
            }}
          />
          {/* <Tabs.Screen
            name="rank"
            options={{
              tabBarIcon: ({ color }) => <FontAwesome name="trophy" size={30} color={color} />,
            }}
          /> */}
          {/* <Tabs.Screen
            name="flashcards"
            options={{
              tabBarIcon: ({ color }) => <FontAwesome name="clone" size={30} color={color} />,
            }}
          /> */}
          <Tabs.Screen
            name="videos"
            options={{
              tabBarIcon: ({ color }) => (
                <FontAwesome name="video-camera" size={30} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </SafeAreaView>
  );
}
