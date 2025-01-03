import { HttpAdapter } from "@/config/adapters/http/http.adapter";
import type { Producto } from "@/config/infrastructure/entities/productos";
import { ProductoMapper } from "@/config/infrastructure/mapper/producto.mapper";
import type { ProductosResponse } from "@/types/productos";

export const createProductoUseCases = async (
  fetcher: HttpAdapter,
  newProducto: Producto
): Promise<Producto> => {
  try {
    const { data } = await fetcher.post<ProductosResponse>(
      "/productos",
      newProducto
    );

    const producto = ProductoMapper.fromProductResponseToProduct(data);

    return producto;
  } catch (error) {
    throw new Error(`Error creating product`);
  }
};
