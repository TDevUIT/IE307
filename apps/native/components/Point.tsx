import React, { useState } from 'react';
import { Text, View, Pressable, Image, LayoutAnimation } from 'react-native';

import { icons } from '~/utils/icon';

type ExpandedState = {
  vocabulary: boolean;
  grammar: boolean;
  kanji: boolean;
  reading: boolean;
  listening: boolean;
};

const Point: React.FC = () => {
  const [expanded, setExpanded] = useState<ExpandedState>({
    vocabulary: false,
    grammar: false,
    kanji: false,
    reading: false,
    listening: false,
  });

  const toggleExpand = (key: keyof ExpandedState) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded({
      vocabulary: false,
      grammar: false,
      kanji: false,
      reading: false,
      listening: false,
      [key]: !expanded[key],
    });
  };
  const TotalPoints: React.FC<{
    points: string;
  }> = ({ points }) => (
    <View className="flex-row items-center w-full justify-between rounded-lg bg-[#f28b2f] px-5 py-5">
      <View className="flex-row items-center gap-3">
        <Text className="text-lg font-bold text-black">Tổng điểm</Text>
      </View>
      <Text className="text-lg font-bold text-black">{points}  đ</Text>
    </View>
  );
  const PointSection: React.FC<{
    title: string;
    points: string;
    details: string[];
    expandedKey: keyof ExpandedState;
    icon: any;
  }> = ({ title, points, details, expandedKey, icon }) => (
    <>
      <Pressable
        className="h-15 flex-row items-center justify-between rounded-lg bg-[#f1aa6a] px-5 py-5"
        onPress={() => toggleExpand(expandedKey)}>
        <View className="flex flex-row items-center justify-center gap-3">
          <Image className="h-8 w-8" resizeMode="cover" source={icon} />
          <Text className="text-lg font-bold text-black">{title}</Text>
        </View>
        <Text className="text-lg font-bold text-black">{points}</Text>
      </Pressable>
      {expanded[expandedKey] && (
        <View className="rounded-lg bg-[#fbe4d0] px-5 py-3">
          {details.map((detail, index) => (
            <Text key={index} className="text-base text-black">
              {detail}
            </Text>
          ))}
        </View>
      )}
    </>
  );

  return (
    <View className="w-full flex-1 gap-5 rounded-xl bg-white p-5">
      <TotalPoints points="0" />
        <PointSection
          title="Học từ vựng mới"
        points="0 đ"
        details={['Số từ đã học: 50', 'Số từ cần ôn tập: 10']}
        expandedKey="vocabulary"
        icon={icons.psychiatry}
      />
      <PointSection
        title="Học ngữ pháp mới"
        points="0 đ"
        details={['Số ngữ pháp đã học: 30', 'Số ngữ pháp cần ôn tập: 5']}
        expandedKey="grammar"
        icon={icons.water}
      />
      <PointSection
        title="Học hán tự mới"
        points="0 đ"
        details={['Số hán tự đã học: 40', 'Số hán tự cần ôn tập: 8']}
        expandedKey="kanji"
        icon={icons.sunny}
      />
      <PointSection
        title="Học đọc hiểu"
        points="0 đ"
        details={['Số bài đọc đã học: 10', 'Số bài đọc cần ôn tập: 2']}
        expandedKey="reading"
        icon={icons.flower}
      />
      <PointSection
        title="Học nghe hiểu"
        points="0 đ"
        details={['Số bài nghe đã học: 20', 'Số bài nghe cần ôn tập: 5']}
        expandedKey="listening"
        icon={icons.fruit}
      />
    </View>
  );
};

export default Point;