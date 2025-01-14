import 'react-native-gesture-handler';
import { DarkTheme, DefaultTheme, ThemeProvider, NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Slot, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { authStore } from '@/store/auth.store';
import Toast from 'react-native-toast-message';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


const InitialLayout = () => {
  const token = authStore(state => state.token)
  const isLoggeIn = authStore(state => state.isLoggeIn)
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {

    isLoggeIn()

    if (!token) {
      router.replace('/login')
    } else {
      router.replace('/(auth)/inventory')

    }
  }, [token])





  return (

    <Stack screenOptions={{ headerShown: false }}  >
      <Stack.Screen name='(category)' options={{ headerShown: true, headerTitle: 'Categoria', headerBackTitle: 'Atras' }} />
      <Stack.Screen name='(receta)' options={{ headerShown: true, headerTitle: 'Receta', headerBackTitle: 'Atras', }} />
    </Stack>
  )
}


export default function RootLayout() {
  const colorScheme = useColorScheme();





  const [loaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Light.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

    }
  }, [loaded]);


  if (!loaded) {
    return null;
  }

  return (


    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <InitialLayout />


      <Toast />
      <StatusBar style='auto' />
    </ThemeProvider>
  )



}
