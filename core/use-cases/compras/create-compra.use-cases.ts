import { HttpAdapter } from "@/src/config/adapters/http/http.adapter";
import type { Producto } from "@/src/config/infrastructure/entities/productos";
import { ProductoMapper } from "../../../config/infrastructure/mapper/producto.mapper";
import { Compras, ComprasResponse } from "@/src/config/infrastructure/entities/compras";



export const createCompraUseCases = async (fetcher: HttpAdapter, newListaCompra: Compras): Promise<Producto> => {


    try {
      
        const res = await fetcher.post<ComprasResponse>('/compras', newListaCompra)

        

        return res.data

    } catch (error) {
        throw new Error(`Error creating list compra`)
    }


}