import { HttpAdapter } from "@/src/config/adapters/http/http.adapter";
import type { Producto } from "@/src/config/infrastructure/entities/productos";

import { ComprasResponse,Compras } from "@/src/config/infrastructure/entities/compras";


export const comprasUseCases = async (fetcher: HttpAdapter,userId:string):Promise<Compras[]> => {
    try {
        const response = await fetcher.get<ComprasResponse>(`/compras/${userId}`)

        return response.data
    } catch (error) {
    throw new Error("Error fetching compras")
    }

}