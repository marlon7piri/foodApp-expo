import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View, StyleSheet, KeyboardAvoidingView, ImageBackground, SafeAreaView, TouchableOpacity, ActivityIndicator, Pressable, useWindowDimensions } from 'react-native'
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
import GradientBackground from '@/components/GradientBackground'
import { LinearGradient } from 'expo-linear-gradient'

export default function RestablecerPage() {
  const [codigo, setCodigo] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const widthScreen = useWindowDimensions().width

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

        <SafeAreaView style={{ flex: 1 }}>


          <GradientBackground text='Restablecer' />

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: widthScreen, padding: 20 }}>


            <Subtitle text='Escribe el código que se le envió a su correo:' style={{ color: colors.complementary }} />

            <TextInput
              style={style.inputContainer}

              keyboardType='numeric'
              value={codigo}
              onChangeText={(text: string) => setCodigo(text)} />


            <Separator />

            {error && <Text style={{ color: colors.dangerColor, fontWeight: '700', textAlign: 'center', marginBottom: 10 }}>{error}</Text>}
            <LinearGradient colors={["rgba(0,212,255,1)", "rgba(9,113,121,1)"]} style={style.btnLogin}>
              <TouchableOpacity onPress={sendCodigo} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', color: colors.background, fontWeight: 700 }}>{loading ? <ActivityIndicator color={colors.background} /> : 'Enviar'}</Text>

              </TouchableOpacity>
            </LinearGradient>




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

  },
  textRegister: {
    fontSize: 19,
    textAlign: 'center',
    color: colors.secundary,
    textDecorationLine: 'underline'

  },


  inputContainer: {
    width: '100%',
    padding: 20,
    fontSize: 34,
    textAlign: 'center',
    borderRadius: 40,
    borderWidth: 1,
    letterSpacing: 10,
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