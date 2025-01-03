import { View, Text, FlatList, ScrollView, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import CustomView from '@/components/CustomView'
import Subtitle from '@/components/Subtitle'
import TheTitle from '@/components/TheTitle'
import { Link, useLocalSearchParams } from 'expo-router'
import { colors } from '@/theme/theme'
import { BackIcon } from '@/components/Icons'
import { useReceta } from '@/hooks/recetas/useReceta'

export default function DetailsRecipes() {
  const params = useLocalSearchParams()
  const { loadRecetaById, recetaById } = useReceta()

  const { recetaId } = params

  useEffect(() => {
    loadRecetaById(recetaId)
  }, [recetaId])


  console.log(recetaById)
  return (

    <CustomView >

      <TheTitle title={recetaById?.nombre} />

      <View >

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Subtitle text="Ingredientes" />
          <Link href={'/recetas'} asChild>
            <Pressable style={{
              backgroundColor: colors.cardColor,
              borderWidth: 1,
              borderColor: colors.complementary,
              borderRadius: 10,
              padding: 5

            }}>

              <BackIcon />
            </Pressable>
          </Link>
        </View>

        <FlatList data={recetaById?.productos}
          keyExtractor={recetaById?.productos?._id}
          renderItem={({ item, index }) => (
            <View>
              <Text>{item?.producto?.nombre}</Text>
              <Text>{item?.cantidad}</Text>



            </View>
          )} />
      </View>
      <Subtitle text="Preparacion" />
      <ScrollView>
        <Text>{recetaById?.descripcion}</Text>

      </ScrollView>
    </CustomView>

  )
}