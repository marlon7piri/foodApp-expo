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
import { useTareas } from '@/hooks/tareas/useTareas'
import { CalendarPicker } from './CalendarPicker'
import { convertirFecha } from '@/utils/convertirFecha'
import { Picker } from '@react-native-picker/picker'
import { useContacto } from '@/hooks/contacto/useContacto'


export const ModalTarea = () => {

  const isopenModalTarea = useModalStore(state => state.isopenModalTarea)
  const closeModalTarea = useModalStore(state => state.closeModalTarea)
  const { contactos } = useContacto()

  const { newTask, setNewTask, loading, crearTarea, dateSelected, setDateSelected, contactoSelected, setContactoSelected } = useTareas()



  return (
    <CustomModal close={closeModalTarea} value={isopenModalTarea} >
      <SafeAreaView style={{
        flex: 1,
      }}>
        <Subtitle text='Crear Tarea' />

        <View style={{
          flex: 1,
          padding: 10,
        }}>
          <View>
            <InputCustom
              placeholder='Asunto'
              value={newTask?.asunto} onChange={(text: string) => setNewTask({ ...newTask, asunto: text })}
              type='default'
            />
          </View>
          <Separator />
          <View>
            <InputCustom
              isArea
              placeholder='Descripcion'
              value={newTask?.descripcion} onChange={(text: string) => setNewTask({ ...newTask, descripcion: text })}
              type='default'
            />
          </View>
          <Separator />

          <Picker
            selectedValue={contactoSelected}
            onValueChange={(itemValue, itemIndex) =>
              setContactoSelected(itemValue)
            }>

            {contactos?.map(e => {
              return <Picker.Item label={e.email} value={e.email} key={e._id} />
            })}
          </Picker>
          <Separator />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <Text>Fecha vencimiento:</Text>

            <CalendarPicker setState={setDateSelected} />
          </View>

          <Text>Fecha seleccionada: {dateSelected ? convertirFecha(dateSelected) : ''}</Text>
          <Separator />
          <View>
            <Button text={loading ? 'Creando...' : 'Crear'} onPress={crearTarea} styles={{
              width: '100%',
              padding: 20
            }} />
          </View>

        </View>
      </SafeAreaView>

    </CustomModal>
  )
}


