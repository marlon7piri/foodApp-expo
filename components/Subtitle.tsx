
import React from 'react'
import { StyleProp, StyleSheet, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '@/theme/theme'
import { TextStyle } from 'react-native'



interface Props {
  text: string,
  safe?: boolean,
  backgorundColor?: string,
  style?: StyleProp<TextStyle>
}

export default function Subtitle({ text, safe = false, backgorundColor = colors.background, style }: Props) {

  const { top } = useSafeAreaInsets()
  return (

    <Text
      style={[
        { ...styles.texto },
        { marginTop: safe ? top : 0, }
        , style]}>{text}</Text>

  )
}

const styles = StyleSheet.create({
  texto: {
    fontSize: 20,
    marginBottom: 20,
    color: colors.complementary,

  }
})