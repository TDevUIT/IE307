import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';

import axiosInstance from '~/helper/axios';

const SignUpScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignUp = async (): Promise<void> => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await axiosInstance.post('/auth/sign-up', {
        email,
        password,
        name,
      });

      if (!response.data) {
        const data = await response.data;
        setError(data.message || 'Sign up failed');
        return;
      }

      Alert.alert('Success', 'Sign up successful!');
      router.replace('/sign-in');
    } catch (error) {
      setError('Something went wrong, please try again later.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 p-6 pt-[30%]" style={{ backgroundColor: 'white' }}>
          <View className="absolute left-4 top-12">
            <TouchableOpacity
              onPress={() => router.push('/(auth)/sign-in')}
              className="flex-row items-center">
              <FontAwesome name="arrow-left" size={24} color="rgb(241,139,47)" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center">
            <Text className="text-3xl font-bold text-[rgb(241,139,47)]">Sign Up</Text>
            <MaterialIcons
              name="person-add"
              size={30}
              color="rgb(241,139,47)"
              style={{ marginLeft: 8 }}
            />
          </View>
          <Text className="mb-6 text-lg text-gray-700">
            Please enter your details to create a new account.
          </Text>

          <Text className="mb-2 text-lg text-gray-700">Name</Text>
          <View className="mb-4 flex-row items-center rounded-lg bg-gray-100 p-4 shadow-lg">
            <MaterialIcons name="person" size={20} color="gray" />
            <TextInput
              className="ml-2 flex-1 text-lg"
              placeholder="Enter your name"
              autoCapitalize="none"
              value={name}
              onChangeText={setName}
            />
          </View>

          <Text className="mb-2 text-lg text-gray-700">Email</Text>
          <View className="mb-4 flex-row items-center rounded-lg bg-gray-100 p-4 shadow-lg">
            <MaterialIcons name="email" size={20} color="gray" />
            <TextInput
              className="ml-2 flex-1 text-lg"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text className="mb-2 text-lg text-gray-700">Password</Text>
          <View className="mb-4 flex-row items-center rounded-lg bg-gray-100 p-4 shadow-lg">
            <MaterialIcons name="lock" size={20} color="gray" />
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

          <Text className="mb-2 text-lg text-gray-700">Confirm Password</Text>
          <View className="mb-4 flex-row items-center rounded-lg bg-gray-100 p-4 shadow-lg">
            <MaterialIcons name="lock" size={20} color="gray" />
            <TextInput
              className="ml-2 flex-1 text-lg"
              placeholder="Confirm your password"
              secureTextEntry={!isConfirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
              <MaterialIcons
                name={isConfirmPasswordVisible ? 'visibility' : 'visibility-off'}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          {error ? <Text className="mb-4 text-center text-red-500">{error}</Text> : null}

          <TouchableOpacity
            onPress={handleSignUp}
            className="mb-6 h-14 items-center justify-center rounded-lg bg-[rgb(241,139,47)] shadow-lg"
            activeOpacity={0.8}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-lg font-bold text-white">Sign Up</Text>
            )}
          </TouchableOpacity>

          <Text className="text-center text-gray-700">
            Already have an account?{' '}
            <Text
              className="font-bold text-[rgb(241,139,47)] underline"
              onPress={() => router.replace('/sign-in')}>
              Sign In
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
