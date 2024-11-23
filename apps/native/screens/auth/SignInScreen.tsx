import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { useAuth } from '~/context/AuthContext';
import axiosInstance from '~/helper/axios';
import { checkExists, storeTokens } from '~/utils/store';

const SignInScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fetchProfile } = useAuth();

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/auth/sign-in', {
        email,
        password,
      });
      if (response.data) {
        const { access_token, refresh_token } = response.data.data;
        await storeTokens(access_token, refresh_token);
        await fetchProfile();
        router.replace('/');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 p-6 pt-[30%]" style={{ backgroundColor: 'white' }}>
          <View className="absolute left-4 top-12">
            <TouchableOpacity
              onPress={() => router.push('/(auth)/welcome')}
              className="flex-row items-center">
              <FontAwesome name="arrow-left" size={24} color="rgb(241,139,47)" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center">
            <Text className="text-3xl font-bold text-black">Welcome Back</Text>
            <MaterialIcons
              name="emoji-people"
              size={30}
              color="rgb(241,139,47)"
              style={{ marginLeft: 8 }}
            />
          </View>

          <Text className="mb-6 text-lg text-gray-600">
            We are glad to see you again! Let's get started.
          </Text>

          <Text className="mb-2 text-lg text-black">Email</Text>
          <View className="mb-4 flex-row items-center rounded-lg bg-gray-100 p-4 shadow-md">
            <MaterialIcons name="email" size={20} color="rgb(241,139,47)" />
            <TextInput
              className="ml-2 flex-1 text-lg"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text className="mb-2 text-lg text-black">Password</Text>
          <View className="mb-4 flex-row items-center rounded-lg bg-gray-100 p-4 shadow-md">
            <MaterialIcons name="lock" size={20} color="rgb(241,139,47)" />
            <TextInput
              className="ml-2 flex-1 text-lg"
              placeholder="Enter your password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <MaterialIcons
                name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <View className="mb-6 flex-row justify-between">
            <Text
              className="text-gray-500 underline"
              onPress={() => console.log('Forgot Password')}>
              Forgot Password?
            </Text>
          </View>

          {error ? <Text className="mb-4 text-center text-red-500">{error}</Text> : null}

          <TouchableOpacity
            onPress={handleSignIn}
            className="mb-6 h-14 items-center justify-center rounded-lg bg-[rgb(241,139,47)] shadow-lg"
            activeOpacity={0.8}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-lg font-bold text-white">Sign In</Text>
            )}
          </TouchableOpacity>

          <Text className="text-center text-gray-600">
            Don’t have an account?{' '}
            <Text
              className="font-bold text-[rgb(241,139,47)] underline"
              onPress={() => router.replace('/sign-up')}>
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
