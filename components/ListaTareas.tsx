import React, { useEffect } from 'react'
import CustomView from './CustomView'
import { Tareas } from '@/config/infrastructure/entities/tareas'
import { Animated, Pressable, StyleSheet, View } from 'react-native'
import { FlatList, Text } from 'react-native'
import { colors } from '@/theme/theme'
import { CheckIcon, PersonIcon, SadIcon } from './Icons'
import { convertirFecha } from '@/utils/convertirFecha'
import { useAnimation } from '@/hooks/animations/useAnimation'
import { opacity } from 'react-native-reanimated/lib/typescript/Colors'
import { useTareas } from '@/hooks/tareas/useTareas'
import Accordion from './AccordionItem'


interface Props {
  item: Tareas[]
}
const ListaTareas = ({ item }: Props) => {
  const { animatedOpacity, fadeIn, animationTranslate, moveUp } = useAnimation()
  const { updateTarea } = useTareas()

  useEffect(() => {
    fadeIn()
    moveUp(20)
  }, [animatedOpacity, animationTranslate])
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={item => item._id}
        data={item}
        horizontal={false}

        renderItem={({ item, index }) => (

          <Accordion title={item.asunto} children={item.descripcion} item={item} />




        )} />
    </View>
  )
}



export default ListaTareas