import Button from "@/components/Button";
import CustomView from "@/components/CustomView";
import { ReloadIcon } from "@/components/Icons";
import ListaTareas from "@/components/ListaTareas";
import { ModalTarea } from "@/components/ModalTarea";
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTareas } from "@/hooks/tareas/useTareas";
import { useModalStore } from "@/store/modal-store";
import { colors } from "@/theme/theme";
import { Stack } from "expo-router";
import { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tareas = () => {

  const { tareas, loadTareas } = useTareas()
  const { top } = useSafeAreaInsets()
  const [isrefreshing, setIsrefreshing] = useState(false)
  const openModalTarea = useModalStore(state => state.openModalTarea)


  const onRefresh = () => {
    setIsrefreshing(true)
    setTimeout(() => {
      loadTareas()
      setIsrefreshing(false)
    }, 2000)
  }

  return (


    <CustomView >
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        <  RefreshControl refreshing={isrefreshing} onRefresh={onRefresh} progressViewOffset={top} colors={['red']} />

        <ThemedView style={styles.titleContainer}>
          <ThemedText style={{ fontWeight: '900', fontSize: 38, padding: 10, textAlign: 'center' }} type="title">Tareas</ThemedText>



          <Button text='Crear' onPress={openModalTarea} />

        </ThemedView>



        <ListaTareas item={tareas} />


        <View>
          <ModalTarea />
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
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 300,
    width: 500,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
export default Tareas