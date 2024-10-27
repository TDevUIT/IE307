/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/app/helper/axios';
import Loading from '@/components/Loading';
import { removeAccessToken } from '@/actions/Cookie';

export interface User {
    id: string;
    name: string;
    email: string;
    providerId: string;
    givenName?: string;
    familyName?: string;
    picture?: string;
    refreshToken?: string;
    is_admin: boolean;
    createdAt: Date;
    updatedAt: Date;
    completedLessonCount: number;
    courses?: any[];
    lessonStatuses?: any[];
    courseStatuses?: any[];
    vocabularyStatuses?: any[];
    notifications?: any[];
  }
  
interface AuthContextProps {
  isLogged: boolean;
  loading: boolean;
  profile: User | null;
  setToken: (token: string) => void;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  fetchProfile: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode; initialAccessToken?: string }> = ({ children, initialAccessToken = '' }) => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(initialAccessToken || null);
    const router = useRouter();

    const fetchProfile = async (retryCount = 0) => {
        try {
            const response = await axiosInstance.get('/auth/profile');
            console.log("Fetched profile data:", response.data.data);
            if (response.data) {
                setProfile(response.data.data);
                setIsLogged(true);
            } else {
                await handleAuthError();
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                await handleAuthError();
            } else if (error.message.includes('jwt expired') && retryCount < 5) {
                setTimeout(() => fetchProfile(retryCount + 1), 1000);
            } else {
                console.error('Failed to fetch profile:', error);
                await handleAuthError();
            }
        }
    };
    
    useEffect(() => {
        console.log("Profile has been updated:", profile);
    }, [profile]);
    

    const handleAuthError = async () => {
        await removeAccessToken();
        setIsLogged(false);
        setProfile(null);
        if (!loading) {
            router.push('/admin');
        }
    };

    useEffect(() => {
        const checkAuthAndFetchProfile = async () => {
        try {
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
    }, [token]);

    if (loading) {
        return <Loading />;
    }

    return (
        <AuthContext.Provider
        value={{ isLogged, loading, setIsLogged, setLoading, profile, setProfile, fetchProfile, setToken }}
        >
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    console.log('Auth context:', context);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
  