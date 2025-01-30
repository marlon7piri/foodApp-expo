import { useEffect, useState } from "react";
import { authStore } from "@/store/auth.store";
import { recetaStore } from "@/store/receta.store";
import { useNavigation } from "@react-navigation/native";
import { Receta } from "@/config/infrastructure/entities/receta";
import { Producto } from "@/types/receta";
import { fetcherAdapter } from "@/config/apiDb.adapter";
import { sendMessage } from "@/components/ToastCustom";
import * as UseCases from "@/core/use-cases";
import { useRouter } from "expo-router";
import { useModalStore } from "@/store/modal-store";
import axios from "axios";

export const useReceta = () => {
  const [loading, setLoading] = useState(false);
  const [isAgregate, setIsAgregate] = useState(false);
  const [recetaById, setRecetaById] = useState<Receta | null>(null);
  const user = authStore((state) => state.user);
  const recetas = recetaStore((state) => state.recetas);
  const obetenerRecetas = recetaStore((state) => state.obetenerRecetas);
  const createReceta = recetaStore((state) => state.createReceta);
  const closeModalCreateRecipes = useModalStore(
    (state) => state.closeModalCreateRecipes
  );

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
  const loadRecetaById = async (id: string) => {
    const res = await UseCases.RecetaByIdUseCases(fetcherAdapter, id);
    setRecetaById(res);
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
      closeModalCreateRecipes();

      sendMessage("Receta", "Creada con éxito", "success");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const aumentarCantidad = (id: string, text: any) => {
    const res = productoSelected.map((ele) => {
      return ele.id === id ? { ...ele, cantidad: parseFloat(text) } : ele;
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

    aumentarCantidad,
    isAgregate,
    loadReceta,
    setIsAgregate,
    loadRecetaById,
    recetaById,
  };
};
