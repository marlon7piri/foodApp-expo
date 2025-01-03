import { RecetaDb, RecetaResponse } from "@/src/types/receta";
import type { Receta } from "../entities/receta";

export class RecetaMapper {
  static fromRecetetaResponseToReceta(receta: RecetaDb): Receta {
    return {
      _id: receta._id,
      nombre: receta.nombre,
      descripcion: receta.descripcion,
      productos: receta.productos,
    };
  }
}
