export interface RecetaResponse {
  status: number;
  data: RecetaDb[];
}

export interface RecetaDb {
  _id: string;
  nombre: string;
  productos: Producto[];
  userId: string;
  descripcion: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Producto {
  producto: string;
  cantidad: number;
  _id: string;
}
