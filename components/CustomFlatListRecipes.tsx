/* eslint-disable */
import { View, Text, StyleSheet, FlatList, Image, ImageSourcePropType, useWindowDimensions, SectionList, Pressable, ActivityIndicator } from 'react-native'
import { colors } from '@/theme/theme'
import React from 'react'

import { Receta } from '@/config/infrastructure/entities/receta'
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native'
import { useReceta } from '@/hooks/recetas/useReceta'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'



interface PropsFlatlist {
  recipes?: Receta[]
}



export default function CustomFlatListRecipes({ recipes }: PropsFlatlist) {
  const { width } = useWindowDimensions()
  const { loading } = useReceta()
  const router = useRouter()



  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      <ActivityIndicator size={'large'} color={colors.complementary} />
    </View>
  }

  return (
    <FlatList
      data={recipes}
      horizontal={true}
      pagingEnabled={true}
      ItemSeparatorComponent={() => <Separator />}

      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (


        <Pressable style={[styles.container,
        { backgroundColor: colors.cardColor }
        ]}
          onPress={() => router.replace(`/recetasDetalles/${item?._id}`)}>
          <Ionicons name='library-outline' size={22} color={colors.complementary} />
          <Text>{item?.nombre}</Text>

        </Pressable>
      )
      }



    />



  )



}


const Separator = () => {
  return <View style={styles.separator} />
}
const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    padding: 20,
    backgroundColor: colors.primary,
    marginBottom: 25,

    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'



  },

  separator: {
    height: 1,
    width: 25,
  },

  imagen: {
    width: 64,
    height: 64,
    objectFit: 'cover',



  },
  button: {
    backgroundColor: colors.background,

    display: 'flex',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    color: colors.complementary,
    fontWeight: '900'

  }
});
