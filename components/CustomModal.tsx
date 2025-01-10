import { View, Text, Modal, SafeAreaView, useWindowDimensions, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, { ReactNode, useState } from 'react'
import CustomView from './CustomView'
import Button from './Button'
import { useModal } from '@/hooks/useModal'
import { colors } from '@/theme/theme'
import { useModalStore } from '../store/modal-store'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView } from 'react-native'
import { KeyBoardComponent } from './KeyBoardComponent'


interface Props {
  children?: ReactNode,
  value: any,
  close: () => void

}

export default function CustomModal({ children, value, close }: Props) {



  return (



    <Modal
      visible={value}
      animationType='slide'

    >
      <KeyBoardComponent>
        <ScrollView>

          <View style={{
            flex: 1,
            padding: 20,



          }}>
            <TouchableOpacity onPress={close} style={styles.botonClose}>
              <Ionicons name='close' size={23} />

            </TouchableOpacity>

            {children}
          </View>

        </ScrollView>
      </KeyBoardComponent>
    </Modal>

  )
}

const styles = StyleSheet.create({
  botonClose: {

    padding: 5,
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: colors.secundary,
    top: 50,
    right: 10,
    zIndex: 100
  }
})