import { View, Text, Pressable, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { colors } from '@/theme/theme';



interface Props {
  text: string;
  styles?: StyleProp<ViewStyle>
  onPress: () => void
}
export default function Button({ onPress, text, styles }: Props) {
  return (
    <Pressable style={({ pressed }) => ([{
      backgroundColor: colors.secundary,

      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      opacity: pressed ? 0.8 : 1,
      padding: 10,
      width: 100,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.4,
      shadowRadius: 5,
      elevation: 5,




    }, styles])}


      onPress={onPress}>

      <Text style={{ color: colors.background, fontWeight: '900' }}>{text}</Text>
    </Pressable>
  )
}