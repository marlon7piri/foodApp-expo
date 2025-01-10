import Button from "@/components/Button";
import CustomView from "@/components/CustomView";
import TheTitle from "@/components/TheTitle";
import { View, Text } from "react-native";

const Cuenta = () => {
  return (
    <CustomView>
      <View>
        <TheTitle title="Cuenta" styles={{ textAlign: 'center' }} />

      </View>


      <View style={{
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
        <Text>Aqui ira los campos de cuentas</Text>
      </View>

    </CustomView>
  );
};

export default Cuenta;
