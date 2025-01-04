import { HttpAdapter } from "@/config/adapters/http/http.adapter";
import { Tareas } from "@/config/infrastructure/entities/tareas";

export const TareasUseCases = async (
  fetcher: HttpAdapter,
  userId: string
): Promise<Tareas[]> => {
  try {
    const response = await fetcher.get<Tareas[]>(`/tareas?idUser=${userId}`);

    return response;
  } catch (error) {
    throw new Error("Error fetching recetas");
  }
};
