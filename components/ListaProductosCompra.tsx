import React, { SetStateAction } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { AddCircle, RemoveCircle } from './Icons'
import { colors } from '@/theme/theme'
import { Producto } from '@/config/infrastructure/entities/compras'


interface Props {
  item: Producto[];
  total: number;
  setProductosCompra: () => React.Dispatch<SetStateAction<Producto[]>>
}
const ListaProductosCompra = ({ item, total, setProductosCompra }: Props) => {


  const aumentarCantidad = (id: string) => {
    setProductosCompra((prev) => prev.map((producto) => producto._id === id ? { ...producto, cantidad: producto.cantidad + 1 } : producto));

  }

  const disminuirCantidad = (id: string) => {
    setProductosCompra((prev) => prev.map((producto) => {


      if (producto._id === id) {
        if (producto.cantidad == 0) {
          return { ...producto, cantidad: 0 }
        } else {
          return { ...producto, cantidad: producto.cantidad - 1 }
        }

      }
      return producto

    })
    );

  }
  return (
    <FlatList data={item}

      ListHeaderComponent={() => (
        <View style={{ flexDirection: 'row', padding: 10, backgroundColor: colors.secundary, borderRadius: 5, marginVertical: 10 }}>
          <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'left', color: colors.background }}>Nombre</Text>
          <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'left', color: colors.background }}>Precio</Text>
          <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: colors.background }}>Presentacion x und</Text>
          <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'right', color: colors.background }}>Accion</Text>
        </View>
      )}
      keyExtractor={item => item?._id}



      renderItem={({ item, index }) => (
        <View style={styles.containerLista}>
          <View style={styles.infoList}>
            <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'left', color: colors.complementary }}>{item.nombre}</Text>
            <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'left', color: colors.complementary }} >${item?.precio_compra}</Text>
            <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'left', color: colors.complementary }}>{item?.presentacion_por_unidad}/{item?.unidad_medida}</Text>
          </View>

          <Pressable style={{ backgroundColor: colors.secundary, borderRadius: 50 }} onPress={() => disminuirCantidad(item._id)}>

            <RemoveCircle />
          </Pressable>
          <Text style={styles.txtUnidad}>{item?.cantidad}</Text>
          <Pressable style={{ backgroundColor: colors.secundary, borderRadius: 50 }} onPress={() => aumentarCantidad(item._id)}>

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
export default ListaProductosCompra