import { AddCircle } from "@/components/Icons"
import { InputCustom } from "@/components/InputCustom"
import { colors } from "@/theme/theme"
import { memo } from "react"
import { View, ScrollView, TouchableOpacity, Text } from "react-native"

export const ProductList = memo(({ hanlderFilter, search, productfilter, handlerSelectProducto }: any) => (



  <View style={{ flex: 1, position: 'relative' }}>
    <InputCustom
      placeholder='Buscar productos'
      value={search} onChange={hanlderFilter}
      type='default'
    />

    <View>
      <ScrollView
        style={{
          flex: 1,
          maxHeight: 200,
          padding: 10,

        }}

      >
        {
          productfilter.map((producto) => {
            return (


              <View key={producto.id} style={{

                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                gap: 5,
                marginTop: 3,

              }}>
                <View style={{

                  flexDirection: 'row',
                  gap: 4,


                }}>
                  <Text >
                    {producto.nombre}
                  </Text>
                  <Text>
                    -{producto.unidad_medida}
                  </Text>
                </View>
                <View style={{ marginRight: 20 }}>
                  <TouchableOpacity onPress={() => handlerSelectProducto(producto.id, producto.nombre, producto.unidad_medida)} style={{ backgroundColor: colors.secundary, borderRadius: 50 }} >
                    <AddCircle />
                  </TouchableOpacity>
                </View>


              </View>


            )
          })
        }
      </ScrollView>

    </View>


  </View>

))