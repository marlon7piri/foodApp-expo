
import React from 'react'
import { StyleProp, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '@/theme/theme'
import { TextStyle } from 'react-native'





export default function SplashScreen() {

  return (

    <View
      style={styles.texto} />

  )
}

const styles = StyleSheet.create({
  texto: {
    flex: 1,
    backgroundColor: 'red'

  }
})