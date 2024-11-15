import { Href, Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '~/context/AuthContext';

const Page = () => {
  const { isLogged, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return <Redirect href={isLogged ? '/(tabs)/' :  ('/(auth)/welcome' as Href)} />; 
};

export default Page;
