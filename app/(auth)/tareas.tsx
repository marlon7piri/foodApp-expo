import Button from "@/components/Button";
import CustomView from "@/components/CustomView";
import ListaTareas from "@/components/ListaTareas";
import { ModalTarea } from "@/components/ModalTarea";
import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTareas } from "@/hooks/tareas/useTareas";
import { useModalStore } from "@/store/modal-store";
import { Image, StyleSheet, View } from "react-native"

const Tareas = () => {

  const { tareas } = useTareas()
  const openModalTarea = useModalStore(state => state.openModalTarea)
  return (


    <CustomView >


      <ThemedView style={styles.titleContainer}>
        <ThemedText style={{ fontWeight: '900', fontSize: 38, padding: 10, textAlign: 'center' }} type="title">Tareas</ThemedText>
        <Button text='Crear' onPress={openModalTarea} />

      </ThemedView>



      <ListaTareas item={tareas} />


      <View>
        <ModalTarea />
      </View>
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