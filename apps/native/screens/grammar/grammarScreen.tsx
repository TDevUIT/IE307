import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

// Sentence Component
interface GrammarSentenceProps {
  sentence: string;
  translation: string;
}

const GrammarSentence: React.FC<GrammarSentenceProps> = ({ sentence, translation }) => {
  return (
    <View className="mb-4">
      <Text className="font-montserrat-semiBold py-1 text-lg font-normal leading-5">
        {sentence}
      </Text>
      <Text className="font-montserrat-semiBold text-sm text-gray-500">{translation}</Text>
    </View>
  );
};

// Grammar Section Component
interface GrammarSectionProps {
  title: string;
  detail: string;
  mean: string;
  sentences: { sentence: string; translation: string }[];
}

const GrammarSection: React.FC<GrammarSectionProps> = ({ title, detail, mean, sentences }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="rounded-lg bg-white px-4 py-2">
      <View>
        <Text className="font-montserrat-semiBold mb-4 pt-8 text-center text-[32px] font-semibold">
          {title}
        </Text>
      </View>
      <View className="mb-4 px-[10px]">
        <TouchableOpacity
          className="flex-row items-center justify-center rounded-xl bg-[#f1aa6a] p-5 shadow-lg"
          onPress={() => setExpanded(!expanded)}>
          <Text className="font-montserrat-semiBold justify-center p-2 text-[22px] font-semibold">
            {detail}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="px-3">
        <View>
          <Text className="font-montserrat-semiBold mb-4 pt-4 text-lg font-bold">{mean}</Text>
        </View>
        <View className="mb-4 py-2">
          {sentences.map((item, index) => (
            <GrammarSentence key={index} sentence={item.sentence} translation={item.translation} />
          ))}
        </View>
      </View>
    </View>
  );
};

const GrammarScreen = () => {
  const grammarData = [
    {
      title: 'ことにしている',
      detail: 'Vる・Vない + ことにしている',
      mean: `Thói quen do mình tự quyết định (Cố gắng.../Nỗ lực...)`,
      sentences: [
        {
          sentence: '健康のため、毎日牛乳を飲むことにしている。',
          translation: 'Vì sức khỏe, mỗi ngày tôi đều cố gắng uống sữa.',
        },
        {
          sentence: '田中さんは、帰りが遅くなるときは、必ずメールすることにしているそうだ。',
          translation: 'Nghe nói là Tanaka mỗi khi về trễ đều cố gắng nhắn tin.',
        },
        {
          sentence: '若いころはオリンピックに出るのが夢で、毎日8時間練習することにしていた。',
          translation:
            'Khi còn trẻ tham dự Olympic là giấc mơ của tôi, tôi đã cố gắng luyện tập 8 tiếng một ngày.',
        },
        {
          sentence:
            '休日は家で仕事をしないことにしているのに、今週はどうしても金曜日に終わらせることができず、持って帰ってきた。',
          translation:
            'Mặc dù tôi cố gắng ngày nghỉ không làm việc ở nhà, nhưng tuần này dù thế nào cũng không thể hoàn thành công việc vào thứ sáu nên tôi đã mang về nhà.',
        },
      ],
    },
  ];

  return (
    <View className="flex-1">
      <ScrollView className="p-4" contentContainerStyle={{ paddingBottom: 20 }}>
        {grammarData.map((section, index) => (
          <GrammarSection
            key={index}
            title={section.title}
            detail={section.detail}
            mean={section.mean}
            sentences={section.sentences}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default GrammarScreen;
