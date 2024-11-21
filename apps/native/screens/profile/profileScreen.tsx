import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { useAuth } from '~/context/AuthContext';
import axiosInstance from '~/helper/axios';
import { User } from '~/types/type';

const ProfileScreen = () => {
  const { profile, setProfile } = useAuth();
  const [userProfile, setUserProfile] = useState<User | null>(profile || null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      setUserProfile(profile);
      setLoading(false);
    }
  }, [profile]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
    }
  };

  const uploadPicture = async () => {
    if (!selectedImage || !userProfile) return;

    try {
      const response = await fetch(selectedImage);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('file', blob, 'picture.jpg');

      const responseData = await axiosInstance.post(`/user/${userProfile.id}/picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = responseData.data as { secure_url: string };
      Alert.alert('Picture updated successfully!');

      setUserProfile((prevProfile: User | null) => {
        if (!prevProfile) return prevProfile;
        return {
          ...prevProfile,
          picture: data.secure_url,
        };
      });
      setSelectedImage(null);
    } catch (error) {
      const errorMessage = (error as Error).message;
      Alert.alert('Failed to upload picture:', errorMessage);
    }
  };

  const handleUpdateProfile = async () => {
    if (!userProfile) return;

    try {
      await axiosInstance.put(`/user/${userProfile.id}/profile`, userProfile);
      Alert.alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      Alert.alert('Failed to update profile');
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#F17F2D" />
        <Text className="mt-4 text-lg text-orange-500">Loading your profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 p-6">
      <View className="items-center">
        <View className="relative mb-6">
          <Image
            source={{ uri: selectedImage || userProfile?.picture || '' }}
            className="h-40 w-40 rounded-full border-4 border-orange-500"
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={pickImage}
            className="absolute bottom-0 right-0 h-10 w-10 items-center justify-center rounded-full bg-orange-500">
            <Ionicons name="camera" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <Text className="mb-2 text-xl font-bold text-gray-800">
          {userProfile?.name || 'Your Name'}
        </Text>
        <Text className="mb-4 text-gray-500">{userProfile?.email || 'Your Email'}</Text>

        <TouchableOpacity
          onPress={isEditing ? handleUpdateProfile : () => setIsEditing(true)}
          className="mb-4 w-36 rounded-full bg-orange-500 py-2 shadow-lg hover:opacity-90">
          <Text className="text-center text-lg font-bold text-white">
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="space-y-6">
        <View>
          <Text className="mb-2 text-lg font-medium text-gray-800">Name</Text>
          <TextInput
            style={[
              {
                borderRadius: 8,
                borderWidth: 1,
                borderColor: isEditing ? '#F17F2D' : '#D1D5DB',
                backgroundColor: '#FFFFFF',
                padding: 12,
                color: '#374151',
              },
              isEditing && { borderColor: '#F17F2D', shadowColor: '#F17F2D' },
            ]}
            value={userProfile?.name || ''}
            onChangeText={(text) =>
              setUserProfile((prev) => (prev ? { ...prev, name: text } : prev))
            }
            editable={isEditing}
            placeholder="Enter your name"
          />
        </View>

        <View>
          <Text className="mb-2 text-lg font-medium text-gray-800">Email</Text>
          <TextInput
            style={[
              {
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#D1D5DB',
                backgroundColor: '#F9FAFB',
                padding: 12,
                color: '#9CA3AF',
              },
            ]}
            value={userProfile?.email || ''}
            editable={false}
            placeholder="Your email"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
