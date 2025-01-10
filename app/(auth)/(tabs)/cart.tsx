import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomView from '@/components/CustomView'
import { ListaCompra } from '@/components/ListaCompra'
import TheTitle from '@/components/TheTitle'
import { CalendarPicker } from '@/components/CalendarPicker'
import Subtitle from '@/components/Subtitle'
import { cartStore } from '@/store/cart.store'
import { Pressable } from 'react-native'
import { colors } from '@/theme/theme'
import { useModalStore } from '@/store/modal-store'
import { ModalListaCompra } from '@/components/ModalListaCompra'
import { productStore } from '@/store/product.store'
import { Ionicons } from '@expo/vector-icons'
import { Stack } from 'expo-router'
import { useCompras } from '@/hooks/compras/useCompras'

export default function CartScreen() {

  const openModalListaCompra = useModalStore().openModalListaCompra
  const { compras } = useCompras()



  return (
    <CustomView>
      <View style={styles.containerTitle}>
        <Ionicons name="clipboard-outline" size={30} color={colors.complementary} />

        <TheTitle title='Lista de compras'
          styles={{ textAlign: 'center' }}
        />
      </View>

      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={openModalListaCompra} style={styles.botonContainer}>
          <Ionicons name="bag-add" size={30} color="green" />
        </TouchableOpacity>
      </View>

      <ListaCompra compras={compras} />
      <View>
        <ModalListaCompra />
      </View>
    </CustomView>
  )
}

const styles = StyleSheet.create({

  containerTitle: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 20
  },
  card: {
    backgroundColor: colors.cardColor,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.complementary,
  },
  containerContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 4,
  },
  containerStock: {
    flexDirection: 'row',
    gap: 4,
  },
  title: {
    fontSize: 18,
    color: colors.complementary,
  },
  botonContainer: {
    backgroundColor: colors.background,
    padding: 2,

    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.complementary,
  },
});