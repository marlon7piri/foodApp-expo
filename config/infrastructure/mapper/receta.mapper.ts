import { RecetaDb, RecetaResponse } from "@/src/types/receta";
import type { Receta } from "../entities/receta";

export class RecetaMapper {

    static fromRecetetaResponseToReceta(receta: RecetaDb):Receta {
  /*       const productos =  receta.productos.map((ele) => {
            return {
                id:ele._id,
                nombre:ele.producto,
                cantidad:ele.cantidad

            
            }


        }) */
        return {
            id:receta._id,
            nombre:receta.nombre,
            descripcion:receta.descripcion,
            productos:receta.productos,
            
        }
    }
}