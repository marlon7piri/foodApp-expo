import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Pressable } from 'react-native';
import { LogoutIcon } from '@/components/Icons';
import { authStore } from '@/store/auth.store';

export default function Layout() {
  const logout = authStore(state => state.logout)
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{
        headerRight: () => (<Pressable onPress={logout}><LogoutIcon /></Pressable>)
      }}>
        <Drawer.Screen
          name="(tabs)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Home',
          }}


        />
        <Drawer.Screen
          name="(contacto)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Contacto',
            title: 'Contacto',
          }}
        />

      </Drawer>
    </GestureHandlerRootView>
  );
}
