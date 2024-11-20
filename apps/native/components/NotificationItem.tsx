import React from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead }) => {
  const handlePress = () => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    } else {
      Alert.alert('This notification is already marked as read.');
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`p-4 mb-2 rounded-lg border ${
        notification.isRead ? 'bg-gray-100' : 'bg-white'
      } border-gray-300`}
    >
      <Text className="font-bold text-lg">{notification.title}</Text>
      <Text className="my-1">{notification.message}</Text>
      <Text className="text-xs text-gray-500">
        {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
      </Text>
    </TouchableOpacity>
  );
};

export default NotificationItem;
