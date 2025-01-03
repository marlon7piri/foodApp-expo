import { HttpAdapter } from "@/config/adapters/http/http.adapter";
import type { Receta } from "@/config/infrastructure/entities/receta";
import { RecetaMapper } from "@/config/infrastructure/mapper/receta.mapper";
import type { RecetaResponse } from "@/types/receta";

export const RecetaByIdUseCases = async (
  fetcher: HttpAdapter,
  userId: string
): Promise<Receta> => {
  try {
    const response = await fetcher.get<RecetaResponse>(`/recetas/${userId}`);

    return response.data;
  } catch (error) {
    throw new Error("Error fetching receta by id");
  }
};
