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
          <Animated.View style={[styles.cardItem, { opacity: animatedOpacity, transform: [{ translateY: animationTranslate }] }]}>

            <Text style={styles.descripcion}>{item.descripcion}</Text>
            <View style={styles.containername}>
              <Text style={styles.descripcion}>{item.de.name}</Text>

              <PersonIcon />
            </View>
            <Text>{convertirFecha(item.fecha_final)}</Text>

            {item.estado == 'pendiente' ?
              <Pressable onPress={() => updateTarea(item._id)} >
                {({ pressed }) => <Text style={{ opacity: pressed ? 0.3 : 1 }}> <SadIcon /></Text>}

              </Pressable>

              : <Pressable onPress={() => updateTarea(item._id)}>
                {({ pressed }) => <Text style={{ opacity: pressed ? 0.3 : 1 }}><CheckIcon /></Text>}

              </Pressable>}
          </Animated.View>
        )} />
    </View>
  )
}


const styles = StyleSheet.create({
  cardItem: {
    backgroundColor: colors.cardColor,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  containername: {
    flexDirection: 'row',
    gap: 2
  },
  descripcion: {
    color: colors.complementary,
    fontSize: 18
  },
})
export default ListaTareas