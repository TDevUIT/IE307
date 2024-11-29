import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Insights } from '~/types/type';
import { convertStringToObject } from '~/utils/convertStringToObject';
import { useLocalSearchParams } from 'expo-router';

// type Insight = {
//   id: string;
//   title: string;
//   description: string;
//   imageUrl: string;
// };

// const culturalInsights: Insight[] = [
//   {
//     id: '1',
//     title: '茶道 - 日本の心',
//     description:
//       '茶道はただのお茶を楽しむだけではなく、礼儀や精神統一、そして調和の美学を学ぶ伝統的な儀式です。歴史とともに発展し、日本文化の象徴となっています。',
//     imageUrl: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789167/hu1ub1kjwxqsmetpomlr.png',
//   },
//   {
//     id: '2',
//     title: '祭り - 日本の四季を彩るイベント',
//     description:
//       '日本の祭りは地域ごとに特徴があり、神道や仏教に基づくものから、現代的なエンターテインメントまで幅広く存在します。たとえば、青森のねぶた祭りや京都の祇園祭が有名です。',
//     imageUrl: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/oc5zmrxqo1fpbmaqtx85.png',
//   },
//   {
//     id: '3',
//     title: '和食 - 世界が認めた食文化',
//     description:
//       '和食は2013年にユネスコ無形文化遺産に登録されました。四季折々の食材を活かし、見た目の美しさと健康的な要素を兼ね備えています。寿司、天ぷら、味噌汁などが代表的です。',
//     imageUrl: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789167/t8uv0nk0thizpblavkqq.png',
//   },
//   {
//     id: '4',
//     title: '着物 - 美しい日本の伝統衣装',
//     description:
//       '着物は日本の伝統的な衣装で、特別な行事や結婚式、成人式などで着用されます。華やかなデザインと繊細な職人技が魅力です。',
//     imageUrl: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789167/vhdda7dk8aphmqsbgofv.png',
//   },
//   {
//     id: '5',
//     title: '日本庭園 - 自然と調和する空間',
//     description:
//       '日本庭園は石、植物、水を利用して自然との調和を表現する独特なデザインです。京都の龍安寺の石庭や兼六園はその代表例です。',
//     imageUrl: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/cwn1wxmdpee4gxkfkmhg.png',
//   },
//   {
//     id: '6',
//     title: '浮世絵 - 江戸時代のポップアート',
//     description:
//       '浮世絵は江戸時代に生まれた木版画の一種で、風景、役者、花魁などをテーマに描かれました。葛飾北斎の「富嶽三十六景」が世界的に有名です。',
//     imageUrl: 'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/pbrcqpyxsc14bdcoxifx.png',
//   },
// ];

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
          <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
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
