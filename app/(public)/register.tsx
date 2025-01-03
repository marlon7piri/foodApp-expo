import * as React from 'react'
import { Text, TextInput, Button, View, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, ActivityIndicator } from 'react-native'
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

export default function SignUpScreen() {
  const router = useRouter()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [show, setShow] = React.useState(false)

  const token = authStore(state => state.token)
  const [user, setUser] = React.useState({
    name: '',
    email: '',
    password: ''
  })


  const register = async () => {
    try {

      setLoading(true)
      const response = await axios.post('https://food-apiv1.vercel.app/register', user)
      if (response.status == 201) {
        router.replace('/(public)/login')

      }
      setLoading(false)

    } catch (error) {
      console.log(error.message)

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
            <View style={style.container}>

              <View style={style.inputContainer}>
                <TheTitle title='Registrarse' styles={{ fontSize: 34, color: colors.complementary, textAlign: 'center' }} />


                {loading && <ActivityIndicator size={'large'} color={colors.complementary} />}


                <Subtitle text='Nombre' style={{ color: colors.complementary }} />

                <InputCustom

                  type='default'



                  value={user.name}
                  onChange={(text: string) => setUser({ ...user, name: text })} />


                <Separator />
                <Subtitle text='Correo' style={{ color: colors.complementary }} />

                <InputCustom

                  type='email-address'



                  value={user.email}
                  onChange={(text: string) => setUser({ ...user, email: text })} />


                <Separator />

                <Subtitle text='Contraseña' style={{ color: colors.complementary }} />
                <View style={{ position: 'relative' }}>
                  <TextInput

                    keyboardType={'visible-password'}
                    secureTextEntry={show}
                    style={style.inputContainer}
                    value={user.password}
                    onChangeText={(text: string) => setUser({ ...user, password: text })}

                  />

                  <TouchableOpacity onPress={showPassword} style={{ position: 'absolute', right: 10, top: 25 }}>
                    {!show ? <EyeOpenIcon /> : <EyeCloseIcon />}

                  </TouchableOpacity>
                </View>

                <Separator height={40} />


                <TouchableOpacity onPress={register} style={{ backgroundColor: colors.secundary, borderRadius: 10, padding: 20 }} >
                  <Text style={{ textAlign: 'center' }}>Register</Text>
                </TouchableOpacity>

                <Separator height={10} />

                <View style={style.containerRegister}>
                  <View>
                    <Text style={style.textRegister}>Ya tienes una cuenta?</Text>
                  </View>


                  <Link style={{ width: 'auto' }} href='/(public)/login' asChild>
                    <Text style={style.textRegister}>Login</Text>
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