import { View, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import CustomView from '@/components/CustomView'
import Subtitle from '@/components/Subtitle'
import { colors } from '@/theme/theme'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import { useCompras } from '@/hooks/compras/useCompras'
import ListaProductosCompra from '@/components/ListaProductosCompra'



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

  const total = Array.isArray(productosCompra) ? productosCompra?.reduce((acc, obj) => {
    acc += obj.precio_compra * obj.cantidad

    return acc
  }, 0) : 0




  return (

    <CustomView >
      <Stack.Screen options={{ headerShown: true, title: 'Compra', headerBackTitle: 'Atras' }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Subtitle text="Productos a Comprar" style={{ fontSize: 28, fontWeight: '900' }} />
      </View>


      <View style={{ flex: 1 }}>



        <ListaProductosCompra
          item={productosCompra}
          total={total}
          setProductosCompra={setProductosCompra} />




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