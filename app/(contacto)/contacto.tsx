import Button from '@/components/Button'
import CustomView from '@/components/CustomView'
import { ListaContactos } from '@/components/ListaContactos'
import { ModalContacto } from '@/components/ModalContacto'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useContacto } from '@/hooks/contacto/useContacto'
import { useModalStore } from '@/store/modal-store'
import { colors } from '@/theme/theme'
import { Stack, useNavigation } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View, RefreshControl, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const ContactoScrenn = () => {
  const { contactos, loadContactos, loading } = useContacto()
  const openModalContacto = useModalStore(state => state.openModalContacto)
  const [isrefreshing, setIsrefreshing] = useState(false)
  const { top } = useSafeAreaInsets()


  const onRefresh = () => {
    setIsrefreshing(true)
    setTimeout(() => {
      loadContactos()
      setIsrefreshing(false)
    }, 2000)
  }



  return (
    <CustomView>

      <ScrollView>
        <RefreshControl refreshing={isrefreshing} onRefresh={onRefresh} progressViewOffset={top} colors={['red']} />

        <ThemedView style={styles.titleContainer}>
          <ThemedText style={{ fontWeight: '700', fontSize: 24, padding: 10, textAlign: 'center' }} type="title">Mis contactos</ThemedText>



          <Button text='Crear' onPress={openModalContacto} />

        </ThemedView>

        {!contactos ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={colors.complementary} />
        </View> :
          <ListaContactos contactos={contactos!!} />}

        <View>
          <ModalContacto />
        </View>
      </ScrollView>
    </CustomView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 10
  }
})

export default ContactoScrenn