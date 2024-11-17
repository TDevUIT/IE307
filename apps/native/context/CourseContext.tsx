import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, useEffect } from 'react';

import axiosInstance from '~/helper/axios';
interface Lesson {
  id: string;
  title: string;
  description: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  createdBy: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface CourseContextType {
  courses: Course[];
  lessons: { [key: string]: Lesson[] };
  loading: boolean;
  error: string | null;
  getLessonsByCourseId: (courseId: string) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }
  return context;
};

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<{ [key: string]: Lesson[] }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getCourses = async () => {
    try {
      const response = await axiosInstance.get('/courses/all');
      setCourses(response.data);
      await AsyncStorage.setItem('courses', JSON.stringify(response.data));
      setLoading(false);
      response.data.forEach((course: Course) => {
        getLessonsByCourseId(course.id);
      });
    } catch (err) {
      setError('Failed to fetch courses');
      setLoading(false);
    }
  };

  const getLessonsByCourseId = async (courseId: string) => {
    try {
      const response = await axiosInstance.get(`/${courseId}/lessons`);
      setLessons((prev) => ({ ...prev, [courseId]: response.data }));
      await AsyncStorage.setItem(`lessons_${courseId}`, JSON.stringify(response.data));
    } catch (err) {
      setError('Failed to fetch lessons');
    }
  };

  useEffect(() => {
    const loadCoursesFromStorage = async () => {
      const storedCourses = await AsyncStorage.getItem('courses');
      if (storedCourses) {
        setCourses(JSON.parse(storedCourses));
        const storedLessonsPromises = JSON.parse(storedCourses).map((course: Course) =>
          AsyncStorage.getItem(`lessons_${course.id}`).then((lessonsData) => {
            if (lessonsData) {
              setLessons((prev) => ({ ...prev, [course.id]: JSON.parse(lessonsData) }));
            } else {
              getLessonsByCourseId(course.id);
            }
          })
        );
        await Promise.all(storedLessonsPromises);
      } else {
        getCourses();
      }
      setLoading(false);
    };

    loadCoursesFromStorage();
  }, []);

  return (
    <CourseContext.Provider value={{ courses, lessons, loading, error, getLessonsByCourseId }}>
      {children}
    </CourseContext.Provider>
  );
};
