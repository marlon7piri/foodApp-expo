export interface Producto{
    id?:string,
    nombre:string,
    stock:number,
    stock_min:number,
    idCategory:string,
    precio_compra:number,
    unidad_medida:string,
    userId:string | undefined,

}