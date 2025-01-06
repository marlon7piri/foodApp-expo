import React, { useState } from 'react'
import CustomModal from '@/components/CustomModal'
import Subtitle from '@/components/Subtitle'
import { useModalStore } from '@/store/modal-store'
import { Pressable, SafeAreaView, View, Text, Alert, TextInput, useWindowDimensions } from 'react-native'
import { InputCustom } from '@/components/InputCustom'
import { Separator } from '@/components/Separator'
import Button from '@/components/Button'
import { productStore } from '@/store/product.store'



import { useContacto } from '@/hooks/contacto/useContacto'


export const ModalContacto = () => {

  const isopenModalContacto = useModalStore(state => state.isopenModalContacto)
  const closeModalContacto = useModalStore(state => state.closeModalContacto)


  const { contacto, setContacto, crearContacto, loading, } = useContacto()



  return (
    <CustomModal close={closeModalContacto} value={isopenModalContacto} >
      <SafeAreaView style={{
        flex: 1,
      }}>
        <Subtitle text='Crear Contacto' />

        <View style={{
          flex: 1,
          padding: 10,
        }}>
          <View>
            <Subtitle text='Nombre' />
            <InputCustom
              placeholder='nombre'
              value={contacto?.nombre} onChange={(text: string) => setContacto({ ...contacto, nombre: text })}
              type='default'
            />
          </View>
          <Separator />
          <View>
            <Subtitle text='Correo' />
            <InputCustom
              placeholder='correo'
              value={contacto?.email} onChange={(text: string) => setContacto({ ...contacto, email: text })}
              type='default'
            />
          </View>
          <Separator />
          <View>
            <Button text={loading ? 'Creando...' : 'Crear'} onPress={crearContacto} styles={{
              width: '100%',
              padding: 20
            }} />
          </View>

        </View>
      </SafeAreaView>

    </CustomModal>
  )
}


