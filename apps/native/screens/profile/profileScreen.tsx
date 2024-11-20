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
      console.error('Failed to update profile:', error);
      Alert.alert('Failed to update profile');
    }
  };

  useEffect(() => {
    if (profile) {
      setUserProfile(profile);
      setLoading(false);
    }
  }, [profile]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#F17F2D" />
        <Text className="mt-4 text-lg text-orange-500">Loading your profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <View className="mb-5 items-center">
        <View className="mb-5 overflow-hidden rounded-full border-4 border-orange-500">
          <Image
            source={{ uri: selectedImage || userProfile?.picture || '' }}
            className="h-36 w-36 rounded-full"
            resizeMode="cover"
          />
        </View>

        <View className="mb-5 w-full flex-row justify-around">
          {selectedImage ? (
            <TouchableOpacity onPress={uploadPicture} className="w-32 rounded-md bg-orange-500 p-2">
              <Text className="text-center text-lg font-bold text-white">Upload Picture</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={pickImage} className="w-32 rounded-md bg-orange-500 p-2">
              <Text className="text-center text-lg font-bold text-white">Change Picture</Text>
            </TouchableOpacity>
          )}

          {isEditing ? (
            <TouchableOpacity
              onPress={handleUpdateProfile}
              className="w-32 rounded-md bg-orange-500 p-2">
              <Text className="text-center text-lg font-bold text-white">Save Profile</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              className="w-32 rounded-md bg-orange-500 p-2">
              <Text className="text-center text-lg font-bold text-white">Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View className="p-2">
        <Text className="text-lg font-bold text-black">Name:</Text>
        <TextInput
          className="mb-2 w-full rounded-md border border-gray-300 p-2"
          value={userProfile?.name || ''}
          onChangeText={(text) => setUserProfile((prev) => (prev ? { ...prev, name: text } : prev))}
          editable={isEditing}
        />
      </View>

      <View className="p-2">
        <Text className="text-lg font-bold text-black">Email:</Text>
        <TextInput
          className="mb-2 w-full rounded-md border border-gray-300 p-2"
          value={userProfile?.email || ''}
          onChangeText={(text) =>
            setUserProfile((prev) => (prev ? { ...prev, email: text } : prev))
          }
          editable={isEditing}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
