import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeScreen from '~/screens/HomeScreen';
import { getCourseid } from '~/utils/store';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const checkCourseId = async () => {
      try {
        const courseId = await getCourseid();
        if (!courseId) {
          router.push({
            pathname: '/cources',
          });
        }
      } catch (error) {
        console.error('Error checking courseId', error);
      }
    };

    checkCourseId();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <HomeScreen />
    </SafeAreaView>
  );
};

export default Home;
