import React, { memo, useEffect, useState } from 'react'
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
import { AddCircle, RemoveCircle } from '../../Icons'
import { ProductSelected } from './ProductSelected'
import { ProductList } from './ProductList'
import { Form } from './Form'



export const ModalReceta = () => {

    const modalCreateRecipes = useModalStore(state => state.modalCreateRecipes)
    const closeModalCreateRecipes = useModalStore(state => state.closeModalCreateRecipes)
    const productos = productStore(state => state.productos)
    const [productfilter, setProductfilter] = useState<Producto[]>(productos)

    const { productoSelected, setProductoSelected, loading, crearReceta, setReceta, receta, aumentarCantidad, isAgregate, setIsAgregate } = useReceta()

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
                    <Form receta={receta} setReceta={setReceta} />
                    <ProductList hanlderFilter={hanlderFilter} productfilter={productfilter} search={search} handlerSelectProducto={handlerSelectProducto} />
                    <ProductSelected aumentarCantidad={aumentarCantidad} productoSelected={productoSelected} />
                    <Separator />
                    <View>
                        <Button text={loading ? 'Creando...' : !isAgregate ? 'Agregar' : 'Crear'} onPress={isAgregate ? handleSubmit : agregarProductos} styles={{
                            width: '100%',
                            padding: 20
                        }} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </CustomModal>
    )
}



