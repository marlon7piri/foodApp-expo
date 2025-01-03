import { HttpAdapter } from "@/src/config/adapters/http/http.adapter";
import type { Receta } from "@/src/config/infrastructure/entities/receta";
import type { RecetaResponse } from "../../../types/receta";



export const createRecetaUseCases = async (fetcher: HttpAdapter, newReceta: Receta): Promise<Receta> => {
    try {

        const response = await fetcher.post<RecetaResponse>(`/recetas`, newReceta)


        return response.data

    } catch (error) {
        throw new Error(`Error creating receta`)

    }



}