import { StyleSheet, Image, Platform, View, ActivityIndicator } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useReceta } from '@/hooks/recetas/useReceta';
import CustomFlatListRecipes from '@/components/CustomFlatListRecipes';
import Button from '@/components/Button';
import { useModalStore } from '@/store/modal-store';
import { ModalCategory } from '@/components/ModalCategory';
import { ModalReceta } from '@/components/modales/recetas/ModalReceta';
import { useEffect } from 'react';
import { useProducto } from '@/hooks/productos/useProducto';
import CustomView from '@/components/CustomView';
import { Stack } from 'expo-router';

export default function RecetasScreen() {
  const { recetas } = useReceta()
  const { getProductoController } = useProducto()
  const openModalCreateRecipes = useModalStore(state => state.openModalCreateRecipes)

  useEffect(() => {
    getProductoController();
  }, []);

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
        <ThemedText type="title">Recetas</ThemedText>
        <Button text='Crear' onPress={openModalCreateRecipes} />
      </ThemedView>
      {!recetas ? <ActivityIndicator size={'large'} /> : <CustomFlatListRecipes recipes={recetas} />}

      <View>
        <ModalReceta />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 300,
    width: 500,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    gap: 8,
  },
});
