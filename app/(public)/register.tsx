import * as React from 'react'
import { Text, TextInput, Button, View, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, ActivityIndicator, Pressable, useWindowDimensions } from 'react-native'
import { Link, useRouter } from 'expo-router'
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
import GradientBackground from '@/components/GradientBackground'
import { LinearGradient } from 'expo-linear-gradient'

export default function SignUpScreen() {
  const router = useRouter()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [show, setShow] = React.useState(false)
  const [error, setError] = React.useState<string>('')
  const widthScreen = useWindowDimensions().width


  const token = authStore(state => state.token)
  const [user, setUser] = React.useState({
    name: '',
    email: '',
    password: ''
  })


  const register = async () => {
    try {

      setLoading(true)
      const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/register`, user)

      if (response.status == 201) {
        router.replace('/(public)/login')

      }
      setLoading(false)


    } catch (error) {
      console.log(error)
      setError(error.message)


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
          <GradientBackground text='Registrarse' />


          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: widthScreen, padding: 20 }}>
            <TextInput
              style={style.inputContainer}
              placeholder='Nombre'
              placeholderTextColor={'#95a5a6'}
              keyboardType='default'
              value={user.name}
              onChangeText={(text: string) => setUser({ ...user, name: text })} />




            <Separator />
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
                {show ? <EyeOpenIcon /> : <EyeCloseIcon />}

              </TouchableOpacity>
            </View>

            <Separator height={40} />

            {<Text style={{ color: colors.dangerColor, fontWeight: '700', textAlign: 'center', marginBottom: 10 }}>{error}</Text>}


            <LinearGradient colors={["rgba(0,212,255,1)", "rgba(9,113,121,1)"]} style={style.btnLogin}>
              <TouchableOpacity onPress={register} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', color: colors.background, fontWeight: 700 }}>{loading ? <ActivityIndicator color={colors.background} /> : 'Registrarse'}</Text>

              </TouchableOpacity>
            </LinearGradient>


            <Separator height={50} />

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>

              <Text style={style.txt}>Ya tienes una cuenta?</Text>



              <Pressable onPress={() => router.navigate('/(public)/login')}>
                <Text style={style.textRegister}>Login</Text>
              </Pressable>

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
    shadowOpacity: 0.5

  },
  containerRegister: {
    width: '100%',

    gap: 10,
  },
  txt: {
    fontSize: 18,

  },
  textRegister: {
    fontSize: 18,
    color: colors.secundary,
    textDecorationLine: 'underline'
  }, btnLogin: {

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