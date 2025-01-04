import { HttpAdapter } from "@/config/adapters/http/http.adapter";
import type { Producto } from "@/config/infrastructure/entities/productos";
import { ProductoMapper } from "@/config/infrastructure/mapper/producto.mapper";
import { TypeProductosResponse } from "@/types/productos";

export const ProductByCategoryUseCases = async (
  fetcher: HttpAdapter,
  idCategory: string,
  userId: string
): Promise<Producto[]> => {
  const response = await fetcher.get<TypeProductosResponse>(
    `/productosByCategory?idCategory=${idCategory}&userId=${userId}`
  );

  return response.data;
};
