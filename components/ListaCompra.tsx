import React, { useEffect, useState } from 'react'
import { colors } from "@/theme/theme";
import { ActivityIndicator, StyleSheet } from "react-native";
import { FlatList, Text, View } from "react-native";
import Button from '@/components/Button';
import { productStore } from '@/store/product.store';
import { cartStore } from '@/store/cart.store';
import Subtitle from '@/components/Subtitle';
import { Pressable } from 'react-native';
import { useCompras } from '@/hooks/compras/useCompras';
import { convertirFecha } from '@/utils/convertirFecha';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export const ListaCompra = () => {
    const { compras, loading } = useCompras()
    const quitarDelCarrito = cartStore(state => state.quitarDelCarrito)
    const navigation = useRouter()



    if (compras.length === 0) {
        return <Subtitle
            text='La lista de compras esta vacia'
            style={{ textAlign: 'center' }}
        />
    }

    if (loading) {
        return <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <ActivityIndicator size={'large'} color={colors.background} />
        </View>
    }





    return (

        <View style={{ flex: 1 }}>
            <FlatList

                data={compras}
                keyExtractor={item => item?._id}
                renderItem={({ item }) => (

                    <Link href={`/(compras)/${item._id}`} asChild>

                        <Pressable style={styles.item}>
                            <Ionicons name='calendar-number-outline' size={20} color={colors.complementary} />

                            <Text style={styles.title}>{convertirFecha(item?.fecha)}</Text>
                            <Ionicons name='checkmark-circle' size={20} color={item?.estado === 'pendiente' ? colors.dangerColor : 'green'} />

                            <Text style={styles.title}>{item?.estado}</Text>

                            <Pressable onPress={() => quitarDelCarrito(item._id)} style={styles.botonContainer}>
                                <Ionicons name='trash' size={20} color={'red'} />

                            </Pressable>


                        </Pressable>
                    </Link>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,

    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.complementary,
    },
    title: {
        fontSize: 18,
        color: colors.complementary
    },
    botonContainer: {
        backgroundColor: 'white',
        padding: 2,
        width: 30,
        height: 30,
        borderRadius: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.complementary,
    }
});