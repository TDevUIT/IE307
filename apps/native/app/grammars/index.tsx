import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { Grammar } from '~/types/type';
import { convertStringToObject } from '~/utils/convertStringToObject';
import { useLocalSearchParams } from 'expo-router';

const Grammars = () => {
  const { data } = useLocalSearchParams();
  const parsedData = convertStringToObject(data as string) as Grammar[];

  const [showModal, setShowModal] = useState(false);
  const [selectedGrammar, setSelectedGrammar] = useState<Grammar | null>(null);

  const handleGrammarPress = (grammar: Grammar) => {
    setSelectedGrammar(grammar);
    setShowModal(true);
  };

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="px-5 py-8">
        {parsedData.map((grammar) => (
          <TouchableOpacity
            key={grammar.id}
            className="mb-4 flex-row items-center rounded-xl bg-white p-5 shadow-lg"
            onPress={() => handleGrammarPress(grammar)}>
            <View className="flex-1">
              <Text className="mb-2 text-xl font-bold text-gray-900">{grammar.rule}</Text>
              <Text className="mb-2 text-base text-gray-700">{grammar.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        onBackButtonPress={() => setShowModal(false)}
        animationIn="fadeInDown"
        animationOut="fadeOutUp"
        useNativeDriver
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}>
        <View className="rounded-lg bg-orange-100 p-5 pt-8 pb-8">
          {selectedGrammar && (
            <>
                <View className="mb-6 p-5 bg-white rounded-lg shadow-md">
                <Text className="mb-4 text-3xl font-extrabold text-gray-900 text-center">
                  {selectedGrammar.rule}
                </Text>
                <Text className="text-lg leading-relaxed text-gray-800">
                  {selectedGrammar.description}
                </Text>
                </View>

            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default Grammars;
