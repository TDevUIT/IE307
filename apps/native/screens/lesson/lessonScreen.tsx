import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { useCourseContext } from '~/context/CourseContext';

interface JLPTLessonProps {
  lesson: string;
}

const JLPTLesson: React.FC<JLPTLessonProps> = ({ lesson }) => {
  const router = useRouter();
  return (
    <View className="mb-2 flex-row items-center justify-between px-5 py-1">
      <Text
        className="font-montserrat-semiBold text-lg font-semibold text-[rgb(241,139,47)]"
        onPress={() => router.replace('/')}>
        {lesson}
      </Text>
      <MaterialIcons name="check-circle" size={20} color="orange" />
    </View>
  );
};
interface JLPTSectionProps {
  title: string;
  levels: { level: number; name: string; lesson: string[] }[];
}

const JLPTSection: React.FC<JLPTSectionProps> = ({ title, levels }) => {
  const [expanded, setExpanded] = useState(false);
  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});
  const toggleItem = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <View className="mb-4">
      <TouchableOpacity
        className="flex-row items-center justify-between rounded-lg bg-white p-4"
        onPress={() => setExpanded(!expanded)}>
        <View className="flex-row items-center">
          <FontAwesome name="star" size={24} color="rgb(241,139,47)" />
          <Text className="font-montserrat-semiBold ml-2 text-lg font-extrabold text-[rgb(241,139,47)]">
            {title}
          </Text>
        </View>
        <MaterialIcons
          name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="rgb(241,139,47)"
        />
      </TouchableOpacity>
      {expanded && (
        <View className="bg-white px-8 py-2">
          {levels && levels.length > 0 ? (
            levels.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  className="flex-row items-center justify-between px-5 py-3"
                  onPress={() => toggleItem(index)}>
                  <Text className="font-montserrat-semiBold py-1 text-lg font-bold text-[rgb(241,139,47)]">
                    {`Cấp độ ${item.level}: ${item.name}`}
                  </Text>
                  <MaterialIcons name="check-circle" size={20} color="orange" />
                </TouchableOpacity>
                {expandedItems[index] && (
                  <View className="px-5">
                    {item.lesson.map((lesson, lessonIndex) => (
                      <JLPTLesson key={lessonIndex} lesson={lesson} />
                    ))}
                  </View>
                )}
              </View>
            ))
          ) : (
            <Text className="text-sm text-gray-500">Không có thông tin nào.</Text>
          )}
        </View>
      )}
    </View>
  );
};

const JLPTScreen = () => {
  const { courses, lessons, loading, error } = useCourseContext();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View className="flex-1">
      <ScrollView className="p-4 pt-6" contentContainerStyle={{ paddingBottom: 20 }}>
        {courses.map((course) => (
          <View key={course.id}>
            <Text>{course.title}</Text>
            {lessons[course.id]?.map((lesson) => (
              <View key={lesson.id}>
                <Text>{lesson.title}</Text>
                <Text>{lesson.description}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default JLPTScreen;
