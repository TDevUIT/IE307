import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useLocalSearchParams } from 'expo-router';
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
      <View className="bg-white p-6 rounded-xl shadow-xl mb-6">
        <Text className="text-3xl font-bold text-gray-800 mb-3">
          Question {currentQuestionIndex + 1} / {parsedData.length}
        </Text>
        <Text className="text-xl text-gray-700 mb-4">
          {parsedData[currentQuestionIndex].question}
        </Text>
        <TextInput
          className="mt-4 mb-4 p-3 border-2 border-gray-300 rounded-xl text-lg"
          placeholder="Your answer"
          value={userAnswer}
          onChangeText={setUserAnswer}
        />
        <TouchableOpacity
          onPress={handleSubmitAnswer}
          className="bg-green-500 px-6 py-3 rounded-xl items-center"
        >
          <Text className="text-white font-semibold text-lg">Submit Answer</Text>
        </TouchableOpacity>
      </View>
      <Animated.View className="flex-1 justify-center items-center">
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
        useNativeDriver
      >
        <View className="bg-white rounded-lg p-6 shadow-lg max-h-1/3 mx-4">
          <Text className="text-2xl font-bold text-red-500 mb-4">Error</Text>
          <Text className="text-lg text-gray-700">
            Please enter an answer before submitting.
          </Text>
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
