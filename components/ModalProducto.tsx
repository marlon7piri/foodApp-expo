import React, { useState } from 'react'
import CustomModal from '@/components/CustomModal'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Subtitle from '@/components/Subtitle'
import { InputCustom } from '@/components/InputCustom'
import { Separator } from '@/components/Separator'
import Button from '@/components/Button'
import { useProducto } from '@/hooks/productos/useProducto'
import { useModalStore } from '@/store/modal-store'
import { categoryStore } from '@/store/category.store'
import { colors } from '@/theme/theme'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Picker } from '@react-native-picker/picker'
import { KeyBoardComponent } from './KeyBoardComponent'

const ModalProducto = () => {
    const { producto, setProducto, handleSubmit, categoryselected, setCategorySelected, unidadSelected, setUnidadSelected } = useProducto()
    const isopenModalProducto = useModalStore().isopenModalProducto
    const closeModalProducto = useModalStore().closeModalProducto
    const categoryall = categoryStore(state => state.category)
    const [open, setOpen] = useState(false);
    const [openCategoryDDW, setOpenCategoryDDW] = useState(false);
    const [items, setItems] = useState([
        { label: 'Unidad', value: 'unidad' },
        { label: 'KG', value: 'kg' },
        { label: 'LB', value: 'Lb' },
        { label: 'LT', value: 'Lt' },
    ]);

    const handlerCategory = (itemvalue) => {

        setCategorySelected(itemvalue)
    }


    const categorias = categoryall.map((e) => ({ value: e.id, label: e.nombre }))

    return (
        <CustomModal value={isopenModalProducto} close={closeModalProducto}>
            <SafeAreaView style={{ flex: 1 }}>
                <Subtitle text='Crear producto' />

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    padding: 10
                }}>
                    <View>
                        <InputCustom
                            placeholder='Nombre'
                            value={producto.nombre} onChange={(text: string) => setProducto({ ...producto, nombre: text })}
                            type='default'
                        />
                    </View>
                    <Separator />
                    <View>
                        <InputCustom
                            placeholder='Precio de Compra'
                            value={producto.precio_compra} onChange={(text: number) => setProducto({ ...producto, precio_compra: text })}
                            type='numeric'
                        />
                    </View>
                    <Separator />
                    <View style={styles.container}>

                        <Text>Seleccione la unidad de medida</Text>
                        <Picker
                            selectedValue={unidadSelected}
                            onValueChange={(itemValue, itemIndex) =>
                                setUnidadSelected(itemValue)
                            }>

                            {items.map(e => {
                                return <Picker.Item label={e.label} value={e.value} key={e.label} />
                            })}
                        </Picker>
                    </View>
                    <Separator />
                    <View>

                        <InputCustom
                            placeholder='Cantidad en Inventario'
                            value={producto.stock} onChange={(numero: number) => setProducto({ ...producto, stock: numero })}
                            type='number-pad'
                        />
                    </View>
                    <Separator />
                    <View>

                        <InputCustom
                            placeholder='Stock Minimo'
                            value={producto.stock_min} onChange={(numero: number) => setProducto({ ...producto, stock_min: numero })}
                            type='numeric'
                        />
                    </View>
                    <Separator />
                    <View style={styles.containerCategory}>
                        <Text>Seleccione la categoria</Text>
                        <Picker
                            selectedValue={categoryselected}
                            onValueChange={(itemValue, itemIndex) =>
                                setCategorySelected(itemValue)
                            }>

                            {categorias.map(e => {
                                return <Picker.Item label={e.label} value={e.value} key={e.value} />
                            })}
                        </Picker>


                    </View>
                    <Separator />
                    <View>
                        <TouchableOpacity style={styles.btnCrear} onPress={handleSubmit} >
                            <Text>Crear</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </CustomModal>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 2,
        zIndex: 3

    },
    dropdown: {
        borderColor: '#ccc',
        borderWidth: 1,



    },
    dropdownContainer: {
        borderColor: '#ccc',



    },
    containerCategory: {
        justifyContent: 'center',
        padding: 2,
        zIndex: 1

    },
    dropdownCategory: {
        borderColor: '#ccc',
        borderWidth: 1,


    },
    dropdownContainerCategory: {
        borderColor: '#ccc',
        zIndex: 3



    },
    btnCrear: {
        width: '100%',
        textAlign: 'center',
        backgroundColor: colors.secundary,
        padding: 20,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ModalProducto
