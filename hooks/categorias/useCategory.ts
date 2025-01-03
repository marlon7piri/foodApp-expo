import { useEffect, useState } from "react";

import { categoryStore } from "@/store/category.store";
import type { Category } from "@/config/infrastructure/entities/category";
import * as UseCases from "@/core/use-cases";
import { fetcherAdapter } from "@/config/apiDb.adapter";
import { authStore } from "@/store/auth.store";
import { useModalStore } from "../../store/modal-store";
import { sendMessage } from "@/components/ToastCustom";

const initialState: Category = {
  id: "",
  nombre: "",
  userId: "",
};
export const useCategory = () => {
  const crearCategory = categoryStore((state) => state.crearCategory);
  const obtenerCategory = categoryStore((state) => state.obtenerCategory);
  const closeModalCategory = useModalStore((state) => state.closeModalCategory);

  const user = authStore((state) => state.user);
  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState<Category>({
    id: "",
    nombre: "",

    userId: "",
  });

  useEffect(() => {
    getCategoryController();
  }, []);

  const getCategoryController = async () => {
    const respuesta = await UseCases.categoriasUseCases(
      fetcherAdapter,
      user?._id
    );

    obtenerCategory(respuesta);
  };
  const createCategoryController = async () => {
    const newCategory: Category = {
      ...category,
      userId: user?._id,
    };
    try {
      setLoading(true);
      const respuesta = await UseCases.createCategoryUseCase(
        fetcherAdapter,
        newCategory
      );
      crearCategory(respuesta);
      setCategory(initialState);
      setLoading(false);
      closeModalCategory();
      sendMessage("Categoria", "Creada con exito", "success");
    } catch (error) {
      sendMessage("Categoria", `${error}`, "error");
    } finally {
      setCategory(initialState);

      setLoading(false);
    }
  };

  return {
    category,
    setCategory,
    getCategoryController,
    createCategoryController,
    loading,
  };
};
