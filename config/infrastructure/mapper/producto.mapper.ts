import type { Producto } from "../entities/productos";
import type { ProductosResponse } from "../../../types/productos";

export class ProductoMapper {

    static fromProductResponseToProduct(productoResponse: ProductosResponse): Producto {
        return {
            id: productoResponse._id,
            nombre: productoResponse.nombre,
            stock: productoResponse.stock,
            stock_min: productoResponse.stock_min,
            idCategory: productoResponse.idCategory,
            precio_compra: productoResponse.precio_compra,
            unidad_medida: productoResponse.unidad_medida,
            userId:productoResponse.userId
        }
    }



}