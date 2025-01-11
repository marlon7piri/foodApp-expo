import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View, StyleSheet, KeyboardAvoidingView, ImageBackground, SafeAreaView, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TheTitle from '@/components/TheTitle'
import Subtitle from '@/components/Subtitle'
import { Separator } from '@/components/Separator'
import { colors } from '@/theme/theme'
import axios from 'axios'

import { KeyBoardComponent } from '@/components/KeyBoardComponent'
import { sendMessage } from '@/components/ToastCustom'

export default function ResetPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()


  const sendEmail = async () => {
    try {

      setLoading(true)
      const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/reset`, { email })

      console.log(res.data)

      if (res.data.status == 200) {
        router.replace(`/(restablecer)/${res.data.token}`)
        sendMessage('Correo', 'Se le envió un codigo a su correo.', 'success', 2000)

      } else {
        setError(res.data.message)
      }
    } catch (error) {
      setError(error?.message)

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


              <View >

                <Subtitle text='Escriba el correo con el que se registró:' style={{ fontSize: 16, fontWeight: 500 }} />

                <TextInput
                  autoComplete='email'
                  style={style.inputContainer}
                  keyboardType='email-address'
                  value={email}
                  onChangeText={(text: string) => setEmail(text)} />




                <Separator height={20} />
                {<Text style={{ color: colors.dangerColor, fontWeight: '700', textAlign: 'center', marginBottom: 10 }}>{error}</Text>}

                <TouchableOpacity onPress={sendEmail} style={{ backgroundColor: colors.secundary, borderRadius: 10, padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                  <Text style={{ textAlign: 'center', color: colors.background, fontWeight: 700 }}>{loading ? <ActivityIndicator color={colors.background} /> : 'Enviar correo'}</Text>
                </TouchableOpacity>



                <Separator height={50} />

                <View style={style.containerRegister}>
                  <View>
                    <Text style={style.txt}>Ya tienes una cuenta?</Text>
                  </View>

                  <Pressable onPress={() => router.navigate('/(public)/register')}>
                    <Text style={style.textRegister}>Registrarse</Text>
                  </Pressable>

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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  }, txt: {
    fontSize: 18,

  },
  textRegister: {
    fontSize: 18,
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