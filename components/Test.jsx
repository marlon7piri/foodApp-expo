import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Separator } from "@/components/Separator";
import Button from "@/components/Button";
import { useModalStore } from "@/store/modal-store";
import { productStore } from "@/store/product.store";
import { useReceta } from "@/hooks/recetas/useReceta";
import CustomModal from "@/components/CustomModal";
import Subtitle from "@/components/Subtitle";
import { InputCustom } from "@/components/InputCustom";
import { AddCircle } from "./Icons";
import { Producto } from "@/config/infrastructure/entities/productos";
import { colors } from "@/theme/theme";

export const ModalReceta = () => {
  const modalCreateRecipes = useModalStore((state) => state.modalCreateRecipes);
  const closeModalCreateRecipes = useModalStore(
    (state) => state.closeModalCreateRecipes
  );
  const productos = productStore((state) => state.productos);
  const [productfilter, setProductfilter] = useState(productos);
  const {
    receta,
    setReceta,
    productoSelected,
    setProductoSelected,
    loading,
    crearReceta,
    aumentarCantidad,
    isAgregate,
    setIsAgregate,
  } = useReceta();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProductfilter(productos);
  }, [productos]);

  const handleSubmit = async () => {
    await crearReceta();
  };

  const agregarProductos = () => {
    setReceta((prevState) => ({
      ...prevState,
      productos: productoSelected,
    }));
    setIsAgregate(true);
    Alert.alert("Productos agregados a la receta");
  };

  const hanlderFilter = (text: string) => {
    setSearch(text);
    const result = productos.filter((e) =>
      e.nombre.toLowerCase().includes(text.toLowerCase())
    );
    setProductfilter(result);
  };

  const handlerSelectProducto = (
    id: string,
    nombre: string,
    unidad: string
  ) => {
    const found = productoSelected.find((e) => e.id === id);
    if (!found) {
      setProductoSelected([
        ...productoSelected,
        { id, cantidad: 0, nombre, unidad },
      ]);
    }
  };

  // Subcomponente: Form
  const Form = ({ receta, setReceta }: any) => (
    <View>
      <InputCustom
        placeholder="Nombre"
        value={receta.nombre}
        onChange={(text: string) => setReceta({ ...receta, nombre: text })}
        type="default"
      />
      <Separator />
      <InputCustom
        isArea
        placeholder="Descripción"
        value={receta.descripcion}
        onChange={(text: string) => setReceta({ ...receta, descripcion: text })}
        type="default"
      />
    </View>
  );

  // Subcomponente: ProductList
  const ProductList = ({ productos, onSelect }: any) => (
    <ScrollView style={{ maxHeight: 200, padding: 10 }}>
      {productos.map((producto: Producto) => (
        <View
          key={producto.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            gap: 5,
            marginTop: 3,
          }}
        >
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text>{producto.nombre}</Text>
            <Text>-{producto.unidad_medida}</Text>
          </View>
          <View style={{ marginRight: 20 }}>
            <TouchableOpacity
              onPress={() =>
                onSelect(producto.id, producto.nombre, producto.unidad_medida)
              }
              style={{ backgroundColor: colors.secundary, borderRadius: 50 }}
            >
              <AddCircle />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  // Subcomponente: ProductSelected
  const ProductSelected = ({ productos, onCantidadChange }: any) => (
    <View>
      {productos.map((e: Producto) => (
        <View
          key={e.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            gap: 5,
            marginTop: 3,
          }}
        >
          <Text>{e.nombre}</Text>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              gap: 5,
              width: 120,
            }}
          >
            <TextInput
              value={e.cantidad?.toString() || ""}
              placeholder="0"
              keyboardType="decimal-pad"
              onChangeText={(text: string) => {
                const decimalRegex = /^[0-9]*\.?[0-9]*$/;
                if (decimalRegex.test(text)) {
                  aumentarCantidad(e.id, text);
                }
              }}
              style={{
                borderWidth: 1,
                borderColor: colors.complementary,
                padding: 4,
                width: 80,
                textAlign: "center",
              }}
            />
            <Text>
              {e?.unidad === "unidad" ? "UND" : e?.unidad.toUpperCase()}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <CustomModal close={closeModalCreateRecipes} value={modalCreateRecipes}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <Subtitle text="Crear receta" />
          <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
            <Form receta={receta} setReceta={setReceta} />
            <Separator />
            <ProductList
              productos={productfilter}
              onSelect={handlerSelectProducto}
            />
            <Subtitle text="Productos Seleccionados" />
            <ProductSelected
              productos={productoSelected}
              onCantidadChange={aumentarCantidad}
            />
            <Separator />
            <Button
              text={loading ? "Creando..." : !isAgregate ? "Agregar" : "Crear"}
              onPress={isAgregate ? handleSubmit : agregarProductos}
              styles={{
                width: "100%",
                padding: 20,
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </CustomModal>
  );
};
