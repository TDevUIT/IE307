import { Audio } from 'expo-av';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Listening } from '~/types/type';
import { convertStringToObject } from '~/utils/convertStringToObject';
import { useLocalSearchParams } from 'expo-router';

// type Lesson = {
//   id: string;
//   title: string;
//   description: string;
//   audioUrl: string;
//   thumbnailUrl: string;
// };

// const lessons: Lesson[] = [
//   {
//     id: '1',
//     title: '挨拶の基本',
//     description: '日本語の日常的な挨拶を学びましょう。',
//     audioUrl: 'https://res.cloudinary.com/dbonwxmgl/video/upload/v1732790542/huulqigbmtpqjhn2a10g.mp3',
//     thumbnailUrl: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/pbrcqpyxsc14bdcoxifx.png',
//   },
//   {
//     id: '2',
//     title: 'レストランでの注文',
//     description: 'レストランでの食事の注文に必要なフレーズを練習しましょう。',
//     audioUrl: 'https://res.cloudinary.com/dbonwxmgl/video/upload/v1732790545/xhe4liz2zrzersokhuvk.mp3',
//     thumbnailUrl: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/pbrcqpyxsc14bdcoxifx.png',
//   },
//   {
//     id: '3',
//     title: '道を尋ねる',
//     description: '道を尋ねる方法や答えを理解するスキルを学びましょう。',
//     audioUrl: 'https://res.cloudinary.com/dbonwxmgl/video/upload/v1732790542/huulqigbmtpqjhn2a10g.mp3',
//     thumbnailUrl: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/pbrcqpyxsc14bdcoxifx.png',
//   },
//   {
//     id: '4',
//     title: '買い物のフレーズ',
//     description: '買い物中に使える日本語の表現を学びましょう。',
//     audioUrl: 'https://res.cloudinary.com/dbonwxmgl/video/upload/v1732790545/xhe4liz2zrzersokhuvk.mp3',
//     thumbnailUrl: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/pbrcqpyxsc14bdcoxifx.png',
//   },
//   {
//     id: '5',
//     title: '自己紹介',
//     description: '初対面の場で自己紹介する方法を練習しましょう。',
//     audioUrl: 'https://res.cloudinary.com/dbonwxmgl/video/upload/v1732790542/huulqigbmtpqjhn2a10g.mp3',
//     thumbnailUrl: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/pbrcqpyxsc14bdcoxifx.png',
//   },
// ];

const LessonCard = ({
  lesson,
  onPlayAudio,
}: {
  lesson: Listening;
  onPlayAudio: (audioUrl: string) => void;
}) => (
  <TouchableOpacity
    className="bg-white p-4 mb-4 rounded-lg shadow-lg"
    onPress={() => onPlayAudio(lesson.audioUrl)}
  >
    <View className="flex-row items-center">
      <Image
        source={{ uri: lesson.thumbnailUrl }}
        className="w-16 h-16 rounded-md mr-4"
        resizeMode="cover"
      />
      <View>
        <Text className="text-lg font-bold text-gray-800">{lesson.title}</Text>
        <Text className="text-gray-600">{lesson.description}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ListeningPractice = () => {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [audioPlayer, setAudioPlayer] = useState<Audio.Sound | null>(null);
  const { data } = useLocalSearchParams();
  const parsedData = convertStringToObject(data as string) as Listening[];

  const handlePlayAudio = async (audioUrl: string) => {
    try {
      if (audioPlayer) {
        await audioPlayer.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      setAudioPlayer(sound);
      setCurrentAudio(audioUrl);
      await sound.playAsync();
    } catch (error) {
      console.error('音声の再生中にエラーが発生しました:', error);
    }
  };

  const handleStopAudio = async () => {
    if (audioPlayer) {
      await audioPlayer.stopAsync();
      await audioPlayer.unloadAsync();
      setAudioPlayer(null);
      setCurrentAudio(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-2">
        <Text className="text-4xl font-extrabold text-orange-500 text-center mb-6">
          聴解練習
        </Text>
        <FlatList
          data={parsedData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LessonCard lesson={item} onPlayAudio={handlePlayAudio} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
        {currentAudio && (
          <View className="p-4 bg-orange-100 rounded-2xl mb-4">
            <Text className="text-gray-800">{currentAudio}</Text>
            <TouchableOpacity
              className="bg-orange-400 p-3 rounded-3xl"
              onPress={handleStopAudio}
            >
             <Text className="text-gray-100 text-center">再生中</Text>
                </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ListeningPractice;
