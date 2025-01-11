import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, useWindowDimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Separator } from '@/components/Separator'
import { colors } from '@/theme/theme'
import axios from 'axios'
import { authStore } from '@/store/auth.store'
import { MaterialIcons } from '@expo/vector-icons'
import { EyeCloseIcon, EyeOpenIcon } from '@/components/Icons'
import { KeyBoardComponent } from '@/components/KeyBoardComponent'
import GradientBackground from '@/components/GradientBackground'
import { LinearGradient } from 'expo-linear-gradient'

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
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/login`, user)
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




        <SafeAreaView style={{ flex: 1 }}>

          <GradientBackground text='Login' />









          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: widthScreen, padding: 20 }}>


            <TextInput
              autoComplete='email'
              style={style.inputContainer}
              placeholder='Correo'
              placeholderTextColor={'#95a5a6'}
              keyboardType='email-address'
              value={user.email}
              onChangeText={(text: string) => setUser({ ...user, email: text })} />


            <Separator />


            <View style={{ width: '100%', position: 'relative' }}>
              <TextInput
                placeholder='Contraseña'
                placeholderTextColor={'#95a5a6'}
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



            <LinearGradient colors={["rgba(0,212,255,1)", "rgba(9,113,121,1)"]} style={style.btnLogin}>
              <TouchableOpacity onPress={loginhandler} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', color: colors.background, fontWeight: 700 }}>{loading ? <ActivityIndicator color={colors.background} /> : 'Iniciar Sesion'}</Text>

              </TouchableOpacity>
            </LinearGradient>



            <Separator height={50} />

            <View style={style.containerRegister}>

              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                <Text style={style.txt}>Ya tienes una cuenta?</Text>

                <Pressable onPress={() => router.navigate('/(public)/register')} >
                  <Text style={style.textRegister}>Registrarse</Text>
                </Pressable>

              </View>




              <Link style={style.textRegister} href='/(public)/reset'>
                <Text >Olvide mi contraseña.</Text>
              </Link>



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
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },



  containerRegister: {
    width: '100%',
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