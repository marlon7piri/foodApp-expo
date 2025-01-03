import { View, Text, TextStyle } from 'react-native'
import React, { useContext } from 'react'
import { StyleProp } from 'react-native'

import { colors, globalStyles } from '@/theme/theme'

interface Props {
  title: string,
  styles?: StyleProp<TextStyle>
}

export default function TheTitle({ title, styles }: Props) {
  return (

    <Text style={[globalStyles.title,
      styles
    ]}>{title}</Text>

  )
}