import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Linking, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

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
      const response = await axios.post(
        `${IPv4}/user/${userProfile.id}/picture`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    <ScrollView className="flex-1 p-1 bg-white pt-2">
      <View className="items-center mb-5">
        <View className="border-2 border-orange-500 rounded-full mb-5">
          <Image source={{ uri: selectedImage || userProfile.picture }} className="w-36 h-36 rounded-full" />
        </View>

        <View className="flex-row justify-around w-full mb-5">
          {selectedImage ? (
            <TouchableOpacity onPress={uploadpicture} className="bg-orange-500 p-2 rounded-md">
              <Text className="text-white font-bold text-lg">Upload Picture</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={pickImage} className="bg-orange-500 p-2 rounded-md">
              <Text className="text-white font-bold text-lg">Change Picture</Text>
            </TouchableOpacity>
          )}

          {isEditing ? (
            <TouchableOpacity onPress={handleUpdateProfile} className="bg-orange-500 p-2 rounded-md">
              <Text className="text-white font-bold text-lg">Save Profile</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)} className="bg-orange-500 p-2 rounded-md">
              <Text className="text-white font-bold text-lg">Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View className="p-2">
        <Text className="text-black font-bold text-lg">Name:</Text>
        <TextInput
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          value={userProfile.name}
          onChangeText={(text) => setUserProfile({ ...userProfile, name: text })}
          editable={isEditing}
        />
      </View>

      <View className="p-2">
        <Text className="text-black font-bold text-lg">Email:</Text>
        <TextInput
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
          value={userProfile.email}  
          onChangeText={(text) => setUserProfile({ ...userProfile, email: text })}
          editable={isEditing}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
