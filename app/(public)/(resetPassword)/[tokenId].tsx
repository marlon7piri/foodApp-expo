import { useState } from 'react'
import { Text, TextInput, Button, View, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, ActivityIndicator, useWindowDimensions, Pressable } from 'react-native'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { colors } from '@/theme/theme'
import { Separator } from '@/components/Separator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import TheTitle from '@/components/TheTitle'
import Subtitle from '@/components/Subtitle'
import { InputCustom } from '@/components/InputCustom'
import axios from 'axios'
import { authStore } from '@/store/auth.store'
import { EyeCloseIcon, EyeOpenIcon } from '@/components/Icons'
import { KeyBoardComponent } from '@/components/KeyBoardComponent'
import { sendMessage } from '@/components/ToastCustom'
import GradientBackground from '@/components/GradientBackground'
import { LinearGradient } from 'expo-linear-gradient'

export default function resetPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [show, setShow] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string>('')


  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const params = useLocalSearchParams()
  const { tokenId } = params
  const widthScreen = useWindowDimensions().width




  const resetPassword = async () => {


    try {

      if (newPassword !== confirmPassword) {
        setError('Las contraseñas no coinciden')
        return
      }
      setLoading(true)
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/reset-password`, { newPassword, token: tokenId })



      if (response.status == 200) {
        router.replace('/(public)/login')
        sendMessage('Exito', 'Contraseña restablecida', 'success', 2000)

      }
      setLoading(false)


    } catch (error) {
      setError(error.message)



    } finally {
      setLoading(false)
    }
  }
  const showPassword = () => {
    setShow(!show)
  }
  const showPassword2 = () => {


    setShowConfirmPassword(!showConfirmPassword)
  }

  const handlerPasswordConfirm = (text: string) => {
    setConfirmPassword(text)


    if (text !== newPassword) {
      setError('Las contraseñas no coinciden')
    } else {
      setError('')

    }



  }

  return (
    <SafeAreaProvider>
      <KeyBoardComponent>

        <SafeAreaView style={{ flex: 1 }}>
          <GradientBackground text='Restablecer' />

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: widthScreen, padding: 20 }}>




            <View style={{ position: 'relative', width: '100%' }}>
              <TextInput
                placeholder='Nueva Contraseña'
                placeholderTextColor={'#95a5a6'}

                keyboardType={'visible-password'}
                secureTextEntry={!show}
                style={style.inputContainer}
                value={newPassword}
                onChangeText={(text: string) => setNewPassword(text)}

              />

              <TouchableOpacity onPress={showPassword} style={{ position: 'absolute', right: 10, top: 25 }}>
                {show ? <EyeOpenIcon /> : <EyeCloseIcon />}

              </TouchableOpacity>
            </View>

            <Separator height={40} />
            <View style={{ position: 'relative', width: '100%' }}>
              <TextInput
                placeholder='Confrmar Contraseña'

                keyboardType={'visible-password'}
                secureTextEntry={!showConfirmPassword}

                style={style.inputContainer}
                value={confirmPassword}
                onChangeText={(text: string) => handlerPasswordConfirm(text)}

              />

              <TouchableOpacity onPress={showPassword2} style={{ position: 'absolute', right: 10, top: 25 }}>
                {showConfirmPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}

              </TouchableOpacity>
            </View>

            <Separator height={40} />

            {<Text style={{ color: colors.dangerColor, fontWeight: '700', textAlign: 'center', marginBottom: 10 }}>{error}</Text>}

            <LinearGradient colors={["rgba(0,212,255,1)", "rgba(9,113,121,1)"]} style={style.btnLogin}>
              <TouchableOpacity onPress={resetPassword} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', fontWeight: '900', color: colors.background, }}>{loading ? <ActivityIndicator color={colors.background} /> : 'Restablecer'}</Text>
              </TouchableOpacity>
            </LinearGradient>

            <Separator height={40} />

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
    </SafeAreaProvider >
  )


}

const style = StyleSheet.create({


  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    height: '100%'
  },

  titleContainer: {
    flex: 1,
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
    shadowOpacity: 0.5,


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
  containerRegister: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textRegister: {
    fontSize: 19,
    textAlign: 'center',
    color: colors.secundary,
    textDecorationLine: 'underline'

  },
})