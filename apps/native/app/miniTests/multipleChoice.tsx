import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useLocalSearchParams } from 'expo-router';
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
    const randomWrongAnswers = wrongAnswers
      .sort(() => Math.random() - 0.5) 
      .slice(0, 3); 

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
      <View className="bg-white p-6 rounded-xl shadow-xl mb-6">
        <Text className="text-3xl font-bold text-gray-800 mb-3">
          Question {currentQuestionIndex + 1} / {parsedData.length}
        </Text>
        <Text className="text-xl text-gray-700 mb-4">
          {parsedData[currentQuestionIndex].question}
        </Text>

        <View>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAnswerSelection(option)}
              className="bg-orange-500 px-6 py-3 rounded-xl mb-3"
            >
              <Text className="text-white font-semibold text-lg">{option}</Text>
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
        backdropTransitionOutTiming={0}
      >
        <View className="bg-white rounded-xl p-8 shadow-xl max-w-[100%] mx-auto">
          <Text className="text-3xl font-bold text-green-600 mb-4 text-center">Your Score</Text>
          <Text className="text-xl text-gray-600 text-center mb-6">
            You scored {score} out of {parsedData.length}.
          </Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MiniTests;
