import React from 'react';
import { colors } from "@/theme/theme";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { FlatList, Text, View } from "react-native";

import { productStore } from '@/store/product.store';
import { cartStore } from '@/store/cart.store';
import { Producto } from '@/config/infrastructure/entities/productos';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    item: Producto[];
}

export const ListaProductos = ({ item }: Props) => {
    const eliminarProducto = productStore(state => state.eliminarProducto);
    const agregarAlCarrito = cartStore(state => state.agregarAlCarrito);

    // Aquí simulas el estado de carga
    const { loading } = { loading: false };

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
                data={item}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}

                contentContainerStyle={{ paddingBottom: 20 }} // Espacio inferior
                renderItem={({ item }) => (

                    <View style={styles.card}>
                        <View style={styles.containerContent}>
                            <View style={styles.containerStock}>
                                <Text style={styles.title}>{item.nombre}</Text>
                            </View>
                            <View style={styles.containerStock}>
                                <Ionicons name="logo-dropbox" size={24} color={colors.secundary} />
                                <Text style={styles.title}>{item.stock}</Text>
                                <Ionicons name="alert-circle-outline" size={24} color={colors.dangerColor} />
                                <Text style={styles.title}>{item.stock_min}</Text>
                            </View>
                            <View style={styles.containerStock}>
                                <Pressable onPress={() => eliminarProducto(item.id)} style={styles.botonContainer}>
                                    <Ionicons name="trash" size={20} color="red" />
                                </Pressable>
                                {/*  <Pressable onPress={() => agregarAlCarrito(item)} style={styles.botonContainer}>
                                    <Ionicons name="cart" size={20} color="green" />
                                </Pressable> */}
                            </View>
                        </View>
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
