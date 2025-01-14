import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Pressable, Text } from 'react-native';
import { BackIcon, LogoutIcon } from '@/components/Icons';
import { authStore } from '@/store/auth.store';
import { BackButton } from '@/components/BackButton';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import CustomDrawer from '@/components/CustomDrawer';

export default function Layout() {
  const logout = authStore(state => state.logout)
  return (
    <GestureHandlerRootView style={{ flex: 1, }}>

      <Drawer screenOptions={{

        drawerHideStatusBarOnOpen: true,

        drawerActiveBackgroundColor: 'transparent',

        drawerStyle: {
          width: '50%'
        }

      }} drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen
          name="(tabs)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: ({ size, color }) => (
              <Ionicons name='home' size={size} color={color} />
            )
          }}


        /> <Drawer.Screen
          name="(contacto)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Contacto',
            title: 'Contacto',
            drawerIcon: ({ size, color }) => (
              <Ionicons name='person-add-outline' size={size} color={color} />
            )

          }}


        />  <Drawer.Screen
          name="(menu)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Menu',
            title: 'Menu',
            drawerIcon: ({ size, color }) => (
              <Ionicons name='book-outline' size={size} color={color} />
            )

          }}


        /> <Drawer.Screen
          name="(cuenta)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Cuenta',
            title: 'Cuenta',
            drawerIcon: ({ size, color }) => (
              <Ionicons name='person-outline' size={size} color={color} />
            )
          }}


        />
        <Drawer.Screen
          name="(settings)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Settings',
            title: 'Settings',
            drawerIcon: ({ size, color }) => (
              <Ionicons name='settings-outline' size={size} color={color} />
            )
          }}


        />




      </Drawer>


    </GestureHandlerRootView>
  );
}



