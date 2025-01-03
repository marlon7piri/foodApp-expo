import { Producto } from "./productos";

export interface RecetaResponse {
  status: number;
  data: Receta[];
}

export interface Receta {
  _id?: string;
  nombre: string;
  descripcion: string;
  productos: Productos[];
  userId: string | null;
}

interface Productos {
  producto: Producto;
  unidad: string;
  cantidad: number;
}
