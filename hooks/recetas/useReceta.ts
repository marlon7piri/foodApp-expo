import { useEffect, useState } from "react";
import { authStore } from "@/store/auth.store";
import { recetaStore } from "@/store/receta.store";
import { useNavigation } from "@react-navigation/native";
import { Receta } from "@/config/infrastructure/entities/receta";
import { Producto } from "@/types/receta";
import { fetcherAdapter } from "@/config/apiDb.adapter";
import { sendMessage } from "@/components/ToastCustom";
import * as UseCases from "@/core/use-cases";

export const useReceta = () => {
  const [loading, setLoading] = useState(false);
  const [isAgregate, setIsAgregate] = useState(false);
  const user = authStore((state) => state.user);
  const recetas = recetaStore((state) => state.recetas);
  const obetenerRecetas = recetaStore((state) => state.obetenerRecetas);
  const createReceta = recetaStore((state) => state.createReceta);
  const navigation = useNavigation();

  const [receta, setReceta] = useState<Receta>({
    nombre: "",
    descripcion: "",
    productos: [],
    userId: "",
  });
  const [productoSelected, setProductoSelected] = useState<Producto[]>([]);

  useEffect(() => {
    loadReceta();
  }, []);

  const loadReceta = async () => {
    const recetas = await UseCases.RecetasUseCases(fetcherAdapter, user._id);
    obetenerRecetas(recetas);
  };

  const crearReceta = async () => {
    const newReceta: Receta = {
      ...receta,
      userId: user?._id,
    };

    try {
      setLoading(true);

      const res = await UseCases.createRecetaUseCases(
        fetcherAdapter,
        newReceta
      );

      setProductoSelected([]);
      setIsAgregate(false);

      createReceta(res);
      navigation.navigate("CategoryScreen");
      sendMessage("Receta", "Creada con éxito", "success");

      setLoading(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const disminuirCantidad = (id: string) => {
    const res = productoSelected.map((ele) => {
      if (ele.cantidad == 0) {
        return { ...ele, cantidad: 0 };
      }
      return ele.id === id ? { ...ele, cantidad: ele.cantidad - 1 } : ele;
    });
    setProductoSelected(res);
  };
  const aumentarCantidad = (id: string) => {
    const res = productoSelected.map((ele) => {
      return ele.id === id ? { ...ele, cantidad: ele.cantidad + 1 } : ele;
    });
    setProductoSelected(res);
  };

  return {
    recetas,
    productoSelected,
    setProductoSelected,
    loading,
    crearReceta,
    setReceta,
    receta,
    disminuirCantidad,
    aumentarCantidad,
    isAgregate,
    loadReceta,
    setIsAgregate,
  };
};
