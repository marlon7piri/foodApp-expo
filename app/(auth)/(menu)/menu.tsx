import Button from "@/components/Button";
import CustomView from "@/components/CustomView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import TheTitle from "@/components/TheTitle";
import { colors } from "@/theme/theme";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const Menu = () => {
  return (
    <CustomView >



      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TheTitle title="Menu" styles={{ textAlign: 'center' }} />
        <Button text="Crear" onPress={() => { }} />
      </View>


      <View style={{ flex: 1, padding: 20, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text>Aqui ira los menu</Text>
      </View>

    </CustomView>
  );
};
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
export default Menu;
