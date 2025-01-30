import { InputCustom } from "@/components/InputCustom"
import { Separator } from "@/components/Separator"
import { View } from "react-native"

export const Form = ({ receta, setReceta }: any) => {
  return (

    <View style={{
      flex: 1,
      justifyContent: 'center',
      padding: 10
    }}>
      <View>
        <InputCustom
          placeholder='Nombre'
          value={receta.nombre} onChange={(text: string) => setReceta({ ...receta, nombre: text })}
          type='default'
        />
      </View>
      <Separator />
      <View>


        <InputCustom
          isArea={true}
          placeholder='Descripcion'
          value={receta.descripcion} onChange={(text: string) => setReceta({ ...receta, descripcion: text })}
          type='default'
        />
      </View>
      <Separator />








    </View>
  )
}