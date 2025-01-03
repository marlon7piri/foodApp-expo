import { View, Text, FlatList, ScrollView, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import CustomView from '@/components/CustomView'
import Subtitle from '@/components/Subtitle'
import { colors } from '@/theme/theme'
import { Link, useLocalSearchParams } from 'expo-router'
import { BackIcon } from '@/components/Icons'


interface RootStackProps {

}
export default function DetailsListaCompras() {
  const compraId = useLocalSearchParams()
  const params = useRoute().params
  const { compras } = params



  console.log(compras)

  const total = compras?.reduce((acc, obj) => {
    acc += obj.precio_compra
    return acc
  }, 0)

  return (

    <CustomView >

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Subtitle text="Productos a Comprar" />
        <Link href={'/cart'} asChild>
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


      <View style={{ flex: 1 }}>



        <FlatList data={compras}
          keyExtractor={compras?.id}
          renderItem={({ item, index }) => (
            <View style={styles.containerLista}>
              <Text style={styles.txtPrecio}>{index + 1 + '.'}</Text>
              <Text style={styles.txtNombre}>{item?.nombre}</Text>
              <Text style={styles.txtPrecio}>{item?.precio_compra}</Text>
              <Text style={styles.txtUnidad}>{item?.unidad_medida}</Text>


            </View>
          )}

          ListFooterComponent={
            <View style={{
              padding: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
              <Text style={styles.txtPrecio}>
                Total de la compra:
              </Text>
              <Text style={styles.txtTotal}>
                ${parseFloat(total?.toFixed(2))}
              </Text>
            </View>
          } />




      </View>

    </CustomView>

  )
}

const styles = StyleSheet.create({
  containerLista: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 4
  },
  txtNombre: {
    fontSize: 24,
    fontWeight: '700'
  },

  txtPrecio: {
    fontSize: 18,
    fontWeight: '400'
  },
  txtUnidad: {
    fontSize: 18,
    fontWeight: '700'
  },
  txtTotal: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.complementary
  },

})