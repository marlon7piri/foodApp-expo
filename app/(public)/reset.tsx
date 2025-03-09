import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View, StyleSheet, KeyboardAvoidingView, ImageBackground, SafeAreaView, TouchableOpacity, ActivityIndicator, Pressable, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TheTitle from '@/components/TheTitle'
import Subtitle from '@/components/Subtitle'
import { Separator } from '@/components/Separator'
import { colors } from '@/theme/theme'
import axios from 'axios'

import { KeyBoardComponent } from '@/components/KeyBoardComponent'
import { sendMessage } from '@/components/ToastCustom'
import GradientBackground from '@/components/GradientBackground'
import { LinearGradient } from 'expo-linear-gradient'

export default function ResetPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const widthScreen = useWindowDimensions().width

  const router = useRouter()


  const sendEmail = async () => {
    try {

      setLoading(true)
      const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/reset`, { email })


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

        <SafeAreaView style={{ flex: 1 }}>


          <GradientBackground text='Restablecer' />


          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: widthScreen, padding: 20 }}>




            <TextInput
              autoComplete='email'
              placeholder='Escribe el email'
              style={style.inputContainer}
              keyboardType='email-address'
              value={email}
              onChangeText={(text: string) => setEmail(text)} />




            <Separator height={20} />
            {<Text style={{ color: colors.dangerColor, fontWeight: '700', textAlign: 'center', marginBottom: 10 }}>{error}</Text>}
            <LinearGradient colors={["rgba(0,212,255,1)", "rgba(9,113,121,1)"]} style={style.btnLogin}>
              <TouchableOpacity onPress={sendEmail} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', color: colors.background, fontWeight: 700 }}>{loading ? <ActivityIndicator color={colors.background} /> : 'Enviar correo'}</Text>

              </TouchableOpacity>
            </LinearGradient>




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


        </SafeAreaView>
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  txt: {
    fontSize: 18,

  },
  textRegister: {
    fontSize: 18,
    color: colors.secundary,
    textDecorationLine: 'underline'
  },


  inputContainer: {
    width: '100%',
    padding: 20,
    fontSize: 24,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.complementary,
    backgroundColor: colors.background,
    shadowColor: 'black',
    shadowOffset: {
      width: 3, height: 5
    },
    shadowOpacity: 0.5

  },
  btnLogin: {

    borderRadius: 40,
    padding: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: 'black',
    elevation: 10,
    shadowOffset: {
      width: 3, height: 5
    },
    shadowOpacity: 0.3

  },

})