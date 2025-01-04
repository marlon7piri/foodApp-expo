/* eslint-disable */
import { View, Text, StyleSheet, FlatList, Image, ImageSourcePropType, Pressable } from 'react-native'
import React from 'react'
import type { Producto } from '@/config/infrastructure/entities/productos'
import { Category } from '@/config/infrastructure/entities/category'
import { colors } from '@/theme/theme'
import { Link } from 'expo-router'


export type Items = {
  nombre: string,
  icono: ImageSourcePropType
}

interface PropsFlatlist {
  items?: Category[]

}

export default function CustomFlatlist({ items }: PropsFlatlist) {






  return (
    <FlatList
      data={items}
      horizontal
      ItemSeparatorComponent={() => <Separator />}

      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (

        <Link href={`/(category)/${item.id}`} asChild>
          <Pressable style={styles.container}>

            <Text style={styles.textButton}>{item.nombre}</Text>
          </Pressable>

        </Link>

      )
      }



    />)



}


const Separator = () => {
  return <View style={styles.separator} />
}
const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    padding: 20,
    backgroundColor: colors.cardColor,
    marginBottom: 10,

    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
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
    fontWeight: '700',
    fontSize: 18

  }
});
