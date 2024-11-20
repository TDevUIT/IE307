import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LessonScreen from '~/screens/LessonScreen'

const Lesson = () => {
  return (
    <SafeAreaView>
      <LessonScreen />
    </SafeAreaView>
  )
}

export default Lesson
