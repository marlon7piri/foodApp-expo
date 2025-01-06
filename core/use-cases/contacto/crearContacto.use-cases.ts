import { HttpAdapter } from "@/config/adapters/http/http.adapter";
import {
  Contacto,
  ContactoResponse,
} from "@/config/infrastructure/entities/contacto";

export const crearContactoUseCases = async (
  fetcher: HttpAdapter,
  userId: string,
  newContacto: Contacto
): Promise<Contacto> => {
  try {
    const response = await fetcher.post<ContactoResponse>(
      `/contacto`,
      newContacto
    );

    return response;
  } catch (error) {
    throw new Error("Error creating contactos");
  }
};
