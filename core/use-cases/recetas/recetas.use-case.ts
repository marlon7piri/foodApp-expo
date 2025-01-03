import { HttpAdapter } from "@/src/config/adapters/http/http.adapter";
import type { Receta } from "@/src/config/infrastructure/entities/receta";
import { RecetaMapper } from "../../../config/infrastructure/mapper/receta.mapper";
import type { RecetaResponse } from "../../../types/receta";



export const RecetasUseCases =async (fetcher:HttpAdapter,userId:string):Promise<Receta[]>=>{

  try {
    const response = await fetcher.get<RecetaResponse>(`/recetas?userId=${userId}`)
      const receta = response.data.map(res=>RecetaMapper.fromRecetetaResponseToReceta(res))


    return receta
  } catch (error) {
    throw new Error('Error fetching recetas')
  }





}