import { create } from "zustand";
import { Compras } from "@/config/infrastructure/entities/compras";

interface TypeStore {
  compras: Compras[];
  total: number;
  obtenerCompras: (comp: Compras[]) => void;
  crearCompras: (newComp: Compras) => void;
  updateTotal: (newComp: number) => void;
  deleteCategory: (id: string) => void;
}

export const comprasStore = create<TypeStore>()((set, get) => ({
  compras: [],
  total: 0,
  obtenerCompras: (comp) => {
    set((state) => ({
      compras: comp,
    }));
  },
  crearCompras: (newComp) => {
    set((state) => ({
      compras: [...state.compras, newComp],
    }));
  },
  deleteCategory: (id) => {
    set((state) => ({
      compras: state.compras.filter((e) => e.id !== id),
    }));
  },
  updateTotal: (numero: number) => {
    set((state) => ({
      total: numero,
    }));
  },
}));
