import React, { useState } from 'react';
import { colors } from "@/theme/theme";
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { CalendarPicker } from '@/components/CalendarPicker'

import { productStore } from '@/store/product.store';
import { Producto } from '@/config/infrastructure/entities/productos';
import CustomModal from '@/components/CustomModal';
import { useModalStore } from '@/store/modal-store';
import Subtitle from '@/components/Subtitle';
import { InputCustom } from '@/components/InputCustom';
import { Separator } from '@/components/Separator';

import Button from '@/components/Button';
import { convertirFecha } from '@/utils/convertirFecha';
import { useCompras } from '@/hooks/compras/useCompras';
import { Ionicons } from '@expo/vector-icons';


export const ModalListaCompra = () => {
    const item = productStore(state => state.productosfiltered)
    const closeModalListaCompra = useModalStore().closeModalListaCompra
    const isopenModalListaCompra = useModalStore().isopenModalListaCompra
    const productos = productStore(state => state.productos)
    const [productfilter, setProductfilter] = useState<Producto[]>(productos)

    const { newCompra, setNewCompra, productosSelected, setProductosSelected, crearListaCompra, loading, dateSelected, setDateSelected } = useCompras()

    const [search, setSearch] = useState('')



    const handleSubmit = async () => {


        await crearListaCompra()


    }





    const hanlderFilter = (text: string) => {
        setSearch(text)
        const result = productos.filter((e) => {

            return e.nombre.toLowerCase().includes(text.toLowerCase())

        })
        setProductfilter(result)
    }


    const handlerSelectProducto = (id: string, nombre: string) => {

        const found = productosSelected.find((e) => e.id === id)
        if (!found) {
            setProductosSelected([...productosSelected, { id: id, cantidad: 0, nombre: nombre }])

        } else {
            return
        }


    }
    const deleteProductSelected = (id: string) => {

        const found = productosSelected.filter((e) => e.id !== id)

        setProductosSelected(found)




    }


    return (
        <CustomModal value={isopenModalListaCompra} close={closeModalListaCompra}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>

                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        padding: 10
                    }}>
                        <Subtitle text={`Crear Lista de Compra:`} />

                        <View>
                            <CalendarPicker setState={setDateSelected} />
                            <Text style={{ ...styles.title, marginBottom: 20 }}>Fecha cuando comprará: {dateSelected ? convertirFecha(dateSelected) : ''}</Text>

                        </View>

                        <View style={{ flex: 1, position: 'relative' }}>
                            <InputCustom
                                placeholder='Buscar productos'
                                value={search} onChange={hanlderFilter}
                                type='default'
                                styles={{ marginBottom: 20 }}
                            />

                            <View>
                                <ScrollView

                                >
                                    {
                                        productfilter.map((producto) => {
                                            return (


                                                <View key={producto.id} style={{

                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    flexDirection: 'row',
                                                    gap: 5,
                                                    marginTop: 3
                                                }}>
                                                    <Text>
                                                        {producto.nombre}
                                                    </Text>
                                                    <TouchableOpacity onPress={() => handlerSelectProducto(producto.id, producto.nombre)} style={{ backgroundColor: colors.secundary, borderRadius: 50 }} >
                                                        <Ionicons name='add-circle-outline' size={28} color={colors.background} />

                                                    </TouchableOpacity>

                                                </View>


                                            )
                                        })
                                    }
                                </ScrollView>

                            </View>
                            <Subtitle text='Productos Seleccionados' style={{ color: colors.complementary, fontWeight: 900 }} />

                            <View>
                                {productosSelected.map((e) => {
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


                                                <TouchableOpacity onPress={() => deleteProductSelected(e.id)} style={{ backgroundColor: colors.background, borderRadius: 50, padding: 2, borderWidth: 1, borderColor: colors.complementary }} >
                                                    <Ionicons name='trash' size={24} color={colors.dangerColor} />

                                                </TouchableOpacity>

                                            </View>
                                        </View>)
                                })}
                            </View>

                        </View>
                        <Separator />




                        <View>
                            <Button text={loading ? 'Creando...' : 'Crear'} onPress={handleSubmit} styles={{
                                width: '100%',
                                padding: 20
                            }} />
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </CustomModal >
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.cardColor,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.complementary,
    },
    containerContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 4,
    },
    containerStock: {
        flexDirection: 'row',
        gap: 4,
    },
    title: {
        fontSize: 18,
        color: colors.complementary,
    },
    botonContainer: {
        backgroundColor: colors.background,
        padding: 2,
        width: 30,
        height: 30,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.complementary,
    },
});
