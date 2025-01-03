import { HttpAdapter } from "@/config/adapters/http/http.adapter";
import type { Producto } from "@/config/infrastructure/entities/productos";

import {
  ComprasResponse,
  Compras,
} from "@/config/infrastructure/entities/compras";

export const comprasByIdUseCases = async (
  fetcher: HttpAdapter,
  id: string
): Promise<Compras> => {
  try {
    const response = await fetcher.get<ComprasResponse>(`/compras/byId/${id}`);

    return response.data;
  } catch (error) {
    throw new Error("Error fetching compras");
  }
};
