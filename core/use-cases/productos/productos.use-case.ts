import { HttpAdapter } from "@/config/adapters/http/http.adapter";
import type { Producto } from "@/config/infrastructure/entities/productos";
import { ProductoMapper } from "@/config/infrastructure/mapper/producto.mapper";
import type { ProductosResponse } from "@/types/productos";

export const productosUseCases = async (
  fetcher: HttpAdapter,
  userId: string
): Promise<Producto[]> => {
  try {
    const response = await fetcher.get<ProductosResponse>(
      `/productos/${userId}`
    );
    const result = response.data.map((res) =>
      ProductoMapper.fromProductResponseToProduct(res)
    );

    return result;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};
