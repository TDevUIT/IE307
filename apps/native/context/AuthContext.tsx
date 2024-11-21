import AsyncStorage from '@react-native-async-storage/async-storage';
import { Href, Redirect } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

import Loading from '~/components/Loading';
import axiosInstance from '~/helper/axios';
import { User } from '~/types/type';
import { removeAccessToken } from '~/utils/store';

interface AuthContextProps {
  isLogged: boolean;
  loading: boolean;
  profile: User | null;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  fetchProfile: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<User | null>(null);
  const [redirect, setRedirect] = useState<string | null>(null);

  const fetchProfile = async (retryCount = 0) => {
    try {
      const response = await axiosInstance.get('/auth/profile');
      if (response.data) {
        setProfile(response.data.data);
        setIsLogged(true);
      } else {
        await handleAuthError();
      }
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        console.log('Token expired, logging out...');
        await handleAuthError();
      } else if (error.message.includes('jwt expired') && retryCount < 5) {
        console.log(`Retrying fetch profile... (${retryCount + 1}/5)`);
        setTimeout(() => fetchProfile(retryCount + 1), 1000);
      } else {
        console.error('Failed to fetch profile:', error);
        await handleAuthError();
      }
    }
  };

  const handleAuthError = async () => {
    await removeAccessToken();
    setIsLogged(false);
    setProfile(null);
    if (!loading) {
      setRedirect('/(auth)/welcome');
    }
  };

  useEffect(() => {
    const checkAuthAndFetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
          await fetchProfile();
        } else {
          setIsLogged(false);
          setProfile(null);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        await handleAuthError();
      } finally {
        setLoading(false);
      }
    };
    checkAuthAndFetchProfile();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (redirect) {
    return <Redirect href={redirect as Href} />;
  }

  return (
    <AuthContext.Provider
      value={{ isLogged, loading, setIsLogged, setLoading, profile, setProfile, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
