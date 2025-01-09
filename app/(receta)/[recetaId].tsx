import { View, Text, FlatList, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import CustomView from '@/components/CustomView'
import Subtitle from '@/components/Subtitle'
import TheTitle from '@/components/TheTitle'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { colors } from '@/theme/theme'
import { BackIcon } from '@/components/Icons'
import { useReceta } from '@/hooks/recetas/useReceta'
import { BackButton } from '@/components/BackButton'

export default function DetailsRecipes() {
  const params = useLocalSearchParams()
  const { loadRecetaById, recetaById } = useReceta()

  const { recetaId } = params

  useEffect(() => {
    loadRecetaById(recetaId)
  }, [recetaId])


  if (!recetaById) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', marginTop: 30 }}>
        <ActivityIndicator size="large" color={colors.complementary} />
      </View>
    );
  }

  return (

    <CustomView >

      <TheTitle title={recetaById?.nombre} />

      <View >

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Subtitle text="Ingredientes" style={{ fontWeight: '500', fontSize: 24 }} />
        </View>

        <FlatList data={recetaById?.productos}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => (
            <View style={styles.containerItem}>
              <Text style={styles.producto}>{item?.producto?.nombre} -</Text>
              <Text style={styles.cantidad}>{item?.cantidad}</Text>
              <Text style={styles.producto}>{item?.unidad}</Text>



            </View>
          )} />
      </View>
      <Subtitle text="Preparacion:" style={{ fontWeight: '900', fontSize: 28 }} />
      <ScrollView>
        <Text style={styles.recetaDescripcion}>{recetaById?.descripcion}</Text>

      </ScrollView>
    </CustomView>

  )
}

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  producto: {
    fontSize: 20,
    fontWeight: '700'

  },
  cantidad: {
    fontSize: 18,
    fontWeight: '700'

  },
  recetaDescripcion: {
    fontSize: 18
  }
})