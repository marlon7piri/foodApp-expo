import React, { useEffect, useState } from 'react'
import CustomModal from '@/components/CustomModal'
import Subtitle from '@/components/Subtitle'
import { useModalStore } from '@/store/modal-store'
import { Pressable, SafeAreaView, View, Text, Alert, TextInput, TouchableOpacity } from 'react-native'
import { InputCustom } from '@/components/InputCustom'
import { Separator } from '@/components/Separator'
import Button from '@/components/Button'
import { productStore } from '@/store/product.store'

import { ScrollView } from 'react-native'

import { useReceta } from '@/hooks/recetas/useReceta'
import { Producto } from '@/config/infrastructure/entities/productos'
import { colors } from '@/theme/theme'
import { Ionicons } from '@expo/vector-icons'
import { useProducto } from '@/hooks/productos/useProducto'
import { AddCircle, RemoveCircle } from './Icons'



export const ModalReceta = () => {

    const modalCreateRecipes = useModalStore(state => state.modalCreateRecipes)
    const closeModalCreateRecipes = useModalStore(state => state.closeModalCreateRecipes)
    const productos = productStore(state => state.productos)
    const [productfilter, setProductfilter] = useState<Producto[]>(productos)

    const { productoSelected, setProductoSelected, loading, crearReceta, setReceta, receta, disminuirCantidad, aumentarCantidad, isAgregate, setIsAgregate } = useReceta()

    const [search, setSearch] = useState('')

    useEffect(() => {
        setProductfilter(productos)
    }, [productos])

    const handleSubmit = async () => {


        await crearReceta()


    }

    const agregarProductos = () => {
        setReceta((prevState) => {
            return { ...prevState, productos: productoSelected }
        })
        setIsAgregate(true)
        Alert.alert("Productos agregados a la receta")

    }



    const hanlderFilter = (text: string) => {
        setSearch(text)
        const result = productos.filter((e) => {

            return e.nombre.toLowerCase().includes(text.toLowerCase())

        })
        setProductfilter(result)
    }


    const handlerSelectProducto = (id: string, nombre: string, unidad: string) => {

        const found = productoSelected.find((e) => e.id === id)
        if (!found) {
            setProductoSelected([...productoSelected, { id: id, cantidad: 0, nombre: nombre, unidad }])

        } else {
            return
        }


    }



    return (
        <CustomModal close={closeModalCreateRecipes} value={modalCreateRecipes} >
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <Subtitle text='Crear receta' />

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
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                gap: 5,

                                            }}>
                                                <TouchableOpacity onPress={() => disminuirCantidad(e.id)} style={{ backgroundColor: colors.secundary, borderRadius: 50 }} >

                                                    <RemoveCircle />
                                                </TouchableOpacity>

                                                <Text>{e.cantidad}{e?.unidad == 'unidad' ? 'und' : e?.unidad}</Text>
                                                <TouchableOpacity onPress={() => aumentarCantidad(e.id)} style={{ backgroundColor: colors.secundary, borderRadius: 50 }} >
                                                    <AddCircle />

                                                </TouchableOpacity>

                                            </View>
                                        </View>)
                                })}
                            </View>

                        </View>
                        <Separator />




                        <View>
                            <Button text={loading ? 'Creando...' : !isAgregate ? 'Agregar' : 'Crear'} onPress={isAgregate ? handleSubmit : agregarProductos} styles={{
                                width: '100%',
                                padding: 20
                            }} />
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </CustomModal>
    )
}


