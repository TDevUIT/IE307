import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, ScrollView } from 'react-native';
import Modal from 'react-native-modal';

import { MiniTest } from '~/types/type';
import { convertStringToObject } from '~/utils/convertStringToObject';
import { images } from '~/utils/icon';

const MiniTests = () => {
  const { data } = useLocalSearchParams();
  const parsedData = convertStringToObject(data as string) as MiniTest[];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleSubmitAnswer = () => {
    if (userAnswer.trim() === '') {
      setShowErrorModal(true);
      return;
    }

    const currentAnswer = parsedData[currentQuestionIndex].answer.trim();

    if (userAnswer.toLowerCase() === currentAnswer.toLowerCase()) {
      setScore(score + 1);
    }

    setUserAnswer('');

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
        <TextInput
          className="mb-4 mt-4 rounded-xl border-2 border-gray-300 p-3 text-lg"
          placeholder="Your answer"
          value={userAnswer}
          onChangeText={setUserAnswer}
        />
        <TouchableOpacity
          onPress={handleSubmitAnswer}
          className="items-center rounded-xl bg-green-500 px-6 py-3">
          <Text className="text-lg font-semibold text-white">Submit Answer</Text>
        </TouchableOpacity>
      </View>
      <Animated.View className="flex-1 items-center justify-center">
        <Animated.Image source={images.capy} className="h-[350px] w-[250px]" />
      </Animated.View>

      <Modal
        isVisible={showErrorModal}
        onBackdropPress={() => setShowErrorModal(false)}
        onBackButtonPress={() => setShowErrorModal(false)}
        animationIn="pulse"
        animationOut="fadeOut"
        backdropColor="rgba(0, 0, 0, 0.5)"
        backdropOpacity={0.5}
        useNativeDriver>
        <View className="max-h-1/3 mx-4 rounded-lg bg-white p-6 shadow-lg">
          <Text className="mb-4 text-2xl font-bold text-red-500">Error</Text>
          <Text className="text-lg text-gray-700">Please enter an answer before submitting.</Text>
        </View>
      </Modal>
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
