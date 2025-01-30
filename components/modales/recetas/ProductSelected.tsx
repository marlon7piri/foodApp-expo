import Subtitle from "@/components/Subtitle";
import { Producto } from "@/config/infrastructure/entities/productos";
import { colors } from "@/theme/theme";
import { Text, TextInput, View } from "react-native";
interface ProductSelectedProps {
  productoSelected: Producto[];
  aumentarCantidad: (id: string, cantidad: string) => void;
}
export const ProductSelected = ({ productoSelected, aumentarCantidad }: ProductSelectedProps) => {

  return (

    <View>
      <Subtitle text='Productos Seleccionados' style={{ color: colors.complementary, fontWeight: 900 }} />

      <View>
        {productoSelected.map((e) => {
          return (
            <View
              key={e.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                gap: 5,
                marginTop: 3
              }}>
              <Text>{e.nombre}</Text>
              <View style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 5,
                width: 120,

              }}>

                <TextInput /* value={e?.cantidad} */ placeholder='0' keyboardType='decimal-pad' onChangeText={(text: string) => {
                  // Validar si el texto es un número decimal válido
                  const decimalRegex = /^[0-9]*\.?[0-9]*$/;
                  if (decimalRegex.test(text)) {
                    aumentarCantidad(e.id, text); // Llama a tu función con el valor válido
                  }
                }} style={{ borderWidth: 1, borderColor: colors.complementary, padding: 4, width: 80, textAlign: 'center' }} />
                <Text>{e?.unidad == 'unidad' ? 'UND' : e?.unidad.toUpperCase()}</Text>


              </View>
            </View>)
        })}
      </View>
    </View>

  )
}