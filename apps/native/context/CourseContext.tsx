import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

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

export const useCourseContext = (): CourseContextType => {
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

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/course/all');
      console.log('hello world!');
      const courseData = response.data;
      setCourses(courseData);
      await AsyncStorage.setItem('courses', JSON.stringify(courseData));
      courseData.forEach((course: Course) => {
        fetchLessonsByCourseId(course.id);
      });
    } catch {
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLessonsByCourseId = useCallback(async (courseId: string) => {
    try {
      const response = await axiosInstance.get(`/${courseId}/lessons`);
      const lessonData = response.data;
      setLessons((prev) => ({ ...prev, [courseId]: lessonData }));
      await AsyncStorage.setItem(`lessons_${courseId}`, JSON.stringify(lessonData));
    } catch {
      setError(`Failed to fetch lessons for course ${courseId}`);
    }
  }, []);

  const loadCoursesFromStorage = useCallback(async () => {
    const storedCourses = await AsyncStorage.getItem('courses');
    if (storedCourses) {
      const parsedCourses: Course[] = JSON.parse(storedCourses);
      setCourses(parsedCourses);
      const lessonPromises = parsedCourses.map(async (course: Course) => {
        const lessonsData = await AsyncStorage.getItem(`lessons_${course.id}`);
        if (lessonsData) {
          setLessons((prev) => ({ ...prev, [course.id]: JSON.parse(lessonsData) }));
        } else {
          await fetchLessonsByCourseId(course.id);
        }
      });
      await Promise.all(lessonPromises);
    } else {
      fetchCourses();
    }
  }, [fetchCourses, fetchLessonsByCourseId]);

  useEffect(() => {
    loadCoursesFromStorage();
  }, [loadCoursesFromStorage]);

  return (
    <CourseContext.Provider
      value={{ courses, lessons, loading, error, getLessonsByCourseId: fetchLessonsByCourseId }}>
      {children}
    </CourseContext.Provider>
  );
};
