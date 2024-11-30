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
  Animated,
} from 'react-native';

import { useAuth } from '~/context/AuthContext';
import axiosInstance from '~/helper/axios';
import { User } from '~/types/type';

const ProfileScreen = () => {
  const { profile, setProfile, logout } = useAuth();
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

  // Pick image from gallery
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

  // Upload avatar to server
  const uploadAvatar = async () => {
    if (!selectedImage || !userProfile) return;

    const formData = new FormData();
    formData.append('file', {
      uri: selectedImage,
      name: 'avatar.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const response = await axiosInstance.post(`user/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Avatar updated successfully!');
      const data = response.data as { secure_url: string };
      setUserProfile({ ...userProfile, picture: data.secure_url });
      setSelectedImage(null);
    } catch (error) {
      const errorMessage = (error as Error).message;
      Alert.alert('Failed to upload avatar:', errorMessage);
    }
  };

  // const pickImage = async () => {
  //   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (!permissionResult.granted) {
  //     Alert.alert('Permission to access camera roll is required!');
  //     return;
  //   }

  //   const pickerResult = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [4, 4],
  //     quality: 1,
  //   });

  //   if (!pickerResult.canceled) {
  //     setSelectedImage(pickerResult.assets[0].uri);
  //   }
  // };
  const handleUpdateProfile = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (selectedImage) {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        const fileType = blob.type.split('/')[1] || 'jpeg';
        formData.append('file', blob, `profile.${fileType}`);
        console.log(blob);
      }

      if (userProfile?.name) {
        formData.append('name', userProfile.name);
      }

      const response = await axiosInstance.post(`user/update-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfile(response.data);
      setIsEditing(false);
      Alert.alert('Profile updated successfully');
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'An unexpected error occurred';
      Alert.alert('Failed to update profile', errorMessage);
    } finally {
      setLoading(false);
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
          <Animated.View style={{ opacity: loading ? 0.5 : 1 }}>
            <Image
              source={{ uri: selectedImage || userProfile?.picture || '' }}
              className="h-40 w-40 rounded-full border-4 border-orange-500"
              resizeMode="cover"
            />
          </Animated.View>
          {/* <TouchableOpacity
            onPress={pickImage}
            className="absolute bottom-0 right-0 h-10 w-10 items-center justify-center rounded-full bg-orange-500">
            <Ionicons name="camera" size={20} color="white" />
          </TouchableOpacity> */}
          {selectedImage ? (
            <TouchableOpacity
              onPress={uploadAvatar}
              className="absolute bottom-0 right-0 h-auto w-20 items-center justify-center rounded-full bg-orange-500">
              <Text className="rounded-full border-2 border-white bg-orange-500 px-4 py-2 text-center text-white">
                Upload
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={pickImage}
              className="absolute bottom-0 right-0 h-10 w-20 items-center justify-center rounded-full bg-orange-500">
              <Text className="rounded-full border-2 border-white bg-orange-500 px-4 py-2 text-center text-white">
                Change
              </Text>
            </TouchableOpacity>
          )}
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
                borderColor: '#D1D5DB',
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

        <View>
          <Text className="mb-2 text-lg font-medium text-gray-800">Provider ID</Text>
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
            value={userProfile?.providerId || 'N/A'}
            editable={false}
          />
        </View>
        <View>
          <Text className="mb-2 text-lg font-medium text-gray-800">Account Created</Text>
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
            value={
              userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleString() : 'N/A'
            }
            editable={false}
          />
        </View>
        <View>
          <Text className="mb-2 text-lg font-medium text-gray-800">Last Updated</Text>
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
            value={
              userProfile?.updatedAt ? new Date(userProfile.updatedAt).toLocaleString() : 'N/A'
            }
            editable={false}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={logout}
        className="mt-6 w-full rounded-lg bg-red-500 py-3 shadow-lg hover:opacity-90">
        <Text className="text-center text-lg font-bold text-white">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
