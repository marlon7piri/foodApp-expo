import { TypeProduct } from "@/types/productos";
import { create } from "zustand";
import { sendMessage } from "@/components/ToastCustom";

interface Type {
  carrito: TypeProduct[];
  agregarAlCarrito: (producto: TypeProduct) => void;
  quitarDelCarrito: (id: number) => void;
}

export const cartStore = create<Type>()((set, get) => ({
  carrito: [],
  agregarAlCarrito: (producto) => {
    const found = get().carrito.find((e) => e.id === producto.id);
    if (!found) {
      set((state) => ({
        carrito: [...state.carrito, producto],
      }));
      sendMessage("Producto", "agregado", "success");
    } else {
      return;
    }
  },
  quitarDelCarrito: (id) => {
    set((state) => ({
      carrito: state.carrito.filter((e) => e.id !== id),
    }));
    sendMessage("Producto", "eliminado del carrito", "error");
  },
}));
