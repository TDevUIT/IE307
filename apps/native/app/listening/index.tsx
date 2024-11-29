import { Audio } from 'expo-av';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Modal, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Listenings } from '~/types/type';
import { convertStringToObject } from '~/utils/convertStringToObject';
import { useLocalSearchParams } from 'expo-router';

// LessonCard component
const LessonCard = ({ listening, onPress }: { listening: Listenings; onPress: () => void }) => (
  <TouchableOpacity className="mb-4 rounded-lg bg-white p-2 shadow-lg" onPress={onPress}>
    <View className="flex-row items-center">
      <Image
        source={{ uri: listening.thumbnailUrl }}
        className="mr-2 h-16 w-16 rounded-md"
        resizeMode="cover"
      />
      <View className="w-full">
        <Text className="flex-wrap text-sm font-bold text-gray-800">{listening.title}</Text>
        <Text className="flex-wrap text-gray-600">{listening.description}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const ListeningPractice = () => {
  const { data } = useLocalSearchParams();
  const parsedData = convertStringToObject(data as string) as Listenings[];

  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [audioPlayer, setAudioPlayer] = useState<Audio.Sound | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Listenings | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPauseAudio = async (audioUrl: string) => {
    try {
      if (audioPlayer) {
        if (isPlaying) {
          await audioPlayer.pauseAsync();
          setIsPlaying(false);
        } else {
          await audioPlayer.playAsync();
          setIsPlaying(true);
        }
      } else {
        const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
        setAudioPlayer(sound);
        setCurrentAudio(audioUrl);
        await sound.playAsync();
        setIsPlaying(true);
      }
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
      setIsPlaying(false);
    }
  };

  const openModal = (lesson: Listenings) => {
    setSelectedLesson(lesson);
    setModalVisible(true);
    handlePlayPauseAudio(lesson.audioUrl);
  };

  const closeModal = () => {
    setModalVisible(false);
    handleStopAudio();
  };

  return (
    <SafeAreaView className="mb-16 flex-1 bg-gray-100">
      <View className="p-4">
        <Text className="mb-6 text-center text-4xl font-extrabold text-orange-500">聴解練習</Text>
        <FlatList
          data={parsedData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <LessonCard listening={item} onPress={() => openModal(item)} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
        <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={closeModal}>
          <View className="flex-1 items-center justify-center bg-gray-100 bg-opacity-25">
            <View className="w-80 rounded-lg bg-white p-6">
              {selectedLesson && (
                <>
                  <Text className="text-center text-xl font-bold">{selectedLesson.title}</Text>
                  <Text className="mt-2 text-center text-gray-600">
                    {selectedLesson.description}
                  </Text>
                  <View className="mt-4">
                    <Text className="text-gray-800">再生中: {currentAudio}</Text>
                    <View className="flex flex-row items-center justify-between">
                      <TouchableOpacity
                        className={`mt-2 rounded-md p-2 shadow-md ${isPlaying ? 'bg-yellow-500' : 'bg-red-500'}`}
                        onPress={() => handlePlayPauseAudio(selectedLesson.audioUrl)}>
                        <Text className="text-center text-white">
                          {isPlaying ? '一時停止' : '再生'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="mt-2 rounded-md bg-gray-500 p-2 shadow-md"
                        onPress={closeModal}>
                        <Text className="text-center text-white">停止</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default ListeningPractice;
