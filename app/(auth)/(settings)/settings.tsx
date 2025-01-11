import CustomView from "@/components/CustomView";
import TheTitle from "@/components/TheTitle";
import { View, Text } from "react-native";

const Settings = () => {
  return (
    <CustomView>
      <View>
        <TheTitle title="Settings" styles={{ textAlign: 'center' }} />

      </View>


      <View style={{
        flex: 1,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
        <Text>Aqui ira los campos de settings</Text>
      </View>
    </CustomView>
  );
};

export default Settings;
