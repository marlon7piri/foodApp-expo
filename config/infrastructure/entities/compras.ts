export interface ComprasResponse {
  status: number;
  data: Compras[];
}

export interface Compras {
  _id?: string;
  productos: Producto[];
  estado: string;
  total: number;
  userId: string;
  fecha: Date | null;
}

export interface Producto {
  _id?: string;
  nombre: string;
  stock: number;
  stock_min: number;
  idCategory: string;
  precio_compra: number;
  presentacion_por_unidad: number;
  costo: number;
  unidad_medida: string;
  userId: string | undefined;
}
