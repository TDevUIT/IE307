import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Insights } from '~/types/type';
import { convertStringToObject } from '~/utils/convertStringToObject';
import { useLocalSearchParams } from 'expo-router';

const InsightCard = ({
  insight,
  onPress,
}: {
  insight: Insights;
  onPress: () => void;
}) => (
  <TouchableOpacity
    className="bg-white p-4 mb-4 rounded-lg shadow-lg"
    onPress={onPress}
  >
    <Image
      source={{ uri: insight.imageUrl }}
      className="w-full h-40 rounded-lg mb-4"
      resizeMode="cover"
    />
    <Text className="text-lg font-semibold text-gray-900 mb-2">
      {insight.title}
    </Text>
    <Text className="text-gray-700" numberOfLines={2}>
      {insight.description}
    </Text>
  </TouchableOpacity>
);

const CulturalInsights = () => {
  const { data } = useLocalSearchParams();
  const parsedData = convertStringToObject(data as string) as Insights[];



  const [selectedInsight, setSelectedInsight] = useState<Insights | null>(null);

  const renderItem = ({ item }: { item: Insights }) => (
    <InsightCard insight={item} onPress={() => setSelectedInsight(item)} />
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-2">
        <Text className="text-3xl font-extrabold text-orange-500 mb-6 text-center">
          日本文化の洞察
        </Text>
        <FlatList
          data={parsedData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
      {selectedInsight && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedInsight}
          onRequestClose={() => setSelectedInsight(null)}
        >
          <View className="flex-1 bg-gray-100 bg-opacity-50 justify-center items-center">
            <View className="bg-white w-11/12 p-6 rounded-lg">
              <Image
                source={{ uri: selectedInsight.imageUrl }}
                className="w-full h-56 rounded-lg mb-4"
                resizeMode="cover"
              />
              <ScrollView>
                <Text className="text-xl font-bold text-gray-900 mb-4">
                  {selectedInsight.title}
                </Text>
                <Text className="text-gray-700">{selectedInsight.description}</Text>
              </ScrollView>
              <TouchableOpacity
                className="bg-gray-200 p-3 mt-6 rounded-lg"
                onPress={() => setSelectedInsight(null)}
              >
                <Text className="text-center text-gray-900 font-semibold">閉じる</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default CulturalInsights;
