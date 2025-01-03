
import React, { useState } from 'react'
import CustomView from '@/components/CustomView'
import { productStore } from '@/store/product.store'
import TheTitle from '@/components/TheTitle'

import { ListaProductos } from '@/components/ListaProductos'

import { StyleSheet, Text, TextInput, View } from 'react-native'

import Subtitle from '@/components/Subtitle'
import { useModalStore } from '@/store/modal-store'

import Button from '@/components/Button'
import ModalProducto from '@/components/ModalProducto'
import { colors, globalStyles } from '@/theme/theme'

import { Producto } from '@/config/infrastructure/entities/productos'
import { Ionicons } from '@expo/vector-icons'

export default function InventoryScreen() {


  const openModalProducto = useModalStore().openModalProducto

  const totalProductos = productStore(state => state.totalProductos)
  const productos = productStore(state => state.productos)
  const productfilter = productStore(state => state.productosfiltered)
  const searchProduct = productStore(state => state.searchProduct)


  const [search, setSearch] = useState('')

  const hanlderFilter = (text: string) => {
    setSearch(text)
    searchProduct(text)

  }

  return (
    <CustomView>
      <TheTitle title={`Productos: ${totalProductos()}`} />
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 50
      }}>

        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Ionicons name='storefront-outline' size={34} color={colors.complementary} />
          <Text style={globalStyles.textBreadCrum}>Productos:</Text>
        </View>

        <Button text='Crear'
          onPress={openModalProducto}
        />
      </View>
      <View>
        <TextInput placeholder='Buscar productos'
          value={search} onChangeText={hanlderFilter}
          placeholderTextColor={colors.complementary}
          style={{ width: '90%', margin: 'auto', marginBottom: 10, color: colors.complementary, borderColor: colors.complementary, borderWidth: 1, padding: 10, borderRadius: 5 }} />

      </View>
      <View style={{ flex: 1 }}>
        <ListaProductos item={productfilter} />

      </View>



      <View>
        <ModalProducto />
      </View>
    </CustomView>
  )
}




