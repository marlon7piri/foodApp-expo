import { Producto} from "./productos";





export interface RecetaResponse {
    status: number;
    data: Receta[];
}

export interface Receta {
    id?: string,
    nombre: string,
    descripcion: string,
    productos: Producto[],
    userId:string | null
}



