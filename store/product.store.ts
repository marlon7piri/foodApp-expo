import { TypeProductosResponse } from "@/types/productos";
import { create } from "zustand";

import type { Producto } from "@/config/infrastructure/entities/productos";

interface Props {
  productos: Producto[];
  productosfiltered: Producto[];
  productosByCategoria: Producto[];
  agregarProducto: (producto: Producto) => void;
  obtenerProducto: (producto: Producto[]) => void;
  obtenerProductoPorCategoria: (producto: Producto[]) => void;
  eliminarProducto: (id: string) => void;
  totalProductos: () => number;
  productosAgotados: () => void;
  searchProduct: (search: string) => void;
  agotados: Producto[];
  aComprar: Producto[];
  dahsboardFunctionAgotados: () => void;
  dahsboardFunctionAComprar: () => void;
}

export const productStore = create<Props>()((set, get) => ({
  productos: [],
  productosfiltered: [],
  agotados: [],
  aComprar: [],
  productosByCategoria: [],

  totalProductos: () => {
    return get().productos.length;
  },
  obtenerProducto: (producto) => {
    set((state) => ({
      productos: producto,
      productosfiltered: producto,
    }));
  },
  searchProduct: (search: string) => {
    const productfiltered = get().productos.filter((e) =>
      e.nombre.toLowerCase().includes(search.toLowerCase())
    );
    set((state) => ({
      productosfiltered: productfiltered,
    }));
  },
  obtenerProductoPorCategoria: (productos) => {
    set((state) => ({
      productosByCategoria: productos,
    }));
  },
  agregarProducto: (producto) => {
    /* @ts-ignore */
    set((state) => ({
      productos: [...state.productos, producto],
      productosfiltered: [...state.productosfiltered, producto],
    }));
  },
  /* @ts-ignore */
  eliminarProducto: (id) => {
    set((state) => ({
      productos: state.productos.filter((e) => {
        return e.id !== id;
      }),
    }));
  },
  productosAgotados: () => {
    const result = get().productos?.reduce(
      (acc, obj: Producto) => {
        if (obj.stock == 0) {
          acc.productosAcomprar++;
        } else if (obj.stock < obj.stock_min) {
          acc.productosAgotados++;
        }
        return acc;
      },
      {
        productosAcomprar: 0,
        productosAgotados: 0,
      }
    );

    return result;
  },
  dahsboardFunctionAgotados: () => {
    set((state) => ({
      agotados: state.productos.filter(
        (e: Producto) => e.stock < e.stock_min && e.stock !== 0
      ),
    }));
  },

  dahsboardFunctionAComprar: () => {
    set((state) => ({
      aComprar: state.productos.filter((e: Producto) => e.stock == 0),
    }));
  },
}));
