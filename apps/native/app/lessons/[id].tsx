import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Video, ResizeMode } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Button, ActivityIndicator } from 'react-native';

import axiosInstance from '~/helper/axios';
import { FlashCard, Grammar, MiniTest, Vocabulary, Listenings, Insights } from '~/types/type';
const exampleLessonDetails = {
  flashCards: [
    {
      id: '1',
      term: '日本語',
      definition: 'Japanese language',
      kanji: '日本語',
      lessonId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      term: '勉強',
      definition: 'Study',
      kanji: '勉強',
      lessonId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      term: '漢字',
      definition: 'Kanji characters',
      kanji: '漢字',
      lessonId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  grammars: [
    {
      id: '1',
      rule: '～たい',
      description: 'Used to express a desire to do something.',
      lessonId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      rule: '～ている',
      description: 'Used to describe an ongoing action or a state of being.',
      lessonId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      rule: '～たことがある',
      description: 'Used to express that one has experienced something before.',
      lessonId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      rule: '～から',
      description: 'Used to explain the reason or cause of something.',
      lessonId: '1',
      example: '疲れたから、寝ます。 (Because I’m tired, I will sleep.)',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '5',
      rule: '～と思います',
      description: 'Used to express the speaker’s opinion or belief.',
      lessonId: '1',
      example: '明日は晴れると思います。 (I think it will be sunny tomorrow.)',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  vocabularies: [
    {
      id: '1',
      wordJP: '日本語',
      wordVN: 'Japanese language',
      kanji: '日本語',
      lessonId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      wordJP: '勉強',
      wordVN: 'Study',
      kanji: '勉強',
      lessonId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      wordJP: '漢字',
      wordVN: 'Kanji characters',
      kanji: '漢字',
      lessonId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  miniTests: [
    {
      id: '1',
      question: 'What is Japanese for "study"?',
      answer: '勉強',
      lessonId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      question: 'What is Kanji for "Japanese language"?',
      answer: '日本語',
      lessonId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      question: 'What is Kanji for "study"?',
      answer: '勉強',
      lessonId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  listenings: [
    {
      id: '1',
      lessonId: '1',
      title: '挨拶の基本',
      description: '日本語の日常的な挨拶を学びましょう。',
      audioUrl:
        'https://res.cloudinary.com/dbonwxmgl/video/upload/v1732790542/huulqigbmtpqjhn2a10g.mp3',
      thumbnailUrl:
        'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/pbrcqpyxsc14bdcoxifx.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      lessonId: '1',
      title: 'レストランでの注文',
      description: 'レストランでの食事の注文に必要なフレーズを練習しましょう。',
      audioUrl:
        'https://res.cloudinary.com/dbonwxmgl/video/upload/v1732790545/xhe4liz2zrzersokhuvk.mp3',
      thumbnailUrl:
        'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/pbrcqpyxsc14bdcoxifx.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      lessonId: '1',
      title: '道を尋ねる',
      description: '道を尋ねる方法や答えを理解するスキルを学びましょう。',
      audioUrl:
        'https://res.cloudinary.com/dbonwxmgl/video/upload/v1732790542/huulqigbmtpqjhn2a10g.mp3',
      thumbnailUrl:
        'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/pbrcqpyxsc14bdcoxifx.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      lessonId: '1',
      title: '買い物のフレーズ',
      description: '買い物中に使える日本語の表現を学びましょう。',
      audioUrl:
        'https://res.cloudinary.com/dbonwxmgl/video/upload/v1732790545/xhe4liz2zrzersokhuvk.mp3',
      thumbnailUrl:
        'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/pbrcqpyxsc14bdcoxifx.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '5',
      lessonId: '1',
      title: '自己紹介',
      description: '初対面の場で自己紹介する方法を練習しましょう。',
      audioUrl:
        'https://res.cloudinary.com/dbonwxmgl/video/upload/v1732790542/huulqigbmtpqjhn2a10g.mp3',
      thumbnailUrl:
        'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/pbrcqpyxsc14bdcoxifx.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  insights: [
    {
      id: '1',
      lessonId: '1',
      title: '茶道 - 日本の心',
      description:
        '茶道はただのお茶を楽しむだけではなく、礼儀や精神統一、そして調和の美学を学ぶ伝統的な儀式です。歴史とともに発展し、日本文化の象徴となっています。',
      imageUrl:
        'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789167/hu1ub1kjwxqsmetpomlr.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      lessonId: '1',
      title: '祭り - 日本の四季を彩るイベント',
      description:
        '日本の祭りは地域ごとに特徴があり、神道や仏教に基づくものから、現代的なエンターテインメントまで幅広く存在します。たとえば、青森のねぶた祭りや京都の祇園祭が有名です。',
      imageUrl:
        'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/oc5zmrxqo1fpbmaqtx85.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      lessonId: '1',
      title: '和食 - 世界が認めた食文化',
      description:
        '和食は2013年にユネスコ無形文化遺産に登録されました。四季折々の食材を活かし、見た目の美しさと健康的な要素を兼ね備えています。寿司、天ぷら、味噌汁などが代表的です。',
      imageUrl:
        'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789167/t8uv0nk0thizpblavkqq.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      lessonId: '1',
      title: '着物 - 美しい日本の伝統衣装',
      description:
        '着物は日本の伝統的な衣装で、特別な行事や結婚式、成人式などで着用されます。華やかなデザインと繊細な職人技が魅力です。',
      imageUrl:
        'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789167/vhdda7dk8aphmqsbgofv.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '5',
      lessonId: '1',
      title: '日本庭園 - 自然と調和する空間',
      description:
        '日本庭園は石、植物、水を利用して自然との調和を表現する独特なデザインです。京都の龍安寺の石庭や兼六園はその代表例です。',
      imageUrl:
        'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/cwn1wxmdpee4gxkfkmhg.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '6',
      lessonId: '1',
      title: '浮世絵 - 江戸時代のポップアート',
      description:
        '浮世絵は江戸時代に生まれた木版画の一種で、風景、役者、花魁などをテーマに描かれました。葛飾北斎の「富嶽三十六景」が世界的に有名です。',
      imageUrl:
        'https://res.cloudinary.com/dbonwxmgl/image/upload/v1732789168/pbrcqpyxsc14bdcoxifx.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  content: 'https://res.cloudinary.com/dbonwxmgl/video/upload/v1732709415/vlwiqacyf4r5cbemrbyh.mp4',
};

export default function LessonDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [lessonDetails, setLessonDetails] =
    useState<typeof exampleLessonDetails>(exampleLessonDetails);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<{ isPlaying: boolean }>({ isPlaying: false });

  useEffect(() => {
    const fetchLessonDetails = async () => {
      try {
        const response = await axiosInstance.get(`lessons/${id}`);
        setLessonDetails(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lesson details:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchLessonDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-4">
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="mt-2 text-lg font-medium text-blue-600">Loading lesson details...</Text>
      </View>
    );
  }

  if (!lessonDetails) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-4">
        <Text className="text-center text-lg text-gray-500">No data available</Text>
        <TouchableOpacity
          className="mt-4 rounded-lg bg-blue-600 px-5 py-2 shadow-md"
          onPress={() => router.back()}>
          <Text className="font-semibold text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { flashCards, grammars, vocabularies, miniTests, listenings, insights, content } =
    lessonDetails;
  const FlashCards: FlashCard[] = flashCards;
  const Grammars: Grammar[] = grammars;
  const Vocabularies: Vocabulary[] = vocabularies;
  const MiniTests: MiniTest[] = miniTests;
  const Listenings: Listenings[] = listenings;
  const Insights: Insights[] = insights;
  const handleFlashcardsRouter = () => {
    router.push({
      pathname: '/flashcards',
      params: { title: 'Flashcards', data: JSON.stringify(FlashCards) },
    });
  };

  const handleGrammarsRouter = () => {
    router.push({
      pathname: '/grammars',
      params: { title: 'Grammars', data: JSON.stringify(Grammars) },
    });
  };

  const handleVocabulariesRouter = () => {
    router.push({
      pathname: '/vocabularies',
      params: { title: 'Vocabularies', data: JSON.stringify(Vocabularies) },
    });
  };

  const handleCulturalInsightsRouter = () => {
    router.push({
      pathname: '/culturalInsights',
      params: { title: 'Cultural Insights', data: JSON.stringify(Insights) },
    });
  };

  const handleListeningRouter = () => {
    //console.log('Listening:', Listening);
    router.push({
      pathname: '/listening',
      params: { title: 'Listening Practice', data: JSON.stringify(Listenings) },
    });
  };

  const handleMiniTestsRouter = () => {
    router.push({
      pathname: '/miniTests',
      params: { title: 'Mini Tests', data: JSON.stringify(MiniTests) },
    });
  };

  const sections = [
    {
      title: 'Flashcards',
      dataCount: flashCards.length,
      icon: 'collections-bookmark' as const,
      onPress: handleFlashcardsRouter,
    },
    {
      title: 'Grammars',
      dataCount: grammars.length,
      icon: 'text-fields' as const,
      onPress: handleGrammarsRouter,
    },
    {
      title: 'Vocabularies',
      dataCount: vocabularies.length,
      icon: 'translate' as const,
      onPress: handleVocabulariesRouter,
    },
    {
      title: 'Mini Tests',
      dataCount: miniTests.length,
      icon: 'quiz' as const,
      onPress: handleMiniTestsRouter,
    },
    {
      title: 'Listening Practice',
      dataCount: 10,
      icon: 'headphones' as const,
      onPress: handleListeningRouter,
    },
    {
      title: 'Cultural Insights',
      dataCount: 6,
      icon: 'public' as const,
      onPress: handleCulturalInsightsRouter,
    },
  ];

  return (
    <ScrollView className="bg-gray-100 p-4">
      <View className="h-56 w-full flex-1 justify-center rounded-lg bg-gray-100 p-2 shadow-lg mb-2">
        <Video
          ref={video}
          style={{ height: '100%', width: '100%', borderRadius: 10 }}
          source={{
            uri: lessonDetails.content,
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              setStatus({ isPlaying: status.isPlaying });
            }
          }}
        />
      </View>
      {sections.map((section) => (
        <LessonDetailsSection
          key={section.title}
          title={section.title}
          dataCount={section.dataCount}
          icon={section.icon}
          onPress={section.onPress}
        />
      ))}
    </ScrollView>
  );
}

interface LessonDetailsSectionProps {
  title: string;
  dataCount: number;
  icon:
    | 'quiz'
    | 'collections-bookmark'
    | 'text-fields'
    | 'translate'
    | 'quiz'
    | 'draw'
    | 'public'
    | 'headphones';
  onPress: () => void;
}

const LessonDetailsSection = ({ title, dataCount, icon, onPress }: LessonDetailsSectionProps) => {
  return (
    <View className="mb-2 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <MaterialIcons name={icon} size={28} color="#4F46E5" />
          <Text className="ml-3 text-xl font-bold text-gray-800">{title}</Text>
        </View>
        <TouchableOpacity className="rounded-full bg-indigo-600 px-5 py-2" onPress={onPress}>
          <Text className="text-sm font-semibold text-white">View All</Text>
        </TouchableOpacity>
      </View>
      <Text className="mt-2 text-gray-500">{dataCount} items available</Text>
    </View>
  );
};
