import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View, StyleSheet, KeyboardAvoidingView, ImageBackground, SafeAreaView, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TheTitle from '@/components/TheTitle'
import Subtitle from '@/components/Subtitle'
import { InputCustom } from '@/components/InputCustom'
import { Separator } from '@/components/Separator'
import { colors } from '@/theme/theme'
import axios from 'axios'
import { authStore } from '@/store/auth.store'
import { MaterialIcons } from '@expo/vector-icons'
import { EyeCloseIcon, EyeOpenIcon } from '@/components/Icons'
import { KeyBoardComponent } from '@/components/KeyBoardComponent'
import { useLocalSearchParams } from 'expo-router/build/hooks'

export default function RestablecerPage() {
  const [codigo, setCodigo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const params = useLocalSearchParams()
  const router = useRouter()
  const { tokenId } = params


  const sendCodigo = async () => {
    try {
      setLoading(true)
      const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/verify-code`, { codigo, token: tokenId })
      console.log(res.data)

      if (res.data.status == 200) {
        router.replace(`/(resetPassword)/${tokenId}`)
        setLoading(false)

      }
      setError(res.data?.message)

    } catch (error) {
    } finally {
      setLoading(false)
    }

  }

  return (
    <SafeAreaProvider>
      <KeyBoardComponent>
        <ImageBackground
          source={require('@/assets/images/wallpaper2.jpeg')} // Ruta de la imagen
          style={style.backgroundImage}
          resizeMode="cover"
        >
          <SafeAreaView style={{ flex: 1 }}>




            <View style={style.container} >


              <View style={{ width: '90%' }}>

                <Subtitle text='Escribe el código que se le envió a su correo:' style={{ color: colors.complementary }} />

                <TextInput
                  style={style.inputContainer}
                  keyboardType='numeric'
                  value={codigo}
                  onChangeText={(text: string) => setCodigo(text)} />


                <Separator />

                {error && <Text style={{ color: colors.dangerColor, fontWeight: '700', textAlign: 'center', marginBottom: 10 }}>{error}</Text>}

                <TouchableOpacity onPress={sendCodigo} style={{ backgroundColor: colors.secundary, borderRadius: 10, padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                  <Text style={{ textAlign: 'center', color: colors.background, fontWeight: 700 }}>{loading ? <ActivityIndicator color={colors.background} /> : 'Enviar'}</Text>
                </TouchableOpacity>



                <Separator height={30} />

                <View style={style.containerRegister}>
                  <View>
                    <View>

                      <Pressable onPress={() => router.navigate('/(public)/login')}>
                        <Text style={style.textRegister}>Login</Text>
                      </Pressable>
                    </View>


                  </View>





                </View>
              </View>


            </View>
          </SafeAreaView>
        </ImageBackground>
      </KeyBoardComponent>
    </SafeAreaProvider>
  )


}

const style = StyleSheet.create({


  container: {
    flex: 1,
    display: 'flex',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  backgroundImage: {
    flex: 1,
    height: '100%'
  },


  containerRegister: {
    width: '100%',

  },
  textRegister: {
    fontSize: 19,
    textAlign: 'center',
    color: colors.secundary,
    textDecorationLine: 'underline'

  },


  inputContainer: {
    padding: 20,
    fontSize: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.complementary

  }

})