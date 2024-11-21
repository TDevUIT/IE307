import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeTokens = async (token: string, refresh_token?: string) => {
  try {
    await AsyncStorage.setItem('access_token', token);
    if (refresh_token) await AsyncStorage.setItem('refresh_token', refresh_token || '');
  } catch (error) {
    console.error('Error storing tokens', error);
  }
};
export const removeAccessToken = async () => {
  try {
    await AsyncStorage.removeItem('access_token');
  } catch (error) {
    console.error('Error removing tokens', error);
  }
};
export const removeToken = async (token: string) => {
  try {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
  } catch (error) {
    console.error('Error removing tokens', error);
  }
};
export const getAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('access_token');
    return {
      accessToken,
    };
  } catch (error) {
    console.error('Error retrieving tokens', error);
    return null;
  }
};
export const getRefreshToken = async () =>  {
  try {
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    return {
      refreshToken,
    };
  } catch (error) {
    console.error('Error retrieving tokens', error);
    return null;
  }
};
export const getTokens = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('access_token');
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error('Error retrieving tokens', error);
    return null;
  }
};
export const checkExists = async () => {
  const accessToken = await AsyncStorage.getItem('access_token');
  return !!accessToken;
};


export const setCourseid = async (courseId: string) => {
  try {
    await AsyncStorage.setItem('courseid', courseId);
  } catch (error) {
    console.error('Error setting courseid', error);
  }
}
export const getCourseid = async () => {
  try {
    const courseId = await AsyncStorage.getItem('courseid');
    return courseId;
  } catch (error) {
    console.error('Error getting courseid', error);
    return null;
  }
}
