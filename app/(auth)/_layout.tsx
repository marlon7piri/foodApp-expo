import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { Platform, Pressable } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { BackIcon, LogoutIcon, MenuIcon } from '@/components/Icons';
import { authStore } from '@/store/auth.store';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const logout = authStore(state => state.logout)

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"

        options={{
          title: 'Home',
          headerShown: true,
          headerRight: () => (<Pressable style={{
            borderRadius: 10,
            padding: 5

          }} onPress={logout}>

            <LogoutIcon />
          </Pressable>),
          headerLeft: () => (
            <Pressable style={{
              borderRadius: 10,
              padding: 5

            }}
              onPress={() => alert('abriendo menu')}>

              <MenuIcon />
            </Pressable>),

          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tareas"

        options={{
          title: 'Tareas',
          headerShown: true,


          tabBarIcon: ({ color }) => <Ionicons name="albums" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Inventario',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="clock.badge.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="recetas"
        options={{
          title: 'Recetas',
          tabBarIcon: ({ color }) => <Ionicons name="bag-outline" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <Ionicons name="cart" size={28} color={color} />,
        }}
      />

    </Tabs>
  );
}
