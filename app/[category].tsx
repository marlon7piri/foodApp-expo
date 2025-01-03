import { View, Text, FlatList, ScrollView, StyleSheet, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import CustomView from '@/components/CustomView'
import Subtitle from '@/components/Subtitle'
import TheTitle from '@/components/TheTitle'
import { useProducto } from '@/hooks/productos/useProducto'
import { productStore } from '@/store/product.store'
import { colors } from '@/theme/theme'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { Stack } from 'expo-router'
import MaterialIcon from '@expo/vector-icons/MaterialIcons'
import { Colors } from '@/constants/Colors'
import { BackIcon } from '@/components/Icons'

export default function DetailsCategory() {
  const { category } = useLocalSearchParams()
  const router = useRouter()

  const { getProductoByCategoryController } = useProducto()
  const productosByCategoria = productStore(state => state.productosByCategoria)


  useEffect(() => {
    getProductoByCategoryController(category)
  }, [category])



  if (!productosByCategoria) {
    return <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      <ActivityIndicator size={'large'} color={colors.background} />
    </View>
  }



  return (

    <CustomView >

      <Stack.Screen options={{
        headerTransparent: true,
        headerTitle: 'Mami',




        headerRight: undefined
      }} />

      <View >


        <View style={styles.containerSubtitle}>
          <Text style={{ ...styles.textos, fontSize: 24 }}>Productos:{productosByCategoria?.length}</Text>

          <Link href={'/(auth)'} asChild>
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

        <FlatList data={productosByCategoria}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.contenedor}>

              <Text style={{ ...styles.textos, marginRight: 10 }}>{index + 1 + '.'}</Text>

              <Text style={{ ...styles.textos, marginRight: 10 }}>{item.nombre}</Text>
              <MaterialIcon name='add-box' size={24} />

              <Text style={{ ...styles.textos, marginRight: 10 }}>{item.stock}</Text>
              <MaterialIcon name='error-outline' size={24} />

              <Text style={styles.textos}>{item.stock_min}</Text>


            </View>
          )} />
      </View>




    </CustomView>

  )
}

const styles = StyleSheet.create({
  contenedor: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    gap: 2,
  },
  containerSubtitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
    marginVertical: 20
  },
  textos: {
    fontSize: 18,
    fontWeight: '500'
  }
})