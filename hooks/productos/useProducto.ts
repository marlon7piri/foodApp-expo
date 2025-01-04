import { useEffect, useState } from "react";

import { productStore } from "@/store/product.store";
import { Producto } from "@/config/infrastructure/entities/productos";
import * as UseCase from "@/core/use-cases";
import { fetcherAdapter } from "@/config/apiDb.adapter";
import { authStore } from "@/store/auth.store";
import { useModalStore } from "@/store/modal-store";
import { sendMessage } from "@/components/ToastCustom";

const initialState: Producto = {
  id: "",
  nombre: "",
  stock: 0,
  userId: "",
  stock_min: 1,
  precio_compra: 0,
  unidad_medida: "",
  costo: 0,
  presentacion_por_unidad: 0,
  idCategory: "",
};
export const useProducto = () => {
  const dahsboardFunctionAgotados = productStore(
    (state) => state.dahsboardFunctionAgotados
  );
  const dahsboardFunctionAComprar = productStore(
    (state) => state.dahsboardFunctionAComprar
  );
  const agregarProducto = productStore((state) => state.agregarProducto);
  const obtenerProducto = productStore((state) => state.obtenerProducto);
  const obtenerProductoPorCategoria = productStore(
    (state) => state.obtenerProductoPorCategoria
  );
  const closeModalProducto = useModalStore((state) => state.closeModalProducto);

  const [loading, setLoading] = useState(false);
  const [unidadSelected, setUnidadSelected] = useState("Kg");

  const user = authStore((state) => state.user);

  const [producto, setProducto] = useState<Producto>({
    id: "",
    nombre: "",
    stock: 0,
    stock_min: 1,
    idCategory: "",
    precio_compra: 0,
    unidad_medida: "",
    costo: 0,
    presentacion_por_unidad: 0,
    userId: "",
  });
  const [categoryselected, setCategorySelected] = useState("");
  const [categoryById, setCategoryById] = useState();

  const handleSubmit = async () => {
    const newProducto: Producto = {
      ...producto,
      idCategory: categoryselected,
      userId: user?._id,
      unidad_medida: unidadSelected,
    };

    const product = await UseCase.createProductoUseCases(
      fetcherAdapter,
      newProducto
    );

    agregarProducto(product);
    setProducto(initialState);
    closeModalProducto();
    getProductoController();
    sendMessage("Producto", "Creado con exito", "success");
  };

  useEffect(() => {
    getProductoController();
  }, []);

  const getProductoController = async () => {
    setLoading(true);
    const productos = await UseCase.productosUseCases(
      fetcherAdapter,
      user?._id
    );

    obtenerProducto(productos);
    dahsboardFunctionAComprar();
    dahsboardFunctionAgotados();
    setLoading(false);
  };

  const getProductoByCategoryController = async (idCategory: string) => {
    const res = await UseCase.ProductByCategoryUseCases(
      fetcherAdapter,
      idCategory,
      user?._id
    );
    obtenerProductoPorCategoria(res?.productos);
    setCategoryById(res?.categoryFound);
  };

  return {
    producto,
    setProducto,
    categoryselected,
    unidadSelected,
    setUnidadSelected,
    setCategorySelected,
    handleSubmit,
    getProductoController,
    getProductoByCategoryController,
    loading,
    categoryById,
  };
};
