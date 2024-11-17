import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  picture: string;
}

const ProfileScreen = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const IPv4 = Constants.expoConfig?.extra?.EXPO_PUBLIC_SERVER_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const response = await axios.get(`${IPv4}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserProfile(response.data as UserProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setUserProfile({
          id: 0,
          name: 'Default User',
          email: 'default@example.com',
          picture: 'https://via.placeholder.com/150',
        });
      }
    };
    fetchProfile();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
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

  const uploadpicture = async () => {
    if (!selectedImage || !userProfile) return;

    const formData = new FormData();
    formData.append('file', {
      uri: selectedImage,
      name: 'picture.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await axios.post(`${IPv4}/user/${userProfile.id}/picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Picture updated successfully!');
      const data = response.data as { secure_url: string };
      setUserProfile({ ...userProfile, picture: data.secure_url });
      setSelectedImage(null);
    } catch (error) {
      const errorMessage = (error as Error).message;
      Alert.alert('Failed to upload picture:', errorMessage);
    }
  };

  const handleUpdateProfile = async () => {
    if (!userProfile) return;

    try {
      const token = await AsyncStorage.getItem('access_token');
      await axios.put(`${IPv4}/user/${userProfile.id}/profile`, userProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Failed to update profile');
    }
  };

  if (!userProfile) {
    return <Text>Loading profile...</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-white p-1 pt-2">
      <View className="mb-5 items-center">
        <View className="mb-5 rounded-full border-2 border-orange-500">
          <Image
            source={{ uri: selectedImage || userProfile.picture }}
            className="h-36 w-36 rounded-full"
          />
        </View>

        <View className="mb-5 w-full flex-row justify-around">
          {selectedImage ? (
            <TouchableOpacity onPress={uploadpicture} className="rounded-md bg-orange-500 p-2">
              <Text className="text-lg font-bold text-white">Upload Picture</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={pickImage} className="rounded-md bg-orange-500 p-2">
              <Text className="text-lg font-bold text-white">Change Picture</Text>
            </TouchableOpacity>
          )}

          {isEditing ? (
            <TouchableOpacity
              onPress={handleUpdateProfile}
              className="rounded-md bg-orange-500 p-2">
              <Text className="text-lg font-bold text-white">Save Profile</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              className="rounded-md bg-orange-500 p-2">
              <Text className="text-lg font-bold text-white">Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View className="p-2">
        <Text className="text-lg font-bold text-black">Name:</Text>
        <TextInput
          className="mb-2 w-full rounded-md border border-gray-300 p-2"
          value={userProfile.name}
          onChangeText={(text) => setUserProfile({ ...userProfile, name: text })}
          editable={isEditing}
        />
      </View>

      <View className="p-2">
        <Text className="text-lg font-bold text-black">Email:</Text>
        <TextInput
          className="mb-2 w-full rounded-md border border-gray-300 p-2"
          value={userProfile.email}
          onChangeText={(text) => setUserProfile({ ...userProfile, email: text })}
          editable={isEditing}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
