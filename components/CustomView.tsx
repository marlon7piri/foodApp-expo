import { View, Text, StyleProp, ViewStyle, SafeAreaView, useWindowDimensions, ImageBackground } from 'react-native'
import React, { PropsWithChildren, useContext, useRef } from 'react'
import { colors } from '@/theme/theme'
import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router'

interface Props extends PropsWithChildren {

  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}


export default function CustomView({ style, children }: Props) {



  return (
    <ImageBackground
      source={require('@/assets/images/wallpaper2.jpeg')} // Ruta de la imagen
      style={styles.backgroundImage}
      resizeMode="cover"
    >

      <SafeAreaView
        style={{
          flex: 1,

        }}>
        <View style={[{
          flex: 1,
          padding: 10






        }
        ]}>
          <View style={{
            flex: 1,

            padding: 10,
            borderRadius: 10
          }}>
            {children}

          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({



  backgroundImage: {
    flex: 1,
    height: '100%'
  },

})