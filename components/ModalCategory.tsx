import React, { useState } from 'react'
import CustomModal from '@/components/CustomModal'
import Subtitle from '@/components/Subtitle'
import { useModalStore } from '@/store/modal-store'
import { Pressable, SafeAreaView, View, Text, Alert, TextInput, useWindowDimensions } from 'react-native'
import { InputCustom } from '@/components/InputCustom'
import { Separator } from '@/components/Separator'
import Button from '@/components/Button'
import { productStore } from '@/store/product.store'



import { useCategory } from '@/hooks/categorias/useCategory'


export const ModalCategory = () => {

  const modalCreateCategory = useModalStore(state => state.isopenModalCategory)
  const closeModalCategory = useModalStore(state => state.closeModalCategory)
  const productos = productStore(state => state.productos)


  const { loading, category, setCategory, createCategoryController } = useCategory()
  const height = useWindowDimensions().height



  return (
    <CustomModal close={closeModalCategory} value={modalCreateCategory} >
      <SafeAreaView style={{
        flex: 1,
      }}>
        <Subtitle text='Crear Categoria' />

        <View style={{
          flex: 1,
          padding: 10,
        }}>
          <View>
            <Subtitle text='Nombre' />
            <InputCustom
              placeholder='Nombre de la Categoria'
              value={category.nombre} onChange={(text: string) => setCategory({ ...category, nombre: text })}
              type='default'
            />
          </View>
          <Separator />
          <View>
            <Button text={loading ? 'Creando...' : 'Crear'} onPress={createCategoryController} styles={{
              width: '100%',
              padding: 20
            }} />
          </View>

        </View>
      </SafeAreaView>

    </CustomModal>
  )
}


