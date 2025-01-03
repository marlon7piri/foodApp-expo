import { View, Text, FlatList, ScrollView, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import CustomView from '@/components/CustomView'
import Subtitle from '@/components/Subtitle'
import { colors } from '@/theme/theme'
import { Link, useLocalSearchParams } from 'expo-router'
import { AddCircle, BackIcon, RemoveCircle, UsdIcon } from '@/components/Icons'
import { useCompras } from '@/hooks/compras/useCompras'
import { Producto } from '@/config/infrastructure/entities/compras'



export default function DetailsListaCompras() {
  const params = useLocalSearchParams()
  const { compraById, loadCompraById, setProductosCompra, productosCompra } = useCompras()


  const { id } = params



  console.log(id)
  useEffect(() => {
    loadCompraById(id)

  }, [id])

  if (!productosCompra) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', marginTop: 30 }}>
        <ActivityIndicator size="large" color={colors.complementary} />
      </View>
    );
  }

  const total = productosCompra?.reduce((acc, obj) => {
    acc += obj.precio_compra * obj.cantidad
    return acc
  }, 0)


  return (

    <CustomView >

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Subtitle text="Productos a Comprar" style={{ fontSize: 28, fontWeight: '900' }} />
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



        <FlatList data={productosCompra}
          keyExtractor={item => item?._id}
          renderItem={({ item, index }) => (
            <View style={styles.containerLista}>
              <View style={styles.infoList}>
                <Text style={styles.txtPrecio}>{index + 1 + '.'}</Text>
                <Text style={styles.txtNombre}>{item?.nombre}</Text>
                <UsdIcon />
                <Text style={styles.txtPrecio}>{item?.precio_compra}</Text>
                <Text style={styles.txtUnidad}>{item?.unidad_medida}</Text>
              </View>

              <Pressable style={{ backgroundColor: colors.secundary, borderRadius: 50 }}>

                <RemoveCircle />
              </Pressable>
              <Text style={styles.txtUnidad}>{item?.cantidad}</Text>
              <Pressable style={{ backgroundColor: colors.secundary, borderRadius: 50 }}>

                <AddCircle />
              </Pressable>


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
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
  },
  infoList: {
    flex: 1,
    flexDirection: 'row',
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