import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

import { MiniTest } from '~/types/type';
import { convertStringToObject } from '~/utils/convertStringToObject';

const MiniTests = () => {
  const { data } = useLocalSearchParams();
  const parsedData = convertStringToObject(data as string) as MiniTest[];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    generateOptions();
  }, [currentQuestionIndex]);

  const generateOptions = () => {
    const correctAnswer = parsedData[currentQuestionIndex].answer;
    const wrongAnswers = parsedData
      .filter((_, index) => index !== currentQuestionIndex)
      .map((item) => item.answer);
    const randomWrongAnswers = wrongAnswers.sort(() => Math.random() - 0.5).slice(0, 3);

    const allOptions = [...randomWrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const handleAnswerSelection = (selectedAnswer: string) => {
    const correctAnswer = parsedData[currentQuestionIndex].answer;

    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < parsedData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowModal(true);
    }
  };

  return (
    <ScrollView className="bg-[#f7fafc] p-6">
      <View className="mb-6 rounded-xl bg-white p-6 shadow-xl">
        <Text className="mb-3 text-3xl font-bold text-gray-800">
          Question {currentQuestionIndex + 1} / {parsedData.length}
        </Text>
        <Text className="mb-4 text-xl text-gray-700">
          {parsedData[currentQuestionIndex].question}
        </Text>

        <View>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAnswerSelection(option)}
              className="mb-3 rounded-xl bg-orange-500 px-6 py-3">
              <Text className="text-lg font-semibold text-white">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}
        animationIn="fadeInDown"
        animationOut="fadeOutUp"
        useNativeDriver
        backdropColor="rgba(0, 0, 0, 0.5)"
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}>
        <View className="mx-auto max-w-[100%] rounded-xl bg-white p-8 shadow-xl">
          <Text className="mb-4 text-center text-3xl font-bold text-green-600">Your Score</Text>
          <Text className="mb-6 text-center text-xl text-gray-600">
            You scored {score} out of {parsedData.length}.
          </Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MiniTests;
