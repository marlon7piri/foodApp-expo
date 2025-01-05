import { View, Text, FlatList, StyleSheet, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import CustomView from '@/components/CustomView'
import { useProducto } from '@/hooks/productos/useProducto'
import { productStore } from '@/store/product.store'
import { colors } from '@/theme/theme'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { Stack } from 'expo-router'
import { BackIcon } from '@/components/Icons'
import { BackButton } from '@/components/BackButton'

export default function DetailsCategory() {
  const { category } = useLocalSearchParams()

  const { getProductoByCategoryController, categoryById } = useProducto()
  const productosByCategoria = productStore(state => state.productosByCategoria)


  useEffect(() => {
    getProductoByCategoryController(category)
  }, [category])

  if (!productosByCategoria || !categoryById) {
    return <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      <ActivityIndicator size={'large'} color={colors.background} />
    </View>
  }



  return (

    <CustomView >

      <Stack.Screen options={{ headerShown: true, title: 'Categoria', headerBackTitle: 'Atras' }} />


      <View >


        <View style={styles.containerSubtitle}>
          <Text style={{ ...styles.textos, fontSize: 24 }}>{categoryById?.nombre}: {productosByCategoria?.length}</Text>

          <BackButton />

        </View>

        <FlatList data={productosByCategoria}
          ListHeaderComponent={() => (
            <View style={{ flexDirection: 'row', padding: 10, backgroundColor: colors.secundary, borderRadius: 5, marginVertical: 10 }}>
              <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'left', color: colors.background }}>Nombre</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: colors.background }}>Stock</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: colors.background }}>Precio</Text>
              <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'left', color: colors.background }}>Presentacion x und</Text>
            </View>
          )}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => (
            <View style={styles.contenedor}>


              <Text style={{ flex: 1, textAlign: 'left', fontSize: 16 }}>{item.nombre}</Text>

              <Text style={{ flex: 1, textAlign: 'center', fontSize: 16 }}>{item.stock}</Text>
              <Text style={{ flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '700' }}><Text style={{ color: 'green', fontWeight: '900' }}>$</Text>{item.precio_compra}</Text>
              <Text style={{ flex: 1, textAlign: 'center', fontSize: 16 }}>{item.presentacion_por_unidad}/{item.unidad_medida}</Text>



            </View>
          )} />
      </View>




    </CustomView>

  )
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 2,
    marginBottom: 5,
    backgroundColor: colors.cardColor,
    borderWidth: 1,
    padding: 7,
    borderRadius: 5
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