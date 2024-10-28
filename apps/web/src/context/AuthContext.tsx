/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
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
    courses?: unknown[];
    lessonStatuses?: unknown[];
    courseStatuses?: unknown[];
    vocabularyStatuses?: unknown[];
    notifications?: unknown[];
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

export const AuthProvider: React.FC<{ children: ReactNode; initialAccessToken?: string }> = ({ children, initialAccessToken = '' }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(initialAccessToken || null);
    const router = useRouter();

    const fetchProfile = async (retryCount = 0) => {
        try {
            const { data } = await axiosInstance.get('/auth/profile');
            if (data) {
                setProfile(data.data);
                setIsLogged(true);
            } else {
                handleAuthError();
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                handleAuthError();
            } else if (retryCount < 5 && (error as Error).message.includes('jwt expired')) {
                setTimeout(() => fetchProfile(retryCount + 1), 1000);
            } else {
                console.error('Failed to fetch profile:', error);
                handleAuthError();
            }
        }
    };

    const handleAuthError = async () => {
        await removeAccessToken();
        setIsLogged(false);
        setProfile(null);
        if (!loading) router.push('/admin');
    };

    useEffect(() => {
        const checkAuthAndFetchProfile = async () => {
            if (token) await fetchProfile();
            else {
                setIsLogged(false);
                setProfile(null);
            }
            setLoading(false);
        };
        checkAuthAndFetchProfile();
    }, [token]);

    return (
        <AuthContext.Provider
            value={{ isLogged, loading, setIsLogged, setLoading, profile, setProfile, fetchProfile, setToken }}
        >
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
