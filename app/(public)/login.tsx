import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View, StyleSheet, KeyboardAvoidingView, ImageBackground, SafeAreaView, TouchableOpacity, ActivityIndicator, useWindowDimensions, Pressable } from 'react-native'
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

export default function Page() {

  const router = useRouter()
  const widthScreen = useWindowDimensions().width



  const login = authStore(state => state.login)

  const [loading, setLoading] = useState<boolean>(false)
  const [show, setShow] = useState(false)
  const [error, setError] = useState<string>('')
  const [user, setUser] = useState({
    email: '',
    password: ''
  })


  const loginhandler = async () => {
    try {


      setLoading(true)
      const response = await axios.post('https://food-apiv1.vercel.app/login', user)
      const { token, usuario } = response.data

      if (response.status == 200) {
        console.log({ usuario })
        login(token, usuario)
      } else {
        setError(response.data.message)



      }
      setLoading(false)

    } catch (error) {
      if (error.message == 'Request failed with status code 501') {
        setError('Credenciales invalidas')

      } else {
        setError(error.message)

      }

    } finally {
      setLoading(false)
    }
  }

  const showPassword = () => {
    setShow(!show)
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


              <View style={{ width: widthScreen - 100 }}>
                <TheTitle title='Login' styles={{ fontSize: 34, color: colors.complementary, textAlign: 'center', }} />

                <Subtitle text='Correo' style={{ color: colors.complementary }} />

                <TextInput
                  autoComplete='email'
                  style={style.inputContainer}
                  keyboardType='email-address'
                  value={user.email}
                  onChangeText={(text: string) => setUser({ ...user, email: text })} />


                <Separator />

                <Subtitle text='Contraseña' style={{ color: colors.complementary }} />

                <View style={{ position: 'relative' }}>
                  <TextInput

                    keyboardType={'visible-password'}
                    secureTextEntry={!show}
                    style={style.inputContainer}
                    value={user.password}
                    onChangeText={(text: string) => setUser({ ...user, password: text })}

                  />

                  <TouchableOpacity onPress={showPassword} style={{ position: 'absolute', right: 10, top: 25 }}>
                    {!show ? <EyeOpenIcon /> : <EyeCloseIcon />}

                  </TouchableOpacity>
                </View>

                <Separator height={40} />
                {error && <Text style={{ color: colors.dangerColor, fontWeight: '700', textAlign: 'center', marginBottom: 10 }}>{error}</Text>}
                <TouchableOpacity onPress={loginhandler} style={{ backgroundColor: colors.secundary, borderRadius: 10, padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                  <Text style={{ textAlign: 'center' }}>{loading ? <ActivityIndicator color={colors.background} /> : 'Iniciar Sesion'}</Text>
                </TouchableOpacity>



                <Separator height={50} />

                <View style={style.containerRegister}>

                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                    <Text style={style.txt}>Ya tienes una cuenta?</Text>

                    <Pressable onPress={() => router.navigate('/(public)/register')}>
                      <Text style={style.textRegister}>Registrarse</Text>
                    </Pressable>

                  </View>




                  <Link style={style.textRegister} href='/(public)/reset'>
                    <Text >Olvide mi contraseña.</Text>
                  </Link>



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
    width: '100%',
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
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
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
    padding: 20,
    fontSize: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.complementary

  }

})