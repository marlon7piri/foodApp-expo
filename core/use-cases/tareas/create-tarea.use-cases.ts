import { HttpAdapter } from "@/config/adapters/http/http.adapter";
import type { Receta } from "@/config/infrastructure/entities/receta";
import { Tareas } from "@/config/infrastructure/entities/tareas";

export const createTareaUseCases = async (
  fetcher: HttpAdapter,
  newTarea: Tareas
): Promise<Tareas> => {
  try {
    const response = await fetcher.post<Tareas>(`/tareas`, newTarea);

    return response;
  } catch (error) {
    throw new Error(`Error creating receta`);
  }
};
