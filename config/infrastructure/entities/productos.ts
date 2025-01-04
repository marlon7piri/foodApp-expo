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
