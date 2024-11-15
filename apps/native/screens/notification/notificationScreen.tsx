import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const IPv4 = Constants.expoConfig?.extra?.EXPO_PUBLIC_SERVER_URL;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const response = await axios.get(`${IPv4}/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data as Notification[]);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications([
          {
            id: 1,
            title: 'Welcome to the App!',
            message: 'Thank you for signing up!',
            timestamp: '2024-11-15 10:30:00',
            isRead: false,
          },
          {
            id: 2,
            title: 'System Update',
            message: 'Your profile picture has been updated successfully.',
            timestamp: '2024-11-14 08:15:00',
            isRead: true,
          },
        ]);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      await axios.put(`${IPv4}/notifications/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === id ? { ...notif, isRead: true } : notif
        )
      );
      Alert.alert('Notification marked as read');
    } catch (error) {
      console.error('Error marking notification as read:', error);
      Alert.alert('Failed to mark notification as read');
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      onPress={() => {
        if (!item.isRead) markAsRead(item.id);
      }}
      className={`p-4 mb-2 rounded-lg border ${
        item.isRead ? 'bg-red-100' : 'bg-white'
      } border-gray-300`}
    >
      <Text className="font-bold text-lg">{item.title}</Text>
      <Text className="my-1">{item.message}</Text>
      <Text className="text-xs text-gray-500">{item.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 p-4 bg-[#f1aa6a]">
      <Text className="text-2xl font-bold mb-4">Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No notifications available.</Text>}
      />
    </View>
  );
};

export default NotificationScreen;
