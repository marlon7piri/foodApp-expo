import { View, Text, FlatList, ScrollView, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native'
import CustomView from '@/components/CustomView'
import Subtitle from '@/components/Subtitle'
import { colors } from '@/theme/theme'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import { AddCircle, BackIcon, RemoveCircle, UsdIcon } from '@/components/Icons'
import { useCompras } from '@/hooks/compras/useCompras'
import { Producto } from '@/config/infrastructure/entities/compras'
import ListaProductosCompra from '@/components/ListaProductosCompra'
import { comprasStore } from '@/store/compras.store'
import { BackButton } from '@/components/BackButton'



export default function DetailsListaCompras() {
  const params = useLocalSearchParams()
  const { compraById, loadCompraById, setProductosCompra, productosCompra } = useCompras()


  const { id } = params



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
      <Stack.Screen options={{ headerShown: true, title: 'Compra', headerBackTitle: 'Atras' }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Subtitle text="Productos a Comprar" style={{ fontSize: 28, fontWeight: '900' }} />
        <BackButton />
      </View>


      <View style={{ flex: 1 }}>



        <ListaProductosCompra item={productosCompra} total={total} setProductosCompra={setProductosCompra} />




      </View>

    </CustomView>

  )
}

const styles = StyleSheet.create({
  containerLista: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.cardColor,
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 5
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