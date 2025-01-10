import { Image, StyleSheet, Platform, Text, Pressable, View } from 'react-native';

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
import { useModalStore } from '@/store/modal-store';
import Button from '@/components/Button';
import { ModalCategory } from '@/components/ModalCategory';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function HomeScreen() {

  const logout = authStore(state => state.logout)
  const user = authStore(state => state.user)
  const openModalCategory = useModalStore(state => state.openModalCategory)


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
        <ThemedText style={{ fontWeight: '900', fontSize: 38, padding: 10 }} type="title">Hola👋   {user?.name}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" >Categorias</ThemedText>

        <Button text='Crear' onPress={openModalCategory} />
      </ThemedView>

      <CustomFlatlist items={category} />
      <View>
        <ModalCategory />
      </View>
    </ParallaxScrollView>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 10
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
