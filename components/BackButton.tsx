import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'
import { BackIcon } from './Icons'

export const BackButton = () => {
  const router = useRouter()

  return (
    <Pressable onPress={() => router.back()}>

      <BackIcon />
    </Pressable>
  )
}
