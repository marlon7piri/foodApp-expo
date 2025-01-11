import { useState } from 'react'
import { Text, TextInput, Button, View, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, ActivityIndicator } from 'react-native'
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
        <ImageBackground
          source={require('@/assets/images/wallpaper2.jpeg')} // Ruta de la imagen
          style={style.backgroundImage}
          resizeMode="cover"
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={style.container}>

              <View style={style.inputContainer}>
                <TheTitle title='Nueva Contraseña' styles={{ fontSize: 34, color: colors.complementary, textAlign: 'center', marginBottom: 50 }} />







                <Subtitle text='Contraseña' style={{ color: colors.complementary }} />
                <View style={{ position: 'relative' }}>
                  <TextInput

                    keyboardType={'visible-password'}
                    secureTextEntry={!show}
                    style={{
                      borderWidth: 1, padding: 20,
                      fontSize: 24,
                      borderRadius: 10,
                      borderColor: colors.complementary
                    }}
                    value={newPassword}
                    onChangeText={(text: string) => setNewPassword(text)}

                  />

                  <TouchableOpacity onPress={showPassword} style={{ position: 'absolute', right: 10, top: 25 }}>
                    {show ? <EyeOpenIcon /> : <EyeCloseIcon />}

                  </TouchableOpacity>
                </View>

                <Separator height={40} />
                <Subtitle text='Confirmar Contraseña' style={{ color: colors.complementary }} />
                <View style={{ position: 'relative' }}>
                  <TextInput

                    keyboardType={'visible-password'}
                    secureTextEntry={!showConfirmPassword}
                    style={{
                      borderWidth: 1, padding: 20,
                      fontSize: 24,
                      borderRadius: 10,
                      borderColor: colors.complementary
                    }}
                    value={confirmPassword}
                    onChangeText={(text: string) => handlerPasswordConfirm(text)}

                  />

                  <TouchableOpacity onPress={showPassword2} style={{ position: 'absolute', right: 10, top: 25 }}>
                    {showConfirmPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}

                  </TouchableOpacity>
                </View>

                <Separator height={40} />

                {<Text style={{ color: colors.dangerColor, fontWeight: '700', textAlign: 'center', marginBottom: 10 }}>{error}</Text>}
                <TouchableOpacity onPress={resetPassword} style={{ backgroundColor: colors.secundary, borderRadius: 10, padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                  <Text style={{ textAlign: 'center', fontWeight: '900', color: colors.background, }}>{loading ? <ActivityIndicator color={colors.background} /> : 'Restablecer'}</Text>
                </TouchableOpacity>




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
    width: '80%',
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
    fontSize: 18,
    color: colors.complementary
  },
})