import { Image, StyleSheet, Platform, Text, Pressable } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import CustomFlatlist from '@/components/CustomFlatlist';
import { useEffect } from 'react';
import { useProducto } from '@/hooks/productos/useProducto';
import { useCategory } from '@/hooks/categorias/useCategory';
import { categoryStore } from '@/store/category.store';
import { authStore } from '@/store/auth.store';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {

  const logout = authStore(state => state.logout)
  const user = authStore(state => state.user)


  const category = categoryStore(state => state.category)


  const { getProductoController } = useProducto()
  const { getCategoryController } = useCategory()


  useEffect(() => {
    getProductoController()
    getCategoryController()


  }, [])


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/wallpaper2.jpeg')}
          style={styles.reactLogo}
        />
      }
    >

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Categorias</ThemedText>
        <Pressable onPress={logout}>
          <Ionicons name='log-out' size={24} />
        </Pressable>
      </ThemedView>

      <CustomFlatlist items={category} />

    </ParallaxScrollView>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 300,
    width: 500,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
