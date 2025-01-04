import { HttpAdapter } from "@/config/adapters/http/http.adapter";
import type { Receta } from "@/config/infrastructure/entities/receta";
import { Tareas } from "@/config/infrastructure/entities/tareas";

export const updateTareaUseCases = async (
  fetcher: HttpAdapter,
  idTarea: string
): Promise<Tareas> => {
  try {
    const response = await fetcher.put<Tareas>(`/tareas/${idTarea}`);

    return response;
  } catch (error) {
    throw new Error(`Error creating receta`);
  }
};
