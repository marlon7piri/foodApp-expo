import { Contacto } from '@/config/infrastructure/entities/contacto'
import { colors } from '@/theme/theme'
import React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'


interface Props {
  contactos: Contacto[]
}
export const ListaContactos = ({ contactos }: Props) => {




  return <View style={{ padding: 10 }}>

    {contactos?.map((item) => {
      return <View style={styles.container} key={item._id}>
        <Image source={require('@/assets/images/user.png')} style={{ width: 50, height: 50 }} />
        <Text style={styles.txtEmail}>{item.email}</Text>
      </View>
    })}
  </View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.cardColor,
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,

  },
  txtEmail: {
    fontSize: 18,
    color: colors.complementary
  }
})