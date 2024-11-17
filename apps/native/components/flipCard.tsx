import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

interface FlipCardProps {
  term: string; // Từ tiếng Nhật
  definition: string; // Nghĩa tiếng Việt
  kanji: string; // Kanji
}

const FlipCard: React.FC<FlipCardProps> = ({ term, definition, kanji }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handleFlip = () => {
    Animated.timing(rotateAnim, {
      toValue: isFlipped ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setIsFlipped(!isFlipped));
  };

  const frontInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <TouchableOpacity onPress={handleFlip}>
        <View className="h-96 w-96">
          <Animated.View
            style={{
              transform: [{ rotateY: frontInterpolate }],
              backfaceVisibility: 'hidden',
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              shadowOpacity: 0.3,
              shadowRadius: 5,
            }}>
            <Text className="text-2xl font-bold text-gray-800">{term}</Text>
            <Text className="mt-2 text-gray-600">Tap to flip</Text>
          </Animated.View>
          <Animated.View
            style={{
              transform: [{ rotateY: backInterpolate }],
              backfaceVisibility: 'hidden',
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              shadowOpacity: 0.3,
              shadowRadius: 5,
            }}>
            <Text className="text-lg font-bold text-gray-800">Kanji: {kanji}</Text>
            <Text className="mt-2 text-gray-600">Meaning: {definition}</Text>
            <Text className="mt-1 text-gray-600">Tap to flip back</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FlipCard;
