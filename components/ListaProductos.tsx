import React from 'react';
import { colors } from "@/theme/theme";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { FlatList, Text, View } from "react-native";

import { productStore } from '@/store/product.store';
import { cartStore } from '@/store/cart.store';
import { Producto } from '@/config/infrastructure/entities/productos';
import { Ionicons } from '@expo/vector-icons';
import { useProducto } from '@/hooks/productos/useProducto';
import { BagIcon, UsdIcon } from './Icons';

interface Props {
    item: Producto[];
}

export const ListaProductos = ({ item }: Props) => {
    const eliminarProducto = productStore(state => state.eliminarProducto);
    const agregarAlCarrito = cartStore(state => state.agregarAlCarrito);
    const { loading } = useProducto()


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', marginTop: 30 }}>
                <ActivityIndicator size="large" color={colors.complementary} />
            </View>
        );
    }

    return (
        <View>
            <FlatList

                ListHeaderComponent={() => (
                    <View style={{ flexDirection: 'row', padding: 10, backgroundColor: colors.secundary, borderRadius: 5, marginBottom: 5 }}>
                        <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'left', color: colors.background }}>Nombre</Text>
                        <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: colors.background }}>Precio</Text>
                        <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: colors.background }}>Presentacion x und</Text>
                        <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: colors.background }}>Costo</Text>
                    </View>
                )}
                data={item}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}

                contentContainerStyle={{ paddingBottom: 20 }} // Espacio inferior
                renderItem={({ item }) => (




                    <View style={{ flexDirection: 'row', padding: 10, backgroundColor: colors.cardColor, borderRadius: 5, marginBottom: 5 }}>

                        <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'left', color: colors.complementary }}>{item.nombre}</Text>

                        <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: colors.complementary }}>{item.precio_compra}</Text>
                        <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: colors.complementary }}>{item.presentacion_por_unidad}/{item.unidad_medida}</Text>
                        <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center', color: colors.complementary }}>${item.costo?.toFixed(2)}/{item.unidad_medida}</Text>
                    </View>



                )}
                ListFooterComponent={
                    <View style={{ padding: 10 }}>
                        <Text style={{ textAlign: 'center', color: colors.complementary }}>
                            No hay más productos
                        </Text>
                    </View>
                }
            />
        </View>
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
