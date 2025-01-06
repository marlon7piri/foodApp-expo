import { HttpAdapter } from "@/config/adapters/http/http.adapter";
import {
  Contacto,
  ContactoResponse,
} from "@/config/infrastructure/entities/contacto";
import type { Producto } from "@/config/infrastructure/entities/productos";
import { ProductoMapper } from "@/config/infrastructure/mapper/producto.mapper";
import type { ProductosResponse } from "@/types/productos";

export const contactoUseCases = async (
  fetcher: HttpAdapter,
  userId: string
): Promise<Contacto[]> => {
  try {
    const response = await fetcher.get<ContactoResponse>(`/contacto/${userId}`);

    return response.data;
  } catch (error) {
    throw new Error("Error fetching contactos");
  }
};
