import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { authStore } from '@/store/auth.store';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


const InitialLayout = () => {
  const token = authStore(state => state.token)
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    console.log({ token })
    const inTabsGroup = segments[0] === '(auth)'

    if (token && !inTabsGroup) {
      router.replace('/(auth)')
    } else if (!token) {
      router.replace('/login')
    }
  }, [token])
  return <Slot />
}


export default function RootLayout() {
  const colorScheme = useColorScheme();




  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
      <StatusBar style='auto' />
      <Toast />
    </ThemeProvider>
  )



}
